import { NextRequest, NextResponse } from 'next/server';
import { identifyFoodFromImage } from '@/lib/ai/claude';
import { gradeFood } from '@/lib/nutrition/grading';
import { getFoodHacks, getTopHack } from '@/lib/nutrition/hacks';
import { prisma } from '@/lib/db/prisma';

// Vision scan: POST { image: base64string }
export async function POST(req: NextRequest) {
  try {
    const { image, barcode } = await req.json();

    let identification;
    let ingredientList: string[] = [];

    if (barcode) {
      // Open Food Facts barcode lookup
      const offRes = await fetch(
        `https://world.openfoodfacts.org/api/v2/product/${barcode}.json?fields=product_name,nutriments,ingredients_text,categories,image_url`,
        { next: { revalidate: 86400 } },
      );
      const offData = await offRes.json();

      if (offData.status !== 1 || !offData.product) {
        return NextResponse.json({ error: 'Product not found in database' }, { status: 404 });
      }

      const p = offData.product;
      const n = p.nutriments ?? {};
      ingredientList = (p.ingredients_text ?? '')
        .split(',')
        .map((s: string) => s.trim().toLowerCase())
        .filter(Boolean);

      identification = {
        food_name: p.product_name ?? 'Unknown Product',
        category: 'packaged' as const,
        is_whole_food: false,
        estimated_nutrition_per_100g: {
          calories: n['energy-kcal_100g'] ?? n['energy_100g'] ?? 0,
          protein_g: n.proteins_100g ?? 0,
          carbs_g: n.carbohydrates_100g ?? 0,
          fat_g: n.fat_100g ?? 0,
          fiber_g: n.fiber_100g ?? 0,
          sugar_g: n.sugars_100g ?? 0,
          sodium_mg: (n.sodium_100g ?? 0) * 1000,
        },
        quality_observations: `Scanned barcode: ${barcode}. ${ingredientList.length} ingredients listed.`,
        confidence: 1.0,
        search_key: (p.product_name ?? 'product').toLowerCase().split(' ')[0],
      };
    } else if (image) {
      // Strip data URL prefix if present
      const base64 = image.replace(/^data:image\/\w+;base64,/, '');
      identification = await identifyFoodFromImage(base64);
    } else {
      return NextResponse.json({ error: 'Provide image or barcode' }, { status: 400 });
    }

    const n = identification.estimated_nutrition_per_100g;
    const gradeResult = gradeFood(
      {
        calories: n.calories,
        protein_g: n.protein_g,
        carbs_g: n.carbs_g,
        fat_g: n.fat_g,
        fiber_g: n.fiber_g,
        sugar_g: n.sugar_g,
        sodium_mg: n.sodium_mg,
        serving_g: 100,
      },
      identification.category,
      ingredientList,
      identification.is_whole_food,
    );

    const hacks = getFoodHacks(identification.search_key ?? identification.food_name);
    const topHack = getTopHack(identification.search_key ?? identification.food_name);

    // Persist to scan history
    const scanRecord = await prisma.scanHistory.create({
      data: {
        foodName: identification.food_name,
        category: identification.category,
        scanType: barcode ? 'barcode' : 'vision',
        barcode: barcode ?? null,
        healthGrade: gradeResult.grade,
        gradeScore: gradeResult.score,
        calories: n.calories,
        protein: n.protein_g,
        carbs: n.carbs_g,
        fat: n.fat_g,
        fiber: n.fiber_g,
        qualityNote: identification.quality_observations,
        topHack,
      },
    });

    return NextResponse.json({
      id: scanRecord.id,
      foodName: identification.food_name,
      category: identification.category,
      healthGrade: gradeResult.grade,
      gradeScore: gradeResult.score,
      gradeLabel: gradeResult.label,
      gradeSummary: gradeResult.summary,
      badges: gradeResult.badges,
      nutrition: n,
      hacks,
      qualityNote: identification.quality_observations,
      confidence: identification.confidence,
    });
  } catch (err) {
    console.error('[SCAN API]', err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Scan failed' },
      { status: 500 },
    );
  }
}

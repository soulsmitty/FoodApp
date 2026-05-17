import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { generateRecipes } from '@/lib/ai/claude';

export async function GET() {
  const [pantryItems, goalsRecord] = await Promise.all([
    prisma.pantryItem.findMany({
      where: { userId: 'warrior-king', quantity: { gt: 0 } },
      select: { name: true, quantity: true, unit: true },
    }),
    prisma.macroGoals.findUnique({ where: { userId: 'warrior-king' } }),
  ]);

  if (pantryItems.length === 0) {
    return NextResponse.json({ recipes: [], message: 'Add items to your pantry first' });
  }

  const goals = goalsRecord ?? { calories: 2800, protein: 200, carbs: 250, fat: 80 };
  const ingredientNames = pantryItems.map((i) => i.name);

  try {
    const recipes = await generateRecipes(ingredientNames, {
      calories: goals.calories,
      protein: goals.protein,
      carbs: goals.carbs,
      fat: goals.fat,
    });
    return NextResponse.json({ recipes });
  } catch (err) {
    console.error('[RECIPES API]', err);
    return NextResponse.json({ error: 'Failed to generate recipes' }, { status: 500 });
  }
}

export type Grade = 'S' | 'A' | 'B' | 'C' | 'D' | 'F';

export interface NutritionInput {
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  fiber_g: number;
  sugar_g: number;
  sodium_mg: number;
  serving_g?: number;
}

export interface GradeResult {
  grade: Grade;
  score: number;
  label: string;
  summary: string;
  badges: GradeBadge[];
}

export interface GradeBadge {
  label: string;
  type: 'positive' | 'negative' | 'neutral';
}

const BAD_INGREDIENTS = [
  'canola oil', 'soybean oil', 'sunflower oil', 'safflower oil', 'corn oil',
  'vegetable oil', 'hydrogenated', 'partially hydrogenated', 'trans fat',
  'high fructose corn syrup', 'hfcs', 'corn syrup', 'maltodextrin',
  'sodium benzoate', 'potassium bromate', 'bha', 'bht', 'tbhq',
  'artificial flavor', 'artificial color', 'red 40', 'yellow 5', 'blue 1',
  'carrageenan', 'monosodium glutamate', 'msg', 'aspartame', 'sucralose',
  'acesulfame', 'saccharin', 'enriched flour', 'bleached flour',
];

const GOOD_INGREDIENTS = [
  'grass-fed', 'pasture-raised', 'wild-caught', 'organic', 'extra virgin olive oil',
  'coconut oil', 'avocado oil', 'ghee', 'butter', 'sea salt', 'himalayan salt',
  'apple cider vinegar', 'raw honey', 'maple syrup',
];

// Whole food categories that start at higher base scores
const WHOLE_FOOD_BASES: Record<string, number> = {
  seafood: 92,
  meat: 85,
  egg: 90,
  dairy: 78,
  legume: 80,
  nut: 82,
  produce: 88,
  grain: 68,
  packaged: 60,
  other: 65,
};

export function gradeFood(
  nutrition: NutritionInput,
  category: string = 'other',
  ingredients: string[] = [],
  isWholeFood: boolean = false,
): GradeResult {
  const serving = nutrition.serving_g ?? 100;
  const per100 = (val: number) => (val / serving) * 100;

  const protein100 = per100(nutrition.protein_g);
  const sugar100 = per100(nutrition.sugar_g);
  const fiber100 = per100(nutrition.fiber_g);
  const fat100 = per100(nutrition.fat_g);
  const sodium100 = per100(nutrition.sodium_mg);
  const cal100 = per100(nutrition.calories);

  const cat = category.toLowerCase();
  let score = WHOLE_FOOD_BASES[cat] ?? 65;
  const badges: GradeBadge[] = [];

  // ── Protein score (Warrior King Rule #1: protein priority) ──
  if (protein100 >= 25) {
    score += 15;
    badges.push({ label: 'High Protein', type: 'positive' });
  } else if (protein100 >= 15) {
    score += 8;
    badges.push({ label: 'Good Protein', type: 'positive' });
  } else if (protein100 >= 8) {
    score += 3;
  } else if (protein100 < 2 && cat !== 'produce' && cat !== 'grain') {
    score -= 5;
  }

  // ── Sugar score (Warrior King Rule #2: glycemic control) ──
  if (sugar100 > 30) {
    score -= 30;
    badges.push({ label: 'High Sugar', type: 'negative' });
  } else if (sugar100 > 20) {
    score -= 20;
    badges.push({ label: 'Elevated Sugar', type: 'negative' });
  } else if (sugar100 > 12) {
    score -= 10;
  } else if (sugar100 <= 5) {
    score += 5;
    badges.push({ label: 'Low Sugar', type: 'positive' });
  }

  // ── Fiber (digestive health) ──
  if (fiber100 >= 8) {
    score += 10;
    badges.push({ label: 'High Fiber', type: 'positive' });
  } else if (fiber100 >= 4) {
    score += 5;
  }

  // ── Sodium (cardiovascular) ──
  if (sodium100 > 600) {
    score -= 15;
    badges.push({ label: 'High Sodium', type: 'negative' });
  } else if (sodium100 > 300) {
    score -= 7;
  }

  // ── Ingredient quality (Warrior King Rule #3: clean ingredients) ──
  if (ingredients.length > 0) {
    const ingredientText = ingredients.join(' ').toLowerCase();

    let badCount = 0;
    for (const bad of BAD_INGREDIENTS) {
      if (ingredientText.includes(bad)) {
        score -= 12;
        badCount++;
        if (badCount === 1) badges.push({ label: 'Inflammatory Oils', type: 'negative' });
        if (bad.includes('hydrogenated')) badges.push({ label: 'Trans Fats', type: 'negative' });
        if (bad.includes('artificial')) badges.push({ label: 'Artificial Additives', type: 'negative' });
        if (bad.includes('high fructose')) badges.push({ label: 'HFCS', type: 'negative' });
      }
    }

    let goodCount = 0;
    for (const good of GOOD_INGREDIENTS) {
      if (ingredientText.includes(good)) {
        score += 5;
        goodCount++;
      }
    }
    if (goodCount > 0) badges.push({ label: 'Quality Fats', type: 'positive' });

    // Ingredient count (clean label)
    if (ingredients.length <= 3) {
      score += 12;
      badges.push({ label: 'Ultra Clean Label', type: 'positive' });
    } else if (ingredients.length <= 5) {
      score += 6;
      badges.push({ label: 'Clean Label', type: 'positive' });
    } else if (ingredients.length > 15) {
      score -= 15;
      badges.push({ label: 'Ultra-Processed', type: 'negative' });
    } else if (ingredients.length > 10) {
      score -= 8;
      badges.push({ label: 'Processed', type: 'negative' });
    }
  } else if (isWholeFood) {
    score += 10;
    badges.push({ label: 'Whole Food', type: 'positive' });
  }

  // ── Category-specific bonuses ──
  if (cat === 'seafood') badges.push({ label: 'Omega-3 Rich', type: 'positive' });
  if (cat === 'produce' && fiber100 >= 2) badges.push({ label: 'Micronutrient Dense', type: 'positive' });

  // Clamp score
  score = Math.max(0, Math.min(110, score));

  const grade = scoreToGrade(score);
  const label = gradeLabel(grade);
  const summary = gradeSummary(grade, protein100, sugar100);

  return { grade, score, label, summary, badges: dedupeBadges(badges) };
}

function scoreToGrade(score: number): Grade {
  if (score >= 92) return 'S';
  if (score >= 80) return 'A';
  if (score >= 68) return 'B';
  if (score >= 55) return 'C';
  if (score >= 40) return 'D';
  return 'F';
}

function gradeLabel(grade: Grade): string {
  const labels: Record<Grade, string> = {
    S: 'Optimal',
    A: 'Excellent',
    B: 'Good',
    C: 'Acceptable',
    D: 'Poor',
    F: 'Avoid',
  };
  return labels[grade];
}

function gradeSummary(grade: Grade, protein100: number, sugar100: number): string {
  if (grade === 'S') return 'Elite-tier fuel. Perfectly aligned with Warrior King nutrition principles.';
  if (grade === 'A') return 'Excellent choice. High quality, supports your performance and recovery goals.';
  if (grade === 'B') return 'Solid food. A good regular option — nothing to be concerned about.';
  if (grade === 'C') return 'Acceptable. Fine occasionally, but not a staple for peak performance.';
  if (grade === 'D') return 'Poor quality. Inflammatory or highly processed. Minimize consumption.';
  return 'Avoid. This food actively works against your goals. Find a better alternative.';
}

function dedupeBadges(badges: GradeBadge[]): GradeBadge[] {
  const seen = new Set<string>();
  return badges.filter((b) => {
    if (seen.has(b.label)) return false;
    seen.add(b.label);
    return true;
  });
}

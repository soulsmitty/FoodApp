interface Nutrition {
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  fiber_g: number;
  sugar_g: number;
  sodium_mg: number;
}

interface NutritionCardProps {
  nutrition: Nutrition;
  servingLabel?: string;
}

function NutritionRow({
  label,
  value,
  unit,
  highlight,
}: {
  label: string;
  value: number;
  unit: string;
  highlight?: boolean;
}) {
  return (
    <div className={`flex justify-between items-center py-2 border-b border-brand-border last:border-0 ${highlight ? 'text-brand-gold' : 'text-zinc-300'}`}>
      <span className="text-sm">{label}</span>
      <span className={`text-sm font-semibold font-mono ${highlight ? 'text-brand-gold' : ''}`}>
        {value.toFixed(1)}{unit}
      </span>
    </div>
  );
}

export function NutritionCard({ nutrition, servingLabel = 'per 100g' }: NutritionCardProps) {
  return (
    <div className="glass-card p-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold text-zinc-200">Nutrition Facts</h3>
        <span className="text-xs text-zinc-500">{servingLabel}</span>
      </div>

      {/* Calories — prominent */}
      <div className="flex justify-between items-center py-3 mb-2 border-b-2 border-brand-border">
        <span className="font-bold text-zinc-100">Calories</span>
        <span className="font-bold text-xl text-brand-gold font-mono">{Math.round(nutrition.calories)}</span>
      </div>

      <NutritionRow label="Protein" value={nutrition.protein_g} unit="g" highlight />
      <NutritionRow label="Total Carbs" value={nutrition.carbs_g} unit="g" />
      <NutritionRow label="  — Sugar" value={nutrition.sugar_g} unit="g" />
      <NutritionRow label="Total Fat" value={nutrition.fat_g} unit="g" />
      <NutritionRow label="Fiber" value={nutrition.fiber_g} unit="g" />
      <NutritionRow label="Sodium" value={nutrition.sodium_mg} unit="mg" />
    </div>
  );
}

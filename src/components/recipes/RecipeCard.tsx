'use client';
import { useState } from 'react';
import { Clock, ChevronDown, ChevronUp, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { gradeColor, gradeBg, cn } from '@/lib/utils';
import type { RecipeSuggestion } from '@/lib/ai/claude';

interface Props {
  recipe: RecipeSuggestion;
  index: number;
}

export function RecipeCard({ recipe, index }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="glass-card p-5 space-y-4 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="font-bold text-zinc-100">{recipe.name}</h3>
          <p className="text-xs text-zinc-500 mt-0.5">{recipe.description}</p>
        </div>
        <div className={cn('grade-ring w-10 h-10 text-base flex-shrink-0', gradeColor(recipe.health_grade), gradeBg(recipe.health_grade))}>
          {recipe.health_grade}
        </div>
      </div>

      {/* Warrior rating */}
      <div className="flex items-center gap-1.5">
        <Zap className="w-3.5 h-3.5 text-brand-gold" />
        <span className="text-xs text-brand-gold font-semibold">{recipe.warrior_rating}</span>
        <span className="text-zinc-700 mx-1">·</span>
        <Clock className="w-3.5 h-3.5 text-zinc-500" />
        <span className="text-xs text-zinc-500">
          {recipe.prep_time_min + recipe.cook_time_min} min total
        </span>
      </div>

      {/* Macros */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: 'Cals', value: Math.round(recipe.macros.calories), unit: '' },
          { label: 'Protein', value: Math.round(recipe.macros.protein_g), unit: 'g' },
          { label: 'Carbs', value: Math.round(recipe.macros.carbs_g), unit: 'g' },
          { label: 'Fat', value: Math.round(recipe.macros.fat_g), unit: 'g' },
        ].map(({ label, value, unit }) => (
          <div key={label} className="bg-brand-surface border border-brand-border rounded-lg p-2 text-center">
            <p className="text-xs text-zinc-500">{label}</p>
            <p className="text-sm font-bold text-zinc-100">{value}{unit}</p>
          </div>
        ))}
      </div>

      {/* Expand toggle */}
      <button
        onClick={() => setExpanded((e) => !e)}
        className="w-full flex items-center justify-between text-xs text-zinc-500 hover:text-zinc-300 transition-colors"
      >
        <span>{expanded ? 'Hide' : 'Show'} recipe details</span>
        {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {expanded && (
        <div className="space-y-4 animate-fade-in">
          <div>
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Ingredients</h4>
            <div className="space-y-1">
              {recipe.ingredients.map((ing, i) => (
                <div key={i} className="flex justify-between text-xs text-zinc-300">
                  <span>{ing.item}</span>
                  <span className="text-zinc-500">{ing.amount}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Instructions</h4>
            <ol className="space-y-2">
              {recipe.steps.map((step, i) => (
                <li key={i} className="flex gap-2 text-xs text-zinc-400">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-500/20 text-brand-gold font-bold flex items-center justify-center text-xs">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}

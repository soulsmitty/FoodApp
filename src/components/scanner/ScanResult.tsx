'use client';
import { useState } from 'react';
import { ShoppingBasket, BarChart3, AlertTriangle, Lightbulb, Shield, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HealthGrade } from '@/components/nutrition/HealthGrade';
import { NutritionCard } from '@/components/nutrition/NutritionCard';
import type { ScanResult } from '@/store/useScanStore';
import { usePantryStore } from '@/store/usePantryStore';
import { useMacroStore } from '@/store/useMacroStore';

interface Props {
  result: ScanResult;
  onClose: () => void;
}

type Tab = 'grade' | 'nutrition' | 'hacks';

export function ScanResult({ result, onClose }: Props) {
  const [tab, setTab] = useState<Tab>('grade');
  const [added, setAdded] = useState(false);
  const [logged, setLogged] = useState(false);
  const addItem = usePantryStore((s) => s.addItem);
  const logFood = useMacroStore((s) => s.logFood);

  async function handleAddToPantry() {
    await addItem({
      name: result.foodName,
      category: result.category,
      quantity: 1,
      unit: 'item',
      healthGrade: result.healthGrade,
      gradeScore: result.gradeScore,
      calories: result.nutrition.calories,
      protein: result.nutrition.protein_g,
      carbs: result.nutrition.carbs_g,
      fat: result.nutrition.fat_g,
      fiber: result.nutrition.fiber_g,
    });
    setAdded(true);
  }

  async function handleLogFood() {
    await logFood({
      foodName: result.foodName,
      category: result.category,
      mealType: 'snack',
      servingSize: 100,
      servingUnit: 'g',
      calories: result.nutrition.calories,
      protein: result.nutrition.protein_g,
      carbs: result.nutrition.carbs_g,
      fat: result.nutrition.fat_g,
      fiber: result.nutrition.fiber_g,
      healthGrade: result.healthGrade,
    });
    setLogged(true);
  }

  const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: 'grade', label: 'Grade', icon: Shield },
    { id: 'nutrition', label: 'Nutrition', icon: BarChart3 },
    { id: 'hacks', label: 'Hacks', icon: Lightbulb },
  ];

  return (
    <div className="animate-slide-up glass-card p-5 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold text-zinc-100">{result.foodName}</h2>
          <p className="text-xs text-zinc-500 capitalize">{result.category} · {Math.round(result.confidence * 100)}% confidence</p>
        </div>
        <button onClick={onClose} className="text-zinc-500 hover:text-zinc-300 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-brand-surface rounded-xl">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
              tab === id
                ? 'bg-brand-card text-brand-gold shadow'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Icon className="w-3.5 h-3.5" />
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div>
        {tab === 'grade' && (
          <div className="space-y-3">
            <HealthGrade
              grade={result.healthGrade}
              score={result.gradeScore}
              label={result.gradeLabel}
              summary={result.gradeSummary}
              badges={result.badges}
            />
            {result.qualityNote && (
              <div className="flex gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                <span className="text-blue-400 text-sm">👁</span>
                <p className="text-xs text-blue-300">{result.qualityNote}</p>
              </div>
            )}
          </div>
        )}

        {tab === 'nutrition' && <NutritionCard nutrition={result.nutrition} />}

        {tab === 'hacks' && result.hacks && (
          <div className="space-y-3">
            {result.hacks.warnings.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5" /> Critical Warnings
                </h4>
                {result.hacks.warnings.map((w, i) => (
                  <p key={i} className="text-xs text-zinc-300 bg-red-500/10 border border-red-500/20 rounded-lg p-2.5">
                    {w}
                  </p>
                ))}
              </div>
            )}

            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-brand-gold uppercase tracking-wider">Storage</h4>
              {result.hacks.storage.map((s, i) => (
                <p key={i} className="text-xs text-zinc-400 flex gap-2">
                  <span className="text-brand-gold mt-0.5">›</span> {s}
                </p>
              ))}
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-green-400 uppercase tracking-wider">Preservation</h4>
              {result.hacks.preservation.map((p, i) => (
                <p key={i} className="text-xs text-zinc-400 flex gap-2">
                  <span className="text-green-400 mt-0.5">›</span> {p}
                </p>
              ))}
            </div>

            {result.hacks.proTips.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Pro Tips</h4>
                {result.hacks.proTips.map((t, i) => (
                  <p key={i} className="text-xs text-zinc-400 flex gap-2">
                    <span className="text-blue-400 mt-0.5">›</span> {t}
                  </p>
                ))}
              </div>
            )}

            {result.hacks.shelfLife && (
              <div className="grid grid-cols-3 gap-2 mt-2">
                {Object.entries(result.hacks.shelfLife).map(([loc, life]) => (
                  <div key={loc} className="bg-brand-surface border border-brand-border rounded-lg p-2 text-center">
                    <p className="text-xs text-zinc-500 capitalize">{loc}</p>
                    <p className="text-xs font-semibold text-zinc-200 mt-0.5 leading-tight">{life}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'hacks' && !result.hacks && (
          <p className="text-sm text-zinc-500 text-center py-6">No specific hacks available for this item yet.</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-1">
        <Button
          variant="gold"
          className="flex-1"
          onClick={handleAddToPantry}
          disabled={added}
        >
          <ShoppingBasket className="w-4 h-4" />
          {added ? 'In Pantry ✓' : 'Add to Pantry'}
        </Button>
        <Button
          variant="outline"
          className="flex-1"
          onClick={handleLogFood}
          disabled={logged}
        >
          <BarChart3 className="w-4 h-4" />
          {logged ? 'Logged ✓' : 'Log Macros'}
        </Button>
      </div>
    </div>
  );
}

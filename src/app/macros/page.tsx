'use client';
import { useEffect, useState } from 'react';
import { BarChart3, Trash2, Settings, Check, X } from 'lucide-react';
import { useMacroStore } from '@/store/useMacroStore';
import { MacroBar, MacroRing } from '@/components/nutrition/MacroRing';
import { Button } from '@/components/ui/button';
import { gradeColor, gradeBg, cn } from '@/lib/utils';

const MEAL_TYPES = ['breakfast', 'lunch', 'dinner', 'snack'] as const;

export default function MacrosPage() {
  const { goals, todayLog, fetchToday, removeEntry, updateGoals, totals, isLoading } = useMacroStore();
  const [showGoals, setShowGoals] = useState(false);
  const [draft, setDraft] = useState(goals);

  useEffect(() => { fetchToday(); }, [fetchToday]);
  useEffect(() => { setDraft(goals); }, [goals]);

  const t = totals();

  async function saveGoals() {
    await updateGoals(draft);
    setShowGoals(false);
  }

  const grouped = MEAL_TYPES.reduce<Record<string, typeof todayLog>>((acc, meal) => {
    acc[meal] = todayLog.filter((e) => e.mealType === meal);
    return acc;
  }, {} as Record<string, typeof todayLog>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-brand-gold" /> Macro Tracker
          </h1>
          <p className="text-sm text-zinc-500 mt-1">Today's nutrition breakdown</p>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setShowGoals((s) => !s)}>
          <Settings className="w-4 h-4" />
        </Button>
      </div>

      {/* Goals editor */}
      {showGoals && (
        <div className="glass-card p-5 space-y-4 animate-slide-up">
          <h3 className="font-semibold text-zinc-100">Daily Goals</h3>
          {(['calories', 'protein', 'carbs', 'fat', 'fiber'] as const).map((key) => (
            <div key={key} className="flex items-center gap-3">
              <label className="text-sm text-zinc-400 w-20 capitalize">{key}</label>
              <input
                type="number"
                value={draft[key]}
                onChange={(e) => setDraft((d) => ({ ...d, [key]: Number(e.target.value) }))}
                className="flex-1 bg-brand-surface border border-brand-border rounded-lg px-3 py-2 text-sm text-zinc-100 font-mono focus:outline-none focus:border-amber-500/50"
              />
              <span className="text-xs text-zinc-600 w-6">{key === 'calories' ? 'kcal' : 'g'}</span>
            </div>
          ))}
          <div className="flex gap-2">
            <Button variant="gold" size="sm" className="flex-1" onClick={saveGoals}>
              <Check className="w-3.5 h-3.5" /> Save
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setShowGoals(false)}>
              <X className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      )}

      {/* Macro rings */}
      <div className="glass-card p-5">
        <div className="flex justify-center gap-6 mb-5">
          <MacroRing label="Protein" current={t.protein} goal={goals.protein} unit="g" color="#F59E0B" />
          <MacroRing label="Carbs" current={t.carbs} goal={goals.carbs} unit="g" color="#3B82F6" />
          <MacroRing label="Fat" current={t.fat} goal={goals.fat} unit="g" color="#A855F7" />
          <MacroRing label="Fiber" current={t.fiber} goal={goals.fiber} unit="g" color="#22C55E" />
        </div>

        {/* Calorie total */}
        <div className="text-center py-3 border-t border-brand-border">
          <span className="text-3xl font-bold text-brand-gold font-mono">{Math.round(t.calories)}</span>
          <span className="text-zinc-500 text-sm ml-1">/ {goals.calories} kcal</span>
        </div>

        <div className="space-y-3 mt-4">
          <MacroBar label="Protein" current={t.protein} goal={goals.protein} unit="g" colorClass="bg-amber-500" />
          <MacroBar label="Carbs" current={t.carbs} goal={goals.carbs} unit="g" colorClass="bg-blue-500" />
          <MacroBar label="Fat" current={t.fat} goal={goals.fat} unit="g" colorClass="bg-purple-500" />
          <MacroBar label="Fiber" current={t.fiber} goal={goals.fiber} unit="g" colorClass="bg-green-500" />
        </div>
      </div>

      {/* Food log by meal */}
      {MEAL_TYPES.map((meal) => {
        const entries = grouped[meal];
        if (entries.length === 0) return null;
        return (
          <div key={meal} className="space-y-2">
            <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider capitalize">{meal}</h2>
            <div className="glass-card divide-y divide-brand-border">
              {entries.map((entry) => (
                <div key={entry.id} className="flex items-center gap-3 p-3">
                  <div className={cn(
                    'w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border flex-shrink-0',
                    gradeColor(entry.healthGrade),
                    gradeBg(entry.healthGrade),
                  )}>
                    {entry.healthGrade}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-zinc-200 truncate">{entry.foodName}</p>
                    <p className="text-xs text-zinc-500 font-mono">
                      {Math.round(entry.calories)} kcal · {Math.round(entry.protein)}P · {Math.round(entry.carbs)}C · {Math.round(entry.fat)}F
                    </p>
                  </div>
                  <button
                    onClick={() => removeEntry(entry.id)}
                    className="text-zinc-700 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {todayLog.length === 0 && (
        <div className="glass-card p-10 text-center">
          <BarChart3 className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
          <p className="text-zinc-500 text-sm">Nothing logged yet today.</p>
          <p className="text-xs text-zinc-600 mt-1">Scan food and tap "Log Macros" to track.</p>
        </div>
      )}
    </div>
  );
}

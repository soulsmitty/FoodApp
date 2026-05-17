'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { ScanLine, ShoppingBasket, BarChart3, ChefHat, TrendingUp, Flame } from 'lucide-react';
import { MacroBar } from '@/components/nutrition/MacroRing';
import { useMacroStore } from '@/store/useMacroStore';
import { usePantryStore } from '@/store/usePantryStore';
import { gradeColor, gradeBg, cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export default function Dashboard() {
  const { goals, todayLog, fetchToday, totals } = useMacroStore();
  const { items, fetchItems } = usePantryStore();

  useEffect(() => {
    fetchToday();
    fetchItems();
  }, [fetchToday, fetchItems]);

  const t = totals();
  const recentGrades = todayLog.slice(-5).map((e) => e.healthGrade);

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div>
        <p className="text-xs text-zinc-600 uppercase tracking-widest">{today}</p>
        <h1 className="text-3xl font-bold text-gradient-gold mt-1">Warrior King</h1>
        <p className="text-zinc-500 text-sm mt-1">Nutrition OS — Eat like a champion.</p>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3">
        <Link href="/scanner" className="glass-card p-4 hover:border-amber-500/30 transition-all group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center group-hover:bg-amber-500/25 transition-colors">
              <ScanLine className="w-5 h-5 text-brand-gold" />
            </div>
            <div>
              <p className="font-semibold text-zinc-100 text-sm">Scan Food</p>
              <p className="text-xs text-zinc-500">AI Vision + Barcode</p>
            </div>
          </div>
        </Link>

        <Link href="/recipes" className="glass-card p-4 hover:border-amber-500/30 transition-all group">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-500/15 flex items-center justify-center group-hover:bg-green-500/25 transition-colors">
              <ChefHat className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <p className="font-semibold text-zinc-100 text-sm">Recipes</p>
              <p className="text-xs text-zinc-500">From your pantry</p>
            </div>
          </div>
        </Link>
      </div>

      {/* Daily macros */}
      <div className="glass-card p-5 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-zinc-100 flex items-center gap-2">
            <Flame className="w-4 h-4 text-brand-gold" /> Daily Macros
          </h2>
          <Link href="/macros" className="text-xs text-zinc-500 hover:text-brand-gold transition-colors">
            View all →
          </Link>
        </div>

        <div className="flex justify-between items-end">
          <div>
            <p className="text-4xl font-bold text-brand-gold font-mono">{Math.round(t.calories)}</p>
            <p className="text-xs text-zinc-500">of {goals.calories} kcal</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-bold text-zinc-100 font-mono">{Math.round(t.protein)}g</p>
            <p className="text-xs text-zinc-500">protein / {goals.protein}g goal</p>
          </div>
        </div>

        <div className="space-y-3">
          <MacroBar label="Protein" current={t.protein} goal={goals.protein} unit="g" colorClass="bg-amber-500" />
          <MacroBar label="Carbs" current={t.carbs} goal={goals.carbs} unit="g" colorClass="bg-blue-500" />
          <MacroBar label="Fat" current={t.fat} goal={goals.fat} unit="g" colorClass="bg-purple-500" />
          <MacroBar label="Fiber" current={t.fiber} goal={goals.fiber} unit="g" colorClass="bg-green-500" />
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-bold text-zinc-100">{items.length}</p>
          <p className="text-xs text-zinc-500 mt-1">Pantry Items</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-bold text-zinc-100">{todayLog.length}</p>
          <p className="text-xs text-zinc-500 mt-1">Foods Logged</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-bold text-green-400">{Math.round(t.protein)}g</p>
          <p className="text-xs text-zinc-500 mt-1">Protein Today</p>
        </div>
      </div>

      {/* Recent food grades */}
      {todayLog.length > 0 && (
        <div className="glass-card p-5">
          <h2 className="font-semibold text-zinc-100 mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-brand-gold" /> Today's Foods
          </h2>
          <div className="space-y-2">
            {todayLog.slice(-6).reverse().map((entry) => (
              <div key={entry.id} className="flex items-center justify-between py-2 border-b border-brand-border last:border-0">
                <div>
                  <p className="text-sm font-medium text-zinc-200">{entry.foodName}</p>
                  <p className="text-xs text-zinc-600 capitalize">{entry.mealType} · {Math.round(entry.calories)} kcal</p>
                </div>
                <div className={cn(
                  'w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold border',
                  gradeColor(entry.healthGrade),
                  gradeBg(entry.healthGrade),
                )}>
                  {entry.healthGrade}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {todayLog.length === 0 && (
        <div className="glass-card p-8 text-center">
          <ScanLine className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
          <p className="text-zinc-500 text-sm">No foods logged today.</p>
          <Link href="/scanner" className="text-xs text-brand-gold hover:underline mt-1 inline-block">
            Start scanning →
          </Link>
        </div>
      )}
    </div>
  );
}

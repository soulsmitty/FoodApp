'use client';
import { useEffect, useState } from 'react';
import { ShoppingBasket, Trash2, Plus, Minus, Search } from 'lucide-react';
import { usePantryStore } from '@/store/usePantryStore';
import { gradeColor, gradeBg, cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const CATEGORY_ICONS: Record<string, string> = {
  produce: '🥦', meat: '🥩', seafood: '🐟', dairy: '🥛',
  packaged: '📦', grain: '🌾', nut: '🥜', legume: '🫘',
  egg: '🥚', other: '🍽',
};

export default function PantryPage() {
  const { items, fetchItems, removeItem, updateQuantity, isLoading } = usePantryStore();
  const [search, setSearch] = useState('');

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const filtered = items.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase()),
  );

  const grouped = filtered.reduce<Record<string, typeof filtered>>((acc, item) => {
    const cat = item.category ?? 'other';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
            <ShoppingBasket className="w-6 h-6 text-brand-gold" /> Pantry
          </h1>
          <p className="text-sm text-zinc-500 mt-1">{items.length} items tracked</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
        <input
          type="text"
          placeholder="Search pantry..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-brand-surface border border-brand-border rounded-xl pl-9 pr-4 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50"
        />
      </div>

      {isLoading && (
        <div className="space-y-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-16 rounded-xl bg-brand-surface animate-pulse" />
          ))}
        </div>
      )}

      {!isLoading && items.length === 0 && (
        <div className="glass-card p-10 text-center">
          <ShoppingBasket className="w-10 h-10 text-zinc-700 mx-auto mb-3" />
          <p className="text-zinc-500 text-sm">Your pantry is empty.</p>
          <p className="text-xs text-zinc-600 mt-1">Scan food to add it here.</p>
        </div>
      )}

      {Object.entries(grouped).map(([category, categoryItems]) => (
        <div key={category} className="space-y-2">
          <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
            <span>{CATEGORY_ICONS[category] ?? '🍽'}</span>
            {category}
            <span className="text-zinc-700">({categoryItems.length})</span>
          </h2>

          <div className="space-y-2">
            {categoryItems.map((item) => (
              <div key={item.id} className="glass-card p-4 flex items-center gap-4">
                {/* Grade */}
                <div className={cn(
                  'w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold border flex-shrink-0',
                  gradeColor(item.healthGrade),
                  gradeBg(item.healthGrade),
                )}>
                  {item.healthGrade}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-zinc-100 text-sm truncate">{item.name}</p>
                  <p className="text-xs text-zinc-500">
                    {Math.round(item.calories)} kcal · {Math.round(item.protein)}g protein
                  </p>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => item.quantity > 1 && updateQuantity(item.id, item.quantity - 1)}
                    className="w-6 h-6 rounded-md bg-brand-surface border border-brand-border text-zinc-400 hover:text-zinc-100 flex items-center justify-center transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-sm font-mono text-zinc-200 w-6 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-6 h-6 rounded-md bg-brand-surface border border-brand-border text-zinc-400 hover:text-zinc-100 flex items-center justify-center transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-zinc-600 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

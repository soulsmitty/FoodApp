'use client';
import { useState } from 'react';
import { ChefHat, Loader2, RefreshCw, ShoppingBasket } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RecipeCard } from '@/components/recipes/RecipeCard';
import type { RecipeSuggestion } from '@/lib/ai/claude';

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<RecipeSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generated, setGenerated] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function generate() {
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const res = await fetch('/api/recipes');
      const data = await res.json();

      if (data.message) {
        setMessage(data.message);
        return;
      }
      if (!res.ok) throw new Error(data.error ?? 'Failed to generate recipes');

      setRecipes(data.recipes ?? []);
      setGenerated(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
          <ChefHat className="w-6 h-6 text-brand-gold" /> Recipe Engine
        </h1>
        <p className="text-sm text-zinc-500 mt-1">
          AI generates high-protein meals from exactly what's in your pantry.
        </p>
      </div>

      {message && (
        <div className="glass-card p-6 text-center space-y-3">
          <ShoppingBasket className="w-10 h-10 text-zinc-700 mx-auto" />
          <p className="text-zinc-400 text-sm">{message}</p>
          <Link href="/pantry">
            <Button variant="gold" size="sm">Go to Pantry →</Button>
          </Link>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/25 rounded-xl text-sm text-red-300">
          {error}
        </div>
      )}

      {!generated && !message && (
        <div className="glass-card p-8 text-center space-y-4">
          <ChefHat className="w-14 h-14 text-brand-gold/40 mx-auto" />
          <div>
            <p className="text-zinc-300 font-semibold">Ready to cook?</p>
            <p className="text-zinc-500 text-sm mt-1">
              Claude AI will analyze your pantry and create 3 Warrior King meals optimized for your macro goals.
            </p>
          </div>
          <Button variant="gold" size="lg" onClick={generate} disabled={loading} className="mx-auto">
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Generating recipes...
              </>
            ) : (
              <>
                <ChefHat className="w-4 h-4" /> Generate Recipes
              </>
            )}
          </Button>
        </div>
      )}

      {recipes.length > 0 && (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm text-zinc-500">{recipes.length} recipes generated from your pantry</p>
            <Button variant="ghost" size="sm" onClick={generate} disabled={loading}>
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Regenerate
            </Button>
          </div>

          <div className="space-y-4">
            {recipes.map((recipe, i) => (
              <RecipeCard key={i} recipe={recipe} index={i} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

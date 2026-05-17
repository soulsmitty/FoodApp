'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ScanLine, ShoppingBasket, BarChart3, ChefHat, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const LINKS = [
  { href: '/', label: 'Dashboard', icon: Zap },
  { href: '/scanner', label: 'Scanner', icon: ScanLine },
  { href: '/pantry', label: 'Pantry', icon: ShoppingBasket },
  { href: '/macros', label: 'Macros', icon: BarChart3 },
  { href: '/recipes', label: 'Recipes', icon: ChefHat },
];

export function Navbar() {
  const path = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-brand-surface border-r border-brand-border px-4 py-8 fixed left-0 top-0 z-40">
        <div className="mb-10 px-2">
          <h1 className="text-xl font-bold text-gradient-gold tracking-tight">WARRIOR KING</h1>
          <p className="text-xs text-zinc-600 mt-0.5 tracking-widest uppercase">Nutrition OS</p>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {LINKS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'nav-link',
                path === href && 'active',
              )}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto px-2 py-4 rounded-xl bg-amber-500/8 border border-amber-500/15">
          <p className="text-xs text-amber-500/80 font-medium">Warrior King Mode</p>
          <p className="text-xs text-zinc-500 mt-0.5">High-performance nutrition tracking</p>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-brand-surface border-t border-brand-border">
        <div className="flex items-center justify-around h-16 px-2">
          {LINKS.map(({ href, label, icon: Icon }) => {
            const active = path === href;
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all',
                  active ? 'text-brand-gold' : 'text-zinc-500 hover:text-zinc-300',
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

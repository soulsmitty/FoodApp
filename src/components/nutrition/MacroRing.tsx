'use client';
import { macroPercent } from '@/lib/utils';

interface MacroRingProps {
  label: string;
  current: number;
  goal: number;
  unit?: string;
  color: string;
}

export function MacroRing({ label, current, goal, unit = 'g', color }: MacroRingProps) {
  const pct = macroPercent(current, goal);
  const r = 26;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-16 h-16">
        <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r={r} strokeWidth="5" fill="none" className="stroke-brand-muted" />
          <circle
            cx="32"
            cy="32"
            r={r}
            strokeWidth="5"
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            className="transition-all duration-700"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-zinc-200">{pct}%</span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-xs text-zinc-500">{label}</p>
        <p className="text-xs font-semibold text-zinc-200">
          {Math.round(current)}<span className="text-zinc-500">/{goal}{unit}</span>
        </p>
      </div>
    </div>
  );
}

interface MacroBarProps {
  label: string;
  current: number;
  goal: number;
  unit?: string;
  colorClass: string;
}

export function MacroBar({ label, current, goal, unit = 'g', colorClass }: MacroBarProps) {
  const pct = macroPercent(current, goal);
  const isOver = current > goal;

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-xs">
        <span className="text-zinc-400">{label}</span>
        <span className={`font-mono font-semibold ${isOver ? 'text-red-400' : 'text-zinc-200'}`}>
          {Math.round(current)}<span className="text-zinc-500">/{goal}{unit}</span>
        </span>
      </div>
      <div className="h-2 rounded-full bg-brand-muted overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${isOver ? 'bg-red-500' : colorClass}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function todayString(): string {
  return new Date().toISOString().split('T')[0];
}

export function truncate(str: string, len: number): string {
  return str.length > len ? str.slice(0, len) + '…' : str;
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function gradeColor(grade: string): string {
  const map: Record<string, string> = {
    S: 'text-brand-gold',
    A: 'text-green-400',
    B: 'text-lime-400',
    C: 'text-yellow-400',
    D: 'text-orange-400',
    F: 'text-red-500',
  };
  return map[grade] ?? 'text-zinc-400';
}

export function gradeBg(grade: string): string {
  const map: Record<string, string> = {
    S: 'bg-amber-500/20 border-amber-500/40',
    A: 'bg-green-500/20 border-green-500/40',
    B: 'bg-lime-500/20 border-lime-500/40',
    C: 'bg-yellow-500/20 border-yellow-500/40',
    D: 'bg-orange-500/20 border-orange-500/40',
    F: 'bg-red-500/20 border-red-500/40',
  };
  return map[grade] ?? 'bg-zinc-500/20 border-zinc-500/40';
}

export function macroPercent(current: number, goal: number): number {
  if (goal === 0) return 0;
  return Math.min(Math.round((current / goal) * 100), 100);
}

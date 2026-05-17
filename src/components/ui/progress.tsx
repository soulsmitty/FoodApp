import { cn } from '@/lib/utils';

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  barClassName?: string;
  showLabel?: boolean;
}

export function Progress({ value, max = 100, className, barClassName, showLabel }: ProgressProps) {
  const pct = Math.min(Math.round((value / max) * 100), 100);
  const isOver = value > max;

  return (
    <div className={cn('h-2 rounded-full bg-brand-muted overflow-hidden', className)}>
      <div
        className={cn(
          'h-full rounded-full transition-all duration-500',
          isOver ? 'bg-red-500' : 'bg-amber-500',
          barClassName,
        )}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  type?: 'positive' | 'negative' | 'neutral' | 'gold';
  className?: string;
}

export function Badge({ children, type = 'neutral', className }: BadgeProps) {
  const styles = {
    positive: 'bg-green-500/15 text-green-400 border-green-500/25',
    negative: 'bg-red-500/15 text-red-400 border-red-500/25',
    neutral: 'bg-zinc-500/15 text-zinc-400 border-zinc-500/25',
    gold: 'bg-amber-500/15 text-amber-400 border-amber-500/25',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border',
        styles[type],
        className,
      )}
    >
      {children}
    </span>
  );
}

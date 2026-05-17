import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50',
  {
    variants: {
      variant: {
        gold: 'bg-gradient-to-r from-amber-500 to-amber-400 text-black hover:from-amber-400 hover:to-amber-300 shadow-lg shadow-amber-500/20',
        outline: 'border border-brand-border bg-transparent text-zinc-200 hover:bg-white/5 hover:border-zinc-500',
        ghost: 'bg-transparent text-zinc-400 hover:bg-white/5 hover:text-zinc-100',
        danger: 'bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500/30',
        surface: 'bg-brand-card border border-brand-border text-zinc-200 hover:border-zinc-600',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: { variant: 'surface', size: 'md' },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  ),
);
Button.displayName = 'Button';

export { Button, buttonVariants };

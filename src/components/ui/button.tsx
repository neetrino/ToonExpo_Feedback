import { cva, type VariantProps } from 'class-variance-authority';
import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold tracking-wide transition-[background-color,color,transform,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 motion-reduce:transition-none touch-manipulation',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground hover:bg-secondary active:scale-[0.98] motion-reduce:active:scale-100',
        secondary:
          'border border-input bg-card text-foreground hover:bg-muted active:scale-[0.98] motion-reduce:active:scale-100',
        gold: 'bg-highlight text-primary hover:bg-[#e6c200] active:scale-[0.98] motion-reduce:active:scale-100',
      },
      size: {
        default: 'min-h-12 px-5 py-3',
        lg: 'min-h-12 px-8 py-3.5',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, type = 'button', ...props }: ButtonProps) {
  return (
    <button type={type} className={cn(buttonVariants({ variant, size, className }))} {...props} />
  );
}

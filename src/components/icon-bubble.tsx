import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function IconBubble({
  children,
  tone = 'accent',
  className,
}: {
  children: ReactNode;
  tone?: 'accent' | 'secondary' | 'gold' | 'success';
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex size-11 shrink-0 items-center justify-center rounded-2xl',
        tone === 'accent' && 'bg-accent/15 text-accent',
        tone === 'secondary' && 'bg-secondary/15 text-secondary',
        tone === 'gold' && 'bg-highlight/30 text-primary',
        tone === 'success' && 'bg-success/15 text-success',
        className,
      )}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

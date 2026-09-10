import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function PageHero({
  kicker,
  title,
  intro,
  icon,
  align = 'start',
}: {
  kicker: string;
  title: string;
  intro?: string;
  icon?: ReactNode;
  align?: 'start' | 'center';
}) {
  const centered = align === 'center';

  return (
    <div className={cn('landing-card-enter', centered && 'text-center')}>
      {icon ? (
        <div className={cn('mb-4', centered && 'flex justify-center')} aria-hidden="true">
          {icon}
        </div>
      ) : null}
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">{kicker}</p>
      <h1 className="mt-3 font-display text-[1.7rem] font-bold leading-tight tracking-tight sm:text-4xl">
        {title}
      </h1>
      {intro ? (
        <p
          className={cn(
            'mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-foreground sm:text-base',
            centered && 'mx-auto',
          )}
        >
          {intro}
        </p>
      ) : null}
      <div
        className={cn('mt-5 h-1 w-12 rounded-full bg-highlight', centered && 'mx-auto')}
        aria-hidden="true"
      />
    </div>
  );
}

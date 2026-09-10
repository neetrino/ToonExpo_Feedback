'use client';

import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';

/**
 * Multi-step survey chrome: progress bar and sticky mobile actions.
 */
type FormWizardProps = {
  current: number;
  total: number;
  isSubmitting: boolean;
  isLast: boolean;
  onBack: () => void;
  onNext: () => void;
  children: ReactNode;
};

export function FormWizard({
  current,
  total,
  isSubmitting,
  isLast,
  onBack,
  onNext,
  children,
}: FormWizardProps) {
  const t = useTranslations('common');
  const progressPercent = (current / total) * 100;
  const isFirst = current === 1;

  return (
    <div className="scroll-mt-24">
      <div className="mb-7 space-y-3">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            {t('step', { current, total })}
          </p>
          <span className="text-xs font-semibold tabular-nums text-accent">{current}</span>
        </div>
        <div
          className="relative h-2 overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin={1}
          aria-valuemax={total}
          aria-label={t('step', { current, total })}
        >
          <div
            className="wizard-progress-fill absolute inset-y-0 left-0 rounded-full bg-accent"
            style={{ width: `${progressPercent}%` }}
          />
          <div
            className="wizard-progress-fill absolute top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-highlight"
            style={{ left: `calc(${progressPercent}% - 5px)` }}
            aria-hidden="true"
          />
        </div>
      </div>

      <div key={current} className="wizard-step-panel space-y-6">
        {children}
      </div>

      <div className="pointer-events-none h-24 md:hidden" aria-hidden="true" />

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border bg-card/95 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-md md:static md:mt-10 md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none">
        <div className="mx-auto flex max-w-3xl gap-3">
          <Button
            type="button"
            variant="secondary"
            className="min-w-24 flex-1 md:flex-none"
            onClick={onBack}
            disabled={isSubmitting || isFirst}
          >
            {t('prev')}
          </Button>
          {isLast ? (
            <Button
              type="submit"
              variant="gold"
              size="lg"
              className="flex-[2]"
              disabled={isSubmitting}
            >
              {isSubmitting ? t('sending') : t('submit')}
            </Button>
          ) : (
            <Button
              type="button"
              size="lg"
              className="flex-[2]"
              onClick={onNext}
              disabled={isSubmitting}
            >
              {t('next')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

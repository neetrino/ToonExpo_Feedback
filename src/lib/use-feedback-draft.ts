'use client';

import { useEffect, type ReactNode } from 'react';
import { useSyncExternalStore } from 'react';
import type { FieldValues, UseFormReturn } from 'react-hook-form';
import { saveFeedbackDraft } from '@/lib/feedback-draft';

function emptySubscribe(): () => void {
  return () => undefined;
}

export function useIsClient(): boolean {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

export function ClientDraftGate({ children }: { children: ReactNode }) {
  const isClient = useIsClient();
  if (!isClient) {
    return (
      <div
        className="min-h-80 rounded-3xl border border-border bg-card p-5 sm:p-8"
        aria-busy="true"
      />
    );
  }
  return children;
}

export function usePersistFeedbackDraft<T extends FieldValues>({
  key,
  step,
  form,
  locale,
}: {
  key: string;
  step: number;
  form: UseFormReturn<T>;
  locale: 'hy' | 'ru';
}): void {
  useEffect(() => {
    function persist(values: T) {
      saveFeedbackDraft(key, step, { ...values, locale, website: '' } as T);
    }

    persist(form.getValues());
    const subscription = form.watch((values) => {
      persist(values as T);
    });
    return () => subscription.unsubscribe();
  }, [form, key, locale, step]);
}

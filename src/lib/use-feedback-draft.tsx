'use client';

import { useEffect, useSyncExternalStore, type ReactNode } from 'react';
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

type DraftWatch = (callback: (values: unknown) => void) => { unsubscribe: () => void };

export function usePersistFeedbackDraft({
  key,
  step,
  locale,
  getValues,
  watch,
}: {
  key: string;
  step: number;
  locale: 'hy' | 'ru';
  getValues: () => unknown;
  watch: DraftWatch;
}): void {
  useEffect(() => {
    function persist(values: unknown) {
      const record = values && typeof values === 'object' ? values : {};
      saveFeedbackDraft(key, step, { ...record, locale, website: '' });
    }

    persist(getValues());
    const subscription = watch((values) => {
      persist(values);
    });
    return () => subscription.unsubscribe();
  }, [getValues, key, locale, step, watch]);
}

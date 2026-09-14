'use client';

import { useEffect, useSyncExternalStore, type ReactNode } from 'react';
import { saveFeedbackDraft } from '@/lib/feedback-draft';

function emptySubscribe(): () => void {
  return () => undefined;
}

export function useIsClient(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
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

type DraftForm = {
  getValues(): unknown;
  watch(callback: (values: unknown) => void): { unsubscribe: () => void };
};

export function usePersistFeedbackDraft({
  key,
  step,
  locale,
  form,
}: {
  key: string;
  step: number;
  locale: 'hy' | 'ru';
  form: DraftForm;
}): void {
  useEffect(() => {
    function persist(values: unknown) {
      const record = values && typeof values === 'object' ? values : {};
      saveFeedbackDraft(key, step, { ...record, locale, website: '' });
    }

    persist(form.getValues());
    const subscription = form.watch((values) => {
      persist(values);
    });
    return () => subscription.unsubscribe();
  }, [form, key, locale, step]);
}

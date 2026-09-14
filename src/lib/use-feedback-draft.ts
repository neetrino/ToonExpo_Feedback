'use client';

import { useEffect, useRef, useState } from 'react';
import type { FieldValues, UseFormReturn } from 'react-hook-form';
import {
  clearFeedbackDraft,
  loadFeedbackDraft,
  mergeDraftValues,
  saveFeedbackDraft,
} from '@/lib/feedback-draft';

type UseFeedbackDraftOptions<T extends FieldValues> = {
  key: string;
  stepCount: number;
  form: UseFormReturn<T>;
  locale: 'hy' | 'ru';
};

export function useFeedbackDraft<T extends FieldValues>({
  key,
  stepCount,
  form,
  locale,
}: UseFeedbackDraftOptions<T>): {
  step: number;
  setStep: (value: number | ((current: number) => number)) => void;
  bootstrapped: boolean;
  clearDraft: () => void;
} {
  const [step, setStep] = useState(0);
  const [bootstrapped, setBootstrapped] = useState(false);
  const formRef = useRef(form);
  formRef.current = form;

  useEffect(() => {
    const currentForm = formRef.current;
    const draft = loadFeedbackDraft<T>(key, stepCount);
    if (draft) {
      currentForm.reset(mergeDraftValues(currentForm.getValues(), draft.values, locale));
      setStep(draft.step);
    }
    setBootstrapped(true);
  }, [key, stepCount, locale]);

  useEffect(() => {
    if (!bootstrapped) {
      return;
    }

    function persist(values: T) {
      saveFeedbackDraft(key, step, { ...values, locale, website: '' } as T);
    }

    persist(form.getValues());
    const subscription = form.watch((values) => {
      persist(values as T);
    });
    return () => subscription.unsubscribe();
  }, [bootstrapped, step, key, locale, form]);

  return {
    step,
    setStep,
    bootstrapped,
    clearDraft: () => {
      clearFeedbackDraft(key);
    },
  };
}

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { Controller, useForm, useWatch, type FieldPath } from 'react-hook-form';
import { QuestionBlock, TextAreaField, TextField } from '@/components/form-fields';
import { OptionCheckboxGroup, OptionRadioGroup } from '@/components/form-option-groups';
import { FormWizard } from '@/components/form-wizard';
import { useRouter } from '@/i18n/navigation';
import {
  MOTIVATION_KEYS,
  NO_VISIT_REASON_KEYS,
  PROPERTY_RELEVANCE_KEYS,
  VOL2_PLAN_KEYS,
  WOULD_INCREASE_KEYS,
  isVol2PlanWithNote,
  type MotivationKey,
  type WouldIncreaseKey,
} from '@/lib/feedback-options';
import { missedPayloadSchema, type MissedFormValues } from '@/lib/feedback-schema';

const MISSED_STEP_FIELDS: FieldPath<MissedFormValues>[][] = [
  ['firstName', 'lastName', 'email', 'phone'],
  ['answers.noVisitReason', 'answers.noVisitOther'],
  ['answers.wouldIncrease', 'answers.wouldIncreaseOther', 'answers.propertyRelevance'],
  [
    'answers.vol2Plan',
    'answers.vol2Factor',
    'answers.vol2Motivation',
    'answers.vol2MotivationOther',
  ],
];

export function MissedForm() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitError, setSubmitError] = useState(false);

  const form = useForm<MissedFormValues>({
    resolver: zodResolver(missedPayloadSchema),
    defaultValues: {
      audience: 'MISSED',
      locale: locale === 'ru' ? 'ru' : 'hy',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      website: '',
      answers: {
        noVisitOther: '',
        wouldIncrease: [],
        wouldIncreaseOther: '',
        vol2Factor: '',
        vol2Motivation: [],
        vol2MotivationOther: '',
      },
    },
  });

  const reason = useWatch({ control: form.control, name: 'answers.noVisitReason' });
  const increase = useWatch({ control: form.control, name: 'answers.wouldIncrease' }) ?? [];
  const vol2Plan = useWatch({ control: form.control, name: 'answers.vol2Plan' });
  const motivation = useWatch({ control: form.control, name: 'answers.vol2Motivation' }) ?? [];

  function toggleIncrease(value: WouldIncreaseKey) {
    const current = form.getValues('answers.wouldIncrease') ?? [];
    const next = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
    form.setValue('answers.wouldIncrease', next, { shouldValidate: true });
  }

  function toggleMotivation(value: MotivationKey) {
    const current = form.getValues('answers.vol2Motivation') ?? [];
    const next = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
    form.setValue('answers.vol2Motivation', next, { shouldValidate: true });
  }

  async function goNext() {
    const valid = await form.trigger(MISSED_STEP_FIELDS[step], { shouldFocus: true });
    if (!valid) {
      return;
    }
    setStep((current) => current + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function goBack() {
    setStep((current) => Math.max(0, current - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function onSubmit(values: MissedFormValues) {
    setSubmitError(false);
    const response = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    if (!response.ok) {
      setSubmitError(true);
      return;
    }
    router.push('/thanks');
  }

  const lastIndex = MISSED_STEP_FIELDS.length - 1;

  return (
    <form
      className="rounded-3xl border border-border bg-card p-5 shadow-[0_8px_32px_rgba(0,48,61,0.08)] sm:p-8"
      onSubmit={(event) => {
        event.preventDefault();
        if (step < lastIndex) {
          void goNext();
          return;
        }
        void form.handleSubmit(onSubmit)(event);
      }}
      noValidate
    >
      <FormWizard
        current={step + 1}
        total={MISSED_STEP_FIELDS.length}
        isSubmitting={form.formState.isSubmitting}
        isLast={step === lastIndex}
        onBack={goBack}
        onNext={() => {
          void goNext();
        }}
      >
        {step === 0 ? (
          <section className="grid gap-4 sm:grid-cols-2">
            <h2 className="sm:col-span-2 font-display text-xl font-semibold">
              {t('contact.title')}
            </h2>
            <TextField
              label={t('contact.firstName')}
              autoComplete="given-name"
              registration={form.register('firstName')}
              error={form.formState.errors.firstName}
            />
            <TextField
              label={t('contact.lastName')}
              autoComplete="family-name"
              registration={form.register('lastName')}
              error={form.formState.errors.lastName}
            />
            <TextField
              label={t('contact.email')}
              type="email"
              inputMode="email"
              autoComplete="email"
              registration={form.register('email')}
              error={form.formState.errors.email}
            />
            <TextField
              label={t('contact.phone')}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+374…"
              registration={form.register('phone')}
              error={form.formState.errors.phone}
            />
            <input
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              {...form.register('website')}
            />
          </section>
        ) : null}

        {step === 1 ? (
          <>
            <Controller
              control={form.control}
              name="answers.noVisitReason"
              render={({ field, fieldState }) => (
                <QuestionBlock legend={t('missed.q1')} error={fieldState.error}>
                  <OptionRadioGroup
                    name="noVisitReason"
                    options={NO_VISIT_REASON_KEYS}
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    error={Boolean(fieldState.error)}
                    getLabel={(key) => t(`missed.reasons.${key}`)}
                  />
                </QuestionBlock>
              )}
            />
            {reason === 'other' ? (
              <TextAreaField
                label={t('missed.reasonOther')}
                registration={form.register('answers.noVisitOther')}
                error={form.formState.errors.answers?.noVisitOther}
              />
            ) : null}
          </>
        ) : null}

        {step === 2 ? (
          <>
            <QuestionBlock
              legend={t('missed.q2')}
              error={form.formState.errors.answers?.wouldIncrease}
            >
              <OptionCheckboxGroup
                name="wouldIncrease"
                options={WOULD_INCREASE_KEYS}
                values={increase}
                onToggle={toggleIncrease}
                error={Boolean(form.formState.errors.answers?.wouldIncrease)}
                getLabel={(key) => t(`missed.wouldIncrease.${key}`)}
              />
            </QuestionBlock>
            {increase.includes('other') ? (
              <TextAreaField
                label={t('missed.wouldIncreaseOther')}
                registration={form.register('answers.wouldIncreaseOther')}
                error={form.formState.errors.answers?.wouldIncreaseOther}
              />
            ) : null}
            <Controller
              control={form.control}
              name="answers.propertyRelevance"
              render={({ field, fieldState }) => (
                <QuestionBlock legend={t('missed.q3')} error={fieldState.error}>
                  <OptionRadioGroup
                    name="propertyRelevance"
                    options={PROPERTY_RELEVANCE_KEYS}
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    error={Boolean(fieldState.error)}
                    getLabel={(key) => t(`missed.relevance.${key}`)}
                  />
                </QuestionBlock>
              )}
            />
          </>
        ) : null}

        {step === 3 ? (
          <>
            <Controller
              control={form.control}
              name="answers.vol2Plan"
              render={({ field, fieldState }) => (
                <QuestionBlock legend={t('missed.q4')} error={fieldState.error}>
                  <OptionRadioGroup
                    name="vol2Plan"
                    options={VOL2_PLAN_KEYS}
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    error={Boolean(fieldState.error)}
                    getLabel={(key) => t(`missed.vol2Plan.${key}`)}
                  />
                </QuestionBlock>
              )}
            />
            {isVol2PlanWithNote(vol2Plan) ? (
              <TextAreaField
                label={t(`missed.vol2Factor.${vol2Plan}`)}
                registration={form.register('answers.vol2Factor')}
                error={form.formState.errors.answers?.vol2Factor}
              />
            ) : null}
            <QuestionBlock
              legend={t('missed.q5')}
              error={form.formState.errors.answers?.vol2Motivation}
            >
              <OptionCheckboxGroup
                name="vol2Motivation"
                options={MOTIVATION_KEYS}
                values={motivation}
                onToggle={toggleMotivation}
                error={Boolean(form.formState.errors.answers?.vol2Motivation)}
                getLabel={(key) => t(`missed.motivation.${key}`)}
              />
            </QuestionBlock>
            {motivation.includes('other') ? (
              <TextAreaField
                label={t('missed.motivationOther')}
                registration={form.register('answers.vol2MotivationOther')}
                error={form.formState.errors.answers?.vol2MotivationOther}
              />
            ) : null}
          </>
        ) : null}

        {submitError ? <p className="text-sm text-destructive">{t('errors.submit')}</p> : null}
      </FormWizard>
    </form>
  );
}

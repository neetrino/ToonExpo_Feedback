'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { CheckboxGroup, SelectField, TextAreaField, TextField } from '@/components/form-fields';
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

export function MissedForm() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
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

  return (
    <form
      className="space-y-8"
      onSubmit={(event) => {
        event.preventDefault();
        void form.handleSubmit(onSubmit)(event);
      }}
      noValidate
    >
      <section className="grid gap-4 rounded-2xl border border-border bg-card p-5 sm:grid-cols-2">
        <h2 className="sm:col-span-2 font-display text-xl font-semibold">{t('contact.title')}</h2>
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
          autoComplete="email"
          registration={form.register('email')}
          error={form.formState.errors.email}
        />
        <TextField
          label={t('contact.phone')}
          type="tel"
          autoComplete="tel"
          registration={form.register('phone')}
          error={form.formState.errors.phone}
        />
        <input className="hidden" tabIndex={-1} autoComplete="off" {...form.register('website')} />
      </section>

      <Controller
        control={form.control}
        name="answers.noVisitReason"
        render={({ field, fieldState }) => (
          <SelectField
            label={t('missed.q1')}
            options={NO_VISIT_REASON_KEYS}
            value={field.value ?? ''}
            onChange={field.onChange}
            error={fieldState.error}
            optionLabel={(key) => t(`missed.reasons.${key}`)}
            placeholder={t('common.select')}
          />
        )}
      />
      {reason === 'other' ? (
        <TextAreaField
          label={t('missed.reasonOther')}
          registration={form.register('answers.noVisitOther')}
          error={form.formState.errors.answers?.noVisitOther}
        />
      ) : null}

      <CheckboxGroup
        label={t('missed.q2')}
        options={WOULD_INCREASE_KEYS}
        values={increase}
        onToggle={toggleIncrease}
        error={form.formState.errors.answers?.wouldIncrease}
        optionLabel={(key) => t(`missed.wouldIncrease.${key}`)}
      />
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
          <SelectField
            label={t('missed.q3')}
            options={PROPERTY_RELEVANCE_KEYS}
            value={field.value ?? ''}
            onChange={field.onChange}
            error={fieldState.error}
            optionLabel={(key) => t(`missed.relevance.${key}`)}
            placeholder={t('common.select')}
          />
        )}
      />

      <Controller
        control={form.control}
        name="answers.vol2Plan"
        render={({ field, fieldState }) => (
          <SelectField
            label={t('missed.q4')}
            options={VOL2_PLAN_KEYS}
            value={field.value ?? ''}
            onChange={field.onChange}
            error={fieldState.error}
            optionLabel={(key) => t(`missed.vol2Plan.${key}`)}
            placeholder={t('common.select')}
          />
        )}
      />
      {isVol2PlanWithNote(vol2Plan) ? (
        <TextAreaField
          label={t(`missed.vol2Factor.${vol2Plan}`)}
          registration={form.register('answers.vol2Factor')}
          error={form.formState.errors.answers?.vol2Factor}
        />
      ) : null}

      <CheckboxGroup
        label={t('missed.q5')}
        options={MOTIVATION_KEYS}
        values={motivation}
        onToggle={toggleMotivation}
        error={form.formState.errors.answers?.vol2Motivation}
        optionLabel={(key) => t(`missed.motivation.${key}`)}
      />
      {motivation.includes('other') ? (
        <TextAreaField
          label={t('missed.motivationOther')}
          registration={form.register('answers.vol2MotivationOther')}
          error={form.formState.errors.answers?.vol2MotivationOther}
        />
      ) : null}

      {submitError ? <p className="text-sm text-destructive">{t('errors.submit')}</p> : null}

      <Button type="submit" variant="gold" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? t('common.sending') : t('common.submit')}
      </Button>
    </form>
  );
}

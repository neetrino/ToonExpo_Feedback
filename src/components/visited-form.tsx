'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  CheckboxGroup,
  ScoreField,
  SelectField,
  TextAreaField,
  TextField,
} from '@/components/form-fields';
import { useRouter } from '@/i18n/navigation';
import {
  B2B_OUTCOME_KEYS,
  GOAL_KEYS,
  PROBLEM_KEYS,
  PROPERTY_OUTCOME_KEYS,
  VOL2_PLAN_KEYS,
  WANT_KEYS,
  isVol2PlanWithNote,
  showsB2bQuestion,
  showsPropertyQuestion,
  type GoalKey,
  type ProblemKey,
  type WantKey,
} from '@/lib/feedback-options';
import { visitedPayloadSchema, type VisitedFormValues } from '@/lib/feedback-schema';

export function VisitedForm() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [submitError, setSubmitError] = useState(false);

  const form = useForm<VisitedFormValues>({
    resolver: zodResolver(visitedPayloadSchema),
    defaultValues: {
      audience: 'VISITED',
      locale: locale === 'ru' ? 'ru' : 'hy',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      website: '',
      answers: {
        problems: [],
        problemsOrgDetail: '',
        visitGoals: [],
        visitGoalsOther: '',
        propertyDetail: '',
        b2bDetail: '',
        expectationsImprove: '',
        vol2Factor: '',
        vol2Wants: [],
        vol2WantsOther: '',
      },
    },
  });

  const problems = useWatch({ control: form.control, name: 'answers.problems' }) ?? [];
  const goals = useWatch({ control: form.control, name: 'answers.visitGoals' }) ?? [];
  const propertyOutcome = useWatch({ control: form.control, name: 'answers.propertyOutcome' });
  const b2bOutcome = useWatch({ control: form.control, name: 'answers.b2bOutcome' });
  const expectationsScore = useWatch({
    control: form.control,
    name: 'answers.expectationsScore',
  });
  const vol2Plan = useWatch({ control: form.control, name: 'answers.vol2Plan' });
  const wants = useWatch({ control: form.control, name: 'answers.vol2Wants' }) ?? [];

  function toggleProblem(value: ProblemKey) {
    const current = form.getValues('answers.problems') ?? [];
    if (value === 'no_problems') {
      form.setValue('answers.problems', current.includes(value) ? [] : ['no_problems'], {
        shouldValidate: true,
      });
      return;
    }
    const withoutNone = current.filter((item) => item !== 'no_problems');
    const next = withoutNone.includes(value)
      ? withoutNone.filter((item) => item !== value)
      : [...withoutNone, value];
    form.setValue('answers.problems', next, { shouldValidate: true });
  }

  function toggleGoal(value: GoalKey) {
    const current = form.getValues('answers.visitGoals') ?? [];
    const next = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
    form.setValue('answers.visitGoals', next, { shouldValidate: true });
  }

  function toggleWant(value: WantKey) {
    const current = form.getValues('answers.vol2Wants') ?? [];
    const next = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];
    form.setValue('answers.vol2Wants', next, { shouldValidate: true });
  }

  async function onSubmit(values: VisitedFormValues) {
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

      <CheckboxGroup
        label={t('visited.q1')}
        options={PROBLEM_KEYS}
        values={problems}
        onToggle={toggleProblem}
        error={form.formState.errors.answers?.problems}
        optionLabel={(key) => t(`visited.problems.${key}`)}
      />
      {problems.includes('org_issues') ? (
        <TextAreaField
          label={t('visited.problemsOrgDetail')}
          registration={form.register('answers.problemsOrgDetail')}
          error={form.formState.errors.answers?.problemsOrgDetail}
        />
      ) : null}

      <CheckboxGroup
        label={t('visited.q2')}
        options={GOAL_KEYS}
        values={goals}
        onToggle={toggleGoal}
        error={form.formState.errors.answers?.visitGoals}
        optionLabel={(key) => t(`visited.goals.${key}`)}
      />
      {goals.includes('other') ? (
        <TextAreaField
          label={t('visited.goalsOther')}
          registration={form.register('answers.visitGoalsOther')}
          error={form.formState.errors.answers?.visitGoalsOther}
        />
      ) : null}

      {showsPropertyQuestion(goals) ? (
        <>
          <Controller
            control={form.control}
            name="answers.propertyOutcome"
            render={({ field, fieldState }) => (
              <SelectField
                label={t('visited.q3Property')}
                options={PROPERTY_OUTCOME_KEYS}
                value={field.value ?? ''}
                onChange={field.onChange}
                error={fieldState.error}
                optionLabel={(key) => t(`visited.propertyOutcome.${key}`)}
                placeholder={t('common.select')}
              />
            )}
          />
          {propertyOutcome ? (
            <TextAreaField
              label={t(`visited.propertyDetail.${propertyOutcome}`)}
              registration={form.register('answers.propertyDetail')}
              error={form.formState.errors.answers?.propertyDetail}
            />
          ) : null}
        </>
      ) : null}

      {showsB2bQuestion(goals) ? (
        <>
          <Controller
            control={form.control}
            name="answers.b2bOutcome"
            render={({ field, fieldState }) => (
              <SelectField
                label={t('visited.q3B2b')}
                options={B2B_OUTCOME_KEYS}
                value={field.value ?? ''}
                onChange={field.onChange}
                error={fieldState.error}
                optionLabel={(key) => t(`visited.b2bOutcome.${key}`)}
                placeholder={t('common.select')}
              />
            )}
          />
          {b2bOutcome && b2bOutcome !== 'contacts_only' ? (
            <TextAreaField
              label={t(`visited.b2bDetail.${b2bOutcome}`)}
              registration={form.register('answers.b2bDetail')}
              error={form.formState.errors.answers?.b2bDetail}
            />
          ) : null}
        </>
      ) : null}

      <Controller
        control={form.control}
        name="answers.expectationsScore"
        render={({ field, fieldState }) => (
          <ScoreField
            label={t('visited.q4')}
            low={t('visited.q4Low')}
            high={t('visited.q4High')}
            value={field.value}
            onChange={field.onChange}
            error={fieldState.error}
          />
        )}
      />
      {typeof expectationsScore === 'number' && expectationsScore <= 6 ? (
        <TextAreaField
          label={t('visited.expectationsImprove')}
          registration={form.register('answers.expectationsImprove')}
          error={form.formState.errors.answers?.expectationsImprove}
        />
      ) : null}

      <Controller
        control={form.control}
        name="answers.recommendScore"
        render={({ field, fieldState }) => (
          <ScoreField
            label={t('visited.q5')}
            low={t('visited.q5Low')}
            high={t('visited.q5High')}
            value={field.value}
            onChange={field.onChange}
            error={fieldState.error}
          />
        )}
      />

      <Controller
        control={form.control}
        name="answers.vol2Plan"
        render={({ field, fieldState }) => (
          <SelectField
            label={t('visited.q6')}
            options={VOL2_PLAN_KEYS}
            value={field.value ?? ''}
            onChange={field.onChange}
            error={fieldState.error}
            optionLabel={(key) => t(`visited.vol2Plan.${key}`)}
            placeholder={t('common.select')}
          />
        )}
      />
      {isVol2PlanWithNote(vol2Plan) ? (
        <TextAreaField
          label={t(`visited.vol2Factor.${vol2Plan}`)}
          registration={form.register('answers.vol2Factor')}
          error={form.formState.errors.answers?.vol2Factor}
        />
      ) : null}

      <CheckboxGroup
        label={t('visited.q7')}
        options={WANT_KEYS}
        values={wants}
        onToggle={toggleWant}
        error={form.formState.errors.answers?.vol2Wants}
        optionLabel={(key) => t(`visited.wants.${key}`)}
      />
      {wants.includes('other') ? (
        <TextAreaField
          label={t('visited.wantsOther')}
          registration={form.register('answers.vol2WantsOther')}
          error={form.formState.errors.answers?.vol2WantsOther}
        />
      ) : null}

      {submitError ? <p className="text-sm text-destructive">{t('errors.submit')}</p> : null}

      <Button type="submit" variant="gold" disabled={form.formState.isSubmitting}>
        {form.formState.isSubmitting ? t('common.sending') : t('common.submit')}
      </Button>
    </form>
  );
}

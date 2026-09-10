'use client';

import {
  Building2,
  CalendarDays,
  CircleAlert,
  Handshake,
  Mail,
  Phone,
  Sparkles,
  Target,
  User,
  UserRound,
} from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocale, useTranslations } from 'next-intl';
import { useState } from 'react';
import { Controller, useForm, useWatch, type FieldPath } from 'react-hook-form';
import { QuestionBlock, ScoreField, TextAreaField, TextField } from '@/components/form-fields';
import { OptionCheckboxGroup, OptionRadioGroup } from '@/components/form-option-groups';
import { FormWizard } from '@/components/form-wizard';
import { IconBubble } from '@/components/icon-bubble';
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

const VISITED_STEP_FIELDS: FieldPath<VisitedFormValues>[][] = [
  ['firstName', 'lastName', 'email', 'phone'],
  ['answers.problems', 'answers.problemsOrgDetail'],
  [
    'answers.visitGoals',
    'answers.visitGoalsOther',
    'answers.propertyOutcome',
    'answers.propertyDetail',
    'answers.b2bOutcome',
    'answers.b2bDetail',
  ],
  ['answers.expectationsScore', 'answers.expectationsImprove', 'answers.recommendScore'],
  ['answers.vol2Plan', 'answers.vol2Factor', 'answers.vol2Wants', 'answers.vol2WantsOther'],
];

export function VisitedForm() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const [step, setStep] = useState(0);
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

  async function goNext() {
    const valid = await form.trigger(VISITED_STEP_FIELDS[step], { shouldFocus: true });
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

  const lastIndex = VISITED_STEP_FIELDS.length - 1;

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
        total={VISITED_STEP_FIELDS.length}
        isSubmitting={form.formState.isSubmitting}
        isLast={step === lastIndex}
        onBack={goBack}
        onNext={() => {
          void goNext();
        }}
      >
        {step === 0 ? (
          <section className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2 flex items-center gap-3">
              <IconBubble>
                <UserRound className="size-5" />
              </IconBubble>
              <h2 className="font-display text-xl font-semibold">{t('contact.title')}</h2>
            </div>
            <TextField
              label={t('contact.firstName')}
              autoComplete="given-name"
              icon={<User className="size-4" />}
              registration={form.register('firstName')}
              error={form.formState.errors.firstName}
            />
            <TextField
              label={t('contact.lastName')}
              autoComplete="family-name"
              icon={<UserRound className="size-4" />}
              registration={form.register('lastName')}
              error={form.formState.errors.lastName}
            />
            <TextField
              label={t('contact.email')}
              type="email"
              inputMode="email"
              autoComplete="email"
              icon={<Mail className="size-4" />}
              registration={form.register('email')}
              error={form.formState.errors.email}
            />
            <TextField
              label={t('contact.phone')}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="+374…"
              icon={<Phone className="size-4" />}
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
            <QuestionBlock
              legend={t('visited.q1')}
              icon={<CircleAlert className="size-4" />}
              error={form.formState.errors.answers?.problems}
            >
              <OptionCheckboxGroup
                name="problems"
                options={PROBLEM_KEYS}
                values={problems}
                onToggle={toggleProblem}
                error={Boolean(form.formState.errors.answers?.problems)}
                getLabel={(key) => t(`visited.problems.${key}`)}
              />
            </QuestionBlock>
            {problems.includes('org_issues') ? (
              <TextAreaField
                label={t('visited.problemsOrgDetail')}
                registration={form.register('answers.problemsOrgDetail')}
                error={form.formState.errors.answers?.problemsOrgDetail}
              />
            ) : null}
          </>
        ) : null}

        {step === 2 ? (
          <>
            <QuestionBlock
              legend={t('visited.q2')}
              icon={<Target className="size-4" />}
              error={form.formState.errors.answers?.visitGoals}
            >
              <OptionCheckboxGroup
                name="visitGoals"
                options={GOAL_KEYS}
                values={goals}
                onToggle={toggleGoal}
                error={Boolean(form.formState.errors.answers?.visitGoals)}
                getLabel={(key) => t(`visited.goals.${key}`)}
              />
            </QuestionBlock>
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
                    <QuestionBlock
                      legend={t('visited.q3Property')}
                      icon={<Building2 className="size-4" />}
                      error={fieldState.error}
                    >
                      <OptionRadioGroup
                        name="propertyOutcome"
                        options={PROPERTY_OUTCOME_KEYS}
                        value={field.value ?? ''}
                        onChange={field.onChange}
                        error={Boolean(fieldState.error)}
                        getLabel={(key) => t(`visited.propertyOutcome.${key}`)}
                      />
                    </QuestionBlock>
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
                    <QuestionBlock
                      legend={t('visited.q3B2b')}
                      icon={<Handshake className="size-4" />}
                      error={fieldState.error}
                    >
                      <OptionRadioGroup
                        name="b2bOutcome"
                        options={B2B_OUTCOME_KEYS}
                        value={field.value ?? ''}
                        onChange={field.onChange}
                        error={Boolean(fieldState.error)}
                        getLabel={(key) => t(`visited.b2bOutcome.${key}`)}
                      />
                    </QuestionBlock>
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
          </>
        ) : null}

        {step === 3 ? (
          <>
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
          </>
        ) : null}

        {step === 4 ? (
          <>
            <Controller
              control={form.control}
              name="answers.vol2Plan"
              render={({ field, fieldState }) => (
                <QuestionBlock
                  legend={t('visited.q6')}
                  icon={<CalendarDays className="size-4" />}
                  error={fieldState.error}
                >
                  <OptionRadioGroup
                    name="vol2Plan"
                    options={VOL2_PLAN_KEYS}
                    value={field.value ?? ''}
                    onChange={field.onChange}
                    error={Boolean(fieldState.error)}
                    getLabel={(key) => t(`visited.vol2Plan.${key}`)}
                  />
                </QuestionBlock>
              )}
            />
            {isVol2PlanWithNote(vol2Plan) ? (
              <TextAreaField
                label={t(`visited.vol2Factor.${vol2Plan}`)}
                registration={form.register('answers.vol2Factor')}
                error={form.formState.errors.answers?.vol2Factor}
              />
            ) : null}
            <QuestionBlock
              legend={t('visited.q7')}
              icon={<Sparkles className="size-4" />}
              error={form.formState.errors.answers?.vol2Wants}
            >
              <OptionCheckboxGroup
                name="vol2Wants"
                options={WANT_KEYS}
                values={wants}
                onToggle={toggleWant}
                error={Boolean(form.formState.errors.answers?.vol2Wants)}
                getLabel={(key) => t(`visited.wants.${key}`)}
              />
            </QuestionBlock>
            {wants.includes('other') ? (
              <TextAreaField
                label={t('visited.wantsOther')}
                registration={form.register('answers.vol2WantsOther')}
                error={form.formState.errors.answers?.vol2WantsOther}
              />
            ) : null}
          </>
        ) : null}

        {submitError ? <p className="text-sm text-destructive">{t('errors.submit')}</p> : null}
      </FormWizard>
    </form>
  );
}

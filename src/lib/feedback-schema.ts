import { z } from 'zod';
import {
  B2B_OUTCOME_KEYS,
  GOAL_KEYS,
  MOTIVATION_KEYS,
  NO_VISIT_REASON_KEYS,
  PROBLEM_KEYS,
  PROPERTY_OUTCOME_KEYS,
  PROPERTY_RELEVANCE_KEYS,
  VOL2_PLAN_KEYS,
  VOL2_PLAN_WITH_NOTE,
  WANT_KEYS,
  WOULD_INCREASE_KEYS,
  showsB2bQuestion,
  showsPropertyQuestion,
} from '@/lib/feedback-options';
import { clipText, sanitizeFreeText } from '@/lib/normalize';

const localeSchema = z.enum(['hy', 'ru']);

const honeypotFields = {
  website: z.string().max(120).optional().default(''),
};

const freeText = z.string().max(500).optional().default('').transform(sanitizeFreeText);

function uniqueKeyArray<T extends readonly [string, ...string[]]>(keys: T) {
  return z
    .array(z.enum(keys))
    .min(1)
    .max(keys.length)
    .refine((items) => new Set(items).size === items.length, { message: 'duplicate' });
}

export const visitedAnswersSchema = z
  .object({
    problems: uniqueKeyArray(PROBLEM_KEYS),
    problemsOrgDetail: freeText,
    visitGoals: uniqueKeyArray(GOAL_KEYS),
    visitGoalsOther: freeText,
    propertyOutcome: z.enum(PROPERTY_OUTCOME_KEYS).optional(),
    propertyDetail: freeText,
    b2bOutcome: z.enum(B2B_OUTCOME_KEYS).optional(),
    b2bDetail: freeText,
    expectationsScore: z.number().int().min(1).max(10),
    expectationsImprove: freeText,
    recommendScore: z.number().int().min(1).max(10),
    vol2Plan: z.enum(VOL2_PLAN_KEYS),
    vol2Factor: freeText,
    vol2Wants: uniqueKeyArray(WANT_KEYS),
    vol2WantsOther: freeText,
  })
  .superRefine((value, ctx) => {
    if (value.problems.includes('no_problems') && value.problems.length > 1) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['problems'],
        message: 'no_problems_exclusive',
      });
    }
    if (value.problems.includes('org_issues') && clipText(value.problemsOrgDetail).length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['problemsOrgDetail'],
        message: 'required',
      });
    }
    if (value.visitGoals.includes('other') && clipText(value.visitGoalsOther).length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['visitGoalsOther'],
        message: 'required',
      });
    }
    const propertyVisible = showsPropertyQuestion(value.visitGoals);
    const b2bVisible = showsB2bQuestion(value.visitGoals);

    if (propertyVisible && !value.propertyOutcome) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['propertyOutcome'],
        message: 'required',
      });
    }
    if (propertyVisible && value.propertyOutcome && clipText(value.propertyDetail).length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['propertyDetail'],
        message: 'required',
      });
    }
    if (b2bVisible && !value.b2bOutcome) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['b2bOutcome'],
        message: 'required',
      });
    }
    if (
      b2bVisible &&
      (value.b2bOutcome === 'completed' ||
        value.b2bOutcome === 'in_progress' ||
        value.b2bOutcome === 'no') &&
      clipText(value.b2bDetail).length === 0
    ) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['b2bDetail'], message: 'required' });
    }
    if (value.expectationsScore <= 6 && clipText(value.expectationsImprove).length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['expectationsImprove'],
        message: 'required',
      });
    }
    if (
      (VOL2_PLAN_WITH_NOTE as readonly string[]).includes(value.vol2Plan) &&
      clipText(value.vol2Factor).length === 0
    ) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['vol2Factor'], message: 'required' });
    }
    if (value.vol2Wants.includes('other') && clipText(value.vol2WantsOther).length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['vol2WantsOther'],
        message: 'required',
      });
    }
  })
  .transform((value) => {
    const next = { ...value };
    if (!showsPropertyQuestion(next.visitGoals)) {
      next.propertyOutcome = undefined;
      next.propertyDetail = '';
    }
    if (!showsB2bQuestion(next.visitGoals)) {
      next.b2bOutcome = undefined;
      next.b2bDetail = '';
    }
    return next;
  });

export const missedAnswersSchema = z
  .object({
    noVisitReason: z.enum(NO_VISIT_REASON_KEYS),
    noVisitOther: freeText,
    wouldIncrease: uniqueKeyArray(WOULD_INCREASE_KEYS),
    wouldIncreaseOther: freeText,
    propertyRelevance: z.enum(PROPERTY_RELEVANCE_KEYS),
    vol2Plan: z.enum(VOL2_PLAN_KEYS),
    vol2Factor: freeText,
    vol2Motivation: uniqueKeyArray(MOTIVATION_KEYS),
    vol2MotivationOther: freeText,
  })
  .superRefine((value, ctx) => {
    if (value.noVisitReason === 'other' && clipText(value.noVisitOther).length === 0) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['noVisitOther'], message: 'required' });
    }
    if (value.wouldIncrease.includes('other') && clipText(value.wouldIncreaseOther).length === 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['wouldIncreaseOther'],
        message: 'required',
      });
    }
    if (
      (VOL2_PLAN_WITH_NOTE as readonly string[]).includes(value.vol2Plan) &&
      clipText(value.vol2Factor).length === 0
    ) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['vol2Factor'], message: 'required' });
    }
    if (
      value.vol2Motivation.includes('other') &&
      clipText(value.vol2MotivationOther).length === 0
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['vol2MotivationOther'],
        message: 'required',
      });
    }
  });

export const visitedPayloadSchema = z.object({
  audience: z.literal('VISITED'),
  locale: localeSchema,
  ...honeypotFields,
  answers: visitedAnswersSchema,
});

export const missedPayloadSchema = z.object({
  audience: z.literal('MISSED'),
  locale: localeSchema,
  ...honeypotFields,
  answers: missedAnswersSchema,
});

export const feedbackPayloadSchema = z.discriminatedUnion('audience', [
  visitedPayloadSchema,
  missedPayloadSchema,
]);

export type VisitedAnswers = z.infer<typeof visitedAnswersSchema>;
export type MissedAnswers = z.infer<typeof missedAnswersSchema>;
export type FeedbackPayload = z.infer<typeof feedbackPayloadSchema>;
export type VisitedFormValues = z.input<typeof visitedPayloadSchema>;
export type MissedFormValues = z.input<typeof missedPayloadSchema>;

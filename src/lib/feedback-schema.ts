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
import { clipName, clipText, normalizeEmail, normalizePhone } from '@/lib/normalize';

const localeSchema = z.enum(['hy', 'ru']);

const contactFields = {
  firstName: z.string().trim().min(1).max(80).transform(clipName),
  lastName: z.string().trim().min(1).max(80).transform(clipName),
  email: z.string().trim().email().max(120).transform(normalizeEmail),
  phone: z
    .string()
    .trim()
    .min(6)
    .max(32)
    .transform((value, ctx) => {
      try {
        return normalizePhone(value);
      } catch {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'invalid_phone' });
        return z.NEVER;
      }
    }),
  website: z.string().max(120).optional().default(''),
};

export const visitedAnswersSchema = z
  .object({
    problems: z.array(z.enum(PROBLEM_KEYS)).min(1),
    problemsOrgDetail: z.string().max(500).optional().default(''),
    visitGoals: z.array(z.enum(GOAL_KEYS)).min(1),
    visitGoalsOther: z.string().max(500).optional().default(''),
    propertyOutcome: z.enum(PROPERTY_OUTCOME_KEYS).optional(),
    propertyDetail: z.string().max(500).optional().default(''),
    b2bOutcome: z.enum(B2B_OUTCOME_KEYS).optional(),
    b2bDetail: z.string().max(500).optional().default(''),
    expectationsScore: z.number().int().min(1).max(10),
    expectationsImprove: z.string().max(500).optional().default(''),
    recommendScore: z.number().int().min(1).max(10),
    vol2Plan: z.enum(VOL2_PLAN_KEYS),
    vol2Factor: z.string().max(500).optional().default(''),
    vol2Wants: z.array(z.enum(WANT_KEYS)).min(1),
    vol2WantsOther: z.string().max(500).optional().default(''),
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
    noVisitOther: z.string().max(500).optional().default(''),
    wouldIncrease: z.array(z.enum(WOULD_INCREASE_KEYS)).min(1),
    wouldIncreaseOther: z.string().max(500).optional().default(''),
    propertyRelevance: z.enum(PROPERTY_RELEVANCE_KEYS),
    vol2Plan: z.enum(VOL2_PLAN_KEYS),
    vol2Factor: z.string().max(500).optional().default(''),
    vol2Motivation: z.array(z.enum(MOTIVATION_KEYS)).min(1),
    vol2MotivationOther: z.string().max(500).optional().default(''),
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
  ...contactFields,
  answers: visitedAnswersSchema,
});

export const missedPayloadSchema = z.object({
  audience: z.literal('MISSED'),
  locale: localeSchema,
  ...contactFields,
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

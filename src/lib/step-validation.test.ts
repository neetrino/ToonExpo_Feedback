import { describe, expect, it, vi } from 'vitest';
import { issuesForStep, validateWizardStep } from '@/lib/step-validation';
import { visitedPayloadSchema } from '@/lib/feedback-schema';

const visitedBase = {
  audience: 'VISITED' as const,
  locale: 'hy' as const,
  website: '',
  answers: {
    problems: ['parking'],
    problemsOrgDetail: '',
    visitGoals: ['market_research'],
    visitGoalsOther: '',
    expectationsScore: 8,
    expectationsImprove: '',
    recommendScore: 9,
    vol2Plan: 'yes' as const,
    vol2Factor: '',
    vol2Wants: ['consultation'],
    vol2WantsOther: '',
  },
};

const scoreFields = [
  'answers.expectationsScore',
  'answers.expectationsImprove',
  'answers.recommendScore',
] as const;

const lastStepFields = [
  'answers.vol2Plan',
  'answers.vol2Factor',
  'answers.vol2Wants',
  'answers.vol2WantsOther',
] as const;

describe('issuesForStep', () => {
  it('ignores last-step schema errors when checking the previous step', () => {
    const parsed = visitedPayloadSchema.safeParse({
      ...visitedBase,
      answers: { ...visitedBase.answers, vol2Plan: undefined, vol2Wants: [] },
    });
    expect(parsed.success).toBe(false);
    if (parsed.success) {
      return;
    }
    expect(issuesForStep(parsed.error, scoreFields)).toEqual([]);
    expect(issuesForStep(parsed.error, lastStepFields).length).toBeGreaterThan(0);
  });
});

describe('validateWizardStep', () => {
  it('does not set errors for later steps', () => {
    const setError = vi.fn();
    const form = { clearErrors: vi.fn(), setError };
    const valid = validateWizardStep(
      visitedPayloadSchema,
      {
        ...visitedBase,
        answers: { ...visitedBase.answers, vol2Plan: undefined, vol2Wants: [] },
      },
      [...scoreFields],
      form,
    );
    expect(valid).toBe(true);
    expect(form.clearErrors).toHaveBeenCalledOnce();
    expect(setError).not.toHaveBeenCalled();
  });
});

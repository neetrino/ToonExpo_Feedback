import { describe, expect, it } from 'vitest';
import {
  feedbackPayloadSchema,
  missedPayloadSchema,
  visitedPayloadSchema,
} from '@/lib/feedback-schema';

const visitedBase = {
  audience: 'VISITED' as const,
  locale: 'hy' as const,
  website: '',
  answers: {
    problems: ['parking'] as const,
    problemsOrgDetail: '',
    visitGoals: ['market_research'] as const,
    visitGoalsOther: '',
    expectationsScore: 8,
    expectationsImprove: '',
    recommendScore: 9,
    vol2Plan: 'yes' as const,
    vol2Factor: '',
    vol2Wants: ['consultation'] as const,
    vol2WantsOther: '',
  },
};

const missedBase = {
  audience: 'MISSED' as const,
  locale: 'ru' as const,
  website: '',
  answers: {
    noVisitReason: 'no_time' as const,
    noVisitOther: '',
    wouldIncrease: ['reminders'] as const,
    wouldIncreaseOther: '',
    propertyRelevance: 'interested_no_date' as const,
    vol2Plan: 'probably_yes' as const,
    vol2Factor: '',
    vol2Motivation: ['expo_prices'] as const,
    vol2MotivationOther: '',
  },
};

describe('visitedPayloadSchema', () => {
  it('accepts a complete visited payload', () => {
    const parsed = visitedPayloadSchema.parse(visitedBase);
    expect(parsed.audience).toBe('VISITED');
    expect(parsed.answers.problems).toEqual(['parking']);
  });

  it('rejects no_problems together with another problem', () => {
    const result = visitedPayloadSchema.safeParse({
      ...visitedBase,
      answers: { ...visitedBase.answers, problems: ['no_problems', 'traffic'] },
    });
    expect(result.success).toBe(false);
  });

  it('requires org detail when org_issues is selected', () => {
    const result = visitedPayloadSchema.safeParse({
      ...visitedBase,
      answers: { ...visitedBase.answers, problems: ['org_issues'], problemsOrgDetail: '  ' },
    });
    expect(result.success).toBe(false);
  });

  it('requires property outcome and detail for property goals', () => {
    const missingOutcome = visitedPayloadSchema.safeParse({
      ...visitedBase,
      answers: { ...visitedBase.answers, visitGoals: ['apartment'] },
    });
    expect(missingOutcome.success).toBe(false);

    const missingDetail = visitedPayloadSchema.safeParse({
      ...visitedBase,
      answers: {
        ...visitedBase.answers,
        visitGoals: ['apartment'],
        propertyOutcome: 'purchased',
        propertyDetail: '',
      },
    });
    expect(missingDetail.success).toBe(false);

    const ok = visitedPayloadSchema.parse({
      ...visitedBase,
      answers: {
        ...visitedBase.answers,
        visitGoals: ['apartment', 'b2b'],
        propertyOutcome: 'purchased',
        propertyDetail: 'Toon Plaza',
        b2bOutcome: 'contacts_only',
      },
    });
    expect(ok.answers.propertyOutcome).toBe('purchased');
    expect(ok.answers.b2bOutcome).toBe('contacts_only');
  });

  it('requires improve text when expectations score is 6 or lower', () => {
    const result = visitedPayloadSchema.safeParse({
      ...visitedBase,
      answers: { ...visitedBase.answers, expectationsScore: 6, expectationsImprove: '' },
    });
    expect(result.success).toBe(false);
  });

  it('requires vol2 factor for undecided / no plans', () => {
    const result = visitedPayloadSchema.safeParse({
      ...visitedBase,
      answers: { ...visitedBase.answers, vol2Plan: 'undecided', vol2Factor: '' },
    });
    expect(result.success).toBe(false);
  });

  it('ignores leftover property and b2b answers after those goals are unchecked', () => {
    const parsed = visitedPayloadSchema.parse({
      ...visitedBase,
      answers: {
        ...visitedBase.answers,
        visitGoals: ['market_research'],
        propertyOutcome: 'purchased',
        propertyDetail: '',
        b2bOutcome: 'completed',
        b2bDetail: '',
      },
    });
    expect(parsed.answers.propertyOutcome).toBeUndefined();
    expect(parsed.answers.propertyDetail).toBe('');
    expect(parsed.answers.b2bOutcome).toBeUndefined();
    expect(parsed.answers.b2bDetail).toBe('');
  });
});

describe('missedPayloadSchema', () => {
  it('accepts a complete missed payload', () => {
    const parsed = missedPayloadSchema.parse(missedBase);
    expect(parsed.audience).toBe('MISSED');
    expect(parsed.answers.noVisitReason).toBe('no_time');
  });

  it('requires free text when other is selected', () => {
    const reason = missedPayloadSchema.safeParse({
      ...missedBase,
      answers: { ...missedBase.answers, noVisitReason: 'other', noVisitOther: '' },
    });
    expect(reason.success).toBe(false);

    const increase = missedPayloadSchema.safeParse({
      ...missedBase,
      answers: { ...missedBase.answers, wouldIncrease: ['other'], wouldIncreaseOther: '' },
    });
    expect(increase.success).toBe(false);
  });

  it('requires a factor when vol2 plan is no', () => {
    const result = missedPayloadSchema.safeParse({
      ...missedBase,
      answers: { ...missedBase.answers, vol2Plan: 'no', vol2Factor: '' },
    });
    expect(result.success).toBe(false);
  });
});

describe('feedbackPayloadSchema', () => {
  it('discriminates by audience', () => {
    expect(feedbackPayloadSchema.parse(visitedBase).audience).toBe('VISITED');
    expect(feedbackPayloadSchema.parse(missedBase).audience).toBe('MISSED');
  });
});

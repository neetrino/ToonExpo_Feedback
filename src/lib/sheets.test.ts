import { describe, expect, it } from 'vitest';
import { feedbackPayloadSchema } from '@/lib/feedback-schema';
import { toSheetRow } from '@/lib/sheets';

const submittedAt = new Date('2026-09-10T12:00:00.000Z');

describe('toSheetRow', () => {
  it('maps visited answers to the Sheet column order and joins multi values', () => {
    const payload = feedbackPayloadSchema.parse({
      audience: 'VISITED',
      locale: 'hy',
      firstName: 'Ani',
      lastName: 'Sargsyan',
      email: 'ani@example.com',
      phone: '+37499123456',
      website: '',
      answers: {
        problems: ['parking', 'navigation'],
        problemsOrgDetail: '',
        visitGoals: ['apartment', 'other'],
        visitGoalsOther: 'Show apartments',
        propertyOutcome: 'considered',
        propertyDetail: 'Price',
        expectationsScore: 7,
        recommendScore: 8,
        vol2Plan: 'yes',
        vol2Wants: ['special_offers', 'consultation'],
        vol2WantsOther: '',
      },
    });

    const row = toSheetRow('11111111-1111-1111-1111-111111111111', submittedAt, payload);
    expect(row.audience).toBe('VISITED');
    expect(row.values).toEqual([
      '2026-09-10T12:00:00.000Z',
      '11111111-1111-1111-1111-111111111111',
      'Ani',
      'Sargsyan',
      'ani@example.com',
      '+37499123456',
      'hy',
      'parking | navigation',
      '',
      'apartment | other',
      'Show apartments',
      'considered',
      'Price',
      '',
      '',
      '7',
      '',
      '8',
      'yes',
      '',
      'special_offers | consultation',
      '',
    ]);
  });

  it('maps missed answers to the Sheet column order', () => {
    const payload = feedbackPayloadSchema.parse({
      audience: 'MISSED',
      locale: 'ru',
      firstName: 'Ivan',
      lastName: 'Petrov',
      email: 'ivan@example.com',
      phone: '+37499123456',
      website: '',
      answers: {
        noVisitReason: 'other',
        noVisitOther: 'Family',
        wouldIncrease: ['discounts', 'reminders'],
        wouldIncreaseOther: '',
        propertyRelevance: 'next_3_months',
        vol2Plan: 'no',
        vol2Factor: 'Dates',
        vol2Motivation: ['expo_prices'],
        vol2MotivationOther: '',
      },
    });

    const row = toSheetRow('22222222-2222-2222-2222-222222222222', submittedAt, payload);
    expect(row.audience).toBe('MISSED');
    expect(row.values).toEqual([
      '2026-09-10T12:00:00.000Z',
      '22222222-2222-2222-2222-222222222222',
      'Ivan',
      'Petrov',
      'ivan@example.com',
      '+37499123456',
      'ru',
      'other',
      'Family',
      'discounts | reminders',
      '',
      'next_3_months',
      'no',
      'Dates',
      'expo_prices',
      '',
    ]);
  });
});

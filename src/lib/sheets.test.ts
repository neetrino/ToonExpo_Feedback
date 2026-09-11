import { describe, expect, it } from 'vitest';
import { feedbackPayloadSchema } from '@/lib/feedback-schema';
import { MISSED_SHEET_HEADERS, SHEET_TAB_NAMES, VISITED_SHEET_HEADERS } from '@/lib/sheet-labels';
import { assertSheetsWebhookOk, toSheetRow } from '@/lib/sheets';

const submittedAt = new Date('2026-09-10T12:00:00.000Z');

describe('toSheetRow', () => {
  it('maps visited answers to Armenian labels and headers', () => {
    const payload = feedbackPayloadSchema.parse({
      audience: 'VISITED',
      locale: 'hy',
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
    expect(row.tab).toBe(SHEET_TAB_NAMES.VISITED);
    expect(row.headers).toEqual(VISITED_SHEET_HEADERS);
    expect(row.values).toEqual([
      '2026-09-10T12:00:00.000Z',
      '11111111-1111-1111-1111-111111111111',
      'Հայերեն',
      'Կայանման (parking) խնդիր | Տեղորոշման / նավիգացիայի դժվարություններ',
      '',
      'Բնակարան / նորակառույց | Այլ',
      'Show apartments',
      'Դիտարկել եմ առաջարկներ, բայց չեմ ձեռք բերել',
      'Price',
      '',
      '',
      '7',
      '',
      '8',
      'Այո, հաստատ պլանավորում եմ',
      '',
      'Ավելի շատ հատուկ առաջարկներ և զեղչեր | Ավելի մանրամասն խորհրդատվություն',
      '',
    ]);
  });

  it('maps missed answers to Armenian labels and headers', () => {
    const payload = feedbackPayloadSchema.parse({
      audience: 'MISSED',
      locale: 'ru',
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
    expect(row.tab).toBe(SHEET_TAB_NAMES.MISSED);
    expect(row.headers).toEqual(MISSED_SHEET_HEADERS);
    expect(row.values).toEqual([
      '2026-09-10T12:00:00.000Z',
      '22222222-2222-2222-2222-222222222222',
      'Ռուսերեն',
      'Այլ',
      'Family',
      'Հատուկ զեղչերի / ակցիաների մասին տեղեկատվություն | SMS / Email / այլ հիշեցում ցուցահանդեսից առաջ',
      '',
      'Պլանավորում եմ առաջիկա 3 ամսում',
      'Ոչ, չեմ պլանավորում',
      'Dates',
      'Հատուկ ցուցահանդեսային գներ / զեղչեր',
      '',
    ]);
  });
});

describe('assertSheetsWebhookOk', () => {
  it('accepts HTTP 200 with ok true', () => {
    expect(() => assertSheetsWebhookOk({ ok: true }, 200)).not.toThrow();
  });

  it('rejects HTTP 200 with an Apps Script error body', () => {
    expect(() => assertSheetsWebhookOk({ error: 'unauthorized' }, 200)).toThrow(
      'SHEETS_WEBHOOK_unauthorized',
    );
  });

  it('rejects a non-2xx status even if the body says ok', () => {
    expect(() => assertSheetsWebhookOk({ ok: true }, 500)).toThrow('SHEETS_WEBHOOK_500');
  });
});

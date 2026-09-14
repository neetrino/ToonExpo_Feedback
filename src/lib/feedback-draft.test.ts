import { describe, expect, it } from 'vitest';
import {
  clampDraftStep,
  clearFeedbackDraft,
  loadFeedbackDraft,
  mergeDraftValues,
  parseFeedbackDraft,
  saveFeedbackDraft,
} from '@/lib/feedback-draft';

function memoryStorage(initial: Record<string, string> = {}): {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  data: Record<string, string>;
} {
  const data = { ...initial };
  return {
    data,
    getItem(key) {
      return data[key] ?? null;
    },
    setItem(key, value) {
      data[key] = value;
    },
    removeItem(key) {
      delete data[key];
    },
  };
}

describe('parseFeedbackDraft', () => {
  it('reads a valid draft and clamps the step', () => {
    const draft = parseFeedbackDraft<{ answers: { problems: string[] } }>(
      JSON.stringify({ step: 9, values: { answers: { problems: ['parking'] } } }),
      4,
    );
    expect(draft?.step).toBe(3);
    expect(draft?.values.answers.problems).toEqual(['parking']);
  });

  it('rejects corrupt JSON and missing values', () => {
    expect(parseFeedbackDraft('not-json', 4)).toBeNull();
    expect(parseFeedbackDraft(JSON.stringify({ step: 1 }), 4)).toBeNull();
  });
});

describe('mergeDraftValues', () => {
  it('keeps defaults, merges answers, and forces locale', () => {
    const merged = mergeDraftValues(
      {
        audience: 'VISITED' as const,
        locale: 'hy' as const,
        website: '',
        answers: { problems: [] as string[], visitGoals: [] as string[] },
      },
      { locale: 'ru', website: 'spam', answers: { problems: ['parking'] } },
      'ru',
    );
    expect(merged.locale).toBe('ru');
    expect(merged.website).toBe('');
    expect(merged.answers.problems).toEqual(['parking']);
    expect(merged.answers.visitGoals).toEqual([]);
  });
});

describe('draft storage', () => {
  it('saves, loads, and clears a draft', () => {
    const storage = memoryStorage();
    saveFeedbackDraft('visited', 2, { answers: { problems: ['traffic'] } }, storage);
    const loaded = loadFeedbackDraft<{ answers: { problems: string[] } }>('visited', 4, storage);
    expect(loaded?.step).toBe(2);
    expect(loaded?.values.answers.problems).toEqual(['traffic']);
    clearFeedbackDraft('visited', storage);
    expect(loadFeedbackDraft('visited', 4, storage)).toBeNull();
  });

  it('clamps out-of-range steps to zero for empty counts', () => {
    expect(clampDraftStep(-1, 4)).toBe(0);
    expect(clampDraftStep(1, 0)).toBe(0);
  });
});

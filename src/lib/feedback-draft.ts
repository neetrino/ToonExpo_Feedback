export type DraftStorage = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
};

export type FeedbackDraft<T> = {
  step: number;
  values: T;
};

export const VISITED_DRAFT_KEY = 'toonexpo-feedback-visited';
export const MISSED_DRAFT_KEY = 'toonexpo-feedback-missed';

export function clampDraftStep(step: number, stepCount: number): number {
  if (!Number.isInteger(step) || stepCount < 1) {
    return 0;
  }
  return Math.min(Math.max(step, 0), stepCount - 1);
}

export function parseFeedbackDraft<T>(
  raw: string | null,
  stepCount: number,
): FeedbackDraft<T> | null {
  if (!raw) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      return null;
    }
    const record = parsed as { step?: unknown; values?: unknown };
    if (typeof record.step !== 'number' || !record.values || typeof record.values !== 'object') {
      return null;
    }
    return { step: clampDraftStep(record.step, stepCount), values: record.values as T };
  } catch {
    return null;
  }
}

export function mergeDraftValues<T extends object>(
  defaults: T,
  draft: unknown,
  locale: 'hy' | 'ru',
): T {
  if (!draft || typeof draft !== 'object') {
    return { ...defaults, locale } as T;
  }

  const draftRecord = draft as Record<string, unknown>;
  const defaultsRecord = defaults as Record<string, unknown>;
  const answers =
    defaultsRecord.answers &&
    typeof defaultsRecord.answers === 'object' &&
    draftRecord.answers &&
    typeof draftRecord.answers === 'object'
      ? { ...defaultsRecord.answers, ...draftRecord.answers }
      : defaultsRecord.answers;

  return {
    ...defaults,
    ...draftRecord,
    answers,
    locale,
    website: '',
    audience: defaultsRecord.audience,
  } as T;
}

export function getSessionDraftStorage(): DraftStorage | null {
  try {
    if (typeof window === 'undefined') {
      return null;
    }
    return window.sessionStorage;
  } catch {
    return null;
  }
}

export function loadFeedbackDraft<T>(
  key: string,
  stepCount: number,
  storage: DraftStorage | null = getSessionDraftStorage(),
): FeedbackDraft<T> | null {
  if (!storage) {
    return null;
  }
  return parseFeedbackDraft<T>(storage.getItem(key), stepCount);
}

export function saveFeedbackDraft<T>(
  key: string,
  step: number,
  values: T,
  storage: DraftStorage | null = getSessionDraftStorage(),
): void {
  if (!storage) {
    return;
  }
  try {
    storage.setItem(key, JSON.stringify({ step, values }));
  } catch {
    // Quota or private mode — keep the in-memory form working.
  }
}

export function clearFeedbackDraft(
  key: string,
  storage: DraftStorage | null = getSessionDraftStorage(),
): void {
  storage?.removeItem(key);
}

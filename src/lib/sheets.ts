import type { FeedbackPayload, MissedAnswers, VisitedAnswers } from '@/lib/feedback-schema';
import { getSheetsWebhookSecret, getSheetsWebhookUrl } from '@/lib/env';
import { logger } from '@/lib/logger';
import { sanitizeFreeText } from '@/lib/normalize';
import {
  MISSED_SHEET_HEADERS,
  SHEET_TAB_NAMES,
  VISITED_SHEET_HEADERS,
  sheetB2bOutcomeLabel,
  sheetGoalLabels,
  sheetLocaleLabel,
  sheetMissedVol2PlanLabel,
  sheetMotivationLabels,
  sheetNoVisitReasonLabel,
  sheetProblemLabels,
  sheetPropertyOutcomeLabel,
  sheetPropertyRelevanceLabel,
  sheetVisitedVol2PlanLabel,
  sheetWantLabels,
  sheetWouldIncreaseLabels,
} from '@/lib/sheet-labels';

export type SheetRow = {
  audience: 'VISITED' | 'MISSED';
  tab: string;
  headers: readonly string[];
  values: string[];
};

function visitedRow(id: string, submittedAt: string, payload: FeedbackPayload): string[] {
  const answers = payload.answers as VisitedAnswers;
  return [
    submittedAt,
    id,
    sheetLocaleLabel(payload.locale),
    sheetProblemLabels(answers.problems),
    sanitizeFreeText(answers.problemsOrgDetail),
    sheetGoalLabels(answers.visitGoals),
    sanitizeFreeText(answers.visitGoalsOther),
    answers.propertyOutcome ? sheetPropertyOutcomeLabel(answers.propertyOutcome) : '',
    sanitizeFreeText(answers.propertyDetail),
    answers.b2bOutcome ? sheetB2bOutcomeLabel(answers.b2bOutcome) : '',
    sanitizeFreeText(answers.b2bDetail),
    String(answers.expectationsScore),
    sanitizeFreeText(answers.expectationsImprove),
    String(answers.recommendScore),
    sheetVisitedVol2PlanLabel(answers.vol2Plan),
    sanitizeFreeText(answers.vol2Factor),
    sheetWantLabels(answers.vol2Wants),
    sanitizeFreeText(answers.vol2WantsOther),
  ];
}

function missedRow(id: string, submittedAt: string, payload: FeedbackPayload): string[] {
  const answers = payload.answers as MissedAnswers;
  return [
    submittedAt,
    id,
    sheetLocaleLabel(payload.locale),
    sheetNoVisitReasonLabel(answers.noVisitReason),
    sanitizeFreeText(answers.noVisitOther),
    sheetWouldIncreaseLabels(answers.wouldIncrease),
    sanitizeFreeText(answers.wouldIncreaseOther),
    sheetPropertyRelevanceLabel(answers.propertyRelevance),
    sheetMissedVol2PlanLabel(answers.vol2Plan),
    sanitizeFreeText(answers.vol2Factor),
    sheetMotivationLabels(answers.vol2Motivation),
    sanitizeFreeText(answers.vol2MotivationOther),
  ];
}

export function toSheetRow(id: string, submittedAt: Date, payload: FeedbackPayload): SheetRow {
  const iso = submittedAt.toISOString();
  if (payload.audience === 'VISITED') {
    return {
      audience: 'VISITED',
      tab: SHEET_TAB_NAMES.VISITED,
      headers: VISITED_SHEET_HEADERS,
      values: visitedRow(id, iso, payload),
    };
  }
  return {
    audience: 'MISSED',
    tab: SHEET_TAB_NAMES.MISSED,
    headers: MISSED_SHEET_HEADERS,
    values: missedRow(id, iso, payload),
  };
}

export function isAllowedSheetsWebhookUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:') {
      return false;
    }
    if (parsed.username || parsed.password) {
      return false;
    }
    const host = parsed.hostname.toLowerCase();
    return host === 'script.google.com' || host.endsWith('.script.google.com');
  } catch {
    return false;
  }
}

export function sheetsSyncErrorCode(error: unknown): string {
  if (error instanceof Error && /^SHEETS_[A-Za-z0-9_]{1,64}$/.test(error.message)) {
    return error.message;
  }
  return 'SHEETS_UNKNOWN';
}

export async function appendSheetRow(row: SheetRow): Promise<void> {
  const url = getSheetsWebhookUrl();
  const secret = getSheetsWebhookSecret();
  if (!url || !secret) {
    throw new Error('SHEETS_WEBHOOK_NOT_CONFIGURED');
  }
  if (!isAllowedSheetsWebhookUrl(url)) {
    throw new Error('SHEETS_WEBHOOK_URL_INVALID');
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Webhook-Secret': secret,
    },
    body: JSON.stringify({
      secret,
      audience: row.audience,
      tab: row.tab,
      headers: row.headers,
      values: row.values,
    }),
    signal: AbortSignal.timeout(8_000),
  });

  let body: unknown;
  try {
    body = await response.json();
  } catch {
    logger.warn({ status: response.status }, 'sheets.webhook_invalid_json');
    throw new Error('SHEETS_WEBHOOK_INVALID_JSON');
  }

  assertSheetsWebhookOk(body, response.status);
}

/** Apps Script always returns HTTP 200; success is `{ ok: true }` in the body. */
export function assertSheetsWebhookOk(body: unknown, status: number): void {
  if (status < 200 || status >= 300) {
    logger.warn({ status }, 'sheets.webhook_failed');
    throw new Error(`SHEETS_WEBHOOK_${status}`);
  }

  if (body && typeof body === 'object' && 'ok' in body && body.ok === true) {
    return;
  }

  const rawCode =
    body && typeof body === 'object' && 'error' in body && typeof body.error === 'string'
      ? body.error
      : 'invalid_response';
  const code = /^[A-Za-z0-9_]{1,32}$/.test(rawCode) ? rawCode : 'invalid_response';
  logger.warn({ status, code }, 'sheets.webhook_failed');
  throw new Error(`SHEETS_WEBHOOK_${code}`);
}

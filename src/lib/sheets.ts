import type { FeedbackPayload, MissedAnswers, VisitedAnswers } from '@/lib/feedback-schema';
import { getSheetsWebhookSecret, getSheetsWebhookUrl } from '@/lib/env';
import { logger } from '@/lib/logger';
import { clipText, joinSheetList } from '@/lib/normalize';

export type SheetRow = {
  audience: 'VISITED' | 'MISSED';
  values: string[];
};

function visitedRow(id: string, submittedAt: string, payload: FeedbackPayload): string[] {
  const answers = payload.answers as VisitedAnswers;
  return [
    submittedAt,
    id,
    payload.locale,
    joinSheetList(answers.problems),
    clipText(answers.problemsOrgDetail),
    joinSheetList(answers.visitGoals),
    clipText(answers.visitGoalsOther),
    answers.propertyOutcome ?? '',
    clipText(answers.propertyDetail),
    answers.b2bOutcome ?? '',
    clipText(answers.b2bDetail),
    String(answers.expectationsScore),
    clipText(answers.expectationsImprove),
    String(answers.recommendScore),
    answers.vol2Plan,
    clipText(answers.vol2Factor),
    joinSheetList(answers.vol2Wants),
    clipText(answers.vol2WantsOther),
  ];
}

function missedRow(id: string, submittedAt: string, payload: FeedbackPayload): string[] {
  const answers = payload.answers as MissedAnswers;
  return [
    submittedAt,
    id,
    payload.locale,
    answers.noVisitReason,
    clipText(answers.noVisitOther),
    joinSheetList(answers.wouldIncrease),
    clipText(answers.wouldIncreaseOther),
    answers.propertyRelevance,
    answers.vol2Plan,
    clipText(answers.vol2Factor),
    joinSheetList(answers.vol2Motivation),
    clipText(answers.vol2MotivationOther),
  ];
}

export function toSheetRow(id: string, submittedAt: Date, payload: FeedbackPayload): SheetRow {
  const iso = submittedAt.toISOString();
  if (payload.audience === 'VISITED') {
    return { audience: 'VISITED', values: visitedRow(id, iso, payload) };
  }
  return { audience: 'MISSED', values: missedRow(id, iso, payload) };
}

export async function appendSheetRow(row: SheetRow): Promise<void> {
  const url = getSheetsWebhookUrl();
  const secret = getSheetsWebhookSecret();
  if (!url || !secret) {
    throw new Error('SHEETS_WEBHOOK_NOT_CONFIGURED');
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

  const code =
    body && typeof body === 'object' && 'error' in body && typeof body.error === 'string'
      ? body.error
      : 'invalid_response';
  logger.warn({ status, code }, 'sheets.webhook_failed');
  throw new Error(`SHEETS_WEBHOOK_${code}`);
}

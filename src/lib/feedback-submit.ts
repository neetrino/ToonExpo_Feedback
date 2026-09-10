import { after } from 'next/server';
import { Prisma } from '@/generated/prisma';
import { applySessionLimits, prisma } from '@/lib/db';
import type { FeedbackPayload } from '@/lib/feedback-schema';
import { logger } from '@/lib/logger';
import { clipText } from '@/lib/normalize';
import { appendSheetRow, toSheetRow } from '@/lib/sheets';

function sanitizeAnswers(payload: FeedbackPayload): Prisma.InputJsonValue {
  return JSON.parse(JSON.stringify(payload.answers)) as Prisma.InputJsonValue;
}

async function syncSheet(id: string, createdAt: Date, payload: FeedbackPayload): Promise<void> {
  try {
    await appendSheetRow(toSheetRow(id, createdAt, payload));
    await prisma.feedbackSubmission.update({
      where: { id },
      data: {
        sheetSyncStatus: 'synced',
        sheetSyncedAt: new Date(),
        sheetError: null,
      },
    });
  } catch (error) {
    const code = error instanceof Error ? error.message.slice(0, 80) : 'SHEETS_UNKNOWN';
    logger.warn({ id, code }, 'sheets.sync_deferred');
    await prisma.feedbackSubmission.update({
      where: { id },
      data: {
        sheetSyncStatus: 'failed',
        sheetError: code,
      },
    });
  }
}

export async function saveFeedback(payload: FeedbackPayload): Promise<{ id: string }> {
  await applySessionLimits();

  const created = await prisma.feedbackSubmission.create({
    data: {
      audience: payload.audience,
      answers: sanitizeAnswers(payload),
      locale: payload.locale,
    },
    select: { id: true, createdAt: true },
  });

  after(() => {
    void syncSheet(created.id, created.createdAt, payload);
  });

  return { id: created.id };
}

export function isHoneypotFilled(website: string | undefined): boolean {
  return clipText(website ?? '').length > 0;
}

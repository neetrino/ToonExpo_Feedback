import { NextResponse } from 'next/server';
import { Prisma } from '@/generated/prisma';
import { applySessionLimits, prisma } from '@/lib/db';
import { getCronSecret, isSheetsCronEnabled } from '@/lib/env';
import { feedbackPayloadSchema } from '@/lib/feedback-schema';
import { logger } from '@/lib/logger';
import { appendSheetRow, toSheetRow } from '@/lib/sheets';

const BATCH_SIZE = 25;

function toPayload(row: {
  audience: 'VISITED' | 'MISSED';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  locale: string;
  answers: Prisma.JsonValue;
}) {
  return feedbackPayloadSchema.parse({
    audience: row.audience,
    firstName: row.firstName,
    lastName: row.lastName,
    email: row.email,
    phone: row.phone,
    locale: row.locale === 'ru' ? 'ru' : 'hy',
    website: '',
    answers: row.answers,
  });
}

export async function GET(request: Request): Promise<NextResponse> {
  if (!isSheetsCronEnabled()) {
    return NextResponse.json({ status: 'DISABLED' });
  }

  const secret = getCronSecret();
  const header = request.headers.get('authorization');
  if (!secret || header !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  await applySessionLimits();

  const pending = await prisma.feedbackSubmission.findMany({
    where: { sheetSyncStatus: { in: ['pending', 'failed'] } },
    orderBy: { createdAt: 'asc' },
    take: BATCH_SIZE,
  });

  let synced = 0;
  let failed = 0;

  for (const row of pending) {
    try {
      const payload = toPayload(row);
      await appendSheetRow(toSheetRow(row.id, row.createdAt, payload));
      await prisma.feedbackSubmission.update({
        where: { id: row.id },
        data: {
          sheetSyncStatus: 'synced',
          sheetSyncedAt: new Date(),
          sheetError: null,
        },
      });
      synced += 1;
    } catch (error) {
      failed += 1;
      const code = error instanceof Error ? error.message.slice(0, 80) : 'SHEETS_UNKNOWN';
      logger.warn({ id: row.id, code }, 'sheets.cron_failed');
      await prisma.feedbackSubmission.update({
        where: { id: row.id },
        data: { sheetSyncStatus: 'failed', sheetError: code },
      });
    }
  }

  return NextResponse.json({ ok: true, scanned: pending.length, synced, failed });
}

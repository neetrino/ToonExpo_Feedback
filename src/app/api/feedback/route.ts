import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { feedbackPayloadSchema } from '@/lib/feedback-schema';
import { isHoneypotFilled, saveFeedback } from '@/lib/feedback-submit';
import { logger } from '@/lib/logger';

export async function POST(request: Request): Promise<NextResponse> {
  const origin = request.headers.get('origin');
  const host = request.headers.get('host');
  if (origin && host) {
    let originHost = '';
    try {
      originHost = new URL(origin).host;
    } catch {
      return NextResponse.json({ error: 'invalid_origin' }, { status: 403 });
    }
    if (originHost !== host) {
      return NextResponse.json({ error: 'invalid_origin' }, { status: 403 });
    }
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  try {
    const payload = feedbackPayloadSchema.parse(body);
    if (isHoneypotFilled(payload.website)) {
      return NextResponse.json({ ok: true });
    }

    const saved = await saveFeedback(payload);
    return NextResponse.json({ ok: true, id: saved.id }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: 'invalid_input' }, { status: 400 });
    }
    logger.error({ err: error instanceof Error ? error.name : 'unknown' }, 'feedback.save_failed');
    return NextResponse.json({ error: 'save_failed' }, { status: 500 });
  }
}

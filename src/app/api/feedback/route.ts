import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { feedbackPayloadSchema } from '@/lib/feedback-schema';
import { isHoneypotFilled, saveFeedback } from '@/lib/feedback-submit';
import { logger } from '@/lib/logger';
import { readJsonObject } from '@/lib/read-json-body';
import { isAllowedFeedbackOrigin, isCrossSiteRequest } from '@/lib/request-origin';

export async function POST(request: Request): Promise<NextResponse> {
  if (isCrossSiteRequest(request.headers.get('sec-fetch-site'))) {
    return NextResponse.json({ error: 'invalid_origin' }, { status: 403 });
  }

  if (
    !isAllowedFeedbackOrigin({
      origin: request.headers.get('origin'),
      referer: request.headers.get('referer'),
      host: request.headers.get('host'),
    })
  ) {
    return NextResponse.json({ error: 'invalid_origin' }, { status: 403 });
  }

  const parsedBody = await readJsonObject(request);
  if (!parsedBody.ok) {
    const status = parsedBody.error === 'payload_too_large' ? 413 : 400;
    return NextResponse.json({ error: parsedBody.error }, { status });
  }

  try {
    const payload = feedbackPayloadSchema.parse(parsedBody.body);
    if (isHoneypotFilled(payload.website)) {
      return new NextResponse(null, { status: 204 });
    }

    await saveFeedback(payload);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: 'invalid_input' }, { status: 400 });
    }
    logger.error({ err: error instanceof Error ? error.name : 'unknown' }, 'feedback.save_failed');
    return NextResponse.json({ error: 'save_failed' }, { status: 500 });
  }
}

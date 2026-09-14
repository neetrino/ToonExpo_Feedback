const MAX_JSON_BODY_BYTES = 16_384;

export function isJsonContentType(contentType: string | null): boolean {
  if (!contentType) {
    return false;
  }
  return contentType.split(';')[0].trim().toLowerCase() === 'application/json';
}

export async function readJsonObject(
  request: Request,
): Promise<
  { ok: true; body: unknown } | { ok: false; error: 'invalid_json' | 'payload_too_large' }
> {
  if (!isJsonContentType(request.headers.get('content-type'))) {
    return { ok: false, error: 'invalid_json' };
  }

  const contentLength = Number(request.headers.get('content-length') ?? '0');
  if (Number.isFinite(contentLength) && contentLength > MAX_JSON_BODY_BYTES) {
    return { ok: false, error: 'payload_too_large' };
  }

  let raw: string;
  try {
    raw = await request.text();
  } catch {
    return { ok: false, error: 'invalid_json' };
  }

  if (raw.length > MAX_JSON_BODY_BYTES) {
    return { ok: false, error: 'payload_too_large' };
  }

  try {
    return { ok: true, body: JSON.parse(raw) as unknown };
  } catch {
    return { ok: false, error: 'invalid_json' };
  }
}

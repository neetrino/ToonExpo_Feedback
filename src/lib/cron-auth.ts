import { timingSafeEqual } from 'node:crypto';

export function isAuthorizedCronRequest(
  header: string | null,
  secret: string | undefined,
): boolean {
  if (!secret || !header) {
    return false;
  }

  const prefix = 'Bearer ';
  if (!header.startsWith(prefix)) {
    return false;
  }

  const provided = Buffer.from(header.slice(prefix.length));
  const expected = Buffer.from(secret);
  if (expected.length === 0 || provided.length !== expected.length) {
    return false;
  }

  return timingSafeEqual(provided, expected);
}

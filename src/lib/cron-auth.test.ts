import { describe, expect, it } from 'vitest';
import { isAuthorizedCronRequest } from '@/lib/cron-auth';

const secret = 'cron-secret-value-32chars-minimum';

describe('isAuthorizedCronRequest', () => {
  it('accepts the matching Bearer token', () => {
    expect(isAuthorizedCronRequest(`Bearer ${secret}`, secret)).toBe(true);
  });

  it('rejects a missing secret or header', () => {
    expect(isAuthorizedCronRequest(`Bearer ${secret}`, undefined)).toBe(false);
    expect(isAuthorizedCronRequest(null, secret)).toBe(false);
  });

  it('rejects a wrong token of the same length', () => {
    expect(isAuthorizedCronRequest(`Bearer ${'x'.repeat(secret.length)}`, secret)).toBe(false);
  });

  it('rejects a token of a different length', () => {
    expect(isAuthorizedCronRequest('Bearer short', secret)).toBe(false);
  });
});

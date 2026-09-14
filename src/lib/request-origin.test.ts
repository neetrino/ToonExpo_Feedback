import { describe, expect, it } from 'vitest';
import { configuredFeedbackHosts, isAllowedFeedbackOrigin } from '@/lib/request-origin';

const allowed = new Set(['feedback.toonexpo.com']);

const sameOrigin = {
  origin: 'https://feedback.toonexpo.com',
  referer: 'https://feedback.toonexpo.com/hy/visited',
  host: 'feedback.toonexpo.com',
};

describe('isAllowedFeedbackOrigin', () => {
  it('accepts a matching Origin and Host on the allowlist', () => {
    expect(isAllowedFeedbackOrigin(sameOrigin, allowed)).toBe(true);
  });

  it('rejects a missing Origin even when Host is present', () => {
    expect(
      isAllowedFeedbackOrigin(
        {
          origin: null,
          referer: null,
          host: 'feedback.toonexpo.com',
        },
        allowed,
      ),
    ).toBe(false);
  });

  it('rejects a missing Host even when Origin matches the site', () => {
    expect(
      isAllowedFeedbackOrigin(
        {
          origin: 'https://feedback.toonexpo.com',
          referer: null,
          host: null,
        },
        allowed,
      ),
    ).toBe(false);
  });

  it('rejects a cross-origin Origin', () => {
    expect(
      isAllowedFeedbackOrigin(
        {
          origin: 'https://evil.example',
          referer: 'https://evil.example/',
          host: 'feedback.toonexpo.com',
        },
        allowed,
      ),
    ).toBe(false);
  });

  it('rejects Origin and Host that match each other but are not allowlisted', () => {
    expect(
      isAllowedFeedbackOrigin(
        {
          origin: 'https://evil.example',
          referer: 'https://evil.example/',
          host: 'evil.example',
        },
        allowed,
      ),
    ).toBe(false);
  });

  it('falls back to Referer when Origin is absent', () => {
    expect(
      isAllowedFeedbackOrigin(
        {
          origin: null,
          referer: 'https://feedback.toonexpo.com/ru/missed',
          host: 'feedback.toonexpo.com',
        },
        allowed,
      ),
    ).toBe(true);
  });

  it('rejects an invalid Origin and does not fall through to Referer', () => {
    expect(
      isAllowedFeedbackOrigin(
        {
          origin: 'not-a-url',
          referer: 'https://feedback.toonexpo.com/hy',
          host: 'feedback.toonexpo.com',
        },
        allowed,
      ),
    ).toBe(false);
  });
});

describe('configuredFeedbackHosts', () => {
  it('includes APP_URL and Vercel hosts', () => {
    const hosts = configuredFeedbackHosts({
      NODE_ENV: 'production',
      APP_URL: 'https://feedback.toonexpo.com',
      VERCEL_URL: 'toonexpo-feedback.vercel.app',
    });
    expect(hosts.has('feedback.toonexpo.com')).toBe(true);
    expect(hosts.has('toonexpo-feedback.vercel.app')).toBe(true);
  });

  it('fails closed in production when no hosts are configured', () => {
    const hosts = configuredFeedbackHosts({ NODE_ENV: 'production' });
    expect(hosts.size).toBe(0);
  });
});

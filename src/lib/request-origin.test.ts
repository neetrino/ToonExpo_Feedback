import { describe, expect, it } from 'vitest';
import { isAllowedFeedbackOrigin } from '@/lib/request-origin';

const sameOrigin = {
  origin: 'https://feedback.toonexpo.com',
  referer: 'https://feedback.toonexpo.com/hy/visited',
  host: 'feedback.toonexpo.com',
};

describe('isAllowedFeedbackOrigin', () => {
  it('accepts a matching Origin and Host', () => {
    expect(isAllowedFeedbackOrigin(sameOrigin)).toBe(true);
  });

  it('rejects a missing Origin even when Host is present', () => {
    expect(
      isAllowedFeedbackOrigin({
        origin: null,
        referer: null,
        host: 'feedback.toonexpo.com',
      }),
    ).toBe(false);
  });

  it('rejects a missing Host even when Origin matches the site', () => {
    expect(
      isAllowedFeedbackOrigin({
        origin: 'https://feedback.toonexpo.com',
        referer: null,
        host: null,
      }),
    ).toBe(false);
  });

  it('rejects a cross-origin Origin', () => {
    expect(
      isAllowedFeedbackOrigin({
        origin: 'https://evil.example',
        referer: 'https://evil.example/',
        host: 'feedback.toonexpo.com',
      }),
    ).toBe(false);
  });

  it('falls back to Referer when Origin is absent', () => {
    expect(
      isAllowedFeedbackOrigin({
        origin: null,
        referer: 'https://feedback.toonexpo.com/ru/missed',
        host: 'feedback.toonexpo.com',
      }),
    ).toBe(true);
  });

  it('rejects an invalid Origin and does not fall through to Referer', () => {
    expect(
      isAllowedFeedbackOrigin({
        origin: 'not-a-url',
        referer: 'https://feedback.toonexpo.com/hy',
        host: 'feedback.toonexpo.com',
      }),
    ).toBe(false);
  });
});

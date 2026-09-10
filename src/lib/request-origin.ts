type RequestOriginHeaders = {
  origin: string | null;
  referer: string | null;
  host: string | null;
};

function hostFromUrl(value: string): string | null {
  try {
    return new URL(value).host.toLowerCase();
  } catch {
    return null;
  }
}

/**
 * Same-origin check for public POST /api/feedback.
 * Fail closed: missing Host, missing Origin and Referer, or a host mismatch is rejected.
 * If Origin is present it is the only source of truth; Referer is a fallback when Origin is absent.
 */
export function isAllowedFeedbackOrigin(headers: RequestOriginHeaders): boolean {
  const requestHost = headers.host?.trim().toLowerCase();
  if (!requestHost) {
    return false;
  }

  const origin = headers.origin?.trim();
  if (origin) {
    const originHost = hostFromUrl(origin);
    return originHost !== null && originHost === requestHost;
  }

  const referer = headers.referer?.trim();
  if (referer) {
    const refererHost = hostFromUrl(referer);
    return refererHost !== null && refererHost === requestHost;
  }

  return false;
}

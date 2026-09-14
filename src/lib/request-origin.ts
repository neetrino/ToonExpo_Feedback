type RequestOriginHeaders = {
  origin: string | null;
  referer: string | null;
  host: string | null;
};

function normalizeHost(host: string): string | null {
  const trimmed = host.trim().toLowerCase().replace(/\.$/, '');
  if (!trimmed) {
    return null;
  }
  if (trimmed.endsWith(':443')) {
    return trimmed.slice(0, -4) || null;
  }
  if (trimmed.endsWith(':80')) {
    return trimmed.slice(0, -3) || null;
  }
  return trimmed;
}

function hostFromUrl(value: string): string | null {
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return null;
    }
    if (parsed.username || parsed.password) {
      return null;
    }
    return normalizeHost(parsed.host);
  } catch {
    return null;
  }
}

function addHost(hosts: Set<string>, value: string | undefined): void {
  if (!value || value.trim() === '') {
    return;
  }
  const trimmed = value.trim();
  const host = trimmed.includes('://') ? hostFromUrl(trimmed) : normalizeHost(trimmed);
  if (host) {
    hosts.add(host);
  }
}

export function configuredFeedbackHosts(
  env: NodeJS.Dict<string> = process.env,
): ReadonlySet<string> {
  const hosts = new Set<string>();
  addHost(hosts, env.APP_URL);
  addHost(hosts, env.VERCEL_URL);
  addHost(hosts, env.VERCEL_PROJECT_PRODUCTION_URL);
  addHost(hosts, env.VERCEL_BRANCH_URL);
  if (env.NODE_ENV !== 'production') {
    addHost(hosts, env.APP_URL || 'http://localhost:3000');
    addHost(hosts, 'http://127.0.0.1:3000');
    addHost(hosts, 'http://[::1]:3000');
  }
  return hosts;
}

/**
 * Same-origin check for public POST /api/feedback.
 * Fail closed: Host, Origin, and Referer must match the configured allowlist — not each other.
 * If Origin is present it is the only source of truth; Referer is a fallback when Origin is absent.
 */
export function isAllowedFeedbackOrigin(
  headers: RequestOriginHeaders,
  allowedHosts: ReadonlySet<string> = configuredFeedbackHosts(),
): boolean {
  const hosts = new Set(allowedHosts);
  if (process.env.NODE_ENV === 'development' && headers.host) {
    const developmentHost = normalizeHost(headers.host);
    if (developmentHost) {
      hosts.add(developmentHost);
    }
  }

  if (hosts.size === 0) {
    return false;
  }

  const requestHost = headers.host ? normalizeHost(headers.host) : null;
  if (!requestHost || !hosts.has(requestHost)) {
    return false;
  }

  const origin = headers.origin?.trim();
  if (origin) {
    const originHost = hostFromUrl(origin);
    return originHost !== null && hosts.has(originHost);
  }

  const referer = headers.referer?.trim();
  if (referer) {
    const refererHost = hostFromUrl(referer);
    return refererHost !== null && hosts.has(refererHost);
  }

  return false;
}

export function isCrossSiteRequest(secFetchSite: string | null): boolean {
  return secFetchSite === 'cross-site';
}

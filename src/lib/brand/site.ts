export const SITE_NAME = 'TOON EXPO';
export const SITE_TITLE = 'TOON EXPO · INVEST 2026 — Feedback';
export const SITE_DESCRIPTION =
  'Feedback survey for TOON EXPO · INVEST 2026 visitors and registered guests.';
export const BRAND_PRIMARY = '#00303D';
export const BRAND_ACCENT = '#2BA8B0';
export const BRAND_HIGHLIGHT = '#FFD700';

export function getMetadataBase(): URL {
  return new URL(process.env.APP_URL ?? 'http://localhost:3000');
}

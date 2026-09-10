import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['hy', 'ru'],
  defaultLocale: 'hy',
  localePrefix: 'always',
  localeDetection: false,
});

export type AppLocale = (typeof routing.locales)[number];

export function parseLocale(value: string): AppLocale {
  return routing.locales.includes(value as AppLocale)
    ? (value as AppLocale)
    : routing.defaultLocale;
}

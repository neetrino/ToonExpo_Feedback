'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ToonExpoLogo } from '@/components/brand/toon-expo-logo';
import { LanguageSwitcher } from '@/components/language-switcher';

export function SiteHeader() {
  const t = useTranslations('common');

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-primary">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
        <Link
          href="/"
          className="group flex min-h-11 items-center gap-2.5 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
        >
          <ToonExpoLogo
            size={34}
            inverted
            priority
            className="shrink-0 transition-transform duration-200 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
          <span className="font-display text-sm font-bold tracking-tight text-white sm:text-base">
            {t('siteName')}
          </span>
        </Link>
        <LanguageSwitcher tone="inverse" />
      </div>
    </header>
  );
}

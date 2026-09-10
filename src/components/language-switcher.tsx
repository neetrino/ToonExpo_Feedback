'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

const localeLabels = {
  hy: 'HY',
  ru: 'RU',
} as const;

type LanguageSwitcherProps = {
  tone?: 'default' | 'inverse';
};

export function LanguageSwitcher({ tone = 'default' }: LanguageSwitcherProps) {
  const t = useTranslations('common');
  const locale = useLocale();
  const pathname = usePathname();
  const isInverse = tone === 'inverse';

  return (
    <div
      className={cn(
        'flex items-center gap-0.5 rounded-full p-0.5',
        isInverse ? 'border border-white/20 bg-white/5' : 'border border-border bg-card',
      )}
      role="group"
      aria-label={t('languageSwitcher')}
    >
      {(['hy', 'ru'] as const).map((code) => (
        <Link
          key={code}
          href={pathname}
          locale={code}
          aria-current={code === locale ? 'true' : undefined}
          className={cn(
            'inline-flex min-h-10 min-w-10 items-center justify-center rounded-full px-3 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-highlight focus-visible:ring-offset-2 motion-reduce:transition-none',
            isInverse && 'focus-visible:ring-offset-primary',
            code === locale
              ? isInverse
                ? 'bg-white text-primary'
                : 'bg-primary text-primary-foreground'
              : isInverse
                ? 'text-white/70 hover:bg-white/10 hover:text-white'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
          )}
        >
          {localeLabels[code]}
        </Link>
      ))}
    </div>
  );
}

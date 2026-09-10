'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-card p-1 text-sm">
      <Link
        href={pathname}
        locale="hy"
        className={cn(
          'rounded-full px-3 py-1',
          locale === 'hy' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground',
        )}
      >
        ՀԱՅ
      </Link>
      <Link
        href={pathname}
        locale="ru"
        className={cn(
          'rounded-full px-3 py-1',
          locale === 'ru' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground',
        )}
      >
        РУ
      </Link>
    </div>
  );
}

'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { PageShell } from '@/components/page-shell';

export default function LocaleError({ reset }: { error: Error; reset: () => void }) {
  const t = useTranslations('errors');

  return (
    <PageShell>
      <h1 className="font-display text-3xl font-bold tracking-tight">{t('pageTitle')}</h1>
      <p className="mt-4 text-muted-foreground">{t('pageText')}</p>
      <div className="mt-8">
        <Button type="button" onClick={reset}>
          {t('retry')}
        </Button>
      </div>
    </PageShell>
  );
}

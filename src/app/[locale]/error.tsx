'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { PageHero } from '@/components/page-hero';
import { PageShell } from '@/components/page-shell';

export default function LocaleError({ reset }: { error: Error; reset: () => void }) {
  const t = useTranslations('errors');
  const tCommon = useTranslations('common');

  return (
    <PageShell>
      <PageHero kicker={tCommon('siteName')} title={t('pageTitle')} intro={t('pageText')} />
      <div className="mt-8">
        <Button type="button" size="lg" onClick={reset}>
          {t('retry')}
        </Button>
      </div>
    </PageShell>
  );
}

'use client';

import { RotateCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { IconBubble } from '@/components/icon-bubble';
import { PageHero } from '@/components/page-hero';
import { PageShell } from '@/components/page-shell';

export default function LocaleError({ reset }: { error: Error; reset: () => void }) {
  const t = useTranslations('errors');
  const tCommon = useTranslations('common');

  return (
    <PageShell>
      <PageHero
        kicker={tCommon('siteName')}
        title={t('pageTitle')}
        intro={t('pageText')}
        icon={
          <IconBubble tone="gold">
            <RotateCcw className="size-5" />
          </IconBubble>
        }
      />
      <div className="mt-8">
        <Button type="button" size="lg" onClick={reset}>
          <RotateCcw className="size-4" aria-hidden="true" />
          {t('retry')}
        </Button>
      </div>
    </PageShell>
  );
}

import { UserRoundX } from 'lucide-react';
import { BackLink } from '@/components/back-link';
import { IconBubble } from '@/components/icon-bubble';
import { MissedForm } from '@/components/missed-form';
import { PageHero } from '@/components/page-hero';
import { PageShell } from '@/components/page-shell';
import { parseLocale } from '@/i18n/routing';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type MissedPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function MissedPage({ params }: MissedPageProps) {
  const locale = parseLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <PageShell>
      <PageHero
        kicker={t('landing.kicker')}
        title={t('missed.title')}
        intro={t('missed.intro')}
        icon={
          <IconBubble tone="secondary">
            <UserRoundX className="size-5" />
          </IconBubble>
        }
      />
      <BackLink label={t('common.back')} />
      <div className="mt-6">
        <MissedForm />
      </div>
    </PageShell>
  );
}

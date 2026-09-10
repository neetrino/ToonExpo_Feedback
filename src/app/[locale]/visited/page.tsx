import { CalendarCheck } from 'lucide-react';
import { BackLink } from '@/components/back-link';
import { IconBubble } from '@/components/icon-bubble';
import { PageHero } from '@/components/page-hero';
import { PageShell } from '@/components/page-shell';
import { VisitedForm } from '@/components/visited-form';
import { parseLocale } from '@/i18n/routing';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type VisitedPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function VisitedPage({ params }: VisitedPageProps) {
  const locale = parseLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <PageShell>
      <PageHero
        kicker={t('landing.kicker')}
        title={t('visited.title')}
        intro={t('visited.intro')}
        icon={
          <IconBubble>
            <CalendarCheck className="size-5" />
          </IconBubble>
        }
      />
      <BackLink label={t('common.back')} />
      <div className="mt-6">
        <VisitedForm />
      </div>
    </PageShell>
  );
}

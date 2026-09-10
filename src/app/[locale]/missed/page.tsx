import { MissedForm } from '@/components/missed-form';
import { PageHero } from '@/components/page-hero';
import { PageShell } from '@/components/page-shell';
import { Link } from '@/i18n/navigation';
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
      <PageHero kicker={t('landing.kicker')} title={t('missed.title')} intro={t('missed.intro')} />
      <p className="mt-6">
        <Link
          href="/"
          className="text-sm font-medium text-secondary underline-offset-4 hover:text-accent hover:underline"
        >
          {t('common.back')}
        </Link>
      </p>
      <div className="mt-6">
        <MissedForm />
      </div>
    </PageShell>
  );
}

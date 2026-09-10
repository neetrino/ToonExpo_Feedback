import { MissedForm } from '@/components/missed-form';
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
      <p className="text-sm font-medium uppercase tracking-wide text-secondary">
        {t('landing.kicker')}
      </p>
      <h1 className="mt-3 font-display text-3xl font-bold tracking-tight">{t('missed.title')}</h1>
      <p className="mt-4 text-muted-foreground">{t('missed.intro')}</p>
      <p className="mt-6">
        <Link href="/" className="text-sm font-medium text-secondary hover:text-accent">
          {t('common.back')}
        </Link>
      </p>
      <div className="mt-8">
        <MissedForm />
      </div>
    </PageShell>
  );
}

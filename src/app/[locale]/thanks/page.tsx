import { PageShell } from '@/components/page-shell';
import { Link } from '@/i18n/navigation';
import { parseLocale } from '@/i18n/routing';
import { getTranslations, setRequestLocale } from 'next-intl/server';

type ThanksPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function ThanksPage({ params }: ThanksPageProps) {
  const locale = parseLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations('thanks');

  return (
    <PageShell>
      <h1 className="font-display text-3xl font-bold tracking-tight">{t('title')}</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">{t('text')}</p>
      <p className="mt-8">
        <Link href="/" className="text-sm font-semibold text-secondary hover:text-accent">
          {t('home')}
        </Link>
      </p>
    </PageShell>
  );
}

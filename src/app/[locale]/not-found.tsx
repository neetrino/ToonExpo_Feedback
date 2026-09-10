import { PageShell } from '@/components/page-shell';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';

export default async function NotFoundPage() {
  const t = await getTranslations();

  return (
    <PageShell>
      <h1 className="font-display text-3xl font-bold tracking-tight">{t('notFound.title')}</h1>
      <p className="mt-4 text-muted-foreground">{t('notFound.text')}</p>
      <p className="mt-8">
        <Link href="/" className="text-sm font-semibold text-secondary hover:text-accent">
          {t('thanks.home')}
        </Link>
      </p>
    </PageShell>
  );
}

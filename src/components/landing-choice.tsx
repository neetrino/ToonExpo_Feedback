import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export async function LandingChoice() {
  const t = await getTranslations('landing');

  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-sm font-medium uppercase tracking-wide text-secondary">{t('kicker')}</p>
      <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
        {t('title')}
      </h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">{t('intro')}</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Link
          href="/visited"
          className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-accent"
        >
          <h2 className="font-display text-xl font-semibold">{t('visitedTitle')}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{t('visitedText')}</p>
        </Link>
        <Link
          href="/missed"
          className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors hover:border-accent"
        >
          <h2 className="font-display text-xl font-semibold">{t('missedTitle')}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{t('missedText')}</p>
        </Link>
      </div>
    </div>
  );
}

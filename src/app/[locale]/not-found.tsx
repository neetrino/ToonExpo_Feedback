import { PageHero } from '@/components/page-hero';
import { PageShell } from '@/components/page-shell';
import { buttonVariants } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';
import { getTranslations } from 'next-intl/server';

export default async function NotFoundPage() {
  const t = await getTranslations();

  return (
    <PageShell>
      <PageHero
        kicker={t('common.siteName')}
        title={t('notFound.title')}
        intro={t('notFound.text')}
      />
      <p className="mt-8">
        <Link href="/" className={cn(buttonVariants({ variant: 'gold', size: 'lg' }))}>
          {t('thanks.home')}
        </Link>
      </p>
    </PageShell>
  );
}

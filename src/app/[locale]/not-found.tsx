import { Home, SearchX } from 'lucide-react';
import { IconBubble } from '@/components/icon-bubble';
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
        icon={
          <IconBubble tone="secondary">
            <SearchX className="size-5" />
          </IconBubble>
        }
      />
      <p className="mt-8">
        <Link href="/" className={cn(buttonVariants({ variant: 'gold', size: 'lg' }))}>
          <Home className="size-4" aria-hidden="true" />
          {t('thanks.home')}
        </Link>
      </p>
    </PageShell>
  );
}

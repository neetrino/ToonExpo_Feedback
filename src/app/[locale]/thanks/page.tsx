import { PageShell } from '@/components/page-shell';
import { SuccessCheck } from '@/components/success-check';
import { buttonVariants } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { parseLocale } from '@/i18n/routing';
import { cn } from '@/lib/utils';
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
      <div className="flex flex-1 flex-col items-center justify-center py-6 sm:py-10">
        <div className="success-card-enter w-full max-w-md">
          <div
            role="status"
            className="flex flex-col items-center rounded-3xl border border-border bg-card px-6 py-10 text-center shadow-[0_8px_32px_rgba(0,48,61,0.08)] sm:px-8 sm:py-12"
          >
            <SuccessCheck />
            <h1 className="mt-6 font-display text-2xl font-extrabold tracking-tight md:text-3xl">
              {t('title')}
            </h1>
            <p className="mt-3 max-w-sm text-base leading-relaxed text-muted-foreground">
              {t('text')}
            </p>
            <Link
              href="/"
              className={cn(
                buttonVariants({ variant: 'gold', size: 'lg' }),
                'mt-8 w-full sm:w-auto',
              )}
            >
              {t('home')}
            </Link>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

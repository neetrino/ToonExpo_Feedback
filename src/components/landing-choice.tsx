import { CalendarCheck, ChevronRight, UserRoundX } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { PageHero } from '@/components/page-hero';

export async function LandingChoice() {
  const t = await getTranslations('landing');

  return (
    <div className="mx-auto max-w-3xl sm:min-h-[calc(100dvh-10.5rem)] sm:pt-4">
      <PageHero kicker={t('kicker')} title={t('title')} intro={t('intro')} />
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link
          href="/visited"
          className="landing-card-enter group flex min-h-[8.5rem] flex-col rounded-3xl border border-border bg-card p-5 shadow-[0_8px_32px_rgba(0,48,61,0.08)] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_12px_36px_rgba(0,48,61,0.12)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-6"
        >
          <span className="flex size-11 items-center justify-center rounded-2xl bg-accent/15 text-accent">
            <CalendarCheck className="size-5" aria-hidden="true" />
          </span>
          <h2 className="mt-4 font-display text-xl font-semibold leading-snug">
            {t('visitedTitle')}
          </h2>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
            {t('visitedText')}
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-secondary">
            {t('continue')}
            <ChevronRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" />
          </span>
        </Link>
        <Link
          href="/missed"
          className="landing-card-enter group flex min-h-[8.5rem] flex-col rounded-3xl border border-border bg-card p-5 shadow-[0_8px_32px_rgba(0,48,61,0.08)] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_12px_36px_rgba(0,48,61,0.12)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-6"
        >
          <span className="flex size-11 items-center justify-center rounded-2xl bg-secondary/15 text-secondary">
            <UserRoundX className="size-5" aria-hidden="true" />
          </span>
          <h2 className="mt-4 font-display text-xl font-semibold leading-snug">
            {t('missedTitle')}
          </h2>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
            {t('missedText')}
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-secondary">
            {t('continue')}
            <ChevronRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" />
          </span>
        </Link>
      </div>
    </div>
  );
}

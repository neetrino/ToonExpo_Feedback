import {
  CalendarCheck,
  ChevronRight,
  Clock,
  Languages,
  MessageCircleHeart,
  UserRoundX,
} from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import { IconBubble } from '@/components/icon-bubble';
import { PageHero } from '@/components/page-hero';
import { Link } from '@/i18n/navigation';

export async function LandingChoice() {
  const t = await getTranslations('landing');

  return (
    <div className="mx-auto max-w-3xl sm:min-h-[calc(100dvh-10.5rem)] sm:pt-4">
      <PageHero
        align="center"
        kicker={t('kicker')}
        title={t('title')}
        intro={t('intro')}
        icon={
          <IconBubble tone="accent" className="size-14 rounded-[1.15rem] bg-white/10">
            <MessageCircleHeart className="size-7" />
          </IconBubble>
        }
      />
      <ul className="mt-6 flex flex-wrap justify-center gap-2">
        <li className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80">
          <Clock className="size-3.5 text-highlight" aria-hidden="true" />
          {t('minutes')}
        </li>
        <li className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/80">
          <Languages className="size-3.5 text-highlight" aria-hidden="true" />
          {t('bilingual')}
        </li>
      </ul>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link
          href="/visited"
          className="landing-card-enter group relative flex min-h-[10.5rem] flex-col overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-[0_16px_40px_rgba(0,0,0,0.22)] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_20px_48px_rgba(0,0,0,0.32)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-6"
        >
          <span className="absolute inset-x-0 top-0 h-1 bg-accent" aria-hidden="true" />
          <IconBubble className="size-14 rounded-[1.15rem]">
            <CalendarCheck className="size-7" />
          </IconBubble>
          <h2 className="mt-4 font-display text-[1.45rem] font-bold leading-tight tracking-tight sm:text-[1.7rem]">
            {t('visitedTitle')}
          </h2>
          <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted-foreground">
            {t('visitedText')}
          </p>
          <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-secondary">
            {t('continue')}
            <ChevronRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" />
          </span>
        </Link>
        <Link
          href="/missed"
          className="landing-card-enter group relative flex min-h-[10.5rem] flex-col overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-[0_16px_40px_rgba(0,0,0,0.22)] transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_20px_48px_rgba(0,0,0,0.32)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-6"
        >
          <span className="absolute inset-x-0 top-0 h-1 bg-primary" aria-hidden="true" />
          <IconBubble tone="secondary" className="size-14 rounded-[1.15rem]">
            <UserRoundX className="size-7" />
          </IconBubble>
          <h2 className="mt-4 font-display text-[1.45rem] font-bold leading-tight tracking-tight sm:text-[1.7rem]">
            {t('missedTitle')}
          </h2>
          <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted-foreground">
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

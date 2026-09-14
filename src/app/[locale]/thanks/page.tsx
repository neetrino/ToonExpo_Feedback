import { CalendarDays, ChevronDown, Home, Inbox, Sparkles } from 'lucide-react';
import { IconBubble } from '@/components/icon-bubble';
import { PageShell } from '@/components/page-shell';
import { SuccessCheck } from '@/components/success-check';
import { buttonVariants } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { parseLocale } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { getTranslations, setRequestLocale } from 'next-intl/server';

const VOL2_REGISTRATION_URL = 'https://bit.ly/te2v_feedback';

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
            className="relative flex flex-col items-center overflow-hidden rounded-3xl border border-border bg-card px-6 py-10 text-center shadow-[0_8px_32px_rgba(0,48,61,0.08)] sm:px-8 sm:py-12"
          >
            <span className="absolute inset-x-0 top-0 h-1 bg-highlight" aria-hidden="true" />
            <span className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-success/10" />
            <SuccessCheck />
            <h1 className="mt-6 font-display text-2xl font-extrabold tracking-tight md:text-3xl">
              {t('title')}
            </h1>
            <p className="mt-3 max-w-sm text-base leading-relaxed text-muted-foreground">
              {t('text')}
            </p>
            <ul className="mt-6 grid w-full gap-2 text-left text-sm">
              <li className="flex items-center gap-3 rounded-2xl border border-border bg-muted/60 px-3 py-2.5">
                <IconBubble tone="success" className="size-9">
                  <Inbox className="size-4" />
                </IconBubble>
                {t('received')}
              </li>
              <li className="flex items-center gap-3 rounded-2xl border border-border bg-muted/60 px-3 py-2.5">
                <IconBubble tone="gold" className="size-9">
                  <Sparkles className="size-4" />
                </IconBubble>
                {t('impact')}
              </li>
            </ul>
            <div className="mt-8 flex w-full flex-col gap-3 sm:items-center">
              <div className="w-full rounded-[1.75rem] border border-highlight/50 bg-highlight/15 px-4 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.55)]">
                <div className="flex flex-col items-center gap-1.5">
                  <p className="font-display text-xl font-extrabold tracking-tight text-primary">
                    {t('registerLabel')}
                  </p>
                  <p className="max-w-[16rem] text-sm leading-snug text-secondary">
                    {t('registerHint')}
                  </p>
                  <ChevronDown
                    className="mt-1 size-5 text-secondary motion-safe:animate-bounce"
                    aria-hidden="true"
                  />
                </div>
                <a
                  href={VOL2_REGISTRATION_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: 'gold', size: 'lg' }),
                    'mt-1 w-full whitespace-normal text-center leading-snug shadow-[0_8px_20px_rgba(0,48,61,0.12)]',
                  )}
                >
                  <CalendarDays className="size-4 shrink-0" aria-hidden="true" />
                  {t('register')}
                </a>
              </div>
              <Link
                href="/"
                className={cn(
                  buttonVariants({ variant: 'secondary', size: 'lg' }),
                  'w-full sm:w-auto',
                )}
              >
                <Home className="size-4" aria-hidden="true" />
                {t('home')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

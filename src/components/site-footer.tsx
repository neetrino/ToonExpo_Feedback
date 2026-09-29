import { getLocale, getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';
import { ToonExpoLogo } from '@/components/brand/toon-expo-logo';

const FOOTER_LINK_CLASS =
  'rounded-sm underline decoration-white/50 underline-offset-4 transition-colors hover:decoration-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary motion-reduce:transition-none';

const NEETRINO_URL = 'https://www.neetrino.com/';
const REGISTRATION_ORIGIN = 'https://reg.toonexpo.com';

function privacyHref(locale: string): string {
  return `${REGISTRATION_ORIGIN}/${locale}/privacy`;
}

function BrandLink({ children }: { children: ReactNode }) {
  return (
    <a href={NEETRINO_URL} target="_blank" rel="noopener noreferrer" className={FOOTER_LINK_CLASS}>
      {children}
    </a>
  );
}

function FooterMark() {
  return (
    <div className="flex items-center gap-2 text-xs tracking-wide text-white/60">
      <ToonExpoLogo size={22} inverted className="opacity-90" />
      <span>TOON EXPO Invest 2026 Vol. 2</span>
    </div>
  );
}

export async function SiteFooter() {
  const t = await getTranslations('footer');
  const locale = await getLocale();

  return (
    <footer className="border-t border-white/10 bg-primary text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-7">
        <FooterMark />
        <div className="flex flex-col items-start justify-center gap-3 text-sm leading-relaxed tracking-wide sm:flex-row sm:items-center sm:justify-between">
          <p className="text-left">
            {t.rich('copyright', {
              brand: (chunks) => <BrandLink>{chunks}</BrandLink>,
            })}
          </p>
          <a href={privacyHref(locale)} className={FOOTER_LINK_CLASS}>
            {t('privacy')}
          </a>
        </div>
      </div>
    </footer>
  );
}

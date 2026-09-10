import { LandingChoice } from '@/components/landing-choice';
import { PageShell } from '@/components/page-shell';
import { parseLocale } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: HomePageProps) {
  const locale = parseLocale((await params).locale);
  setRequestLocale(locale);

  return (
    <PageShell>
      <LandingChoice />
    </PageShell>
  );
}

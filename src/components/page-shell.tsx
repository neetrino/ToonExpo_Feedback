import type { ReactNode } from 'react';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex flex-1 flex-col bg-background">
        <div className="mx-auto w-full max-w-3xl px-4 pb-10 pt-6 sm:pt-10">{children}</div>
      </main>
      <SiteFooter />
    </div>
  );
}

import type { ReactNode } from 'react';
import { SiteHeader } from '@/components/site-header';

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto min-h-dvh w-full max-w-3xl px-4 pb-16">
      <SiteHeader />
      <main>{children}</main>
    </div>
  );
}

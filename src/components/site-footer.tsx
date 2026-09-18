import { ToonExpoLogo } from '@/components/brand/toon-expo-logo';

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-primary">
      <div className="mx-auto flex max-w-6xl items-center gap-2 px-4 py-5 text-xs tracking-wide text-white/60">
        <ToonExpoLogo size={22} inverted className="opacity-90" />
        <span>TOON EXPO Invest 2026 Vol. 2</span>
      </div>
    </footer>
  );
}

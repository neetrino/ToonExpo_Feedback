import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { LanguageSwitcher } from '@/components/language-switcher';

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between gap-4 py-6">
      <Link href="/" className="inline-flex items-center">
        <Image
          src="/brand/toon-expo-logo-pill.png"
          alt="TOON EXPO"
          width={180}
          height={56}
          priority
        />
      </Link>
      <LanguageSwitcher />
    </header>
  );
}

import { ArrowLeft } from 'lucide-react';
import { Link } from '@/i18n/navigation';

export function BackLink({ label }: { label: string }) {
  return (
    <p className="mt-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-white/70 underline-offset-4 hover:text-highlight hover:underline"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        {label}
      </Link>
    </p>
  );
}

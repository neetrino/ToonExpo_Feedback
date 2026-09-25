'use client';

import { useState } from 'react';
import { createSubmitGuard } from '@/lib/submit-guard';

type SubmitRunner = (action: () => Promise<boolean>) => Promise<void>;

/** React binding for {@link createSubmitGuard}. */
export function useSubmitGuard(): { pending: boolean; run: SubmitRunner } {
  const [pending, setPending] = useState(false);
  const [guard] = useState(() => createSubmitGuard(setPending));

  return { pending, run: guard.run };
}

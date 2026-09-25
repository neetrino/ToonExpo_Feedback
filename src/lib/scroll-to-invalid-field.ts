const SCROLL_WAIT_MS = 700;
const SCROLL_RETRY_MS = 40;

/**
 * Wait until the requested step is on screen and its first invalid question
 * has been painted, then scroll that question under the sticky header.
 */
export function scrollToFirstInvalidField(stepNumber?: number): void {
  const started = performance.now();
  const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ? 'auto'
    : 'smooth';

  const attempt = () => {
    const panel = document.querySelector<HTMLElement>('.wizard-step-panel');
    const stepReady =
      stepNumber === undefined || panel?.getAttribute('data-step') === String(stepNumber);
    const target = stepReady ? panel?.querySelector<HTMLElement>('[data-invalid="true"]') : null;

    if (!panel || !stepReady || !target) {
      if (performance.now() - started < SCROLL_WAIT_MS) {
        window.setTimeout(attempt, SCROLL_RETRY_MS);
      }
      return;
    }

    target.scrollIntoView({ behavior, block: 'start' });
    const focusable = target.querySelector<HTMLElement>(
      'textarea, input:not([type="hidden"]), [tabindex="-1"]',
    );
    focusable?.focus({ preventScroll: true });
  };

  requestAnimationFrame(attempt);
}

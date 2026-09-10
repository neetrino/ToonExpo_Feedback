/**
 * Controller radios/checkboxes are not registered inputs, so RHF cannot focus them.
 * Scroll the first invalid group into view after a failed last-step submit.
 */
export function scrollToFirstInvalidField(): void {
  requestAnimationFrame(() => {
    const target = document.querySelector<HTMLElement>('[aria-invalid="true"], [role="alert"]');
    target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

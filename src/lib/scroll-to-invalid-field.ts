/**
 * Controller radios/checkboxes are not native RHF inputs, so focus can miss.
 * Wait for React to paint the error, then scroll it into view.
 */
export function scrollToFirstInvalidField(): void {
  const scroll = () => {
    const target = document.querySelector<HTMLElement>('[aria-invalid="true"], [role="alert"]');
    if (!target) {
      return;
    }
    target.focus({ preventScroll: true });
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  requestAnimationFrame(() => {
    requestAnimationFrame(scroll);
  });
  window.setTimeout(scroll, 50);
}

type SubmitGuard = {
  run: (action: () => Promise<boolean>) => Promise<void>;
};

/**
 * Allows one submit attempt at a time.
 * A failed attempt can be retried. A successful attempt stays locked so a
 * second click cannot post again before the page navigates away.
 */
export function createSubmitGuard(onPendingChange?: (pending: boolean) => void): SubmitGuard {
  let locked = false;

  return {
    async run(action) {
      if (locked) {
        return;
      }
      locked = true;
      onPendingChange?.(true);
      let keepLocked = false;
      try {
        keepLocked = await action();
      } finally {
        if (!keepLocked) {
          locked = false;
          onPendingChange?.(false);
        }
      }
    },
  };
}

import { describe, expect, it } from 'vitest';
import { createSubmitGuard } from '@/lib/submit-guard';

function deferred(): { promise: Promise<void>; resolve: () => void } {
  let resolve: () => void = () => undefined;
  const promise = new Promise<void>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}

describe('createSubmitGuard', () => {
  it('ignores a second call while the first attempt is in flight', async () => {
    const gate = deferred();
    let calls = 0;
    const guard = createSubmitGuard();
    const action = async () => {
      calls += 1;
      await gate.promise;
      return true;
    };

    const first = guard.run(action);
    const second = guard.run(action);
    gate.resolve();
    await Promise.all([first, second]);

    expect(calls).toBe(1);
  });

  it('allows another attempt after failure', async () => {
    let calls = 0;
    const guard = createSubmitGuard();
    await guard.run(async () => {
      calls += 1;
      return false;
    });
    await guard.run(async () => {
      calls += 1;
      return false;
    });
    expect(calls).toBe(2);
  });

  it('stays locked after a successful attempt', async () => {
    let calls = 0;
    const pending: boolean[] = [];
    const guard = createSubmitGuard((value) => {
      pending.push(value);
    });

    await guard.run(async () => {
      calls += 1;
      return true;
    });
    await guard.run(async () => {
      calls += 1;
      return true;
    });

    expect(calls).toBe(1);
    expect(pending).toEqual([true]);
  });

  it('clears pending when the attempt does not succeed', async () => {
    const pending: boolean[] = [];
    const guard = createSubmitGuard((value) => {
      pending.push(value);
    });
    await guard.run(async () => false);
    expect(pending).toEqual([true, false]);
  });

  it('unlocks when the action throws', async () => {
    const guard = createSubmitGuard();
    await expect(
      guard.run(async () => {
        throw new Error('fail');
      }),
    ).rejects.toThrow('fail');

    let calls = 0;
    await guard.run(async () => {
      calls += 1;
      return false;
    });
    expect(calls).toBe(1);
  });
});

import type { UseFormRegisterReturn } from 'react-hook-form';

export function HoneypotField({ registration }: { registration: UseFormRegisterReturn }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -left-[10000px] h-px w-px overflow-hidden opacity-0"
    >
      <label>
        Website
        <input type="text" tabIndex={-1} autoComplete="off" maxLength={120} {...registration} />
      </label>
    </div>
  );
}

'use client';

import { useTranslations } from 'next-intl';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { cn } from '@/lib/utils';

type FieldIssue = { message?: string };

export function FieldErrorText({ error }: { error?: FieldIssue }) {
  const t = useTranslations('errors');
  if (!error) {
    return null;
  }
  const key = error.message === 'invalid_phone' ? 'invalidPhone' : 'required';
  return <p className="mt-1 text-sm text-destructive">{t(key)}</p>;
}

export function TextField({
  label,
  registration,
  error,
  type = 'text',
  autoComplete,
}: {
  label: string;
  registration: UseFormRegisterReturn;
  error?: FieldIssue;
  type?: 'text' | 'email' | 'tel';
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      <input
        type={type}
        autoComplete={autoComplete}
        className={cn(
          'w-full rounded-xl border bg-card px-3 py-2.5 text-base outline-none focus:border-accent',
          error ? 'border-destructive' : 'border-border',
        )}
        {...registration}
      />
      <FieldErrorText error={error} />
    </label>
  );
}

export function TextAreaField({
  label,
  registration,
  error,
}: {
  label: string;
  registration: UseFormRegisterReturn;
  error?: FieldIssue;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      <textarea
        rows={3}
        className={cn(
          'w-full rounded-xl border bg-card px-3 py-2.5 text-base outline-none focus:border-accent',
          error ? 'border-destructive' : 'border-border',
        )}
        {...registration}
      />
      <FieldErrorText error={error} />
    </label>
  );
}

export function CheckboxGroup<T extends string>({
  label,
  options,
  values,
  onToggle,
  error,
  optionLabel,
}: {
  label: string;
  options: readonly T[];
  values: readonly T[];
  onToggle: (value: T) => void;
  error?: FieldIssue;
  optionLabel: (value: T) => string;
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-base font-semibold">{label}</legend>
      <div className="grid gap-2">
        {options.map((option) => (
          <label
            key={option}
            className="flex items-start gap-3 rounded-xl border border-border bg-card px-3 py-2.5"
          >
            <input
              type="checkbox"
              className="mt-1"
              checked={values.includes(option)}
              onChange={() => onToggle(option)}
            />
            <span>{optionLabel(option)}</span>
          </label>
        ))}
      </div>
      <FieldErrorText error={error} />
    </fieldset>
  );
}

export function SelectField<T extends string>({
  label,
  options,
  value,
  onChange,
  error,
  optionLabel,
  placeholder,
}: {
  label: string;
  options: readonly T[];
  value: T | '';
  onChange: (value: T) => void;
  error?: FieldIssue;
  optionLabel: (value: T) => string;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      <select
        className={cn(
          'w-full rounded-xl border bg-card px-3 py-2.5 text-base outline-none focus:border-accent',
          error ? 'border-destructive' : 'border-border',
        )}
        value={value}
        onChange={(event) => onChange(event.target.value as T)}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {optionLabel(option)}
          </option>
        ))}
      </select>
      <FieldErrorText error={error} />
    </label>
  );
}

export function ScoreField({
  label,
  low,
  high,
  value,
  onChange,
  error,
}: {
  label: string;
  low: string;
  high: string;
  value: number | undefined;
  onChange: (value: number) => void;
  error?: FieldIssue;
}) {
  return (
    <fieldset>
      <legend className="mb-2 text-base font-semibold">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 10 }, (_, index) => index + 1).map((score) => (
          <button
            key={score}
            type="button"
            onClick={() => onChange(score)}
            className={cn(
              'h-10 w-10 rounded-lg border text-sm font-semibold',
              value === score
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-foreground',
            )}
          >
            {score}
          </button>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-xs text-muted-foreground">
        <span>{low}</span>
        <span>{high}</span>
      </div>
      <FieldErrorText error={error} />
    </fieldset>
  );
}

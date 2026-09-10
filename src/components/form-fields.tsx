'use client';

import type { ReactNode } from 'react';
import { Frown, Smile } from 'lucide-react';
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
  return (
    <p className="mt-1.5 text-sm text-destructive" role="alert">
      {t(key)}
    </p>
  );
}

const controlClassName =
  'w-full min-h-12 rounded-2xl border bg-card px-4 py-3 text-base outline-none ring-offset-background transition-[border-color,box-shadow] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2';

export function TextField({
  label,
  registration,
  error,
  type = 'text',
  autoComplete,
  inputMode,
  placeholder,
  icon,
}: {
  label: string;
  registration: UseFormRegisterReturn;
  error?: FieldIssue;
  type?: 'text' | 'email' | 'tel';
  autoComplete?: string;
  inputMode?: 'text' | 'email' | 'tel';
  placeholder?: string;
  icon?: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium">{label}</span>
      <span className="relative block">
        {icon ? (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-accent">
            {icon}
          </span>
        ) : null}
        <input
          type={type}
          autoComplete={autoComplete}
          inputMode={inputMode}
          placeholder={placeholder}
          className={cn(
            controlClassName,
            icon && 'pl-11',
            error ? 'border-destructive' : 'border-input',
          )}
          {...registration}
        />
      </span>
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
      <span className="mb-2 block text-sm font-medium leading-snug">{label}</span>
      <textarea
        rows={4}
        className={cn(
          controlClassName,
          'min-h-28 resize-y',
          error ? 'border-destructive' : 'border-input',
        )}
        {...registration}
      />
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
      <legend className="mb-3 text-[15px] font-semibold leading-snug">{label}</legend>
      <div className="grid grid-cols-5 gap-2">
        {Array.from({ length: 10 }, (_, index) => index + 1).map((score) => (
          <button
            key={score}
            type="button"
            onClick={() => onChange(score)}
            className={cn(
              'flex min-h-12 items-center justify-center rounded-xl border text-sm font-semibold transition-colors duration-200 motion-reduce:transition-none',
              value === score
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-input bg-card text-foreground hover:border-accent',
            )}
          >
            {score}
          </button>
        ))}
      </div>
      <div className="mt-2 flex justify-between gap-3 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <Frown className="size-3.5" aria-hidden="true" />
          {low}
        </span>
        <span className="inline-flex items-center gap-1 text-right">
          {high}
          <Smile className="size-3.5 text-accent" aria-hidden="true" />
        </span>
      </div>
      <FieldErrorText error={error} />
    </fieldset>
  );
}

export function QuestionBlock({
  legend,
  error,
  icon,
  children,
}: {
  legend: string;
  error?: FieldIssue;
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <fieldset>
      <legend className="mb-3 flex items-start gap-2 text-[15px] font-semibold leading-snug">
        {icon ? <span className="mt-0.5 text-accent">{icon}</span> : null}
        <span>{legend}</span>
      </legend>
      {children}
      <FieldErrorText error={error} />
    </fieldset>
  );
}

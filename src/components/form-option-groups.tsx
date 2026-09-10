import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

type OptionRadioGroupProps<T extends string> = {
  name: string;
  value: T | '';
  options: readonly T[];
  getLabel: (value: T) => string;
  onChange: (value: T) => void;
  error?: boolean;
};

export function OptionRadioGroup<T extends string>({
  name,
  value,
  options,
  getLabel,
  onChange,
  error = false,
}: OptionRadioGroupProps<T>) {
  return (
    <div className="space-y-2" role="radiogroup" aria-invalid={error || undefined}>
      {options.map((option) => {
        const id = `${name}-${option}`;
        const checked = value === option;

        return (
          <label
            key={option}
            htmlFor={id}
            className={cn(
              'flex min-h-12 cursor-pointer items-start gap-3 rounded-2xl border px-4 py-3.5 transition-[border-color,background-color,box-shadow] duration-200 motion-reduce:transition-none',
              checked
                ? 'border-accent bg-accent text-accent-foreground shadow-[inset_0_0_0_1px_var(--accent)]'
                : 'border-input bg-card hover:border-secondary/60 hover:bg-muted/60',
              error && !checked && 'border-destructive/40',
            )}
          >
            <input
              id={id}
              type="radio"
              name={name}
              value={option}
              checked={checked}
              className="mt-0.5 size-4 shrink-0 accent-highlight"
              onChange={() => onChange(option)}
            />
            <span
              className={cn(
                'text-[15px] leading-snug',
                checked ? 'font-medium' : 'text-foreground',
              )}
            >
              {getLabel(option)}
            </span>
            {checked ? (
              <Check className="ml-auto mt-0.5 size-4 shrink-0" aria-hidden="true" />
            ) : null}
          </label>
        );
      })}
    </div>
  );
}

type OptionCheckboxGroupProps<T extends string> = {
  name: string;
  values: readonly T[];
  options: readonly T[];
  getLabel: (value: T) => string;
  onToggle: (value: T) => void;
  error?: boolean;
};

export function OptionCheckboxGroup<T extends string>({
  name,
  values,
  options,
  getLabel,
  onToggle,
  error = false,
}: OptionCheckboxGroupProps<T>) {
  return (
    <div className="space-y-2" aria-invalid={error || undefined}>
      {options.map((option) => {
        const id = `${name}-${option}`;
        const checked = values.includes(option);

        return (
          <label
            key={option}
            htmlFor={id}
            className={cn(
              'flex min-h-12 cursor-pointer items-start gap-3 rounded-2xl border px-4 py-3.5 transition-[border-color,background-color,box-shadow] duration-200 motion-reduce:transition-none',
              checked
                ? 'border-accent bg-accent text-accent-foreground shadow-[inset_0_0_0_1px_var(--accent)]'
                : 'border-input bg-card hover:border-secondary/60 hover:bg-muted/60',
              error && !checked && 'border-destructive/40',
            )}
          >
            <input
              id={id}
              type="checkbox"
              name={name}
              value={option}
              checked={checked}
              className="mt-0.5 size-4 shrink-0 rounded border border-input accent-highlight"
              onChange={() => onToggle(option)}
            />
            <span
              className={cn(
                'text-[15px] leading-snug',
                checked ? 'font-medium' : 'text-foreground',
              )}
            >
              {getLabel(option)}
            </span>
            {checked ? (
              <Check className="ml-auto mt-0.5 size-4 shrink-0" aria-hidden="true" />
            ) : null}
          </label>
        );
      })}
    </div>
  );
}

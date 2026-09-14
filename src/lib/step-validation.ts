import type { FieldPath, FieldValues, UseFormSetError } from 'react-hook-form';
import type { ZodError, ZodIssue } from 'zod';

type StepSchema = {
  safeParse: (data: unknown) => { success: true } | { success: false; error: ZodError };
};

type StepForm<T extends FieldValues> = {
  clearErrors: () => void;
  setError: UseFormSetError<T>;
};

export function issuesForStep(error: ZodError, fields: readonly string[]): ZodIssue[] {
  return error.issues.filter((issue) => {
    const path = issue.path.join('.');
    return fields.some((field) => path === field || path.startsWith(`${field}.`));
  });
}

export function validateWizardStep<T extends FieldValues>(
  schema: StepSchema,
  values: unknown,
  fields: readonly FieldPath<T>[],
  form: StepForm<T>,
): boolean {
  form.clearErrors();
  const parsed = schema.safeParse(values);
  if (parsed.success) {
    return true;
  }

  const issues = issuesForStep(parsed.error, fields);
  if (issues.length === 0) {
    return true;
  }

  for (const issue of issues) {
    const path = issue.path.join('.');
    if (!path) {
      continue;
    }
    form.setError(path as FieldPath<T>, { type: 'manual', message: issue.message });
  }
  return false;
}

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

  applyIssues(issues, form);
  return false;
}

export type WizardPayloadResult = { valid: true } | { valid: false; step: number | null };

/**
 * Checks the whole form and marks only the earliest incomplete step.
 * `step: null` means the payload failed without a field on any step.
 */
export function validateWizardPayload<T extends FieldValues>(
  schema: StepSchema,
  values: unknown,
  steps: readonly (readonly FieldPath<T>[])[],
  form: StepForm<T>,
): WizardPayloadResult {
  const parsed = schema.safeParse(values);
  if (parsed.success) {
    form.clearErrors();
    return { valid: true };
  }

  const step = steps.findIndex((fields) => issuesForStep(parsed.error, fields).length > 0);
  form.clearErrors();
  const fields = steps[step];
  if (step < 0 || !fields) {
    return { valid: false, step: null };
  }

  applyIssues(issuesForStep(parsed.error, fields), form);
  return { valid: false, step };
}

function applyIssues<T extends FieldValues>(issues: readonly ZodIssue[], form: StepForm<T>): void {
  for (const issue of issues) {
    const path = issue.path.join('.');
    if (!path) {
      continue;
    }
    form.setError(path as FieldPath<T>, { type: 'manual', message: issue.message });
  }
}

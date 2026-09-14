const MAX_TEXT = 500;
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
const FORMULA_PREFIX = /^[=+\-@\t\r]/;

export function clipText(value: string): string {
  return value.replace(CONTROL_CHARS, '').trim().slice(0, MAX_TEXT);
}

export function sanitizeFreeText(value: string): string {
  const clipped = clipText(value);
  if (!FORMULA_PREFIX.test(clipped)) {
    return clipped;
  }
  return `'${clipped}`.slice(0, MAX_TEXT);
}

export function joinSheetList(values: readonly string[]): string {
  return values.join(' | ');
}

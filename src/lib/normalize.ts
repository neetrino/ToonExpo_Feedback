const MAX_TEXT = 500;

export function clipText(value: string): string {
  return value.trim().slice(0, MAX_TEXT);
}

export function joinSheetList(values: readonly string[]): string {
  return values.join(' | ');
}

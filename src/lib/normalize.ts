import { parsePhoneNumberFromString } from 'libphonenumber-js';

const MAX_NAME = 80;
const MAX_TEXT = 500;

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function normalizePhone(phone: string): string {
  const parsed = parsePhoneNumberFromString(phone.trim(), 'AM');
  if (!parsed || !parsed.isValid()) {
    throw new Error('INVALID_PHONE');
  }
  return parsed.number;
}

export function clipName(value: string): string {
  return value.trim().slice(0, MAX_NAME);
}

export function clipText(value: string): string {
  return value.trim().slice(0, MAX_TEXT);
}

export function joinSheetList(values: readonly string[]): string {
  return values.join(' | ');
}

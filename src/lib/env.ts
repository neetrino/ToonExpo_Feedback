function readEnv(name: string): string | undefined {
  const value = process.env[name];
  if (!value || value.trim() === '') {
    return undefined;
  }
  return value;
}

export function getDatabaseUrl(): string {
  const url = readEnv('DATABASE_URL');
  if (!url) {
    throw new Error('DATABASE_URL is not set');
  }
  return url;
}

export function getSheetsWebhookUrl(): string | undefined {
  return readEnv('SHEETS_WEBHOOK_URL');
}

export function getSheetsWebhookSecret(): string | undefined {
  return readEnv('SHEETS_WEBHOOK_SECRET');
}

export function isSheetsCronEnabled(): boolean {
  const value = readEnv('SHEETS_CRON_ENABLED');
  return value === 'true' || value === '1';
}

export function getCronSecret(): string | undefined {
  return readEnv('CRON_SECRET');
}

export const DATABASE_CONNECTION_LIMIT = Number(readEnv('DATABASE_CONNECTION_LIMIT') ?? '5');

import { PrismaNeon } from '@prisma/adapter-neon';
import { PrismaClient } from '@/generated/prisma';
import { DATABASE_CONNECTION_LIMIT, getDatabaseUrl } from '@/lib/env';

const STATEMENT_TIMEOUT_MS = 10_000;
const IDLE_IN_TRANSACTION_TIMEOUT_MS = 10_000;
const LOCK_TIMEOUT_MS = 5_000;

function createPrismaClient(): PrismaClient {
  const adapter = new PrismaNeon({
    connectionString: getDatabaseUrl(),
    max: DATABASE_CONNECTION_LIMIT,
  });

  return new PrismaClient({
    adapter,
  });
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function getPrismaClient(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();
  }
  return globalForPrisma.prisma;
}

export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, property) {
    const client = getPrismaClient();
    const value = Reflect.get(client, property, client) as unknown;
    if (typeof value === 'function') {
      return value.bind(client);
    }
    return value;
  },
});

export async function applySessionLimits(): Promise<void> {
  await prisma.$executeRawUnsafe(`SET statement_timeout = ${STATEMENT_TIMEOUT_MS}`);
  await prisma.$executeRawUnsafe(
    `SET idle_in_transaction_session_timeout = ${IDLE_IN_TRANSACTION_TIMEOUT_MS}`,
  );
  await prisma.$executeRawUnsafe(`SET lock_timeout = ${LOCK_TIMEOUT_MS}`);
}

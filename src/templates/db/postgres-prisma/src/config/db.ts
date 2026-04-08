import { PrismaClient } from '@prisma/client';
import { appEnv } from './env.js';

export class DatabaseClient {
  public readonly prisma = new PrismaClient({
    datasourceUrl: appEnv.DATABASE_URL,
    log: appEnv.NODE_ENV === 'development' ? ['query', 'warn', 'error'] : ['error']
  });

  public async connect(): Promise<void> {
    await this.prisma.$connect();
  }

  public async close(): Promise<void> {
    await this.prisma.$disconnect();
  }
}

export const databaseClient = new DatabaseClient();
export const prisma = databaseClient.prisma;

export const connectDatabase = async (): Promise<void> => {
  await databaseClient.connect();
};

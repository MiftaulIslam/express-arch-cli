import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { appEnv } from './env.js';
import * as schema from '../database/schema/index.js';

export type Database = PostgresJsDatabase<typeof schema>;

export class DatabaseClient {
  private readonly client = postgres(appEnv.DATABASE_URL, {
    max: appEnv.DB_MAX_CONNECTIONS,
    ssl: 'require',
    prepare: false
  });

  public readonly db: Database = drizzle(this.client, {
    schema,
    logger: appEnv.NODE_ENV === 'development'
  });

  public async connect(): Promise<void> {
    await this.client`select 1`;
  }

  public async close(): Promise<void> {
    await this.client.end();
  }
}

export const databaseClient = new DatabaseClient();
export const db = databaseClient.db;

export const connectDatabase = async (): Promise<void> => {
  await databaseClient.connect();
};

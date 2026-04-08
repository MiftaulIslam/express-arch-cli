import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { appEnv } from './env.js';
import * as schema from '../database/schema/index.js';

export class DatabaseClient {
  private readonly pool = mysql.createPool({
    uri: appEnv.DATABASE_URL,
    connectionLimit: appEnv.DB_MAX_CONNECTIONS
  });

  public readonly db = drizzle(this.pool, {
    schema,
    logger: appEnv.NODE_ENV === 'development'
  });

  public async connect(): Promise<void> {
    const connection = await this.pool.getConnection();
    connection.release();
  }

  public async close(): Promise<void> {
    await this.pool.end();
  }
}

export const databaseClient = new DatabaseClient();
export const db = databaseClient.db;

export const connectDatabase = async (): Promise<void> => {
  await databaseClient.connect();
};

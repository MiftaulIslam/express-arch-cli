import mongoose from 'mongoose';
import { appEnv } from './env.js';

export class DatabaseClient {
  public async connect(): Promise<void> {
    await mongoose.connect(appEnv.DATABASE_URL, {
      maxPoolSize: appEnv.DB_MAX_CONNECTIONS
    });
  }

  public async close(): Promise<void> {
    await mongoose.disconnect();
  }
}

export const databaseClient = new DatabaseClient();

export const connectDatabase = async (): Promise<void> => {
  await databaseClient.connect();
};

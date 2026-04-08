import 'reflect-metadata';
import { AppDataSource } from '../database/data-source.js';

export class DatabaseClient {
  public async connect(): Promise<void> {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
  }

  public async close(): Promise<void> {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  }
}

export const databaseClient = new DatabaseClient();

export const connectDatabase = async (): Promise<void> => {
  await databaseClient.connect();
};

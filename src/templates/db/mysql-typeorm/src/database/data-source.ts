import { DataSource } from 'typeorm';
import { appEnv } from '../config/env.js';

export const AppDataSource = new DataSource({
  type: 'mysql',
  url: appEnv.DATABASE_URL,
  synchronize: false,
  logging: appEnv.NODE_ENV === 'development',
  extra: {
    connectionLimit: appEnv.DB_MAX_CONNECTIONS
  },
  entities: [],
  migrations: [],
  subscribers: []
});

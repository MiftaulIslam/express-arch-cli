import { DataSource } from 'typeorm';
import { appEnv } from '../config/env.js';
import { SampleEntity } from './schema/index.js';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: appEnv.DATABASE_URL,
  synchronize: false,
  logging: appEnv.NODE_ENV === 'development',
  extra: {
    max: appEnv.DB_MAX_CONNECTIONS,
    ssl: { rejectUnauthorized: false }
  },
  entities: [SampleEntity],
  migrations: [],
  subscribers: []
});

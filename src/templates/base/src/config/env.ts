import dotenv from 'dotenv';
import { AppEnvironment } from '../common/enums/app.enum.js';

dotenv.config();

const envSource = process.env;

const getString = (key: string, fallback = ''): string => envSource[key] ?? fallback;

const getNumber = (key: string, fallback: number): number => {
  const value = Number(envSource[key]);
  return Number.isFinite(value) ? value : fallback;
};

const getBoolean = (key: string, fallback: boolean): boolean => {
  const raw = envSource[key];
  if (raw === undefined) {
    return fallback;
  }
  return ['1', 'true', 'yes', 'on'].includes(raw.toLowerCase());
};

const NODE_ENV = (getString('NODE_ENV', AppEnvironment.Development) as AppEnvironment);
const PORT = getNumber('PORT', 5000);
const API_PREFIX = getString('API_PREFIX', '/api/v1');
const APP_BASE_URL = getString('APP_BASE_URL', `http://localhost:${PORT}`);
const CORS_ORIGIN = getString('CORS_ORIGIN', '*');
const DATABASE_URL = getString('DATABASE_URL', '');
const DB_MAX_CONNECTIONS = getNumber('DB_MAX_CONNECTIONS', 10);
const LOG_LEVEL = getString('LOG_LEVEL', 'info');
const JWT_ACCESS_SECRET = getString('JWT_ACCESS_SECRET', '');
const JWT_ACCESS_EXPIRES_IN = getString('JWT_ACCESS_EXPIRES_IN', '1d');
const BCRYPT_SALT_ROUNDS = getNumber('BCRYPT_SALT_ROUNDS', 10);
const AUTH_COOKIE_NAME = getString('AUTH_COOKIE_NAME', 'accessToken');
const COOKIE_SECURE = getBoolean('COOKIE_SECURE', NODE_ENV === AppEnvironment.Production);
const COOKIE_DOMAIN = getString('COOKIE_DOMAIN', '');

export const appEnv = {
  NODE_ENV,
  PORT,
  API_PREFIX,
  APP_BASE_URL,
  CORS_ORIGIN,
  DATABASE_URL,
  DB_MAX_CONNECTIONS,
  LOG_LEVEL,
  JWT_ACCESS_SECRET,
  JWT_ACCESS_EXPIRES_IN,
  BCRYPT_SALT_ROUNDS,
  AUTH_COOKIE_NAME,
  COOKIE_SECURE,
  COOKIE_DOMAIN,
  // Backward-compatible aliases used by templates.
  nodeEnv: NODE_ENV,
  port: PORT,
  corsOrigin: CORS_ORIGIN,
  databaseUrl: DATABASE_URL
} as const;

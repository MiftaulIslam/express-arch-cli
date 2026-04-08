import type { CorsOptions } from 'cors';
import { appEnv } from './env.js';

export const corsOptions: CorsOptions = {
  origin: appEnv.corsOrigin,
  credentials: true
};
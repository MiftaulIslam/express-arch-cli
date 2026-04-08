import pino from 'pino';

export interface AppLogger {
  info: (message: string, meta?: unknown) => void;
  error: (message: string, meta?: unknown) => void;
  warn: (message: string, meta?: unknown) => void;
  debug: (message: string, meta?: unknown) => void;
}

const baseLogger = pino({
  level: process.env.LOG_LEVEL ?? 'info',
  transport:
    process.env.NODE_ENV !== 'production'
      ? {
          target: 'pino-pretty',
          options: { colorize: true, translateTime: 'SYS:standard' }
        }
      : undefined
});

export const logger: AppLogger = {
  info: (message, meta) => baseLogger.info(meta ?? {}, message),
  error: (message, meta) => baseLogger.error(meta ?? {}, message),
  warn: (message, meta) => baseLogger.warn(meta ?? {}, message),
  debug: (message, meta) => baseLogger.debug(meta ?? {}, message)
};

import { createLogger, format, transports } from 'winston';

export interface AppLogger {
  info: (message: string, meta?: unknown) => void;
  error: (message: string, meta?: unknown) => void;
  warn: (message: string, meta?: unknown) => void;
  debug: (message: string, meta?: unknown) => void;
}

const winstonLogger = createLogger({
  level: process.env.LOG_LEVEL ?? 'info',
  format: format.combine(format.timestamp(), format.json()),
  transports: [new transports.Console()]
});

export const logger: AppLogger = {
  info: (message, meta) => winstonLogger.info(message, meta),
  error: (message, meta) => winstonLogger.error(message, meta),
  warn: (message, meta) => winstonLogger.warn(message, meta),
  debug: (message, meta) => winstonLogger.debug(message, meta)
};
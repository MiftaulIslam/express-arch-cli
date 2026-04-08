export interface AppLogger {
  info: (message: string, meta?: unknown) => void;
  error: (message: string, meta?: unknown) => void;
  warn: (message: string, meta?: unknown) => void;
  debug: (message: string, meta?: unknown) => void;
}

const asConsoleMethod = (method: 'log' | 'error' | 'warn' | 'debug') =>
  (message: string, meta?: unknown): void => {
    if (meta === undefined) {
      console[method](message);
      return;
    }
    console[method](message, meta);
  };

export const logger: AppLogger = {
  info: asConsoleMethod('log'),
  error: asConsoleMethod('error'),
  warn: asConsoleMethod('warn'),
  debug: asConsoleMethod('debug')
};
import { App } from './App.js';
import { appEnv } from '../config/env.js';
import { logger } from '../config/logger.js';

export class Server {
  private readonly app: App;

  public constructor() {
    this.app = new App();
  }

  public start(): void {
    const server = this.app.getExpressApp().listen(appEnv.port, () => {
      logger.info(`Server listening on port ${appEnv.port}`);
    });

    process.on('SIGTERM', () => {
      logger.info('SIGTERM received. Closing server.');
      server.close(() => process.exit(0));
    });
  }
}
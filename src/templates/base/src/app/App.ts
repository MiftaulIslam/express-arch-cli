import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { corsOptions } from '../config/cors.js';
import { NotFoundMiddleware } from '../middlewares/NotFoundMiddleware.js';
import { ErrorMiddleware } from '../middlewares/ErrorMiddleware.js';
import { requestContextMiddleware } from '../middlewares/RequestContextMiddleware.js';
import { createRoutes } from '../routes/index.js';

export class App {
  private readonly expressApp = express();

  public constructor() {
    this.configureMiddlewares();
    this.configureRoutes();
    this.configureErrorHandling();
  }

  public getExpressApp(): express.Express {
    return this.expressApp;
  }

  private configureMiddlewares(): void {
    this.expressApp.use(helmet());
    this.expressApp.use(cors(corsOptions));
    this.expressApp.use(express.json());
    this.expressApp.use(express.urlencoded({ extended: true }));
    this.expressApp.use(cookieParser());
    this.expressApp.use(requestContextMiddleware);
    this.expressApp.use('/public', express.static('public'));
  }

  private configureRoutes(): void {
    this.expressApp.use('/api/v1', createRoutes());
  }

  private configureErrorHandling(): void {
    this.expressApp.use(NotFoundMiddleware.handle);
    this.expressApp.use(ErrorMiddleware.handle);
  }
}
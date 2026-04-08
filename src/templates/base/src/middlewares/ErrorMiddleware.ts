import type { ErrorRequestHandler } from 'express';
import { HttpStatus } from '../common/constants/http-status.js';
import { AppError } from '../common/errors/AppError.js';
import { ApiResponse } from '../common/responses/ApiResponse.js';
import { logger } from '../config/logger.js';

export class ErrorMiddleware {
  public static handle: ErrorRequestHandler = (error, _req, res, _next) => {
    if (error instanceof AppError) {
      res.status(error.statusCode).json(ApiResponse.error(error.message, error.details));
      return;
    }

    logger.error('Unhandled error', error);
    res
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(ApiResponse.error('Something went wrong on the server.'));
  };
}
import type { RequestHandler } from 'express';
import { HttpStatus } from '../common/constants/http-status.js';
import { ApiResponse } from '../common/responses/ApiResponse.js';

export class NotFoundMiddleware {
  public static handle: RequestHandler = (_req, res) => {
    res.status(HttpStatus.NOT_FOUND).json(ApiResponse.error('Route not found.'));
  };
}
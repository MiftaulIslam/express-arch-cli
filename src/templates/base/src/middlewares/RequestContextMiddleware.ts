import type { RequestHandler } from 'express';
import { randomUUID } from 'node:crypto';

export const requestContextMiddleware: RequestHandler = (req, _res, next) => {
  req.requestId = req.headers['x-request-id']?.toString() ?? randomUUID();
  next();
};
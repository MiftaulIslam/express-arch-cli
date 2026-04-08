import type { RequestHandler } from 'express';

export const uploadMiddleware: RequestHandler = (_req, _res, next) => {
  next();
};
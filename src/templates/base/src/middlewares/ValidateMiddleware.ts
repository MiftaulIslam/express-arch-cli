import type { RequestHandler } from 'express';

export const validateBody: RequestHandler = (_req, _res, next) => {
  next();
};
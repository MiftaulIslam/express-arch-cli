import type { RequestHandler } from 'express';
import type { ZodSchema } from 'zod';
import { HttpStatus } from '../common/constants/http-status.js';
import { ApiResponse } from '../common/responses/ApiResponse.js';

export const validateBody: RequestHandler = (_req, _res, next) => {
  next();
};

export const validateWithZod = <T>(schema: ZodSchema<T>): RequestHandler => (req, res, next) => {
  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    res.status(HttpStatus.BAD_REQUEST).json(ApiResponse.error('Validation failed', parsed.error.flatten()));
    return;
  }
  req.body = parsed.data;
  next();
};

import type { RequestHandler } from 'express';
import type { AnyObjectSchema } from 'yup';
import { HttpStatus } from '../common/constants/http-status.js';
import { ApiResponse } from '../common/responses/ApiResponse.js';

export const validateBody: RequestHandler = (_req, _res, next) => {
  next();
};

export const validateWithYup = <T>(schema: AnyObjectSchema): RequestHandler => async (req, res, next) => {
  try {
    req.body = (await schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true
    })) as T;
    next();
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json(ApiResponse.error('Validation failed', error));
  }
};

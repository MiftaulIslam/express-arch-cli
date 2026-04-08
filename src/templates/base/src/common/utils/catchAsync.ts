import type { NextFunction, Request, RequestHandler, Response } from 'express';

export const catchAsync =
  <TRequest extends Request = Request>(
    fn: (req: TRequest, res: Response, next: NextFunction) => Promise<unknown>
  ): RequestHandler =>
  (req, res, next) => {
    fn(req as TRequest, res, next).catch(next);
  };

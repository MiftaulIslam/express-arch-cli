import { Router } from 'express';
import { ApiResponse } from '../common/responses/ApiResponse.js';

export const createRoutes = (): Router => {
  const router = Router();

  router.get('/health', (_req, res) => {
    res.json(ApiResponse.success('Service is healthy.', { status: 'ok' }));
  });

  return router;
};
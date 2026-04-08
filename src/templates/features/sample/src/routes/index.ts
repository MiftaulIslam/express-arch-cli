import { Router } from 'express';
import { ApiResponse } from '../common/responses/ApiResponse.js';
import { createSampleRouter } from '../modules/sample/sample.route.js';

export const createRoutes = (): Router => {
  const router = Router();

  router.get('/health', (_req, res) => {
    res.json(ApiResponse.success('Service is healthy.', { status: 'ok' }));
  });

  router.use('/samples', createSampleRouter());

  return router;
};

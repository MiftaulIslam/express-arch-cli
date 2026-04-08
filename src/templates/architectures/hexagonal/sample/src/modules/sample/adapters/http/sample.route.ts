import { Router } from 'express';
import { SampleController } from './sample.controller.js';
import { SampleRepositoryAdapter } from '../persistence/sample.repository.js';
import { SampleUseCase } from '../../ports/input/sample.use-case.js';

const controller = new SampleController(new SampleUseCase(new SampleRepositoryAdapter()));

export const createSampleRouter = (): Router => {
  const router = Router();
  router.get('/', controller.list);
  router.post('/', controller.create);
  return router;
};

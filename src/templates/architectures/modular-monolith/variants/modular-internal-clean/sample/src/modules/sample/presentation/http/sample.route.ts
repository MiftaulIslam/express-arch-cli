import { Router } from 'express';
import { ListSamplesUseCase } from '../../application/use-cases/list-samples.use-case.js';
import { InMemorySampleRepository } from '../../infrastructure/persistence/sample.repository.js';
import { SampleController } from './sample.controller.js';

const controller = new SampleController(new ListSamplesUseCase(new InMemorySampleRepository()));

export const createSampleRouter = (): Router => {
  const router = Router();
  router.get('/', controller.list);
  return router;
};

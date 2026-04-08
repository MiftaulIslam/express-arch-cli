import { Router } from 'express';
import { CreateSampleUseCase } from '../../application/use-cases/create-sample.use-case.js';
import { ListSamplesUseCase } from '../../application/use-cases/list-samples.use-case.js';
import { SampleRepository } from '../../infrastructure/persistence/sample.repository.js';
import { SampleController } from './sample.controller.js';

const repository = new SampleRepository();
const controller = new SampleController(
  new ListSamplesUseCase(repository),
  new CreateSampleUseCase(repository)
);

export const createSampleRouter = (): Router => {
  const router = Router();
  router.get('/', controller.list);
  router.post('/', controller.create);
  return router;
};

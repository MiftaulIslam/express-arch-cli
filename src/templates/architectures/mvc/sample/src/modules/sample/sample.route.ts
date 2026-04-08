import { Router } from 'express';
import { SampleController } from './sample.controller.js';
import { SampleRepository } from './sample.repository.js';
import { SampleService } from './sample.service.js';

const sampleController = new SampleController(new SampleService(new SampleRepository()));

export const createSampleRouter = (): Router => {
  const router = Router();
  router.get('/', sampleController.list);
  router.get('/:id', sampleController.getById);
  router.post('/', sampleController.create);
  return router;
};

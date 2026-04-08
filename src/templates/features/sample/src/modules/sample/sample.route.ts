import { Router } from 'express';
import { SampleController } from './sample.controller.js';
import { SampleRepository } from './sample.repository.js';
import { SampleService } from './sample.service.js';
{{sampleRouteValidationImports}}

const sampleRepository = new SampleRepository();
const sampleService = new SampleService(sampleRepository);
const sampleController = new SampleController(sampleService);

{{sampleSwaggerImport}}

export const createSampleRouter = (): Router => {
  const router = Router();

  router.get('/', sampleController.list);
  router.get('/:id', sampleController.getById);
  router.post('/', {{sampleCreateValidationMiddleware}} sampleController.create);
  router.patch('/:id', {{sampleUpdateValidationMiddleware}} sampleController.update);
  router.delete('/:id', sampleController.remove);

  return router;
};

export const sampleModuleMeta = {
{{sampleSwaggerExport}}
};

import { Router } from 'express';
import { CreateSampleUseCase } from '../../../../application/use-cases/create-sample.use-case.js';
import { ListSamplesUseCase } from '../../../../application/use-cases/list-samples.use-case.js';
import { InMemorySampleRepository } from '../../../../infrastructure/persistence/sample.repository.js';
import { SampleController } from '../controllers/sample.controller.js';

const repository = new InMemorySampleRepository();
const controller = new SampleController(new ListSamplesUseCase(repository), new CreateSampleUseCase(repository));

export const sampleRouter = Router();
sampleRouter.get('/', controller.list);
sampleRouter.post('/', controller.create);

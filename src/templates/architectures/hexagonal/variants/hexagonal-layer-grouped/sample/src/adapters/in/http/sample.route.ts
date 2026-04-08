import { Router } from 'express';
import { ListSamplesUseCase } from '../../../../application/use-cases/list-samples.use-case.js';
import { SampleRepositoryAdapter } from '../../../out/persistence/sample.repository.js';
import { SampleController } from './sample.controller.js';

const controller = new SampleController(new ListSamplesUseCase(new SampleRepositoryAdapter()));

export const sampleRouter = Router();
sampleRouter.get('/', controller.list);

import { Router } from 'express';
import { sampleController } from '../controllers/sample.controller.js';

export const sampleRouter = Router();
sampleRouter.get('/', sampleController.list);
sampleRouter.get('/:id', sampleController.getById);
sampleRouter.post('/', sampleController.create);

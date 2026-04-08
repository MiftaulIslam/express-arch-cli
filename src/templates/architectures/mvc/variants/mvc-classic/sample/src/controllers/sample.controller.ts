import type { Request, Response } from 'express';
import { HttpStatus } from '../common/constants/http-status.js';
import { ApiResponse } from '../common/responses/ApiResponse.js';
import { catchAsync } from '../common/utils/catchAsync.js';
import { SampleRepository } from '../repositories/sample.repository.js';
import { SampleService } from '../services/sample.service.js';

const sampleService = new SampleService(new SampleRepository());

export const sampleController = {
  list: catchAsync(async (_req: Request, res: Response) => {
    res.status(HttpStatus.OK).json(ApiResponse.success('Samples fetched', sampleService.list()));
  }),
  getById: catchAsync(async (req: Request, res: Response) => {
    res.status(HttpStatus.OK).json(ApiResponse.success('Sample fetched', sampleService.getById(req.params.id)));
  }),
  create: catchAsync(async (req: Request, res: Response) => {
    res.status(HttpStatus.CREATED).json(ApiResponse.success('Sample created', sampleService.create(req.body)));
  })
};

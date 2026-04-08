import type { Request, Response } from 'express';
import { HttpStatus } from '../../../common/constants/http-status.js';
import { ApiResponse } from '../../../common/responses/ApiResponse.js';
import { catchAsync } from '../../../common/utils/catchAsync.js';
import type { CreateSampleDto } from './sample.dto.js';
import { SampleService } from './sample.service.js';

export class SampleController {
  public constructor(private readonly service: SampleService) {}

  public list = catchAsync(async (_req: Request, res: Response) => {
    res.status(HttpStatus.OK).json(ApiResponse.success('Samples fetched', this.service.list()));
  });

  public getById = catchAsync(async (req: Request, res: Response) => {
    res.status(HttpStatus.OK).json(ApiResponse.success('Sample fetched', this.service.getById(req.params.id)));
  });

  public create = catchAsync(async (req: Request<unknown, unknown, CreateSampleDto>, res: Response) => {
    res.status(HttpStatus.CREATED).json(ApiResponse.success('Sample created', this.service.create(req.body)));
  });
}

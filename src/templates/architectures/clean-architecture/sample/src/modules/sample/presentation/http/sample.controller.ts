import type { Request, Response } from 'express';
import { HttpStatus } from '../../../../../common/constants/http-status.js';
import { ApiResponse } from '../../../../../common/responses/ApiResponse.js';
import { catchAsync } from '../../../../../common/utils/catchAsync.js';
import { CreateSampleUseCase } from '../../application/use-cases/create-sample.use-case.js';
import { ListSamplesUseCase } from '../../application/use-cases/list-samples.use-case.js';

export class SampleController {
  public constructor(
    private readonly listSamplesUseCase: ListSamplesUseCase,
    private readonly createSampleUseCase: CreateSampleUseCase
  ) {}

  public list = catchAsync(async (_req: Request, res: Response) => {
    const items = await this.listSamplesUseCase.execute();
    res.status(HttpStatus.OK).json(ApiResponse.success('Samples fetched', items));
  });

  public create = catchAsync(async (req: Request, res: Response) => {
    const item = await this.createSampleUseCase.execute(req.body);
    res.status(HttpStatus.CREATED).json(ApiResponse.success('Sample created', item));
  });
}

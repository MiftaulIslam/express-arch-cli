import type { Request, Response } from 'express';
import { HttpStatus } from '../../../../common/constants/http-status.js';
import { ApiResponse } from '../../../../common/responses/ApiResponse.js';
import { catchAsync } from '../../../../common/utils/catchAsync.js';
import { CreateSampleUseCase } from '../../../../application/use-cases/create-sample.use-case.js';
import { ListSamplesUseCase } from '../../../../application/use-cases/list-samples.use-case.js';

export class SampleController {
  public constructor(
    private readonly listUseCase: ListSamplesUseCase,
    private readonly createUseCase: CreateSampleUseCase
  ) {}

  public list = catchAsync(async (_req: Request, res: Response) => {
    res.status(HttpStatus.OK).json(ApiResponse.success('Samples fetched', await this.listUseCase.execute()));
  });

  public create = catchAsync(async (req: Request, res: Response) => {
    res.status(HttpStatus.CREATED).json(ApiResponse.success('Sample created', await this.createUseCase.execute(req.body)));
  });
}

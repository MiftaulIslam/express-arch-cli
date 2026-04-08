import type { Request, Response } from 'express';
import { HttpStatus } from '../../../../../common/constants/http-status.js';
import { ApiResponse } from '../../../../../common/responses/ApiResponse.js';
import { catchAsync } from '../../../../../common/utils/catchAsync.js';
import { SampleUseCase } from '../../ports/input/sample.use-case.js';

export class SampleController {
  public constructor(private readonly useCase: SampleUseCase) {}

  public list = catchAsync(async (_req: Request, res: Response) => {
    res.status(HttpStatus.OK).json(ApiResponse.success('Samples fetched', await this.useCase.list()));
  });

  public create = catchAsync(async (req: Request, res: Response) => {
    res
      .status(HttpStatus.CREATED)
      .json(ApiResponse.success('Sample created', await this.useCase.create(req.body)));
  });
}

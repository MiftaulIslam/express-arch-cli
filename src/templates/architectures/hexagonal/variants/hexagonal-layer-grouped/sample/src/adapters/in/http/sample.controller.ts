import type { Request, Response } from 'express';
import { ApiResponse } from '../../../../common/responses/ApiResponse.js';
import { HttpStatus } from '../../../../common/constants/http-status.js';
import { catchAsync } from '../../../../common/utils/catchAsync.js';
import { ListSamplesUseCase } from '../../../../application/use-cases/list-samples.use-case.js';

export class SampleController {
  public constructor(private readonly listUseCase: ListSamplesUseCase) {}

  public list = catchAsync(async (_req: Request, res: Response) => {
    res.status(HttpStatus.OK).json(ApiResponse.success('Samples fetched', await this.listUseCase.execute()));
  });
}

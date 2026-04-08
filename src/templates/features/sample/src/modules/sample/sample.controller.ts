import type { Request, Response } from 'express';
import { HttpStatus } from '../../common/constants/http-status.js';
import { ApiResponse } from '../../common/responses/ApiResponse.js';
import { catchAsync } from '../../common/utils/catchAsync.js';
import type { CreateSampleDto, UpdateSampleDto } from './sample.dto.js';
import { SampleService } from './sample.service.js';

export class SampleController {
  public constructor(private readonly sampleService: SampleService) {}

  public list = catchAsync(async (_req: Request, res: Response) => {
    const items = await this.sampleService.list();
    res.status(HttpStatus.OK).json(ApiResponse.success('Samples fetched', items));
  });

  public getById = catchAsync(async (req: Request, res: Response) => {
    const item = await this.sampleService.getById(req.params.id);
    res.status(HttpStatus.OK).json(ApiResponse.success('Sample fetched', item));
  });

  public create = catchAsync(async (req: Request<unknown, unknown, CreateSampleDto>, res: Response) => {
    const created = await this.sampleService.create(req.body);
    res.status(HttpStatus.CREATED).json(ApiResponse.success('Sample created', created));
  });

  public update = catchAsync(
    async (req: Request<{ id: string }, unknown, UpdateSampleDto>, res: Response) => {
      const updated = await this.sampleService.update(req.params.id, req.body);
      res.status(HttpStatus.OK).json(ApiResponse.success('Sample updated', updated));
    }
  );

  public remove = catchAsync(async (req: Request, res: Response) => {
    await this.sampleService.remove(req.params.id);
    res.status(HttpStatus.OK).json(ApiResponse.success('Sample deleted', null));
  });
}

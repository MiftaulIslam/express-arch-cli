import { AppError } from '../../../common/errors/AppError.js';
import { HttpStatus } from '../../../common/constants/http-status.js';
import type { CreateSampleDto, SampleDto } from './sample.dto.js';
import { SampleRepository } from './sample.repository.js';

export class SampleService {
  public constructor(private readonly repository: SampleRepository) {}

  public list(): SampleDto[] {
    return this.repository.list();
  }

  public getById(id: string): SampleDto {
    const item = this.repository.getById(id);
    if (!item) {
      throw new AppError('Sample not found', HttpStatus.NOT_FOUND);
    }
    return item;
  }

  public create(payload: CreateSampleDto): SampleDto {
    return this.repository.create(payload);
  }
}

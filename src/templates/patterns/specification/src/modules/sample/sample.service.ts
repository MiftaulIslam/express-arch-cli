import { AppError } from '../../common/errors/AppError.js';
import { HttpStatus } from '../../common/constants/http-status.js';
import type { CreateSampleDto, SampleEntity, UpdateSampleDto } from './sample.dto.js';
import { SampleRepository } from './sample.repository.js';
import { sampleListSpecification } from './specifications/sample-list.specification.js';

export class SampleService {
  public constructor(private readonly sampleRepository: SampleRepository) {}

  public async list(): Promise<SampleEntity[]> {
    const items = this.sampleRepository.findAll();
    return sampleListSpecification(items);
  }

  public async getById(id: string): Promise<SampleEntity> {
    const item = this.sampleRepository.findById(id);
    if (!item) {
      throw new AppError('Sample not found', HttpStatus.NOT_FOUND);
    }
    return item;
  }

  public async create(payload: CreateSampleDto): Promise<SampleEntity> {
    return this.sampleRepository.create(payload);
  }

  public async update(id: string, payload: UpdateSampleDto): Promise<SampleEntity> {
    const updated = this.sampleRepository.update(id, payload);
    if (!updated) {
      throw new AppError('Sample not found', HttpStatus.NOT_FOUND);
    }
    return updated;
  }

  public async remove(id: string): Promise<void> {
    const removed = this.sampleRepository.delete(id);
    if (!removed) {
      throw new AppError('Sample not found', HttpStatus.NOT_FOUND);
    }
  }
}

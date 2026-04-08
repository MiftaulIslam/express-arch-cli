import type { SampleEntity } from '../../../domain/entities/sample.entity.js';
import type { SampleRepository } from '../../../domain/repositories/sample.repository.interface.js';

export class CreateSampleUseCase {
  public constructor(private readonly repository: SampleRepository) {}

  public execute(payload: { name: string; description?: string }): Promise<SampleEntity> {
    return this.repository.create(payload);
  }
}

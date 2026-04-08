import type { SampleEntity } from '../../../domain/entities/sample.entity.js';
import type { SampleRepository } from '../../../domain/repositories/sample.repository.interface.js';

export class ListSamplesUseCase {
  public constructor(private readonly repository: SampleRepository) {}

  public execute(): Promise<SampleEntity[]> {
    return this.repository.list();
  }
}

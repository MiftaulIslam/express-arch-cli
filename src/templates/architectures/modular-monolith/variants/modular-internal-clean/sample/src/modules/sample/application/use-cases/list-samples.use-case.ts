import type { SampleEntity } from '../../domain/sample.entity.js';
import type { SampleRepository } from '../../domain/sample.repository.interface.js';

export class ListSamplesUseCase {
  public constructor(private readonly repository: SampleRepository) {}

  public execute(): Promise<SampleEntity[]> {
    return this.repository.list();
  }
}

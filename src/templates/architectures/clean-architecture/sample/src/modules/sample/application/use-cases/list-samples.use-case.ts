import type { SampleEntity } from '../../domain/sample.entity.js';
import type { SampleRepositoryContract } from '../../domain/sample.repository.interface.js';

export class ListSamplesUseCase {
  public constructor(private readonly repository: SampleRepositoryContract) {}

  public execute(): Promise<SampleEntity[]> {
    return this.repository.list();
  }
}

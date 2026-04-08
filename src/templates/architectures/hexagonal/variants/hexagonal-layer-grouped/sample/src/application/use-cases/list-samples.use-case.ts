import type { SampleEntity } from '../../domain/entities/sample.entity.js';
import type { SampleRepositoryPort } from '../../ports/out/sample.repository.port.js';

export class ListSamplesUseCase {
  public constructor(private readonly repository: SampleRepositoryPort) {}

  public execute(): Promise<SampleEntity[]> {
    return this.repository.list();
  }
}

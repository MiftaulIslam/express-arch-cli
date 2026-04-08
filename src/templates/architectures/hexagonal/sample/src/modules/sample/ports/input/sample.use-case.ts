import type { SampleEntity } from '../../domain/sample.entity.js';
import type { SampleRepositoryPort } from '../output/sample.repository.port.js';

export class SampleUseCase {
  public constructor(private readonly repository: SampleRepositoryPort) {}

  public list(): Promise<SampleEntity[]> {
    return this.repository.list();
  }

  public create(payload: { name: string; description?: string }): Promise<SampleEntity> {
    return this.repository.create(payload);
  }
}

import type { SampleEntity } from '../../domain/sample.entity.js';

export interface SampleRepositoryPort {
  list(): Promise<SampleEntity[]>;
  create(payload: { name: string; description?: string }): Promise<SampleEntity>;
}

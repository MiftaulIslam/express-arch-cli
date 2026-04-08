import type { SampleEntity } from '../../domain/entities/sample.entity.js';

export interface SampleRepositoryPort {
  list(): Promise<SampleEntity[]>;
}

import type { SampleEntity } from '../entities/sample.entity.js';

export interface SampleRepository {
  list(): Promise<SampleEntity[]>;
  create(payload: { name: string; description?: string }): Promise<SampleEntity>;
}

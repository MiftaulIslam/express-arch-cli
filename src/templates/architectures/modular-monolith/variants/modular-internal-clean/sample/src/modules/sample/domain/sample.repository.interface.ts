import type { SampleEntity } from './sample.entity.js';

export interface SampleRepository {
  list(): Promise<SampleEntity[]>;
}

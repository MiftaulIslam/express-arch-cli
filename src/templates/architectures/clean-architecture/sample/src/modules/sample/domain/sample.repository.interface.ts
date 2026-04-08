import type { SampleEntity } from './sample.entity.js';

export interface CreateSampleInput {
  name: string;
  description?: string;
}

export interface SampleRepositoryContract {
  list(): Promise<SampleEntity[]>;
  getById(id: string): Promise<SampleEntity | null>;
  create(payload: CreateSampleInput): Promise<SampleEntity>;
}

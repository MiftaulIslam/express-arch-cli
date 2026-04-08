import { randomUUID } from 'node:crypto';
import type { SampleEntity } from '../../domain/sample.entity.js';
import type {
  CreateSampleInput,
  SampleRepositoryContract
} from '../../domain/sample.repository.interface.js';

export class SampleRepository implements SampleRepositoryContract {
  private readonly items = new Map<string, SampleEntity>();

  public constructor() {
    this.items.set('sample-1', {
      id: 'sample-1',
      name: 'Clean Sample',
      description: 'Seed record',
      isActive: true,
      createdAt: new Date().toISOString()
    });
  }

  public async list(): Promise<SampleEntity[]> {
    return Array.from(this.items.values());
  }

  public async getById(id: string): Promise<SampleEntity | null> {
    return this.items.get(id) ?? null;
  }

  public async create(payload: CreateSampleInput): Promise<SampleEntity> {
    const created: SampleEntity = {
      id: randomUUID(),
      name: payload.name,
      description: payload.description,
      isActive: true,
      createdAt: new Date().toISOString()
    };
    this.items.set(created.id, created);
    return created;
  }
}

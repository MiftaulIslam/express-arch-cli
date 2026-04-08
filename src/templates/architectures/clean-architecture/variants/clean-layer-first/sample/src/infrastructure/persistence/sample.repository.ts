import { randomUUID } from 'node:crypto';
import type { SampleEntity } from '../../domain/entities/sample.entity.js';
import type { SampleRepository } from '../../domain/repositories/sample.repository.interface.js';

export class InMemorySampleRepository implements SampleRepository {
  private readonly items = new Map<string, SampleEntity>();

  public constructor() {
    this.items.set('sample-1', {
      id: 'sample-1',
      name: 'Layer-first sample',
      description: 'Seeded record',
      isActive: true,
      createdAt: new Date().toISOString()
    });
  }

  public async list(): Promise<SampleEntity[]> {
    return Array.from(this.items.values());
  }

  public async create(payload: { name: string; description?: string }): Promise<SampleEntity> {
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

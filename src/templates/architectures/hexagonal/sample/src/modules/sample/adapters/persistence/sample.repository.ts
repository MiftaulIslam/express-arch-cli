import { randomUUID } from 'node:crypto';
import type { SampleEntity } from '../../domain/sample.entity.js';
import type { SampleRepositoryPort } from '../../ports/output/sample.repository.port.js';

export class SampleRepositoryAdapter implements SampleRepositoryPort {
  private readonly items = new Map<string, SampleEntity>();

  public constructor() {
    this.items.set('sample-1', {
      id: 'sample-1',
      name: 'Hexagonal Sample',
      description: 'Seed record',
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

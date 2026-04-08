import { randomUUID } from 'node:crypto';
import type { SampleModel } from '../models/sample.model.js';

export class SampleRepository {
  private readonly items = new Map<string, SampleModel>();

  public constructor() {
    this.items.set('sample-1', {
      id: 'sample-1',
      name: 'Sample Record',
      description: 'Seeded item',
      isActive: true,
      createdAt: new Date().toISOString()
    });
  }

  public list(): SampleModel[] {
    return Array.from(this.items.values());
  }

  public getById(id: string): SampleModel | null {
    return this.items.get(id) ?? null;
  }

  public create(payload: { name: string; description?: string }): SampleModel {
    const created: SampleModel = {
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

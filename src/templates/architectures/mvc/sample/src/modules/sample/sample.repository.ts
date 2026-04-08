import { randomUUID } from 'node:crypto';
import type { CreateSampleDto, SampleDto } from './sample.dto.js';

export class SampleRepository {
  private readonly items = new Map<string, SampleDto>();

  public constructor() {
    const seed: SampleDto = {
      id: 'sample-1',
      name: 'MVC Sample',
      description: 'Seed record',
      isActive: true,
      createdAt: new Date().toISOString()
    };
    this.items.set(seed.id, seed);
  }

  public list(): SampleDto[] {
    return Array.from(this.items.values());
  }

  public getById(id: string): SampleDto | null {
    return this.items.get(id) ?? null;
  }

  public create(payload: CreateSampleDto): SampleDto {
    const created: SampleDto = {
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

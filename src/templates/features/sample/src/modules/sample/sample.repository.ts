import { randomUUID } from 'node:crypto';
import { BaseRepository } from '../../common/repositories/BaseRepository.js';
import type { CreateSampleDto, SampleEntity, UpdateSampleDto } from './sample.dto.js';

export class SampleRepository extends BaseRepository<SampleEntity> {
  public constructor() {
    super();
    this.seedInitial();
  }

  public create(payload: CreateSampleDto): SampleEntity {
    const entity: SampleEntity = {
      id: randomUUID(),
      name: payload.name,
      description: payload.description,
      createdAt: new Date().toISOString()
    };
    return this.save(entity);
  }

  public update(id: string, payload: UpdateSampleDto): SampleEntity | null {
    const existing = this.findById(id);
    if (!existing) {
      return null;
    }

    const next: SampleEntity = {
      ...existing,
      ...payload
    };
    return this.save(next);
  }

  private seedInitial(): void {
    this.save({
      id: 'sample-1',
      name: 'Sample Record',
      description: 'Created during scaffold',
      createdAt: new Date().toISOString()
    });
  }
}

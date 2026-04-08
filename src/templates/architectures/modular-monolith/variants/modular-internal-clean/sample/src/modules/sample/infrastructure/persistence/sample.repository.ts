import type { SampleEntity } from '../../domain/sample.entity.js';
import type { SampleRepository } from '../../domain/sample.repository.interface.js';

export class InMemorySampleRepository implements SampleRepository {
  private readonly items: SampleEntity[] = [
    {
      id: 'sample-1',
      name: 'Modular clean sample',
      description: 'Seeded',
      isActive: true,
      createdAt: new Date().toISOString()
    }
  ];

  public async list(): Promise<SampleEntity[]> {
    return this.items;
  }
}

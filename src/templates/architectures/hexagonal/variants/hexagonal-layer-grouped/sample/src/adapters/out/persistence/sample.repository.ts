import type { SampleEntity } from '../../../domain/entities/sample.entity.js';
import type { SampleRepositoryPort } from '../../../ports/out/sample.repository.port.js';

export class SampleRepositoryAdapter implements SampleRepositoryPort {
  private readonly items: SampleEntity[] = [
    {
      id: 'sample-1',
      name: 'Hex grouped sample',
      description: 'Seeded',
      isActive: true,
      createdAt: new Date().toISOString()
    }
  ];

  public async list(): Promise<SampleEntity[]> {
    return this.items;
  }
}

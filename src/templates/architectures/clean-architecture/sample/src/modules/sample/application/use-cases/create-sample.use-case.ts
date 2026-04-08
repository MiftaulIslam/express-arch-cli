import type { SampleEntity } from '../../domain/sample.entity.js';
import type {
  CreateSampleInput,
  SampleRepositoryContract
} from '../../domain/sample.repository.interface.js';

export class CreateSampleUseCase {
  public constructor(private readonly repository: SampleRepositoryContract) {}

  public execute(payload: CreateSampleInput): Promise<SampleEntity> {
    return this.repository.create(payload);
  }
}

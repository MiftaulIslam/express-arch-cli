import { AppError } from '../common/errors/AppError.js';
import { HttpStatus } from '../common/constants/http-status.js';
import { SampleRepository } from '../repositories/sample.repository.js';

export class SampleService {
  public constructor(private readonly repository: SampleRepository) {}

  public list() {
    return this.repository.list();
  }

  public getById(id: string) {
    const item = this.repository.getById(id);
    if (!item) {
      throw new AppError('Sample not found', HttpStatus.NOT_FOUND);
    }
    return item;
  }

  public create(payload: { name: string; description?: string }) {
    return this.repository.create(payload);
  }
}

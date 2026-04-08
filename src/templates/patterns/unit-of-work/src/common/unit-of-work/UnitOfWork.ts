export interface UnitOfWork {
  runInTransaction<T>(callback: () => Promise<T>): Promise<T>;
}

export class SimpleUnitOfWork implements UnitOfWork {
  public async runInTransaction<T>(callback: () => Promise<T>): Promise<T> {
    return callback();
  }
}

export abstract class BaseRepository<T extends { id: string }> {
  protected readonly items = new Map<string, T>();

  public findAll(): T[] {
    return Array.from(this.items.values());
  }

  public findById(id: string): T | null {
    return this.items.get(id) ?? null;
  }

  public save(item: T): T {
    this.items.set(item.id, item);
    return item;
  }

  public delete(id: string): boolean {
    return this.items.delete(id);
  }
}
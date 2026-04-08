export interface SampleSortStrategy<T> {
  sort(items: T[]): T[];
}

export class NoopSampleSortStrategy<T> implements SampleSortStrategy<T> {
  public sort(items: T[]): T[] {
    return items;
  }
}

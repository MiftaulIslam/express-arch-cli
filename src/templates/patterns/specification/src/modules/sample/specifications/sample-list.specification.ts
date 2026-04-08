import type { SampleEntity } from '../sample.dto.js';

export const sampleListSpecification = (items: SampleEntity[]): SampleEntity[] =>
  items.sort((left, right) => left.name.localeCompare(right.name));

export interface CreateSampleDto {
  name: string;
  description?: string;
}

export interface UpdateSampleDto {
  name?: string;
  description?: string;
}

export interface SampleEntity {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
}

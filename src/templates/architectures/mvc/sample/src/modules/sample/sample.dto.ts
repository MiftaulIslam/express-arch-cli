export interface SampleDto {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
}

export interface CreateSampleDto {
  name: string;
  description?: string;
}

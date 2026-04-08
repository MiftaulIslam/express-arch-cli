import type { ApiSuccessResponse } from '../interfaces/api.types.js';

export const SAMPLE_LIST_RESPONSE: ApiSuccessResponse<{ id: string; name: string }[]> = {
  success: true,
  message: 'Sample records fetched successfully',
  data: [
    { id: '1', name: 'Alpha' },
    { id: '2', name: 'Beta' }
  ]
};
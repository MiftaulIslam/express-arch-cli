import type { Pagination } from '../types/pagination.types.js';

export const buildPagination = (page: number, limit: number, total: number): Pagination => ({
  page,
  limit,
  total
});
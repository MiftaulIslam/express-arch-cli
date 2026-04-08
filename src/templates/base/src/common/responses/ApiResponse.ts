import type { ApiErrorResponse, ApiSuccessResponse } from '../interfaces/api.types.js';

export class ApiResponse {
  public static success<T>(message: string, data: T): ApiSuccessResponse<T> {
    return { success: true, message, data };
  }

  public static error(message: string, error?: unknown): ApiErrorResponse {
    return { success: false, message, error };
  }
}
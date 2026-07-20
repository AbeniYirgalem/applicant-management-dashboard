export interface APIResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface APIError {
  title?: string;
  message: string;
  statusCode?: number;
  code?: string;
  details?: Record<string, unknown>;
}

export interface ValidationError {
  field?: string;
  message: string;
}

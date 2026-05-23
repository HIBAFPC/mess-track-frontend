export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  code?: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

import { AxiosError } from 'axios';

export const parseApiError = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const data = error.response?.data;

    // Handle 'detail' property (common in Django REST Framework)
    if (data?.detail) {
      return data.detail;
    }

    // Handle 'message' property
    if (data?.message) {
      return data.message;
    }

    // Handle field-level validation errors
    if (data && typeof data === 'object') {
      const firstError = Object.values(data)[0];
      if (Array.isArray(firstError)) {
        return firstError[0];
      }
      if (typeof firstError === 'string') {
        return firstError;
      }
    }

    return error.message || 'An unexpected error occurred';
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'An unexpected error occurred';
};

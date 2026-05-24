import { InternalAxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { api } from './client';
import { useAuthStore } from '@/store/auth-store';
import { authApi } from '@/features/auth/api/auth.api';
import { tokenStorage } from '@/features/auth/utils/token-storage';

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export const setupInterceptors = () => {
  // Request Interceptor
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = useAuthStore.getState().accessToken;
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  // Response Interceptor
  api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      // If error is not 401 or request has already been retried, reject
      if (error.response?.status !== 401 || originalRequest._retry) {
        return Promise.reject(error);
      }

      // If it's a 401 and we're already refreshing, queue the request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = tokenStorage.getRefreshToken();

      if (!refreshToken) {
        isRefreshing = false;
        useAuthStore.getState().clearAuth();
        return Promise.reject(error);
      }

      try {
        const tokens = await authApi.refreshToken(refreshToken);
        
        // Handle token rotation if refresh token is provided
        if (tokens.refresh) {
          tokenStorage.saveRefreshToken(tokens.refresh);
        }

        useAuthStore.getState().setAccessToken(tokens.access);
        
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${tokens.access}`;
        }
        
        processQueue(null, tokens.access);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        tokenStorage.clearRefreshToken();
        useAuthStore.getState().clearAuth();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
  );
};

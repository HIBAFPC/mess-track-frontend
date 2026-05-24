'use client';

import { useEffect, ReactNode } from 'react';
import { useAuthStore } from '@/store/auth-store';
import { authApi } from '@/features/auth/api/auth.api';
import { tokenStorage } from '@/features/auth/utils/token-storage';
import { setupInterceptors } from '@/lib/api/auth-interceptor';

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { setAuth, clearAuth, setAuthInitialized, authInitialized } = useAuthStore();

  useEffect(() => {
    // Setup interceptors once
    setupInterceptors();

    const initializeAuth = async () => {
      const refreshToken = tokenStorage.getRefreshToken();

      if (!refreshToken) {
        setAuthInitialized(true);
        return;
      }

      try {
        // Attempt to get a fresh access token
        const tokens = await authApi.refreshToken(refreshToken);
        
        // Save new refresh token if backend provided one (rotation)
        if (tokens.refresh) {
          tokenStorage.saveRefreshToken(tokens.refresh);
        }

        useAuthStore.getState().setAccessToken(tokens.access);
        
        const user = await authApi.getCurrentUser();
        setAuth(user, tokens.access);
      } catch (error) {
        console.error('Failed to initialize auth:', error);
        tokenStorage.clearRefreshToken();
        clearAuth();
      } finally {
        setAuthInitialized(true);
      }
    };

    if (!authInitialized) {
      initializeAuth();
    }
  }, [setAuth, clearAuth, setAuthInitialized, authInitialized]);

  return <>{children}</>;
}

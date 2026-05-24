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
        const { access } = await authApi.refreshToken(refreshToken);
        
        // With valid access token, get current user
        // We need to manually set the token in the store first so the getCurrentUser call has it
        // Or we can just use the authApi directly if it doesn't rely on interceptors for this specific call
        // but it does. Let's update the store first.
        useAuthStore.getState().setAccessToken(access);
        
        const user = await authApi.getCurrentUser();
        setAuth(user, access);
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

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../api/auth.api';
import { useAuthStore } from '@/store/auth-store';
import { tokenStorage } from '../utils/token-storage';
import { LoginPayload, RegisterPayload } from '../types';

export const useLoginMutation = () => {
  const { setAuth } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginPayload) => authApi.login(payload),
    onSuccess: (data) => {
      tokenStorage.saveRefreshToken(data.refresh);
      setAuth(data.user, data.access);
      queryClient.setQueryData(['currentUser'], data.user);
    },
  });
};

export const useRegisterMutation = () => {
  const { setAuth } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => authApi.register(payload),
    onSuccess: (data) => {
      tokenStorage.saveRefreshToken(data.refresh);
      setAuth(data.user, data.access);
      queryClient.setQueryData(['currentUser'], data.user);
    },
  });
};

export const useLogoutMutation = () => {
  const { clearAuth } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const refreshToken = tokenStorage.getRefreshToken();
      if (refreshToken) {
        await authApi.logout(refreshToken);
      }
    },
    onSettled: () => {
      tokenStorage.clearRefreshToken();
      clearAuth();
      queryClient.clear();
    },
  });
};

export const useCurrentUserQuery = () => {
  const { isAuthenticated, setUser } = useAuthStore();

  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const user = await authApi.getCurrentUser();
      setUser(user);
      return user;
    },
    enabled: isAuthenticated,
    staleTime: Infinity,
  });
};

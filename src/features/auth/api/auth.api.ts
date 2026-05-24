import { api } from '@/lib/api/client';
import {
  AuthResponse,
  LoginPayload,
  RefreshResponse,
  RegisterPayload,
  UserResponse,
  AuthData,
  AuthTokens,
  User,
} from '../types';

export const authApi = {
  async register(payload: RegisterPayload): Promise<AuthData> {
    const { data } = await api.post<AuthResponse>('/auth/register/', payload);
    return data.data;
  },

  async login(payload: LoginPayload): Promise<AuthData> {
    const { data } = await api.post<AuthResponse>('/auth/login/', payload);
    return data.data;
  },

  async logout(refreshToken: string): Promise<void> {
    await api.post('/auth/logout/', { refresh: refreshToken });
  },

  async refreshToken(refresh: string): Promise<AuthTokens> {
    const { data } = await api.post<RefreshResponse>('/auth/token/refresh/', { refresh });
    return data.data;
  },

  async getCurrentUser(): Promise<User> {
    const { data } = await api.get<UserResponse>('/auth/me/');
    return data.data;
  },
};

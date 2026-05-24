import { api } from '@/lib/api/client';
import {
  AuthResponse,
  LoginPayload,
  RefreshResponse,
  RegisterPayload,
  User,
} from '../types';

export const authApi = {
  async register(payload: RegisterPayload): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/register/', payload);
    return data;
  },

  async login(payload: LoginPayload): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>('/auth/login/', payload);
    return data;
  },

  async logout(refreshToken: string): Promise<void> {
    await api.post('/auth/logout/', { refresh: refreshToken });
  },

  async refreshToken(refresh: string): Promise<RefreshResponse> {
    const { data } = await api.post<RefreshResponse>('/auth/token/refresh/', { refresh });
    return data;
  },

  async getCurrentUser(): Promise<User> {
    const { data } = await api.get<User>('/auth/me/');
    return data;
  },
};

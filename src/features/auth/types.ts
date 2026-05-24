export type UserRole = 'SUPER_ADMIN' | 'MESS_ADMIN' | 'RESIDENT';

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  role: UserRole;
  created_at?: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface BaseResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface AuthData {
  user: User;
  tokens: AuthTokens;
}

export type AuthResponse = BaseResponse<AuthData>;
export type RefreshResponse = BaseResponse<AuthTokens>;
export type UserResponse = BaseResponse<User>;

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
}

export interface ApiErrorResponse {
  detail?: string;
  code?: string;
  [key: string]: any;
}

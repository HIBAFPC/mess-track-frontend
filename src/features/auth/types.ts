export type UserRole = 'admin' | 'manager' | 'member';

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: UserRole;
  avatar?: string;
  created_at: string;
  updated_at: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface AuthResponse extends AuthTokens {
  user: User;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface RefreshResponse {
  access: string;
}

export interface ApiErrorResponse {
  detail?: string;
  code?: string;
  messages?: Array<{
    message: string;
    token_class?: string;
    token_type?: string;
    user_id?: string;
  }>;
  [key: string]: any;
}

export interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role: 'admin' | 'manager' | 'member';
  avatar?: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}

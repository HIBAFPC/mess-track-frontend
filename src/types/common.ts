export type Status = 'idle' | 'loading' | 'success' | 'error';

export interface BaseEntity {
  id: string;
  created_at: string;
  updated_at: string;
}

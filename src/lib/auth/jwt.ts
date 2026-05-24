import { decodeJwt, JWTPayload } from 'jose';
import { UserRole } from '@/features/auth/types';

export interface DecodedToken extends JWTPayload {
  user_id: string;
  role: UserRole;
  exp: number;
}

export const jwtUtils = {
  decode(token: string): DecodedToken | null {
    try {
      return decodeJwt(token) as DecodedToken;
    } catch (error) {
      return null;
    }
  },

  isExpired(token: string): boolean {
    const decoded = this.decode(token);
    if (!decoded || !decoded.exp) return true;
    
    // exp is in seconds, Date.now() is in milliseconds
    return decoded.exp * 1000 < Date.now();
  },

  extractRole(token: string): UserRole | null {
    const decoded = this.decode(token);
    return decoded?.role || null;
  },

  extractUserId(token: string): string | null {
    const decoded = this.decode(token);
    return decoded?.user_id || null;
  },
};

import Cookies from 'js-cookie';

const REFRESH_TOKEN_KEY = 'mess_track_refresh_token';
const AUTH_SESSION_KEY = 'mess_track_auth_session';

export const tokenStorage = {
  saveRefreshToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(REFRESH_TOKEN_KEY, token);
      // Set cookie for middleware access (7 days to match backend refresh token expiry)
      Cookies.set(REFRESH_TOKEN_KEY, token, { 
        expires: 7, 
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
      });
      Cookies.set(AUTH_SESSION_KEY, 'true', { expires: 7 });
    }
  },

  getRefreshToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(REFRESH_TOKEN_KEY) || Cookies.get(REFRESH_TOKEN_KEY) || null;
    }
    return null;
  },

  clearRefreshToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      Cookies.remove(REFRESH_TOKEN_KEY);
      Cookies.remove(AUTH_SESSION_KEY);
    }
  },

  hasSession(): boolean {
    return !!Cookies.get(AUTH_SESSION_KEY);
  }
};

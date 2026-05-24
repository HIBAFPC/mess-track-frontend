import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { decodeJwt } from 'jose';
import { ROUTES } from '@/lib/constants/routes';
import { isProtectedRoute, isAuthRestrictedRoute, getRequiredRoles } from '@/lib/auth/route-guards';
import { UserRole } from '@/features/auth/types';

const REFRESH_TOKEN_KEY = 'mess_track_refresh_token';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const refreshToken = request.cookies.get(REFRESH_TOKEN_KEY)?.value;

  let userRole: UserRole | null = null;
  let isTokenExpired = true;

  if (refreshToken) {
    try {
      const decoded = decodeJwt(refreshToken) as { role: UserRole; exp: number };
      userRole = decoded.role;
      isTokenExpired = decoded.exp * 1000 < Date.now();
    } catch (error) {
      console.error('Middleware: Error decoding token', error);
    }
  }

  const isAuthenticated = !!refreshToken && !isTokenExpired;

  // 1. Auth-Restricted Routes (Login/Register) - Redirect authenticated users to dashboard
  if (isAuthRestrictedRoute(pathname) && isAuthenticated) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD.ROOT, request.url));
  }

  // 2. Protected Routes - Redirect unauthenticated users to login
  if (isProtectedRoute(pathname)) {
    if (!isAuthenticated) {
      const loginUrl = new URL(ROUTES.AUTH.LOGIN, request.url);
      loginUrl.searchParams.set('from', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // 3. Role-Restricted Routes - Redirect if user lacks required role
    const requiredRoles = getRequiredRoles(pathname);
    if (requiredRoles.length > 0 && userRole && !requiredRoles.includes(userRole)) {
      return NextResponse.redirect(new URL('/403-forbidden', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

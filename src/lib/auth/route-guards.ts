import { ROUTES } from '../constants/routes';
import { UserRole } from '@/features/auth/types';

export const routeConfig = {
  publicRoutes: [
    ROUTES.HOME,
    ROUTES.AUTH.LOGIN,
    ROUTES.AUTH.REGISTER,
    ROUTES.AUTH.FORGOT_PASSWORD,
    ROUTES.AUTH.RESET_PASSWORD,
  ],
  authRestrictedRoutes: [
    ROUTES.AUTH.LOGIN,
    ROUTES.AUTH.REGISTER,
  ],
  protectedRoutes: [
    ROUTES.DASHBOARD.ROOT,
    ROUTES.DASHBOARD.MEALS,
    ROUTES.DASHBOARD.MEMBERS,
    ROUTES.DASHBOARD.BILLING,
    ROUTES.DASHBOARD.SETTINGS,
    ROUTES.DASHBOARD.PROFILE,
  ],
  roleRestrictedRoutes: {
    [ROUTES.DASHBOARD.SETTINGS]: ['SUPER_ADMIN'] as UserRole[],
    [ROUTES.DASHBOARD.BILLING]: ['SUPER_ADMIN'] as UserRole[],
    [ROUTES.DASHBOARD.MEMBERS]: ['SUPER_ADMIN', 'MESS_ADMIN'] as UserRole[],
  } as Record<string, UserRole[]>,
};

export const isProtectedRoute = (pathname: string): boolean => {
  return routeConfig.protectedRoutes.some(route => pathname.startsWith(route));
};

export const isAuthRestrictedRoute = (pathname: string): boolean => {
  return routeConfig.authRestrictedRoutes.includes(pathname);
};

export const getRequiredRoles = (pathname: string): UserRole[] => {
  // Check exact match first, then prefix
  if (routeConfig.roleRestrictedRoutes[pathname]) {
    return routeConfig.roleRestrictedRoutes[pathname];
  }
  
  const matchedRoute = Object.keys(routeConfig.roleRestrictedRoutes).find(route => 
    pathname.startsWith(route)
  );
  
  return matchedRoute ? routeConfig.roleRestrictedRoutes[matchedRoute] : [];
};

'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { AuthLoadingPlaceholder } from '@/components/auth/auth-loading-placeholder';
import { ROUTES } from '@/lib/constants/routes';
import { getRequiredRoles } from '@/lib/auth/route-guards';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authInitialized, isAuthenticated, user } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If auth is initialized and user is not authenticated, redirect to login
    if (authInitialized && !isAuthenticated) {
      router.push(`${ROUTES.AUTH.LOGIN}?from=${pathname}`);
      return;
    }

    // If authenticated, check role requirements for the current route
    if (authInitialized && isAuthenticated && user) {
      const requiredRoles = getRequiredRoles(pathname);
      if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
        router.push('/403-forbidden');
      }
    }
  }, [authInitialized, isAuthenticated, user, pathname, router]);

  // Show loading skeleton while auth is initializing or if we're waiting for redirect
  if (!authInitialized || (authInitialized && !isAuthenticated)) {
    return <AuthLoadingPlaceholder />;
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar placeholder */}
      <aside className="hidden w-64 border-r bg-background md:block">
        <div className="flex h-16 items-center border-b px-6">
          <span className="text-lg font-bold">Mess Track</span>
        </div>
        <nav className="p-4 space-y-2">
          {/* Navigation links placeholder */}
          <div className="h-8 w-full bg-muted rounded" />
          <div className="h-8 w-full bg-muted rounded" />
          <div className="h-8 w-full bg-muted rounded" />
        </nav>
      </aside>
      
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center border-b bg-background px-6">
          <h1 className="text-sm font-medium">Dashboard</h1>
        </header>
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

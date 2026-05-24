import React from 'react';

export function AuthLoadingPlaceholder() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center space-y-6">
        <div className="relative">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 animate-pulse rounded-full bg-primary/20" />
          </div>
        </div>
        <div className="space-y-2 text-center">
          <div className="h-6 w-32 animate-pulse rounded bg-muted mx-auto" />
          <div className="h-4 w-48 animate-pulse rounded bg-muted mx-auto" />
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';
import { ROUTES } from '@/lib/constants/routes';
import { buttonVariants } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';

export default function ForbiddenPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="mb-6 rounded-full bg-destructive/10 p-4 text-destructive">
        <ShieldAlert size={48} />
      </div>
      <h1 className="mb-2 text-4xl font-bold">403 - Access Denied</h1>
      <p className="mb-8 max-w-md text-muted-foreground">
        Sorry, you don't have the required permissions to access this page. 
        Please contact your administrator if you believe this is an error.
      </p>
      <Link href={ROUTES.DASHBOARD.ROOT} className={buttonVariants({ variant: 'default' })}>
        Back to Dashboard
      </Link>
    </div>
  );
}

import { buttonVariants } from '@/components/ui/button';
import { ROUTES } from '@/lib/constants/routes';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen p-8 text-center'>
      <h1 className='text-4xl font-bold mb-4'>Mess Track Foundation Ready</h1>
      <p className='text-xl text-muted-foreground mb-8'>
        The project infrastructure is set up and ready for feature implementation.
      </p>
      <div className='flex gap-4'>
        <Link href={ROUTES.AUTH.LOGIN} className={cn(buttonVariants({ variant: 'outline' }))}>
          Login Page (Placeholder)
        </Link>
        <Link href={ROUTES.DASHBOARD.ROOT} className={cn(buttonVariants({ variant: 'default' }))}>
          Dashboard (Placeholder)
        </Link>
      </div>
    </div>
  );
}

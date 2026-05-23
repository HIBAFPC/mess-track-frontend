import { buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function NotFound() {
  return (
    <div className='flex min-h-[400px] flex-col items-center justify-center space-y-4 text-center'>
      <h2 className='text-4xl font-bold'>404</h2>
      <h3 className='text-2xl font-semibold'>Page Not Found</h3>
      <p className='text-muted-foreground'>
        The page you are looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href='/' className={cn(buttonVariants({ variant: 'default' }))}>
        Return Home
      </Link>
    </div>
  );
}

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminVerifyPage() {
  const router = useRouter();

  useEffect(() => {
    // NextAuth handles the verification automatically
    // After successful verification, redirect to admin
    const timer = setTimeout(() => {
      router.push('/admin');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className='min-h-screen flex items-center justify-center bg-background px-4'>
      <div className='max-w-md w-full'>
        <div className='bg-alternate border border-border rounded-lg p-8 text-center'>
          <div className='w-16 h-16 mx-auto mb-4'>
            <div className='inline-block w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin'></div>
          </div>
          <h1 className='heading-2 mb-2'>Verifying...</h1>
          <p className='body-text text-muted'>
            Please wait while we verify your magic link.
          </p>
        </div>
      </div>
    </div>
  );
}


'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams?.get('error') ?? null;

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'Configuration':
        return 'There is a problem with the server configuration.';
      case 'AccessDenied':
        return 'Access denied. Only @neo14.com email addresses are allowed.';
      case 'Verification':
        return 'The magic link has expired or has already been used.';
      default:
        return 'An error occurred during authentication.';
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-background px-4'>
      <div className='max-w-md w-full'>
        <div className='bg-alternate border border-border rounded-lg p-8 text-center'>
          <div className='w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center'>
            <svg className='w-8 h-8 text-red-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' />
            </svg>
          </div>
          <h1 className='heading-2 mb-2'>Authentication Error</h1>
          <p className='body-text text-muted mb-6'>
            {getErrorMessage(error)}
          </p>
          <Link
            href='/admin/login'
            className='inline-block py-2 px-4 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity body-text font-medium'
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AdminErrorPage() {
  return (
    <Suspense fallback={
      <div className='min-h-screen flex items-center justify-center bg-background px-4'>
        <div className='inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin'></div>
      </div>
    }>
      <ErrorContent />
    </Suspense>
  );
}


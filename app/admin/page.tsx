'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function AdminPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'loading') return;

    if (status === 'unauthenticated') {
      // User is not authenticated, redirect to login
      router.push('/admin/login');
    } else if (status === 'authenticated') {
      // User is authenticated, redirect to TinaCMS admin interface
      window.location.href = '/admin/index.html';
    }
  }, [status, router]);

  // Show loading while checking authentication
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center">
        <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="body-text text-muted">
          {status === 'loading' ? 'Verifying authentication...' : 'Loading TinaCMS...'}
        </p>
      </div>
    </div>
  );
}

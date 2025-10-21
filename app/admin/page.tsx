'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function AdminPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (status === 'loading') return;

    if (status === 'authenticated' && session) {
      // User is authenticated, redirect to TinaCMS admin
      setIsRedirecting(true);
      window.location.href = '/admin/index.html';
    } else if (status === 'unauthenticated') {
      // User is not authenticated, redirect to login
      setIsRedirecting(true);
      router.push('/admin/login');
    }
  }, [status, session, router]);

  if (status === 'loading' || isRedirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="body-text text-muted">Loading...</p>
        </div>
      </div>
    );
  }

  return null;
}

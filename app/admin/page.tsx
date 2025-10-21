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
    }
  }, [status, router]);

  // Show loading while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center">
          <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="body-text text-muted">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  // If authenticated, show message to access TinaCMS
  if (status === 'authenticated' && session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-2xl w-full text-center">
          <div className="card p-12">
            <h1 className="heading-2 mb-4">
              Welcome to <span className="gradient-text">Cospace CMS</span>
            </h1>
            <p className="body-text mb-8">
              You are now authenticated. Access the TinaCMS admin panel by editing any page with the CMS enabled.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/pricing" className="btn-primary">
                Edit Pricing Page
              </a>
              <a href="/" className="btn-secondary">
                Go to Homepage
              </a>
            </div>
            <p className="body-small text-muted mt-8">
              Signed in as: <span className="font-medium">{session.user?.email}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

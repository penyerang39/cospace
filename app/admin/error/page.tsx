'use client';

import { useSearchParams } from 'next/navigation';
import { XCircle, AlertTriangle, ArrowLeft } from 'lucide-react';
import { Suspense } from 'react';

function AdminErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams?.get('error') || null;

  const getErrorMessage = () => {
    switch (error) {
      case 'Configuration':
        return 'There is a problem with the server configuration.';
      case 'AccessDenied':
        return 'Access denied. Only @neo14.com email addresses are allowed.';
      case 'Verification':
        return 'The sign-in link has expired or has already been used.';
      default:
        return 'An error occurred during authentication. Please try again.';
    }
  };

  const getErrorIcon = () => {
    switch (error) {
      case 'Configuration':
        return <AlertTriangle className="w-8 h-8 text-red-500" />;
      case 'AccessDenied':
        return <XCircle className="w-8 h-8 text-red-500" />;
      case 'Verification':
        return <XCircle className="w-8 h-8 text-orange-500" />;
      default:
        return <XCircle className="w-8 h-8 text-red-500" />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full">
        <div className="card">
          <div className="px-8 py-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-full mb-6">
              {getErrorIcon()}
            </div>
            
            <h1 className="heading-2 mb-4">
              Authentication <span className="text-red-500">Error</span>
            </h1>
            
            <p className="body-text mb-8">
              {getErrorMessage()}
            </p>
            
            <a
              href="/admin/login"
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Try again
            </a>
          </div>
        </div>

        <p className="text-center body-small text-muted mt-6">
          Need help? Contact your administrator.
        </p>
      </div>
    </div>
  );
}

export default function AdminErrorPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-foreground">Loading...</div>
      </div>
    }>
      <AdminErrorContent />
    </Suspense>
  );
}


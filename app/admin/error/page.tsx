'use client';

import { useSearchParams } from 'next/navigation';
import { XCircle } from 'lucide-react';

export default function AdminErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#667eea] to-[#764ba2] px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="px-8 py-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-6">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            
            <h1 className="text-3xl font-bold mb-4 text-gray-900">
              Authentication Error
            </h1>
            
            <p className="text-gray-600 mb-8">
              {getErrorMessage()}
            </p>
            
            <a
              href="/admin/login"
              className="inline-block w-full bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all"
            >
              Try again
            </a>
          </div>
        </div>

        <p className="text-center text-white/80 text-sm mt-6">
          Need help? Contact your administrator.
        </p>
      </div>
    </div>
  );
}


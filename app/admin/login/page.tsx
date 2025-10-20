'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email.endsWith('@neo14.com')) {
      setError('Only @neo14.com email addresses are allowed');
      return;
    }

    setIsLoading(true);
    
    try {
      await signIn('email', { 
        email, 
        callbackUrl: '/admin',
        redirect: false 
      });
      window.location.href = '/admin/verify';
    } catch (err) {
      setError('Failed to send sign-in email. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#667eea] to-[#764ba2] px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="px-8 py-12">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
                Cospace CMS
              </h1>
              <p className="text-gray-600">Sign in to manage content</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Neo14 Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@neo14.com"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#667eea] focus:border-transparent transition-all"
                  disabled={isLoading}
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-semibold py-3 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Sending magic link...' : 'Send magic link'}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-6">
              A secure sign-in link will be sent to your email
            </p>
          </div>
        </div>

        <p className="text-center text-white/80 text-sm mt-6">
          Only @neo14.com team members can access the CMS
        </p>
      </div>
    </div>
  );
}


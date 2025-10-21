'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Mail, AlertTriangle } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email.endsWith('@neo14.com')) {
      setError('Failed to send email. Please try again.');
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await signIn('email', { 
        email, 
        callbackUrl: '/admin',
        redirect: false 
      });
      
      if (result?.error) {
        setError('Failed to send email. Please try again.');
        setIsLoading(false);
      } else {
        // Only redirect on successful sign-in
        window.location.href = '/admin/verify';
      }
    } catch (err) {
      setError('Failed to send email. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full">
        <div className="card">
          <div className="px-8 py-12">
            <div className="text-center mb-8">
              <h1 className="heading-2 mb-4">
                Cospace <span className="gradient-text">CMS</span>
              </h1>
              <p className="body-text">Sign in to manage content</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block body-text font-medium mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="form-input"
                  disabled={isLoading}
                />
              </div>

              {error && (
                <div className="flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg body-small">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary w-full"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Sending magic link...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Send magic link
                  </div>
                )}
              </button>
            </form>

            <p className="text-center body-small text-muted mt-6">
              A sign-in link will be sent to your email
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


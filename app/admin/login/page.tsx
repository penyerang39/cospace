'use client';

import { useState, FormEvent } from 'react';
import { signIn } from 'next-auth/react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const result = await signIn('resend', {
        email,
        callbackUrl: '/admin',
        redirect: false,
      });

      if (result?.error) {
        setError('Failed to send magic link. Please try again.');
      } else {
        setIsSuccess(true);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-background px-4'>
        <div className='max-w-md w-full'>
          <div className='bg-alternate border border-border rounded-lg p-8 text-center'>
            <div className='w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center'>
              <svg className='w-8 h-8 text-primary' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
              </svg>
            </div>
            <h1 className='heading-2 mb-2'>Check your email</h1>
            <p className='body-text text-muted mb-4'>
              We sent a magic link to <strong>{email}</strong>
            </p>
            <p className='body-small text-muted'>
              Click the link in the email to sign in to the CMS admin panel.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-background px-4'>
      <div className='max-w-md w-full'>
        <div className='bg-alternate border border-border rounded-lg p-8'>
          <h1 className='heading-2 mb-2 text-center'>CMS Admin Login</h1>
          <p className='body-text text-muted mb-6 text-center'>
            Enter your email to receive a magic link
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label htmlFor='email' className='body-small font-medium mb-2 block'>
                Email Address
              </label>
              <input
                id='email'
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder='you@neo14.com'
                disabled={isSubmitting}
                className='w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50'
              />
            </div>

            {error && (
              <div className='mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg'>
                <p className='body-small text-red-600 dark:text-red-400'>{error}</p>
              </div>
            )}

            <button
              type='submit'
              disabled={isSubmitting}
              className='w-full py-2 px-4 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 body-text font-medium'
            >
              {isSubmitting ? 'Sending...' : 'Send Magic Link'}
            </button>
          </form>

          <p className='body-small text-muted text-center mt-6'>
            Access is restricted to @neo14.com email addresses only.
          </p>
        </div>
      </div>
    </div>
  );
}


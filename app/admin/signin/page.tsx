import { signIn } from '@/app/lib/auth';
import { redirect } from 'next/navigation';

function sanitizeEmail(email: string): string {
  return email
    .toLowerCase()
    .trim()
    .replace(/[<>]/g, '')
    .split('@')[0]
    .concat('@')
    .concat(email.split('@')[1] || '');
}

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string; error?: string }>;
}) {
  const params = await searchParams;
  
  async function handleSignIn(formData: FormData) {
    'use server';
    const rawEmail = formData.get('email') as string;
    
    if (!rawEmail || !rawEmail.includes('@')) {
      redirect('/admin/signin?error=invalid');
    }
    
    const email = sanitizeEmail(rawEmail);
    const callbackUrl = params.callbackUrl || '/admin/dashboard';
    
    try {
      await signIn('resend', {
        email,
        redirect: false,
        redirectTo: callbackUrl,
      });
      
      redirect(`/admin/verify?email=${encodeURIComponent(email)}`);
    } catch (error) {
      redirect('/admin/signin?error=failed');
    }
  }

  const errorMessages: Record<string, string> = {
    invalid: 'Please enter a valid email address.',
    failed: 'Failed to send magic link. Please try again.',
    Configuration: 'Email service is not configured.',
  };

  const errorMessage = params.error ? errorMessages[params.error] : null;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center text-3xl font-bold">
            Admin Sign In
          </h2>
          <p className="mt-2 text-center text-sm opacity-70">
            Enter your email to receive a magic link
          </p>
        </div>
        
        {errorMessage && (
          <div className="rounded-md p-4 border border-destructive bg-destructive/10">
            <p className="text-sm" style={{ color: 'var(--destructive)' }}>
              {errorMessage}
            </p>
          </div>
        )}
        
        <form action={handleSignIn} className="space-y-6">
          <div>
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="form-input"
              placeholder="Email address"
            />
          </div>
          <button
            type="submit"
            className="themed-submit-btn w-full"
          >
            Send magic link
          </button>
        </form>
      </div>
    </div>
  );
}



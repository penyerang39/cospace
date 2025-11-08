export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const errorMessages: Record<string, string> = {
    Configuration: 'There is a problem with the server configuration.',
    AccessDenied: 'Access denied. You do not have permission to sign in.',
    Verification: 'The sign in link is no longer valid. It may have expired.',
    Default: 'An error occurred during sign in.',
  };

  const error = params.error || 'Default';
  const errorMessage = errorMessages[error] || errorMessages.Default;

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <h2 className="text-3xl font-bold" style={{ color: 'var(--destructive)' }}>
          Authentication Error
        </h2>
        <p className="text-sm opacity-70">
          {errorMessage}
        </p>
        <div className="mt-6">
          <a
            href="/admin/signin"
            className="btn-primary"
          >
            Try again
          </a>
        </div>
      </div>
    </div>
  );
}



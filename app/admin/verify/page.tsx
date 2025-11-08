export default async function VerifyRequestPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  const params = await searchParams;
  
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <h2 className="text-3xl font-bold">
          Check your email
        </h2>
        <p className="text-sm opacity-70">
          {params.email
            ? `A sign in link has been sent to ${params.email}`
            : 'A sign in link has been sent to your email address'}
        </p>
        <p className="mt-4 text-sm opacity-70">
          Click the link in the email to sign in. The link will expire in 24 hours.
        </p>
      </div>
    </div>
  );
}



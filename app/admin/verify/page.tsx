import { CheckCircle } from 'lucide-react';

export default function VerifyRequestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#667eea] to-[#764ba2] px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="px-8 py-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
              Check your email
            </h1>
            
            <p className="text-gray-600 mb-6">
              A sign-in link has been sent to your email.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left text-sm text-gray-700 mb-6">
              <p className="font-semibold mb-2">Next steps:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Check your inbox (and spam folder)</li>
                <li>Click the sign-in link in the email</li>
                <li>You'll be automatically signed in to the CMS</li>
              </ol>
            </div>
            
            <p className="text-sm text-gray-500">
              The link will expire in 24 hours.
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <a 
            href="/admin/login" 
            className="text-white/80 hover:text-white text-sm underline transition-colors"
          >
            Back to sign in
          </a>
        </div>
      </div>
    </div>
  );
}


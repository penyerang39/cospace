import { CheckCircle, Mail, ArrowLeft } from 'lucide-react';
import CTALink from '../../components/CTALink';

export default function VerifyRequestPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full">
        <div className="card">
          <div className="px-8 py-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-6">
              <CheckCircle className="w-8 h-8 text-accent" />
            </div>
            
            <h1 className="heading-2 mb-4">
              Check your <span className="gradient-text">email</span>
            </h1>
            
            <p className="body-text mb-6">
              A sign-in link has been sent to your email.
            </p>
            
            <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 text-left body-small mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Mail className="w-4 h-4 text-accent" />
                <span className="font-medium">Next steps:</span>
              </div>
              <ol className="list-decimal list-inside space-y-1 text-muted">
                <li>Check your inbox (and spam folder)</li>
                <li>Click the sign-in link in the email</li>
                <li>You'll be automatically signed in to the CMS</li>
              </ol>
            </div>
            
            <p className="body-small text-muted">
              The link will expire in 24 hours.
            </p>
          </div>
        </div>

        <div className="text-center mt-6">
          <CTALink 
            href="/admin/login" 
            variant="ghost"
            text="Back to sign in"
            icon={<ArrowLeft className="w-4 h-4" />}
          />
        </div>
      </div>
    </div>
  );
}


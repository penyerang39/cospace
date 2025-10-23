import type { Metadata } from "next";
import Link from "next/link";
import { FileText, Shield, Scale, Users, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Legal Documents — Cospace by NEO14",
  description: "Privacy policy, terms of use, subscription agreements, and other legal documents for Cospace.",
  openGraph: {
    title: "Legal Documents — Cospace by NEO14",
    description: "Privacy policy, terms of use, subscription agreements, and other legal documents for Cospace.",
    siteName: "Cospace",
    type: "website",
    images: [
      {
        url: "/branding/neo14Logo.svg",
        alt: "Cospace Legal Documents",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Legal Documents — Cospace by NEO14",
    description: "Privacy policy, terms of use, subscription agreements, and other legal documents for Cospace.",
    images: ["/branding/neo14Logo.svg"],
  },
};

export default function LegalPage() {
  return (
    <main className="min-h-screen">
      {/* Legal Documents Grid */}
      <section className="section-padding" aria-labelledby="legal-documents-heading">
        <div className="max-width container-padding">
          <header className="text-center mb-16">
            <h1 id="legal-documents-heading" className="heading-1 mb-4">Legal <span className="gradient-text">Documents</span></h1>
            <p className="body-large max-w-2xl mx-auto">
              Clear, comprehensive legal documents that protect both you and us.
            </p>
          </header>
          
          <ul className="grid-features" role="list">
            <li>
              <div className="card-feature">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-accent" aria-hidden="true" />
                </div>
                <h3 className="heading-4 mb-3">
                  <Link href="/legal/privacy" className="hover:text-accent transition-colors">
                    Privacy Policy
                  </Link>
                </h3>
                <p className="body-text mb-4">
                  Learn how we collect, use, and protect your personal information with complete transparency.
                </p>
                <Link 
                  href="/legal/privacy" 
                  className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
                >
                  Read Privacy Policy
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </li>

            <li>
              <div className="card-feature">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-accent" aria-hidden="true" />
                </div>
                <h3 className="heading-4 mb-3">
                  <Link href="/legal/terms" className="hover:text-accent transition-colors">
                    Terms of Use
                  </Link>
                </h3>
                <p className="body-text mb-4">
                  Terms and conditions for using our services, including your rights and responsibilities.
                </p>
                <Link 
                  href="/legal/terms" 
                  className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
                >
                  Read Terms of Use
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </li>

            <li>
              <div className="card-feature">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Scale className="w-6 h-6 text-accent" aria-hidden="true" />
                </div>
                <h3 className="heading-4 mb-3">
                  <Link href="/legal/subscription" className="hover:text-accent transition-colors">
                    Subscription Agreement
                  </Link>
                </h3>
                <p className="body-text mb-4">
                  Detailed terms for our subscription services, billing, and cancellation policies.
                </p>
                <Link 
                  href="/legal/subscription" 
                  className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
                >
                  Read Subscription Agreement
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </li>

            <li>
              <div className="card-feature">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-accent" aria-hidden="true" />
                </div>
                <h3 className="heading-4 mb-3">
                  <Link href="/legal/acceptable-use" className="hover:text-accent transition-colors">
                    Acceptable Use Policy
                  </Link>
                </h3>
                <p className="body-text mb-4">
                  Guidelines for acceptable use of our platform to ensure a safe environment for everyone.
                </p>
                <Link 
                  href="/legal/acceptable-use" 
                  className="inline-flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
                >
                  Read Acceptable Use Policy
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
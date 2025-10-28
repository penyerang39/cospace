import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Legal — Cospace by NEO14',
  description: 'Legal documents, policies, and agreements for Cospace by NEO14 Technologies.',
  openGraph: {
    title: 'Legal — Cospace by NEO14',
    description: 'Legal documents, policies, and agreements for Cospace by NEO14 Technologies.',
    siteName: 'Cospace',
    type: 'website',
    images: [
      {
        url: '/branding/neo14Logo.svg',
        alt: 'Cospace Legal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Legal — Cospace by NEO14',
    description: 'Legal documents, policies, and agreements for Cospace by NEO14 Technologies.',
    images: ['/branding/neo14Logo.svg'],
  },
};

export default function LegalPage() {
  const legalPages = [
    {
      title: 'Terms of Use',
      href: '/legal/terms',
      description: 'Terms and conditions for using Cospace by NEO14 Technologies.',
    },
    {
      title: 'Privacy Policy',
      href: '/legal/privacy',
      description: 'How we collect, use, and protect your personal information.',
    },
    {
      title: 'Subscription Agreement',
      href: '/legal/subscription',
      description: 'Terms governing paid subscriptions and services.',
    },
    {
      title: 'Acceptable Use Policy',
      href: '/legal/acceptable-use',
      description: 'Guidelines for appropriate use of our services.',
    },
  ];

  return (
    <main className="max-w-6xl mx-auto container-padding py-16">
      <div className="max-w-3xl">
        <h1 className="text-4xl font-bold mb-4">Legal</h1>
        <p className="text-lg text-foreground/80 mb-12">
          Read our legal documents, policies, and agreements to understand how Cospace by NEO14 operates.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {legalPages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className="group p-6 rounded-lg border border-black/10 hover:border-accent/50 transition-all duration-200"
          >
            <h2 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
              {page.title}
            </h2>
            <p className="text-foreground/70">
              {page.description}
            </p>
          </Link>
        ))}
      </div>

      <div className="mt-16 p-6 rounded-lg bg-background-alt">
        <h2 className="text-xl font-semibold mb-3">Questions?</h2>
        <p className="text-foreground/80 mb-4">
          If you have any questions about our legal documents, please contact us at{' '}
          <a 
            href="mailto:info@neo14.com" 
            className="text-accent hover:underline"
          >
            info@neo14.com
          </a>
        </p>
      </div>
    </main>
  );
}


import React from 'react';
import Link from 'next/link';
import { ShieldCheck, FileText, Receipt, AlertCircle, ArrowRight } from 'lucide-react';
import PageMain from '../components/PageMain';

const legalDocuments = [
  {
    title: 'Privacy Policy',
    description: 'Learn how we collect, use, and protect your personal information.',
    href: '/legal/privacy',
    icon: ShieldCheck,
  },
  {
    title: 'Terms of Use',
    description: 'Terms and conditions for using our services.',
    href: '/legal/terms',
    icon: FileText,
  },
  {
    title: 'Subscription Agreement',
    description: 'Detailed terms for our subscription services.',
    href: '/legal/subscription',
    icon: Receipt,
  },
  {
    title: 'Acceptable Use Policy',
    description: 'Guidelines for acceptable use of our platform.',
    href: '/legal/acceptable-use',
    icon: AlertCircle,
  },
];

export default function Page() {
  return (
    <main className="min-h-screen">
      <PageMain
        title={<>Legal <span className="gradient-text">Documents</span></>}
        subtitle="Our policies and agreements to help you understand your rights and responsibilities."
      />

      <section className="section-padding">
        <div className="max-width container-padding">
          <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
            {legalDocuments.map((doc) => {
              const Icon = doc.icon;
              return (
                <Link
                  key={doc.href}
                  href={doc.href}
                  className="group border border-[#E5E5E5] rounded-lg p-6 transition-all hover:border-accent hover:shadow-lg"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-[#F5F5F5] group-hover:bg-accent/10 transition-colors">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="heading-4 mb-2 group-hover:text-accent transition-colors flex items-center gap-2">
                        {doc.title}
                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </h3>
                      <p className="body-text text-muted">
                        {doc.description}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
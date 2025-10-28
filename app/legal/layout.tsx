import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legal — Cospace by NEO14',
  description: 'Legal documents, policies, and agreements for Cospace by NEO14 Technologies.',
};

export default function LegalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}


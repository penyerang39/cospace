import type { Metadata } from 'next';
import React from 'react';
import { promises as fs } from 'fs';
import path from 'path';

export const metadata: Metadata = {
  title: 'Subscription Agreement — Cospace by NEO14',
  description: 'Subscription terms and billing information for Cospace plans. Understand your rights and obligations as a subscriber.',
  openGraph: {
    title: 'Subscription Agreement — Cospace by NEO14',
    description: 'Subscription terms and billing information for Cospace plans. Understand your rights and obligations as a subscriber.',
    siteName: 'Cospace',
    type: 'website',
    images: [
      {
        url: '/branding/neo14Logo.svg',
        alt: 'Cospace Subscription Agreement',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Subscription Agreement — Cospace by NEO14',
    description: 'Subscription terms and billing information for Cospace plans. Understand your rights and obligations as a subscriber.',
    images: ['/branding/neo14Logo.svg'],
  },
};

async function getSubscriptionHTML() {
  const filePath = path.join(process.cwd(), 'public', 'legal', 'Neo 14 Subscription Agreement.html');
  const htmlContent = await fs.readFile(filePath, 'utf-8');
  
  // Extract body content and convert to simple styled HTML
  const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  if (!bodyMatch) return htmlContent;
  
  const bodyContent = bodyMatch[1];
  const cleanedHTML = bodyContent
    .replace(/class=["'][^"']*["']/g, 'class="mb-4 leading-relaxed"')
    .replace(/<div[^>]*class=["']WordSection1["'][^>]*>/g, '<div>')
    .replace(/style=["'][^"']*["']/g, '')
    .replace(/<p\s+/g, '<p class="mb-4 leading-relaxed" ')
    .replace(/<ul/g, '<ul class="list-disc list-inside mb-6 space-y-3 pl-4"')
    .replace(/<li[^>]*>/g, '<li><span>')
    .replace(/<\/li>/g, '</span></li>')
    .replace(/<a\s+/g, '<a class="text-blue-600 dark:text-blue-400 hover:underline" ');
  
  return cleanedHTML;
}

export default async function Page() {
  const htmlContent = await getSubscriptionHTML();

  return (
    <main className="max-w-4xl mx-auto px-6 py-8">
      <div className="prose prose-lg dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </main>
  );
}

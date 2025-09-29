import React from 'react';
import Link from 'next/link';

export default function Page() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-8">
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Legal Documents</h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              <Link href="/legal/privacy" className="hover:text-blue-600 dark:hover:text-blue-400">
                Privacy Policy
              </Link>
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Learn how we collect, use, and protect your personal information.
            </p>
          </div>
          
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              <Link href="/legal/terms" className="hover:text-blue-600 dark:hover:text-blue-400">
                Terms of Use
              </Link>
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Terms and conditions for using our services.
            </p>
          </div>
          
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              <Link href="/legal/subscription" className="hover:text-blue-600 dark:hover:text-blue-400">
                Subscription Agreement
              </Link>
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Detailed terms for our subscription services.
            </p>
          </div>
          
          <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              <Link href="/legal/acceptable-use" className="hover:text-blue-600 dark:hover:text-blue-400">
                Acceptable Use Policy
              </Link>
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Guidelines for acceptable use of our platform.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
import React from 'react';

export default function Page() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-8">
      <div className="prose prose-lg dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: `${processedHtml.replace(/`/g, "\`")}` }} />
    </main>
  );
}
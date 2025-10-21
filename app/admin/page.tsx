'use client';

import { useEffect } from 'react';

export default function AdminPage() {
  useEffect(() => {
    // Redirect to TinaCMS admin interface
    window.location.href = '/admin/index.html';
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center">
        <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="body-text text-muted">Redirecting to TinaCMS...</p>
      </div>
    </div>
  );
}

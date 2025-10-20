'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

// Dynamically import the BlobController only on the client side
const BlobController = dynamic(() => import('./BlobController'), {
  ssr: false,
  loading: () => null,
});

/**
 * Client-only wrapper for the blob controller.
 * This ensures the blob functionality only loads when JavaScript is enabled,
 * without affecting server-side rendering of the layout.
 */
export default function ClientOnlyBlobController() {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Routes where blob should never appear
  const excludedRoutes = [
    '/request',
    '/demo'
  ];
  
  const excludedRoutePrefixes = [
    '/legal',
    '/company'
  ];

  // Check if current route is excluded
  const isExcluded = pathname && (
    excludedRoutes.includes(pathname) || 
    excludedRoutePrefixes.some(prefix => pathname.startsWith(prefix))
  );

  // Only render the blob controller on the client side and if route is not excluded
  if (!isClient || isExcluded) {
    return null;
  }

  return <BlobController />;
}

'use client';

import { useEffect, useMemo, useState } from 'react';
import DynamicGradientBlob from './DynamicGradientBlob';

/**
 * Global controller that mounts once and manages a single dynamic gradient blob.
 * It scopes tracking to the <main> element so navigation/header/footer are ignored.
 */
export default function BlobController() {
  const [mainEl, setMainEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Wait for DOM to be fully ready and painted
    const initializeBlob = () => {
      requestAnimationFrame(() => {
        const el = document.querySelector('main');
        if (el instanceof HTMLElement) {
          setMainEl(el);
        } else {
          // Retry after a short delay if main element not found
          setTimeout(initializeBlob, 100);
        }
      });
    };

    // Add a small delay to ensure hydration is complete
    setTimeout(initializeBlob, 200);
  }, []);

  // Create a RefObject-like wrapper for DynamicGradientBlob
  const containerRef = useMemo(() => ({ current: mainEl || undefined }), [mainEl]);

  // Render a fixed overlay wrapper so the blob sits behind page content
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0"
      >
        <DynamicGradientBlob
          containerRef={containerRef as unknown as React.RefObject<HTMLElement>}
          // Track only meaningful leaf elements; ignore generic divs in component logic
          targetSelector={'img, button, h1, h2, h3, h4, h5, h6, [data-blob-image]'}
          blurAmount={150}
          smoothness={1200}
          intersectionWeight={0.9}
        />
      </div>
    </>
  );
}



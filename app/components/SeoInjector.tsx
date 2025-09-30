'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const routeToSnippetPath: Record<string, string> = {
  '/': '/meta/home.html',
  '/product': '/meta/product.html',
  '/solutions': '/meta/solutions.html',
  '/pricing': '/meta/pricing.html',
  '/security': '/meta/security.html',
  '/docs': '/meta/docs.html',
};

function getSnippetForPath(pathname: string): string | null {
  // Exact matches first
  if (routeToSnippetPath[pathname]) return routeToSnippetPath[pathname];
  // Starts-with matching for section roots (e.g., /product/appbuilder)
  const match = Object.keys(routeToSnippetPath).find((key) => key !== '/' && pathname.startsWith(key));
  return match ? routeToSnippetPath[match] : routeToSnippetPath['/'];
}

function applyTitleAndDescriptionFromHtml(htmlText: string) {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');
    const titleEl = doc.querySelector('title');
    const descriptionEl = doc.querySelector('meta[name="description"]');

    if (titleEl && titleEl.textContent) {
      document.title = titleEl.textContent;
    }

    if (descriptionEl) {
      const description = descriptionEl.getAttribute('content') || '';
      let headMeta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
      if (!headMeta) {
        headMeta = document.createElement('meta');
        headMeta.setAttribute('name', 'description');
        document.head.appendChild(headMeta);
      }
      headMeta.setAttribute('content', description);
    }
  } catch {
    // No-op on parse/apply errors
  }
}

export default function SeoInjector() {
  const pathname = usePathname();

  useEffect(() => {
    const snippetPath = getSnippetForPath(pathname || '/');
    if (!snippetPath) return;

    let didCancel = false;

    fetch(snippetPath, { cache: 'force-cache' })
      .then(async (res) => {
        if (!res.ok) return;
        const text = await res.text();
        if (!didCancel) {
          applyTitleAndDescriptionFromHtml(text);
        }
      })
      .catch(() => {
        // Ignore fetch errors
      });

    return () => {
      didCancel = true;
    };
  }, [pathname]);

  return null;
}



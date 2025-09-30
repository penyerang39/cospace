'use client';

import { useEffect } from 'react';

/**
 * AutoReveal
 * Globally observes common sections and items and applies gentle fade-up animations
 * when they become visible. Respects prefers-reduced-motion.
 */
export default function AutoReveal() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Always animate, regardless of prefers-reduced-motion

    const itemSelectors = [
      'section',
      'article',
      '.card',
      '.card-feature',
      'li',
      '[role="listitem"]',
      '[data-reveal]'
    ].join(',');

    const itemNodeList = Array.from(document.querySelectorAll<HTMLElement>(itemSelectors));

    // For sections, collect common child items to stagger within the section
    const collectSectionChildren = (section: HTMLElement): HTMLElement[] => {
      const childSelectors = [
        '.card, .card-feature',
        'li, [role="listitem"]',
        '[data-reveal]',
        '[class*="grid"] > *',
        '[class*="flex"] > *'
      ].join(',');
      return Array.from(section.querySelectorAll<HTMLElement>(childSelectors));
    };

    const allTargets: HTMLElement[] = [];
    const applyVisible = (el: HTMLElement, indexStaggerMs?: number) => {
      if (indexStaggerMs && !el.style.transitionDelay) {
        el.style.transitionDelay = `${indexStaggerMs}ms`;
      }
      // Force reflow to ensure transition runs when classes change
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      el.offsetWidth;
      el.classList.remove('reveal-init');
      el.classList.add('reveal-visible');
    };
    for (const el of itemNodeList) {
      // Add the element itself
      if (!el.classList.contains('reveal-visible')) {
        el.classList.add('reveal-init');
        allTargets.push(el);
      }
      // If it's a section, prepare its children for staggered reveal
      if (el.tagName.toLowerCase() === 'section') {
        const children = collectSectionChildren(el);
        children.forEach((child) => {
          if (!child.classList.contains('reveal-visible')) {
            child.classList.add('reveal-init');
            allTargets.push(child);
          }
        });
      }
    }

    if (allTargets.length === 0) return;

    const rootMargin = '0px 0px -10% 0px';
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const target = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          // Stagger children if parent has many items
          const isSection = target.tagName.toLowerCase() === 'section';
          if (isSection) {
            const children = target.querySelectorAll<HTMLElement>('.reveal-init');
            children.forEach((child, index) => {
              applyVisible(child, Math.min(index * 60, 480));
            });
          }

          // Reveal the element itself
          if (target.classList.contains('reveal-init')) {
            // If part of a common list/grid, add a small per-item stagger
            const index = Array.from(target.parentElement?.children || []).indexOf(target);
            const delay = index >= 0 ? Math.min(index * 70, 560) : 0;
            applyVisible(target, delay);
          }

          observer.unobserve(target);
        }
      }
    }, { root: null, threshold: 0.05, rootMargin });

    allTargets.forEach((el) => observer.observe(el));

    // Progressive enhancement: listen for future nodes added dynamically
    const mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (
            node.matches(itemSelectors) ||
            (node.parentElement && node.parentElement.matches('section'))
          ) {
            if (!node.classList.contains('reveal-visible')) {
              node.classList.add('reveal-init');
              observer.observe(node);
            }
          }
          // Also scan children of added subtree
          const subtree = node.querySelectorAll<HTMLElement>(itemSelectors);
          subtree.forEach((el) => {
            if (!el.classList.contains('reveal-visible')) {
              el.classList.add('reveal-init');
              observer.observe(el);
            }
          });
        });
      }
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    // Startup pass: reveal elements already in view after initial paint
    requestAnimationFrame(() => {
      const viewportH = window.innerHeight || document.documentElement.clientHeight;
      allTargets.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < viewportH * 0.9 && rect.bottom > 0) {
          // Apply a minimal delay based on index within parent for subtle stagger
          const index = Array.from(el.parentElement?.children || []).indexOf(el);
          const delay = index >= 0 ? Math.min(index * 60, 480) : 0;
          applyVisible(el, delay);
          observer.unobserve(el);
        }
      });
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}



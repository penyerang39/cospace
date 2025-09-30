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
        // If element appears visually on the left side of viewport, mark it for side-enter
        const rect = el.getBoundingClientRect();
        const viewportW = window.innerWidth || document.documentElement.clientWidth;
        if (rect.left < viewportW * 0.33) {
          el.setAttribute('data-reveal-side', 'left');
        }
        allTargets.push(el);
      }
      // If it's a section, prepare its children for staggered reveal
      if (el.tagName.toLowerCase() === 'section') {
        const children = collectSectionChildren(el);
        children.forEach((child) => {
          if (!child.classList.contains('reveal-visible')) {
            child.classList.add('reveal-init');
            // Side detection for images/elements on the left half of section
            const childRect = child.getBoundingClientRect();
            const sectionRect = el.getBoundingClientRect();
            if (childRect.left - sectionRect.left < sectionRect.width * 0.33) {
              child.setAttribute('data-reveal-side', 'left');
            }
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
            // First, reveal the section itself
            applyVisible(target);
            // Then reveal its children after the section's transition ends
            const children = Array.from(
              target.querySelectorAll<HTMLElement>('.reveal-init')
            );
            const sectionDurationMs = 500; // keep in sync with CSS
            children.forEach((child, index) => {
              const delay = sectionDurationMs + Math.min(index * 120, 960);
              child.style.transitionDelay = `${delay}ms`;
              applyVisible(child);
            });
          }

          // Reveal the element itself
          if (target.classList.contains('reveal-init')) {
            // If part of a common list/grid, add a small per-item stagger
            const index = Array.from(target.parentElement?.children || []).indexOf(target);
            const delay = index >= 0 ? Math.min(index * 120, 960) : 0;
            applyVisible(target, delay);
          }

          observer.unobserve(target);
        }
      }
    }, { root: null, threshold: 0.1, rootMargin: '0px 0px -5% 0px' });

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
        if (rect.top < viewportH * 0.75 && rect.bottom > 0) {
          // Apply a slightly longer delay for initial in-view elements
          const index = Array.from(el.parentElement?.children || []).indexOf(el);
          const delay = index >= 0 ? Math.min(index * 120, 960) : 0;
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



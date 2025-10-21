'use client';

import { useEffect } from 'react';

/**
 * AutoReveal
 * Globally observes common sections and items and applies gentle fade-up animations
 * when they become visible. Also handles gradient border effects for middle viewport.
 */
export default function AutoReveal() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Always animate, regardless of prefers-reduced-motion

    const itemSelectors = [
      'section:not([data-no-reveal]):not([data-no-reveal] *)',
      'article:not([data-no-reveal]):not([data-no-reveal] *)',
      '.card:not([data-no-reveal] *)',
      '.card-feature:not([data-no-reveal] *)',
      'li:not([data-no-reveal] *)',
      '[role="listitem"]:not([data-no-reveal] *)',
      '[data-reveal]:not([data-no-reveal] *)'
    ].join(',');

    const itemNodeList = Array.from(document.querySelectorAll<HTMLElement>(itemSelectors));

    // For sections, collect common child items to stagger within the section
    const collectSectionChildren = (section: HTMLElement): HTMLElement[] => {
      // Don't collect children if section is in a no-reveal zone
      if (section.closest('[data-no-reveal]')) return [];
      
      const childSelectors = [
        '.card:not([data-no-reveal] *), .card-feature:not([data-no-reveal] *)',
        'li:not([data-no-reveal] *), [role="listitem"]:not([data-no-reveal] *)',
        '[data-reveal]:not([data-no-reveal] *)',
        '[class*="grid"] > *:not([data-no-reveal] *)',
        '[class*="flex"] > *:not([data-no-reveal] *)'
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
          
          // Skip if inside a no-reveal zone
          if (node.closest('[data-no-reveal]')) return;
          
          if (
            node.matches(itemSelectors) ||
            (node.parentElement && node.parentElement.matches('section:not([data-no-reveal]):not([data-no-reveal] *)'))
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

    // Gradient Border Effect Observer - Middle 40% viewport detection
    const gradientSelectors = '.gradient-border:not([data-no-gradient])';

    const gradientElements = Array.from(document.querySelectorAll<HTMLElement>(gradientSelectors));

    if (gradientElements.length > 0) {
      // Middle 40% viewport: 30% from top to 70% from top
      const gradientRootMargin = '-30% 0px -30% 0px';
      
      const gradientObserver = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            // Element is in the middle 40% of viewport
            target.classList.add('gradient-active');
          } else {
            // Element has left the middle 40% of viewport
            target.classList.remove('gradient-active');
          }
        }
      }, { 
        root: null, 
        threshold: 0.1, 
        rootMargin: gradientRootMargin 
      });

      gradientElements.forEach((el) => gradientObserver.observe(el));

      // Handle dynamically added gradient elements
      const gradientMutationObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          mutation.addedNodes.forEach((node) => {
            if (!(node instanceof HTMLElement)) return;
            
            if (node.matches(gradientSelectors)) {
              gradientObserver.observe(node);
            }
            
            const subtree = node.querySelectorAll<HTMLElement>(gradientSelectors);
            subtree.forEach((el) => gradientObserver.observe(el));
          });
        }
      });

      gradientMutationObserver.observe(document.body, { childList: true, subtree: true });

      return () => {
        observer.disconnect();
        mutationObserver.disconnect();
        gradientObserver.disconnect();
        gradientMutationObserver.disconnect();
      };
    }

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}



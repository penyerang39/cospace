'use client';

import { useEffect } from 'react';
import { intersectionObserverManager } from '@/app/utils/intersectionObserverManager';

/**
 * AutoReveal
 * Globally observes common sections and items and applies gentle fade-up animations
 * when they become visible. Also handles gradient border effects for middle viewport.
 */
export default function AutoReveal() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Do not run AutoReveal on any /legal routes
    const currentPathname = window.location.pathname || '';
    if (currentPathname.startsWith('/legal')) return;

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

    // Use unified observer for reveal animations
    const revealObserverConfig = { root: null, threshold: 0.1, rootMargin: '0px 0px -5% 0px' };
    
    allTargets.forEach((el) => {
      intersectionObserverManager.observe(
        el,
        (entry) => {
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

            // Unobserve after revealing (one-time animation)
            intersectionObserverManager.unobserve(target);
          }
        },
        revealObserverConfig
      );
    });

    // Progressive enhancement: listen for future nodes added dynamically
    const mutationObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          
          if (
            node.matches(itemSelectors) ||
            (node.parentElement && node.parentElement.matches('section:not([data-no-reveal]):not([data-no-reveal] *)'))
          ) {
            if (!node.classList.contains('reveal-visible')) {
              node.classList.add('reveal-init');
              intersectionObserverManager.observe(
                node,
                (entry) => {
                  const target = entry.target as HTMLElement;
                  if (entry.isIntersecting) {
                    const index = Array.from(target.parentElement?.children || []).indexOf(target);
                    const delay = index >= 0 ? Math.min(index * 120, 960) : 0;
                    applyVisible(target, delay);
                    intersectionObserverManager.unobserve(target);
                  }
                },
                revealObserverConfig
              );
            }
          }
          // Also scan children of added subtree
          const subtree = node.querySelectorAll<HTMLElement>(itemSelectors);
          subtree.forEach((el) => {
            if (!el.classList.contains('reveal-visible')) {
              el.classList.add('reveal-init');
              intersectionObserverManager.observe(
                el,
                (entry) => {
                  const target = entry.target as HTMLElement;
                  if (entry.isIntersecting) {
                    const index = Array.from(target.parentElement?.children || []).indexOf(target);
                    const delay = index >= 0 ? Math.min(index * 120, 960) : 0;
                    applyVisible(target, delay);
                    intersectionObserverManager.unobserve(target);
                  }
                },
                revealObserverConfig
              );
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
          intersectionObserverManager.unobserve(el);
        }
      });
    });

    // Gradient Border Effect Observer - Middle 40% viewport detection
    const gradientSelectors = '.gradient-border:not([data-no-gradient])';

    // Track which elements are currently in the middle viewport zone
    const elementsInMiddleZone = new Set<HTMLElement>();
    let currentActiveGradientElement: HTMLElement | null = null;

    // Calculate distance from center of viewport
    const getDistanceFromCenter = (element: HTMLElement): number => {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;
      return Math.abs(elementCenter - viewportCenter);
    };

    // Update which element should be active based on all elements in zone
    const updateActiveGradient = () => {
      if (elementsInMiddleZone.size === 0) {
        // No elements in zone, deactivate current if any
        if (currentActiveGradientElement) {
          currentActiveGradientElement.classList.remove('gradient-active');
          currentActiveGradientElement = null;
        }
        return;
      }

      // Find the element closest to the center of the viewport
      let closestElement: HTMLElement | null = null;
      let minDistance = Infinity;

      elementsInMiddleZone.forEach((el) => {
        const distance = getDistanceFromCenter(el);
        if (distance < minDistance) {
          minDistance = distance;
          closestElement = el;
        }
      });

      // Update active state if changed
      if (closestElement && closestElement !== currentActiveGradientElement) {
        // Deactivate previous
        if (currentActiveGradientElement) {
          currentActiveGradientElement.classList.remove('gradient-active');
        }
        // Activate new
        closestElement.classList.add('gradient-active');
        currentActiveGradientElement = closestElement;
      }
    };

    const gradientElements = Array.from(document.querySelectorAll<HTMLElement>(gradientSelectors));

    if (gradientElements.length > 0) {
      // Middle 40% viewport: 30% from top to 70% from top
      const gradientRootMargin = '-30% 0px -30% 0px';
      const gradientObserverConfig = { 
        root: null, 
        threshold: 0.1, 
        rootMargin: gradientRootMargin 
      };

      // Set up observer for existing elements using unified manager
      gradientElements.forEach((el) => {
        intersectionObserverManager.observe(
          el,
          (entry) => {
            const target = entry.target as HTMLElement;
            if (entry.isIntersecting) {
              elementsInMiddleZone.add(target);
            } else {
              elementsInMiddleZone.delete(target);
            }
            updateActiveGradient();
          },
          gradientObserverConfig
        );
        // Check initial state for elements already in viewport
        const rect = el.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        const elementTop = rect.top;
        const elementBottom = rect.bottom;
        const viewportTop = viewportHeight * 0.3;
        const viewportBottom = viewportHeight * 0.7;
        if (elementTop < viewportBottom && elementBottom > viewportTop) {
          elementsInMiddleZone.add(el);
        }
      });

      // Initial update after checking all elements
      updateActiveGradient();

      // Handle dynamically added gradient elements
      const gradientMutationObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          mutation.addedNodes.forEach((node) => {
            if (!(node instanceof HTMLElement)) return;
            
            if (node.matches(gradientSelectors)) {
              intersectionObserverManager.observe(
                node,
                (entry) => {
                  const target = entry.target as HTMLElement;
                  if (entry.isIntersecting) {
                    elementsInMiddleZone.add(target);
                  } else {
                    elementsInMiddleZone.delete(target);
                  }
                  updateActiveGradient();
                },
                gradientObserverConfig
              );
              // Check initial state for newly added elements
              const rect = node.getBoundingClientRect();
              const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
              const elementTop = rect.top;
              const elementBottom = rect.bottom;
              const viewportTop = viewportHeight * 0.3;
              const viewportBottom = viewportHeight * 0.7;
              if (elementTop < viewportBottom && elementBottom > viewportTop) {
                elementsInMiddleZone.add(node);
                updateActiveGradient();
              }
            }
            
            const subtree = node.querySelectorAll<HTMLElement>(gradientSelectors);
            subtree.forEach((el) => {
              intersectionObserverManager.observe(
                el,
                (entry) => {
                  const target = entry.target as HTMLElement;
                  if (entry.isIntersecting) {
                    elementsInMiddleZone.add(target);
                  } else {
                    elementsInMiddleZone.delete(target);
                  }
                  updateActiveGradient();
                },
                gradientObserverConfig
              );
              // Check initial state for newly added elements
              const rect = el.getBoundingClientRect();
              const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
              const elementTop = rect.top;
              const elementBottom = rect.bottom;
              const viewportTop = viewportHeight * 0.3;
              const viewportBottom = viewportHeight * 0.7;
              if (elementTop < viewportBottom && elementBottom > viewportTop) {
                elementsInMiddleZone.add(el);
                updateActiveGradient();
              }
            });
          });
        }
      });

      gradientMutationObserver.observe(document.body, { childList: true, subtree: true });

      // Fallback: Check all gradient elements periodically to catch any missed updates
      // This ensures consistency even if intersection observer fails
      let fallbackTimeout: NodeJS.Timeout | null = null;
      
      const runFallbackCheck = () => {
        const allGradientElements = Array.from(document.querySelectorAll<HTMLElement>(gradientSelectors));
        
        // Rebuild the set of elements in middle zone
        elementsInMiddleZone.clear();
        allGradientElements.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
          const elementTop = rect.top;
          const elementBottom = rect.bottom;
          const viewportTop = viewportHeight * 0.3;
          const viewportBottom = viewportHeight * 0.7;
          if (elementTop < viewportBottom && elementBottom > viewportTop) {
            elementsInMiddleZone.add(el);
          }
        });
        
        // Update which element should be active
        updateActiveGradient();
        
        // Schedule next check if elements exist
        if (allGradientElements.length > 0) {
          fallbackTimeout = setTimeout(runFallbackCheck, 2000); // Check every 2 seconds
        }
      };
      
      // Start fallback check after a delay to let intersection observer work first
      fallbackTimeout = setTimeout(runFallbackCheck, 3000);

      // Handle window resize and scroll events to recalculate viewport positions
      const handleViewportChange = () => {
        // Debounce viewport change events
        if (fallbackTimeout) {
          clearTimeout(fallbackTimeout);
        }
        fallbackTimeout = setTimeout(() => {
          // Recalculate which elements are in the zone
          const allGradientElements = Array.from(document.querySelectorAll<HTMLElement>(gradientSelectors));
          elementsInMiddleZone.clear();
          allGradientElements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
            const elementTop = rect.top;
            const elementBottom = rect.bottom;
            const viewportTop = viewportHeight * 0.3;
            const viewportBottom = viewportHeight * 0.7;
            if (elementTop < viewportBottom && elementBottom > viewportTop) {
              elementsInMiddleZone.add(el);
            }
          });
          updateActiveGradient();
          // Resume fallback checks
          fallbackTimeout = setTimeout(runFallbackCheck, 2000);
        }, 50);
      };

      window.addEventListener('resize', handleViewportChange, { passive: true });
      window.addEventListener('scroll', handleViewportChange, { passive: true });

      return () => {
        // Unobserve all gradient elements
        gradientElements.forEach((el) => {
          intersectionObserverManager.unobserve(el);
        });
        // Clean up dynamically added gradient elements
        const allGradientElements = Array.from(document.querySelectorAll<HTMLElement>(gradientSelectors));
        allGradientElements.forEach((el) => {
          intersectionObserverManager.unobserve(el);
        });
        mutationObserver.disconnect();
        gradientMutationObserver.disconnect();
        window.removeEventListener('resize', handleViewportChange);
        window.removeEventListener('scroll', handleViewportChange);
        if (fallbackTimeout) {
          clearTimeout(fallbackTimeout);
        }
      };
    }

    return () => {
      // Unobserve all reveal elements
      allTargets.forEach((el) => {
        intersectionObserverManager.unobserve(el);
      });
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}



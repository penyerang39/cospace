/**
 * Unified IntersectionObserver Manager For Gradient Blob
 * 
 * Manages shared IntersectionObserver instances to reduce overhead.
 * Observers are grouped by their configuration options to maximize sharing.
 */

type IntersectionCallback = (entry: IntersectionObserverEntry) => void;

interface ObserverConfig {
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | Document | null;
}

// Create a unique key for observer configs
function getConfigKey(config: IntersectionObserverInit): string {
  const threshold = Array.isArray(config.threshold)
    ? config.threshold.join(',')
    : config.threshold ?? 0;
  const rootPart = (() => {
    if (!('root' in config) || config.root == null) return 'null';
    // On the server, Element/Document might be undefined; guard with typeof checks
    if (typeof Document !== 'undefined' && config.root instanceof Document) return '#document';
    if (typeof Element !== 'undefined' && config.root instanceof Element) return config.root.tagName;
    return 'unknown';
  })();
  return `${threshold}|${config.rootMargin ?? '0px'}|${rootPart}`;
}

class IntersectionObserverManager {
  private observers = new Map<string, IntersectionObserver>();
  private elementCallbacks = new WeakMap<Element, IntersectionCallback>();
  private elementConfigKeys = new WeakMap<Element, string>();

  /**
   * Get or create an IntersectionObserver with the given configuration
   */
  private getObserver(config: IntersectionObserverInit): IntersectionObserver {
    const key = getConfigKey(config);
    
    if (!this.observers.has(key)) {
      const observer = new IntersectionObserver(
        (entries) => {
          // Route each entry to its registered callback
          entries.forEach((entry) => {
            const callback = this.elementCallbacks.get(entry.target);
            if (callback) {
              callback(entry);
            }
          });
        },
        config
      );
      this.observers.set(key, observer);
    }
    
    return this.observers.get(key)!;
  }

  /**
   * Observe an element with a callback
   */
  observe(
    element: Element,
    callback: IntersectionCallback,
    config: IntersectionObserverInit = {}
  ): void {
    // Default configs match common use cases
    const finalConfig: IntersectionObserverInit = {
      threshold: 0.1,
      rootMargin: '0px',
      root: null,
      ...config,
    };

    const observer = this.getObserver(finalConfig);
    const configKey = getConfigKey(finalConfig);
    
    this.elementCallbacks.set(element, callback);
    this.elementConfigKeys.set(element, configKey);
    observer.observe(element);
  }

  /**
   * Stop observing an element
   */
  unobserve(element: Element): void {
    const configKey = this.elementConfigKeys.get(element);
    if (!configKey) return;

    const observer = this.observers.get(configKey);
    if (observer) {
      observer.unobserve(element);
    }
    
    this.elementCallbacks.delete(element);
    this.elementConfigKeys.delete(element);
  }

  /**
   * Disconnect all observers (for cleanup)
   */
  disconnect(): void {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers.clear();
    this.elementCallbacks = new WeakMap();
    this.elementConfigKeys = new WeakMap();
  }

  /**
   * Get count of active observers (for debugging)
   */
  getObserverCount(): number {
    return this.observers.size;
  }
}

// Export singleton instance
export const intersectionObserverManager = new IntersectionObserverManager();

// Export convenience functions for common use cases
export const observeElement = (
  element: Element | null,
  callback: (isIntersecting: boolean) => void,
  config?: ObserverConfig
) => {
  if (!element) return () => {};
  
  intersectionObserverManager.observe(
    element,
    (entry) => callback(entry.isIntersecting),
    config
  );
  
  return () => intersectionObserverManager.unobserve(element);
};


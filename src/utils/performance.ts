// Performance optimization utilities for SOLO by Legalight

// Image lazy loading utility
export const createIntersectionObserver = (callback: (entries: IntersectionObserverEntry[]) => void) => {
  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    return new IntersectionObserver(callback, {
      root: null,
      rootMargin: '50px 0px',
      threshold: 0.1
    });
  }
  return null;
};

// Lazy load images
export const lazyLoadImage = (img: HTMLImageElement, src: string) => {
  const observer = createIntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target as HTMLImageElement;
        target.src = src;
        target.classList.remove('loading');
        target.classList.add('loaded');
        observer?.unobserve(target);
      }
    });
  });

  if (observer) {
    img.classList.add('loading');
    observer.observe(img);
    return () => observer.unobserve(img);
  }
  
  // Fallback for browsers without IntersectionObserver
  img.src = src;
  return () => {};
};

// Debounce utility for performance
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Throttle utility for scroll events
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Preload critical resources
export const preloadResource = (href: string, as: string, type?: string) => {
  if (typeof window !== 'undefined') {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    if (type) link.type = type;
    document.head.appendChild(link);
  }
};

// Critical CSS inlining utility
export const inlineCSS = (css: string) => {
  if (typeof window !== 'undefined') {
    const style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);
  }
};

// Performance monitoring
export class PerformanceMonitor {
  private marks: Map<string, number> = new Map();
  private measures: Map<string, number> = new Map();

  mark(name: string): void {
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.mark(name);
      this.marks.set(name, performance.now());
    }
  }

  measure(name: string, startMark: string, endMark?: string): number {
    if (typeof window !== 'undefined' && 'performance' in window) {
      const endTime = endMark ? this.marks.get(endMark) : performance.now();
      const startTime = this.marks.get(startMark);
      
      if (startTime && endTime) {
        const duration = endTime - startTime;
        this.measures.set(name, duration);
        return duration;
      }
    }
    return 0;
  }

  getMeasure(name: string): number | undefined {
    return this.measures.get(name);
  }

  logMeasures(): void {
    console.group('Performance Measures');
    this.measures.forEach((duration, name) => {
      console.log(`${name}: ${duration.toFixed(2)}ms`);
    });
    console.groupEnd();
  }

  // Web Vitals tracking
  trackWebVitals(): void {
    if (typeof window !== 'undefined') {
      // Track Largest Contentful Paint (LCP)
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        console.log('LCP:', lastEntry.startTime);
      }).observe({ entryTypes: ['largest-contentful-paint'] });

      // Track First Input Delay (FID)
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          console.log('FID:', entry.processingStart - entry.startTime);
        });
      }).observe({ entryTypes: ['first-input'] });

      // Track Cumulative Layout Shift (CLS)
      let clsValue = 0;
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });
        console.log('CLS:', clsValue);
      }).observe({ entryTypes: ['layout-shift'] });
    }
  }
}

// Resource loading optimization
export const loadResourceWhenIdle = (loader: () => Promise<any>) => {
  if (typeof window !== 'undefined') {
    if ('requestIdleCallback' in window) {
      return new Promise((resolve) => {
        (window as any).requestIdleCallback(async () => {
          const result = await loader();
          resolve(result);
        });
      });
    }
    
    // Fallback for browsers without requestIdleCallback
    return new Promise((resolve) => {
      setTimeout(async () => {
        const result = await loader();
        resolve(result);
      }, 0);
    });
  }
  
  return loader();
};

// Bundle size optimization - dynamic imports helper
export const loadChunkWhenNeeded = async <T>(
  chunkLoader: () => Promise<{ default: T }>,
  condition: boolean = true
): Promise<T | null> => {
  if (!condition) return null;
  
  try {
    const module = await chunkLoader();
    return module.default;
  } catch (error) {
    console.error('Failed to load chunk:', error);
    return null;
  }
};

// Memory usage optimization
export const cleanupEventListeners = () => {
  const cleanupFunctions: (() => void)[] = [];
  
  return {
    add: (cleanup: () => void) => {
      cleanupFunctions.push(cleanup);
    },
    cleanup: () => {
      cleanupFunctions.forEach(fn => fn());
      cleanupFunctions.length = 0;
    }
  };
};

// Global performance monitor instance
export const performanceMonitor = new PerformanceMonitor();

// Initialize performance tracking
if (typeof window !== 'undefined') {
  performanceMonitor.trackWebVitals();
  
  // Track page load time
  window.addEventListener('load', () => {
    performanceMonitor.mark('page-load-complete');
    performanceMonitor.measure('total-page-load', 'navigationStart', 'page-load-complete');
  });
}
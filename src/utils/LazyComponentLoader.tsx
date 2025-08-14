import React, { Suspense, lazy, ComponentType } from 'react';
import { RevolutionaryLoading } from '../components/shared/RevolutionaryLoading';

// ⚡ ADVANCED LAZY LOADING SYSTEM
// Intelligent component loading with preloading and caching

interface LazyComponentOptions {
  fallback?: React.ComponentType;
  preload?: boolean;
  cacheTime?: number;
  errorBoundary?: boolean;
  priority?: 'high' | 'medium' | 'low';
}

interface ComponentCache {
  [key: string]: {
    component: ComponentType<any>;
    loadTime: number;
    priority: string;
  };
}

class LazyComponentManager {
  private static instance: LazyComponentManager;
  private componentCache: ComponentCache = {};
  private preloadQueue: string[] = [];
  private loadingPromises: Map<string, Promise<any>> = new Map();

  static getInstance(): LazyComponentManager {
    if (!LazyComponentManager.instance) {
      LazyComponentManager.instance = new LazyComponentManager();
    }
    return LazyComponentManager.instance;
  }

  // 🚀 CREATE LAZY COMPONENT WITH ADVANCED OPTIONS
  createLazyComponent<T extends ComponentType<any>>(
    importFunction: () => Promise<{ default: T }>,
    componentName: string,
    options: LazyComponentOptions = {}
  ) {
    const {
      fallback = RevolutionaryLoading,
      preload = false,
      cacheTime = 300000, // 5 minutes
      errorBoundary = true,
      priority = 'medium'
    } = options;

    // Create lazy component with caching
    const LazyComponent = lazy(async () => {
      const startTime = performance.now();
      
      // Check if component is already cached
      if (this.componentCache[componentName]) {
        const cached = this.componentCache[componentName];
        const age = Date.now() - cached.loadTime;
        
        if (age < cacheTime) {
          console.log(`📦 Loaded ${componentName} from cache (${age}ms old)`);
          return { default: cached.component };
        }
      }

      // Check if already loading
      if (this.loadingPromises.has(componentName)) {
        console.log(`⏳ Waiting for ${componentName} (already loading)`);
        return this.loadingPromises.get(componentName)!;
      }

      // Start loading
      console.log(`🚀 Loading ${componentName} (priority: ${priority})`);
      const loadPromise = importFunction();
      this.loadingPromises.set(componentName, loadPromise);

      try {
        const module = await loadPromise;
        const loadTime = performance.now() - startTime;
        
        // Cache the component
        this.componentCache[componentName] = {
          component: module.default,
          loadTime: Date.now(),
          priority
        };

        console.log(`✅ Loaded ${componentName} in ${loadTime.toFixed(2)}ms`);
        this.loadingPromises.delete(componentName);
        
        return module;
      } catch (error) {
        console.error(`❌ Failed to load ${componentName}:`, error);
        this.loadingPromises.delete(componentName);
        throw error;
      }
    });

    // Preload if requested
    if (preload) {
      this.preloadComponent(componentName, importFunction, priority);
    }

    // Wrapper component with error boundary
    const WrappedComponent: React.FC<any> = (props) => {
      const FallbackComponent = fallback;
      
      if (errorBoundary) {
        return (
          <ErrorBoundary componentName={componentName}>
            <Suspense fallback={<FallbackComponent message={`Loading ${componentName}...`} />}>
              <LazyComponent {...props} />
            </Suspense>
          </ErrorBoundary>
        );
      }

      return (
        <Suspense fallback={<FallbackComponent message={`Loading ${componentName}...`} />}>
          <LazyComponent {...props} />
        </Suspense>
      );
    };

    WrappedComponent.displayName = `Lazy(${componentName})`;
    return WrappedComponent;
  }

  // 🎯 INTELLIGENT PRELOADING
  preloadComponent(
    componentName: string,
    importFunction: () => Promise<{ default: ComponentType<any> }>,
    priority: 'high' | 'medium' | 'low' = 'medium'
  ) {
    // Don't preload if already cached or loading
    if (this.componentCache[componentName] || this.loadingPromises.has(componentName)) {
      return;
    }

    const preloadKey = `${componentName}_${priority}`;
    
    if (this.preloadQueue.includes(preloadKey)) {
      return;
    }

    this.preloadQueue.push(preloadKey);

    // Schedule preload based on priority
    const delay = priority === 'high' ? 0 : priority === 'medium' ? 1000 : 3000;
    
    setTimeout(async () => {
      if ('requestIdleCallback' in window) {
        requestIdleCallback(async () => {
          try {
            console.log(`🔮 Preloading ${componentName} (priority: ${priority})`);
            const module = await importFunction();
            
            this.componentCache[componentName] = {
              component: module.default,
              loadTime: Date.now(),
              priority
            };
            
            console.log(`✨ Preloaded ${componentName}`);
          } catch (error) {
            console.warn(`⚠️ Preload failed for ${componentName}:`, error);
          }
          
          // Remove from queue
          const index = this.preloadQueue.indexOf(preloadKey);
          if (index > -1) {
            this.preloadQueue.splice(index, 1);
          }
        });
      } else {
        // Fallback for browsers without requestIdleCallback
        setTimeout(async () => {
          try {
            const module = await importFunction();
            this.componentCache[componentName] = {
              component: module.default,
              loadTime: Date.now(),
              priority
            };
          } catch (error) {
            console.warn(`⚠️ Preload failed for ${componentName}:`, error);
          }
        }, 100);
      }
    }, delay);
  }

  // 📊 CACHE MANAGEMENT
  getCacheStats() {
    const total = Object.keys(this.componentCache).length;
    const highPriority = Object.values(this.componentCache).filter(c => c.priority === 'high').length;
    const memoryUsage = JSON.stringify(this.componentCache).length;
    
    return {
      totalCached: total,
      highPriority,
      estimatedMemoryKB: Math.round(memoryUsage / 1024),
      preloadQueue: this.preloadQueue.length
    };
  }

  clearCache() {
    console.log('🧹 Clearing component cache');
    this.componentCache = {};
    this.preloadQueue = [];
    this.loadingPromises.clear();
  }

  // 🎯 ROUTE-BASED PRELOADING
  preloadRouteComponents(routePath: string) {
    const routePreloadMap: { [key: string]: string[] } = {
      '/dashboard': ['RevolutionaryStudentDashboard', 'RealTimeUpdates', 'NotificationSystem'],
      '/mock-test': ['RevolutionaryMockTest', 'MockTestAnalysis'],
      '/ai-tutor': ['AIExplainer', 'DoubtResolution'],
      '/admin': ['CompleteAdminDashboard', 'UserManagement', 'Analytics'],
      '/settings': ['SettingsDashboard', 'ProfileSettings']
    };

    const componentsToPreload = routePreloadMap[routePath] || [];
    
    componentsToPreload.forEach(componentName => {
      // This would need to be expanded with actual import functions
      console.log(`🎯 Scheduling preload for route ${routePath}: ${componentName}`);
    });
  }
}

// 🛡️ ERROR BOUNDARY COMPONENT
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<
  { children: React.ReactNode; componentName: string },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode; componentName: string }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`🚨 Error in ${this.props.componentName}:`, error, errorInfo);
    
    // Report to monitoring service
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', 'exception', {
        description: `Component Error: ${this.props.componentName}`,
        fatal: false
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center p-8 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
          <div className="text-center">
            <div className="text-red-600 text-4xl mb-4">⚠️</div>
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-400 mb-2">
              Component Error
            </h3>
            <p className="text-red-600 dark:text-red-400 mb-4">
              Failed to load {this.props.componentName}
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// 🚀 EXPORT OPTIMIZED LAZY COMPONENTS
const lazyManager = LazyComponentManager.getInstance();

// High-priority components (immediate routes)
export const LazyStudentDashboard = lazyManager.createLazyComponent(
  () => import('../components/RevolutionaryStudentDashboard'),
  'RevolutionaryStudentDashboard',
  { priority: 'high', preload: true }
);

export const LazyAdminDashboard = lazyManager.createLazyComponent(
  () => import('../components/CompleteAdminDashboard'),
  'CompleteAdminDashboard',
  { priority: 'high', preload: true }
);

// Medium-priority components (common features)
export const LazyMockTest = lazyManager.createLazyComponent(
  () => import('../MockTestStandalone'),
  'MockTestStandalone',
  { priority: 'medium', preload: false }
);

export const LazyAIExplainer = lazyManager.createLazyComponent(
  () => import('../components/ai/AITextExplainer'),
  'AITextExplainer',
  { priority: 'medium', preload: false }
);

// Low-priority components (advanced features)
export const LazyTestingSuite = lazyManager.createLazyComponent(
  () => import('../tests/RevolutionarySystemTests'),
  'RevolutionarySystemTests',
  { priority: 'low', preload: false }
);

export const LazyPerformanceMonitor = lazyManager.createLazyComponent(
  () => import('./PerformanceMonitor'),
  'PerformanceMonitor',
  { priority: 'low', preload: false }
);

// 🎯 HOOKS FOR PERFORMANCE OPTIMIZATION
export const useLazyComponentStats = () => {
  const [stats, setStats] = React.useState(lazyManager.getCacheStats());
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setStats(lazyManager.getCacheStats());
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return stats;
};

export const useRoutePreloader = () => {
  return React.useCallback((routePath: string) => {
    lazyManager.preloadRouteComponents(routePath);
  }, []);
};

// 🔧 UTILITY FUNCTIONS
export const clearComponentCache = () => lazyManager.clearCache();
export const preloadComponent = (name: string, importFn: () => Promise<any>, priority?: 'high' | 'medium' | 'low') => 
  lazyManager.preloadComponent(name, importFn, priority);

export default lazyManager;
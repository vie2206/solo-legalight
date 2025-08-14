import React from 'react';

// ⚡ API PERFORMANCE OPTIMIZATION SYSTEM
// Advanced API optimization for <500ms response times in educational platform

interface APIConfig {
  baseUrl: string;
  timeout: number;
  retryAttempts: number;
  cacheTTL: number;
  batchSize: number;
  compressionEnabled: boolean;
}

interface APIResponse<T> {
  data: T;
  status: number;
  responseTime: number;
  fromCache: boolean;
  retryCount: number;
}

interface BatchRequest {
  id: string;
  endpoint: string;
  method: string;
  params?: any;
  priority: 'high' | 'medium' | 'low';
}

export class APIOptimizer {
  private static instance: APIOptimizer;
  private config: APIConfig;
  private cache: Map<string, { data: any; timestamp: number; ttl: number }> = new Map();
  private requestQueue: BatchRequest[] = [];
  private activeRequests: Map<string, Promise<any>> = new Map();
  private performanceMetrics: { endpoint: string; responseTime: number; timestamp: number }[] = [];

  static getInstance(): APIOptimizer {
    if (!APIOptimizer.instance) {
      APIOptimizer.instance = new APIOptimizer();
    }
    return APIOptimizer.instance;
  }

  constructor() {
    this.config = {
      baseUrl: process.env.REACT_APP_API_URL || 'http://localhost:8000',
      timeout: 10000, // 10 seconds
      retryAttempts: 3,
      cacheTTL: 300000, // 5 minutes
      batchSize: 10,
      compressionEnabled: true
    };

    this.startBatchProcessor();
    this.startCacheCleanup();
  }

  // 🚀 OPTIMIZED API REQUEST
  async request<T>(
    endpoint: string,
    options: {
      method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
      data?: any;
      params?: any;
      cache?: boolean;
      priority?: 'high' | 'medium' | 'low';
      timeout?: number;
    } = {}
  ): Promise<APIResponse<T>> {
    const {
      method = 'GET',
      data,
      params,
      cache = true,
      priority = 'medium',
      timeout = this.config.timeout
    } = options;

    const startTime = performance.now();
    const cacheKey = this.generateCacheKey(endpoint, method, params, data);

    // Check cache first
    if (cache && method === 'GET') {
      const cachedResponse = this.getFromCache<T>(cacheKey);
      if (cachedResponse) {
        return {
          ...cachedResponse,
          responseTime: performance.now() - startTime,
          fromCache: true,
          retryCount: 0
        };
      }
    }

    // Check if request is already in progress
    if (this.activeRequests.has(cacheKey)) {
      const response = await this.activeRequests.get(cacheKey);
      return {
        ...response,
        responseTime: performance.now() - startTime,
        fromCache: false,
        retryCount: 0
      };
    }

    // Create request promise
    const requestPromise = this.executeRequest<T>(endpoint, {
      method,
      data,
      params,
      timeout,
      retryAttempts: this.config.retryAttempts
    });

    this.activeRequests.set(cacheKey, requestPromise);

    try {
      const response = await requestPromise;
      const responseTime = performance.now() - startTime;

      // Cache successful GET responses
      if (cache && method === 'GET' && response.status === 200) {
        this.setCache(cacheKey, response, this.config.cacheTTL);
      }

      // Track performance metrics
      this.trackPerformance(endpoint, responseTime);

      this.activeRequests.delete(cacheKey);

      return {
        ...response,
        responseTime,
        fromCache: false,
        retryCount: 0
      };
    } catch (error) {
      this.activeRequests.delete(cacheKey);
      throw error;
    }
  }

  // 🎯 EXECUTE REQUEST WITH RETRY LOGIC
  private async executeRequest<T>(
    endpoint: string,
    options: {
      method: string;
      data?: any;
      params?: any;
      timeout: number;
      retryAttempts: number;
    }
  ): Promise<APIResponse<T>> {
    const { method, data, params, timeout, retryAttempts } = options;
    
    let lastError: Error;
    
    for (let attempt = 0; attempt <= retryAttempts; attempt++) {
      try {
        // Add exponential backoff for retries
        if (attempt > 0) {
          await this.delay(Math.pow(2, attempt) * 1000);
        }

        const url = this.buildUrl(endpoint, params);
        const requestOptions: RequestInit = {
          method,
          headers: {
            'Content-Type': 'application/json',
            ...(this.config.compressionEnabled && { 'Accept-Encoding': 'gzip, deflate' })
          },
          signal: AbortSignal.timeout(timeout)
        };

        if (data && method !== 'GET') {
          requestOptions.body = JSON.stringify(data);
        }

        const response = await fetch(url, requestOptions);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const responseData = await response.json();

        return {
          data: responseData,
          status: response.status,
          responseTime: 0, // Will be calculated by caller
          fromCache: false,
          retryCount: attempt
        };

      } catch (error) {
        lastError = error as Error;
        
        // Don't retry on certain errors
        if (error instanceof TypeError || (error as any).name === 'AbortError') {
          break;
        }
        
        console.warn(`API request attempt ${attempt + 1} failed:`, error);
      }
    }

    throw lastError!;
  }

  // 📦 BATCH REQUEST PROCESSING
  addToBatch(request: BatchRequest): Promise<any> {
    return new Promise((resolve, reject) => {
      const batchRequest = {
        ...request,
        resolve,
        reject
      } as any;
      
      this.requestQueue.push(batchRequest);
    });
  }

  private startBatchProcessor(): void {
    setInterval(() => {
      if (this.requestQueue.length === 0) return;

      // Group requests by priority
      const highPriority = this.requestQueue.filter(r => r.priority === 'high');
      const mediumPriority = this.requestQueue.filter(r => r.priority === 'medium');
      const lowPriority = this.requestQueue.filter(r => r.priority === 'low');

      // Process in priority order
      const batch = [
        ...highPriority.slice(0, this.config.batchSize),
        ...mediumPriority.slice(0, Math.max(0, this.config.batchSize - highPriority.length)),
        ...lowPriority.slice(0, Math.max(0, this.config.batchSize - highPriority.length - mediumPriority.length))
      ];

      if (batch.length > 0) {
        this.processBatch(batch);
        this.requestQueue = this.requestQueue.filter(r => !batch.includes(r));
      }
    }, 100); // Process every 100ms
  }

  private async processBatch(batch: any[]): Promise<void> {
    const promises = batch.map(async (request) => {
      try {
        const response = await this.request(request.endpoint, {
          method: request.method,
          params: request.params,
          priority: request.priority
        });
        request.resolve(response);
      } catch (error) {
        request.reject(error);
      }
    });

    await Promise.allSettled(promises);
  }

  // 🗄️ CACHE MANAGEMENT
  private generateCacheKey(endpoint: string, method: string, params?: any, data?: any): string {
    const paramString = params ? JSON.stringify(params) : '';
    const dataString = data ? JSON.stringify(data) : '';
    return `${method}:${endpoint}:${paramString}:${dataString}`;
  }

  private getFromCache<T>(key: string): APIResponse<T> | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    const isExpired = Date.now() - cached.timestamp > cached.ttl;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  private setCache<T>(key: string, data: APIResponse<T>, ttl: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    });
  }

  private startCacheCleanup(): void {
    setInterval(() => {
      const now = Date.now();
      for (const [key, value] of this.cache.entries()) {
        if (now - value.timestamp > value.ttl) {
          this.cache.delete(key);
        }
      }
    }, 60000); // Cleanup every minute
  }

  // 📊 PERFORMANCE TRACKING
  private trackPerformance(endpoint: string, responseTime: number): void {
    this.performanceMetrics.push({
      endpoint,
      responseTime,
      timestamp: Date.now()
    });

    // Keep only last 100 metrics
    if (this.performanceMetrics.length > 100) {
      this.performanceMetrics = this.performanceMetrics.slice(-100);
    }

    // Log slow requests
    if (responseTime > 500) {
      console.warn(`🐌 Slow API response (${responseTime.toFixed(2)}ms):`, endpoint);
    }
  }

  getPerformanceMetrics(): {
    averageResponseTime: number;
    slowRequests: number;
    cacheHitRate: number;
    totalRequests: number;
  } {
    if (this.performanceMetrics.length === 0) {
      return {
        averageResponseTime: 0,
        slowRequests: 0,
        cacheHitRate: 0,
        totalRequests: 0
      };
    }

    const totalRequests = this.performanceMetrics.length;
    const averageResponseTime = this.performanceMetrics.reduce((sum, metric) => 
      sum + metric.responseTime, 0) / totalRequests;
    const slowRequests = this.performanceMetrics.filter(metric => 
      metric.responseTime > 500).length;

    return {
      averageResponseTime,
      slowRequests,
      cacheHitRate: (this.cache.size / totalRequests) * 100,
      totalRequests
    };
  }

  // 🛠️ UTILITY METHODS
  private buildUrl(endpoint: string, params?: any): string {
    const url = new URL(endpoint, this.config.baseUrl);
    
    if (params) {
      Object.keys(params).forEach(key => {
        url.searchParams.append(key, params[key]);
      });
    }
    
    return url.toString();
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Clear cache manually
  clearCache(): void {
    this.cache.clear();
  }

  // Get cache stats
  getCacheStats(): { size: number; hitRate: number } {
    return {
      size: this.cache.size,
      hitRate: this.getPerformanceMetrics().cacheHitRate
    };
  }
}

// 🚀 OPTIMIZED API HOOKS
export const useOptimizedAPI = () => {
  const api = APIOptimizer.getInstance();
  
  return {
    request: api.request.bind(api),
    clearCache: api.clearCache.bind(api),
    getPerformanceMetrics: api.getPerformanceMetrics.bind(api),
    getCacheStats: api.getCacheStats.bind(api)
  };
};

// 📊 API PERFORMANCE MONITOR COMPONENT
export const APIPerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = React.useState({
    averageResponseTime: 0,
    slowRequests: 0,
    cacheHitRate: 0,
    totalRequests: 0
  });

  React.useEffect(() => {
    const api = APIOptimizer.getInstance();
    
    const updateMetrics = () => {
      setMetrics(api.getPerformanceMetrics());
    };

    updateMetrics();
    const interval = setInterval(updateMetrics, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (value: number, thresholds: { good: number; fair: number }) => {
    if (value <= thresholds.good) return 'text-green-600 bg-green-100';
    if (value <= thresholds.fair) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="fixed bottom-4 left-4 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4">
      <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
        ⚡ API Performance
      </h4>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">Avg Response</span>
          <span className={`text-sm px-2 py-1 rounded font-medium ${
            getStatusColor(metrics.averageResponseTime, { good: 300, fair: 500 })
          }`}>
            {metrics.averageResponseTime.toFixed(0)}ms
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">Cache Hit Rate</span>
          <span className={`text-sm px-2 py-1 rounded font-medium ${
            getStatusColor(100 - metrics.cacheHitRate, { good: 20, fair: 50 })
          }`}>
            {metrics.cacheHitRate.toFixed(1)}%
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">Slow Requests</span>
          <span className={`text-sm px-2 py-1 rounded font-medium ${
            getStatusColor(metrics.slowRequests, { good: 0, fair: 2 })
          }`}>
            {metrics.slowRequests}
          </span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-gray-400">Total Requests</span>
          <span className="text-sm font-medium">{metrics.totalRequests}</span>
        </div>
      </div>

      {metrics.averageResponseTime > 500 && (
        <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-xs text-red-600">
            ⚠️ API performance degraded. Consider optimizing backend or increasing cache TTL.
          </p>
        </div>
      )}
    </div>
  );
};

// 🎯 EDUCATIONAL PLATFORM SPECIFIC API METHODS
export const educationalAPI = {
  // Student progress with optimized caching
  getStudentProgress: (studentId: string) => 
    APIOptimizer.getInstance().request(`/api/students/${studentId}/progress`, {
      cache: true,
      priority: 'high'
    }),

  // Mock test results with aggressive caching
  getMockTestResults: (testId: string) => 
    APIOptimizer.getInstance().request(`/api/mock-tests/${testId}/results`, {
      cache: true,
      priority: 'medium'
    }),

  // AI explanations with long-term caching
  getAIExplanation: (conceptId: string) => 
    APIOptimizer.getInstance().request(`/api/ai/explain/${conceptId}`, {
      cache: true,
      priority: 'low'
    }),

  // Real-time leaderboard (no cache)
  getLeaderboard: () => 
    APIOptimizer.getInstance().request('/api/leaderboard', {
      cache: false,
      priority: 'medium'
    }),

  // Submit answer with retry logic
  submitAnswer: (questionId: string, answer: any) => 
    APIOptimizer.getInstance().request('/api/questions/submit', {
      method: 'POST',
      data: { questionId, answer },
      cache: false,
      priority: 'high'
    })
};

export default APIOptimizer;
// API optimization utilities for SOLO by Legalight

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

interface APIRequestOptions extends Omit<RequestInit, 'cache'> {
  cache?: boolean;
  cacheTTL?: number;
  retry?: number;
}

class APICache {
  private cache: Map<string, CacheEntry<any>> = new Map();
  private readonly DEFAULT_TTL = 5 * 60 * 1000; // 5 minutes

  set<T>(key: string, data: T, ttl: number = this.DEFAULT_TTL): void {
    const now = Date.now();
    this.cache.set(key, {
      data,
      timestamp: now,
      expiresAt: now + ttl
    });
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) return null;
    
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.data;
  }

  clear(): void {
    this.cache.clear();
  }

  cleanup(): void {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
      }
    }
  }
}

// Request deduplication
class RequestDeduplicator {
  private pendingRequests: Map<string, Promise<any>> = new Map();

  async execute<T>(key: string, requestFn: () => Promise<T>): Promise<T> {
    // If the same request is already pending, return it
    if (this.pendingRequests.has(key)) {
      return this.pendingRequests.get(key)!;
    }

    // Create new request
    const promise = requestFn().finally(() => {
      this.pendingRequests.delete(key);
    });

    this.pendingRequests.set(key, promise);
    return promise;
  }
}

// Optimized API client
export class OptimizedAPIClient {
  private cache = new APICache();
  private deduplicator = new RequestDeduplicator();
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string, defaultHeaders: Record<string, string> = {}) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...defaultHeaders
    };

    // Cleanup cache every 10 minutes
    setInterval(() => this.cache.cleanup(), 10 * 60 * 1000);
  }

  private getCacheKey(url: string, options?: RequestInit): string {
    const method = options?.method || 'GET';
    const body = options?.body || '';
    return `${method}:${url}:${body}`;
  }

  async request<T>(
    endpoint: string,
    options: APIRequestOptions = {}
  ): Promise<T> {
    const { cache: useCache = false, cacheTTL, retry = 0, ...fetchOptions } = options;
    const url = `${this.baseURL}${endpoint}`;
    const cacheKey = this.getCacheKey(url, fetchOptions);

    // Check cache for GET requests
    if (useCache && (!fetchOptions.method || fetchOptions.method === 'GET')) {
      const cachedData = this.cache.get<T>(cacheKey);
      if (cachedData) {
        return cachedData;
      }
    }

    // Deduplicate identical requests
    return this.deduplicator.execute(cacheKey, async () => {
      const requestOptions: RequestInit = {
        ...fetchOptions,
        headers: {
          ...this.defaultHeaders,
          ...fetchOptions.headers
        }
      };

      let attempt = 0;
      while (attempt <= retry) {
        try {
          const response = await fetch(url, requestOptions);
          
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }

          const data: T = await response.json();

          // Cache successful GET responses
          if (useCache && (!fetchOptions.method || fetchOptions.method === 'GET')) {
            this.cache.set(cacheKey, data, cacheTTL);
          }

          return data;
        } catch (error) {
          attempt++;
          if (attempt > retry) {
            throw error;
          }
          
          // Exponential backoff
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
        }
      }

      throw new Error('Max retries exceeded');
    });
  }

  // Optimized methods for common operations
  async get<T>(endpoint: string, options: Omit<APIRequestOptions, 'method'> = {}): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', ...options });
  }

  async post<T>(endpoint: string, data: any, options: Omit<APIRequestOptions, 'method' | 'body'> = {}): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      ...options
    });
  }

  async put<T>(endpoint: string, data: any, options: Omit<APIRequestOptions, 'method' | 'body'> = {}): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      ...options
    });
  }

  async delete<T>(endpoint: string, options: Omit<APIRequestOptions, 'method'> = {}): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE', ...options });
  }

  // Batch requests
  async batch<T>(requests: Array<{ endpoint: string; options?: APIRequestOptions }>): Promise<T[]> {
    return Promise.all(
      requests.map(({ endpoint, options }) => this.request<T>(endpoint, options))
    );
  }

  // Prefetch data
  async prefetch(endpoint: string, options: APIRequestOptions = {}): Promise<void> {
    try {
      await this.request(endpoint, { ...options, cache: true });
    } catch (error) {
      console.warn('Prefetch failed:', error);
    }
  }

  // Clear cache
  clearCache(): void {
    this.cache.clear();
  }
}

// Database query optimization utilities
export const DatabaseOptimizer = {
  // Generate optimized query parameters
  buildQuery: (params: Record<string, any>) => {
    const searchParams = new URLSearchParams();
    
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (Array.isArray(value)) {
          value.forEach(v => searchParams.append(key, String(v)));
        } else {
          searchParams.append(key, String(value));
        }
      }
    });
    
    return searchParams.toString();
  },

  // Pagination helper
  paginate: (page: number = 1, limit: number = 20) => ({
    offset: (page - 1) * limit,
    limit: Math.min(limit, 100) // Cap at 100 items
  }),

  // Field selection for GraphQL-like behavior
  selectFields: (fields: string[]) => ({
    select: fields.join(',')
  }),

  // Optimized search parameters
  search: (query: string, fields: string[] = []) => ({
    q: query.trim(),
    search_fields: fields.join(','),
    // Add search optimizations
    highlight: true,
    fuzzy: query.length > 3 // Only use fuzzy search for longer queries
  })
};

// Create optimized API client instance
const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';
export const apiClient = new OptimizedAPIClient(API_BASE);

// Preload critical data
export const preloadCriticalData = async (userRole?: string) => {
  if (!userRole) return;

  const preloadTasks = [];

  // Preload based on user role
  switch (userRole) {
    case 'student':
      preloadTasks.push(
        apiClient.prefetch('/api/student/dashboard'),
        apiClient.prefetch('/api/tests/recent'),
        apiClient.prefetch('/api/progress/summary')
      );
      break;
    case 'educator':
      preloadTasks.push(
        apiClient.prefetch('/api/educator/classes'),
        apiClient.prefetch('/api/students/overview'),
        apiClient.prefetch('/api/reports/summary')
      );
      break;
    case 'admin':
      preloadTasks.push(
        apiClient.prefetch('/api/admin/stats'),
        apiClient.prefetch('/api/users/overview'),
        apiClient.prefetch('/api/system/health')
      );
      break;
  }

  await Promise.allSettled(preloadTasks);
};
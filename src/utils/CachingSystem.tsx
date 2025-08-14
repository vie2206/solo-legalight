import React, { createContext, useContext, useEffect, useState } from 'react';

// 🚀 REVOLUTIONARY CACHING SYSTEM
// Multi-layer caching for maximum performance in educational platform

interface CacheEntry<T = any> {
  data: T;
  timestamp: number;
  ttl: number;
  priority: 'low' | 'medium' | 'high' | 'critical';
  accessCount: number;
  lastAccessed: number;
  compressedSize?: number;
}

interface CacheConfig {
  maxSize: number;          // Maximum cache size in MB
  defaultTtl: number;       // Default TTL in milliseconds
  compressionThreshold: number; // Compress entries larger than this (bytes)
  enablePersistence: boolean;   // Save to localStorage/IndexedDB
  enableCompression: boolean;   // Use compression for large entries
}

interface CacheStats {
  hitRate: number;
  missRate: number;
  totalEntries: number;
  totalSize: number;
  avgAccessTime: number;
  evictionCount: number;
}

class AdvancedCacheManager {
  private cache: Map<string, CacheEntry<any>> = new Map();
  private config: CacheConfig;
  private stats: CacheStats = {
    hitRate: 0,
    missRate: 0,
    totalEntries: 0,
    totalSize: 0,
    avgAccessTime: 0,
    evictionCount: 0
  };
  private accessTimes: number[] = [];
  private hitCount = 0;
  private missCount = 0;

  constructor(config: Partial<CacheConfig> = {}) {
    this.config = {
      maxSize: 50 * 1024 * 1024, // 50MB default
      defaultTtl: 30 * 60 * 1000, // 30 minutes
      compressionThreshold: 10 * 1024, // 10KB
      enablePersistence: true,
      enableCompression: true,
      ...config
    };

    this.loadFromPersistence();
    this.startCleanupInterval();
  }

  // 🎯 CORE CACHE OPERATIONS
  async set<T>(
    key: string,
    data: T,
    options: {
      ttl?: number;
      priority?: 'low' | 'medium' | 'high' | 'critical';
      compress?: boolean;
    } = {}
  ): Promise<void> {
    const {
      ttl = this.config.defaultTtl,
      priority = 'medium',
      compress = this.config.enableCompression
    } = options;

    let processedData: T | string = data;
    let compressedSize: number | undefined;

    // Compression for large data
    if (compress && this.shouldCompress(data)) {
      try {
        processedData = await this.compressData(data) as T;
        compressedSize = this.getDataSize(processedData);
      } catch (error) {
        console.warn('Failed to compress data, storing uncompressed:', error);
      }
    }

    const entry: CacheEntry<any> = {
      data: processedData,
      timestamp: Date.now(),
      ttl,
      priority,
      accessCount: 0,
      lastAccessed: Date.now(),
      compressedSize
    };

    // Check if we need to evict entries
    await this.ensureCapacity(this.getDataSize(entry));

    this.cache.set(key, entry);
    this.updateStats();

    // Persist to storage if enabled
    if (this.config.enablePersistence && priority !== 'low') {
      this.persistEntry(key, entry);
    }
  }

  async get<T>(key: string): Promise<T | null> {
    const startTime = performance.now();
    const entry = this.cache.get(key);

    if (!entry) {
      this.recordMiss();
      this.trackAccessTime(performance.now() - startTime);
      return null;
    }

    // Check if entry has expired
    if (Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      this.removePersistentEntry(key);
      this.recordMiss();
      this.trackAccessTime(performance.now() - startTime);
      return null;
    }

    // Update access statistics
    entry.accessCount++;
    entry.lastAccessed = Date.now();

    let data = entry.data;

    // Decompress if needed
    if (entry.compressedSize && this.config.enableCompression) {
      try {
        data = await this.decompressData(entry.data);
      } catch (error) {
        console.error('Failed to decompress data:', error);
        this.cache.delete(key);
        this.recordMiss();
        return null;
      }
    }

    this.recordHit();
    this.trackAccessTime(performance.now() - startTime);
    return data;
  }

  // 🎯 INTELLIGENT CACHE STRATEGIES

  // Educational content specific caching
  async cacheStudentProgress(studentId: string, progress: any): Promise<void> {
    await this.set(`student_progress_${studentId}`, progress, {
      ttl: 60 * 60 * 1000, // 1 hour
      priority: 'high'
    });
  }

  async cacheMockTestResults(testId: string, results: any): Promise<void> {
    await this.set(`mock_test_${testId}`, results, {
      ttl: 7 * 24 * 60 * 60 * 1000, // 1 week
      priority: 'critical'
    });
  }

  async cacheAIExplanations(conceptId: string, explanation: any): Promise<void> {
    await this.set(`ai_explanation_${conceptId}`, explanation, {
      ttl: 24 * 60 * 60 * 1000, // 24 hours
      priority: 'high',
      compress: true
    });
  }

  async cacheQuestionBank(subjectId: string, questions: any[]): Promise<void> {
    await this.set(`questions_${subjectId}`, questions, {
      ttl: 12 * 60 * 60 * 1000, // 12 hours
      priority: 'medium',
      compress: true
    });
  }

  // 🎯 CACHE WARMING STRATEGIES
  async warmCache(essentialKeys: string[]): Promise<void> {
    console.log('🔥 Warming cache with essential data...');
    
    const warmingPromises = essentialKeys.map(async (key) => {
      try {
        // Simulate loading essential data
        if (key.includes('student_dashboard')) {
          await this.set(key, await this.loadDashboardData(), { priority: 'critical' });
        } else if (key.includes('question_bank')) {
          await this.set(key, await this.loadQuestionBankData(), { priority: 'high' });
        } else if (key.includes('ai_responses')) {
          await this.set(key, await this.loadCommonAIResponses(), { priority: 'medium' });
        }
      } catch (error) {
        console.warn(`Failed to warm cache for ${key}:`, error);
      }
    });

    await Promise.all(warmingPromises);
    console.log('✅ Cache warming completed');
  }

  // 🎯 PREDICTIVE CACHING
  async predictiveCache(userContext: {
    currentSubject: string;
    difficulty: string;
    recentTopics: string[];
    testType: string;
  }): Promise<void> {
    const predictions = this.generateCachePredictions(userContext);
    
    // Cache predicted content with lower priority
    for (const prediction of predictions) {
      setTimeout(async () => {
        if (!this.cache.has(prediction.key)) {
          await this.set(prediction.key, await prediction.dataLoader(), {
            priority: 'low',
            ttl: prediction.ttl
          });
        }
      }, prediction.delay);
    }
  }

  private generateCachePredictions(userContext: any) {
    const predictions = [];

    // Predict next subject materials
    const nextSubjects = this.getNextLikelySubjects(userContext.currentSubject);
    nextSubjects.forEach((subject, index) => {
      predictions.push({
        key: `questions_${subject}`,
        dataLoader: () => this.loadQuestionBankData(),
        ttl: 60 * 60 * 1000,
        delay: index * 2000
      });
    });

    // Predict difficulty progression
    const nextDifficulty = this.getNextDifficulty(userContext.difficulty);
    predictions.push({
      key: `questions_${userContext.currentSubject}_${nextDifficulty}`,
      dataLoader: () => this.loadQuestionBankData(),
      ttl: 30 * 60 * 1000,
      delay: 1000
    });

    return predictions;
  }

  // 🎯 COMPRESSION UTILITIES
  private shouldCompress<T>(data: T): boolean {
    const size = this.getDataSize(data);
    return size > this.config.compressionThreshold;
  }

  private async compressData<T>(data: T): Promise<string> {
    if (typeof window !== 'undefined' && 'CompressionStream' in window) {
      try {
        // Use native compression if available
        const stream = new (window as any).CompressionStream('gzip');
        const compressed = await new Response(
          new Response(JSON.stringify(data)).body!.pipeThrough(stream)
        ).text();
        return compressed;
      } catch (error) {
        // Fallback if compression fails
        return JSON.stringify(data);
      }
    } else {
      // Fallback to JSON stringification
      return JSON.stringify(data);
    }
  }

  private async decompressData(compressedData: string): Promise<any> {
    if (typeof window !== 'undefined' && 'DecompressionStream' in window) {
      try {
        const stream = new (window as any).DecompressionStream('gzip');
        const decompressed = await new Response(
          new Response(compressedData).body!.pipeThrough(stream)
        ).text();
        return JSON.parse(decompressed);
      } catch {
        // Fallback if not actually compressed
        return JSON.parse(compressedData);
      }
    } else {
      return JSON.parse(compressedData);
    }
  }

  // 🎯 CACHE EVICTION STRATEGIES
  private async ensureCapacity(requiredSize: number): Promise<void> {
    const currentSize = this.getCurrentCacheSize();
    
    if (currentSize + requiredSize <= this.config.maxSize) {
      return;
    }

    console.log('🧹 Cache capacity exceeded, starting eviction...');
    
    // Get entries sorted by eviction priority
    const entries = Array.from(this.cache.entries()).map(([key, entry]) => ({
      key,
      entry,
      score: this.calculateEvictionScore(entry)
    })).sort((a, b) => a.score - b.score);

    // Evict entries until we have enough space
    let freedSpace = 0;
    const target = requiredSize + (this.config.maxSize * 0.1); // 10% buffer

    for (const { key, entry } of entries) {
      if (freedSpace >= target) break;
      
      const entrySize = this.getDataSize(entry);
      this.cache.delete(key);
      this.removePersistentEntry(key);
      freedSpace += entrySize;
      this.stats.evictionCount++;
    }

    console.log(`✅ Evicted ${freedSpace} bytes from cache`);
  }

  private calculateEvictionScore(entry: CacheEntry<any>): number {
    const now = Date.now();
    const age = now - entry.timestamp;
    const timeSinceAccess = now - entry.lastAccessed;
    const priorityMultiplier = {
      'critical': 10,
      'high': 5,
      'medium': 2,
      'low': 1
    }[entry.priority];

    // Lower score = higher eviction priority
    return (age + timeSinceAccess * 2) / (entry.accessCount + 1) / priorityMultiplier;
  }

  // 🎯 PERSISTENCE LAYER
  private persistEntry(key: string, entry: CacheEntry<any>): void {
    if (!this.config.enablePersistence) return;

    try {
      const persistKey = `cache_${key}`;
      const persistData = {
        ...entry,
        data: typeof entry.data === 'object' ? JSON.stringify(entry.data) : entry.data
      };
      
      localStorage.setItem(persistKey, JSON.stringify(persistData));
    } catch (error) {
      console.warn('Failed to persist cache entry:', error);
    }
  }

  private loadFromPersistence(): void {
    if (!this.config.enablePersistence) return;

    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith('cache_')) {
          const cacheKey = key.substring(6);
          const persistedData = localStorage.getItem(key);
          
          if (persistedData) {
            const entry = JSON.parse(persistedData);
            
            // Check if entry is still valid
            if (Date.now() - entry.timestamp < entry.ttl) {
              // Parse data if it was stringified
              if (typeof entry.data === 'string') {
                try {
                  entry.data = JSON.parse(entry.data);
                } catch {
                  // Keep as string if not valid JSON
                }
              }
              
              this.cache.set(cacheKey, entry);
            } else {
              localStorage.removeItem(key);
            }
          }
        }
      }
    } catch (error) {
      console.warn('Failed to load from persistence:', error);
    }
  }

  private removePersistentEntry(key: string): void {
    try {
      localStorage.removeItem(`cache_${key}`);
    } catch (error) {
      console.warn('Failed to remove persistent entry:', error);
    }
  }

  // 🎯 UTILITY METHODS
  private getDataSize(data: any): number {
    return new Blob([JSON.stringify(data)]).size;
  }

  private getCurrentCacheSize(): number {
    let totalSize = 0;
    this.cache.forEach(entry => {
      totalSize += this.getDataSize(entry);
    });
    return totalSize;
  }

  private recordHit(): void {
    this.hitCount++;
    this.updateStats();
  }

  private recordMiss(): void {
    this.missCount++;
    this.updateStats();
  }

  private trackAccessTime(time: number): void {
    this.accessTimes.push(time);
    if (this.accessTimes.length > 1000) {
      this.accessTimes = this.accessTimes.slice(-500);
    }
  }

  private updateStats(): void {
    const total = this.hitCount + this.missCount;
    this.stats = {
      hitRate: total > 0 ? (this.hitCount / total) * 100 : 0,
      missRate: total > 0 ? (this.missCount / total) * 100 : 0,
      totalEntries: this.cache.size,
      totalSize: this.getCurrentCacheSize(),
      avgAccessTime: this.accessTimes.length > 0 
        ? this.accessTimes.reduce((a, b) => a + b, 0) / this.accessTimes.length 
        : 0,
      evictionCount: this.stats.evictionCount
    };
  }

  private startCleanupInterval(): void {
    setInterval(() => {
      this.cleanup();
    }, 5 * 60 * 1000); // Every 5 minutes
  }

  private cleanup(): void {
    const now = Date.now();
    const expiredKeys: string[] = [];

    this.cache.forEach((entry, key) => {
      if (now - entry.timestamp > entry.ttl) {
        expiredKeys.push(key);
      }
    });

    expiredKeys.forEach(key => {
      this.cache.delete(key);
      this.removePersistentEntry(key);
    });

    if (expiredKeys.length > 0) {
      console.log(`🧹 Cleaned up ${expiredKeys.length} expired cache entries`);
    }
  }

  // 🎯 MOCK DATA LOADERS (replace with real implementations)
  private async loadDashboardData(): Promise<any> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 100));
    return { dashboard: 'data' };
  }

  private async loadQuestionBankData(): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return { questions: [] };
  }

  private async loadCommonAIResponses(): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 150));
    return { responses: [] };
  }

  private getNextLikelySubjects(currentSubject: string): string[] {
    const subjectFlow = {
      'legal-reasoning': ['constitutional-law', 'contract-law'],
      'logical-reasoning': ['quantitative', 'data-interpretation'],
      'english': ['reading-comprehension', 'grammar'],
      'gk': ['current-affairs', 'static-gk']
    };
    return subjectFlow[currentSubject as keyof typeof subjectFlow] || [];
  }

  private getNextDifficulty(current: string): string {
    const progression = { 'easy': 'medium', 'medium': 'hard', 'hard': 'expert' };
    return progression[current as keyof typeof progression] || current;
  }

  // 🎯 PUBLIC API
  getStats(): CacheStats {
    return { ...this.stats };
  }

  clear(): void {
    this.cache.clear();
    this.hitCount = 0;
    this.missCount = 0;
    this.accessTimes = [];
    this.updateStats();
  }

  async prefetch(keys: string[]): Promise<void> {
    await Promise.all(keys.map(key => this.get(key)));
  }
}

// 🎯 REACT CONTEXT FOR CACHE
const CacheContext = createContext<AdvancedCacheManager | null>(null);

export const CacheProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cacheManager] = useState(() => new AdvancedCacheManager({
    maxSize: 100 * 1024 * 1024, // 100MB for educational platform
    defaultTtl: 30 * 60 * 1000,  // 30 minutes
    enablePersistence: true,
    enableCompression: true
  }));

  useEffect(() => {
    // Warm cache on mount
    cacheManager.warmCache([
      'student_dashboard_data',
      'question_bank_legal',
      'question_bank_logical',
      'ai_responses_common'
    ]);
  }, [cacheManager]);

  return (
    <CacheContext.Provider value={cacheManager}>
      {children}
    </CacheContext.Provider>
  );
};

// 🎯 HOOKS
export const useCache = () => {
  const cache = useContext(CacheContext);
  if (!cache) {
    throw new Error('useCache must be used within CacheProvider');
  }
  return cache;
};

export const useCacheStats = () => {
  const cache = useCache();
  const [stats, setStats] = useState(cache.getStats());

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(cache.getStats());
    }, 1000);

    return () => clearInterval(interval);
  }, [cache]);

  return stats;
};

export default AdvancedCacheManager;
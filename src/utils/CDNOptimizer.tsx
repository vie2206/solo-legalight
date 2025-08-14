import React from 'react';

// 🚀 CDN & ASSET OPTIMIZATION SYSTEM
// Advanced asset delivery optimization for educational platform

interface CDNConfig {
  baseUrl: string;
  regions: string[];
  cacheTTL: number;
  compressionLevel: string;
  optimization: {
    images: boolean;
    fonts: boolean;
    videos: boolean;
    documents: boolean;
  };
}

export class CDNOptimizer {
  private static instance: CDNOptimizer;
  private config: CDNConfig;

  static getInstance(): CDNOptimizer {
    if (!CDNOptimizer.instance) {
      CDNOptimizer.instance = new CDNOptimizer();
    }
    return CDNOptimizer.instance;
  }

  constructor() {
    this.config = {
      baseUrl: process.env.REACT_APP_CDN_URL || 'https://cdn.legalight.com',
      regions: ['us-east-1', 'ap-south-1', 'eu-west-1'],
      cacheTTL: 31536000, // 1 year for static assets
      compressionLevel: 'gzip',
      optimization: {
        images: true,
        fonts: true,
        videos: true,
        documents: true
      }
    };
  }

  // 🎯 INTELLIGENT ASSET ROUTING
  getOptimizedAssetUrl(path: string, options: {
    format?: 'webp' | 'avif' | 'original';
    quality?: number;
    width?: number;
    height?: number;
  } = {}): string {
    const {
      format = 'webp',
      quality = 80,
      width,
      height
    } = options;

    // Detect user's region for CDN optimization
    const region = this.detectOptimalRegion();
    const baseUrl = this.config.baseUrl.replace('cdn.', `${region}.cdn.`);

    // Build optimized URL with parameters
    const params = new URLSearchParams();
    
    if (format !== 'original') params.append('format', format);
    if (quality !== 80) params.append('q', quality.toString());
    if (width) params.append('w', width.toString());
    if (height) params.append('h', height.toString());

    const queryString = params.toString();
    return `${baseUrl}${path}${queryString ? '?' + queryString : ''}`;
  }

  // 🌍 REGION DETECTION
  private detectOptimalRegion(): string {
    // Simplified region detection - in production use proper geo-detection
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    if (timezone.includes('Asia')) return 'ap-south-1';
    if (timezone.includes('Europe')) return 'eu-west-1';
    return 'us-east-1'; // Default to US
  }

  // 📷 IMAGE OPTIMIZATION
  optimizeImage(src: string, options: {
    width?: number;
    height?: number;
    quality?: number;
    lazy?: boolean;
  } = {}): {
    src: string;
    srcSet: string;
    loading: 'lazy' | 'eager';
  } {
    const { width, height, quality = 80, lazy = true } = options;

    // Generate responsive image URLs
    const sizes = [480, 768, 1024, 1280, 1920];
    const srcSet = sizes.map(size => {
      const url = this.getOptimizedAssetUrl(src, {
        format: 'webp',
        quality,
        width: size
      });
      return `${url} ${size}w`;
    }).join(', ');

    return {
      src: this.getOptimizedAssetUrl(src, { width, height, quality }),
      srcSet,
      loading: lazy ? 'lazy' : 'eager'
    };
  }

  // 🎨 FONT OPTIMIZATION
  optimizeFont(fontFamily: string, weights: string[] = ['400', '600', '700']): string {
    const baseUrl = 'https://fonts.googleapis.com/css2';
    const family = `family=${fontFamily}:wght@${weights.join(';')}`;
    const params = [
      family,
      'display=swap', // Improve font loading performance
      'subset=latin'
    ].join('&');

    return `${baseUrl}?${params}`;
  }

  // 🎥 VIDEO OPTIMIZATION
  optimizeVideo(src: string, options: {
    quality?: 'auto' | 'low' | 'medium' | 'high';
    format?: 'mp4' | 'webm' | 'hls';
    poster?: string;
  } = {}): {
    src: string;
    poster?: string;
    type: string;
  } {
    const { quality = 'auto', format = 'mp4', poster } = options;
    
    const optimizedSrc = this.getOptimizedAssetUrl(src, {
      format: format as any,
      quality: quality === 'auto' ? 80 : 
               quality === 'low' ? 50 : 
               quality === 'medium' ? 70 : 90
    });

    return {
      src: optimizedSrc,
      poster: poster ? this.getOptimizedAssetUrl(poster, { format: 'webp', quality: 70 }) : undefined,
      type: `video/${format}`
    };
  }

  // 📄 DOCUMENT OPTIMIZATION
  optimizeDocument(src: string, type: 'pdf' | 'doc' | 'xls' | 'ppt'): string {
    // For educational documents, add compression and caching
    return this.getOptimizedAssetUrl(src, {
      format: 'original' // Keep original format but add CDN benefits
    });
  }

  // 🚀 PRELOAD CRITICAL ASSETS
  preloadCriticalAssets(): void {
    const criticalAssets = [
      // Fonts
      this.optimizeFont('Inter', ['400', '500', '600', '700']),
      // Logo and brand assets
      this.getOptimizedAssetUrl('/images/logo.svg'),
      // Critical educational icons
      this.getOptimizedAssetUrl('/images/icons/education-sprite.svg')
    ];

    criticalAssets.forEach(url => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = url;
      link.as = url.includes('.css') ? 'style' : url.includes('.svg') ? 'image' : 'fetch';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }

  // 📊 PERFORMANCE MONITORING
  monitorAssetPerformance(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'resource') {
            const resourceEntry = entry as PerformanceResourceTiming;
            
            // Monitor CDN performance
            if (resourceEntry.name.includes(this.config.baseUrl)) {
              console.log(`📊 CDN Asset Performance:`, {
                asset: resourceEntry.name,
                duration: resourceEntry.duration,
                transferSize: resourceEntry.transferSize,
                cacheHit: resourceEntry.transferSize === 0
              });
            }
          }
        });
      });

      observer.observe({ entryTypes: ['resource'] });
    }
  }
}

// 🎨 OPTIMIZED IMAGE COMPONENT
export const OptimizedImage: React.FC<{
  src: string;
  alt: string;
  width?: number;
  height?: number;
  quality?: number;
  className?: string;
  lazy?: boolean;
}> = ({ src, alt, width, height, quality, className, lazy = true }) => {
  const cdn = CDNOptimizer.getInstance();
  const optimized = cdn.optimizeImage(src, { width, height, quality, lazy });

  return (
    <img
      src={optimized.src}
      srcSet={optimized.srcSet}
      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      alt={alt}
      className={className}
      loading={optimized.loading}
      width={width}
      height={height}
    />
  );
};

// 🎥 OPTIMIZED VIDEO COMPONENT
export const OptimizedVideo: React.FC<{
  src: string;
  poster?: string;
  quality?: 'auto' | 'low' | 'medium' | 'high';
  className?: string;
  controls?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
}> = ({ src, poster, quality = 'auto', className, controls = true, autoPlay = false, muted = false, loop = false }) => {
  const cdn = CDNOptimizer.getInstance();
  const optimized = cdn.optimizeVideo(src, { quality, poster });

  return (
    <video
      className={className}
      controls={controls}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      poster={optimized.poster}
      preload="metadata"
    >
      <source src={optimized.src} type={optimized.type} />
      <p>Your browser doesn't support video playback.</p>
    </video>
  );
};

// 🚀 CDN PROVIDER COMPONENT
export const CDNProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  React.useEffect(() => {
    const cdn = CDNOptimizer.getInstance();
    
    // Preload critical assets
    cdn.preloadCriticalAssets();
    
    // Start performance monitoring
    cdn.monitorAssetPerformance();
    
    // Preconnect to CDN domains
    const preconnectDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
      cdn.getOptimizedAssetUrl('/')
    ];
    
    preconnectDomains.forEach(domain => {
      const link = document.createElement('link');
      link.rel = 'preconnect';
      link.href = domain;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }, []);

  return <>{children}</>;
};

// 🔧 ASSET OPTIMIZATION UTILITIES
export const assetUtils = {
  // Get optimized asset URL
  getAssetUrl: (path: string, options?: any) => 
    CDNOptimizer.getInstance().getOptimizedAssetUrl(path, options),
  
  // Get optimized font URL
  getFontUrl: (fontFamily: string, weights?: string[]) => 
    CDNOptimizer.getInstance().optimizeFont(fontFamily, weights),
  
  // Get optimized document URL
  getDocumentUrl: (path: string, type: 'pdf' | 'doc' | 'xls' | 'ppt') => 
    CDNOptimizer.getInstance().optimizeDocument(path, type),
  
  // Preload critical resources
  preloadCritical: () => 
    CDNOptimizer.getInstance().preloadCriticalAssets()
};

export default CDNOptimizer;
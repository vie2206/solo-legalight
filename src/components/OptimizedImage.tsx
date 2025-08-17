import React, { useState, useRef, useEffect } from 'react';
import { lazyLoadImage, createIntersectionObserver } from '../utils/performance';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  placeholder?: string;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  placeholder,
  priority = false,
  onLoad,
  onError
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (priority) {
      // Load immediately for priority images
      setIsInView(true);
      return;
    }

    // Set up intersection observer for lazy loading
    observerRef.current = createIntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observerRef.current?.unobserve(entry.target);
        }
      });
    });

    if (imgRef.current && observerRef.current) {
      observerRef.current.observe(imgRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  // Generate placeholder styles
  const placeholderStyle = {
    backgroundColor: '#f3f4f6',
    background: placeholder || 'linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)',
    backgroundSize: '200% 100%',
    animation: !isLoaded ? 'shimmer 1.5s infinite' : 'none',
  };

  const imageStyle = {
    opacity: isLoaded ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out',
  };

  const containerStyle = {
    position: 'relative' as const,
    overflow: 'hidden',
    ...(width && height ? { width, height } : {}),
  };

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>
      
      <div style={containerStyle} className={className}>
        {/* Placeholder */}
        <div
          style={{
            ...placeholderStyle,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
            display: isLoaded ? 'none' : 'block',
          }}
        />

        {/* Error state */}
        {hasError && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fee2e2',
              color: '#991b1b',
              fontSize: '0.875rem',
              zIndex: 2,
            }}
          >
            Failed to load image
          </div>
        )}

        {/* Actual image */}
        <img
          ref={imgRef}
          src={isInView ? src : undefined}
          alt={alt}
          width={width}
          height={height}
          style={{
            ...imageStyle,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'relative',
            zIndex: 3,
          }}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
        />
      </div>
    </>
  );
};

export default OptimizedImage;
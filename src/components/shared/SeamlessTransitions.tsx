import React, { useState, useEffect } from 'react';
import './SeamlessTransitions.css';

// 🌟 SEAMLESS UX TRANSITIONS SYSTEM
// Inspired by best practices from revolutionary platforms

interface TransitionProps {
  children: React.ReactNode;
  variant?: 'fade' | 'slide' | 'scale' | 'rotate' | 'bounce';
  duration?: number;
  delay?: number;
  trigger?: boolean;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export const SeamlessTransition: React.FC<TransitionProps> = ({
  children,
  variant = 'fade',
  duration = 300,
  delay = 0,
  trigger = true,
  direction = 'up'
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (trigger) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [trigger, delay]);

  const getTransitionClass = () => {
    const baseClass = `seamless-transition seamless-${variant}`;
    const directionClass = direction ? `seamless-${direction}` : '';
    const visibleClass = isVisible ? 'seamless-visible' : '';
    
    return `${baseClass} ${directionClass} ${visibleClass}`;
  };

  return (
    <div 
      className={getTransitionClass()}
      style={{
        '--transition-duration': `${duration}ms`,
        '--transition-delay': `${delay}ms`
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
};

// 🎯 Page Transition Wrapper
interface PageTransitionProps {
  children: React.ReactNode;
  pageKey: string;
  direction?: 'forward' | 'backward';
}

export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  pageKey,
  direction = 'forward'
}) => {
  const [currentPage, setCurrentPage] = useState(pageKey);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (currentPage !== pageKey) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPage(pageKey);
        setIsTransitioning(false);
      }, 150);
    }
  }, [pageKey, currentPage]);

  return (
    <div className={`page-transition ${direction} ${isTransitioning ? 'transitioning' : ''}`}>
      {children}
    </div>
  );
};

// 🌊 Scroll-triggered Animations
interface ScrollAnimationProps {
  children: React.ReactNode;
  threshold?: number;
  rootMargin?: string;
  animationType?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'slideInUp';
}

export const ScrollAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  threshold = 0.1,
  rootMargin = '0px 0px -50px 0px',
  animationType = 'fadeInUp'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [element, setElement] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [element, threshold, rootMargin]);

  return (
    <div 
      ref={setElement}
      className={`scroll-animation ${animationType} ${isVisible ? 'visible' : ''}`}
    >
      {children}
    </div>
  );
};

// 🎨 Interactive Hover Transitions
interface HoverTransitionProps {
  children: React.ReactNode;
  hoverEffect?: 'lift' | 'glow' | 'scale' | 'rotate' | 'pulse' | 'gradient';
  intensity?: 'subtle' | 'medium' | 'strong';
}

export const HoverTransition: React.FC<HoverTransitionProps> = ({
  children,
  hoverEffect = 'lift',
  intensity = 'medium'
}) => {
  return (
    <div className={`hover-transition hover-${hoverEffect} intensity-${intensity}`}>
      {children}
    </div>
  );
};

// 🎭 Modal Transitions
interface ModalTransitionProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  variant?: 'fade' | 'slide' | 'scale' | 'flip';
}

export const ModalTransition: React.FC<ModalTransitionProps> = ({
  children,
  isOpen,
  onClose,
  variant = 'scale'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
      setTimeout(() => setShouldRender(false), 300);
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <div className={`modal-overlay ${isVisible ? 'visible' : ''}`} onClick={onClose}>
      <div 
        className={`modal-content modal-${variant} ${isVisible ? 'visible' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

// 🔄 Loading Transitions
interface LoadingTransitionProps {
  isLoading: boolean;
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
  fadeOutDelay?: number;
}

export const LoadingTransition: React.FC<LoadingTransitionProps> = ({
  isLoading,
  children,
  loadingComponent,
  fadeOutDelay = 500
}) => {
  const [showLoading, setShowLoading] = useState(isLoading);
  const [showContent, setShowContent] = useState(!isLoading);

  useEffect(() => {
    if (isLoading) {
      setShowContent(false);
      setShowLoading(true);
    } else {
      setTimeout(() => {
        setShowLoading(false);
        setTimeout(() => setShowContent(true), 150);
      }, fadeOutDelay);
    }
  }, [isLoading, fadeOutDelay]);

  return (
    <div className="loading-transition-container">
      {showLoading && (
        <div className={`loading-overlay ${!isLoading ? 'fade-out' : ''}`}>
          {loadingComponent}
        </div>
      )}
      {showContent && (
        <div className="content-container fade-in">
          {children}
        </div>
      )}
    </div>
  );
};

// 🎯 Route Transitions for React Router
interface RouteTransitionProps {
  children: React.ReactNode;
  location: any;
  transitionKey?: string;
}

export const RouteTransition: React.FC<RouteTransitionProps> = ({
  children,
  location,
  transitionKey
}) => {
  return (
    <div className="route-transition-container">
      <div key={transitionKey || location.pathname} className="route-content">
        {children}
      </div>
    </div>
  );
};

// 🎨 Stagger Animation for Lists
interface StaggerProps {
  children: React.ReactNode[];
  delay?: number;
  duration?: number;
  animationType?: 'fadeInUp' | 'slideInLeft' | 'scaleIn';
}

export const StaggerAnimation: React.FC<StaggerProps> = ({
  children,
  delay = 100,
  duration = 300,
  animationType = 'fadeInUp'
}) => {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    new Array(children.length).fill(false)
  );

  useEffect(() => {
    children.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems(prev => {
          const newVisible = [...prev];
          newVisible[index] = true;
          return newVisible;
        });
      }, index * delay);
    });
  }, [children.length, delay]);

  return (
    <div className="stagger-container">
      {children.map((child, index) => (
        <div
          key={index}
          className={`stagger-item ${animationType} ${
            visibleItems[index] ? 'visible' : ''
          }`}
          style={{
            '--animation-duration': `${duration}ms`,
            '--animation-delay': `${index * delay}ms`
          } as React.CSSProperties}
        >
          {child}
        </div>
      ))}
    </div>
  );
};

// 🎪 Educational Progress Transitions
interface ProgressTransitionProps {
  progress: number;
  children: React.ReactNode;
  celebration?: boolean;
  milestoneReached?: boolean;
}

export const ProgressTransition: React.FC<ProgressTransitionProps> = ({
  progress,
  children,
  celebration = false,
  milestoneReached = false
}) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    // Animate progress bar
    const timer = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 100);

    // Show celebration if milestone reached
    if (milestoneReached && celebration) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2000);
    }

    return () => clearTimeout(timer);
  }, [progress, celebration, milestoneReached]);

  return (
    <div className="progress-transition-container">
      <div className={`progress-content ${showCelebration ? 'celebrating' : ''}`}>
        {children}
      </div>
      
      {showCelebration && (
        <div className="celebration-overlay">
          <div className="celebration-particles">
            {[...Array(12)].map((_, i) => (
              <div key={i} className={`particle particle-${i}`}>🎉</div>
            ))}
          </div>
          <div className="celebration-text">
            🎉 Milestone Achieved! 🎉
          </div>
        </div>
      )}
      
      <div className="progress-bar-container">
        <div 
          className="progress-bar-fill"
          style={{ 
            width: `${animatedProgress}%`,
            transition: 'width 1s ease-out'
          }}
        />
      </div>
    </div>
  );
};

export default {
  SeamlessTransition,
  PageTransition,
  ScrollAnimation,
  HoverTransition,
  ModalTransition,
  LoadingTransition,
  RouteTransition,
  StaggerAnimation,
  ProgressTransition
};
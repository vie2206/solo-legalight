import React from 'react';

// ⚡ OPTIMIZED ANIMATION SYSTEM
// Tree-shaken framer-motion imports for better bundle size

// 🎯 SPECIFIC MOTION IMPORTS (Tree-shaken)
const LazyMotionDiv = React.lazy(() => 
  import('framer-motion').then(module => ({ 
    default: module.motion.div 
  }))
);

const LazyMotionSpan = React.lazy(() => 
  import('framer-motion').then(module => ({ 
    default: module.motion.span 
  }))
);

const LazyMotionButton = React.lazy(() => 
  import('framer-motion').then(module => ({ 
    default: module.motion.button 
  }))
);

// 🚀 OPTIMIZED ANIMATION VARIANTS
export const optimizedAnimations = {
  // Fast, GPU-accelerated animations for better performance
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 }
  },
  
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] as any }
  },
  
  scale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: { duration: 0.2 }
  },
  
  slideInLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
    transition: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] as any }
  },
  
  stagger: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    },
    exit: {},
    transition: {}
  }
};

// 🎨 OPTIMIZED ANIMATION COMPONENTS
export const OptimizedMotionDiv: React.FC<{
  children: React.ReactNode;
  variant?: keyof typeof optimizedAnimations;
  className?: string;
  onClick?: () => void;
}> = ({ children, variant = 'fadeIn', className, onClick }) => {
  const animation = optimizedAnimations[variant];
  
  return (
    <React.Suspense fallback={<div className={className}>{children}</div>}>
      <LazyMotionDiv
        className={className}
        onClick={onClick}
        initial={animation.initial || {}}
        animate={animation.animate || {}}
        exit={animation.exit || {}}
        transition={animation.transition || {}}
      >
        {children}
      </LazyMotionDiv>
    </React.Suspense>
  );
};

export const OptimizedMotionButton: React.FC<{
  children: React.ReactNode;
  variant?: keyof typeof optimizedAnimations;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}> = ({ children, variant = 'scale', className, onClick, disabled }) => {
  const animation = optimizedAnimations[variant];
  
  return (
    <React.Suspense fallback={
      <button className={className} onClick={onClick} disabled={disabled}>
        {children}
      </button>
    }>
      <LazyMotionButton
        className={className}
        onClick={onClick}
        disabled={disabled}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        initial={animation.initial || {}}
        animate={animation.animate || {}}
        exit={animation.exit || {}}
        transition={animation.transition || {}}
      >
        {children}
      </LazyMotionButton>
    </React.Suspense>
  );
};

// 🎯 PERFORMANCE-OPTIMIZED CHART ANIMATIONS
export const chartAnimations = {
  // Reduced motion for better performance
  line: {
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { duration: 1, ease: [0.4, 0.0, 0.2, 1] }
  },
  
  bar: {
    initial: { scaleY: 0, opacity: 0 },
    animate: { scaleY: 1, opacity: 1 },
    transition: { duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }
  },
  
  pie: {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }
  }
};

// 🚀 EDUCATIONAL SPECIFIC ANIMATIONS
export const educationalAnimations = {
  // Progress bar animation
  progress: {
    initial: { width: '0%' },
    animate: { width: '100%' },
    transition: { duration: 2, ease: [0.4, 0.0, 0.2, 1] }
  },
  
  // Score reveal animation
  scoreReveal: {
    initial: { scale: 0, rotate: -180 },
    animate: { scale: 1, rotate: 0 },
    transition: { duration: 0.8, ease: [0.68, -0.55, 0.265, 1.55] }
  },
  
  // Achievement badge animation
  achievement: {
    initial: { scale: 0, y: 50 },
    animate: { scale: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.68, -0.55, 0.265, 1.55] }
  },
  
  // Notification slide animation
  notification: {
    initial: { x: 300, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 300, opacity: 0 },
    transition: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }
  }
};

// 🎯 ANIMATION PROVIDER FOR REDUCED BUNDLE SIZE
export const OptimizedAnimationProvider: React.FC<{
  children: React.ReactNode;
  reduced?: boolean;
}> = ({ children, reduced = false }) => {
  // Use reduced motion for performance-critical scenarios
  if (reduced) {
    return <div style={{ transform: 'translateZ(0)' }}>{children}</div>;
  }
  
  return (
    <React.Suspense fallback={<div>{children}</div>}>
      {children}
    </React.Suspense>
  );
};

export default {
  OptimizedMotionDiv,
  OptimizedMotionButton,
  optimizedAnimations,
  chartAnimations,
  educationalAnimations,
  OptimizedAnimationProvider
};
import React, { useState, useEffect } from 'react';
import { LucideIcon } from 'lucide-react';

interface SoloAnimatedIconProps {
  icon: LucideIcon;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  animate?: boolean;
  hoverEffect?: boolean;
  className?: string;
  onClick?: () => void;
}

export const SoloAnimatedIcon: React.FC<SoloAnimatedIconProps> = ({
  icon: Icon,
  size = 'medium',
  color,
  animate = true,
  hoverEffect = true,
  className = '',
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-6 w-6',
    large: 'h-8 w-8'
  };

  const triggerAnimation = () => {
    if (animate) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 600);
    }
  };

  useEffect(() => {
    if (animate) {
      const interval = setInterval(triggerAnimation, 3000);
      return () => clearInterval(interval);
    }
  }, [animate]);

  const handleClick = () => {
    triggerAnimation();
    if (onClick) onClick();
  };

  return (
    <div
      className={`
        inline-flex items-center justify-center transition-all duration-300
        ${hoverEffect ? 'hover:scale-110 cursor-pointer' : ''}
        ${isHovered && hoverEffect ? 'transform scale-110' : ''}
        ${isAnimating ? 'animate-pulse' : ''}
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      <Icon 
        className={`
          ${sizeClasses[size]}
          ${color || 'text-current'}
          transition-all duration-300
          ${isAnimating ? 'animate-bounce' : ''}
          ${isHovered && hoverEffect ? 'text-solo-primary' : ''}
        `}
      />
    </div>
  );
};

// Specialized animated icons for common use cases
export const SoloLoadingIcon: React.FC<{ size?: 'small' | 'medium' | 'large' }> = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-6 w-6',
    large: 'h-8 w-8'
  };

  return (
    <div className="inline-flex items-center justify-center">
      <svg 
        className={`animate-spin ${sizeClasses[size]} text-solo-primary`}
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        />
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </div>
  );
};

export const SoloSuccessIcon: React.FC<{ size?: 'small' | 'medium' | 'large' }> = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-6 w-6',
    large: 'h-8 w-8'
  };

  return (
    <div className="inline-flex items-center justify-center">
      <svg 
        className={`${sizeClasses[size]} text-solo-success animate-pulse`}
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M5 13l4 4L19 7" 
        />
      </svg>
    </div>
  );
};

export const SoloPulseIcon: React.FC<{ 
  icon: LucideIcon; 
  size?: 'small' | 'medium' | 'large';
  color?: string;
}> = ({ icon: Icon, size = 'medium', color }) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-6 w-6',
    large: 'h-8 w-8'
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <div className="absolute inset-0 rounded-full bg-current opacity-20 animate-ping"></div>
      <Icon className={`${sizeClasses[size]} ${color || 'text-solo-primary'} relative z-10`} />
    </div>
  );
};
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SoloCardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'bento' | 'gradient' | 'glass';
  padding?: 'none' | 'small' | 'medium' | 'large';
  hover?: boolean;
  icon?: LucideIcon;
  iconColor?: string;
  action?: React.ReactNode;
}

export const SoloCard: React.FC<SoloCardProps> = ({
  title,
  subtitle,
  children,
  className = '',
  variant = 'default',
  padding = 'medium',
  hover = false,
  icon: Icon,
  iconColor,
  action
}) => {
  const paddingClasses = {
    none: '',
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8'
  };

  const variantClasses = {
    default: 'bg-white dark:bg-solo-gray-800 border border-solo-gray-200 dark:border-solo-gray-700',
    bento: 'bg-white dark:bg-solo-gray-800 border border-solo-gray-200 dark:border-solo-gray-700 relative overflow-hidden before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-gradient-solo-2 before:opacity-0 hover:before:opacity-100 before:transition-opacity',
    gradient: 'bg-gradient-solo-2 text-white border-0',
    glass: 'bg-white/70 dark:bg-solo-gray-800/70 backdrop-blur-lg border border-solo-gray-200/50 dark:border-solo-gray-700/50'
  };

  const hoverClasses = hover 
    ? 'transition-all duration-200 hover:shadow-xl hover:scale-[1.02] cursor-pointer' 
    : '';

  return (
    <div 
      className={`
        rounded-2xl shadow-md
        ${variantClasses[variant]}
        ${paddingClasses[padding]}
        ${hoverClasses}
        ${className}
      `}
    >
      {(title || subtitle || Icon || action) && (
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-3">
            {Icon && (
              <div className={`
                w-12 h-12 rounded-xl flex items-center justify-center
                ${variant === 'gradient' 
                  ? 'bg-white/20' 
                  : iconColor || 'bg-solo-primary-light'
                }
              `}>
                <Icon className={`
                  h-6 w-6
                  ${variant === 'gradient' 
                    ? 'text-white' 
                    : iconColor ? '' : 'text-solo-primary'
                  }
                `} />
              </div>
            )}
            <div>
              {title && (
                <h3 className={`
                  text-lg font-semibold font-jakarta
                  ${variant === 'gradient' 
                    ? 'text-white' 
                    : 'text-solo-dark dark:text-white'
                  }
                `}>
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className={`
                  text-sm mt-0.5
                  ${variant === 'gradient' 
                    ? 'text-white/80' 
                    : 'text-solo-gray-500 dark:text-solo-gray-400'
                  }
                `}>
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {action && (
            <div>{action}</div>
          )}
        </div>
      )}
      {children}
    </div>
  );
};

// Stat Card Component
interface SoloStatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  icon: LucideIcon;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
}

export const SoloStatCard: React.FC<SoloStatCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  color = 'primary'
}) => {
  const colorClasses = {
    primary: 'bg-solo-primary-light text-solo-primary',
    secondary: 'bg-solo-secondary-light text-solo-secondary',
    success: 'bg-solo-success-light text-solo-success',
    warning: 'bg-solo-warning-light text-solo-warning',
    error: 'bg-solo-error-light text-solo-error',
    info: 'bg-solo-info-light text-solo-info'
  };

  return (
    <SoloCard hover className="group">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-solo-gray-500 dark:text-solo-gray-400 font-medium">
            {title}
          </p>
          <h3 className="text-2xl font-bold text-solo-dark dark:text-white mt-1 font-jakarta">
            {value}
          </h3>
          {change && (
            <p className={`
              text-sm mt-2 font-medium
              ${change.type === 'increase' ? 'text-solo-success' : 'text-solo-error'}
            `}>
              {change.type === 'increase' ? '↑' : '↓'} {Math.abs(change.value)}%
            </p>
          )}
        </div>
        <div className={`
          w-16 h-16 rounded-2xl flex items-center justify-center
          ${colorClasses[color]}
          group-hover:scale-110 transition-transform
        `}>
          <Icon className="h-8 w-8" />
        </div>
      </div>
    </SoloCard>
  );
};
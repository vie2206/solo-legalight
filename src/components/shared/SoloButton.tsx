import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SoloButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'ghost' | 'gradient';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  loading?: boolean;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  children: React.ReactNode;
}

export const SoloButton: React.FC<SoloButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  loading = false,
  icon: Icon,
  iconPosition = 'left',
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = `
    inline-flex items-center justify-center gap-2 font-medium font-jakarta
    rounded-xl transition-all duration-200 
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-5 py-2.5 text-sm',
    large: 'px-6 py-3 text-base'
  };

  const variantClasses = {
    primary: `
      bg-solo-primary text-white hover:bg-solo-primary-dark
      focus:ring-solo-primary shadow-lg hover:shadow-xl
      hover:transform hover:-translate-y-0.5
    `,
    secondary: `
      bg-solo-secondary text-white hover:bg-solo-secondary-dark
      focus:ring-solo-secondary shadow-lg hover:shadow-xl
      hover:transform hover:-translate-y-0.5
    `,
    success: `
      bg-solo-success text-white hover:bg-solo-success-dark
      focus:ring-solo-success shadow-lg hover:shadow-xl
      hover:transform hover:-translate-y-0.5
    `,
    warning: `
      bg-solo-warning text-white hover:bg-solo-warning-dark
      focus:ring-solo-warning shadow-lg hover:shadow-xl
      hover:transform hover:-translate-y-0.5
    `,
    error: `
      bg-solo-error text-white hover:bg-solo-error-dark
      focus:ring-solo-error shadow-lg hover:shadow-xl
      hover:transform hover:-translate-y-0.5
    `,
    ghost: `
      bg-transparent text-solo-gray-700 dark:text-solo-gray-300
      hover:bg-solo-gray-100 dark:hover:bg-solo-gray-800
      focus:ring-solo-gray-500
    `,
    gradient: `
      bg-gradient-solo-2 text-white shadow-lg hover:shadow-xl
      hover:transform hover:-translate-y-0.5
      focus:ring-solo-primary
    `
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${widthClass}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <svg 
            className="animate-spin h-4 w-4" 
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
          <span>Loading...</span>
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="h-4 w-4" />}
          {children}
          {Icon && iconPosition === 'right' && <Icon className="h-4 w-4" />}
        </>
      )}
    </button>
  );
};

// Icon Button Component
interface SoloIconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  tooltip?: string;
}

export const SoloIconButton: React.FC<SoloIconButtonProps> = ({
  icon: Icon,
  variant = 'ghost',
  size = 'medium',
  tooltip,
  className = '',
  ...props
}) => {
  const baseClasses = `
    inline-flex items-center justify-center rounded-xl
    transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const sizeClasses = {
    small: 'h-8 w-8',
    medium: 'h-10 w-10',
    large: 'h-12 w-12'
  };

  const variantClasses = {
    primary: `
      bg-solo-primary text-white hover:bg-solo-primary-dark
      focus:ring-solo-primary shadow-md hover:shadow-lg
    `,
    secondary: `
      bg-solo-secondary text-white hover:bg-solo-secondary-dark
      focus:ring-solo-secondary shadow-md hover:shadow-lg
    `,
    ghost: `
      bg-transparent text-solo-gray-700 dark:text-solo-gray-300
      hover:bg-solo-gray-100 dark:hover:bg-solo-gray-800
      focus:ring-solo-gray-500
    `
  };

  const iconSizes = {
    small: 'h-4 w-4',
    medium: 'h-5 w-5',
    large: 'h-6 w-6'
  };

  return (
    <button
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
      title={tooltip}
      {...props}
    >
      <Icon className={iconSizes[size]} />
    </button>
  );
};
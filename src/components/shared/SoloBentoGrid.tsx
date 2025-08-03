import React from 'react';
import { LucideIcon } from 'lucide-react';

interface BentoGridItem {
  id: string;
  title: string;
  description?: string;
  icon?: LucideIcon;
  size: 'small' | 'medium' | 'large' | 'wide' | 'tall';
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  children?: React.ReactNode;
  onClick?: () => void;
}

interface SoloBentoGridProps {
  items: BentoGridItem[];
  className?: string;
}

export const SoloBentoGrid: React.FC<SoloBentoGridProps> = ({ items, className = '' }) => {
  const getSizeClasses = (size: string) => {
    const sizeMap = {
      small: 'col-span-1 row-span-1',
      medium: 'col-span-2 row-span-1',
      large: 'col-span-2 row-span-2',
      wide: 'col-span-3 row-span-1',
      tall: 'col-span-1 row-span-2'
    };
    return sizeMap[size as keyof typeof sizeMap] || sizeMap.small;
  };

  const getColorClasses = (color?: string) => {
    const colorMap = {
      primary: 'bg-gradient-to-br from-solo-primary to-solo-primary-dark text-white',
      secondary: 'bg-gradient-to-br from-solo-secondary to-solo-secondary-dark text-white',
      success: 'bg-gradient-to-br from-solo-success to-solo-success-dark text-white',
      warning: 'bg-gradient-to-br from-solo-warning to-solo-warning-dark text-white',
      error: 'bg-gradient-to-br from-solo-error to-solo-error-dark text-white',
      info: 'bg-gradient-to-br from-solo-info to-solo-info-dark text-white'
    };
    return color ? colorMap[color as keyof typeof colorMap] : 'bg-white dark:bg-solo-gray-800';
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr ${className}`}>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            className={`
              ${getSizeClasses(item.size)}
              ${getColorClasses(item.color)}
              rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300
              ${item.onClick ? 'cursor-pointer hover:scale-[1.02]' : ''}
              border border-solo-gray-200 dark:border-solo-gray-700
              group relative overflow-hidden
            `}
            onClick={item.onClick}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white rounded-full -translate-y-12 translate-x-12"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-white rounded-full translate-y-8 -translate-x-8"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className={`text-lg font-bold font-jakarta mb-1 ${
                    item.color ? 'text-white' : 'text-solo-dark dark:text-white'
                  }`}>
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className={`text-sm ${
                      item.color ? 'text-white/80' : 'text-solo-gray-600 dark:text-solo-gray-400'
                    }`}>
                      {item.description}
                    </p>
                  )}
                </div>
                {Icon && (
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    item.color ? 'bg-white/20' : 'bg-solo-primary-light'
                  }`}>
                    <Icon className={`h-6 w-6 ${
                      item.color ? 'text-white' : 'text-solo-primary'
                    }`} />
                  </div>
                )}
              </div>

              {/* Custom Content */}
              {item.children && (
                <div className="flex-1">
                  {item.children}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Pre-built Bento Components
interface SoloBentoMetricProps {
  title: string;
  value: string | number;
  change?: { value: number; type: 'increase' | 'decrease' };
  icon: LucideIcon;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
}

export const SoloBentoMetric: React.FC<SoloBentoMetricProps> = ({
  title, value, change, icon: Icon, color = 'primary'
}) => {
  return (
    <div className="h-full flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium opacity-90">{title}</span>
        <Icon className="h-5 w-5 opacity-75" />
      </div>
      <div>
        <div className="text-3xl font-bold font-jakarta mb-1">{value}</div>
        {change && (
          <div className={`text-sm flex items-center gap-1 ${
            change.type === 'increase' ? 'text-green-300' : 'text-red-300'
          }`}>
            <span>{change.type === 'increase' ? '↗' : '↘'}</span>
            <span>{Math.abs(change.value)}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

interface SoloBentoChartProps {
  title: string;
  data: { label: string; value: number }[];
  type?: 'bar' | 'line' | 'pie';
}

export const SoloBentoChart: React.FC<SoloBentoChartProps> = ({
  title, data, type = 'bar'
}) => {
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="h-full flex flex-col">
      <h4 className="font-semibold mb-4">{title}</h4>
      <div className="flex-1 flex items-end justify-between gap-2">
        {data.slice(0, 6).map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div 
              className="w-full bg-white/30 rounded-t-lg transition-all duration-300 hover:bg-white/40"
              style={{ height: `${(item.value / maxValue) * 100}px` }}
            ></div>
            <span className="text-xs mt-2 opacity-75 text-center">
              {item.label.slice(0, 3)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
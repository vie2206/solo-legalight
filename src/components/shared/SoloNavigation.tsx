import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface NavigationTab {
  id: string;
  label: string;
  icon: LucideIcon;
  color?: string;
  badge?: number | string;
}

interface SoloNavigationProps {
  tabs: NavigationTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  variant?: 'horizontal' | 'sidebar';
}

export const SoloNavigation: React.FC<SoloNavigationProps> = ({
  tabs,
  activeTab,
  onTabChange,
  variant = 'horizontal'
}) => {
  if (variant === 'sidebar') {
    return (
      <aside className="w-64 bg-white dark:bg-solo-dark border-r border-solo-gray-200 dark:border-solo-gray-700 min-h-screen">
        <nav className="p-4 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all
                  ${isActive 
                    ? 'bg-gradient-solo-2 text-white shadow-lg transform scale-[1.02]' 
                    : 'text-solo-gray-600 dark:text-solo-gray-400 hover:bg-solo-gray-100 dark:hover:bg-solo-gray-800 hover:text-solo-primary'
                  }
                `}
              >
                <Icon className={`h-5 w-5 ${isActive ? 'text-white' : ''}`} />
                <span className="flex-1 text-left">{tab.label}</span>
                {tab.badge && (
                  <span className={`
                    px-2 py-0.5 text-xs rounded-full font-semibold
                    ${isActive 
                      ? 'bg-white/20 text-white' 
                      : 'bg-solo-primary-light text-solo-primary'
                    }
                  `}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </aside>
    );
  }

  // Horizontal variant
  return (
    <div className="border-b border-solo-gray-200 dark:border-solo-gray-700 bg-white dark:bg-solo-dark sticky top-[73px] z-40">
      <div className="px-6">
        <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  flex items-center gap-2 px-4 py-4 border-b-2 font-medium text-sm transition-all whitespace-nowrap
                  ${isActive 
                    ? 'border-solo-primary text-solo-primary' 
                    : 'border-transparent text-solo-gray-600 dark:text-solo-gray-400 hover:text-solo-primary hover:border-solo-gray-300'
                  }
                `}
              >
                <Icon className={`h-4 w-4 ${tab.color || ''}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="ml-2 px-2 py-0.5 text-xs bg-solo-primary-light text-solo-primary rounded-full font-semibold">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
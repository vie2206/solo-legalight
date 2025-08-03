import React from 'react';
import { Bars3Icon, BellIcon } from '@heroicons/react/24/outline';
import { User } from '../../types';
import { cn } from '../../utils';

interface HeaderProps {
  user: User | null;
  currentView: string;
  sidebarCollapsed: boolean;
  onMobileMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({
  user,
  currentView,
  sidebarCollapsed,
  onMobileMenuToggle
}) => {
  const getViewTitle = (view: string) => {
    const titles: { [key: string]: string } = {
      dashboard: 'Dashboard',
      schedule: 'Study Schedule',
      tests: 'Mock Tests',
      practice: 'Practice Sessions',
      analytics: 'Analytics & Reports',
      goals: 'Goals & Achievements',
      social: 'Social Learning',
      'ai-planner': 'AI Study Planner',
      'study-reminders': 'AI Study Reminders',
      countdown: 'CLAT 2026 Countdown',
      'test-analysis': 'Test Analysis',
      insights: 'Performance Insights',
      vocabulary: 'Vocabulary Builder',
      settings: 'Settings'
    };
    return titles[view] || 'Level Up';
  };

  return (
    <div 
      className={cn(
        "bg-white shadow-sm border-b transition-all duration-300",
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      )}
    >
      <div className="px-4 lg:px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Mobile menu button - hidden on desktop */}
          <button
            onClick={onMobileMenuToggle}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Bars3Icon className="w-6 h-6 text-gray-600" />
          </button>

          {/* Page title and user info */}
          <div className="flex-1 lg:flex lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {getViewTitle(currentView)}
              </h2>
              <p className="text-sm mt-1 text-gray-600">
                Welcome back, {user?.name || 'Student'}!
              </p>
            </div>

            {/* Desktop user info and actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                <BellIcon className="w-5 h-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.subscription_tier || 'Free'} Plan</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {user?.name?.charAt(0) || 'S'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile user avatar */}
          <div className="lg:hidden">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-semibold text-sm">
                {user?.name?.charAt(0) || 'S'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
import React from 'react';
import { 
  HomeIcon, CalendarIcon, ChartBarIcon, BookOpenIcon, 
  Cog6ToothIcon, BellIcon, ArrowRightOnRectangleIcon, 
  Bars3Icon, FireIcon, AcademicCapIcon, LightBulbIcon,
  DocumentTextIcon, PresentationChartBarIcon, SparklesIcon,
  TrophyIcon, UsersIcon, ChatBubbleLeftRightIcon, GiftIcon
} from '@heroicons/react/24/outline';
import { User } from '../../types';
import { NAVIGATION_ITEMS } from '../../constants';
import { cn } from '../../utils';

interface NavigationProps {
  user: User | null;
  currentView: string;
  sidebarCollapsed: boolean;
  mobileMenuOpen: boolean;
  onViewChange: (view: string) => void;
  onSidebarToggle: () => void;
  onMobileMenuToggle: () => void;
  onLogout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({
  user,
  currentView,
  sidebarCollapsed,
  mobileMenuOpen,
  onViewChange,
  onSidebarToggle,
  onMobileMenuToggle,
  onLogout
}) => {
  const getIcon = (id: string) => {
    const icons: { [key: string]: React.ComponentType<any> } = {
      dashboard: HomeIcon,
      schedule: CalendarIcon,
      tests: DocumentTextIcon,
      practice: BookOpenIcon,
      analytics: ChartBarIcon,
      goals: TrophyIcon,
      social: UsersIcon,
      'ai-planner': LightBulbIcon,
      'study-reminders': BellIcon,
      countdown: FireIcon,
      'test-analysis': PresentationChartBarIcon,
      insights: SparklesIcon,
      vocabulary: AcademicCapIcon,
      settings: Cog6ToothIcon
    };
    return icons[id] || HomeIcon;
  };

  const navigationItems = NAVIGATION_ITEMS.map(item => ({
    ...item,
    icon: getIcon(item.id)
  }));

  return (
    <>
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden">
          <div className="fixed left-0 top-0 bottom-0 w-64 bg-white shadow-xl">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-xl text-gray-900">Menu</h2>
                <button
                  onClick={onMobileMenuToggle}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  ×
                </button>
              </div>
            </div>
            <nav className="p-4 space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onViewChange(item.id);
                    onMobileMenuToggle();
                  }}
                  className={cn(
                    "w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-left",
                    currentView === item.id 
                      ? 'bg-blue-600 text-white' 
                      : 'hover:bg-gray-100 text-gray-600'
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
              <div className="border-t pt-4 mt-4">
                <button
                  onClick={onLogout}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors text-left"
                >
                  <ArrowRightOnRectangleIcon className="w-5 h-5" />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div 
        className={cn(
          "fixed left-0 top-0 bottom-0 bg-white shadow-xl border-r transition-all duration-300 z-30 hidden lg:block",
          sidebarCollapsed ? 'w-16' : 'w-64'
        )}
      >
        {/* Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div>
                <h1 className="font-bold text-2xl text-gray-900">Level Up</h1>
                <p className="text-sm text-gray-600">CLAT 2026 Prep</p>
              </div>
            )}
            <button
              onClick={onSidebarToggle}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Bars3Icon className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* User Profile */}
        {!sidebarCollapsed && (
          <div className="p-4 border-b">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {user?.name?.charAt(0) || 'S'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{user?.name}</p>
                <p className="text-sm text-gray-500 truncate">{user?.subscription_tier || 'Free'} Plan</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={cn(
                "w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-left",
                currentView === item.id 
                  ? 'text-white' 
                  : 'hover:bg-gray-100 text-gray-600'
              )}
              style={currentView === item.id ? { backgroundColor: '#363535' } : {}}
            >
              <item.icon className="w-5 h-5" />
              {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t">
          <button
            onClick={onLogout}
            className={cn(
              "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors text-left",
              sidebarCollapsed ? 'justify-center' : ''
            )}
          >
            <ArrowRightOnRectangleIcon className="w-5 h-5" />
            {!sidebarCollapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="lg:hidden bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={onMobileMenuToggle}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Bars3Icon className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="font-bold text-xl text-gray-900">Level Up</h1>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {user?.name?.charAt(0) || 'S'}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navigation;
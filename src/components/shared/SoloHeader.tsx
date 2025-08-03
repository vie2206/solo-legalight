import React from 'react';
import { User, LogOut, Bell, Search, Menu } from 'lucide-react';
import { User as UserType } from '../../types';

interface SoloHeaderProps {
  user: UserType;
  onLogout: () => void;
  onMenuClick?: () => void;
  showMenu?: boolean;
}

export const SoloHeader: React.FC<SoloHeaderProps> = ({ 
  user, 
  onLogout, 
  onMenuClick,
  showMenu = true 
}) => {
  const getRoleDisplayName = (role: string) => {
    const roleMap: { [key: string]: string } = {
      admin: 'Administrator',
      educator: 'Educator',
      parent: 'Parent',
      student: 'Student',
      operation_manager: 'Operations Manager'
    };
    return roleMap[role] || role;
  };

  const getRoleColor = (role: string) => {
    const colorMap: { [key: string]: string } = {
      admin: 'bg-solo-error-light text-solo-error',
      educator: 'bg-solo-success-light text-solo-success',
      parent: 'bg-solo-secondary-light text-solo-secondary',
      student: 'bg-solo-primary-light text-solo-primary',
      operation_manager: 'bg-solo-warning-light text-solo-warning'
    };
    return colorMap[role] || 'bg-solo-gray-100 text-solo-gray-600';
  };

  return (
    <header className="bg-white dark:bg-solo-dark border-b border-solo-gray-200 dark:border-solo-gray-700 sticky top-0 z-50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Side */}
          <div className="flex items-center gap-4">
            {showMenu && (
              <button
                onClick={onMenuClick}
                className="lg:hidden p-2 rounded-lg hover:bg-solo-gray-100 dark:hover:bg-solo-gray-800 transition-colors"
              >
                <Menu className="h-5 w-5 text-solo-gray-600 dark:text-solo-gray-400" />
              </button>
            )}
            
            {/* Logo and Brand */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-solo-2 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-solo-dark dark:text-white font-jakarta">
                  SOLO <span className="text-solo-primary">by Legalight</span>
                </h1>
                <p className="text-xs text-solo-gray-500 dark:text-solo-gray-400 font-medium">
                  we can do hard things
                </p>
              </div>
            </div>
          </div>

          {/* Center - Search (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-solo-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 bg-solo-gray-50 dark:bg-solo-gray-800 border border-solo-gray-200 dark:border-solo-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-solo-primary focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-solo-gray-100 dark:hover:bg-solo-gray-800 transition-colors">
              <Bell className="h-5 w-5 text-solo-gray-600 dark:text-solo-gray-400" />
              <span className="absolute top-1 right-1 h-2 w-2 bg-solo-error rounded-full"></span>
            </button>

            {/* User Info */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-solo-dark dark:text-white">
                  {user.name}
                </p>
                <p className="text-xs text-solo-gray-500 dark:text-solo-gray-400">
                  {user.email}
                </p>
              </div>
              
              {/* User Avatar and Role */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-solo-3 flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                </div>
                <span className={`hidden sm:inline-flex px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                  {getRoleDisplayName(user.role)}
                </span>
              </div>

              {/* Logout Button */}
              <button
                onClick={onLogout}
                className="p-2 rounded-lg hover:bg-solo-gray-100 dark:hover:bg-solo-gray-800 transition-colors group"
                title="Logout"
              >
                <LogOut className="h-5 w-5 text-solo-gray-600 dark:text-solo-gray-400 group-hover:text-solo-error transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
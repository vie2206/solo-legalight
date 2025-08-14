import React, { useState, useEffect, useContext, createContext, useCallback } from 'react';
import { User } from '../../types';

// 🔔 REVOLUTIONARY NOTIFICATION SYSTEM
// Smart, contextual alerts for educational excellence

interface Notification {
  id: string;
  type: 'achievement' | 'reminder' | 'progress' | 'social' | 'system' | 'urgent';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: 'study' | 'test' | 'rank' | 'streak' | 'goal' | 'social' | 'system';
  actionRequired?: boolean;
  actionUrl?: string;
  actionText?: string;
  expiresAt?: Date;
  userId: string;
  metadata?: {
    score?: number;
    rank?: number;
    streak?: number;
    subject?: string;
    progress?: number;
    testId?: string;
    achievement?: string;
  };
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAll: () => void;
  getNotificationsByCategory: (category: string) => Notification[];
  isPermissionGranted: boolean;
  requestPermission: () => Promise<boolean>;
}

// Notification Context
const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  unreadCount: 0,
  addNotification: () => {},
  markAsRead: () => {},
  markAllAsRead: () => {},
  deleteNotification: () => {},
  clearAll: () => {},
  getNotificationsByCategory: () => [],
  isPermissionGranted: false,
  requestPermission: async () => false
});

// 🚀 Notification Provider Component
interface NotificationProviderProps {
  children: React.ReactNode;
  user: User;
  enablePushNotifications?: boolean;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({
  children,
  user,
  enablePushNotifications = true
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isPermissionGranted, setIsPermissionGranted] = useState(false);

  // Check notification permission on mount
  useEffect(() => {
    if ('Notification' in window) {
      setIsPermissionGranted(Notification.permission === 'granted');
    }
  }, []);

  // Request notification permission
  const requestPermission = useCallback(async (): Promise<boolean> => {
    if (!('Notification' in window)) {
      console.warn('This browser does not support notifications');
      return false;
    }

    if (Notification.permission === 'granted') {
      setIsPermissionGranted(true);
      return true;
    }

    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      const granted = permission === 'granted';
      setIsPermissionGranted(granted);
      return granted;
    }

    return false;
  }, []);

  // Add notification
  const addNotification = useCallback((notificationData: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const notification: Notification = {
      ...notificationData,
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date(),
      read: false
    };

    setNotifications(prev => [notification, ...prev]);

    // Show browser notification if permission granted
    if (isPermissionGranted && enablePushNotifications) {
      showBrowserNotification(notification);
    }

    // Auto-remove low priority notifications after 10 seconds
    if (notification.priority === 'low') {
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== notification.id));
      }, 10000);
    }

    return notification.id;
  }, [isPermissionGranted, enablePushNotifications]);

  // Show browser notification
  const showBrowserNotification = (notification: Notification) => {
    if (!isPermissionGranted) return;

    const browserNotif = new Notification(notification.title, {
      body: notification.message,
      icon: getNotificationIcon(notification.type),
      badge: '/icons/badge.png',
      tag: notification.category,
      requireInteraction: notification.priority === 'critical',
      silent: notification.priority === 'low'
    });

    browserNotif.onclick = () => {
      window.focus();
      if (notification.actionUrl) {
        window.location.href = notification.actionUrl;
      }
      browserNotif.close();
    };

    // Auto-close after 5 seconds for non-critical notifications
    if (notification.priority !== 'critical') {
      setTimeout(() => browserNotif.close(), 5000);
    }
  };

  // Get notification icon based on type
  const getNotificationIcon = (type: Notification['type']): string => {
    const icons = {
      achievement: '🏆',
      reminder: '⏰',
      progress: '📈',
      social: '👥',
      system: '⚙️',
      urgent: '🚨'
    };
    return icons[type] || '🔔';
  };

  // Mark notification as read
  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  }, []);

  // Mark all as read
  const markAllAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  }, []);

  // Delete notification
  const deleteNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  }, []);

  // Clear all notifications
  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  // Get notifications by category
  const getNotificationsByCategory = useCallback((category: string) => {
    return notifications.filter(notif => notif.category === category);
  }, [notifications]);

  // Calculate unread count
  const unreadCount = notifications.filter(n => !n.read).length;

  // Simulate educational notifications for demo
  useEffect(() => {
    const simulateNotifications = () => {
      const educationalNotifications = [
        {
          type: 'achievement' as const,
          title: '🎉 Study Streak Milestone!',
          message: 'You\'ve maintained a 7-day study streak! Keep going!',
          priority: 'medium' as const,
          category: 'streak' as const,
          userId: user.id,
          metadata: { streak: 7 }
        },
        {
          type: 'progress' as const,
          title: '📚 Chapter Complete',
          message: 'You finished "Constitutional Law Basics" with 89% accuracy!',
          priority: 'medium' as const,
          category: 'study' as const,
          userId: user.id,
          metadata: { score: 89, subject: 'Constitutional Law' }
        },
        {
          type: 'reminder' as const,
          title: '⏰ Mock Test Reminder',
          message: 'Your scheduled CLAT Mock Test starts in 30 minutes',
          priority: 'high' as const,
          category: 'test' as const,
          actionRequired: true,
          actionText: 'Start Test',
          actionUrl: '/mock-test',
          userId: user.id
        }
      ];

      // Add notifications with delays
      educationalNotifications.forEach((notif, index) => {
        setTimeout(() => {
          addNotification(notif);
        }, index * 3000);
      });
    };

    // Start simulation after 2 seconds
    const timer = setTimeout(simulateNotifications, 2000);
    return () => clearTimeout(timer);
  }, [user.id, addNotification]);

  const contextValue: NotificationContextType = {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
    getNotificationsByCategory,
    isPermissionGranted,
    requestPermission
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

// 🎯 Hook for using notifications
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

// 🔔 Notification Bell Component
export const NotificationBell: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { notifications, unreadCount, markAllAsRead } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`notification-bell ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
          />
        </svg>
        
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="notification-dropdown">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Mark all as read
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
                  />
                </svg>
                No notifications yet
              </div>
            ) : (
              notifications.map(notification => (
                <NotificationItem key={notification.id} notification={notification} />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// 📱 Individual Notification Item
const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => {
  const { markAsRead, deleteNotification } = useNotifications();

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'critical': return 'border-l-red-500 bg-red-50';
      case 'high': return 'border-l-orange-500 bg-orange-50';
      case 'medium': return 'border-l-blue-500 bg-blue-50';
      default: return 'border-l-gray-300 bg-gray-50';
    }
  };

  const getTypeIcon = (type: Notification['type']) => {
    const icons = {
      achievement: '🏆',
      reminder: '⏰',
      progress: '📈',
      social: '👥',
      system: '⚙️',
      urgent: '🚨'
    };
    return icons[type];
  };

  const handleClick = () => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    if (notification.actionUrl) {
      window.location.href = notification.actionUrl;
    }
  };

  return (
    <div
      className={`notification-item ${getPriorityColor(notification.priority)} ${
        !notification.read ? 'font-semibold' : 'opacity-75'
      }`}
      onClick={handleClick}
    >
      <div className="flex items-start gap-3 p-4">
        <div className="text-2xl">{getTypeIcon(notification.type)}</div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold text-gray-900 truncate">
              {notification.title}
            </h4>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteNotification(notification.id);
              }}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
          
          <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
          
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-gray-500">
              {new Date(notification.timestamp).toLocaleString()}
            </span>
            
            {notification.actionRequired && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Action Required
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// 📊 Notification Analytics Component
export const NotificationAnalytics: React.FC = () => {
  const { notifications, getNotificationsByCategory } = useNotifications();

  const categoryStats = {
    study: getNotificationsByCategory('study').length,
    test: getNotificationsByCategory('test').length,
    streak: getNotificationsByCategory('streak').length,
    rank: getNotificationsByCategory('rank').length,
    goal: getNotificationsByCategory('goal').length,
    social: getNotificationsByCategory('social').length,
    system: getNotificationsByCategory('system').length
  };

  const totalNotifications = notifications.length;
  const readNotifications = notifications.filter(n => n.read).length;
  const readRate = totalNotifications > 0 ? (readNotifications / totalNotifications * 100) : 0;

  return (
    <div className="notification-analytics">
      <h3 className="text-lg font-semibold mb-4">📊 Notification Analytics</h3>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="analytics-card">
          <div className="text-2xl font-bold text-blue-600">{totalNotifications}</div>
          <div className="text-sm text-gray-600">Total Notifications</div>
        </div>
        
        <div className="analytics-card">
          <div className="text-2xl font-bold text-green-600">{readRate.toFixed(1)}%</div>
          <div className="text-sm text-gray-600">Read Rate</div>
        </div>
        
        <div className="analytics-card">
          <div className="text-2xl font-bold text-purple-600">{categoryStats.study}</div>
          <div className="text-sm text-gray-600">Study Alerts</div>
        </div>
        
        <div className="analytics-card">
          <div className="text-2xl font-bold text-orange-600">{categoryStats.test}</div>
          <div className="text-sm text-gray-600">Test Reminders</div>
        </div>
      </div>

      <div className="category-breakdown">
        <h4 className="font-semibold mb-3">Category Breakdown</h4>
        {Object.entries(categoryStats).map(([category, count]) => (
          <div key={category} className="flex items-center justify-between py-2">
            <span className="capitalize">{category}</span>
            <span className="bg-gray-100 px-2 py-1 rounded text-sm">{count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default {
  NotificationProvider,
  useNotifications,
  NotificationBell,
  NotificationAnalytics
};
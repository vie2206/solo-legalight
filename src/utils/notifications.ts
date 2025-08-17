// Notification utility for consistent user feedback across the app

export type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface NotificationOptions {
  title: string;
  message?: string;
  duration?: number;
  type?: NotificationType;
}

const notificationConfig = {
  success: {
    bg: 'bg-green-500',
    icon: '✅',
    defaultDuration: 3000
  },
  error: {
    bg: 'bg-red-500',
    icon: '❌',
    defaultDuration: 5000
  },
  warning: {
    bg: 'bg-yellow-500',
    icon: '⚠️',
    defaultDuration: 4000
  },
  info: {
    bg: 'bg-blue-500',
    icon: 'ℹ️',
    defaultDuration: 3000
  }
};

export const showNotification = ({
  title,
  message,
  duration,
  type = 'info'
}: NotificationOptions) => {
  const config = notificationConfig[type];
  const finalDuration = duration ?? config.defaultDuration;

  const notification = document.createElement('div');
  notification.className = `responsive-notification ${config.bg} text-white p-4 transform transition-all duration-300 ease-in-out translate-x-full`;
  
  notification.innerHTML = `
    <div class="flex items-start">
      <div class="mr-2 mt-0.5">${config.icon}</div>
      <div class="flex-1">
        <div class="font-semibold">${title}</div>
        ${message ? `<div class="text-sm opacity-90">${message}</div>` : ''}
      </div>
      <button class="ml-2 text-white hover:text-gray-200 text-lg leading-none" onclick="this.parentElement.parentElement.remove()">
        ×
      </button>
    </div>
  `;
  
  document.body.appendChild(notification);
  
  // Trigger animation
  setTimeout(() => {
    notification.classList.remove('translate-x-full');
  }, 10);
  
  // Auto-remove after duration
  setTimeout(() => {
    if (document.body.contains(notification)) {
      notification.classList.add('translate-x-full');
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification);
        }
      }, 300);
    }
  }, finalDuration);
  
  return notification;
};

// Convenience methods
export const showSuccess = (title: string, message?: string, duration?: number) => 
  showNotification({ title, message, duration, type: 'success' });

export const showError = (title: string, message?: string, duration?: number) => 
  showNotification({ title, message, duration, type: 'error' });

export const showWarning = (title: string, message?: string, duration?: number) => 
  showNotification({ title, message, duration, type: 'warning' });

export const showInfo = (title: string, message?: string, duration?: number) => 
  showNotification({ title, message, duration, type: 'info' });
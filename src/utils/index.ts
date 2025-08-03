// Utility functions for the application

// Date formatting utilities
export const formatDate = (date: Date | string, options?: Intl.DateTimeFormatOptions): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-IN', options || {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatDateTime = (date: Date | string): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric', 
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

// Countdown calculation utility
export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const calculateCountdown = (targetDate: Date, currentTime?: Date): CountdownTime => {
  const now = currentTime ? currentTime.getTime() : new Date().getTime();
  const target = targetDate.getTime();
  const difference = target - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
};

// Score and percentage calculations
export const calculatePercentage = (correct: number, total: number): number => {
  return total > 0 ? Math.round((correct / total) * 100) : 0;
};

export const getScoreGrade = (percentage: number): { grade: string; color: string; message: string } => {
  if (percentage >= 90) return { grade: 'A+', color: 'text-green-800 bg-green-100', message: 'Excellent!' };
  if (percentage >= 80) return { grade: 'A', color: 'text-green-700 bg-green-50', message: 'Great Job!' };
  if (percentage >= 70) return { grade: 'B+', color: 'text-blue-700 bg-blue-50', message: 'Good Work!' };
  if (percentage >= 60) return { grade: 'B', color: 'text-yellow-700 bg-yellow-50', message: 'Keep Going!' };
  return { grade: 'C', color: 'text-red-700 bg-red-50', message: 'Need Improvement' };
};

// Priority and urgency utilities
export const getUrgencyLevel = (days: number): 'critical' | 'high' | 'medium' | 'low' => {
  if (days <= 7) return 'critical';
  if (days <= 30) return 'high';
  if (days <= 90) return 'medium';
  return 'low';
};

export const getUrgencyColor = (level: string): string => {
  switch (level) {
    case 'critical': return 'from-red-600 to-red-700';
    case 'high': return 'from-orange-500 to-red-600';
    case 'medium': return 'from-yellow-500 to-orange-500';
    case 'low': return 'from-green-500 to-blue-500';
    default: return 'from-blue-500 to-purple-600';
  }
};

export const getPriorityColor = (priority: 'high' | 'medium' | 'low'): string => {
  switch (priority) {
    case 'high': return 'border-red-200 bg-red-50 text-red-800';
    case 'medium': return 'border-yellow-200 bg-yellow-50 text-yellow-800';
    case 'low': return 'border-green-200 bg-green-50 text-green-800';
    default: return 'border-gray-200 bg-gray-50 text-gray-800';
  }
};

// Difficulty level utilities
export const getDifficultyColor = (difficulty: string): string => {
  switch (difficulty) {
    case 'beginner': return 'text-green-600 bg-green-100';
    case 'intermediate': return 'text-yellow-600 bg-yellow-100';
    case 'advanced': return 'text-red-600 bg-red-100';
    default: return 'text-gray-600 bg-gray-100';
  }
};

// Progress utilities
export const getProgressColor = (progress: number): string => {
  if (progress >= 80) return 'bg-green-500';
  if (progress >= 60) return 'bg-yellow-500';
  return 'bg-red-500';
};

// Array utilities
export const shuffleArray = <T>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

export const chunk = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

// Local storage utilities
export const getFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

export const setToStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

// Debounce utility
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// Performance monitoring
export const measurePerformance = <T>(name: string, fn: () => T): T => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  console.log(`${name} took ${end - start} milliseconds`);
  return result;
};

// Class name utility (similar to clsx)
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};
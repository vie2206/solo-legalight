// Application constants

// CLAT exam constants
export const CLAT_2026_DATE = new Date('December 07, 2025 14:00:00 GMT+0530');
export const CLAT_2026_END_TIME = new Date('December 07, 2025 16:00:00 GMT+0530');

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    DEMO_LOGIN: '/api/auth/demo-login',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh'
  },
  FLASHCARDS: {
    COLLECTIONS: '/api/flashcards/collections',
    DECKS: '/api/flashcards/decks',
    CARDS: '/api/flashcards/cards',
    STUDY: '/api/flashcards/study',
    ANALYTICS: '/api/flashcards/analytics',
    ADDONS: '/api/flashcards/addons'
  },
  QUIZ: {
    SUBMIT: '/api/quiz/submit',
    RESULTS: '/api/quiz/results'
  }
};

// Quiz categories
export const QUIZ_CATEGORIES = [
  'Constitutional Law',
  'Legal Reasoning',
  'Logical Reasoning',
  'Current Affairs',
  'Economics',
  'Environment',
  'History',
  'General Knowledge',
  'Polity',
  'Legal Awareness'
] as const;

// Difficulty levels
export const DIFFICULTY_LEVELS = ['beginner', 'intermediate', 'advanced'] as const;

// Study session constants
export const STUDY_SESSION = {
  DEFAULT_DURATION: 25, // minutes (Pomodoro)
  BREAK_DURATION: 5, // minutes
  LONG_BREAK_DURATION: 15, // minutes
  SESSIONS_BEFORE_LONG_BREAK: 4
};

// Card types for flashcards
export const CARD_TYPES = {
  NEW: 0,
  LEARNING: 1,
  REVIEW: 2,
  RELEARNING: 3
} as const;

// Queue types for flashcards
export const QUEUE_TYPES = {
  NEW: 0,
  LEARNING: 1,
  REVIEW: 2,
  DAY_LEARN: 3,
  SUSPENDED: -1
} as const;

// Default spaced repetition settings
export const SR_DEFAULTS = {
  LEARNING_STEPS: [1, 10], // minutes
  GRADUATING_INTERVAL: 1, // days
  EASY_INTERVAL: 4, // days
  STARTING_EASE: 2.50,
  EASY_BONUS: 1.30,
  INTERVAL_MODIFIER: 1.00,
  MAXIMUM_INTERVAL: 36500, // ~100 years
  NEW_CARDS_PER_DAY: 20,
  MAX_REVIEWS_PER_DAY: 200
};

// UI constants
export const UI = {
  SIDEBAR_WIDTH: {
    EXPANDED: '16rem', // 256px
    COLLAPSED: '4rem'  // 64px
  },
  ANIMATION_DURATION: 300, // milliseconds
  DEBOUNCE_DELAY: 300, // milliseconds
  CARDS_PER_PAGE: 20,
  MAX_SEARCH_RESULTS: 100
};

// Color schemes
export const COLORS = {
  PRIMARY: '#3b82f6', // blue-500
  SECONDARY: '#6b7280', // gray-500
  SUCCESS: '#10b981', // emerald-500
  WARNING: '#f59e0b', // amber-500
  ERROR: '#ef4444', // red-500
  INFO: '#06b6d4', // cyan-500
  
  DIFFICULTY: {
    BEGINNER: '#10b981', // green
    INTERMEDIATE: '#f59e0b', // amber
    ADVANCED: '#ef4444' // red
  },
  
  PRIORITY: {
    HIGH: '#ef4444', // red
    MEDIUM: '#f59e0b', // amber
    LOW: '#10b981' // green
  },
  
  CARD_TYPE: {
    NEW: '#3b82f6', // blue
    LEARNING: '#f59e0b', // amber
    REVIEW: '#10b981', // green
    RELEARNING: '#ef4444' // red
  }
};

// Study modules configuration
export const STUDY_MODULES = [
  {
    id: 'mock-test-analysis',
    title: '🎯 Mock Test Analysis (42-Page System)',
    time: 'Start Now',
    bgColor: '#FFD700',
    progress: 0,
    nextLesson: 'Pre-Mock Strategic Planning',
    stats: { completed: 0, total: 42 },
    subject: 'Complete Analysis Framework',
    priority: true,
    description: 'Comprehensive 42-page analysis system'
  },
  {
    id: 'reading-mastery',
    title: 'CLAT Reading Comprehension',
    time: '11:00 AM',
    bgColor: '#87CEEB',
    progress: 75,
    nextLesson: 'Environmental Law Passages',
    stats: { completed: 45, total: 60 },
    subject: 'Reading & Comprehension',
    description: '3,081-line advanced reading system'
  },
  {
    id: 'legal-reasoning',
    title: 'Legal Reasoning',
    time: '12:30 PM',
    bgColor: '#F4A460',
    progress: 62,
    nextLesson: 'Constitutional Law Principles',
    stats: { completed: 31, total: 50 },
    subject: 'Legal Aptitude'
  },
  {
    id: 'logical-reasoning',
    title: 'Logical Reasoning',
    time: '2:00 PM',
    bgColor: '#87CEFA',
    progress: 58,
    nextLesson: 'Syllogisms & Assumptions',
    stats: { completed: 29, total: 50 },
    subject: 'Logical Reasoning'
  },
  {
    id: 'current-affairs',
    title: 'Current Affairs & GK',
    time: '3:00 PM',
    bgColor: '#90EE90',
    progress: 80,
    nextLesson: 'Recent Legal Developments',
    stats: { completed: 120, total: 150 },
    subject: 'General Knowledge'
  },
  {
    id: 'quantitative',
    title: 'Quantitative Techniques',
    time: '4:30 PM',
    bgColor: '#FFB6C1',
    progress: 70,
    nextLesson: 'Data Interpretation',
    stats: { completed: 35, total: 50 },
    subject: 'Mathematics'
  }
];

// Navigation items
export const NAVIGATION_ITEMS = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'tests', label: 'Mock Tests' },
  { id: 'practice', label: 'Practice' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'goals', label: 'Goals' },
  { id: 'social', label: 'Social' },
  { id: 'ai-planner', label: 'AI Planner' },
  { id: 'study-reminders', label: 'AI Reminders' },
  { id: 'countdown', label: 'CLAT Countdown' },
  { id: 'test-analysis', label: 'Analysis' },
  { id: 'insights', label: 'Insights' },
  { id: 'vocabulary', label: 'Vocabulary' },
  { id: 'settings', label: 'Settings' }
];

// Local storage keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  THEME: 'theme',
  SIDEBAR_COLLAPSED: 'sidebar_collapsed',
  STUDY_PREFERENCES: 'study_preferences',
  QUIZ_PROGRESS: 'quiz_progress',
  DISMISSED_REMINDERS: 'dismissed_reminders'
};

// Error messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'Please log in to continue.',
  FORBIDDEN: 'You do not have permission to access this resource.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  SERVER_ERROR: 'Something went wrong. Please try again later.',
  SESSION_EXPIRED: 'Your session has expired. Please log in again.'
};

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Welcome back!',
  LOGOUT_SUCCESS: 'You have been logged out successfully.',
  SAVE_SUCCESS: 'Changes saved successfully.',
  DELETE_SUCCESS: 'Item deleted successfully.',
  UPDATE_SUCCESS: 'Updated successfully.',
  QUIZ_COMPLETED: 'Quiz completed successfully!',
  STUDY_SESSION_COMPLETED: 'Great job completing your study session!'
};

// Regex patterns
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[\d\s-()]+$/,
  STRONG_PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
};

// Feature flags
export const FEATURE_FLAGS = {
  ENABLE_FLASHCARDS: true,
  ENABLE_AI_REMINDERS: true,
  ENABLE_SOCIAL_FEATURES: true,
  ENABLE_GAMIFICATION: true,
  ENABLE_OFFLINE_MODE: false,
  ENABLE_PUSH_NOTIFICATIONS: false
};

// Performance thresholds
export const PERFORMANCE = {
  EXCELLENT_THRESHOLD: 90,
  GOOD_THRESHOLD: 75,
  AVERAGE_THRESHOLD: 60,
  NEEDS_IMPROVEMENT_THRESHOLD: 40
};

// Time constants (in milliseconds)
export const TIME = {
  SECOND: 1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  WEEK: 7 * 24 * 60 * 60 * 1000
};
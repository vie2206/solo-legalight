// Shared type definitions

// User related types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin' | 'educator' | 'parent' | 'operation_manager';
  picture?: string;
  target_nlu?: string;
  target_score?: number;
  subscription_tier?: 'free' | 'premium' | 'elite';
  study_streak?: number;
  total_tests?: number;
  avg_score?: number;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

// Study session types
export interface StudySession {
  id: string;
  subject: string;
  duration: number;
  completed_at: string;
  score?: number;
  cards_studied?: number;
  correct_answers?: number;
  incorrect_answers?: number;
}

export interface StudyStats {
  cards_studied: number;
  new_cards: number;
  learning_cards: number;
  review_cards: number;
  correct_answers: number;
  incorrect_answers: number;
  session_duration: number;
}

// Quiz related types
export interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  points: number;
  explanation: string;
  source: string;
}

export interface QuizState {
  currentQuestion: number;
  selectedAnswers: { [key: number]: number };
  showExplanation: boolean;
  timeStarted: Date;
  timePerQuestion: { [key: number]: number };
  score: number;
  isCompleted: boolean;
}

// Mock test types
export interface MockTest {
  id: string;
  name: string;
  date: Date;
  duration: number;
  subjects: string[];
  totalQuestions: number;
  importance: 'high' | 'medium' | 'low';
  status: 'upcoming' | 'registered' | 'completed';
}

// Milestone types
export interface Milestone {
  id: string;
  name: string;
  date: Date;
  description: string;
  type: 'exam' | 'registration' | 'result' | 'preparation';
  completed: boolean;
}

// Study reminder types
export interface StudyReminder {
  id: string;
  type: 'streak' | 'weakness' | 'revision' | 'goal' | 'schedule' | 'motivational';
  priority: 'high' | 'medium' | 'low';
  title: string;
  message: string;
  action: string;
  subject?: string;
  dueDate?: string;
  progress?: number;
  recommendation: string;
  aiReasoning: string;
}

export interface StudyPattern {
  bestStudyTime: string;
  averageSessionDuration: number;
  strongSubjects: string[];
  weakSubjects: string[];
  consistency: number;
  lastWeekSessions: number;
}

// Dashboard module types
export interface Module {
  id: string;
  title: string;
  time: string;
  bgColor: string;
  progress: number;
  nextLesson: string;
  stats: { completed: number; total: number };
  subject: string;
  priority?: boolean;
  description?: string;
}

// Navigation types
export interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
}

// Performance stats type
export interface PerformanceStats {
  overallProgress: number;
  studyStreak: number;
  totalHours: number;
  testsCompleted: number;
  averageScore: number;
  percentileRank: number;
  questionsAttempted: number;
  accuracyRate: number;
  weeklyGoal: number;
  monthlyImprovement: number;
  clatRank: number;
  targetScore: number;
  currentGPA: number;
}

// Flashcard types
export interface Card {
  id: string;
  note_id: string;
  deck_id: string;
  deck_name: string;
  template_index: number;
  card_type: number;
  queue: number;
  due: number;
  interval: number;
  ease_factor: number;
  reps: number;
  lapses: number;
  created_at: string;
  updated_at: string;
  note: {
    fields: { [key: string]: string };
    tags: string[];
    note_type: {
      name: string;
      fields: Array<{ name: string; type: string }>;
    };
  };
}

export interface CardField {
  name: string;
  type: 'text' | 'html' | 'image' | 'audio' | 'video';
  required: boolean;
  value?: string;
}

export interface CardTemplate {
  name: string;
  question: string;
  answer: string;
  css?: string;
  javascript?: string;
}

export interface NoteType {
  id: string;
  name: string;
  description: string;
  fields: CardField[];
  templates: CardTemplate[];
  css: string;
  javascript: string;
  is_builtin: boolean;
}

// API response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Component props types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
  role: string;
}

// Search and filter types
export interface SearchFilters {
  query: string;
  category: string;
  difficulty: string;
  tags: string[];
  dateRange: {
    start: string;
    end: string;
  };
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

// Pagination types
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

// Error types
export interface AppError {
  code: string;
  message: string;
  details?: any;
}

// Theme types
export interface Theme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  error: string;
  warning: string;
  success: string;
  info: string;
}
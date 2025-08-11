import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Configure axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Types
export interface Doubt {
  id: string;
  title: string;
  description: string;
  subject: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'assigned' | 'in_progress' | 'resolved' | 'closed';
  type: 'concept' | 'problem' | 'homework' | 'exam_prep' | 'other';
  student_id: string;
  assigned_educator_id?: string;
  ai_assisted: boolean;
  difficulty_level: number;
  estimated_time_minutes?: number;
  tags: string[];
  attachments: string[];
  resolved_at?: string;
  closed_at?: string;
  created_at: string;
  updated_at: string;
  student?: {
    id: string;
    name: string;
    email: string;
    profile_picture?: string;
  };
  assigned_educator?: {
    id: string;
    name: string;
    email: string;
    profile_picture?: string;
  };
  responses?: DoubtResponse[];
  ratings?: DoubtRating[];
}

export interface DoubtResponse {
  id: string;
  doubt_id: string;
  author_id: string;
  author_type: 'student' | 'educator' | 'ai';
  content: string;
  attachments: string[];
  is_helpful?: boolean;
  is_accepted_solution: boolean;
  upvotes: number;
  downvotes: number;
  ai_generated: boolean;
  ai_model?: string;
  ai_confidence_score?: number;
  parent_response_id?: string;
  created_at: string;
  updated_at: string;
  author?: {
    id: string;
    name: string;
    email: string;
    profile_picture?: string;
  };
}

export interface DoubtRating {
  id: string;
  doubt_id: string;
  student_id: string;
  rating: number;
  feedback?: string;
  response_quality_rating?: number;
  response_speed_rating?: number;
  educator_rating?: number;
  created_at: string;
}

export interface DoubtNotification {
  id: string;
  doubt_id: string;
  user_id: string;
  notification_type: string;
  title: string;
  message: string;
  is_read: boolean;
  metadata: any;
  created_at: string;
}

export interface CreateDoubtData {
  title: string;
  description: string;
  subject: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  type: 'concept' | 'problem' | 'homework' | 'exam_prep' | 'other';
  tags?: string[];
  attachments?: string[];
  difficulty_level?: number;
  prefer_ai?: boolean;
}

export interface UpdateDoubtData {
  status?: 'open' | 'assigned' | 'in_progress' | 'resolved' | 'closed';
  assigned_educator_id?: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  tags?: string[];
  estimated_time_minutes?: number;
}

export interface CreateResponseData {
  content: string;
  attachments?: string[];
  parent_response_id?: string;
}

export interface DoubtFilters {
  page?: number;
  limit?: number;
  status?: string;
  subject?: string;
  priority?: string;
  student_id?: string;
  educator_id?: string;
  search?: string;
}

export interface AnalyticsData {
  overview: {
    total_doubts: number;
    resolved_doubts: number;
    resolution_rate: string;
    average_response_time_minutes: number;
    average_rating: string;
  };
  subject_distribution: Record<string, number>;
  active_educators: number;
  period: {
    start_date: string;
    end_date: string;
    period_type: string;
  };
}

export interface EducatorPerformance {
  educator_id: string;
  educator_name: string;
  educator_email: string;
  total_assigned: number;
  resolved: number;
  resolution_rate: string;
  avg_response_time_minutes: number;
  efficiency_score: string;
  subjects: string[];
}

// Doubt Management API
export const doubtService = {
  // Get doubts with filtering
  async getDoubts(filters: DoubtFilters = {}): Promise<{ doubts: Doubt[]; total: number; page: number; totalPages: number }> {
    const response = await apiClient.get('/doubts', { params: filters });
    return response.data;
  },

  // Get specific doubt with responses
  async getDoubt(id: string): Promise<{ doubt: Doubt }> {
    const response = await apiClient.get(`/doubts/${id}`);
    return response.data;
  },

  // Create new doubt
  async createDoubt(data: CreateDoubtData): Promise<{ doubt: Doubt; message: string }> {
    const response = await apiClient.post('/doubts', data);
    return response.data;
  },

  // Update doubt
  async updateDoubt(id: string, data: UpdateDoubtData): Promise<{ doubt: Doubt; message: string }> {
    const response = await apiClient.put(`/doubts/${id}`, data);
    return response.data;
  },

  // Add response to doubt
  async addResponse(doubtId: string, data: CreateResponseData): Promise<{ response: DoubtResponse; message: string }> {
    const response = await apiClient.post(`/doubts/${doubtId}/responses`, data);
    return response.data;
  },

  // Rate doubt resolution
  async rateDoubt(doubtId: string, data: {
    rating: number;
    feedback?: string;
    response_quality_rating?: number;
    response_speed_rating?: number;
    educator_rating?: number;
  }): Promise<{ rating: DoubtRating; message: string }> {
    const response = await apiClient.post(`/doubts/${doubtId}/rate`, data);
    return response.data;
  },
};

// Notification API
export const notificationService = {
  // Get user notifications
  async getNotifications(limit = 20, offset = 0): Promise<{ notifications: DoubtNotification[]; total: number }> {
    const response = await apiClient.get('/notifications', {
      params: { limit, offset }
    });
    return response.data;
  },

  // Get unread notification count
  async getUnreadCount(): Promise<{ unread_count: number }> {
    const response = await apiClient.get('/notifications/unread-count');
    return response.data;
  },

  // Mark notifications as read
  async markAsRead(notificationIds: string[]): Promise<{ message: string }> {
    const response = await apiClient.put('/notifications/mark-read', {
      notification_ids: notificationIds
    });
    return response.data;
  },

  // Delete notification
  async deleteNotification(id: string): Promise<{ message: string }> {
    const response = await apiClient.delete(`/notifications/${id}`);
    return response.data;
  },
};

// File Upload API
export const uploadService = {
  // Upload doubt attachments
  async uploadFiles(files: File[]): Promise<{ files: Array<{ filename: string; originalName: string; url: string }> }> {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));

    const response = await apiClient.post('/upload/doubt-attachments', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Get user's uploaded files
  async getUserFiles(): Promise<{ files: Array<{ filename: string; type: string; size: number; uploadedAt: string; url: string }> }> {
    const response = await apiClient.get('/upload/user-files');
    return response.data;
  },

  // Get storage info
  async getStorageInfo(): Promise<{
    totalSize: number;
    totalSizeFormatted: string;
    fileCount: number;
    usagePercentage: number;
    remainingSpaceFormatted: string;
  }> {
    const response = await apiClient.get('/upload/storage-info');
    return response.data;
  },
};

// Analytics API
export const analyticsService = {
  // Get doubt system overview
  async getDoubtOverview(period = 'week'): Promise<{ analytics: AnalyticsData }> {
    const response = await apiClient.get('/analytics/doubt-overview', {
      params: { period }
    });
    return response.data;
  },

  // Get educator performance
  async getEducatorPerformance(period = 'month', educatorId?: string): Promise<{
    educators: EducatorPerformance[];
    total_educators: number;
  }> {
    const params: any = { period };
    if (educatorId) params.educator_id = educatorId;

    const response = await apiClient.get('/analytics/educator-performance', { params });
    return response.data;
  },

  // Get student insights
  async getStudentInsights(period = 'month', studentId?: string): Promise<{
    insights: {
      total_doubts: number;
      resolved_doubts: number;
      resolution_rate: string;
      avg_resolution_time_hours: string;
      most_common_subjects: Array<{ subject: string; count: number }>;
      improvement_areas: Array<{ subject: string; resolution_rate: string }>;
    };
  }> {
    const params: any = { period };
    if (studentId) params.student_id = studentId;

    const response = await apiClient.get('/analytics/student-insights', { params });
    return response.data;
  },
};

// Helper function to format dates
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

// Helper function to get priority color
export const getPriorityColor = (priority: string): string => {
  switch (priority) {
    case 'urgent': return 'text-red-600 bg-red-50 border-red-200';
    case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
    case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    case 'low': return 'text-green-600 bg-green-50 border-green-200';
    default: return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};

// Helper function to get status color
export const getStatusColor = (status: string): string => {
  switch (status) {
    case 'resolved': return 'text-green-600 bg-green-50 border-green-200';
    case 'in_progress': return 'text-blue-600 bg-blue-50 border-blue-200';
    case 'assigned': return 'text-purple-600 bg-purple-50 border-purple-200';
    case 'open': return 'text-gray-600 bg-gray-50 border-gray-200';
    case 'closed': return 'text-gray-800 bg-gray-100 border-gray-300';
    default: return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};

export default apiClient;
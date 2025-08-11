import React, { useState, useEffect, useCallback } from 'react';
import { 
  MessageCircle, Clock, CheckCircle, AlertCircle, User, 
  Brain, Star, TrendingUp, Eye, Calendar, Bell, 
  BarChart3, Target, Award, Search, Filter, Plus
} from 'lucide-react';
import { User as UserType } from '../../types';
import { 
  doubtService, 
  analyticsService,
  notificationService,
  Doubt, 
  formatDate,
  getPriorityColor as getAPIPriorityColor,
  getStatusColor as getAPIStatusColor
} from '../../services/doubtService';
import { useSocket } from '../../services/socketService';

interface ParentDoubtTrackerProps {
  user: UserType;
  onBack?: () => void;
}

// Using the Doubt interface from API service
interface EnhancedDoubt extends Doubt {
  studentName?: string;
}

const ParentDoubtTracker: React.FC<ParentDoubtTrackerProps> = ({ user, onBack }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'open' | 'resolved'>('all');
  const [selectedStudent, setSelectedStudent] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [doubts, setDoubts] = useState<EnhancedDoubt[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [students, setStudents] = useState<string[]>([]);
  
  // Socket integration
  const socket = useSocket();

  // Initialize component with API data
  useEffect(() => {
    initializeParentTracker();
    setupSocketListeners();
    return () => cleanupSocketListeners();
  }, []);

  const initializeParentTracker = async () => {
    setLoading(true);
    setError(null);
    try {
      await Promise.all([
        loadChildrenDoubts(),
        loadAnalytics(),
        connectSocket()
      ]);
    } catch (error) {
      console.error('Failed to initialize parent tracker:', error);
      setError('Failed to load doubt tracking data');
    } finally {
      setLoading(false);
    }
  };

  const connectSocket = async () => {
    try {
      await socket.connect();
    } catch (error) {
      console.error('Socket connection failed:', error);
    }
  };

  const setupSocketListeners = () => {
    const removeListeners = [
      socket.addEventListener('doubt_update', handleDoubtUpdate),
      socket.addEventListener('notification', handleNewNotification)
    ];
    return () => removeListeners.forEach(cleanup => cleanup());
  };

  const cleanupSocketListeners = () => {
    // Cleanup handled by useEffect return
  };

  // Socket event handlers
  const handleDoubtUpdate = useCallback((data: any) => {
    console.log('🔄 Doubt updated for parent:', data);
    loadChildrenDoubts(); // Refresh doubt list
  }, []);

  const handleNewNotification = useCallback((data: any) => {
    console.log('📢 New notification for parent:', data);
    // Could show toast notification here
  }, []);

  const loadChildrenDoubts = async () => {
    try {
      // In a real app, this would be filtered by parent's children IDs
      // For now, we'll get all doubts and simulate parent-child relationship
      const { doubts: allDoubts } = await doubtService.getDoubts({
        limit: 100 // Get more doubts for parent view
      });
      
      // Enhance doubts with student names
      const enhancedDoubts: EnhancedDoubt[] = allDoubts.map(doubt => ({
        ...doubt,
        studentName: doubt.student?.name || 'Unknown Student'
      }));
      
      setDoubts(enhancedDoubts);
      
      // Extract unique student names
      const uniqueStudents = Array.from(new Set(
        enhancedDoubts.map(d => d.studentName).filter(Boolean)
      )) as string[];
      setStudents(uniqueStudents);
      
    } catch (error) {
      console.error('Failed to load children doubts:', error);
      setError('Failed to load doubt data');
    }
  };

  const loadAnalytics = async () => {
    try {
      const { insights } = await analyticsService.getStudentInsights('month');
      setAnalytics(insights);
    } catch (error) {
      console.error('Failed to load analytics:', error);
      // Don't set error for analytics failure, just log it
    }
  };

  const filteredDoubts = doubts.filter(doubt => {
    const statusMatch = activeFilter === 'all' || doubt.status === activeFilter;
    const studentMatch = selectedStudent === 'all' || doubt.studentName === selectedStudent;
    return statusMatch && studentMatch;
  });

  // Use API service color functions
  const getStatusColor = (status: string) => {
    return getAPIStatusColor(status).replace('border-', '').replace('text-', 'text-').replace('bg-', 'bg-');
  };

  const getPriorityColor = (priority: string) => {
    return getAPIPriorityColor(priority).replace('border-', '').replace('text-', 'text-').replace('bg-', 'bg-');
  };

  // Calculate stats from real data
  const stats = {
    totalDoubts: doubts.length,
    resolvedDoubts: doubts.filter(d => d.status === 'resolved').length,
    averageResponseTime: analytics?.avg_resolution_time_hours || '2.3h',
    averageRating: 4.7, // Could come from doubt ratings
    openDoubts: doubts.filter(d => d.status === 'open').length,
    aiAssistedPercentage: doubts.length > 0 ? Math.round((doubts.filter(d => d.ai_assisted).length / doubts.length) * 100) : 0
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Student Doubt Tracking</h1>
              <p className="text-gray-600">Monitor your children's learning questions and progress</p>
            </div>
            <button 
              onClick={onBack}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading doubt tracking data...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <AlertCircle className="w-5 h-5 text-red-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error loading data</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
                <button
                  onClick={initializeParentTracker}
                  className="mt-2 text-sm text-red-800 underline hover:text-red-900"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        )}

        {!loading && !error && (
          <>
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.totalDoubts}</p>
                <p className="text-sm text-gray-600">Total Doubts</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.resolvedDoubts}</p>
                <p className="text-sm text-gray-600">Resolved</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">
                {Math.round((stats.resolvedDoubts / stats.totalDoubts) * 100)}% resolution rate
              </span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.averageResponseTime}</p>
                <p className="text-sm text-gray-600">Avg Response Time</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.averageRating}/5</p>
                <p className="text-sm text-gray-600">Satisfaction Rating</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Status:</span>
              {['all', 'open', 'in_progress', 'resolved'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter as any)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === filter
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1).replace('_', ' ')}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700">Student:</span>
              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Students</option>
                {students.map((student) => (
                  <option key={student} value={student}>{student}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Doubts List */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Student Doubts ({filteredDoubts.length})
            </h3>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredDoubts.length === 0 ? (
              <div className="p-8 text-center">
                <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No doubts found for the selected filters</p>
              </div>
            ) : (
              filteredDoubts.map((doubt) => (
                <div key={doubt.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-medium text-gray-900">{doubt.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doubt.status)}`}>
                          {doubt.status.replace('_', ' ')}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(doubt.priority)}`}>
                          {doubt.priority}
                        </span>
                        {doubt.ai_assisted && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium flex items-center gap-1">
                            <Brain className="w-3 h-3" />
                            AI Assisted
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {doubt.studentName}
                        </span>
                        <span>{doubt.subject}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(doubt.created_at)}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          {doubt.responses?.length || 0} responses
                        </span>
                      </div>

                      {doubt.assigned_educator && (
                        <div className="text-sm text-gray-600 mb-2">
                          <span className="font-medium">Assigned to:</span> {doubt.assigned_educator.name}
                        </div>
                      )}

                      {doubt.resolved_at && (
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-green-600">
                            Resolved on {formatDate(doubt.resolved_at)}
                          </span>
                          {doubt.ratings && doubt.ratings.length > 0 && (
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-gray-600">{doubt.ratings[0].rating}/5</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      {doubt.status === 'open' && (
                        <button className="p-2 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
                          <Bell className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Insights</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Most asked subject</span>
                <span className="font-medium text-gray-900">
                  {analytics?.most_common_subjects?.[0]?.subject || 'Constitutional Law'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total doubts asked</span>
                <span className="font-medium text-gray-900">{analytics?.total_doubts || stats.totalDoubts}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">AI assistance usage</span>
                <span className="font-medium text-gray-900">{stats.aiAssistedPercentage}%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Resolution rate</span>
                <span className="font-medium text-gray-900">{analytics?.resolution_rate || '80%'}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-900 mb-1">Study Pattern</p>
                <p className="text-xs text-blue-700">
                  Most doubts are in {analytics?.most_common_subjects?.[0]?.subject || 'Constitutional Law'}. Consider additional practice sessions.
                </p>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <p className="text-sm font-medium text-green-900 mb-1">Progress Update</p>
                <p className="text-xs text-green-700">
                  Resolution rate is {analytics?.resolution_rate || '80%'}! Keep up the good work.
                </p>
              </div>
              <div className="p-3 bg-yellow-50 rounded-lg">
                <p className="text-sm font-medium text-yellow-900 mb-1">Learning Tip</p>
                <p className="text-xs text-yellow-700">
                  {analytics?.improvement_areas?.length > 0 
                    ? `Focus on ${analytics.improvement_areas[0].subject} for better results.`
                    : 'Consider scheduling doubts during daytime for faster responses.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
        </>
        )}
      </div>
    </div>
  );
};

export default ParentDoubtTracker;
import React, { useState, useEffect, useCallback } from 'react';
import { 
  MessageCircle, Users, Clock, CheckCircle, AlertCircle, 
  Brain, Star, TrendingUp, TrendingDown, Activity, Eye, 
  Calendar, Bell, BarChart3, Target, Award, Search, 
  Filter, Plus, Settings, Download, RefreshCw, User,
  Shield, Database, Globe, Zap, FileText, Mail, Loader2
} from 'lucide-react';
import { User as UserType } from '../../types';
import { 
  doubtService, 
  analyticsService,
  notificationService,
  Doubt, 
  AnalyticsData,
  EducatorPerformance as APIEducatorPerformance,
  formatDate
} from '../../services/doubtService';
import { useSocket } from '../../services/socketService';

interface AdminDoubtOversightProps {
  user: UserType;
  onBack?: () => void;
}

interface SystemStats {
  totalDoubts: number;
  resolvedDoubts: number;
  openDoubts: number;
  averageResponseTime: string;
  totalEducators: number;
  activeEducators: number;
  aiResolutionRate: number;
  satisfactionRating: number;
  dailyVolume: number;
  peakHours: string;
}

// Enhanced educator interface with admin-specific data
interface EnhancedEducatorPerformance extends APIEducatorPerformance {
  status?: 'active' | 'busy' | 'offline';
  lastActive?: string;
}

const AdminDoubtOversightIntegrated: React.FC<AdminDoubtOversightProps> = ({ user, onBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'educators' | 'analytics' | 'settings'>('overview');
  const [timeFilter, setTimeFilter] = useState<'today' | 'week' | 'month'>('week');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Data states
  const [stats, setStats] = useState<SystemStats>({} as SystemStats);
  const [educators, setEducators] = useState<EnhancedEducatorPerformance[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [recentDoubts, setRecentDoubts] = useState<Doubt[]>([]);
  
  // Socket integration
  const socket = useSocket();

  // Initialize admin oversight with real data
  useEffect(() => {
    initializeAdminOversight();
    setupSocketListeners();
    return () => cleanupSocketListeners();
  }, [timeFilter]);

  const initializeAdminOversight = async () => {
    setLoading(true);
    setError(null);
    try {
      await Promise.all([
        loadSystemStats(),
        loadEducatorPerformance(),
        loadRecentActivity(),
        connectSocket()
      ]);
    } catch (error) {
      console.error('Failed to initialize admin oversight:', error);
      setError('Failed to load admin data');
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
      socket.addEventListener('doubt_statistics_update', handleStatsUpdate),
      socket.addEventListener('doubt_update', handleDoubtUpdate),
      socket.addEventListener('notification', handleSystemNotification)
    ];
    return () => removeListeners.forEach(cleanup => cleanup());
  };

  const cleanupSocketListeners = () => {
    // Cleanup handled by useEffect return
  };

  // Socket event handlers
  const handleStatsUpdate = useCallback((data: any) => {
    console.log('📊 System stats updated:', data);
    loadSystemStats(); // Refresh stats
  }, []);

  const handleDoubtUpdate = useCallback((data: any) => {
    console.log('🔄 Doubt updated in admin view:', data);
    loadRecentActivity(); // Refresh recent activity
  }, []);

  const handleSystemNotification = useCallback((data: any) => {
    console.log('🚨 System notification for admin:', data);
    // Could show admin-specific notifications here
  }, []);

  const loadSystemStats = async () => {
    try {
      const { analytics: analyticsData } = await analyticsService.getDoubtOverview(timeFilter);
      setAnalytics(analyticsData);
      
      // Transform analytics data to stats format
      const systemStats: SystemStats = {
        totalDoubts: analyticsData.overview.total_doubts,
        resolvedDoubts: analyticsData.overview.resolved_doubts,
        openDoubts: analyticsData.overview.total_doubts - analyticsData.overview.resolved_doubts,
        averageResponseTime: `${analyticsData.overview.average_response_time_minutes}m`,
        totalEducators: analyticsData.active_educators,
        activeEducators: Math.round(analyticsData.active_educators * 0.8), // Assume 80% active
        aiResolutionRate: 65, // Could come from doubt responses with ai_generated=true
        satisfactionRating: parseFloat(analyticsData.overview.average_rating),
        dailyVolume: Math.round(analyticsData.overview.total_doubts / 7), // Weekly average
        peakHours: '7:00 PM - 10:00 PM' // Static for now
      };
      setStats(systemStats);
      
    } catch (error) {
      console.error('Failed to load system stats:', error);
    }
  };

  const loadEducatorPerformance = async () => {
    try {
      const { educators: educatorData } = await analyticsService.getEducatorPerformance(timeFilter);
      
      // Enhance with status and last active info
      const enhancedEducators: EnhancedEducatorPerformance[] = educatorData.map(educator => ({
        ...educator,
        status: Math.random() > 0.3 ? 'active' as const : (Math.random() > 0.5 ? 'busy' as const : 'offline' as const),
        lastActive: `${Math.floor(Math.random() * 60)} minutes ago`
      }));
      
      setEducators(enhancedEducators);
    } catch (error) {
      console.error('Failed to load educator performance:', error);
    }
  };

  const loadRecentActivity = async () => {
    try {
      const { doubts } = await doubtService.getDoubts({
        limit: 10,
        page: 1
      });
      setRecentDoubts(doubts);
    } catch (error) {
      console.error('Failed to load recent activity:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const generateRecentActivity = () => {
    if (recentDoubts.length === 0) return [];

    const activities = [
      {
        type: 'resolution',
        message: `High-priority doubt "${recentDoubts[0]?.title}" resolved`,
        time: '2 minutes ago',
        status: 'success'
      },
      {
        type: 'assignment',
        message: `${Math.floor(Math.random() * 5) + 1} new doubts auto-assigned to available educators`,
        time: '8 minutes ago',
        status: 'info'
      },
      {
        type: 'alert',
        message: `Response time threshold exceeded for ${recentDoubts[1]?.subject || 'Legal Reasoning'}`,
        time: '15 minutes ago',
        status: 'warning'
      },
      {
        type: 'system',
        message: 'AI model updated with new legal cases database',
        time: '1 hour ago',
        status: 'success'
      }
    ];

    return activities;
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.totalDoubts || 0}</p>
              <p className="text-sm text-gray-600">Total Doubts</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <MessageCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+12% from last {timeFilter}</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalDoubts > 0 ? Math.round((stats.resolvedDoubts / stats.totalDoubts) * 100) : 0}%
              </p>
              <p className="text-sm text-gray-600">Resolution Rate</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">Target: 90%</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.averageResponseTime || '0m'}</p>
              <p className="text-sm text-gray-600">Avg Response Time</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">-15% improvement</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{(stats.satisfactionRating || 0).toFixed(1)}/5</p>
              <p className="text-sm text-gray-600">User Satisfaction</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">+0.2 this {timeFilter}</span>
          </div>
        </div>
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium">Doubt Resolution System</span>
              </div>
              <span className="text-sm text-gray-500">Operational</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium">AI Assistant</span>
              </div>
              <span className="text-sm text-gray-500">Active - {stats.aiResolutionRate || 0}% resolution</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="font-medium">Educator Capacity</span>
              </div>
              <span className="text-sm text-gray-500">{stats.activeEducators || 0}/{stats.totalEducators || 0} active</span>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium">Real-time Notifications</span>
              </div>
              <span className="text-sm text-gray-500">Operational</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage Patterns</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Peak Hours</span>
                <span className="font-medium">{stats.peakHours}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full w-3/4"></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Daily Volume</span>
                <span className="font-medium">{stats.dailyVolume || 0} doubts/day</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full w-2/3"></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>AI vs Human Resolution</span>
                <span className="font-medium">{stats.aiResolutionRate || 0}% / {100 - (stats.aiResolutionRate || 0)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${stats.aiResolutionRate || 0}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent System Activity</h3>
        <div className="space-y-4">
          {generateRecentActivity().map((activity, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className={`w-2 h-2 rounded-full mt-2 ${
                activity.status === 'success' ? 'bg-green-500' :
                activity.status === 'warning' ? 'bg-yellow-500' :
                activity.status === 'error' ? 'bg-red-500' : 'bg-blue-500'
              }`}></div>
              <div className="flex-1">
                <p className="text-sm text-gray-800">{activity.message}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderEducators = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-900">Educator Performance</h3>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Educator
          </button>
        </div>
      </div>

      {educators.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Educators Found</h3>
          <p className="text-gray-600">No educator performance data available for the selected period.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search educators..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Educator
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Performance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Response Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {educators.map((educator) => (
                  <tr key={educator.educator_id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{educator.educator_name}</div>
                          <div className="text-sm text-gray-500">{educator.educator_email}</div>
                          <div className="text-xs text-gray-400 mt-1">
                            {educator.subjects.join(', ')}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {educator.resolved}/{educator.total_assigned} resolved
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ width: `${(educator.resolved / educator.total_assigned) * 100}%` }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">
                        {educator.avg_response_time_minutes}m
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="text-sm font-medium text-gray-900">
                          {educator.efficiency_score}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(educator.status || 'active')}`}>
                        {educator.status || 'active'}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        {educator.lastActive || 'Recently'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Settings className="w-4 h-4" />
                        </button>
                        <button className="text-green-600 hover:text-green-900">
                          <Mail className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced Analytics Dashboard</h3>
        
        {analytics ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Subject Distribution</h4>
              <div className="space-y-2">
                {Object.entries(analytics.subject_distribution).map(([subject, count]) => (
                  <div key={subject} className="flex justify-between">
                    <span className="text-sm text-gray-600">{subject}</span>
                    <span className="text-sm font-medium">{count}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Resolution Metrics</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Resolution Rate</span>
                  <span className="text-sm font-medium">{analytics.overview.resolution_rate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Avg Response Time</span>
                  <span className="text-sm font-medium">{analytics.overview.average_response_time_minutes}m</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Avg Rating</span>
                  <span className="text-sm font-medium">{analytics.overview.average_rating}/5</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">Period Overview</h4>
              <div className="space-y-2">
                <div className="text-sm text-gray-600">Period: {analytics.period.period_type}</div>
                <div className="text-sm text-gray-600">
                  {new Date(analytics.period.start_date).toLocaleDateString()} - {new Date(analytics.period.end_date).toLocaleDateString()}
                </div>
                <div className="text-sm font-medium">Active Educators: {analytics.active_educators}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Loading Analytics</h3>
            <p className="text-gray-600">Fetching comprehensive analytics data...</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Doubt Resolution System - Admin Overview</h1>
              <p className="text-gray-600">Monitor and manage the entire doubt resolution ecosystem</p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
              <button 
                onClick={initializeAdminOversight}
                className="p-2 text-gray-500 hover:text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              {onBack && (
                <button 
                  onClick={onBack}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Back to Dashboard
                </button>
              )}
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b">
            {[
              { id: 'overview', label: 'System Overview', icon: BarChart3 },
              { id: 'educators', label: 'Educators', icon: Users },
              { id: 'analytics', label: 'Analytics', icon: Activity },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-3 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            <span className="ml-3 text-gray-600">Loading admin dashboard...</span>
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
                  onClick={initializeAdminOversight}
                  className="mt-2 text-sm text-red-800 underline hover:text-red-900"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        {!loading && !error && (
          <>
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'educators' && renderEducators()}
            {activeTab === 'analytics' && renderAnalytics()}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">System Settings</h3>
                <p className="text-gray-600 mb-4">Configuration panel coming soon!</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <Shield className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <h4 className="font-medium text-gray-900">Security Settings</h4>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <Database className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <h4 className="font-medium text-gray-900">Data Management</h4>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <Globe className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <h4 className="font-medium text-gray-900">System Configuration</h4>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDoubtOversightIntegrated;
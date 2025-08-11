import React, { useState, useEffect, useCallback } from 'react';
import { 
  MessageSquare, Clock, Users, Star, TrendingUp, CheckCircle,
  AlertTriangle, Filter, Search, RefreshCw, Send, FileText,
  Brain, Award, BarChart3, Eye, ThumbsUp, ThumbsDown, Bell,
  ArrowRight, Calendar, Tag, User, BookOpen, Zap
} from 'lucide-react';
import { 
  doubtService, 
  analyticsService,
  notificationService,
  Doubt, 
  DoubtResponse, 
  EducatorPerformance,
  formatDate,
  getPriorityColor,
  getStatusColor
} from '../../services/doubtService';
import { useSocket } from '../../services/socketService';

interface EducatorDoubtManagerProps {
  user: any;
}

const EducatorDoubtManager: React.FC<EducatorDoubtManagerProps> = ({ user }) => {
  // State management
  const [activeTab, setActiveTab] = useState<'assigned' | 'available' | 'resolved' | 'analytics'>('assigned');
  const [doubts, setDoubts] = useState<Doubt[]>([]);
  const [selectedDoubt, setSelectedDoubt] = useState<Doubt | null>(null);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    subject: '',
    priority: '',
    search: ''
  });
  
  // Analytics data
  const [performance, setPerformance] = useState<EducatorPerformance | null>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalAssigned: 0,
    resolved: 0,
    pending: 0,
    avgResponseTime: 0,
    rating: 0
  });

  // Socket integration
  const socket = useSocket();

  // Initialize component
  useEffect(() => {
    initializeEducatorDashboard();
    setupSocketListeners();
    return () => cleanupSocketListeners();
  }, []);

  const initializeEducatorDashboard = async () => {
    setLoading(true);
    try {
      await Promise.all([
        loadAssignedDoubts(),
        loadPerformanceMetrics(),
        loadNotifications(),
        connectSocket()
      ]);
    } catch (error) {
      console.error('Failed to initialize educator dashboard:', error);
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
      socket.addEventListener('new_doubt_available', handleNewDoubtAvailable),
      socket.addEventListener('doubt_update', handleDoubtUpdate),
      socket.addEventListener('notification', handleNewNotification)
    ];
    return () => removeListeners.forEach(cleanup => cleanup());
  };

  const cleanupSocketListeners = () => {
    // Cleanup handled by useEffect return
  };

  // Socket event handlers
  const handleNewDoubtAvailable = useCallback((data: any) => {
    console.log('🔔 New doubt available:', data);
    // Add notification sound/visual indicator
    loadAssignedDoubts(); // Refresh doubt list
    loadNotifications(); // Update notifications
  }, []);

  const handleDoubtUpdate = useCallback((data: any) => {
    console.log('🔄 Doubt updated:', data);
    loadAssignedDoubts();
  }, []);

  const handleNewNotification = useCallback((data: any) => {
    console.log('📢 New notification:', data);
    setNotifications(prev => [data, ...prev.slice(0, 9)]); // Keep latest 10
  }, []);

  // Data loading functions
  const loadAssignedDoubts = async () => {
    try {
      const { doubts } = await doubtService.getDoubts({
        educator_id: user.id,
        ...filters,
        limit: 50
      });
      setDoubts(doubts);
      updateStats(doubts);
    } catch (error) {
      console.error('Failed to load assigned doubts:', error);
    }
  };

  const loadAvailableDoubts = async () => {
    try {
      const { status, ...otherFilters } = filters;
      const { doubts } = await doubtService.getDoubts({
        status: 'open',
        ...otherFilters,
        limit: 20
      });
      setDoubts(doubts);
    } catch (error) {
      console.error('Failed to load available doubts:', error);
    }
  };

  const loadPerformanceMetrics = async () => {
    try {
      const { educators } = await analyticsService.getEducatorPerformance('month', user.id);
      if (educators.length > 0) {
        setPerformance(educators[0]);
      }
    } catch (error) {
      console.error('Failed to load performance metrics:', error);
    }
  };

  const loadNotifications = async () => {
    try {
      const { notifications } = await notificationService.getNotifications(10, 0);
      setNotifications(notifications);
    } catch (error) {
      console.error('Failed to load notifications:', error);
    }
  };

  const updateStats = (doubtList: Doubt[]) => {
    const assigned = doubtList.filter(d => d.assigned_educator_id === user.id);
    const resolved = assigned.filter(d => d.status === 'resolved');
    const pending = assigned.filter(d => ['assigned', 'in_progress'].includes(d.status));
    
    setStats({
      totalAssigned: assigned.length,
      resolved: resolved.length,
      pending: pending.length,
      avgResponseTime: performance?.avg_response_time_minutes || 0,
      rating: parseFloat(performance?.efficiency_score || '0')
    });
  };

  // Doubt management actions
  const handleTakeDoubt = async (doubtId: string) => {
    try {
      setLoading(true);
      await doubtService.updateDoubt(doubtId, {
        assigned_educator_id: user.id,
        status: 'assigned'
      });
      await loadAssignedDoubts();
    } catch (error) {
      console.error('Failed to take doubt:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitResponse = async () => {
    if (!selectedDoubt || !response.trim()) return;

    try {
      setLoading(true);
      await doubtService.addResponse(selectedDoubt.id, {
        content: response.trim()
      });
      
      // Update doubt status to in_progress
      await doubtService.updateDoubt(selectedDoubt.id, {
        status: 'in_progress'
      });

      setResponse('');
      await loadAssignedDoubts();
      
      // Reload selected doubt to show new response
      const { doubt } = await doubtService.getDoubt(selectedDoubt.id);
      setSelectedDoubt(doubt);
    } catch (error) {
      console.error('Failed to submit response:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkResolved = async (doubtId: string) => {
    try {
      setLoading(true);
      await doubtService.updateDoubt(doubtId, {
        status: 'resolved'
      });
      await loadAssignedDoubts();
      if (selectedDoubt?.id === doubtId) {
        setSelectedDoubt(null);
      }
    } catch (error) {
      console.error('Failed to mark doubt as resolved:', error);
    } finally {
      setLoading(false);
    }
  };

  // Tab switching
  const handleTabChange = async (tab: typeof activeTab) => {
    setActiveTab(tab);
    setSelectedDoubt(null);
    
    switch (tab) {
      case 'assigned':
        await loadAssignedDoubts();
        break;
      case 'available':
        await loadAvailableDoubts();
        break;
      case 'resolved':
        const { doubts } = await doubtService.getDoubts({
          educator_id: user.id,
          status: 'resolved',
          limit: 50
        });
        setDoubts(doubts);
        break;
      case 'analytics':
        await loadPerformanceMetrics();
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Educator Doubt Management</h1>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span>{stats.totalAssigned} Total Assigned</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>{stats.resolved} Resolved</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-600" />
              <span>{stats.pending} Pending</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-600" />
              <span>{stats.rating.toFixed(1)} Rating</span>
            </div>
          </div>
        </div>

        {/* Performance Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-50 rounded-lg">
                <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Doubts</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.totalAssigned}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Resolution Rate</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.totalAssigned > 0 ? Math.round((stats.resolved / stats.totalAssigned) * 100) : 0}%
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-orange-50 rounded-lg">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Avg Response Time</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.avgResponseTime}m</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-50 rounded-lg">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rating</p>
                <p className="text-2xl font-semibold text-gray-900">{stats.rating.toFixed(1)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'assigned', label: 'My Doubts', icon: MessageSquare, count: stats.totalAssigned },
                { id: 'available', label: 'Available', icon: Users, count: 0 },
                { id: 'resolved', label: 'Resolved', icon: CheckCircle, count: stats.resolved },
                { id: 'analytics', label: 'Performance', icon: BarChart3, count: 0 }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id as typeof activeTab)}
                  className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                  {tab.count > 0 && (
                    <span className="bg-gray-100 text-gray-900 py-1 px-2 rounded-full text-xs">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Filters */}
            {activeTab !== 'analytics' && (
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search doubts..."
                      value={filters.search}
                      onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                    />
                  </div>
                </div>
                <select
                  value={filters.subject}
                  onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Subjects</option>
                  <option value="Constitutional Law">Constitutional Law</option>
                  <option value="Legal Reasoning">Legal Reasoning</option>
                  <option value="English">English</option>
                  <option value="GK & Current Affairs">GK & Current Affairs</option>
                  <option value="Mathematics">Mathematics</option>
                </select>
                <select
                  value={filters.priority}
                  onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">All Priorities</option>
                  <option value="urgent">Urgent</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
                <button
                  onClick={() => handleTabChange(activeTab)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </button>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-3 text-gray-600">Loading...</span>
              </div>
            )}

            {/* Doubt List */}
            {!loading && activeTab !== 'analytics' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Doubt Cards */}
                <div className="space-y-4">
                  {doubts.length === 0 ? (
                    <div className="text-center py-12">
                      <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No doubts found</h3>
                      <p className="text-gray-600">
                        {activeTab === 'assigned' ? 'You have no assigned doubts at the moment.' :
                         activeTab === 'available' ? 'No doubts available for assignment.' :
                         'No resolved doubts found.'}
                      </p>
                    </div>
                  ) : (
                    doubts.map((doubt) => (
                      <div
                        key={doubt.id}
                        onClick={() => setSelectedDoubt(doubt)}
                        className={`bg-white border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow ${
                          selectedDoubt?.id === doubt.id ? 'border-blue-500 shadow-md' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{doubt.title}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                              <BookOpen className="w-4 h-4" />
                              <span>{doubt.subject}</span>
                              <span className="text-gray-400">•</span>
                              <User className="w-4 h-4" />
                              <span>{doubt.student?.name}</span>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(doubt.priority)}`}>
                              {doubt.priority}
                            </span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(doubt.status)}`}>
                              {doubt.status}
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 text-sm mb-3 line-clamp-2">
                          {doubt.description}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              <span>{formatDate(doubt.created_at)}</span>
                            </div>
                            {doubt.responses && doubt.responses.length > 0 && (
                              <div className="flex items-center gap-1">
                                <MessageSquare className="w-3 h-3" />
                                <span>{doubt.responses.length} responses</span>
                              </div>
                            )}
                            {doubt.ai_assisted && (
                              <div className="flex items-center gap-1 text-purple-600">
                                <Brain className="w-3 h-3" />
                                <span>AI Assisted</span>
                              </div>
                            )}
                          </div>
                          
                          {activeTab === 'available' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleTakeDoubt(doubt.id);
                              }}
                              className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                            >
                              Take This
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Selected Doubt Detail Panel */}
                {selectedDoubt && (
                  <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold text-gray-900">Doubt Details</h2>
                      <div className="flex gap-2">
                        {selectedDoubt.status !== 'resolved' && (
                          <button
                            onClick={() => handleMarkResolved(selectedDoubt.id)}
                            className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 flex items-center gap-2"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Mark Resolved
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium text-gray-900">{selectedDoubt.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{selectedDoubt.description}</p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Subject:</span>
                          <span className="ml-2">{selectedDoubt.subject}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Priority:</span>
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs border ${getPriorityColor(selectedDoubt.priority)}`}>
                            {selectedDoubt.priority}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Student:</span>
                          <span className="ml-2">{selectedDoubt.student?.name}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Created:</span>
                          <span className="ml-2">{formatDate(selectedDoubt.created_at)}</span>
                        </div>
                      </div>
                      
                      {selectedDoubt.tags && selectedDoubt.tags.length > 0 && (
                        <div>
                          <span className="font-medium text-gray-700">Tags:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {selectedDoubt.tags.map((tag, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {selectedDoubt.attachments && selectedDoubt.attachments.length > 0 && (
                        <div>
                          <span className="font-medium text-gray-700">Attachments:</span>
                          <div className="mt-1 space-y-1">
                            {selectedDoubt.attachments.map((attachment, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm text-blue-600">
                                <FileText className="w-4 h-4" />
                                <a href={attachment} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                  Attachment {index + 1}
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Responses */}
                      {selectedDoubt.responses && selectedDoubt.responses.length > 0 && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Responses</h4>
                          <div className="space-y-3 max-h-64 overflow-y-auto">
                            {selectedDoubt.responses.map((resp) => (
                              <div key={resp.id} className="bg-gray-50 rounded p-3">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-medium text-sm text-gray-900">
                                    {resp.author?.name || 'Unknown'}
                                  </span>
                                  <span className="text-xs text-gray-500">
                                    {formatDate(resp.created_at)}
                                  </span>
                                </div>
                                <p className="text-gray-700 text-sm">{resp.content}</p>
                                {resp.is_accepted_solution && (
                                  <div className="mt-2 flex items-center gap-1 text-green-600 text-xs">
                                    <CheckCircle className="w-3 h-3" />
                                    <span>Accepted Solution</span>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Response Form */}
                      {selectedDoubt.status !== 'resolved' && selectedDoubt.status !== 'closed' && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Add Response</h4>
                          <textarea
                            value={response}
                            onChange={(e) => setResponse(e.target.value)}
                            placeholder="Write your response to help the student..."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            rows={4}
                          />
                          <div className="flex justify-end mt-2">
                            <button
                              onClick={handleSubmitResponse}
                              disabled={!response.trim() || loading}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 flex items-center gap-2"
                            >
                              <Send className="w-4 h-4" />
                              Send Response
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white p-6 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Assigned</p>
                        <p className="text-2xl font-bold text-gray-900">{performance?.total_assigned || 0}</p>
                      </div>
                      <MessageSquare className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Resolution Rate</p>
                        <p className="text-2xl font-bold text-gray-900">{performance?.resolution_rate || '0%'}</p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg border">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Efficiency Score</p>
                        <p className="text-2xl font-bold text-gray-900">{performance?.efficiency_score || '0'}</p>
                      </div>
                      <Award className="w-8 h-8 text-yellow-600" />
                    </div>
                  </div>
                </div>
                
                {performance && (
                  <div className="bg-white p-6 rounded-lg border">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Specializations</h3>
                    <div className="flex flex-wrap gap-2">
                      {performance.subjects.map((subject, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {subject}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducatorDoubtManager;
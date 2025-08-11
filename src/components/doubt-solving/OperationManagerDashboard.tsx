import React, { useState, useEffect, useCallback } from 'react';
import {
  Activity, BarChart3, Clock, Users, Zap, AlertTriangle,
  TrendingUp, TrendingDown, Monitor, Database, Wifi,
  RefreshCw, Download, Settings, Bell, Eye, Target,
  PieChart, LineChart, Calendar, Filter, Search, Play,
  Pause, SkipForward, CheckCircle, XCircle, Loader2,
  Server, Globe, Shield, MessageSquare, UserCheck
} from 'lucide-react';
import { User as UserType } from '../../types';
import {
  doubtService,
  analyticsService,
  notificationService,
  Doubt,
  AnalyticsData,
  EducatorPerformance,
  formatDate
} from '../../services/doubtService';
import { useSocket } from '../../services/socketService';

interface OperationManagerDashboardProps {
  user: UserType;
  onBack?: () => void;
}

interface OperationalMetrics {
  systemHealth: {
    uptime: string;
    responseTime: number;
    errorRate: number;
    throughput: number;
  };
  resourceUtilization: {
    cpuUsage: number;
    memoryUsage: number;
    storageUsage: number;
    networkUsage: number;
  };
  processEfficiency: {
    avgResolutionTime: number;
    peakLoadCapacity: number;
    educatorUtilization: number;
    automationRate: number;
  };
  qualityMetrics: {
    firstResponseRate: number;
    escalationRate: number;
    reopenRate: number;
    satisfactionScore: number;
  };
}

interface SystemAlert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  type: 'performance' | 'capacity' | 'quality' | 'security';
  message: string;
  timestamp: string;
  resolved: boolean;
}

const OperationManagerDashboard: React.FC<OperationManagerDashboardProps> = ({ user, onBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'capacity' | 'quality' | 'alerts'>('overview');
  const [timeFilter, setTimeFilter] = useState<'hour' | 'day' | 'week'>('day');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Data states
  const [metrics, setMetrics] = useState<OperationalMetrics>({} as OperationalMetrics);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);
  const [realtimeData, setRealtimeData] = useState({
    activeUsers: 0,
    activeDoubts: 0,
    responseTime: 0,
    systemLoad: 0
  });

  // Socket integration
  const socket = useSocket();

  useEffect(() => {
    initializeOperationDashboard();
    setupSocketListeners();
    return () => cleanupSocketListeners();
  }, [timeFilter]);

  const initializeOperationDashboard = async () => {
    setLoading(true);
    setError(null);
    try {
      await Promise.all([
        loadOperationalMetrics(),
        loadSystemAlerts(),
        loadAnalytics(),
        connectSocket()
      ]);
    } catch (error) {
      console.error('Failed to initialize operation dashboard:', error);
      setError('Failed to load operational data');
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
      socket.addEventListener('doubt_statistics_update', handleRealtimeUpdate),
      socket.addEventListener('doubt_update', handleSystemUpdate),
      socket.addEventListener('notification', handleSystemAlert)
    ];
    return () => removeListeners.forEach(cleanup => cleanup());
  };

  const cleanupSocketListeners = () => {
    // Cleanup handled by useEffect return
  };

  // Socket event handlers
  const handleRealtimeUpdate = useCallback((data: any) => {
    console.log('📊 Real-time metrics update:', data);
    setRealtimeData(prev => ({
      ...prev,
      activeDoubts: Math.floor(Math.random() * 50) + 10,
      responseTime: Math.random() * 2 + 0.5,
      systemLoad: Math.random() * 100
    }));
  }, []);

  const handleSystemUpdate = useCallback((data: any) => {
    console.log('🔄 System update for operations:', data);
    // Update metrics based on system changes
  }, []);

  const handleSystemAlert = useCallback((data: any) => {
    console.log('🚨 System alert for operations:', data);
    // Add new alert to the list
    const newAlert: SystemAlert = {
      id: Date.now().toString(),
      severity: 'info',
      type: 'performance',
      message: `System notification: ${data.message || 'System activity detected'}`,
      timestamp: new Date().toISOString(),
      resolved: false
    };
    setAlerts(prev => [newAlert, ...prev.slice(0, 9)]); // Keep latest 10
  }, []);

  const loadOperationalMetrics = async () => {
    try {
      // Simulate operational metrics - in real app, this would come from monitoring APIs
      const operationalMetrics: OperationalMetrics = {
        systemHealth: {
          uptime: '99.8%',
          responseTime: Math.random() * 200 + 100, // 100-300ms
          errorRate: Math.random() * 2, // 0-2%
          throughput: Math.floor(Math.random() * 1000) + 500 // 500-1500 req/min
        },
        resourceUtilization: {
          cpuUsage: Math.random() * 80 + 10, // 10-90%
          memoryUsage: Math.random() * 70 + 20, // 20-90%
          storageUsage: Math.random() * 60 + 30, // 30-90%
          networkUsage: Math.random() * 50 + 25 // 25-75%
        },
        processEfficiency: {
          avgResolutionTime: Math.random() * 120 + 60, // 1-3 hours in minutes
          peakLoadCapacity: Math.random() * 30 + 70, // 70-100%
          educatorUtilization: Math.random() * 40 + 50, // 50-90%
          automationRate: Math.random() * 30 + 45 // 45-75%
        },
        qualityMetrics: {
          firstResponseRate: Math.random() * 20 + 75, // 75-95%
          escalationRate: Math.random() * 10 + 5, // 5-15%
          reopenRate: Math.random() * 8 + 2, // 2-10%
          satisfactionScore: Math.random() * 1 + 4 // 4-5
        }
      };
      
      setMetrics(operationalMetrics);
      
      // Update real-time data
      setRealtimeData({
        activeUsers: Math.floor(Math.random() * 100) + 50,
        activeDoubts: Math.floor(Math.random() * 50) + 10,
        responseTime: operationalMetrics.systemHealth.responseTime / 1000,
        systemLoad: operationalMetrics.resourceUtilization.cpuUsage
      });
      
    } catch (error) {
      console.error('Failed to load operational metrics:', error);
    }
  };

  const loadSystemAlerts = async () => {
    try {
      // Simulate system alerts - in real app, this would come from monitoring systems
      const systemAlerts: SystemAlert[] = [
        {
          id: '1',
          severity: 'warning',
          type: 'performance',
          message: 'Average response time increased by 15% in the last hour',
          timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 min ago
          resolved: false
        },
        {
          id: '2',
          severity: 'info',
          type: 'capacity',
          message: 'Peak usage detected - system auto-scaling triggered',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
          resolved: true
        },
        {
          id: '3',
          severity: 'critical',
          type: 'quality',
          message: 'Educator availability below threshold - consider urgent staffing',
          timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
          resolved: false
        }
      ];
      
      setAlerts(systemAlerts);
    } catch (error) {
      console.error('Failed to load system alerts:', error);
    }
  };

  const loadAnalytics = async () => {
    try {
      const { analytics: analyticsData } = await analyticsService.getDoubtOverview(timeFilter === 'hour' ? 'today' : timeFilter === 'day' ? 'week' : 'month');
      setAnalytics(analyticsData);
    } catch (error) {
      console.error('Failed to load analytics:', error);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'info': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getMetricColor = (value: number, threshold: { warning: number; critical: number }) => {
    if (value >= threshold.critical) return 'text-red-600';
    if (value >= threshold.warning) return 'text-yellow-600';
    return 'text-green-600';
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{realtimeData.activeUsers}</p>
              <p className="text-sm text-gray-600">Active Users</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <Activity className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">Real-time</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{realtimeData.activeDoubts}</p>
              <p className="text-sm text-gray-600">Active Doubts</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingUp className="w-4 h-4 text-blue-500 mr-1" />
            <span className="text-sm text-blue-600">+5% from yesterday</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{realtimeData.responseTime.toFixed(1)}s</p>
              <p className="text-sm text-gray-600">Response Time</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-sm text-green-600">-8% improvement</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-gray-900">{realtimeData.systemLoad.toFixed(1)}%</p>
              <p className="text-sm text-gray-600">System Load</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Monitor className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <Activity className="w-4 h-4 text-purple-500 mr-1" />
            <span className={`text-sm ${getMetricColor(realtimeData.systemLoad, { warning: 70, critical: 85 })}`}>
              {realtimeData.systemLoad < 70 ? 'Normal' : realtimeData.systemLoad < 85 ? 'Elevated' : 'High'}
            </span>
          </div>
        </div>
      </div>

      {/* System Health Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Uptime</span>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium">{metrics.systemHealth?.uptime || '99.8%'}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Error Rate</span>
              <span className={`font-medium ${getMetricColor(metrics.systemHealth?.errorRate || 0, { warning: 1, critical: 2 })}`}>
                {(metrics.systemHealth?.errorRate || 0).toFixed(2)}%
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Throughput</span>
              <span className="font-medium">{metrics.systemHealth?.throughput || 0} req/min</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Response Time</span>
              <span className={`font-medium ${getMetricColor(metrics.systemHealth?.responseTime || 0, { warning: 200, critical: 300 })}`}>
                {(metrics.systemHealth?.responseTime || 0).toFixed(0)}ms
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Resource Utilization</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>CPU Usage</span>
                <span className={`font-medium ${getMetricColor(metrics.resourceUtilization?.cpuUsage || 0, { warning: 70, critical: 85 })}`}>
                  {(metrics.resourceUtilization?.cpuUsage || 0).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${metrics.resourceUtilization?.cpuUsage || 0}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Memory Usage</span>
                <span className={`font-medium ${getMetricColor(metrics.resourceUtilization?.memoryUsage || 0, { warning: 75, critical: 90 })}`}>
                  {(metrics.resourceUtilization?.memoryUsage || 0).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full transition-all"
                  style={{ width: `${metrics.resourceUtilization?.memoryUsage || 0}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Storage Usage</span>
                <span className={`font-medium ${getMetricColor(metrics.resourceUtilization?.storageUsage || 0, { warning: 80, critical: 95 })}`}>
                  {(metrics.resourceUtilization?.storageUsage || 0).toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-600 h-2 rounded-full transition-all"
                  style={{ width: `${metrics.resourceUtilization?.storageUsage || 0}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Process Efficiency */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Process Efficiency Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{(metrics.processEfficiency?.avgResolutionTime || 0).toFixed(0)}m</div>
            <div className="text-sm text-gray-600">Avg Resolution Time</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{(metrics.processEfficiency?.peakLoadCapacity || 0).toFixed(0)}%</div>
            <div className="text-sm text-gray-600">Peak Load Capacity</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">{(metrics.processEfficiency?.educatorUtilization || 0).toFixed(0)}%</div>
            <div className="text-sm text-gray-600">Educator Utilization</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">{(metrics.processEfficiency?.automationRate || 0).toFixed(0)}%</div>
            <div className="text-sm text-gray-600">Automation Rate</div>
          </div>
        </div>
      </div>

      {/* Critical Alerts */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Critical Alerts</h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
        </div>
        <div className="space-y-3">
          {alerts.filter(alert => alert.severity === 'critical' && !alert.resolved).slice(0, 3).map((alert) => (
            <div key={alert.id} className={`p-3 rounded-lg border ${getSeverityColor(alert.severity)}`}>
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{formatDate(alert.timestamp)}</p>
                </div>
                <button className="text-sm text-red-600 hover:text-red-700">
                  Resolve
                </button>
              </div>
            </div>
          ))}
          
          {alerts.filter(alert => alert.severity === 'critical' && !alert.resolved).length === 0 && (
            <div className="text-center py-4 text-gray-500">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <p className="text-sm">No critical alerts at this time</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderPerformance = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
        <p className="text-gray-600">Detailed performance analytics and optimization recommendations.</p>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Response Time Analysis</h4>
            <div className="text-2xl font-bold text-blue-600">{(metrics.systemHealth?.responseTime || 0).toFixed(0)}ms</div>
            <p className="text-sm text-gray-600">Average response time</p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Throughput Analysis</h4>
            <div className="text-2xl font-bold text-green-600">{metrics.systemHealth?.throughput || 0}</div>
            <p className="text-sm text-gray-600">Requests per minute</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCapacity = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Capacity Planning</h3>
        <p className="text-gray-600">Resource utilization and capacity forecasting.</p>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <Server className="w-8 h-8 text-blue-600 mb-2" />
            <h4 className="font-medium text-gray-900">Server Capacity</h4>
            <p className="text-sm text-gray-600">Current utilization and scaling recommendations</p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <Users className="w-8 h-8 text-green-600 mb-2" />
            <h4 className="font-medium text-gray-900">User Load</h4>
            <p className="text-sm text-gray-600">Active users and growth projections</p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <Database className="w-8 h-8 text-purple-600 mb-2" />
            <h4 className="font-medium text-gray-900">Storage</h4>
            <p className="text-sm text-gray-600">Data growth and storage optimization</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderQuality = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quality Metrics</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{(metrics.qualityMetrics?.firstResponseRate || 0).toFixed(1)}%</div>
            <div className="text-sm text-gray-600">First Response Rate</div>
          </div>
          
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">{(metrics.qualityMetrics?.escalationRate || 0).toFixed(1)}%</div>
            <div className="text-sm text-gray-600">Escalation Rate</div>
          </div>
          
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{(metrics.qualityMetrics?.reopenRate || 0).toFixed(1)}%</div>
            <div className="text-sm text-gray-600">Reopen Rate</div>
          </div>
          
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">{(metrics.qualityMetrics?.satisfactionScore || 0).toFixed(1)}</div>
            <div className="text-sm text-gray-600">Satisfaction Score</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAlerts = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">System Alerts</h3>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200">
              All
            </button>
            <button className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200">
              Critical
            </button>
            <button className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200">
              Warning
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  {alert.severity === 'critical' ? (
                    <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  ) : alert.severity === 'warning' ? (
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  ) : (
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{alert.message}</p>
                    <p className="text-sm text-gray-600">Type: {alert.type}</p>
                    <p className="text-xs text-gray-500 mt-1">{formatDate(alert.timestamp)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {alert.resolved ? (
                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                      Resolved
                    </span>
                  ) : (
                    <button className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">
                      Resolve
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
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
              <h1 className="text-2xl font-bold text-gray-900">Operation Management Dashboard</h1>
              <p className="text-gray-600">Monitor system performance, capacity, and operational efficiency</p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="hour">Last Hour</option>
                <option value="day">Last 24 Hours</option>
                <option value="week">Last Week</option>
              </select>
              <button 
                onClick={initializeOperationDashboard}
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
              { id: 'overview', label: 'Overview', icon: Monitor },
              { id: 'performance', label: 'Performance', icon: Zap },
              { id: 'capacity', label: 'Capacity', icon: BarChart3 },
              { id: 'quality', label: 'Quality', icon: Target },
              { id: 'alerts', label: 'Alerts', icon: Bell }
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
                {tab.id === 'alerts' && alerts.filter(a => !a.resolved && a.severity === 'critical').length > 0 && (
                  <span className="bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
                    {alerts.filter(a => !a.resolved && a.severity === 'critical').length}
                  </span>
                )}
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
            <span className="ml-3 text-gray-600">Loading operational data...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error loading data</h3>
                <p className="text-sm text-red-700 mt-1">{error}</p>
                <button
                  onClick={initializeOperationDashboard}
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
            {activeTab === 'performance' && renderPerformance()}
            {activeTab === 'capacity' && renderCapacity()}
            {activeTab === 'quality' && renderQuality()}
            {activeTab === 'alerts' && renderAlerts()}
          </>
        )}
      </div>
    </div>
  );
};

export default OperationManagerDashboard;
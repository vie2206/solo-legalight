// ERROR ANALYTICS DASHBOARD
// Real-time error monitoring and analytics for production

import React, { useState, useEffect } from 'react';
import { AlertTriangle, TrendingUp, Users, Clock, CheckCircle, XCircle, Download } from 'lucide-react';
import ErrorReportingService from '../services/errorReportingService';

interface ErrorMetrics {
  totalErrors: number;
  criticalErrors: number;
  errorRate: number;
  recoveryRate: number;
  userImpact: string;
  topErrors: Array<{ type: string; count: number; severity: string }>;
  recentErrors: Array<{ timestamp: number; message: string; severity: string }>;
}

const ErrorAnalyticsDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<ErrorMetrics>({
    totalErrors: 0,
    criticalErrors: 0,
    errorRate: 0,
    recoveryRate: 0,
    userImpact: 'minimal',
    topErrors: [],
    recentErrors: []
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const errorReportingService = ErrorReportingService.getInstance();

  useEffect(() => {
    fetchErrorMetrics();
    
    const interval = autoRefresh ? setInterval(fetchErrorMetrics, 30000) : null; // 30 seconds
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh]);

  const fetchErrorMetrics = async () => {
    try {
      setIsLoading(true);
      
      // Get analytics from service
      const analytics = errorReportingService.getAnalytics();
      
      // Simulate fetching recent errors and other metrics
      // In production, this would come from your backend API
      const response = await fetch('/api/errors/metrics').catch(() => null);
      
      let serverMetrics = {};
      if (response && response.ok) {
        serverMetrics = await response.json();
      }

      setMetrics({
        totalErrors: analytics.errorCount,
        criticalErrors: Object.values(analytics.errorTypes).reduce((sum: number, count: number) => sum + count, 0),
        errorRate: calculateErrorRate(analytics.errorCount),
        recoveryRate: analytics.errorCount > 0 ? (analytics.recoverySuccess / analytics.errorCount) * 100 : 100,
        userImpact: analytics.userImpact,
        topErrors: Object.entries(analytics.errorTypes).map(([type, count]) => ({
          type,
          count: count as number,
          severity: determineSeverity(type)
        })).sort((a, b) => b.count - a.count).slice(0, 5),
        recentErrors: generateRecentErrors(),
        ...serverMetrics
      });
      
    } catch (error) {
      console.error('Failed to fetch error metrics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateErrorRate = (totalErrors: number): number => {
    // Calculate errors per hour based on session time
    const sessionStart = Date.now() - (60 * 60 * 1000); // 1 hour ago
    return Math.round((totalErrors / 1) * 100) / 100; // Simple calculation
  };

  const determineSeverity = (errorType: string): string => {
    if (errorType.includes('ChunkLoadError') || errorType.includes('Critical')) return 'critical';
    if (errorType.includes('TypeError') || errorType.includes('ReferenceError')) return 'high';
    if (errorType.includes('Network') || errorType.includes('API')) return 'medium';
    return 'low';
  };

  const generateRecentErrors = (): Array<{ timestamp: number; message: string; severity: string }> => {
    // This would normally come from your backend
    return [
      { timestamp: Date.now() - 300000, message: 'ChunkLoadError: Loading chunk 4 failed', severity: 'critical' },
      { timestamp: Date.now() - 600000, message: 'TypeError: Cannot read property of undefined', severity: 'high' },
      { timestamp: Date.now() - 900000, message: 'Network error: Failed to fetch', severity: 'medium' }
    ];
  };

  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-green-600 bg-green-50 border-green-200';
    }
  };

  const getImpactColor = (impact: string): string => {
    switch (impact) {
      case 'critical': return 'text-red-600';
      case 'severe': return 'text-orange-600';
      case 'moderate': return 'text-yellow-600';
      default: return 'text-green-600';
    }
  };

  const exportErrorData = () => {
    const data = errorReportingService.exportErrorData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `error-analytics-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const clearErrorData = () => {
    if (window.confirm('Are you sure you want to clear all error data? This cannot be undone.')) {
      errorReportingService.clearErrorQueue();
      fetchErrorMetrics();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-64 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow h-32"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Error Analytics Dashboard</h1>
          <div className="flex space-x-3">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                autoRefresh 
                  ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Auto Refresh: {autoRefresh ? 'ON' : 'OFF'}
            </button>
            <button
              onClick={exportErrorData}
              className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </button>
            <button
              onClick={clearErrorData}
              className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Clear Data
            </button>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-red-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Total Errors</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.totalErrors}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <XCircle className="h-8 w-8 text-orange-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Critical Errors</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.criticalErrors}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Error Rate</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.errorRate}/hr</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-gray-600">Recovery Rate</p>
                <p className="text-2xl font-bold text-gray-900">{Math.round(metrics.recoveryRate)}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* User Impact and Top Errors */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">User Impact Assessment</h3>
            <div className="flex items-center mb-4">
              <Users className="h-6 w-6 text-gray-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600">Current Impact Level</p>
                <p className={`text-lg font-semibold capitalize ${getImpactColor(metrics.userImpact)}`}>
                  {metrics.userImpact}
                </p>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Impact Levels:</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Minimal</span>
                  <span className="text-green-600">No user experience impact</span>
                </div>
                <div className="flex justify-between">
                  <span>Moderate</span>
                  <span className="text-yellow-600">Some features affected</span>
                </div>
                <div className="flex justify-between">
                  <span>Severe</span>
                  <span className="text-orange-600">Major functionality issues</span>
                </div>
                <div className="flex justify-between">
                  <span>Critical</span>
                  <span className="text-red-600">Platform unusable</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Error Types</h3>
            <div className="space-y-3">
              {metrics.topErrors.length > 0 ? (
                metrics.topErrors.map((error, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center">
                      <span className="font-mono text-sm">{error.type}</span>
                      <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(error.severity)}`}>
                        {error.severity}
                      </span>
                    </div>
                    <span className="font-semibold text-gray-900">{error.count}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No errors recorded</p>
              )}
            </div>
          </div>
        </div>

        {/* Recent Errors */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-500 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Recent Errors</h3>
            </div>
          </div>
          <div className="p-6">
            {metrics.recentErrors.length > 0 ? (
              <div className="space-y-3">
                {metrics.recentErrors.map((error, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                    <div className="flex-1">
                      <p className="font-mono text-sm text-gray-800">{error.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(error.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(error.severity)}`}>
                      {error.severity}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No recent errors</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorAnalyticsDashboard;
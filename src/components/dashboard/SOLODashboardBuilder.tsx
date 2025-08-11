import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  BookOpen,
  Brain,
  Trophy,
  Calendar,
  Clock,
  Target,
  Zap,
  Star,
  Award,
  GraduationCap,
  Scale,
  FileText,
  Search,
  Filter,
  MoreHorizontal,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  PieChart,
  LineChart,
  BarChart,
  ChevronRight,
  Eye,
  Download,
  Share
} from 'lucide-react';
import { soloStyles, soloTheme } from '../shared/SOLODesignSystem';
import SOLOAIIcon from '../icons/SOLOAIIcons';

interface DashboardCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
    period: string;
  };
  icon: React.ElementType;
  aiIcon?: string;
  color: string;
  description?: string;
  trend?: number[];
  className?: string;
}

interface PerformanceMetric {
  id: string;
  category: string;
  current: number;
  target: number;
  improvement: number;
  color: string;
  icon: React.ElementType;
}

interface RecentActivity {
  id: string;
  type: 'completion' | 'achievement' | 'recommendation' | 'assessment';
  title: string;
  description: string;
  timestamp: string;
  icon: React.ElementType;
  color: string;
}

interface StudyInsight {
  id: string;
  title: string;
  insight: string;
  recommendation: string;
  priority: 'high' | 'medium' | 'low';
  aiGenerated: boolean;
}

const SOLODashboardBuilder: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [activeView, setActiveView] = useState('overview');

  // Performance metrics data
  const performanceMetrics: PerformanceMetric[] = [
    {
      id: 'legal-reasoning',
      category: 'Legal Reasoning',
      current: 87,
      target: 90,
      improvement: 12,
      color: 'bg-blue-500',
      icon: Scale
    },
    {
      id: 'constitutional-law',
      category: 'Constitutional Law',
      current: 92,
      target: 95,
      improvement: 8,
      color: 'bg-purple-500',
      icon: BookOpen
    },
    {
      id: 'current-affairs',
      category: 'Current Affairs',
      current: 78,
      target: 85,
      improvement: 15,
      color: 'bg-green-500',
      icon: TrendingUp
    },
    {
      id: 'english-comprehension',
      category: 'English Comprehension',
      current: 84,
      target: 88,
      improvement: 6,
      color: 'bg-orange-500',
      icon: FileText
    }
  ];

  // Recent activity data
  const recentActivities: RecentActivity[] = [
    {
      id: 'activity-1',
      type: 'completion',
      title: 'Constitutional Law Quiz Completed',
      description: 'Scored 94% on Fundamental Rights assessment',
      timestamp: '2 hours ago',
      icon: Trophy,
      color: 'text-green-600'
    },
    {
      id: 'activity-2',
      type: 'achievement',
      title: 'Study Streak Achievement',
      description: '7-day consistent study streak unlocked',
      timestamp: '4 hours ago',
      icon: Award,
      color: 'text-purple-600'
    },
    {
      id: 'activity-3',
      type: 'recommendation',
      title: 'AI Study Recommendation',
      description: 'Focus on Contract Law - performance gap identified',
      timestamp: '6 hours ago',
      icon: Brain,
      color: 'text-blue-600'
    },
    {
      id: 'activity-4',
      type: 'assessment',
      title: 'Weekly Performance Review',
      description: 'Overall improvement of 12% detected this week',
      timestamp: '1 day ago',
      icon: BarChart3,
      color: 'text-orange-600'
    }
  ];

  // AI-generated study insights
  const studyInsights: StudyInsight[] = [
    {
      id: 'insight-1',
      title: 'Constitutional Law Mastery',
      insight: 'Your performance in fundamental rights has improved significantly (+18% this week)',
      recommendation: 'Focus on directive principles to maintain momentum',
      priority: 'high',
      aiGenerated: true
    },
    {
      id: 'insight-2',
      title: 'Legal Reasoning Patterns',
      insight: 'Strong logical deduction skills, but struggling with analogical reasoning',
      recommendation: 'Practice case-based reasoning questions for 30 minutes daily',
      priority: 'medium',
      aiGenerated: true
    },
    {
      id: 'insight-3',
      title: 'Study Time Optimization',
      insight: 'Peak performance observed during 10 AM - 12 PM sessions',
      recommendation: 'Schedule most challenging topics during your optimal hours',
      priority: 'low',
      aiGenerated: true
    }
  ];

  const DashboardCard: React.FC<DashboardCardProps> = ({
    title,
    value,
    change,
    icon: Icon,
    aiIcon,
    color,
    description,
    trend,
    className
  }) => (
    <div className={`${soloStyles.card.base} ${className}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-8 h-8 ${color} rounded-lg flex items-center justify-center`}>
              <Icon className="w-4 h-4 text-white" />
            </div>
            {aiIcon && (
              <div className="bg-purple-100 px-2 py-1 rounded">
                <SOLOAIIcon name={aiIcon} size="small" />
              </div>
            )}
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
          <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
          {description && (
            <p className="text-sm text-gray-500 mb-2">{description}</p>
          )}
          {change && (
            <div className={`flex items-center gap-1 text-sm ${
              change.type === 'increase' ? 'text-green-600' : 'text-red-600'
            }`}>
              {change.type === 'increase' ? (
                <ArrowUpRight className="w-4 h-4" />
              ) : (
                <ArrowDownRight className="w-4 h-4" />
              )}
              <span>{Math.abs(change.value)}% vs {change.period}</span>
            </div>
          )}
        </div>
        
        {trend && (
          <div className="w-20 h-12">
            <div className="flex items-end h-full gap-1">
              {trend.map((point, index) => (
                <div
                  key={index}
                  className={`${color} rounded-sm opacity-70 flex-1`}
                  style={{ height: `${point}%` }}
                />
              ))}
            </div>
          </div>
        )}
        
        <button className="p-1 hover:bg-gray-100 rounded">
          <MoreHorizontal className="w-4 h-4 text-gray-400" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Dashboard Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-blue-100">
        <div className={soloStyles.container}>
          <div className="py-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <SOLOAIIcon name="ai-analytics" size="large" theme="light" className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 font-heading">
                    SOLO Analytics Dashboard
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Comprehensive insights into your legal education journey
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/80"
                >
                  <option value="day">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
                
                <button className={`${soloStyles.button.secondary} flex items-center gap-2`}>
                  <Download className="w-4 h-4" />
                  Export
                </button>
                
                <button className={`${soloStyles.button.primary} flex items-center gap-2`}>
                  <Share className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              {['overview', 'performance', 'insights', 'activity'].map((view) => (
                <button
                  key={view}
                  onClick={() => setActiveView(view)}
                  className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-colors ${
                    activeView === view
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {view}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className={soloStyles.container}>
        <div className="py-8">
          {activeView === 'overview' && (
            <div className="space-y-8">
              {/* Key Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <DashboardCard
                  title="Overall Progress"
                  value="87%"
                  change={{ value: 12, type: 'increase', period: 'last month' }}
                  icon={TrendingUp}
                  aiIcon="ai-progress"
                  color="bg-blue-500"
                  trend={[40, 65, 52, 78, 85, 87, 92]}
                />
                
                <DashboardCard
                  title="Study Hours"
                  value="124"
                  change={{ value: 8, type: 'increase', period: 'last week' }}
                  icon={Clock}
                  color="bg-green-500"
                  description="This month"
                  trend={[30, 45, 38, 52, 60, 55, 70]}
                />
                
                <DashboardCard
                  title="Rank Prediction"
                  value="AIR 245"
                  change={{ value: 15, type: 'increase', period: 'projected' }}
                  icon={Trophy}
                  aiIcon="ai-recommendation"
                  color="bg-purple-500"
                  description="Based on current performance"
                />
                
                <DashboardCard
                  title="Achievements"
                  value="23"
                  change={{ value: 4, type: 'increase', period: 'this week' }}
                  icon={Award}
                  color="bg-orange-500"
                  description="Milestones unlocked"
                  trend={[20, 18, 22, 19, 21, 23, 23]}
                />
              </div>

              {/* Performance Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Subject-wise Performance */}
                <div className={soloStyles.card.base}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Subject Performance</h3>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View Details
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {performanceMetrics.map((metric) => {
                      const Icon = metric.icon;
                      return (
                        <div key={metric.id} className="flex items-center gap-4">
                          <div className={`w-10 h-10 ${metric.color} rounded-lg flex items-center justify-center`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-medium text-gray-900">{metric.category}</span>
                              <span className="text-sm text-gray-600">{metric.current}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                              <div
                                className={`h-full ${metric.color} transition-all duration-500`}
                                style={{ width: `${metric.current}%` }}
                              />
                            </div>
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-xs text-gray-500">Target: {metric.target}%</span>
                              <span className="text-xs text-green-600">+{metric.improvement}% improved</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className={soloStyles.card.base}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      View All
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {recentActivities.map((activity) => {
                      const Icon = activity.icon;
                      return (
                        <div key={activity.id} className="flex items-start gap-3">
                          <div className={`w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center`}>
                            <Icon className={`w-4 h-4 ${activity.color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900">{activity.title}</p>
                            <p className="text-sm text-gray-500 mt-1">{activity.description}</p>
                            <p className="text-xs text-gray-400 mt-1">{activity.timestamp}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* AI Study Insights */}
              <div className={soloStyles.card.ai}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <SOLOAIIcon name="ai-recommendation" size="medium" theme="light" className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">AI Study Insights</h3>
                    <p className="text-sm text-gray-600">Personalized recommendations based on your performance</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {studyInsights.map((insight) => (
                    <div key={insight.id} className="bg-white rounded-lg p-4 border border-blue-100">
                      <div className="flex items-center gap-2 mb-3">
                        <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          insight.priority === 'high' ? 'bg-red-100 text-red-700' :
                          insight.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {insight.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{insight.insight}</p>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-sm font-medium text-blue-900 mb-1">Recommendation:</p>
                        <p className="text-sm text-blue-700">{insight.recommendation}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {activeView === 'performance' && (
            <div className="space-y-8">
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Detailed Performance Analytics</h3>
                <p className="text-gray-600">Coming soon - Advanced performance charts and analytics</p>
              </div>
            </div>
          )}
          
          {activeView === 'insights' && (
            <div className="space-y-8">
              <div className="text-center py-12">
                <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Insights</h3>
                <p className="text-gray-600">Deep learning analytics and personalized recommendations</p>
              </div>
            </div>
          )}
          
          {activeView === 'activity' && (
            <div className="space-y-8">
              <div className="text-center py-12">
                <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Activity Timeline</h3>
                <p className="text-gray-600">Detailed activity log and study patterns</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SOLODashboardBuilder;
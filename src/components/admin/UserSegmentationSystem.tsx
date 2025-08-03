import React, { useState } from 'react';
import { 
  Users, Filter, Target, BarChart3, TrendingUp, Settings,
  Plus, Edit, Trash2, Eye, Search, Download, Upload,
  RefreshCw, User, Building, GraduationCap, Award,
  Clock, Calendar, BookOpen, Zap, AlertCircle,
  CheckCircle, XCircle, ArrowUpIcon, ArrowDownIcon,
  Globe, Brain, Trophy, Star, Flag
} from 'lucide-react';

interface UserSegmentationSystemProps {}

interface UserSegment {
  id: string;
  name: string;
  description: string;
  criteria: {
    performance?: {
      minScore?: number;
      maxScore?: number;
      testsCompleted?: number;
      averageTime?: number;
    };
    engagement?: {
      loginFrequency?: 'daily' | 'weekly' | 'monthly';
      studyHours?: number;
      socialActivity?: number;
    };
    demographics?: {
      institute?: string[];
      subscriptionType?: 'free' | 'premium' | 'elite';
      registrationDate?: {
        from: string;
        to: string;
      };
    };
    behavioral?: {
      preferredSubjects?: string[];
      studyPattern?: 'morning' | 'afternoon' | 'evening' | 'night';
      deviceType?: 'mobile' | 'desktop' | 'tablet';
    };
  };
  userCount: number;
  growthRate: number;
  averagePerformance: number;
  retentionRate: number;
  conversionRate: number;
  revenueContribution: number;
  targetActions: string[];
  automationRules: Array<{
    trigger: string;
    action: string;
    enabled: boolean;
  }>;
  createdBy: string;
  createdDate: string;
  lastUpdated: string;
  status: 'active' | 'inactive' | 'draft';
  priority: 'high' | 'medium' | 'low';
}

interface SegmentInsights {
  segmentId: string;
  insights: Array<{
    type: 'opportunity' | 'risk' | 'trend';
    title: string;
    description: string;
    impact: 'high' | 'medium' | 'low';
    actionRequired: boolean;
  }>;
  recommendations: Array<{
    title: string;
    description: string;
    priority: 'high' | 'medium' | 'low';
    estimatedImpact: string;
  }>;
}

const UserSegmentationSystem: React.FC<UserSegmentationSystemProps> = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'segments' | 'analytics' | 'automation' | 'insights'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingSegment, setEditingSegment] = useState<UserSegment | null>(null);

  // Mock data
  const userSegments: UserSegment[] = [
    {
      id: '1',
      name: 'High Performers',
      description: 'Students consistently scoring above 85% with regular engagement',
      criteria: {
        performance: {
          minScore: 85,
          testsCompleted: 10
        },
        engagement: {
          loginFrequency: 'daily',
          studyHours: 3
        }
      },
      userCount: 342,
      growthRate: 12.3,
      averagePerformance: 89.2,
      retentionRate: 94.7,
      conversionRate: 76.8,
      revenueContribution: 45.2,
      targetActions: ['Advanced courses', 'Mentorship programs', 'Competition prep'],
      automationRules: [
        { trigger: 'Achievement unlocked', action: 'Send advanced course recommendation', enabled: true },
        { trigger: 'Study streak > 30 days', action: 'Offer mentorship program', enabled: true }
      ],
      createdBy: 'Admin User',
      createdDate: '2024-01-15',
      lastUpdated: '2024-07-25',
      status: 'active',
      priority: 'high'
    },
    {
      id: '2',
      name: 'Struggling Students',
      description: 'Students with scores below 60% who need additional support',
      criteria: {
        performance: {
          maxScore: 60,
          testsCompleted: 3
        },
        engagement: {
          loginFrequency: 'weekly'
        }
      },
      userCount: 189,
      growthRate: -5.2,
      averagePerformance: 52.1,
      retentionRate: 67.3,
      conversionRate: 23.4,
      revenueContribution: 8.7,
      targetActions: ['Remedial courses', 'One-on-one tutoring', 'Basic skill building'],
      automationRules: [
        { trigger: 'Score < 50% on test', action: 'Trigger support intervention', enabled: true },
        { trigger: 'No login for 7 days', action: 'Send motivational email', enabled: true }
      ],
      createdBy: 'Student Success Manager',
      createdDate: '2024-02-10',
      lastUpdated: '2024-07-22',
      status: 'active',
      priority: 'high'
    },
    {
      id: '3',
      name: 'Premium Prospects',
      description: 'Free tier users showing high engagement, likely to convert',
      criteria: {
        demographics: {
          subscriptionType: 'free'
        },
        engagement: {
          loginFrequency: 'daily',
          studyHours: 2
        },
        performance: {
          minScore: 70
        }
      },
      userCount: 567,
      growthRate: 18.7,
      averagePerformance: 76.4,
      retentionRate: 82.1,
      conversionRate: 42.3,
      revenueContribution: 0,
      targetActions: ['Premium trial offers', 'Feature highlights', 'Success stories'],
      automationRules: [
        { trigger: 'Study hours > 20/week', action: 'Show premium upgrade popup', enabled: true },
        { trigger: 'Test score > 80%', action: 'Send premium benefits email', enabled: true }
      ],
      createdBy: 'Marketing Manager',
      createdDate: '2024-03-05',
      lastUpdated: '2024-07-26',
      status: 'active',
      priority: 'medium'
    },
    {
      id: '4',
      name: 'Elite Subscribers',
      description: 'Premium users utilizing advanced features extensively',
      criteria: {
        demographics: {
          subscriptionType: 'elite'
        },
        engagement: {
          loginFrequency: 'daily',
          studyHours: 4,
          socialActivity: 5
        }
      },
      userCount: 123,
      growthRate: 8.9,
      averagePerformance: 87.6,
      retentionRate: 96.2,
      conversionRate: 100,
      revenueContribution: 32.1,
      targetActions: ['Exclusive content', 'VIP support', 'Early access features'],
      automationRules: [
        { trigger: 'Monthly usage > 100 hours', action: 'Offer VIP concierge service', enabled: true },
        { trigger: 'Referral made', action: 'Send exclusive rewards', enabled: true }
      ],
      createdBy: 'Product Manager',
      createdDate: '2024-01-30',
      lastUpdated: '2024-07-24',
      status: 'active',
      priority: 'high'
    },
    {
      id: '5',
      name: 'At-Risk Users',
      description: 'Users showing declining engagement and performance',
      criteria: {
        engagement: {
          loginFrequency: 'monthly'
        },
        behavioral: {
          studyPattern: 'evening'
        }
      },
      userCount: 234,
      growthRate: -12.4,
      averagePerformance: 58.3,
      retentionRate: 45.6,
      conversionRate: 15.2,
      revenueContribution: 5.8,
      targetActions: ['Re-engagement campaigns', 'Personalized support', 'Incentive programs'],
      automationRules: [
        { trigger: 'No login for 14 days', action: 'Send win-back email series', enabled: true },
        { trigger: 'Performance decline > 20%', action: 'Assign success coach', enabled: false }
      ],
      createdBy: 'Retention Specialist',
      createdDate: '2024-04-12',
      lastUpdated: '2024-07-20',
      status: 'active',
      priority: 'high'
    }
  ];

  const overallStats = {
    totalSegments: userSegments.length,
    activeSegments: userSegments.filter(s => s.status === 'active').length,
    totalUsers: userSegments.reduce((sum, segment) => sum + segment.userCount, 0),
    averageConversionRate: userSegments.reduce((sum, segment) => sum + segment.conversionRate, 0) / userSegments.length,
    averageRetentionRate: userSegments.reduce((sum, segment) => sum + segment.retentionRate, 0) / userSegments.length,
    totalRevenue: userSegments.reduce((sum, segment) => sum + segment.revenueContribution, 0),
    highestGrowthSegment: userSegments.reduce((max, segment) => segment.growthRate > max.growthRate ? segment : max, userSegments[0]),
    automatedActions: userSegments.reduce((sum, segment) => sum + segment.automationRules.filter(rule => rule.enabled).length, 0)
  };

  const segmentInsights: SegmentInsights[] = [
    {
      segmentId: '1',
      insights: [
        {
          type: 'opportunity',
          title: 'High Performers Ready for Advanced Content',
          description: '68% of high performers have completed all current advanced modules',
          impact: 'high',
          actionRequired: true
        },
        {
          type: 'trend',
          title: 'Increasing Social Engagement',
          description: 'High performers are 3x more likely to participate in study groups',
          impact: 'medium',
          actionRequired: false
        }
      ],
      recommendations: [
        {
          title: 'Launch Expert-Level Courses',
          description: 'Create specialized courses for constitutional law and advanced reasoning',
          priority: 'high',
          estimatedImpact: '+15% retention'
        },
        {
          title: 'Implement Peer Mentoring',
          description: 'Allow high performers to mentor struggling students',
          priority: 'medium',
          estimatedImpact: '+20% engagement'
        }
      ]
    },
    {
      segmentId: '2',
      insights: [
        {
          type: 'risk',
          title: 'High Churn Risk in Struggling Students',
          description: '45% of struggling students haven\'t logged in for 7+ days',
          impact: 'high',
          actionRequired: true
        },
        {
          type: 'opportunity',
          title: 'Responsive to Personalized Support',
          description: 'Students who received 1-on-1 coaching showed 40% improvement',
          impact: 'high',
          actionRequired: true
        }
      ],
      recommendations: [
        {
          title: 'Implement Adaptive Learning Paths',
          description: 'Create personalized study plans based on individual weaknesses',
          priority: 'high',
          estimatedImpact: '+25% score improvement'
        },
        {
          title: 'Early Warning System',
          description: 'Automated alerts for students at risk of dropping out',
          priority: 'high',
          estimatedImpact: '+30% retention'
        }
      ]
    }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Segments</p>
              <p className="text-3xl font-bold">{overallStats.totalSegments}</p>
              <p className="text-blue-100 text-sm mt-1">{overallStats.activeSegments} active</p>
            </div>
            <Filter className="w-12 h-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Segmented Users</p>
              <p className="text-3xl font-bold">{overallStats.totalUsers.toLocaleString()}</p>
              <p className="text-green-100 text-sm mt-1">across all segments</p>
            </div>
            <Users className="w-12 h-12 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Avg Conversion</p>
              <p className="text-3xl font-bold">{overallStats.averageConversionRate.toFixed(1)}%</p>
              <p className="text-purple-100 text-sm mt-1">across segments</p>
            </div>
            <Target className="w-12 h-12 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Automated Actions</p>
              <p className="text-3xl font-bold">{overallStats.automatedActions}</p>
              <p className="text-orange-100 text-sm mt-1">rules active</p>
            </div>
            <Zap className="w-12 h-12 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Segment Performance Overview */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-6 flex items-center">
          <BarChart3 className="w-6 h-6 mr-2 text-indigo-600" />
          Segment Performance Overview
        </h3>
        
        <div className="space-y-4">
          {userSegments.map((segment, index) => (
            <div key={segment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full mr-3 ${
                    segment.priority === 'high' ? 'bg-red-500' :
                    segment.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <h4 className="font-semibold text-gray-900">{segment.name}</h4>
                  <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                    segment.status === 'active' ? 'bg-green-100 text-green-800' :
                    segment.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {segment.status}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{segment.userCount} users</span>
                  <div className={`flex items-center px-2 py-1 rounded-full text-xs ${
                    segment.growthRate > 0 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {segment.growthRate > 0 ? <ArrowUpIcon className="w-3 h-3 mr-1" /> : <ArrowDownIcon className="w-3 h-3 mr-1" />}
                    {Math.abs(segment.growthRate)}%
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-3">{segment.description}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Performance</p>
                  <p className="font-semibold text-gray-900">{segment.averagePerformance}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Retention</p>
                  <p className="font-semibold text-green-600">{segment.retentionRate}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Conversion</p>
                  <p className="font-semibold text-blue-600">{segment.conversionRate}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Revenue</p>
                  <p className="font-semibold text-purple-600">{segment.revenueContribution}%</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Insights */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-6 flex items-center">
          <Brain className="w-6 h-6 mr-2 text-purple-600" />
          Key Insights & Recommendations
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {segmentInsights.slice(0, 2).map((insight, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="space-y-3">
                {insight.insights.slice(0, 2).map((item, idx) => (
                  <div key={idx} className={`flex items-start p-3 rounded-lg ${
                    item.type === 'opportunity' ? 'bg-green-50 border border-green-200' :
                    item.type === 'risk' ? 'bg-red-50 border border-red-200' :
                    'bg-blue-50 border border-blue-200'
                  }`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                      item.type === 'opportunity' ? 'bg-green-500' :
                      item.type === 'risk' ? 'bg-red-500' : 'bg-blue-500'
                    }`}>
                      {item.type === 'opportunity' ? <TrendingUp className="w-3 h-3 text-white" /> :
                       item.type === 'risk' ? <AlertCircle className="w-3 h-3 text-white" /> :
                       <BarChart3 className="w-3 h-3 text-white" />}
                    </div>
                    <div className="flex-1">
                      <h5 className="font-semibold text-gray-900 mb-1">{item.title}</h5>
                      <p className="text-sm text-gray-600">{item.description}</p>
                      {item.actionRequired && (
                        <span className="inline-flex items-center px-2 py-1 mt-2 text-xs font-medium rounded-full bg-orange-100 text-orange-800">
                          Action Required
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-6 flex items-center">
          <Zap className="w-6 h-6 mr-2 text-yellow-600" />
          Quick Actions
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button 
            onClick={() => setShowCreateModal(true)}
            className="p-4 border-2 border-dashed border-indigo-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors text-center"
          >
            <Plus className="w-8 h-8 mx-auto mb-2 text-indigo-500" />
            <p className="font-medium text-indigo-700">Create Segment</p>
          </button>
          
          <button className="p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors text-center">
            <Target className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <p className="font-medium text-green-700">Run Campaign</p>
          </button>
          
          <button className="p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors text-center">
            <BarChart3 className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <p className="font-medium text-purple-700">View Analytics</p>
          </button>
          
          <button className="p-4 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors text-center">
            <Settings className="w-8 h-8 mx-auto mb-2 text-orange-600" />
            <p className="font-medium text-orange-700">Automation Rules</p>
          </button>
        </div>
      </div>
    </div>
  );

  const renderSegmentsList = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search segments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="draft">Draft</option>
          </select>
          
          <select 
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Priority</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
          
          <button 
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Segment
          </button>
        </div>
      </div>

      {/* Segments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {userSegments.map((segment) => (
          <div key={segment.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h3 className="font-bold text-gray-900 mr-3">{segment.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    segment.priority === 'high' ? 'bg-red-100 text-red-800' :
                    segment.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {segment.priority} priority
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{segment.description}</p>
              </div>
              <div className="flex space-x-1 ml-4">
                <button className="text-blue-600 hover:text-blue-800">
                  <Eye className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setEditingSegment(segment)}
                  className="text-green-600 hover:text-green-800"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button className="text-red-600 hover:text-red-800">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">User Count</p>
                <p className="font-semibold text-gray-900">{segment.userCount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Growth Rate</p>
                <div className={`flex items-center ${
                  segment.growthRate > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {segment.growthRate > 0 ? <ArrowUpIcon className="w-3 h-3 mr-1" /> : <ArrowDownIcon className="w-3 h-3 mr-1" />}
                  <span className="font-semibold">{Math.abs(segment.growthRate)}%</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Retention Rate</p>
                <p className="font-semibold text-green-600">{segment.retentionRate}%</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Conversion Rate</p>
                <p className="font-semibold text-blue-600">{segment.conversionRate}%</p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Target Actions</p>
              <div className="flex flex-wrap gap-1">
                {segment.targetActions.slice(0, 2).map((action, index) => (
                  <span key={index} className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full">
                    {action}
                  </span>
                ))}
                {segment.targetActions.length > 2 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{segment.targetActions.length - 2} more
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  segment.status === 'active' ? 'bg-green-100 text-green-800' :
                  segment.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {segment.status === 'active' ? <CheckCircle className="w-3 h-3 mr-1" /> :
                   segment.status === 'inactive' ? <XCircle className="w-3 h-3 mr-1" /> :
                   <Clock className="w-3 h-3 mr-1" />}
                  {segment.status}
                </span>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Active Rules</p>
                <p className="font-semibold text-orange-600">
                  {segment.automationRules.filter(rule => rule.enabled).length}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">🎯 User Segmentation System</h2>
          <p className="text-gray-600">Advanced user segmentation for targeted engagement and personalized experiences</p>
        </div>
        
        <div className="flex flex-wrap gap-3 mt-4 lg:mt-0">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center">
            <Upload className="w-4 h-4 mr-2" />
            Import Rules
          </button>
          
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </button>
          
          <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'segments', label: 'Segments', icon: Filter },
          { id: 'analytics', label: 'Analytics', icon: TrendingUp },
          { id: 'automation', label: 'Automation', icon: Zap },
          { id: 'insights', label: 'Insights', icon: Brain }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <tab.icon className="w-4 h-4 mr-2" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'segments' && renderSegmentsList()}
      
      {activeTab === 'analytics' && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-bold mb-4">Segment Analytics Dashboard</h3>
          <p className="text-gray-600">Advanced analytics and performance metrics for all user segments would be displayed here.</p>
        </div>
      )}
      
      {activeTab === 'automation' && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-bold mb-4">Automation Rules Management</h3>
          <p className="text-gray-600">Configure automated actions and triggers based on user behavior and segment criteria would be implemented here.</p>
        </div>
      )}
      
      {activeTab === 'insights' && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-bold mb-4">AI-Powered Insights</h3>
          <p className="text-gray-600">Machine learning insights and recommendations for segment optimization would be displayed here.</p>
        </div>
      )}
    </div>
  );
};

export default UserSegmentationSystem;
import React, { useState } from 'react';
import { 
  TrendingUp, Users, Clock, Target, Award, BarChart3, 
  Calendar, Filter, Download, RefreshCw, Eye, 
  ArrowUpIcon, ArrowDownIcon, BookOpen, Brain,
  Zap, Trophy, Activity, PieChart
} from 'lucide-react';

interface WeeklyInsightsAnalyticsProps {}

interface StudentMetrics {
  studyHours: number;
  testsCompleted: number;
  accuracyRate: number;
  improvement: number;
  streakDays: number;
  xpGained: number;
}

interface WeeklyData {
  weekOf: string;
  totalStudents: number;
  activeStudents: number;
  avgStudyTime: number;
  completionRate: number;
  engagementScore: number;
  topPerformers: Array<{
    name: string;
    score: number;
    improvement: number;
  }>;
}

interface SubjectPerformance {
  subject: string;
  avgScore: number;
  completion: number;
  difficulty: number;
  improvement: number;
}

const WeeklyInsightsAnalytics: React.FC<WeeklyInsightsAnalyticsProps> = () => {
  const [selectedWeek, setSelectedWeek] = useState('current');
  const [viewMode, setViewMode] = useState<'overview' | 'detailed' | 'comparative'>('overview');
  const [filterBy, setFilterBy] = useState<'all' | 'premium' | 'free'>('all');

  // Mock data
  const weeklyData: WeeklyData = {
    weekOf: 'July 22-28, 2024',
    totalStudents: 1247,
    activeStudents: 892,
    avgStudyTime: 4.2,
    completionRate: 73.5,
    engagementScore: 8.2,
    topPerformers: [
      { name: 'Raj Patel', score: 97, improvement: 12 },
      { name: 'Priya Sharma', score: 95, improvement: 8 },
      { name: 'Arjun Kumar', score: 94, improvement: 15 }
    ]
  };

  const subjectPerformance: SubjectPerformance[] = [
    { subject: 'Legal Reasoning', avgScore: 78.5, completion: 85, difficulty: 7.2, improvement: 5.2 },
    { subject: 'Logical Reasoning', avgScore: 82.1, completion: 90, difficulty: 6.8, improvement: 3.8 },
    { subject: 'Reading Comprehension', avgScore: 75.3, completion: 78, difficulty: 8.1, improvement: -1.2 },
    { subject: 'General Knowledge', avgScore: 71.2, completion: 92, difficulty: 5.5, improvement: 8.5 },
    { subject: 'Quantitative Techniques', avgScore: 69.8, completion: 65, difficulty: 8.7, improvement: 2.1 }
  ];

  const insightCategories = [
    {
      title: 'Study Patterns',
      icon: Clock,
      insights: [
        'Peak study hours: 7-9 PM (67% of sessions)',
        'Weekend activity up 23% from last week',
        'Mobile usage increased by 15%'
      ]
    },
    {
      title: 'Performance Trends',
      icon: TrendingUp,
      insights: [
        'Overall accuracy improved by 4.2%',
        'Legal Reasoning shows strongest growth',
        'Reading speed increased by 18 WPM average'
      ]
    },
    {
      title: 'Engagement Metrics',
      icon: Activity,
      insights: [
        'Social features usage up 35%',
        'Challenge participation increased 28%',
        'Discussion forum posts up 42%'
      ]
    },
    {
      title: 'Achievement Unlocks',
      icon: Trophy,
      insights: [
        '156 students earned "Study Streak" badges',
        '89 new "Speed Reader" achievements',
        '234 students reached new XP levels'
      ]
    }
  ];

  const renderOverviewCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm">Active Students</p>
            <p className="text-3xl font-bold">{weeklyData.activeStudents.toLocaleString()}</p>
            <div className="flex items-center mt-1">
              <ArrowUpIcon className="w-4 h-4 mr-1" />
              <span className="text-sm">+12% from last week</span>
            </div>
          </div>
          <Users className="w-12 h-12 text-blue-200" />
        </div>
      </div>

      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm">Avg Study Time</p>
            <p className="text-3xl font-bold">{weeklyData.avgStudyTime}h</p>
            <div className="flex items-center mt-1">
              <ArrowUpIcon className="w-4 h-4 mr-1" />
              <span className="text-sm">+0.3h from last week</span>
            </div>
          </div>
          <Clock className="w-12 h-12 text-green-200" />
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-100 text-sm">Completion Rate</p>
            <p className="text-3xl font-bold">{weeklyData.completionRate}%</p>
            <div className="flex items-center mt-1">
              <ArrowUpIcon className="w-4 h-4 mr-1" />
              <span className="text-sm">+2.1% improvement</span>
            </div>
          </div>
          <Target className="w-12 h-12 text-purple-200" />
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-orange-100 text-sm">Engagement Score</p>
            <p className="text-3xl font-bold">{weeklyData.engagementScore}/10</p>
            <div className="flex items-center mt-1">
              <ArrowUpIcon className="w-4 h-4 mr-1" />
              <span className="text-sm">+0.4 from last week</span>
            </div>
          </div>
          <Zap className="w-12 h-12 text-orange-200" />
        </div>
      </div>
    </div>
  );

  const renderSubjectPerformance = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h3 className="text-xl font-bold mb-6 flex items-center">
        <BarChart3 className="w-6 h-6 mr-2 text-indigo-600" />
        Subject-wise Performance Analysis
      </h3>
      
      <div className="space-y-4">
        {subjectPerformance.map((subject, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-900">{subject.subject}</h4>
              <div className={`flex items-center px-2 py-1 rounded-full text-sm ${
                subject.improvement > 0 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {subject.improvement > 0 ? <ArrowUpIcon className="w-3 h-3 mr-1" /> : <ArrowDownIcon className="w-3 h-3 mr-1" />}
                {Math.abs(subject.improvement)}%
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Average Score</p>
                <div className="flex items-center">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${subject.avgScore}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{subject.avgScore}%</span>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Completion Rate</p>
                <div className="flex items-center">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${subject.completion}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{subject.completion}%</span>
                </div>
              </div>
              
              <div>
                <p className="text-sm text-gray-600">Difficulty Rating</p>
                <div className="flex items-center">
                  <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full"
                      style={{ width: `${(subject.difficulty / 10) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{subject.difficulty}/10</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderInsights = () => (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h3 className="text-xl font-bold mb-6 flex items-center">
        <Brain className="w-6 h-6 mr-2 text-purple-600" />
        AI-Generated Weekly Insights
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insightCategories.map((category, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center mb-3">
              <category.icon className="w-5 h-5 mr-2 text-indigo-600" />
              <h4 className="font-semibold text-gray-900">{category.title}</h4>
            </div>
            <ul className="space-y-2">
              {category.insights.map((insight, idx) => (
                <li key={idx} className="text-sm text-gray-700 flex items-start">
                  <span className="w-2 h-2 bg-indigo-400 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                  {insight}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );

  const renderTopPerformers = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold mb-6 flex items-center">
        <Trophy className="w-6 h-6 mr-2 text-yellow-600" />
        Top Performers This Week
      </h3>
      
      <div className="space-y-4">
        {weeklyData.topPerformers.map((performer, index) => (
          <div key={index} className={`flex items-center justify-between p-4 rounded-lg ${
            index === 0 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200' :
            index === 1 ? 'bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200' :
            'bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200'
          }`}>
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                index === 0 ? 'bg-yellow-500' :
                index === 1 ? 'bg-gray-500' :
                'bg-orange-500'
              }`}>
                {index + 1}
              </div>
              <div className="ml-4">
                <h4 className="font-semibold text-gray-900">{performer.name}</h4>
                <p className="text-sm text-gray-600">Score: {performer.score}%</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center text-green-600">
                <ArrowUpIcon className="w-4 h-4 mr-1" />
                <span className="font-medium">+{performer.improvement}%</span>
              </div>
              <p className="text-xs text-gray-500">improvement</p>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">📊 Weekly Study Insights Analytics</h2>
          <p className="text-gray-600">Comprehensive analysis of student performance and engagement trends</p>
        </div>
        
        <div className="flex flex-wrap gap-3 mt-4 lg:mt-0">
          <select 
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="current">Current Week</option>
            <option value="last">Last Week</option>
            <option value="2weeks">2 Weeks Ago</option>
            <option value="month">Last Month</option>
          </select>
          
          <select 
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="all">All Students</option>
            <option value="premium">Premium Only</option>
            <option value="free">Free Tier Only</option>
          </select>
          
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
          
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Data
          </button>
        </div>
      </div>

      {/* Week Info */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-1">Week of {weeklyData.weekOf}</h3>
            <p className="text-indigo-100">
              {weeklyData.activeStudents} active students out of {weeklyData.totalStudents} total registered
            </p>
          </div>
          <Calendar className="w-12 h-12 text-indigo-200" />
        </div>
      </div>

      {/* View Mode Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Overview', icon: Eye },
          { id: 'detailed', label: 'Detailed Analysis', icon: BarChart3 },
          { id: 'comparative', label: 'Comparative', icon: PieChart }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setViewMode(tab.id as any)}
            className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === tab.id
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <tab.icon className="w-4 h-4 mr-2" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content based on view mode */}
      {viewMode === 'overview' && (
        <>
          {renderOverviewCards()}
          {renderSubjectPerformance()}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {renderInsights()}
            {renderTopPerformers()}
          </div>
        </>
      )}

      {viewMode === 'detailed' && (
        <div className="space-y-6">
          {renderOverviewCards()}
          {renderSubjectPerformance()}
          {renderInsights()}
          
          {/* Additional detailed charts would go here */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Detailed Time-Series Analysis</h3>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Interactive charts would be rendered here</p>
            </div>
          </div>
        </div>
      )}

      {viewMode === 'comparative' && (
        <div className="space-y-6">
          {renderOverviewCards()}
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4">Week-over-Week Comparison</h3>
            <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Comparative analysis charts would be rendered here</p>
            </div>
          </div>
          
          {renderTopPerformers()}
        </div>
      )}
    </div>
  );
};

export default WeeklyInsightsAnalytics;
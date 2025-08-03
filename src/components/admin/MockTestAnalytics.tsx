import React, { useState } from 'react';
import { 
  FileText, BarChart3, TrendingUp, Users, Clock, Target,
  Eye, Download, RefreshCw, Filter, Calendar, Award,
  AlertCircle, CheckCircle, XCircle, ArrowUpIcon, ArrowDownIcon,
  PieChart, Activity, Brain, Zap, Star, Trophy,
  BookOpen, Globe, User, Building
} from 'lucide-react';

interface MockTestAnalyticsProps {}

interface TestResult {
  id: string;
  studentId: string;
  studentName: string;
  testId: string;
  testName: string;
  category: 'legal-reasoning' | 'logical-reasoning' | 'reading-comprehension' | 'general-knowledge' | 'quantitative-techniques' | 'full-test';
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unanswered: number;
  timeSpent: number; // in minutes
  timeTaken: number; // actual time taken
  difficulty: 'easy' | 'medium' | 'hard';
  rank: number;
  percentile: number;
  submittedAt: string;
  institute?: string;
}

interface TestAnalytics {
  testId: string;
  testName: string;
  totalAttempts: number;
  averageScore: number;
  averageTime: number;
  passedStudents: number;
  topScore: number;
  lowestScore: number;
  difficultyRating: number;
  subjectWisePerformance: Array<{
    subject: string;
    averageScore: number;
    totalQuestions: number;
    difficulty: number;
  }>;
  timeDistribution: Array<{
    timeRange: string;
    count: number;
  }>;
  scoreDistribution: Array<{
    scoreRange: string;
    count: number;
    percentage: number;
  }>;
}

interface PerformanceTrend {
  period: string;
  averageScore: number;
  totalAttempts: number;
  improvement: number;
}

const MockTestAnalytics: React.FC<MockTestAnalyticsProps> = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'test-analysis' | 'student-performance' | 'trends' | 'reports'>('overview');
  const [selectedTimeRange, setSelectedTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedInstitute, setSelectedInstitute] = useState<string>('all');

  // Mock data
  const overallStats = {
    totalTests: 127,
    totalAttempts: 8934,
    averageScore: 73.2,
    averageTime: 142, // minutes
    passRate: 68.5,
    topPerformer: 'Raj Patel',
    mostAttemptedTest: 'CLAT Mock Test #15',
    improvementRate: 12.3,
    activeStudents: 1247,
    completionRate: 82.7
  };

  const testResults: TestResult[] = [
    {
      id: '1',
      studentId: 'ST001',
      studentName: 'Raj Patel',
      testId: 'MT001',
      testName: 'CLAT Mock Test #15',
      category: 'full-test',
      score: 87.5,
      totalQuestions: 120,
      correctAnswers: 105,
      incorrectAnswers: 12,
      unanswered: 3,
      timeSpent: 135,
      timeTaken: 132,
      difficulty: 'medium',
      rank: 12,
      percentile: 92.3,
      submittedAt: '2024-07-28T10:30:00Z',
      institute: 'Elite Law Academy'
    },
    {
      id: '2',
      studentId: 'ST002',
      studentName: 'Priya Sharma',
      testId: 'MT002',
      testName: 'Legal Reasoning Practice Test',
      category: 'legal-reasoning',
      score: 82.1,
      totalQuestions: 30,
      correctAnswers: 25,
      incorrectAnswers: 4,
      unanswered: 1,
      timeSpent: 45,
      timeTaken: 42,
      difficulty: 'hard',
      rank: 8,
      percentile: 88.7,
      submittedAt: '2024-07-28T14:15:00Z',
      institute: 'Success Law Institute'
    }
  ];

  const testAnalytics: TestAnalytics[] = [
    {
      testId: 'MT001',
      testName: 'CLAT Mock Test #15',
      totalAttempts: 1247,
      averageScore: 73.2,
      averageTime: 142,
      passedStudents: 854,
      topScore: 96.7,
      lowestScore: 23.4,
      difficultyRating: 7.2,
      subjectWisePerformance: [
        { subject: 'Legal Reasoning', averageScore: 75.3, totalQuestions: 30, difficulty: 7.1 },
        { subject: 'Logical Reasoning', averageScore: 78.9, totalQuestions: 30, difficulty: 6.8 },
        { subject: 'Reading Comprehension', averageScore: 68.4, totalQuestions: 30, difficulty: 8.2 },
        { subject: 'General Knowledge', averageScore: 71.2, totalQuestions: 20, difficulty: 6.5 },
        { subject: 'Quantitative Techniques', averageScore: 69.8, totalQuestions: 10, difficulty: 7.8 }
      ],
      timeDistribution: [
        { timeRange: '90-120 min', count: 234 },
        { timeRange: '120-150 min', count: 456 },
        { timeRange: '150-180 min', count: 389 },
        { timeRange: '180+ min', count: 168 }
      ],
      scoreDistribution: [
        { scoreRange: '0-40%', count: 87, percentage: 7.0 },
        { scoreRange: '40-60%', count: 234, percentage: 18.8 },
        { scoreRange: '60-80%', count: 578, percentage: 46.4 },
        { scoreRange: '80-100%', count: 348, percentage: 27.9 }
      ]
    }
  ];

  const performanceTrends: PerformanceTrend[] = [
    { period: 'Week 1', averageScore: 68.4, totalAttempts: 234, improvement: 0 },
    { period: 'Week 2', averageScore: 71.2, totalAttempts: 267, improvement: 4.1 },
    { period: 'Week 3', averageScore: 73.8, totalAttempts: 289, improvement: 3.7 },
    { period: 'Week 4', averageScore: 76.1, totalAttempts: 312, improvement: 3.1 }
  ];

  const topPerformers = [
    { name: 'Raj Patel', institute: 'Elite Law Academy', averageScore: 89.2, testsCompleted: 23, rank: 1 },
    { name: 'Priya Sharma', institute: 'Success Law Institute', averageScore: 87.6, testsCompleted: 21, rank: 2 },
    { name: 'Arjun Kumar', institute: 'Prime Legal Academy', averageScore: 86.3, testsCompleted: 25, rank: 3 },
    { name: 'Sneha Gupta', institute: 'Elite Law Academy', averageScore: 85.7, testsCompleted: 19, rank: 4 },
    { name: 'Vikram Singh', institute: 'Success Law Institute', averageScore: 84.9, testsCompleted: 22, rank: 5 }
  ];

  const subjectAnalytics = [
    { 
      subject: 'Legal Reasoning', 
      averageScore: 75.3, 
      attempts: 2456, 
      improvement: 5.2, 
      difficulty: 7.1,
      topicBreakdown: [
        { topic: 'Constitutional Law', score: 78.4, questions: 8 },
        { topic: 'Contract Law', score: 73.2, questions: 7 },
        { topic: 'Criminal Law', score: 76.8, questions: 6 },
        { topic: 'Torts', score: 72.1, questions: 5 },
        { topic: 'Administrative Law', score: 74.5, questions: 4 }
      ]
    },
    { 
      subject: 'Logical Reasoning', 
      averageScore: 78.9, 
      attempts: 2234, 
      improvement: 3.8, 
      difficulty: 6.8,
      topicBreakdown: [
        { topic: 'Critical Reasoning', score: 81.2, questions: 10 },
        { topic: 'Analytical Reasoning', score: 76.3, questions: 8 },
        { topic: 'Verbal Reasoning', score: 79.5, questions: 7 },
        { topic: 'Logical Puzzles', score: 77.1, questions: 5 }
      ]
    },
    { 
      subject: 'Reading Comprehension', 
      averageScore: 68.4, 
      attempts: 2187, 
      improvement: -1.2, 
      difficulty: 8.2,
      topicBreakdown: [
        { topic: 'Legal Passages', score: 65.3, questions: 10 },
        { topic: 'Social Issues', score: 72.1, questions: 8 },
        { topic: 'Economics', score: 67.8, questions: 6 },
        { topic: 'Politics', score: 69.2, questions: 6 }
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
              <p className="text-blue-100 text-sm">Total Attempts</p>
              <p className="text-3xl font-bold">{overallStats.totalAttempts.toLocaleString()}</p>
              <div className="flex items-center mt-1">
                <ArrowUpIcon className="w-4 h-4 mr-1" />
                <span className="text-sm">+12% this month</span>
              </div>
            </div>
            <FileText className="w-12 h-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Average Score</p>
              <p className="text-3xl font-bold">{overallStats.averageScore}%</p>
              <div className="flex items-center mt-1">
                <ArrowUpIcon className="w-4 h-4 mr-1" />
                <span className="text-sm">+{overallStats.improvementRate}% improvement</span>
              </div>
            </div>
            <Target className="w-12 h-12 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Pass Rate</p>
              <p className="text-3xl font-bold">{overallStats.passRate}%</p>
              <div className="flex items-center mt-1">
                <ArrowUpIcon className="w-4 h-4 mr-1" />
                <span className="text-sm">+2.1% from last month</span>
              </div>
            </div>
            <CheckCircle className="w-12 h-12 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Avg Time</p>
              <p className="text-3xl font-bold">{Math.floor(overallStats.averageTime / 60)}h {overallStats.averageTime % 60}m</p>
              <div className="flex items-center mt-1">
                <ArrowDownIcon className="w-4 h-4 mr-1" />
                <span className="text-sm">-8 min improved</span>
              </div>
            </div>
            <Clock className="w-12 h-12 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Performance Trends Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-6 flex items-center">
          <TrendingUp className="w-6 h-6 mr-2 text-indigo-600" />
          Performance Trends Over Time
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Weekly Progress</h4>
            <div className="space-y-3">
              {performanceTrends.map((trend, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-indigo-500 mr-3"></div>
                    <span className="font-medium text-gray-900">{trend.period}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{trend.averageScore}%</p>
                    <div className="flex items-center text-sm">
                      {trend.improvement > 0 ? (
                        <ArrowUpIcon className="w-3 h-3 text-green-500 mr-1" />
                      ) : trend.improvement < 0 ? (
                        <ArrowDownIcon className="w-3 h-3 text-red-500 mr-1" />
                      ) : null}
                      <span className={`${
                        trend.improvement > 0 ? 'text-green-600' : 
                        trend.improvement < 0 ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {trend.improvement !== 0 ? `${Math.abs(trend.improvement)}%` : 'No change'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Test Attempts Distribution</h4>
            <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Interactive chart would be rendered here</p>
            </div>
          </div>
        </div>
      </div>

      {/* Subject-wise Performance */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-6 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-green-600" />
          Subject-wise Performance Analysis
        </h3>
        
        <div className="space-y-4">
          {subjectAnalytics.map((subject, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">{subject.subject}</h4>
                <div className="flex items-center space-x-4">
                  <div className={`flex items-center px-2 py-1 rounded-full text-sm ${
                    subject.improvement > 0 
                      ? 'bg-green-100 text-green-800' 
                      : subject.improvement < 0
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {subject.improvement > 0 ? <ArrowUpIcon className="w-3 h-3 mr-1" /> : 
                     subject.improvement < 0 ? <ArrowDownIcon className="w-3 h-3 mr-1" /> : null}
                    {Math.abs(subject.improvement)}%
                  </div>
                  <span className="text-sm text-gray-600">Difficulty: {subject.difficulty}/10</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Average Score</p>
                  <div className="flex items-center">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${subject.averageScore}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{subject.averageScore}%</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Total Attempts</p>
                  <p className="font-semibold text-gray-900">{subject.attempts.toLocaleString()}</p>
                </div>
                
                <div>
                  <p className="text-sm text-gray-600">Top Topics</p>
                  <div className="flex flex-wrap gap-1">
                    {subject.topicBreakdown.slice(0, 2).map((topic, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {topic.topic}: {topic.score}%
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-6 flex items-center">
          <Trophy className="w-6 h-6 mr-2 text-yellow-600" />
          Top Performers This Month
        </h3>
        
        <div className="space-y-4">
          {topPerformers.map((performer, index) => (
            <div key={index} className={`flex items-center justify-between p-4 rounded-lg ${
              index === 0 ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200' :
              index === 1 ? 'bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200' :
              index === 2 ? 'bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200' :
              'bg-gray-50 border border-gray-200'
            }`}>
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                  index === 0 ? 'bg-yellow-500' :
                  index === 1 ? 'bg-gray-500' :
                  index === 2 ? 'bg-orange-500' : 'bg-blue-500'
                }`}>
                  {performer.rank}
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">{performer.name}</h4>
                  <p className="text-sm text-gray-600">{performer.institute}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-gray-900">{performer.averageScore}%</p>
                <p className="text-sm text-gray-600">{performer.testsCompleted} tests completed</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTestAnalysis = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Categories</option>
            <option value="full-test">Full Mock Tests</option>
            <option value="legal-reasoning">Legal Reasoning</option>
            <option value="logical-reasoning">Logical Reasoning</option>
            <option value="reading-comprehension">Reading Comprehension</option>
            <option value="general-knowledge">General Knowledge</option>
            <option value="quantitative-techniques">Quantitative Techniques</option>
          </select>
          
          <select 
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value as any)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
          
          <select 
            value={selectedInstitute}
            onChange={(e) => setSelectedInstitute(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Institutes</option>
            <option value="elite">Elite Law Academy</option>
            <option value="success">Success Law Institute</option>
            <option value="prime">Prime Legal Academy</option>
          </select>
        </div>
      </div>

      {/* Test Analysis Cards */}
      <div className="space-y-6">
        {testAnalytics.map((test) => (
          <div key={test.testId} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{test.testName}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>{test.totalAttempts} attempts</span>
                  <span>Avg: {test.averageScore}%</span>
                  <span>Pass rate: {((test.passedStudents / test.totalAttempts) * 100).toFixed(1)}%</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                  <Eye className="w-4 h-4 mr-2 inline" />
                  View Details
                </button>
                <button className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors">
                  <Download className="w-4 h-4 mr-2 inline" />
                  Export
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Score Distribution */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Score Distribution</h4>
                <div className="space-y-2">
                  {test.scoreDistribution.map((range, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{range.scoreRange}</span>
                      <div className="flex items-center">
                        <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-indigo-500 h-2 rounded-full"
                            style={{ width: `${range.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium w-8">{range.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Time Distribution */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Time Distribution</h4>
                <div className="space-y-2">
                  {test.timeDistribution.map((range, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{range.timeRange}</span>
                      <div className="flex items-center">
                        <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${(range.count / test.totalAttempts) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium w-8">{range.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Subject Performance */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Subject Performance</h4>
                <div className="space-y-2">
                  {test.subjectWisePerformance.slice(0, 4).map((subject, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 truncate">{subject.subject}</span>
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-purple-500 h-2 rounded-full"
                            style={{ width: `${subject.averageScore}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{subject.averageScore}%</span>
                      </div>
                    </div>
                  ))}
                </div>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">📊 Mock Test Results Analytics</h2>
          <p className="text-gray-600">Comprehensive analysis of student performance across all mock tests</p>
        </div>
        
        <div className="flex flex-wrap gap-3 mt-4 lg:mt-0">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
          
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Data
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'test-analysis', label: 'Test Analysis', icon: FileText },
          { id: 'student-performance', label: 'Student Performance', icon: Users },
          { id: 'trends', label: 'Trends', icon: TrendingUp },
          { id: 'reports', label: 'Reports', icon: Download }
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
      {activeTab === 'test-analysis' && renderTestAnalysis()}
      
      {activeTab === 'student-performance' && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-bold mb-4">Individual Student Performance</h3>
          <p className="text-gray-600">Detailed student-wise performance analysis would be implemented here.</p>
        </div>
      )}
      
      {activeTab === 'trends' && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-bold mb-4">Performance Trends & Insights</h3>
          <p className="text-gray-600">Advanced trend analysis and predictive insights would be displayed here.</p>
        </div>
      )}
      
      {activeTab === 'reports' && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-bold mb-4">Custom Reports & Export</h3>
          <p className="text-gray-600">Report generation and export functionality would be implemented here.</p>
        </div>
      )}
    </div>
  );
};

export default MockTestAnalytics;
import React, { useState } from 'react';
import { 
  User, BarChart3, Clock, Target, TrendingUp, Calendar,
  Award, BookOpen, MessageSquare, Bell, Eye, Star,
  Activity, Brain, Zap, AlertCircle, CheckCircle
} from 'lucide-react';

interface ParentDashboardProps {
  user: any;
  onLogout: () => void;
}

const ParentDashboard: React.FC<ParentDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'schedule' | 'communication' | 'reports'>('overview');

  // Mock data for parent dashboard
  const childData = {
    name: 'Raj Patel',
    grade: '12th Grade',
    targetNLU: 'NLSIU Bangalore',
    currentScore: 76.5,
    targetScore: 85,
    studyStreak: 15,
    totalStudyHours: 127,
    testsCompleted: 23,
    rank: 2847,
    percentile: 89.2
  };

  const recentPerformance = [
    { date: '2024-07-28', subject: 'Legal Reasoning', score: 82, maxScore: 100, improvement: '+5' },
    { date: '2024-07-26', subject: 'Logical Reasoning', score: 78, maxScore: 100, improvement: '+2' },
    { date: '2024-07-24', subject: 'Reading Comprehension', score: 71, maxScore: 100, improvement: '-3' },
    { date: '2024-07-22', subject: 'General Knowledge', score: 85, maxScore: 100, improvement: '+8' },
    { date: '2024-07-20', subject: 'Mock Test Full', score: 76, maxScore: 100, improvement: '+4' }
  ];

  const upcomingSchedule = [
    { time: '9:00 AM', activity: 'Legal Reasoning Study', duration: '2 hours', type: 'study' },
    { time: '11:30 AM', activity: 'Mock Test Practice', duration: '1.5 hours', type: 'test' },
    { time: '2:00 PM', activity: 'Reading Comprehension', duration: '1 hour', type: 'study' },
    { time: '4:00 PM', activity: 'Doubt Clearing Session', duration: '45 mins', type: 'class' }
  ];

  const achievements = [
    { title: 'Study Streak Champion', description: '15 days consecutive study', icon: '🔥', date: 'Today' },
    { title: 'Score Improvement', description: '+12% improvement this month', icon: '📈', date: '2 days ago' },
    { title: 'Mock Test Master', description: 'Completed 20+ mock tests', icon: '🎯', date: '1 week ago' },
    { title: 'Speed Reader', description: 'Reading speed > 250 WPM', icon: '⚡', date: '2 weeks ago' }
  ];

  const concerns = [
    { type: 'attention', message: 'Reading Comprehension scores declining', priority: 'medium' },
    { type: 'info', message: 'Study hours below weekly target', priority: 'low' },
    { type: 'success', message: 'Excellent performance in Legal Reasoning', priority: 'positive' }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Child Info Card */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">{childData.name}</h3>
            <p className="text-blue-100 mb-1">{childData.grade} • Target: {childData.targetNLU}</p>
            <p className="text-blue-100">Current Score: {childData.currentScore}% • Target: {childData.targetScore}%</p>
          </div>
          <div className="text-right">
            <div className="bg-white/20 rounded-lg p-4">
              <p className="text-sm text-blue-100">Current Rank</p>
              <p className="text-2xl font-bold">{childData.rank.toLocaleString()}</p>
              <p className="text-sm text-blue-100">{childData.percentile}th percentile</p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Study Streak</p>
              <p className="text-3xl font-bold text-orange-600">{childData.studyStreak}</p>
              <p className="text-gray-500 text-sm">days</p>
            </div>
            <Clock className="w-12 h-12 text-orange-300" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Hours</p>
              <p className="text-3xl font-bold text-green-600">{childData.totalStudyHours}</p>
              <p className="text-gray-500 text-sm">this month</p>
            </div>
            <BookOpen className="w-12 h-12 text-green-300" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Tests Completed</p>
              <p className="text-3xl font-bold text-blue-600">{childData.testsCompleted}</p>
              <p className="text-gray-500 text-sm">mock tests</p>
            </div>
            <Target className="w-12 h-12 text-blue-300" />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Progress</p>
              <p className="text-3xl font-bold text-purple-600">{Math.round((childData.currentScore / childData.targetScore) * 100)}%</p>
              <p className="text-gray-500 text-sm">to target</p>
            </div>
            <TrendingUp className="w-12 h-12 text-purple-300" />
          </div>
        </div>
      </div>

      {/* Recent Performance */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-6 flex items-center">
          <BarChart3 className="w-6 h-6 mr-2 text-indigo-600" />
          Recent Performance
        </h3>
        
        <div className="space-y-4">
          {recentPerformance.map((performance, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mr-4">
                  <BarChart3 className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{performance.subject}</h4>
                  <p className="text-sm text-gray-600">{new Date(performance.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-gray-900">{performance.score}%</p>
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${
                  performance.improvement.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {performance.improvement}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Schedule & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-green-600" />
            Today's Schedule
          </h3>
          
          <div className="space-y-4">
            {upcomingSchedule.map((item, index) => (
              <div key={index} className="flex items-center p-3 rounded-lg border border-gray-200">
                <div className={`w-3 h-3 rounded-full mr-3 ${
                  item.type === 'study' ? 'bg-blue-500' :
                  item.type === 'test' ? 'bg-red-500' :
                  item.type === 'class' ? 'bg-green-500' : 'bg-gray-500'
                }`}></div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{item.activity}</h4>
                  <p className="text-sm text-gray-600">{item.time} • {item.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <Award className="w-6 h-6 mr-2 text-yellow-600" />
            Recent Achievements
          </h3>
          
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center p-3 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200">
                <div className="text-2xl mr-3">{achievement.icon}</div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                  <p className="text-sm text-gray-600">{achievement.description}</p>
                  <p className="text-xs text-gray-500 mt-1">{achievement.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts & Concerns */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-6 flex items-center">
          <Bell className="w-6 h-6 mr-2 text-red-600" />
          Alerts & Insights
        </h3>
        
        <div className="space-y-4">
          {concerns.map((concern, index) => (
            <div key={index} className={`flex items-start p-4 rounded-lg border ${
              concern.priority === 'medium' ? 'bg-yellow-50 border-yellow-200' :
              concern.priority === 'low' ? 'bg-blue-50 border-blue-200' :
              'bg-green-50 border-green-200'
            }`}>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                concern.priority === 'medium' ? 'bg-yellow-500' :
                concern.priority === 'low' ? 'bg-blue-500' :
                'bg-green-500'
              }`}>
                {concern.priority === 'positive' ? <CheckCircle className="w-4 h-4 text-white" /> : <AlertCircle className="w-4 h-4 text-white" />}
              </div>
              <div>
                <p className={`font-medium ${
                  concern.priority === 'medium' ? 'text-yellow-800' :
                  concern.priority === 'low' ? 'text-blue-800' :
                  'text-green-800'
                }`}>
                  {concern.message}
                </p>
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
      <header className="bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-white">Parent Dashboard</h1>
              <p className="text-purple-100 mt-1">Welcome back, {user.name}!</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 rounded-lg px-3 py-2">
                <span className="text-white text-sm font-medium">Parent Portal</span>
              </div>
              <button
                onClick={onLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: Activity },
              { id: 'performance', label: 'Performance', icon: BarChart3 },
              { id: 'schedule', label: 'Schedule', icon: Calendar },
              { id: 'communication', label: 'Messages', icon: MessageSquare },
              { id: 'reports', label: 'Reports', icon: Eye }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center px-1 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && renderOverview()}
        
        {activeTab === 'performance' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold mb-4">Detailed Performance Analysis</h3>
            <p className="text-gray-600">Comprehensive performance tracking and detailed analytics would be implemented here.</p>
          </div>
        )}
        
        {activeTab === 'schedule' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold mb-4">Study Schedule & Calendar</h3>
            <p className="text-gray-600">Full calendar view and schedule management interface would be implemented here.</p>
          </div>
        )}
        
        {activeTab === 'communication' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold mb-4">Communication Center</h3>
            <p className="text-gray-600">Messaging system with teachers and support staff would be implemented here.</p>
          </div>
        )}
        
        {activeTab === 'reports' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold mb-4">Progress Reports</h3>
            <p className="text-gray-600">Detailed progress reports and downloadable summaries would be implemented here.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ParentDashboard;
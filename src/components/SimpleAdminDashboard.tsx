import React, { useState } from 'react';

interface SimpleAdminDashboardProps {
  user: any;
  onLogout: () => void;
}

const SimpleAdminDashboard: React.FC<SimpleAdminDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const navigationItems = [
    { id: 'overview', label: 'Dashboard Overview' },
    { id: 'users', label: 'User Management' },
    { id: 'content', label: 'Content Management' },
    { id: 'analytics', label: 'Analytics & Reports' },
    { id: 'settings', label: 'Settings' }
  ];

  const stats = {
    totalUsers: 1247,
    activeStudents: 892,
    totalTests: 127,
    avgScore: 73.2,
    systemHealth: 98,
    dailyActiveUsers: 234
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Total Users</h3>
          <p className="text-3xl font-bold">{stats.totalUsers.toLocaleString()}</p>
          <p className="text-blue-100 text-sm mt-1">Registered students</p>
        </div>

        <div className="bg-green-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Active Students</h3>
          <p className="text-3xl font-bold">{stats.activeStudents.toLocaleString()}</p>
          <p className="text-green-100 text-sm mt-1">Daily active users</p>
        </div>

        <div className="bg-purple-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Total Tests</h3>
          <p className="text-3xl font-bold">{stats.totalTests}</p>
          <p className="text-purple-100 text-sm mt-1">Mock tests available</p>
        </div>

        <div className="bg-orange-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Average Score</h3>
          <p className="text-3xl font-bold">{stats.avgScore}%</p>
          <p className="text-orange-100 text-sm mt-1">Platform average</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">🎯 Admin Management Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors">
            <h4 className="font-semibold text-gray-900 mb-2">👥 Social Learning Management</h4>
            <p className="text-gray-600 text-sm">Manage leaderboards, challenges, study groups, and XP systems</p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors">
            <h4 className="font-semibold text-gray-900 mb-2">📊 Weekly Insights Analytics</h4>
            <p className="text-gray-600 text-sm">Comprehensive performance analytics and insights dashboard</p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors">
            <h4 className="font-semibold text-gray-900 mb-2">📚 Vocabulary Management</h4>
            <p className="text-gray-600 text-sm">CRUD operations for vocabulary content and categories</p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors">
            <h4 className="font-semibold text-gray-900 mb-2">🎯 Goals & Achievements</h4>
            <p className="text-gray-600 text-sm">Configure goals, achievements, and motivation systems</p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors">
            <h4 className="font-semibold text-gray-900 mb-2">📅 Study Schedule Templates</h4>
            <p className="text-gray-600 text-sm">Create and manage personalized study schedules</p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors">
            <h4 className="font-semibold text-gray-900 mb-2">📈 Mock Test Analytics</h4>
            <p className="text-gray-600 text-sm">Detailed test performance and results analysis</p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg hover:border-indigo-300 transition-colors">
            <h4 className="font-semibold text-gray-900 mb-2">🎯 User Segmentation</h4>
            <p className="text-gray-600 text-sm">Advanced user targeting and personalization</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">📋 Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">New student registered</p>
              <p className="text-sm text-gray-600">Raj Patel joined Premium plan</p>
            </div>
            <span className="text-xs text-gray-500">2 hours ago</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Mock test completed</p>
              <p className="text-sm text-gray-600">CLAT Mock Test #15 - 156 participants</p>
            </div>
            <span className="text-xs text-gray-500">4 hours ago</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Content updated</p>
              <p className="text-sm text-gray-600">Legal Reasoning questions added</p>
            </div>
            <span className="text-xs text-gray-500">6 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user.name}!</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium">
                Administrator
              </div>
              <button
                onClick={onLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === item.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && renderOverview()}
        
        {activeTab === 'users' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4">👥 User Management</h2>
            <p className="text-gray-600 mb-6">Manage all platform users, their roles, and permissions.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h3 className="font-semibold text-blue-900 mb-2">Students</h3>
                <p className="text-2xl font-bold text-blue-700">1,247</p>
                <p className="text-blue-600 text-sm">Active learners</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-900 mb-2">Educators</h3>
                <p className="text-2xl font-bold text-green-700">23</p>
                <p className="text-green-600 text-sm">Teaching staff</p>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-purple-900 mb-2">Parents</h3>
                <p className="text-2xl font-bold text-purple-700">789</p>
                <p className="text-purple-600 text-sm">Parent accounts</p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'content' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4">📚 Content Management</h2>
            <p className="text-gray-600 mb-6">Manage all educational content, tests, and learning materials.</p>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Mock Tests</h3>
                <p className="text-gray-600 text-sm mb-2">127 active mock tests</p>
                <div className="bg-gray-100 rounded-full h-2">
                  <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Vocabulary Database</h3>
                <p className="text-gray-600 text-sm mb-2">1,044 vocabulary words</p>
                <div className="bg-gray-100 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Reading Passages</h3>
                <p className="text-gray-600 text-sm mb-2">345 comprehension passages</p>
                <div className="bg-gray-100 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'analytics' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4">📊 Analytics & Reports</h2>
            <p className="text-gray-600 mb-6">Comprehensive analytics and insights across the platform.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Average Score</span>
                    <span className="font-semibold text-gray-900">73.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Completion Rate</span>
                    <span className="font-semibold text-gray-900">82.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Daily Active Users</span>
                    <span className="font-semibold text-gray-900">234</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-4">System Health</h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">{stats.systemHealth}%</div>
                  <p className="text-gray-600">System Uptime</p>
                  <div className="mt-4 bg-gray-100 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${stats.systemHealth}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4">⚙️ System Settings</h2>
            <p className="text-gray-600 mb-6">Configure platform settings and preferences.</p>
            
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Platform Configuration</h3>
                <p className="text-gray-600 text-sm">Global platform settings and configurations</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">User Permissions</h3>
                <p className="text-gray-600 text-sm">Manage role-based access control and permissions</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Backup & Security</h3>
                <p className="text-gray-600 text-sm">Database backup and security configurations</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SimpleAdminDashboard;
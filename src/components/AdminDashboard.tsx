import React, { useState, useEffect } from 'react';
import { 
  Users, 
  BookOpen, 
  BarChart3, 
  Settings, 
  Building, 
  TrendingUp,
  UserCheck,
  DollarSign,
  Activity,
  Monitor,
  Shield,
  Download,
  Plus,
  Edit,
  Trash2,
  Search,
  Eye
} from 'lucide-react';

interface AdminDashboardProps {
  user: any;
  onLogout: () => void;
}

interface DashboardStats {
  totalUsers: number;
  activeStudents: number;
  totalInstitutes: number;
  monthlyRevenue: number;
  systemHealth: number;
  dailyActiveUsers: number;
  totalContent: number;
  newSignupsToday: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: string;
  institute?: string;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'content' | 'analytics' | 'settings' | 'institutes'>('overview');
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    activeStudents: 0,
    totalInstitutes: 0,
    monthlyRevenue: 0,
    systemHealth: 100,
    dailyActiveUsers: 0,
    totalContent: 0,
    newSignupsToday: 0
  });
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  useEffect(() => {
    fetchAdminStats();
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAdminStats = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/admin/stats`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setStats(data.stats || {
          totalUsers: 1247,
          activeStudents: 892,
          totalInstitutes: 15,
          monthlyRevenue: 125000,
          systemHealth: 98,
          dailyActiveUsers: 342,
          totalContent: 1580,
          newSignupsToday: 23
        });
      }
    } catch (error) {
      console.error('Error fetching admin stats:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/admin/users`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users || [
          { id: '1', name: 'John Doe', email: 'john@example.com', role: 'student', status: 'active', lastLogin: '2024-01-30', institute: 'Delhi Law Academy' },
          { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'educator', status: 'active', lastLogin: '2024-01-29', institute: 'Mumbai Legal Institute' },
          { id: '3', name: 'Mike Wilson', email: 'mike@example.com', role: 'parent', status: 'active', lastLogin: '2024-01-28' },
          { id: '4', name: 'Sarah Johnson', email: 'sarah@example.com', role: 'operation_manager', status: 'active', lastLogin: '2024-01-30' }
        ]);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || u.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string | number; subtitle?: string; color: string }> = 
    ({ icon, title, value, subtitle, color }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className="p-3 rounded-lg" style={{ backgroundColor: `${color}20` }}>
          {icon}
        </div>
      </div>
    </div>
  );

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={<Users className="w-6 h-6 text-blue-600" />}
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          subtitle={`+${stats.newSignupsToday} today`}
          color="#3B82F6"
        />
        <StatCard 
          icon={<UserCheck className="w-6 h-6 text-green-600" />}
          title="Active Students"
          value={stats.activeStudents}
          subtitle={`${stats.dailyActiveUsers} daily active`}
          color="#10B981"
        />
        <StatCard 
          icon={<Building className="w-6 h-6 text-purple-600" />}
          title="Institutes"
          value={stats.totalInstitutes}
          subtitle="Partner institutions"
          color="#8B5CF6"
        />
        <StatCard 
          icon={<DollarSign className="w-6 h-6 text-yellow-600" />}
          title="Monthly Revenue"
          value={`₹${(stats.monthlyRevenue / 1000).toFixed(0)}K`}
          subtitle="This month"
          color="#F59E0B"
        />
      </div>

      {/* System Health & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-green-600" />
            System Health
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Server Status</span>
              <span className="text-sm font-medium text-green-600">Online</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Database</span>
              <span className="text-sm font-medium text-green-600">Healthy</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Performance</span>
              <span className="text-sm font-medium text-green-600">{stats.systemHealth}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all" 
                style={{ width: `${stats.systemHealth}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors">
              <div className="flex items-center">
                <Plus className="w-4 h-4 mr-3 text-blue-600" />
                <span className="text-sm font-medium">Add New Institute</span>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-lg bg-green-50 hover:bg-green-100 transition-colors">
              <div className="flex items-center">
                <Download className="w-4 h-4 mr-3 text-green-600" />
                <span className="text-sm font-medium">Export User Report</span>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-lg bg-purple-50 hover:bg-purple-100 transition-colors">
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-3 text-purple-600" />
                <span className="text-sm font-medium">Security Audit</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">User Management</h3>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="sm:w-48">
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="all">All Roles</option>
              <option value="student">Students</option>
              <option value="educator">Educators</option>
              <option value="parent">Parents</option>
              <option value="operation_manager">Managers</option>
              <option value="admin">Admins</option>
            </select>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Institute</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.role === 'admin' ? 'bg-red-100 text-red-800' :
                      user.role === 'educator' ? 'bg-green-100 text-green-800' :
                      user.role === 'operation_manager' ? 'bg-purple-100 text-purple-800' :
                      user.role === 'parent' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' :
                      user.status === 'suspended' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.lastLogin}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.institute || 'N/A'}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderContent = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">Content Management</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <BookOpen className="w-8 h-8 text-blue-600 mb-3" />
            <h4 className="font-medium text-gray-900">Reading Passages</h4>
            <p className="text-2xl font-bold text-blue-600 mt-2">450</p>
            <button className="mt-3 text-sm text-blue-600 hover:text-blue-800">Manage →</button>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <BookOpen className="w-8 h-8 text-green-600 mb-3" />
            <h4 className="font-medium text-gray-900">Mock Tests</h4>
            <p className="text-2xl font-bold text-green-600 mt-2">120</p>
            <button className="mt-3 text-sm text-green-600 hover:text-green-800">Manage →</button>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <BookOpen className="w-8 h-8 text-purple-600 mb-3" />
            <h4 className="font-medium text-gray-900">Vocabulary</h4>
            <p className="text-2xl font-bold text-purple-600 mt-2">1,200</p>
            <button className="mt-3 text-sm text-purple-600 hover:text-purple-800">Manage →</button>
          </div>
        </div>
      </div>
    </div>
  );

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: Monitor },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'content', label: 'Content', icon: BookOpen },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'institutes', label: 'Institutes', icon: Building }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user.name}</span>
              <button
                onClick={onLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 mr-8">
            <nav className="bg-white rounded-lg shadow-md p-4">
              <div className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as any)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                        activeTab === item.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'users' && renderUsers()}
            {activeTab === 'content' && renderContent()}
            {activeTab === 'analytics' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Analytics & Reports</h3>
                <p className="text-gray-600">Advanced analytics features coming soon...</p>
              </div>
            )}
            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">System Settings</h3>
                <p className="text-gray-600">Platform configuration options coming soon...</p>
              </div>
            )}
            {activeTab === 'institutes' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Institute Management</h3>
                <p className="text-gray-600">Institute management features coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, BookOpen, BarChart3, Settings, Building, TrendingUp,
  DollarSign, Activity, Monitor, Shield, Download, Plus, Edit, Trash2,
  Eye, Mail, Bell, Clock, Zap, RefreshCw, FileText, MessageSquare,
  Award, Target, Calendar, UserCheck, PieChart, Search, Filter,
  GraduationCap, Brain, Sparkles, LineChart, BarChart, Trophy, Star
} from 'lucide-react';
import { User } from '../types';
import { SoloHeader } from './shared/SoloHeader';
import { SoloNavigation, NavigationTab } from './shared/SoloNavigation';
import { SoloCard, SoloStatCard } from './shared/SoloCard';
import { SoloButton } from './shared/SoloButton';
import AdminDoubtOversightIntegrated from './doubt-solving/AdminDoubtOversightIntegrated';

interface SoloAdminDashboardProps {
  user: User;
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
  totalTests: number;
  avgScore: number;
  supportTickets: number;
  systemAlerts: number;
}

const SoloAdminDashboard: React.FC<SoloAdminDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 12847,
    activeStudents: 8934,
    totalInstitutes: 156,
    monthlyRevenue: 284500,
    systemHealth: 97.8,
    dailyActiveUsers: 3456,
    totalContent: 2847,
    newSignupsToday: 23,
    totalTests: 1234,
    avgScore: 76.5,
    supportTickets: 12,
    systemAlerts: 3
  });

  const navigationTabs: NavigationTab[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'users', label: 'User Management', icon: Users, badge: stats.newSignupsToday },
    { id: 'institutes', label: 'Institutes', icon: Building, badge: stats.totalInstitutes },
    { id: 'content', label: 'Content Library', icon: BookOpen },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'financial', label: 'Financial', icon: DollarSign },
    { id: 'mock-tests', label: 'Mock Tests', icon: FileText, badge: stats.totalTests },
    { id: 'assessments', label: 'Assessments', icon: Trophy },
    { id: 'vocabulary', label: 'Vocabulary', icon: Brain },
    { id: 'achievements', label: 'Goals & Achievements', icon: Target },
    { id: 'social-learning', label: 'Social Learning', icon: MessageSquare },
    { id: 'doubt-oversight', label: 'Doubt Resolution', icon: Brain },
    { id: 'communications', label: 'Communications', icon: Mail, badge: stats.supportTickets },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security & Access', icon: Shield, badge: stats.systemAlerts },
    { id: 'system-health', label: 'System Health', icon: Monitor },
    { id: 'insights', label: 'AI Insights', icon: Sparkles },
    { id: 'reports', label: 'Reports', icon: PieChart },
    { id: 'maintenance', label: 'Maintenance', icon: Settings },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-solo-2 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold font-jakarta mb-2">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-white/90 text-lg mb-6">
            Ready to lead SOLO by Legalight to new heights? Let's make it happen.
          </p>
          <div className="flex gap-4">
            <SoloButton variant="ghost" className="bg-white/20 hover:bg-white/30 border-white/30">
              View Platform Health
            </SoloButton>
            <SoloButton variant="ghost" className="bg-white/20 hover:bg-white/30 border-white/30">
              Quick Actions
            </SoloButton>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 translate-x-16"></div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SoloStatCard
          title="Total Users"
          value={stats.totalUsers.toLocaleString()}
          change={{ value: 12.5, type: 'increase' }}
          icon={Users}
          color="primary"
        />
        <SoloStatCard
          title="Active Students"
          value={stats.activeStudents.toLocaleString()}
          change={{ value: 8.3, type: 'increase' }}
          icon={GraduationCap}
          color="success"
        />
        <SoloStatCard
          title="Monthly Revenue"
          value={`₹${(stats.monthlyRevenue / 1000).toFixed(0)}K`}
          change={{ value: 15.2, type: 'increase' }}
          icon={DollarSign}
          color="warning"
        />
        <SoloStatCard
          title="System Health"
          value={`${stats.systemHealth}%`}
          change={{ value: 0.2, type: 'increase' }}
          icon={Monitor}
          color="info"
        />
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <SoloCard
          title="Quick Actions"
          subtitle="Frequently used admin tools"
          icon={Zap}
          iconColor="bg-solo-warning-light text-solo-warning"
        >
          <div className="grid grid-cols-2 gap-3">
            <SoloButton 
              variant="ghost" 
              size="small" 
              fullWidth 
              icon={Plus}
              onClick={() => setActiveTab('users')}
            >
              Add User
            </SoloButton>
            <SoloButton 
              variant="ghost" 
              size="small" 
              fullWidth 
              icon={BookOpen}
              onClick={() => setActiveTab('content')}
            >
              Add Content
            </SoloButton>
            <SoloButton 
              variant="ghost" 
              size="small" 
              fullWidth 
              icon={FileText}
              onClick={() => setActiveTab('mock-tests')}
            >
              Create Test
            </SoloButton>
            <SoloButton 
              variant="ghost" 
              size="small" 
              fullWidth 
              icon={Settings}
              onClick={() => setActiveTab('settings')}
            >
              Settings
            </SoloButton>
          </div>
        </SoloCard>

        {/* System Status */}
        <SoloCard
          title="System Status"
          subtitle="Real-time platform monitoring"
          icon={Activity}
          iconColor="bg-solo-success-light text-solo-success"
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-solo-gray-600">Server Uptime</span>
              <span className="font-semibold text-solo-success">99.9%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-solo-gray-600">API Response</span>
              <span className="font-semibold">125ms</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-solo-gray-600">Active Sessions</span>
              <span className="font-semibold text-solo-primary">{stats.dailyActiveUsers}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-solo-gray-600">Support Tickets</span>
              <span className="font-semibold text-solo-warning">{stats.supportTickets}</span>
            </div>
          </div>
        </SoloCard>

        {/* Recent Activity */}
        <SoloCard
          title="Recent Activity"
          subtitle="Latest platform events"
          icon={Clock}
          iconColor="bg-solo-info-light text-solo-info"
        >
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-solo-success rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">New institute registered</p>
                <p className="text-xs text-solo-gray-500">Delhi Law Academy - 2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-solo-primary rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Mock test completed</p>
                <p className="text-xs text-solo-gray-500">CLAT 2024 Mock #15 - 5 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-solo-warning rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Payment received</p>
                <p className="text-xs text-solo-gray-500">₹12,500 from Jindal Global - 12 minutes ago</p>
              </div>
            </div>
          </div>
        </SoloCard>
      </div>

      {/* Charts and Analytics Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SoloCard
          title="User Growth"
          subtitle="Monthly user registration trends"
          icon={TrendingUp}
          iconColor="bg-solo-success-light text-solo-success"
          action={
            <SoloButton variant="ghost" size="small" onClick={() => setActiveTab('analytics')}>
              View Details
            </SoloButton>
          }
        >
          <div className="h-48 flex items-center justify-center bg-solo-gray-50 rounded-xl">
            <div className="text-center">
              <LineChart className="h-16 w-16 mx-auto text-solo-gray-400 mb-4" />
              <p className="text-sm text-solo-gray-500">Interactive chart will be displayed here</p>
            </div>
          </div>
        </SoloCard>

        <SoloCard
          title="Revenue Analytics"
          subtitle="Financial performance overview"
          icon={BarChart}
          iconColor="bg-solo-warning-light text-solo-warning"
          action={
            <SoloButton variant="ghost" size="small" onClick={() => setActiveTab('financial')}>
              View Details
            </SoloButton>
          }
        >
          <div className="h-48 flex items-center justify-center bg-solo-gray-50 rounded-xl">
            <div className="text-center">
              <BarChart className="h-16 w-16 mx-auto text-solo-gray-400 mb-4" />
              <p className="text-sm text-solo-gray-500">Revenue chart will be displayed here</p>
            </div>
          </div>
        </SoloCard>
      </div>
    </div>
  );

  const renderUsers = () => (
    <SoloCard title="User Management" subtitle="Manage platform users and their permissions">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex gap-3">
            <SoloButton icon={Plus}>Add User</SoloButton>
            <SoloButton variant="ghost" icon={Download}>Export</SoloButton>
            <SoloButton variant="ghost" icon={RefreshCw}>Refresh</SoloButton>
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-solo-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                className="pl-10 pr-4 py-2 border border-solo-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-solo-primary focus:border-transparent"
              />
            </div>
            <SoloButton variant="ghost" icon={Filter}>Filter</SoloButton>
          </div>
        </div>
        
        <div className="text-center py-16 text-solo-gray-500">
          <Users className="h-16 w-16 mx-auto mb-4" />
          <p>User management interface will be implemented here</p>
          <p className="text-sm mt-2">With advanced filtering, sorting, and user actions</p>
        </div>
      </div>
    </SoloCard>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'users':
        return renderUsers();
      case 'doubt-oversight':
        return <AdminDoubtOversightIntegrated user={user} />;
      default:
        return (
          <SoloCard title={navigationTabs.find(tab => tab.id === activeTab)?.label || 'Feature'}>
            <div className="text-center py-16 text-solo-gray-500">
              <div className="w-16 h-16 mx-auto mb-4 bg-solo-primary-light rounded-2xl flex items-center justify-center">
                <Sparkles className="h-8 w-8 text-solo-primary" />
              </div>
              <p className="text-lg font-semibold mb-2">Coming Soon</p>
              <p>This feature is being developed with our new SOLO design system</p>
            </div>
          </SoloCard>
        );
    }
  };

  return (
    <div className="min-h-screen bg-solo-gray-50 dark:bg-solo-dark">
      <SoloHeader user={user} onLogout={onLogout} />
      <SoloNavigation 
        tabs={navigationTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default SoloAdminDashboard;
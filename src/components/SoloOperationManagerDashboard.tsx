import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, BarChart3, Users, DollarSign, Building, TrendingUp,
  Monitor, HeadphonesIcon, FileText, Settings, Activity, AlertTriangle,
  CheckCircle, Clock, Zap, Target, Download, RefreshCw, Bell, Phone,
  UserCheck, CreditCard, Gauge, Server, Database, Shield, Globe
} from 'lucide-react';
import { User as UserType } from '../types';
import { SoloHeader } from './shared/SoloHeader';
import { SoloNavigation, NavigationTab } from './shared/SoloNavigation';
import { SoloCard, SoloStatCard } from './shared/SoloCard';
import { SoloButton } from './shared/SoloButton';

interface SoloOperationManagerDashboardProps {
  user: UserType;
  onLogout: () => void;
}

interface OperationStats {
  totalRevenue: number;
  monthlyGrowth: number;
  activeUsers: number;
  systemUptime: number;
  supportTickets: number;
  resolvedTickets: number;
  institutesActive: number;
  newSignups: number;
  serverLoad: number;
  responseTime: number;
  errorRate: number;
  conversionRate: number;
}

interface SystemMetric {
  name: string;
  value: number;
  unit: string;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
}

interface SupportTicket {
  id: string;
  title: string;
  user: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  createdAt: string;
  assignedTo?: string;
}

const SoloOperationManagerDashboard: React.FC<SoloOperationManagerDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [stats, setStats] = useState<OperationStats>({
    totalRevenue: 1247500,
    monthlyGrowth: 15.8,
    activeUsers: 3456,
    systemUptime: 99.97,
    supportTickets: 67,
    resolvedTickets: 45,
    institutesActive: 156,
    newSignups: 89,
    serverLoad: 68.5,
    responseTime: 125,
    errorRate: 0.02,
    conversionRate: 12.5
  });

  const [systemMetrics] = useState<SystemMetric[]>([
    { name: 'CPU Usage', value: 68.5, unit: '%', status: 'good', trend: 'stable' },
    { name: 'Memory', value: 74.2, unit: '%', status: 'good', trend: 'up' },
    { name: 'Disk Space', value: 45.8, unit: '%', status: 'excellent', trend: 'down' },
    { name: 'Network', value: 89.1, unit: 'Mbps', status: 'excellent', trend: 'up' },
    { name: 'Database', value: 156, unit: 'ms', status: 'good', trend: 'stable' },
    { name: 'API Response', value: 125, unit: 'ms', status: 'excellent', trend: 'down' }
  ]);

  const [recentTickets] = useState<SupportTicket[]>([
    {
      id: '1', title: 'Login issues with mobile app', user: 'student@dps.edu',
      priority: 'high', status: 'in_progress', createdAt: '2 hours ago', assignedTo: 'Tech Team'
    },
    {
      id: '2', title: 'Payment gateway error', user: 'admin@jgu.edu',
      priority: 'critical', status: 'open', createdAt: '4 hours ago'
    },
    {
      id: '3', title: 'Slow loading dashboard', user: 'parent@gmail.com',
      priority: 'medium', status: 'resolved', createdAt: '1 day ago', assignedTo: 'DevOps'
    }
  ]);

  const navigationTabs: NavigationTab[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'users', label: 'User Management', icon: Users, badge: stats.newSignups },
    { id: 'financial', label: 'Financial', icon: DollarSign },
    { id: 'content', label: 'Content Oversight', icon: FileText },
    { id: 'support', label: 'Support Center', icon: HeadphonesIcon, badge: stats.supportTickets },
    { id: 'system-health', label: 'System Health', icon: Monitor },
    { id: 'reports', label: 'Reports', icon: Download },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      excellent: 'text-solo-success bg-solo-success-light',
      good: 'text-solo-primary bg-solo-primary-light',
      warning: 'text-solo-warning bg-solo-warning-light',
      critical: 'text-solo-error bg-solo-error-light'
    };
    return colors[status as keyof typeof colors] || colors.good;
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'text-solo-info bg-solo-info-light',
      medium: 'text-solo-warning bg-solo-warning-light',
      high: 'text-solo-error bg-solo-error-light',
      critical: 'text-white bg-solo-error'
    };
    return colors[priority as keyof typeof colors] || colors.medium;
  };

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-solo-1 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold font-jakarta mb-2">
            Operations Command Center 🚀
          </h1>
          <p className="text-white/90 text-lg mb-6">
            Monitor, manage, and optimize SOLO by Legalight platform performance
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-5 w-5" />
                <span className="font-medium">System Uptime</span>
              </div>
              <div className="text-2xl font-bold">{stats.systemUptime}%</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5" />
                <span className="font-medium">Active Users</span>
              </div>
              <div className="text-2xl font-bold">{stats.activeUsers}</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-5 w-5" />
                <span className="font-medium">Monthly Revenue</span>
              </div>
              <div className="text-2xl font-bold">₹{(stats.totalRevenue / 100000).toFixed(1)}L</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5" />
                <span className="font-medium">Growth Rate</span>
              </div>
              <div className="text-2xl font-bold">{stats.monthlyGrowth}%</div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SoloStatCard
          title="Total Revenue"
          value={`₹${(stats.totalRevenue / 100000).toFixed(1)}L`}
          change={{ value: stats.monthlyGrowth, type: 'increase' }}
          icon={DollarSign}
          color="success"
        />
        <SoloStatCard
          title="Support Tickets"
          value={stats.supportTickets.toString()}
          change={{ value: 12, type: 'decrease' }}
          icon={HeadphonesIcon}
          color="warning"
        />
        <SoloStatCard
          title="New Signups"
          value={stats.newSignups.toString()}
          change={{ value: 23.5, type: 'increase' }}
          icon={UserCheck}
          color="primary"
        />
        <SoloStatCard
          title="System Health"
          value={`${stats.systemUptime}%`}
          change={{ value: 0.1, type: 'increase' }}
          icon={Monitor}
          color="info"
        />
      </div>

      {/* Quick Actions & System Status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <SoloCard
          title="Quick Actions"
          subtitle="Operations management tools"
          icon={Zap}
          iconColor="bg-solo-warning-light text-solo-warning"
        >
          <div className="space-y-3">
            <SoloButton variant="primary" size="small" fullWidth icon={Download}>
              Generate Reports
            </SoloButton>
            <SoloButton variant="ghost" size="small" fullWidth icon={RefreshCw}>
              Refresh Systems
            </SoloButton>
            <SoloButton variant="ghost" size="small" fullWidth icon={Bell}>
              Send Alerts
            </SoloButton>
            <SoloButton variant="ghost" size="small" fullWidth icon={Settings}>
              System Config
            </SoloButton>
          </div>
        </SoloCard>

        {/* System Health Overview */}
        <SoloCard
          title="System Health"
          subtitle="Real-time infrastructure monitoring"
          icon={Monitor}
          iconColor="bg-solo-success-light text-solo-success"
          action={
            <SoloButton variant="ghost" size="small" onClick={() => setActiveTab('system-health')}>
              View Details
            </SoloButton>
          }
        >
          <div className="space-y-3">
            {systemMetrics.slice(0, 4).map((metric) => (
              <div key={metric.name} className="flex justify-between items-center">
                <span className="text-sm text-solo-gray-700">{metric.name}</span>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                    {metric.value}{metric.unit}
                  </span>
                  <div className={`w-2 h-2 rounded-full ${
                    metric.trend === 'up' ? 'bg-solo-success' : 
                    metric.trend === 'down' ? 'bg-solo-error' : 'bg-solo-gray-400'
                  }`}></div>
                </div>
              </div>
            ))}
          </div>
        </SoloCard>

        {/* Support Tickets */}
        <SoloCard
          title="Recent Support Tickets"
          subtitle="Latest customer issues"
          icon={HeadphonesIcon}
          iconColor="bg-solo-info-light text-solo-info"
          action={
            <SoloButton variant="ghost" size="small" onClick={() => setActiveTab('support')}>
              View All
            </SoloButton>
          }
        >
          <div className="space-y-3">
            {recentTickets.map((ticket) => (
              <div key={ticket.id} className="p-3 border border-solo-gray-200 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-sm font-medium text-solo-dark">{ticket.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority}
                  </span>
                </div>
                <p className="text-xs text-solo-gray-500 mb-1">{ticket.user}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-solo-gray-400">{ticket.createdAt}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    ticket.status === 'resolved' ? 'bg-solo-success-light text-solo-success' :
                    ticket.status === 'in_progress' ? 'bg-solo-warning-light text-solo-warning' :
                    'bg-solo-error-light text-solo-error'
                  }`}>
                    {ticket.status.replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </SoloCard>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Analytics */}
        <SoloCard
          title="Revenue Analytics"
          subtitle="Financial performance trends"
          icon={BarChart3}
          iconColor="bg-solo-success-light text-solo-success"
          action={
            <SoloButton variant="ghost" size="small" onClick={() => setActiveTab('financial')}>
              View Details
            </SoloButton>
          }
        >
          <div className="h-48 flex items-center justify-center bg-solo-gray-50 rounded-xl">
            <div className="text-center">
              <BarChart3 className="h-16 w-16 mx-auto text-solo-gray-400 mb-4" />
              <p className="text-sm text-solo-gray-500">Revenue chart visualization</p>
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-solo-success">₹12.5L</div>
                  <div className="text-xs text-solo-gray-500">This Month</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-solo-primary">₹10.8L</div>
                  <div className="text-xs text-solo-gray-500">Last Month</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-solo-warning">+15.8%</div>
                  <div className="text-xs text-solo-gray-500">Growth</div>
                </div>
              </div>
            </div>
          </div>
        </SoloCard>

        {/* User Analytics */}
        <SoloCard
          title="User Analytics"
          subtitle="Platform usage statistics"
          icon={Users}
          iconColor="bg-solo-primary-light text-solo-primary"
          action={
            <SoloButton variant="ghost" size="small" onClick={() => setActiveTab('analytics')}>
              View Details
            </SoloButton>
          }
        >
          <div className="h-48 flex items-center justify-center bg-solo-gray-50 rounded-xl">
            <div className="text-center">
              <Activity className="h-16 w-16 mx-auto text-solo-gray-400 mb-4" />
              <p className="text-sm text-solo-gray-500">User activity visualization</p>
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-solo-primary">{stats.activeUsers}</div>
                  <div className="text-xs text-solo-gray-500">Active Users</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-solo-success">{stats.newSignups}</div>
                  <div className="text-xs text-solo-gray-500">New Signups</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-solo-warning">{stats.conversionRate}%</div>
                  <div className="text-xs text-solo-gray-500">Conversion</div>
                </div>
              </div>
            </div>
          </div>
        </SoloCard>
      </div>
    </div>
  );

  const renderSystemHealth = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-solo-dark">System Health</h2>
          <p className="text-solo-gray-600">Real-time infrastructure monitoring and performance metrics</p>
        </div>
        <SoloButton icon={RefreshCw}>Refresh</SoloButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {systemMetrics.map((metric) => (
          <SoloCard key={metric.name} hover>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-solo-dark">{metric.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(metric.status)}`}>
                    {metric.status}
                  </span>
                  <div className={`w-2 h-2 rounded-full ${
                    metric.trend === 'up' ? 'bg-solo-success' : 
                    metric.trend === 'down' ? 'bg-solo-error' : 'bg-solo-gray-400'
                  }`}></div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-solo-primary">{metric.value}</div>
                <div className="text-sm text-solo-gray-500">{metric.unit}</div>
              </div>
            </div>
            
            <div className="w-full bg-solo-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  metric.status === 'excellent' ? 'bg-solo-success' :
                  metric.status === 'good' ? 'bg-solo-primary' :
                  metric.status === 'warning' ? 'bg-solo-warning' : 'bg-solo-error'
                }`}
                style={{ width: `${Math.min(metric.value, 100)}%` }}
              ></div>
            </div>
          </SoloCard>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'system-health':
        return renderSystemHealth();
      default:
        return (
          <SoloCard title={navigationTabs.find(tab => tab.id === activeTab)?.label || 'Feature'}>
            <div className="text-center py-16 text-solo-gray-500">
              <div className="w-16 h-16 mx-auto mb-4 bg-solo-warning-light rounded-2xl flex items-center justify-center">
                <Monitor className="h-8 w-8 text-solo-warning" />
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

export default SoloOperationManagerDashboard;
import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import {
  Users, DollarSign, TrendingUp, AlertTriangle, Settings, Monitor,
  FileText, MessageSquare, Calendar, Download, Upload, Search,
  Filter, RefreshCw, Bell, CheckCircle, XCircle, Clock,
  Eye, Edit, Trash2, Plus, MoreVertical, ExternalLink,
  Target, Award, Activity, Zap, Shield, Database,
  PieChart as PieChartIcon, BarChart3, LineChartIcon,
  UserCheck, UserX, UserPlus, Mail, Phone, MapPin,
  CreditCard, Banknote, Receipt, TrendingDown,
  Server, Cpu, HardDrive, Wifi, Globe, Lock, X,
  Star, Play, Pause, Archive, Share2, BookOpen
} from 'lucide-react';

// Types for Operation Manager Dashboard
interface KPIMetric {
  id: string;
  title: string;
  value: string | number;
  change: number;
  period: string;
  icon: React.ReactNode;
  color: string;
  trend: 'up' | 'down' | 'stable';
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: string;
  subscription: string;
  revenue: number;
  joinedDate: string;
  location: string;
  performance?: {
    testsCompleted: number;
    avgScore: number;
    studyHours: number;
  };
}

interface FinancialData {
  period: string;
  revenue: number;
  subscriptions: number;
  refunds: number;
  netRevenue: number;
  arpu: number; // Average Revenue Per User
}

interface SystemMetric {
  name: string;
  value: number;
  status: 'healthy' | 'warning' | 'critical';
  lastUpdated: string;
  unit: string;
}

interface SupportTicket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignedTo: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

interface ContentItem {
  id: string;
  title: string;
  type: string;
  status: 'draft' | 'review' | 'published' | 'archived';
  author: string;
  createdAt: string;
  views: number;
  completions: number;
  rating: number;
  category: string;
}

const CompleteOperationManagerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State management
  const [kpiMetrics, setKpiMetrics] = useState<KPIMetric[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [financialData, setFinancialData] = useState<FinancialData[]>([]);
  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([]);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>([]);
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);

  // Modal and interaction state
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'user' | 'ticket' | 'content' | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock data initialization
  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true);
        
        // Initialize KPI metrics
        setKpiMetrics([
          {
            id: '1',
            title: 'Total Users',
            value: '12,458',
            change: 8.2,
            period: 'vs last month',
            icon: <Users className="w-6 h-6" />,
            color: 'blue',
            trend: 'up'
          },
          {
            id: '2', 
            title: 'Monthly Revenue',
            value: '₹4,52,890',
            change: 12.5,
            period: 'vs last month',
            icon: <DollarSign className="w-6 h-6" />,
            color: 'green',
            trend: 'up'
          },
          {
            id: '3',
            title: 'Active Sessions',
            value: '3,247',
            change: -2.3,
            period: 'vs yesterday',
            icon: <Activity className="w-6 h-6" />,
            color: 'orange',
            trend: 'down'
          },
          {
            id: '4',
            title: 'System Uptime',
            value: '99.97%',
            change: 0.1,
            period: 'this month',
            icon: <Monitor className="w-6 h-6" />,
            color: 'purple',
            trend: 'stable'
          },
          {
            id: '5',
            title: 'Support Tickets',
            value: '143',
            change: -15.2,
            period: 'open tickets',
            icon: <MessageSquare className="w-6 h-6" />,
            color: 'red',
            trend: 'down'
          },
          {
            id: '6',
            title: 'Content Items',
            value: '2,847',
            change: 23.1,
            period: 'total published',
            icon: <FileText className="w-6 h-6" />,
            color: 'indigo',
            trend: 'up'
          }
        ]);

        // Initialize users
        setUsers([
          {
            id: '1',
            name: 'Ananya Kumar',
            email: 'ananya@demo.com',
            role: 'student',
            status: 'active',
            lastLogin: '2024-01-25 14:30',
            subscription: 'PRO',
            revenue: 2997,
            joinedDate: '2023-09-15',
            location: 'Delhi',
            performance: {
              testsCompleted: 45,
              avgScore: 82.4,
              studyHours: 340
            }
          },
          {
            id: '2',
            name: 'Rajesh Kumar',
            email: 'parent@demo.com',
            role: 'parent',
            status: 'active',
            lastLogin: '2024-01-25 09:15',
            subscription: 'FAMILY',
            revenue: 5994,
            joinedDate: '2023-09-15',
            location: 'Delhi'
          },
          {
            id: '3',
            name: 'Dr. Priya Sharma',
            email: 'educator@demo.com',
            role: 'educator',
            status: 'active',
            lastLogin: '2024-01-25 16:45',
            subscription: 'EDUCATOR',
            revenue: 15000,
            joinedDate: '2023-08-01',
            location: 'Mumbai'
          },
          {
            id: '4',
            name: 'Arjun Kumar',
            email: 'arjun@demo.com',
            role: 'student',
            status: 'inactive',
            lastLogin: '2024-01-20 11:20',
            subscription: 'BASIC',
            revenue: 999,
            joinedDate: '2024-01-01',
            location: 'Delhi',
            performance: {
              testsCompleted: 12,
              avgScore: 75.8,
              studyHours: 85
            }
          }
        ]);

        // Initialize financial data
        setFinancialData([
          { period: 'Jan 2024', revenue: 485920, subscriptions: 1247, refunds: 12500, netRevenue: 473420, arpu: 58 },
          { period: 'Dec 2023', revenue: 432890, subscriptions: 1198, refunds: 15200, netRevenue: 417690, arpu: 55 },
          { period: 'Nov 2023', revenue: 398750, subscriptions: 1156, refunds: 11800, netRevenue: 386950, arpu: 52 },
          { period: 'Oct 2023', revenue: 376420, subscriptions: 1087, refunds: 9600, netRevenue: 366820, arpu: 49 },
          { period: 'Sep 2023', revenue: 345680, subscriptions: 1034, refunds: 8900, netRevenue: 336780, arpu: 47 },
          { period: 'Aug 2023', revenue: 321450, subscriptions: 987, refunds: 10200, netRevenue: 311250, arpu: 46 }
        ]);

        // Initialize system metrics
        setSystemMetrics([
          { name: 'CPU Usage', value: 72, status: 'healthy', lastUpdated: '2024-01-25T16:45:00Z', unit: '%' },
          { name: 'Memory Usage', value: 84, status: 'warning', lastUpdated: '2024-01-25T16:45:00Z', unit: '%' },
          { name: 'Disk Usage', value: 58, status: 'healthy', lastUpdated: '2024-01-25T16:44:00Z', unit: '%' },
          { name: 'Response Time', value: 245, status: 'healthy', lastUpdated: '2024-01-25T16:45:00Z', unit: 'ms' },
          { name: 'Error Rate', value: 0.02, status: 'healthy', lastUpdated: '2024-01-25T16:45:00Z', unit: '%' },
          { name: 'Database Connections', value: 156, status: 'healthy', lastUpdated: '2024-01-25T16:45:00Z', unit: 'active' }
        ]);

        // Initialize support tickets
        setSupportTickets([
          {
            id: 'TKT-001',
            title: 'Login issues with mobile app',
            description: 'Users reporting difficulty logging in through mobile application. Getting "Invalid credentials" error even with correct passwords.',
            status: 'open',
            priority: 'high',
            assignedTo: 'Tech Support Team',
            createdBy: 'parent@demo.com',
            createdAt: '2024-01-25T10:30:00Z',
            updatedAt: '2024-01-25T14:20:00Z',
            tags: ['mobile', 'authentication', 'urgent']
          },
          {
            id: 'TKT-002',
            title: 'Payment gateway timeout',
            description: 'Payment processing is timing out during subscription renewal. Multiple users affected across different payment methods.',
            status: 'in_progress',
            priority: 'urgent',
            assignedTo: 'Payment Team',
            createdBy: 'user@example.com',
            createdAt: '2024-01-24T09:15:00Z',
            updatedAt: '2024-01-25T11:45:00Z',
            tags: ['payment', 'gateway', 'timeout']
          },
          {
            id: 'TKT-003',
            title: 'Content not loading properly',
            description: 'Video lectures are buffering continuously and not playing. Issue seems to be with CDN distribution.',
            status: 'resolved',
            priority: 'medium',
            assignedTo: 'Content Team',
            createdBy: 'student@demo.com',
            createdAt: '2024-01-23T16:20:00Z',
            updatedAt: '2024-01-24T08:30:00Z',
            tags: ['content', 'video', 'performance']
          },
          {
            id: 'TKT-004',
            title: 'Dashboard loading slowly',
            description: 'Parent dashboard taking too long to load, especially the analytics section. Performance optimization needed.',
            status: 'open',
            priority: 'low',
            assignedTo: 'Development Team',
            createdBy: 'parent@demo.com',
            createdAt: '2024-01-22T14:10:00Z',
            updatedAt: '2024-01-22T14:10:00Z',
            tags: ['performance', 'dashboard', 'optimization']
          }
        ]);

        // Initialize content items
        setContentItems([
          {
            id: 'CONT-001',
            title: 'Constitutional Law Fundamentals',
            type: 'Video Lecture',
            status: 'published',
            author: 'Dr. Priya Sharma',
            createdAt: '2024-01-15',
            views: 2847,
            completions: 2156,
            rating: 4.8,
            category: 'Legal Reasoning'
          },
          {
            id: 'CONT-002',
            title: 'Current Affairs Mock Test #15',
            type: 'Assessment',
            status: 'published',
            author: 'Prof. Rajesh Kumar',
            createdAt: '2024-01-20',
            views: 1923,
            completions: 1654,
            rating: 4.6,
            category: 'Current Affairs'
          },
          {
            id: 'CONT-003',
            title: 'English Comprehension Strategies',
            type: 'Reading Material',
            status: 'review',
            author: 'Ms. Anita Singh',
            createdAt: '2024-01-22',
            views: 0,
            completions: 0,
            rating: 0,
            category: 'English'
          },
          {
            id: 'CONT-004',
            title: 'Quantitative Aptitude Practice Set',
            type: 'Practice Set',
            status: 'draft',
            author: 'Dr. Vikram Patel',
            createdAt: '2024-01-25',
            views: 0,
            completions: 0,
            rating: 0,
            category: 'Quantitative Techniques'
          },
          {
            id: 'CONT-005',
            title: 'Contract Law Case Studies',
            type: 'Case Study',
            status: 'published',
            author: 'Adv. Meera Gupta',
            createdAt: '2024-01-18',
            views: 1567,
            completions: 1234,
            rating: 4.7,
            category: 'Legal Reasoning'
          }
        ]);

        setError(null);
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error('Dashboard error:', err);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, []);

  // Handler functions
  const handleExport = (reportType: string) => {
    console.log('Exporting report:', reportType);
    // Create a downloadable CSV/PDF report
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `${reportType}_report_${timestamp}.csv`;
    
    // Mock CSV data based on report type
    let csvContent = '';
    switch (reportType) {
      case 'users':
        csvContent = 'Name,Email,Role,Status,Last Login,Revenue\n';
        users.forEach(user => {
          csvContent += `${user.name},${user.email},${user.role},${user.status},${user.lastLogin},${user.revenue}\n`;
        });
        break;
      case 'financial':
        csvContent = 'Period,Revenue,Subscriptions,Refunds,Net Revenue\n';
        financialData.forEach(item => {
          csvContent += `${item.period},${item.revenue},${item.subscriptions},${item.refunds},${item.netRevenue}\n`;
        });
        break;
      case 'content':
        csvContent = 'Title,Type,Status,Views,Completions,Rating\n';
        contentItems.forEach(item => {
          csvContent += `${item.title},${item.type},${item.status},${item.views},${item.completions},${item.rating}\n`;
        });
        break;
      default:
        csvContent = 'Report data not available\n';
    }
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleUserAction = (action: string, userId?: string) => {
    const user = users.find(u => u.id === userId);
    switch (action) {
      case 'create':
        setEditingItem(null);
        setModalType('user');
        setShowModal(true);
        break;
      case 'edit':
        setEditingItem(user);
        setModalType('user');
        setShowModal(true);
        break;
      case 'delete':
        if (user && window.confirm(`Are you sure you want to delete ${user.name}?`)) {
          setUsers(users.filter(u => u.id !== userId));
        }
        break;
      case 'suspend':
        if (user) {
          setUsers(users.map(u => u.id === userId ? { ...u, status: u.status === 'suspended' ? 'active' : 'suspended' } : u));
        }
        break;
    }
  };

  const handleTicketAction = (action: string, ticketId?: string) => {
    const ticket = supportTickets.find(t => t.id === ticketId);
    switch (action) {
      case 'create':
        setEditingItem(null);
        setModalType('ticket');
        setShowModal(true);
        break;
      case 'edit':
        setEditingItem(ticket);
        setModalType('ticket');
        setShowModal(true);
        break;
      case 'resolve':
        if (ticket) {
          setSupportTickets(supportTickets.map(t => 
            t.id === ticketId ? { ...t, status: 'resolved' } : t
          ));
        }
        break;
      case 'close':
        if (ticket) {
          setSupportTickets(supportTickets.map(t => 
            t.id === ticketId ? { ...t, status: 'closed' } : t
          ));
        }
        break;
    }
  };

  const handleContentAction = (action: string, contentId?: string) => {
    const content = contentItems.find(c => c.id === contentId);
    switch (action) {
      case 'create':
        setEditingItem(null);
        setModalType('content');
        setShowModal(true);
        break;
      case 'edit':
        setEditingItem(content);
        setModalType('content');
        setShowModal(true);
        break;
      case 'publish':
        if (content) {
          setContentItems(contentItems.map(c => 
            c.id === contentId ? { ...c, status: 'published' } : c
          ));
        }
        break;
      case 'archive':
        if (content) {
          setContentItems(contentItems.map(c => 
            c.id === contentId ? { ...c, status: 'archived' } : c
          ));
        }
        break;
    }
  };

  // Utility functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'review': return 'bg-blue-100 text-blue-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSystemStatus = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  // Filter functions
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const filteredTickets = supportTickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const filteredContent = contentItems.filter(content => {
    const matchesSearch = content.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         content.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <RefreshCw className="w-6 h-6 animate-spin text-purple-600" />
          <span className="text-lg text-gray-600">Loading Operation Manager Dashboard...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                  <Monitor className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Operation Manager</h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                OM
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'analytics', label: 'Analytics', icon: LineChartIcon },
              { id: 'users', label: 'User Management', icon: Users },
              { id: 'financial', label: 'Financial', icon: DollarSign },
              { id: 'content', label: 'Content', icon: FileText },
              { id: 'support', label: 'Support', icon: MessageSquare },
              { id: 'system', label: 'System Health', icon: Monitor },
              { id: 'reports', label: 'Reports', icon: Download },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* KPI Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {kpiMetrics.map((metric) => (
                <div key={metric.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                      <p className="text-sm text-gray-600">{metric.title}</p>
                    </div>
                    <div className={`p-3 bg-${metric.color}-100 rounded-lg`}>
                      {metric.icon}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center">
                    {metric.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500 mr-1" />}
                    {metric.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-500 mr-1" />}
                    {metric.trend === 'stable' && <Activity className="w-4 h-4 text-gray-500 mr-1" />}
                    <span className={`text-sm ${metric.trend === 'up' ? 'text-green-600' : metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'}`}>
                      {metric.change > 0 ? '+' : ''}{metric.change}% {metric.period}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={() => handleUserAction('create')}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow text-left"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <UserPlus className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Add User</h3>
                    <p className="text-sm text-gray-600">Create new user account</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleTicketAction('create')}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow text-left"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <Plus className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">New Ticket</h3>
                    <p className="text-sm text-gray-600">Create support ticket</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleContentAction('create')}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow text-left"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Add Content</h3>
                    <p className="text-sm text-gray-600">Create new content item</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleExport('all')}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow text-left"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Download className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Export Data</h3>
                    <p className="text-sm text-gray-600">Download reports</p>
                  </div>
                </div>
              </button>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">New user registration</p>
                    <p className="text-xs text-gray-500">student@newuser.com joined 5 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Payment received</p>
                    <p className="text-xs text-gray-500">₹999 subscription payment from parent@demo.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Support ticket created</p>
                    <p className="text-xs text-gray-500">Login issues reported by user</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
              <div className="flex items-center space-x-3">
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm">
                  <option>Last 30 days</option>
                  <option>Last 7 days</option>
                  <option>Last 90 days</option>
                </select>
                <button
                  onClick={() => handleExport('analytics')}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            {/* Analytics Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">User Growth</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={financialData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="subscriptions" stroke="#8884d8" name="Subscriptions" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Revenue Breakdown</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Student Subscriptions', value: 65, fill: '#8884d8' },
                        { name: 'Parent Plans', value: 25, fill: '#82ca9d' },
                        { name: 'Educator Access', value: 10, fill: '#ffc658' }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label
                    />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Engagement Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">78.5%</p>
                    <p className="text-sm text-gray-600">User Engagement</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Activity className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">42.3</p>
                    <p className="text-sm text-gray-600">Avg. Session (min)</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">3.2%</p>
                    <p className="text-sm text-gray-600">Churn Rate</p>
                  </div>
                  <div className="p-3 bg-red-100 rounded-lg">
                    <TrendingDown className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">4.6/5</p>
                    <p className="text-sm text-gray-600">Satisfaction Score</p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <Star className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* User Management Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* User Management Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleUserAction('create')}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Add User</span>
                </button>
                <button
                  onClick={() => handleExport('users')}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="all">All Roles</option>
                    <option value="student">Student</option>
                    <option value="parent">Parent</option>
                    <option value="educator">Educator</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedRole('all');
                      setSelectedStatus('all');
                    }}
                    className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>

            {/* User Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{users.filter(u => u.status === 'active').length}</p>
                    <p className="text-sm text-gray-600">Active Users</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <UserCheck className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{users.filter(u => u.role === 'student').length}</p>
                    <p className="text-sm text-gray-600">Students</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{users.filter(u => u.role === 'parent').length}</p>
                    <p className="text-sm text-gray-600">Parents</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{users.filter(u => u.status === 'suspended').length}</p>
                    <p className="text-sm text-gray-600">Suspended</p>
                  </div>
                  <div className="p-3 bg-red-100 rounded-lg">
                    <UserX className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subscription</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.subscription}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{user.revenue.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.lastLogin}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleUserAction('edit', user.id)}
                              className="text-purple-600 hover:text-purple-900"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleUserAction('suspend', user.id)}
                              className="text-yellow-600 hover:text-yellow-900"
                            >
                              <Clock className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleUserAction('delete', user.id)}
                              className="text-red-600 hover:text-red-900"
                            >
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
        )}

        {/* Financial Tab */}
        {activeTab === 'financial' && (
          <div className="space-y-6">
            {/* Financial Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Financial Overview</h2>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleExport('financial')}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Financial Report</span>
                </button>
              </div>
            </div>

            {/* Financial KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">₹4,85,920</p>
                    <p className="text-sm text-gray-600">Monthly Revenue</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+12.5% from last month</span>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">₹58</p>
                    <p className="text-sm text-gray-600">ARPU</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+5.8% from last month</span>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">₹12,500</p>
                    <p className="text-sm text-gray-600">Refunds</p>
                  </div>
                  <div className="p-3 bg-red-100 rounded-lg">
                    <Banknote className="w-6 h-6 text-red-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  <span className="text-sm text-red-600">-3.2% from last month</span>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">97.4%</p>
                    <p className="text-sm text-gray-600">Collection Rate</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Receipt className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <Activity className="w-4 h-4 text-gray-500 mr-1" />
                  <span className="text-sm text-gray-600">Stable</span>
                </div>
              </div>
            </div>

            {/* Financial Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Revenue vs Refunds</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={financialData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" fill="#10b981" name="Revenue" />
                    <Bar dataKey="refunds" fill="#ef4444" name="Refunds" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Monthly Growth</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={financialData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="subscriptions" stroke="#8b5cf6" name="Subscriptions" />
                    <Line type="monotone" dataKey="arpu" stroke="#06b6d4" name="ARPU" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* Content Management Tab */}
        {activeTab === 'content' && (
          <div className="space-y-6">
            {/* Content Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Content Management</h2>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleContentAction('create')}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Content</span>
                </button>
                <button
                  onClick={() => handleExport('content')}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            {/* Content Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{contentItems.filter(c => c.status === 'published').length}</p>
                    <p className="text-sm text-gray-600">Published</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{contentItems.filter(c => c.status === 'draft').length}</p>
                    <p className="text-sm text-gray-600">Drafts</p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <Edit className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{contentItems.filter(c => c.status === 'review').length}</p>
                    <p className="text-sm text-gray-600">In Review</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Eye className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{Math.round(contentItems.reduce((acc, c) => acc + c.rating, 0) / contentItems.filter(c => c.rating > 0).length * 10) / 10 || 0}</p>
                    <p className="text-sm text-gray-600">Avg Rating</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Star className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Content Search */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search content..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <select className="border border-gray-300 rounded-lg px-3 py-2">
                  <option>All Types</option>
                  <option>Video Lecture</option>
                  <option>Assessment</option>
                  <option>Reading Material</option>
                  <option>Practice Set</option>
                </select>
                <select className="border border-gray-300 rounded-lg px-3 py-2">
                  <option>All Status</option>
                  <option>Published</option>
                  <option>Draft</option>
                  <option>Review</option>
                  <option>Archived</option>
                </select>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredContent.map((content) => (
                <div key={content.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{content.title}</h3>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                            {content.type}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(content.status)}`}>
                            {content.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">by {content.author}</p>
                        <p className="text-xs text-gray-500">{content.category}</p>
                      </div>
                      <div className="relative">
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {content.status === 'published' && (
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <p className="text-lg font-semibold text-gray-900">{content.views.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">Views</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-semibold text-gray-900">{content.completions.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">Completions</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-semibold text-gray-900">{content.rating}</p>
                          <p className="text-xs text-gray-500">Rating</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleContentAction('edit', content.id)}
                          className="p-2 text-gray-400 hover:text-purple-600"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        {content.status === 'published' ? (
                          <button
                            onClick={() => handleContentAction('archive', content.id)}
                            className="p-2 text-gray-400 hover:text-orange-600"
                          >
                            <Archive className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => handleContentAction('publish', content.id)}
                            className="p-2 text-gray-400 hover:text-green-600"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button className="p-2 text-gray-400 hover:text-blue-600">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-xs text-gray-500">{content.createdAt}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Support Tickets Tab */}
        {activeTab === 'support' && (
          <div className="space-y-6">
            {/* Support Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Support Tickets</h2>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleTicketAction('create')}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Ticket</span>
                </button>
                <button
                  onClick={() => handleExport('support')}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            {/* Support Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{supportTickets.filter(t => t.status === 'open').length}</p>
                    <p className="text-sm text-gray-600">Open Tickets</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <MessageSquare className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{supportTickets.filter(t => t.status === 'in_progress').length}</p>
                    <p className="text-sm text-gray-600">In Progress</p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-lg">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{supportTickets.filter(t => t.status === 'resolved').length}</p>
                    <p className="text-sm text-gray-600">Resolved</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{supportTickets.filter(t => t.priority === 'urgent' || t.priority === 'high').length}</p>
                    <p className="text-sm text-gray-600">High Priority</p>
                  </div>
                  <div className="p-3 bg-red-100 rounded-lg">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </div>
            </div>

            {/* Support Search */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search tickets..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <select className="border border-gray-300 rounded-lg px-3 py-2">
                  <option>All Status</option>
                  <option>Open</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                  <option>Closed</option>
                </select>
                <select className="border border-gray-300 rounded-lg px-3 py-2">
                  <option>All Priority</option>
                  <option>Urgent</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
            </div>

            {/* Tickets List */}
            <div className="space-y-4">
              {filteredTickets.map((ticket) => (
                <div key={ticket.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{ticket.title}</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(ticket.status)}`}>
                          {ticket.status}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{ticket.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>ID: {ticket.id}</span>
                        <span>Created by: {ticket.createdBy}</span>
                        <span>Assigned to: {ticket.assignedTo}</span>
                        <span>Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2 mt-3">
                        {ticket.tags.map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => handleTicketAction('edit', ticket.id)}
                        className="p-2 text-gray-400 hover:text-purple-600"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      {ticket.status !== 'resolved' && (
                        <button
                          onClick={() => handleTicketAction('resolve', ticket.id)}
                          className="p-2 text-gray-400 hover:text-green-600"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleTicketAction('close', ticket.id)}
                        className="p-2 text-gray-400 hover:text-red-600"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* System Health Tab */}
        {activeTab === 'system' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">System Health Monitoring</h2>
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                  <RefreshCw className="w-4 h-4" />
                  <span>Refresh</span>
                </button>
                <button
                  onClick={() => handleExport('system')}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
              </div>
            </div>

            {/* System Status Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-green-600">99.97%</p>
                    <p className="text-sm text-gray-600">System Uptime</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-xs text-gray-500">Last 30 days</p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-blue-600">245ms</p>
                    <p className="text-sm text-gray-600">Avg Response Time</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-xs text-gray-500">Last hour</p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-red-600">0.02%</p>
                    <p className="text-sm text-gray-600">Error Rate</p>
                  </div>
                  <div className="p-3 bg-red-100 rounded-lg">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-xs text-gray-500">Last 24 hours</p>
                </div>
              </div>
            </div>

            {/* System Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Server Metrics</h3>
                <div className="space-y-4">
                  {systemMetrics.map((metric) => (
                    <div key={metric.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          {metric.name === 'CPU Usage' && <Cpu className="w-5 h-5 text-blue-600" />}
                          {metric.name === 'Memory Usage' && <Database className="w-5 h-5 text-purple-600" />}
                          {metric.name === 'Disk Usage' && <HardDrive className="w-5 h-5 text-green-600" />}
                          {metric.name === 'Response Time' && <Zap className="w-5 h-5 text-yellow-600" />}
                          {metric.name === 'Error Rate' && <AlertTriangle className="w-5 h-5 text-red-600" />}
                          {metric.name === 'Database Connections' && <Server className="w-5 h-5 text-indigo-600" />}
                          <span className="text-sm font-medium text-gray-900">{metric.name}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-semibold text-gray-900">
                          {metric.value}{metric.unit}
                        </span>
                        <div className={`w-2 h-2 rounded-full ${
                          metric.status === 'healthy' ? 'bg-green-500' :
                          metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Service Status</h3>
                <div className="space-y-4">
                  {[
                    { name: 'Web Application', status: 'healthy', icon: Globe },
                    { name: 'API Gateway', status: 'healthy', icon: Server },
                    { name: 'Database', status: 'healthy', icon: Database },
                    { name: 'File Storage', status: 'warning', icon: HardDrive },
                    { name: 'Authentication', status: 'healthy', icon: Lock },
                    { name: 'Payment Gateway', status: 'healthy', icon: CreditCard }
                  ].map((service) => (
                    <div key={service.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <service.icon className="w-5 h-5 text-gray-600" />
                        <span className="text-sm font-medium text-gray-900">{service.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm capitalize ${getSystemStatus(service.status)}`}>
                          {service.status}
                        </span>
                        <div className={`w-2 h-2 rounded-full ${
                          service.status === 'healthy' ? 'bg-green-500' :
                          service.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Alerts & Notifications */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Alerts</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-yellow-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-yellow-800">High Memory Usage</p>
                    <p className="text-xs text-yellow-600">Memory usage has exceeded 80% for the past 10 minutes</p>
                  </div>
                  <span className="text-xs text-yellow-600">5 min ago</span>
                </div>
                <div className="flex items-center space-x-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-green-800">System Backup Completed</p>
                    <p className="text-xs text-green-600">Daily backup completed successfully</p>
                  </div>
                  <span className="text-xs text-green-600">2 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reports Tab */}
        {activeTab === 'reports' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Reports & Export</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'User Analytics Report', description: 'Comprehensive user behavior and engagement metrics', icon: Users, type: 'users' },
                { title: 'Financial Report', description: 'Revenue, subscriptions, and payment analytics', icon: DollarSign, type: 'financial' },
                { title: 'Content Performance', description: 'Content views, completions, and ratings', icon: FileText, type: 'content' },
                { title: 'System Performance', description: 'Server metrics and uptime statistics', icon: Monitor, type: 'system' },
                { title: 'Support Analytics', description: 'Ticket resolution and satisfaction metrics', icon: MessageSquare, type: 'support' },
                { title: 'Custom Report', description: 'Build your own custom report', icon: Settings, type: 'custom' }
              ].map((report) => (
                <div key={report.type} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-3 bg-purple-100 rounded-lg">
                      <report.icon className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{report.description}</p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleExport(report.type)}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Export</span>
                    </button>
                    <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Platform Settings</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">System Configuration</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">Maintenance Mode</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">Auto Backups</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">Email Notifications</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
                <div className="space-y-4">
                  <button className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    Reset All User Sessions
                  </button>
                  <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    Generate New API Keys
                  </button>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                    Update Security Policies
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Performance Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cache Expiry (hours)</label>
                    <input
                      type="number"
                      defaultValue="24"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Concurrent Users</label>
                    <input
                      type="number"
                      defaultValue="10000"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Integration Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">Payment Gateway</span>
                    <span className="text-sm text-green-600">Connected</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">Email Service</span>
                    <span className="text-sm text-green-600">Connected</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">Analytics</span>
                    <span className="text-sm text-yellow-600">Pending</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal for CRUD operations */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingItem ? 'Edit' : 'Create'} {modalType}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                {modalType} management form would be implemented here with appropriate fields and validation.
              </p>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompleteOperationManagerDashboard;
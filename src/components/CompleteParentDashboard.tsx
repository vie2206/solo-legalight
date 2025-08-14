import React, { useState, useEffect } from 'react';
import { RevolutionaryLoading, StudySessionLoading } from './shared/RevolutionaryLoading';
import '../styles/revolutionary-theme.css';
import '../styles/revolutionary-components.css';
import { 
  Users, BookOpen, BarChart3, Settings, Clock, Award,
  Target, TrendingUp, Activity, Calendar, MessageSquare,
  FileText, Star, Brain, Zap, Eye, Plus, Edit, Trash2,
  CheckCircle, AlertTriangle, ArrowUp, ArrowDown, Send,
  Download, Filter, Search, RefreshCw, UserPlus, Bell,
  GraduationCap, Clipboard, PieChart, LineChart, Monitor,
  Shield, Mail, Phone, Globe, Upload, Save, Copy, Share2,
  CreditCard, DollarSign, Receipt, Wallet, ShoppingCart,
  Heart, UserCheck, AlertCircle, Home, School, BookOpenCheck,
  Video, Headphones, MessageCircle, PhoneCall, Coffee,
  Gift, Trophy, Medal, Sparkles, Gem, Crown, Flag,
  Baby, UserX, Info, HelpCircle, ExternalLink, Link,
  ChevronRight, ChevronDown, MoreVertical, Grid, List
} from 'lucide-react';

interface CompleteParentDashboardProps {
  user: any;
  onLogout: () => void;
}

interface Child {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  grade: string;
  school: string;
  age: number;
  enrollmentDate: string;
  subscription: 'free' | 'mini' | 'pro' | 'ultra';
  status: 'active' | 'inactive';
  performance: {
    overallScore: number;
    improvement: number;
    rank: number;
    studyHours: number;
    testsCompleted: number;
    attendance: number;
    streak: number;
  };
  subjects: {
    name: string;
    score: number;
    trend: 'up' | 'down' | 'stable';
  }[];
  recentActivity: {
    type: string;
    subject: string;
    score: number;
    date: string;
  }[];
}

interface Message {
  id: string;
  from: string;
  fromRole: 'educator' | 'admin' | 'system';
  subject: string;
  content: string;
  date: string;
  read: boolean;
  priority: 'low' | 'normal' | 'high';
  childId?: string;
}

interface Payment {
  id: string;
  date: string;
  amount: number;
  status: 'success' | 'pending' | 'failed';
  plan: string;
  childName: string;
  method: string;
  invoice: string;
}

interface Event {
  id: string;
  title: string;
  type: 'test' | 'class' | 'meeting' | 'deadline' | 'holiday';
  date: string;
  time: string;
  childId: string;
  childName: string;
  description: string;
  location?: string;
  reminder: boolean;
}

const CompleteParentDashboard: React.FC<CompleteParentDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'children' | 'performance' | 'payments' | 'communication' | 'calendar' | 'resources' | 'rewards' | 'settings' | 'help'>('overview');
  const [selectedChild, setSelectedChild] = useState<string | 'all'>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State management
  const [children, setChildren] = useState<Child[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [dashboardStats, setDashboardStats] = useState({
    totalChildren: 0,
    activeChildren: 0,
    totalStudyHours: 0,
    averageScore: 0,
    upcomingTests: 0,
    unreadMessages: 0,
    totalSpent: 0,
    currentPlan: 'free'
  });

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'addChild' | 'message' | 'payment' | 'schedule' | null>(null);
  const [editingItem, setEditingItem] = useState<any>(null);

  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  // Fetch parent dashboard data
  const fetchParentData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE}/api/dashboard/parent`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        processParentData(data);
      } else {
        console.log('Failed to fetch parent data, using mock data');
        generateMockData();
      }
    } catch (error) {
      console.error('Error fetching parent data:', error);
      setError('Failed to load dashboard data. Using offline mode.');
      generateMockData();
    } finally {
      setLoading(false);
    }
  };

  const processParentData = (data: any) => {
    // Process children data
    const processedChildren = data.children?.map((child: any) => ({
      id: child.id,
      name: child.name,
      email: child.email,
      grade: '10th Grade',
      school: 'Delhi Public School',
      age: 16,
      enrollmentDate: child.created_at,
      subscription: 'pro',
      status: 'active',
      performance: {
        overallScore: child.stats?.average_score || 0,
        improvement: 12,
        rank: 5,
        studyHours: child.stats?.total_reading_time || 0,
        testsCompleted: child.stats?.passages_completed || 0,
        attendance: 92,
        streak: child.stats?.streak || 0
      },
      subjects: [
        { name: 'Legal Reasoning', score: 85, trend: 'up' },
        { name: 'English', score: 78, trend: 'stable' },
        { name: 'Current Affairs', score: 92, trend: 'up' },
        { name: 'Logical Reasoning', score: 73, trend: 'down' }
      ],
      recentActivity: child.recent_activity?.map((activity: any) => ({
        type: activity.type,
        subject: activity.type,
        score: 85,
        date: activity.completed_at
      })) || []
    })) || [];

    setChildren(processedChildren);
    
    // Update dashboard stats
    setDashboardStats({
      totalChildren: data.children?.length || 0,
      activeChildren: processedChildren.filter((c: Child) => c.status === 'active').length,
      totalStudyHours: data.overall_stats?.combined_reading_time || 0,
      averageScore: data.overall_stats?.average_family_score || 0,
      upcomingTests: 3,
      unreadMessages: 5,
      totalSpent: 15000,
      currentPlan: 'pro'
    });
  };

  // Fetch real messages from API
  const fetchMessages = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/parent/messages`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        // Transform real data to match UI expectations
        const transformedMessages = data.messages?.map((msg: any) => ({
          id: msg.id,
          from: msg.sender?.name || 'Unknown',
          fromRole: msg.sender?.role || 'system' as const,
          subject: msg.subject,
          content: msg.message,
          date: formatTimeAgo(new Date(msg.created_at)),
          read: msg.read || false,
          priority: msg.priority,
          childId: msg.child?.id || undefined
        })) || [];
        setMessages(transformedMessages);
      } else {
        console.log('Failed to fetch messages, using mock data');
        setMessages(mockMessagesData);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      setMessages(mockMessagesData);
    }
  };

  // Fetch real payments from API
  const fetchPayments = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/parent/payments`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        // Transform real data to match UI expectations
        const transformedPayments = data.payments?.map((payment: any) => ({
          id: payment.id,
          amount: payment.amount,
          date: new Date(payment.created_at).toLocaleDateString(),
          method: payment.payment_method,
          status: payment.status,
          plan: payment.plan_type,
          transactionId: payment.transaction_id
        })) || [];
        setPayments(transformedPayments);
      } else {
        console.log('Failed to fetch payments, using mock data');
        setPayments(mockPaymentsData);
      }
    } catch (error) {
      console.error('Error fetching payments:', error);
      setPayments(mockPaymentsData);
    }
  };

  // Helper function to format time ago
  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  // Mock data constants
  const mockMessagesData: Message[] = [
    {
      id: '1',
      from: 'Dr. Priya Sharma',
      fromRole: 'educator' as const,
      subject: 'Ananya\'s Progress Update',
      content: 'I wanted to update you on Ananya\'s recent performance...',
      date: '2 hours ago',
      read: false,
      priority: 'normal' as const,
      childId: 'ananya-kumar'
    },
    {
      id: '2', 
      from: 'Support Team',
      fromRole: 'admin' as const,
      subject: 'Payment Confirmation',
      content: 'Your payment of ₹999 has been successfully processed...',
      date: '1 day ago',
      read: true,
      priority: 'low' as const,
      childId: undefined
    }
  ];

  const mockPaymentsData: Payment[] = [
    {
      id: '1',
      amount: 999,
      date: '2024-01-15',
      method: 'Credit Card',
      status: 'success',
      plan: 'PRO Family',
      childName: 'Ananya Kumar',
      invoice: 'INV_2024_001'
    },
    {
      id: '2',
      amount: 999,
      date: '2023-12-15',
      method: 'UPI',
      status: 'success',
      plan: 'PRO Family',
      childName: 'Ananya Kumar',
      invoice: 'INV_2023_085'
    },
    {
      id: '3',
      amount: 2847,
      date: '2023-09-15',
      method: 'Net Banking',
      status: 'success',
      plan: 'PRO Family (Quarterly)',
      childName: 'Ananya Kumar',
      invoice: 'INV_2023_043'
    }
  ];

  const generateMockData = () => {
    // Generate mock children data
    const mockChildren: Child[] = [
      {
        id: '1',
        name: 'Arjun Kumar',
        email: 'arjun.kumar@student.com',
        grade: '11th Grade',
        school: 'Delhi Public School',
        age: 17,
        enrollmentDate: '2024-01-15',
        subscription: 'pro',
        status: 'active',
        performance: {
          overallScore: 82,
          improvement: 15,
          rank: 12,
          studyHours: 145,
          testsCompleted: 28,
          attendance: 94,
          streak: 21
        },
        subjects: [
          { name: 'Legal Reasoning', score: 88, trend: 'up' },
          { name: 'English', score: 76, trend: 'stable' },
          { name: 'Current Affairs', score: 85, trend: 'up' },
          { name: 'Logical Reasoning', score: 79, trend: 'up' },
          { name: 'Mathematics', score: 82, trend: 'stable' }
        ],
        recentActivity: [
          { type: 'test', subject: 'Legal Reasoning', score: 92, date: '2024-07-30' },
          { type: 'assignment', subject: 'English', score: 78, date: '2024-07-29' },
          { type: 'quiz', subject: 'Current Affairs', score: 88, date: '2024-07-28' }
        ]
      },
      {
        id: '2',
        name: 'Priya Kumar',
        email: 'priya.kumar@student.com',
        grade: '10th Grade',
        school: 'Delhi Public School',
        age: 15,
        enrollmentDate: '2024-01-15',
        subscription: 'pro',
        status: 'active',
        performance: {
          overallScore: 78,
          improvement: 8,
          rank: 24,
          studyHours: 98,
          testsCompleted: 22,
          attendance: 88,
          streak: 12
        },
        subjects: [
          { name: 'Legal Reasoning', score: 75, trend: 'up' },
          { name: 'English', score: 82, trend: 'up' },
          { name: 'Current Affairs', score: 72, trend: 'stable' },
          { name: 'Logical Reasoning', score: 80, trend: 'down' },
          { name: 'Mathematics', score: 79, trend: 'up' }
        ],
        recentActivity: [
          { type: 'test', subject: 'English', score: 85, date: '2024-07-30' },
          { type: 'quiz', subject: 'Mathematics', score: 82, date: '2024-07-29' },
          { type: 'assignment', subject: 'Legal Reasoning', score: 76, date: '2024-07-28' }
        ]
      }
    ];

    setChildren(mockChildren);
    
    // Generate mock messages
    const mockMessages: Message[] = [
      {
        id: '1',
        from: 'Ms. Sharma',
        fromRole: 'educator',
        subject: 'Arjun\'s Excellent Performance in Mock Test',
        content: 'I\'m pleased to inform you that Arjun scored 92% in today\'s Legal Reasoning mock test.',
        date: '2024-07-30',
        read: false,
        priority: 'high',
        childId: '1'
      },
      {
        id: '2',
        from: 'System',
        fromRole: 'system',
        subject: 'Payment Due Reminder',
        content: 'Your subscription payment for next month is due on August 5th.',
        date: '2024-07-29',
        read: true,
        priority: 'normal',
        childId: undefined
      }
    ];

    fetchMessages();
    fetchPayments();

    // Payments will be fetched via fetchPayments() call above

    // Generate mock events
    const mockEvents: Event[] = [
      {
        id: '1',
        title: 'CLAT Mock Test #15',
        type: 'test',
        date: '2024-08-05',
        time: '10:00 AM',
        childId: '1',
        childName: 'Arjun Kumar',
        description: 'Full-length CLAT mock test',
        location: 'Online',
        reminder: true
      },
      {
        id: '2',
        title: 'Parent-Teacher Meeting',
        type: 'meeting',
        date: '2024-08-08',
        time: '3:00 PM',
        childId: 'all',
        childName: 'All Children',
        description: 'Monthly progress discussion',
        location: 'Video Call',
        reminder: true
      }
    ];

    setEvents(mockEvents);

    // Set dashboard stats
    setDashboardStats({
      totalChildren: mockChildren.length,
      activeChildren: mockChildren.filter(c => c.status === 'active').length,
      totalStudyHours: mockChildren.reduce((sum, child) => sum + child.performance.studyHours, 0),
      averageScore: Math.round(mockChildren.reduce((sum, child) => sum + child.performance.overallScore, 0) / mockChildren.length),
      upcomingTests: 3,
      unreadMessages: mockMessages.filter(m => !m.read).length,
      totalSpent: 12000,
      currentPlan: 'pro'
    });
  };

  useEffect(() => {
    fetchParentData();
  }, []);

  // Button Handlers
  const handleAddChild = async (childData: any) => {
    try {
      const response = await fetch(`${API_BASE}/api/parent/children`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(childData)
      });
      
      if (response.ok) {
        fetchParentData();
        setShowModal(false);
      } else {
        setError('Failed to add child');
      }
    } catch (err) {
      setError('Network error while adding child');
    }
  };

  const handleSendMessage = async (messageData: any) => {
    try {
      const response = await fetch(`${API_BASE}/api/parent/messages`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(messageData)
      });
      
      if (response.ok) {
        setShowModal(false);
        fetchParentData();
      } else {
        setError('Failed to send message');
      }
    } catch (err) {
      setError('Network error while sending message');
    }
  };

  const handleExportReport = async (childId: string, reportType: string) => {
    try {
      const response = await fetch(`${API_BASE}/api/parent/reports/${childId}/${reportType}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${reportType}-report.pdf`;
        a.click();
      } else {
        setError(`Failed to export ${reportType} report`);
      }
    } catch (err) {
      setError(`Network error while exporting report`);
    }
  };

  // Tab Navigation
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'children', label: 'My Children', icon: Users },
    { id: 'performance', label: 'Performance', icon: BarChart3 },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'communication', label: 'Messages', icon: MessageSquare },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'rewards', label: 'Rewards', icon: Trophy },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'help', label: 'Help', icon: HelpCircle }
  ];

  return (
    <div className="min-h-screen dark-theme">
      {/* Revolutionary Parent Header */}
      <header className="glass-card border-0 shadow-none m-4 mb-0">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold gradient-text">SOLO Parent Dashboard</h1>
              {/* Child Selector */}
              <select 
                value={selectedChild}
                onChange={(e) => setSelectedChild(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="all">All Children</option>
                {children.map(child => (
                  <option key={child.id} value={child.id}>{child.name}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={fetchParentData}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Refresh"
              >
                <RefreshCw className="w-5 h-5 text-gray-600" />
              </button>
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                {dashboardStats.unreadMessages > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {dashboardStats.unreadMessages}
                  </span>
                )}
              </button>
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{user?.name || 'Parent'}</p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                <button 
                  onClick={onLogout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tab Navigation */}
        <div className="px-6 -mb-px">
          <nav className="flex space-x-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-3 py-3 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading dashboard...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
              <p className="text-yellow-800">{error}</p>
            </div>
          </div>
        )}

        {/* Content */}
        {!loading && (
          <>
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <span className="text-sm font-medium text-green-600">Active</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{dashboardStats.totalChildren}</h3>
                    <p className="text-sm text-gray-600 mt-1">Total Children</p>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-green-100 rounded-lg">
                        <TrendingUp className="w-6 h-6 text-green-600" />
                      </div>
                      <span className="text-sm font-medium text-green-600">+12%</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{dashboardStats.averageScore}%</h3>
                    <p className="text-sm text-gray-600 mt-1">Average Score</p>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-purple-100 rounded-lg">
                        <Clock className="w-6 h-6 text-purple-600" />
                      </div>
                      <span className="text-sm font-medium text-purple-600">{Math.floor(dashboardStats.totalStudyHours / 60)}h</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{dashboardStats.totalStudyHours}</h3>
                    <p className="text-sm text-gray-600 mt-1">Study Minutes</p>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-orange-100 rounded-lg">
                        <Target className="w-6 h-6 text-orange-600" />
                      </div>
                      <span className="text-sm font-medium text-orange-600">{dashboardStats.upcomingTests}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">This Week</h3>
                    <p className="text-sm text-gray-600 mt-1">Upcoming Tests</p>
                  </div>
                </div>

                {/* Children Overview Cards */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-6">Children Overview</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {children.map((child) => (
                      <div key={child.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">{child.name}</h4>
                            <p className="text-sm text-gray-600">{child.grade} • {child.school}</p>
                          </div>
                          <span className={`px-3 py-1 text-xs rounded-full font-medium ${
                            child.subscription === 'ultra' ? 'bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800' :
                            child.subscription === 'pro' ? 'bg-purple-100 text-purple-800' :
                            child.subscription === 'mini' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {child.subscription.toUpperCase()}
                          </span>
                        </div>
                        
                        {/* Quick Stats */}
                        <div className="grid grid-cols-4 gap-4 mb-4">
                          <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900">{child.performance.overallScore}%</p>
                            <p className="text-xs text-gray-600">Score</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900">#{child.performance.rank}</p>
                            <p className="text-xs text-gray-600">Rank</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900">{child.performance.streak}</p>
                            <p className="text-xs text-gray-600">Streak</p>
                          </div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-gray-900">{child.performance.attendance}%</p>
                            <p className="text-xs text-gray-600">Attendance</p>
                          </div>
                        </div>
                        
                        {/* Subject Performance */}
                        <div className="space-y-2 mb-4">
                          {child.subjects.slice(0, 3).map((subject, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">{subject.name}</span>
                              <div className="flex items-center space-x-2">
                                <div className="w-32 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full ${
                                      subject.score >= 80 ? 'bg-green-500' :
                                      subject.score >= 60 ? 'bg-yellow-500' :
                                      'bg-red-500'
                                    }`}
                                    style={{ width: `${subject.score}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium text-gray-900 w-12 text-right">{subject.score}%</span>
                                {subject.trend === 'up' && <ArrowUp className="w-3 h-3 text-green-600" />}
                                {subject.trend === 'down' && <ArrowDown className="w-3 h-3 text-red-600" />}
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex space-x-3">
                          <button 
                            onClick={() => {
                              setSelectedChild(child.id);
                              setActiveTab('performance');
                            }}
                            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                          >
                            View Details
                          </button>
                          <button 
                            onClick={() => handleExportReport(child.id, 'monthly')}
                            className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                          >
                            Download Report
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activities & Messages */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Activities */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
                    <div className="space-y-4">
                      {children.flatMap(child => 
                        child.recentActivity.map((activity, index) => (
                          <div key={`${child.id}-${index}`} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className={`p-2 rounded-lg ${
                                activity.type === 'test' ? 'bg-blue-100' :
                                activity.type === 'quiz' ? 'bg-green-100' :
                                'bg-purple-100'
                              }`}>
                                {activity.type === 'test' ? <Target className="w-4 h-4 text-blue-600" /> :
                                 activity.type === 'quiz' ? <Brain className="w-4 h-4 text-green-600" /> :
                                 <FileText className="w-4 h-4 text-purple-600" />}
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{child.name} - {activity.subject}</p>
                                <p className="text-xs text-gray-500">{activity.type} • {activity.date}</p>
                              </div>
                            </div>
                            <span className={`text-lg font-bold ${
                              activity.score >= 80 ? 'text-green-600' :
                              activity.score >= 60 ? 'text-yellow-600' :
                              'text-red-600'
                            }`}>
                              {activity.score}%
                            </span>
                          </div>
                        ))
                      ).slice(0, 5)}
                    </div>
                  </div>

                  {/* Recent Messages */}
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold">Recent Messages</h3>
                      <button 
                        onClick={() => setActiveTab('communication')}
                        className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                      >
                        View All
                      </button>
                    </div>
                    <div className="space-y-4">
                      {messages.slice(0, 4).map((message) => (
                        <div key={message.id} className={`p-3 rounded-lg cursor-pointer hover:bg-gray-100 ${
                          !message.read ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-gray-50'
                        }`}>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <p className="text-sm font-medium text-gray-900">{message.from}</p>
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  message.fromRole === 'educator' ? 'bg-purple-100 text-purple-800' :
                                  message.fromRole === 'admin' ? 'bg-blue-100 text-blue-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {message.fromRole}
                                </span>
                                {message.priority === 'high' && (
                                  <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full">
                                    High Priority
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-700">{message.subject}</p>
                              <p className="text-xs text-gray-500 mt-1">{message.date}</p>
                            </div>
                            {!message.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Children Management Tab */}
            {activeTab === 'children' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold">Manage Children</h3>
                    <button 
                      onClick={() => {
                        setModalType('addChild');
                        setShowModal(true);
                      }}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center font-medium"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Add Child
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {children.map((child) => (
                      <div key={child.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
                            {child.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                            child.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {child.status}
                          </span>
                        </div>
                        
                        <h4 className="text-lg font-semibold text-gray-900 mb-1">{child.name}</h4>
                        <p className="text-sm text-gray-600 mb-4">{child.email}</p>
                        
                        <div className="space-y-2 text-sm mb-4">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Grade:</span>
                            <span className="font-medium">{child.grade}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">School:</span>
                            <span className="font-medium">{child.school}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Age:</span>
                            <span className="font-medium">{child.age} years</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Plan:</span>
                            <span className={`font-medium ${
                              child.subscription === 'ultra' ? 'text-purple-600' :
                              child.subscription === 'pro' ? 'text-blue-600' :
                              child.subscription === 'mini' ? 'text-green-600' :
                              'text-gray-600'
                            }`}>
                              {child.subscription.toUpperCase()}
                            </span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm">
                            View Profile
                          </button>
                          <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded text-sm">
                            Settings
                          </button>
                        </div>
                      </div>
                    ))}
                    
                    {/* Add Child Card */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:border-purple-400 transition-colors cursor-pointer"
                         onClick={() => {
                           setModalType('addChild');
                           setShowModal(true);
                         }}>
                      <UserPlus className="w-12 h-12 text-gray-400 mb-3" />
                      <p className="text-gray-600 font-medium">Add Another Child</p>
                      <p className="text-sm text-gray-500 mt-1">Link your child's account</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Performance Tab */}
            {activeTab === 'performance' && (
              <div className="space-y-6">
                {/* Performance Header */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold">Performance Analytics</h3>
                    <div className="flex items-center space-x-3">
                      <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <option value="7d">Last 7 days</option>
                        <option value="30d">Last 30 days</option>
                        <option value="90d">Last 90 days</option>
                      </select>
                      <button 
                        onClick={() => handleExportReport(selectedChild, 'performance')}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center font-medium"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export Report
                      </button>
                    </div>
                  </div>
                  
                  {/* Child Selector for Performance */}
                  {selectedChild === 'all' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {children.map((child) => (
                        <div key={child.id} className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 mb-3">{child.name}'s Performance</h4>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Overall Score</span>
                              <span className="text-lg font-bold text-gray-900">{child.performance.overallScore}%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Improvement</span>
                              <span className="text-lg font-bold text-green-600">+{child.performance.improvement}%</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Class Rank</span>
                              <span className="text-lg font-bold text-gray-900">#{child.performance.rank}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      {/* Individual Child Performance */}
                      {children.filter(c => c.id === selectedChild).map((child) => (
                        <div key={child.id}>
                          {/* Performance Overview */}
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                            <div className="bg-blue-50 rounded-lg p-4">
                              <h4 className="text-sm font-medium text-blue-700 mb-2">Overall Score</h4>
                              <p className="text-2xl font-bold text-blue-900">{child.performance.overallScore}%</p>
                              <p className="text-sm text-blue-600">+{child.performance.improvement}% this month</p>
                            </div>
                            <div className="bg-green-50 rounded-lg p-4">
                              <h4 className="text-sm font-medium text-green-700 mb-2">Class Rank</h4>
                              <p className="text-2xl font-bold text-green-900">#{child.performance.rank}</p>
                              <p className="text-sm text-green-600">out of 150 students</p>
                            </div>
                            <div className="bg-purple-50 rounded-lg p-4">
                              <h4 className="text-sm font-medium text-purple-700 mb-2">Study Time</h4>
                              <p className="text-2xl font-bold text-purple-900">{child.performance.studyHours}h</p>
                              <p className="text-sm text-purple-600">this month</p>
                            </div>
                            <div className="bg-orange-50 rounded-lg p-4">
                              <h4 className="text-sm font-medium text-orange-700 mb-2">Tests Completed</h4>
                              <p className="text-2xl font-bold text-orange-900">{child.performance.testsCompleted}</p>
                              <p className="text-sm text-orange-600">85% completion rate</p>
                            </div>
                          </div>
                          
                          {/* Subject-wise Performance */}
                          <div className="bg-gray-50 rounded-lg p-6">
                            <h4 className="font-semibold text-gray-900 mb-4">Subject-wise Performance</h4>
                            <div className="space-y-4">
                              {child.subjects.map((subject, index) => (
                                <div key={index}>
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-700">{subject.name}</span>
                                    <div className="flex items-center space-x-2">
                                      <span className="text-sm font-bold text-gray-900">{subject.score}%</span>
                                      {subject.trend === 'up' && (
                                        <div className="flex items-center text-green-600">
                                          <ArrowUp className="w-4 h-4" />
                                          <span className="text-xs">+5%</span>
                                        </div>
                                      )}
                                      {subject.trend === 'down' && (
                                        <div className="flex items-center text-red-600">
                                          <ArrowDown className="w-4 h-4" />
                                          <span className="text-xs">-3%</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div 
                                      className={`h-3 rounded-full transition-all ${
                                        subject.score >= 80 ? 'bg-green-500' :
                                        subject.score >= 60 ? 'bg-yellow-500' :
                                        'bg-red-500'
                                      }`}
                                      style={{ width: `${subject.score}%` }}
                                    ></div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Performance Charts Placeholder */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h4 className="text-lg font-semibold mb-4">Score Trends</h4>
                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Score Trend Chart</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h4 className="text-lg font-semibold mb-4">Study Time Analysis</h4>
                    <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Study Time Chart</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Payments Tab */}
            {activeTab === 'payments' && (
              <div className="space-y-6">
                {/* Current Plan */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-semibold mb-6">Current Subscription</h3>
                  <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-2xl font-bold">PRO Plan - Family</h4>
                        <p className="text-purple-100">2 Children • Monthly Billing</p>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold">₹999</p>
                        <p className="text-purple-100">/month</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-purple-100">Next billing date: August 5, 2024</p>
                      <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-50">
                        Manage Plan
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Payment History */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold">Payment History</h3>
                    <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                      Download All Invoices
                    </button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {payments.map((payment) => (
                          <tr key={payment.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {new Date(payment.date).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {payment.plan}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              ₹{payment.amount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                                payment.status === 'success' ? 'bg-green-100 text-green-800' :
                                payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {payment.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              <button className="text-purple-600 hover:text-purple-700 font-medium">
                                Download
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* Payment Methods */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold">Payment Methods</h3>
                    <button 
                      onClick={() => {
                        setModalType('payment');
                        setShowModal(true);
                      }}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center font-medium"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Method
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <CreditCard className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">•••• •••• •••• 4242</p>
                          <p className="text-sm text-gray-500">Expires 12/25</p>
                        </div>
                      </div>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Default</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Communication Tab */}
            {activeTab === 'communication' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold">Messages & Communication</h3>
                    <button 
                      onClick={() => {
                        setModalType('message');
                        setShowModal(true);
                      }}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center font-medium"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      New Message
                    </button>
                  </div>
                  
                  {/* Message Filters */}
                  <div className="flex items-center space-x-4 mb-6">
                    <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-medium">
                      All Messages
                    </button>
                    <button className="px-4 py-2 hover:bg-gray-100 rounded-lg font-medium text-gray-600">
                      From Educators
                    </button>
                    <button className="px-4 py-2 hover:bg-gray-100 rounded-lg font-medium text-gray-600">
                      From Admin
                    </button>
                    <button className="px-4 py-2 hover:bg-gray-100 rounded-lg font-medium text-gray-600">
                      System
                    </button>
                  </div>
                  
                  {/* Message List */}
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className={`border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow ${
                        !message.read ? 'border-blue-300 bg-blue-50' : 'border-gray-200'
                      }`}>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${
                              message.fromRole === 'educator' ? 'bg-purple-100' :
                              message.fromRole === 'admin' ? 'bg-blue-100' :
                              'bg-gray-100'
                            }`}>
                              {message.fromRole === 'educator' ? <GraduationCap className="w-5 h-5 text-purple-600" /> :
                               message.fromRole === 'admin' ? <Shield className="w-5 h-5 text-blue-600" /> :
                               <Bell className="w-5 h-5 text-gray-600" />}
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <p className="font-medium text-gray-900">{message.from}</p>
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  message.fromRole === 'educator' ? 'bg-purple-100 text-purple-800' :
                                  message.fromRole === 'admin' ? 'bg-blue-100 text-blue-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {message.fromRole}
                                </span>
                                {message.priority === 'high' && (
                                  <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full">
                                    High Priority
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-500">{new Date(message.date).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {message.childId && (
                              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                                {children.find(c => c.id === message.childId)?.name}
                              </span>
                            )}
                            {!message.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                        </div>
                        <h4 className="font-medium text-gray-900 mb-1">{message.subject}</h4>
                        <p className="text-sm text-gray-700 line-clamp-2">{message.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Calendar Tab */}
            {activeTab === 'calendar' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold">Calendar & Schedule</h3>
                    <button 
                      onClick={() => {
                        setModalType('schedule');
                        setShowModal(true);
                      }}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center font-medium"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Event
                    </button>
                  </div>
                  
                  {/* Calendar View Placeholder */}
                  <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center mb-6">
                    <p className="text-gray-500">Calendar View</p>
                  </div>
                  
                  {/* Upcoming Events */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Upcoming Events</h4>
                    <div className="space-y-3">
                      {events.map((event) => (
                        <div key={event.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${
                              event.type === 'test' ? 'bg-blue-100' :
                              event.type === 'class' ? 'bg-green-100' :
                              event.type === 'meeting' ? 'bg-purple-100' :
                              event.type === 'deadline' ? 'bg-red-100' :
                              'bg-gray-100'
                            }`}>
                              {event.type === 'test' ? <Target className="w-5 h-5 text-blue-600" /> :
                               event.type === 'class' ? <School className="w-5 h-5 text-green-600" /> :
                               event.type === 'meeting' ? <Video className="w-5 h-5 text-purple-600" /> :
                               event.type === 'deadline' ? <Clock className="w-5 h-5 text-red-600" /> :
                               <Calendar className="w-5 h-5 text-gray-600" />}
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-900">{event.title}</h5>
                              <div className="flex items-center space-x-3 text-sm text-gray-500">
                                <span>{new Date(event.date).toLocaleDateString()}</span>
                                <span>{event.time}</span>
                                <span>{event.childName}</span>
                                {event.location && <span>• {event.location}</span>}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {event.reminder && (
                              <Bell className="w-4 h-4 text-gray-400" />
                            )}
                            <button className="text-gray-400 hover:text-gray-600">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Resources Tab */}
            {activeTab === 'resources' && (
              <div className="space-y-6">
                {/* Study Materials */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold">Study Resources</h3>
                    <div className="flex items-center space-x-3">
                      <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <option value="all">All Subjects</option>
                        <option value="legal">Legal Reasoning</option>
                        <option value="english">English</option>
                        <option value="gk">Current Affairs</option>
                        <option value="logical">Logical Reasoning</option>
                        <option value="math">Mathematics</option>
                      </select>
                      <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center font-medium">
                        <Upload className="w-4 h-4 mr-2" />
                        Request Resource
                      </button>
                    </div>
                  </div>
                  
                  {/* Resource Categories */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* E-Books */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                          <BookOpen className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">E-Books</h4>
                          <p className="text-sm text-gray-600">124 available</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-gray-900">CLAT Legal Reasoning Guide</p>
                            <p className="text-xs text-gray-600">by Dr. Sharma</p>
                          </div>
                          <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                            Download
                          </button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-gray-900">English Comprehension</p>
                            <p className="text-xs text-gray-600">by Prof. Kumar</p>
                          </div>
                          <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                            Download
                          </button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Current Affairs 2024</p>
                            <p className="text-xs text-gray-600">Updated Weekly</p>
                          </div>
                          <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                            Download
                          </button>
                        </div>
                      </div>
                      <button className="w-full mt-4 text-purple-600 hover:text-purple-700 text-sm font-medium">
                        View All E-Books
                      </button>
                    </div>
                    
                    {/* Video Lectures */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-3 bg-green-100 rounded-lg">
                          <Video className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">Video Lectures</h4>
                          <p className="text-sm text-gray-600">87 hours</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Constitutional Law Basics</p>
                            <p className="text-xs text-gray-600">45 minutes • Intermediate</p>
                          </div>
                          <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                            Watch
                          </button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-gray-900">English Grammar Tips</p>
                            <p className="text-xs text-gray-600">32 minutes • Beginner</p>
                          </div>
                          <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                            Watch
                          </button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Logical Puzzles Solved</p>
                            <p className="text-xs text-gray-600">28 minutes • Advanced</p>
                          </div>
                          <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                            Watch
                          </button>
                        </div>
                      </div>
                      <button className="w-full mt-4 text-green-600 hover:text-green-700 text-sm font-medium">
                        View All Videos
                      </button>
                    </div>
                    
                    {/* Practice Tests */}
                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-3 bg-orange-100 rounded-lg">
                          <Target className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">Practice Tests</h4>
                          <p className="text-sm text-gray-600">156 tests</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-gray-900">CLAT Mock Test #15</p>
                            <p className="text-xs text-gray-600">150 questions • 2 hours</p>
                          </div>
                          <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                            Start
                          </button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-gray-900">English Section Test</p>
                            <p className="text-xs text-gray-600">30 questions • 30 minutes</p>
                          </div>
                          <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                            Start
                          </button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Legal Reasoning Quiz</p>
                            <p className="text-xs text-gray-600">25 questions • 25 minutes</p>
                          </div>
                          <button className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                            Start
                          </button>
                        </div>
                      </div>
                      <button className="w-full mt-4 text-orange-600 hover:text-orange-700 text-sm font-medium">
                        View All Tests
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Study Plans */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-semibold mb-6">Recommended Study Plans</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-3 bg-purple-100 rounded-lg">
                          <Brain className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">CLAT 2025 Complete</h4>
                          <p className="text-sm text-gray-600">8 months • Comprehensive</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-4">
                        Complete preparation plan covering all sections with mock tests, assignments, and live classes.
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-purple-600">₹12,999</span>
                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                          Enroll Now
                        </button>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-3 bg-blue-100 rounded-lg">
                          <Zap className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900">Last Minute Revision</h4>
                          <p className="text-sm text-gray-600">3 months • Intensive</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-4">
                        Intensive revision plan with focus on weak areas, practice tests, and exam strategies.
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-blue-600">₹7,999</span>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                          Enroll Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Rewards Tab */}
            {activeTab === 'rewards' && (
              <div className="space-y-6">
                {/* Achievements Overview */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-semibold mb-6">Achievements & Rewards</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Trophy className="w-10 h-10 text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900">Golden Achiever</h4>
                      <p className="text-sm text-gray-600">Scored 90%+ in 5 tests</p>
                      <span className="inline-block mt-2 px-3 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Earned</span>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Star className="w-10 h-10 text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900">Study Streak</h4>
                      <p className="text-sm text-gray-600">21 days continuous study</p>
                      <span className="inline-block mt-2 px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">Earned</span>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Medal className="w-10 h-10 text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900">Top Performer</h4>
                      <p className="text-sm text-gray-600">Rank in top 10%</p>
                      <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">Earned</span>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-20 h-20 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Crown className="w-10 h-10 text-white" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900">Master Student</h4>
                      <p className="text-sm text-gray-600">Complete 100 tests</p>
                      <span className="inline-block mt-2 px-3 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">4/100</span>
                    </div>
                  </div>
                </div>
                
                {/* Reward Points & Redemption */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-xl font-semibold mb-6">Reward Points</h3>
                    <div className="text-center mb-6">
                      <div className="w-32 h-32 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <div className="text-center">
                          <p className="text-3xl font-bold text-white">2,450</p>
                          <p className="text-sm text-green-100">Points</p>
                        </div>
                      </div>
                      <p className="text-gray-600">Earned from excellent performance</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-green-100 rounded-lg">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </div>
                          <span className="text-sm text-gray-700">Mock Test Completion</span>
                        </div>
                        <span className="text-sm font-medium text-green-600">+50 points</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <Star className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="text-sm text-gray-700">High Score Achievement</span>
                        </div>
                        <span className="text-sm font-medium text-blue-600">+100 points</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-purple-100 rounded-lg">
                            <Activity className="w-4 h-4 text-purple-600" />
                          </div>
                          <span className="text-sm text-gray-700">Daily Study Streak</span>
                        </div>
                        <span className="text-sm font-medium text-purple-600">+25 points</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl shadow-sm p-6">
                    <h3 className="text-xl font-semibold mb-6">Redeem Rewards</h3>
                    <div className="space-y-4">
                      <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">Free Mock Test</h4>
                          <span className="text-lg font-bold text-purple-600">500 pts</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Access to premium mock test</p>
                        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                          Redeem
                        </button>
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">Study Guide E-Book</h4>
                          <span className="text-lg font-bold text-blue-600">750 pts</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Premium study material</p>
                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                          Redeem
                        </button>
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">1-on-1 Mentoring Session</h4>
                          <span className="text-lg font-bold text-green-600">1,500 pts</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Personal guidance session</p>
                        <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                          Redeem
                        </button>
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg p-4 opacity-50">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-gray-900">Amazon Gift Card ₹500</h4>
                          <span className="text-lg font-bold text-gray-600">3,000 pts</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">Not enough points</p>
                        <button disabled className="w-full bg-gray-300 text-gray-500 px-4 py-2 rounded-lg text-sm font-medium cursor-not-allowed">
                          Need 550 more points
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Children's Achievements */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-semibold mb-6">Children's Achievements</h3>
                  <div className="space-y-6">
                    {children.map((child) => (
                      <div key={child.id} className="border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                            {child.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900">{child.name}</h4>
                            <p className="text-sm text-gray-600">{child.performance.streak} day study streak</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-yellow-50 rounded-lg p-4 text-center">
                            <Trophy className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                            <p className="text-sm font-medium text-yellow-800">High Achiever</p>
                            <p className="text-xs text-yellow-600">Top 10% in class</p>
                          </div>
                          
                          <div className="bg-blue-50 rounded-lg p-4 text-center">
                            <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                            <p className="text-sm font-medium text-blue-800">Goal Crusher</p>
                            <p className="text-xs text-blue-600">{child.performance.testsCompleted} tests completed</p>
                          </div>
                          
                          <div className="bg-green-50 rounded-lg p-4 text-center">
                            <Star className="w-8 h-8 text-green-600 mx-auto mb-2" />
                            <p className="text-sm font-medium text-green-800">Consistent Learner</p>
                            <p className="text-xs text-green-600">{child.performance.studyHours}h study time</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                {/* Account Settings */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-semibold mb-6">Account Settings</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Profile Information */}
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Profile Information</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                          <input 
                            type="text" 
                            defaultValue={user?.name || 'Parent Name'}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                          <input 
                            type="email" 
                            defaultValue={user?.email || 'parent@example.com'}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                          <input 
                            type="tel" 
                            defaultValue="+91 9876543210"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                          <textarea 
                            rows={3}
                            defaultValue="123 Main Street, New Delhi, India"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium">
                          Save Changes
                        </button>
                      </div>
                    </div>
                    
                    {/* Security Settings */}
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Security Settings</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                          <input 
                            type="password" 
                            placeholder="Enter current password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                          <input 
                            type="password" 
                            placeholder="Enter new password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                          <input 
                            type="password" 
                            placeholder="Confirm new password"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium">
                          Update Password
                        </button>
                        
                        <div className="border-t pt-4 mt-6">
                          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                              <p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
                              <p className="text-xs text-gray-600">Add extra security to your account</p>
                            </div>
                            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                              Enable
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Notification Preferences */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-semibold mb-6">Notification Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Test Results</p>
                        <p className="text-xs text-gray-600">Get notified when your child completes a test</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Progress Reports</p>
                        <p className="text-xs text-gray-600">Weekly progress summaries</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Payment Reminders</p>
                        <p className="text-xs text-gray-600">Billing and payment notifications</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Marketing Communications</p>
                        <p className="text-xs text-gray-600">Updates about new features and courses</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                {/* Subscription Management */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-semibold mb-6">Subscription Management</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Current Plan</h4>
                      <div className="border border-purple-200 bg-purple-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-lg font-semibold text-purple-900">PRO Plan - Family</span>
                          <span className="text-2xl font-bold text-purple-600">₹999/mo</span>
                        </div>
                        <p className="text-sm text-purple-700 mb-4">2 Children • Unlimited Mock Tests • Live Classes</p>
                        <div className="flex space-x-3">
                          <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                            Upgrade Plan
                          </button>
                          <button className="flex-1 border border-purple-300 text-purple-700 hover:bg-purple-100 px-4 py-2 rounded-lg text-sm font-medium">
                            Cancel Subscription
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Billing Information</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Next billing date:</span>
                          <span className="font-medium">August 5, 2024</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Payment method:</span>
                          <span className="font-medium">•••• •••• •••• 4242</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Auto-renewal:</span>
                          <span className="font-medium text-green-600">Enabled</span>
                        </div>
                        <button className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium mt-4">
                          Update Billing Info
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Data & Privacy */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-semibold mb-6">Data & Privacy</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Data Export</p>
                        <p className="text-xs text-gray-600">Download all your data</p>
                      </div>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                        Export Data
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Delete Account</p>
                        <p className="text-xs text-gray-600">Permanently delete your account and all data</p>
                      </div>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Help Tab */}
            {activeTab === 'help' && (
              <div className="space-y-6">
                {/* Help Categories */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-semibold mb-6">Help & Support</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="p-3 bg-blue-100 rounded-lg w-fit mb-4">
                        <HelpCircle className="w-6 h-6 text-blue-600" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">FAQ</h4>
                      <p className="text-sm text-gray-600 mb-4">Find answers to common questions</p>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Browse FAQ →</button>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="p-3 bg-green-100 rounded-lg w-fit mb-4">
                        <MessageCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h4>
                      <p className="text-sm text-gray-600 mb-4">Chat with our support team</p>
                      <button className="text-green-600 hover:text-green-700 text-sm font-medium">Start Chat →</button>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="p-3 bg-purple-100 rounded-lg w-fit mb-4">
                        <PhoneCall className="w-6 h-6 text-purple-600" />
                      </div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Phone Support</h4>
                      <p className="text-sm text-gray-600 mb-4">Call us at +91 1800-123-4567</p>
                      <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">Call Now →</button>
                    </div>
                  </div>
                </div>
                
                {/* Common Questions */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-semibold mb-6">Frequently Asked Questions</h3>
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg">
                      <button className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50">
                        <span className="font-medium text-gray-900">How do I add another child to my account?</span>
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      </button>
                      <div className="px-4 pb-3 text-sm text-gray-600">
                        Go to the "My Children" tab and click "Add Child". You'll need to provide their email address and basic information. They will receive an invitation to join your family account.
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg">
                      <button className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50">
                        <span className="font-medium text-gray-900">How can I track my child's progress?</span>
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      </button>
                      <div className="px-4 pb-3 text-sm text-gray-600">
                        Visit the "Performance" tab to see detailed analytics including scores, study time, improvement trends, and subject-wise performance. You can also download detailed reports.
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg">
                      <button className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50">
                        <span className="font-medium text-gray-900">What payment methods do you accept?</span>
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      </button>
                      <div className="px-4 pb-3 text-sm text-gray-600">
                        We accept all major credit cards, debit cards, UPI, net banking, and digital wallets like Paytm and PhonePe. All payments are secure and encrypted.
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg">
                      <button className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50">
                        <span className="font-medium text-gray-900">Can I upgrade or downgrade my subscription?</span>
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      </button>
                      <div className="px-4 pb-3 text-sm text-gray-600">
                        Yes, you can change your subscription plan anytime from the Settings page. Changes will be prorated and reflected in your next billing cycle.
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg">
                      <button className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50">
                        <span className="font-medium text-gray-900">How do I communicate with my child's educator?</span>
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      </button>
                      <div className="px-4 pb-3 text-sm text-gray-600">
                        Use the "Messages" tab to send messages directly to educators. You can also schedule video calls and receive progress updates through the communication system.
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Contact Information */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Get in Touch</h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Mail className="w-5 h-5 text-gray-400" />
                          <span className="text-sm text-gray-600">support@levelupclat.com</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="w-5 h-5 text-gray-400" />
                          <span className="text-sm text-gray-600">+91 1800-123-4567</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Globe className="w-5 h-5 text-gray-400" />
                          <span className="text-sm text-gray-600">www.levelupclat.com</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-4">Business Hours</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Monday - Friday:</span>
                          <span className="font-medium">9:00 AM - 7:00 PM</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Saturday:</span>
                          <span className="font-medium">10:00 AM - 6:00 PM</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Sunday:</span>
                          <span className="font-medium">Closed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* System Status */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-xl font-semibold mb-6">System Status</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium text-gray-900">Platform</span>
                      </div>
                      <span className="text-sm text-green-600">Operational</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium text-gray-900">Mock Tests</span>
                      </div>
                      <span className="text-sm text-green-600">Operational</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium text-gray-900">Payments</span>
                      </div>
                      <span className="text-sm text-green-600">Operational</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {/* Modal System */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">
                {modalType === 'addChild' ? 'Add Child Account' :
                 modalType === 'message' ? 'Send Message' :
                 modalType === 'payment' ? 'Add Payment Method' :
                 modalType === 'schedule' ? 'Add Event' :
                 'Modal'}
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            {/* Add Child Form */}
            {modalType === 'addChild' && (
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const childData = {
                  email: formData.get('email'),
                  name: formData.get('name'),
                  grade: formData.get('grade'),
                  school: formData.get('school'),
                  age: formData.get('age')
                };
                handleAddChild(childData);
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Child's Email</label>
                    <input 
                      name="email" 
                      type="email" 
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="child@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input 
                      name="name" 
                      type="text" 
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter child's full name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                      <select name="grade" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <option value="9th Grade">9th Grade</option>
                        <option value="10th Grade">10th Grade</option>
                        <option value="11th Grade">11th Grade</option>
                        <option value="12th Grade">12th Grade</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                      <input 
                        name="age" 
                        type="number" 
                        min="13"
                        max="19"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Age"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">School Name</label>
                    <input 
                      name="school" 
                      type="text" 
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter school name"
                    />
                  </div>
                </div>
                <div className="flex space-x-3 mt-6">
                  <button 
                    type="submit"
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium"
                  >
                    Add Child
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Message Form */}
            {modalType === 'message' && (
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const messageData = {
                  to: formData.get('to'),
                  childId: formData.get('childId'),
                  subject: formData.get('subject'),
                  message: formData.get('message'),
                  priority: formData.get('priority')
                };
                handleSendMessage(messageData);
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                    <select name="to" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option value="educator">Child's Educator</option>
                      <option value="admin">Platform Admin</option>
                      <option value="support">Support Team</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Regarding Child</label>
                    <select name="childId" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option value="">General Inquiry</option>
                      {children.map(child => (
                        <option key={child.id} value={child.id}>{child.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <input 
                      name="subject" 
                      type="text" 
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Message subject"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea 
                      name="message" 
                      rows={5}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Type your message here..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select name="priority" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                      <option value="normal">Normal</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>
                <div className="flex space-x-3 mt-6">
                  <button 
                    type="submit"
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium"
                  >
                    Send Message
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Payment Method Form */}
            {modalType === 'payment' && (
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const paymentData = {
                  cardNumber: formData.get('cardNumber'),
                  expiryMonth: formData.get('expiryMonth'),
                  expiryYear: formData.get('expiryYear'),
                  cvv: formData.get('cvv'),
                  holderName: formData.get('holderName'),
                  billingAddress: formData.get('billingAddress')
                };
                console.log('Adding payment method:', paymentData);
                setShowModal(false);
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                    <input 
                      name="cardNumber" 
                      type="text" 
                      required
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Month</label>
                      <select name="expiryMonth" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <option value="">Month</option>
                        {Array.from({length: 12}, (_, i) => (
                          <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                            {String(i + 1).padStart(2, '0')}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Year</label>
                      <select name="expiryYear" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <option value="">Year</option>
                        {Array.from({length: 10}, (_, i) => (
                          <option key={2024 + i} value={2024 + i}>
                            {2024 + i}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                      <input 
                        name="cvv" 
                        type="text" 
                        required
                        maxLength={4}
                        placeholder="123"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                    <input 
                      name="holderName" 
                      type="text" 
                      required
                      placeholder="Full name as on card"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Billing Address</label>
                    <textarea 
                      name="billingAddress" 
                      rows={3}
                      required
                      placeholder="Enter complete billing address"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="saveCard" 
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <label htmlFor="saveCard" className="text-sm text-gray-700">
                      Save this card for future payments
                    </label>
                  </div>
                </div>
                <div className="flex space-x-3 mt-6">
                  <button 
                    type="submit"
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium"
                  >
                    Add Payment Method
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {/* Schedule Event Form */}
            {modalType === 'schedule' && (
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const eventData = {
                  title: formData.get('title'),
                  type: formData.get('type'),
                  date: formData.get('date'),
                  time: formData.get('time'),
                  childId: formData.get('childId'),
                  description: formData.get('description'),
                  location: formData.get('location'),
                  reminder: formData.get('reminder')
                };
                console.log('Adding event:', eventData);
                setShowModal(false);
              }}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                    <input 
                      name="title" 
                      type="text" 
                      required
                      placeholder="Enter event title"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                      <select name="type" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <option value="test">Test/Exam</option>
                        <option value="class">Class</option>
                        <option value="meeting">Meeting</option>
                        <option value="deadline">Deadline</option>
                        <option value="holiday">Holiday</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Related Child</label>
                      <select name="childId" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500">
                        <option value="all">All Children</option>
                        {children.map(child => (
                          <option key={child.id} value={child.id}>{child.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                      <input 
                        name="date" 
                        type="date" 
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                      <input 
                        name="time" 
                        type="time" 
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location (Optional)</label>
                    <input 
                      name="location" 
                      type="text" 
                      placeholder="Enter location or 'Online'"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea 
                      name="description" 
                      rows={3}
                      placeholder="Event description or notes"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="reminder" 
                      name="reminder"
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <label htmlFor="reminder" className="text-sm text-gray-700">
                      Send reminder notification
                    </label>
                  </div>
                </div>
                <div className="flex space-x-3 mt-6">
                  <button 
                    type="submit"
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium"
                  >
                    Add Event
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-lg font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompleteParentDashboard;
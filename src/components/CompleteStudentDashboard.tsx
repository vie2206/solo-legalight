import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, RadialBarChart, RadialBar
} from 'recharts';
import {
  Users, BookOpen, BarChart3, Settings, Clock, Award,
  Target, TrendingUp, Activity, Calendar, MessageSquare,
  FileText, Star, Brain, Zap, Eye, Plus, Edit, Trash2,
  CheckCircle, AlertTriangle, ArrowUp, ArrowDown, Send,
  Download, Filter, Search, RefreshCw, UserPlus, Bell,
  GraduationCap, Clipboard, PieChart as PieChartIcon, LineChart as LineChartIcon, Monitor,
  Shield, Mail, Phone, Globe, Upload, Save, Copy, Share2,
  PlayCircle, PauseCircle, SkipForward, Volume2, Maximize,
  Building, DollarSign, CreditCard, Headphones, HelpCircle,
  Database, Wifi, Lock, Unlock, Key, UserCheck, AlertCircle,
  Briefcase, Calculator, Layers, Map, Navigation, Flag,
  Bookmark, Hash, AtSign, Link, ExternalLink, Image, Video,
  Mic, Camera, Printer, Smartphone, Tablet, Laptop, Tv,
  Radio, Bluetooth, WifiOff, Battery, BatteryLow, Power,
  Scale, Book, Flame, Trophy, Medal, Sparkles, Crown,
  Coffee, Timer, Pause, Play, RotateCcw, TrendingDown
} from 'lucide-react';

interface CompleteStudentDashboardProps {
  user: any;
  onLogout: () => void;
}

interface StudySession {
  id: string;
  subject: string;
  topic: string;
  duration: number;
  score: number;
  date: string;
  type: 'reading' | 'quiz' | 'mock_test' | 'practice';
}

interface Subject {
  name: string;
  progress: number;
  score: number;
  trend: 'up' | 'down' | 'stable';
  color: string;
  topics: {
    name: string;
    completed: boolean;
    score?: number;
  }[];
}

interface MockTest {
  id: string;
  name: string;
  date: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  rank: number;
  percentile: number;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  unlockedDate?: string;
  progress?: number;
  requirement?: string;
}

const CompleteStudentDashboard: React.FC<CompleteStudentDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State management
  const [studySessions, setStudySessions] = useState<StudySession[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [mockTests, setMockTests] = useState<MockTest[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [dailyGoal, setDailyGoal] = useState(120); // minutes
  const [studyStreak, setStudyStreak] = useState(15);
  const [totalStudyTime, setTotalStudyTime] = useState(0);
  const [studyTimeToday, setStudyTimeToday] = useState(45);

  // Mock data initialization
  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true);
        
        // Initialize subjects
        setSubjects([
          {
            name: 'Legal Reasoning',
            progress: 78,
            score: 82,
            trend: 'up',
            color: '#3b82f6',
            topics: [
              { name: 'Constitutional Law', completed: true, score: 85 },
              { name: 'Contract Law', completed: true, score: 80 },
              { name: 'Tort Law', completed: false },
              { name: 'Criminal Law', completed: false }
            ]
          },
          {
            name: 'English Language',
            progress: 85,
            score: 88,
            trend: 'up',
            color: '#10b981',
            topics: [
              { name: 'Reading Comprehension', completed: true, score: 90 },
              { name: 'Grammar', completed: true, score: 85 },
              { name: 'Vocabulary', completed: true, score: 88 },
              { name: 'Para Jumbles', completed: false }
            ]
          },
          {
            name: 'Current Affairs',
            progress: 65,
            score: 72,
            trend: 'stable',
            color: '#f59e0b',
            topics: [
              { name: 'Politics', completed: true, score: 75 },
              { name: 'Economics', completed: true, score: 70 },
              { name: 'International Affairs', completed: false },
              { name: 'Science & Technology', completed: false }
            ]
          },
          {
            name: 'Logical Reasoning',
            progress: 72,
            score: 79,
            trend: 'up',
            color: '#8b5cf6',
            topics: [
              { name: 'Critical Reasoning', completed: true, score: 82 },
              { name: 'Analytical Reasoning', completed: true, score: 75 },
              { name: 'Puzzles', completed: false },
              { name: 'Seating Arrangement', completed: false }
            ]
          },
          {
            name: 'Quantitative Techniques',
            progress: 58,
            score: 68,
            trend: 'down',
            color: '#ef4444',
            topics: [
              { name: 'Elementary Mathematics', completed: true, score: 70 },
              { name: 'Data Interpretation', completed: true, score: 65 },
              { name: 'Numerical Ability', completed: false },
              { name: 'Data Sufficiency', completed: false }
            ]
          }
        ]);

        // Initialize study sessions
        setStudySessions([
          {
            id: '1',
            subject: 'Legal Reasoning',
            topic: 'Constitutional Law',
            duration: 45,
            score: 85,
            date: '2024-01-25T10:30:00Z',
            type: 'reading'
          },
          {
            id: '2',
            subject: 'English Language',
            topic: 'Reading Comprehension',
            duration: 30,
            score: 92,
            date: '2024-01-25T14:15:00Z',
            type: 'quiz'
          },
          {
            id: '3',
            subject: 'Current Affairs',
            topic: 'Politics',
            duration: 25,
            score: 78,
            date: '2024-01-24T16:20:00Z',
            type: 'practice'
          },
          {
            id: '4',
            subject: 'Logical Reasoning',
            topic: 'Critical Reasoning',
            duration: 40,
            score: 88,
            date: '2024-01-24T11:45:00Z',
            type: 'quiz'
          }
        ]);

        // Initialize mock tests
        setMockTests([
          {
            id: 'MT-001',
            name: 'CLAT Mock Test #15',
            date: '2024-01-24',
            score: 82,
            totalQuestions: 120,
            correctAnswers: 98,
            timeSpent: 110,
            rank: 245,
            percentile: 78.5
          },
          {
            id: 'MT-002',
            name: 'CLAT Mock Test #14',
            date: '2024-01-21',
            score: 79,
            totalQuestions: 120,
            correctAnswers: 95,
            timeSpent: 115,
            rank: 298,
            percentile: 75.2
          },
          {
            id: 'MT-003',
            name: 'CLAT Mock Test #13',
            date: '2024-01-18',
            score: 85,
            totalQuestions: 120,
            correctAnswers: 102,
            timeSpent: 108,
            rank: 187,
            percentile: 82.1
          }
        ]);

        // Initialize achievements
        setAchievements([
          {
            id: 'ACH-001',
            title: 'Study Streak Master',
            description: 'Study for 15 consecutive days',
            icon: <Flame className="w-6 h-6" />,
            unlocked: true,
            unlockedDate: '2024-01-25',
            progress: 100
          },
          {
            id: 'ACH-002',
            title: 'Mock Test Champion',
            description: 'Score above 80% in 5 mock tests',
            icon: <Trophy className="w-6 h-6" />,
            unlocked: true,
            unlockedDate: '2024-01-20',
            progress: 100
          },
          {
            id: 'ACH-003',
            title: 'Perfect Score',
            description: 'Score 100% in any subject quiz',
            icon: <Star className="w-6 h-6" />,
            unlocked: false,
            progress: 95,
            requirement: 'Get 100% in any quiz'
          },
          {
            id: 'ACH-004',
            title: 'Speed Reader',
            description: 'Complete 50 reading comprehension passages',
            icon: <Book className="w-6 h-6" />,
            unlocked: false,
            progress: 68,
            requirement: '34 more passages to go'
          }
        ]);

        // Calculate total study time (last 30 days)
        setTotalStudyTime(2340); // in minutes

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

  // Utility functions
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600';
    if (progress >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  // Chart data
  const weeklyStudyData = [
    { day: 'Mon', minutes: 120, target: 120 },
    { day: 'Tue', minutes: 95, target: 120 },
    { day: 'Wed', minutes: 140, target: 120 },
    { day: 'Thu', minutes: 110, target: 120 },
    { day: 'Fri', minutes: 85, target: 120 },
    { day: 'Sat', minutes: 160, target: 120 },
    { day: 'Sun', minutes: 45, target: 120 }
  ];

  const subjectScoreData = subjects.map(subject => ({
    subject: subject.name.split(' ')[0],
    score: subject.score,
    fill: subject.color
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
          <span className="text-lg text-gray-600">Loading Student Dashboard...</span>
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
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">Student Dashboard</h1>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Flame className="w-4 h-4 text-orange-500" />
                  <span className="text-sm font-medium text-gray-700">{studyStreak} day streak</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-gray-700">{formatTime(studyTimeToday)} today</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Settings className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {user.name?.split(' ').map((n: string) => n[0]).join('') || 'ST'}
                </div>
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
              </div>
              <button
                onClick={onLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Logout
              </button>
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
              { id: 'subjects', label: 'Subjects', icon: BookOpen },
              { id: 'mock_tests', label: 'Mock Tests', icon: FileText },
              { id: 'study_plan', label: 'Study Plan', icon: Calendar },
              { id: 'achievements', label: 'Achievements', icon: Award },
              { id: 'analytics', label: 'Analytics', icon: LineChartIcon },
              { id: 'practice', label: 'Practice', icon: Brain },
              { id: 'progress', label: 'Progress', icon: Target }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
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
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{studyTimeToday}m</p>
                    <p className="text-sm text-gray-600">Study Time Today</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Goal: {dailyGoal}m</span>
                    <span>{Math.round((studyTimeToday / dailyGoal) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${Math.min((studyTimeToday / dailyGoal) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{studyStreak}</p>
                    <p className="text-sm text-gray-600">Day Streak</p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Flame className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">Keep it going!</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">78.5%</p>
                    <p className="text-sm text-gray-600">Average Score</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+3.2% from last week</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">245</p>
                    <p className="text-sm text-gray-600">Current Rank</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Trophy className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">↑12 from last test</span>
                </div>
              </div>
            </div>

            {/* Study Progress and Weekly Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Weekly Study Time</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyStudyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="minutes" fill="#3b82f6" name="Study Time" />
                    <Bar dataKey="target" fill="#e5e7eb" name="Target" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Subject Performance</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RadialBarChart cx="50%" cy="50%" innerRadius="20%" outerRadius="90%" data={subjectScoreData}>
                    <RadialBar
                      label={{ position: 'insideStart', fill: '#fff' }}
                      background
                      dataKey="score"
                    />
                    <Legend />
                    <Tooltip />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Study Sessions</h3>
              <div className="space-y-4">
                {studySessions.slice(0, 5).map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        {session.type === 'reading' && <Book className="w-5 h-5 text-blue-600" />}
                        {session.type === 'quiz' && <Brain className="w-5 h-5 text-blue-600" />}
                        {session.type === 'mock_test' && <FileText className="w-5 h-5 text-blue-600" />}
                        {session.type === 'practice' && <Target className="w-5 h-5 text-blue-600" />}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{session.subject}</h4>
                        <p className="text-sm text-gray-600">{session.topic}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{session.score}%</p>
                      <p className="text-sm text-gray-600">{formatTime(session.duration)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Subjects Tab */}
        {activeTab === 'subjects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Subject Progress</h2>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                <Plus className="w-4 h-4" />
                <span>Study Session</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subjects.map((subject) => (
                <div key={subject.name} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{subject.name}</h3>
                    {getTrendIcon(subject.trend)}
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <span>Progress</span>
                      <span>{subject.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full" 
                        style={{ 
                          width: `${subject.progress}%`,
                          backgroundColor: subject.color
                        }}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Average Score</span>
                      <span className={`font-semibold ${getProgressColor(subject.score)}`}>
                        {subject.score}%
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-700">Topics</h4>
                    {subject.topics.map((topic) => (
                      <div key={topic.name} className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          {topic.completed ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <div className="w-4 h-4 border-2 border-gray-300 rounded-full" />
                          )}
                          <span className={topic.completed ? 'text-gray-900' : 'text-gray-500'}>
                            {topic.name}
                          </span>
                        </div>
                        {topic.score && (
                          <span className="text-green-600 font-medium">{topic.score}%</span>
                        )}
                      </div>
                    ))}
                  </div>

                  <button className="w-full mt-4 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                    Continue Learning
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mock Tests Tab */}
        {activeTab === 'mock_tests' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Mock Test Results</h2>
              <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                <PlayCircle className="w-4 h-4" />
                <span>Take New Test</span>
              </button>
            </div>

            {/* Mock Test Performance Chart */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4">Performance Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={mockTests.slice().reverse()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="score" stroke="#3b82f6" name="Score %" />
                  <Line type="monotone" dataKey="percentile" stroke="#10b981" name="Percentile" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Recent Mock Tests */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold">Recent Tests</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentile</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mockTests.map((test) => (
                      <tr key={test.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{test.name}</div>
                            <div className="text-sm text-gray-500">{test.correctAnswers}/{test.totalQuestions} correct</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(test.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            test.score >= 80 ? 'bg-green-100 text-green-800' :
                            test.score >= 70 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {test.score}%
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          #{test.rank}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {test.percentile}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-green-600 hover:text-green-900">
                              <Download className="w-4 h-4" />
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

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Achievements</h2>
              <div className="text-sm text-gray-600">
                {achievements.filter(a => a.unlocked).length} of {achievements.length} unlocked
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.id} 
                  className={`bg-white rounded-xl shadow-sm p-6 border-2 ${
                    achievement.unlocked 
                      ? 'border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50' 
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`p-3 rounded-lg ${
                      achievement.unlocked 
                        ? 'bg-yellow-100 text-yellow-600' 
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {achievement.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                    {achievement.unlocked && (
                      <Crown className="w-6 h-6 text-yellow-500" />
                    )}
                  </div>

                  {!achievement.unlocked && achievement.progress !== undefined && (
                    <div>
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                        <span>Progress</span>
                        <span>{achievement.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${achievement.progress}%` }}
                        />
                      </div>
                      {achievement.requirement && (
                        <p className="text-xs text-gray-500">{achievement.requirement}</p>
                      )}
                    </div>
                  )}

                  {achievement.unlocked && achievement.unlockedDate && (
                    <div className="text-xs text-gray-500">
                      Unlocked on {new Date(achievement.unlockedDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Study Analytics</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Study Time Distribution</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={subjects.map(s => ({ name: s.name, value: Math.random() * 100 + 50 }))}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, percent}) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                    >
                      {subjects.map((subject, index) => (
                        <Cell key={`cell-${index}`} fill={subject.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold mb-4">Monthly Progress</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={[
                    { month: 'Sep', score: 65 },
                    { month: 'Oct', score: 70 },
                    { month: 'Nov', score: 75 },
                    { month: 'Dec', score: 78 },
                    { month: 'Jan', score: 82 }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Study Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{formatTime(totalStudyTime)}</p>
                    <p className="text-sm text-gray-600">Total Study Time</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Clock className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{mockTests.length}</p>
                    <p className="text-sm text-gray-600">Tests Completed</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {Math.round(subjects.reduce((acc, s) => acc + s.progress, 0) / subjects.length)}%
                    </p>
                    <p className="text-sm text-gray-600">Overall Progress</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Practice Tab */}
        {activeTab === 'practice' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Practice Sessions</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Daily Quiz', icon: Brain, color: 'blue', description: 'Quick 10-minute quiz' },
                { title: 'Subject Deep Dive', icon: BookOpen, color: 'green', description: 'Focused practice on weak areas' },
                { title: 'Timed Practice', icon: Timer, color: 'yellow', description: 'Practice under time pressure' },
                { title: 'Mock Test', icon: FileText, color: 'purple', description: 'Full-length practice test' },
                { title: 'Revision Mode', icon: RotateCcw, color: 'indigo', description: 'Review previous topics' },
                { title: 'Flash Cards', icon: Zap, color: 'pink', description: 'Quick concept review' }
              ].map((practice) => (
                <div key={practice.title} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`p-3 bg-${practice.color}-100 rounded-lg`}>
                      <practice.icon className={`w-6 h-6 text-${practice.color}-600`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{practice.title}</h3>
                      <p className="text-sm text-gray-600">{practice.description}</p>
                    </div>
                  </div>
                  <button className={`w-full px-4 py-2 bg-${practice.color}-600 text-white rounded-lg hover:bg-${practice.color}-700 transition-colors`}>
                    Start Practice
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other tabs would be implemented similarly */}
        {(activeTab === 'study_plan' || activeTab === 'progress') && (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {activeTab === 'study_plan' ? 'Study Plan' : 'Progress Tracking'}
            </h3>
            <p className="text-gray-600 mb-4">
              {activeTab === 'study_plan' 
                ? 'Personalized study planning feature coming soon!' 
                : 'Advanced progress tracking feature coming soon!'
              }
            </p>
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Learn More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompleteStudentDashboard;
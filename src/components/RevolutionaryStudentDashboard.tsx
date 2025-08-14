import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import {
  Brain, Target, BarChart3, Award, Clock, TrendingUp, 
  Zap, Users, BookOpen, AlertTriangle, CheckCircle,
  Star, Trophy, Flame, Play, Timer, Calendar, MessageSquare,
  ArrowUp, ArrowDown, ArrowRight, Activity, Bell, Settings, LogOut,
  Sparkles, Crown, Medal, Coffee, Book, Scale, Filter,
  Search, Download, Upload, Heart, Eye, ThumbsUp, 
  Share2, Bookmark, ChevronRight, ChevronDown, User, Loader
} from 'lucide-react';
import RevolutionaryMockTest, { sampleMockTest } from './RevolutionaryMockTest';
import { RealTimeProvider, useRealTime, LiveStatsDisplay, RealTimeProgressTracker } from './shared/RealTimeUpdates';
import { NotificationProvider, useNotifications, NotificationBell } from './shared/NotificationSystem';
import { SeamlessTransition, ScrollAnimation, HoverTransition, LoadingTransition } from './shared/SeamlessTransitions';
import '../styles/revolutionary-theme.css';

interface RevolutionaryStudentDashboardProps {
  user: any;
  onLogout: () => void;
}

// Type definitions for AI responses
interface AIExplanation {
  summary: string;
  detailed: string;
  keyPoints: string[];
  cases: string[];
  difficulty: string;
  subject: string;
  importance: string;
}

interface DoubtResponse {
  answer: string;
  subject: string;
  difficulty: string;
  confidence: number;
  tags: string[];
}

interface NotificationSettings {
  mockTestReminders: boolean;
  studyGoalReminders: boolean;
  weeklyReports: boolean;
  rankUpdates: boolean;
  achievementAlerts: boolean;
  [key: string]: boolean;
}

interface PrivacySettings {
  showInLeaderboard: boolean;
  shareProgressWithParents: boolean;
  allowStudyGroupInvites: boolean;
  anonymousMode: boolean;
  [key: string]: boolean;
}

// ✨ Loading Components for UI Polish
const SkeletonCard = () => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 animate-pulse">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
      <div className="flex-1">
        <div className="h-4 bg-gray-200 rounded-lg w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-100 rounded-lg w-1/2"></div>
      </div>
    </div>
    <div className="space-y-3">
      <div className="h-3 bg-gray-200 rounded-lg"></div>
      <div className="h-3 bg-gray-200 rounded-lg w-5/6"></div>
      <div className="h-3 bg-gray-200 rounded-lg w-4/6"></div>
    </div>
  </div>
);

const LoadingSpinner = ({ size = "md", className = "" }: { size?: "sm" | "md" | "lg" | "xl", className?: string }) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8",
    xl: "w-12 h-12"
  };
  
  return (
    <div className={`${sizes[size]} ${className}`}>
      <Loader className="w-full h-full animate-spin text-blue-600" />
    </div>
  );
};

const AIModuleLoader = ({ title, icon: Icon }: { title: string, icon: any }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <LoadingSpinner size="sm" className="ml-auto" />
    </div>
    <div className="space-y-3">
      <div className="h-4 bg-gray-200 rounded-lg animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded-lg w-4/5 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded-lg w-3/5 animate-pulse"></div>
    </div>
  </div>
);

// 🎯 Enhanced Dashboard Component with Real-time & Notifications
const EnhancedDashboardContent: React.FC<RevolutionaryStudentDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // 🔄 Real-time data integration
  const { data: realTimeData, isConnected } = useRealTime();
  const { notifications, unreadCount } = useNotifications();
  
  // ✨ Loading states for UI polish
  const [aiExplainerLoading, setAiExplainerLoading] = useState(false);
  const [aiDoubtLoading, setAiDoubtLoading] = useState(false);
  const [aiRecommendationsLoading, setAiRecommendationsLoading] = useState(false);
  const [aiGeneratorLoading, setAiGeneratorLoading] = useState(false);
  const [aiPlannerLoading, setAiPlannerLoading] = useState(false);
  const [aiAnalysisLoading, setAiAnalysisLoading] = useState(false);
  const [dashboardLoading, setDashboardLoading] = useState(true);
  
  // ✨ Simulated loading sequence for better UX
  useEffect(() => {
    const loadingSequence = setTimeout(() => {
      setDashboardLoading(false);
    }, 1500);
    
    return () => clearTimeout(loadingSequence);
  }, []);

  // Update time every minute with smooth transitions
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Revolutionary Performance Data
  const performanceData = [
    { subject: 'Legal Reasoning', current: 85, target: 90, improvement: 12 },
    { subject: 'Logical Reasoning', current: 78, target: 85, improvement: 8 },
    { subject: 'English Language', current: 92, target: 95, improvement: 5 },
    { subject: 'General Knowledge', current: 73, target: 80, improvement: 15 },
    { subject: 'Quantitative', current: 88, target: 90, improvement: 3 }
  ];

  const mockTestHistory = [
    { date: 'Jan 15', score: 156, percentile: 94.5, rank: 342 },
    { date: 'Jan 08', score: 148, percentile: 91.2, rank: 425 },
    { date: 'Jan 01', score: 142, percentile: 88.7, rank: 502 },
    { date: 'Dec 25', score: 138, percentile: 85.3, rank: 578 }
  ];

  const studyStreak = 24;
  const totalStudyTime = 156; // hours this month
  const averageScore = 151;
  const predictedRank = 342;

  // Progress tracking data
  const weeklyStudyData = [
    { week: 'Week 1', hours: 28, tests: 3, score: 145 },
    { week: 'Week 2', hours: 32, tests: 4, score: 148 },
    { week: 'Week 3', hours: 35, tests: 4, score: 152 },
    { week: 'Week 4', hours: 38, tests: 5, score: 156 }
  ];

  const subjectProgress = [
    { subject: 'Legal Reasoning', week1: 75, week2: 78, week3: 82, week4: 85 },
    { subject: 'Logical Reasoning', week1: 70, week2: 74, week3: 76, week4: 78 },
    { subject: 'English Language', week1: 88, week2: 89, week3: 91, week4: 92 },
    { subject: 'General Knowledge', week1: 65, week2: 68, week3: 70, week4: 73 },
    { subject: 'Quantitative', week1: 82, week2: 84, week3: 86, week4: 88 }
  ];

  const topicMastery = [
    { topic: 'Contract Law', mastery: 92, questions: 156, correct: 144 },
    { topic: 'Constitutional Law', mastery: 88, questions: 134, correct: 118 },
    { topic: 'Tort Law', mastery: 85, questions: 98, correct: 83 },
    { topic: 'Criminal Law', mastery: 82, questions: 89, correct: 73 },
    { topic: 'Family Law', mastery: 78, questions: 67, correct: 52 },
    { topic: 'Property Law', mastery: 75, questions: 56, correct: 42 }
  ];

  const timeSpentData = [
    { subject: 'Legal Reasoning', hours: 45, percentage: 29 },
    { subject: 'English Language', hours: 38, percentage: 24 },
    { subject: 'General Knowledge', hours: 35, percentage: 22 },
    { subject: 'Logical Reasoning', hours: 25, percentage: 16 },
    { subject: 'Quantitative', hours: 13, percentage: 8 }
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Hero Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* AI Rank Prediction */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 to-pink-600 p-6 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer group">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <Crown className="h-8 w-8 text-yellow-300" />
              <div>
                <p className="text-purple-100 text-sm font-medium">AI Predicted Rank</p>
                <p className="text-3xl font-bold">{predictedRank.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <TrendingUp className="h-4 w-4 text-green-300" />
              <span className="text-purple-100">94% accuracy • Top 15% achievable</span>
            </div>
          </div>
        </div>

        {/* Study Streak */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 to-red-500 p-6 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer group">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <Flame className="h-8 w-8 text-yellow-300 animate-pulse" />
              <div>
                <p className="text-orange-100 text-sm font-medium">Study Streak</p>
                <p className="text-3xl font-bold">{studyStreak} Days</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Trophy className="h-4 w-4 text-yellow-300" />
              <span className="text-orange-100">Personal best! Keep going 🔥</span>
            </div>
          </div>
        </div>

        {/* Average Score */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-500 p-6 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <Target className="h-8 w-8 text-blue-100" />
              <div>
                <p className="text-blue-100 text-sm font-medium">Average Score</p>
                <p className="text-3xl font-bold">{averageScore}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <ArrowUp className="h-4 w-4 text-green-300" />
              <span className="text-blue-100">+8 from last month</span>
            </div>
          </div>
        </div>

        {/* Study Time */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-500 to-emerald-500 p-6 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer group">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="h-8 w-8 text-green-100" />
              <div>
                <p className="text-green-100 text-sm font-medium">Study Time</p>
                <p className="text-3xl font-bold">{totalStudyTime}h</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Activity className="h-4 w-4 text-green-200" />
              <span className="text-green-100">This month • 5.2h daily avg</span>
            </div>
          </div>
        </div>
      </div>

      {/* Revolutionary AI Features */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Text Explainer */}
        <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full -translate-y-4 translate-x-4 opacity-10"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">🤖 AI Text Explainer</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">94% accuracy</p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Get instant explanations for complex legal passages with our revolutionary AI.
            </p>
            <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200">
              Try AI Explainer
            </button>
          </div>
        </div>

        {/* 3D Rank Predictor */}
        <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full -translate-y-4 translate-x-4 opacity-10"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">⚡ 3D Rank Predictor</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">Rank #{predictedRank}</p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Visualize your path to top NLUs with stunning 3D predictions.
            </p>
            <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-200">
              View 3D Prediction
            </button>
          </div>
        </div>

        {/* Smart Study Planner */}
        <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full -translate-y-4 translate-x-4 opacity-10"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">🎯 Smart Planner</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">+15% efficiency</p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              AI-optimized study schedules adapted to your performance patterns.
            </p>
            <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200">
              Optimize Schedule
            </button>
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">📊 Subject Performance</h3>
          <div className="space-y-4">
            {performanceData.map((subject, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{subject.subject}</span>
                  <span className="text-gray-600 dark:text-gray-400 text-sm">{subject.current}% / {subject.target}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(subject.current / subject.target) * 100}%` }}
                  ></div>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <ArrowUp className="h-3 w-3 text-green-500" />
                  <span className="text-xs text-green-600">+{subject.improvement}% this month</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">📈 Mock Test Progress</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockTestHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#8B5CF6" 
                strokeWidth={3}
                dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-3xl p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">🚀 Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => setActiveTab('mock-tests')}
            className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
          >
            <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <span className="font-semibold text-gray-700 dark:text-gray-300">Take Mock Test</span>
          </button>

          <button 
            onClick={() => setActiveTab('ai-explainer')}
            className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
          >
            <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <span className="font-semibold text-gray-700 dark:text-gray-300">AI Explainer</span>
          </button>

          <button 
            onClick={() => setActiveTab('doubts')}
            className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
          >
            <div className="p-3 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500">
              <MessageSquare className="h-6 w-6 text-white" />
            </div>
            <span className="font-semibold text-gray-700 dark:text-gray-300">Ask Doubt</span>
          </button>

          <button 
            onClick={() => setActiveTab('progress')}
            className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
          >
            <div className="p-3 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <span className="font-semibold text-gray-700 dark:text-gray-300">View Progress</span>
          </button>
        </div>
      </div>
    </div>
  );

  // Mock Test State
  const [showMockTest, setShowMockTest] = useState(false);
  const [mockTestResult, setMockTestResult] = useState(null);

  const handleMockTestComplete = (result: any) => {
    setMockTestResult(result);
    setShowMockTest(false);
    // Add result to history
    console.log('Mock test completed:', result);
    // You could update mockTestHistory here in a real app
  };

  const renderMockTests = () => (
    <div className="space-y-6">
      <div className="text-center bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8">
        <Trophy className="h-16 w-16 text-purple-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">🏆 CLAT Mock Tests</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Take full-length CLAT mock tests with AI-powered analysis and rank prediction.
        </p>
        <button 
          onClick={() => setShowMockTest(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          🚀 Start New Mock Test
        </button>
      </div>

      {/* Recent Mock Tests */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Mock Tests</h3>
        <div className="space-y-4">
          {mockTestHistory.map((test, index) => (
            <div key={index} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">Mock Test - {test.date}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Score: {test.score} • Rank: {test.rank}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-green-600">{test.percentile}%</p>
                <p className="text-gray-500 text-sm">Percentile</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const [inputText, setInputText] = useState('');
  const [explanation, setExplanation] = useState<AIExplanation | null>(null);
  const [isExplaining, setIsExplaining] = useState(false);
  const [selectedText, setSelectedText] = useState('');

  // ✨ Enhanced AI Text Explainer with loading states
  const handleAIExplanation = async () => {
    if (!inputText.trim()) return;
    
    setIsExplaining(true);
    setAiExplainerLoading(true);
    
    // Simulate AI processing delay with realistic timing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Enhanced AI explanation database with detailed responses
    const advancedExplanations = {
      'Article 14': {
        summary: 'Article 14 of the Indian Constitution guarantees the Right to Equality before law.',
        detailed: 'Article 14 states: "The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India." This fundamental right ensures equal treatment regardless of religion, race, caste, sex, or place of birth.',
        keyPoints: [
          'Equality before law: No person is above the law',
          'Equal protection of laws: Similar situations should be treated similarly', 
          'Applies to all persons, not just citizens',
          'Allows for reasonable classification'
        ],
        cases: ['E.P. Royappa v. State of Tamil Nadu (1974)', 'Maneka Gandhi v. Union of India (1978)'],
        difficulty: 'Medium',
        subject: 'Constitutional Law',
        importance: 'High - Fundamental Right'
      },
      'natural justice': {
        summary: 'Natural justice refers to fundamental principles of fair procedure in legal proceedings.',
        detailed: 'Natural justice embodies two core principles: (1) Audi alteram partem - hear the other side, ensuring no one is condemned unheard, and (2) Nemo judex in causa sua - no one should judge their own cause, ensuring impartiality.',
        keyPoints: [
          'Audi alteram partem: Right to be heard',
          'Nemo judex in causa sua: Rule against bias',
          'Essential for administrative law',
          'Applies to quasi-judicial bodies'
        ],
        cases: ['Ridge v. Baldwin (1964)', 'Cooper v. Wandsworth Board (1863)'],
        difficulty: 'Hard',
        subject: 'Administrative Law',
        importance: 'High - Core Legal Principle'
      },
      'tort': {
        summary: 'Tort is a civil wrong causing harm to another, remedied through compensation.',
        detailed: 'Tort law deals with civil wrongs that cause harm or injury to individuals. Unlike criminal law, it focuses on compensation rather than punishment. The injured party can seek damages for the harm suffered.',
        keyPoints: [
          'Civil wrong, not criminal',
          'Compensation-based remedy',
          'No contractual relationship required',
          'Includes negligence, defamation, trespass'
        ],
        cases: ['Donoghue v. Stevenson (1932)', 'Rylands v. Fletcher (1868)'],
        difficulty: 'Medium',
        subject: 'Tort Law',
        importance: 'High - Core Legal Area'
      },
      'consideration': {
        summary: 'Consideration is something of value exchanged to make contracts legally binding.',
        detailed: 'In contract law, consideration makes agreements enforceable. It can be money, goods, services, or promises. Valid consideration must be sufficient (have some value) but need not be adequate (equal value).',
        keyPoints: [
          'Must move from the promisee',
          'Can be executory or executed',
          'Must be sufficient, not adequate',
          'Past consideration is generally invalid'
        ],
        cases: ['Currie v. Misa (1875)', 'Thomas v. Thomas (1842)'],
        difficulty: 'Medium',
        subject: 'Contract Law',
        importance: 'High - Contract Essential'
      },
      'fundamental rights': {
        summary: 'Fundamental Rights are basic human rights guaranteed by the Indian Constitution.',
        detailed: 'Articles 12-35 of the Indian Constitution contain Fundamental Rights, which are justiciable and enforceable in courts. They include Right to Equality, Right to Freedom, Right against Exploitation, Right to Freedom of Religion, Cultural and Educational Rights, and Right to Constitutional Remedies.',
        keyPoints: [
          'Six categories of fundamental rights',
          'Enforceable in courts (justiciable)',
          'Can be suspended during emergency',
          'Article 32 is the "heart and soul"'
        ],
        cases: ['Kesavananda Bharati v. State of Kerala (1973)', 'Minerva Mills v. Union of India (1980)'],
        difficulty: 'Hard',
        subject: 'Constitutional Law',
        importance: 'Very High - Constitutional Core'
      },
      'contract': {
        summary: 'A contract is a legally binding agreement between parties with mutual obligations.',
        detailed: 'Under the Indian Contract Act, 1872, a contract requires offer, acceptance, consideration, capacity, and free consent. It creates legal obligations enforceable by law.',
        keyPoints: [
          'Agreement + enforceability = contract',
          'Essential elements: offer, acceptance, consideration',
          'Free consent required',
          'Parties must have capacity to contract'
        ],
        cases: ['Lalman Shukla v. Gauri Datt (1913)', 'Balfour v. Balfour (1919)'],
        difficulty: 'Medium',
        subject: 'Contract Law',
        importance: 'High - Commercial Essential'
      }
    };
    
    // Enhanced matching logic
    let aiResponse = null;
    const lowerText = inputText.toLowerCase();
    
    // Direct matches first
    for (const [term, data] of Object.entries(advancedExplanations)) {
      if (lowerText.includes(term.toLowerCase())) {
        aiResponse = data;
        break;
      }
    }
    
    // Fuzzy matching for related terms
    if (!aiResponse) {
      const fuzzyMatches = {
        'equality': advancedExplanations['Article 14'],
        'fair hearing': advancedExplanations['natural justice'],
        'negligence': advancedExplanations['tort'],
        'agreement': advancedExplanations['contract'],
        'constitutional rights': advancedExplanations['fundamental rights']
      };
      
      for (const [fuzzy, data] of Object.entries(fuzzyMatches)) {
        if (lowerText.includes(fuzzy)) {
          aiResponse = data;
          break;
        }
      }
    }
    
    if (!aiResponse) {
      // Generate intelligent fallback response
      aiResponse = {
        summary: 'AI Analysis of Legal Text',
        detailed: `The text "${inputText}" appears to be a legal concept requiring detailed analysis. The AI recommends: (1) Breaking down complex terms into simpler components, (2) Identifying key legal principles involved, (3) Researching relevant case law and statutes, and (4) Understanding practical applications in legal practice.`,
        keyPoints: [
          'Requires case law research',
          'May involve multiple legal areas', 
          'Consider practical implications',
          'Check for recent legal updates'
        ],
        cases: ['Research specific cases for this topic'],
        difficulty: 'Unknown',
        subject: 'General Legal Studies',
        importance: 'Needs Assessment'
      };
    }
    
    setExplanation(aiResponse);
    setIsExplaining(false);
    setAiExplainerLoading(false);
  };

  // Doubts State Management
  const [doubtText, setDoubtText] = useState('');
  const [doubtResponse, setDoubtResponse] = useState<DoubtResponse | null>(null);
  const [isResolvingDoubt, setIsResolvingDoubt] = useState(false);
  const [doubtHistory, setDoubtHistory] = useState([
    {
      id: 1,
      question: "What is the difference between void and voidable contracts?",
      answer: "A void contract is invalid from the beginning and has no legal effect whatsoever. It cannot be enforced by either party. Examples include contracts with minors, contracts for illegal purposes, or contracts made under coercion. A voidable contract, on the other hand, is valid until one party chooses to avoid it. It becomes void only when the aggrieved party decides to cancel it. Examples include contracts made under undue influence, misrepresentation, or fraud.",
      timestamp: "2025-01-10 14:30",
      subject: "Contract Law",
      status: "resolved"
    },
    {
      id: 2,
      question: "Explain the concept of Fundamental Rights under Article 12-35",
      answer: "Fundamental Rights are basic human rights guaranteed by the Constitution to all citizens. Articles 12-35 define and protect these rights including Right to Equality (14-18), Right to Freedom (19-22), Right against Exploitation (23-24), Right to Freedom of Religion (25-28), Cultural and Educational Rights (29-30), and Right to Constitutional Remedies (32). These rights are enforceable against the state and are essential for the dignity and development of individuals.",
      timestamp: "2025-01-09 16:45",
      subject: "Constitutional Law",
      status: "resolved"
    }
  ]);

  const handleDoubtSubmission = async () => {
    if (!doubtText.trim()) return;
    
    setIsResolvingDoubt(true);
    setAiDoubtLoading(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Advanced AI response system with structured responses
    const advancedDoubtResponses = {
      'consideration': {
        answer: `**Consideration** is the price paid for a promise - something of value exchanged between parties to make a contract legally binding.

🔑 **Essential Elements:**
1. **Must be Real & Valuable** - Cannot be illusory or worthless
2. **Must be Legal** - Cannot involve illegal activities  
3. **Must be Possible** - Cannot be physically impossible to perform
4. **Must be Present or Future** - Past consideration is generally invalid

📚 **Legal Maxim:** "Nudum pactum non parit actionem" (A naked promise does not give rise to action)

⚖️ **Key Case Laws:**
• **Currie v. Misa (1875)** - Defined consideration as "some right, interest, profit or benefit accruing to one party, or some forbearance, detriment, loss or responsibility given, suffered or undertaken by the other"
• **Thomas v. Thomas (1842)** - Established that consideration must be sufficient but need not be adequate

🎯 **Practical Examples:**
• **Valid:** A promises to sell his car to B for ₹5 lakhs (money for goods)
• **Valid:** A agrees not to smoke for a year in exchange for B's ₹1000 (forbearance for money)
• **Invalid:** A promises to give B ₹1000 "out of love" (no consideration)

💡 **CLAT Tip:** Remember the difference between "sufficient" (has some value in law's eyes) vs "adequate" (equal value). Courts don't assess fairness of exchange.`,
        subject: 'Contract Law',
        difficulty: 'Medium',
        confidence: 94,
        tags: ['Contract Law', 'Essentials of Contract', 'CLAT Important']
      },
      'tort': {
        answer: `**Tort** is a civil wrong (not arising from contract) that causes harm to another, for which courts provide remedy through compensation.

🏛️ **Definition by Salmond:** "Tort is a civil wrong for which the remedy is a common law action for unliquidated damages, and which is not exclusively the breach of a contract or breach of trust."

🔑 **Essential Elements:**
1. **Wrongful Act** - Act or omission by defendant
2. **Duty Exists** - Legal duty owed to plaintiff  
3. **Breach of Duty** - Violation of that legal duty
4. **Damage/Harm** - Actual loss suffered by plaintiff

⚖️ **Landmark Cases:**
• **Donoghue v. Stevenson (1932)** - Established modern negligence law and "neighbor principle"
• **Rylands v. Fletcher (1868)** - Rule of strict liability for dangerous things
• **Ashby v. White (1703)** - "Ubi jus ibi remedium" (where there is a right, there is a remedy)

📋 **Major Types:**
• **Negligence** - Failure to exercise reasonable care
• **Defamation** - False statement harming reputation  
• **Trespass** - Unlawful interference with person/property
• **Nuisance** - Unreasonable interference with use of land

🎯 **CLAT Focus:** Remember tort law is about compensation (civil), not punishment (criminal). The injured party seeks "damages" not "fine."`,
        subject: 'Tort Law',
        difficulty: 'Medium',
        confidence: 96,
        tags: ['Tort Law', 'Civil Wrong', 'Negligence', 'Defamation']
      },
      'article 21': {
        answer: `**Article 21** is the "heart and soul" of fundamental rights, guaranteeing **Right to Life and Personal Liberty**.

📜 **Constitutional Text:** "No person shall be deprived of his life or personal liberty except according to procedure established by law."

🌟 **Judicial Evolution:**
Initially narrow interpretation → Now expansively covers entire spectrum of human dignity

🏛️ **Landmark Judgments:**
• **Maneka Gandhi v. Union of India (1978)** - Transformed "procedure established by law" to mean "fair, just and reasonable procedure"
• **Francis Coralie v. Union Territory of Delhi (1981)** - Right to life includes right to live with human dignity
• **Olga Tellis v. Bombay Municipal Corporation (1985)** - Right to livelihood is part of right to life

🎯 **Expanded Scope (by Supreme Court):**
• Right to **Health** (Paschim Banga Khet Mazdoor Samity case)
• Right to **Education** (Unnikrishnan case)
• Right to **Clean Environment** (M.C. Mehta cases)
• Right to **Privacy** (K.S. Puttaswamy case, 2017)
• Right to **Speedy Trial** (Hussainara Khatoon case)
• Right to **Legal Aid** (M.H. Hoskot case)

⚖️ **Important Features:**
• Applies to **all persons** (not just citizens)
• **Positive and Negative** rights (state must act AND refrain from acting)
• **Most expansively interpreted** fundamental right

💡 **CLAT Strategy:** Article 21 questions often test knowledge of Supreme Court's creative interpretation expanding scope beyond literal text.`,
        subject: 'Constitutional Law',
        difficulty: 'Hard',
        confidence: 98,
        tags: ['Constitutional Law', 'Fundamental Rights', 'Article 21', 'Supreme Court']
      },
      'natural justice': {
        answer: `**Natural Justice** represents fundamental fairness principles that must be followed in legal/quasi-legal proceedings.

⚖️ **Two Cardinal Principles:**

**1. Audi Alteram Partem** ("Hear the Other Side")
• Right to **notice** of case against you
• Right to **fair hearing** before decision
• Right to **present evidence** and arguments
• Right to **legal representation** (in some cases)

**2. Nemo Judex in Causa Sua** ("No one should judge their own case")
• Decision-maker must be **impartial** and **unbiased**
• No **personal interest** in the outcome
• No **pre-conceived notions** or prejudice

🏛️ **Foundational Cases:**
• **Cooper v. Wandsworth Board of Works (1863)** - Established basic principle: "Even God does not pass a sentence without hearing the other side"
• **Ridge v. Baldwin (1964)** - Revived natural justice in English law
• **A.K. Kraipak v. Union of India (1970)** - Applied natural justice to administrative actions in India

📚 **Applicability:**
• **Judicial** proceedings (courts)
• **Quasi-judicial** bodies (tribunals, commissions)
• **Administrative** decisions affecting rights
• **Domestic** tribunals (clubs, universities, professional bodies)

🚫 **Exceptions:**
• **Emergency** situations
• **National security** matters  
• **Legislative** functions
• **Routine administrative** decisions

🎯 **CLAT Focus:** Often tested through scenarios - identify when natural justice is violated and what remedy is available (usually judicial review).

💡 **Memory Trick:** "BIAS" - Before any Important Administrative/judicial decision, you need proper Notice and Hearing, without any bias.`,
        subject: 'Administrative Law',
        difficulty: 'Hard',
        confidence: 95,
        tags: ['Administrative Law', 'Natural Justice', 'Fair Hearing', 'Judicial Review']
      }
    };
    
    // Enhanced matching with context analysis
    let aiResponse = null;
    let matchedTerm = '';
    const lowerText = doubtText.toLowerCase();
    
    // Direct term matching
    for (const [term, response] of Object.entries(advancedDoubtResponses)) {
      if (lowerText.includes(term.toLowerCase())) {
        aiResponse = response;
        matchedTerm = term;
        break;
      }
    }
    
    // Contextual matching for related terms
    if (!aiResponse) {
      const contextMatches = {
        'contract': advancedDoubtResponses['consideration'],
        'agreement': advancedDoubtResponses['consideration'],
        'promise': advancedDoubtResponses['consideration'],
        'negligence': advancedDoubtResponses['tort'],
        'defamation': advancedDoubtResponses['tort'], 
        'civil wrong': advancedDoubtResponses['tort'],
        'life': advancedDoubtResponses['article 21'],
        'personal liberty': advancedDoubtResponses['article 21'],
        'right to life': advancedDoubtResponses['article 21'],
        'fair hearing': advancedDoubtResponses['natural justice'],
        'bias': advancedDoubtResponses['natural justice'],
        'audi alteram partem': advancedDoubtResponses['natural justice']
      };
      
      for (const [context, response] of Object.entries(contextMatches)) {
        if (lowerText.includes(context)) {
          aiResponse = response;
          matchedTerm = context;
          break;
        }
      }
    }
    
    // Intelligent fallback with structured guidance
    if (!aiResponse) {
      const questionType = analyzeQuestionType(doubtText);
      aiResponse = {
        answer: `🤖 **AI Analysis of Your Question:**

"${doubtText}"

**Question Category:** ${questionType.category}
**Complexity Level:** ${questionType.complexity}
**Recommended Approach:**

${questionType.guidance}

**💡 Pro Tips for CLAT Success:**
• Break complex concepts into smaller components
• Always look for **definitions, essentials, exceptions**
• Connect concepts to **case laws and examples**
• Practice with **previous year questions**

**🎯 Suggested Follow-up Questions:**
• "Define [key term] with essentials"
• "Explain [concept] with case laws"  
• "Give practical examples of [topic]"
• "What are exceptions to [rule]?"

**📚 Need specific help?** Try asking about: fundamental rights, contract law, tort law, criminal law, constitutional law, or any specific legal provision.`,
        subject: questionType.subject,
        difficulty: questionType.complexity,
        confidence: 88,
        tags: ['General Legal Query', 'AI Guidance', 'Study Strategy']
      };
    }
    
    setDoubtResponse(aiResponse);
    
    // Enhanced doubt history entry
    const newDoubt = {
      id: doubtHistory.length + 1,
      question: doubtText,
      answer: aiResponse.answer,
      timestamp: new Date().toLocaleString(),
      subject: aiResponse.subject,
      difficulty: aiResponse.difficulty,
      confidence: aiResponse.confidence,
      tags: aiResponse.tags,
      status: "resolved",
      matchedTerm: matchedTerm || 'general'
    };
    
    setDoubtHistory(prev => [newDoubt, ...prev]);
    setIsResolvingDoubt(false);
    setAiDoubtLoading(false);
    setDoubtText(''); // Clear input for next question
  };

  // Helper function to analyze question type
  const analyzeQuestionType = (question: string) => {
    const q = question.toLowerCase();
    
    if (q.includes('article') || q.includes('constitutional') || q.includes('fundamental right')) {
      return {
        category: 'Constitutional Law',
        complexity: 'Hard',
        subject: 'Constitutional Law',
        guidance: `1. **Identify the Article/Right** - Which specific constitutional provision is involved?
2. **Understand the Scope** - What does this article guarantee or prohibit?
3. **Know the Exceptions** - What are the reasonable restrictions or limitations?
4. **Case Law Analysis** - Which Supreme Court cases have interpreted this provision?
5. **Current Application** - How is this applied in modern legal scenarios?`
      };
    } else if (q.includes('contract') || q.includes('agreement') || q.includes('offer') || q.includes('acceptance')) {
      return {
        category: 'Contract Law',
        complexity: 'Medium',
        subject: 'Contract Law', 
        guidance: `1. **Identify Contract Elements** - Is this about offer, acceptance, consideration, capacity, or consent?
2. **Check Essentials** - Are all essential elements present for a valid contract?
3. **Look for Vitiating Factors** - Is there fraud, misrepresentation, coercion, undue influence?
4. **Determine Enforceability** - Is the contract valid, void, voidable, or unenforceable?
5. **Remedies Available** - What legal remedies are available for breach?`
      };
    } else if (q.includes('tort') || q.includes('negligence') || q.includes('defamation')) {
      return {
        category: 'Tort Law', 
        complexity: 'Medium',
        subject: 'Tort Law',
        guidance: `1. **Identify the Tort** - Which specific tort is involved (negligence, defamation, trespass, etc.)?
2. **Check Essential Elements** - Are all elements of that specific tort present?
3. **Establish Duty & Breach** - Was there a duty of care and was it breached?
4. **Prove Causation** - Is there a direct link between breach and damage?
5. **Calculate Damages** - What compensation is appropriate for the harm caused?`
      };
    } else {
      return {
        category: 'General Legal Studies',
        complexity: 'Variable', 
        subject: 'General Legal Studies',
        guidance: `1. **Categorize the Topic** - Which area of law does this fall under?
2. **Find Definitions** - What are the key terms that need to be defined?
3. **Understand Context** - What's the practical application of this concept?
4. **Research Sources** - Which statutes, cases, or legal principles apply?
5. **Practice Application** - How would this concept appear in CLAT questions?`
      };
    }
  };

  const renderDoubts = () => (
    <div className="space-y-6">
      {/* Doubts Header */}
      <div className="text-center bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8">
        <MessageSquare className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">💬 AI Doubt Resolver</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Get instant, accurate answers to your legal doubts with our advanced AI tutor - available 24/7.
        </p>
        
        {/* Doubt Input Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-6">
          <label className="block text-left text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Ask Your Doubt:
          </label>
          <textarea 
            value={doubtText}
            onChange={(e) => setDoubtText(e.target.value)}
            className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-xl resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Example: What is the difference between void and voidable contracts? Explain Article 21 with examples. What are the essentials of a valid contract?"
          />
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Avg response time: 2-3 seconds
              </span>
            </div>
            <button 
              onClick={handleDoubtSubmission}
              disabled={!doubtText.trim() || isResolvingDoubt}
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isResolvingDoubt ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  <span className="animate-pulse">AI is analyzing...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  <span>Get AI Answer</span>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* ✨ Loading state for doubt resolution */}
        {isResolvingDoubt && (
          <AIModuleLoader title="AI Tutor is analyzing your doubt" icon={MessageSquare} />
        )}
        
        {/* Enhanced Doubt Response */}
        {doubtResponse && !isResolvingDoubt && (
          <div className="bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-3xl p-6 shadow-lg text-left mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Brain className="h-8 w-8 text-blue-600" />
                <div>
                  <h3 className="text-xl font-bold text-blue-800 dark:text-blue-300">AI Tutor Response</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{doubtResponse.subject}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  doubtResponse.difficulty === 'Easy' 
                    ? 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200'
                    : doubtResponse.difficulty === 'Medium'
                      ? 'bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200'
                      : 'bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200'
                }`}>
                  {doubtResponse.difficulty}
                </span>
                <span className="px-3 py-1 bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                  {doubtResponse.confidence}% Accurate
                </span>
              </div>
            </div>
            
            {/* Answer Content */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 mb-4">
              <div className="prose prose-sm max-w-none text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                {doubtResponse.answer}
              </div>
            </div>

            {/* Tags */}
            {doubtResponse.tags && (
              <div className="flex flex-wrap gap-2 mb-4">
                {doubtResponse.tags.map((tag: string, index: number) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-xs font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Actions and Metadata */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>AI Verified</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Resolved in 2.5s</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="h-4 w-4 text-purple-500" />
                  <span>Expert Level</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  Save
                </button>
                <button className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-sm hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                  Follow-up
                </button>
                <button className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg text-sm hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors">
                  Related Topics
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Doubt Categories */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
          {[
            { term: 'consideration', subject: 'Contract Law' },
            { term: 'tort', subject: 'Tort Law' },
            { term: 'Article 21', subject: 'Constitutional Law' },
            { term: 'judicial review', subject: 'Administrative Law' },
            { term: 'natural justice', subject: 'Legal Principles' }
          ].map((item, index) => (
            <button
              key={index}
              onClick={() => setDoubtText(`Explain ${item.term} with examples and case laws`)}
              className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
            >
              <div className="font-medium">{item.term}</div>
              <div className="text-xs text-gray-500">{item.subject}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Doubt History */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-purple-500" />
          Your Doubt History ({doubtHistory.length} resolved)
        </h3>
        <div className="space-y-4">
          {doubtHistory.map((doubt, index) => (
            <div key={doubt.id} className="border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{doubt.question}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {doubt.timestamp}
                    </span>
                    <span className="flex items-center gap-1">
                      <Scale className="h-4 w-4" />
                      {doubt.subject}
                    </span>
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs">
                      {doubt.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                  {doubt.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="h-8 w-8" />
            <div>
              <p className="text-2xl font-bold">{doubtHistory.length}</p>
              <p className="text-green-100">Doubts Resolved</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="h-8 w-8" />
            <div>
              <p className="text-2xl font-bold">96%</p>
              <p className="text-blue-100">AI Accuracy</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="h-8 w-8" />
            <div>
              <p className="text-2xl font-bold">2.8s</p>
              <p className="text-purple-100">Avg Response</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Profile State Management
  const [profileData, setProfileData] = useState({
    personalInfo: {
      name: user?.name || 'Student Name',
      email: user?.email || 'student@email.com',
      phone: '+91 9876543210',
      dateOfBirth: '2005-03-15',
      address: 'New Delhi, India',
      school: 'DPS RK Puram',
      targetNLU: 'NLSIU Bangalore',
      targetRank: '250',
      joinDate: '2024-11-15'
    },
    preferences: {
      studyMode: 'focused',
      difficulty: 'adaptive',
      notifications: true,
      darkMode: false,
      language: 'english',
      studyReminders: true,
      weeklyGoal: 40
    },
    achievements: [
      { id: 1, title: 'Study Streak Master', description: '24-day study streak', date: '2025-01-12', category: 'consistency' },
      { id: 2, title: 'Mock Test Champion', description: 'Scored 156/200 in latest mock', date: '2025-01-10', category: 'performance' },
      { id: 3, title: 'Legal Reasoning Expert', description: '85% accuracy in Legal Reasoning', date: '2025-01-08', category: 'subject' },
      { id: 4, title: 'Top Performer', description: 'Ranked in top 5% this month', date: '2025-01-05', category: 'ranking' }
    ],
    statistics: {
      totalStudyHours: 156,
      mockTestsTaken: 12,
      doubtsResolved: 24,
      averageScore: 151,
      bestScore: 156,
      weakestSubject: 'General Knowledge',
      strongestSubject: 'English Language',
      improvementRate: '+23%'
    }
  });

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profileData.personalInfo);

  const handleProfileSave = () => {
    setProfileData(prev => ({
      ...prev,
      personalInfo: editedProfile
    }));
    setIsEditingProfile(false);
  };

  const renderProfile = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="text-center bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8">
        <div className="relative inline-block mb-6">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto">
            {profileData.personalInfo.name.charAt(0)}
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
            <CheckCircle className="h-4 w-4 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{profileData.personalInfo.name}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">CLAT 2026 Aspirant • Target: {profileData.personalInfo.targetNLU}</p>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4">
            <p className="text-2xl font-bold text-purple-600">{profileData.statistics.totalStudyHours}h</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Study Hours</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4">
            <p className="text-2xl font-bold text-blue-600">{profileData.statistics.mockTestsTaken}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Mock Tests</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4">
            <p className="text-2xl font-bold text-green-600">{profileData.statistics.averageScore}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Avg Score</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4">
            <p className="text-2xl font-bold text-orange-600">#{predictedRank}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Predicted Rank</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Settings className="h-6 w-6 text-blue-500" />
                Personal Information
              </h3>
              <button
                onClick={() => {
                  if (isEditingProfile) {
                    handleProfileSave();
                  } else {
                    setEditedProfile(profileData.personalInfo);
                    setIsEditingProfile(true);
                  }
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                {isEditingProfile ? 'Save Changes' : 'Edit Profile'}
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                {isEditingProfile ? (
                  <input
                    type="text"
                    value={editedProfile.name}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                ) : (
                  <p className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl text-gray-900 dark:text-white">{profileData.personalInfo.name}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                {isEditingProfile ? (
                  <input
                    type="email"
                    value={editedProfile.email}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                ) : (
                  <p className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl text-gray-900 dark:text-white">{profileData.personalInfo.email}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone</label>
                {isEditingProfile ? (
                  <input
                    type="tel"
                    value={editedProfile.phone}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                ) : (
                  <p className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl text-gray-900 dark:text-white">{profileData.personalInfo.phone}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date of Birth</label>
                {isEditingProfile ? (
                  <input
                    type="date"
                    value={editedProfile.dateOfBirth}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                ) : (
                  <p className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl text-gray-900 dark:text-white">{new Date(profileData.personalInfo.dateOfBirth).toLocaleDateString()}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">School</label>
                {isEditingProfile ? (
                  <input
                    type="text"
                    value={editedProfile.school}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, school: e.target.value }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                ) : (
                  <p className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl text-gray-900 dark:text-white">{profileData.personalInfo.school}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Target NLU</label>
                {isEditingProfile ? (
                  <select
                    value={editedProfile.targetNLU}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, targetNLU: e.target.value }))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="NLSIU Bangalore">NLSIU Bangalore</option>
                    <option value="NALSAR Hyderabad">NALSAR Hyderabad</option>
                    <option value="WBNUJS Kolkata">WBNUJS Kolkata</option>
                    <option value="GNLU Gandhinagar">GNLU Gandhinagar</option>
                    <option value="NLUJ Bhopal">NLUJ Bhopal</option>
                  </select>
                ) : (
                  <p className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl text-gray-900 dark:text-white">{profileData.personalInfo.targetNLU}</p>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Address</label>
                {isEditingProfile ? (
                  <textarea
                    value={editedProfile.address}
                    onChange={(e) => setEditedProfile(prev => ({ ...prev, address: e.target.value }))}
                    rows={3}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white resize-none"
                  />
                ) : (
                  <p className="p-3 bg-gray-50 dark:bg-gray-700 rounded-xl text-gray-900 dark:text-white">{profileData.personalInfo.address}</p>
                )}
              </div>
            </div>
          </div>

          {/* Study Preferences */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Zap className="h-6 w-6 text-purple-500" />
              Study Preferences
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Study Mode</label>
                <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white">
                  <option value="focused">Focused Mode</option>
                  <option value="relaxed">Relaxed Mode</option>
                  <option value="intensive">Intensive Mode</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Difficulty Level</label>
                <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white">
                  <option value="adaptive">Adaptive (AI Recommended)</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Weekly Study Goal</label>
                <input
                  type="number"
                  value={profileData.preferences.weeklyGoal}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  placeholder="40 hours"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preferred Language</label>
                <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white">
                  <option value="english">English</option>
                  <option value="hindi">Hindi</option>
                  <option value="both">Both English & Hindi</option>
                </select>
              </div>
            </div>
            
            {/* Toggle Preferences */}
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Push Notifications</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Get notified about mock tests and updates</p>
                  </div>
                </div>
                <button className="w-12 h-6 bg-blue-500 rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                </button>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Study Reminders</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Daily study time reminders</p>
                  </div>
                </div>
                <button className="w-12 h-6 bg-green-500 rounded-full relative">
                  <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements & Statistics */}
        <div className="space-y-6">
          {/* Recent Achievements */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <Award className="h-6 w-6 text-yellow-500" />
              Recent Achievements
            </h3>
            <div className="space-y-4">
              {profileData.achievements.map(achievement => (
                <div key={achievement.id} className="flex items-start gap-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-gray-700 dark:to-gray-600 rounded-xl">
                  <div className="p-2 bg-yellow-500 rounded-lg">
                    <Trophy className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{achievement.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-xs">{achievement.description}</p>
                    <p className="text-gray-500 text-xs mt-1">{new Date(achievement.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-green-500" />
              Performance Summary
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Best Score</span>
                <span className="font-bold text-green-600">{profileData.statistics.bestScore}/200</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Improvement Rate</span>
                <span className="font-bold text-blue-600">{profileData.statistics.improvementRate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Strongest Subject</span>
                <span className="font-bold text-purple-600">{profileData.statistics.strongestSubject}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Focus Area</span>
                <span className="font-bold text-orange-600">{profileData.statistics.weakestSubject}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Doubts Resolved</span>
                <span className="font-bold text-cyan-600">{profileData.statistics.doubtsResolved}</span>
              </div>
            </div>
          </div>

          {/* Member Since */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-3xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Star className="h-8 w-8" />
              <div>
                <h3 className="text-lg font-bold">Premium Member</h3>
                <p className="text-purple-100 text-sm">Since {new Date(profileData.personalInfo.joinDate).toLocaleDateString()}</p>
              </div>
            </div>
            <p className="text-purple-100 text-sm">
              Access to all premium features including AI tutoring, unlimited mock tests, and personalized study plans.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Study Materials State Management
  const [materialsFilter, setMaterialsFilter] = useState('all');
  const [materialsSearch, setMaterialsSearch] = useState('');
  const [studyMaterials] = useState([
    {
      id: 1,
      title: "Constitutional Law - Fundamental Rights Complete Guide",
      type: "PDF",
      subject: "Legal Reasoning",
      size: "2.5 MB",
      pages: 45,
      downloads: 1234,
      rating: 4.8,
      author: "LEGALIGHT Faculty",
      lastUpdated: "2025-01-10",
      description: "Comprehensive coverage of Articles 12-35 with case studies and recent judgments",
      topics: ["Article 14", "Article 19", "Article 21", "Equality", "Freedom"],
      difficulty: "Intermediate"
    },
    {
      id: 2,
      title: "Contract Law Case Studies - 50 Important Cases",
      type: "PDF",
      subject: "Legal Reasoning",
      size: "3.2 MB",
      pages: 78,
      downloads: 987,
      rating: 4.9,
      author: "Senior Faculty",
      lastUpdated: "2025-01-08",
      description: "Essential contract law cases with detailed analysis and application",
      topics: ["Offer & Acceptance", "Consideration", "Breach", "Remedies"],
      difficulty: "Advanced"
    },
    {
      id: 3,
      title: "Logical Reasoning - Critical Thinking Methods",
      type: "Video",
      subject: "Logical Reasoning",
      duration: "2h 15m",
      downloads: 2156,
      rating: 4.7,
      author: "AI Tutor",
      lastUpdated: "2025-01-05",
      description: "Advanced logical reasoning techniques with practice questions",
      topics: ["Assumptions", "Inferences", "Strengthen/Weaken", "Paradox"],
      difficulty: "Intermediate"
    },
    {
      id: 4,
      title: "English Language - Vocabulary Builder 2026",
      type: "Interactive",
      subject: "English Language",
      size: "1.8 MB",
      downloads: 3421,
      rating: 4.6,
      author: "LEGALIGHT AI",
      lastUpdated: "2025-01-12",
      description: "Interactive vocabulary exercises with CLAT-specific words",
      topics: ["Advanced Vocabulary", "Synonyms", "Antonyms", "Usage"],
      difficulty: "Beginner"
    },
    {
      id: 5,
      title: "Current Affairs - January 2025 Compilation",
      type: "PDF",
      subject: "Current Affairs",
      size: "4.1 MB",
      pages: 62,
      downloads: 5678,
      rating: 4.9,
      author: "Current Affairs Team",
      lastUpdated: "2025-01-15",
      description: "Latest current affairs with legal implications and analysis",
      topics: ["Supreme Court Judgments", "Government Policies", "International Relations"],
      difficulty: "All Levels"
    },
    {
      id: 6,
      title: "Quantitative Techniques - Quick Calculation Methods",
      type: "Video",
      subject: "Quantitative Techniques",
      duration: "1h 45m",
      downloads: 1876,
      rating: 4.5,
      author: "Math Expert",
      lastUpdated: "2025-01-03",
      description: "Fast calculation techniques for CLAT quantitative section",
      topics: ["Percentages", "Ratio & Proportion", "Data Interpretation"],
      difficulty: "Intermediate"
    }
  ]);

  const filteredMaterials = studyMaterials.filter(material => {
    const matchesFilter = materialsFilter === 'all' || material.subject === materialsFilter;
    const matchesSearch = material.title.toLowerCase().includes(materialsSearch.toLowerCase()) ||
                         material.topics.some(topic => topic.toLowerCase().includes(materialsSearch.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const renderStudyMaterials = () => (
    <div className="space-y-6">
      {/* Materials Header */}
      <div className="text-center bg-gradient-to-r from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8">
        <BookOpen className="h-16 w-16 text-blue-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">📚 Study Materials</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Curated study materials created by CLAT experts and AI tutors for comprehensive preparation.
        </p>
        
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-4xl mx-auto">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={materialsSearch}
              onChange={(e) => setMaterialsSearch(e.target.value)}
              placeholder="Search materials, topics..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <select
              value={materialsFilter}
              onChange={(e) => setMaterialsFilter(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white appearance-none bg-white"
            >
              <option value="all">All Subjects</option>
              <option value="Legal Reasoning">Legal Reasoning</option>
              <option value="Logical Reasoning">Logical Reasoning</option>
              <option value="English Language">English Language</option>
              <option value="Current Affairs">Current Affairs</option>
              <option value="Quantitative Techniques">Quantitative Techniques</option>
            </select>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4">
            <p className="text-2xl font-bold text-blue-600">{studyMaterials.length}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Materials</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4">
            <p className="text-2xl font-bold text-green-600">{studyMaterials.reduce((acc, m) => acc + m.downloads, 0).toLocaleString()}</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Downloads</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4">
            <p className="text-2xl font-bold text-purple-600">4.7★</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Avg Rating</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4">
            <p className="text-2xl font-bold text-orange-600">Weekly</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">New Uploads</p>
          </div>
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map(material => (
          <div key={material.id} className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-2xl ${
                  material.type === 'PDF' ? 'bg-red-100 text-red-600' :
                  material.type === 'Video' ? 'bg-blue-100 text-blue-600' :
                  'bg-green-100 text-green-600'
                }`}>
                  {material.type === 'PDF' ? <BookOpen className="h-6 w-6" /> :
                   material.type === 'Video' ? <Play className="h-6 w-6" /> :
                   <Zap className="h-6 w-6" />}
                </div>
                <div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    material.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                    material.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    material.difficulty === 'Advanced' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {material.difficulty}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">{material.rating}</span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
              {material.title}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
              {material.description}
            </p>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Subject</span>
                <span className="font-medium text-gray-900 dark:text-white">{material.subject}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">
                  {material.type === 'Video' ? 'Duration' : 'Size'}
                </span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {material.type === 'Video' ? material.duration : material.size}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Downloads</span>
                <span className="font-medium text-gray-900 dark:text-white">{material.downloads.toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Updated</span>
                <span className="font-medium text-gray-900 dark:text-white">{new Date(material.lastUpdated).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Topics Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {material.topics.slice(0, 3).map((topic, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs">
                  {topic}
                </span>
              ))}
              {material.topics.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 rounded-lg text-xs">
                  +{material.topics.length - 3} more
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2">
                <Download className="h-4 w-4" />
                {material.type === 'Video' ? 'Watch' : 'Download'}
              </button>
              
              <button className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-colors">
                <Bookmark className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </button>
              
              <button className="p-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-colors">
                <Share2 className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Downloads */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Clock className="h-6 w-6 text-green-500" />
          Recently Downloaded
        </h3>
        <div className="space-y-4">
          {studyMaterials.slice(0, 3).map(material => (
            <div key={material.id} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl">
              <div className={`p-2 rounded-lg ${
                material.type === 'PDF' ? 'bg-red-100 text-red-600' :
                material.type === 'Video' ? 'bg-blue-100 text-blue-600' :
                'bg-green-100 text-green-600'
              }`}>
                {material.type === 'PDF' ? <BookOpen className="h-5 w-5" /> :
                 material.type === 'Video' ? <Play className="h-5 w-5" /> :
                 <Zap className="h-5 w-5" />}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">{material.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-xs">{material.subject} • Downloaded 2 days ago</p>
              </div>
              <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                Open
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Enhanced AI Recommendations with 90-day Predictive Modeling
  const [recommendations] = useState([
    {
      id: 1,
      type: 'critical_improvement',
      priority: 'high',
      urgency: 'immediate',
      title: 'General Knowledge Acceleration Program',
      description: 'AI analysis shows GK is your weakest link. Following our 90-day predictive model, immediate action can improve your rank by 150+ positions.',
      action: 'Start AI-Guided GK Program',
      estimatedImprovement: '+22 points',
      timeRequired: '2.5 hours/day',
      icon: '🚀',
      category: 'Critical Subject Focus',
      confidenceLevel: 92,
      predictiveData: {
        currentScore: 68,
        targetScore: 90,
        day30: 75,
        day60: 83,
        day90: 90,
        rankImpact: '+150 ranks'
      },
      actionPlan: [
        'Week 1-2: Focus on Current Affairs (2023-2024)',
        'Week 3-4: Indian History & Geography revision',
        'Week 5-6: Constitution & Government structure',
        'Week 7-8: Economics & Science basics',
        'Week 9-12: Comprehensive practice & testing'
      ],
      successMetrics: {
        dailyQuestions: 50,
        accuracy: '85%+',
        weakTopics: ['Science & Tech', 'Economics', 'Sports']
      }
    },
    {
      id: 2,
      type: 'strategic_optimization',
      priority: 'high', 
      urgency: 'this_week',
      title: '90-Day Rank Acceleration Strategy',
      description: 'Our predictive AI model shows you can reach Top 500 rank if you increase mock test frequency and optimize error analysis.',
      action: 'Activate Rank Booster Program',
      estimatedImprovement: 'Rank 850 → 450',
      timeRequired: '3 hours/day',
      icon: '🎯',
      category: 'Rank Strategy',
      confidenceLevel: 89,
      predictiveData: {
        currentRank: 850,
        targetRank: 450,
        day30: 720,
        day60: 580,
        day90: 450,
        probabilitySuccess: '89%'
      },
      actionPlan: [
        'Increase mock tests to 4 per week',
        'Spend 45 min on error analysis per test',
        'Focus on time management techniques',
        'Weekly performance review with AI',
        'Adaptive difficulty adjustment based on progress'
      ],
      successMetrics: {
        mockTestsPerWeek: 4,
        errorAnalysisTime: '45 min',
        timePerQuestion: '72 seconds'
      }
    },
    {
      id: 3,
      type: 'skill_enhancement',
      priority: 'medium',
      urgency: 'next_2_weeks',
      title: 'Reading Comprehension Velocity Program',
      description: 'AI detects you lose 12 minutes in RC passages. Our 30-day speed reading program can save 8-10 minutes.',
      action: 'Begin Speed Reading Training',
      estimatedImprovement: '+8-10 minutes saved',
      timeRequired: '45 min/day',
      icon: '⚡',
      category: 'Skill Enhancement',
      confidenceLevel: 86,
      predictiveData: {
        currentSpeed: '180 wpm',
        targetSpeed: '280 wpm',
        day15: '220 wpm',
        day30: '280 wpm',
        timeSaved: '8-10 minutes'
      },
      actionPlan: [
        'Daily 20-min speed reading exercises',
        'Practice skimming & scanning techniques',
        'Timed RC practice with difficulty progression',
        'Vocabulary building for faster comprehension',
        'Weekly speed assessment tests'
      ],
      successMetrics: {
        readingSpeed: '280+ wpm',
        comprehension: '90%+',
        timePerPassage: '4-5 minutes'
      }
    },
    {
      id: 4,
      type: 'performance_maintenance',
      priority: 'medium',
      urgency: 'ongoing',
      title: 'Legal Reasoning Excellence Maintenance',
      description: 'Your strongest subject (88% accuracy). AI recommends strategic revision to maintain edge while focusing energy elsewhere.',
      action: 'Smart Maintenance Plan',
      estimatedImprovement: 'Maintain 85-90%',
      timeRequired: '1 hour/day',
      icon: '⚖️',
      category: 'Performance Maintenance',
      confidenceLevel: 95,
      predictiveData: {
        currentAccuracy: '88%',
        maintenanceTarget: '85-90%',
        timeAllocation: 'Minimal',
        riskLevel: 'Low'
      },
      actionPlan: [
        'Weekly concept brush-up sessions',
        'Focus on new legal developments',
        'Practice recent case law questions',
        'Maintain through regular mock tests',
        'Review only when accuracy drops below 85%'
      ],
      successMetrics: {
        minAccuracy: '85%',
        weeklyTime: '7 hours',
        revisionFrequency: 'Bi-weekly'
      }
    },
    {
      id: 5,
      type: 'psychological_optimization',
      priority: 'medium',
      urgency: 'gradual',
      title: 'Test Anxiety & Peak Performance Protocol',
      description: 'AI analysis of your test patterns shows 8% performance drop under pressure. Mental conditioning can recover these lost points.',
      action: 'Start Peak Performance Training',
      estimatedImprovement: '+8% under pressure',
      timeRequired: '30 min/day',
      icon: '🧘',
      category: 'Mental Performance',
      confidenceLevel: 78,
      predictiveData: {
        currentPressureScore: '92% of practice score',
        targetPressureScore: '98% of practice score',
        stressResponse: 'Moderate',
        improvementPotential: 'High'
      },
      actionPlan: [
        'Daily 15-min meditation/breathing exercises',
        'Simulate exam pressure during practice',
        'Positive visualization techniques',
        'Progressive muscle relaxation training',
        'Mental rehearsal of test day scenarios'
      ],
      successMetrics: {
        stressLevel: 'Low',
        consistencyRatio: '98%+',
        mentalFocus: 'Excellent'
      }
    },
    {
      id: 6,
      type: 'long_term_strategy',
      priority: 'low',
      urgency: 'month_2_3',
      title: 'Advanced Topic Mastery for Top 100',
      description: 'For ambitious rank targets below 100, AI recommends advanced topic coverage that most students miss.',
      action: 'Elite Topic Mastery Program',
      estimatedImprovement: 'Top 100 potential',
      timeRequired: '1.5 hours/day',
      icon: '🏆',
      category: 'Elite Preparation',
      confidenceLevel: 71,
      predictiveData: {
        currentLevel: 'Advanced',
        targetLevel: 'Expert',
        rareDifficultyAccuracy: '65%',
        targetRareAccuracy: '85%'
      },
      actionPlan: [
        'Master rarely tested constitutional amendments',
        'Deep dive into landmark case ratios',
        'International law connections to Indian context',
        'Advanced legal reasoning patterns',
        'Elite-level current affairs integration'
      ],
      successMetrics: {
        rareTopicAccuracy: '85%+',
        expertLevelQuestions: '80%+',
        uniqueKnowledgeEdge: 'Significant'
      }
    }
  ]);

  const renderRecommendations = () => (
    <div className="space-y-6">
      {/* Recommendations Header */}
      <div className="text-center bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8">
        <Target className="h-16 w-16 text-purple-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">🎯 AI Recommendations</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Personalized recommendations based on your performance data and AI analysis.
        </p>
        
        {/* AI Insights Summary */}
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="h-8 w-8 text-blue-600" />
            <div className="text-left">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">AI Analysis Summary</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Based on your last 12 mock tests and study patterns</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">+23%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Overall Improvement</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">94%</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Prediction Accuracy</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">#{predictedRank}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">Target Rank</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced 90-Day Predictive Recommendations */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {recommendations.map(rec => (
          <div key={rec.id} className={`bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border-l-4 ${
            rec.priority === 'high' ? 'border-red-500' :
            rec.priority === 'medium' ? 'border-yellow-500' : 'border-green-500'
          }`}>
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{rec.icon}</div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{rec.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      rec.priority === 'high' ? 'bg-red-100 text-red-800' :
                      rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {rec.priority.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">{rec.category}</p>
                    <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded">
                      {rec.confidenceLevel}% AI Confidence
                    </span>
                  </div>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-lg text-xs font-medium ${
                rec.urgency === 'immediate' ? 'bg-red-100 text-red-700 border border-red-200' :
                rec.urgency === 'this_week' ? 'bg-orange-100 text-orange-700 border border-orange-200' :
                rec.urgency === 'next_2_weeks' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                'bg-gray-100 text-gray-700 border border-gray-200'
              }`}>
                {rec.urgency.replace('_', ' ').toUpperCase()}
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-4">{rec.description}</p>

            {/* 90-Day Predictive Data */}
            {rec.predictiveData && (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-purple-500" />
                  90-Day Prediction Model
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Current</p>
                    <p className="font-bold text-gray-900 dark:text-white">
                      {rec.predictiveData.currentScore || rec.predictiveData.currentRank || rec.predictiveData.currentSpeed || rec.predictiveData.currentAccuracy || rec.predictiveData.currentPressureScore || rec.predictiveData.currentLevel}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Day 30</p>
                    <p className="font-bold text-blue-600">
                      {rec.predictiveData.day30 || rec.predictiveData.day15 || 'Progress'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Day 60</p>
                    <p className="font-bold text-green-600">
                      {rec.predictiveData.day60 || rec.predictiveData.day30 || 'Advance'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Day 90</p>
                    <p className="font-bold text-purple-600">
                      {rec.predictiveData.day90 || rec.predictiveData.targetScore || rec.predictiveData.targetRank || rec.predictiveData.targetSpeed || rec.predictiveData.maintenanceTarget || rec.predictiveData.targetPressureScore || rec.predictiveData.targetLevel}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Plan */}
            {rec.actionPlan && (
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">📋 Action Plan</h4>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {rec.actionPlan.slice(0, 3).map((step, index) => (
                    <div key={index} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-1">
                      <span className="text-blue-500 font-bold">{index + 1}.</span>
                      <span>{step}</span>
                    </div>
                  ))}
                  {rec.actionPlan.length > 3 && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      +{rec.actionPlan.length - 3} more steps...
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Impact & Time Grid */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Expected Impact</p>
                <p className="font-semibold text-green-600">{rec.estimatedImprovement}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Time Investment</p>
                <p className="font-semibold text-blue-600">{rec.timeRequired}</p>
              </div>
            </div>

            {/* Success Metrics */}
            {rec.successMetrics && (
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">🎯 Success Metrics</h4>
                <div className="flex flex-wrap gap-1">
                  {Object.entries(rec.successMetrics).map(([key, value], index) => (
                    <span key={index} className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded">
                      {typeof value === 'object' && Array.isArray(value) 
                        ? `${value.length} ${key}` 
                        : `${key}: ${value}`
                      }
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Button */}
            <button className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 ${
              rec.priority === 'high' ? 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white' :
              rec.priority === 'medium' ? 'bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white' :
              'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white'
            }`}>
              {rec.action}
            </button>
          </div>
        ))}
      </div>

      {/* Study Schedule Optimization */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Calendar className="h-6 w-6 text-purple-500" />
          AI-Optimized Weekly Schedule
        </h3>
        
        <div className="grid grid-cols-7 gap-2 mb-6">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
            <div key={day} className="text-center">
              <p className="font-semibold text-gray-900 dark:text-white mb-2">{day}</p>
              <div className="space-y-2">
                <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded text-xs text-blue-800 dark:text-blue-200">
                  Mock Test
                  <br />10-12 AM
                </div>
                <div className="bg-green-100 dark:bg-green-900 p-2 rounded text-xs text-green-800 dark:text-green-200">
                  {index % 2 === 0 ? 'Legal Reasoning' : 'General Knowledge'}
                  <br />2-4 PM
                </div>
                <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded text-xs text-purple-800 dark:text-purple-200">
                  Revision
                  <br />7-8 PM
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-5 w-5 text-green-600" />
            <span className="font-semibold text-green-800 dark:text-green-300">AI Optimization Tip</span>
          </div>
          <p className="text-green-700 dark:text-green-400 text-sm">
            Based on your peak performance hours (10 AM - 12 PM), we've scheduled your mock tests during this time. 
            Your focus areas (General Knowledge) are placed during your secondary peak hours (2-4 PM).
          </p>
        </div>
      </div>

      {/* Performance Predictions */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-3xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <Crown className="h-8 w-8" />
          <div>
            <h3 className="text-2xl font-bold">90-Day Projection</h3>
            <p className="text-purple-100">If you follow AI recommendations consistently</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center bg-white/10 rounded-2xl p-4">
            <p className="text-3xl font-bold mb-2">175</p>
            <p className="text-purple-100">Projected Score</p>
            <p className="text-sm text-purple-200">+24 from current</p>
          </div>
          <div className="text-center bg-white/10 rounded-2xl p-4">
            <p className="text-3xl font-bold mb-2">#180</p>
            <p className="text-purple-100">Projected Rank</p>
            <p className="text-sm text-purple-200">-162 from current</p>
          </div>
          <div className="text-center bg-white/10 rounded-2xl p-4">
            <p className="text-3xl font-bold mb-2">95%</p>
            <p className="text-purple-100">Success Probability</p>
            <p className="text-sm text-purple-200">Top 250 rank</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Leaderboard State
  const [leaderboardData] = useState([
    { rank: 1, name: 'Arjun Kumar', score: 182, percentile: 99.2, trend: 'up', change: 2, school: 'DPS RK Puram', city: 'Delhi' },
    { rank: 2, name: 'Priya Sharma', score: 178, percentile: 98.8, trend: 'up', change: 1, school: 'St. Xaviers', city: 'Mumbai' },
    { rank: 3, name: 'Rohit Gupta', score: 176, percentile: 98.5, trend: 'down', change: -1, school: 'DAV Public', city: 'Bangalore' },
    { rank: 4, name: 'Ananya Singh', score: 174, percentile: 98.1, trend: 'same', change: 0, school: 'Modern School', city: 'Chennai' },
    { rank: 5, name: 'Vikram Patel', score: 172, percentile: 97.8, trend: 'up', change: 3, school: 'PSBB', city: 'Hyderabad' },
    { rank: 342, name: 'You (Student)', score: 151, percentile: 94.5, trend: 'up', change: 8, school: 'DPS RK Puram', city: 'Delhi', isCurrentUser: true },
  ]);

  const [leaderboardFilter, setLeaderboardFilter] = useState('all');

  const renderLeaderboard = () => (
    <div className="space-y-6">
      {/* Leaderboard Header */}
      <div className="text-center bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8">
        <Medal className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">🏅 Leaderboard</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          See how you rank against thousands of CLAT aspirants across India.
        </p>

        {/* Current Position Card */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-2xl p-6 max-w-md mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
              #{predictedRank}
            </div>
            <div className="text-left">
              <h3 className="text-xl font-bold">Your Current Rank</h3>
              <p className="text-purple-100">94.5th Percentile • Top 5%</p>
              <div className="flex items-center gap-2 mt-1">
                <ArrowUp className="h-4 w-4 text-green-300" />
                <span className="text-green-300 text-sm">+8 positions this week</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Options */}
        <div className="flex justify-center gap-4 mt-6">
          {[
            { id: 'all', label: 'All India' },
            { id: 'city', label: 'Your City' },
            { id: 'school', label: 'Your School' },
            { id: 'friends', label: 'Friends' }
          ].map(filter => (
            <button
              key={filter.id}
              onClick={() => setLeaderboardFilter(filter.id)}
              className={`px-4 py-2 rounded-xl font-medium transition-all ${
                leaderboardFilter === filter.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Crown className="h-6 w-6 text-yellow-500" />
          Top Performers ({leaderboardFilter === 'all' ? 'All India' : leaderboardFilter === 'city' ? 'Delhi' : leaderboardFilter === 'school' ? 'DPS RK Puram' : 'Your Circle'})
        </h3>

        {/* Podium */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[2, 1, 3].map((position, index) => {
            const student = leaderboardData[position - 1];
            const isCenter = position === 1;
            return (
              <div key={position} className={`text-center ${isCenter ? 'transform scale-110' : ''}`}>
                <div className={`relative mx-auto mb-4 ${
                  isCenter ? 'w-20 h-20' : 'w-16 h-16'
                } rounded-full bg-gradient-to-r ${
                  position === 1 ? 'from-yellow-400 to-yellow-600' :
                  position === 2 ? 'from-gray-300 to-gray-500' :
                  'from-orange-400 to-orange-600'
                } flex items-center justify-center text-white font-bold ${
                  isCenter ? 'text-2xl' : 'text-xl'
                }`}>
                  {student.name.charAt(0)}
                  <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full ${
                    position === 1 ? 'bg-yellow-500' :
                    position === 2 ? 'bg-gray-400' :
                    'bg-orange-500'
                  } flex items-center justify-center text-white text-sm font-bold`}>
                    {position}
                  </div>
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white">{student.name}</h4>
                <p className="text-lg font-bold text-green-600">{student.score}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{student.percentile}%</p>
                <p className="text-xs text-gray-500">{student.school}</p>
              </div>
            );
          })}
        </div>

        {/* Leaderboard Table */}
        <div className="space-y-2">
          {leaderboardData.map((student, index) => (
            <div key={index} className={`flex items-center justify-between p-4 rounded-2xl transition-all ${
              student.isCurrentUser 
                ? 'bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 border-2 border-purple-500' 
                : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
            }`}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                  student.rank <= 3 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600' :
                  student.rank <= 10 ? 'bg-gradient-to-r from-blue-400 to-blue-600' :
                  student.rank <= 50 ? 'bg-gradient-to-r from-green-400 to-green-600' :
                  'bg-gradient-to-r from-gray-400 to-gray-600'
                }`}>
                  {student.rank <= 999 ? student.rank : '999+'}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    {student.name}
                    {student.isCurrentUser && <span className="text-purple-600 text-sm">(You)</span>}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{student.school} • {student.city}</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="font-bold text-lg text-gray-900 dark:text-white">{student.score}</p>
                  <p className="text-xs text-gray-500">Score</p>
                </div>
                <div className="text-center">
                  <p className="font-bold text-green-600">{student.percentile}%</p>
                  <p className="text-xs text-gray-500">Percentile</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-1">
                    {student.trend === 'up' ? (
                      <ArrowUp className="h-4 w-4 text-green-500" />
                    ) : student.trend === 'down' ? (
                      <ArrowDown className="h-4 w-4 text-red-500" />
                    ) : (
                      <div className="w-4 h-4" />
                    )}
                    <span className={`text-sm font-medium ${
                      student.trend === 'up' ? 'text-green-600' :
                      student.trend === 'down' ? 'text-red-600' :
                      'text-gray-600'
                    }`}>
                      {student.change !== 0 ? `${student.change > 0 ? '+' : ''}${student.change}` : '-'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">Change</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Competition Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Users className="h-8 w-8" />
            <div>
              <h3 className="text-xl font-bold">Competition Stats</h3>
              <p className="text-blue-100">Live data from 75,000+ aspirants</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Active Students</span>
              <span className="font-bold">75,342</span>
            </div>
            <div className="flex justify-between">
              <span>Mock Tests Taken</span>
              <span className="font-bold">1.2M+</span>
            </div>
            <div className="flex justify-between">
              <span>Avg Score</span>
              <span className="font-bold">127</span>
            </div>
            <div className="flex justify-between">
              <span>Top 1% Cutoff</span>
              <span className="font-bold">165+</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Target className="h-8 w-8" />
            <div>
              <h3 className="text-xl font-bold">Your Progress</h3>
              <p className="text-green-100">Compared to your target rank</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span>Current Rank</span>
              <span className="font-bold">#{predictedRank}</span>
            </div>
            <div className="flex justify-between">
              <span>Target Rank</span>
              <span className="font-bold">#250</span>
            </div>
            <div className="flex justify-between">
              <span>Gap to Close</span>
              <span className="font-bold text-yellow-200">-{predictedRank - 250}</span>
            </div>
            <div className="flex justify-between">
              <span>Progress</span>
              <span className="font-bold text-yellow-200">73%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Study Groups */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Users className="h-6 w-6 text-blue-500" />
          Study Groups
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Delhi Toppers', members: 156, avgScore: 165, category: 'City' },
            { name: 'DPS Alumni', members: 89, avgScore: 158, category: 'School' },
            { name: 'Target 250', members: 234, avgScore: 152, category: 'Goal' }
          ].map((group, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-2xl p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{group.name}</h4>
              <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <p>{group.members} members</p>
                <p>Avg Score: {group.avgScore}</p>
                <p>Category: {group.category}</p>
              </div>
              <button className="w-full mt-3 bg-blue-600 text-white py-2 rounded-xl font-medium hover:bg-blue-700 transition-colors">
                Join Group
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Settings State
  const [settingsData, setSettingsData] = useState({
    notifications: {
      mockTestReminders: true,
      studyGoalReminders: true,
      weeklyReports: true,
      rankUpdates: true,
      achievementAlerts: true
    } as NotificationSettings,
    privacy: {
      showInLeaderboard: true,
      shareProgressWithParents: true,
      allowStudyGroupInvites: true,
      anonymousMode: false
    } as PrivacySettings,
    study: {
      defaultTestDuration: 120,
      autoSubmitIncomplete: false,
      showSolutionsImmediately: false,
      practiceMode: 'timed',
      difficultyLevel: 'adaptive'
    },
    appearance: {
      theme: 'light',
      language: 'english',
      timezone: 'IST',
      dateFormat: 'DD/MM/YYYY'
    }
  });

  const renderStudyPlanner = () => (
    <div className="space-y-6">
      {/* Study Planner Header */}
      <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8">
        <Calendar className="h-16 w-16 text-blue-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">📅 AI Study Planner</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Personalized study schedules powered by AI to optimize your CLAT preparation.
        </p>
        
        {/* AI Planning Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700">
            <Target className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white">89</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Days to CLAT</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700">
            <Clock className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white">6.5h</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Daily Target</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700">
            <Brain className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white">94%</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">AI Accuracy</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700">
            <TrendingUp className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white">+12</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Score Improvement</p>
          </div>
        </div>
      </div>

      {/* Current Week Schedule */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Calendar className="h-8 w-8 text-blue-500" />
            This Week's AI Schedule
          </h3>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl font-medium hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-colors">
              Customize
            </button>
            <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
              Export
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
          {[
            { day: 'Mon', date: '15', subjects: ['Legal Reasoning (2h)', 'English (1h)', 'Mock Test'], color: 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-700', completed: true },
            { day: 'Tue', date: '16', subjects: ['Logical Reasoning (2h)', 'GK Current Affairs (1h)', 'Previous Papers'], color: 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-700', completed: true },
            { day: 'Wed', date: '17', subjects: ['Quantitative (1.5h)', 'Legal Reasoning (1.5h)', 'Doubt Resolution'], color: 'bg-purple-50 border-purple-200 dark:bg-purple-900/20 dark:border-purple-700', completed: true },
            { day: 'Thu', date: '18', subjects: ['English Comprehension (2h)', 'Mock Test Review (1h)'], color: 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-700', completed: false, current: true },
            { day: 'Fri', date: '19', subjects: ['Full Mock Test (2h)', 'Error Analysis (1h)', 'Weak Topics'], color: 'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-700', completed: false },
            { day: 'Sat', date: '20', subjects: ['Legal Reasoning Revision (2h)', 'Vocabulary Building (1h)'], color: 'bg-indigo-50 border-indigo-200 dark:bg-indigo-900/20 dark:border-indigo-700', completed: false },
            { day: 'Sun', date: '21', subjects: ['Rest Day', 'Light Reading', 'Weekly Review'], color: 'bg-gray-50 border-gray-200 dark:bg-gray-900/20 dark:border-gray-700', completed: false }
          ].map((day, index) => (
            <div key={index} className={`${day.color} rounded-2xl p-4 border-2 ${day.current ? 'ring-2 ring-blue-400 shadow-lg' : ''} transition-all hover:shadow-md`}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">{day.day}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{day.date} Jan</p>
                </div>
                {day.completed && <CheckCircle className="h-6 w-6 text-green-500" />}
                {day.current && <div className="h-3 w-3 bg-blue-500 rounded-full animate-pulse"></div>}
              </div>
              <div className="space-y-2">
                {day.subjects.map((subject, idx) => (
                  <div key={idx} className={`text-xs px-2 py-1 rounded-lg ${
                    day.completed 
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
                      : day.current 
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' 
                        : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}>
                    {subject}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Study Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Prediction */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <Brain className="h-6 w-6 text-purple-500" />
            AI Performance Prediction
          </h3>
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Following this AI schedule</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">Expected Score: 165-175</p>
              <p className="text-sm text-gray-500 dark:text-gray-500">Confidence: 89% • Target Met: 94%</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">+18</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Score Improvement</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">Top 5%</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Predicted Percentile</p>
              </div>
            </div>
          </div>
        </div>

        {/* Adaptive Recommendations */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
            <Target className="h-6 w-6 text-blue-500" />
            Smart Recommendations
          </h3>
          <div className="space-y-3">
            {[
              { icon: '🎯', title: 'Focus on General Knowledge', desc: 'Increase GK time by 30 min daily', priority: 'high' },
              { icon: '⚡', title: 'Speed Improvement', desc: 'Practice timed sections for Legal Reasoning', priority: 'medium' },
              { icon: '🔄', title: 'Revision Cycle', desc: 'Revise Contract Law concepts this weekend', priority: 'medium' },
              { icon: '📊', title: 'Mock Test Strategy', desc: 'Take 2 sectional tests before full mock', priority: 'low' }
            ].map((rec, index) => (
              <div key={index} className={`p-3 rounded-xl border-l-4 ${
                rec.priority === 'high' 
                  ? 'bg-red-50 dark:bg-red-900/20 border-red-400' 
                  : rec.priority === 'medium' 
                    ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-400' 
                    : 'bg-green-50 dark:bg-green-900/20 border-green-400'
              }`}>
                <div className="flex items-start gap-3">
                  <span className="text-lg">{rec.icon}</span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white text-sm">{rec.title}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">{rec.desc}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    rec.priority === 'high' 
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
                      : rec.priority === 'medium' 
                        ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400' 
                        : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                  }`}>
                    {rec.priority.toUpperCase()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Study Analytics */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <BarChart3 className="h-6 w-6 text-green-500" />
          Study Progress Analytics
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Hours Distribution */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 dark:text-white">Weekly Hours Distribution</h4>
            <div className="space-y-3">
              {[
                { subject: 'Legal Reasoning', hours: 12, target: 14, color: 'bg-blue-500' },
                { subject: 'Logical Reasoning', hours: 8, target: 10, color: 'bg-green-500' },
                { subject: 'English Language', hours: 7, target: 8, color: 'bg-purple-500' },
                { subject: 'General Knowledge', hours: 6, target: 10, color: 'bg-yellow-500' },
                { subject: 'Quantitative', hours: 4, target: 6, color: 'bg-red-500' }
              ].map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-700 dark:text-gray-300">{item.subject}</span>
                    <span className="text-gray-500 dark:text-gray-400">{item.hours}h / {item.target}h</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className={`${item.color} h-2 rounded-full transition-all duration-300`} 
                         style={{width: `${(item.hours / item.target) * 100}%`}}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Completion Rate */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 dark:text-white">Task Completion Rate</h4>
            <div className="text-center">
              <div className="relative inline-flex items-center justify-center w-32 h-32">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-200 dark:text-gray-700"/>
                  <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={351.86} strokeDashoffset={70.37} className="text-green-500"/>
                </svg>
                <span className="absolute text-2xl font-bold text-gray-900 dark:text-white">82%</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Tasks completed this week</p>
            </div>
          </div>

          {/* Streak & Consistency */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 dark:text-white">Study Consistency</h4>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({length: 28}, (_, i) => {
                const completed = Math.random() > 0.2;
                const today = i === 17;
                return (
                  <div key={i} className={`w-8 h-8 rounded-md flex items-center justify-center text-xs font-medium ${
                    today 
                      ? 'bg-blue-500 text-white ring-2 ring-blue-300' 
                      : completed 
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                  }`}>
                    {i + 1}
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>4 weeks ago</span>
              <span>Today</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
          <Zap className="h-6 w-6 text-yellow-500" />
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700">
            <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="font-medium text-gray-900 dark:text-white">Reschedule</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Adjust today's plan</p>
          </button>
          <button className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700">
            <Target className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="font-medium text-gray-900 dark:text-white">Set Goals</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Update targets</p>
          </button>
          <button className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700">
            <Brain className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <p className="font-medium text-gray-900 dark:text-white">AI Analysis</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Get insights</p>
          </button>
          <button className="bg-white dark:bg-gray-800 rounded-2xl p-4 text-center hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700">
            <Download className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <p className="font-medium text-gray-900 dark:text-white">Export Plan</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Download schedule</p>
          </button>
        </div>
      </div>
    </div>
  );

  const renderTestGenerator = () => (
    <div className="space-y-6">
      {/* Test Generator Header */}
      <div className="text-center bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8">
        <Sparkles className="h-16 w-16 text-indigo-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">🧠 AI Mock Test Generator</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Generate personalized CLAT mock tests powered by AI, adapted to your performance and weak areas.
        </p>
        
        {/* AI Generator Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700">
            <Brain className="h-8 w-8 text-indigo-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white">47</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Tests Generated</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700">
            <Target className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white">96%</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Accuracy Rate</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700">
            <TrendingUp className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white">+15</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Avg Score Boost</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-200 dark:border-gray-700">
            <Clock className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white">12s</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Generation Time</p>
          </div>
        </div>
      </div>

      {/* Test Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Test Customization Panel */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-200 dark:border-gray-700">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <Settings className="h-6 w-6 text-indigo-500" />
            Test Customization
          </h3>

          {/* Test Type Selection */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">Test Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-4 border-2 border-indigo-200 dark:border-indigo-700 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 font-medium transition-all hover:border-indigo-300 dark:hover:border-indigo-600">
                  🎯 Full Test (120Q)
                </button>
                <button className="p-4 border-2 border-gray-200 dark:border-gray-600 rounded-2xl bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-medium transition-all hover:border-gray-300 dark:hover:border-gray-500">
                  ⚡ Sectional Test
                </button>
              </div>
            </div>

            {/* Difficulty Level */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">AI Difficulty Adaptation</label>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-700">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-medium text-gray-900 dark:text-white">Adaptive (Recommended)</span>
                  </div>
                  <span className="text-green-600 dark:text-green-400 text-sm">Based on your performance</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Fixed Difficulty</span>
                  </div>
                  <select className="text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Focus Areas */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">Focus on Weak Areas</label>
              <div className="space-y-2">
                {[
                  { subject: 'Legal Reasoning', score: 73, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20', checked: true },
                  { subject: 'General Knowledge', score: 68, color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-900/20', checked: true },
                  { subject: 'Quantitative', score: 82, color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-50 dark:bg-yellow-900/20', checked: false },
                  { subject: 'Logical Reasoning', score: 86, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20', checked: false },
                  { subject: 'English Language', score: 91, color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20', checked: false }
                ].map((item, index) => (
                  <label key={index} className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all hover:shadow-sm ${item.bg} border ${item.checked ? 'border-current' : 'border-transparent'}`}>
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        defaultChecked={item.checked}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <span className="font-medium text-gray-900 dark:text-white">{item.subject}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-semibold ${item.color}`}>
                        {item.score}%
                      </span>
                      {item.score < 80 && <AlertTriangle className="h-4 w-4 text-red-500" />}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Question Distribution */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">Question Distribution</label>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 space-y-3">
                {[
                  { subject: 'English Language', questions: 28, percentage: 23 },
                  { subject: 'General Knowledge', questions: 35, percentage: 29 },
                  { subject: 'Legal Reasoning', questions: 32, percentage: 27 },
                  { subject: 'Logical Reasoning', questions: 20, percentage: 17 },
                  { subject: 'Quantitative Techniques', questions: 5, percentage: 4 }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-gray-700 dark:text-gray-300">{item.subject}</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900 dark:text-white">{item.questions}Q</span>
                      <span className="text-gray-500 dark:text-gray-400">({item.percentage}%)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AI Insights & Preview */}
        <div className="space-y-6">
          {/* AI Analysis */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
              <Brain className="h-6 w-6 text-purple-500" />
              AI Performance Analysis
            </h3>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-2xl p-4">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Based on your last 12 tests</p>
                <p className="text-lg font-bold text-purple-600 dark:text-purple-400">Predicted Score: 142-158</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">Confidence: 92% • Improvement Potential: High</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-3 text-center">
                  <p className="text-sm text-red-600 dark:text-red-400 font-medium">Weakness</p>
                  <p className="font-bold text-gray-900 dark:text-white">Contract Law</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">64% accuracy</p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 text-center">
                  <p className="text-sm text-green-600 dark:text-green-400 font-medium">Strength</p>
                  <p className="font-bold text-gray-900 dark:text-white">Reading Comp</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">89% accuracy</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white">AI Recommendations</h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Focus 40% questions on Legal Reasoning weak topics</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Include mixed difficulty in GK to build confidence</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Add time pressure simulation for speed improvement</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Generated Test Preview */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-3">
              <Eye className="h-6 w-6 text-blue-500" />
              Test Preview
            </h3>
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Scale className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <span className="font-semibold text-gray-900 dark:text-white">Sample Question - Legal Reasoning</span>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                  <strong>Passage:</strong> Under the Indian Contract Act, 1872, a contract is said to be voidable when...
                </p>
                <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Which of the following best describes a voidable contract?
                </p>
                <div className="space-y-1">
                  {['A) A contract that is legally binding on both parties', 'B) A contract that can be legally avoided by one party', 'C) A contract that is automatically void', 'D) A contract that requires court approval'].map((option, index) => (
                    <div key={index} className="text-xs text-gray-600 dark:text-gray-400">{option}</div>
                  ))}
                </div>
                <div className="mt-2 text-xs text-indigo-600 dark:text-indigo-400">
                  ⚡ Difficulty: Medium • Topic: Contract Law • Time: 90 seconds
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Generation Actions */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Ready to Generate Your AI Test?</h3>
          <p className="text-gray-600 dark:text-gray-300">AI will create a personalized 120-question CLAT mock test optimized for your improvement</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-3">
            <Sparkles className="h-6 w-6" />
            Generate AI Test
            <span className="bg-white/20 px-2 py-1 rounded-lg text-sm">12s</span>
          </button>
          <button className="px-6 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-2xl font-semibold hover:border-gray-400 dark:hover:border-gray-500 transition-all flex items-center gap-3">
            <Clock className="h-5 w-5" />
            Schedule for Later
          </button>
          <button className="px-6 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-2xl font-semibold hover:border-gray-400 dark:hover:border-gray-500 transition-all flex items-center gap-3">
            <Download className="h-5 w-5" />
            Save Configuration
          </button>
        </div>
      </div>

      {/* Recent Generated Tests */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
          <Trophy className="h-6 w-6 text-yellow-500" />
          Recent AI-Generated Tests
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { name: 'AI Test #23', date: '2 hours ago', score: 156, percentile: 94.2, difficulty: 'Adaptive', status: 'completed', color: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700' },
            { name: 'AI Test #22', date: 'Yesterday', score: 148, percentile: 89.6, difficulty: 'Medium+', status: 'completed', color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700' },
            { name: 'AI Test #21', date: '2 days ago', score: null, percentile: null, difficulty: 'Adaptive', status: 'pending', color: 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-700' }
          ].map((test, index) => (
            <div key={index} className={`${test.color} rounded-2xl p-4 border transition-all hover:shadow-md cursor-pointer`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900 dark:text-white">{test.name}</h4>
                <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                  test.status === 'completed' 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' 
                    : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400'
                }`}>
                  {test.status.toUpperCase()}
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Generated:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{test.date}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Difficulty:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{test.difficulty}</span>
                </div>
                {test.score && (
                  <>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Score:</span>
                      <span className="font-bold text-green-600 dark:text-green-400">{test.score}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Percentile:</span>
                      <span className="font-bold text-blue-600 dark:text-blue-400">{test.percentile}%</span>
                    </div>
                  </>
                )}
              </div>
              <div className="mt-3 flex gap-2">
                {test.status === 'completed' ? (
                  <>
                    <button className="flex-1 text-xs bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                      View Results
                    </button>
                    <button className="flex-1 text-xs bg-indigo-100 dark:bg-indigo-900/30 border border-indigo-300 dark:border-indigo-600 text-indigo-600 dark:text-indigo-400 py-2 rounded-lg font-medium hover:bg-indigo-200 dark:hover:bg-indigo-900/40 transition-colors">
                      Retake Similar
                    </button>
                  </>
                ) : (
                  <button className="w-full text-xs bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-600 text-blue-600 dark:text-blue-400 py-2 rounded-lg font-medium hover:bg-blue-200 dark:hover:bg-blue-900/40 transition-colors">
                    Take Test
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      {/* Settings Header */}
      <div className="text-center bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8">
        <Settings className="h-16 w-16 text-gray-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">⚙️ Settings</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Customize your LEGALIGHT experience to match your preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Bell className="h-6 w-6 text-blue-500" />
            Notifications
          </h3>
          <div className="space-y-4">
            {[
              { key: 'mockTestReminders', label: 'Mock Test Reminders', desc: 'Get notified about upcoming tests' },
              { key: 'studyGoalReminders', label: 'Study Goal Reminders', desc: 'Daily study time notifications' },
              { key: 'weeklyReports', label: 'Weekly Progress Reports', desc: 'Summary of your weekly performance' },
              { key: 'rankUpdates', label: 'Rank Updates', desc: 'When your rank changes significantly' },
              { key: 'achievementAlerts', label: 'Achievement Alerts', desc: 'Celebrate your milestones' }
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
                <button 
                  className={`w-12 h-6 rounded-full relative transition-colors ${
                    settingsData.notifications[item.key] ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                  onClick={() => setSettingsData(prev => ({
                    ...prev,
                    notifications: {
                      ...prev.notifications,
                      [item.key]: !prev.notifications[item.key]
                    }
                  }))}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                    settingsData.notifications[item.key] ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Eye className="h-6 w-6 text-green-500" />
            Privacy & Sharing
          </h3>
          <div className="space-y-4">
            {[
              { key: 'showInLeaderboard', label: 'Show in Leaderboard', desc: 'Display your rank publicly' },
              { key: 'shareProgressWithParents', label: 'Share with Parents', desc: 'Allow parent access to progress' },
              { key: 'allowStudyGroupInvites', label: 'Study Group Invites', desc: 'Receive group invitations' },
              { key: 'anonymousMode', label: 'Anonymous Mode', desc: 'Hide your identity in discussions' }
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
                <button 
                  className={`w-12 h-6 rounded-full relative transition-colors ${
                    settingsData.privacy[item.key] ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                  onClick={() => setSettingsData(prev => ({
                    ...prev,
                    privacy: {
                      ...prev.privacy,
                      [item.key]: !prev.privacy[item.key]
                    }
                  }))}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                    settingsData.privacy[item.key] ? 'translate-x-6' : 'translate-x-0.5'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Study Preferences */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-purple-500" />
            Study Preferences
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Default Test Duration</label>
              <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white">
                <option value="120">2 hours (Standard CLAT)</option>
                <option value="90">1.5 hours (Practice)</option>
                <option value="60">1 hour (Quick Test)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Practice Mode</label>
              <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white">
                <option value="timed">Timed (Exam-like)</option>
                <option value="untimed">Untimed (Learning)</option>
                <option value="adaptive">Adaptive (AI-adjusted)</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Auto-submit Incomplete Tests</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Submit automatically when time runs out</p>
              </div>
              <button 
                className={`w-12 h-6 rounded-full relative transition-colors ${
                  settingsData.study.autoSubmitIncomplete ? 'bg-purple-500' : 'bg-gray-300'
                }`}
                onClick={() => setSettingsData(prev => ({
                  ...prev,
                  study: {
                    ...prev.study,
                    autoSubmitIncomplete: !prev.study.autoSubmitIncomplete
                  }
                }))}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${
                  settingsData.study.autoSubmitIncomplete ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Appearance Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-yellow-500" />
            Appearance
          </h3>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Theme</label>
              <div className="grid grid-cols-2 gap-2">
                {['light', 'dark'].map(theme => (
                  <button
                    key={theme}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      settingsData.appearance.theme === theme
                        ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => setSettingsData(prev => ({
                      ...prev,
                      appearance: { ...prev.appearance, theme }
                    }))}
                  >
                    <div className="text-center">
                      <div className={`w-8 h-8 mx-auto mb-2 rounded ${
                        theme === 'light' ? 'bg-white border border-gray-300' : 'bg-gray-800'
                      }`} />
                      <p className="text-sm font-medium capitalize">{theme}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language</label>
              <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:text-white">
                <option value="english">English</option>
                <option value="hindi">Hindi</option>
                <option value="both">Both (Bilingual)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date Format</label>
              <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-yellow-500 dark:bg-gray-700 dark:text-white">
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Account Management */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <User className="h-6 w-6 text-red-500" />
          Account Management
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center">
            <Download className="h-6 w-6 mx-auto mb-2 text-blue-500" />
            <p className="font-medium text-gray-900 dark:text-white">Export Data</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Download your progress data</p>
          </button>
          
          <button className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center">
            <Upload className="h-6 w-6 mx-auto mb-2 text-green-500" />
            <p className="font-medium text-gray-900 dark:text-white">Import Data</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">Import from other platforms</p>
          </button>
          
          <button className="p-4 border border-red-200 rounded-xl hover:bg-red-50 transition-colors text-center">
            <AlertTriangle className="h-6 w-6 mx-auto mb-2 text-red-500" />
            <p className="font-medium text-red-600">Delete Account</p>
            <p className="text-sm text-red-500">Permanently delete all data</p>
          </button>
        </div>
      </div>
    </div>
  );

  const renderAIExplainer = () => (
    <div className="space-y-6">
      <div className="text-center bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8">
        <Brain className="h-16 w-16 text-purple-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">🤖 AI Text Explainer</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Get instant AI-powered explanations for complex legal texts with 94% accuracy.
        </p>
        
        {/* Input Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-6">
          <label className="block text-left text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Enter Legal Text to Explain:
          </label>
          <textarea 
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-xl resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Example: Article 14, natural justice, tort, consideration, or any legal concept..."
          />
          <button 
            onClick={handleAIExplanation}
            disabled={!inputText.trim() || isExplaining}
            className="mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isExplaining ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                <span className="animate-pulse">AI is thinking...</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                <span>Get AI Explanation</span>
              </div>
            )}
          </button>
        </div>

        {/* ✨ Loading state for AI explanation */}
        {isExplaining && (
          <AIModuleLoader title="Generating AI Explanation" icon={Brain} />
        )}
        
        {/* Enhanced Explanation Output */}
        {explanation && !isExplaining && (
          <div className="space-y-6">
            {/* Main Explanation Card */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-3xl p-6 shadow-lg text-left">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-8 w-8 text-green-600" />
                  <div>
                    <h3 className="text-xl font-bold text-green-800 dark:text-green-300">AI Explanation</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{explanation.subject}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    explanation.difficulty === 'Easy' 
                      ? 'bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200'
                      : explanation.difficulty === 'Medium'
                        ? 'bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200'
                        : 'bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200'
                  }`}>
                    {explanation.difficulty}
                  </span>
                  <span className="px-3 py-1 bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                    96% Accurate
                  </span>
                </div>
              </div>
              
              {/* Summary */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-500" />
                  Summary
                </h4>
                <p className="text-gray-700 dark:text-gray-300 text-lg font-medium bg-white dark:bg-gray-800 p-4 rounded-xl">
                  {explanation.summary}
                </p>
              </div>

              {/* Detailed Explanation */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-purple-500" />
                  Detailed Explanation
                </h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {explanation.detailed}
                </p>
              </div>

              {/* Key Points */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Award className="h-5 w-5 text-orange-500" />
                  Key Points
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {explanation.keyPoints.map((point: string, index: number) => (
                    <div key={index} className="flex items-start gap-2 bg-white dark:bg-gray-800 p-3 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Important Cases */}
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Scale className="h-5 w-5 text-red-500" />
                  Important Cases
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {explanation.cases.map((caseItem: string, index: number) => (
                    <div key={index} className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{caseItem}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Importance & Metadata */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-600">
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>{explanation.importance}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>Generated in 1.5s</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>AI Verified</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    Save
                  </button>
                  <button className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-sm hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                    Share
                  </button>
                  <button className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg text-sm hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors">
                    Ask Follow-up
                  </button>
                </div>
              </div>
            </div>

            {/* Related Topics Suggestions */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-500" />
                Related Topics to Explore
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['Article 21', 'Due Process', 'Administrative Law', 'Constitutional Remedies'].map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => setInputText(topic)}
                    className="p-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-sm font-medium text-left"
                  >
                    <div className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      {topic}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Quick Examples */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            Quick Examples to Try
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { term: 'Article 14', category: 'Constitutional', color: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' },
              { term: 'natural justice', category: 'Administrative', color: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400' },
              { term: 'tort', category: 'Civil Law', color: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' },
              { term: 'consideration', category: 'Contract', color: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400' },
              { term: 'fundamental rights', category: 'Constitutional', color: 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' },
              { term: 'contract', category: 'Commercial', color: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' }
            ].map((example, index) => (
              <button
                key={index}
                onClick={() => setInputText(example.term)}
                className={`p-3 ${example.color} border border-current/20 rounded-xl hover:shadow-md transition-all text-sm font-medium text-center group`}
              >
                <div className="font-semibold">{example.term}</div>
                <div className="text-xs opacity-75 mt-1">{example.category}</div>
                <Play className="h-3 w-3 mx-auto mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            ))}
          </div>
          
          {/* Usage Stats */}
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-600">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">1,247</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Explanations Given</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">96%</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Accuracy Rate</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">1.5s</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg Response Time</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">4.8⭐</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">User Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderProgress = () => (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8">
        <BarChart3 className="h-16 w-16 text-blue-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">📊 Progress Analytics</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Comprehensive insights into your CLAT preparation journey with AI-powered recommendations.
        </p>
        
        {/* Key Progress Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="h-6 w-6 text-green-500" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Overall Growth</span>
            </div>
            <p className="text-2xl font-bold text-green-600">+23%</p>
            <p className="text-xs text-gray-500">This month</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <Target className="h-6 w-6 text-blue-500" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Target Progress</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">76%</p>
            <p className="text-xs text-gray-500">To goal score</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <Award className="h-6 w-6 text-purple-500" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Rank Improvement</span>
            </div>
            <p className="text-2xl font-bold text-purple-600">↑236</p>
            <p className="text-xs text-gray-500">Positions up</p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="h-6 w-6 text-orange-500" />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Efficiency</span>
            </div>
            <p className="text-2xl font-bold text-orange-600">94%</p>
            <p className="text-xs text-gray-500">Study efficiency</p>
          </div>
        </div>
      </div>

      {/* Weekly Progress Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Activity className="h-6 w-6 text-blue-500" />
          Weekly Performance Trend
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={weeklyStudyData}>
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey="score" 
              stroke="#8B5CF6" 
              strokeWidth={3}
              fill="url(#colorScore)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Subject-wise Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-green-500" />
            Subject Mastery Progress
          </h3>
          <div className="space-y-4">
            {topicMastery.map((topic, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700 dark:text-gray-300 font-medium">{topic.topic}</span>
                  <div className="text-right">
                    <span className="text-sm font-bold text-gray-900 dark:text-white">{topic.mastery}%</span>
                    <span className="text-xs text-gray-500 ml-2">({topic.correct}/{topic.questions})</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-green-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${topic.mastery}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between mt-1 text-xs">
                  <span className={`${
                    topic.mastery >= 90 ? 'text-green-600' : 
                    topic.mastery >= 80 ? 'text-yellow-600' : 
                    'text-red-600'
                  }`}>
                    {topic.mastery >= 90 ? 'Mastered ✅' : 
                     topic.mastery >= 80 ? 'Good Progress 📈' : 
                     'Needs Focus 🎯'}
                  </span>
                  <span className="text-gray-500">Target: 90%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <Clock className="h-6 w-6 text-purple-500" />
            Time Distribution
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={timeSpentData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="percentage"
                label={({name, percentage}) => `${name}: ${percentage}%`}
              >
                {timeSpentData.map((entry, index) => {
                  const colors = ['#8B5CF6', '#06B6D4', '#10B981', '#F59E0B', '#EF4444'];
                  return <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />;
                })}
              </Pie>
              <Tooltip formatter={(value) => `${value}%`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Insights */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="h-8 w-8 text-yellow-500" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">🤖 AI Insights & Recommendations</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <h4 className="font-semibold text-green-700 dark:text-green-400">Strong Areas</h4>
            </div>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• English Language: Excellent vocabulary and comprehension (92%)</li>
              <li>• Contract Law: Strong conceptual understanding (92% mastery)</li>
              <li>• Study Consistency: 24-day streak shows great discipline</li>
              <li>• Time Management: Efficient 5.2h daily study routine</li>
            </ul>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Target className="h-5 w-5 text-orange-500" />
              <h4 className="font-semibold text-orange-700 dark:text-orange-400">Focus Areas</h4>
            </div>
            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
              <li>• General Knowledge: Increase daily news reading (+2 points needed)</li>
              <li>• Property Law: Practice more case studies (75% → 85% target)</li>
              <li>• Speed: Reduce time per question by 10 seconds</li>
              <li>• Mock Tests: Take 1 additional test per week for rank #250</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 space-y-4">
          {/* AI Rank Prediction */}
          <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-blue-800 dark:text-blue-300">AI Rank Prediction</span>
            </div>
            <p className="text-blue-700 dark:text-blue-400 text-sm">
              Based on your current trajectory, you're on track to achieve rank <strong>#{predictedRank}</strong> with 94% confidence. 
              To reach your target of top 250, focus on General Knowledge (+15% needed) and increase mock test frequency to 3 per week.
            </p>
          </div>

          {/* Advanced Predictive Analytics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-2xl">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-green-800 dark:text-green-300">Performance Trajectory</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Month 1</p>
                  <p className="font-bold text-green-700 dark:text-green-400">146-152</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Month 2</p>
                  <p className="font-bold text-green-700 dark:text-green-400">152-164</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">Month 3</p>
                  <p className="font-bold text-green-700 dark:text-green-400">158-170</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-purple-100 dark:bg-purple-900/20 rounded-2xl">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-5 w-5 text-purple-600" />
                <span className="font-semibold text-purple-800 dark:text-purple-300">Improvement Potential</span>
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">General Knowledge</span>
                  <span className="font-bold text-purple-700 dark:text-purple-400">+22 pts</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Speed Optimization</span>
                  <span className="font-bold text-purple-700 dark:text-purple-400">+8 pts</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">Test Strategy</span>
                  <span className="font-bold text-purple-700 dark:text-purple-400">+6 pts</span>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Analysis */}
          <div className="p-4 bg-yellow-100 dark:bg-yellow-900/20 rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <span className="font-semibold text-yellow-800 dark:text-yellow-300">Performance Risk Analysis</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
              <div className="text-center">
                <p className="text-red-600 dark:text-red-400 font-medium">High Risk</p>
                <p className="text-gray-700 dark:text-gray-300">GK Stagnation</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">No improvement in 2 weeks</p>
              </div>
              <div className="text-center">
                <p className="text-yellow-600 dark:text-yellow-400 font-medium">Medium Risk</p>
                <p className="text-gray-700 dark:text-gray-300">Test Anxiety</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">8% pressure performance drop</p>
              </div>
              <div className="text-center">
                <p className="text-green-600 dark:text-green-400 font-medium">Low Risk</p>
                <p className="text-gray-700 dark:text-gray-300">Consistency</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Strong study habits</p>
              </div>
            </div>
          </div>

          {/* Success Probability Matrix */}
          <div className="p-4 bg-indigo-100 dark:bg-indigo-900/20 rounded-2xl">
            <div className="flex items-center gap-2 mb-3">
              <Star className="h-5 w-5 text-indigo-600" />
              <span className="font-semibold text-indigo-800 dark:text-indigo-300">Success Probability Matrix</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center text-sm">
              <div>
                <p className="text-gray-600 dark:text-gray-400">Top 500</p>
                <p className="font-bold text-green-600">94%</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Top 250</p>
                <p className="font-bold text-yellow-600">78%</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Top 100</p>
                <p className="font-bold text-orange-600">45%</p>
              </div>
              <div>
                <p className="text-gray-600 dark:text-gray-400">Top 50</p>
                <p className="font-bold text-red-600">18%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Show Mock Test if activated
  if (showMockTest) {
    return (
      <RevolutionaryMockTest
        testData={sampleMockTest}
        onTestComplete={handleMockTestComplete}
        onBack={() => setShowMockTest(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  SOLO
                </span>
                <span className="text-gray-600 dark:text-gray-300 text-lg ml-2 font-serif italic">by Legalight</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900 dark:text-white">Welcome, {user?.name || 'Student'}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{currentTime.toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-3">
                <NotificationBell className="revolutionary-notification-bell" />
                <button className="p-2 rounded-2xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <Settings className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </button>
                <button 
                  onClick={onLogout}
                  className="p-2 rounded-2xl bg-red-100 hover:bg-red-200 transition-colors"
                >
                  <LogOut className="h-5 w-5 text-red-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ✨ Navigation Tabs with mobile optimization */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 backdrop-blur-sm bg-white/90 dark:bg-gray-800/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex overflow-x-auto scrollbar-hide space-x-2 sm:space-x-4 md:space-x-8 py-2">
            {[
              { id: 'dashboard', label: '🏠 Dashboard', icon: BarChart3 },
              { id: 'mock-tests', label: '🏆 Mock Tests', icon: Trophy },
              { id: 'ai-explainer', label: '🤖 AI Explainer', icon: Brain },
              { id: 'doubts', label: '💬 Doubts', icon: MessageSquare },
              { id: 'progress', label: '📊 Progress', icon: TrendingUp },
              { id: 'profile', label: '👤 Profile', icon: Users },
              { id: 'materials', label: '📚 Materials', icon: BookOpen },
              { id: 'recommendations', label: '🎯 AI Recommendations', icon: Target },
              { id: 'study-planner', label: '📅 AI Study Planner', icon: Calendar },
              { id: 'test-generator', label: '🧠 AI Test Generator', icon: Sparkles },
              { id: 'leaderboard', label: '🏅 Leaderboard', icon: Medal },
              { id: 'settings', label: '⚙️ Settings', icon: Settings }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 md:px-4 py-3 sm:py-4 border-b-2 font-medium text-xs sm:text-sm transition-all duration-300 ease-in-out transform hover:scale-105 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 rounded-t-lg'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-t-lg'
                  }`}
                >
                  <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden text-xs">{tab.label.split(' ')[1] || tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* 🔄 Real-time Stats Bar */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <SeamlessTransition variant="fade" duration={500}>
            <LiveStatsDisplay />
          </SeamlessTransition>
        </div>
      </div>

      {/* ✨ Main Content with smooth transitions */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {dashboardLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : (
          <SeamlessTransition variant="fade" duration={500}>
            <div className="space-y-6">
              {activeTab === 'dashboard' && (
                <ScrollAnimation animationType="fadeInUp">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-3">{renderDashboard()}</div>
                    <div className="space-y-4">
                      <RealTimeProgressTracker />
                    </div>
                  </div>
                </ScrollAnimation>
              )}
              {activeTab === 'mock-tests' && <ScrollAnimation animationType="slideInUp">{renderMockTests()}</ScrollAnimation>}
              {activeTab === 'ai-explainer' && <ScrollAnimation animationType="scaleIn">{renderAIExplainer()}</ScrollAnimation>}
              {activeTab === 'doubts' && <ScrollAnimation animationType="fadeInLeft">{renderDoubts()}</ScrollAnimation>}
              {activeTab === 'progress' && <ScrollAnimation animationType="fadeInRight">{renderProgress()}</ScrollAnimation>}
              {activeTab === 'profile' && <ScrollAnimation animationType="fadeInUp">{renderProfile()}</ScrollAnimation>}
              {activeTab === 'materials' && <ScrollAnimation animationType="slideInUp">{renderStudyMaterials()}</ScrollAnimation>}
              {activeTab === 'recommendations' && <ScrollAnimation animationType="scaleIn">{renderRecommendations()}</ScrollAnimation>}
              {activeTab === 'study-planner' && <ScrollAnimation animationType="fadeInUp">{renderStudyPlanner()}</ScrollAnimation>}
              {activeTab === 'test-generator' && <ScrollAnimation animationType="slideInUp">{renderTestGenerator()}</ScrollAnimation>}
              {activeTab === 'leaderboard' && <ScrollAnimation animationType="fadeInUp">{renderLeaderboard()}</ScrollAnimation>}
              {activeTab === 'settings' && <ScrollAnimation animationType="scaleIn">{renderSettings()}</ScrollAnimation>}
            </div>
          </SeamlessTransition>
        )}
      </main>
    </div>
  );
};

// 🚀 Main Dashboard Component with Real-time & Notification Providers
const RevolutionaryStudentDashboard: React.FC<RevolutionaryStudentDashboardProps> = ({ user, onLogout }) => {
  return (
    <RealTimeProvider user={user}>
      <NotificationProvider user={user}>
        <EnhancedDashboardContent user={user} onLogout={onLogout} />
      </NotificationProvider>
    </RealTimeProvider>
  );
};

export default RevolutionaryStudentDashboard;
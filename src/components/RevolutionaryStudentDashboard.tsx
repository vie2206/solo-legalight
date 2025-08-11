import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import {
  Brain, Target, BarChart3, Award, Clock, TrendingUp, 
  Zap, Users, BookOpen, AlertTriangle, CheckCircle,
  Star, Trophy, Flame, Play, Timer, Calendar, MessageSquare,
  ArrowUp, ArrowDown, Activity, Bell, Settings, LogOut,
  Sparkles, Crown, Medal, Coffee, Book, Scale
} from 'lucide-react';
import RevolutionaryMockTest, { sampleMockTest } from './RevolutionaryMockTest';

interface RevolutionaryStudentDashboardProps {
  user: any;
  onLogout: () => void;
}

const RevolutionaryStudentDashboard: React.FC<RevolutionaryStudentDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
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
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 to-pink-600 p-6 text-white">
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
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 to-red-500 p-6 text-white">
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
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-500 p-6 text-white">
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
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-500 to-emerald-500 p-6 text-white">
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
  const [explanation, setExplanation] = useState('');
  const [isExplaining, setIsExplaining] = useState(false);
  const [selectedText, setSelectedText] = useState('');

  // AI Text Explainer function
  const handleAIExplanation = async () => {
    if (!inputText.trim()) return;
    
    setIsExplaining(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock AI explanation response
    const mockExplanations = {
      'Article 14': 'Article 14 of the Indian Constitution guarantees the Right to Equality before law. It states that "The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India." This fundamental right ensures that all citizens are treated equally regardless of their religion, race, caste, sex, or place of birth.',
      'natural justice': 'Natural justice refers to the fundamental principles of fair procedure in legal proceedings. It includes two key principles: (1) Audi alteram partem - hear the other side, meaning no one should be condemned unheard, and (2) Nemo judex in causa sua - no one should be a judge in their own cause, ensuring impartiality in decision-making.',
      'tort': 'Tort is a civil wrong that causes harm or injury to another person, for which the injured party can seek legal remedy through compensation. Unlike criminal law, tort law deals with private disputes between individuals. Common examples include negligence, defamation, and trespass.',
      'consideration': 'In contract law, consideration refers to something of value exchanged between parties to make a contract legally binding. It can be money, goods, services, or a promise to do or not do something. Without valid consideration, a contract is generally not enforceable in law.'
    };
    
    // Find matching explanation or provide general response
    let aiResponse = '';
    const lowerText = inputText.toLowerCase();
    
    for (const [term, explanation] of Object.entries(mockExplanations)) {
      if (lowerText.includes(term.toLowerCase())) {
        aiResponse = explanation;
        break;
      }
    }
    
    if (!aiResponse) {
      aiResponse = `Based on the text "${inputText}", this appears to be a legal concept that requires careful analysis. The AI suggests breaking this down into key components: definitions, legal precedents, and practical applications. For more detailed explanations of specific legal terms, try entering individual concepts like "Article 14", "natural justice", "tort", or "consideration".`;
    }
    
    setExplanation(aiResponse);
    setIsExplaining(false);
  };

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
                AI is thinking...
              </div>
            ) : (
              <>🧠 Get AI Explanation</>
            )}
          </button>
        </div>

        {/* Explanation Output */}
        {explanation && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 shadow-lg text-left">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-green-600" />
              <h3 className="text-lg font-bold text-green-800 dark:text-green-300">AI Explanation</h3>
              <span className="px-3 py-1 bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                94% Accuracy
              </span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {explanation}
            </p>
            <div className="mt-4 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span>Verified by AI</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Generated in 2.1s</span>
              </div>
            </div>
          </div>
        )}

        {/* Quick Examples */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {['Article 14', 'natural justice', 'tort', 'consideration'].map((term, index) => (
            <button
              key={index}
              onClick={() => setInputText(term)}
              className="p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm font-medium"
            >
              Try: {term}
            </button>
          ))}
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
        
        <div className="mt-6 p-4 bg-blue-100 dark:bg-blue-900/20 rounded-2xl">
          <div className="flex items-center gap-2 mb-2">
            <Crown className="h-5 w-5 text-blue-600" />
            <span className="font-semibold text-blue-800 dark:text-blue-300">AI Rank Prediction</span>
          </div>
          <p className="text-blue-700 dark:text-blue-400 text-sm">
            Based on your current trajectory, you're on track to achieve rank <strong>#{predictedRank}</strong> with 94% confidence. 
            To reach your target of top 250, focus on General Knowledge (+15% needed) and increase mock test frequency to 3 per week.
          </p>
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
                <button className="p-2 rounded-2xl bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                </button>
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

      {/* Navigation Tabs */}
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', label: '🏠 Dashboard', icon: BarChart3 },
              { id: 'mock-tests', label: '🏆 Mock Tests', icon: Trophy },
              { id: 'ai-explainer', label: '🤖 AI Explainer', icon: Brain },
              { id: 'doubts', label: '💬 Doubts', icon: MessageSquare },
              { id: 'progress', label: '📊 Progress', icon: TrendingUp },
              { id: 'profile', label: '👤 Profile', icon: Settings }
            ].map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <IconComponent className="h-5 w-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'mock-tests' && renderMockTests()}
        {activeTab === 'ai-explainer' && renderAIExplainer()}
        {activeTab === 'doubts' && (
          <div className="text-center py-12">
            <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Doubt resolution feature coming soon!</p>
          </div>
        )}
        {activeTab === 'progress' && renderProgress()}
        {activeTab === 'profile' && (
          <div className="text-center py-12">
            <Settings className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Profile settings coming soon!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default RevolutionaryStudentDashboard;
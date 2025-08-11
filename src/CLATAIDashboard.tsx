import React, { useState } from 'react';
import { 
  Brain, 
  Target, 
  BookOpen, 
  Zap, 
  Star,
  Award,
  BarChart3,
  Calendar,
  Bell,
  Settings,
  TrendingUp,
  Clock,
  Trophy,
  Users,
  Sparkles,
  Eye,
  Heart,
  Lightbulb,
  Play,
  ChevronRight,
  Globe,
  MessageSquare,
  PenTool
} from 'lucide-react';

// Import all AI components
import SmartStudyPlanner from './components/study/SmartStudyPlanner';
import WeeklyInsights from './components/insights/WeeklyInsights';
import AIRecommendations from './components/ai/AIRecommendations';
import CLATQuestionGenerator from './components/ai/CLATQuestionGenerator';
import AIFlashcards from './components/ai/AIFlashcards';
import AITextExplainer from './components/ai/AITextExplainer';
import VocabularyDashboard from './components/vocabulary/VocabularyDashboard';
import ReadingAssessment from './components/reading/ReadingAssessment';
import CLATRankPredictor3D from './components/rank/CLATRankPredictor3D';
import StressManagement from './components/wellness/StressManagement';

const CLATAIDashboard: React.FC = () => {
  const [activeModule, setActiveModule] = useState<string>('overview');
  
  // Mock user data
  const userStats = {
    overallScore: 82,
    aiHours: 45.8,
    improvementRate: 23,
    rank: 156,
    totalStudents: 15420,
    streak: 15,
    masteryLevel: 'Advanced Learner',
    nextMilestone: 'CLAT Expert'
  };

  const aiModules = [
    {
      id: 'rank-predictor',
      name: 'CLAT Rank Predictor 3D',
      description: '3D visualization of NLU rankings with AI-powered rank prediction',
      icon: Trophy,
      color: 'yellow',
      features: ['3D NLU Visualization', 'Rank Prediction', 'Performance Analysis', 'Target Identification'],
      completionRate: 94,
      lastUsed: 'New feature!',
      impact: 'Predict rank 756'
    },
    {
      id: 'study-planner',
      name: 'Smart Study Planner',
      description: 'AI-powered personalized study schedules with adaptive reminders',
      icon: Calendar,
      color: 'blue',
      features: ['Adaptive Scheduling', 'Smart Reminders', 'Progress Tracking', 'Time Optimization'],
      completionRate: 78,
      lastUsed: '2 hours ago',
      impact: '+15% efficiency'
    },
    {
      id: 'text-explainer',
      name: 'AI Text Explainer',
      description: 'Highlight any text to get instant AI-powered explanations',
      icon: Eye,
      color: 'green',
      features: ['Text Highlighting', 'Contextual Explanations', 'Concept Mapping', 'Practice Questions'],
      completionRate: 92,
      lastUsed: '1 hour ago',
      impact: '+28% comprehension'
    },
    {
      id: 'vocabulary',
      name: 'Vocabulary Mastery',
      description: 'Vocabulary.com style learning with spaced repetition',
      icon: BookOpen,
      color: 'purple',
      features: ['Spaced Repetition', 'Contextual Learning', 'Progress Tracking', 'Gamification'],
      completionRate: 85,
      lastUsed: '30 minutes ago',
      impact: '+35 words/week'
    },
    {
      id: 'reading-assessment',
      name: 'Reading Assessment',
      description: 'Comprehensive reading comprehension analysis and improvement',
      icon: Target,
      color: 'orange',
      features: ['Speed Analysis', 'Comprehension Testing', 'Personalized Feedback', 'Skill Tracking'],
      completionRate: 67,
      lastUsed: '3 hours ago',
      impact: '+12% accuracy'
    },
    {
      id: 'question-generator',
      name: 'Question Generator',
      description: 'Generate unlimited CLAT questions across all sections',
      icon: Brain,
      color: 'indigo',
      features: ['All CLAT Sections', 'Difficulty Adaptation', 'Topic Selection', 'Performance Analytics'],
      completionRate: 73,
      lastUsed: '1 day ago',
      impact: '+200 questions/week'
    },
    {
      id: 'flashcards',
      name: 'AI Flashcards',
      description: 'Intelligent flashcard system with spaced repetition',
      icon: Zap,
      color: 'red',
      features: ['Auto Generation', 'Spaced Repetition', 'Multi-modal Learning', 'Progress Analytics'],
      completionRate: 81,
      lastUsed: '4 hours ago',
      impact: '+40% retention'
    },
    {
      id: 'recommendations',
      name: 'AI Recommendations',
      description: 'Personalized study recommendations based on performance',
      icon: Lightbulb,
      color: 'yellow',
      features: ['Performance Analysis', 'Personalized Tips', 'Weakness Identification', 'Action Plans'],
      completionRate: 89,
      lastUsed: '2 hours ago',
      impact: '+18% improvement'
    },
    {
      id: 'weekly-insights',
      name: 'Weekly Insights',
      description: 'Spotify Wrapped style weekly performance insights',
      icon: TrendingUp,
      color: 'pink',
      features: ['Performance Analytics', 'Community Comparison', 'Achievement Tracking', 'Trend Analysis'],
      completionRate: 95,
      lastUsed: '6 hours ago',
      impact: 'Top 8% performance'
    },
    {
      id: 'stress-management',
      name: 'Stress Management',
      description: 'AI-powered wellness and mental health support for CLAT preparation',
      icon: Heart,
      color: 'pink',
      features: ['Stress Tracking', 'Breathing Exercises', 'Mood Analysis', 'Wellness Activities'],
      completionRate: 87,
      lastUsed: '1 hour ago',
      impact: '-23% stress levels'
    }
  ];

  const renderModule = () => {
    switch (activeModule) {
      case 'rank-predictor': return <CLATRankPredictor3D />;
      case 'study-planner': return <SmartStudyPlanner />;
      case 'text-explainer': return (
        <div className="p-8">
          <AITextExplainer 
            content="The doctrine of Basic Structure is a legal principle in Indian constitutional law that certain fundamental features of the Constitution cannot be altered or destroyed through constitutional amendments. This principle was established in the landmark case of Kesavananda Bharati v. State of Kerala (1973)."
            subject="legal_reasoning"
            userLevel="intermediate"
          />
        </div>
      );
      case 'vocabulary': return <VocabularyDashboard />;
      case 'reading-assessment': return (
        <ReadingAssessment 
          onComplete={(results) => console.log('Assessment results:', results)}
          onBack={() => setActiveModule('overview')}
        />
      );
      case 'question-generator': return <CLATQuestionGenerator />;
      case 'flashcards': return <AIFlashcards />;
      case 'recommendations': return <AIRecommendations />;
      case 'weekly-insights': return <WeeklyInsights />;
      case 'stress-management': return <StressManagement />;
      default: return <OverviewDashboard />;
    }
  };

  const OverviewDashboard = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-8 h-8 text-yellow-300" />
                <h1 className="text-3xl font-bold">AI-Powered CLAT Preparation</h1>
              </div>
              <p className="text-blue-100 text-lg">Advanced artificial intelligence to accelerate your CLAT success</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold mb-1">{userStats.overallScore}%</div>
              <div className="text-blue-200">Current Score</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-5 h-5" />
                <span className="font-semibold">AI Study Hours</span>
              </div>
              <div className="text-2xl font-bold">{userStats.aiHours}h</div>
              <div className="text-sm text-blue-200">this month</div>
            </div>
            
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5" />
                <span className="font-semibold">Improvement</span>
              </div>
              <div className="text-2xl font-bold">+{userStats.improvementRate}%</div>
              <div className="text-sm text-blue-200">since AI adoption</div>
            </div>
            
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5" />
                <span className="font-semibold">Rank</span>
              </div>
              <div className="text-2xl font-bold">#{userStats.rank}</div>
              <div className="text-sm text-blue-200">of {userStats.totalStudents.toLocaleString()}</div>
            </div>
            
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5" />
                <span className="font-semibold">Mastery</span>
              </div>
              <div className="text-lg font-bold">{userStats.masteryLevel}</div>
              <div className="text-sm text-blue-200">→ {userStats.nextMilestone}</div>
            </div>
          </div>
        </div>
        
        {/* Background decorations */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">Active</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">AI Models Active</h3>
          <div className="text-3xl font-bold text-blue-600 mb-1">9</div>
          <p className="text-gray-600">Powering your learning experience</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">Growing</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Learning Velocity</h3>
          <div className="text-3xl font-bold text-green-600 mb-1">2.3x</div>
          <p className="text-gray-600">Faster than traditional methods</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm">Excellent</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">AI Accuracy</h3>
          <div className="text-3xl font-bold text-purple-600 mb-1">94.7%</div>
          <p className="text-gray-600">In recommendation precision</p>
        </div>
      </div>

      {/* AI Modules Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">AI Learning Modules</h2>
          <div className="text-sm text-gray-600">
            {aiModules.filter(m => m.completionRate > 80).length} modules optimized
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {aiModules.map((module) => (
            <div
              key={module.id}
              className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer group"
              onClick={() => setActiveModule(module.id)}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 bg-${module.color}-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <module.icon className={`w-6 h-6 text-${module.color}-600`} />
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold text-${module.color}-600`}>{module.completionRate}%</div>
                    <div className="text-xs text-gray-500">completion</div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {module.name}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{module.description}</p>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm text-gray-600">{module.completionRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`bg-${module.color}-500 h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${module.completionRate}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Last used:</span>
                    <span className="font-medium text-gray-900">{module.lastUsed}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Impact:</span>
                    <span className={`font-medium text-${module.color}-600`}>{module.impact}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {module.features.slice(0, 2).map((feature, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {feature}
                        </span>
                      ))}
                      {module.features.length > 2 && (
                        <span className="text-xs text-gray-500">+{module.features.length - 2} more</span>
                      )}
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Recent AI Activity</h3>
        <div className="space-y-4">
          {[
            { action: 'Generated 15 Legal Reasoning questions', time: '2 hours ago', module: 'Question Generator', color: 'indigo' },
            { action: 'Completed Reading Assessment', time: '3 hours ago', module: 'Reading Assessment', color: 'orange' },
            { action: 'Reviewed 12 flashcards', time: '4 hours ago', module: 'AI Flashcards', color: 'red' },
            { action: 'Updated study plan recommendations', time: '5 hours ago', module: 'Smart Planner', color: 'blue' },
            { action: 'Mastered 5 new vocabulary words', time: '6 hours ago', module: 'Vocabulary', color: 'purple' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <div className={`w-10 h-10 bg-${activity.color}-100 rounded-full flex items-center justify-center`}>
                <Sparkles className={`w-5 h-5 text-${activity.color}-600`} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{activity.action}</p>
                <p className="text-sm text-gray-600">{activity.module} • {activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (activeModule !== 'overview') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Back Button */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <button
              onClick={() => setActiveModule('overview')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              ← Back to AI Dashboard
            </button>
          </div>
        </div>
        {renderModule()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">CLAT AI Dashboard</h1>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                Claude AI Powered
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-orange-100 px-3 py-1 rounded-full">
                <Trophy className="w-4 h-4 text-orange-600" />
                <span className="font-bold text-orange-800">{userStats.streak}</span>
                <span className="text-sm text-orange-600">day streak</span>
              </div>
              
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <OverviewDashboard />
      </div>
    </div>
  );
};

export default CLATAIDashboard;
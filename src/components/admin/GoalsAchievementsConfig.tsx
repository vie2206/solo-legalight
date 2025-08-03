import React, { useState } from 'react';
import { 
  Target, Trophy, Plus, Edit, Trash2, Search, Filter, 
  Eye, Upload, Download, RefreshCw, Settings, Star,
  BarChart3, Users, TrendingUp, Award, Zap, Flag,
  Clock, CheckCircle, AlertCircle, Calendar, Gift
} from 'lucide-react';

interface GoalsAchievementsConfigProps {}

interface Goal {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'milestone';
  category: 'study_time' | 'test_scores' | 'streak' | 'content' | 'social';
  target: number;
  unit: string;
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
  status: 'active' | 'inactive' | 'archived';
  completions: number;
  successRate: number;
  createdBy: string;
  createdDate: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'performance' | 'consistency' | 'social' | 'milestone' | 'special';
  criteria: {
    type: string;
    threshold: number;
    operator: 'equals' | 'greater_than' | 'less_than' | 'greater_equal';
  };
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  xpReward: number;
  badgeColor: string;
  unlockCount: number;
  status: 'active' | 'inactive' | 'seasonal';
  createdBy: string;
  createdDate: string;
}

interface Template {
  id: string;
  name: string;
  description: string;
  goals: string[];
  achievements: string[];
  targetAudience: 'beginner' | 'intermediate' | 'advanced' | 'all';
  estimatedDuration: string;
}

const GoalsAchievementsConfig: React.FC<GoalsAchievementsConfigProps> = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'goals' | 'achievements' | 'templates' | 'analytics'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock data
  const goals: Goal[] = [
    {
      id: '1',
      title: 'Daily Study Goal',
      description: 'Study for a minimum of 2 hours every day',
      type: 'daily',
      category: 'study_time',
      target: 2,
      unit: 'hours',
      difficulty: 'medium',
      xpReward: 50,
      status: 'active',
      completions: 1245,
      successRate: 73.2,
      createdBy: 'Admin User',
      createdDate: '2024-01-15'
    },
    {
      id: '2',
      title: 'Weekly Test Challenge',
      description: 'Complete 5 mock tests in a week with 80%+ accuracy',
      type: 'weekly',
      category: 'test_scores',
      target: 5,
      unit: 'tests',
      difficulty: 'hard',
      xpReward: 200,
      status: 'active',
      completions: 387,
      successRate: 45.6,
      createdBy: 'Content Manager',
      createdDate: '2024-02-01'
    },
    {
      id: '3',
      title: 'Study Streak Master',
      description: 'Maintain a study streak for 30 consecutive days',
      type: 'milestone',
      category: 'streak',
      target: 30,
      unit: 'days',
      difficulty: 'hard',
      xpReward: 500,
      status: 'active',
      completions: 156,
      successRate: 28.3,
      createdBy: 'System',
      createdDate: '2024-01-10'
    }
  ];

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first mock test',
      icon: '🎯',
      category: 'milestone',
      criteria: { type: 'tests_completed', threshold: 1, operator: 'greater_equal' },
      rarity: 'common',
      xpReward: 100,
      badgeColor: '#10B981',
      unlockCount: 892,
      status: 'active',
      createdBy: 'Admin User',
      createdDate: '2024-01-05'
    },
    {
      id: '2',
      title: 'Speed Reader',
      description: 'Achieve reading speed of 300+ WPM',
      icon: '⚡',
      category: 'performance',
      criteria: { type: 'reading_speed', threshold: 300, operator: 'greater_equal' },
      rarity: 'rare',
      xpReward: 250,
      badgeColor: '#3B82F6',
      unlockCount: 234,
      status: 'active',
      createdBy: 'Content Manager',
      createdDate: '2024-01-20'
    },
    {
      id: '3',
      title: 'Social Butterfly',
      description: 'Participate in 10 study group discussions',
      icon: '🦋',
      category: 'social',
      criteria: { type: 'group_discussions', threshold: 10, operator: 'greater_equal' },
      rarity: 'epic',
      xpReward: 400,
      badgeColor: '#8B5CF6',
      unlockCount: 67,
      status: 'active',
      createdBy: 'Community Manager',
      createdDate: '2024-02-15'
    }
  ];

  const templates: Template[] = [
    {
      id: '1',
      name: 'Beginner CLAT Prep',
      description: 'Perfect for students just starting their CLAT preparation',
      goals: ['daily_study_1hr', 'weekly_tests_3', 'vocab_10_words'],
      achievements: ['first_steps', 'week_warrior', 'vocab_builder'],
      targetAudience: 'beginner',
      estimatedDuration: '3-6 months'
    },
    {
      id: '2',
      name: 'Advanced Performance',
      description: 'For serious aspirants aiming for top law schools',
      goals: ['daily_study_4hr', 'weekly_tests_7', 'accuracy_90'],
      achievements: ['speed_reader', 'accuracy_master', 'streak_legend'],
      targetAudience: 'advanced',
      estimatedDuration: '6-12 months'
    }
  ];

  const overallStats = {
    totalGoals: 23,
    activeGoals: 18,
    totalAchievements: 45,
    activeAchievements: 38,
    totalUnlocks: 12567,
    avgCompletionRate: 64.2,
    topCategory: 'study_time',
    mostPopularGoal: 'Daily Study Goal'
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Active Goals</p>
              <p className="text-3xl font-bold">{overallStats.activeGoals}</p>
              <p className="text-green-100 text-sm mt-1">out of {overallStats.totalGoals}</p>
            </div>
            <Target className="w-12 h-12 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-100 text-sm">Achievements</p>
              <p className="text-3xl font-bold">{overallStats.activeAchievements}</p>
              <p className="text-yellow-100 text-sm mt-1">available to unlock</p>
            </div>
            <Trophy className="w-12 h-12 text-yellow-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Total Unlocks</p>
              <p className="text-3xl font-bold">{overallStats.totalUnlocks.toLocaleString()}</p>
              <p className="text-purple-100 text-sm mt-1">across all students</p>
            </div>
            <Award className="w-12 h-12 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Completion Rate</p>
              <p className="text-3xl font-bold">{overallStats.avgCompletionRate}%</p>
              <p className="text-blue-100 text-sm mt-1">average success</p>
            </div>
            <BarChart3 className="w-12 h-12 text-blue-200" />
          </div>
        </div>
      </div>

      {/* Popular Goals & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <Target className="w-6 h-6 mr-2 text-green-600" />
            Most Popular Goals
          </h3>
          
          <div className="space-y-4">
            {goals.slice(0, 3).map((goal, index) => (
              <div key={goal.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    index === 0 ? 'bg-green-500' : index === 1 ? 'bg-blue-500' : 'bg-purple-500'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">{goal.title}</h4>
                    <p className="text-sm text-gray-600">{goal.completions} completions</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">{goal.successRate}%</p>
                  <p className="text-xs text-gray-500">success rate</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold mb-6 flex items-center">
            <Trophy className="w-6 h-6 mr-2 text-yellow-600" />
            Top Achievements
          </h3>
          
          <div className="space-y-4">
            {achievements.slice(0, 3).map((achievement, index) => (
              <div key={achievement.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50">
                <div className="flex items-center">
                  <div className="text-2xl mr-3">{achievement.icon}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.unlockCount} unlocks</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    achievement.rarity === 'common' ? 'bg-gray-100 text-gray-800' :
                    achievement.rarity === 'rare' ? 'bg-blue-100 text-blue-800' :
                    achievement.rarity === 'epic' ? 'bg-purple-100 text-purple-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {achievement.rarity}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">{achievement.xpReward} XP</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-6 flex items-center">
          <Zap className="w-6 h-6 mr-2 text-orange-600" />
          Quick Actions
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button 
            onClick={() => setShowAddModal(true)}
            className="p-4 border-2 border-dashed border-green-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors text-center"
          >
            <Plus className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <p className="font-medium text-green-700">Create Goal</p>
          </button>
          
          <button className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100 transition-colors text-center">
            <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
            <p className="font-medium text-yellow-700">Add Achievement</p>
          </button>
          
          <button className="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors text-center">
            <Flag className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <p className="font-medium text-blue-700">Create Template</p>
          </button>
          
          <button className="p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors text-center">
            <Settings className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <p className="font-medium text-purple-700">Global Settings</p>
          </button>
        </div>
      </div>
    </div>
  );

  const renderGoalsList = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search goals..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Categories</option>
            <option value="study_time">Study Time</option>
            <option value="test_scores">Test Scores</option>
            <option value="streak">Streak</option>
            <option value="content">Content</option>
            <option value="social">Social</option>
          </select>
          
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="archived">Archived</option>
          </select>
          
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Goal
          </button>
        </div>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => (
          <div key={goal.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <Target className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <h3 className="font-bold text-gray-900">{goal.title}</h3>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    goal.type === 'daily' ? 'bg-blue-100 text-blue-800' :
                    goal.type === 'weekly' ? 'bg-green-100 text-green-800' :
                    goal.type === 'monthly' ? 'bg-purple-100 text-purple-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {goal.type}
                  </span>
                </div>
              </div>
              <div className="flex space-x-1">
                <button className="text-blue-600 hover:text-blue-800">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="text-green-600 hover:text-green-800">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="text-red-600 hover:text-red-800">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">{goal.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Target</p>
                <p className="font-semibold">{goal.target} {goal.unit}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">XP Reward</p>
                <p className="font-semibold text-purple-600">{goal.xpReward} XP</p>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">Success Rate</span>
                <span className="text-xs font-medium">{goal.successRate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${goal.successRate}%` }}
                ></div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-xs text-gray-500">Completions</p>
                <p className="font-semibold text-sm">{goal.completions}</p>
              </div>
              <div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  goal.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                  goal.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {goal.difficulty}
                </span>
              </div>
              <div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  goal.status === 'active' ? 'bg-green-100 text-green-800' :
                  goal.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                  'bg-orange-100 text-orange-800'
                }`}>
                  {goal.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAchievementsList = () => (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search achievements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <button className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add Achievement
          </button>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((achievement) => (
          <div key={achievement.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="text-3xl mr-3">{achievement.icon}</div>
                <div>
                  <h3 className="font-bold text-gray-900">{achievement.title}</h3>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    achievement.rarity === 'common' ? 'bg-gray-100 text-gray-800' :
                    achievement.rarity === 'rare' ? 'bg-blue-100 text-blue-800' :
                    achievement.rarity === 'epic' ? 'bg-purple-100 text-purple-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {achievement.rarity}
                  </span>
                </div>
              </div>
              <div className="flex space-x-1">
                <button className="text-blue-600 hover:text-blue-800">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="text-green-600 hover:text-green-800">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="text-red-600 hover:text-red-800">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <p className="text-gray-600 text-sm mb-4">{achievement.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">XP Reward</p>
                <p className="font-semibold text-purple-600">{achievement.xpReward} XP</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Unlocks</p>
                <p className="font-semibold">{achievement.unlockCount}</p>
              </div>
            </div>
            
            <div className="text-center">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                achievement.status === 'active' ? 'bg-green-100 text-green-800' :
                achievement.status === 'inactive' ? 'bg-gray-100 text-gray-800' :
                'bg-orange-100 text-orange-800'
              }`}>
                {achievement.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">🎯 Goals & Achievements Configuration</h2>
          <p className="text-gray-600">Manage student motivation through goals and achievement systems</p>
        </div>
        
        <div className="flex flex-wrap gap-3 mt-4 lg:mt-0">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Config
          </button>
          
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center">
            <Upload className="w-4 h-4 mr-2" />
            Import Template
          </button>
          
          <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'goals', label: 'Goals Management', icon: Target },
          { id: 'achievements', label: 'Achievements', icon: Trophy },
          { id: 'templates', label: 'Templates', icon: Flag },
          { id: 'analytics', label: 'Analytics', icon: TrendingUp }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <tab.icon className="w-4 h-4 mr-2" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'goals' && renderGoalsList()}
      {activeTab === 'achievements' && renderAchievementsList()}
      
      {activeTab === 'templates' && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-bold mb-4">Goal & Achievement Templates</h3>
          <p className="text-gray-600 mb-6">Pre-configured goal and achievement combinations for different student levels.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {templates.map((template) => (
              <div key={template.id} className="border border-gray-200 rounded-lg p-6">
                <h4 className="font-bold text-gray-900 mb-2">{template.name}</h4>
                <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Target:</p>
                    <p className="font-medium">{template.targetAudience}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Duration:</p>
                    <p className="font-medium">{template.estimatedDuration}</p>
                  </div>
                </div>
                <div className="mt-4 flex space-x-2">
                  <button className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {template.goals.length} Goals
                  </button>
                  <button className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                    {template.achievements.length} Achievements
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {activeTab === 'analytics' && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-bold mb-4">Goals & Achievements Analytics</h3>
          <p className="text-gray-600">Detailed analytics on goal completion rates and achievement unlock patterns would be displayed here.</p>
        </div>
      )}
    </div>
  );
};

export default GoalsAchievementsConfig;
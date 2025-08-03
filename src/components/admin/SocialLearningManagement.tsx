import React, { useState, useEffect } from 'react';
import {
  Trophy, Users, Target, Star, TrendingUp, Award, Gift, 
  Settings, Plus, Edit, Trash2, Search, Filter, BarChart3,
  Calendar, Clock, Shield, ChevronRight, AlertCircle, CheckCircle
} from 'lucide-react';

interface SocialLearningManagementProps {
  userToken?: string;
}

interface LeaderboardSettings {
  refreshInterval: number;
  displayLimit: number;
  scoreCalculation: 'points' | 'percentage' | 'weighted';
  resetPeriod: 'daily' | 'weekly' | 'monthly';
  categories: string[];
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'special';
  difficulty: 'easy' | 'medium' | 'hard';
  xpReward: number;
  requirements: {
    metric: string;
    target: number;
    timeLimit: number;
  };
  participants: number;
  completions: number;
  status: 'active' | 'scheduled' | 'completed';
  startDate: string;
  endDate: string;
}

interface StudyGroup {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  maxMembers: number;
  category: string;
  activity: 'very_active' | 'active' | 'moderate' | 'inactive';
  moderator: string;
  created: string;
  lastActivity: string;
  flaggedContent: number;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  xpValue: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  requirements: {
    type: string;
    value: number;
  }[];
  unlockedBy: number;
  totalUsers: number;
}

interface XPConfiguration {
  actions: {
    questionCorrect: number;
    dailyLogin: number;
    streakBonus: number;
    challengeComplete: number;
    helpPeer: number;
    perfectScore: number;
  };
  multipliers: {
    weekend: number;
    examWeek: number;
    firstAttempt: number;
  };
  levels: {
    level: number;
    minXP: number;
    title: string;
  }[];
}

const SocialLearningManagement: React.FC<SocialLearningManagementProps> = ({ userToken }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'leaderboard' | 'challenges' | 'groups' | 'achievements' | 'xp-config'>('overview');
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [studyGroups, setStudyGroups] = useState<StudyGroup[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [showCreateChallenge, setShowCreateChallenge] = useState(false);
  const [showCreateAchievement, setShowCreateAchievement] = useState(false);

  // Mock data
  useEffect(() => {
    setChallenges([
      {
        id: '1',
        title: 'Speed Reading Marathon',
        description: 'Complete 20 passages in 3 days',
        type: 'weekly',
        difficulty: 'hard',
        xpReward: 500,
        requirements: { metric: 'passages_completed', target: 20, timeLimit: 3 },
        participants: 156,
        completions: 23,
        status: 'active',
        startDate: '2025-01-29',
        endDate: '2025-02-01'
      },
      {
        id: '2',
        title: 'Legal Reasoning Blitz',
        description: 'Answer 100 questions with 80%+ accuracy',
        type: 'weekly',
        difficulty: 'medium',
        xpReward: 300,
        requirements: { metric: 'questions_accuracy', target: 80, timeLimit: 7 },
        participants: 89,
        completions: 45,
        status: 'active',
        startDate: '2025-01-27',
        endDate: '2025-02-03'
      }
    ]);

    setStudyGroups([
      {
        id: '1',
        name: 'CLAT Warriors 2025',
        description: 'Focused group for CLAT 2025 preparation',
        memberCount: 24,
        maxMembers: 30,
        category: 'All Subjects',
        activity: 'very_active',
        moderator: 'Arjun S.',
        created: '2025-01-15',
        lastActivity: '2 hours ago',
        flaggedContent: 0
      },
      {
        id: '2',
        name: 'Legal Reasoning Masters',
        description: 'Specialized group for legal reasoning',
        memberCount: 18,
        maxMembers: 25,
        category: 'Legal Reasoning',
        activity: 'active',
        moderator: 'Priya P.',
        created: '2025-01-10',
        lastActivity: '5 hours ago',
        flaggedContent: 2
      }
    ]);

    setAchievements([
      {
        id: '1',
        name: 'First Steps',
        description: 'Complete your first mock test',
        icon: '🎯',
        xpValue: 100,
        rarity: 'common',
        requirements: [{ type: 'mock_tests_completed', value: 1 }],
        unlockedBy: 2345,
        totalUsers: 2847
      },
      {
        id: '2',
        name: 'Speed Demon',
        description: 'Achieve 250+ WPM reading speed',
        icon: '⚡',
        xpValue: 500,
        rarity: 'rare',
        requirements: [{ type: 'reading_speed', value: 250 }],
        unlockedBy: 567,
        totalUsers: 2847
      }
    ]);
  }, []);

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-6 rounded-xl text-white">
          <Trophy className="w-8 h-8 mb-2 opacity-80" />
          <h3 className="text-2xl font-bold">2,847</h3>
          <p className="text-sm opacity-90">Active Participants</p>
          <p className="text-xs mt-2 opacity-75">+12% from last week</p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-6 rounded-xl text-white">
          <Target className="w-8 h-8 mb-2 opacity-80" />
          <h3 className="text-2xl font-bold">23</h3>
          <p className="text-sm opacity-90">Active Challenges</p>
          <p className="text-xs mt-2 opacity-75">5 ending soon</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-6 rounded-xl text-white">
          <Users className="w-8 h-8 mb-2 opacity-80" />
          <h3 className="text-2xl font-bold">47</h3>
          <p className="text-sm opacity-90">Study Groups</p>
          <p className="text-xs mt-2 opacity-75">89% active rate</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-red-500 p-6 rounded-xl text-white">
          <Award className="w-8 h-8 mb-2 opacity-80" />
          <h3 className="text-2xl font-bold">156</h3>
          <p className="text-sm opacity-90">Achievements</p>
          <p className="text-xs mt-2 opacity-75">12 new this month</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => setShowCreateChallenge(true)}
            className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all group"
          >
            <Plus className="w-6 h-6 mx-auto mb-2 text-gray-400 group-hover:text-purple-500" />
            <p className="text-sm font-medium text-gray-600 group-hover:text-purple-700">Create Challenge</p>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group">
            <Settings className="w-6 h-6 mx-auto mb-2 text-gray-400 group-hover:text-blue-500" />
            <p className="text-sm font-medium text-gray-600 group-hover:text-blue-700">Configure XP System</p>
          </button>
          <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all group">
            <BarChart3 className="w-6 h-6 mx-auto mb-2 text-gray-400 group-hover:text-green-500" />
            <p className="text-sm font-medium text-gray-600 group-hover:text-green-700">View Analytics</p>
          </button>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">Recent Social Activity</h3>
        <div className="space-y-4">
          {[
            { type: 'challenge', user: 'Rahul K.', action: 'completed Speed Reading Marathon', time: '10 mins ago', icon: Trophy },
            { type: 'group', user: 'Priya S.', action: 'joined Legal Reasoning Masters', time: '1 hour ago', icon: Users },
            { type: 'achievement', user: 'Amit P.', action: 'unlocked Speed Demon achievement', time: '2 hours ago', icon: Award },
            { type: 'leaderboard', user: 'Sarah M.', action: 'reached #1 on weekly leaderboard', time: '3 hours ago', icon: TrendingUp }
          ].map((activity, idx) => {
            const Icon = activity.icon;
            return (
              <div key={idx} className="flex items-center p-4 bg-gray-50 rounded-lg">
                <Icon className="w-5 h-5 text-gray-600 mr-3" />
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderLeaderboard = () => (
    <div className="space-y-6">
      {/* Leaderboard Settings */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Leaderboard Configuration</h3>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            Save Settings
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Refresh Interval</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
              <option value="realtime">Real-time</option>
              <option value="5min">Every 5 minutes</option>
              <option value="hourly">Hourly</option>
              <option value="daily">Daily</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Reset Period</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="never">Never (All-time)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Score Calculation</label>
            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500">
              <option value="points">Total XP Points</option>
              <option value="percentage">Average Percentage</option>
              <option value="weighted">Weighted Score</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Display Limit</label>
            <input 
              type="number" 
              defaultValue={100}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
        
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Leaderboard Categories</label>
          <div className="flex flex-wrap gap-2">
            {['Overall', 'Legal Reasoning', 'Logical Reasoning', 'Reading Comprehension', 'GK', 'Quantitative'].map((cat) => (
              <label key={cat} className="flex items-center">
                <input type="checkbox" defaultChecked className="mr-2" />
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">{cat}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Current Leaderboard Preview */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4">Current Leaderboard (Top 10)</h3>
        <div className="space-y-2">
          {[
            { rank: 1, name: 'Arjun Sharma', score: 3420, change: '+2', trend: 'up' },
            { rank: 2, name: 'Priya Patel', score: 3285, change: '-1', trend: 'down' },
            { rank: 3, name: 'Rahul Kumar', score: 3156, change: '+1', trend: 'up' },
            { rank: 4, name: 'Sneha Gupta', score: 2987, change: '0', trend: 'same' },
            { rank: 5, name: 'Karan Singh', score: 2834, change: '+3', trend: 'up' }
          ].map((player) => (
            <div key={player.rank} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                  player.rank === 1 ? 'bg-yellow-500' : player.rank === 2 ? 'bg-gray-400' : player.rank === 3 ? 'bg-orange-600' : 'bg-gray-600'
                }`}>
                  {player.rank}
                </div>
                <span className="ml-4 font-medium">{player.name}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-bold">{player.score.toLocaleString()} XP</span>
                <span className={`text-sm ${player.trend === 'up' ? 'text-green-600' : player.trend === 'down' ? 'text-red-600' : 'text-gray-500'}`}>
                  {player.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderChallenges = () => (
    <div className="space-y-6">
      {/* Challenge Management Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Challenge Management</h3>
          <button 
            onClick={() => setShowCreateChallenge(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Challenge
          </button>
        </div>
        
        {/* Filters */}
        <div className="flex space-x-4">
          <select className="px-4 py-2 border border-gray-300 rounded-lg">
            <option>All Types</option>
            <option>Daily</option>
            <option>Weekly</option>
            <option>Special</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg">
            <option>All Status</option>
            <option>Active</option>
            <option>Scheduled</option>
            <option>Completed</option>
          </select>
          <div className="flex-1">
            <input 
              type="text" 
              placeholder="Search challenges..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Challenges List */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="space-y-4">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-bold text-lg">{challenge.title}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      challenge.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                      challenge.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {challenge.difficulty}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      challenge.status === 'active' ? 'bg-blue-100 text-blue-800' :
                      challenge.status === 'scheduled' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {challenge.status}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{challenge.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Reward:</span>
                      <span className="ml-2 font-medium">{challenge.xpReward} XP</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Participants:</span>
                      <span className="ml-2 font-medium">{challenge.participants}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Completions:</span>
                      <span className="ml-2 font-medium">{challenge.completions}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Success Rate:</span>
                      <span className="ml-2 font-medium">
                        {((challenge.completions / challenge.participants) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2 ml-4">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStudyGroups = () => (
    <div className="space-y-6">
      {/* Study Groups Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Study Groups Management</h3>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Approve Pending
            </button>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              Create Group
            </button>
          </div>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mt-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <p className="text-2xl font-bold text-blue-600">47</p>
            <p className="text-sm text-gray-600">Total Groups</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">42</p>
            <p className="text-sm text-gray-600">Active Groups</p>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <p className="text-2xl font-bold text-yellow-600">892</p>
            <p className="text-sm text-gray-600">Total Members</p>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <p className="text-2xl font-bold text-red-600">5</p>
            <p className="text-sm text-gray-600">Flagged Content</p>
          </div>
        </div>
      </div>

      {/* Groups List */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="space-y-4">
          {studyGroups.map((group) => (
            <div key={group.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-bold text-lg">{group.name}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      group.activity === 'very_active' ? 'bg-green-100 text-green-800' :
                      group.activity === 'active' ? 'bg-blue-100 text-blue-800' :
                      group.activity === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {group.activity.replace('_', ' ')}
                    </span>
                    {group.flaggedContent > 0 && (
                      <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 flex items-center">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        {group.flaggedContent} flagged
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{group.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Members:</span>
                      <span className="ml-2 font-medium">{group.memberCount}/{group.maxMembers}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Category:</span>
                      <span className="ml-2 font-medium">{group.category}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Moderator:</span>
                      <span className="ml-2 font-medium">{group.moderator}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Created:</span>
                      <span className="ml-2 font-medium">{group.created}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Last Active:</span>
                      <span className="ml-2 font-medium">{group.lastActivity}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2 ml-4">
                  <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg" title="View Details">
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="Edit">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAchievements = () => (
    <div className="space-y-6">
      {/* Achievements Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Achievement System</h3>
          <button 
            onClick={() => setShowCreateAchievement(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Achievement
          </button>
        </div>
        
        {/* Achievement Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold">156</p>
            <p className="text-sm text-gray-600">Total Achievements</p>
          </div>
          <div className="text-center p-3 bg-yellow-50 rounded-lg">
            <p className="text-2xl font-bold">23,451</p>
            <p className="text-sm text-gray-600">Unlocks This Month</p>
          </div>
          <div className="text-center p-3 bg-purple-50 rounded-lg">
            <p className="text-2xl font-bold">82%</p>
            <p className="text-sm text-gray-600">Engagement Rate</p>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold">4.7</p>
            <p className="text-sm text-gray-600">Avg. Satisfaction</p>
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="text-3xl">{achievement.icon}</div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  achievement.rarity === 'common' ? 'bg-gray-100 text-gray-800' :
                  achievement.rarity === 'rare' ? 'bg-blue-100 text-blue-800' :
                  achievement.rarity === 'epic' ? 'bg-purple-100 text-purple-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {achievement.rarity}
                </span>
              </div>
              
              <h4 className="font-bold mb-1">{achievement.name}</h4>
              <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">XP Value:</span>
                  <span className="font-medium">{achievement.xpValue} XP</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Unlocked by:</span>
                  <span className="font-medium">{((achievement.unlockedBy / achievement.totalUsers) * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                    style={{ width: `${(achievement.unlockedBy / achievement.totalUsers) * 100}%` }}
                  />
                </div>
              </div>
              
              <div className="flex space-x-2 mt-3">
                <button className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                  Edit
                </button>
                <button className="flex-1 px-3 py-1 text-sm border border-red-300 text-red-600 rounded hover:bg-red-50">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderXPConfig = () => (
    <div className="space-y-6">
      {/* XP Configuration */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-6">XP System Configuration</h3>
        
        {/* Action Points */}
        <div className="mb-8">
          <h4 className="font-semibold mb-4">Base XP for Actions</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { action: 'Correct Answer', points: 10 },
              { action: 'Daily Login', points: 5 },
              { action: 'Streak Bonus (per day)', points: 2 },
              { action: 'Challenge Completion', points: 100 },
              { action: 'Help Peer', points: 15 },
              { action: 'Perfect Score', points: 50 },
              { action: 'Share Achievement', points: 5 },
              { action: 'Group Participation', points: 8 }
            ].map((item) => (
              <div key={item.action} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium">{item.action}</span>
                <input 
                  type="number" 
                  defaultValue={item.points}
                  className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Multipliers */}
        <div className="mb-8">
          <h4 className="font-semibold mb-4">XP Multipliers</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { condition: 'Weekend Bonus', multiplier: 1.5 },
              { condition: 'Exam Week', multiplier: 2.0 },
              { condition: 'First Attempt', multiplier: 1.2 }
            ].map((item) => (
              <div key={item.condition} className="p-4 border rounded-lg">
                <p className="font-medium mb-2">{item.condition}</p>
                <div className="flex items-center">
                  <input 
                    type="number" 
                    defaultValue={item.multiplier}
                    step="0.1"
                    className="w-20 px-2 py-1 border border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">x multiplier</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Level System */}
        <div>
          <h4 className="font-semibold mb-4">Level System</h4>
          <div className="space-y-2">
            {[
              { level: 1, minXP: 0, title: 'Beginner' },
              { level: 2, minXP: 100, title: 'Novice' },
              { level: 3, minXP: 300, title: 'Apprentice' },
              { level: 4, minXP: 600, title: 'Scholar' },
              { level: 5, minXP: 1000, title: 'Expert' },
              { level: 6, minXP: 1500, title: 'Master' }
            ].map((level) => (
              <div key={level.level} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <span className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                    {level.level}
                  </span>
                  <input 
                    type="text" 
                    defaultValue={level.title}
                    className="px-3 py-1 border border-gray-300 rounded"
                  />
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 mr-2">Min XP:</span>
                  <input 
                    type="number" 
                    defaultValue={level.minXP}
                    className="w-24 px-2 py-1 border border-gray-300 rounded"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            Save XP Configuration
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-2">Social Learning Management</h2>
        <p className="text-gray-600">Manage leaderboards, challenges, study groups, and gamification features</p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-lg p-2">
        <div className="flex space-x-2">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
            { id: 'challenges', label: 'Challenges', icon: Target },
            { id: 'groups', label: 'Study Groups', icon: Users },
            { id: 'achievements', label: 'Achievements', icon: Award },
            { id: 'xp-config', label: 'XP Configuration', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'leaderboard' && renderLeaderboard()}
      {activeTab === 'challenges' && renderChallenges()}
      {activeTab === 'groups' && renderStudyGroups()}
      {activeTab === 'achievements' && renderAchievements()}
      {activeTab === 'xp-config' && renderXPConfig()}

      {/* Create Challenge Modal */}
      {showCreateChallenge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
            <h3 className="text-xl font-bold mb-4">Create New Challenge</h3>
            {/* Challenge creation form would go here */}
            <div className="flex justify-end space-x-3 mt-6">
              <button 
                onClick={() => setShowCreateChallenge(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                Create Challenge
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialLearningManagement;
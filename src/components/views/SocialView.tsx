import React, { useState, useEffect } from 'react';
import { 
  UsersIcon, TrophyIcon, GiftIcon, FireIcon, ChartBarIcon, 
  SparklesIcon, ChatBubbleLeftRightIcon, StarIcon, CheckCircleIcon,
  CalendarDaysIcon, ClockIcon, AcademicCapIcon
} from '@heroicons/react/24/outline';
import { User } from '../../types';
import { cn } from '../../utils';

interface SocialViewProps {
  user: User | null;
}

const SocialView: React.FC<SocialViewProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock social data
  const socialStats = {
    studyGroups: 3,
    leaderboardRank: 12,
    xpPoints: 2450,
    scholarLevel: 5,
    weeklyChange: +5
  };

  const leaderboardData = [
    { rank: 1, name: 'Arjun Sharma', score: 3420, change: '+2', avatar: '🥇', streak: 12, level: 6 },
    { rank: 2, name: 'Priya Patel', score: 3285, change: '-1', avatar: '🥈', streak: 8, level: 5 },
    { rank: 3, name: 'Rahul Kumar', score: 3156, change: '+1', avatar: '🥉', streak: 15, level: 5 },
    { rank: 4, name: 'Sneha Gupta', score: 2987, change: '0', avatar: '🏅', streak: 6, level: 4 },
    { rank: 5, name: 'Karan Singh', score: 2834, change: '+3', avatar: '🎖️', streak: 9, level: 4 },
    { rank: 12, name: user?.name || 'You', score: 2450, change: '+5', avatar: '👤', streak: 15, level: 5, isUser: true }
  ];

  const activeChallenges = [
    {
      title: 'Speed Reading Marathon',
      description: 'Complete 20 passages in 3 days',
      progress: 65,
      timeLeft: '2 days left',
      reward: '500 XP + Speed Reader Badge',
      participants: 156,
      difficulty: 'Hard',
      color: '#ff6b6b'
    },
    {
      title: 'Legal Reasoning Blitz',
      description: 'Answer 100 questions with 80%+ accuracy',
      progress: 42,
      timeLeft: '5 days left',
      reward: '300 XP + Logic Master Badge',
      participants: 89,
      difficulty: 'Medium',
      color: '#4ecdc4'
    },
    {
      title: 'Daily Streak Challenge',
      description: 'Study for 30 consecutive days',
      progress: 87,
      timeLeft: '4 days left',
      reward: '1000 XP + Dedication Medal',
      participants: 234,
      difficulty: 'Easy',
      color: '#45b7d1'
    }
  ];

  const studyGroups = [
    {
      name: 'CLAT Warriors 2025',
      members: 24,
      activity: 'Very Active',
      description: 'Focused group for CLAT 2025 preparation with daily discussions',
      subject: 'All Subjects',
      level: 'Advanced',
      color: '#87CEEB',
      joined: true,
      lastActivity: '2 hours ago',
      stats: { messages: 156, challenges: 8, resources: 23 }
    },
    {
      name: 'Legal Reasoning Masters',
      members: 18,
      activity: 'Active',
      description: 'Specialized group for mastering legal reasoning concepts',
      subject: 'Legal Reasoning',
      level: 'Intermediate',
      color: '#90EE90',
      joined: true,
      lastActivity: '5 hours ago',
      stats: { messages: 89, challenges: 5, resources: 34 }
    },
    {
      name: 'Mock Test Champions',
      members: 31,
      activity: 'Moderate',
      description: 'Weekly mock tests and performance analysis discussions',
      subject: 'Mock Tests',
      level: 'All Levels',
      color: '#FFB6C1',
      joined: true,
      lastActivity: '1 day ago',
      stats: { messages: 67, challenges: 12, resources: 18 }
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: ChartBarIcon },
    { id: 'leaderboard', label: 'Leaderboard', icon: TrophyIcon },
    { id: 'challenges', label: 'Challenges', icon: FireIcon },
    { id: 'groups', label: 'Study Groups', icon: UsersIcon }
  ];

  return (
    <div className="space-y-6">
      {/* Social Header */}
      <div className="bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-600 rounded-3xl p-6 lg:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -ml-12 -mb-12"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold mb-2">👥 Social Learning Hub</h2>
              <p className="text-purple-100">Connect, compete, and collaborate with fellow CLAT aspirants</p>
            </div>
            <button 
              className="px-4 py-2 rounded-2xl font-semibold bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-200"
            >
              Join Study Group
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100">
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200",
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Social Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <StatsCard
              icon={UsersIcon}
              value={socialStats.studyGroups}
              label="Study Groups"
              color="#87CEEB"
            />
            <StatsCard
              icon={TrophyIcon}
              value={`#${socialStats.leaderboardRank}`}
              label="Leaderboard Rank"
              color="#90EE90"
            />
            <StatsCard
              icon={GiftIcon}
              value={socialStats.xpPoints.toLocaleString()}
              label="XP Points"
              color="#FFB6C1"
            />
            <StatsCard
              icon={FireIcon}
              value={`Level ${socialStats.scholarLevel}`}
              label="Scholar Level"
              color="#F4A460"
            />
          </div>

          {/* XP Progress */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border-2 border-purple-200">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-bold text-xl text-purple-800">✨ Level Progress</h3>
                <p className="text-purple-600 text-sm mt-1">Scholar Level 5 → Level 6</p>
              </div>
              <div className="bg-purple-500 rounded-full p-3">
                <StarIcon className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-purple-700">2,450 / 3,000 XP</span>
                <span className="text-sm font-medium text-purple-700">550 XP to next level</span>
              </div>
              <div className="w-full bg-purple-200 rounded-full h-4">
                <div 
                  className="h-4 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500" 
                  style={{ width: '82%' }}
                ></div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-white bg-opacity-70 rounded-xl">
                <div className="text-lg font-bold text-purple-600">+127</div>
                <div className="text-xs text-purple-500">XP This Week</div>
              </div>
              <div className="text-center p-3 bg-white bg-opacity-70 rounded-xl">
                <div className="text-lg font-bold text-purple-600">18</div>
                <div className="text-xs text-purple-500">Day Streak</div>
              </div>
              <div className="text-center p-3 bg-white bg-opacity-70 rounded-xl">
                <div className="text-lg font-bold text-purple-600">5</div>
                <div className="text-xs text-purple-500">Badges Earned</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'leaderboard' && (
        <LeaderboardTab leaderboardData={leaderboardData} />
      )}

      {activeTab === 'challenges' && (
        <ChallengesTab challenges={activeChallenges} />
      )}

      {activeTab === 'groups' && (
        <StudyGroupsTab groups={studyGroups} />
      )}
    </div>
  );
};

// Sub-components
interface StatsCardProps {
  icon: React.ComponentType<any>;
  value: string | number;
  label: string;
  color: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon: Icon, value, label, color }) => (
  <div 
    className="text-center p-6 rounded-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer group" 
    style={{ backgroundColor: color }}
  >
    <div 
      className="w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300" 
      style={{ backgroundColor: '#ffffff40' }}
    >
      <Icon className="w-6 h-6" style={{ color: '#363535' }} />
    </div>
    <div className="text-2xl font-bold" style={{ color: '#363535' }}>{value}</div>
    <p className="text-sm" style={{ color: '#363535' }}>{label}</p>
  </div>
);

const LeaderboardTab: React.FC<{ leaderboardData: any[] }> = ({ leaderboardData }) => (
  <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
    <div className="flex items-center justify-between mb-6">
      <h3 className="font-bold text-xl" style={{ color: '#363535' }}>🏆 Weekly Leaderboard</h3>
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-500">This Week</span>
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
      </div>
    </div>
    
    <div className="space-y-3">
      {leaderboardData.map((player, idx) => (
        <div 
          key={idx} 
          className={cn(
            "flex items-center justify-between p-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer",
            player.isUser 
              ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 shadow-md animate-pulse' 
              : 'bg-gray-50 border border-gray-200 hover:shadow-md'
          )}
        >
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-xl">{player.avatar}</div>
              <div className={cn("text-xs font-bold", player.isUser ? 'text-orange-600' : 'text-gray-600')}>
                #{player.rank}
              </div>
            </div>
            <div>
              <h4 className={cn("font-bold", player.isUser ? 'text-orange-800' : '')} style={{ color: player.isUser ? undefined : '#363535' }}>
                {player.name}
              </h4>
              <div className="flex items-center space-x-3 text-xs text-gray-500">
                <span>Level {player.level}</span>
                <span className="flex items-center">
                  <FireIcon className="w-3 h-3 mr-1 text-red-500" />
                  {player.streak}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className={cn("text-lg font-bold", player.isUser ? 'text-orange-600' : '')} style={{ color: player.isUser ? undefined : '#363535' }}>
              {player.score.toLocaleString()}
            </div>
            <div className="flex items-center justify-end">
              <span 
                className={cn(
                  "text-xs px-2 py-1 rounded-full font-medium",
                  player.change.startsWith('+') ? 'bg-green-100 text-green-600' :
                  player.change.startsWith('-') ? 'bg-red-100 text-red-600' :
                  'bg-gray-100 text-gray-600'
                )}
              >
                {player.change}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
    
    <div className="mt-6 text-center">
      <button 
        className="px-6 py-3 rounded-2xl font-semibold border-2 hover:bg-gray-50 transition-all duration-200"
        style={{ borderColor: '#363535', color: '#363535' }}
      >
        View Full Leaderboard
      </button>
    </div>
  </div>
);

const ChallengesTab: React.FC<{ challenges: any[] }> = ({ challenges }) => (
  <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
    <div className="flex items-center justify-between mb-6">
      <h3 className="font-bold text-xl" style={{ color: '#363535' }}>⚡ Active Challenges</h3>
      <span className="text-sm text-gray-500">{challenges.length} active</span>
    </div>
    
    <div className="space-y-4">
      {challenges.map((challenge, idx) => (
        <div 
          key={idx} 
          className="border-2 rounded-2xl p-4 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] cursor-pointer group" 
          style={{ borderColor: challenge.color, backgroundColor: `${challenge.color}15` }}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-bold text-lg" style={{ color: '#363535' }}>{challenge.title}</h4>
                <span 
                  className="px-2 py-1 text-xs font-medium rounded-full text-white"
                  style={{ backgroundColor: challenge.color }}
                >
                  {challenge.difficulty}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{challenge.description}</p>
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span>{challenge.participants} participants</span>
                <span>{challenge.timeLeft}</span>
              </div>
            </div>
            <div className="text-right ml-4">
              <div className="text-2xl font-bold" style={{ color: challenge.color }}>{challenge.progress}%</div>
              <div className="text-xs text-gray-500">Complete</div>
            </div>
          </div>
          
          <div className="mb-3">
            <div className="w-full bg-gray-200 rounded-full h-3 relative overflow-hidden">
              <div 
                className="h-3 rounded-full transition-all duration-1000 ease-out" 
                style={{ 
                  background: `linear-gradient(90deg, ${challenge.color}dd, ${challenge.color})`,
                  width: `${challenge.progress}%`
                }}
              ></div>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Reward:</span> {challenge.reward}
            </div>
          </div>
          
          <button 
            className="w-full px-4 py-2 rounded-xl font-medium text-white hover:opacity-90 transition-all duration-200"
            style={{ backgroundColor: challenge.color }}
          >
            Continue Challenge
          </button>
        </div>
      ))}
    </div>
  </div>
);

const StudyGroupsTab: React.FC<{ groups: any[] }> = ({ groups }) => (
  <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
    <div className="flex items-center justify-between mb-6">
      <h3 className="font-bold text-xl" style={{ color: '#363535' }}>👥 Your Study Groups</h3>
      <button 
        className="px-4 py-2 rounded-2xl font-semibold text-white hover:opacity-90 transition-all duration-200"
        style={{ backgroundColor: '#4ecdc4' }}
      >
        Create Group
      </button>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {groups.map((group, idx) => (
        <div key={idx} className="border-2 rounded-2xl p-6 hover:shadow-lg transition-all duration-300" style={{ borderColor: group.color, backgroundColor: `${group.color}15` }}>
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h4 className="font-bold text-lg mb-1" style={{ color: '#363535' }}>{group.name}</h4>
              <div className="flex items-center space-x-3 text-sm text-gray-600 mb-2">
                <span className="flex items-center">
                  <UsersIcon className="w-4 h-4 mr-1" />
                  {group.members} members
                </span>
                <span className={cn(
                  "px-2 py-1 rounded-full text-xs font-medium",
                  group.activity === 'Very Active' ? 'bg-green-100 text-green-600' :
                  group.activity === 'Active' ? 'bg-blue-100 text-blue-600' :
                  'bg-yellow-100 text-yellow-600'
                )}>
                  {group.activity}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{group.description}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mb-4 text-center">
            <div className="bg-white bg-opacity-70 rounded-lg p-2">
              <div className="font-bold text-sm" style={{ color: '#363535' }}>{group.stats.messages}</div>
              <div className="text-xs text-gray-500">Messages</div>
            </div>
            <div className="bg-white bg-opacity-70 rounded-lg p-2">
              <div className="font-bold text-sm" style={{ color: '#363535' }}>{group.stats.challenges}</div>
              <div className="text-xs text-gray-500">Challenges</div>
            </div>
            <div className="bg-white bg-opacity-70 rounded-lg p-2">
              <div className="font-bold text-sm" style={{ color: '#363535' }}>{group.stats.resources}</div>
              <div className="text-xs text-gray-500">Resources</div>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
            <span>Focus: {group.subject}</span>
            <span>Level: {group.level}</span>
          </div>
          
          <div className="text-xs text-gray-500 mb-4">
            Last activity: {group.lastActivity}
          </div>
          
          <div className="flex space-x-2">
            <button 
              className="flex-1 px-4 py-2 rounded-xl font-medium text-white hover:opacity-90 transition-all duration-200"
              style={{ backgroundColor: group.color }}
            >
              <ChatBubbleLeftRightIcon className="w-4 h-4 inline mr-2" />
              Open Chat
            </button>
            <button 
              className="px-4 py-2 rounded-xl font-medium border-2 hover:bg-gray-50 transition-all duration-200"
              style={{ borderColor: group.color, color: group.color }}
            >
              View
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default SocialView;
import React from 'react';
import { FireIcon, TrophyIcon, BookOpenIcon, CheckCircleIcon, DocumentTextIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { User, PerformanceStats, Module } from '../../types';
import { formatTime, cn } from '../../utils';
import { STUDY_MODULES } from '../../constants';

interface DashboardViewProps {
  user: User | null;
  stats: PerformanceStats;
  clatCountdown: { days: number; hours: number; minutes: number; seconds: number };
  onViewChange: (view: string) => void;
  onModuleClick: (moduleId: string) => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({
  user,
  stats,
  clatCountdown,
  onViewChange,
  onModuleClick
}) => {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl p-6 lg:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -ml-12 -mb-12"></div>
        <div className="relative z-10">
          <h2 className="text-2xl lg:text-3xl font-bold mb-2">Welcome back, {user?.name || 'Student'}! 🚀</h2>
          <p className="text-blue-100 mb-4">Ready to level up your CLAT preparation today?</p>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <FireIcon className="w-5 h-5 text-orange-300" />
              <span className="font-semibold">{stats.studyStreak} day streak</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrophyIcon className="w-5 h-5 text-yellow-300" />
              <span className="font-semibold">Rank #{stats.clatRank}</span>
            </div>
          </div>
        </div>
      </div>

      {/* CLAT 2026 Countdown Widget */}
      <div className="bg-gradient-to-r from-red-500 to-orange-600 rounded-3xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold flex items-center space-x-2">
              <TrophyIcon className="w-6 h-6" />
              <span>CLAT 2026</span>
            </h3>
            <p className="text-orange-100">December 07, 2025 • 2:00 PM - 4:00 PM</p>
          </div>
          <button 
            onClick={() => onViewChange('countdown')}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            View Details
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{clatCountdown.days.toString().padStart(2, '0')}</div>
            <div className="text-sm text-orange-200">Days</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{clatCountdown.hours.toString().padStart(2, '0')}</div>
            <div className="text-sm text-orange-200">Hours</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{clatCountdown.minutes.toString().padStart(2, '0')}</div>
            <div className="text-sm text-orange-200">Minutes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{clatCountdown.seconds.toString().padStart(2, '0')}</div>
            <div className="text-sm text-orange-200">Seconds</div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        <StatsCard
          title="CLAT Score"
          value={stats.averageScore}
          target={stats.targetScore}
          improvement={stats.monthlyImprovement}
          icon={TrophyIcon}
          colors={{ from: 'yellow-400', to: 'orange-500' }}
          status="Above Target"
        />
        
        <StatsCard
          title="Mock Tests"
          value={stats.testsCompleted}
          target={50}
          improvement={(stats.testsCompleted / 50) * 100}
          icon={BookOpenIcon}
          colors={{ from: 'blue-500', to: 'purple-600' }}
          status="On Track"
        />
        
        <StatsCard
          title="Study Streak"
          value={stats.studyStreak}
          target={30}
          icon={FireIcon}
          colors={{ from: 'red-500', to: 'pink-600' }}
          status="Streak Active"
          showStreakVisualization
        />
      </div>

      {/* Advanced Systems Quick Access */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">🚀 Advanced Learning Systems</h3>
            <p className="text-gray-600 mt-1">Exclusive premium features for serious aspirants</p>
          </div>
          <div className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full">
            <span className="text-sm font-medium text-purple-700">Premium</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PremiumSystemCard
            title="42-Page Analysis"
            subtitle="Complete Framework"
            description="Revolutionary mock test analysis with strategic planning, performance insights, and personalized improvement roadmaps."
            stats={[
              { label: 'Phases', value: '4' },
              { label: 'Pages', value: '42' },
              { label: 'AI Powered', value: '🤖' }
            ]}
            icon={DocumentTextIcon}
            colors="from-yellow-400 via-orange-500 to-red-500"
            onClick={() => onModuleClick('mock-test-analysis')}
            badge="✨ NEW"
            bottomText="Pre-Mock → Analysis → Planning"
          />

          <PremiumSystemCard
            title="Reading Mastery"
            subtitle="AI-Powered System"
            description="Comprehensive reading system with speed training, vocabulary mastery, and AI-powered comprehension analysis."
            stats={[
              { label: 'Words', value: '797' },
              { label: 'Lines', value: '3K+' },
              { label: 'Progress', value: '75%' }
            ]}
            icon={BookOpenIcon}
            colors="from-blue-500 via-indigo-600 to-purple-700"
            onClick={() => onModuleClick('reading-mastery')}
            badge="🤖 AI"
            bottomText="Speed + Comprehension + Vocab"
          />
        </div>

        {/* Performance Insights */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-lg" style={{ color: '#363535' }}>📊 Your Performance Insights</h4>
            <button 
              onClick={() => onViewChange('analytics')}
              className="text-blue-600 text-sm font-medium hover:text-blue-800"
            >
              View All →
            </button>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.averageScore}%</div>
              <div className="text-xs text-gray-500">Average Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.percentileRank}</div>
              <div className="text-xs text-gray-500">Percentile Rank</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.testsCompleted}</div>
              <div className="text-xs text-gray-500">Tests Complete</div>
            </div>
          </div>
        </div>
      </div>

      {/* Today's CLAT Study Schedule */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-xl" style={{ color: '#363535' }}>5 lessons today</h3>
          <p className="text-sm text-gray-500">Tuesday, Jan 30</p>
        </div>
        
        <div className="space-y-4">
          {STUDY_MODULES.map((module) => (
            <button
              key={module.id}
              onClick={() => onModuleClick(module.id)}
              className="w-full rounded-3xl p-4 lg:p-6 text-left hover:scale-105 transition-all duration-300 shadow-sm"
              style={{ backgroundColor: module.bgColor }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#363535' }}></div>
                  <div>
                    <h4 className="font-bold text-lg" style={{ color: '#363535' }}>
                      {module.title}
                      {module.priority && (
                        <span className="ml-2 px-2 py-1 bg-red-500 text-white text-xs rounded-full">
                          PRIORITY
                        </span>
                      )}
                    </h4>
                    <p className="text-sm opacity-70" style={{ color: '#363535' }}>{module.nextLesson}</p>
                    {module.description && (
                      <p className="text-xs opacity-60 mt-1" style={{ color: '#363535' }}>{module.description}</p>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-bold text-lg" style={{ color: '#363535' }}>{module.time}</span>
                  <div className="text-xs opacity-70" style={{ color: '#363535' }}>
                    {module.progress}% complete
                  </div>
                  <div className="text-xs opacity-60" style={{ color: '#363535' }}>
                    {module.stats.completed}/{module.stats.total} {module.id === 'mock-test-analysis' ? 'pages' : 'lessons'}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Sub-components
interface StatsCardProps {
  title: string;
  value: number;
  target?: number;
  improvement?: number;
  icon: React.ComponentType<any>;
  colors: { from: string; to: string };
  status: string;
  showStreakVisualization?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  target,
  improvement,
  icon: Icon,
  colors,
  status,
  showStreakVisualization
}) => {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
      <div className="flex items-center justify-between mb-4">
        <div className={cn("p-3 rounded-2xl bg-gradient-to-br", `from-${colors.from}`, `to-${colors.to}`)}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="text-right">
          <div className={cn("w-12 h-12 rounded-full bg-gradient-to-br flex items-center justify-center", `from-${colors.from}`, `to-${colors.to}`)}>
            <span className="text-white font-bold text-sm">
              {title === 'CLAT Score' ? (value >= (target || 85) ? '🎯' : '📈') :
               title === 'Mock Tests' ? (value >= 30 ? '🏆' : '📝') :
               value >= 30 ? '🔥' : '⚡'}
            </span>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <span className={cn("text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent", `from-${colors.from.replace('400', '600').replace('500', '600')}`, `to-${colors.to.replace('500', '600').replace('600', '600')}`)}>
          {value}
        </span>
        {target && <span className="text-lg text-gray-500 ml-1">/ {target}</span>}
      </div>
      <div className="flex items-center space-x-2 mb-2">
        <span className={cn("px-3 py-1 text-xs font-medium rounded-full flex items-center space-x-1",
          status === 'Above Target' ? 'text-yellow-700' : 
          status === 'On Track' ? 'bg-green-100 text-green-700' : 
          'bg-orange-100 text-orange-700'
        )}
        style={status === 'Above Target' ? { backgroundColor: '#ffdd6d', color: '#363535' } : {}}
        >
          <span>{status}</span>
          {status !== 'Streak Active' ? <CheckCircleIcon className="w-3 h-3" /> : <FireIcon className="w-3 h-3" />}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">{title}</p>
        <p className={cn("text-sm font-medium",
          title === 'CLAT Score' ? 'text-green-600' :
          title === 'Mock Tests' ? 'text-blue-600' : 'text-red-600'
        )}>
          {title === 'CLAT Score' ? `+${improvement}% this month` :
           title === 'Mock Tests' ? `${improvement?.toFixed(0)}% complete` :
           'Keep it up!'}
        </p>
      </div>
      
      {/* Progress bar or streak visualization */}
      <div className="mt-3">
        {showStreakVisualization ? (
          <div className="flex items-center space-x-1">
            {[...Array(7)].map((_, i) => (
              <div 
                key={i}
                className={cn("w-4 h-4 rounded-full transition-all duration-300",
                  i < (value % 7) ? `bg-gradient-to-br from-${colors.from} to-${colors.to}` : 'bg-gray-200'
                )}
              ></div>
            ))}
          </div>
        ) : (
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={cn("h-2 rounded-full bg-gradient-to-r transition-all duration-1000 ease-out", `from-${colors.from}`, `to-${colors.to}`)}
              style={{ width: `${target ? (value / target) * 100 : improvement}%` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

interface PremiumSystemCardProps {
  title: string;
  subtitle: string;
  description: string;
  stats: { label: string; value: string }[];
  icon: React.ComponentType<any>;
  colors: string;
  onClick: () => void;
  badge: string;
  bottomText: string;
}

const PremiumSystemCard: React.FC<PremiumSystemCardProps> = ({
  title,
  subtitle,
  description,
  stats,
  icon: Icon,
  colors,
  onClick,
  badge,
  bottomText
}) => {
  return (
    <div className="group">
      <div 
        className={cn("bg-gradient-to-br rounded-3xl p-8 shadow-xl border cursor-pointer hover:shadow-2xl transition-all duration-500 transform hover:scale-105 relative overflow-hidden", colors)}
        onClick={onClick}
        style={{ transform: title === 'Reading Mastery' ? 'hover:rotate(-1deg)' : 'hover:rotate(1deg)' }}
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white bg-opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white bg-opacity-10 rounded-full -ml-12 -mb-12 group-hover:scale-110 transition-transform duration-500"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-white bg-opacity-20 rounded-2xl backdrop-blur-sm">
                <Icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h4 className="font-bold text-white text-xl">{title}</h4>
                <p className="text-white text-sm opacity-90">{subtitle}</p>
              </div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-full px-3 py-1 backdrop-blur-sm">
              <span className="text-white text-xs font-bold">{badge}</span>
            </div>
          </div>
          
          <p className="text-white text-sm mb-4 opacity-90 leading-relaxed">
            {description}
          </p>
          
          <div className="grid grid-cols-3 gap-3 mb-4">
            {stats.map(({ label, value }) => (
              <div key={label} className="bg-white bg-opacity-20 rounded-lg p-3 text-center backdrop-blur-sm group-hover:bg-opacity-30 transition-all duration-300">
                <div className="text-white font-bold text-lg">{value}</div>
                <div className="text-white text-xs opacity-75">{label}</div>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-white">
              <div className="text-sm opacity-90 flex items-center space-x-2">
                {title === '42-Page Analysis' ? <TrophyIcon className="w-4 h-4" /> : <SparklesIcon className="w-4 h-4" />}
                <span>{bottomText}</span>
              </div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-full p-2 group-hover:bg-opacity-30 transition-all duration-300">
              <span className="text-white">→</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
import React, { useState, useEffect } from 'react';
import { 
  ChartBarIcon, ClockIcon, FireIcon, TrophyIcon, BookOpenIcon, 
  SparklesIcon, StarIcon, BoltIcon, HeartIcon, MusicalNoteIcon,
  CalendarDaysIcon, UserGroupIcon, AcademicCapIcon, LightBulbIcon,
  ArrowTrendingUpIcon, GiftIcon, ShieldCheckIcon, RocketLaunchIcon,
  ArrowLeftIcon, ShareIcon, DocumentArrowDownIcon
} from '@heroicons/react/24/outline';
import { User } from '../types';
import { cn, formatTime } from '../utils';

interface WeeklyStudyInsightsProps {
  user: User | null;
  onClose: () => void;
}

const WeeklyStudyInsights: React.FC<WeeklyStudyInsightsProps> = ({ user, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Mock weekly data - in real app, this would come from analytics API
  const weeklyData = {
    weekOf: 'July 22-28, 2025',
    totalStudyTime: 18.5, // hours
    totalQuestions: 347,
    averageAccuracy: 84.3,
    streakDays: 6,
    topSubject: 'Legal Reasoning',
    topSubjectHours: 6.2,
    mostActiveTime: '10:00 AM',
    bestPerformanceDay: 'Wednesday',
    xpEarned: 425,
    challengesCompleted: 3,
    leaderboardPosition: 12,
    studyGroupInteractions: 28,
    personalBests: [
      { category: 'Reading Speed', value: '287 WPM', improvement: '+12%' },
      { category: 'Mock Test Score', value: '82%', improvement: '+5%' },
      { category: 'Daily Streak', value: '18 days', improvement: 'New Record!' }
    ],
    weeklyGoals: {
      studyTime: { target: 20, achieved: 18.5, percentage: 92.5 },
      questions: { target: 300, achieved: 347, percentage: 115.7 },
      accuracy: { target: 80, achieved: 84.3, percentage: 105.4 }
    },
    communityStats: {
      rank: 12,
      totalStudents: 2847,
      percentile: 89.2,
      regionalRank: 3
    },
    insights: [
      "You're most focused during morning sessions (10-12 AM) with 91% accuracy",
      "Legal Reasoning is your strongest subject this week (+8% improvement)",
      "You outperformed 89% of students in your region",
      "Wednesday was your most productive day with 4.2 hours of study"
    ],
    nextWeekRecommendations: [
      "Focus 30% more time on Quantitative Techniques",
      "Join the 'Morning Warriors' study group for peak performance",
      "Take the Advanced Mock Test Challenge for bonus XP",
      "Maintain your 18-day streak - you're close to a milestone!"
    ]
  };

  const slides = [
    { id: 'intro', title: 'Your Week in Learning', component: IntroSlide },
    { id: 'stats', title: 'Study Statistics', component: StatsSlide },
    { id: 'performance', title: 'Performance Highlights', component: PerformanceSlide },
    { id: 'community', title: 'Community Impact', component: CommunitySlide },
    { id: 'insights', title: 'AI Insights', component: InsightsSlide },
    { id: 'goals', title: 'Weekly Goals', component: GoalsSlide },
    { id: 'recommendations', title: 'Next Week', component: RecommendationsSlide }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide(prev => prev + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentSlide(prev => prev - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const goToSlide = (index: number) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentSlide(index);
      setIsAnimating(false);
    }, 300);
  };

  const CurrentSlideComponent = slides[currentSlide].component;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-3xl w-full max-w-4xl h-[90vh] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 transform rotate-45 scale-150"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transform translate-x-32 translate-y-32"></div>
        </div>

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between p-6 border-b border-white border-opacity-20">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-all duration-200"
          >
            <ArrowLeftIcon className="w-6 h-6 text-white" />
          </button>
          
          <div className="text-center flex-1">
            <h1 className="text-xl font-bold text-white">📊 Weekly Study Insights</h1>
            <p className="text-purple-200 text-sm">{weeklyData.weekOf}</p>
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-all duration-200">
              <ShareIcon className="w-5 h-5 text-white" />
            </button>
            <button className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-all duration-200">
              <DocumentArrowDownIcon className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="relative z-10 px-6 py-3">
          <div className="flex items-center space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  index === currentSlide ? "bg-white w-8" : "bg-white bg-opacity-30 w-2"
                )}
              />
            ))}
          </div>
        </div>

        {/* Slide Content */}
        <div className={cn(
          "relative z-10 flex-1 px-6 pb-6 transition-all duration-300",
          isAnimating ? "opacity-0 transform scale-95" : "opacity-100 transform scale-100"
        )}>
          <CurrentSlideComponent data={weeklyData} user={user} />
        </div>

        {/* Navigation */}
        <div className="relative z-10 flex items-center justify-between p-6 border-t border-white border-opacity-20">
          <button 
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className={cn(
              "px-6 py-3 rounded-xl font-medium transition-all duration-200",
              currentSlide === 0 
                ? "bg-gray-600 text-gray-400 cursor-not-allowed" 
                : "bg-white bg-opacity-20 text-white hover:bg-opacity-30"
            )}
          >
            Previous
          </button>

          <div className="text-center">
            <div className="text-white font-medium">{slides[currentSlide].title}</div>
            <div className="text-purple-200 text-sm">{currentSlide + 1} of {slides.length}</div>
          </div>

          <button 
            onClick={currentSlide === slides.length - 1 ? onClose : nextSlide}
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
          >
            {currentSlide === slides.length - 1 ? 'Done' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Slide Components
const IntroSlide: React.FC<{ data: any; user: any }> = ({ data, user }) => (
  <div className="h-full flex flex-col items-center justify-center text-center space-y-8">
    <div className="text-8xl animate-bounce">🎯</div>
    <div>
      <h2 className="text-4xl font-bold text-white mb-4">
        Welcome back, {user?.name || 'Student'}!
      </h2>
      <p className="text-xl text-purple-200 mb-6">
        Here's your personalized weekly study recap
      </p>
      <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
        {data.totalStudyTime}h
      </div>
      <p className="text-lg text-purple-200 mt-2">
        Total study time this week
      </p>
    </div>
    <div className="flex items-center space-x-6 text-white">
      <div className="text-center">
        <div className="text-2xl font-bold text-green-400">{data.totalQuestions}</div>
        <div className="text-sm text-purple-200">Questions Solved</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-blue-400">{data.averageAccuracy}%</div>
        <div className="text-sm text-purple-200">Average Accuracy</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-orange-400">{data.streakDays}</div>
        <div className="text-sm text-purple-200">Study Days</div>
      </div>
    </div>
  </div>
);

const StatsSlide: React.FC<{ data: any; user: any }> = ({ data }) => (
  <div className="h-full flex flex-col justify-center space-y-8">
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-white mb-2">📈 Your Study Statistics</h2>
      <p className="text-purple-200">Breaking down your learning journey</p>
    </div>

    <div className="grid grid-cols-2 gap-6">
      <StatCard
        icon={ClockIcon}
        title="Total Study Time"
        value={`${data.totalStudyTime}h`}
        subtitle="That's 2.6 hours daily!"
        color="from-blue-500 to-cyan-500"
      />
      <StatCard
        icon={BookOpenIcon}
        title="Questions Solved"
        value={data.totalQuestions}
        subtitle="49 questions per day"
        color="from-green-500 to-emerald-500"
      />
      <StatCard
        icon={TrophyIcon}
        title="Average Accuracy"
        value={`${data.averageAccuracy}%`}
        subtitle="+3.2% from last week"
        color="from-yellow-500 to-orange-500"
      />
      <StatCard
        icon={FireIcon}
        title="Study Streak"
        value={`${data.streakDays} days`}
        subtitle="Keep it burning! 🔥"
        color="from-red-500 to-pink-500"
      />
    </div>

    <div className="bg-white bg-opacity-10 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-4">Subject Breakdown</h3>
      <div className="space-y-3">
        <SubjectBar subject="Legal Reasoning" hours={6.2} total={data.totalStudyTime} color="#4ade80" />
        <SubjectBar subject="Reading Comprehension" hours={4.8} total={data.totalStudyTime} color="#3b82f6" />
        <SubjectBar subject="Logical Reasoning" hours={3.9} total={data.totalStudyTime} color="#f59e0b" />
        <SubjectBar subject="Current Affairs" hours={2.3} total={data.totalStudyTime} color="#ef4444" />
        <SubjectBar subject="Quantitative" hours={1.3} total={data.totalStudyTime} color="#8b5cf6" />
      </div>
    </div>
  </div>
);

const PerformanceSlide: React.FC<{ data: any; user: any }> = ({ data }) => (
  <div className="h-full flex flex-col justify-center space-y-8">
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-white mb-2">🏆 Performance Highlights</h2>
      <p className="text-purple-200">Your personal bests this week</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {data.personalBests.map((best: any, index: number) => (
        <div key={index} className="bg-gradient-to-br from-white from-opacity-10 to-transparent rounded-2xl p-6 text-center">
          <div className="text-4xl mb-4">
            {index === 0 ? '⚡' : index === 1 ? '🎯' : '🔥'}
          </div>
          <h3 className="text-lg font-bold text-white mb-2">{best.category}</h3>
          <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-2">
            {best.value}
          </div>
          <div className="text-sm text-green-400 font-medium">{best.improvement}</div>
        </div>
      ))}
    </div>

    <div className="bg-white bg-opacity-10 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-4">Peak Performance Insights</h3>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="text-sm text-purple-200 mb-1">Most Active Time</div>
          <div className="text-2xl font-bold text-white">{data.mostActiveTime}</div>
          <div className="text-sm text-green-400">91% accuracy during this hour</div>
        </div>
        <div>
          <div className="text-sm text-purple-200 mb-1">Best Performance Day</div>
          <div className="text-2xl font-bold text-white">{data.bestPerformanceDay}</div>
          <div className="text-sm text-green-400">4.2 hours of focused study</div>
        </div>
      </div>
    </div>
  </div>
);

const CommunitySlide: React.FC<{ data: any; user: any }> = ({ data }) => (
  <div className="h-full flex flex-col justify-center space-y-8">
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-white mb-2">🌟 Community Impact</h2>
      <p className="text-purple-200">Your position in the CLAT community</p>
    </div>

    <div className="text-center mb-8">
      <div className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
        #{data.communityStats.rank}
      </div>
      <div className="text-xl text-white mt-2">out of {data.communityStats.totalStudents.toLocaleString()} students</div>
      <div className="text-lg text-purple-200 mt-2">
        You're in the top {(100 - data.communityStats.percentile).toFixed(1)}%!
      </div>
    </div>

    <div className="grid grid-cols-2 gap-6">
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-center">
        <UserGroupIcon className="w-12 h-12 text-white mx-auto mb-4" />
        <div className="text-2xl font-bold text-white">{data.studyGroupInteractions}</div>
        <div className="text-blue-200 text-sm">Study Group Interactions</div>
        <div className="text-green-400 text-sm mt-1">+40% from last week</div>
      </div>
      <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-6 text-center">
        <GiftIcon className="w-12 h-12 text-white mx-auto mb-4" />
        <div className="text-2xl font-bold text-white">{data.xpEarned}</div>
        <div className="text-purple-200 text-sm">XP Earned This Week</div>
        <div className="text-green-400 text-sm mt-1">Personal record!</div>
      </div>
    </div>

    <div className="bg-white bg-opacity-10 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-4">Regional Performance</h3>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-purple-200">Regional Rank</div>
          <div className="text-3xl font-bold text-yellow-400">#{data.communityStats.regionalRank}</div>
        </div>
        <div className="text-6xl">🏆</div>
        <div className="text-right">
          <div className="text-sm text-purple-200">Percentile</div>
          <div className="text-3xl font-bold text-green-400">{data.communityStats.percentile}%</div>
        </div>
      </div>
    </div>
  </div>
);

const InsightsSlide: React.FC<{ data: any; user: any }> = ({ data }) => (
  <div className="h-full flex flex-col justify-center space-y-8">
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-white mb-2">🧠 AI-Powered Insights</h2>
      <p className="text-purple-200">Personalized analysis of your study patterns</p>
    </div>

    <div className="space-y-4">
      {data.insights.map((insight: string, index: number) => (
        <div key={index} className="bg-gradient-to-r from-white from-opacity-10 to-transparent rounded-2xl p-6 flex items-start space-x-4">
          <div className="text-2xl">
            {index === 0 ? '🎯' : index === 1 ? '📈' : index === 2 ? '🏆' : '⭐'}
          </div>
          <div>
            <div className="text-white font-medium">{insight}</div>
          </div>
        </div>
      ))}
    </div>

    <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-4">🔮 AI Prediction</h3>
      <div className="text-lg text-white">
        Based on your current progress and consistency, you're on track to achieve a 
        <span className="text-yellow-400 font-bold"> 85+ score</span> in CLAT 2026!
      </div>
      <div className="text-purple-200 text-sm mt-2">
        Keep maintaining your study streak and focus areas for optimal results.
      </div>
    </div>
  </div>
);

const GoalsSlide: React.FC<{ data: any; user: any }> = ({ data }) => (
  <div className="h-full flex flex-col justify-center space-y-8">
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-white mb-2">🎯 Weekly Goals Achievement</h2>
      <p className="text-purple-200">How did you perform against your targets?</p>
    </div>

    <div className="space-y-6">
      <GoalCard
        title="Study Time Goal"
        target={data.weeklyGoals.studyTime.target}
        achieved={data.weeklyGoals.studyTime.achieved}
        percentage={data.weeklyGoals.studyTime.percentage}
        unit="hours"
        icon={ClockIcon}
      />
      <GoalCard
        title="Questions Goal"
        target={data.weeklyGoals.questions.target}
        achieved={data.weeklyGoals.questions.achieved}
        percentage={data.weeklyGoals.questions.percentage}
        unit="questions"
        icon={BookOpenIcon}
      />
      <GoalCard
        title="Accuracy Goal"
        target={data.weeklyGoals.accuracy.target}
        achieved={data.weeklyGoals.accuracy.achieved}
        percentage={data.weeklyGoals.accuracy.percentage}
        unit="%"
        icon={TrophyIcon}
      />
    </div>

    <div className="text-center">
      <div className="text-6xl mb-4">🎉</div>
      <div className="text-xl text-white font-bold">
        Exceeded 2 out of 3 goals!
      </div>
      <div className="text-purple-200 text-sm mt-2">
        Amazing consistency this week
      </div>
    </div>
  </div>
);

const RecommendationsSlide: React.FC<{ data: any; user: any }> = ({ data }) => (
  <div className="h-full flex flex-col justify-center space-y-8">
    <div className="text-center mb-8">
      <h2 className="text-3xl font-bold text-white mb-2">🚀 Next Week's Action Plan</h2>
      <p className="text-purple-200">AI-powered recommendations for continued growth</p>
    </div>

    <div className="space-y-4">
      {data.nextWeekRecommendations.map((recommendation: string, index: number) => (
        <div key={index} className="bg-gradient-to-r from-white from-opacity-10 to-transparent rounded-2xl p-6 flex items-start space-x-4">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-2">
            <span className="text-white font-bold text-sm">{index + 1}</span>
          </div>
          <div>
            <div className="text-white font-medium">{recommendation}</div>
          </div>
        </div>
      ))}
    </div>

    <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-6 text-center">
      <div className="text-6xl mb-4">💪</div>
      <div className="text-xl font-bold text-white mb-2">
        You're on the right track!
      </div>
      <div className="text-green-200">
        Keep up the momentum and watch your CLAT dreams come true
      </div>
    </div>
  </div>
);

// Helper Components
const StatCard: React.FC<{ icon: any; title: string; value: string | number; subtitle: string; color: string }> = ({ icon: Icon, title, value, subtitle, color }) => (
  <div className={cn("bg-gradient-to-br rounded-2xl p-6 text-center", color)}>
    <Icon className="w-12 h-12 text-white mx-auto mb-4" />
    <div className="text-3xl font-bold text-white mb-2">{value}</div>
    <div className="text-white text-sm mb-1">{title}</div>
    <div className="text-white text-opacity-80 text-xs">{subtitle}</div>
  </div>
);

const SubjectBar: React.FC<{ subject: string; hours: number; total: number; color: string }> = ({ subject, hours, total, color }) => {
  const percentage = (hours / total) * 100;
  return (
    <div className="flex items-center space-x-4">
      <div className="w-32 text-white text-sm">{subject}</div>
      <div className="flex-1 bg-white bg-opacity-20 rounded-full h-3 relative">
        <div 
          className="h-3 rounded-full transition-all duration-1000"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        ></div>
      </div>
      <div className="text-white text-sm w-12 text-right">{hours}h</div>
    </div>
  );
};

const GoalCard: React.FC<{ title: string; target: number; achieved: number; percentage: number; unit: string; icon: any }> = ({ title, target, achieved, percentage, unit, icon: Icon }) => (
  <div className="bg-white bg-opacity-10 rounded-2xl p-6">
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-3">
        <Icon className="w-8 h-8 text-white" />
        <div>
          <div className="text-white font-bold">{title}</div>
          <div className="text-purple-200 text-sm">{achieved} / {target} {unit}</div>
        </div>
      </div>
      <div className={cn(
        "text-2xl font-bold",
        percentage >= 100 ? "text-green-400" : percentage >= 80 ? "text-yellow-400" : "text-red-400"
      )}>
        {percentage.toFixed(0)}%
      </div>
    </div>
    <div className="w-full bg-white bg-opacity-20 rounded-full h-3">
      <div 
        className={cn(
          "h-3 rounded-full transition-all duration-1000",
          percentage >= 100 ? "bg-green-500" : percentage >= 80 ? "bg-yellow-500" : "bg-red-500"
        )}
        style={{ width: `${Math.min(percentage, 100)}%` }}
      ></div>
    </div>
  </div>
);

export default WeeklyStudyInsights;
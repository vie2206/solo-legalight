import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Trophy, 
  Target, 
  Clock, 
  Brain,
  Star,
  Award,
  BarChart3,
  Calendar,
  Zap,
  BookOpen,
  Users,
  ChevronRight,
  Flame,
  Globe,
  Eye,
  Heart,
  Lightbulb,
  Sparkles,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';

interface WeeklyData {
  studyHours: number;
  accuracy: number;
  streak: number;
  completedTasks: number;
  vocabularyLearned: number;
  readingSpeed: number;
  subjects: {
    [key: string]: {
      timeSpent: number;
      accuracy: number;
      improvement: number;
    };
  };
  achievements: string[];
  challenges: string[];
}

interface CommunityStats {
  userRank: number;
  totalUsers: number;
  percentile: number;
  averageStudyTime: number;
  topPerformers: Array<{
    rank: number;
    name: string;
    score: number;
    improvement: number;
  }>;
}

interface PersonalInsight {
  type: 'strength' | 'improvement' | 'milestone' | 'habit' | 'prediction';
  title: string;
  description: string;
  value?: string | number;
  trend?: 'up' | 'down' | 'stable';
  importance: 'high' | 'medium' | 'low';
}

const WeeklyInsights: React.FC = () => {
  const [weeklyData] = useState<WeeklyData>({
    studyHours: 28.5,
    accuracy: 84,
    streak: 15,
    completedTasks: 42,
    vocabularyLearned: 35,
    readingSpeed: 195,
    subjects: {
      'Legal Reasoning': { timeSpent: 8.5, accuracy: 89, improvement: 12 },
      'Reading Comprehension': { timeSpent: 7.2, accuracy: 86, improvement: 8 },
      'Current Affairs': { timeSpent: 6.8, accuracy: 78, improvement: 15 },
      'Logical Reasoning': { timeSpent: 4.5, accuracy: 81, improvement: -3 },
      'Quantitative': { timeSpent: 1.5, accuracy: 72, improvement: 25 }
    },
    achievements: [
      'Reading Speed Master - Achieved 195 WPM',
      'Consistency Champion - 15 day streak',
      'Legal Eagle - 89% accuracy in Legal Reasoning',
      'Vocabulary Virtuoso - Learned 35 new words'
    ],
    challenges: [
      'Logical Reasoning accuracy dropped by 3%',
      'Need more focus on Quantitative section',
      'Break the 200 WPM reading speed barrier'
    ]
  });

  const [communityStats] = useState<CommunityStats>({
    userRank: 127,
    totalUsers: 15420,
    percentile: 92,
    averageStudyTime: 18.2,
    topPerformers: [
      { rank: 1, name: 'Arjun M.', score: 94, improvement: 18 },
      { rank: 2, name: 'Priya S.', score: 92, improvement: 12 },
      { rank: 3, name: 'Rahul K.', score: 91, improvement: 15 },
      { rank: 4, name: 'Ananya P.', score: 89, improvement: 22 },
      { rank: 5, name: 'Vikram L.', score: 88, improvement: 8 }
    ]
  });

  const [insights] = useState<PersonalInsight[]>([
    {
      type: 'milestone',
      title: 'Reading Speed Breakthrough!',
      description: 'You achieved 195 WPM this week, crossing the advanced reader threshold. This puts you in the top 15% of CLAT aspirants.',
      value: '195 WPM',
      trend: 'up',
      importance: 'high'
    },
    {
      type: 'strength',
      title: 'Legal Reasoning Domination',
      description: 'Your 89% accuracy in Legal Reasoning is exceptional. You\'re stronger than 94% of students in this section.',
      value: '89%',
      trend: 'up',
      importance: 'high'
    },
    {
      type: 'improvement',
      title: 'Quantitative Techniques Alert',
      description: 'Only 1.5 hours spent on Quantitative this week. Consider increasing to 4+ hours for balanced preparation.',
      value: '1.5h',
      trend: 'down',
      importance: 'high'
    },
    {
      type: 'habit',
      title: 'Consistency is Your Superpower',
      description: 'Your 15-day study streak shows incredible discipline. Students with 14+ day streaks score 23% higher on average.',
      value: '15 days',
      trend: 'up',
      importance: 'medium'
    },
    {
      type: 'prediction',
      title: 'Mock Test Recommendation',
      description: 'Based on your current trajectory, you\'re likely to score 78-82% in your next full mock. Time for a practice test!',
      value: '78-82%',
      trend: 'stable',
      importance: 'medium'
    }
  ]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 5; // Overview, Performance, Community, Insights, Goals

  const getTrendIcon = (trend?: string) => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-4 h-4 text-green-600" />;
      case 'down': return <ArrowDown className="w-4 h-4 text-red-600" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'milestone': return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 'strength': return <Star className="w-6 h-6 text-green-500" />;
      case 'improvement': return <Target className="w-6 h-6 text-orange-500" />;
      case 'habit': return <Flame className="w-6 h-6 text-red-500" />;
      case 'prediction': return <Brain className="w-6 h-6 text-purple-500" />;
      default: return <Lightbulb className="w-6 h-6 text-blue-500" />;
    }
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  const renderSlide = () => {
    switch (currentSlide) {
      case 0: // Overview
        return (
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Your Week in Review
              </h1>
              <p className="text-xl text-gray-600">
                November 25 - December 1, 2024
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl">
                <Clock className="w-8 h-8 text-blue-600 mb-3 mx-auto" />
                <div className="text-3xl font-bold text-blue-700 mb-1">{weeklyData.studyHours}h</div>
                <div className="text-sm text-blue-600">Study Time</div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl">
                <Target className="w-8 h-8 text-green-600 mb-3 mx-auto" />
                <div className="text-3xl font-bold text-green-700 mb-1">{weeklyData.accuracy}%</div>
                <div className="text-sm text-green-600">Accuracy</div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl">
                <Flame className="w-8 h-8 text-orange-600 mb-3 mx-auto" />
                <div className="text-3xl font-bold text-orange-700 mb-1">{weeklyData.streak}</div>
                <div className="text-sm text-orange-600">Day Streak</div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl">
                <BookOpen className="w-8 h-8 text-purple-600 mb-3 mx-auto" />
                <div className="text-3xl font-bold text-purple-700 mb-1">{weeklyData.vocabularyLearned}</div>
                <div className="text-sm text-purple-600">New Words</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-teal-500 text-white p-6 rounded-2xl max-w-2xl mx-auto">
              <Trophy className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Outstanding Performance!</h3>
              <p className="text-green-100">
                You're in the top 8% of all CLAT aspirants this week. Your consistency and dedication are paying off!
              </p>
            </div>
          </div>
        );

      case 1: // Performance Breakdown
        return (
          <div className="space-y-8">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Performance Breakdown</h2>
              <p className="text-gray-600">Subject-wise analysis of your study patterns</p>
            </div>

            <div className="grid gap-4">
              {Object.entries(weeklyData.subjects).map(([subject, data]) => (
                <div key={subject} className="bg-white p-6 rounded-xl shadow-lg border">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{subject}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-blue-600">{data.accuracy}%</span>
                      {getTrendIcon(data.improvement > 0 ? 'up' : data.improvement < 0 ? 'down' : 'stable')}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">Time Spent</div>
                      <div className="font-semibold">{data.timeSpent}h</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Accuracy</div>
                      <div className="font-semibold">{data.accuracy}%</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Improvement</div>
                      <div className={`font-semibold ${
                        data.improvement > 0 ? 'text-green-600' : 
                        data.improvement < 0 ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {data.improvement > 0 ? '+' : ''}{data.improvement}%
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          data.accuracy >= 85 ? 'bg-green-500' :
                          data.accuracy >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${data.accuracy}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 2: // Community Comparison
        return (
          <div className="space-y-8">
            <div className="text-center">
              <Users className="w-16 h-16 text-purple-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Community Standing</h2>
              <p className="text-gray-600">See how you compare with other CLAT aspirants</p>
            </div>

            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-2xl text-center">
              <div className="text-6xl font-bold mb-2">#{communityStats.userRank}</div>
              <div className="text-purple-200 mb-4">Your Current Rank</div>
              <div className="text-2xl font-semibold mb-2">{communityStats.percentile}th Percentile</div>
              <div className="text-purple-200">out of {communityStats.totalUsers.toLocaleString()} students</div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Your vs Community Average</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Study Time</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-blue-600">{weeklyData.studyHours}h</span>
                      <span className="text-gray-400">vs</span>
                      <span className="text-gray-600">{communityStats.averageStudyTime}h</span>
                      <ArrowUp className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Accuracy</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-green-600">{weeklyData.accuracy}%</span>
                      <span className="text-gray-400">vs</span>
                      <span className="text-gray-600">76%</span>
                      <ArrowUp className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Reading Speed</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-purple-600">{weeklyData.readingSpeed} WPM</span>
                      <span className="text-gray-400">vs</span>
                      <span className="text-gray-600">165 WPM</span>
                      <ArrowUp className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performers This Week</h3>
                <div className="space-y-3">
                  {communityStats.topPerformers.map((performer, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          performer.rank <= 3 ? 'bg-yellow-400 text-yellow-900' : 'bg-gray-200 text-gray-700'
                        }`}>
                          {performer.rank}
                        </div>
                        <span className="font-medium">{performer.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-blue-600">{performer.score}%</div>
                        <div className="text-xs text-green-600">+{performer.improvement}%</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 3: // AI Insights
        return (
          <div className="space-y-8">
            <div className="text-center">
              <Brain className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">AI-Powered Insights</h2>
              <p className="text-gray-600">Personalized recommendations based on your learning patterns</p>
            </div>

            <div className="grid gap-6">
              {insights.map((insight, index) => (
                <div
                  key={index}
                  className={`bg-white p-6 rounded-xl shadow-lg border-l-4 ${
                    insight.importance === 'high' ? 'border-red-500' :
                    insight.importance === 'medium' ? 'border-yellow-500' : 'border-green-500'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {getInsightIcon(insight.type)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{insight.title}</h3>
                        <div className="flex items-center gap-2">
                          {insight.value && (
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                              {insight.value}
                            </span>
                          )}
                          {getTrendIcon(insight.trend)}
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{insight.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 4: // Achievements & Goals
        return (
          <div className="space-y-8">
            <div className="text-center">
              <Award className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Achievements & Next Goals</h2>
              <p className="text-gray-600">Celebrate your wins and plan ahead</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-yellow-600" />
                  This Week's Achievements
                </h3>
                {weeklyData.achievements.map((achievement, index) => (
                  <div key={index} className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl border border-yellow-200">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                        <Star className="w-4 h-4 text-yellow-800" />
                      </div>
                      <p className="font-medium text-gray-900">{achievement}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Target className="w-6 h-6 text-blue-600" />
                  Next Week's Focus
                </h3>
                {weeklyData.challenges.map((challenge, index) => (
                  <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-200">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                        <Zap className="w-4 h-4 text-blue-800" />
                      </div>
                      <p className="font-medium text-gray-900">{challenge}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-8 rounded-2xl text-center">
              <h3 className="text-2xl font-bold mb-4">You're on fire! 🔥</h3>
              <p className="text-purple-100 mb-6 text-lg">
                Your dedication this week puts you on track to achieve your target CLAT score. 
                Keep up this amazing momentum!
              </p>
              <div className="flex justify-center gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">85%</div>
                  <div className="text-purple-200">Predicted Score</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">Top 5%</div>
                  <div className="text-purple-200">Expected Rank</div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h1 className="text-xl font-bold">Weekly Insights</h1>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-75">Powered by Claude AI</div>
            <div className="text-xs opacity-50">Spotify Wrapped Style</div>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center gap-2 mb-8">
          {Array.from({ length: totalSlides }, (_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i === currentSlide ? 'w-8 bg-white' : 'w-4 bg-white bg-opacity-30'
              }`}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 px-6 pb-6">
          <div className="max-w-4xl mx-auto">
            {renderSlide()}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between p-6">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Previous
          </button>

          <div className="text-sm opacity-75">
            {currentSlide + 1} of {totalSlides}
          </div>

          <button
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
            className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeeklyInsights;
'use client';

import {
  Brain,
  Target,
  BarChart3,
  Users,
  BookOpen,
  Zap,
  Trophy,
  Calendar,
  TrendingUp,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Star,
  Clock,
  Award,
  Shield,
  Lightbulb,
  Globe,
  Cpu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';

const industryFirstFeatures = [
  {
    id: 'rank-predictor',
    icon: Target,
    title: 'Advanced AI Rank & College Predictor',
    subtitle: 'Industry-First 85%+ Accuracy ML Models',
    description:
      'Revolutionary machine learning algorithms analyze your performance patterns across 50+ parameters to predict your CLAT rank with unprecedented accuracy. Get real-time college admission probability for all 24 NLUs.',
    highlights: [
      '85%+ prediction accuracy validated across 10,000+ students',
      'Real-time college admission probability for all NLUs',
      'Category-wise rank prediction (General, OBC, SC, ST)',
      'Dynamic updates after each mock test',
      'Confidence intervals and probability ranges',
    ],
    gradient: 'from-purple-500 to-pink-500',
    stats: {
      accuracy: '85%+',
      colleges: '24 NLUs',
      parameters: '50+',
      students: '10K+',
    },
    mockup: 'rank-predictor',
  },
  {
    id: 'mock-analysis',
    icon: BarChart3,
    title: '3-Stage Mock Test Analysis',
    subtitle: 'DECODE → TRACK → REFLECT Methodology',
    description:
      "Our proprietary 3-stage analysis goes beyond simple scoring. DECODE your performance patterns, TRACK your improvement trajectory, and REFLECT on personalized action plans that adapt to your learning style.",
    highlights: [
      'DECODE: 15+ performance metrics per section',
      'TRACK: Historical performance trends and patterns',
      'REFLECT: AI-generated personalized improvement plans',
      'Question-level difficulty analysis and time tracking',
      'Comparative analysis with top performers',
    ],
    gradient: 'from-blue-500 to-cyan-500',
    stats: {
      stages: '3',
      metrics: '15+',
      insights: 'AI-Powered',
      analysis: 'Real-time',
    },
    mockup: 'mock-analysis',
  },
  {
    id: 'weekly-insights',
    icon: TrendingUp,
    title: 'Weekly Personal Insights',
    subtitle: 'Spotify-Style Analytics for CLAT Prep',
    description:
      'Get personalized weekly reports that feel like Spotify Wrapped but for your CLAT preparation. Beautiful visualizations show your study patterns, progress, and achievements with motivational insights.',
    highlights: [
      'Spotify-style wrapped reports every week',
      'Study habit optimization recommendations',
      'Peer comparison (anonymous) with top performers',
      'Achievement badges and milestone celebrations',
      'Predictive analytics for upcoming performance',
    ],
    gradient: 'from-green-500 to-emerald-500',
    stats: {
      frequency: 'Weekly',
      style: 'Spotify-like',
      comparison: 'Peer-based',
      insights: 'Personal',
    },
    mockup: 'weekly-insights',
  },
  {
    id: 'community-insights',
    icon: Users,
    title: 'Advanced Community Insights',
    subtitle: 'Anonymous Peer Learning & Competition',
    description:
      'Join India\'s smartest CLAT community with 10,000+ active students. Get insights from top performers, participate in study groups, and compete anonymously while maintaining your privacy.',
    highlights: [
      '10,000+ active students across India',
      'Anonymous leaderboards and competitions',
      'Study group formation based on goals',
      'Success stories and tips from CLAT toppers',
      'Regional performance insights and trends',
    ],
    gradient: 'from-orange-500 to-red-500',
    stats: {
      students: '10K+',
      privacy: 'Anonymous',
      groups: 'Smart-matched',
      toppers: 'Featured',
    },
    mockup: 'community',
  },
  {
    id: 'reading-mastery',
    icon: BookOpen,
    title: 'Daily Reading Mastery',
    subtitle: 'Curated Passages for CLAT Excellence',
    description:
      'Master reading comprehension with carefully curated daily passages from The Hindu, Indian Express, and academic journals. Build vocabulary, improve speed, and develop critical thinking skills.',
    highlights: [
      'Curated passages from premium news sources',
      'Vocabulary building with contextual meanings',
      'Reading speed tracking and improvement',
      'Critical thinking questions and analysis',
      'Academic journal excerpts for advanced practice',
    ],
    gradient: 'from-indigo-500 to-purple-500',
    stats: {
      sources: 'Premium',
      daily: 'Curated',
      vocabulary: '1000+',
      tracking: 'AI-powered',
    },
    mockup: 'reading-mastery',
  },
  {
    id: 'study-streaks',
    icon: Zap,
    title: 'Smart Study Streaks & Gamification',
    subtitle: 'Motivation That Actually Works',
    description:
      'Gamified learning system with intelligent streak tracking, achievement badges, and motivational rewards. Our psychology-backed approach keeps you consistent and motivated throughout your CLAT journey.',
    highlights: [
      'Psychology-backed motivation system',
      'Smart streak tracking (not just login-based)',
      'Achievement badges for different milestones',
      'Personalized rewards and celebrations',
      'Social sharing of achievements (optional)',
    ],
    gradient: 'from-yellow-500 to-orange-500',
    stats: {
      system: 'Psychology-backed',
      tracking: 'Smart',
      badges: '50+',
      motivation: 'Personalized',
    },
    mockup: 'streaks',
  },
  {
    id: 'countdown',
    icon: Calendar,
    title: 'CLAT 2026 Smart Countdown',
    subtitle: 'Milestone-Based Preparation Planning',
    description:
      'Dynamic countdown with intelligent milestone tracking. Get urgency-based recommendations, adaptive study plans, and real-time progress updates as you approach CLAT 2026.',
    highlights: [
      'Dynamic milestone-based planning',
      'Urgency-based study recommendations',
      'Adaptive daily targets based on remaining time',
      'Progress tracking against optimal preparation curve',
      'Stress management tips as exam approaches',
    ],
    gradient: 'from-pink-500 to-rose-500',
    stats: {
      milestones: 'Smart',
      planning: 'Adaptive',
      targets: 'Daily',
      curve: 'Optimal',
    },
    mockup: 'countdown',
  },
  {
    id: 'ai-planner',
    icon: Brain,
    title: 'Advanced AI Study Planner',
    subtitle: 'Personalized Learning Pathways',
    description:
      'State-of-the-art AI creates personalized study schedules that adapt to your learning patterns, available time, strengths, and weaknesses. Never wonder what to study next.',
    highlights: [
      'Machine learning-powered schedule optimization',
      'Adaptive planning based on performance',
      'Integration with your personal calendar',
      'Weakness-focused study recommendations',
      'Optimal study time distribution across subjects',
    ],
    gradient: 'from-teal-500 to-green-500',
    stats: {
      ai: 'Advanced',
      adaptation: 'Real-time',
      optimization: 'ML-powered',
      integration: 'Calendar',
    },
    mockup: 'ai-planner',
  },
];

const mockupComponents = {
  'rank-predictor': () => (
    <div className="relative h-96 w-full overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl">
      {/* Rank Predictor Dashboard */}
      <div className="p-6 h-full">
        <div className="mb-4 flex items-center gap-3">
          <Target className="h-6 w-6 text-purple-400" />
          <h3 className="text-lg font-bold text-white">CLAT 2026 Rank Predictor</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-xl text-white text-center">
            <div className="text-2xl font-bold">Rank 245</div>
            <div className="text-sm opacity-90">Predicted Rank</div>
            <div className="text-xs mt-1">85% Confidence</div>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 rounded-xl text-white text-center">
            <div className="text-2xl font-bold">78%</div>
            <div className="text-sm opacity-90">NLSIU Probability</div>
            <div className="text-xs mt-1">High Chance</div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
            <span className="text-white font-medium">NLSIU Bangalore</span>
            <span className="text-green-400 font-bold">78% Chance</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
            <span className="text-white font-medium">NALSAR Hyderabad</span>
            <span className="text-blue-400 font-bold">92% Chance</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
            <span className="text-white font-medium">WBNUJS Kolkata</span>
            <span className="text-green-400 font-bold">95% Chance</span>
          </div>
        </div>
      </div>
    </div>
  ),
  'mock-analysis': () => (
    <div className="relative h-96 w-full overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl">
      <div className="p-6 h-full">
        <div className="mb-4 flex items-center gap-3">
          <BarChart3 className="h-6 w-6 text-blue-400" />
          <h3 className="text-lg font-bold text-white">3-Stage Mock Analysis</h3>
        </div>
        
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center p-3 bg-purple-500/20 rounded-lg border border-purple-500/30">
            <div className="text-lg font-bold text-purple-300">DECODE</div>
            <div className="text-xs text-gray-300">Performance Analysis</div>
          </div>
          <div className="text-center p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
            <div className="text-lg font-bold text-blue-300">TRACK</div>
            <div className="text-xs text-gray-300">Progress Monitoring</div>
          </div>
          <div className="text-center p-3 bg-green-500/20 rounded-lg border border-green-500/30">
            <div className="text-lg font-bold text-green-300">REFLECT</div>
            <div className="text-xs text-gray-300">Action Planning</div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium text-white">AI Insight</span>
            </div>
            <p className="text-sm text-gray-300">Your Legal Reasoning improved 12% but focus on Constitutional Law. Allocate 40% more time to this section.</p>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <div className="text-xl font-bold text-white">124/150</div>
              <div className="text-xs text-gray-400">Current Score</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <div className="text-xl font-bold text-green-400">+8</div>
              <div className="text-xs text-gray-400">Improvement</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  'weekly-insights': () => (
    <div className="relative h-96 w-full overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl">
      <div className="p-6 h-full">
        <div className="mb-4 flex items-center gap-3">
          <TrendingUp className="h-6 w-6 text-green-400" />
          <h3 className="text-lg font-bold text-white">This Week's Insights</h3>
        </div>
        
        <div className="mb-4 p-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl border border-green-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Star className="h-5 w-5 text-yellow-400" />
            <span className="font-semibold text-green-200">Week 23 Highlights</span>
          </div>
          <ul className="text-sm text-green-100 space-y-1">
            <li>• 7-day study streak completed! 🔥</li>
            <li>• Legal Reasoning: +15% improvement</li>
            <li>• Mock rank jumped 45 positions</li>
            <li>• Top 5% in peer comparison</li>
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-purple-500/20 rounded-lg border border-purple-500/30">
            <div className="text-sm font-medium text-purple-200 mb-1">Study Time</div>
            <div className="text-2xl font-bold text-white">42h</div>
            <div className="text-xs text-purple-300">+8h vs last week</div>
          </div>
          <div className="p-3 bg-orange-500/20 rounded-lg border border-orange-500/30">
            <div className="text-sm font-medium text-orange-200 mb-1">Efficiency</div>
            <div className="text-2xl font-bold text-white">87%</div>
            <div className="text-xs text-orange-300">Above average</div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
          <div className="text-sm font-medium text-yellow-200">🎯 Next Week Goal</div>
          <div className="text-xs text-yellow-100 mt-1">Master Constitutional Law fundamentals</div>
        </div>
      </div>
    </div>
  ),
  'community': () => (
    <div className="relative h-96 w-full overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl">
      <div className="p-6 h-full">
        <div className="mb-4 flex items-center gap-3">
          <Users className="h-6 w-6 text-orange-400" />
          <h3 className="text-lg font-bold text-white">Community Insights</h3>
        </div>
        
        <div className="mb-4 p-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl border border-orange-500/30">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold">A</div>
            <div>
              <div className="font-medium text-white">Arjun K.</div>
              <div className="text-xs text-gray-300">AIR 23 CLAT 2024</div>
            </div>
          </div>
          <p className="text-sm text-orange-100">"Focus on landmark constitutional cases from 2020-2024. They're frequently tested!"</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="text-center p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
            <div className="text-2xl font-bold text-blue-300">10,247</div>
            <div className="text-xs text-gray-300">Active Students</div>
          </div>
          <div className="text-center p-3 bg-green-500/20 rounded-lg border border-green-500/30">
            <div className="text-2xl font-bold text-green-300">24/7</div>
            <div className="text-xs text-gray-300">Peer Support</div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center p-2 bg-white/5 rounded-lg">
            <span className="text-sm text-gray-300">Your Rank in Community</span>
            <span className="text-sm font-bold text-purple-400">#847</span>
          </div>
          <div className="flex justify-between items-center p-2 bg-white/5 rounded-lg">
            <span className="text-sm text-gray-300">Study Group: "CLAT Warriors"</span>
            <span className="text-sm font-bold text-green-400">45 online</span>
          </div>
        </div>
      </div>
    </div>
  ),
  'reading-mastery': () => (
    <div className="relative h-96 w-full overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl">
      <div className="p-6 h-full">
        <div className="mb-4 flex items-center gap-3">
          <BookOpen className="h-6 w-6 text-indigo-400" />
          <h3 className="text-lg font-bold text-white">Daily Reading Mastery</h3>
        </div>

        <div className="mb-4 p-4 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl border border-indigo-500/30">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-indigo-200">Today's Passage</span>
            <span className="text-xs text-indigo-300">The Hindu Editorial</span>
          </div>
          <h4 className="text-sm font-semibold text-white mb-2">"Constitutional Morality in Modern India"</h4>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-lg font-bold text-white">850</div>
              <div className="text-xs text-gray-400">Words</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-400">4.2</div>
              <div className="text-xs text-gray-400">Min Read</div>
            </div>
            <div>
              <div className="text-lg font-bold text-yellow-400">15</div>
              <div className="text-xs text-gray-400">Key Terms</div>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="p-3 bg-white/5 rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-300">Reading Speed</span>
              <span className="text-sm font-bold text-blue-400">245 WPM</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-blue-400 h-2 rounded-full" style={{width: '78%'}}></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-purple-500/20 rounded-lg">
              <div className="text-lg font-bold text-purple-300">28</div>
              <div className="text-xs text-gray-400">Day Streak</div>
            </div>
            <div className="text-center p-3 bg-green-500/20 rounded-lg">
              <div className="text-lg font-bold text-green-300">1,247</div>
              <div className="text-xs text-gray-400">Vocabulary</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  'streaks': () => (
    <div className="relative h-96 w-full overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl">
      <div className="p-6 h-full">
        <div className="mb-4 flex items-center gap-3">
          <Zap className="h-6 w-6 text-yellow-400" />
          <h3 className="text-lg font-bold text-white">Study Streaks & Achievements</h3>
        </div>

        <div className="mb-4 text-center">
          <div className="text-6xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text mb-2">23</div>
          <div className="text-lg font-semibold text-white">Day Study Streak</div>
          <div className="text-sm text-gray-400">Your longest streak: 45 days</div>
        </div>

        <div className="flex justify-center gap-1 mb-4">
          {[...Array(7)].map((_, i) => (
            <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              i < 6 ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white' : 'bg-gray-600 text-gray-400'
            }`}>
              {i < 6 ? '🔥' : i + 1}
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <div className="p-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/30">
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium text-yellow-200">New Achievement!</span>
            </div>
            <div className="text-xs text-yellow-100">"3-Week Warrior" - Study for 21 consecutive days</div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="text-center p-2 bg-purple-500/20 rounded-lg">
              <div className="text-lg">🏆</div>
              <div className="text-xs text-gray-400">Rank Master</div>
            </div>
            <div className="text-center p-2 bg-blue-500/20 rounded-lg">
              <div className="text-lg">📚</div>
              <div className="text-xs text-gray-400">Speed Reader</div>
            </div>
            <div className="text-center p-2 bg-green-500/20 rounded-lg">
              <div className="text-lg">🎯</div>
              <div className="text-xs text-gray-400">Target Hitter</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  'countdown': () => (
    <div className="relative h-96 w-full overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl">
      <div className="p-6 h-full">
        <div className="mb-4 flex items-center gap-3">
          <Calendar className="h-6 w-6 text-pink-400" />
          <h3 className="text-lg font-bold text-white">CLAT 2026 Countdown</h3>
        </div>

        <div className="text-center mb-6">
          <div className="grid grid-cols-4 gap-2 mb-4">
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-3 rounded-lg text-white text-center">
              <div className="text-2xl font-bold">187</div>
              <div className="text-xs">Days</div>
            </div>
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-lg text-white text-center">
              <div className="text-2xl font-bold">14</div>
              <div className="text-xs">Hours</div>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-lg text-white text-center">
              <div className="text-2xl font-bold">23</div>
              <div className="text-xs">Minutes</div>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-blue-500 p-3 rounded-lg text-white text-center">
              <div className="text-2xl font-bold">45</div>
              <div className="text-xs">Seconds</div>
            </div>
          </div>
          <div className="text-lg font-semibold text-white">Until CLAT 2026</div>
        </div>

        <div className="space-y-3">
          <div className="p-3 bg-gradient-to-r from-rose-500/20 to-pink-500/20 rounded-lg border border-rose-500/30">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-4 w-4 text-rose-400" />
              <span className="text-sm font-medium text-rose-200">Next Milestone</span>
            </div>
            <div className="text-sm text-white">Complete Legal Reasoning Module</div>
            <div className="text-xs text-gray-300">Due in 5 days</div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <div className="text-lg font-bold text-green-400">76%</div>
              <div className="text-xs text-gray-400">Syllabus Complete</div>
            </div>
            <div className="text-center p-3 bg-white/5 rounded-lg">
              <div className="text-lg font-bold text-blue-400">24</div>
              <div className="text-xs text-gray-400">Mocks Remaining</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  'ai-planner': () => (
    <div className="relative h-96 w-full overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl">
      <div className="p-6 h-full">
        <div className="mb-4 flex items-center gap-3">
          <Brain className="h-6 w-6 text-teal-400" />
          <h3 className="text-lg font-bold text-white">AI Study Planner</h3>
        </div>

        <div className="mb-4 p-3 bg-gradient-to-r from-teal-500/20 to-green-500/20 rounded-xl border border-teal-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Cpu className="h-4 w-4 text-teal-400" />
            <span className="text-sm font-medium text-teal-200">AI Recommendation</span>
          </div>
          <p className="text-sm text-white">Based on your performance, focus on Constitutional Law today. Optimal study time: 9:00 AM - 11:30 AM</p>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between p-3 bg-purple-500/20 rounded-lg border border-purple-500/30">
            <div>
              <div className="font-medium text-white">Constitutional Law</div>
              <div className="text-xs text-gray-300">High Priority • 2.5 hours</div>
            </div>
            <div className="text-purple-400 font-bold">9:00 AM</div>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
            <div>
              <div className="font-medium text-white">Reading Comprehension</div>
              <div className="text-xs text-gray-300">Medium Priority • 1 hour</div>
            </div>
            <div className="text-blue-400 font-bold">12:00 PM</div>
          </div>

          <div className="flex items-center justify-between p-3 bg-green-500/20 rounded-lg border border-green-500/30">
            <div>
              <div className="font-medium text-white">Mock Test Review</div>
              <div className="text-xs text-gray-300">Revision • 45 minutes</div>
            </div>
            <div className="text-green-400 font-bold">4:00 PM</div>
          </div>
        </div>

        <div className="p-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/30">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-yellow-400" />
            <span className="text-sm text-yellow-200">Optimized for your peak performance hours</span>
          </div>
        </div>
      </div>
    </div>
  ),
};

export default function FeaturesShowcase() {
  const [selectedFeature, setSelectedFeature] = useState(industryFirstFeatures[0]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-24">
      {/* Glassmorphism background with floating elements */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-20 left-10 h-40 w-40 animate-pulse rounded-full bg-purple-500/20 blur-3xl"></div>
      <div className="absolute top-60 right-20 h-32 w-32 animate-pulse rounded-full bg-pink-500/20 blur-2xl delay-1000"></div>
      <div className="absolute bottom-40 left-1/3 h-36 w-36 animate-pulse rounded-full bg-blue-500/20 blur-xl delay-2000"></div>
      <div className="absolute bottom-20 right-10 h-28 w-28 animate-pulse rounded-full bg-green-500/20 blur-2xl delay-3000"></div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-md">
            <Sparkles className="h-5 w-5 text-yellow-400" />
            Industry-First Innovations
          </div>
          <h1 className="mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-6xl font-bold tracking-tight text-transparent sm:text-7xl lg:text-8xl">
            Revolutionary
            <br />
            <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
              Features
            </span>
          </h1>
          <p className="mx-auto max-w-4xl text-xl text-gray-300 sm:text-2xl">
            Discover the groundbreaking features that make SOLO the most advanced CLAT preparation platform in India. 
            Each feature represents years of research and development, designed to give you an unbeatable edge.
          </p>
        </div>

        {/* Feature Navigation */}
        <div className="mb-16 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {industryFirstFeatures.map((feature) => (
            <button
              key={feature.id}
              onClick={() => setSelectedFeature(feature)}
              className={`group relative overflow-hidden rounded-2xl border p-6 text-left transition-all duration-300 hover:scale-105 ${
                selectedFeature.id === feature.id
                  ? 'border-white/40 bg-white/20 shadow-2xl'
                  : 'border-white/20 bg-white/10 hover:border-white/30 hover:bg-white/15'
              } backdrop-blur-md`}
            >
              <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${feature.gradient}`}>
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 font-semibold text-white">{feature.title}</h3>
              <p className="text-sm text-gray-300">{feature.subtitle}</p>
            </button>
          ))}
        </div>

        {/* Selected Feature Showcase */}
        <div className="mb-20 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          {/* Feature Details */}
          <div className="space-y-8">
            <div>
              <div className={`mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${selectedFeature.gradient}`}>
                <selectedFeature.icon className="h-8 w-8 text-white" />
              </div>
              <h2 className="mb-4 text-4xl font-bold text-white lg:text-5xl">
                {selectedFeature.title}
              </h2>
              <p className="mb-6 text-xl text-gray-300">
                {selectedFeature.description}
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="space-y-3">
              {selectedFeature.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className={`mt-0.5 h-5 w-5 flex-shrink-0 bg-gradient-to-r ${selectedFeature.gradient} rounded-full text-white`} />
                  <span className="text-gray-300">{highlight}</span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {Object.entries(selectedFeature.stats).map(([key, value]) => (
                <div key={key} className="rounded-xl border border-white/20 bg-white/10 p-4 text-center backdrop-blur-md">
                  <div className="mb-1 text-2xl font-bold text-white">{value}</div>
                  <div className="text-sm capitalize text-gray-400">{key}</div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className={`h-14 bg-gradient-to-r ${selectedFeature.gradient} px-8 text-lg font-semibold hover:shadow-2xl`}
              >
                <Link href="/signup">
                  Try This Feature Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 border-white/30 bg-white/5 px-8 text-lg font-semibold text-white backdrop-blur-sm hover:bg-white/10"
              >
                <Link href="#pricing">View Pricing</Link>
              </Button>
            </div>
          </div>

          {/* Feature Mockup */}
          <div className="lg:pl-8">
            {mockupComponents[selectedFeature.mockup]()}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="mx-auto mb-8 max-w-3xl rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-md shadow-xl">
            <h3 className="mb-4 text-3xl font-bold text-white">
              Experience All Features with a Free Trial
            </h3>
            <p className="mb-6 text-lg text-gray-300">
              Join 10,000+ students who are already using these revolutionary features to transform their CLAT preparation.
            </p>
            <Button
              asChild
              size="lg"
              className="h-16 bg-gradient-to-r from-purple-600 to-pink-600 px-12 text-xl font-semibold shadow-2xl hover:from-purple-700 hover:to-pink-700"
            >
              <Link href="/signup">
                Start 30-Day Free Trial
                <ArrowRight className="ml-2 h-6 w-6" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
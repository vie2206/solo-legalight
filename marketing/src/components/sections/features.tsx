'use client';

import {
  Brain,
  Target,
  BarChart3,
  Zap,
  Users,
  Trophy,
  Calendar,
  Sparkles,
  TrendingUp,
  Lightbulb,
  Clock,
  Award,
} from 'lucide-react';
import { 
  AIPoweredBentoCard, 
  AnalyticsBentoCard, 
  EducationBentoCard, 
  CommunityBentoCard,
  BentoCard 
} from '@/components/ui/bento-card';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Study Planner',
    description:
      'Intelligent scheduling based on your learning patterns, adaptive to your strengths and weaknesses.',
    gradient: 'from-purple-500 to-indigo-500',
    stats: 'Personalized for 10K+ students',
  },
  {
    icon: Zap,
    title: 'Smart Study Reminders',
    description:
      'AI-based notifications that adapt to your optimal learning times and study habits.',
    gradient: 'from-orange-500 to-red-500',
    stats: '92% better retention rates',
  },
  {
    icon: BarChart3,
    title: 'Advanced Rank Predictor',
    description:
      '85%+ accuracy ML models with 3D visualizations and real-time rank tracking.',
    gradient: 'from-green-500 to-emerald-500',
    stats: '85% prediction accuracy',
  },
  {
    icon: Target,
    title: 'Weekly Personal Insights',
    description:
      'Spotify-style analytics showing your study patterns, progress, and personalized recommendations.',
    gradient: 'from-pink-500 to-rose-500',
    stats: 'Like Spotify for studying',
  },
  {
    icon: Trophy,
    title: 'Level Up Mock Analysis',
    description:
      'Detailed 3-step analysis: DECODE performance, TRACK progress, REFLECT on improvements.',
    gradient: 'from-yellow-500 to-orange-500',
    stats: '3-step detailed analysis',
  },
  {
    icon: Users,
    title: 'Community Insights',
    description:
      'Compare anonymously with peers, join study groups, and learn from top performers.',
    gradient: 'from-blue-500 to-cyan-500',
    stats: 'Anonymous peer comparison',
  },
  {
    icon: Calendar,
    title: 'CLAT 2026 Countdown',
    description:
      'Live countdown with milestone tracking, urgency-based recommendations, and goal management.',
    gradient: 'from-indigo-500 to-purple-500',
    stats: 'Real-time exam tracking',
  },
  {
    icon: TrendingUp,
    title: 'Study Streaks & Achievements',
    description:
      'Gamified learning with streak tracking, achievement badges, and motivation systems.',
    gradient: 'from-emerald-500 to-teal-500',
    stats: 'Streak-based motivation',
  },
  {
    icon: Lightbulb,
    title: 'Adaptive Learning Paths',
    description:
      'Dynamic study paths that evolve based on your performance and changing strengths.',
    gradient: 'from-amber-500 to-yellow-500',
    stats: 'Evolves with your progress',
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-24"
    >
      {/* Glassmorphism background with floating elements */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-10 right-10 h-40 w-40 animate-pulse rounded-full bg-blue-500/20 blur-3xl"></div>
      <div className="absolute bottom-20 left-20 h-28 w-28 animate-pulse rounded-full bg-green-500/20 blur-2xl delay-1500"></div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
            <Sparkles className="h-4 w-4" />
            Revolutionary Features
          </div>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Why SOLO is Different
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-300">
            We're not just another coaching platform. We're creating a new
            category of AI-powered performance analytics that makes every
            student's preparation truly personalized.
          </p>
        </div>

        {/* Why SOLO is Different - Redesigned Section */}
        <div className="mb-20 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-white/0"></div>
          <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-2xl"></div>
          
          <div className="relative p-12 text-center">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-yellow-400/30 bg-yellow-500/10 px-6 py-3 text-sm font-medium text-yellow-300 backdrop-blur-sm">
              <TrendingUp className="h-5 w-5" />
              Revolutionary Market Position
            </div>
            
            <h2 className="mb-6 text-5xl font-black tracking-tight sm:text-6xl">
              <span className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
                Why SOLO is Different
              </span>
            </h2>
            
            <div className="mb-10 mx-auto max-w-4xl">
              <p className="text-2xl font-semibold text-white mb-4">
                💥 <span className="text-red-400">No Real Innovation in CLAT Prep Since 2008</span>
              </p>
              <p className="text-xl text-gray-200 leading-relaxed">
                While others waste your time with <span className="line-through text-gray-400">marketing gimmicks</span> and 
                <span className="line-through text-gray-400">false promises</span>, we're solving the <span className="text-yellow-400 font-bold">REAL problem</span>: 
                giving every student the <span className="text-purple-300 font-semibold">personalized AI insights</span> they need to dominate CLAT.
              </p>
            </div>
            
            {/* Competitive Analysis Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              {/* Traditional Coaching */}
              <div className="p-8 rounded-2xl border border-red-500/30 bg-red-500/10 backdrop-blur-sm">
                <div className="mb-4">
                  <h4 className="text-xl font-bold text-red-400 mb-2">
                    ❌ Traditional Coaching
                  </h4>
                  <p className="text-gray-300 text-sm">What everyone else is still doing (since 2008)</p>
                </div>
                <ul className="space-y-3 text-left">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-red-500 flex-shrink-0"></div>
                    <span className="text-gray-300">One-size-fits-all teaching for 500+ students</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-red-500 flex-shrink-0"></div>
                    <span className="text-gray-300">Generic mock tests with basic scorecards</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-red-500 flex-shrink-0"></div>
                    <span className="text-gray-300">No personal performance insights</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-red-500 flex-shrink-0"></div>
                    <span className="text-gray-300">Expensive (₹1.5L+) with zero guarantee</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-red-500 flex-shrink-0"></div>
                    <span className="text-gray-300">Location-based disadvantage for Tier-2/3 cities</span>
                  </li>
                </ul>
              </div>
              
              {/* SOLO's Approach */}
              <div className="p-8 rounded-2xl border border-green-400/30 bg-green-500/10 backdrop-blur-sm">
                <div className="mb-4">
                  <h4 className="text-xl font-bold text-green-400 mb-2">
                    ✅ SOLO's AI Revolution
                  </h4>
                  <p className="text-gray-300 text-sm">Creating a new category of CLAT preparation</p>
                </div>
                <ul className="space-y-3 text-left">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-green-500 flex-shrink-0"></div>
                    <span className="text-gray-300"><strong className="text-green-400">AI-powered personalization</strong> for each student's learning pattern</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-green-500 flex-shrink-0"></div>
                    <span className="text-gray-300"><strong className="text-green-400">85% accurate rank prediction</strong> with ML models trained on 50K+ performances</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-green-500 flex-shrink-0"></div>
                    <span className="text-gray-300"><strong className="text-green-400">Weekly Spotify-style analytics</strong> showing exactly what to study next</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-green-500 flex-shrink-0"></div>
                    <span className="text-gray-300"><strong className="text-green-400">Affordable at ₹9,999/year</strong> with 30-day money-back guarantee</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-2 w-2 rounded-full bg-green-500 flex-shrink-0"></div>
                    <span className="text-gray-300"><strong className="text-green-400">Location-independent</strong> - Same quality education everywhere in India</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Impact Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-4xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                  +23
                </div>
                <div className="text-sm text-gray-300">Average Score Improvement</div>
                <div className="text-xs text-gray-400 mt-1">vs +8 traditional coaching</div>
              </div>
              <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                  85%
                </div>
                <div className="text-sm text-gray-300">Rank Prediction Accuracy</div>
                <div className="text-xs text-gray-400 mt-1">vs 0% traditional coaching</div>
              </div>
              <div className="text-center p-6 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                  87%
                </div>
                <div className="text-sm text-gray-300">From Tier-2/3 Cities</div>
                <div className="text-xs text-gray-400 mt-1">Breaking metro advantage</div>
              </div>
            </div>
            
            {/* Bottom CTA */}
            <div className="p-8 rounded-2xl border border-yellow-400/30 bg-gradient-to-r from-yellow-500/10 to-orange-500/10">
              <h4 className="text-2xl font-bold text-white mb-3">
                🏆 Ready to Join the CLAT Revolution?
              </h4>
              <p className="text-gray-200 mb-6 max-w-3xl mx-auto">
                Stop wasting time with outdated methods. Join 10,000+ students who've already discovered 
                the power of AI-driven CLAT preparation. <span className="text-yellow-300 font-semibold">Your NLU dream starts here.</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-bold hover:from-purple-700 hover:to-pink-700 transition-all cursor-pointer text-lg">
                  Start 30-Day Free Trial
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 rounded-xl text-white font-bold hover:bg-white/10 transition-all cursor-pointer text-lg">
                  See Live Demo
                  <TrendingUp className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Bento Cards Showcase */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mb-16">
          {/* AI Prediction Card */}
          <div className="lg:col-span-1">
            <AIPoweredBentoCard />
          </div>

          {/* Mock Test Analysis Card */}
          <div className="lg:col-span-1">
            <AnalyticsBentoCard />
          </div>

          {/* Education Resources Card */}
          <div className="lg:col-span-1">
            <EducationBentoCard />
          </div>

          {/* Community Card */}
          <div className="lg:col-span-1">
            <CommunityBentoCard />
          </div>
        </div>

        {/* All Features Included - Comprehensive Section */}
        <div className="mb-20 relative overflow-hidden">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-6 py-3 text-sm font-medium text-blue-300 backdrop-blur-md">
              <Award className="h-5 w-5" />
              Complete Feature Suite
            </div>
            
            <h2 className="mb-6 text-5xl font-black tracking-tight sm:text-6xl">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                All Features Included
              </span>
            </h2>
            
            <p className="mx-auto max-w-4xl text-xl text-gray-300 leading-relaxed mb-8">
              <span className="text-yellow-400 font-semibold">9 revolutionary AI-powered features</span> that transform how you prepare for CLAT. 
              No hidden costs, no premium tiers. <span className="text-green-400 font-semibold">Everything you need is included.</span>
            </p>
            
            {/* Feature Categories Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 max-w-4xl mx-auto">
              <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30">
                <div className="text-2xl font-bold text-purple-400 mb-1">3</div>
                <div className="text-sm text-gray-300">AI Analytics Features</div>
              </div>
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                <div className="text-2xl font-bold text-green-400 mb-1">4</div>
                <div className="text-sm text-gray-300">Smart Learning Tools</div>
              </div>
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
                <div className="text-2xl font-bold text-blue-400 mb-1">2</div>
                <div className="text-sm text-gray-300">Community Features</div>
              </div>
            </div>
          </div>
          
          {/* Comprehensive Features Grid */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* AI Analytics Features */}
            <BentoCard variant="glassmorphic" className="p-8 lg:col-span-1 group hover:scale-105 transition-all duration-300">
              <div className="mb-6">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 mb-4 shadow-2xl">
                  <Brain className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-3">
                  AI Rank Predictor
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  <strong>85%+ accuracy ML models</strong> trained on 50K+ CLAT performances. Get real-time rank predictions with category-wise analysis and personalized improvement roadmaps.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="h-1.5 w-1.5 rounded-full bg-purple-400"></div>
                    <span>Real-time rank tracking across 25+ NLUs</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="h-1.5 w-1.5 rounded-full bg-purple-400"></div>
                    <span>Category-wise performance breakdown</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="h-1.5 w-1.5 rounded-full bg-purple-400"></div>
                    <span>Personalized improvement suggestions</span>
                  </div>
                </div>
              </div>
              <div className="bg-purple-500/20 rounded-xl px-4 py-2 text-center">
                <span className="text-purple-300 font-semibold">Impact: +23 avg score boost</span>
              </div>
            </BentoCard>

            <BentoCard variant="glassmorphic" className="p-8 group hover:scale-105 transition-all duration-300">
              <div className="mb-6">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 mb-4 shadow-2xl">
                  <Target className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-3">
                  Weekly Insights Dashboard
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  <strong>Spotify-style analytics</strong> for your CLAT preparation. Get detailed weekly reports showing study patterns, progress trends, and personalized recommendations.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-400"></div>
                    <span>Weekly performance analytics</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-400"></div>
                    <span>Study pattern optimization</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-400"></div>
                    <span>Progress tracking & goal setting</span>
                  </div>
                </div>
              </div>
              <div className="bg-green-500/20 rounded-xl px-4 py-2 text-center">
                <span className="text-green-300 font-semibold">Feature: Like Spotify for studying</span>
              </div>
            </BentoCard>

            <BentoCard variant="glassmorphic" className="p-8 group hover:scale-105 transition-all duration-300">
              <div className="mb-6">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 mb-4 shadow-2xl">
                  <BarChart3 className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-3">
                  Level Up Mock Analysis
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  <strong>3-step detailed analysis:</strong> DECODE performance, TRACK progress, REFLECT on improvements. Get actionable insights after every mock test.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="h-1.5 w-1.5 rounded-full bg-orange-400"></div>
                    <span>Detailed performance breakdown</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="h-1.5 w-1.5 rounded-full bg-orange-400"></div>
                    <span>Time management analysis</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="h-1.5 w-1.5 rounded-full bg-orange-400"></div>
                    <span>Strategic improvement plans</span>
                  </div>
                </div>
              </div>
              <div className="bg-orange-500/20 rounded-xl px-4 py-2 text-center">
                <span className="text-orange-300 font-semibold">Method: 3-step analysis system</span>
              </div>
            </BentoCard>

            {/* Smart Learning Tools */}
            <BentoCard variant="glassmorphic" className="p-8 group hover:scale-105 transition-all duration-300">
              <div className="mb-6">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 mb-4 shadow-2xl">
                  <Zap className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-3">
                  AI Study Planner
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  <strong>Intelligent scheduling</strong> based on your learning patterns. Adapts to your strengths, weaknesses, and optimal study times for maximum efficiency.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-400"></div>
                    <span>Personalized study schedules</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-400"></div>
                    <span>Adaptive difficulty adjustment</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-400"></div>
                    <span>Optimal timing recommendations</span>
                  </div>
                </div>
              </div>
              <div className="bg-blue-500/20 rounded-xl px-4 py-2 text-center">
                <span className="text-blue-300 font-semibold">Users: 10K+ personalized plans</span>
              </div>
            </BentoCard>

            <BentoCard variant="glassmorphic" className="p-8 group hover:scale-105 transition-all duration-300">
              <div className="mb-6">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 mb-4 shadow-2xl">
                  <Clock className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent mb-3">
                  Smart Reminders
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  <strong>AI-powered notifications</strong> that adapt to your schedule and learning habits. Never miss important study sessions or deadlines again.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="h-1.5 w-1.5 rounded-full bg-yellow-400"></div>
                    <span>Adaptive notification timing</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="h-1.5 w-1.5 rounded-full bg-yellow-400"></div>
                    <span>Habit formation support</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="h-1.5 w-1.5 rounded-full bg-yellow-400"></div>
                    <span>Deadline management</span>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-500/20 rounded-xl px-4 py-2 text-center">
                <span className="text-yellow-300 font-semibold">Impact: 92% better retention</span>
              </div>
            </BentoCard>

            <BentoCard variant="glassmorphic" className="p-8 group hover:scale-105 transition-all duration-300">
              <div className="mb-6">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 mb-4 shadow-2xl">
                  <Calendar className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-3">
                  CLAT 2026 Countdown
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  <strong>Live countdown</strong> with milestone tracking, urgency-based recommendations, and strategic goal management to keep you on track.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="h-1.5 w-1.5 rounded-full bg-indigo-400"></div>
                    <span>Real-time exam countdown</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="h-1.5 w-1.5 rounded-full bg-indigo-400"></div>
                    <span>Milestone tracking system</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="h-1.5 w-1.5 rounded-full bg-indigo-400"></div>
                    <span>Urgency-based planning</span>
                  </div>
                </div>
              </div>
              <div className="bg-indigo-500/20 rounded-xl px-4 py-2 text-center">
                <span className="text-indigo-300 font-semibold">Feature: Real-time tracking</span>
              </div>
            </BentoCard>

            {/* Community & Gamification */}
            <BentoCard variant="glassmorphic" className="p-8 lg:col-span-1 group hover:scale-105 transition-all duration-300">
              <div className="mb-6">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 mb-4 shadow-2xl">
                  <TrendingUp className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-3">
                  Study Streaks & Achievements
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  <strong>Gamified learning system</strong> with streak tracking, achievement badges, and motivation systems to keep you engaged and consistent.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400"></div>
                    <span>Daily streak tracking</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400"></div>
                    <span>Achievement badge system</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400"></div>
                    <span>Milestone celebrations</span>
                  </div>
                </div>
              </div>
              <div className="bg-emerald-500/20 rounded-xl px-4 py-2 text-center">
                <span className="text-emerald-300 font-semibold">Method: Streak-based motivation</span>
              </div>
            </BentoCard>

            <BentoCard variant="glassmorphic" className="p-8 lg:col-span-1 group hover:scale-105 transition-all duration-300">
              <div className="mb-6">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 mb-4 shadow-2xl">
                  <Users className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent mb-3">
                  Community Insights
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  <strong>Anonymous peer comparison</strong> with 10K+ students. Join study groups, compare performance, and learn from top performers across India.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="h-1.5 w-1.5 rounded-full bg-pink-400"></div>
                    <span>Anonymous performance comparison</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="h-1.5 w-1.5 rounded-full bg-pink-400"></div>
                    <span>Study group formation</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="h-1.5 w-1.5 rounded-full bg-pink-400"></div>
                    <span>Top performer insights</span>
                  </div>
                </div>
              </div>
              <div className="bg-pink-500/20 rounded-xl px-4 py-2 text-center">
                <span className="text-pink-300 font-semibold">Network: 10K+ active students</span>
              </div>
            </BentoCard>

            <BentoCard variant="glassmorphic" className="p-8 group hover:scale-105 transition-all duration-300">
              <div className="mb-6">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 mb-4 shadow-2xl">
                  <Lightbulb className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent mb-3">
                  Adaptive Learning Paths
                </h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  <strong>Dynamic study paths</strong> that evolve based on your performance and changing strengths. Always optimized for your current skill level.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400"></div>
                    <span>Dynamic path adjustment</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400"></div>
                    <span>Skill-based progression</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400"></div>
                    <span>Continuous optimization</span>
                  </div>
                </div>
              </div>
              <div className="bg-amber-500/20 rounded-xl px-4 py-2 text-center">
                <span className="text-amber-300 font-semibold">Feature: Evolves with progress</span>
              </div>
            </BentoCard>
          </div>
          
          {/* Bottom Value Proposition */}
          <div className="mt-16 text-center">
            <div className="p-8 rounded-2xl border border-green-400/30 bg-gradient-to-r from-green-500/10 to-emerald-500/10 max-w-4xl mx-auto">
              <h4 className="text-3xl font-bold text-white mb-4">
                🏆 Complete Package. No Hidden Costs. No Premium Tiers.
              </h4>
              <p className="text-xl text-gray-200 mb-6">
                While others charge extra for advanced features, <span className="text-green-400 font-semibold">SOLO gives you everything for ₹9,999/year</span>. 
                That's ₹27/day for the most advanced CLAT preparation platform in India.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-bold hover:from-purple-700 hover:to-pink-700 transition-all cursor-pointer">
                  Start Free Trial - All Features Included
                  <Sparkles className="h-5 w-5" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 rounded-2xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur-md">
            <div className="flex -space-x-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-sm font-bold text-white">
                A
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-sm font-bold text-white">
                R
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-sm font-bold text-white">
                S
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-sm font-bold text-white">
                +
              </div>
            </div>
            <div className="text-left">
              <p className="font-semibold text-white">
                Join 10,000+ students already using SOLO
              </p>
              <p className="text-sm text-gray-300">
                Average improvement: +23 marks in 3 months
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

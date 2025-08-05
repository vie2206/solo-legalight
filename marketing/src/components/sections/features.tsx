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

        {/* Blue Ocean Strategy Callout */}
        <div className="mb-16 rounded-3xl border border-white/20 bg-white/10 p-8 shadow-xl backdrop-blur-md">
          <div className="text-center">
            <h3 className="mb-4 text-2xl font-bold text-white">
              🚀 Creating a New Category
            </h3>
            <p className="mx-auto max-w-4xl text-lg text-gray-200">
              <strong>No innovation in CLAT prep since 2008.</strong> While
              others focus on marketing and false promises, we're solving the
              real problem: giving every student the personalized insights they
              need to succeed.
            </p>
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

        {/* Section Divider with Holographic Gradient */}
        <div className="relative mb-16 h-32 overflow-hidden rounded-3xl">
          <div 
            className="absolute inset-0 opacity-20 bg-cover bg-center"
            style={{
              backgroundImage: "url('/ui8-assets/gradients/Gradient_15.webp')",
              backgroundBlendMode: 'overlay'
            }}
          ></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-2">All Features Included</h3>
              <p className="text-gray-300">9 revolutionary features that redefine CLAT preparation</p>
            </div>
          </div>
        </div>

        {/* Additional Features Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.slice(4).map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <BentoCard key={index} variant="glassmorphic" className="p-6 h-48">
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <div
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r ${feature.gradient} mb-4`}
                    >
                      <IconComponent className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <div
                      className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${feature.gradient}`}
                    ></div>
                    <span className="text-xs font-medium text-gray-400">
                      {feature.stats}
                    </span>
                  </div>
                </div>
              </BentoCard>
            );
          })}
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

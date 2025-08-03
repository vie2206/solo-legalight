'use client'

import { Brain, Target, BarChart3, Zap, Users, Trophy, Calendar, Sparkles, TrendingUp, Lightbulb, Clock, Award } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Study Planner',
    description: 'Intelligent scheduling based on your learning patterns, adaptive to your strengths and weaknesses.',
    gradient: 'from-purple-500 to-indigo-500',
    stats: 'Personalized for 10K+ students'
  },
  {
    icon: Zap,
    title: 'Smart Study Reminders',
    description: 'AI-based notifications that adapt to your optimal learning times and study habits.',
    gradient: 'from-orange-500 to-red-500',
    stats: '92% better retention rates'
  },
  {
    icon: BarChart3,
    title: 'Advanced Rank Predictor',
    description: '85%+ accuracy ML models with 3D visualizations and real-time rank tracking.',
    gradient: 'from-green-500 to-emerald-500',
    stats: '85% prediction accuracy'
  },
  {
    icon: Target,
    title: 'Weekly Personal Insights',
    description: 'Spotify-style analytics showing your study patterns, progress, and personalized recommendations.',
    gradient: 'from-pink-500 to-rose-500',
    stats: 'Like Spotify for studying'
  },
  {
    icon: Trophy,
    title: 'Level Up Mock Analysis',
    description: 'Detailed 3-step analysis: DECODE performance, TRACK progress, REFLECT on improvements.',
    gradient: 'from-yellow-500 to-orange-500',
    stats: '3-step detailed analysis'
  },
  {
    icon: Users,
    title: 'Community Insights',
    description: 'Compare anonymously with peers, join study groups, and learn from top performers.',
    gradient: 'from-blue-500 to-cyan-500',
    stats: 'Anonymous peer comparison'
  },
  {
    icon: Calendar,
    title: 'CLAT 2026 Countdown',
    description: 'Live countdown with milestone tracking, urgency-based recommendations, and goal management.',
    gradient: 'from-indigo-500 to-purple-500',
    stats: 'Real-time exam tracking'
  },
  {
    icon: TrendingUp,
    title: 'Study Streaks & Achievements',
    description: 'Gamified learning with streak tracking, achievement badges, and motivation systems.',
    gradient: 'from-emerald-500 to-teal-500',
    stats: 'Streak-based motivation'
  },
  {
    icon: Lightbulb,
    title: 'Adaptive Learning Paths',
    description: 'Dynamic study paths that evolve based on your performance and changing strengths.',
    gradient: 'from-amber-500 to-yellow-500',
    stats: 'Evolves with your progress'
  }
]

export default function Features() {
  return (
    <section id="features" className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-100 dark:bg-purple-900/30 px-4 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 mb-4">
            <Sparkles className="h-4 w-4" />
            Revolutionary Features
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-4">
            Why SOLO is Different
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We're not just another coaching platform. We're creating a new category of AI-powered performance analytics that makes every student's preparation truly personalized.
          </p>
        </div>

        {/* Blue Ocean Strategy Callout */}
        <div className="mb-16 p-8 rounded-3xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-800">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-4">
              🚀 Creating a New Category
            </h3>
            <p className="text-lg text-blue-800 dark:text-blue-200 max-w-4xl mx-auto">
              <strong>No innovation in CLAT prep since 2008.</strong> While others focus on marketing and false promises, 
              we're solving the real problem: giving every student the personalized insights they need to succeed.
            </p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div 
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} mb-6`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {feature.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.gradient}`}></div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {feature.stats}
                  </span>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10 dark:ring-white/10 group-hover:ring-gray-900/20 dark:group-hover:ring-white/20 transition-all duration-300"></div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 p-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="flex -space-x-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">A</div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">R</div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold text-sm">S</div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-sm">+</div>
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900 dark:text-white">
                Join 10,000+ students already using SOLO
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Average improvement: +23 marks in 3 months
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

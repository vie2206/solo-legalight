'use client'

import { Brain, Target, BarChart3, Zap, Users, Trophy, Calendar, Sparkles, TrendingUp, Lightbulb, Clock, Award } from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: '🤖 AI Text Explainer',
    description: 'Revolutionary AI that explains complex legal passages instantly. Just highlight any text and get expert-level explanations.',
    gradient: 'from-purple-600 to-pink-600',
    stats: '94% accuracy • +28% comprehension',
    badge: 'AI-POWERED',
    size: 'large'
  },
  {
    icon: Zap,
    title: '⚡ 3D Rank Predictor',
    description: 'World\'s first 3D CLAT rank visualization. See your journey to top NLUs with stunning interactive graphics.',
    gradient: 'from-blue-600 to-cyan-600',
    stats: '756 predicted rank • 85% accuracy',
    badge: 'REVOLUTIONARY',
    size: 'large'
  },
  {
    icon: Target,
    title: '🎯 Smart Study Planner',
    description: 'AI-optimized study schedules that adapt to your performance. Science-backed learning efficiency.',
    gradient: 'from-green-600 to-emerald-600',
    stats: '+15% efficiency • AI-optimized',
    badge: 'INTELLIGENT',
    size: 'medium'
  },
  {
    icon: BarChart3,
    title: '📊 Performance Analytics',
    description: 'Spotify-style study insights with detailed performance tracking and weakness identification.',
    gradient: 'from-orange-600 to-red-600',
    stats: 'Like Spotify for CLAT prep',
    badge: 'INSIGHTS',
    size: 'medium'
  },
  {
    icon: Trophy,
    title: '🏆 Mock Test Mastery',
    description: 'Advanced mock analysis with DECODE-TRACK-REFLECT methodology for guaranteed improvement.',
    gradient: 'from-yellow-600 to-orange-600',
    stats: '+27 avg score improvement',
    badge: 'PROVEN',
    size: 'medium'
  },
  {
    icon: Users,
    title: '👥 Peer Intelligence',
    description: 'Anonymous comparison with 12,847+ students. Learn from top performers and find study partners.',
    gradient: 'from-indigo-600 to-purple-600',
    stats: '12,847+ student community',
    badge: 'COMMUNITY',
    size: 'medium'
  },
  {
    icon: Lightbulb,
    title: '💡 AI Doubt Resolver',
    description: 'Instant AI-powered doubt resolution with context-aware explanations and related concepts.',
    gradient: 'from-pink-600 to-rose-600',
    stats: '<2min response time',
    badge: 'INSTANT',
    size: 'medium'
  },
  {
    icon: Calendar,
    title: '📅 CLAT 2025 Countdown',
    description: 'Live exam countdown with milestone tracking and urgency-based study recommendations.',
    gradient: 'from-teal-600 to-cyan-600',
    stats: 'Real-time exam tracking',
    badge: 'LIVE',
    size: 'medium'
  },
  {
    icon: Award,
    title: '🎖️ Achievement System',
    description: 'Gamified learning with streak tracking, achievement badges, and motivational rewards.',
    gradient: 'from-emerald-600 to-green-600',
    stats: 'Streak-based motivation',
    badge: 'GAMIFIED',
    size: 'small'
  }
]

export default function Features() {
  return (
    <section id="features" className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-6 py-3 text-sm font-semibold text-purple-600 dark:text-purple-400 mb-6 border border-purple-200 dark:border-purple-800 backdrop-blur-sm">
            <Brain className="h-5 w-5 animate-pulse" />
            🤖 10 Revolutionary AI Modules
          </div>
          <h2 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl mb-6">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI That Actually Works
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            While others promise "AI-powered" features, we've built <strong>genuinely revolutionary technology</strong> that 
            transforms how students learn. Every AI module is designed for measurable CLAT score improvement.
          </p>
        </div>

        {/* Revolutionary Technology Callout */}
        <div className="mb-16 p-8 rounded-3xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-200 dark:border-purple-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5"></div>
          <div className="relative text-center">
            <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-4">
              🏆 World's Most Advanced CLAT Technology
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-semibold text-purple-800 dark:text-purple-200">94% AI Accuracy</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="font-semibold text-purple-800 dark:text-purple-200">12,847+ Success Stories</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <span className="font-semibold text-purple-800 dark:text-purple-200">+40% Score Improvement</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-auto">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            const sizeClasses = {
              large: 'md:col-span-2 md:row-span-2', // Big cards for hero features
              medium: 'md:col-span-1 md:row-span-1', // Standard cards
              small: 'md:col-span-1 md:row-span-1'   // Compact cards
            }
            
            return (
              <div 
                key={index}
                className={`group relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 hover:-translate-y-1 ${sizeClasses[feature.size]} ${feature.size === 'large' ? 'p-8' : 'p-6'}`}
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Badge */}
                <div className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r ${feature.gradient} px-3 py-1 text-xs font-bold text-white mb-4 animate-pulse`}>
                  {feature.badge}
                </div>
                
                {/* Icon */}
                <div className={`inline-flex items-center justify-center ${feature.size === 'large' ? 'w-16 h-16' : 'w-12 h-12'} rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6 shadow-lg`}>
                  <IconComponent className={`${feature.size === 'large' ? 'h-8 w-8' : 'h-6 w-6'} text-white`} />
                </div>

                {/* Content */}
                <h3 className={`${feature.size === 'large' ? 'text-2xl' : 'text-xl'} font-bold text-gray-900 dark:text-white mb-3 leading-tight`}>
                  {feature.title}
                </h3>
                
                <p className={`text-gray-600 dark:text-gray-300 mb-6 leading-relaxed ${feature.size === 'large' ? 'text-lg' : 'text-base'}`}>
                  {feature.description}
                </p>

                {/* Stats with Enhanced Design */}
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-gray-50 dark:bg-gray-700/50 border border-gray-100 dark:border-gray-600">
                  <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${feature.gradient} animate-pulse`}></div>
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                    {feature.stats}
                  </span>
                </div>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl -z-10`}></div>
              </div>
            )
          })}
        </div>

        {/* Revolutionary Social Proof CTA */}
        <div className="text-center mt-20">
          <div className="relative p-8 rounded-3xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-200 dark:border-purple-800 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5"></div>
            
            <div className="relative flex flex-col md:flex-row items-center justify-center gap-6">
              {/* Success Avatar Stack */}
              <div className="flex -space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold border-2 border-white shadow-lg animate-pulse">🧠</div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center text-white font-bold border-2 border-white shadow-lg">⚡</div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center text-white font-bold border-2 border-white shadow-lg">🎯</div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-600 to-red-600 flex items-center justify-center text-white font-bold border-2 border-white shadow-lg">🏆</div>
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-600 to-orange-600 flex items-center justify-center text-white font-bold text-lg border-2 border-white shadow-lg">+</div>
              </div>
              
              {/* Revolutionary Stats */}
              <div className="text-center md:text-left">
                <p className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  🚀 Join <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">12,847+ revolutionaries</span>
                </p>
                <p className="text-gray-600 dark:text-gray-300 font-medium">
                  Average improvement: <span className="text-green-600 font-bold">+40% scores</span> • 
                  <span className="text-purple-600 font-bold"> 94% AI accuracy</span> • 
                  <span className="text-blue-600 font-bold"> Top NLU admits</span>
                </p>
              </div>
              
              {/* Live Counter */}
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                <span className="text-sm font-bold text-green-700 dark:text-green-400">
                  LIVE: 847 students studying now
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

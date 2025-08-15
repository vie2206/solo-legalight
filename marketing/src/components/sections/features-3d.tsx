'use client';

import { 
  BentoCard 
} from '@/components/ui/bento-card';
import {
  Target,
  Brain,
  Trophy,
  BookOpen,
  Lightbulb,
  Globe,
  Medal,
  Zap,
  BarChart3,
  Users,
  Rocket,
  TrendingUp,
  Award,
  Sparkles
} from 'lucide-react';

const mainFeatures = [
  {
    id: 'ai-predictor',
    title: 'AI Rank Predictor',
    description: '85%+ accuracy ML models trained on 50,000+ CLAT performances. Real-time rank tracking with category-wise predictions and personalized improvement roadmaps.',
    icon: Target,
    stats: '85% Accuracy • 50K+ Data Points',
    gradient: 'from-purple-500 to-pink-500',
    metrics: ['+23 Avg Score Boost', '2.3x Faster Improvement', '89% Student Satisfaction'],
    size: 'large'
  },
  {
    id: 'quiz-system',
    title: 'Adaptive Quiz Engine',
    description: 'Revolutionary AI that learns from every answer. Focuses on your weak areas, adapts difficulty in real-time, and creates personalized question banks.',
    icon: Brain,
    stats: '15K+ Questions • Smart Adaptation',
    gradient: 'from-blue-500 to-cyan-500',
    metrics: ['15K+ Questions', 'Real-time Adaptation', '72% Better Retention'],
    size: 'medium'
  },
  {
    id: 'leaderboard',
    title: 'Anonymous Rankings',
    description: 'Compare your performance with thousands of CLAT aspirants while maintaining complete privacy. Track your progress and learn from top performers.',
    icon: Trophy,
    stats: 'Real-time Rankings • Full Privacy',
    gradient: 'from-green-500 to-emerald-500',
    metrics: ['10K+ Active Students', 'Anonymous Comparison', 'Weekly Insights'],
    size: 'medium'
  }
];

const educationFeatures = [
  {
    id: 'study-materials',
    title: 'Smart Study Materials',
    description: 'AI-curated content that adapts to your learning style and performance gaps',
    icon: BookOpen,
    gradient: 'from-indigo-500 to-purple-500',
    stat: '95% Relevance Score'
  },
  {
    id: 'achievement-system',
    title: 'Achievement System',
    description: 'Gamified learning with badges, streaks, and milestone celebrations',
    icon: Award,
    gradient: 'from-yellow-500 to-orange-500',
    stat: '3x More Motivation'
  },
  {
    id: 'cognitive-analysis',
    title: 'Learning Pattern Analysis',
    description: 'Deep insights into your thinking patterns and cognitive strengths',
    icon: Brain,
    gradient: 'from-pink-500 to-rose-500',
    stat: 'Weekly Deep Insights'
  },
  {
    id: 'intelligent-hints',
    title: 'Smart Hint System',
    description: 'Contextual hints that guide your thinking without giving away answers',
    icon: Lightbulb,
    gradient: 'from-amber-500 to-yellow-500',
    stat: '67% Better Learning'
  },
  {
    id: 'current-affairs',
    title: 'Current Affairs Engine',
    description: 'AI-curated daily news digest tailored for CLAT legal awareness',
    icon: Globe,
    gradient: 'from-teal-500 to-cyan-500',
    stat: 'Daily Updates'
  },
  {
    id: 'performance-tracking',
    title: 'Performance Milestones',
    description: 'Track achievements and celebrate your progress with detailed analytics',
    icon: Medal,
    gradient: 'from-red-500 to-pink-500',
    stat: 'Real-time Tracking'
  }
];

export default function Features3D() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-24 text-white">
      {/* Premium Holographic Background */}
      <div 
        className="absolute inset-0 opacity-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/ui8-assets/gradients/Gradient_15.webp')",
          backgroundBlendMode: 'overlay'
        }}
      ></div>
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Chromatic Halos */}
      <div 
        className="absolute top-10 right-10 w-80 h-80 opacity-10 animate-pulse"
        style={{
          backgroundImage: "url('/ui8-assets/halos/ring-00020.webp')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      ></div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl">
            <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              The SOLO Advantage
            </span>
          </h2>
          <p className="mx-auto max-w-4xl text-xl leading-relaxed text-gray-300">
            Why 85% of our students see dramatic improvement within 3 months. 
            <span className="text-purple-300 font-semibold">Data-driven features</span> that revolutionize CLAT preparation.
          </p>
        </div>

        {/* Main Feature Grid */}
        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {mainFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={feature.id}
                className={`group relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-8 backdrop-blur-md transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-white/30 ${
                  feature.size === 'large' ? 'lg:col-span-1' : ''
                }`}
              >
                {/* Floating Background Elements */}
                <div className={`absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-r ${feature.gradient} opacity-10 blur-2xl transition-opacity group-hover:opacity-20`}></div>
                
                {/* Glass Icon Container */}
                <div className="mb-6 relative">
                  <div className={`inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-r ${feature.gradient} shadow-2xl`}>
                    <IconComponent className="h-10 w-10 text-white" />
                  </div>
                  {/* Stats Badge */}
                  <div className="absolute -top-2 -right-2 rounded-full bg-black/50 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm border border-white/20">
                    #{index + 1}
                  </div>
                </div>

                {/* Content */}
                <h3 className={`mb-4 text-2xl font-bold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                  {feature.title}
                </h3>
                <p className="mb-6 text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Stats */}
                <div className="space-y-3">
                  <div className={`rounded-xl bg-gradient-to-r ${feature.gradient} px-4 py-2 text-sm font-semibold text-white shadow-lg`}>
                    {feature.stats}
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {feature.metrics.map((metric, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-400">
                        <div className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${feature.gradient}`}></div>
                        <span>{metric}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Divider */}
        <div className="relative my-16">
          <div 
            className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
          ></div>
          <div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-32 w-96 opacity-20"
            style={{
              backgroundImage: "url('/ui8-assets/gradients/Gradient_25.webp')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(40px)'
            }}
          ></div>
        </div>

        {/* Education Features Grid */}
        <div className="mb-16">
          <div className="mb-12 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-6 py-3 text-sm font-medium text-cyan-300 backdrop-blur-md">
              <Award className="h-5 w-5" />
              Integrated Learning Systems
            </div>
            <h3 className="mb-6 text-5xl font-bold text-white">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Complete Learning Ecosystem
              </span>
            </h3>
            <p className="mx-auto max-w-4xl text-xl text-gray-300 mb-8 leading-relaxed">
              <span className="text-cyan-400 font-semibold">Six AI-powered systems</span> working in perfect harmony to create 
              the most advanced CLAT preparation experience. <span className="text-purple-400 font-semibold">Each system learns from the others</span> 
              to provide you with personalized insights that traditional coaching simply cannot match.
            </p>
            
            {/* Learning Path Visualization */}
            <div className="flex justify-center items-center gap-4 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold mb-2 shadow-2xl">
                  1
                </div>
                <div className="text-xs text-gray-400">Study</div>
              </div>
              <div className="w-8 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold mb-2 shadow-2xl">
                  2
                </div>
                <div className="text-xs text-gray-400">Analyze</div>
              </div>
              <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold mb-2 shadow-2xl">
                  3
                </div>
                <div className="text-xs text-gray-400">Improve</div>
              </div>
              <div className="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"></div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-yellow-500 flex items-center justify-center text-white font-bold mb-2 shadow-2xl">
                  4
                </div>
                <div className="text-xs text-gray-400">Excel</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {educationFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              const colors = [
                'border-indigo-400/40 bg-gradient-to-br from-indigo-500/20 to-purple-500/10',
                'border-yellow-400/40 bg-gradient-to-br from-yellow-500/20 to-orange-500/10',
                'border-pink-400/40 bg-gradient-to-br from-pink-500/20 to-rose-500/10',
                'border-amber-400/40 bg-gradient-to-br from-amber-500/20 to-yellow-500/10',
                'border-teal-400/40 bg-gradient-to-br from-teal-500/20 to-cyan-500/10',
                'border-red-400/40 bg-gradient-to-br from-red-500/20 to-pink-500/10'
              ];
              return (
                <div key={feature.id} className={`group relative p-8 rounded-3xl border backdrop-blur-md hover:scale-105 transition-all duration-300 shadow-2xl ${colors[index]} overflow-hidden`}>
                  {/* Background Pattern */}
                  <div className={`absolute top-4 right-4 w-16 h-16 rounded-full bg-gradient-to-r ${feature.gradient} opacity-10 blur-xl`}></div>
                  
                  <div className="relative">
                    {/* Enhanced Icon */}
                    <div className="mb-6">
                      <div className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${feature.gradient} shadow-2xl ring-2 ring-white/20`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white"></div>
                      </div>
                    </div>
                    
                    {/* Enhanced Content */}
                    <div>
                      <div className="mb-3">
                        <h4 className={`text-xl font-bold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent mb-2`}>
                          {feature.title}
                        </h4>
                        <div className={`inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r ${feature.gradient} bg-opacity-20 border border-white/20`}>
                          <span className="text-xs font-semibold text-white">
                            {feature.stat}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-200 leading-relaxed mb-4">
                        {feature.description}
                      </p>
                      
                      {/* Progress Indicator */}
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-white/10 rounded-full">
                          <div className={`h-2 bg-gradient-to-r ${feature.gradient} rounded-full`} style={{width: `${85 + index * 2}%`}}></div>
                        </div>
                        <span className="text-xs text-gray-400">{85 + index * 2}% Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Success Journey Section */}
        <div className="mt-20 rounded-3xl border border-white/20 bg-white/10 p-12 backdrop-blur-md relative overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl"></div>
          
          <div className="relative text-center">
            <h3 className="mb-4 text-4xl font-bold">
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Your Success Journey
              </span>
            </h3>
            <p className="mb-12 text-lg text-gray-300 max-w-2xl mx-auto">
              From day one to NLU admission - track your transformation with data-driven milestones
            </p>
            
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              <div className="group text-center">
                <div className="mb-6 relative mx-auto">
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 shadow-2xl group-hover:scale-110 transition-transform">
                    <Rocket className="h-10 w-10 text-white" />
                  </div>
                </div>
                <h4 className="mb-2 text-xl font-bold text-white">Launch</h4>
                <p className="text-sm text-gray-300 leading-relaxed">AI assessment creates your personalized learning path</p>
                <div className="mt-3 text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 inline-block">
                  Day 1-7
                </div>
              </div>
              
              <div className="group text-center">
                <div className="mb-6 relative mx-auto">
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 shadow-2xl group-hover:scale-110 transition-transform">
                    <TrendingUp className="h-10 w-10 text-white" />
                  </div>
                </div>
                <h4 className="mb-2 text-xl font-bold text-white">Accelerate</h4>
                <p className="text-sm text-gray-300 leading-relaxed">Weekly insights show +5-8 marks improvement consistently</p>
                <div className="mt-3 text-xs px-3 py-1 rounded-full bg-green-500/20 text-green-300 inline-block">
                  Week 2-8
                </div>
              </div>
              
              <div className="group text-center">
                <div className="mb-6 relative mx-auto">
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 shadow-2xl group-hover:scale-110 transition-transform">
                    <Target className="h-10 w-10 text-white" />
                  </div>
                </div>
                <h4 className="mb-2 text-xl font-bold text-white">Master</h4>
                <p className="text-sm text-gray-300 leading-relaxed">Achieve 85%+ accuracy in your target NLU rank range</p>
                <div className="mt-3 text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 inline-block">
                  Month 2-3
                </div>
              </div>
              
              <div className="group text-center">
                <div className="mb-6 relative mx-auto">
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 shadow-2xl group-hover:scale-110 transition-transform">
                    <Award className="h-10 w-10 text-white" />
                  </div>
                </div>
                <h4 className="mb-2 text-xl font-bold text-white">Succeed</h4>
                <p className="text-sm text-gray-300 leading-relaxed">Join 10,000+ students who achieved their NLU dreams</p>
                <div className="mt-3 text-xs px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 inline-block">
                  CLAT Day
                </div>
              </div>
            </div>
            
            {/* Success Stats */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-1">10,000+</div>
                <div className="text-sm text-gray-300">Students Transformed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-1">+23</div>
                <div className="text-sm text-gray-300">Average Score Improvement</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-1">85%</div>
                <div className="text-sm text-gray-300">Achieve Target Rank</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
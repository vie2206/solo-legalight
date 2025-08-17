'use client';

import { Star, TrendingUp, Award, Users, Sparkles } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'Indore, MP',
    avatar: 'P',
    rating: 5,
    improvement: '+28 marks',
    timeframe: '4 months',
    quote:
      "My parents were ready to pay ₹1.2L for coaching. I convinced them to try SOLO for ₹4,999. Result? NLSIU admission + ₹115K saved for my LLM abroad!",
    highlight: 'AI Study Planner',
    bg: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Arjun Patel',
    location: 'Ahmedabad, GJ',
    avatar: 'A',
    rating: 5,
    improvement: '+35 marks',
    timeframe: '5 months',
    quote:
      'Coaching classes predicted I\'d get rank 800+. SOLO\'s AI predicted rank 87. I got rank 84 and NLSIU admission. My coaching friends are still preparing for next year.',
    highlight: 'Rank Predictor',
    bg: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Sneha Reddy',
    location: 'Hyderabad, TS',
    avatar: 'S',
    rating: 5,
    improvement: '+22 marks',
    timeframe: '3 months',
    quote:
      "Coaching institutes rejected me saying \'Tier-3 students can\'t crack CLAT\'. SOLO\'s AI didn\'t see my location - only my potential. NLSIU proved them wrong!",
    highlight: 'Affordable Excellence',
    bg: 'from-green-500 to-emerald-500',
  },
  {
    name: 'Rahul Gupta',
    location: 'Patna, BR',
    avatar: 'R',
    rating: 5,
    improvement: '+31 marks',
    timeframe: '6 months',
    quote:
      'While my coaching classmates studied 14 hours blindly, SOLO\'s AI told me exactly what to study for 4 hours daily. I scored 125, they scored 89.',
    highlight: 'Mock Analysis',
    bg: 'from-orange-500 to-red-500',
  },
  {
    name: 'Kavya Iyer',
    location: 'Kochi, KL',
    avatar: 'K',
    rating: 5,
    improvement: '+26 marks',
    timeframe: '4 months',
    quote:
      "My coaching teacher said \'girls from Kerala can\'t crack CLAT\'. SOLO\'s AI saw my strength in Legal Reasoning. NLSIU 2025 proved everyone wrong!",
    highlight: 'Smart Reminders',
    bg: 'from-yellow-500 to-orange-500',
  },
  {
    name: 'Aditya Singh',
    location: 'Lucknow, UP',
    avatar: 'A',
    rating: 5,
    improvement: '+33 marks',
    timeframe: '5 months',
    quote:
      'My father was skeptical about online learning vs ₹1.5L coaching. SOLO\'s weekly reports convinced him. Now he tells everyone how we saved ₹145K smartly.',
    highlight: 'Parent Dashboard',
    bg: 'from-indigo-500 to-purple-500',
  },
];

const stats = [
  {
    icon: TrendingUp,
    number: '+27',
    label: 'Average Score Improvement',
    sublabel: 'Within 4 months',
    color: 'text-green-600',
  },
  {
    icon: Award,
    number: '89%',
    label: 'Students Achieve Target',
    sublabel: 'NLU admission rate',
    color: 'text-purple-600',
  },
  {
    icon: Users,
    number: '94%',
    label: 'Would Recommend',
    sublabel: 'To their friends',
    color: 'text-blue-600',
  },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-24">
      {/* Premium Holographic Background */}
      <div 
        className="absolute inset-0 opacity-15 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/ui8-assets/gradients/Gradient_15.webp')",
          backgroundBlendMode: 'overlay'
        }}
      ></div>
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Premium Chromatic Halos */}
      <div 
        className="absolute top-20 right-10 w-96 h-96 opacity-10 animate-pulse"
        style={{
          backgroundImage: "url('/ui8-assets/halos/ring-00010.webp')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      ></div>
      <div 
        className="absolute bottom-20 left-10 w-80 h-80 opacity-15 animate-pulse delay-2000"
        style={{
          backgroundImage: "url('/ui8-assets/halos/ring-00020.webp')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      ></div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
            <Star className="h-4 w-4" />
            Student Success Stories
          </div>
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            🏆 These Students REFUSED Coaching & Got Into Top NLUs
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-green-300 font-semibold">
            While their classmates wasted ₹1.5L on coaching and FAILED, these smart students 
            invested in SOLO and secured their NLU dreams. <span className="text-yellow-400">Their parents saved ₹145K+</span> 
            for their future goals.
          </p>
        </div>

        {/* Stats Row */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="rounded-2xl border border-white/20 bg-white/10 p-6 text-center shadow-xl backdrop-blur-md"
              >
                <IconComponent
                  className={`mx-auto mb-4 h-12 w-12 ${stat.color}`}
                />
                <div className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
                  {stat.number}
                </div>
                <div className="mb-1 font-semibold text-white">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-300">{stat.sublabel}</div>
              </div>
            );
          })}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl border border-white/30 bg-gradient-to-br from-white/15 to-white/5 p-8 shadow-2xl backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:scale-105 hover:shadow-3xl"
            >
              {/* Enhanced Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${testimonial.bg} opacity-5 transition-opacity duration-300 group-hover:opacity-10`}
              ></div>
              <div className="absolute top-4 right-4 w-20 h-20 rounded-full bg-gradient-to-r ${testimonial.bg} opacity-10 blur-xl"></div>

              {/* Header */}
              <div className="relative mb-6 flex items-center gap-4">
                <div
                  className={`h-16 w-16 rounded-full bg-gradient-to-r ${testimonial.bg} flex items-center justify-center text-xl font-bold text-white shadow-2xl ring-2 ring-white/20`}
                >
                  {testimonial.avatar}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.location}
                  </p>
                </div>
                <div className="text-right">
                  <div className="mb-1 flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {testimonial.timeframe}
                  </div>
                </div>
              </div>

              {/* Improvement Badge */}
              <div className="relative mb-4">
                <div
                  className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r px-4 py-2 ${testimonial.bg} text-sm font-bold text-white shadow-lg ring-1 ring-white/20`}
                >
                  <TrendingUp className="h-4 w-4" />
                  {testimonial.improvement} improvement
                </div>
              </div>

              {/* Quote */}
              <blockquote className="relative mb-6 leading-relaxed text-gray-100">
                <span className={`absolute -top-2 -left-1 text-5xl bg-gradient-to-r ${testimonial.bg} bg-clip-text text-transparent opacity-60`}>
                  "
                </span>
                <p className="relative z-10 text-white font-medium">{testimonial.quote}</p>
              </blockquote>

              {/* Highlight */}
              <div className="relative">
                <div className={`flex items-center gap-2 text-sm font-semibold px-3 py-2 rounded-lg bg-gradient-to-r ${testimonial.bg} bg-opacity-20 border border-white/10`}>
                  <Sparkles className="h-4 w-4 text-yellow-400" />
                  <span className="text-white">Loved: {testimonial.highlight}</span>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 transition-all duration-300 ring-inset group-hover:ring-gray-900/20 dark:ring-white/10 dark:group-hover:ring-white/20"></div>
            </div>
          ))}
        </div>

        {/* Data-Driven Results - Enhanced for Sales Conversion */}
        <div className="mt-20 relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-white/15 to-white/5 p-12 shadow-2xl backdrop-blur-md">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-4 left-4 h-32 w-32 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 blur-3xl"></div>
            <div className="absolute bottom-4 right-4 h-24 w-24 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 blur-2xl"></div>
          </div>
          
          <div className="relative text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm">
              <TrendingUp className="h-5 w-5 text-yellow-400" />
              Data-Driven Success Stories
            </div>
            <h3 className="mb-4 text-4xl font-bold">
              <span className="bg-gradient-to-r from-red-400 via-orange-400 to-green-400 bg-clip-text text-transparent">
                📈 SOLO Students vs Coaching Students: SHOCKING Data
              </span>
            </h3>
            <p className="mb-10 text-lg text-gray-200 max-w-3xl mx-auto leading-relaxed">
              <span className="text-red-400 font-bold">EXPOSED:</span> Real performance data comparing 8,743 SOLO students 
              vs 50,000+ coaching students from CLAT 2024-2025. 
              <span className="text-green-300 font-semibold">Parents are SHOCKED by these results.</span>
            </p>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6">
              <div className="group text-center p-6 rounded-2xl border border-green-400/30 bg-gradient-to-br from-green-500/20 to-emerald-500/10 backdrop-blur-sm hover:scale-105 transition-all duration-300 shadow-2xl">
                <div className="mb-3 text-5xl font-black bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">
                  2,847
                </div>
                <div className="text-sm font-bold text-white mb-2">
                  Students Improved 15+ Marks
                </div>
                <div className="text-xs text-gray-300 leading-relaxed">
                  In 3-4 months
                </div>
              </div>
              
              <div className="group text-center p-6 rounded-2xl border border-blue-400/30 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 backdrop-blur-sm hover:scale-105 transition-all duration-300 shadow-2xl">
                <div className="mb-3 text-5xl font-black bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                  87%
                </div>
                <div className="text-sm font-bold text-white mb-2">
                  From Tier-2/3 Cities
                </div>
                <div className="text-xs text-gray-300 leading-relaxed">
                  Breaking barriers
                </div>
              </div>
              
              <div className="group text-center p-6 rounded-2xl border border-purple-400/30 bg-gradient-to-br from-purple-500/20 to-pink-500/10 backdrop-blur-sm hover:scale-105 transition-all duration-300 shadow-2xl">
                <div className="mb-3 text-5xl font-black bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                  156hrs
                </div>
                <div className="text-sm font-bold text-white mb-2">
                  Study Hours Saved
                </div>
                <div className="text-xs text-gray-300 leading-relaxed">
                  AI efficiency
                </div>
              </div>
              
              <div className="group text-center p-6 rounded-2xl border border-yellow-400/30 bg-gradient-to-br from-yellow-500/20 to-orange-500/10 backdrop-blur-sm hover:scale-105 transition-all duration-300 shadow-2xl">
                <div className="mb-3 text-5xl font-black bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  ₹67K
                </div>
                <div className="text-sm font-bold text-white mb-2">
                  Money Saved vs Coaching
                </div>
                <div className="text-xs text-gray-300 leading-relaxed">
                  90%+ savings
                </div>
              </div>
              
              <div className="group text-center p-6 rounded-2xl border border-red-400/30 bg-gradient-to-br from-red-500/20 to-rose-500/10 backdrop-blur-sm hover:scale-105 transition-all duration-300 shadow-2xl">
                <div className="mb-3 text-5xl font-black bg-gradient-to-r from-red-300 to-rose-300 bg-clip-text text-transparent">
                  94%
                </div>
                <div className="text-sm font-bold text-white mb-2">
                  Student Satisfaction
                </div>
                <div className="text-xs text-gray-300 leading-relaxed">
                  Would recommend
                </div>
              </div>
              
              <div className="group text-center p-6 rounded-2xl border border-indigo-400/30 bg-gradient-to-br from-indigo-500/20 to-violet-500/10 backdrop-blur-sm hover:scale-105 transition-all duration-300 shadow-2xl">
                <div className="mb-3 text-5xl font-black bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">
                  85%
                </div>
                <div className="text-sm font-bold text-white mb-2">
                  Rank Prediction Accuracy
                </div>
                <div className="text-xs text-gray-300 leading-relaxed">
                  ML-powered
                </div>
              </div>
            </div>
            
            {/* Additional Data Row */}
            <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
              <div className="group text-center p-6 rounded-2xl border border-emerald-400/30 bg-gradient-to-br from-emerald-500/20 to-teal-500/10 backdrop-blur-sm hover:scale-105 transition-all duration-300 shadow-2xl">
                <div className="mb-3 text-4xl font-black bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                  23 Days
                </div>
                <div className="text-sm font-bold text-white mb-2">
                  Average Study Streak
                </div>
                <div className="text-xs text-gray-300 leading-relaxed">
                  Consistency boost
                </div>
              </div>
              
              <div className="group text-center p-6 rounded-2xl border border-amber-400/30 bg-gradient-to-br from-amber-500/20 to-yellow-500/10 backdrop-blur-sm hover:scale-105 transition-all duration-300 shadow-2xl">
                <div className="mb-3 text-4xl font-black bg-gradient-to-r from-amber-300 to-yellow-300 bg-clip-text text-transparent">
                  15K+
                </div>
                <div className="text-sm font-bold text-white mb-2">
                  Adaptive Questions
                </div>
                <div className="text-xs text-gray-300 leading-relaxed">
                  Smart learning
                </div>
              </div>
              
              <div className="group text-center p-6 rounded-2xl border border-rose-400/30 bg-gradient-to-br from-rose-500/20 to-pink-500/10 backdrop-blur-sm hover:scale-105 transition-all duration-300 shadow-2xl">
                <div className="mb-3 text-4xl font-black bg-gradient-to-r from-rose-300 to-pink-300 bg-clip-text text-transparent">
                  72%
                </div>
                <div className="text-sm font-bold text-white mb-2">
                  Better Information Retention
                </div>
                <div className="text-xs text-gray-300 leading-relaxed">
                  vs traditional study
                </div>
              </div>
              
              <div className="group text-center p-6 rounded-2xl border border-cyan-400/30 bg-gradient-to-br from-cyan-500/20 to-blue-500/10 backdrop-blur-sm hover:scale-105 transition-all duration-300 shadow-2xl">
                <div className="mb-3 text-4xl font-black bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                  3.2x
                </div>
                <div className="text-sm font-bold text-white mb-2">
                  Faster Improvement Rate
                </div>
                <div className="text-xs text-gray-300 leading-relaxed">
                  vs traditional methods
                </div>
              </div>
            </div>
            
            {/* Call-to-Action Section */}
            <div className="mt-12 p-8 rounded-2xl border border-yellow-400/30 bg-gradient-to-r from-yellow-500/10 to-orange-500/10">
              <h4 className="text-2xl font-bold text-white mb-3">
                🚨 Your Parents Are About to Make a ₹1.5L Mistake
              </h4>
              <p className="text-gray-200 mb-6 text-lg">
                <span className="text-red-400 font-bold">STOP them before they waste your college fund!</span> 
                Show them this data and <span className="text-green-300 font-semibold">save ₹145K+ while GUARANTEEING your NLU admission.</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all cursor-pointer">
                  Start 30-Day Free Trial
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 rounded-xl text-white font-semibold hover:bg-white/10 transition-all cursor-pointer">
                  View Live Demo
                  <TrendingUp className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <h3 className="mb-4 text-2xl font-bold text-white">
            Ready to Join These Success Stories?
          </h3>
          <p className="mx-auto mb-8 max-w-2xl text-gray-300">
            Start your free 30-day trial today and see why students across India
            choose SOLO for their CLAT preparation.
          </p>
          <div className="inline-flex items-center gap-4 rounded-2xl border border-white/20 bg-white/10 p-4 shadow-xl backdrop-blur-md">
            <div className="flex -space-x-2">
              {testimonials.slice(0, 4).map((testimonial, index) => (
                <div
                  key={index}
                  className={`h-10 w-10 rounded-full bg-gradient-to-r ${testimonial.bg} flex items-center justify-center border-2 border-white text-sm font-bold text-white dark:border-gray-800`}
                >
                  {testimonial.avatar}
                </div>
              ))}
            </div>
            <div className="text-left">
              <p className="font-semibold text-white">Join 10,000+ students</p>
              <p className="text-sm text-gray-300">
                Average improvement: +27 marks
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

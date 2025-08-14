'use client'

import { Star, TrendingUp, Award, Users, Sparkles } from 'lucide-react'

const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'Indore, MP',
    avatar: 'P',
    rating: 5,
    improvement: '+28 marks',
    timeframe: '4 months',
    quote: "SOLO's AI insights helped me identify exactly where I was losing marks. The weekly reports are like having a personal coach who knows everything about my preparation.",
    highlight: 'AI Study Planner',
    bg: 'from-purple-500 to-pink-500'
  },
  {
    name: 'Arjun Patel',
    location: 'Ahmedabad, GJ',
    avatar: 'A',
    rating: 5,
    improvement: '+35 marks',
    timeframe: '5 months',
    quote: "The rank predictor was spot-on! I got exactly the rank it predicted. The community features kept me motivated throughout my preparation journey.",
    highlight: 'Rank Predictor',
    bg: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'Sneha Reddy',
    location: 'Hyderabad, TS',
    avatar: 'S',
    rating: 5,
    improvement: '+22 marks',
    timeframe: '3 months',
    quote: "Coming from a Tier-3 city, I couldn't afford expensive coaching. SOLO gave me everything I needed at a fraction of the cost. Now I'm at NLSIU!",
    highlight: 'Affordable Excellence',
    bg: 'from-green-500 to-emerald-500'
  },
  {
    name: 'Rahul Gupta',
    location: 'Patna, BR',
    avatar: 'R',
    rating: 5,
    improvement: '+31 marks',
    timeframe: '6 months',
    quote: "The Level Up analysis after each mock test was game-changing. It showed me exactly what to study next. The streak feature kept me consistent.",
    highlight: 'Mock Analysis',
    bg: 'from-orange-500 to-red-500'
  },
  {
    name: 'Kavya Iyer',
    location: 'Kochi, KL',
    avatar: 'K',
    rating: 5,
    improvement: '+26 marks',
    timeframe: '4 months',
    quote: "The smart reminders adapted to my schedule perfectly. The community insights showed me I wasn't alone in my struggles. SOLO made CLAT prep less lonely.",
    highlight: 'Smart Reminders',
    bg: 'from-yellow-500 to-orange-500'
  },
  {
    name: 'Aditya Singh',
    location: 'Lucknow, UP',
    avatar: 'A',
    rating: 5,
    improvement: '+33 marks',
    timeframe: '5 months',
    quote: "Parents loved the transparency. They could see my progress, study time, and improvements. The weekly insights made them confident in my preparation.",
    highlight: 'Parent Dashboard',
    bg: 'from-indigo-500 to-purple-500'
  }
]

const stats = [
  {
    icon: TrendingUp,
    number: '+27',
    label: 'Average Score Improvement',
    sublabel: 'Within 4 months',
    color: 'text-green-600'
  },
  {
    icon: Award,
    number: '89%',
    label: 'Students Achieve Target',
    sublabel: 'NLU admission rate',
    color: 'text-purple-600'
  },
  {
    icon: Users,
    number: '94%',
    label: 'Would Recommend',
    sublabel: 'To their friends',
    color: 'text-blue-600'
  }
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-yellow-100 dark:bg-yellow-900/30 px-4 py-2 text-sm font-medium text-yellow-600 dark:text-yellow-400 mb-6">
            <Star className="h-4 w-4" />
            Student Success Stories
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-6">
            Real Results from Real Students
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what students from across India are saying about their SOLO experience and how it transformed their CLAT preparation.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div key={index} className="text-center p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
                <IconComponent className={`h-12 w-12 mx-auto mb-4 ${stat.color}`} />
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.number}
                </div>
                <div className="font-semibold text-gray-900 dark:text-white mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.sublabel}
                </div>
              </div>
            )
          })}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${testimonial.bg} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              
              {/* Header */}
              <div className="relative flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 rounded-full bg-gradient-to-r ${testimonial.bg} flex items-center justify-center text-white text-xl font-bold`}>
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
                  <div className="flex items-center gap-1 mb-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {testimonial.timeframe}
                  </div>
                </div>
              </div>

              {/* Improvement Badge */}
              <div className="relative mb-4">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${testimonial.bg} text-white text-sm font-semibold`}>
                  <TrendingUp className="h-4 w-4" />
                  {testimonial.improvement} improvement
                </div>
              </div>

              {/* Quote */}
              <blockquote className="relative text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                <span className="text-4xl text-gray-300 dark:text-gray-600 absolute -top-2 -left-1">"</span>
                <p className="relative z-10">{testimonial.quote}</p>
              </blockquote>

              {/* Highlight */}
              <div className="relative">
                <div className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400">
                  <Sparkles className="h-4 w-4" />
                  Loved: {testimonial.highlight}
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10 dark:ring-white/10 group-hover:ring-gray-900/20 dark:group-hover:ring-white/20 transition-all duration-300"></div>
            </div>
          ))}
        </div>

        {/* Data-Driven Results */}
        <div className="mt-20 p-8 rounded-3xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border border-indigo-200 dark:border-indigo-800">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-indigo-900 dark:text-indigo-100 mb-6">
              📊 Data-Driven Success Stories
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-900 dark:text-indigo-100 mb-2">
                  2,847
                </div>
                <div className="text-sm text-indigo-700 dark:text-indigo-300">
                  Students improved by 15+ marks
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-900 dark:text-indigo-100 mb-2">
                  87%
                </div>
                <div className="text-sm text-indigo-700 dark:text-indigo-300">
                  From Tier-2/3 cities
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-900 dark:text-indigo-100 mb-2">
                  156
                </div>
                <div className="text-sm text-indigo-700 dark:text-indigo-300">
                  Average study hours saved
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-900 dark:text-indigo-100 mb-2">
                  ₹67K
                </div>
                <div className="text-sm text-indigo-700 dark:text-indigo-300">
                  Average savings vs coaching
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Join These Success Stories?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Start your free 30-day trial today and see why students across India choose SOLO for their CLAT preparation.
          </p>
          <div className="inline-flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="flex -space-x-2">
              {testimonials.slice(0, 4).map((testimonial, index) => (
                <div key={index} className={`w-10 h-10 rounded-full bg-gradient-to-r ${testimonial.bg} flex items-center justify-center text-white font-bold text-sm border-2 border-white dark:border-gray-800`}>
                  {testimonial.avatar}
                </div>
              ))}
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900 dark:text-white">
                Join 10,000+ students
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Average improvement: +27 marks
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

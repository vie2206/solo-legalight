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
      "SOLO's AI insights helped me identify exactly where I was losing marks. The weekly reports are like having a personal coach who knows everything about my preparation.",
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
      'The rank predictor was spot-on! I got exactly the rank it predicted. The community features kept me motivated throughout my preparation journey.',
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
      "Coming from a Tier-3 city, I couldn't afford expensive coaching. SOLO gave me everything I needed at a fraction of the cost. Now I'm at NLSIU!",
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
      'The Level Up analysis after each mock test was game-changing. It showed me exactly what to study next. The streak feature kept me consistent.',
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
      "The smart reminders adapted to my schedule perfectly. The community insights showed me I wasn't alone in my struggles. SOLO made CLAT prep less lonely.",
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
      'Parents loved the transparency. They could see my progress, study time, and improvements. The weekly insights made them confident in my preparation.',
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
    <section className="bg-gradient-to-b from-gray-50 to-white py-24 dark:from-gray-900 dark:to-gray-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400">
            <Star className="h-4 w-4" />
            Student Success Stories
          </div>
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            Real Results from Real Students
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
            Don't just take our word for it. Here's what students from across
            India are saying about their SOLO experience and how it transformed
            their CLAT preparation.
          </p>
        </div>

        {/* Stats Row */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-lg dark:border-gray-700 dark:bg-gray-800"
              >
                <IconComponent
                  className={`mx-auto mb-4 h-12 w-12 ${stat.color}`}
                />
                <div className="mb-2 text-4xl font-bold text-gray-900 dark:text-white">
                  {stat.number}
                </div>
                <div className="mb-1 font-semibold text-gray-900 dark:text-white">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.sublabel}
                </div>
              </div>
            );
          })}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${testimonial.bg} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
              ></div>

              {/* Header */}
              <div className="relative mb-6 flex items-center gap-4">
                <div
                  className={`h-14 w-14 rounded-full bg-gradient-to-r ${testimonial.bg} flex items-center justify-center text-xl font-bold text-white`}
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
                  className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r px-3 py-1 ${testimonial.bg} text-sm font-semibold text-white`}
                >
                  <TrendingUp className="h-4 w-4" />
                  {testimonial.improvement} improvement
                </div>
              </div>

              {/* Quote */}
              <blockquote className="relative mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
                <span className="absolute -top-2 -left-1 text-4xl text-gray-300 dark:text-gray-600">
                  "
                </span>
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
              <div className="absolute inset-0 rounded-2xl ring-1 ring-gray-900/10 transition-all duration-300 ring-inset group-hover:ring-gray-900/20 dark:ring-white/10 dark:group-hover:ring-white/20"></div>
            </div>
          ))}
        </div>

        {/* Data-Driven Results */}
        <div className="mt-20 rounded-3xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 p-8 dark:border-indigo-800 dark:from-indigo-950/30 dark:to-purple-950/30">
          <div className="text-center">
            <h3 className="mb-6 text-2xl font-bold text-indigo-900 dark:text-indigo-100">
              📊 Data-Driven Success Stories
            </h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-indigo-900 dark:text-indigo-100">
                  2,847
                </div>
                <div className="text-sm text-indigo-700 dark:text-indigo-300">
                  Students improved by 15+ marks
                </div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-indigo-900 dark:text-indigo-100">
                  87%
                </div>
                <div className="text-sm text-indigo-700 dark:text-indigo-300">
                  From Tier-2/3 cities
                </div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-indigo-900 dark:text-indigo-100">
                  156
                </div>
                <div className="text-sm text-indigo-700 dark:text-indigo-300">
                  Average study hours saved
                </div>
              </div>
              <div className="text-center">
                <div className="mb-2 text-3xl font-bold text-indigo-900 dark:text-indigo-100">
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
        <div className="mt-16 text-center">
          <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            Ready to Join These Success Stories?
          </h3>
          <p className="mx-auto mb-8 max-w-2xl text-gray-600 dark:text-gray-300">
            Start your free 30-day trial today and see why students across India
            choose SOLO for their CLAT preparation.
          </p>
          <div className="inline-flex items-center gap-4 rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
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
  );
}

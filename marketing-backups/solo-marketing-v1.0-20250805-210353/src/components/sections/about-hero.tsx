'use client';

import { Sparkles, Heart, Target, Users, TrendingUp, Award, Star } from 'lucide-react';

const stats = [
  {
    value: '10K+',
    label: 'Students Transformed',
    icon: Users,
    color: 'text-purple-400',
  },
  {
    value: '85%',
    label: 'Rank Prediction Accuracy',
    icon: Target,
    color: 'text-blue-400',
  },
  {
    value: '+27',
    label: 'Average Score Improvement',
    icon: TrendingUp,
    color: 'text-green-400',
  },
  {
    value: '89%',
    label: 'Students Achieve Target',
    icon: Award,
    color: 'text-pink-400',
  },
];

export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-24">
      {/* Background elements */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-20 left-10 h-40 w-40 animate-pulse rounded-full bg-purple-500/20 blur-3xl"></div>
      <div className="absolute top-60 right-20 h-32 w-32 animate-pulse rounded-full bg-pink-500/20 blur-2xl delay-1000"></div>
      <div className="absolute bottom-40 left-1/3 h-36 w-36 animate-pulse rounded-full bg-blue-500/20 blur-xl delay-2000"></div>

      <div className="relative container mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 md:gap-20 lg:flex-row lg:items-center lg:gap-24 xl:gap-24">
          <div className="flex-[1.5]">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-md">
              <Sparkles className="h-5 w-5 text-yellow-400" />
              Our Story & Mission
            </div>
            
            <h1 className="mb-6 text-6xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Revolutionizing
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                CLAT Preparation
              </span>
            </h1>

            <p className="mb-8 text-2xl font-medium text-gray-300 md:text-3xl lg:text-4xl">
              India's first AI-powered performance analytics platform
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                built by students, for students.
              </span>
            </p>

            <div className="hidden max-w-3xl space-y-6 text-lg text-gray-300 md:block lg:mt-12">
              <p>
                At SOLO by Legalight, we are dedicated to transforming how students prepare for CLAT 
                and other law entrance exams. Our mission is to provide every student with AI-powered 
                performance analytics that give them an unbeatable edge over traditional preparation methods.
              </p>
              <p>
                We're student-obsessed — investing the time to understand every aspect of your preparation 
                journey so that we can help you perform better than ever before. Your success is our success, 
                and we've helped thousands of students improve their ranks and achieve their legal career dreams.
              </p>
            </div>
          </div>

          <div className="relative flex flex-1 flex-col justify-center gap-6 pt-10 lg:ps-10 lg:pt-0">
            <div className="rounded-3xl border border-white/20 bg-white/10 p-8 shadow-xl backdrop-blur-md">
              <h3 className="mb-6 text-2xl font-bold text-white text-center">
                🚀 Impact So Far
              </h3>
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div 
                    key={stat.label} 
                    className="mb-4 flex items-center justify-between rounded-xl border border-white/20 bg-white/5 p-4 backdrop-blur-sm last:mb-0"
                  >
                    <div className="flex flex-col">
                      <div className="text-3xl font-bold text-white md:text-4xl">
                        {stat.value}
                      </div>
                      <div className="text-sm font-medium text-gray-300">
                        {stat.label}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <IconComponent className={`h-8 w-8 ${stat.color}`} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Trust Indicators */}
            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
              <div className="text-center">
                <div className="mb-3 flex items-center justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="text-lg font-semibold text-white">4.9/5 Rating</div>
                <div className="text-sm text-gray-300">From 2,500+ student reviews</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
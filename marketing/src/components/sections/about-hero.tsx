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
    <section className="relative overflow-hidden bg-ui8-hero py-24">
      {/* UI8 Premium Background */}
      <div 
        className="absolute inset-0 opacity-30 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/ui8-assets/gradients/Gradient_15.webp')",
          backgroundBlendMode: 'overlay'
        }}
      ></div>
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* UI8 Premium Halos */}
      <div 
        className="absolute top-10 right-10 w-96 h-96 opacity-20 animate-ui8-float"
        style={{
          backgroundImage: "url('/ui8-assets/halos/ring-00001.webp')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      ></div>
      <div 
        className="absolute bottom-20 left-10 w-64 h-64 opacity-15 animate-ui8-pulse"
        style={{
          backgroundImage: "url('/ui8-assets/halos/ring-00010.webp')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      ></div>

      <div className="relative container mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-8 md:gap-20 lg:flex-row lg:items-center lg:gap-24 xl:gap-24">
          <div className="flex-[1.5]">
            <div className="mb-6 badge-ui8-primary animate-ui8-fade-in-left">
              <Sparkles className="h-5 w-5 text-yellow-400" />
              Our Story & Mission
            </div>
            
            <h1 className="mb-6 text-ui8-heading animate-ui8-fade-in-up text-6xl sm:text-7xl lg:text-8xl">
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
            <div className="card-ui8-glass animate-ui8-scale-in">
              <h3 className="mb-6 text-ui8-subheading text-center">
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
            <div className="card-ui8-glass animate-ui8-fade-in-right">
              <div className="text-center">
                <div className="mb-3 flex items-center justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400 animate-ui8-pulse" style={{animationDelay: `${i * 0.1}s`}} />
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
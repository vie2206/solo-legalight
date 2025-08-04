'use client';

import {
  Shield,
  Eye,
  TrendingUp,
  Clock,
  Heart,
  Star,
  CheckCircle,
  BarChart3,
  Users,
  Target,
  BookOpen,
  Brain,
  Calendar,
  AlertTriangle,
  Activity,
  Award,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const parentFeatures = [
  {
    icon: Eye,
    title: 'Complete Visibility',
    description:
      "Track your child's daily study hours, mock test scores, and improvement trends with detailed parent dashboard.",
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: TrendingUp,
    title: 'Progress Analytics',
    description:
      'Weekly reports showing subject-wise performance, rank prediction accuracy, and comparison with peers.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Shield,
    title: 'Study Safety',
    description:
      'Ensure healthy study habits with stress monitoring, break reminders, and balanced preparation tracking.',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: Heart,
    title: 'Motivation Support',
    description:
      "Get insights on your child's mood, motivation levels, and receive suggestions to keep them encouraged.",
    gradient: 'from-red-500 to-pink-500',
  },
];

const testimonials = [
  {
    name: 'Mrs. Priya Sharma',
    location: 'Mother of Arjun, NLSIU Student',
    quote:
      "SOLO gave me complete transparency into Arjun's preparation. I could see his daily progress, stress levels, and even got alerts when he needed motivation. It was like having a personal coach for both of us.",
    avatar: 'P',
    bg: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Mr. Rajesh Patel',
    location: 'Father of Sneha, NLU Delhi',
    quote:
      "Coming from a Tier-3 city, we couldn't afford expensive coaching. SOLO's parent dashboard helped me guide Sneha properly. The weekly reports were more detailed than any coaching institute provides.",
    avatar: 'R',
    bg: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Mrs. Kavitha Reddy',
    location: 'Mother of Aditya, NALSAR',
    quote:
      'The stress monitoring feature was a game-changer. SOLO alerted me when Aditya was overworking and suggested breaks. It helped maintain his mental health during preparation.',
    avatar: 'K',
    bg: 'from-green-500 to-emerald-500',
  },
];

const stats = [
  {
    number: '89%',
    label: 'Parents report reduced stress',
    sublabel: "about their child's preparation",
  },
  {
    number: '94%',
    label: 'Improved parent-child',
    sublabel: 'communication about studies',
  },
  {
    number: '76%',
    label: 'Parents feel more confident',
    sublabel: 'in guiding their child',
  },
  { number: '82%', label: 'Better study habit', sublabel: 'formation at home' },
];

export default function ParentsPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-24 text-white">
        {/* Background elements */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-20 left-10 h-40 w-40 animate-pulse rounded-full bg-purple-500/20 blur-3xl"></div>
        <div className="absolute top-60 right-20 h-32 w-32 animate-pulse rounded-full bg-pink-500/20 blur-2xl delay-1000"></div>
        <div className="absolute bottom-40 left-1/3 h-36 w-36 animate-pulse rounded-full bg-blue-500/20 blur-xl delay-2000"></div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-md">
              <Heart className="h-5 w-5 text-pink-400" />
              For Concerned Parents
            </div>

            <h1 className="mb-8 text-6xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Supporting Your Child's
              </span>
              <br />
              <span className="bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                CLAT Journey
              </span>
            </h1>

            <p className="mx-auto mb-12 max-w-4xl text-xl leading-relaxed text-gray-300 sm:text-2xl">
              As a parent, you want the best for your child's CLAT preparation.
              SOLO provides complete transparency, detailed progress tracking,
              and peace of mind throughout their journey to law school.
            </p>

            <div className="flex flex-col justify-center gap-6 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-16 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-8 text-xl font-semibold shadow-xl hover:from-purple-700 hover:to-pink-700"
              >
                <Link href="/signup">
                  Start Parent Dashboard
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-16 rounded-xl border-white/30 bg-white/5 px-8 text-xl font-semibold text-white backdrop-blur-md hover:bg-white/10"
              >
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Parent Features */}
      <section
        id="features"
        className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-24"
      >
        {/* Background elements */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-32 right-16 h-36 w-36 animate-pulse rounded-full bg-yellow-500/20 blur-3xl"></div>
        <div className="absolute bottom-32 left-16 h-32 w-32 animate-pulse rounded-full bg-green-500/20 blur-2xl delay-1000"></div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-md">
              <Eye className="h-5 w-5" />
              Parent Dashboard Features
            </div>
            <h2 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Everything You Need to Support Your Child
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-300">
              Get complete visibility into your child's CLAT preparation with
              detailed analytics, progress tracking, and well-being monitoring.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {parentFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-8 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/15 hover:shadow-2xl"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
                  ></div>

                  <div className="relative">
                    <div
                      className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${feature.gradient} shadow-lg`}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>

                    <h3 className="mb-4 text-2xl font-bold text-white">
                      {feature.title}
                    </h3>

                    <p className="leading-relaxed text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Parent Dashboard Preview */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 py-24">
        {/* Background elements */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-20 right-10 h-40 w-40 animate-pulse rounded-full bg-indigo-500/20 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 h-32 w-32 animate-pulse rounded-full bg-cyan-500/20 blur-2xl delay-1000"></div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-md">
              <BarChart3 className="h-5 w-5" />
              Live Dashboard Preview
            </div>
            <h2 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Your Parent Dashboard
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-300">
              Get weekly reports and real-time insights into your child's
              preparation progress with beautiful, actionable analytics.
            </p>
          </div>

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 p-3">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="mb-2 text-lg font-semibold text-white">
                      Daily Study Hours Tracking
                    </h4>
                    <p className="text-gray-300">
                      Monitor consistent study habits and receive alerts if study
                      patterns change significantly.
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-sm text-cyan-300">
                      <Activity className="h-4 w-4" />
                      <span>Real-time activity monitoring</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 p-3">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="mb-2 text-lg font-semibold text-white">
                      Subject-wise Performance
                    </h4>
                    <p className="text-gray-300">
                      Detailed breakdown of strengths and weaknesses across all
                      CLAT subjects with improvement suggestions.
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-sm text-pink-300">
                      <Target className="h-4 w-4" />
                      <span>85% accuracy insights</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 p-3">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="mb-2 text-lg font-semibold text-white">
                      Stress & Well-being Monitoring
                    </h4>
                    <p className="text-gray-300">
                      Track mood patterns, stress levels, and receive
                      recommendations for maintaining mental health.
                    </p>
                    <div className="mt-3 flex items-center gap-2 text-sm text-green-300">
                      <AlertTriangle className="h-4 w-4" />
                      <span>Smart wellness alerts</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-md">
                {/* Mock Dashboard Header */}
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-white">Arjun's Progress</h3>
                  <div className="flex items-center gap-2 rounded-lg bg-green-500/20 px-3 py-1">
                    <div className="h-2 w-2 rounded-full bg-green-400"></div>
                    <span className="text-sm text-green-300">Active Now</span>
                  </div>
                </div>

                {/* Mock Stats Cards */}
                <div className="mb-6 grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                    <div className="mb-2 text-2xl font-bold text-white">7.2hrs</div>
                    <div className="text-sm text-gray-300">Today's Study Time</div>
                    <div className="mt-2 h-2 rounded-full bg-white/20">
                      <div className="h-2 w-3/4 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400"></div>
                    </div>
                  </div>
                  <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                    <div className="mb-2 text-2xl font-bold text-white">142</div>
                    <div className="text-sm text-gray-300">Predicted Rank</div>
                    <div className="mt-2 flex items-center gap-1 text-xs text-green-300">
                      <TrendingUp className="h-3 w-3" />
                      <span>+15 from last week</span>
                    </div>
                  </div>
                </div>

                {/* Mock Subject Performance */}
                <div className="mb-6">
                  <h4 className="mb-3 text-lg font-semibold text-white">Subject Performance</h4>
                  <div className="space-y-3">
                    {[
                      { subject: 'Legal Reasoning', score: 85, color: 'from-purple-400 to-pink-400' },
                      { subject: 'Reading Comprehension', score: 78, color: 'from-blue-400 to-cyan-400' },
                      { subject: 'Logical Reasoning', score: 92, color: 'from-green-400 to-emerald-400' },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">{item.subject}</span>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-20 rounded-full bg-white/20">
                            <div 
                              className={`h-2 rounded-full bg-gradient-to-r ${item.color}`}
                              style={{ width: `${item.score}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-white">{item.score}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mock Recent Activity */}
                <div>
                  <h4 className="mb-3 text-lg font-semibold text-white">Recent Activity</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 rounded-lg bg-white/5 p-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-gray-300">Completed Mock Test #15</span>
                      <span className="ml-auto text-xs text-gray-400">2h ago</span>
                    </div>
                    <div className="flex items-center gap-3 rounded-lg bg-white/5 p-2">
                      <BookOpen className="h-4 w-4 text-blue-400" />
                      <span className="text-sm text-gray-300">Read 3 RC passages</span>
                      <span className="ml-auto text-xs text-gray-400">4h ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parent Testimonials */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-24">
        {/* Background elements */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-32 left-16 h-36 w-36 animate-pulse rounded-full bg-pink-500/20 blur-3xl delay-500"></div>
        <div className="absolute bottom-32 right-16 h-32 w-32 animate-pulse rounded-full bg-cyan-500/20 blur-2xl delay-1500"></div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-md">
              <Users className="h-5 w-5" />
              Parent Success Stories
            </div>
            <h2 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              What Parents Are Saying
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-300">
              Real experiences from parents whose children achieved success with
              SOLO's comprehensive preparation platform.
            </p>
          </div>

          <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-8 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/15 hover:shadow-2xl"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${testimonial.bg} opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
                ></div>

                <div className="relative">
                  <div className="mb-6 flex items-center gap-4">
                    <div
                      className={`h-14 w-14 rounded-full bg-gradient-to-r ${testimonial.bg} flex items-center justify-center text-xl font-bold text-white shadow-lg`}
                    >
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-300">
                        {testimonial.location}
                      </p>
                    </div>
                    <div className="ml-auto">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>

                  <blockquote className="leading-relaxed text-gray-200">
                    <span className="absolute -top-2 -left-1 text-4xl text-gray-300">
                      "
                    </span>
                    <p className="relative z-10">{testimonial.quote}</p>
                  </blockquote>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="rounded-3xl border border-white/20 bg-white/10 p-8 shadow-xl backdrop-blur-md">
            <div className="mb-8 text-center">
              <h3 className="mb-4 text-2xl font-bold text-white">
                📊 Parent Satisfaction Data
              </h3>
              <p className="text-gray-300">
                Based on feedback from 2,500+ parents across India
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-white/20 bg-white/5 p-6 text-center backdrop-blur-sm transition-all hover:bg-white/10"
                >
                  <div className="mb-2 text-4xl font-bold text-white">
                    {stat.number}
                  </div>
                  <div className="mb-1 font-semibold text-white">
                    {stat.label}
                  </div>
                  <div className="text-sm text-gray-300">
                    {stat.sublabel}
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-24 text-white">
        {/* Background elements */}
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-20 left-1/4 h-40 w-40 animate-pulse rounded-full bg-purple-500/20 blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 h-32 w-32 animate-pulse rounded-full bg-pink-500/20 blur-2xl delay-1000"></div>
        
        <div className="relative mx-auto max-w-7xl px-6 text-center lg:px-8">
          <div className="mx-auto max-w-4xl rounded-3xl border border-white/20 bg-white/10 p-12 shadow-xl backdrop-blur-md">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-md">
              <Sparkles className="h-5 w-5 text-yellow-400" />
              Join 2,500+ Satisfied Parents
            </div>
            <h2 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Start Supporting Your Child Today
              </span>
            </h2>

            <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-300">
              Join thousands of parents who are actively supporting their child's
              CLAT journey with complete transparency and detailed insights.
            </p>

            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-white/20 bg-white/5 p-4 backdrop-blur-sm">
                <div className="mb-2 text-2xl font-bold text-green-400">Free</div>
                <div className="text-sm text-gray-300">Parent Dashboard Access</div>
              </div>
              <div className="rounded-xl border border-white/20 bg-white/5 p-4 backdrop-blur-sm">
                <div className="mb-2 text-2xl font-bold text-blue-400">Weekly</div>
                <div className="text-sm text-gray-300">Progress Reports</div>
              </div>
              <div className="rounded-xl border border-white/20 bg-white/5 p-4 backdrop-blur-sm">
                <div className="mb-2 text-2xl font-bold text-purple-400">24/7</div>
                <div className="text-sm text-gray-300">Real-time Updates</div>
              </div>
            </div>

            <div className="mb-8 flex flex-col justify-center gap-6 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-16 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-8 text-xl font-semibold shadow-2xl hover:from-purple-700 hover:to-pink-700"
              >
                <Link href="/signup">
                  Create Parent Account
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-16 rounded-xl border-white/30 bg-white/5 px-8 text-xl font-semibold text-white backdrop-blur-md hover:bg-white/10"
              >
                <Link href="/contact">Schedule Demo</Link>
              </Button>
            </div>

            <div className="inline-flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/20 px-6 py-3">
              <Shield className="h-5 w-5 text-green-400" />
              <span className="font-medium text-green-200">
                100% Privacy Protected • Child's Data Secure • Cancel Anytime
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

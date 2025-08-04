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
      <section className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <Heart className="h-4 w-4 text-pink-400" />
              For Concerned Parents
            </div>

            <h1 className="mb-8 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
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
                className="h-16 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-8 text-xl font-semibold hover:from-purple-700 hover:to-pink-700"
              >
                <Link href="/signup">Start Parent Dashboard</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-16 rounded-xl border-white/30 bg-white/5 px-8 text-xl font-semibold text-white backdrop-blur-sm hover:bg-white/10"
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
        className="bg-gradient-to-b from-gray-50 to-white py-24 dark:from-gray-900 dark:to-gray-950"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
              Everything You Need to Support Your Child
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
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
                  className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
                  ></div>

                  <div className="relative">
                    <div
                      className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6`}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>

                    <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                      {feature.title}
                    </h3>

                    <p className="leading-relaxed text-gray-600 dark:text-gray-300">
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
      <section className="bg-gradient-to-br from-indigo-50 to-purple-50 py-24 dark:from-indigo-950/30 dark:to-purple-950/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
              Your Parent Dashboard
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
              Get weekly reports and real-time insights into your child's
              preparation progress.
            </p>
          </div>

          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-green-600" />
                <div>
                  <h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                    Daily Study Hours Tracking
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Monitor consistent study habits and receive alerts if study
                    patterns change significantly.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-green-600" />
                <div>
                  <h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                    Subject-wise Performance
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Detailed breakdown of strengths and weaknesses across all
                    CLAT subjects with improvement suggestions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-green-600" />
                <div>
                  <h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                    Stress & Well-being Monitoring
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Track mood patterns, stress levels, and receive
                    recommendations for maintaining mental health.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-green-600" />
                <div>
                  <h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                    Rank Prediction Updates
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    Stay informed about your child's projected CLAT rank with
                    85% accuracy powered by ML algorithms.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="h-96 w-full overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-2xl">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <BarChart3 className="mx-auto mb-4 h-24 w-24 opacity-80" />
                    <h4 className="mb-2 text-2xl font-bold">
                      Interactive Dashboard
                    </h4>
                    <p className="text-white/80">Coming Soon Preview</p>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/20"></div>
                <div className="absolute bottom-4 left-4 h-6 w-6 rounded-full bg-white/15"></div>
                <div className="absolute top-1/2 left-4 h-4 w-4 rounded-full bg-white/10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parent Testimonials */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-24 dark:from-gray-950 dark:to-gray-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
              What Parents Are Saying
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
              Real experiences from parents whose children achieved success with
              SOLO.
            </p>
          </div>

          <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${testimonial.bg} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
                ></div>

                <div className="relative">
                  <div className="mb-6 flex items-center gap-4">
                    <div
                      className={`h-14 w-14 rounded-full bg-gradient-to-r ${testimonial.bg} flex items-center justify-center text-xl font-bold text-white`}
                    >
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>

                  <blockquote className="leading-relaxed text-gray-700 dark:text-gray-300">
                    <span className="absolute -top-2 -left-1 text-4xl text-gray-300 dark:text-gray-600">
                      "
                    </span>
                    <p className="relative z-10">{testimonial.quote}</p>
                  </blockquote>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-lg dark:border-gray-700 dark:bg-gray-800"
              >
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
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <h2 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
            <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Start Supporting Your Child Today
            </span>
          </h2>

          <p className="mx-auto mb-12 max-w-3xl text-xl text-gray-300">
            Join thousands of parents who are actively supporting their child's
            CLAT journey with complete transparency and detailed insights.
          </p>

          <div className="mb-12 flex flex-col justify-center gap-6 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-16 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-8 text-xl font-semibold hover:from-purple-700 hover:to-pink-700"
            >
              <Link href="/signup">Create Parent Account</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-16 rounded-xl border-white/30 bg-white/5 px-8 text-xl font-semibold text-white backdrop-blur-sm hover:bg-white/10"
            >
              <Link href="/contact">Schedule Demo</Link>
            </Button>
          </div>

          <div className="inline-flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/20 p-4">
            <Shield className="h-5 w-5 text-green-400" />
            <span className="font-medium text-green-200">
              100% Privacy Protected • Child's Data Secure • Cancel Anytime
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

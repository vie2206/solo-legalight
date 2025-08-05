'use client';

import {
  ArrowRight,
  Brain,
  BarChart3,
  Target,
  Users,
  Sparkles,
  CheckCircle,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const steps = [
  {
    number: '01',
    icon: Brain,
    title: 'Smart Onboarding',
    description:
      'Tell us about your CLAT goals, study preferences, and current level. Our AI creates your personalized learning profile in minutes.',
    features: [
      'CLAT 2026 goal setting',
      'Learning style assessment',
      'Current preparation analysis',
      'Personalized study schedule',
    ],
    gradient: 'from-purple-500 to-indigo-500',
  },
  {
    number: '02',
    icon: BarChart3,
    title: 'AI-Powered Analytics',
    description:
      'Take mock tests and practice questions. Our advanced ML models analyze every response to understand your unique learning patterns.',
    features: [
      'Real-time performance tracking',
      '85% accurate rank prediction',
      'Subject mastery analysis',
      'Weakness identification',
    ],
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    number: '03',
    icon: Target,
    title: 'Personalized Insights',
    description:
      'Get weekly Spotify-style wrapped reports showing your progress, study patterns, and personalized recommendations.',
    features: [
      'Weekly personal insights',
      'Peer comparison (anonymous)',
      'Study habit optimization',
      'Motivational achievements',
    ],
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    number: '04',
    icon: Users,
    title: 'Community Learning',
    description:
      'Join study groups, compete with peers, and learn from top performers while maintaining your privacy.',
    features: [
      'Anonymous peer comparison',
      'Study group formation',
      'Community challenges',
      'Success story sharing',
    ],
    gradient: 'from-green-500 to-emerald-500',
  },
];

const stats = [
  {
    label: 'Average Score Improvement',
    value: '+23 marks',
    subtext: 'within 3 months',
  },
  {
    label: 'Rank Prediction Accuracy',
    value: '85%+',
    subtext: 'ML-powered forecasting',
  },
  {
    label: 'Study Streak Achievement',
    value: '78%',
    subtext: 'maintain 10+ day streaks',
  },
  {
    label: 'Student Satisfaction',
    value: '94%',
    subtext: 'would recommend SOLO',
  },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-24">
      {/* Premium Holographic Background */}
      <div 
        className="absolute inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/ui8-assets/gradients/Gradient_25.png')",
          backgroundBlendMode: 'overlay'
        }}
      ></div>
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Premium Chromatic Halos */}
      <div 
        className="absolute top-40 left-20 w-96 h-96 opacity-15 animate-pulse"
        style={{
          backgroundImage: "url('/ui8-assets/halos/ring-00001.png')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      ></div>
      <div 
        className="absolute bottom-40 right-20 w-80 h-80 opacity-10 animate-pulse delay-3000"
        style={{
          backgroundImage: "url('/ui8-assets/halos/ring-00020.png')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      ></div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
            <Sparkles className="h-4 w-4" />
            How SOLO Works
          </div>
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Your Journey to CLAT Success
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-300">
            From your first day to CLAT 2026, SOLO adapts and evolves with you.
            Here's how we transform your preparation into a personalized,
            data-driven success story.
          </p>
        </div>

        {/* Process Steps */}
        <div className="mb-20 space-y-16">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isEven = index % 2 === 1;

            return (
              <div
                key={index}
                className={`flex flex-col items-center gap-12 lg:flex-row ${isEven ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Content */}
                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-4">
                    <span
                      className={`bg-gradient-to-r text-6xl font-bold ${step.gradient} bg-clip-text text-transparent`}
                    >
                      {step.number}
                    </span>
                    <div
                      className={`rounded-2xl bg-gradient-to-r p-3 ${step.gradient}`}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                  </div>

                  <h3 className="text-3xl font-bold text-white">
                    {step.title}
                  </h3>

                  <p className="text-lg leading-relaxed text-gray-300">
                    {step.description}
                  </p>

                  <div className="space-y-3">
                    {step.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle
                          className={`h-5 w-5 bg-gradient-to-r ${step.gradient} rounded-full text-white`}
                        />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual - SOLO Dashboard Preview */}
                <div className="flex-1">
                  <div className="relative h-80 w-full overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900">
                    {index === 0 && (
                      // Step 1: AI Study Planner Preview
                      <div className="h-full p-6">
                        <div className="mb-4 flex items-center gap-2">
                          <Brain className="h-5 w-5 text-purple-600" />
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            AI Study Planner
                          </h4>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between rounded-lg bg-purple-50 p-3 dark:bg-purple-900/20">
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">
                                Constitutional Law
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-300">
                                2 hours • High Priority
                              </div>
                            </div>
                            <div className="font-bold text-purple-600">
                              9:00 AM
                            </div>
                          </div>
                          <div className="flex items-center justify-between rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">
                                Reading Comprehension
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-300">
                                1.5 hours • Medium Priority
                              </div>
                            </div>
                            <div className="font-bold text-blue-600">
                              11:30 AM
                            </div>
                          </div>
                          <div className="flex items-center justify-between rounded-lg bg-green-50 p-3 dark:bg-green-900/20">
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">
                                Current Affairs
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-300">
                                1 hour • Review
                              </div>
                            </div>
                            <div className="font-bold text-green-600">
                              2:00 PM
                            </div>
                          </div>
                          <div className="mt-4 rounded-lg bg-gradient-to-r from-purple-100 to-pink-100 p-2 text-center dark:from-purple-900/30 dark:to-pink-900/30">
                            <div className="text-sm text-purple-700 dark:text-purple-300">
                              <Sparkles className="mr-1 inline h-4 w-4" />
                              AI optimized based on your performance
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {index === 1 && (
                      // Step 2: Mock Test Analysis Preview
                      <div className="h-full p-6">
                        <div className="mb-4 flex items-center gap-2">
                          <BarChart3 className="h-5 w-5 text-blue-600" />
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            Level Up Analysis
                          </h4>
                        </div>
                        <div className="space-y-4">
                          <div className="rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 p-4 text-center text-white">
                            <div className="text-2xl font-bold">124/150</div>
                            <div className="text-sm opacity-90">
                              Mock Test Score
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-3">
                            <div className="rounded-lg bg-purple-50 p-3 text-center dark:bg-purple-900/20">
                              <div className="text-lg font-bold text-purple-600">
                                DECODE
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-300">
                                Analyze
                              </div>
                            </div>
                            <div className="rounded-lg bg-orange-50 p-3 text-center dark:bg-orange-900/20">
                              <div className="text-lg font-bold text-orange-600">
                                TRACK
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-300">
                                Progress
                              </div>
                            </div>
                            <div className="rounded-lg bg-green-50 p-3 text-center dark:bg-green-900/20">
                              <div className="text-lg font-bold text-green-600">
                                REFLECT
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-300">
                                Improve
                              </div>
                            </div>
                          </div>
                          <div className="rounded-lg bg-yellow-50 p-3 dark:bg-yellow-900/20">
                            <div className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                              💡 AI Insight
                            </div>
                            <div className="text-xs text-yellow-700 dark:text-yellow-300">
                              Focus on Contract Law - 15% improvement needed
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {index === 2 && (
                      // Step 3: AI Insights Preview
                      <div className="h-full p-6">
                        <div className="mb-4 flex items-center gap-2">
                          <Target className="h-5 w-5 text-green-600" />
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            Weekly Insights
                          </h4>
                        </div>
                        <div className="space-y-3">
                          <div className="rounded-xl bg-gradient-to-r from-green-100 to-emerald-100 p-4 dark:from-green-900/30 dark:to-emerald-900/30">
                            <div className="mb-2 flex items-center gap-2">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                                <TrendingUp className="h-4 w-4 text-white" />
                              </div>
                              <div className="font-semibold text-green-800 dark:text-green-200">
                                This Week's Progress
                              </div>
                            </div>
                            <div className="text-sm text-green-700 dark:text-green-300">
                              • Legal Reasoning: +12% improvement
                              <br />
                              • Study streak: 7 days strong!
                              <br />• Mock test rank: Up by 45 positions
                            </div>
                          </div>
                          <div className="rounded-lg bg-purple-50 p-3 dark:bg-purple-900/20">
                            <div className="mb-1 text-sm font-medium text-purple-800 dark:text-purple-200">
                              🎯 Rank Prediction
                            </div>
                            <div className="text-lg font-bold text-purple-600">
                              Rank 245
                            </div>
                            <div className="text-xs text-purple-600">
                              85% confidence • Target: 180
                            </div>
                          </div>
                          <div className="rounded-lg bg-orange-50 p-3 dark:bg-orange-900/20">
                            <div className="mb-1 text-sm font-medium text-orange-800 dark:text-orange-200">
                              📚 Focus Areas
                            </div>
                            <div className="text-xs text-orange-700 dark:text-orange-300">
                              1. Constitutional Law (Priority)
                              <br />
                              2. Legal Maxims Practice
                              <br />
                              3. Current Affairs Review
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {index === 3 && (
                      // Step 4: Community Preview
                      <div className="h-full p-6">
                        <div className="mb-4 flex items-center gap-2">
                          <Users className="h-5 w-5 text-pink-600" />
                          <h4 className="font-semibold text-gray-900 dark:text-white">
                            Study Community
                          </h4>
                        </div>
                        <div className="space-y-3">
                          <div className="rounded-lg bg-gradient-to-r from-pink-50 to-purple-50 p-3 dark:from-pink-900/20 dark:to-purple-900/20">
                            <div className="mb-2 flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-sm font-bold text-white">
                                A
                              </div>
                              <div>
                                <div className="font-medium text-gray-900 dark:text-white">
                                  Arjun M.
                                </div>
                                <div className="text-xs text-gray-600 dark:text-gray-300">
                                  AIR 23 CLAT 2024
                                </div>
                              </div>
                            </div>
                            <div className="text-sm text-gray-700 dark:text-gray-300">
                              "Constitutional Law tip: Focus on landmark cases
                              from 2020-2024 🏛️"
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="rounded-lg bg-blue-50 p-2 text-center dark:bg-blue-900/20">
                              <div className="text-lg font-bold text-blue-600">
                                10K+
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-300">
                                Active Students
                              </div>
                            </div>
                            <div className="rounded-lg bg-green-50 p-2 text-center dark:bg-green-900/20">
                              <div className="text-lg font-bold text-green-600">
                                24/7
                              </div>
                              <div className="text-xs text-gray-600 dark:text-gray-300">
                                Peer Support
                              </div>
                            </div>
                          </div>
                          <div className="rounded-lg bg-yellow-50 p-2 dark:bg-yellow-900/20">
                            <div className="text-xs text-yellow-800 dark:text-yellow-200">
                              <span className="font-medium">Study Group:</span>{' '}
                              "CLAT 2026 Warriors" (45 members online)
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="rounded-3xl bg-gray-900 p-8 text-white lg:p-12">
          <div className="mb-12 text-center">
            <h3 className="mb-4 text-3xl font-bold">
              Proven Results That Speak for Themselves
            </h3>
            <p className="text-lg text-gray-300">
              Real data from 10,000+ students using SOLO
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-4xl font-bold text-transparent lg:text-5xl">
                  {stat.value}
                </div>
                <div className="mb-1 font-semibold text-white">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-400">{stat.subtext}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <h3 className="mb-4 text-2xl font-bold text-white">
            Ready to Transform Your CLAT Preparation?
          </h3>
          <p className="mx-auto mb-8 max-w-2xl text-gray-300">
            Join thousands of students who've already discovered the power of
            AI-driven preparation. Start your journey today with a free 30-day
            trial.
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-14 bg-gradient-to-r from-purple-600 to-pink-600 px-8 text-lg font-semibold hover:from-purple-700 hover:to-pink-700"
            >
              <Link href="/signup">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-14 px-8 text-lg font-semibold"
            >
              <Link href="#pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

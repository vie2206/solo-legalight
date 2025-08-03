'use client'

import { ArrowRight, Brain, BarChart3, Target, Users, Sparkles, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const steps = [
  {
    number: '01',
    icon: Brain,
    title: 'Smart Onboarding',
    description: 'Tell us about your CLAT goals, study preferences, and current level. Our AI creates your personalized learning profile in minutes.',
    features: [
      'CLAT 2026 goal setting',
      'Learning style assessment',
      'Current preparation analysis',
      'Personalized study schedule'
    ],
    gradient: 'from-purple-500 to-indigo-500'
  },
  {
    number: '02',
    icon: BarChart3,
    title: 'AI-Powered Analytics',
    description: 'Take mock tests and practice questions. Our advanced ML models analyze every response to understand your unique learning patterns.',
    features: [
      'Real-time performance tracking',
      '85% accurate rank prediction',
      'Subject mastery analysis',
      'Weakness identification'
    ],
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    number: '03',
    icon: Target,
    title: 'Personalized Insights',
    description: 'Get weekly Spotify-style wrapped reports showing your progress, study patterns, and personalized recommendations.',
    features: [
      'Weekly personal insights',
      'Peer comparison (anonymous)',
      'Study habit optimization',
      'Motivational achievements'
    ],
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    number: '04',
    icon: Users,
    title: 'Community Learning',
    description: 'Join study groups, compete with peers, and learn from top performers while maintaining your privacy.',
    features: [
      'Anonymous peer comparison',
      'Study group formation',
      'Community challenges',
      'Success story sharing'
    ],
    gradient: 'from-green-500 to-emerald-500'
  }
]

const stats = [
  { label: 'Average Score Improvement', value: '+23 marks', subtext: 'within 3 months' },
  { label: 'Rank Prediction Accuracy', value: '85%+', subtext: 'ML-powered forecasting' },
  { label: 'Study Streak Achievement', value: '78%', subtext: 'maintain 10+ day streaks' },
  { label: 'Student Satisfaction', value: '94%', subtext: 'would recommend SOLO' }
]

export default function HowItWorks() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 dark:bg-blue-900/30 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 mb-6">
            <Sparkles className="h-4 w-4" />
            How SOLO Works
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-6">
            Your Journey to CLAT Success
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            From your first day to CLAT 2026, SOLO adapts and evolves with you. Here's how we transform your preparation into a personalized, data-driven success story.
          </p>
        </div>

        {/* Process Steps */}
        <div className="space-y-16 mb-20">
          {steps.map((step, index) => {
            const IconComponent = step.icon
            const isEven = index % 2 === 1
            
            return (
              <div key={index} className={`flex flex-col lg:flex-row items-center gap-12 ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                {/* Content */}
                <div className="flex-1 space-y-6">
                  <div className="flex items-center gap-4">
                    <span className={`text-6xl font-bold bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}>
                      {step.number}
                    </span>
                    <div className={`p-3 rounded-2xl bg-gradient-to-r ${step.gradient}`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                  
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {step.description}
                  </p>
                  
                  <div className="space-y-3">
                    {step.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className={`h-5 w-5 bg-gradient-to-r ${step.gradient} text-white rounded-full`} />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visual */}
                <div className="flex-1">
                  <div className={`relative h-80 w-full rounded-3xl bg-gradient-to-br ${step.gradient} overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <IconComponent className="h-24 w-24 mx-auto mb-4 opacity-80" />
                        <h4 className="text-2xl font-bold mb-2">{step.title}</h4>
                        <p className="text-white/80">Interactive Preview</p>
                      </div>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full"></div>
                    <div className="absolute bottom-4 left-4 w-6 h-6 bg-white/15 rounded-full"></div>
                    <div className="absolute top-1/2 left-4 w-4 h-4 bg-white/10 rounded-full"></div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Stats Section */}
        <div className="bg-gray-900 rounded-3xl p-8 lg:p-12 text-white">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">
              Proven Results That Speak for Themselves
            </h3>
            <p className="text-gray-300 text-lg">
              Real data from 10,000+ students using SOLO
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-white font-semibold mb-1">
                  {stat.label}
                </div>
                <div className="text-gray-400 text-sm">
                  {stat.subtext}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Transform Your CLAT Preparation?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of students who've already discovered the power of AI-driven preparation. Start your journey today with a free 30-day trial.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="h-14 bg-gradient-to-r from-purple-600 to-pink-600 px-8 text-lg font-semibold hover:from-purple-700 hover:to-pink-700">
              <Link href="/signup">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg font-semibold">
              <Link href="#pricing">
                View Pricing
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
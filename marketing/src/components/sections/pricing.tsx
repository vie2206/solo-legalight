'use client'

import { Check, Star, Sparkles, Trophy, Crown, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Link from 'next/link'
import { useState } from 'react'

const plans = [
  {
    id: 'essentials',
    name: 'SOLO ESSENTIALS',
    description: 'Perfect for getting started with AI-powered CLAT prep',
    icon: Sparkles,
    gradient: 'from-blue-500 to-cyan-500',
    popular: false,
    quarterly: {
      price: 899,
      monthly: 300,
      daily: 10,
      comparison: 'Less than a samosa'
    },
    annual: {
      price: 2999,
      monthly: 250,
      daily: 8.2,
      savings: 600,
      comparison: 'Less than a chai'
    },
    features: [
      'AI-Powered Study Planner',
      'Basic Mock Test Analysis',
      'CLAT Rank Prediction',
      'Study Streak Tracking',
      'Performance Dashboard',
      'Subject Progress Tracking',
      'Daily Study Reminders',
      'Community Access'
    ],
    limitations: [
      'Limited to 4 mock tests/month',
      'Basic analysis only',
      'Standard reminders'
    ]
  },
  {
    id: 'mastery',
    name: 'SOLO MASTERY',
    description: 'Most popular choice for serious CLAT aspirants',
    icon: Star,
    gradient: 'from-purple-500 to-pink-500',
    popular: true,
    quarterly: {
      price: 1499,
      monthly: 500,
      daily: 16.6,
      comparison: 'Less than a coffee'
    },
    annual: {
      price: 4999,
      monthly: 417,
      daily: 13.7,
      savings: 1000,
      comparison: 'Less than lunch'
    },
    features: [
      'Everything in ESSENTIALS, plus:',
      'Advanced AI Mock Analysis',
      'Level Up 3-Step Analysis (DECODE-TRACK-REFLECT)',
      'Weekly Personal Insights (Spotify-style)',
      'AI Smart Study Reminders',
      'Advanced Rank Predictor with ML',
      'Peer Comparison (Anonymous)',
      'Study Group Access',
      'Daily Reading Practice',
      'Academic Vocabulary Quizzes',
      'CLAT 2026 Countdown with Milestones'
    ],
    limitations: []
  },
  {
    id: 'toppers',
    name: 'SOLO TOPPERS EDITION',
    description: 'Premium experience for future CLAT toppers',
    icon: Crown,
    gradient: 'from-yellow-500 to-orange-500',
    popular: false,
    quarterly: {
      price: 2499,
      monthly: 833,
      daily: 27.7,
      comparison: 'Your success investment'
    },
    annual: {
      price: 7999,
      monthly: 667,
      daily: 21.9,
      savings: 2000,
      comparison: 'Future topper pricing'
    },
    features: [
      'Everything in MASTERY, plus:',
      'Personalized AI Coaching',
      'Advanced 3D Rank Visualizations',
      'Priority Community Features',
      'Weekly 1-on-1 Strategy Sessions',
      'Advanced Community Insights',
      'Mood & Stress Tracking',
      'Custom Study Path Creation',
      'Priority Support (24/7)',
      'Exclusive Topper Resources',
      'Early Access to New Features',
      'SOLO Topper Badge & Recognition'
    ],
    limitations: []
  }
]

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'quarterly' | 'annual'>('annual')

  return (
    <section id="pricing" className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-green-100 dark:bg-green-900/30 px-4 py-2 text-sm font-medium text-green-600 dark:text-green-400 mb-6">
            <Trophy className="h-4 w-4" />
            Affordable Excellence
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-6">
            Choose Your Path to Success
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Revolutionary AI-powered CLAT preparation at a fraction of traditional coaching costs. 
            Start your 30-day free trial today - no credit card required.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-gray-100 dark:bg-gray-800 rounded-full p-1">
            <button
              onClick={() => setBillingCycle('quarterly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === 'quarterly'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Quarterly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all relative ${
                billingCycle === 'annual'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Annual
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-1 rounded-full">
                Save up to ₹2K
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => {
            const IconComponent = plan.icon
            const pricing = plan[billingCycle]
            
            return (
              <Card 
                key={plan.id}
                className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                  plan.popular 
                    ? 'ring-2 ring-purple-500 dark:ring-purple-400 scale-105 shadow-xl' 
                    : 'hover:shadow-lg'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-2 text-sm font-semibold">
                    🔥 MOST POPULAR
                  </div>
                )}

                <CardHeader className={`text-center ${plan.popular ? 'pt-12' : 'pt-8'}`}>
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.gradient} mb-6`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>

                  {/* Plan Name */}
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {plan.description}
                  </p>

                  {/* Pricing */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        ₹{pricing.price}
                      </span>
                      <span className="text-gray-600 dark:text-gray-400">
                        /{billingCycle === 'quarterly' ? '3 months' : 'year'}
                      </span>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                        ₹{pricing.monthly}/month
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        ₹{pricing.daily}/day • {pricing.comparison}
                      </p>
                      {billingCycle === 'annual' && pricing.savings && (
                        <p className="text-sm font-medium text-green-600 dark:text-green-400 mt-1">
                          Save ₹{pricing.savings} annually!
                        </p>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="px-8 pb-8">
                  {/* CTA Button */}
                  <Button 
                    asChild 
                    className={`w-full h-12 mb-6 font-semibold ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                        : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100'
                    }`}
                  >
                    <Link href="/signup">
                      Start Free Trial
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>

                  {/* Features */}
                  <div className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Check className={`h-5 w-5 mt-0.5 ${plan.popular ? 'text-purple-600' : 'text-green-600'} flex-shrink-0`} />
                        <span className={`text-sm ${feature.startsWith('Everything in') ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Limitations */}
                  {plan.limitations.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Limitations:</p>
                      {plan.limitations.map((limitation, index) => (
                        <p key={index} className="text-xs text-gray-400 dark:text-gray-500">
                          • {limitation}
                        </p>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Comparison with Traditional Coaching */}
        <div className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30 rounded-3xl p-8 border border-red-200 dark:border-red-800 mb-16">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-red-900 dark:text-red-100 mb-4">
              💰 Compare with Traditional Coaching
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <h4 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-2">Traditional Coaching</h4>
                <p className="text-3xl font-bold text-red-900 dark:text-red-100 mb-2">₹50K - 1.5L</p>
                <p className="text-red-700 dark:text-red-300">₹137-410/day</p>
                <p className="text-sm text-red-600 dark:text-red-400 mt-2">+ Travel + Accommodation + Books</p>
              </div>
              <div className="text-center">
                <h4 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-2">SOLO MASTERY (Annual)</h4>
                <p className="text-3xl font-bold text-green-900 dark:text-green-100 mb-2">₹4,999</p>
                <p className="text-green-700 dark:text-green-300">₹13.7/day</p>
                <p className="text-sm font-semibold text-green-600 dark:text-green-400 mt-2">90%+ SAVINGS!</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Preview */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Questions? We've Got Answers
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            30-day free trial • No credit card required • Cancel anytime • Full money-back guarantee
          </p>
          <Button asChild variant="outline" size="lg">
            <Link href="#faq">
              View FAQ
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

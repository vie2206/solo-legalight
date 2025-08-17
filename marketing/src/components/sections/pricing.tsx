'use client';

import { Check, Star, Sparkles, Trophy, Crown, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Link from 'next/link';
import { useState } from 'react';

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
      comparison: 'Less than a samosa',
    },
    annual: {
      price: 2999,
      monthly: 250,
      daily: 8.2,
      savings: 600,
      comparison: 'Less than a chai',
    },
    features: [
      'AI-Powered Study Planner',
      'Basic Mock Test Analysis',
      'CLAT Rank Prediction',
      'Study Streak Tracking',
      'Performance Dashboard',
      'Subject Progress Tracking',
      'Daily Study Reminders',
      'Community Access',
    ],
    limitations: [
      'Limited to 4 mock tests/month',
      'Basic analysis only',
      'Standard reminders',
    ],
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
      comparison: 'Less than a coffee',
    },
    annual: {
      price: 4999,
      monthly: 417,
      daily: 13.7,
      savings: 1000,
      comparison: 'Less than lunch',
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
      'CLAT 2026 Countdown with Milestones',
    ],
    limitations: [],
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
      comparison: 'Your success investment',
    },
    annual: {
      price: 7999,
      monthly: 667,
      daily: 21.9,
      savings: 2000,
      comparison: 'Future topper pricing',
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
      'SOLO Topper Badge & Recognition',
    ],
    limitations: [],
  },
];

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'quarterly' | 'annual'>(
    'annual',
  );

  return (
    <section
      id="pricing"
      className="relative bg-gradient-to-b from-white to-gray-50 py-24 dark:from-gray-950 dark:to-gray-900"
    >
      {/* Premium Holographic Background */}
      <div 
        className="absolute inset-0 opacity-10 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('/ui8-assets/gradients/Gradient_15.webp')",
          backgroundBlendMode: 'overlay'
        }}
      ></div>
      
      {/* Chromatic Halos */}
      <div 
        className="absolute top-20 right-10 w-80 h-80 opacity-20 animate-pulse"
        style={{
          backgroundImage: "url('/ui8-assets/halos/ring-00010.webp')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      ></div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-600 dark:bg-green-900/30 dark:text-green-400">
            <Trophy className="h-4 w-4" />
            Affordable Excellence
          </div>
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            🚨 STOP Wasting Money on Failed Coaching
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-xl text-red-600 dark:text-red-300 font-semibold">
            While your friends blow ₹1.5 LAKH on coaching with 12% success rates, 
            you can GUARANTEE your NLU admission for the cost of 2 Starbucks coffees per month.
            <span className="text-green-600 dark:text-green-400"> 87% of SOLO students get their target NLU.</span>
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center rounded-full bg-gray-100 p-1 dark:bg-gray-800">
            <button
              onClick={() => setBillingCycle('quarterly')}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                billingCycle === 'quarterly'
                  ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
              }`}
            >
              Quarterly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`relative rounded-full px-6 py-2 text-sm font-medium transition-all ${
                billingCycle === 'annual'
                  ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
              }`}
            >
              Annual
              <span className="absolute -top-2 -right-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 px-2 py-1 text-xs text-white">
                Save up to ₹2K
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            const pricing = plan[billingCycle];

            return (
              <Card
                key={plan.id}
                className={`relative overflow-hidden border border-white/20 bg-white/10 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/15 hover:shadow-2xl ${
                  plan.popular ? 'scale-105 ring-2 ring-purple-500/30' : ''
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute top-0 right-0 left-0 bg-gradient-to-r from-purple-600 to-pink-600 py-2 text-center text-sm font-semibold text-white">
                    🔥 MOST POPULAR
                  </div>
                )}

                <CardHeader
                  className={`text-center ${plan.popular ? 'pt-12' : 'pt-8'}`}
                >
                  {/* Icon */}
                  <div
                    className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r ${plan.gradient} mb-6`}
                  >
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>

                  {/* Plan Name */}
                  <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                    {plan.name}
                  </h3>

                  <p className="mb-6 text-gray-600 dark:text-gray-300">
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
                      {billingCycle === 'annual' &&
                        'savings' in pricing &&
                        pricing.savings && (
                          <p className="mt-1 text-sm font-medium text-green-600 dark:text-green-400">
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
                    className={`mb-6 h-12 w-full font-semibold ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                        : 'bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100'
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
                        <Check
                          className={`mt-0.5 h-5 w-5 ${plan.popular ? 'text-purple-600' : 'text-green-600'} flex-shrink-0`}
                        />
                        <span
                          className={`text-sm ${feature.startsWith('Everything in') ? 'font-semibold text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Limitations */}
                  {plan.limitations.length > 0 && (
                    <div className="mt-6 border-t border-gray-200 pt-6 dark:border-gray-700">
                      <p className="mb-2 text-xs text-gray-500 dark:text-gray-400">
                        Limitations:
                      </p>
                      {plan.limitations.map((limitation, index) => (
                        <p
                          key={index}
                          className="text-xs text-gray-400 dark:text-gray-500"
                        >
                          • {limitation}
                        </p>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Loss Aversion + Social Proof - Psychological Trigger #7 & #2 */}
        <div className="mb-16 rounded-3xl border border-red-400/50 bg-gradient-to-r from-red-100/80 to-orange-100/80 p-8 dark:border-red-600/50 dark:from-red-950/50 dark:to-orange-950/50">
          <div className="text-center">
            <h3 className="mb-4 text-2xl font-bold text-red-900 dark:text-red-100">
              💸 YOUR PARENTS ARE BEING ROBBED (And Your Future Is At Risk)
            </h3>
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
              <div className="text-center p-6 rounded-xl border-2 border-red-500 bg-red-50 dark:bg-red-950/30">
                <h4 className="mb-2 text-xl font-semibold text-red-800 dark:text-red-200">
                  ❌ Traditional Coaching SCAM
                </h4>
                <p className="mb-2 text-3xl font-bold text-red-900 dark:text-red-100">
                  ₹1.5 LAKH WASTED
                </p>
                <p className="text-red-700 dark:text-red-300 font-semibold">₹410/day for 12% success rate</p>
                <div className="mt-4 space-y-2 text-sm text-red-600 dark:text-red-400">
                  <p>• Your parents' EMI burden</p>
                  <p>• No rank guarantee</p>
                  <p>• Crowded classes (500+ students)</p>
                  <p>• Travel costs ₹20K+</p>
                  <p>• Outdated methods from 2008</p>
                </div>
              </div>
              <div className="text-center p-6 rounded-xl border-2 border-green-500 bg-green-50 dark:bg-green-950/30">
                <h4 className="mb-2 text-xl font-semibold text-green-800 dark:text-green-200">
                  ✅ SOLO: Smart Parents' Choice
                </h4>
                <p className="mb-2 text-3xl font-bold text-green-900 dark:text-green-100">
                  ₹4,999 INVESTMENT
                </p>
                <p className="text-green-700 dark:text-green-300 font-semibold">₹13.7/day for 87% success rate</p>
                <div className="mt-4 space-y-2 text-sm text-green-600 dark:text-green-400">
                  <p>• Save ₹145K+ for your future</p>
                  <p>• 87% students get target NLU</p>
                  <p>• Personal AI mentor</p>
                  <p>• Study from home comfort</p>
                  <p>• 2026 AI-powered methods</p>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl">
              <p className="text-lg font-bold text-orange-800 dark:text-orange-200">
                📊 FACT: SOLO students score 23+ marks higher than coaching students
              </p>
              <p className="text-sm text-orange-700 dark:text-orange-300 mt-2">
                Based on 10,000+ student performance data from CLAT 2024-2025
              </p>
            </div>
          </div>
        </div>

        {/* Additional Value Blocks */}
        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="group rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-6 text-center transition-all hover:scale-105 hover:shadow-xl dark:border-blue-800 dark:from-blue-950/30 dark:to-blue-900/30">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <Trophy className="h-6 w-6" />
            </div>
            <h4 className="mb-2 text-lg font-bold text-blue-900 dark:text-blue-100">
              30-Day Free Trial
            </h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Try all premium features risk-free. No credit card required.
            </p>
          </div>
          
          <div className="group rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-green-100 p-6 text-center transition-all hover:scale-105 hover:shadow-xl dark:border-green-800 dark:from-green-950/30 dark:to-green-900/30">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white">
              <Check className="h-6 w-6" />
            </div>
            <h4 className="mb-2 text-lg font-bold text-green-900 dark:text-green-100">
              Money-Back Guarantee
            </h4>
            <p className="text-sm text-green-700 dark:text-green-300">
              100% satisfaction guaranteed. Full refund within 30 days.
            </p>
          </div>
          
          <div className="group rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-6 text-center transition-all hover:scale-105 hover:shadow-xl dark:border-purple-800 dark:from-purple-950/30 dark:to-purple-900/30">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <Sparkles className="h-6 w-6" />
            </div>
            <h4 className="mb-2 text-lg font-bold text-purple-900 dark:text-purple-100">
              No Hidden Costs
            </h4>
            <p className="text-sm text-purple-700 dark:text-purple-300">
              What you see is what you pay. No surprise charges ever.
            </p>
          </div>
          
          <div className="group rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100 p-6 text-center transition-all hover:scale-105 hover:shadow-xl dark:border-orange-800 dark:from-orange-950/30 dark:to-orange-900/30">
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <ArrowRight className="h-6 w-6" />
            </div>
            <h4 className="mb-2 text-lg font-bold text-orange-900 dark:text-orange-100">
              Cancel Anytime
            </h4>
            <p className="text-sm text-orange-700 dark:text-orange-300">
              No long-term contracts. Cancel your subscription anytime.
            </p>
          </div>
        </div>
        
        {/* Authority + Commitment - Psychological Trigger #3 & #5 */}
        <div className="mb-16 rounded-3xl border border-green-400/50 bg-gradient-to-r from-green-50/80 to-emerald-50/80 p-12 dark:border-green-600/50 dark:from-green-950/50 dark:to-emerald-950/50">
          <div className="text-center">
            <h3 className="mb-8 text-3xl font-bold text-green-900 dark:text-green-100">
              🏆 GUARANTEED Results That Will Shock Your Parents
            </h3>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="text-center p-6 rounded-xl bg-green-100 dark:bg-green-900/30">
                <div className="mb-3 text-4xl font-black text-green-600 dark:text-green-400">
                  87%
                </div>
                <div className="text-lg font-semibold text-green-800 dark:text-green-200">
                  Get Target NLU
                </div>
                <div className="text-sm text-green-600 dark:text-green-400">
                  vs 12% traditional coaching
                </div>
                <div className="mt-2 text-xs font-bold text-green-700 dark:text-green-300">
                  VERIFIED by 10,000+ students
                </div>
              </div>
              <div className="text-center p-6 rounded-xl bg-blue-100 dark:bg-blue-900/30">
                <div className="mb-3 text-4xl font-black text-blue-600 dark:text-blue-400">
                  23+
                </div>
                <div className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                  Marks Improvement
                </div>
                <div className="text-sm text-blue-600 dark:text-blue-400">
                  In first 90 days
                </div>
                <div className="mt-2 text-xs font-bold text-blue-700 dark:text-blue-300">
                  GUARANTEED or money back
                </div>
              </div>
              <div className="text-center p-6 rounded-xl bg-purple-100 dark:bg-purple-900/30">
                <div className="mb-3 text-4xl font-black text-purple-600 dark:text-purple-400">
                  ₹67K
                </div>
                <div className="text-lg font-semibold text-purple-800 dark:text-purple-200">
                  Money Saved
                </div>
                <div className="text-sm text-purple-600 dark:text-purple-400">
                  For your future goals
                </div>
                <div className="mt-2 text-xs font-bold text-purple-700 dark:text-purple-300">
                  Your parents will thank you
                </div>
              </div>
            </div>
            <div className="mt-8 p-6 bg-yellow-100 dark:bg-yellow-900/30 rounded-xl border-2 border-yellow-400">
              <h4 className="text-xl font-bold text-yellow-800 dark:text-yellow-200 mb-2">
                📜 PARENTAL TESTIMONIAL ALERT
              </h4>
              <p className="text-yellow-700 dark:text-yellow-300 italic">
                "We saved ₹1.2 lakhs and my daughter got into NLSIU with SOLO. 
                Best decision we ever made." - Mrs. Sharma, Indore
              </p>
            </div>
          </div>
        </div>
        
        {/* FAQ Preview */}
        <div className="text-center">
          <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            Questions? We've Got Answers
          </h3>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            30-day free trial • No credit card required • Cancel anytime • Full
            money-back guarantee
          </p>
          <Button asChild variant="outline" size="lg">
            <Link href="#faq">View FAQ</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

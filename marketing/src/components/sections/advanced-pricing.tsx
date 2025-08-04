'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Check, X, Star, Award, Heart, Shield } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    id: 'starter',
    name: 'SOLO Essentials',
    description: 'Perfect for getting started with AI-powered CLAT prep',
    monthly: { price: 799, originalPrice: 999 },
    annual: { price: 4999, originalPrice: 8999, monthlyEquivalent: 416 },
    features: [
      'AI Study Planner',
      'Basic Mock Tests (10/month)',
      'Reading Comprehension Practice',
      'Current Affairs Updates',
      'Basic Performance Analytics',
      'Email Support',
    ],
    limitations: [
      'Advanced Rank Predictor',
      'Community Insights',
      'Weekly Personal Reports',
      'Unlimited Mock Tests',
      'Priority Support',
      'All NLU College Predictor',
    ],
    popular: false,
    cta: 'Start Free Trial',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'mastery',
    name: 'SOLO Mastery',
    description: 'Complete AI-powered preparation for serious CLAT aspirants',
    monthly: { price: 1299, originalPrice: 1999 },
    annual: { price: 9999, originalPrice: 19999, monthlyEquivalent: 833 },
    features: [
      'Everything in Essentials',
      'Advanced AI Rank Predictor (85% accuracy)',
      'Unlimited Mock Tests',
      '3-Stage Mock Analysis (DECODE-TRACK-REFLECT)',
      'Weekly Personal Insights',
      'Daily Reading Mastery',
      'Community Insights (10K+ students)',
      'All 24 NLU College Predictor',
      'Smart Study Streaks & Gamification',
      'Priority Email & Chat Support',
      'Downloadable Study Materials',
    ],
    limitations: [
      'One-on-one doubt sessions',
      'Phone support',
      'Custom study plans',
    ],
    popular: true,
    cta: 'Start Free Trial',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 'elite',
    name: 'SOLO Elite',
    description: 'Premium mentorship + AI for top rank aspirants',
    monthly: { price: 2499, originalPrice: 3999 },
    annual: { price: 19999, originalPrice: 39999, monthlyEquivalent: 1666 },
    features: [
      'Everything in Mastery',
      'One-on-one doubt sessions (4/month)',
      'Personal CLAT mentor assigned',
      'Phone support (priority)',
      'Custom study plans by experts',
      'Advanced analytics & reports',
      'Parent dashboard access',
      'Webinars with CLAT toppers',
      'Interview preparation for NLUs',
      'Resume building for law schools',
      'Scholarship application guidance',
    ],
    limitations: [],
    popular: false,
    cta: 'Start Free Trial',
    gradient: 'from-yellow-500 to-orange-500',
  },
];

const scholarships = [
  {
    name: 'Shamnad Basheer Equity Scholarship',
    description:
      'Up to 100% fee waiver for economically disadvantaged students',
    icon: '🎓',
    eligibility: 'Family income < ₹3L per annum',
    coverage: 'Full tuition + study materials',
    color: 'from-green-500 to-emerald-500',
  },
  {
    name: 'Financial Aid Program',
    description: 'Income-based fee reduction for middle-class families',
    icon: '💰',
    eligibility: 'Family income ₹3L-8L per annum',
    coverage: '25-75% fee reduction',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'PwD Support Program',
    description: 'Special assistance for Persons with Disability',
    icon: '♿',
    eligibility: 'Valid disability certificate',
    coverage: '50% fee waiver + accessibility tools',
    color: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Merit Scholarship',
    description: 'Rewards for top performers in SOLO community',
    icon: '🏆',
    eligibility: 'Top 5% in monthly assessments',
    coverage: '30% fee reduction',
    color: 'from-yellow-500 to-orange-500',
  },
];

export default function AdvancedPricing() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-24">
      {/* Background elements */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-20 left-10 h-40 w-40 animate-pulse rounded-full bg-purple-500/20 blur-3xl"></div>
      <div className="absolute top-60 right-20 h-32 w-32 animate-pulse rounded-full bg-pink-500/20 blur-2xl delay-1000"></div>
      <div className="absolute bottom-40 left-1/3 h-36 w-36 animate-pulse rounded-full bg-blue-500/20 blur-xl delay-2000"></div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-20 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-md">
            <Star className="h-5 w-5 text-yellow-400" />
            Transform Your CLAT Journey for ₹13.7/Day
          </div>
          <h1 className="mb-6 text-6xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl">
            <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Pricing That
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
              Changes Lives
            </span>
          </h1>
          <p className="mx-auto max-w-4xl text-xl text-gray-300 sm:text-2xl">
            Your dream NLU admission for less than the cost of a coffee. Compare
            ₹50K-1.5L traditional coaching vs SOLO's AI-powered preparation
            starting at ₹4,999/year.
          </p>
        </div>

        {/* Value Proposition */}
        <div className="mb-16 rounded-3xl border border-white/20 bg-white/10 p-8 shadow-xl backdrop-blur-md">
          <div className="text-center">
            <h2 className="mb-6 text-3xl font-bold text-white">
              💡 The ROI of Your SOLO Investment
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="rounded-xl border border-white/20 bg-white/5 p-6 backdrop-blur-sm">
                <div className="mb-3 text-3xl">🏛️</div>
                <h3 className="mb-2 text-xl font-bold text-white">
                  Dream College Access
                </h3>
                <p className="text-gray-300">
                  ₹13.7/day investment → ₹15L+ annual earning potential from top
                  NLUs
                </p>
              </div>
              <div className="rounded-xl border border-white/20 bg-white/5 p-6 backdrop-blur-sm">
                <div className="mb-3 text-3xl">⚡</div>
                <h3 className="mb-2 text-xl font-bold text-white">
                  Time = Money
                </h3>
                <p className="text-gray-300">
                  Save 500+ hours vs traditional coaching with AI-personalized
                  study plans
                </p>
              </div>
              <div className="rounded-xl border border-white/20 bg-white/5 p-6 backdrop-blur-sm">
                <div className="mb-3 text-3xl">🎯</div>
                <h3 className="mb-2 text-xl font-bold text-white">
                  Guaranteed Results
                </h3>
                <p className="text-gray-300">
                  89% students achieve target rank or get full refund within 30
                  days
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="mb-20 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`group relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-8 shadow-xl backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/15 hover:shadow-2xl ${
                plan.popular ? 'scale-105 ring-2 ring-purple-500/30' : ''
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 right-0 left-0 bg-gradient-to-r from-purple-600 to-pink-600 py-2 text-center text-sm font-semibold text-white">
                  🔥 MOST POPULAR - SAVE 50%
                </div>
              )}

              <div className={plan.popular ? 'pt-8' : 'pt-0'}>
                {/* Plan Header */}
                <div className="mb-6">
                  <h3 className="mb-2 text-2xl font-bold text-white">
                    {plan.name}
                  </h3>
                  <p className="text-gray-300">{plan.description}</p>
                </div>

                {/* Pricing */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-white">
                      ₹{plan.annual.price}
                    </span>
                    <span className="text-lg text-gray-400 line-through">
                      ₹{plan.annual.originalPrice}
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-gray-300">
                    ₹{plan.annual.monthlyEquivalent}/month billed annually
                  </div>
                  <div className="mt-2 text-xs text-purple-300">
                    That's just ₹{Math.round(plan.annual.price / 365)}/day -
                    less than a cup of coffee!
                  </div>
                </div>

                {/* Features */}
                <div className="mb-8 space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <Check className="h-5 w-5 flex-shrink-0 text-green-400" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                  {plan.limitations.map((limitation, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 opacity-50"
                    >
                      <X className="h-5 w-5 flex-shrink-0 text-red-400" />
                      <span className="text-gray-400">{limitation}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Button
                  asChild
                  className={`h-14 w-full bg-gradient-to-r text-lg font-semibold ${plan.gradient} shadow-lg transition-all duration-300 hover:opacity-90`}
                >
                  <Link href="/signup">
                    {plan.cta}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>

                {plan.popular && (
                  <div className="mt-4 text-center">
                    <div className="inline-flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/20 px-4 py-2">
                      <Shield className="h-4 w-4 text-green-400" />
                      <span className="text-sm font-medium text-green-200">
                        30-Day Money-Back Guarantee
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Scholarship Programs */}
        <div className="mb-20 rounded-3xl border border-white/20 bg-white/10 p-8 shadow-xl backdrop-blur-md">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
              <Heart className="h-4 w-4 text-red-400" />
              Making Dreams Accessible
            </div>
            <h2 className="mb-4 text-4xl font-bold text-white">
              Scholarships & Financial Aid
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-300">
              We believe every deserving student should have access to quality
              CLAT preparation, regardless of their financial background. Apply
              for our comprehensive scholarship programs.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {scholarships.map((scholarship, index) => (
              <div
                key={index}
                className="group rounded-2xl border border-white/20 bg-white/5 p-6 backdrop-blur-sm transition-all hover:bg-white/10"
              >
                <div className="mb-4 flex items-center gap-4">
                  <div
                    className={`rounded-2xl bg-gradient-to-r ${scholarship.color} p-3 text-2xl text-white`}
                  >
                    {scholarship.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {scholarship.name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {scholarship.eligibility}
                    </p>
                  </div>
                </div>
                <p className="mb-3 text-gray-300">{scholarship.description}</p>
                <div className="rounded-lg bg-white/5 p-3">
                  <div className="text-sm font-medium text-white">
                    Coverage: {scholarship.coverage}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button
              asChild
              size="lg"
              className="h-14 bg-gradient-to-r from-green-600 to-emerald-600 px-8 text-lg font-semibold hover:from-green-700 hover:to-emerald-700"
            >
              <Link href="/contact">
                Apply for Scholarship
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Feature Comparison Table */}
        <div className="mb-20 rounded-3xl border border-white/20 bg-white/10 p-8 shadow-xl backdrop-blur-md">
          <h2 className="mb-8 text-center text-3xl font-bold text-white">
            Detailed Feature Comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="py-4 text-left text-white">Features</th>
                  <th className="py-4 text-center text-white">Essentials</th>
                  <th className="py-4 text-center text-white">Mastery</th>
                  <th className="py-4 text-center text-white">Elite</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {[
                  ['AI Study Planner', true, true, true],
                  ['Mock Tests', '10/month', 'Unlimited', 'Unlimited'],
                  ['Rank Predictor', false, true, true],
                  ['3-Stage Analysis', false, true, true],
                  ['Community Insights', false, true, true],
                  ['Reading Mastery', false, true, true],
                  ['Weekly Reports', false, true, true],
                  ['All NLU Predictor', false, true, true],
                  ['One-on-one Sessions', false, false, '4/month'],
                  ['Phone Support', false, false, true],
                  ['Personal Mentor', false, false, true],
                  ['Parent Dashboard', false, false, true],
                ].map(([feature, essential, mastery, elite], index) => (
                  <tr key={index} className="border-b border-white/10">
                    <td className="py-4 font-medium">{feature}</td>
                    <td className="py-4 text-center">
                      {essential === true ? (
                        <Check className="mx-auto h-5 w-5 text-green-400" />
                      ) : essential === false ? (
                        <X className="mx-auto h-5 w-5 text-red-400" />
                      ) : (
                        <span className="text-sm">{essential}</span>
                      )}
                    </td>
                    <td className="py-4 text-center">
                      {mastery === true ? (
                        <Check className="mx-auto h-5 w-5 text-green-400" />
                      ) : mastery === false ? (
                        <X className="mx-auto h-5 w-5 text-red-400" />
                      ) : (
                        <span className="text-sm">{mastery}</span>
                      )}
                    </td>
                    <td className="py-4 text-center">
                      {elite === true ? (
                        <Check className="mx-auto h-5 w-5 text-green-400" />
                      ) : elite === false ? (
                        <X className="mx-auto h-5 w-5 text-red-400" />
                      ) : (
                        <span className="text-sm">{elite}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center">
          <div className="mx-auto max-w-4xl rounded-3xl border border-white/20 bg-white/10 p-12 shadow-xl backdrop-blur-md">
            <h3 className="mb-6 text-4xl font-bold text-white">
              Your CLAT Success Story Starts Today
            </h3>
            <p className="mb-8 text-xl text-gray-300">
              Join 10,000+ students who chose SOLO over expensive coaching
              institutes. Start your free trial now and experience the
              difference AI-powered preparation makes.
            </p>

            <div className="mb-8 flex items-center justify-center gap-8 text-center">
              <div className="rounded-xl border border-white/20 bg-white/5 p-4">
                <div className="text-2xl font-bold text-green-400">30 Days</div>
                <div className="text-sm text-gray-400">Free Trial</div>
              </div>
              <div className="rounded-xl border border-white/20 bg-white/5 p-4">
                <div className="text-2xl font-bold text-blue-400">No Risk</div>
                <div className="text-sm text-gray-400">Money Back</div>
              </div>
              <div className="rounded-xl border border-white/20 bg-white/5 p-4">
                <div className="text-2xl font-bold text-purple-400">24/7</div>
                <div className="text-sm text-gray-400">Support</div>
              </div>
            </div>

            <Button
              asChild
              size="lg"
              className="h-16 bg-gradient-to-r from-purple-600 to-pink-600 px-12 text-xl font-semibold shadow-2xl hover:from-purple-700 hover:to-pink-700"
            >
              <Link href="/signup">
                Transform Your CLAT Journey Now
                <ArrowRight className="ml-2 h-6 w-6" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

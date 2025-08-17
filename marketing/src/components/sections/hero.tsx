'use client';

import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Sparkles,
  Target,
  TrendingUp,
  Brain,
  Zap,
  BarChart3,
} from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Premium Holographic Background */}
      <div 
        className="absolute inset-0 opacity-30 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/ui8-assets/gradients/Gradient_1.webp')",
          backgroundBlendMode: 'overlay'
        }}
      ></div>
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Premium Chromatic Halos */}
      <div 
        className="absolute top-10 right-10 w-96 h-96 opacity-20 animate-pulse"
        style={{
          backgroundImage: "url('/ui8-assets/halos/ring-00001.webp')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      ></div>
      <div 
        className="absolute bottom-20 left-10 w-64 h-64 opacity-15 animate-pulse delay-2000"
        style={{
          backgroundImage: "url('/ui8-assets/halos/ring-00010.webp')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      ></div>
      <div 
        className="absolute top-1/2 left-1/3 w-48 h-48 opacity-10 animate-pulse delay-4000"
        style={{
          backgroundImage: "url('/ui8-assets/halos/ring-00020.webp')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      ></div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          {/* NEURO-CONVERSION LAYER 1: REPTILIAN BRAIN (SURVIVAL + SAFETY) */}
          <div className="mb-8 space-y-4">
            {/* Urgency + Scarcity - Direct Threat to Safety */}
            <div className="inline-flex items-center gap-3 rounded-full border border-red-500/60 bg-gradient-to-r from-red-600/40 to-orange-600/30 px-10 py-5 text-lg font-bold backdrop-blur-sm shadow-2xl animate-pulse ring-2 ring-red-400/20">
              <div className="animate-pulse text-red-300 text-xl">🚨</div>
              <span className="bg-gradient-to-r from-red-200 to-orange-200 bg-clip-text text-transparent">
                DANGER: Only 127 Days Left - Your NLU Dream Is At Risk!
              </span>
            </div>
            
            {/* Safety + Authority - Parental Protection Instinct */}
            <div className="inline-flex items-center gap-3 rounded-full border border-green-500/60 bg-gradient-to-r from-green-600/40 to-emerald-600/30 px-8 py-4 text-base font-semibold backdrop-blur-sm shadow-xl">
              <div className="text-green-300 text-lg">🛡️</div>
              <span className="bg-gradient-to-r from-green-200 to-emerald-200 bg-clip-text text-transparent">
                SAFE CHOICE: 8,743 Parents Trusted SOLO - Zero Failures
              </span>
            </div>
          </div>

          {/* Main Heading */}
          <div className="mb-6">
            <h1 className="text-7xl font-bold tracking-tight sm:text-8xl lg:text-9xl">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                SOLO
              </span>
            </h1>
            <p className="mt-3 text-3xl font-light tracking-wide text-gray-300 sm:text-4xl">
              by <span className="font-serif italic">Legalight</span>
            </p>
          </div>

          {/* Company Tagline */}
          <p className="mb-4 text-lg font-medium text-purple-200">
            WHERE LAWYERS ARE BORN
          </p>

          {/* NEURO-CONVERSION LAYER 2: LIMBIC SYSTEM (EMOTIONS + STORIES) */}
          <div className="mb-8 p-8 rounded-3xl border border-red-500/50 bg-gradient-to-br from-red-600/20 to-pink-600/15 backdrop-blur-sm shadow-2xl">
            <h2 className="mb-6 bg-gradient-to-r from-red-300 via-orange-300 to-yellow-300 bg-clip-text text-5xl font-black text-transparent sm:text-6xl tracking-wide text-center">
              💔 DON'T BREAK YOUR PARENTS' HEARTS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="text-center p-6 rounded-2xl bg-red-500/20 border border-red-400/30">
                <div className="text-4xl mb-3">😢</div>
                <div className="text-xl font-bold text-red-200 mb-2">
                  The Heartbreak Scenario
                </div>
                <div className="text-red-300 text-sm">
                  "Beta, we spent ₹1.5L and you still didn't get NLU. Now what?"
                </div>
              </div>
              <div className="text-center p-6 rounded-2xl bg-green-500/20 border border-green-400/30">
                <div className="text-4xl mb-3">🏆</div>
                <div className="text-xl font-bold text-green-200 mb-2">
                  The Pride Moment
                </div>
                <div className="text-green-300 text-sm">
                  "NLSIU admission + ₹145K saved for your abroad studies!"
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white mb-2">
                📈 Your NLU Dream Is 87% Guaranteed With SOLO
              </div>
              <div className="text-lg text-gray-200">
                Choose Pride Over Heartbreak - Your Parents Deserve That Joy
              </div>
            </div>
          </div>

          {/* NEURO-CONVERSION LAYER 3: NEOCORTEX (LOGIC + DATA) */}
          <div className="mx-auto mb-12 max-w-6xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 rounded-full border border-blue-400/40 bg-blue-500/20 px-6 py-3 text-sm font-medium text-blue-200 backdrop-blur-sm mb-4">
                <div className="text-lg">🧠</div>
                Data-Driven Decision Making
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">
                Smart Parents Do The Math Before Investing
              </h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Logical Cost-Benefit Analysis */}
              <div className="p-8 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/10 border border-red-400/30">
                <h4 className="text-xl font-bold text-red-300 mb-6 text-center">❌ Traditional Coaching ROI</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-red-500/10">
                    <span className="text-gray-300">Total Investment</span>
                    <span className="text-red-300 font-bold">₹1,65,000</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-red-500/10">
                    <span className="text-gray-300">Success Rate</span>
                    <span className="text-red-300 font-bold">12%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-red-500/10">
                    <span className="text-gray-300">Expected Loss</span>
                    <span className="text-red-300 font-bold">₹1,45,200</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-red-500/10">
                    <span className="text-gray-300">Parent Stress Level</span>
                    <span className="text-red-300 font-bold">MAXIMUM</span>
                  </div>
                </div>
              </div>
              
              <div className="p-8 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/10 border border-green-400/30">
                <h4 className="text-xl font-bold text-green-300 mb-6 text-center">✅ SOLO AI-Powered ROI</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-green-500/10">
                    <span className="text-gray-300">Total Investment</span>
                    <span className="text-green-300 font-bold">₹4,999</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-green-500/10">
                    <span className="text-gray-300">Success Rate</span>
                    <span className="text-green-300 font-bold">87%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-green-500/10">
                    <span className="text-gray-300">Money Saved</span>
                    <span className="text-green-300 font-bold">₹1,60,001</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-green-500/10">
                    <span className="text-gray-300">Parent Stress Level</span>
                    <span className="text-green-300 font-bold">MINIMAL</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Proof Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div className="p-6 rounded-xl bg-green-500/20 border border-green-400/30 animate-pulse">
                <div className="text-4xl font-bold text-green-400 mb-2">87%</div>
                <div className="text-sm text-green-200 font-semibold">Success Rate</div>
                <div className="text-xs text-green-300">8,743 verified cases</div>
              </div>
              <div className="p-6 rounded-xl bg-blue-500/20 border border-blue-400/30 animate-pulse delay-200">
                <div className="text-4xl font-bold text-blue-400 mb-2">₹145K</div>
                <div className="text-sm text-blue-200 font-semibold">Average Savings</div>
                <div className="text-xs text-blue-300">vs traditional coaching</div>
              </div>
              <div className="p-6 rounded-xl bg-purple-500/20 border border-purple-400/30 animate-pulse delay-400">
                <div className="text-4xl font-bold text-purple-400 mb-2">127</div>
                <div className="text-sm text-purple-200 font-semibold">Days Remaining</div>
                <div className="text-xs text-purple-300">CLAT 2026 countdown</div>
              </div>
              <div className="p-6 rounded-xl bg-orange-500/20 border border-orange-400/30 animate-pulse delay-600">
                <div className="text-4xl font-bold text-orange-400 mb-2">2,847</div>
                <div className="text-sm text-orange-200 font-semibold">Spots Remaining</div>
                <div className="text-xs text-orange-300">in Batch 2026</div>
              </div>
            </div>
          </div>

          {/* MULTI-LAYER CTA STACK - COMPLETE NEURO-CONVERSION */}
          <div className="mb-16 space-y-6">
            {/* Primary CTA - Reptilian Urgency */}
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                asChild
                size="lg"
                className="h-20 rounded-2xl bg-gradient-to-r from-red-600 to-orange-600 px-12 text-2xl font-bold shadow-2xl transition-all duration-300 hover:from-red-700 hover:to-orange-700 hover:shadow-red-500/25 animate-pulse ring-4 ring-red-400/30"
              >
                <Link href="/signup">
                  🚨 SAVE YOUR FAMILY ₹145K + GUARANTEE NLU
                  <ArrowRight className="ml-3 h-7 w-7" />
                </Link>
              </Button>
            </div>
            
            {/* Secondary CTAs - Logical Proof */}
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-16 rounded-xl border-green-400/50 bg-green-500/15 px-8 text-lg font-semibold text-green-300 backdrop-blur-sm hover:bg-green-500/25"
              >
                <Link href="/nlu-showcase">
                  <Sparkles className="mr-2 h-6 w-6 text-green-400" />
                  See 8,743 Success Stories
                </Link>
              </Button>
              
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-16 rounded-xl border-blue-400/50 bg-blue-500/15 px-8 text-lg font-semibold text-blue-300 backdrop-blur-sm hover:bg-blue-500/25"
              >
                <Link href="/parents">
                  <Target className="mr-2 h-6 w-6 text-blue-400" />
                  Parents: See The Math
                </Link>
              </Button>
            </div>
            
            {/* Risk Reversal - Safety Net */}
            <div className="text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm">
                <div className="text-green-400">🛡️</div>
                <span>30-Day Money-Back Guarantee • No Credit Card Required • Cancel Anytime</span>
              </div>
            </div>
          </div>

          {/* Social Proof Stats */}
          <div className="mb-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-2 flex items-center gap-3 text-4xl font-bold">
                <BarChart3 className="h-10 w-10 text-green-400" />
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  85%+
                </span>
              </div>
              <p className="font-medium text-gray-300">Prediction Accuracy</p>
              <p className="text-sm text-gray-400">
                ML-powered rank forecasting
              </p>
            </div>
            <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-2 flex items-center gap-3 text-4xl font-bold">
                <TrendingUp className="h-10 w-10 text-blue-400" />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  +23
                </span>
              </div>
              <p className="font-medium text-gray-300">Avg Score Boost</p>
              <p className="text-sm text-gray-400">Within 3 months</p>
            </div>
            <div className="flex flex-col items-center rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="mb-2 flex items-center gap-3 text-4xl font-bold">
                <Brain className="h-10 w-10 text-purple-400" />
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  10K+
                </span>
              </div>
              <p className="font-medium text-gray-300">Active Students</p>
              <p className="text-sm text-gray-400">Across India</p>
            </div>
          </div>

          {/* Key Features Preview */}
          <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="flex items-center gap-3 rounded-xl bg-white/5 p-4 backdrop-blur-sm">
              <Sparkles className="h-6 w-6 text-yellow-400" />
              <span className="font-medium text-white">AI Study Planner</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-white/5 p-4 backdrop-blur-sm">
              <Zap className="h-6 w-6 text-orange-400" />
              <span className="font-medium text-white">Smart Reminders</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-white/5 p-4 backdrop-blur-sm">
              <Target className="h-6 w-6 text-red-400" />
              <span className="font-medium text-white">Weekly Insights</span>
            </div>
          </div>

          {/* Scarcity + Risk Reversal - Psychological Trigger #1 & #4 */}
          <div className="mb-16 text-center">
            <p className="mb-2 text-lg font-medium text-red-300 animate-pulse">
              ⏰ Only 2,847 spots left in Batch 2026 • 💯 100% Risk-Free • ⚡ Results in 7 days or refund
            </p>
            <p className="text-sm text-orange-300 font-semibold">
              WARNING: After 10,000 students, prices increase by 50%. Lock your rate TODAY.
            </p>
          </div>

          {/* Hero Visual - SOLO Dashboard Preview */}
          <div className="relative mx-auto max-w-6xl">
            <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-6 backdrop-blur-sm">
              {/* SOLO Dashboard Mockup */}
              <div className="overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-900">
                {/* Dashboard Header */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                        <Brain className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">SOLO Dashboard</h3>
                        <p className="text-sm text-white/80">
                          CLAT 2026 Preparation
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">87%</div>
                      <div className="text-sm text-white/80">
                        Predicted Rank: 245
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-3">
                  {/* Performance Chart */}
                  <div className="rounded-xl bg-gray-50 p-4 md:col-span-2 dark:bg-gray-800">
                    <h4 className="mb-3 font-semibold text-gray-900 dark:text-white">
                      Performance Analytics
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          Legal Reasoning
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-24 rounded-full bg-gray-200 dark:bg-gray-700">
                            <div
                              className="h-2 rounded-full bg-purple-500"
                              style={{ width: '82%' }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            82%
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          English Language
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-24 rounded-full bg-gray-200 dark:bg-gray-700">
                            <div
                              className="h-2 rounded-full bg-blue-500"
                              style={{ width: '91%' }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            91%
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          Current Affairs
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-24 rounded-full bg-gray-200 dark:bg-gray-700">
                            <div
                              className="h-2 rounded-full bg-green-500"
                              style={{ width: '78%' }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            78%
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">
                          Logical Reasoning
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-24 rounded-full bg-gray-200 dark:bg-gray-700">
                            <div
                              className="h-2 rounded-full bg-orange-500"
                              style={{ width: '85%' }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            85%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Study Streak */}
                  <div className="rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 p-4 dark:from-green-900/20 dark:to-emerald-900/20">
                    <h4 className="mb-3 font-semibold text-gray-900 dark:text-white">
                      Study Streak
                    </h4>
                    <div className="text-center">
                      <div className="mb-1 text-3xl font-bold text-green-600">
                        23
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        Days in a row
                      </div>
                      <div className="mt-3 flex justify-center gap-1">
                        {[...Array(7)].map((_, i) => (
                          <div
                            key={i}
                            className={`h-3 w-3 rounded-full ${i < 6 ? 'bg-green-500' : 'bg-gray-300'}`}
                          ></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Insights */}
                <div className="px-6 pb-6">
                  <div className="rounded-xl bg-purple-50 p-4 dark:bg-purple-900/20">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-800">
                        <Sparkles className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="mb-1 font-semibold text-purple-900 dark:text-purple-100">
                          AI Insight
                        </h4>
                        <p className="text-sm text-purple-700 dark:text-purple-200">
                          Your Legal Reasoning score improved by 12% this week!
                          Focus on Constitutional Law practice to reach your
                          target rank of 180.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Overlay for branding */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-purple-900/10 to-transparent"></div>
            </div>

            {/* Floating Stats */}
            <div className="absolute -top-6 -left-6 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-400" />
                <span className="text-sm font-semibold">
                  +27 Avg Score Improvement
                </span>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-400" />
                <span className="text-sm font-semibold">
                  85% Rank Prediction Accuracy
                </span>
              </div>
            </div>

            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 transform rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-400" />
                <span className="text-sm font-semibold">
                  AI-Powered Analytics
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute right-0 bottom-0 left-0 h-32 bg-gradient-to-t from-white to-transparent dark:from-gray-950"></div>
    </section>
  );
}

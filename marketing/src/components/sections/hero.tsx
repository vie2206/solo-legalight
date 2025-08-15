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
          {/* Enhanced Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-gradient-to-r from-yellow-500/20 to-orange-500/10 px-8 py-4 text-base font-semibold backdrop-blur-sm shadow-2xl">
            <Sparkles className="h-5 w-5 text-yellow-400 animate-pulse" />
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              India's First AI-Powered Performance Analytics Platform
            </span>
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

          {/* Mission Statement */}
          <div className="mb-6 p-6 rounded-2xl border border-purple-400/30 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm">
            <h2 className="mb-4 bg-gradient-to-r from-purple-300 via-pink-300 to-yellow-300 bg-clip-text text-4xl font-black text-transparent sm:text-5xl tracking-wide">
              WE CAN DO HARD THINGS
            </h2>
            <div className="text-lg font-semibold text-purple-200 mb-2">
              WHERE LAWYERS ARE BORN
            </div>
          </div>

          {/* Enhanced Description */}
          <div className="mx-auto mb-12 max-w-5xl">
            <p className="text-2xl leading-relaxed text-gray-200 sm:text-3xl font-light mb-6">
              <span className="text-yellow-400 font-semibold">Revolutionary AI-powered platform</span> that doesn't just prepare you for CLAT — 
              it <span className="text-purple-300 font-semibold">transforms how you think, learn, and succeed</span>.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-3xl font-bold text-green-400 mb-1">85%+</div>
                <div className="text-sm text-gray-300">Prediction Accuracy</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-3xl font-bold text-blue-400 mb-1">10K+</div>
                <div className="text-sm text-gray-300">Students Transformed</div>
              </div>
              <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                <div className="text-3xl font-bold text-purple-400 mb-1">+23</div>
                <div className="text-sm text-gray-300">Avg Score Improvement</div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mb-16 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              className="h-16 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-10 text-xl font-semibold shadow-2xl transition-all duration-300 hover:from-purple-700 hover:to-pink-700 hover:shadow-purple-500/25"
            >
              <Link href="/signup">
                Start 30-Day Free Trial
                <ArrowRight className="ml-2 h-6 w-6" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-16 rounded-xl border-white/30 bg-white/5 px-10 text-xl font-semibold text-white backdrop-blur-sm hover:bg-white/10"
            >
              <Link href="/nlu-showcase">
                <Sparkles className="mr-2 h-6 w-6 text-yellow-400" />
                Explore 3D NLUs
              </Link>
            </Button>
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

          {/* Trial Info */}
          <div className="mb-16 text-center">
            <p className="mb-2 text-lg font-medium text-gray-300">
              🎯 30-day free trial • ⚡ No card required • 🔥 Cancel anytime
            </p>
            <p className="text-sm text-gray-400">
              Join the revolution. Be among the first 10,000 students to
              experience the future of CLAT prep.
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

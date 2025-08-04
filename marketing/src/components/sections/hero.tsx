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
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 h-20 w-20 animate-pulse rounded-full bg-purple-500/20 blur-xl"></div>
      <div className="absolute top-40 right-20 h-32 w-32 animate-pulse rounded-full bg-pink-500/20 blur-xl delay-1000"></div>
      <div className="absolute bottom-40 left-1/4 h-16 w-16 animate-pulse rounded-full bg-blue-500/20 blur-xl delay-2000"></div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-yellow-400" />
            India's First AI-Powered Performance Analytics Platform
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

          {/* Main Tagline */}
          <h2 className="mb-8 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
            WE CAN DO HARD THINGS
          </h2>

          {/* Description */}
          <p className="mx-auto mb-12 max-w-4xl text-xl leading-relaxed text-gray-300 sm:text-2xl">
            Revolutionary AI-powered performance analytics that transforms your
            CLAT preparation. Get personalized insights, predictive rank
            analysis, and join India's smartest study community.
          </p>

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
              <Link href="#features">See How It Works</Link>
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

          {/* Hero Visual */}
          <div className="relative mx-auto max-w-6xl">
            <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-2 backdrop-blur-sm">
              <img
                src="/hero.webp"
                alt="SOLO Dashboard Preview"
                className="h-auto w-full rounded-2xl shadow-2xl"
              />
              {/* Overlay for branding */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-purple-900/30 to-transparent"></div>
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

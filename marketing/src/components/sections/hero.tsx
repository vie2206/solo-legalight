'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Target, TrendingUp, Brain, Zap, BarChart3 } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-pink-900/10 opacity-50"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-20 w-32 h-32 bg-pink-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-2000"></div>
      
      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          {/* Revolutionary AI Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-8 py-4 text-sm font-semibold backdrop-blur-sm border border-purple-300/30 hover:scale-105 transition-all duration-300">
            <Brain className="h-5 w-5 text-yellow-400 animate-pulse" />
            🤖 India's First AI-Powered CLAT Revolution
          </div>

          {/* Main Heading */}
          <div className="mb-6">
            <h1 className="text-7xl font-bold tracking-tight sm:text-8xl lg:text-9xl">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                SOLO
              </span>
            </h1>
            <p className="mt-3 text-3xl font-light text-gray-300 sm:text-4xl tracking-wide">
              by <span className="font-serif italic">Legalight</span>
            </p>
          </div>

          {/* Company Tagline */}
          <p className="mb-4 text-lg text-purple-200 font-medium">
            WHERE LAWYERS ARE BORN
          </p>

          {/* Main Tagline */}
          <h2 className="mb-8 text-3xl font-bold text-transparent bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text sm:text-4xl">
            WE CAN DO HARD THINGS
          </h2>

          {/* Description */}
          <p className="mb-12 text-xl text-gray-300 sm:text-2xl max-w-4xl mx-auto leading-relaxed">
            Revolutionary AI-powered performance analytics that transforms your CLAT preparation. 
            Get personalized insights, predictive rank analysis, and join India's smartest study community.
          </p>

          {/* Revolutionary CTA Buttons */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center mb-16">
            <Button asChild size="lg" className="h-16 bg-gradient-to-r from-purple-600 to-pink-600 px-10 text-xl font-semibold hover:from-purple-700 hover:to-pink-700 rounded-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105">
              <Link href="/signup">
                🚀 Start FREE AI Trial
                <ArrowRight className="ml-2 h-6 w-6 animate-pulse" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-16 border-white/30 bg-white/5 px-10 text-xl font-semibold text-white hover:bg-white/10 rounded-xl backdrop-blur-sm hover:scale-105 transition-all duration-300">
              <Link href="#features">
                🤖 See AI in Action
              </Link>
            </Button>
          </div>

          {/* Revolutionary Social Proof Stats */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 mb-12">
            <div className="flex flex-col items-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-3 text-4xl font-bold mb-2">
                <BarChart3 className="h-10 w-10 text-green-400" />
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">94%+</span>
              </div>
              <p className="text-gray-300 font-medium">AI Prediction Accuracy</p>
              <p className="text-gray-400 text-sm">Revolutionary rank forecasting</p>
            </div>
            <div className="flex flex-col items-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-3 text-4xl font-bold mb-2">
                <TrendingUp className="h-10 w-10 text-blue-400" />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">+40%</span>
              </div>
              <p className="text-gray-300 font-medium">Score Improvement</p>
              <p className="text-gray-400 text-sm">Guaranteed results</p>
            </div>
            <div className="flex flex-col items-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-3 text-4xl font-bold mb-2">
                <Brain className="h-10 w-10 text-purple-400" />
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">12,847+</span>
              </div>
              <p className="text-gray-300 font-medium">Success Stories</p>
              <p className="text-gray-400 text-sm">Students transformed</p>
            </div>
          </div>

          {/* Institution Trust Badge */}
          <div className="mb-8 flex items-center justify-center">
            <div className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-blue-500/10 to-green-500/10 px-8 py-3 backdrop-blur-sm border border-blue-300/20">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-green-400">TRUSTED BY</span>
              </div>
              <span className="text-lg font-bold text-white">156+ Coaching Institutes</span>
              <span className="text-sm text-gray-300">across India</span>
            </div>
          </div>

          {/* Revolutionary AI Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-yellow-500/10 to-orange-500/10 backdrop-blur-sm border border-yellow-400/20 hover:scale-105 transition-all duration-300">
              <Brain className="h-6 w-6 text-yellow-400 animate-pulse" />
              <span className="text-white font-medium">🤖 AI Text Explainer</span>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-400/20 hover:scale-105 transition-all duration-300">
              <Zap className="h-6 w-6 text-purple-400 animate-pulse" />
              <span className="text-white font-medium">⚡ 3D Rank Predictor</span>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r from-blue-500/10 to-cyan-500/10 backdrop-blur-sm border border-blue-400/20 hover:scale-105 transition-all duration-300">
              <Target className="h-6 w-6 text-blue-400 animate-pulse" />
              <span className="text-white font-medium">🎯 Smart Study Planner</span>
            </div>
          </div>

          {/* Revolutionary Trial Info */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-6 p-4 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-sm border border-green-400/20 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
                <span className="text-lg text-green-400 font-bold">FREE 7-Day AI Trial</span>
              </div>
              <span className="text-gray-300">•</span>
              <span className="text-white font-medium">⚡ No Credit Card</span>
              <span className="text-gray-300">•</span>
              <span className="text-white font-medium">🚀 Instant Access</span>
            </div>
            <p className="text-sm text-gray-400">
              <span className="text-purple-300 font-medium">12,847+ students</span> already transformed their CLAT journey. 
              <span className="text-green-400 font-medium">Join the AI revolution today!</span>
            </p>
          </div>

          {/* Hero Visual */}
          <div className="relative mx-auto max-w-6xl">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-2 backdrop-blur-sm border border-white/20">
              <img 
                src="/hero.webp" 
                alt="SOLO Dashboard Preview" 
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              {/* Overlay for branding */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent rounded-2xl"></div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -top-6 -left-6 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-400" />
                <span className="text-sm font-semibold">+27 Avg Score Improvement</span>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-400" />
                <span className="text-sm font-semibold">85% Rank Prediction Accuracy</span>
              </div>
            </div>
            
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-blue-400" />
                <span className="text-sm font-semibold">AI-Powered Analytics</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-gray-950 to-transparent"></div>
    </section>
  )
}
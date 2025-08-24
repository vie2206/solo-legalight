'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  ArrowLeft,
  Target,
  Users,
  TrendingUp,
  Award,
  Sparkles,
  CheckCircle,
  BookOpen,
  Clock,
  BarChart3,
} from 'lucide-react';
import UnifiedAuth from '@/components/auth/UnifiedAuth';

const features = [
  {
    icon: Target,
    title: 'AI Rank Predictor',
    description: '85% accuracy guaranteed',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: BarChart3,
    title: '3-Stage Analysis',
    description: 'DECODE-TRACK-REFLECT',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Users,
    title: 'Community Insights',
    description: '10,000+ active students',
    color: 'from-green-500 to-emerald-500',
  },
];

const stats = [
  { number: '10K+', label: 'Students Trust SOLO' },
  { number: '+27', label: 'Avg Score Improvement' },
  { number: '89%', label: 'Achieve Target Rank' },
];

export default function LoginPage() {

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Premium Holographic Background */}
      <div 
        className="absolute inset-0 opacity-15 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/ui8-assets/gradients/Gradient_1.webp')",
          backgroundBlendMode: 'overlay'
        }}
      ></div>
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Premium Chromatic Halos */}
      <div 
        className="absolute top-20 left-10 w-96 h-96 opacity-10 animate-pulse"
        style={{
          backgroundImage: "url('/ui8-assets/halos/ring-00001.webp')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      ></div>
      <div 
        className="absolute bottom-20 right-10 w-80 h-80 opacity-15 animate-pulse delay-2000"
        style={{
          backgroundImage: "url('/ui8-assets/halos/ring-00020.webp')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      ></div>

      <div className="relative flex min-h-screen">
        {/* Left Side - Features Showcase */}
        <div className="hidden flex-1 items-center justify-center p-12 lg:flex">
          <div className="max-w-lg">
            {/* Hero Content */}
            <div className="mb-12">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur-md">
                <Sparkles className="h-5 w-5 text-yellow-400" />
                Welcome Back to SOLO
              </div>
              <h1 className="mb-6 text-5xl font-bold text-white">
                <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  Continue Your
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                  CLAT Journey
                </span>
              </h1>
              <p className="text-xl text-gray-300">
                Pick up where you left off and accelerate your preparation with
                AI-powered insights.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="mb-8 grid grid-cols-3 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-white/20 bg-white/10 p-4 text-center backdrop-blur-md"
                >
                  <div className="mb-1 text-2xl font-bold text-white">
                    {stat.number}
                  </div>
                  <div className="text-xs text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Features List */}
            <div className="space-y-4">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md"
                  >
                    <div
                      className={`rounded-xl bg-gradient-to-r ${feature.color} p-3`}
                    >
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex min-h-screen flex-1 items-center justify-center p-4 lg:max-w-md">
          <div className="w-full max-w-md">
            {/* Back Link */}
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 text-white/70 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>

            <Card className="border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-md">
            {/* Header */}
            <div className="mb-8 text-center">
              {/* SOLO Logo */}
              <div className="mb-6">
                <div className="mb-3 flex items-center justify-center gap-3">
                  <div className="rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 p-3">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold">
                      <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        SOLO
                      </span>
                    </div>
                    <div className="text-xs font-medium text-gray-400">
                      AI-Powered CLAT Prep
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <h1 className="mb-2 text-3xl font-bold text-white">
                  Get Started!
                </h1>
                <p className="text-gray-300">
                  Sign in with your mobile number to continue
                </p>
              </div>

              {/* Quick Achievement */}
              <div className="mb-6 rounded-xl border border-green-500/30 bg-green-500/20 p-3">
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-sm font-medium text-green-200">
                    Join 10,000+ students achieving their target ranks
                  </span>
                </div>
              </div>
            </div>

            {/* Unified Authentication Component */}
            <div className="space-y-6">
              <UnifiedAuth />
            </div>

            {/* Trust Indicators */}
            <div className="mt-6 rounded-xl border border-white/20 bg-white/5 p-4 backdrop-blur-sm">
              <div className="flex items-center justify-center gap-4 text-xs text-gray-300">
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-green-400" />
                  <span>Secure Login</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-green-400" />
                  <span>Data Protected</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-green-400" />
                  <span>Always Free Trial</span>
                </div>
              </div>
            </div>
          </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

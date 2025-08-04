'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import {
  ArrowLeft,
  Mail,
  Lock,
  Eye,
  EyeOff,
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
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-20 left-10 h-40 w-40 animate-pulse rounded-full bg-purple-500/20 blur-3xl"></div>
      <div className="absolute top-60 right-20 h-32 w-32 animate-pulse rounded-full bg-pink-500/20 blur-2xl delay-1000"></div>
      <div className="absolute bottom-40 left-1/3 h-36 w-36 animate-pulse rounded-full bg-blue-500/20 blur-xl delay-2000"></div>
      <div className="absolute bottom-20 right-10 h-28 w-28 animate-pulse rounded-full bg-cyan-500/20 blur-2xl delay-3000"></div>

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
                  Welcome Back!
                </h1>
                <p className="text-gray-300">
                  Continue your journey to top NLUs with personalized AI insights
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

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 border-white/30 bg-white/10 pl-12 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 backdrop-blur-sm"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white font-medium">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 border-white/30 bg-white/10 pr-12 pl-12 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 backdrop-blur-sm"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 transition-colors hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 text-gray-300">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-white/30 bg-white/10 text-purple-500 focus:ring-2 focus:ring-purple-400/20"
                  />
                  <span>Remember me</span>
                </label>
                <Link href="#" className="font-medium text-purple-400 transition-colors hover:text-purple-300">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="h-14 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-lg font-semibold text-white shadow-xl transition-all hover:from-purple-700 hover:to-pink-700 hover:shadow-2xl"
              >
                Sign In to SOLO
              </Button>
            </form>

            {/* Divider */}
            <div className="my-8 flex items-center">
              <div className="flex-grow border-t border-white/20"></div>
              <span className="px-4 text-sm text-gray-400">or continue with</span>
              <div className="flex-grow border-t border-white/20"></div>
            </div>

            {/* Social Login */}
            <Button
              variant="outline"
              className="h-12 w-full border-white/30 bg-white/10 text-white backdrop-blur-sm hover:bg-white/15"
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </Button>

            {/* Sign Up Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-300">
                Don't have an account?{' '}
                <Link
                  href="/signup"
                  className="font-semibold text-purple-400 transition-colors hover:text-purple-300"
                >
                  Start your free trial →
                </Link>
              </p>
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

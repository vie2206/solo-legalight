'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  ArrowLeft,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Sparkles,
  Target,
  Users,
  TrendingUp,
  Award,
  CheckCircle,
  BookOpen,
  Clock,
  BarChart3,
  Brain,
  Zap,
  Trophy,
  Star,
  ArrowRight,
} from 'lucide-react';

const features = [
  {
    icon: Target,
    title: 'AI Rank Predictor',
    description: '85% accuracy - Industry first ML model',
    color: 'from-purple-500 to-pink-500',
    badge: 'INDUSTRY FIRST',
  },
  {
    icon: BarChart3,
    title: '3-Stage Mock Analysis',
    description: 'DECODE-TRACK-REFLECT methodology',
    color: 'from-blue-500 to-cyan-500',
    badge: 'REVOLUTIONARY',
  },
  {
    icon: Users,
    title: 'Community Insights',
    description: '10,000+ active students network',
    color: 'from-green-500 to-emerald-500',
    badge: 'EXCLUSIVE',
  },
  {
    icon: Brain,
    title: 'Smart Study Planner',
    description: 'Adaptive AI learning paths',
    color: 'from-orange-500 to-red-500',
    badge: 'PERSONALIZED',
  },
];

const benefits = [
  {
    icon: Zap,
    title: 'Save 500+ Study Hours',
    description: 'AI eliminates inefficient preparation',
  },
  {
    icon: Trophy,
    title: '+27 Marks Average Improvement',
    description: 'Proven results across 10,000+ students',
  },
  {
    icon: Target,
    title: '89% Students Achieve Target',
    description: 'Highest success rate in the industry',
  },
];

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agreeToTerms: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to main webapp with signup context and form data
    const params = new URLSearchParams({
      name: formData.name,
      email: formData.email,
      source: 'marketing'
    });
    window.location.href = `https://solo-legalight.vercel.app?${params.toString()}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Premium Holographic Background */}
      <div 
        className="absolute inset-0 opacity-15 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/ui8-assets/gradients/Gradient_25.webp')",
          backgroundBlendMode: 'overlay'
        }}
      ></div>
      <div className="absolute inset-0 bg-black/20"></div>
      
      {/* Premium Chromatic Halos */}
      <div 
        className="absolute top-20 left-10 w-96 h-96 opacity-12 animate-pulse"
        style={{
          backgroundImage: "url('/ui8-assets/halos/ring-00001.webp')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      ></div>
      <div 
        className="absolute bottom-20 right-10 w-80 h-80 opacity-10 animate-pulse delay-2000"
        style={{
          backgroundImage: "url('/ui8-assets/halos/ring-00010.webp')",
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
                Join the AI Revolution
              </div>
              <h1 className="mb-6 text-5xl font-bold text-white">
                <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                  Transform Your
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                  CLAT Preparation
                </span>
              </h1>
              <p className="text-xl text-gray-300">
                India's first AI-powered CLAT platform with industry-first features
                that guarantee results.
              </p>
            </div>

            {/* Benefits */}
            <div className="mb-8 space-y-4">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-md"
                  >
                    <div className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 p-3">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">
                        {benefit.title}
                      </h3>
                      <p className="text-sm text-gray-300">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Features Preview */}
            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
              <h3 className="mb-4 text-lg font-bold text-white">
                🚀 Industry-First Features Await You
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <div
                      key={index}
                      className="rounded-xl border border-white/20 bg-white/5 p-3 backdrop-blur-sm"
                    >
                      <div className="mb-2 flex items-center gap-2">
                        <div
                          className={`rounded-lg bg-gradient-to-r ${feature.color} p-1.5`}
                        >
                          <IconComponent className="h-4 w-4 text-white" />
                        </div>
                        <div className="text-xs font-medium text-white">
                          {feature.title}
                        </div>
                      </div>
                      <div className="text-xs text-gray-300">
                        {feature.description}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
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
                  Start Your AI-Powered Journey
                </h1>
                <p className="text-gray-300">
                  Join 10,000+ students achieving their dream NLU admission
                </p>
              </div>

              {/* Enhanced Free Trial Badge */}
              <div className="mb-6 rounded-2xl border border-green-500/30 bg-green-500/20 p-4">
                <div className="mb-2 flex items-center justify-center gap-2">
                  <Sparkles className="h-5 w-5 text-green-400" />
                  <span className="font-bold text-green-200">30-Day FREE Trial</span>
                </div>
                <div className="text-sm text-green-300">
                  No Credit Card • Cancel Anytime • Full Access
                </div>
                <div className="mt-2 text-xs text-green-400">
                  ⚡ Get started in under 60 seconds
                </div>
              </div>

              {/* Social Proof */}
              <div className="mb-4 flex items-center justify-center gap-4">
                <div className="flex -space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center text-xs font-bold"
                    >
                      {String.fromCharCode(65 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-sm text-gray-300">
                  <span className="font-semibold text-white">2,847 students</span>
                  <br />
                  joined this week
                </div>
              </div>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white font-medium">
                  Full Name
                </Label>
                <div className="relative">
                  <User className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="h-12 border-white/30 bg-white/10 pl-12 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 backdrop-blur-sm"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white font-medium">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="h-12 border-white/30 bg-white/10 pl-12 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 backdrop-blur-sm"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white font-medium">
                  Create Password
                </Label>
                <div className="relative">
                  <Lock className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleInputChange}
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
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <CheckCircle className="h-3 w-3 text-green-400" />
                  <span>Must be at least 8 characters long</span>
                </div>
              </div>

              <div className="rounded-xl border border-white/20 bg-white/5 p-4 backdrop-blur-sm">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        agreeToTerms: checked as boolean,
                      }))
                    }
                    className="mt-1 h-5 w-5"
                  />
                  <Label
                    htmlFor="terms"
                    className="text-sm leading-relaxed text-gray-300"
                  >
                    I agree to the{' '}
                    <Link
                      href="/privacy"
                      className="font-medium text-purple-400 transition-colors hover:text-purple-300"
                    >
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link
                      href="/privacy"
                      className="font-medium text-purple-400 transition-colors hover:text-purple-300"
                    >
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
              </div>

              <Button
                type="submit"
                disabled={!formData.agreeToTerms}
                className="h-16 w-full bg-gradient-to-r from-purple-600 to-pink-600 text-xl font-bold text-white shadow-2xl transition-all hover:from-purple-700 hover:to-pink-700 hover:shadow-3xl disabled:opacity-50"
              >
                🚀 Start Free Trial Now
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
              
              <div className="text-center text-sm text-gray-400">
                Join 2,847 students who started this week
              </div>
            </form>

            {/* Enhanced Benefits */}
            <div className="mt-6 rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
              <h3 className="mb-4 text-center font-bold text-white">
                ✨ What's Included in Your Free Trial:
              </h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
                  <div className="rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 p-2">
                    <Target className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-white">AI Rank Predictor</div>
                    <div className="text-xs text-gray-300">85% accuracy guaranteed</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
                  <div className="rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 p-2">
                    <BarChart3 className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-white">3-Stage Mock Analysis</div>
                    <div className="text-xs text-gray-300">DECODE-TRACK-REFLECT</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
                  <div className="rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 p-2">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-white">Community Access</div>
                    <div className="text-xs text-gray-300">10,000+ active students</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
                  <div className="rounded-lg bg-gradient-to-r from-orange-500 to-red-500 p-2">
                    <Brain className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-white">Smart Study Planner</div>
                    <div className="text-xs text-gray-300">Personalized AI paths</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="my-8 flex items-center">
              <div className="flex-grow border-t border-white/20"></div>
              <span className="px-4 text-sm text-gray-400">or continue with</span>
              <div className="flex-grow border-t border-white/20"></div>
            </div>

            {/* Social Signup */}
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

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-300">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="font-semibold text-purple-400 transition-colors hover:text-purple-300"
                >
                  Sign in here →
                </Link>
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="mt-6 rounded-xl border border-white/20 bg-white/5 p-4 backdrop-blur-sm">
              <div className="mb-2 text-center text-sm font-medium text-white">
                Trusted by 10,000+ Students
              </div>
              <div className="flex items-center justify-center gap-6 text-xs text-gray-300">
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>4.9/5 Rating</span>
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-green-400" />
                  <span>Bank-grade Security</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="h-3 w-3 text-purple-400" />
                  <span>GDPR Compliant</span>
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

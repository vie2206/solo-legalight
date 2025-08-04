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
} from 'lucide-react';

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
    // Handle signup logic here
    console.log('Signup attempt:', formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black/10"></div>

      <div className="relative w-full max-w-md">
        {/* Back Link */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-white/70 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <Card className="border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mb-4">
              <h1 className="mb-2 text-3xl font-bold text-white">
                Start Your Journey
              </h1>
              <p className="text-gray-300">
                Join thousands of students transforming their CLAT preparation
              </p>
            </div>

            {/* SOLO Logo */}
            <div className="mb-6 flex items-center justify-center gap-2">
              <div className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  SOLO
                </span>
              </div>
              <div className="font-serif text-sm text-gray-400 italic">
                by Legalight
              </div>
            </div>

            {/* Free Trial Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/20 px-4 py-2 text-sm font-medium text-green-300">
              <Sparkles className="h-4 w-4" />
              30-Day Free Trial • No Credit Card Required
            </div>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">
                Full Name
              </Label>
              <div className="relative">
                <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="border-white/20 bg-white/5 pl-10 text-white placeholder:text-gray-400 focus:border-purple-400"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="border-white/20 bg-white/5 pl-10 text-white placeholder:text-gray-400 focus:border-purple-400"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="border-white/20 bg-white/5 pr-10 pl-10 text-white placeholder:text-gray-400 focus:border-purple-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-400">
                Password must be at least 8 characters long
              </p>
            </div>

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
                className="mt-1"
              />
              <Label
                htmlFor="terms"
                className="text-sm leading-relaxed text-gray-300"
              >
                I agree to the{' '}
                <Link
                  href="/privacy"
                  className="text-purple-400 hover:text-purple-300"
                >
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link
                  href="/privacy"
                  className="text-purple-400 hover:text-purple-300"
                >
                  Privacy Policy
                </Link>
              </Label>
            </div>

            <Button
              type="submit"
              disabled={!formData.agreeToTerms}
              className="h-12 w-full bg-gradient-to-r from-purple-600 to-pink-600 font-semibold text-white hover:from-purple-700 hover:to-pink-700 disabled:opacity-50"
            >
              Start 30-Day Free Trial
            </Button>
          </form>

          {/* Benefits */}
          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="mb-3 text-center font-semibold text-white">
              What you'll get:
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-green-400"></div>
                AI-powered performance analytics
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-green-400"></div>
                Personalized study recommendations
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-green-400"></div>
                85% accurate rank predictions
              </li>
              <li className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-green-400"></div>
                Community of 10,000+ students
              </li>
            </ul>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-white/20"></div>
            <span className="px-4 text-sm text-gray-400">or</span>
            <div className="flex-grow border-t border-white/20"></div>
          </div>

          {/* Social Signup */}
          <Button
            variant="outline"
            className="w-full border-white/20 bg-white/5 text-white hover:bg-white/10"
          >
            Continue with Google
          </Button>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-300">
              Already have an account?{' '}
              <Link
                href="/login"
                className="font-semibold text-purple-400 hover:text-purple-300"
              >
                Sign in
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react';

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
                Welcome Back
              </h1>
              <p className="text-gray-300">Sign in to your SOLO account</p>
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
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 text-gray-300">
                <input
                  type="checkbox"
                  className="rounded border-gray-600 bg-white/5"
                />
                <span>Remember me</span>
              </label>
              <Link href="#" className="text-purple-400 hover:text-purple-300">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="h-12 w-full bg-gradient-to-r from-purple-600 to-pink-600 font-semibold text-white hover:from-purple-700 hover:to-pink-700"
            >
              Sign In
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-white/20"></div>
            <span className="px-4 text-sm text-gray-400">or</span>
            <div className="flex-grow border-t border-white/20"></div>
          </div>

          {/* Social Login */}
          <Button
            variant="outline"
            className="w-full border-white/20 bg-white/5 text-white hover:bg-white/10"
          >
            Continue with Google
          </Button>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-300">
              Don't have an account?{' '}
              <Link
                href="/signup"
                className="font-semibold text-purple-400 hover:text-purple-300"
              >
                Start your free trial
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Phone, Shield, Timer, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const [step, setStep] = useState('phone'); // 'phone' | 'otp'
  const [otpSent, setOtpSent] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);
  const [formData, setFormData] = useState({
    phone: '',
    otp: '',
  });

  // Send OTP via SMS for login
  const sendLoginOTP = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/auth/send-login-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: formData.phone,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setOtpSent(true);
        setStep('otp');
        // Start 60 second countdown
        setOtpCountdown(60);
        const interval = setInterval(() => {
          setOtpCountdown(prev => {
            if (prev <= 1) {
              clearInterval(interval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        alert('Failed to send OTP: ' + data.error);
      }
    } catch (error) {
      console.error('OTP send error:', error);
      alert('Failed to send OTP. Please try again.');
    }
  };

  // Verify OTP and login
  const verifyLoginOTP = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/auth/verify-login-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: formData.phone,
          otp: formData.otp,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful login - redirect to webapp
        alert('🎉 Welcome back! Redirecting to your dashboard...');
        window.location.href = 'http://localhost:3001/auth?phone=' + encodeURIComponent(formData.phone) + '&token=' + data.token;
      } else {
        alert('Login failed: ' + data.error);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 'phone') {
      await sendLoginOTP();
    } else if (step === 'otp') {
      await verifyLoginOTP();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-pink-900/10 opacity-50"></div>
      
      <div className="relative w-full max-w-md">
        {/* Back Link */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <Card className="bg-white/5 backdrop-blur-sm border border-white/10 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
              <p className="text-gray-300">
                Continue your CLAT preparation journey
              </p>
            </div>
            
            {/* SOLO Logo */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  SOLO
                </span>
              </div>
              <div className="text-sm text-gray-400 font-serif italic">
                by Legalight
              </div>
            </div>

            {/* Login Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/20 px-4 py-2 text-sm font-medium text-blue-300 border border-blue-500/30 mb-6">
              <Sparkles className="h-4 w-4" />
              Secure SMS Login
            </div>
          </div>

          {/* SMS OTP Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 'phone' && (
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-white">Mobile Number</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-400 text-sm">+91</span>
                  </div>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="pl-20 bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400"
                    pattern="[0-9]{10}"
                    maxLength={10}
                    required
                  />
                </div>
                <p className="text-xs text-gray-400">
                  We'll send a verification code via SMS
                </p>
              </div>
            )}

            {step === 'otp' && (
              <div className="space-y-4">
                <div className="text-center p-4 rounded-xl bg-green-500/10 border border-green-500/30">
                  <Shield className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <p className="text-green-200 font-medium">
                    OTP sent to +91-{formData.phone}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Check your SMS for the 6-digit code
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="otp" className="text-white">Enter OTP</Label>
                  <Input
                    id="otp"
                    name="otp"
                    type="text"
                    placeholder="6-digit code"
                    value={formData.otp}
                    onChange={handleInputChange}
                    className="text-center text-2xl tracking-wider bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400"
                    maxLength="6"
                    pattern="[0-9]{6}"
                    required
                  />
                </div>

                {otpCountdown > 0 && (
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                    <Timer className="h-4 w-4" />
                    Resend OTP in {otpCountdown}s
                  </div>
                )}

                {otpCountdown === 0 && (
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={sendLoginOTP}
                      className="text-purple-400 hover:text-purple-300 text-sm font-medium underline"
                    >
                      Resend OTP
                    </button>
                  </div>
                )}

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => setStep('phone')}
                    className="text-gray-400 hover:text-white text-sm underline"
                  >
                    Change phone number
                  </button>
                </div>
              </div>
            )}

            <Button 
              type="submit" 
              disabled={(step === 'phone' && !formData.phone) || (step === 'otp' && !formData.otp)}
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold disabled:opacity-50 transition-all duration-200"
            >
              {step === 'phone' ? (
                <span className="flex items-center gap-2">
                  📱 Send Login OTP
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  🔐 Verify & Login
                </span>
              )}
            </Button>
          </form>

          {/* Quick Info */}
          <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/10">
            <h3 className="text-white font-semibold mb-3 text-center">🚀 Resume Learning Instantly</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                Continue from where you left
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                Access your study progress
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                Review your mock test scores
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                Check AI recommendations
              </li>
            </ul>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-4 py-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
              <Shield className="h-4 w-4 text-green-400" />
              <span className="text-xs font-medium text-green-400">SMS Verified</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
              <Phone className="h-4 w-4 text-blue-400" />
              <span className="text-xs font-medium text-blue-400">Secure Login</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-gray-300">
              Don't have an account?{' '}
              <Link href="/signup" className="text-purple-400 hover:text-purple-300 font-semibold">
                Start your free trial
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
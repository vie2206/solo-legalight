'use client';

import { ArrowRight, Sparkles, Clock, Shield, Trophy, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-pink-900/10 opacity-50"></div>
      
      {/* Floating Gradient Orbs */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-20 right-20 w-24 h-24 bg-pink-500/20 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-2000"></div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-medium backdrop-blur-sm border border-white/20">
            <Sparkles className="h-4 w-4 text-yellow-400" />
            Limited Time: First 10,000 Students
          </div>

          {/* Main Heading */}
          <h2 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl mb-8">
            <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Transform Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
              CLAT Journey Today
            </span>
          </h2>

          {/* Description */}
          <p className="text-xl text-gray-300 sm:text-2xl max-w-3xl mx-auto leading-relaxed mb-12">
            Join thousands of students who've already discovered the power of AI-driven CLAT preparation. 
            Start your journey with SOLO and see results from day one.
          </p>

          {/* Benefits List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm">
              <Clock className="h-6 w-6 text-green-400 flex-shrink-0" />
              <span className="text-white font-medium">30-Day Free Trial</span>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm">
              <Shield className="h-6 w-6 text-blue-400 flex-shrink-0" />
              <span className="text-white font-medium">No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 backdrop-blur-sm">
              <Trophy className="h-6 w-6 text-yellow-400 flex-shrink-0" />
              <span className="text-white font-medium">Cancel Anytime</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center mb-16">
            <Button asChild size="lg" className="h-16 bg-gradient-to-r from-purple-600 to-pink-600 px-12 text-xl font-semibold hover:from-purple-700 hover:to-pink-700 rounded-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300">
              <Link href="/signup">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-6 w-6" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-16 border-white/30 bg-white/5 px-12 text-xl font-semibold text-white hover:bg-white/10 rounded-xl backdrop-blur-sm">
              <Link href="#pricing">
                View Pricing Plans
              </Link>
            </Button>
          </div>

          {/* Urgency Message */}
          <div className="bg-white/10 rounded-2xl p-8 mb-12 backdrop-blur-sm border border-white/20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Star className="h-6 w-6 text-yellow-400" />
              <h3 className="text-2xl font-bold">Limited Time Offer</h3>
              <Star className="h-6 w-6 text-yellow-400" />
            </div>
            <p className="text-lg text-gray-200 mb-4">
              Be among the first 10,000 students to experience SOLO and get:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Lifetime price lock guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Exclusive beta access to new features</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Founder's badge in your profile</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Priority customer support</span>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="text-center mb-12">
            <p className="text-lg text-gray-300 mb-6">
              Trusted by students from 500+ cities across India
            </p>
            <div className="flex items-center justify-center gap-8 flex-wrap">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-300">7,234</div>
                <div className="text-sm text-gray-400">Students Enrolled</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-300">+27</div>
                <div className="text-sm text-gray-400">Avg Score Improvement</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-300">89%</div>
                <div className="text-sm text-gray-400">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-300">4.9/5</div>
                <div className="text-sm text-gray-400">Student Rating</div>
              </div>
            </div>
          </div>

          {/* Final Call to Action */}
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4">
              Your CLAT Success Story Starts Here
            </h3>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Don't let another day pass without taking action. Join SOLO today and give yourself the competitive edge you deserve.
            </p>
            
            {/* Risk-Free Guarantee */}
            <div className="inline-flex items-center gap-2 p-4 rounded-xl bg-green-500/20 border border-green-500/30 mb-8">
              <Shield className="h-5 w-5 text-green-400" />
              <span className="text-green-200 font-medium">
                100% Risk-Free • Full Money-Back Guarantee • Cancel Anytime
              </span>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-400">
                Questions? Contact us at{' '}
                <a href="mailto:hello@legalight.in" className="text-purple-300 hover:text-purple-200 underline">
                  hello@legalight.in
                </a>
                {' '}or call{' '}
                <a href="tel:+918888888888" className="text-purple-300 hover:text-purple-200 underline">
                  +91 88888 88888
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
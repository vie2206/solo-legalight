'use client';

import {
  ArrowRight,
  Sparkles,
  Clock,
  Shield,
  Trophy,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-24 text-white">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-black/10"></div>

      {/* Floating Gradient Orbs */}
      <div className="absolute top-10 left-10 h-32 w-32 animate-pulse rounded-full bg-purple-500/20 blur-3xl"></div>
      <div className="absolute top-20 right-20 h-24 w-24 animate-pulse rounded-full bg-pink-500/20 blur-2xl delay-1000"></div>
      <div className="absolute bottom-20 left-1/3 h-20 w-20 animate-pulse rounded-full bg-blue-500/20 blur-xl delay-2000"></div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-medium backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-yellow-400" />
            Limited Time: First 10,000 Students
          </div>

          {/* Main Heading */}
          <h2 className="mb-8 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Transform Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
              CLAT Journey Today
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-gray-300 sm:text-2xl">
            Join thousands of students who've already discovered the power of
            AI-driven CLAT preparation. Start your journey with SOLO and see
            results from day one.
          </p>

          {/* Benefits List */}
          <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="flex items-center gap-3 rounded-xl bg-white/5 p-4 backdrop-blur-sm">
              <Clock className="h-6 w-6 flex-shrink-0 text-green-400" />
              <span className="font-medium text-white">30-Day Free Trial</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-white/5 p-4 backdrop-blur-sm">
              <Shield className="h-6 w-6 flex-shrink-0 text-blue-400" />
              <span className="font-medium text-white">
                No Credit Card Required
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-white/5 p-4 backdrop-blur-sm">
              <Trophy className="h-6 w-6 flex-shrink-0 text-yellow-400" />
              <span className="font-medium text-white">Cancel Anytime</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mb-16 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              className="h-16 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-12 text-xl font-semibold shadow-2xl transition-all duration-300 hover:from-purple-700 hover:to-pink-700 hover:shadow-purple-500/25"
            >
              <Link href="/signup">
                Start Your Free Trial
                <ArrowRight className="ml-2 h-6 w-6" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-16 rounded-xl border-white/30 bg-white/5 px-12 text-xl font-semibold text-white backdrop-blur-sm hover:bg-white/10"
            >
              <Link href="#pricing">View Pricing Plans</Link>
            </Button>
          </div>

          {/* Urgency Message */}
          <div className="mb-12 rounded-2xl border border-white/20 bg-white/10 p-8 backdrop-blur-sm">
            <div className="mb-4 flex items-center justify-center gap-3">
              <Star className="h-6 w-6 text-yellow-400" />
              <h3 className="text-2xl font-bold">Limited Time Offer</h3>
              <Star className="h-6 w-6 text-yellow-400" />
            </div>
            <p className="mb-4 text-lg text-gray-200">
              Be among the first 10,000 students to experience SOLO and get:
            </p>
            <div className="grid grid-cols-1 gap-4 text-left md:grid-cols-2">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-400"></div>
                <span>Lifetime price lock guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-400"></div>
                <span>Exclusive beta access to new features</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-400"></div>
                <span>Founder's badge in your profile</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-400"></div>
                <span>Priority customer support</span>
              </div>
            </div>
          </div>

          {/* Social Proof */}
          <div className="mb-12 text-center">
            <p className="mb-6 text-lg text-gray-300">
              Trusted by students from 500+ cities across India
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-300">7,234</div>
                <div className="text-sm text-gray-400">Students Enrolled</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-300">+27</div>
                <div className="text-sm text-gray-400">
                  Avg Score Improvement
                </div>
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
            <h3 className="mb-4 text-3xl font-bold">
              Your CLAT Success Story Starts Here
            </h3>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-300">
              Don't let another day pass without taking action. Join SOLO today
              and give yourself the competitive edge you deserve.
            </p>

            {/* Risk-Free Guarantee */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/20 p-4">
              <Shield className="h-5 w-5 text-green-400" />
              <span className="font-medium text-green-200">
                100% Risk-Free • Full Money-Back Guarantee • Cancel Anytime
              </span>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-400">
                Questions? Contact us at{' '}
                <a
                  href="mailto:hello@legalight.in"
                  className="text-purple-300 underline hover:text-purple-200"
                >
                  hello@legalight.in
                </a>{' '}
                or call{' '}
                <a
                  href="tel:+918888888888"
                  className="text-purple-300 underline hover:text-purple-200"
                >
                  +91 88888 88888
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

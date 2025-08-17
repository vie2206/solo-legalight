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
      {/* Premium Holographic Background */}
      <div 
        className="absolute inset-0 opacity-25 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/ui8-assets/gradients/Gradient_25.webp')",
          backgroundBlendMode: 'overlay'
        }}
      ></div>
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Premium Chromatic Halos */}
      <div 
        className="absolute top-20 left-20 w-80 h-80 opacity-15 animate-pulse"
        style={{
          backgroundImage: "url('/ui8-assets/halos/ring-00001.webp')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      ></div>
      <div 
        className="absolute bottom-10 right-10 w-60 h-60 opacity-10 animate-pulse delay-3000"
        style={{
          backgroundImage: "url('/ui8-assets/halos/ring-00020.webp')",
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}
      ></div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-red-400/50 bg-red-500/20 px-6 py-3 text-sm font-medium backdrop-blur-sm animate-pulse">
            <Sparkles className="h-4 w-4 text-red-400" />
            ⚠️ URGENT: Only 2,847 Spots Left Before Price Increases 50%
          </div>

          {/* Main Heading */}
          <h2 className="mb-8 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              🚨 STOP Wasting Your
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
              Parents' ₹1.5 LAKH
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-gray-300 sm:text-2xl">
            <span className="text-red-400 font-bold">While your competition burns their parents' money on 12% success rate coaching,</span> 
            you can <span className="text-green-400 font-bold">guarantee your NLU admission for ₹13.7/day</span> and 
            <span className="text-yellow-400 font-bold">save ₹145K+ for your future goals.</span>
          </p>

          {/* Benefits List */}
          <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="flex items-center gap-3 rounded-xl bg-white/5 p-4 backdrop-blur-sm">
              <Clock className="h-6 w-6 flex-shrink-0 text-green-400" />
              <span className="font-medium text-white">Risk-Free Trial + NLU Guarantee</span>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-white/5 p-4 backdrop-blur-sm">
              <Shield className="h-6 w-6 flex-shrink-0 text-blue-400" />
              <span className="font-medium text-white">
                ₹0 Today, Results in 7 Days
              </span>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-white/5 p-4 backdrop-blur-sm">
              <Trophy className="h-6 w-6 flex-shrink-0 text-yellow-400" />
              <span className="font-medium text-white">87% Success Rate Guaranteed</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mb-16 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              className="h-16 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 px-12 text-xl font-semibold shadow-2xl transition-all duration-300 hover:from-red-700 hover:to-orange-700 hover:shadow-red-500/25 animate-pulse"
            >
              <Link href="/signup">
                🚑 SAVE MY PARENTS' MONEY + GUARANTEE NLU
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
              <span className="text-red-400 font-bold">⏰ LAST CHANCE:</span> Lock today's price before 
              it increases 50% after 10,000 students:
            </p>
            <div className="grid grid-cols-1 gap-4 text-left md:grid-cols-2">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-400"></div>
                <span>Save ₹145K vs coaching + get NLU guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-400"></div>
                <span>Parents will thank you for this smart decision</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-400"></div>
                <span>87% success rate vs 12% coaching rate</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-400"></div>
                <span>Lifetime price protection (no future increases)</span>
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
              🚨 Your Parents Are About to Make a Costly Mistake
            </h3>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-red-300 font-semibold">
              Every day you delay, your competition gets ahead. Every day your parents 
              research coaching institutes, they're closer to wasting ₹1.5L. 
              <span className="text-green-400">STOP this mistake TODAY.</span>
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

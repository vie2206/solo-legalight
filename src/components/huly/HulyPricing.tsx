import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  X,
  Star,
  Zap,
  Crown,
  ArrowRight,
  Info,
  TrendingUp,
  Shield,
  Award
} from 'lucide-react';
import { GlassCard, colors } from './HulyDesignSystem';

// Pricing card component
const PricingCard: React.FC<{
  tier: string;
  price: number;
  period: string;
  description: string;
  features: { text: string; included: boolean }[];
  gradient: string;
  popular?: boolean;
  icon: React.ReactNode;
  delay?: number;
}> = ({ tier, price, period, description, features, gradient, popular, icon, delay = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Popular badge */}
      {popular && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: delay + 0.3, type: "spring" }}
          className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className="px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
            <span className="text-xs font-bold text-white">MOST POPULAR</span>
          </div>
        </motion.div>
      )}

      <GlassCard 
        intensity={popular ? "heavy" : "medium"} 
        blur="lg" 
        gradient={popular}
        className={`h-full p-6 ${popular ? 'ring-2 ring-purple-500/50' : ''}`}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <motion.div
            className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
            style={{ background: gradient }}
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.5 }}
          >
            {React.cloneElement(icon as React.ReactElement<any>, { size: 28, className: "text-white" })}
          </motion.div>
          
          <h3 className="text-2xl font-bold text-white mb-2">{tier}</h3>
          <p className="text-gray-400 text-sm mb-4">{description}</p>
          
          {/* Price */}
          <div className="mb-6">
            <span className="text-4xl font-bold text-white">₹{price.toLocaleString()}</span>
            <span className="text-gray-400 text-sm">/{period}</span>
          </div>

          {/* CTA Button */}
          <motion.button
            className={`w-full py-3 px-6 rounded-full font-medium transition-all ${
              popular 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {popular ? 'Start Free Trial' : 'Get Started'}
          </motion.button>
        </div>

        {/* Features */}
        <div className="space-y-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: delay + index * 0.05 }}
              className="flex items-start space-x-3"
            >
              {feature.included ? (
                <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
              )}
              <span className={`text-sm ${feature.included ? 'text-gray-300' : 'text-gray-600'}`}>
                {feature.text}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Hover gradient effect */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 -z-10 rounded-2xl"
              style={{
                background: `${gradient}15`,
                filter: 'blur(30px)'
              }}
            />
          )}
        </AnimatePresence>
      </GlassCard>
    </motion.div>
  );
};

// Main pricing section
const HulyPricing: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const plans = [
    {
      tier: "Basic",
      price: billingCycle === 'monthly' ? 999 : 9999,
      period: billingCycle === 'monthly' ? 'month' : 'year',
      description: "Perfect for getting started",
      icon: <Zap />,
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      features: [
        { text: "AI-powered study recommendations", included: true },
        { text: "Basic mock tests (10/month)", included: true },
        { text: "Performance analytics", included: true },
        { text: "Email support", included: true },
        { text: "Advanced AI features", included: false },
        { text: "1-on-1 mentoring", included: false },
        { text: "Priority support", included: false }
      ]
    },
    {
      tier: "Pro",
      price: billingCycle === 'monthly' ? 2499 : 24999,
      period: billingCycle === 'monthly' ? 'month' : 'year',
      description: "Most popular for serious aspirants",
      icon: <Crown />,
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      popular: true,
      features: [
        { text: "Everything in Basic", included: true },
        { text: "Unlimited mock tests", included: true },
        { text: "Advanced AI tutor", included: true },
        { text: "Video solutions", included: true },
        { text: "Group study sessions", included: true },
        { text: "Priority email & chat support", included: true },
        { text: "1-on-1 mentoring (2 sessions)", included: false }
      ]
    },
    {
      tier: "Ultra",
      price: billingCycle === 'monthly' ? 4999 : 49999,
      period: billingCycle === 'monthly' ? 'month' : 'year',
      description: "Complete preparation solution",
      icon: <Award />,
      gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
      features: [
        { text: "Everything in Pro", included: true },
        { text: "Unlimited 1-on-1 mentoring", included: true },
        { text: "Personal study coordinator", included: true },
        { text: "Custom study plans", included: true },
        { text: "Interview preparation", included: true },
        { text: "24/7 priority support", included: true },
        { text: "Success guarantee*", included: true }
      ]
    }
  ];

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-purple-900/10 to-pink-900/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-flex items-center space-x-2 mb-4"
          >
            <GlassCard intensity="light" blur="sm" className="px-4 py-2">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-xs text-gray-300">Save 20% on yearly plans</span>
              </div>
            </GlassCard>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose your path to
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"> success</span>
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            Flexible pricing plans designed for every stage of your journey
          </p>

          {/* Billing toggle */}
          <div className="flex justify-center">
            <GlassCard intensity="light" blur="md" className="inline-flex p-1">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                  billingCycle === 'yearly'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Yearly
              </button>
            </GlassCard>
          </div>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.tier}
              {...plan}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <GlassCard intensity="light" blur="sm" className="px-4 py-2">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-xs text-gray-300">Secure Payments</span>
              </div>
            </GlassCard>
            <GlassCard intensity="light" blur="sm" className="px-4 py-2">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-xs text-gray-300">4.9/5 Rating</span>
              </div>
            </GlassCard>
            <GlassCard intensity="light" blur="sm" className="px-4 py-2">
              <div className="flex items-center space-x-2">
                <Info className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-gray-300">Cancel Anytime</span>
              </div>
            </GlassCard>
          </div>

          <p className="text-sm text-gray-500">
            * Success guarantee applies to Ultra plan with minimum 6-month commitment. Terms apply.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HulyPricing;
import React, { useState, useEffect } from 'react';
import { Check, X, Star, TrendingUp, Zap } from 'lucide-react';
import { SubscriptionTier } from '../types/subscription';
import { subscriptionService, SubscriptionPlan } from '../services/subscriptionService';

interface SubscriptionPlansProps {
  currentTier?: SubscriptionTier;
  onSelectPlan?: (tier: SubscriptionTier, billingCycle: 'monthly' | 'quarterly') => void;
}

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({ 
  currentTier = 'free', 
  onSelectPlan 
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly'>('monthly');
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const fetchedPlans = await subscriptionService.getSubscriptionPlans();
        setPlans(fetchedPlans);
      } catch (error) {
        console.error('Failed to fetch subscription plans:', error);
        setError('Failed to load subscription plans');
        // Fallback to static plans if API fails
        setPlans([
          {
            id: '1',
            tier: 'free',
            name: 'CLAT FREE',
            tagline: 'Start Your Journey',
            monthly_price: 0,
            quarterly_price: 0,
            daily_cost: '₹0/day',
            comparison: 'Free forever',
            features: ['1 mock test per month', 'Basic analysis', 'View leaderboards', 'Study streak tracking'],
            is_popular: false,
            is_active: true
          },
          {
            id: '2',
            tier: 'mini',
            name: 'CLAT MINI',
            tagline: 'Start Your Journey',
            monthly_price: 299,
            quarterly_price: 799,
            daily_cost: '₹10/day',
            comparison: 'Less than a samosa',
            features: ['4 Physical Mock Tests delivered monthly', 'Mock Test Analysis (DECODE)', 'CLAT Rank Prediction', 'Study Plans & Basic Sectional Tests', 'Daily Challenges', 'Basic Performance Analytics', 'Daily check-in rewards'],
            is_popular: false,
            is_active: true
          },
          {
            id: '3',
            tier: 'pro',
            name: 'CLAT PRO',
            tagline: 'Smart Work Begins Here',
            monthly_price: 499,
            quarterly_price: 1299,
            daily_cost: '₹17/day',
            comparison: 'Less than a coffee',
            features: ['Everything in MINI, plus:', 'Advanced AI Mock Analysis (DECODE-TRACK-REFLECT)', 'Advanced CLAT Rank Predictor with trends', 'Weekly Insights Reports (Spotify-style)', 'Complete Sectional Tests', 'Daily Reading Practice + Dictionary', 'Academic Vocabulary Quizzes', 'Advanced Study Reminders', 'Progress tracking dashboard'],
            is_popular: true,
            is_active: true
          },
          {
            id: '4',
            tier: 'ultra',
            name: 'CLAT ULTRA',
            tagline: 'Where Toppers Are Made',
            monthly_price: 799,
            quarterly_price: 1999,
            daily_cost: '₹27/day',
            comparison: 'Your investment in success',
            features: ['Everything in PRO, plus:', 'AI Smart Notifications (Active Recall)', 'Personalized AI Coaching (Full ADAPT cycle)', 'Parents Dashboard', 'Social Features & Study Groups', 'Premium GK Question Bank', 'Monthly 1-on-1 Counseling', 'Mood & Psychological Tracking', 'Priority Support', 'Exclusive study group access'],
            is_popular: false,
            is_active: true
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const calculateSavings = (plan: SubscriptionPlan) => {
    if (plan.tier === 'free') return 0;
    
    const monthlyCost = plan.monthly_price * 3;
    const quarterlyCost = plan.quarterly_price;
    return Math.round(((monthlyCost - quarterlyCost) / monthlyCost) * 100);
  };

  const getPlanIcon = (tier: SubscriptionTier) => {
    switch (tier) {
      case 'free': return <TrendingUp className="w-6 h-6" />;
      case 'mini': return <Zap className="w-6 h-6" />;
      case 'pro': return <Star className="w-6 h-6" />;
      case 'ultra': return <Star className="w-6 h-6 fill-current" />;
    }
  };

  const getPlanColor = (tier: SubscriptionTier) => {
    switch (tier) {
      case 'free': return 'border-gray-300 bg-gray-50';
      case 'mini': return 'border-blue-300 bg-blue-50';
      case 'pro': return 'border-purple-400 bg-purple-50 ring-2 ring-purple-400';
      case 'ultra': return 'border-orange-400 bg-gradient-to-br from-orange-50 to-amber-50';
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading subscription plans...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <div className="text-red-600 mb-4">⚠️ {error}</div>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">LEVEL UP Your CLAT Preparation</h2>
        <p className="text-xl text-gray-600 mb-8">we can do hard things.</p>
        
        {/* Billing Toggle */}
        <div className="inline-flex items-center p-1 bg-gray-100 rounded-lg">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2 rounded-md font-medium transition-all ${
              billingCycle === 'monthly'
                ? 'bg-white shadow-sm text-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('quarterly')}
            className={`px-6 py-2 rounded-md font-medium transition-all ${
              billingCycle === 'quarterly'
                ? 'bg-white shadow-sm text-gray-900'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Quarterly
            <span className="ml-2 text-xs text-green-600 font-semibold">Save up to 17%</span>
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => {
          const isCurrentPlan = plan.tier === currentTier;
          const savings = calculateSavings(plan);
          const price = billingCycle === 'monthly' ? plan.monthly_price : plan.quarterly_price;
          const monthlyEquivalent = billingCycle === 'quarterly' 
            ? Math.round(plan.quarterly_price / 3) 
            : plan.monthly_price;

          return (
            <div
              key={plan.tier}
              className={`relative rounded-2xl p-6 transition-all hover:shadow-xl ${
                getPlanColor(plan.tier)
              } ${plan.is_popular ? 'transform scale-105' : ''}`}
            >
              {/* Popular Badge */}
              {plan.is_popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    MOST POPULAR
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className={`p-2 rounded-lg ${
                    plan.tier === 'ultra' ? 'bg-orange-200' : 'bg-white'
                  }`}>
                    {getPlanIcon(plan.tier)}
                  </div>
                  {isCurrentPlan && (
                    <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      Current Plan
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                <p className="text-sm text-gray-600">{plan.tagline}</p>
              </div>

              {/* Pricing */}
              <div className="mb-6">
                {plan.tier === 'free' ? (
                  <div>
                    <span className="text-4xl font-bold">₹0</span>
                    <span className="text-gray-600">/forever</span>
                  </div>
                ) : (
                  <div>
                    <span className="text-4xl font-bold">₹{price}</span>
                    <span className="text-gray-600">
                      /{billingCycle === 'monthly' ? 'month' : '3 months'}
                    </span>
                    {billingCycle === 'quarterly' && (
                      <div className="text-sm text-green-600 font-medium mt-1">
                        ₹{monthlyEquivalent}/month • Save {savings}%
                      </div>
                    )}
                    <div className="text-sm text-gray-500 mt-2">
                      {plan.daily_cost} • {plan.comparison}
                    </div>
                  </div>
                )}
              </div>

              {/* Features */}
              <div className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
                {plan.limitations?.map((limitation, index) => (
                  <div key={index} className="flex items-start opacity-60">
                    <X className="w-5 h-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">{limitation}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                onClick={() => onSelectPlan?.(plan.tier, billingCycle)}
                disabled={isCurrentPlan && plan.tier !== 'free'}
                className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
                  isCurrentPlan && plan.tier !== 'free'
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : plan.tier === 'pro'
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : plan.tier === 'ultra'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600'
                    : 'bg-gray-800 text-white hover:bg-gray-900'
                }`}
              >
                {isCurrentPlan 
                  ? 'Current Plan' 
                  : plan.tier === 'free' 
                  ? 'Start Free' 
                  : `Upgrade to ${plan.name}`}
              </button>
            </div>
          );
        })}
      </div>

      {/* Additional Info */}
      <div className="mt-12 text-center space-y-4">
        <p className="text-gray-600">
          <span className="font-semibold">30-day FREE trial</span> with full PRO access • 
          <span className="font-semibold"> Cancel anytime</span> • 
          <span className="font-semibold"> No hidden fees</span>
        </p>
        <div className="flex justify-center items-center space-x-6 text-sm text-gray-500">
          <span>✓ EMI Options Available</span>
          <span>✓ Family Plans (20% off)</span>
          <span>✓ Referral Rewards</span>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
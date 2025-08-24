// SUBSCRIPTION PLANS COMPONENT
// SOLO LegalLight CLAT Platform - Payment Integration
// Purpose: Display subscription plans and handle payment processing

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCrown, 
  FaRocket, 
  FaStar, 
  FaCheck, 
  FaSpinner,
  FaBolt,
  FaGraduationCap
} from 'react-icons/fa';
import useRazorpay from '../../hooks/useRazorpay';
import { toast } from 'react-toastify';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  duration: number;
  features: string[];
}

interface SubscriptionPlansProps {
  currentPlan?: string | null;
  onSuccess?: () => void;
}

const SubscriptionPlans: React.FC<SubscriptionPlansProps> = ({ 
  currentPlan, 
  onSuccess 
}) => {
  const [plans, setPlans] = useState<Record<string, SubscriptionPlan>>({});
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [subscriptionStatus, setSubscriptionStatus] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { 
    processPayment, 
    getSubscriptionPlans, 
    getSubscriptionStatus,
    loading: paymentLoading 
  } = useRazorpay();

  // Load subscription plans on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Load both plans and current status
        const [plansData, statusData] = await Promise.all([
          getSubscriptionPlans(),
          getSubscriptionStatus()
        ]);

        if (plansData) {
          setPlans(plansData);
        }

        if (statusData) {
          setSubscriptionStatus(statusData);
        }

      } catch (error) {
        console.error('Error loading subscription data:', error);
        toast.error('Failed to load subscription information');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [getSubscriptionPlans, getSubscriptionStatus]);

  // Handle plan selection and payment
  const handleSelectPlan = async (planId: string) => {
    if (paymentLoading) return;
    
    try {
      setSelectedPlan(planId);

      // Get user details from localStorage or context
      const userDetails = {
        name: localStorage.getItem('userName') || '',
        email: localStorage.getItem('userEmail') || '',
        phone: localStorage.getItem('userPhone') || ''
      };

      // Process payment
      await processPayment(planId, userDetails);
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }

    } catch (error) {
      console.error('Payment processing error:', error);
    } finally {
      setSelectedPlan('');
    }
  };

  // Get plan icon based on plan type
  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case 'clat_basic_monthly':
        return <FaGraduationCap className="text-2xl text-blue-500" />;
      case 'clat_premium_monthly':
        return <FaRocket className="text-2xl text-purple-500" />;
      case 'clat_elite_monthly':
        return <FaCrown className="text-2xl text-yellow-500" />;
      case 'clat_annual_plan':
        return <FaStar className="text-2xl text-green-500" />;
      default:
        return <FaBolt className="text-2xl text-gray-500" />;
    }
  };

  // Get plan color scheme
  const getPlanColors = (planId: string) => {
    switch (planId) {
      case 'clat_basic_monthly':
        return {
          gradient: 'from-blue-500 to-blue-600',
          border: 'border-blue-500',
          button: 'bg-blue-500 hover:bg-blue-600',
          badge: 'bg-blue-100 text-blue-800'
        };
      case 'clat_premium_monthly':
        return {
          gradient: 'from-purple-500 to-purple-600',
          border: 'border-purple-500',
          button: 'bg-purple-500 hover:bg-purple-600',
          badge: 'bg-purple-100 text-purple-800'
        };
      case 'clat_elite_monthly':
        return {
          gradient: 'from-yellow-500 to-yellow-600',
          border: 'border-yellow-500',
          button: 'bg-yellow-500 hover:bg-yellow-600 text-black',
          badge: 'bg-yellow-100 text-yellow-800'
        };
      case 'clat_annual_plan':
        return {
          gradient: 'from-green-500 to-green-600',
          border: 'border-green-500',
          button: 'bg-green-500 hover:bg-green-600',
          badge: 'bg-green-100 text-green-800'
        };
      default:
        return {
          gradient: 'from-gray-500 to-gray-600',
          border: 'border-gray-500',
          button: 'bg-gray-500 hover:bg-gray-600',
          badge: 'bg-gray-100 text-gray-800'
        };
    }
  };

  // Check if plan is currently active
  const isPlanActive = (planId: string) => {
    return subscriptionStatus?.has_subscription && subscriptionStatus?.plan === planId;
  };

  // Check if plan is an upgrade
  const isPlanUpgrade = (planId: string) => {
    if (!subscriptionStatus?.has_subscription) return false;
    
    const planHierarchy = ['clat_basic_monthly', 'clat_premium_monthly', 'clat_elite_monthly', 'clat_annual_plan'];
    const currentIndex = planHierarchy.indexOf(subscriptionStatus.plan);
    const targetIndex = planHierarchy.indexOf(planId);
    
    return targetIndex > currentIndex;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <FaSpinner className="animate-spin text-3xl text-blue-500" />
        <span className="ml-3 text-lg">Loading subscription plans...</span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Choose Your CLAT Success Plan
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
          Transform your CLAT preparation with our revolutionary AI-powered platform
        </p>
        
        {/* Current subscription status */}
        {subscriptionStatus?.has_subscription && (
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 mb-6">
            <FaCheck className="mr-2" />
            Currently subscribed to {subscriptionStatus.plan_name} 
            ({subscriptionStatus.days_remaining} days remaining)
          </div>
        )}
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {Object.entries(plans).map(([planId, plan]) => {
          const colors = getPlanColors(planId);
          const isActive = isPlanActive(planId);
          const isUpgrade = isPlanUpgrade(planId);
          const isProcessing = paymentLoading && selectedPlan === planId;

          return (
            <motion.div
              key={planId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 ${
                isActive ? colors.border : 'border-gray-200 dark:border-gray-700'
              } overflow-hidden`}
            >
              {/* Popular badge for Elite plan */}
              {planId === 'clat_elite_monthly' && (
                <div className="absolute top-0 left-0 right-0">
                  <div className={`text-center py-2 text-sm font-semibold text-white bg-gradient-to-r ${colors.gradient}`}>
                    MOST POPULAR
                  </div>
                </div>
              )}

              {/* Best Value badge for Annual plan */}
              {planId === 'clat_annual_plan' && (
                <div className="absolute top-0 left-0 right-0">
                  <div className={`text-center py-2 text-sm font-semibold text-white bg-gradient-to-r ${colors.gradient}`}>
                    BEST VALUE - SAVE 25%
                  </div>
                </div>
              )}

              <div className={`p-6 ${(planId === 'clat_elite_monthly' || planId === 'clat_annual_plan') ? 'mt-8' : ''}`}>
                {/* Plan header */}
                <div className="text-center mb-6">
                  <div className="flex justify-center mb-3">
                    {getPlanIcon(planId)}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <div className="flex items-center justify-center">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      ₹{plan.price.toLocaleString()}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 ml-1">
                      /{plan.duration === 365 ? 'year' : 'month'}
                    </span>
                  </div>
                  
                  {/* Annual plan savings */}
                  {planId === 'clat_annual_plan' && (
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${colors.badge} mt-2`}>
                      Save ₹12,000 per year
                    </div>
                  )}
                </div>

                {/* Features list */}
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <FaCheck className="text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300 text-sm">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Action button */}
                <button
                  onClick={() => handleSelectPlan(planId)}
                  disabled={isActive || isProcessing}
                  className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${
                    isActive 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : colors.button
                  } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center">
                      <FaSpinner className="animate-spin mr-2" />
                      Processing...
                    </div>
                  ) : isActive ? (
                    'Current Plan'
                  ) : isUpgrade ? (
                    'Upgrade Now'
                  ) : (
                    'Get Started'
                  )}
                </button>

                {/* Money back guarantee for paid plans */}
                {planId !== 'clat_basic_monthly' && (
                  <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-3">
                    30-day money-back guarantee
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Features comparison or testimonials can go here */}
      <div className="text-center mt-12">
        <p className="text-gray-600 dark:text-gray-300">
          All plans include our revolutionary AI tutoring, Yale emotion tracking, and biometric performance optimization.
        </p>
        <div className="flex items-center justify-center mt-4 space-x-6">
          <div className="flex items-center text-green-600">
            <FaCheck className="mr-2" />
            <span>No setup fees</span>
          </div>
          <div className="flex items-center text-green-600">
            <FaCheck className="mr-2" />
            <span>Cancel anytime</span>
          </div>
          <div className="flex items-center text-green-600">
            <FaCheck className="mr-2" />
            <span>24/7 support</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
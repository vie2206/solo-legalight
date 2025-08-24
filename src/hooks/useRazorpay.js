// RAZORPAY INTEGRATION HOOK
// SOLO LegalLight CLAT Platform - Frontend Payment System
// Purpose: Handle Razorpay payment processing in React components

import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';

// Load Razorpay script dynamically
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const useRazorpay = () => {
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);

  // Get backend API base URL
  const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:3001';

  // Create payment order
  const createPaymentOrder = useCallback(async (planId, userDetails = {}) => {
    try {
      setLoading(true);
      
      const response = await fetch(`${API_BASE}/api/payments/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'x-user-id': localStorage.getItem('userId') || 'demo-user'
        },
        body: JSON.stringify({
          plan_id: planId,
          user_details: userDetails
        })
      });

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to create payment order');
      }

      return data.data;
      
    } catch (error) {
      console.error('Error creating payment order:', error);
      toast.error(`Payment order creation failed: ${error.message}`);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [API_BASE]);

  // Verify payment on backend
  const verifyPayment = useCallback(async (paymentData) => {
    try {
      const response = await fetch(`${API_BASE}/api/payments/verify-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'x-user-id': localStorage.getItem('userId') || 'demo-user'
        },
        body: JSON.stringify(paymentData)
      });

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Payment verification failed');
      }

      return data.data;
      
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  }, [API_BASE]);

  // Handle payment failure
  const handlePaymentFailure = useCallback(async (orderId, errorDescription) => {
    try {
      await fetch(`${API_BASE}/api/payments/payment-failed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'x-user-id': localStorage.getItem('userId') || 'demo-user'
        },
        body: JSON.stringify({
          razorpay_order_id: orderId,
          error_description: errorDescription
        })
      });
    } catch (error) {
      console.error('Error handling payment failure:', error);
    }
  }, [API_BASE]);

  // Main payment processing function
  const processPayment = useCallback(async (planId, userDetails = {}) => {
    try {
      setLoading(true);
      setPaymentStatus(null);

      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Failed to load Razorpay checkout script');
      }

      // Create payment order
      const orderData = await createPaymentOrder(planId, userDetails);
      
      // Configure Razorpay options
      const razorpayOptions = {
        key: orderData.razorpay_key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'LegalLight CLAT Preparation',
        description: `${orderData.plan.name} Subscription`,
        image: '/logo192.png', // Your logo
        order_id: orderData.order_id,
        
        // Success handler
        handler: async (response) => {
          try {
            console.log('Payment successful, verifying...', response);
            
            // Verify payment with backend
            const verificationResult = await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });

            if (verificationResult.payment_verified) {
              setPaymentStatus('success');
              toast.success('🎉 Payment successful! Your subscription has been activated.');
              
              // Redirect to dashboard or success page
              window.location.href = '/student-dashboard?payment=success';
            } else {
              throw new Error('Payment verification failed');
            }
            
          } catch (error) {
            console.error('Payment verification error:', error);
            setPaymentStatus('failed');
            toast.error(`Payment verification failed: ${error.message}`);
          }
        },

        // Payment failure handler
        modal: {
          ondismiss: async () => {
            console.log('Payment cancelled by user');
            setPaymentStatus('cancelled');
            await handlePaymentFailure(orderData.order_id, 'Payment cancelled by user');
            toast.info('Payment was cancelled');
          }
        },

        // Additional options for better UX
        prefill: {
          name: userDetails.name || '',
          email: userDetails.email || '',
          contact: userDetails.phone || ''
        },
        notes: {
          plan_id: planId,
          platform: 'SOLO_LegalLight_CLAT'
        },
        theme: {
          color: '#3B82F6' // Your brand color
        }
      };

      // Open Razorpay checkout
      const razorpay = new window.Razorpay(razorpayOptions);
      
      razorpay.on('payment.failed', async (response) => {
        console.error('Payment failed:', response.error);
        setPaymentStatus('failed');
        
        await handlePaymentFailure(
          orderData.order_id,
          response.error.description || 'Payment failed'
        );
        
        toast.error(`Payment failed: ${response.error.description || 'Unknown error'}`);
      });

      razorpay.open();

    } catch (error) {
      console.error('Payment processing error:', error);
      setPaymentStatus('failed');
      toast.error(`Payment failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, [createPaymentOrder, verifyPayment, handlePaymentFailure]);

  // Get subscription status
  const getSubscriptionStatus = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE}/api/payments/subscription-status`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'x-user-id': localStorage.getItem('userId') || 'demo-user'
        }
      });

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to get subscription status');
      }

      return data.data;
      
    } catch (error) {
      console.error('Error getting subscription status:', error);
      return null;
    }
  }, [API_BASE]);

  // Get subscription plans
  const getSubscriptionPlans = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE}/api/payments/plans`);
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to get subscription plans');
      }

      return data.data;
      
    } catch (error) {
      console.error('Error getting subscription plans:', error);
      return null;
    }
  }, [API_BASE]);

  // Cancel subscription
  const cancelSubscription = useCallback(async (reason = '') => {
    try {
      setLoading(true);
      
      const response = await fetch(`${API_BASE}/api/payments/cancel-subscription`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'x-user-id': localStorage.getItem('userId') || 'demo-user'
        },
        body: JSON.stringify({ reason })
      });

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to cancel subscription');
      }

      toast.success('Subscription cancelled successfully');
      return true;
      
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      toast.error(`Failed to cancel subscription: ${error.message}`);
      return false;
    } finally {
      setLoading(false);
    }
  }, [API_BASE]);

  return {
    processPayment,
    getSubscriptionStatus,
    getSubscriptionPlans,
    cancelSubscription,
    loading,
    paymentStatus,
    setPaymentStatus
  };
};

export default useRazorpay;
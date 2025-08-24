import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, CheckCircle, ArrowLeft, Loader, Shield, User, CreditCard, BookOpen, Users, TrendingUp } from 'lucide-react';
import { validatePhone, validateName, validateOTP, sanitizeString, otpRateLimiter, verifyRateLimiter } from '../../utils/validation';
import { WelcomeAnimation, AIInsightAnimation, NudgeTheme } from '../animations/NudgeAnimations';

interface UnifiedAuthProps {
  onSuccess?: (token: string, user: any) => void;
  onBack?: () => void;
  redirectAfterAuth?: boolean;
}

interface User {
  id: string;
  phone: string;
  email?: string;
  name: string;
  role: string;
  phone_verified: boolean;
  subscription_status?: string;
  onboarding_completed?: boolean;
}

interface AuthResponse {
  success: boolean;
  token?: string;
  user?: User;
  message?: string;
  error?: string;
  details?: string;
  testOtp?: string; // For test mode
}

const UnifiedAuth: React.FC<UnifiedAuthProps> = ({ onSuccess, onBack, redirectAfterAuth = true }) => {
  const [step, setStep] = useState<'phone' | 'otp' | 'redirecting'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [role, setRole] = useState('student');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [redirectCountdown, setRedirectCountdown] = useState(3);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://solo-legalight-backend-production.up.railway.app';

  // Only show Student and Admin roles for launch
  const roles = [
    { 
      value: 'student', 
      label: '🎓 CLAT Student', 
      color: 'from-blue-600 to-indigo-700',
      description: 'Access personalized CLAT preparation',
      dashboardUrl: 'https://solo.legalight.org.in'
    },
    { 
      value: 'admin', 
      label: '⚙️ Administrator', 
      color: 'from-purple-600 to-pink-700',
      description: 'Manage students and platform operations',
      dashboardUrl: 'https://admin.legalight.org.in'
    }
  ];

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const cleaned = value.replace(/\D/g, '');
    
    // Add +91 prefix for Indian numbers if not present
    if (cleaned.length === 10 && !cleaned.startsWith('91')) {
      return `+91${cleaned}`;
    } else if (cleaned.length === 12 && cleaned.startsWith('91')) {
      return `+${cleaned}`;
    } else if (cleaned.startsWith('91') && cleaned.length === 12) {
      return `+${cleaned}`;
    }
    
    return cleaned.startsWith('+') ? value : `+${cleaned}`;
  };

  const handleSendOTP = async () => {
    // Sanitize inputs
    const sanitizedName = sanitizeString(name);
    const sanitizedPhone = sanitizeString(phone);
    
    // Validate inputs
    const phoneValidation = validatePhone(sanitizedPhone);
    const nameValidation = validateName(sanitizedName);
    
    if (!phoneValidation.isValid) {
      setError(phoneValidation.errors[0]);
      return;
    }

    if (!nameValidation.isValid) {
      setError(nameValidation.errors[0]);
      return;
    }
    
    // Check rate limiting
    if (!otpRateLimiter.canAttempt(sanitizedPhone)) {
      const waitTime = Math.ceil(otpRateLimiter.getTimeUntilNextAttempt(sanitizedPhone) / 1000 / 60);
      setError(`Too many OTP requests. Please wait ${waitTime} minutes before trying again.`);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formattedPhone = formatPhoneNumber(sanitizedPhone);
      
      const response = await fetch(`${API_BASE}/api/auth/send-otp`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          phone: formattedPhone,
          role: role,
          name: sanitizedName
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data: AuthResponse = await response.json();

      if (data.success) {
        setPhone(formattedPhone); // Store formatted phone
        setStep('otp');
        
        // Show test OTP for demo mode with modern notification
        if (data.testOtp) {
          showNotification({
            type: 'info',
            title: 'Demo OTP Sent!',
            message: `Your test OTP is: ${data.testOtp}`,
            duration: 10000
          });
        }
      } else {
        setError(data.error || data.details || 'Failed to send OTP. Please try again.');
      }
    } catch (error: any) {
      console.error('Send OTP error:', error);
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setError('Unable to connect to the server. Please check your internet connection and try again.');
      } else if (error.message.includes('HTTP 500')) {
        setError('Server error. Please try again in a moment.');
      } else if (error.message.includes('HTTP 400')) {
        setError('Invalid request. Please check your information and try again.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    // Validate OTP
    const otpValidation = validateOTP(otp);
    
    if (!otpValidation.isValid) {
      setError(otpValidation.errors[0]);
      return;
    }
    
    // Check rate limiting for verification attempts
    if (!verifyRateLimiter.canAttempt(phone)) {
      const waitTime = Math.ceil(verifyRateLimiter.getTimeUntilNextAttempt(phone) / 1000 / 60);
      setError(`Too many verification attempts. Please wait ${waitTime} minutes before trying again.`);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          phone: phone,
          otp: otp
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data: AuthResponse = await response.json();

      if (data.success && data.token && data.user) {
        // Store authentication data with multiple naming conventions for compatibility
        const authData = {
          token: data.token,
          user: data.user,
          timestamp: new Date().toISOString()
        };

        // Frontend naming convention
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('user_data', JSON.stringify(data.user));
        localStorage.setItem('auth_timestamp', new Date().toISOString());
        
        // Marketing website compatibility
        localStorage.setItem('authToken', data.token);
        localStorage.setItem('userData', JSON.stringify(data.user));
        
        // Comprehensive auth object
        localStorage.setItem('clat_auth', JSON.stringify(authData));

        if (redirectAfterAuth) {
          setStep('redirecting');
          handleRedirectToDashboard(data.token, data.user);
        } else if (onSuccess) {
          onSuccess(data.token, data.user);
        }
      } else {
        if (data.error?.includes('expired')) {
          setError('OTP has expired. Please request a new one.');
        } else if (data.error?.includes('invalid') || data.error?.includes('Invalid')) {
          setError('Invalid OTP. Please check the code and try again.');
        } else {
          setError(data.error || 'Verification failed. Please try again.');
        }
      }
    } catch (error: any) {
      console.error('Verify OTP error:', error);
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        setError('Unable to connect to the server. Please check your internet connection and try again.');
      } else if (error.message.includes('HTTP 500')) {
        setError('Server error. Please try again in a moment.');
      } else if (error.message.includes('HTTP 400')) {
        setError('Invalid verification request. Please try sending a new OTP.');
      } else {
        setError('Verification failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRedirectToDashboard = (token: string, user: User) => {
    const selectedRole = roles.find(r => r.value === user.role) || roles[0];
    
    showNotification({
      type: 'success',
      title: 'Login Successful!',
      message: `Welcome to CLAT excellence, ${user.name}!`,
      duration: 3000
    });

    // Start countdown
    const countdown = setInterval(() => {
      setRedirectCountdown(prev => {
        if (prev <= 1) {
          clearInterval(countdown);
          
          // Construct redirect URL with authentication data
          const redirectUrl = new URL(selectedRole.dashboardUrl);
          redirectUrl.searchParams.set('token', token);
          redirectUrl.searchParams.set('user', encodeURIComponent(JSON.stringify(user)));
          redirectUrl.searchParams.set('timestamp', new Date().toISOString());
          
          // Perform the redirect
          window.location.href = redirectUrl.toString();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const showNotification = ({ type, title, message, duration = 5000 }: {
    type: 'success' | 'error' | 'info';
    title: string;
    message: string;
    duration?: number;
  }) => {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 animate-slide-in-right max-w-sm`;
    
    const bgColor = type === 'success' ? 'bg-green-500/90' : 
                   type === 'error' ? 'bg-red-500/90' : 
                   'bg-blue-500/90';
    
    notification.innerHTML = `
      <div class="${bgColor} text-white rounded-xl p-4 shadow-2xl backdrop-blur-lg border border-white/20">
        <div class="flex items-start">
          <div class="mr-3 text-2xl">
            ${type === 'success' ? '🎉' : type === 'error' ? '❌' : 'ℹ️'}
          </div>
          <div class="flex-1">
            <div class="font-semibold text-lg">${title}</div>
            <div class="text-sm opacity-90 mt-1">${message}</div>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (document.body.contains(notification)) {
        notification.style.animation = 'slide-out-right 300ms ease-out forwards';
        setTimeout(() => {
          document.body.removeChild(notification);
        }, 300);
      }
    }, duration);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers, +, and spaces
    const cleaned = value.replace(/[^\d+\s]/g, '');
    setPhone(cleaned);
  };

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ''); // Only digits
    if (value.length <= 6) {
      setOtp(value);
    }
  };

  // Redirect step
  if (step === 'redirecting') {
    const selectedRole = roles.find(r => r.value === role) || roles[0];
    
    return (
      <div className="w-full max-w-md mx-auto px-4">
        <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 backdrop-blur-lg">
          <div className="mb-6">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4 animate-bounce" />
            <h2 className="text-2xl font-bold text-white mb-2">Welcome to SOLO!</h2>
            <p className="text-green-200">Authentication successful</p>
          </div>
          
          <div className="mb-6 p-4 rounded-xl bg-white/10">
            <div className="text-lg font-semibold text-white mb-1">
              Redirecting to {selectedRole.label}
            </div>
            <div className="text-sm text-gray-300">
              {selectedRole.description}
            </div>
          </div>
          
          <div className="flex items-center justify-center text-white">
            <Loader className="w-5 h-5 animate-spin mr-2" />
            <span>Redirecting in {redirectCountdown} seconds...</span>
          </div>
          
          <div className="mt-4 text-xs text-gray-400">
            Taking you to {selectedRole.dashboardUrl}
          </div>
        </div>
      </div>
    );
  }

  if (step === 'phone') {
    return (
      <div className="w-full max-w-md mx-auto px-4">
        {/* Welcome Animation */}
        <div className="flex justify-center mb-6">
          <WelcomeAnimation 
            theme={NudgeTheme.DARK}
            size="lg"
            autoPlay={true}
            className="animate-scale-in"
          />
        </div>

        {/* Main Auth Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 shadow-2xl">
          <div className="text-center mb-6">
            <Phone className="w-8 h-8 text-blue-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white">Verify Your Phone</h3>
            <p className="text-gray-300 mt-2">We'll send you a verification code</p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-200 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-6">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                Select Your Role
              </label>
              <div className="grid grid-cols-1 gap-3">
                {roles.map((roleOption) => (
                  <button
                    key={roleOption.value}
                    onClick={() => setRole(roleOption.value)}
                    className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                      role === roleOption.value
                        ? 'border-blue-400/50 bg-blue-500/20 text-white'
                        : 'border-white/20 bg-white/5 text-gray-300 hover:border-white/30 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{roleOption.label}</div>
                        <div className="text-sm opacity-80">{roleOption.description}</div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        role === roleOption.value ? 'border-blue-400 bg-blue-400' : 'border-gray-400'
                      }`} />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Phone Input */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                placeholder="+91 98765 43210"
                required
              />
              <p className="text-xs text-gray-400 mt-1">
                Enter your phone number with country code
              </p>
            </div>

            <button
              onClick={handleSendOTP}
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin mr-2 inline" />
                  Sending OTP...
                </>
              ) : (
                'Send OTP'
              )}
            </button>
          </div>

          {onBack && (
            <button
              onClick={onBack}
              className="w-full mt-4 py-2 px-4 rounded-xl text-gray-300 hover:text-white transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2 inline" />
              Back to Home
            </button>
          )}
        </div>
      </div>
    );
  }

  // OTP Verification Step
  return (
    <div className="w-full max-w-md mx-auto px-4">
      {/* AI Insight Animation for OTP Process */}
      <div className="flex justify-center mb-6">
        <AIInsightAnimation 
          theme={NudgeTheme.DARK}
          size="lg"
          autoPlay={true}
          className="animate-scale-in"
        />
      </div>

      {/* OTP Card */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 shadow-2xl">
        <div className="text-center mb-6">
          <MessageSquare className="w-8 h-8 text-green-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white">Enter OTP</h3>
          <p className="text-gray-300 mt-2">
            We sent a 6-digit code to
            <br />
            <span className="font-medium text-blue-300 break-all bg-blue-500/20 px-2 py-1 rounded-full text-sm">{phone}</span>
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-200 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-white mb-2 text-center">
              Verification Code
            </label>
            <input
              type="text"
              value={otp}
              onChange={handleOTPChange}
              className="w-full px-3 py-4 text-center text-2xl tracking-widest rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all duration-200"
              placeholder="123456"
              maxLength={6}
              required
            />
            <p className="text-xs text-gray-400 mt-2 text-center">
              Enter the 6-digit code sent to your phone
            </p>
          </div>

          <button
            onClick={handleVerifyOTP}
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-green-500/25"
          >
            {loading ? (
              <>
                <Loader className="w-4 h-4 animate-spin mr-2 inline" />
                Verifying...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2 inline" />
                Verify & Login
              </>
            )}
          </button>

          <div className="text-center space-y-3">
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => setStep('phone')}
                className="text-blue-300 hover:text-blue-200 text-sm transition-colors duration-200 px-3 py-1 rounded-lg hover:bg-white/5"
              >
                Change phone number
              </button>
              <span className="text-gray-500">•</span>
              <button
                onClick={handleSendOTP}
                disabled={loading}
                className="text-gray-300 hover:text-white text-sm disabled:text-gray-500 transition-colors duration-200 px-3 py-1 rounded-lg hover:bg-white/5"
              >
                Resend OTP
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnifiedAuth;
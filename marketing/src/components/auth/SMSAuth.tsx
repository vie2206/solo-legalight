import React, { useState } from 'react';
import { Phone, MessageSquare, CheckCircle, ArrowLeft, Loader } from 'lucide-react';
import { validatePhone, validateName, validateOTP, sanitizeString, otpRateLimiter, verifyRateLimiter } from '../../utils/validation';
import { WelcomeAnimation, AIInsightAnimation, NudgeTheme } from '../animations/NudgeAnimations';

interface SMSAuthProps {
  onSuccess: (token: string, user: any) => void;
  onBack?: () => void;
}

interface User {
  id: string;
  phone: string;
  email?: string;
  name: string;
  role: string;
  phone_verified: boolean;
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

const SMSAuth: React.FC<SMSAuthProps> = ({ onSuccess, onBack }) => {
  const [step, setStep] = useState<'phone' | 'otp' | 'role'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [role, setRole] = useState('student');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://solo-legalight-backend-production.up.railway.app';

  const roles = [
    { value: 'student', label: '👨‍🎓 Student', color: 'bg-blue-600 hover:bg-blue-700' },
    { value: 'parent', label: '👨‍👩‍👧‍👦 Parent', color: 'bg-purple-600 hover:bg-purple-700' },
    { value: 'educator', label: '👩‍🏫 Educator', color: 'bg-green-600 hover:bg-green-700' },
    { value: 'operation_manager', label: '👔 Manager', color: 'bg-indigo-600 hover:bg-indigo-700' },
    { value: 'admin', label: '⚙️ Admin', color: 'bg-red-600 hover:bg-red-700' }
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
        headers: { 'Content-Type': 'application/json' },
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
        
        // Show test OTP for demo mode
        if (data.testOtp) {
          // Use a more professional notification instead of alert
          const notification = document.createElement('div');
          notification.className = 'fixed top-4 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg z-50';
          notification.innerHTML = `
            <div class="flex items-center">
              <div class="mr-2">✅</div>
              <div>
                <div class="font-semibold">Demo OTP Sent!</div>
                <div class="text-sm">Your OTP is: ${data.testOtp}</div>
              </div>
            </div>
          `;
          document.body.appendChild(notification);
          
          // Remove notification after 10 seconds
          setTimeout(() => {
            if (document.body.contains(notification)) {
              document.body.removeChild(notification);
            }
          }, 10000);
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
        headers: { 'Content-Type': 'application/json' },
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
        // Show UI8 enhanced success notification
        const notification = document.createElement('div');
        notification.className = 'fixed top-4 right-4 z-50 animate-ui8-scale-in';
        notification.style.cssText = `
          background: var(--clat-gradient-success);
          color: white;
          padding: 1.5rem;
          border-radius: 1rem;
          box-shadow: var(--clat-glow-success);
          backdrop-filter: var(--clat-backdrop-blur);
          border: 1px solid var(--clat-glass-border);
          max-width: 300px;
        `;
        notification.innerHTML = `
          <div class="flex items-center">
            <div class="mr-3 text-2xl">🎉</div>
            <div>
              <div class="font-semibold text-lg">Login Successful!</div>
              <div class="text-sm opacity-90">Welcome to CLAT excellence...</div>
              <div class="text-xs opacity-75 mt-1">Redirecting to your dashboard</div>
            </div>
          </div>
          <div class="mt-2 w-full bg-white/20 rounded-full h-1">
            <div class="bg-white h-1 rounded-full animate-ui8-progress" style="animation: progress 2s ease-out forwards;"></div>
          </div>
        `;
        
        // Add progress animation keyframes
        if (!document.getElementById('ui8-progress-keyframes')) {
          const style = document.createElement('style');
          style.id = 'ui8-progress-keyframes';
          style.textContent = `
            @keyframes progress {
              from { width: 0%; }
              to { width: 100%; }
            }
          `;
          document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Call success handler after animation completes
        setTimeout(() => {
          onSuccess(data.token, data.user);
        }, 2000);
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

  if (step === 'phone') {
    return (
      <div className="w-full max-w-md mx-auto px-4">
        {/* Welcome Animation */}
        <div className="flex justify-center mb-6">
          <WelcomeAnimation 
            theme={NudgeTheme.DARK}
            size="lg"
            autoPlay={true}
            className="animate-ui8-scale-in"
          />
        </div>

        {/* UI8 Enhanced Glass Card */}
        <div className="card-ui8-glass animate-ui8-fade-in-up">
          <div className="text-center mb-6">
            <Phone className="w-8 h-8 text-clat-primary mx-auto mb-4" style={{ filter: 'drop-shadow(var(--clat-glow-primary))' }} />
            <h3 className="text-ui8-heading text-clat-text-primary">Verify Your Phone</h3>
            <p className="text-ui8-body text-clat-text-secondary mt-2">We'll send you a verification code</p>
          </div>

          {error && (
            <div className="toast-ui8-error mb-4 animate-ui8-fade-in-left">
              {error}
            </div>
          )}

          <div className="space-y-6">
            {/* Role Selection - UI8 Enhanced */}
            <div className="field-group">
              <label className="block text-sm font-medium text-clat-text-primary mb-2 uppercase tracking-wide">
                I am a:
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="input-ui8 hover-ui8-glow transition-all duration-300"
                style={{ 
                  background: 'var(--clat-glass-bg)',
                  backdropFilter: 'var(--clat-backdrop-blur)',
                  border: '1px solid var(--clat-glass-border)'
                }}
              >
                {roles.map((roleOption) => (
                  <option key={roleOption.value} value={roleOption.value} className="bg-clat-bg-secondary text-clat-text-primary">
                    {roleOption.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Name Input - UI8 Enhanced */}
            <div className="field-group">
              <label className="block text-sm font-medium text-clat-text-primary mb-2 uppercase tracking-wide">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-ui8 hover-ui8-glow transition-all duration-300"
                placeholder="Enter your full name"
                required
                style={{ 
                  background: 'var(--clat-glass-bg)',
                  backdropFilter: 'var(--clat-backdrop-blur)',
                  border: '1px solid var(--clat-glass-border)'
                }}
              />
            </div>

            {/* Phone Input - UI8 Enhanced */}
            <div className="field-group">
              <label className="block text-sm font-medium text-clat-text-primary mb-2 uppercase tracking-wide">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                className="input-ui8 hover-ui8-glow transition-all duration-300"
                placeholder="+91 98765 43210"
                required
                style={{ 
                  background: 'var(--clat-glass-bg)',
                  backdropFilter: 'var(--clat-backdrop-blur)',
                  border: '1px solid var(--clat-glass-border)'
                }}
              />
              <p className="text-xs text-clat-text-muted mt-1">
                Enter your phone number with country code
              </p>
            </div>

            <button
              onClick={handleSendOTP}
              disabled={loading}
              className="btn-ui8-primary w-full min-h-[48px] touch-manipulation animate-ui8-fade-in-up"
              style={{ 
                background: 'var(--clat-gradient-primary)',
                boxShadow: 'var(--clat-glow-primary)',
                animationDelay: '300ms'
              }}
            >
              {loading ? (
                <>
                  <div className="loading-ui8 mr-2"></div>
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
              className="btn-ui8-secondary w-full mt-4 hover-ui8-lift"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Demo Login
            </button>
          )}
        </div>
      </div>
    );
  }

  // OTP Verification Step - UI8 Enhanced
  return (
    <div className="w-full max-w-md mx-auto px-4">
      {/* AI Insight Animation for OTP Process */}
      <div className="flex justify-center mb-6">
        <AIInsightAnimation 
          theme={NudgeTheme.DARK}
          size="lg"
          autoPlay={true}
          className="animate-ui8-scale-in"
        />
      </div>

      {/* UI8 Enhanced Glass Card */}
      <div className="card-ui8-glass animate-ui8-fade-in-up">
        <div className="text-center mb-6">
          <MessageSquare className="w-8 h-8 text-clat-success mx-auto mb-4" style={{ filter: 'drop-shadow(var(--clat-glow-success))' }} />
          <h3 className="text-ui8-heading text-clat-text-primary">Enter OTP</h3>
          <p className="text-ui8-body text-clat-text-secondary mt-2">
            We sent a 6-digit code to
            <br />
            <span className="font-medium text-clat-primary break-all badge-ui8-primary px-2 py-1 rounded-full text-xs">{phone}</span>
          </p>
        </div>

        {error && (
          <div className="toast-ui8-error mb-4 animate-ui8-fade-in-left">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div className="field-group">
            <label className="block text-sm font-medium text-clat-text-primary mb-2 text-center uppercase tracking-wide">
              Verification Code
            </label>
            <input
              type="text"
              value={otp}
              onChange={handleOTPChange}
              className="w-full px-3 py-4 text-center text-2xl tracking-widest input-ui8 hover-ui8-glow transition-all duration-300"
              placeholder="123456"
              maxLength={6}
              required
              style={{ 
                background: 'var(--clat-glass-bg)',
                backdropFilter: 'var(--clat-backdrop-blur)',
                border: '2px solid var(--clat-glass-border)',
                borderRadius: '1rem',
                fontSize: '1.5rem',
                letterSpacing: '0.5rem'
              }}
            />
            <p className="text-xs text-clat-text-muted mt-2 text-center">
              Enter the 6-digit code sent to your phone
            </p>
          </div>

          <button
            onClick={handleVerifyOTP}
            disabled={loading}
            className="w-full min-h-[48px] touch-manipulation animate-ui8-fade-in-up btn-ui8-primary"
            style={{ 
              background: 'var(--clat-gradient-success)',
              boxShadow: 'var(--clat-glow-success)',
              animationDelay: '200ms'
            }}
          >
            {loading ? (
              <>
                <div className="loading-ui8 mr-2"></div>
                Verifying...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Verify & Login
              </>
            )}
          </button>

          <div className="text-center space-y-3">
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => setStep('phone')}
                className="text-clat-primary hover:text-clat-primary-light text-sm hover-ui8-glow transition-all duration-300 px-3 py-1 rounded-lg"
              >
                Change phone number
              </button>
              <span className="text-clat-text-muted">•</span>
              <button
                onClick={handleSendOTP}
                disabled={loading}
                className="text-clat-secondary hover:text-clat-secondary-light text-sm disabled:text-clat-text-disabled hover-ui8-glow transition-all duration-300 px-3 py-1 rounded-lg"
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

export default SMSAuth;
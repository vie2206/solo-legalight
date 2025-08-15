import React, { useState } from 'react';
import { Phone, MessageSquare, CheckCircle, ArrowLeft, Loader } from 'lucide-react';

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
    if (!phone || phone.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }

    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formattedPhone = formatPhoneNumber(phone);
      
      const response = await fetch(`${API_BASE}/api/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: formattedPhone,
          role: role,
          name: name.trim()
        })
      });

      const data: AuthResponse = await response.json();

      if (data.success) {
        setPhone(formattedPhone); // Store formatted phone
        setStep('otp');
        
        // Show test OTP for demo mode
        if (data.testOtp) {
          alert(`DEMO MODE: Your OTP is ${data.testOtp}`);
        }
      } else {
        setError(data.error || data.details || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Send OTP error:', error);
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      setError('Please enter the 6-digit OTP');
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

      const data: AuthResponse = await response.json();

      if (data.success && data.token && data.user) {
        onSuccess(data.token, data.user);
      } else {
        setError(data.error || 'Invalid or expired OTP');
      }
    } catch (error) {
      console.error('Verify OTP error:', error);
      setError('Network error. Please try again.');
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
      <div className="w-full">
          <div className="text-center mb-6">
            <Phone className="w-8 h-8 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white">Verify Your Phone</h3>
            <p className="text-gray-300 mt-2">We'll send you a verification code</p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/30 text-red-200 px-4 py-3 rounded-md mb-4">
              {error}
            </div>
          )}

          <div className="space-y-4">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                I am a:
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 border border-white/30 bg-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 backdrop-blur-sm"
              >
                {roles.map((roleOption) => (
                  <option key={roleOption.value} value={roleOption.value} className="bg-gray-800 text-white">
                    {roleOption.label}
                  </option>
                ))}
              </select>
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
                className="w-full px-3 py-2 border border-white/30 bg-white/10 text-white placeholder:text-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 backdrop-blur-sm"
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
                className="w-full px-3 py-2 border border-white/30 bg-white/10 text-white placeholder:text-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 backdrop-blur-sm"
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
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin mr-2" />
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
              className="w-full mt-4 text-gray-300 hover:text-white flex items-center justify-center transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Demo Login
            </button>
          )}
      </div>
    );
  }

  // OTP Verification Step
  return (
    <div className="w-full">
        <div className="text-center mb-6">
          <MessageSquare className="w-8 h-8 text-green-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white">Enter OTP</h3>
          <p className="text-gray-300 mt-2">
            We sent a 6-digit code to
            <br />
            <span className="font-medium text-white">{phone}</span>
          </p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/30 text-red-200 px-4 py-3 rounded-md mb-4">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2 text-center">
              Verification Code
            </label>
            <input
              type="text"
              value={otp}
              onChange={handleOTPChange}
              className="w-full px-3 py-2 text-center text-2xl tracking-widest border border-white/30 bg-white/10 text-white placeholder:text-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 backdrop-blur-sm"
              placeholder="123456"
              maxLength={6}
              required
            />
            <p className="text-xs text-gray-400 mt-1 text-center">
              Enter the 6-digit code sent to your phone
            </p>
          </div>

          <button
            onClick={handleVerifyOTP}
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader className="w-4 h-4 animate-spin mr-2" />
                Verifying...
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Verify & Login
              </>
            )}
          </button>

          <div className="text-center">
            <button
              onClick={() => setStep('phone')}
              className="text-purple-400 hover:text-purple-300 text-sm"
            >
              Change phone number
            </button>
            <span className="text-gray-400 mx-2">•</span>
            <button
              onClick={handleSendOTP}
              disabled={loading}
              className="text-purple-400 hover:text-purple-300 text-sm disabled:text-purple-600"
            >
              Resend OTP
            </button>
          </div>
        </div>
    </div>
  );
};

export default SMSAuth;
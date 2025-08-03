import React, { useState, useEffect, useRef } from 'react';
import { 
  Phone, Mail, ArrowLeft, Shield, CheckCircle, 
  AlertCircle, Clock, Smartphone, Lock
} from 'lucide-react';
import { SoloLogo } from '../shared/SoloLogo';
import { SoloButton } from '../shared/SoloButton';
import { SoloCard } from '../shared/SoloCard';

interface SoloOTPAuthProps {
  onSuccess: (userType: string, userData: any) => void;
  onBack: () => void;
}

type AuthStep = 'method' | 'details' | 'otp' | 'success';
type AuthMethod = 'phone' | 'email';
type UserType = 'student' | 'parent' | 'educator' | 'operation_manager' | 'admin';

export const SoloOTPAuth: React.FC<SoloOTPAuthProps> = ({ onSuccess, onBack }) => {
  const [currentStep, setCurrentStep] = useState<AuthStep>('method');
  const [authMethod, setAuthMethod] = useState<AuthMethod>('phone');
  const [userType, setUserType] = useState<UserType>('student');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [countdown, setCountdown] = useState(0);
  
  // Form data
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    otp: ['', '', '', '', '', '']
  });

  // OTP input refs
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer for resend OTP
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleMethodSelect = (method: AuthMethod) => {
    setAuthMethod(method);
    setCurrentStep('details');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call to send OTP
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setCurrentStep('otp');
      setCountdown(60); // 60 seconds countdown
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newOTP = [...formData.otp];
    newOTP[index] = value;
    setFormData({ ...formData, otp: newOTP });

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOTPKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !formData.otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOTPVerify = async () => {
    const otpString = formData.otp.join('');
    if (otpString.length !== 6) {
      setError('Please enter the complete OTP');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful verification
      setCurrentStep('success');
      
      // Auto-proceed to dashboard after success animation
      setTimeout(() => {
        onSuccess(userType, {
          name: formData.name,
          [authMethod]: authMethod === 'phone' ? formData.phone : formData.email,
          userType
        });
      }, 2000);
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (countdown > 0) return;
    
    setIsLoading(true);
    try {
      // Simulate resend API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCountdown(60);
    } catch (err) {
      setError('Failed to resend OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const userTypeOptions = [
    { value: 'student', label: '👨‍🎓 Student', description: 'CLAT Aspirant' },
    { value: 'parent', label: '👨‍👩‍👧‍👦 Parent', description: 'Student Guardian' },
    { value: 'educator', label: '👩‍🏫 Educator', description: 'Teacher/Mentor' },
    { value: 'operation_manager', label: '👔 Manager', description: 'Operations Team' },
    { value: 'admin', label: '⚙️ Admin', description: 'System Administrator' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-solo-primary-light to-solo-secondary-light flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 chroma-education-1 opacity-5"></div>
      
      <div className="relative w-full max-w-md">
        <SoloCard className="chroma-card">
          {/* Header */}
          <div className="text-center mb-8">
            <SoloLogo variant="stacked" size="large" animated className="mx-auto mb-6" />
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-solo-dark">
                {currentStep === 'method' && 'Choose Login Method'}
                {currentStep === 'details' && 'Enter Your Details'}
                {currentStep === 'otp' && 'Verify OTP'}
                {currentStep === 'success' && 'Welcome!'}
              </h2>
              <p className="text-solo-gray-600">
                {currentStep === 'method' && 'Select your preferred authentication method'}
                {currentStep === 'details' && 'We\'ll send you a verification code'}
                {currentStep === 'otp' && `Code sent to your ${authMethod}`}
                {currentStep === 'success' && 'Authentication successful'}
              </p>
            </div>
          </div>

          {/* Method Selection */}
          {currentStep === 'method' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleMethodSelect('phone')}
                  className="flex flex-col items-center p-6 border-2 border-solo-gray-200 rounded-xl hover:border-solo-primary hover:bg-solo-primary-light transition-all duration-300 group"
                >
                  <Smartphone className="w-8 h-8 text-solo-primary mb-3 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-solo-dark">Phone</span>
                  <span className="text-sm text-solo-gray-600">SMS OTP</span>
                </button>

                <button
                  onClick={() => handleMethodSelect('email')}
                  className="flex flex-col items-center p-6 border-2 border-solo-gray-200 rounded-xl hover:border-solo-primary hover:bg-solo-primary-light transition-all duration-300 group"
                >
                  <Mail className="w-8 h-8 text-solo-primary mb-3 group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-solo-dark">Email</span>
                  <span className="text-sm text-solo-gray-600">Email OTP</span>
                </button>
              </div>

              <button
                onClick={onBack}
                className="w-full flex items-center justify-center text-solo-gray-600 hover:text-solo-primary transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Landing
              </button>
            </div>
          )}

          {/* Details Form */}
          {currentStep === 'details' && (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              {/* User Type Selection */}
              <div>
                <label className="block text-sm font-medium text-solo-gray-700 mb-3">
                  I am a:
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {userTypeOptions.map((option) => (
                    <label
                      key={option.value}
                      className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                        userType === option.value
                          ? 'border-solo-primary bg-solo-primary-light'
                          : 'border-solo-gray-200 hover:border-solo-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="userType"
                        value={option.value}
                        checked={userType === option.value}
                        onChange={(e) => setUserType(e.target.value as UserType)}
                        className="sr-only"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-solo-dark">{option.label}</div>
                        <div className="text-sm text-solo-gray-600">{option.description}</div>
                      </div>
                      {userType === option.value && (
                        <CheckCircle className="w-5 h-5 text-solo-primary" />
                      )}
                    </label>
                  ))}
                </div>
              </div>

              {/* Name Input */}
              <div>
                <label className="block text-sm font-medium text-solo-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-solo-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-solo-primary focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Phone/Email Input */}
              <div>
                <label className="block text-sm font-medium text-solo-gray-700 mb-2">
                  {authMethod === 'phone' ? 'Phone Number' : 'Email Address'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {authMethod === 'phone' ? (
                      <Phone className="h-5 w-5 text-solo-gray-400" />
                    ) : (
                      <Mail className="h-5 w-5 text-solo-gray-400" />
                    )}
                  </div>
                  <input
                    type={authMethod === 'phone' ? 'tel' : 'email'}
                    value={authMethod === 'phone' ? formData.phone : formData.email}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      [authMethod]: e.target.value 
                    })}
                    className="w-full pl-10 pr-4 py-3 border border-solo-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-solo-primary focus:border-transparent"
                    placeholder={authMethod === 'phone' ? '+91 98765 43210' : 'your@email.com'}
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              )}

              <div className="space-y-3">
                <SoloButton
                  type="submit"
                  loading={isLoading}
                  className="w-full chroma-button"
                >
                  {isLoading ? 'Sending OTP...' : 'Send OTP'}
                </SoloButton>

                <button
                  type="button"
                  onClick={() => setCurrentStep('method')}
                  className="w-full flex items-center justify-center text-solo-gray-600 hover:text-solo-primary transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Change Method
                </button>
              </div>
            </form>
          )}

          {/* OTP Verification */}
          {currentStep === 'otp' && (
            <div className="space-y-6">
              {/* OTP Input */}
              <div>
                <label className="block text-sm font-medium text-solo-gray-700 mb-4 text-center">
                  Enter 6-digit OTP
                </label>
                <div className="flex justify-center space-x-3">
                  {formData.otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => { otpRefs.current[index] = el; }}
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOTPChange(index, e.target.value)}
                      onKeyDown={(e) => handleOTPKeyDown(index, e)}
                      className="w-12 h-12 text-center text-xl font-bold border-2 border-solo-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-solo-primary focus:border-transparent"
                    />
                  ))}
                </div>
              </div>

              {/* Timer and Resend */}
              <div className="text-center space-y-3">
                {countdown > 0 ? (
                  <div className="flex items-center justify-center text-solo-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Resend OTP in {countdown}s</span>
                  </div>
                ) : (
                  <button
                    onClick={handleResendOTP}
                    disabled={isLoading}
                    className="text-solo-primary hover:text-solo-primary-dark font-semibold disabled:opacity-50"
                  >
                    Resend OTP
                  </button>
                )}
              </div>

              {error && (
                <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              )}

              <div className="space-y-3">
                <SoloButton
                  onClick={handleOTPVerify}
                  loading={isLoading}
                  className="w-full chroma-button"
                >
                  {isLoading ? 'Verifying...' : 'Verify OTP'}
                </SoloButton>

                <button
                  onClick={() => setCurrentStep('details')}
                  className="w-full flex items-center justify-center text-solo-gray-600 hover:text-solo-primary transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Change Details
                </button>
              </div>
            </div>
          )}

          {/* Success State */}
          {currentStep === 'success' && (
            <div className="text-center space-y-6">
              <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-green-500" />
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-solo-dark mb-2">
                  Authentication Successful!
                </h3>
                <p className="text-solo-gray-600">
                  Welcome to SOLO by Legalight, {formData.name}
                </p>
              </div>

              <div className="flex items-center justify-center">
                <div className="animate-spin w-6 h-6 border-2 border-solo-primary border-t-transparent rounded-full"></div>
                <span className="ml-3 text-solo-gray-600">Loading your dashboard...</span>
              </div>
            </div>
          )}
        </SoloCard>

        {/* Security Note */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white text-sm">
            <Shield className="w-4 h-4 mr-2" />
            <span>Secured with end-to-end encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoloOTPAuth;
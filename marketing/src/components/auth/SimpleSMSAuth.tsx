'use client';

import React, { useState } from 'react';
import { Phone, MessageSquare } from 'lucide-react';

interface SimpleSMSAuthProps {
  onSuccess: (token: string, user: any) => void;
}

const SimpleSMSAuth: React.FC<SimpleSMSAuthProps> = ({ onSuccess }) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_BASE = 'https://solo-legalight-backend-production.up.railway.app';

  const handleSendOTP = async () => {
    if (!name || !phone) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE}/api/auth/send-otp`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        credentials: 'omit',
        body: JSON.stringify({
          phone: phone.startsWith('+') ? phone : `+91${phone}`,
          role: 'student',
          name: name
        })
      });

      const data = await response.json();

      if (data.success) {
        setStep('otp');
        if (data.testOtp) {
          alert(`Test OTP: ${data.testOtp}`);
        }
      } else {
        setError(data.error || 'Failed to send OTP');
      }
    } catch (error: any) {
      console.error('Send OTP Error:', error);
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        setError('Network connection failed. Please check your internet connection and try again.');
      } else if (error.message.includes('CORS')) {
        setError('Cross-origin request blocked. This may be a browser security issue.');
      } else {
        setError('Network error: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      setError('Please enter OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE}/api/auth/verify-otp`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        mode: 'cors',
        credentials: 'omit',
        body: JSON.stringify({
          phone: phone.startsWith('+') ? phone : `+91${phone}`,
          otp: otp
        })
      });

      const data = await response.json();

      if (data.success && data.token && data.user) {
        onSuccess(data.token, data.user);
      } else {
        setError(data.error || 'Verification failed');
      }
    } catch (error: any) {
      console.error('Verify OTP Error:', error);
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        setError('Network connection failed. Please check your internet connection and try again.');
      } else if (error.message.includes('CORS')) {
        setError('Cross-origin request blocked. This may be a browser security issue.');
      } else {
        setError('Network error: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (step === 'phone') {
    return (
      <div className="space-y-4">
        <div className="text-center mb-4">
          <Phone className="w-8 h-8 text-purple-400 mx-auto mb-2" />
          <h3 className="text-xl font-bold text-white">Simple SMS Login Test</h3>
          <p className="text-gray-300">Enter your details to test OTP</p>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 text-red-200">
            {error}
          </div>
        )}

        <div>
          <label className="block text-white mb-2">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-white mb-2">Phone:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
            placeholder="+91 9876543210"
          />
        </div>

        <button
          onClick={handleSendOTP}
          disabled={loading}
          className="w-full p-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send OTP'}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <MessageSquare className="w-8 h-8 text-green-400 mx-auto mb-2" />
        <h3 className="text-xl font-bold text-white">Enter OTP</h3>
        <p className="text-gray-300">Check your phone for the 6-digit code</p>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 text-red-200">
          {error}
        </div>
      )}

      <div>
        <label className="block text-white mb-2">OTP Code:</label>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
          className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white text-center text-2xl tracking-widest"
          placeholder="123456"
          maxLength={6}
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setStep('phone')}
          className="flex-1 p-3 bg-gray-600 hover:bg-gray-700 rounded-lg text-white font-semibold"
        >
          Back
        </button>
        <button
          onClick={handleVerifyOTP}
          disabled={loading}
          className="flex-1 p-3 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold disabled:opacity-50"
        >
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </div>
    </div>
  );
};

export default SimpleSMSAuth;
import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { SoloButton } from '../shared/SoloButton';

interface SoloLoginFormProps {
  onSubmit: (credentials: { email: string; password: string; role: string }) => void;
  isLoading?: boolean;
}

export const SoloLoginForm: React.FC<SoloLoginFormProps> = ({ onSubmit, isLoading = false }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    role: 'student'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const roles = [
    { value: 'admin', label: 'Administrator' },
    { value: 'operation_manager', label: 'Operations Manager' },
    { value: 'educator', label: 'Educator' },
    { value: 'parent', label: 'Parent' },
    { value: 'student', label: 'Student' }
  ];

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!credentials.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!credentials.password) {
      newErrors.password = 'Password is required';
    } else if (credentials.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(credentials);
    }
  };

  const handleChange = (field: string, value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Role Selection */}
      <div>
        <label className="block text-sm font-medium text-solo-gray-700 mb-2">
          Login as
        </label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-solo-gray-400" />
          <select
            value={credentials.role}
            onChange={(e) => handleChange('role', e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-solo-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-solo-primary focus:border-transparent appearance-none bg-white"
          >
            {roles.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Email Input */}
      <div>
        <label className="block text-sm font-medium text-solo-gray-700 mb-2">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-solo-gray-400" />
          <input
            type="email"
            value={credentials.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="Enter your email"
            className={`w-full pl-11 pr-4 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:border-transparent ${
              errors.email 
                ? 'border-solo-error focus:ring-solo-error' 
                : 'border-solo-gray-300 focus:ring-solo-primary'
            }`}
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-solo-error">{errors.email}</p>
        )}
      </div>

      {/* Password Input */}
      <div>
        <label className="block text-sm font-medium text-solo-gray-700 mb-2">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-solo-gray-400" />
          <input
            type={showPassword ? 'text' : 'password'}
            value={credentials.password}
            onChange={(e) => handleChange('password', e.target.value)}
            placeholder="Enter your password"
            className={`w-full pl-11 pr-11 py-3 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:border-transparent ${
              errors.password 
                ? 'border-solo-error focus:ring-solo-error' 
                : 'border-solo-gray-300 focus:ring-solo-primary'
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-solo-gray-400 hover:text-solo-gray-600"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-solo-error">{errors.password}</p>
        )}
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 text-solo-primary focus:ring-solo-primary border-solo-gray-300 rounded"
          />
          <span className="ml-2 text-sm text-solo-gray-600">Remember me</span>
        </label>
        <button
          type="button"
          className="text-sm text-solo-primary hover:text-solo-primary-dark font-medium"
        >
          Forgot password?
        </button>
      </div>

      {/* Submit Button */}
      <SoloButton
        type="submit"
        variant="primary"
        size="large"
        fullWidth
        loading={isLoading}
      >
        Sign In
      </SoloButton>

      {/* Demo Credentials */}
      <div className="mt-6 p-4 bg-solo-gray-50 rounded-xl">
        <p className="text-xs font-medium text-solo-gray-700 mb-2">Demo Credentials:</p>
        <div className="grid grid-cols-1 gap-1 text-xs text-solo-gray-600">
          <div>Admin: admin@test.com / admin123</div>
          <div>Student: student@test.com / student123</div>
          <div>Parent: parent@test.com / parent123</div>
        </div>
      </div>
    </form>
  );
};
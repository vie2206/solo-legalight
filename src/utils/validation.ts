// Input validation and sanitization utilities

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// Email validation
export const validateEmail = (email: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!email) {
    errors.push('Email is required');
  } else {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push('Please enter a valid email address');
    }
    
    // Check for common security issues
    if (email.length > 254) {
      errors.push('Email address is too long');
    }
    
    // Prevent script injection
    if (/<script|javascript:|data:/i.test(email)) {
      errors.push('Email contains invalid characters');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Phone number validation
export const validatePhone = (phone: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!phone) {
    errors.push('Phone number is required');
  } else {
    // Remove all non-digit characters for validation
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Check if it's a valid Indian phone number
    if (cleanPhone.length < 10 || cleanPhone.length > 13) {
      errors.push('Please enter a valid phone number');
    }
    
    // Prevent script injection
    if (/<script|javascript:|data:/i.test(phone)) {
      errors.push('Phone number contains invalid characters');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Name validation
export const validateName = (name: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!name) {
    errors.push('Name is required');
  } else {
    if (name.length < 2) {
      errors.push('Name must be at least 2 characters long');
    }
    
    if (name.length > 100) {
      errors.push('Name is too long');
    }
    
    // Only allow letters, spaces, and common name characters
    const nameRegex = /^[a-zA-Z\s\-'\.]+$/;
    if (!nameRegex.test(name)) {
      errors.push('Name can only contain letters, spaces, hyphens, and apostrophes');
    }
    
    // Prevent script injection
    if (/<script|javascript:|data:/i.test(name)) {
      errors.push('Name contains invalid characters');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Password validation
export const validatePassword = (password: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!password) {
    errors.push('Password is required');
  } else {
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    
    if (password.length > 128) {
      errors.push('Password is too long');
    }
    
    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    
    // Check for at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    
    // Check for at least one number
    if (!/\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    
    // Check for at least one special character
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// OTP validation
export const validateOTP = (otp: string): ValidationResult => {
  const errors: string[] = [];
  
  if (!otp) {
    errors.push('OTP is required');
  } else {
    // OTP should be exactly 6 digits
    if (!/^\d{6}$/.test(otp)) {
      errors.push('OTP must be exactly 6 digits');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Sanitize string input to prevent XSS
export const sanitizeString = (input: string): string => {
  if (!input) return '';
  
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
};

// Rate limiting helper (client-side)
export class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  
  constructor(private maxAttempts: number = 5, private windowMs: number = 15 * 60 * 1000) {} // 5 attempts per 15 minutes
  
  canAttempt(key: string): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(key) || [];
    
    // Remove old attempts outside the window
    const validAttempts = attempts.filter(attempt => now - attempt < this.windowMs);
    
    if (validAttempts.length >= this.maxAttempts) {
      return false;
    }
    
    // Record this attempt
    validAttempts.push(now);
    this.attempts.set(key, validAttempts);
    
    return true;
  }
  
  getTimeUntilNextAttempt(key: string): number {
    const attempts = this.attempts.get(key) || [];
    if (attempts.length < this.maxAttempts) return 0;
    
    const oldestAttempt = Math.min(...attempts);
    const nextAttemptTime = oldestAttempt + this.windowMs;
    
    return Math.max(0, nextAttemptTime - Date.now());
  }
}

// Create global rate limiter instances
export const loginRateLimiter = new RateLimiter(5, 15 * 60 * 1000); // 5 login attempts per 15 minutes
export const otpRateLimiter = new RateLimiter(3, 5 * 60 * 1000); // 3 OTP attempts per 5 minutes
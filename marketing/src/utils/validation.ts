// Input validation and sanitization utilities for marketing site

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

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
export const otpRateLimiter = new RateLimiter(3, 5 * 60 * 1000); // 3 OTP attempts per 5 minutes
export const verifyRateLimiter = new RateLimiter(5, 10 * 60 * 1000); // 5 verify attempts per 10 minutes
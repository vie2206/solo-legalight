// Secure token and session management utilities

interface StorageItem {
  value: string;
  timestamp: number;
  expiresAt?: number;
}

class SecureStorage {
  private encryptionKey: string;
  
  constructor() {
    // Generate a unique encryption key for this session
    this.encryptionKey = this.generateSessionKey();
  }
  
  private generateSessionKey(): string {
    // Simple session-based key (not cryptographically secure, but better than plain storage)
    return btoa(Date.now().toString() + Math.random().toString()).slice(0, 16);
  }
  
  private encrypt(data: string): string {
    // Simple XOR encryption (not secure for production, but better than plain text)
    let encrypted = '';
    for (let i = 0; i < data.length; i++) {
      const keyChar = this.encryptionKey[i % this.encryptionKey.length];
      encrypted += String.fromCharCode(data.charCodeAt(i) ^ keyChar.charCodeAt(0));
    }
    return btoa(encrypted);
  }
  
  private decrypt(encryptedData: string): string {
    try {
      const data = atob(encryptedData);
      let decrypted = '';
      for (let i = 0; i < data.length; i++) {
        const keyChar = this.encryptionKey[i % this.encryptionKey.length];
        decrypted += String.fromCharCode(data.charCodeAt(i) ^ keyChar.charCodeAt(0));
      }
      return decrypted;
    } catch {
      return '';
    }
  }
  
  setItem(key: string, value: string, expirationMinutes?: number): void {
    try {
      const item: StorageItem = {
        value: this.encrypt(value),
        timestamp: Date.now(),
        expiresAt: expirationMinutes ? Date.now() + (expirationMinutes * 60 * 1000) : undefined
      };
      
      localStorage.setItem(`solo_${key}`, JSON.stringify(item));
    } catch (error) {
      console.error('Failed to store item securely:', error);
    }
  }
  
  getItem(key: string): string | null {
    try {
      const storedItem = localStorage.getItem(`solo_${key}`);
      if (!storedItem) return null;
      
      const item: StorageItem = JSON.parse(storedItem);
      
      // Check if item has expired
      if (item.expiresAt && Date.now() > item.expiresAt) {
        this.removeItem(key);
        return null;
      }
      
      return this.decrypt(item.value);
    } catch (error) {
      console.error('Failed to retrieve item securely:', error);
      return null;
    }
  }
  
  removeItem(key: string): void {
    localStorage.removeItem(`solo_${key}`);
  }
  
  clear(): void {
    // Remove only SOLO-related items
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('solo_')) {
        localStorage.removeItem(key);
      }
    });
  }
  
  // Session validation
  isSessionValid(): boolean {
    const token = this.getItem('auth_token');
    const userData = this.getItem('user_data');
    
    return !!(token && userData);
  }
  
  // Auto-cleanup expired items
  cleanupExpired(): void {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('solo_')) {
        try {
          const storedItem = localStorage.getItem(key);
          if (storedItem) {
            const item: StorageItem = JSON.parse(storedItem);
            if (item.expiresAt && Date.now() > item.expiresAt) {
              localStorage.removeItem(key);
            }
          }
        } catch {
          // Remove corrupted items
          localStorage.removeItem(key);
        }
      }
    });
  }
}

// Token validation utilities
export const validateJWTStructure = (token: string): boolean => {
  if (!token) return false;
  
  // Basic JWT structure validation (header.payload.signature)
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  
  try {
    // Validate base64 encoding of header and payload
    atob(parts[0]);
    atob(parts[1]);
    return true;
  } catch {
    return false;
  }
};

export const isTokenExpired = (token: string): boolean => {
  if (!validateJWTStructure(token)) return true;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000);
    
    return payload.exp && payload.exp < now;
  } catch {
    return true;
  }
};

// Create global secure storage instance
export const secureStorage = new SecureStorage();

// Initialize cleanup on page load
if (typeof window !== 'undefined') {
  secureStorage.cleanupExpired();
  
  // Clean up expired items every 5 minutes
  setInterval(() => {
    secureStorage.cleanupExpired();
  }, 5 * 60 * 1000);
}
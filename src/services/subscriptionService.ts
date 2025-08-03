import { SubscriptionTier } from '../types/subscription';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export interface SubscriptionPlan {
  id: string;
  tier: SubscriptionTier;
  name: string;
  tagline: string;
  monthly_price: number;
  quarterly_price: number;
  daily_cost: string;
  comparison: string;
  features: string[];
  limitations?: string[];
  is_popular: boolean;
  is_active: boolean;
}

export interface UserSubscription {
  id: string;
  subscription_tier: SubscriptionTier;
  billing_cycle: 'monthly' | 'quarterly';
  subscription_start_date: string;
  subscription_end_date: string;
  auto_renewal: boolean;
  payment_method?: string;
  next_billing_date: string;
}

export interface FeatureAccess {
  feature_name: string;
  access_level: 'none' | 'basic' | 'advanced' | 'premium';
  expires_at?: string;
}

export interface DailyLoginReward {
  streak: number;
  reward?: {
    type: string;
    value: number;
    message: string;
  };
  alreadyLogged: boolean;
}

class SubscriptionService {
  private getAuthHeaders() {
    const token = localStorage.getItem('auth_token');
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    };
  }

  async getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
    try {
      const response = await fetch(`${API_BASE}/api/subscription/plans`, {
        headers: this.getAuthHeaders(),
      });

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch subscription plans');
      }

      return data.data;
    } catch (error) {
      console.error('Error fetching subscription plans:', error);
      throw error;
    }
  }

  async getCurrentSubscription(userId: string): Promise<{
    subscription: UserSubscription;
    features: FeatureAccess[];
  }> {
    try {
      const response = await fetch(`${API_BASE}/api/subscription/current/${userId}`, {
        headers: this.getAuthHeaders(),
      });

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch subscription');
      }

      return data.data;
    } catch (error) {
      console.error('Error fetching current subscription:', error);
      throw error;
    }
  }

  async updateSubscription(
    userId: string, 
    tier: SubscriptionTier, 
    billingCycle: 'monthly' | 'quarterly',
    paymentMethod?: string
  ): Promise<UserSubscription> {
    try {
      const response = await fetch(`${API_BASE}/api/subscription/update`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({
          userId,
          tier,
          billingCycle,
          paymentMethod
        }),
      });

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to update subscription');
      }

      return data.data;
    } catch (error) {
      console.error('Error updating subscription:', error);
      throw error;
    }
  }

  async recordDailyLogin(userId: string): Promise<DailyLoginReward> {
    try {
      const response = await fetch(`${API_BASE}/api/subscription/daily-login`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to record daily login');
      }

      return {
        streak: data.streak,
        reward: data.reward,
        alreadyLogged: data.alreadyLogged
      };
    } catch (error) {
      console.error('Error recording daily login:', error);
      throw error;
    }
  }

  async getSubscriptionHistory(userId: string): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE}/api/subscription/history/${userId}`, {
        headers: this.getAuthHeaders(),
      });

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to fetch subscription history');
      }

      return data.data;
    } catch (error) {
      console.error('Error fetching subscription history:', error);
      throw error;
    }
  }

  // Check if user has access to a specific feature
  async hasFeatureAccess(userId: string, featureName: string, requiredLevel: string = 'basic'): Promise<boolean> {
    try {
      const { features } = await this.getCurrentSubscription(userId);
      const feature = features.find(f => f.feature_name === featureName);
      
      if (!feature) return false;

      const accessLevels = ['none', 'basic', 'advanced', 'premium'];
      const userLevel = accessLevels.indexOf(feature.access_level);
      const requiredLevelIndex = accessLevels.indexOf(requiredLevel);

      return userLevel >= requiredLevelIndex && userLevel > 0; // none = 0, so > 0 means has access
    } catch (error) {
      console.error('Error checking feature access:', error);
      return false;
    }
  }

  // Get feature access level for a specific feature
  async getFeatureAccessLevel(userId: string, featureName: string): Promise<string> {
    try {
      const { features } = await this.getCurrentSubscription(userId);
      const feature = features.find(f => f.feature_name === featureName);
      return feature?.access_level || 'none';
    } catch (error) {
      console.error('Error getting feature access level:', error);
      return 'none';
    }
  }
}

export const subscriptionService = new SubscriptionService();
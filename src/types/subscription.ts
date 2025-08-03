// Subscription tier types and interfaces

export type SubscriptionTier = 'free' | 'mini' | 'pro' | 'ultra';

export interface SubscriptionPlan {
  tier: SubscriptionTier;
  name: string;
  tagline: string;
  monthlyPrice: number;
  quarterlyPrice: number;
  dailyCost: string;
  comparison: string;
  features: string[];
  limitations?: string[];
  isPopular?: boolean;
}

export interface SubscriptionStatus {
  currentTier: SubscriptionTier;
  validUntil: Date;
  billingCycle: 'monthly' | 'quarterly';
  nextBillingDate: Date;
  autoRenewal: boolean;
  paymentMethod?: string;
}

export interface TierFeatures {
  // Physical Mock Tests
  monthlyMockTests: number;
  mockTestAnalysis: 'basic' | 'advanced';
  clatRankPrediction: 'basic' | 'advanced';
  
  // Study Features
  studyPlans: boolean;
  sectionalTests: 'basic' | 'complete';
  dailyChallenges: boolean;
  performanceAnalytics: 'basic' | 'advanced';
  
  // Advanced Features
  aiMockAnalysis: boolean;
  weeklyInsights: boolean;
  dailyReadingPractice: boolean;
  academicVocabularyQuizzes: boolean;
  advancedStudyReminders: boolean;
  
  // Premium Features
  aiSmartNotifications: boolean;
  personalizedAICoaching: boolean;
  moodTracking: boolean;
  parentsDashboard: boolean;
  socialFeatures: boolean;
  gkQuizzes: boolean;
  monthlyCounseling: boolean;
  prioritySupport: boolean;
  
  // Gaming Elements
  dailyLoginRewards: boolean;
  progressTracking: boolean;
  achievementBadges: boolean;
  studyStreak: boolean;
}

export const SUBSCRIPTION_PLANS: Record<SubscriptionTier, SubscriptionPlan> = {
  free: {
    tier: 'free',
    name: 'CLAT FREE',
    tagline: 'Start Your Journey',
    monthlyPrice: 0,
    quarterlyPrice: 0,
    dailyCost: '₹0/day',
    comparison: 'Free forever',
    features: [
      '1 mock test per month',
      'Basic analysis',
      'View leaderboards',
      'Study streak tracking'
    ],
    limitations: [
      'Limited mock tests',
      'Basic features only',
      'No AI analysis'
    ]
  },
  mini: {
    tier: 'mini',
    name: 'CLAT MINI',
    tagline: 'Start Your Journey',
    monthlyPrice: 299,
    quarterlyPrice: 799,
    dailyCost: '₹10/day',
    comparison: 'Less than a samosa',
    features: [
      '4 Physical Mock Tests delivered monthly',
      'Mock Test Analysis (DECODE)',
      'CLAT Rank Prediction',
      'Study Plans & Basic Sectional Tests',
      'Daily Challenges',
      'Basic Performance Analytics',
      'Daily check-in rewards'
    ]
  },
  pro: {
    tier: 'pro',
    name: 'CLAT PRO',
    tagline: 'Smart Work Begins Here',
    monthlyPrice: 499,
    quarterlyPrice: 1299,
    dailyCost: '₹17/day',
    comparison: 'Less than a coffee',
    features: [
      'Everything in MINI, plus:',
      'Advanced AI Mock Analysis (DECODE-TRACK-REFLECT)',
      'Advanced CLAT Rank Predictor with trends',
      'Weekly Insights Reports (Spotify-style)',
      'Complete Sectional Tests',
      'Daily Reading Practice + Dictionary',
      'Academic Vocabulary Quizzes',
      'Advanced Study Reminders',
      'Progress tracking dashboard'
    ],
    isPopular: true
  },
  ultra: {
    tier: 'ultra',
    name: 'CLAT ULTRA',
    tagline: 'Where Toppers Are Made',
    monthlyPrice: 799,
    quarterlyPrice: 1999,
    dailyCost: '₹27/day',
    comparison: 'Your investment in success',
    features: [
      'Everything in PRO, plus:',
      'AI Smart Notifications (Active Recall)',
      'Personalized AI Coaching (Full ADAPT cycle)',
      'Parents Dashboard',
      'Social Features & Study Groups',
      'Premium GK Question Bank',
      'Monthly 1-on-1 Counseling',
      'Mood & Psychological Tracking',
      'Priority Support',
      'Exclusive study group access'
    ]
  }
};

export const TIER_FEATURES: Record<SubscriptionTier, TierFeatures> = {
  free: {
    monthlyMockTests: 1,
    mockTestAnalysis: 'basic',
    clatRankPrediction: 'basic',
    studyPlans: false,
    sectionalTests: 'basic',
    dailyChallenges: false,
    performanceAnalytics: 'basic',
    aiMockAnalysis: false,
    weeklyInsights: false,
    dailyReadingPractice: false,
    academicVocabularyQuizzes: false,
    advancedStudyReminders: false,
    aiSmartNotifications: false,
    personalizedAICoaching: false,
    moodTracking: false,
    parentsDashboard: false,
    socialFeatures: false,
    gkQuizzes: false,
    monthlyCounseling: false,
    prioritySupport: false,
    dailyLoginRewards: false,
    progressTracking: true,
    achievementBadges: false,
    studyStreak: true
  },
  mini: {
    monthlyMockTests: 4,
    mockTestAnalysis: 'basic',
    clatRankPrediction: 'basic',
    studyPlans: true,
    sectionalTests: 'basic',
    dailyChallenges: true,
    performanceAnalytics: 'basic',
    aiMockAnalysis: false,
    weeklyInsights: false,
    dailyReadingPractice: false,
    academicVocabularyQuizzes: false,
    advancedStudyReminders: false,
    aiSmartNotifications: false,
    personalizedAICoaching: false,
    moodTracking: false,
    parentsDashboard: false,
    socialFeatures: false,
    gkQuizzes: false,
    monthlyCounseling: false,
    prioritySupport: false,
    dailyLoginRewards: true,
    progressTracking: true,
    achievementBadges: false,
    studyStreak: true
  },
  pro: {
    monthlyMockTests: 4,
    mockTestAnalysis: 'advanced',
    clatRankPrediction: 'advanced',
    studyPlans: true,
    sectionalTests: 'complete',
    dailyChallenges: true,
    performanceAnalytics: 'advanced',
    aiMockAnalysis: true,
    weeklyInsights: true,
    dailyReadingPractice: true,
    academicVocabularyQuizzes: true,
    advancedStudyReminders: true,
    aiSmartNotifications: false,
    personalizedAICoaching: false,
    moodTracking: false,
    parentsDashboard: false,
    socialFeatures: false,
    gkQuizzes: false,
    monthlyCounseling: false,
    prioritySupport: false,
    dailyLoginRewards: true,
    progressTracking: true,
    achievementBadges: true,
    studyStreak: true
  },
  ultra: {
    monthlyMockTests: 4,
    mockTestAnalysis: 'advanced',
    clatRankPrediction: 'advanced',
    studyPlans: true,
    sectionalTests: 'complete',
    dailyChallenges: true,
    performanceAnalytics: 'advanced',
    aiMockAnalysis: true,
    weeklyInsights: true,
    dailyReadingPractice: true,
    academicVocabularyQuizzes: true,
    advancedStudyReminders: true,
    aiSmartNotifications: true,
    personalizedAICoaching: true,
    moodTracking: true,
    parentsDashboard: true,
    socialFeatures: true,
    gkQuizzes: true,
    monthlyCounseling: true,
    prioritySupport: true,
    dailyLoginRewards: true,
    progressTracking: true,
    achievementBadges: true,
    studyStreak: true
  }
};
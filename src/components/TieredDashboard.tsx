import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Target, TrendingUp, Calendar, Clock, Award, 
  Brain, Users, BarChart3, Lock, Sparkles, Bell,
  ChevronRight, Trophy, Zap, Coffee, Star, Check
} from 'lucide-react';
import { User } from '../types';
import { SubscriptionTier } from '../types/subscription';
import { subscriptionService, FeatureAccess } from '../services/subscriptionService';

interface TieredDashboardProps {
  user: User;
}

const TieredDashboard: React.FC<TieredDashboardProps> = ({ user }) => {
  const [dailyStreak, setDailyStreak] = useState(user.study_streak || 0);
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const [features, setFeatures] = useState<FeatureAccess[]>([]);
  const [loading, setLoading] = useState(true);
  const userTier = user.subscription_tier || 'free';

  // Load user's feature access
  useEffect(() => {
    const loadUserFeatures = async () => {
      try {
        setLoading(true);
        const { features: userFeatures } = await subscriptionService.getCurrentSubscription(user.id);
        setFeatures(userFeatures);
      } catch (error) {
        console.error('Failed to load user features:', error);
        // Fallback to default features based on tier
        setFeatures([]);
      } finally {
        setLoading(false);
      }
    };

    loadUserFeatures();
  }, [user.id]);

  // Helper function to check feature access
  const hasFeature = (featureName: string, requiredLevel: string = 'basic'): boolean => {
    const feature = features.find(f => f.feature_name === featureName);
    if (!feature) return false;

    const accessLevels = ['none', 'basic', 'advanced', 'premium'];
    const userLevel = accessLevels.indexOf(feature.access_level);
    const requiredLevelIndex = accessLevels.indexOf(requiredLevel);

    return userLevel >= requiredLevelIndex && userLevel > 0;
  };

  // Daily login reward check
  useEffect(() => {
    const checkDailyLogin = async () => {
      if (!hasFeature('daily_login_rewards') || loading) return;

      try {
        const result = await subscriptionService.recordDailyLogin(user.id);
        setDailyStreak(result.streak);
        
        if (!result.alreadyLogged && result.reward) {
          // Show reward notification
          console.log('Daily reward:', result.reward.message);
          // You could show a toast notification here
        }
      } catch (error) {
        console.error('Failed to record daily login:', error);
      }
    };

    checkDailyLogin();
  }, [user.id, loading, hasFeature]);

  const MockTestsCard = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <BookOpen className="w-6 h-6 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold">Mock Tests</h3>
        </div>
        <span className="text-sm text-gray-500">
          {userTier === 'free' ? '1' : '4'} available/month
        </span>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-sm">Next Mock Test</span>
          <span className="text-sm font-medium">March 15, 2024</span>
        </div>
        
        {hasFeature('ai_mock_analysis', 'advanced') ? (
          <div className="flex items-center p-3 bg-purple-50 rounded-lg">
            <Sparkles className="w-4 h-4 text-purple-600 mr-2" />
            <span className="text-sm text-purple-700">Advanced AI Analysis Available</span>
          </div>
        ) : (
          <div className="flex items-center p-3 bg-gray-100 rounded-lg cursor-pointer"
               onClick={() => setShowUpgradePrompt(true)}>
            <Lock className="w-4 h-4 text-gray-400 mr-2" />
            <span className="text-sm text-gray-600">Upgrade for AI Analysis</span>
          </div>
        )}
      </div>
    </div>
  );

  const RankPredictorCard = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Trophy className="w-6 h-6 text-amber-600 mr-2" />
          <h3 className="text-lg font-semibold">CLAT Rank Predictor</h3>
        </div>
        {hasFeature('rank_prediction', 'advanced') && (
          <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
            Advanced
          </span>
        )}
      </div>
      
      <div className="text-center py-4">
        <div className="text-3xl font-bold text-amber-600">2,451</div>
        <div className="text-sm text-gray-600 mt-1">Predicted Rank</div>
      </div>
      
      {hasFeature('rank_prediction', 'advanced') ? (
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Confidence Range</span>
            <span className="font-medium">2,200 - 2,700</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Percentile</span>
            <span className="font-medium">95.4%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div className="bg-amber-600 h-2 rounded-full" style={{ width: '95.4%' }}></div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setShowUpgradePrompt(true)}
          className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700"
        >
          Upgrade for detailed predictions →
        </button>
      )}
    </div>
  );

  const DailyStreakCard = () => (
    <div className="bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl shadow-lg p-6 text-white">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Zap className="w-6 h-6 mr-2" />
          <h3 className="text-lg font-semibold">Study Streak</h3>
        </div>
        <Star className="w-5 h-5" />
      </div>
      
      <div className="text-center">
        <div className="text-4xl font-bold">{dailyStreak}</div>
        <div className="text-sm opacity-90 mt-1">days in a row!</div>
      </div>
      
      {hasFeature('daily_login_rewards') && (
        <div className="mt-4 bg-white/20 rounded-lg p-3">
          <div className="text-xs font-medium">Daily Reward Unlocked!</div>
          <div className="text-xs opacity-90 mt-1">+10 Analysis Credits</div>
        </div>
      )}
    </div>
  );

  const WeeklyInsightsCard = () => {
    if (!hasFeature('weekly_insights')) {
      return (
        <div className="bg-gray-100 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gray-900/10 backdrop-blur-sm flex items-center justify-center">
            <button 
              onClick={() => setShowUpgradePrompt(true)}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Lock className="w-4 h-4 inline mr-2" />
              Unlock Weekly Insights
            </button>
          </div>
          <div className="opacity-50">
            <h3 className="text-lg font-semibold mb-2">Weekly Insights</h3>
            <p className="text-sm text-gray-600">Get Spotify-style weekly reports</p>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Weekly Insights</h3>
          <BarChart3 className="w-5 h-5" />
        </div>
        <div className="space-y-3">
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-xs opacity-90">Most Improved</div>
            <div className="font-medium">Legal Reasoning (+15%)</div>
          </div>
          <div className="bg-white/20 rounded-lg p-3">
            <div className="text-xs opacity-90">Focus Area</div>
            <div className="font-medium">Quantitative Techniques</div>
          </div>
        </div>
      </div>
    );
  };

  const StudyPlanCard = () => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Calendar className="w-6 h-6 text-green-600 mr-2" />
          <h3 className="text-lg font-semibold">Today's Study Plan</h3>
        </div>
        {hasFeature('ai_smart_notifications') && (
          <Bell className="w-5 h-5 text-green-600" />
        )}
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center p-3 bg-green-50 rounded-lg">
          <Clock className="w-4 h-4 text-green-600 mr-3" />
          <div className="flex-1">
            <div className="text-sm font-medium">Legal Reasoning</div>
            <div className="text-xs text-gray-600">2 hours • Priority</div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-400" />
        </div>
        
        {hasFeature('personalized_ai_coaching') && (
          <div className="bg-purple-50 rounded-lg p-3">
            <div className="flex items-center">
              <Brain className="w-4 h-4 text-purple-600 mr-2" />
              <span className="text-sm text-purple-700">AI Coach: Focus on analogies today</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const SocialFeaturesCard = () => {
    if (!hasFeature('social_features')) {
      return null;
    }

    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Users className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold">Study Groups</h3>
          </div>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
            ULTRA
          </span>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div>
              <div className="text-sm font-medium">Top Scorers Group</div>
              <div className="text-xs text-gray-600">45 members • Active now</div>
            </div>
            <button className="text-blue-600 text-sm hover:underline">Join</button>
          </div>
        </div>
      </div>
    );
  };

  // Upgrade Prompt Modal
  const UpgradePrompt = () => {
    if (!showUpgradePrompt) return null;

    const getUpgradeTier = (): SubscriptionTier => {
      switch (userTier) {
        case 'free': return 'mini';
        case 'mini': return 'pro';
        case 'pro': return 'ultra';
        default: return 'ultra';
      }
    };

    const upgradeTier = getUpgradeTier();
    const upgradeFeatures: Record<SubscriptionTier, string[]> = {
      free: ['1 Mock Test per Month', 'Basic Analysis', 'Study Streak'],
      mini: ['4 Physical Mock Tests', 'Daily Challenges', 'Performance Analytics'],
      pro: ['Advanced AI Analysis', 'Weekly Insights', 'Daily Reading Practice'],
      ultra: ['AI Smart Notifications', 'Parents Dashboard', '1-on-1 Counseling']
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
          <button 
            onClick={() => setShowUpgradePrompt(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
          
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Unlock Premium Features</h3>
            <p className="text-gray-600">Upgrade to CLAT {upgradeTier.toUpperCase()} and accelerate your preparation</p>
          </div>
          
          <div className="space-y-3 mb-6">
            {upgradeFeatures[upgradeTier].map((feature, idx) => (
              <div key={idx} className="flex items-center">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <Check className="w-3 h-3 text-green-600" />
                </div>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setShowUpgradePrompt(false)}
              className="flex-1 py-3 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
            >
              Maybe Later
            </button>
            <button
              onClick={() => {
                // Navigate to subscription page
                window.location.href = '/subscription';
              }}
              className="flex-1 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700"
            >
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user.name}!</h1>
            <p className="text-gray-600 mt-1">
              You're on the <span className="font-semibold">CLAT {userTier.toUpperCase()}</span> plan
            </p>
          </div>
          <button
            onClick={() => window.location.href = '/subscription'}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            View Plans
          </button>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MockTestsCard />
        <RankPredictorCard />
        <DailyStreakCard />
        <StudyPlanCard />
        <WeeklyInsightsCard />
        <SocialFeaturesCard />
      </div>

      {/* Upgrade Prompt Modal */}
      <UpgradePrompt />
    </div>
  );
};

export default TieredDashboard;
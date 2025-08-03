import React, { useState } from 'react';
import { 
  LayoutDashboard, TrendingUp, Users, Zap, Target, Star,
  BarChart3, Calendar, MessageSquare, Bell, Settings, Award
} from 'lucide-react';
import { User as UserType } from '../../types';
import { SoloHeader } from '../shared/SoloHeader';
import { SoloNavigation, NavigationTab } from '../shared/SoloNavigation';
import { SoloCard } from '../shared/SoloCard';
import { SoloBentoGrid } from '../shared/SoloBentoGrid';
import { SoloEducationIcon, MedalIcon, TrophyIcon, LightBulbIcon } from '../shared/SoloEducationIcons';

interface SoloAdvancedDashboardProps {
  user: UserType;
  onLogout: () => void;
  userType: 'admin' | 'student' | 'parent' | 'educator' | 'manager';
}

export const SoloAdvancedDashboard: React.FC<SoloAdvancedDashboardProps> = ({ 
  user, 
  onLogout, 
  userType 
}) => {
  const [activeTab, setActiveTab] = useState('overview');

  const navigationTabs: NavigationTab[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const bentoItems = [
    {
      id: 'performance',
      title: 'Performance Overview',
      description: 'Your overall progress and achievements',
      size: 'large' as const,
      color: 'primary' as const,
      icon: TrendingUp,
      children: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold">87%</div>
              <div className="text-sm opacity-80">Overall Score</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">142</div>
              <div className="text-sm opacity-80">Tasks Done</div>
            </div>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div className="bg-white h-2 rounded-full" style={{ width: '87%' }}></div>
          </div>
        </div>
      )
    },
    {
      id: 'achievements',
      title: 'Latest Achievement',
      description: 'Study streak champion',
      size: 'medium' as const,
      color: 'warning' as const,
      icon: Star,
      children: (
        <div className="flex items-center justify-center h-full">
          <TrophyIcon size="large" />
        </div>
      )
    },
    {
      id: 'quick-actions',
      title: 'Quick Actions',
      size: 'medium' as const,
      children: (
        <div className="space-y-3">
          <button className="w-full p-3 bg-solo-primary-light text-solo-primary rounded-xl font-medium">
            Start Study Session
          </button>
          <button className="w-full p-3 bg-solo-success-light text-solo-success rounded-xl font-medium">
            Take Mock Test
          </button>
        </div>
      )
    },
    {
      id: 'stats-1',
      title: 'Study Time',
      size: 'small' as const,
      color: 'success' as const,
      children: (
        <div className="text-center">
          <div className="text-2xl font-bold">12.5h</div>
          <div className="text-sm opacity-80">This Week</div>
        </div>
      )
    },
    {
      id: 'stats-2',
      title: 'Tests Passed',
      size: 'small' as const,
      color: 'info' as const,
      children: (
        <div className="text-center">
          <div className="text-2xl font-bold">23</div>
          <div className="text-sm opacity-80">Total</div>
        </div>
      )
    },
    {
      id: 'learning-streak',
      title: 'Learning Streak',
      description: '15 days and counting!',
      size: 'wide' as const,
      color: 'secondary' as const,
      icon: Zap,
      children: (
        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold">15</div>
            <div className="text-sm opacity-80">Days in a row</div>
          </div>
          <div className="flex gap-2">
            {[...Array(7)].map((_, i) => (
              <div 
                key={i} 
                className={`w-3 h-3 rounded-full ${i < 5 ? 'bg-white' : 'bg-white/30'}`}
              />
            ))}
          </div>
        </div>
      )
    },
    {
      id: 'next-goal',
      title: 'Next Goal',
      description: 'Complete 5 more lessons',
      size: 'tall' as const,
      icon: Target,
      children: (
        <div className="space-y-4">
          <LightBulbIcon size="large" />
          <div className="w-full bg-solo-gray-200 rounded-full h-2">
            <div className="bg-solo-primary h-2 rounded-full" style={{ width: '60%' }}></div>
          </div>
          <div className="text-sm text-solo-gray-600">3 of 5 lessons done</div>
        </div>
      )
    },
    {
      id: 'recent-activity',
      title: 'Recent Activity',
      size: 'medium' as const,
      children: (
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <MedalIcon size="small" />
            <div>
              <div className="text-sm font-medium">Completed Constitutional Law</div>
              <div className="text-xs text-solo-gray-500">2 hours ago</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <SoloEducationIcon name="book" size="small" />
            <div>
              <div className="text-sm font-medium">Started Legal Reasoning</div>
              <div className="text-xs text-solo-gray-500">5 hours ago</div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Hero Section with Chroma Gradient */}
      <div className="chroma-education-1 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold font-jakarta mb-2">
            Welcome back, {user.name}! ✨
          </h1>
          <p className="text-white/90 text-lg mb-6">
            Ready to continue your learning journey with SOLO by Legalight?
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5" />
                <span className="font-medium">Progress</span>
              </div>
              <div className="text-2xl font-bold">87%</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5" />
                <span className="font-medium">Streak</span>
              </div>
              <div className="text-2xl font-bold">15 days</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                <Award className="h-5 w-5" />
                <span className="font-medium">Achievements</span>
              </div>
              <div className="text-2xl font-bold">23</div>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-4 right-4 opacity-20">
          <TrophyIcon size="xl" />
        </div>
        <div className="absolute bottom-4 right-8 opacity-10">
          <LightBulbIcon size="large" />
        </div>
      </div>

      {/* Advanced Bento Grid */}
      <SoloBentoGrid items={bentoItems} />

      {/* Additional Enhancement Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SoloCard
          title="Learning Path"
          subtitle="Your personalized education journey"
          className="chroma-card"
        >
          <div className="space-y-4">
            {[
              { subject: 'Constitutional Law', progress: 85, color: 'bg-solo-primary' },
              { subject: 'Legal Reasoning', progress: 72, color: 'bg-solo-secondary' },
              { subject: 'Current Affairs', progress: 91, color: 'bg-solo-success' },
              { subject: 'English Language', progress: 67, color: 'bg-solo-warning' }
            ].map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{item.subject}</span>
                  <span className="text-sm text-solo-gray-500">{item.progress}%</span>
                </div>
                <div className="w-full bg-solo-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${item.color}`}
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </SoloCard>

        <SoloCard
          title="Upcoming Events"
          subtitle="Your schedule for the week"
          className="chroma-card"
        >
          <div className="space-y-4">
            {[
              { title: 'CLAT Mock Test #16', time: 'Tomorrow, 10:00 AM', type: 'test' },
              { title: 'Legal Reasoning Workshop', time: 'Friday, 2:00 PM', type: 'workshop' },
              { title: 'Study Group Discussion', time: 'Saturday, 4:00 PM', type: 'group' }
            ].map((event, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-solo-gray-50 rounded-xl">
                <div className={`w-3 h-3 rounded-full ${
                  event.type === 'test' ? 'bg-solo-error' :
                  event.type === 'workshop' ? 'bg-solo-primary' :
                  'bg-solo-success'
                }`}></div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{event.title}</div>
                  <div className="text-xs text-solo-gray-500">{event.time}</div>
                </div>
              </div>
            ))}
          </div>
        </SoloCard>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-solo-gray-50 dark:bg-solo-dark">
      <SoloHeader user={user} onLogout={onLogout} />
      <SoloNavigation 
        tabs={navigationTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
      
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'overview' ? renderOverview() : (
            <SoloCard title={navigationTabs.find(tab => tab.id === activeTab)?.label || 'Feature'}>
              <div className="text-center py-16 text-solo-gray-500">
                <div className="w-16 h-16 mx-auto mb-4 bg-solo-primary-light rounded-2xl flex items-center justify-center">
                  <Star className="h-8 w-8 text-solo-primary" />
                </div>
                <p className="text-lg font-semibold mb-2 chroma-text-education">
                  Enhanced Feature Coming Soon
                </p>
                <p>This premium feature is being developed with our complete design system</p>
              </div>
            </SoloCard>
          )}
        </div>
      </main>
    </div>
  );
};
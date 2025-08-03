import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, BarChart3, CreditCard, MessageSquare, Calendar,
  Settings, Bell, Star, TrendingUp, Clock, Award, Target, BookOpen,
  DollarSign, Phone, Mail, Eye, Download, Filter, Search, Plus,
  CheckCircle, AlertCircle, User, GraduationCap, Brain, Trophy
} from 'lucide-react';
import { User as UserType } from '../types';
import { SoloHeader } from './shared/SoloHeader';
import { SoloNavigation, NavigationTab } from './shared/SoloNavigation';
import { SoloCard, SoloStatCard } from './shared/SoloCard';
import { SoloButton } from './shared/SoloButton';

interface SoloParentDashboardProps {
  user: UserType;
  onLogout: () => void;
}

interface Child {
  id: string;
  name: string;
  age: number;
  class: string;
  school: string;
  profilePicture?: string;
  overallScore: number;
  studyStreak: number;
  weeklyStudyTime: number;
  recentActivity: string;
  nextTest: string;
  strengths: string[];
  improvements: string[];
}

interface ParentStats {
  totalChildren: number;
  totalSpent: number;
  avgPerformance: number;
  activeSubscriptions: number;
  monthlyGoals: number;
  achievedGoals: number;
  totalStudyHours: number;
  pendingPayments: number;
}

const SoloParentDashboard: React.FC<SoloParentDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [stats, setStats] = useState<ParentStats>({
    totalChildren: 2,
    totalSpent: 24500,
    avgPerformance: 78.5,
    activeSubscriptions: 2,
    monthlyGoals: 8,
    achievedGoals: 6,
    totalStudyHours: 156,
    pendingPayments: 0
  });

  const [children] = useState<Child[]>([
    {
      id: '1',
      name: 'Aadhya Sharma',
      age: 17,
      class: '12th Grade',
      school: 'Delhi Public School',
      overallScore: 82,
      studyStreak: 12,
      weeklyStudyTime: 25,
      recentActivity: 'Completed Constitutional Law Mock Test',
      nextTest: 'CLAT 2024 Mock Test #16 - Tomorrow',
      strengths: ['Constitutional Law', 'Legal Reasoning', 'Current Affairs'],
      improvements: ['Quantitative Techniques', 'English Comprehension']
    },
    {
      id: '2',
      name: 'Arjun Sharma',
      age: 15,
      class: '10th Grade',
      school: 'Ryan International School',
      overallScore: 75,
      studyStreak: 8,
      weeklyStudyTime: 18,
      recentActivity: 'Started Legal Aptitude Course',
      nextTest: 'Foundation Legal Test - Friday',
      strengths: ['General Knowledge', 'Critical Thinking'],
      improvements: ['Mathematics', 'English Grammar']
    }
  ]);

  const navigationTabs: NavigationTab[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'children', label: 'My Children', icon: Users, badge: children.length },
    { id: 'performance', label: 'Performance', icon: BarChart3 },
    { id: 'schedule', label: 'Study Schedule', icon: Calendar },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'communication', label: 'Communication', icon: MessageSquare },
    { id: 'reports', label: 'Reports', icon: Download },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: 3 },
    { id: 'support', label: 'Support', icon: Phone },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-solo-3 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold font-jakarta mb-2">
            Welcome, {user.name}! 👨‍👩‍👧‍👦
          </h1>
          <p className="text-white/90 text-lg mb-6">
            Track your children's progress and support their academic journey
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5" />
                <span className="font-medium">Active Children</span>
              </div>
              <div className="text-2xl font-bold">{stats.totalChildren}</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-5 w-5" />
                <span className="font-medium">Avg Performance</span>
              </div>
              <div className="text-2xl font-bold">{stats.avgPerformance}%</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="h-5 w-5" />
                <span className="font-medium">Goals Achieved</span>
              </div>
              <div className="text-2xl font-bold">{stats.achievedGoals}/{stats.monthlyGoals}</div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SoloStatCard
          title="Total Investment"
          value={`₹${(stats.totalSpent / 1000).toFixed(1)}K`}
          change={{ value: 8.5, type: 'increase' }}
          icon={DollarSign}
          color="warning"
        />
        <SoloStatCard
          title="Study Hours"
          value={`${stats.totalStudyHours}h`}
          change={{ value: 12.3, type: 'increase' }}
          icon={Clock}
          color="primary"
        />
        <SoloStatCard
          title="Active Plans"
          value={stats.activeSubscriptions.toString()}
          icon={CheckCircle}
          color="success"
        />
        <SoloStatCard
          title="Pending Payments"
          value={stats.pendingPayments.toString()}
          icon={AlertCircle}
          color="error"
        />
      </div>

      {/* Children Overview */}
      <SoloCard
        title="Children's Progress"
        subtitle="Real-time academic performance tracking"
        action={
          <SoloButton variant="ghost" size="small" onClick={() => setActiveTab('children')}>
            View Details
          </SoloButton>
        }
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {children.map((child) => (
            <div key={child.id} className="p-6 border border-solo-gray-200 rounded-2xl hover:shadow-lg transition-all group">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-solo-2 rounded-2xl flex items-center justify-center text-white text-xl font-bold">
                    {child.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-solo-dark">{child.name}</h3>
                    <p className="text-sm text-solo-gray-500">{child.age} years • {child.class}</p>
                    <p className="text-xs text-solo-gray-400">{child.school}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-solo-primary">{child.overallScore}%</div>
                  <div className="text-xs text-solo-gray-500">Overall Score</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-lg font-semibold text-solo-success">{child.studyStreak}</div>
                  <div className="text-xs text-solo-gray-500">Day Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-solo-warning">{child.weeklyStudyTime}h</div>
                  <div className="text-xs text-solo-gray-500">This Week</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold text-solo-info">{child.strengths.length}</div>
                  <div className="text-xs text-solo-gray-500">Strengths</div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-solo-success" />
                  <span className="text-solo-gray-700">{child.recentActivity}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-solo-warning" />
                  <span className="text-solo-gray-700">{child.nextTest}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <SoloButton size="small" fullWidth icon={Eye}>
                  View Details
                </SoloButton>
                <SoloButton variant="ghost" size="small" icon={MessageSquare}>
                  Contact
                </SoloButton>
              </div>
            </div>
          ))}
        </div>
      </SoloCard>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Quick Actions */}
        <SoloCard
          title="Quick Actions"
          subtitle="Frequently used parent tools"
          icon={Target}
          iconColor="bg-solo-primary-light text-solo-primary"
        >
          <div className="space-y-3">
            <SoloButton variant="primary" size="small" fullWidth icon={CreditCard}>
              Make Payment
            </SoloButton>
            <SoloButton variant="ghost" size="small" fullWidth icon={Calendar}>
              Schedule Study Session
            </SoloButton>
            <SoloButton variant="ghost" size="small" fullWidth icon={Download}>
              Download Reports
            </SoloButton>
            <SoloButton variant="ghost" size="small" fullWidth icon={Phone}>
              Contact Support
            </SoloButton>
          </div>
        </SoloCard>

        {/* Recent Notifications */}
        <SoloCard
          title="Recent Updates"
          subtitle="Latest news about your children"
          icon={Bell}
          iconColor="bg-solo-warning-light text-solo-warning"
          action={
            <SoloButton variant="ghost" size="small" onClick={() => setActiveTab('notifications')}>
              View All
            </SoloButton>
          }
        >
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-solo-success rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Aadhya completed mock test</p>
                <p className="text-xs text-solo-gray-500">Scored 82% in CLAT Mock #15 - 2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-solo-primary rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Payment reminder</p>
                <p className="text-xs text-solo-gray-500">Monthly subscription due in 3 days</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-solo-warning rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">New study plan available</p>
                <p className="text-xs text-solo-gray-500">Arjun's updated plan for next month</p>
              </div>
            </div>
          </div>
        </SoloCard>
      </div>
    </div>
  );

  const renderChildren = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-solo-dark">My Children</h2>
          <p className="text-solo-gray-600">Monitor and support their academic journey</p>
        </div>
        <SoloButton icon={Plus}>Add Child</SoloButton>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {children.map((child) => (
          <SoloCard key={child.id} className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Child Info */}
              <div className="lg:col-span-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 bg-gradient-solo-2 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                    {child.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-solo-dark">{child.name}</h3>
                    <p className="text-solo-gray-600">{child.age} years old</p>
                    <p className="text-sm text-solo-gray-500">{child.class} • {child.school}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-solo-gray-700">Overall Score</span>
                    <span className="text-2xl font-bold text-solo-primary">{child.overallScore}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-solo-gray-700">Study Streak</span>
                    <span className="text-lg font-semibold text-solo-success">{child.studyStreak} days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-solo-gray-700">Weekly Hours</span>
                    <span className="text-lg font-semibold text-solo-warning">{child.weeklyStudyTime}h</span>
                  </div>
                </div>
              </div>

              {/* Performance Details */}
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Strengths */}
                  <div>
                    <h4 className="font-semibold text-solo-dark mb-3 flex items-center gap-2">
                      <Star className="h-5 w-5 text-solo-success" />
                      Strengths
                    </h4>
                    <div className="space-y-2">
                      {child.strengths.map((strength, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-solo-success rounded-full"></div>
                          <span className="text-sm text-solo-gray-700">{strength}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Areas for Improvement */}
                  <div>
                    <h4 className="font-semibold text-solo-dark mb-3 flex items-center gap-2">
                      <Target className="h-5 w-5 text-solo-warning" />
                      Areas to Focus
                    </h4>
                    <div className="space-y-2">
                      {child.improvements.map((improvement, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-solo-warning rounded-full"></div>
                          <span className="text-sm text-solo-gray-700">{improvement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-solo-gray-50 rounded-xl">
                  <h4 className="font-semibold text-solo-dark mb-2">Recent Activity</h4>
                  <p className="text-sm text-solo-gray-700 mb-2">{child.recentActivity}</p>
                  <p className="text-sm text-solo-gray-600">
                    <span className="font-medium">Next Test:</span> {child.nextTest}
                  </p>
                </div>

                <div className="flex gap-3 mt-6">
                  <SoloButton icon={BarChart3}>View Analytics</SoloButton>
                  <SoloButton variant="ghost" icon={Calendar}>Schedule Study</SoloButton>
                  <SoloButton variant="ghost" icon={MessageSquare}>Message Tutor</SoloButton>
                </div>
              </div>
            </div>
          </SoloCard>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'children':
        return renderChildren();
      default:
        return (
          <SoloCard title={navigationTabs.find(tab => tab.id === activeTab)?.label || 'Feature'}>
            <div className="text-center py-16 text-solo-gray-500">
              <div className="w-16 h-16 mx-auto mb-4 bg-solo-secondary-light rounded-2xl flex items-center justify-center">
                <Users className="h-8 w-8 text-solo-secondary" />
              </div>
              <p className="text-lg font-semibold mb-2">Coming Soon</p>
              <p>This feature is being developed with our new SOLO design system</p>
            </div>
          </SoloCard>
        );
    }
  };

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
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default SoloParentDashboard;
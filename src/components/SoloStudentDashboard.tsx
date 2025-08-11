import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, BookOpen, FileText, Calendar, Trophy, BarChart3, 
  Target, Clock, Brain, Zap, Play, Award, TrendingUp, Users, 
  CheckCircle, Star, Flame, Timer, BookmarkPlus, MessageCircle,
  GraduationCap, Lightbulb, PieChart, Activity, User
} from 'lucide-react';
import { User as UserType } from '../types';
import { SoloHeader } from './shared/SoloHeader';
import { SoloNavigation, NavigationTab } from './shared/SoloNavigation';
import { SoloCard, SoloStatCard } from './shared/SoloCard';
import { SoloButton } from './shared/SoloButton';

interface SoloStudentDashboardProps {
  user: UserType;
  onLogout: () => void;
  onNavigate?: (view: string) => void;
}

interface StudentStats {
  studyStreak: number;
  totalStudyTime: number;
  testsCompleted: number;
  averageScore: number;
  subjectsInProgress: number;
  achievementsUnlocked: number;
  todayStudyTime: number;
  weeklyGoalProgress: number;
}

interface Subject {
  id: string;
  name: string;
  progress: number;
  color: string;
  totalLessons: number;
  completedLessons: number;
  nextLesson: string;
}

interface MockTest {
  id: string;
  title: string;
  duration: number;
  questions: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  completed: boolean;
  score?: number;
  timeSpent?: number;
  completedAt?: string;
}

const SoloStudentDashboard: React.FC<SoloStudentDashboardProps> = ({ user, onLogout, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [stats, setStats] = useState<StudentStats>({
    studyStreak: 15,
    totalStudyTime: 1247,
    testsCompleted: 23,
    averageScore: 76.5,
    subjectsInProgress: 6,
    achievementsUnlocked: 12,
    todayStudyTime: 127,
    weeklyGoalProgress: 68
  });

  const [subjects] = useState<Subject[]>([
    { id: '1', name: 'Constitutional Law', progress: 78, color: 'bg-solo-primary', totalLessons: 24, completedLessons: 19, nextLesson: 'Fundamental Rights - Part II' },
    { id: '2', name: 'Legal Reasoning', progress: 65, color: 'bg-solo-secondary', totalLessons: 20, completedLessons: 13, nextLesson: 'Logical Deduction Methods' },
    { id: '3', name: 'Current Affairs', progress: 82, color: 'bg-solo-success', totalLessons: 30, completedLessons: 25, nextLesson: 'Recent Supreme Court Judgments' },
    { id: '4', name: 'English Language', progress: 71, color: 'bg-solo-warning', totalLessons: 18, completedLessons: 13, nextLesson: 'Reading Comprehension Advanced' },
    { id: '5', name: 'Quantitative Techniques', progress: 59, color: 'bg-solo-info', totalLessons: 22, completedLessons: 13, nextLesson: 'Data Interpretation - Graphs' },
    { id: '6', name: 'General Knowledge', progress: 88, color: 'bg-solo-error', totalLessons: 25, completedLessons: 22, nextLesson: 'Indian History - Medieval Period' }
  ]);

  const [recentTests] = useState<MockTest[]>([
    { id: '1', title: 'CLAT 2024 Mock Test #15', duration: 120, questions: 150, difficulty: 'Hard', completed: true, score: 78, timeSpent: 118, completedAt: '2 hours ago' },
    { id: '2', title: 'Constitutional Law Practice Test', duration: 60, questions: 75, difficulty: 'Medium', completed: true, score: 82, timeSpent: 55, completedAt: '1 day ago' },
    { id: '3', title: 'Legal Reasoning Assessment', duration: 45, questions: 60, difficulty: 'Medium', completed: true, score: 71, timeSpent: 43, completedAt: '2 days ago' },
    { id: '4', title: 'Current Affairs Weekly Test', duration: 30, questions: 40, difficulty: 'Easy', completed: false }
  ]);

  const navigationTabs: NavigationTab[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'subjects', label: 'Subjects', icon: BookOpen, badge: subjects.length },
    { id: 'mock-tests', label: 'Mock Tests', icon: FileText, badge: 4 },
    { id: 'study-plan', label: 'Study Plan', icon: Calendar },
    { id: 'achievements', label: 'Achievements', icon: Trophy, badge: stats.achievementsUnlocked },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'practice', label: 'Practice', icon: Target },
    { id: 'progress', label: 'Progress', icon: TrendingUp }
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-solo-2 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Flame className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-jakarta">
                {stats.studyStreak} Day Study Streak! 🔥
              </h1>
              <p className="text-white/90">
                Keep going, {user.name}! You're doing amazing.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Timer className="h-5 w-5" />
                <span className="font-medium">Today's Study</span>
              </div>
              <div className="text-2xl font-bold">{stats.todayStudyTime} min</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-5 w-5" />
                <span className="font-medium">Weekly Goal</span>
              </div>
              <div className="text-2xl font-bold">{stats.weeklyGoalProgress}%</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="h-5 w-5" />
                <span className="font-medium">Latest Score</span>
              </div>
              <div className="text-2xl font-bold">{stats.averageScore}%</div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SoloStatCard
          title="Total Study Time"
          value={`${Math.floor(stats.totalStudyTime / 60)}h ${stats.totalStudyTime % 60}m`}
          change={{ value: 12.5, type: 'increase' }}
          icon={Clock}
          color="primary"
        />
        <SoloStatCard
          title="Tests Completed"
          value={stats.testsCompleted.toString()}
          change={{ value: 8.3, type: 'increase' }}
          icon={FileText}
          color="success"
        />
        <SoloStatCard
          title="Average Score"
          value={`${stats.averageScore}%`}
          change={{ value: 5.2, type: 'increase' }}
          icon={Star}
          color="warning"
        />
        <SoloStatCard
          title="Achievements"
          value={stats.achievementsUnlocked.toString()}
          change={{ value: 2, type: 'increase' }}
          icon={Award}
          color="secondary"
        />
      </div>

      {/* Quick Actions & Subject Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <SoloCard
          title="Quick Actions"
          subtitle="Jump into your studies"
          icon={Zap}
          iconColor="bg-solo-warning-light text-solo-warning"
        >
          <div className="space-y-3">
            <SoloButton 
              variant="primary" 
              size="small" 
              fullWidth 
              icon={Brain}
              onClick={() => onNavigate?.('ai-dashboard')}
            >
              🚀 AI Dashboard
            </SoloButton>
            <SoloButton variant="ghost" size="small" fullWidth icon={Play}>
              Continue Last Session
            </SoloButton>
            <SoloButton variant="ghost" size="small" fullWidth icon={FileText}>
              Take Mock Test
            </SoloButton>
            <SoloButton variant="ghost" size="small" fullWidth icon={Calendar}>
              View Study Plan
            </SoloButton>
          </div>
        </SoloCard>

        {/* Today's Goals */}
        <SoloCard
          title="Today's Goals"
          subtitle="Track your daily progress"
          icon={Target}
          iconColor="bg-solo-success-light text-solo-success"
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Study Time Goal</span>
              <span className="text-sm font-semibold text-solo-success">127/180 min</span>
            </div>
            <div className="w-full bg-solo-gray-200 rounded-full h-2">
              <div className="bg-solo-success h-2 rounded-full" style={{ width: '71%' }}></div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Mock Test</span>
              <CheckCircle className="h-5 w-5 text-solo-success" />
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Practice Questions</span>
              <span className="text-sm font-semibold">12/15</span>
            </div>
            <div className="w-full bg-solo-gray-200 rounded-full h-2">
              <div className="bg-solo-primary h-2 rounded-full" style={{ width: '80%' }}></div>
            </div>
          </div>
        </SoloCard>

        {/* Recent Achievements */}
        <SoloCard
          title="Recent Achievements"
          subtitle="Your latest milestones"
          icon={Trophy}
          iconColor="bg-solo-secondary-light text-solo-secondary"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-solo-warning-light rounded-lg flex items-center justify-center">
                <Flame className="h-4 w-4 text-solo-warning" />
              </div>
              <div>
                <p className="text-sm font-medium">15 Day Streak</p>
                <p className="text-xs text-solo-gray-500">Unlocked today</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-solo-success-light rounded-lg flex items-center justify-center">
                <Star className="h-4 w-4 text-solo-success" />
              </div>
              <div>
                <p className="text-sm font-medium">Top Scorer</p>
                <p className="text-xs text-solo-gray-500">Mock Test #15</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-solo-primary-light rounded-lg flex items-center justify-center">
                <BookOpen className="h-4 w-4 text-solo-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Subject Master</p>
                <p className="text-xs text-solo-gray-500">Constitutional Law</p>
              </div>
            </div>
          </div>
        </SoloCard>
      </div>

      {/* Subject Progress Overview */}
      <SoloCard
        title="Subject Progress"
        subtitle="Your learning journey across all subjects"
        action={
          <SoloButton variant="ghost" size="small" onClick={() => setActiveTab('subjects')}>
            View All
          </SoloButton>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.slice(0, 6).map((subject) => (
            <div key={subject.id} className="p-4 border border-solo-gray-200 rounded-xl hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-solo-dark">{subject.name}</h4>
                <span className="text-sm font-medium text-solo-primary">{subject.progress}%</span>
              </div>
              <div className="w-full bg-solo-gray-200 rounded-full h-2 mb-3">
                <div 
                  className={`h-2 rounded-full ${subject.color}`} 
                  style={{ width: `${subject.progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-solo-gray-500">{subject.completedLessons}/{subject.totalLessons} lessons completed</p>
              <p className="text-xs text-solo-gray-600 mt-1">Next: {subject.nextLesson}</p>
            </div>
          ))}
        </div>
      </SoloCard>
    </div>
  );

  const renderSubjects = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-solo-dark">My Subjects</h2>
          <p className="text-solo-gray-600">Continue your learning journey</p>
        </div>
        <SoloButton icon={BookmarkPlus}>Add Subject</SoloButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subjects.map((subject) => (
          <SoloCard key={subject.id} hover className="group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 ${subject.color} rounded-xl flex items-center justify-center text-white`}>
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-solo-dark">{subject.name}</h3>
                  <p className="text-sm text-solo-gray-500">{subject.completedLessons}/{subject.totalLessons} lessons</p>
                </div>
              </div>
              <span className="text-lg font-bold text-solo-primary">{subject.progress}%</span>
            </div>
            
            <div className="w-full bg-solo-gray-200 rounded-full h-3 mb-4">
              <div 
                className={`h-3 rounded-full ${subject.color}`} 
                style={{ width: `${subject.progress}%` }}
              ></div>
            </div>
            
            <div className="space-y-2 mb-4">
              <p className="text-sm text-solo-gray-700">
                <span className="font-medium">Next Lesson:</span> {subject.nextLesson}
              </p>
            </div>
            
            <div className="flex gap-2">
              <SoloButton size="small" fullWidth icon={Play}>
                Continue Learning
              </SoloButton>
              <SoloButton variant="ghost" size="small" icon={FileText}>
                Practice
              </SoloButton>
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
      case 'subjects':
        return renderSubjects();
      default:
        return (
          <SoloCard title={navigationTabs.find(tab => tab.id === activeTab)?.label || 'Feature'}>
            <div className="text-center py-16 text-solo-gray-500">
              <div className="w-16 h-16 mx-auto mb-4 bg-solo-primary-light rounded-2xl flex items-center justify-center">
                <GraduationCap className="h-8 w-8 text-solo-primary" />
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

export default SoloStudentDashboard;
import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, BookOpen, FileText, BarChart3, Calendar, 
  MessageSquare, Award, Settings, Bell, Clock, Target, TrendingUp,
  Plus, Edit, Eye, Download, Search, Filter, CheckCircle, AlertCircle,
  GraduationCap, Brain, Star, Lightbulb, PieChart, Activity, User,
  ClipboardList, Send, Upload, Video, Play, Pause
} from 'lucide-react';
import { User as UserType } from '../types';
import { SoloHeader } from './shared/SoloHeader';
import { SoloNavigation, NavigationTab } from './shared/SoloNavigation';
import { SoloCard, SoloStatCard } from './shared/SoloCard';
import { SoloButton } from './shared/SoloButton';

interface SoloEducatorDashboardProps {
  user: UserType;
  onLogout: () => void;
}

interface Student {
  id: string;
  name: string;
  email: string;
  class: string;
  overallScore: number;
  attendance: number;
  lastActivity: string;
  strengths: string[];
  improvements: string[];
  assignmentsCompleted: number;
  totalAssignments: number;
}

interface Assignment {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  status: 'draft' | 'published' | 'closed';
  submissions: number;
  totalStudents: number;
  avgScore?: number;
}

interface EducatorStats {
  totalStudents: number;
  activeClasses: number;
  assignmentsGraded: number;
  avgClassPerformance: number;
  pendingGrading: number;
  thisWeekSessions: number;
  totalLessons: number;
  studentsActive: number;
}

const SoloEducatorDashboard: React.FC<SoloEducatorDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [stats, setStats] = useState<EducatorStats>({
    totalStudents: 127,
    activeClasses: 6,
    assignmentsGraded: 45,
    avgClassPerformance: 76.8,
    pendingGrading: 23,
    thisWeekSessions: 12,
    totalLessons: 156,
    studentsActive: 89
  });

  const [recentStudents] = useState<Student[]>([
    {
      id: '1', name: 'Priya Patel', email: 'priya@email.com', class: 'CLAT 2024 Batch A',
      overallScore: 85, attendance: 92, lastActivity: 'Completed Constitutional Law Assignment',
      strengths: ['Legal Reasoning', 'Current Affairs'], improvements: ['English', 'Quant'],
      assignmentsCompleted: 12, totalAssignments: 15
    },
    {
      id: '2', name: 'Rohit Kumar', email: 'rohit@email.com', class: 'CLAT 2024 Batch B',
      overallScore: 78, attendance: 87, lastActivity: 'Submitted Mock Test Analysis',
      strengths: ['Constitutional Law', 'GK'], improvements: ['Legal Reasoning', 'English'],
      assignmentsCompleted: 10, totalAssignments: 15
    },
    {
      id: '3', name: 'Sneha Singh', email: 'sneha@email.com', class: 'CLAT 2025 Foundation',
      overallScore: 82, attendance: 95, lastActivity: 'Participated in Group Discussion',
      strengths: ['English', 'Current Affairs'], improvements: ['Quantitative', 'Legal Reasoning'],
      assignmentsCompleted: 14, totalAssignments: 16
    }
  ]);

  const [assignments] = useState<Assignment[]>([
    {
      id: '1', title: 'Constitutional Law - Fundamental Rights', subject: 'Constitutional Law',
      dueDate: '2024-08-15', status: 'published', submissions: 89, totalStudents: 95, avgScore: 78.5
    },
    {
      id: '2', title: 'Legal Reasoning Practice Set 3', subject: 'Legal Reasoning',
      dueDate: '2024-08-18', status: 'published', submissions: 45, totalStudents: 67
    },
    {
      id: '3', title: 'Current Affairs Weekly Quiz', subject: 'Current Affairs',
      dueDate: '2024-08-20', status: 'draft', submissions: 0, totalStudents: 127
    }
  ]);

  const navigationTabs: NavigationTab[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'students', label: 'Students', icon: Users, badge: stats.totalStudents },
    { id: 'classes', label: 'Classes', icon: GraduationCap, badge: stats.activeClasses },
    { id: 'assignments', label: 'Assignments', icon: ClipboardList, badge: assignments.length },
    { id: 'grading', label: 'Grading', icon: Award, badge: stats.pendingGrading },
    { id: 'lessons', label: 'Lessons', icon: BookOpen },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'resources', label: 'Resources', icon: Upload },
    { id: 'discussions', label: 'Discussions', icon: MessageSquare },
    { id: 'reports', label: 'Reports', icon: Download },
    { id: 'live-sessions', label: 'Live Sessions', icon: Video },
    { id: 'content', label: 'Content Library', icon: Brain },
    { id: 'assessments', label: 'Assessments', icon: FileText },
    { id: 'communication', label: 'Communication', icon: Send },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-solo-1 rounded-3xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold font-jakarta mb-2">
            Good morning, Prof. {user.name}! 👩‍🏫
          </h1>
          <p className="text-white/90 text-lg mb-6">
            Empowering minds and shaping futures. Your teaching makes a difference.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-5 w-5" />
                <span className="font-medium">Students</span>
              </div>
              <div className="text-2xl font-bold">{stats.totalStudents}</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <GraduationCap className="h-5 w-5" />
                <span className="font-medium">Active Classes</span>
              </div>
              <div className="text-2xl font-bold">{stats.activeClasses}</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="h-5 w-5" />
                <span className="font-medium">Avg Performance</span>
              </div>
              <div className="text-2xl font-bold">{stats.avgClassPerformance}%</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Video className="h-5 w-5" />
                <span className="font-medium">Sessions This Week</span>
              </div>
              <div className="text-2xl font-bold">{stats.thisWeekSessions}</div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SoloStatCard
          title="Pending Grading"
          value={stats.pendingGrading.toString()}
          change={{ value: 5, type: 'decrease' }}
          icon={Award}
          color="warning"
        />
        <SoloStatCard
          title="Active Students"
          value={stats.studentsActive.toString()}
          change={{ value: 8.2, type: 'increase' }}
          icon={Activity}
          color="success"
        />
        <SoloStatCard
          title="Total Lessons"
          value={stats.totalLessons.toString()}
          change={{ value: 12, type: 'increase' }}
          icon={BookOpen}
          color="primary"
        />
        <SoloStatCard
          title="Graded This Month"
          value={stats.assignmentsGraded.toString()}
          change={{ value: 15.6, type: 'increase' }}
          icon={CheckCircle}
          color="info"
        />
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <SoloCard
          title="Quick Actions"
          subtitle="Common educator tasks"
          icon={Lightbulb}
          iconColor="bg-solo-warning-light text-solo-warning"
        >
          <div className="space-y-3">
            <SoloButton variant="primary" size="small" fullWidth icon={Plus}>
              Create Assignment
            </SoloButton>
            <SoloButton variant="ghost" size="small" fullWidth icon={Video}>
              Start Live Session
            </SoloButton>
            <SoloButton variant="ghost" size="small" fullWidth icon={Upload}>
              Upload Content
            </SoloButton>
            <SoloButton variant="ghost" size="small" fullWidth icon={Send}>
              Send Announcement
            </SoloButton>
          </div>
        </SoloCard>

        {/* Pending Tasks */}
        <SoloCard
          title="Pending Tasks"
          subtitle="Items requiring your attention"
          icon={AlertCircle}
          iconColor="bg-solo-error-light text-solo-error"
          action={
            <SoloButton variant="ghost" size="small" onClick={() => setActiveTab('grading')}>
              View All
            </SoloButton>
          }
        >
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-solo-gray-700">Assignments to grade</span>
              <span className="font-semibold text-solo-error">{stats.pendingGrading}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-solo-gray-700">Student queries</span>
              <span className="font-semibold text-solo-warning">7</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-solo-gray-700">Content reviews</span>
              <span className="font-semibold text-solo-info">3</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-solo-gray-700">Class preparations</span>
              <span className="font-semibold text-solo-success">2</span>
            </div>
          </div>
        </SoloCard>

        {/* Recent Student Activity */}
        <SoloCard
          title="Recent Activity"
          subtitle="Latest student interactions"
          icon={Clock}
          iconColor="bg-solo-info-light text-solo-info"
        >
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-solo-success rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Priya submitted assignment</p>
                <p className="text-xs text-solo-gray-500">Constitutional Law - 15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-solo-primary rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">5 students joined live session</p>
                <p className="text-xs text-solo-gray-500">Legal Reasoning class - 1 hour ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-solo-warning rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Rohit asked a question</p>
                <p className="text-xs text-solo-gray-500">Discussion forum - 2 hours ago</p>
              </div>
            </div>
          </div>
        </SoloCard>
      </div>

      {/* Students Performance Overview */}
      <SoloCard
        title="Recent Student Performance"
        subtitle="Top performing students this week"
        action={
          <SoloButton variant="ghost" size="small" onClick={() => setActiveTab('students')}>
            View All Students
          </SoloButton>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentStudents.map((student) => (
            <div key={student.id} className="p-4 border border-solo-gray-200 rounded-xl hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-solo-2 rounded-xl flex items-center justify-center text-white font-semibold">
                    {student.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-solo-dark">{student.name}</h4>
                    <p className="text-xs text-solo-gray-500">{student.class}</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-solo-primary">{student.overallScore}%</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="text-center">
                  <div className="text-sm font-semibold text-solo-success">{student.attendance}%</div>
                  <div className="text-xs text-solo-gray-500">Attendance</div>
                </div>
                <div className="text-center">
                  <div className="text-sm font-semibold text-solo-warning">{student.assignmentsCompleted}/{student.totalAssignments}</div>
                  <div className="text-xs text-solo-gray-500">Assignments</div>
                </div>
              </div>
              
              <p className="text-xs text-solo-gray-600 mb-3">{student.lastActivity}</p>
              
              <div className="flex gap-2">
                <SoloButton size="small" fullWidth icon={Eye}>
                  View Profile
                </SoloButton>
                <SoloButton variant="ghost" size="small" icon={MessageSquare}>
                  Message
                </SoloButton>
              </div>
            </div>
          ))}
        </div>
      </SoloCard>
    </div>
  );

  const renderStudents = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-solo-dark">My Students</h2>
          <p className="text-solo-gray-600">Manage and track student progress</p>
        </div>
        <div className="flex gap-3">
          <SoloButton variant="ghost" icon={Download}>Export List</SoloButton>
          <SoloButton icon={Plus}>Add Student</SoloButton>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-solo-gray-400" />
          <input
            type="text"
            placeholder="Search students..."
            className="pl-10 pr-4 py-2 w-full border border-solo-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-solo-primary focus:border-transparent"
          />
        </div>
        <SoloButton variant="ghost" icon={Filter}>Filter</SoloButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {recentStudents.map((student) => (
          <SoloCard key={student.id} hover className="group">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-solo-2 rounded-xl flex items-center justify-center text-white font-bold">
                  {student.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-solo-dark">{student.name}</h3>
                  <p className="text-sm text-solo-gray-500">{student.email}</p>
                  <p className="text-xs text-solo-gray-400">{student.class}</p>
                </div>
              </div>
              <span className="text-xl font-bold text-solo-primary">{student.overallScore}%</span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-solo-success-light rounded-lg">
                <div className="text-lg font-bold text-solo-success">{student.attendance}%</div>
                <div className="text-xs text-solo-gray-600">Attendance</div>
              </div>
              <div className="text-center p-3 bg-solo-warning-light rounded-lg">
                <div className="text-lg font-bold text-solo-warning">{student.assignmentsCompleted}/{student.totalAssignments}</div>
                <div className="text-xs text-solo-gray-600">Completed</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium text-solo-gray-700 mb-1">Strengths:</p>
                <div className="flex flex-wrap gap-1">
                  {student.strengths.map((strength, index) => (
                    <span key={index} className="px-2 py-1 bg-solo-success-light text-solo-success text-xs rounded-full">
                      {strength}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-solo-gray-700 mb-1">Focus Areas:</p>
                <div className="flex flex-wrap gap-1">
                  {student.improvements.map((improvement, index) => (
                    <span key={index} className="px-2 py-1 bg-solo-warning-light text-solo-warning text-xs rounded-full">
                      {improvement}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-solo-gray-50 rounded-lg">
              <p className="text-xs text-solo-gray-600">
                <span className="font-medium">Last Activity:</span> {student.lastActivity}
              </p>
            </div>
            
            <div className="flex gap-2 mt-4">
              <SoloButton size="small" fullWidth icon={Eye}>
                View Details
              </SoloButton>
              <SoloButton variant="ghost" size="small" icon={MessageSquare}>
                Message
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
      case 'students':
        return renderStudents();
      default:
        return (
          <SoloCard title={navigationTabs.find(tab => tab.id === activeTab)?.label || 'Feature'}>
            <div className="text-center py-16 text-solo-gray-500">
              <div className="w-16 h-16 mx-auto mb-4 bg-solo-success-light rounded-2xl flex items-center justify-center">
                <GraduationCap className="h-8 w-8 text-solo-success" />
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

export default SoloEducatorDashboard;
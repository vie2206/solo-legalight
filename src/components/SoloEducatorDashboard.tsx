import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, BookOpen, FileText, BarChart3, Calendar, 
  MessageSquare, Award, Settings, Bell, Clock, Target, TrendingUp,
  Plus, Edit, Eye, Download, Search, Filter, CheckCircle, AlertCircle,
  GraduationCap, Brain, Star, Lightbulb, PieChart, Activity, User,
  ClipboardList, Send, Upload, Video, Play, Pause, HelpCircle, Zap,
  Folder, Archive, Database, Bookmark, X, RefreshCw, Save, Copy,
  Share2, ExternalLink, Mail, Phone, Globe, Lock, Unlock, Key,
  Volume2, VolumeX, Monitor, Smartphone, Tablet, Wifi, Shield,
  CreditCard, DollarSign, Building, MapPin, Home, Briefcase
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
    { id: 'ai-assistant', label: 'AI Assistant', icon: Brain },
    { id: 'live-sessions', label: 'Live Sessions', icon: Video },
    { id: 'communication', label: 'Communication', icon: Send },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'resources', label: 'Resources', icon: Folder },
    { id: 'discussions', label: 'Discussions', icon: MessageSquare },
    { id: 'reports', label: 'Reports', icon: Download },
    { id: 'content', label: 'Content Library', icon: Database },
    { id: 'assessments', label: 'Assessments', icon: FileText },
    { id: 'performance', label: 'Performance', icon: TrendingUp },
    { id: 'doubt-solving', label: 'Doubts & Q&A', icon: MessageSquare },
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

  const renderClasses = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-solo-dark">My Classes</h2>
          <p className="text-solo-gray-600">Manage your classes and schedules</p>
        </div>
        <SoloButton icon={Plus}>Create New Class</SoloButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { name: 'CLAT 2024 Batch A', students: 45, schedule: 'Mon, Wed, Fri - 4:00 PM', nextClass: 'Today', progress: 65 },
          { name: 'CLAT 2024 Batch B', students: 38, schedule: 'Tue, Thu, Sat - 5:00 PM', nextClass: 'Tomorrow', progress: 72 },
          { name: 'CLAT 2025 Foundation', students: 52, schedule: 'Daily - 6:00 PM', nextClass: 'Today', progress: 45 },
          { name: 'Legal Reasoning Advanced', students: 28, schedule: 'Mon, Wed - 7:00 PM', nextClass: '2 days', progress: 80 },
          { name: 'Constitutional Law Special', students: 15, schedule: 'Weekends - 10:00 AM', nextClass: 'Saturday', progress: 58 },
          { name: 'Current Affairs Weekly', students: 127, schedule: 'Sunday - 11:00 AM', nextClass: 'Sunday', progress: 90 }
        ].map((classItem, index) => (
          <SoloCard key={index} hover>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-solo-dark">{classItem.name}</h3>
                <p className="text-sm text-solo-gray-500">{classItem.students} students</p>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-solo-primary">Next: {classItem.nextClass}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-solo-gray-600">Progress</span>
                  <span className="font-medium">{classItem.progress}%</span>
                </div>
                <div className="w-full bg-solo-gray-200 rounded-full h-2">
                  <div className="bg-gradient-solo-1 h-2 rounded-full" style={{ width: `${classItem.progress}%` }}></div>
                </div>
              </div>
              
              <div className="pt-3 border-t border-solo-gray-200">
                <p className="text-sm text-solo-gray-600 mb-3">
                  <Clock className="inline h-3 w-3 mr-1" />
                  {classItem.schedule}
                </p>
                <div className="flex gap-2">
                  <SoloButton size="small" fullWidth icon={Video}>
                    Start Session
                  </SoloButton>
                  <SoloButton variant="ghost" size="small" icon={Eye}>
                    View
                  </SoloButton>
                </div>
              </div>
            </div>
          </SoloCard>
        ))}
      </div>
    </div>
  );

  const renderAssignments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-solo-dark">Assignments</h2>
          <p className="text-solo-gray-600">Create and manage assignments</p>
        </div>
        <div className="flex gap-3">
          <SoloButton variant="ghost" icon={Filter}>Filter</SoloButton>
          <SoloButton icon={Plus}>Create Assignment</SoloButton>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-solo-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-solo-gray-700 uppercase tracking-wider">Assignment</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-solo-gray-700 uppercase tracking-wider">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-solo-gray-700 uppercase tracking-wider">Due Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-solo-gray-700 uppercase tracking-wider">Submissions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-solo-gray-700 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-solo-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-solo-gray-200">
            {assignments.map((assignment) => (
              <tr key={assignment.id} className="hover:bg-solo-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-solo-dark">{assignment.title}</div>
                    {assignment.avgScore && (
                      <div className="text-xs text-solo-gray-500">Avg Score: {assignment.avgScore}%</div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-solo-gray-600">{assignment.subject}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-solo-gray-600">{assignment.dueDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <span className="text-sm font-medium">{assignment.submissions}/{assignment.totalStudents}</span>
                    <div className="ml-2 w-20 bg-solo-gray-200 rounded-full h-2">
                      <div 
                        className="bg-solo-success h-2 rounded-full" 
                        style={{ width: `${(assignment.submissions / assignment.totalStudents) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${assignment.status === 'published' ? 'bg-solo-success-light text-solo-success' : 
                      assignment.status === 'draft' ? 'bg-solo-gray-200 text-solo-gray-700' : 
                      'bg-solo-error-light text-solo-error'}`}>
                    {assignment.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <div className="flex gap-2">
                    <button className="text-solo-primary hover:text-solo-primary-dark">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-solo-warning hover:text-solo-warning-dark">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-solo-success hover:text-solo-success-dark">
                      <Award className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderGrading = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-solo-dark">Grading Center</h2>
          <p className="text-solo-gray-600">Review and grade student submissions</p>
        </div>
        <div className="flex gap-3">
          <span className="px-4 py-2 bg-solo-warning-light text-solo-warning rounded-lg font-medium">
            {stats.pendingGrading} Pending
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {[
            { student: 'Priya Patel', assignment: 'Constitutional Law Essay', submitted: '2 hours ago', status: 'pending' },
            { student: 'Rohit Kumar', assignment: 'Legal Reasoning Quiz', submitted: '5 hours ago', status: 'pending' },
            { student: 'Sneha Singh', assignment: 'Current Affairs Test', submitted: '1 day ago', status: 'graded', score: 85 },
            { student: 'Amit Sharma', assignment: 'Mock Test #15', submitted: '1 day ago', status: 'pending' },
            { student: 'Neha Gupta', assignment: 'Case Study Analysis', submitted: '2 days ago', status: 'graded', score: 92 }
          ].map((item, index) => (
            <SoloCard key={index} hover>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-solo-1 rounded-xl flex items-center justify-center text-white font-bold">
                    {item.student.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-solo-dark">{item.student}</h4>
                    <p className="text-sm text-solo-gray-600">{item.assignment}</p>
                    <p className="text-xs text-solo-gray-500">Submitted {item.submitted}</p>
                  </div>
                </div>
                <div className="text-right">
                  {item.status === 'graded' ? (
                    <div>
                      <span className="text-2xl font-bold text-solo-success">{item.score}%</span>
                      <p className="text-xs text-solo-gray-500">Graded</p>
                    </div>
                  ) : (
                    <SoloButton size="small" icon={Award}>
                      Grade Now
                    </SoloButton>
                  )}
                </div>
              </div>
            </SoloCard>
          ))}
        </div>

        <div className="space-y-4">
          <SoloCard
            title="Grading Stats"
            icon={PieChart}
            iconColor="bg-solo-info-light text-solo-info"
          >
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-solo-gray-600">Completed Today</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="w-full bg-solo-gray-200 rounded-full h-2">
                  <div className="bg-solo-success h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-solo-gray-600">This Week</span>
                  <span className="font-semibold">45</span>
                </div>
                <div className="w-full bg-solo-gray-200 rounded-full h-2">
                  <div className="bg-solo-primary h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
              <div className="pt-4 border-t border-solo-gray-200">
                <p className="text-sm text-solo-gray-600 mb-2">Average Grading Time</p>
                <p className="text-2xl font-bold text-solo-dark">8.5 min</p>
              </div>
            </div>
          </SoloCard>

          <SoloCard
            title="Quick Actions"
            icon={Lightbulb}
            iconColor="bg-solo-warning-light text-solo-warning"
          >
            <div className="space-y-2">
              <SoloButton variant="ghost" size="small" fullWidth icon={Download}>
                Export Grades
              </SoloButton>
              <SoloButton variant="ghost" size="small" fullWidth icon={Upload}>
                Import Rubric
              </SoloButton>
              <SoloButton variant="ghost" size="small" fullWidth icon={Settings}>
                Grading Settings
              </SoloButton>
            </div>
          </SoloCard>
        </div>
      </div>
    </div>
  );

  const renderLessons = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-solo-dark">Lesson Library</h2>
          <p className="text-solo-gray-600">Manage and organize your teaching materials</p>
        </div>
        <div className="flex gap-3">
          <SoloButton variant="ghost" icon={Search}>Search</SoloButton>
          <SoloButton icon={Plus}>Create Lesson</SoloButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'Fundamental Rights - Deep Dive', subject: 'Constitutional Law', type: 'video', duration: '45 min', views: 234, lastUpdated: '2 days ago' },
          { title: 'Logic & Reasoning Basics', subject: 'Legal Reasoning', type: 'presentation', slides: 32, views: 189, lastUpdated: '5 days ago' },
          { title: 'Current Affairs Weekly Update', subject: 'Current Affairs', type: 'document', pages: 15, views: 456, lastUpdated: '1 day ago' },
          { title: 'Mock Test Analysis Guide', subject: 'Test Preparation', type: 'interactive', activities: 8, views: 167, lastUpdated: '1 week ago' },
          { title: 'English Comprehension Strategies', subject: 'English', type: 'video', duration: '30 min', views: 298, lastUpdated: '3 days ago' },
          { title: 'Quantitative Techniques Formulas', subject: 'Quantitative', type: 'document', pages: 25, views: 145, lastUpdated: '4 days ago' }
        ].map((lesson, index) => (
          <SoloCard key={index} hover>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  lesson.type === 'video' ? 'bg-solo-error-light' :
                  lesson.type === 'presentation' ? 'bg-solo-warning-light' :
                  lesson.type === 'document' ? 'bg-solo-info-light' :
                  'bg-solo-success-light'
                }`}>
                  {lesson.type === 'video' ? <Video className="h-5 w-5 text-solo-error" /> :
                   lesson.type === 'presentation' ? <FileText className="h-5 w-5 text-solo-warning" /> :
                   lesson.type === 'document' ? <BookOpen className="h-5 w-5 text-solo-info" /> :
                   <Brain className="h-5 w-5 text-solo-success" />}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-solo-dark line-clamp-2">{lesson.title}</h4>
                  <p className="text-sm text-solo-gray-500">{lesson.subject}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-solo-gray-600">
                  {lesson.duration || `${lesson.slides} slides` || `${lesson.pages} pages` || `${lesson.activities} activities`}
                </span>
                <span className="text-solo-gray-600">{lesson.views} views</span>
              </div>
              <p className="text-xs text-solo-gray-500">Updated {lesson.lastUpdated}</p>
            </div>
            
            <div className="flex gap-2">
              <SoloButton size="small" fullWidth icon={Eye}>
                Preview
              </SoloButton>
              <SoloButton variant="ghost" size="small" icon={Edit}>
                Edit
              </SoloButton>
            </div>
          </SoloCard>
        ))}
      </div>
    </div>
  );

  const renderLiveSessions = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-solo-dark">Live Sessions</h2>
          <p className="text-solo-gray-600">Schedule and manage live classes</p>
        </div>
        <SoloButton icon={Video}>Start Live Session</SoloButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <SoloCard
            title="Upcoming Sessions"
            icon={Calendar}
            iconColor="bg-solo-primary-light text-solo-primary"
          >
            <div className="space-y-4">
              {[
                { title: 'Constitutional Law - Batch A', time: 'Today, 4:00 PM', students: 45, status: 'scheduled' },
                { title: 'Legal Reasoning Practice', time: 'Today, 6:00 PM', students: 28, status: 'scheduled' },
                { title: 'Mock Test Review', time: 'Tomorrow, 10:00 AM', students: 89, status: 'scheduled' },
                { title: 'Current Affairs Discussion', time: 'Tomorrow, 5:00 PM', students: 127, status: 'scheduled' }
              ].map((session, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-solo-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-solo-1 rounded-xl flex items-center justify-center">
                      <Video className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-solo-dark">{session.title}</h4>
                      <p className="text-sm text-solo-gray-600">{session.time}</p>
                      <p className="text-xs text-solo-gray-500">{session.students} students registered</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <SoloButton size="small" icon={Play}>
                      Start
                    </SoloButton>
                    <SoloButton variant="ghost" size="small" icon={Settings}>
                      Configure
                    </SoloButton>
                  </div>
                </div>
              ))}
            </div>
          </SoloCard>

          <SoloCard
            title="Recent Recordings"
            icon={Video}
            iconColor="bg-solo-error-light text-solo-error"
          >
            <div className="space-y-3">
              {[
                { title: 'Constitutional Law Lecture', date: '2 days ago', duration: '1h 23m', views: 89 },
                { title: 'Legal Reasoning Workshop', date: '3 days ago', duration: '45m', views: 67 },
                { title: 'Mock Test Strategy Session', date: '1 week ago', duration: '1h 10m', views: 134 }
              ].map((recording, index) => (
                <div key={index} className="flex items-center justify-between p-3 hover:bg-solo-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-solo-dark">{recording.title}</h4>
                    <p className="text-sm text-solo-gray-600">{recording.date} • {recording.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-solo-primary">{recording.views} views</p>
                    <div className="flex gap-2 mt-1">
                      <button className="text-solo-primary hover:text-solo-primary-dark">
                        <Play className="h-4 w-4" />
                      </button>
                      <button className="text-solo-gray-600 hover:text-solo-gray-800">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SoloCard>
        </div>

        <div className="space-y-4">
          <SoloCard
            title="Session Settings"
            icon={Settings}
            iconColor="bg-solo-gray-200 text-solo-gray-700"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-solo-gray-600">Auto-record sessions</span>
                <div className="w-10 h-6 bg-solo-success rounded-full relative">
                  <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-solo-gray-600">Allow chat</span>
                <div className="w-10 h-6 bg-solo-success rounded-full relative">
                  <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-solo-gray-600">Screen sharing</span>
                <div className="w-10 h-6 bg-solo-success rounded-full relative">
                  <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-solo-gray-600">Waiting room</span>
                <div className="w-10 h-6 bg-solo-gray-300 rounded-full relative">
                  <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </SoloCard>

          <SoloCard
            title="Quick Stats"
            icon={BarChart3}
            iconColor="bg-solo-info-light text-solo-info"
          >
            <div className="space-y-3">
              <div>
                <p className="text-sm text-solo-gray-600">Total Sessions This Month</p>
                <p className="text-2xl font-bold text-solo-dark">24</p>
              </div>
              <div>
                <p className="text-sm text-solo-gray-600">Average Attendance</p>
                <p className="text-2xl font-bold text-solo-success">87%</p>
              </div>
              <div>
                <p className="text-sm text-solo-gray-600">Total Watch Time</p>
                <p className="text-2xl font-bold text-solo-primary">156h</p>
              </div>
            </div>
          </SoloCard>
        </div>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-solo-dark">Analytics & Insights</h2>
          <p className="text-solo-gray-600">Track performance and engagement metrics</p>
        </div>
        <div className="flex gap-3">
          <SoloButton variant="ghost" icon={Calendar}>Date Range</SoloButton>
          <SoloButton variant="ghost" icon={Download}>Export Report</SoloButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SoloStatCard
          title="Class Average"
          value="76.8%"
          change={{ value: 3.2, type: 'increase' }}
          icon={TrendingUp}
          color="success"
        />
        <SoloStatCard
          title="Engagement Rate"
          value="89%"
          change={{ value: 5.1, type: 'increase' }}
          icon={Activity}
          color="primary"
        />
        <SoloStatCard
          title="Completion Rate"
          value="72%"
          change={{ value: 2.8, type: 'decrease' }}
          icon={CheckCircle}
          color="warning"
        />
        <SoloStatCard
          title="Student Satisfaction"
          value="4.7/5"
          change={{ value: 0.2, type: 'increase' }}
          icon={Star}
          color="info"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SoloCard
          title="Performance Trends"
          icon={BarChart3}
          iconColor="bg-solo-primary-light text-solo-primary"
        >
          <div className="h-64 flex items-center justify-center bg-solo-gray-50 rounded-lg">
            <p className="text-solo-gray-500">Performance chart visualization</p>
          </div>
        </SoloCard>

        <SoloCard
          title="Subject-wise Performance"
          icon={PieChart}
          iconColor="bg-solo-warning-light text-solo-warning"
        >
          <div className="space-y-3">
            {[
              { subject: 'Constitutional Law', score: 82, color: 'bg-solo-primary' },
              { subject: 'Legal Reasoning', score: 78, color: 'bg-solo-success' },
              { subject: 'Current Affairs', score: 85, color: 'bg-solo-warning' },
              { subject: 'English', score: 71, color: 'bg-solo-info' },
              { subject: 'Quantitative', score: 68, color: 'bg-solo-error' }
            ].map((subject, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-solo-gray-700">{subject.subject}</span>
                  <span className="text-sm font-semibold">{subject.score}%</span>
                </div>
                <div className="w-full bg-solo-gray-200 rounded-full h-2">
                  <div className={`${subject.color} h-2 rounded-full`} style={{ width: `${subject.score}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </SoloCard>
      </div>
    </div>
  );

  const renderAIAssistant = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-solo-dark">AI Teaching Assistant</h2>
          <p className="text-solo-gray-600">Intelligent tools to enhance your teaching</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-solo-1 text-white rounded-lg">
          <Brain className="h-5 w-5" />
          <span className="font-medium">AI Powered</span>
        </div>
      </div>

      {/* AI Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Smart Grading Assistant */}
        <SoloCard
          title="Smart Grading Assistant"
          icon={Award}
          iconColor="bg-gradient-to-br from-purple-500 to-purple-600 text-white"
          hover
        >
          <p className="text-sm text-solo-gray-600 mb-4">
            AI-powered grading suggestions based on rubrics and past patterns
          </p>
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between p-2 bg-purple-50 rounded-lg">
              <span className="text-sm">Auto-grade MCQs</span>
              <span className="text-xs text-purple-600 font-semibold">Ready</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-purple-50 rounded-lg">
              <span className="text-sm">Essay evaluation</span>
              <span className="text-xs text-purple-600 font-semibold">Beta</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-purple-50 rounded-lg">
              <span className="text-sm">Plagiarism check</span>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
          </div>
          <SoloButton variant="primary" size="small" fullWidth icon={Zap}>
            Start AI Grading
          </SoloButton>
        </SoloCard>

        {/* Lesson Plan Generator */}
        <SoloCard
          title="Lesson Plan Generator"
          icon={BookOpen}
          iconColor="bg-gradient-to-br from-blue-500 to-blue-600 text-white"
          hover
        >
          <p className="text-sm text-solo-gray-600 mb-4">
            Create comprehensive lesson plans tailored to CLAT curriculum
          </p>
          <div className="space-y-2 mb-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-xs font-medium text-blue-900 mb-1">Last Generated:</p>
              <p className="text-sm text-blue-700">Constitutional Law - Article 21</p>
              <p className="text-xs text-blue-600 mt-1">2 hours ago</p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2 bg-solo-gray-50 rounded">
                <p className="text-lg font-bold text-solo-primary">48</p>
                <p className="text-xs text-solo-gray-600">Plans Created</p>
              </div>
              <div className="p-2 bg-solo-gray-50 rounded">
                <p className="text-lg font-bold text-solo-success">4.8</p>
                <p className="text-xs text-solo-gray-600">Avg Rating</p>
              </div>
            </div>
          </div>
          <SoloButton variant="primary" size="small" fullWidth icon={Plus}>
            Generate New Plan
          </SoloButton>
        </SoloCard>

        {/* Performance Predictor */}
        <SoloCard
          title="Student Performance Predictor"
          icon={TrendingUp}
          iconColor="bg-gradient-to-br from-green-500 to-green-600 text-white"
          hover
        >
          <p className="text-sm text-solo-gray-600 mb-4">
            AI predictions for student performance and intervention suggestions
          </p>
          <div className="space-y-3 mb-4">
            <div className="p-2 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">At-Risk Students</span>
                <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">12</span>
              </div>
              <p className="text-xs text-green-700">Require immediate attention</p>
            </div>
            <div className="p-2 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium">Top Performers</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">28</span>
              </div>
              <p className="text-xs text-green-700">Ready for advanced content</p>
            </div>
          </div>
          <SoloButton variant="primary" size="small" fullWidth icon={Activity}>
            View Predictions
          </SoloButton>
        </SoloCard>

        {/* Question Bank AI */}
        <SoloCard
          title="AI Question Generator"
          icon={HelpCircle}
          iconColor="bg-gradient-to-br from-orange-500 to-orange-600 text-white"
          hover
        >
          <p className="text-sm text-solo-gray-600 mb-4">
            Generate practice questions based on topics and difficulty levels
          </p>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-solo-gray-600">Questions Generated</span>
              <span className="font-semibold">2,456</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-solo-gray-600">Topics Covered</span>
              <span className="font-semibold">48</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Easy</span>
                <span>Medium</span>
                <span>Hard</span>
              </div>
              <div className="flex gap-1">
                <div className="h-2 bg-green-500 rounded-full" style={{ width: '30%' }}></div>
                <div className="h-2 bg-yellow-500 rounded-full" style={{ width: '45%' }}></div>
                <div className="h-2 bg-red-500 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
          </div>
          <SoloButton variant="primary" size="small" fullWidth icon={Plus}>
            Generate Questions
          </SoloButton>
        </SoloCard>

        {/* Content Recommender */}
        <SoloCard
          title="Content Recommender"
          icon={Lightbulb}
          iconColor="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white"
          hover
        >
          <p className="text-sm text-solo-gray-600 mb-4">
            AI-curated content suggestions based on student needs
          </p>
          <div className="space-y-2 mb-4">
            <div className="p-2 bg-indigo-50 rounded">
              <p className="text-xs font-medium text-indigo-900 mb-1">Today's Recommendation:</p>
              <p className="text-sm text-indigo-700">Video: "Understanding PIL"</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-indigo-600">95% relevance</span>
                <Star className="h-3 w-3 text-yellow-500" />
              </div>
            </div>
            <div className="flex items-center justify-between p-2 bg-indigo-50 rounded">
              <span className="text-xs text-indigo-700">Weekly suggestions</span>
              <span className="font-semibold text-indigo-900">15</span>
            </div>
          </div>
          <SoloButton variant="primary" size="small" fullWidth icon={BookOpen}>
            View Recommendations
          </SoloButton>
        </SoloCard>

        {/* Personalized Feedback */}
        <SoloCard
          title="Feedback Generator"
          icon={MessageSquare}
          iconColor="bg-gradient-to-br from-pink-500 to-pink-600 text-white"
          hover
        >
          <p className="text-sm text-solo-gray-600 mb-4">
            Generate personalized feedback for student assignments
          </p>
          <div className="space-y-3 mb-4">
            <div className="text-center p-3 bg-pink-50 rounded-lg">
              <p className="text-3xl font-bold text-pink-600">156</p>
              <p className="text-xs text-pink-700">Feedback Generated This Week</p>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-solo-gray-600">Avg Length</span>
              <span className="font-semibold">~250 words</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-solo-gray-600">Satisfaction</span>
              <span className="font-semibold text-green-600">92%</span>
            </div>
          </div>
          <SoloButton variant="primary" size="small" fullWidth icon={Edit}>
            Generate Feedback
          </SoloButton>
        </SoloCard>
      </div>

      {/* AI Insights Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SoloCard
            title="AI Teaching Insights"
            icon={Brain}
            iconColor="bg-gradient-solo-1 text-white"
          >
            <div className="space-y-4">
              {/* Teaching Effectiveness Score */}
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-solo-dark">Teaching Effectiveness Score</h4>
                  <span className="text-2xl font-bold text-purple-600">87%</span>
                </div>
                <div className="w-full bg-white rounded-full h-3">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full" style={{ width: '87%' }}></div>
                </div>
                <p className="text-xs text-solo-gray-600 mt-2">Based on student engagement, performance, and feedback</p>
              </div>

              {/* AI Recommendations */}
              <div className="space-y-3">
                <h4 className="font-semibold text-solo-dark">AI Recommendations</h4>
                {[
                  { icon: Target, color: 'text-red-600', bg: 'bg-red-50', title: 'Focus on Legal Reasoning', desc: '5 students struggling with logical deduction' },
                  { icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50', title: 'Optimal Class Time', desc: 'Students most engaged at 4:00-5:30 PM' },
                  { icon: Users, color: 'text-green-600', bg: 'bg-green-50', title: 'Group Study Suggestion', desc: 'Form study groups for Constitutional Law' }
                ].map((rec, index) => (
                  <div key={index} className={`flex items-start gap-3 p-3 ${rec.bg} rounded-lg`}>
                    <rec.icon className={`h-5 w-5 ${rec.color} mt-0.5`} />
                    <div>
                      <p className="text-sm font-medium text-solo-dark">{rec.title}</p>
                      <p className="text-xs text-solo-gray-600">{rec.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Activity Log */}
              <div className="pt-4 border-t border-solo-gray-200">
                <h4 className="font-semibold text-solo-dark mb-3">Recent AI Activities</h4>
                <div className="space-y-2">
                  {[
                    { time: '10 min ago', action: 'Generated quiz for Constitutional Law', icon: FileText },
                    { time: '1 hour ago', action: 'Analyzed 23 student submissions', icon: BarChart3 },
                    { time: '3 hours ago', action: 'Created personalized study plans', icon: Calendar }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center gap-3 text-sm">
                      <activity.icon className="h-4 w-4 text-solo-gray-400" />
                      <span className="text-solo-gray-600">{activity.action}</span>
                      <span className="text-xs text-solo-gray-400 ml-auto">{activity.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SoloCard>
        </div>

        <div className="space-y-4">
          {/* AI Usage Stats */}
          <SoloCard
            title="AI Usage Stats"
            icon={Activity}
            iconColor="bg-gradient-to-br from-green-500 to-teal-500 text-white"
          >
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-solo-gray-600">AI Features Used Today</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="w-full bg-solo-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-solo-gray-600">Time Saved This Week</span>
                  <span className="font-semibold text-green-600">8.5 hrs</span>
                </div>
                <div className="w-full bg-solo-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              <div className="pt-3 border-t border-solo-gray-200">
                <p className="text-sm text-solo-gray-600 mb-1">Most Used Feature</p>
                <p className="font-semibold text-solo-dark">Smart Grading Assistant</p>
                <p className="text-xs text-solo-gray-500">Used 45 times this week</p>
              </div>
            </div>
          </SoloCard>

          {/* Quick AI Actions */}
          <SoloCard
            title="Quick AI Actions"
            icon={Zap}
            iconColor="bg-gradient-to-br from-yellow-500 to-orange-500 text-white"
          >
            <div className="space-y-2">
              <SoloButton variant="ghost" size="small" fullWidth icon={Brain}>
                AI Chat Assistant
              </SoloButton>
              <SoloButton variant="ghost" size="small" fullWidth icon={Target}>
                Analyze Class Performance
              </SoloButton>
              <SoloButton variant="ghost" size="small" fullWidth icon={Calendar}>
                Generate Study Schedule
              </SoloButton>
              <SoloButton variant="ghost" size="small" fullWidth icon={FileText}>
                Create Assessment
              </SoloButton>
            </div>
          </SoloCard>
        </div>
      </div>
    </div>
  );

  const renderCommunication = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-solo-dark">Communication Center</h2>
          <p className="text-solo-gray-600">Connect with students and parents</p>
        </div>
        <SoloButton icon={Send}>Send Announcement</SoloButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SoloCard
            title="Recent Messages"
            icon={MessageSquare}
            iconColor="bg-solo-primary-light text-solo-primary"
          >
            <div className="space-y-4">
              {[
                { from: 'Priya Patel', type: 'student', message: 'Doubt regarding fundamental rights topic', time: '30 min ago', unread: true },
                { from: 'Mr. Kumar (Parent)', type: 'parent', message: 'Request for progress report', time: '2 hours ago', unread: true },
                { from: 'Sneha Singh', type: 'student', message: 'Thank you for the extra session!', time: '5 hours ago', unread: false },
                { from: 'Admin', type: 'system', message: 'New curriculum updates available', time: '1 day ago', unread: false }
              ].map((msg, index) => (
                <div key={index} className={`flex items-start gap-3 p-3 rounded-lg ${msg.unread ? 'bg-solo-primary-light/20' : 'hover:bg-solo-gray-50'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                    msg.type === 'student' ? 'bg-gradient-solo-1' :
                    msg.type === 'parent' ? 'bg-gradient-solo-2' :
                    'bg-solo-gray-600'
                  }`}>
                    {msg.from.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-solo-dark">{msg.from}</h4>
                      <span className="text-xs text-solo-gray-500">{msg.time}</span>
                    </div>
                    <p className="text-sm text-solo-gray-600 mt-1">{msg.message}</p>
                    {msg.unread && <span className="inline-block mt-2 px-2 py-1 bg-solo-primary text-white text-xs rounded-full">New</span>}
                  </div>
                </div>
              ))}
            </div>
          </SoloCard>
        </div>

        <div className="space-y-4">
          <SoloCard
            title="Quick Actions"
            icon={Lightbulb}
            iconColor="bg-solo-warning-light text-solo-warning"
          >
            <div className="space-y-2">
              <SoloButton variant="ghost" size="small" fullWidth icon={Send}>
                Send Class Announcement
              </SoloButton>
              <SoloButton variant="ghost" size="small" fullWidth icon={Calendar}>
                Schedule Parent Meeting
              </SoloButton>
              <SoloButton variant="ghost" size="small" fullWidth icon={Bell}>
                Send Reminder
              </SoloButton>
              <SoloButton variant="ghost" size="small" fullWidth icon={MessageSquare}>
                Open Discussion Forum
              </SoloButton>
            </div>
          </SoloCard>

          <SoloCard
            title="Communication Stats"
            icon={Activity}
            iconColor="bg-solo-info-light text-solo-info"
          >
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-solo-gray-600">Messages Today</span>
                <span className="font-semibold">23</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-solo-gray-600">Response Rate</span>
                <span className="font-semibold text-solo-success">94%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-solo-gray-600">Avg Response Time</span>
                <span className="font-semibold">2.5h</span>
              </div>
            </div>
          </SoloCard>
        </div>
      </div>
    </div>
  );

  const renderSchedule = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-solo-dark">Schedule Management</h2>
          <p className="text-solo-gray-600">Manage your class schedules and calendar events</p>
        </div>
        <div className="flex gap-3">
          <SoloButton variant="ghost" icon={Calendar}>Add Event</SoloButton>
          <SoloButton icon={Plus}>New Schedule</SoloButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SoloCard
            title="Weekly Schedule"
            icon={Calendar}
            iconColor="bg-solo-primary-light text-solo-primary"
          >
            <div className="space-y-4">
              {[
                { day: 'Monday', classes: [{ time: '4:00 PM', subject: 'Constitutional Law - Batch A', duration: '90 min' }, { time: '6:00 PM', subject: 'Legal Reasoning', duration: '60 min' }] },
                { day: 'Tuesday', classes: [{ time: '5:00 PM', subject: 'CLAT 2024 - Batch B', duration: '90 min' }] },
                { day: 'Wednesday', classes: [{ time: '4:00 PM', subject: 'Constitutional Law - Batch A', duration: '90 min' }, { time: '7:00 PM', subject: 'Advanced Legal Reasoning', duration: '60 min' }] },
                { day: 'Thursday', classes: [{ time: '5:00 PM', subject: 'CLAT 2024 - Batch B', duration: '90 min' }] },
                { day: 'Friday', classes: [{ time: '4:00 PM', subject: 'Constitutional Law - Batch A', duration: '90 min' }] },
                { day: 'Saturday', classes: [{ time: '10:00 AM', subject: 'Constitutional Law Special', duration: '120 min' }] },
                { day: 'Sunday', classes: [{ time: '11:00 AM', subject: 'Current Affairs Weekly', duration: '60 min' }] }
              ].map((daySchedule, dayIndex) => (
                <div key={dayIndex} className="border border-solo-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-solo-dark mb-3">{daySchedule.day}</h4>
                  {daySchedule.classes.length > 0 ? (
                    <div className="space-y-2">
                      {daySchedule.classes.map((classItem, classIndex) => (
                        <div key={classIndex} className="flex items-center justify-between p-3 bg-solo-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-2 h-12 bg-solo-primary rounded-full"></div>
                            <div>
                              <p className="font-medium text-solo-dark">{classItem.subject}</p>
                              <p className="text-sm text-solo-gray-600">{classItem.time} • {classItem.duration}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button className="p-2 text-solo-primary hover:bg-solo-primary-light rounded-lg">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-solo-success hover:bg-solo-success-light rounded-lg">
                              <Video className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-solo-gray-500 text-sm">No classes scheduled</p>
                  )}
                </div>
              ))}
            </div>
          </SoloCard>
        </div>

        <div className="space-y-4">
          <SoloCard
            title="Today's Schedule"
            icon={Clock}
            iconColor="bg-solo-success-light text-solo-success"
          >
            <div className="space-y-3">
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-900">Live Now</span>
                </div>
                <p className="text-sm text-green-800">Constitutional Law - Batch A</p>
                <p className="text-xs text-green-600">4:00 PM - 5:30 PM</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm font-medium text-blue-900">Next: Legal Reasoning</p>
                <p className="text-xs text-blue-600">6:00 PM - 7:00 PM</p>
              </div>
            </div>
          </SoloCard>

          <SoloCard
            title="Schedule Stats"
            icon={BarChart3}
            iconColor="bg-solo-info-light text-solo-info"
          >
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-solo-gray-600">Classes This Week</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-solo-gray-600">Total Hours</span>
                <span className="font-semibold">18h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-solo-gray-600">Avg Class Size</span>
                <span className="font-semibold">42 students</span>
              </div>
            </div>
          </SoloCard>
        </div>
      </div>
    </div>
  );

  const renderResources = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-solo-dark">Resources Library</h2>
          <p className="text-solo-gray-600">Manage teaching resources and materials</p>
        </div>
        <div className="flex gap-3">
          <SoloButton variant="ghost" icon={Search}>Search</SoloButton>
          <SoloButton icon={Upload}>Upload Resource</SoloButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { name: 'CLAT Study Materials 2024', type: 'PDF', size: '15.2 MB', downloads: 234, category: 'Study Material' },
          { name: 'Constitutional Law Cases', type: 'DOC', size: '8.7 MB', downloads: 189, category: 'Case Studies' },
          { name: 'Legal Reasoning Practice', type: 'PDF', size: '12.4 MB', downloads: 156, category: 'Practice Sets' },
          { name: 'Current Affairs Updates', type: 'PDF', size: '5.8 MB', downloads: 298, category: 'Current Affairs' },
          { name: 'Mock Test Solutions', type: 'PDF', size: '22.1 MB', downloads: 167, category: 'Solutions' },
          { name: 'Video Lectures Archive', type: 'ZIP', size: '245 MB', downloads: 89, category: 'Videos' },
          { name: 'Question Bank 2024', type: 'XLSX', size: '3.2 MB', downloads: 123, category: 'Question Bank' },
          { name: 'Research Papers Collection', type: 'PDF', size: '18.9 MB', downloads: 67, category: 'Research' }
        ].map((resource, index) => (
          <SoloCard key={index} hover>
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                resource.type === 'PDF' ? 'bg-red-100' :
                resource.type === 'DOC' ? 'bg-blue-100' :
                resource.type === 'XLSX' ? 'bg-green-100' :
                'bg-purple-100'
              }`}>
                <FileText className={`h-5 w-5 ${
                  resource.type === 'PDF' ? 'text-red-600' :
                  resource.type === 'DOC' ? 'text-blue-600' :
                  resource.type === 'XLSX' ? 'text-green-600' :
                  'text-purple-600'
                }`} />
              </div>
              <span className="text-xs text-solo-gray-500">{resource.type}</span>
            </div>
            
            <h4 className="font-semibold text-solo-dark mb-2 line-clamp-2">{resource.name}</h4>
            <p className="text-xs text-solo-gray-500 mb-3">{resource.category}</p>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-solo-gray-600">Size: {resource.size}</span>
                <span className="text-solo-gray-600">{resource.downloads} downloads</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <SoloButton size="small" fullWidth icon={Download}>
                Download
              </SoloButton>
              <SoloButton variant="ghost" size="small" icon={Share2}>
                Share
              </SoloButton>
            </div>
          </SoloCard>
        ))}
      </div>
    </div>
  );

  const renderDiscussions = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-solo-dark">Discussion Forums</h2>
          <p className="text-solo-gray-600">Moderate and participate in student discussions</p>
        </div>
        <SoloButton icon={Plus}>Create Topic</SoloButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {[
            { title: 'Doubt: Article 21 and Right to Privacy', author: 'Priya Patel', replies: 12, views: 89, time: '2 hours ago', status: 'active', urgent: true },
            { title: 'Discussion: Recent Supreme Court Judgments', author: 'Rohit Kumar', replies: 8, views: 156, time: '5 hours ago', status: 'answered', urgent: false },
            { title: 'Help: Legal Reasoning Logical Deduction', author: 'Sneha Singh', replies: 15, views: 234, time: '1 day ago', status: 'active', urgent: false },
            { title: 'Query: CLAT 2024 Exam Pattern Changes', author: 'Amit Sharma', replies: 23, views: 345, time: '2 days ago', status: 'resolved', urgent: false }
          ].map((discussion, index) => (
            <SoloCard key={index} hover>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  {discussion.urgent && (
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold text-solo-dark mb-1">{discussion.title}</h4>
                    <p className="text-sm text-solo-gray-600">by {discussion.author} • {discussion.time}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  discussion.status === 'active' ? 'bg-blue-100 text-blue-700' :
                  discussion.status === 'answered' ? 'bg-green-100 text-green-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {discussion.status}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-solo-gray-600">
                  <span>{discussion.replies} replies</span>
                  <span>{discussion.views} views</span>
                </div>
                <div className="flex gap-2">
                  <SoloButton size="small" icon={Eye}>
                    View
                  </SoloButton>
                  <SoloButton variant="ghost" size="small" icon={MessageSquare}>
                    Reply
                  </SoloButton>
                </div>
              </div>
            </SoloCard>
          ))}
        </div>

        <div className="space-y-4">
          <SoloCard
            title="Forum Stats"
            icon={BarChart3}
            iconColor="bg-solo-primary-light text-solo-primary"
          >
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-solo-gray-600">Active Topics</span>
                <span className="font-semibold text-solo-primary">23</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-solo-gray-600">Your Responses</span>
                <span className="font-semibold">156</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-solo-gray-600">Avg Response Time</span>
                <span className="font-semibold text-solo-success">1.2h</span>
              </div>
            </div>
          </SoloCard>

          <SoloCard
            title="Recent Activity"
            icon={Activity}
            iconColor="bg-solo-info-light text-solo-info"
          >
            <div className="space-y-3">
              <div className="text-sm">
                <p className="font-medium text-solo-dark">New doubt posted</p>
                <p className="text-xs text-solo-gray-500">Constitutional Law - 10 min ago</p>
              </div>
              <div className="text-sm">
                <p className="font-medium text-solo-dark">Reply marked as best answer</p>
                <p className="text-xs text-solo-gray-500">Legal Reasoning - 1 hour ago</p>
              </div>
              <div className="text-sm">
                <p className="font-medium text-solo-dark">Topic resolved</p>
                <p className="text-xs text-solo-gray-500">Current Affairs - 3 hours ago</p>
              </div>
            </div>
          </SoloCard>
        </div>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-solo-dark">Detailed Reports</h2>
          <p className="text-solo-gray-600">Generate comprehensive analytics and reports</p>
        </div>
        <div className="flex gap-3">
          <SoloButton variant="ghost" icon={Calendar}>Date Range</SoloButton>
          <SoloButton icon={Download}>Export All</SoloButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: 'Student Performance Report', description: 'Detailed analysis of student progress', generated: '2 hours ago', format: 'PDF', size: '2.4 MB' },
          { title: 'Class Attendance Summary', description: 'Monthly attendance patterns', generated: '1 day ago', format: 'XLSX', size: '1.8 MB' },
          { title: 'Assignment Analytics', description: 'Submission and grading statistics', generated: '2 days ago', format: 'PDF', size: '3.1 MB' },
          { title: 'Live Session Analytics', description: 'Engagement and participation metrics', generated: '3 days ago', format: 'PDF', size: '1.9 MB' },
          { title: 'Parent Communication Log', description: 'Summary of parent interactions', generated: '5 days ago', format: 'XLSX', size: '856 KB' },
          { title: 'Resource Usage Report', description: 'Most accessed materials and resources', generated: '1 week ago', format: 'PDF', size: '1.2 MB' }
        ].map((report, index) => (
          <SoloCard key={index} hover>
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                report.format === 'PDF' ? 'bg-red-100' : 'bg-green-100'
              }`}>
                <FileText className={`h-5 w-5 ${
                  report.format === 'PDF' ? 'text-red-600' : 'text-green-600'
                }`} />
              </div>
              <span className="text-xs text-solo-gray-500">{report.format}</span>
            </div>
            
            <h4 className="font-semibold text-solo-dark mb-2">{report.title}</h4>
            <p className="text-sm text-solo-gray-600 mb-3">{report.description}</p>
            
            <div className="space-y-1 mb-4">
              <div className="flex justify-between text-xs text-solo-gray-500">
                <span>Generated: {report.generated}</span>
                <span>Size: {report.size}</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <SoloButton size="small" fullWidth icon={Download}>
                Download
              </SoloButton>
              <SoloButton variant="ghost" size="small" icon={RefreshCw}>
                Regenerate
              </SoloButton>
            </div>
          </SoloCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SoloCard
          title="Custom Report Builder"
          icon={Settings}
          iconColor="bg-solo-warning-light text-solo-warning"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-solo-gray-700 mb-2">Report Type</label>
              <select className="w-full p-2 border border-solo-gray-300 rounded-lg">
                <option>Student Performance</option>
                <option>Class Analytics</option>
                <option>Assignment Statistics</option>
                <option>Engagement Metrics</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-solo-gray-700 mb-2">Time Period</label>
              <select className="w-full p-2 border border-solo-gray-300 rounded-lg">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 3 months</option>
                <option>Custom range</option>
              </select>
            </div>
            <SoloButton fullWidth icon={Download}>
              Generate Report
            </SoloButton>
          </div>
        </SoloCard>

        <SoloCard
          title="Report Statistics"
          icon={BarChart3}
          iconColor="bg-solo-info-light text-solo-info"
        >
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-solo-gray-600">Reports Generated This Month</span>
              <span className="font-semibold">24</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-solo-gray-600">Most Generated Report</span>
              <span className="font-semibold">Student Performance</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-solo-gray-600">Total Downloads</span>
              <span className="font-semibold">156</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-solo-gray-600">Avg Generation Time</span>
              <span className="font-semibold text-solo-success">2.3 sec</span>
            </div>
          </div>
        </SoloCard>
      </div>
    </div>
  );

  const renderContentLibrary = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-solo-dark">Content Library</h2>
          <p className="text-solo-gray-600">Centralized repository of all educational content</p>
        </div>
        <div className="flex gap-3">
          <SoloButton variant="ghost" icon={Filter}>Filter</SoloButton>
          <SoloButton icon={Plus}>Add Content</SoloButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Constitutional Law Masterclass', type: 'Video Series', duration: '8h 45m', views: 1234, rating: 4.8, category: 'Constitutional Law' },
          { title: 'Legal Reasoning Techniques', type: 'Interactive Course', modules: 24, completions: 567, rating: 4.6, category: 'Legal Reasoning' },
          { title: 'Current Affairs Database', type: 'Document Collection', files: 156, downloads: 890, rating: 4.7, category: 'Current Affairs' },
          { title: 'Mock Test Question Bank', type: 'Question Set', questions: 2456, attempts: 3421, rating: 4.9, category: 'Practice' },
          { title: 'CLAT Success Stories', type: 'Case Studies', stories: 45, reads: 678, rating: 4.5, category: 'Motivation' },
          { title: 'English Comprehension Guide', type: 'Study Material', pages: 234, downloads: 445, rating: 4.4, category: 'English' },
          { title: 'Quantitative Aptitude Shortcuts', type: 'Reference Guide', formulas: 89, bookmarks: 234, rating: 4.6, category: 'Quantitative' },
          { title: 'Interview Preparation Kit', type: 'Resource Pack', resources: 67, accesses: 123, rating: 4.7, category: 'Interview Prep' }
        ].map((content, index) => (
          <SoloCard key={index} hover>
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                content.type.includes('Video') ? 'bg-red-100' :
                content.type.includes('Interactive') ? 'bg-blue-100' :
                content.type.includes('Document') ? 'bg-green-100' :
                content.type.includes('Question') ? 'bg-yellow-100' :
                'bg-purple-100'
              }`}>
                {content.type.includes('Video') ? <Video className="h-5 w-5 text-red-600" /> :
                 content.type.includes('Interactive') ? <Brain className="h-5 w-5 text-blue-600" /> :
                 content.type.includes('Document') ? <Database className="h-5 w-5 text-green-600" /> :
                 content.type.includes('Question') ? <HelpCircle className="h-5 w-5 text-yellow-600" /> :
                 <Bookmark className="h-5 w-5 text-purple-600" />}
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-500" />
                <span className="text-xs text-solo-gray-600">{content.rating}</span>
              </div>
            </div>
            
            <h4 className="font-semibold text-solo-dark mb-2 line-clamp-2">{content.title}</h4>
            <p className="text-xs text-solo-gray-500 mb-2">{content.category}</p>
            <p className="text-sm text-solo-gray-600 mb-3">{content.type}</p>
            
            <div className="space-y-1 mb-4 text-xs text-solo-gray-500">
              {content.duration && <p>Duration: {content.duration}</p>}
              {content.modules && <p>Modules: {content.modules}</p>}
              {content.files && <p>Files: {content.files}</p>}
              {content.questions && <p>Questions: {content.questions}</p>}
              {content.stories && <p>Stories: {content.stories}</p>}
              {content.pages && <p>Pages: {content.pages}</p>}
              {content.formulas && <p>Formulas: {content.formulas}</p>}
              {content.resources && <p>Resources: {content.resources}</p>}
            </div>
            
            <div className="flex gap-2">
              <SoloButton size="small" fullWidth icon={Eye}>
                View
              </SoloButton>
              <SoloButton variant="ghost" size="small" icon={Share2}>
                Share
              </SoloButton>
            </div>
          </SoloCard>
        ))}
      </div>
    </div>
  );

  const renderAssessments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-solo-dark">Assessment Center</h2>
          <p className="text-solo-gray-600">Create and manage tests, quizzes, and evaluations</p>
        </div>
        <div className="flex gap-3">
          <SoloButton variant="ghost" icon={Filter}>Filter</SoloButton>
          <SoloButton icon={Plus}>Create Assessment</SoloButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {[
              { title: 'Constitutional Law Quiz #5', type: 'Quiz', questions: 25, duration: '30 min', attempts: 89, avgScore: 78, status: 'active' },
              { title: 'CLAT Mock Test #16', type: 'Mock Test', questions: 150, duration: '2 hours', attempts: 156, avgScore: 72, status: 'active' },
              { title: 'Legal Reasoning Assessment', type: 'Assessment', questions: 40, duration: '45 min', attempts: 234, avgScore: 85, status: 'completed' },
              { title: 'Current Affairs Weekly Test', type: 'Test', questions: 50, duration: '60 min', attempts: 67, avgScore: 0, status: 'draft' }
            ].map((assessment, index) => (
              <SoloCard key={index} hover>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-solo-dark">{assessment.title}</h4>
                    <p className="text-sm text-solo-gray-600">{assessment.type} • {assessment.questions} questions • {assessment.duration}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    assessment.status === 'active' ? 'bg-green-100 text-green-700' :
                    assessment.status === 'completed' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {assessment.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-lg font-bold text-solo-primary">{assessment.attempts}</p>
                    <p className="text-xs text-solo-gray-600">Attempts</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-solo-success">{assessment.avgScore}%</p>
                    <p className="text-xs text-solo-gray-600">Avg Score</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-solo-info">{assessment.questions}</p>
                    <p className="text-xs text-solo-gray-600">Questions</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <SoloButton size="small" icon={Eye}>
                    View Results
                  </SoloButton>
                  <SoloButton variant="ghost" size="small" icon={Edit}>
                    Edit
                  </SoloButton>
                  <SoloButton variant="ghost" size="small" icon={Copy}>
                    Duplicate
                  </SoloButton>
                </div>
              </SoloCard>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <SoloCard
            title="Assessment Stats"
            icon={BarChart3}
            iconColor="bg-solo-primary-light text-solo-primary"
          >
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-solo-gray-600">Active Assessments</span>
                <span className="font-semibold">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-solo-gray-600">Total Attempts</span>
                <span className="font-semibold">1,456</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-solo-gray-600">Avg Completion Rate</span>
                <span className="font-semibold text-solo-success">87%</span>
              </div>
            </div>
          </SoloCard>

          <SoloCard
            title="Quick Actions"
            icon={Zap}
            iconColor="bg-solo-warning-light text-solo-warning"
          >
            <div className="space-y-2">
              <SoloButton variant="ghost" size="small" fullWidth icon={Plus}>
                Quick Quiz (10 Q)
              </SoloButton>
              <SoloButton variant="ghost" size="small" fullWidth icon={FileText}>
                Practice Test (25 Q)
              </SoloButton>
              <SoloButton variant="ghost" size="small" fullWidth icon={Target}>
                Full Mock Test (150 Q)
              </SoloButton>
              <SoloButton variant="ghost" size="small" fullWidth icon={Brain}>
                AI Generated Test
              </SoloButton>
            </div>
          </SoloCard>
        </div>
      </div>
    </div>
  );

  const renderPerformance = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-solo-dark">Performance Tracking</h2>
          <p className="text-solo-gray-600">Detailed performance analytics and insights</p>
        </div>
        <div className="flex gap-3">
          <SoloButton variant="ghost" icon={Calendar}>Time Range</SoloButton>
          <SoloButton icon={Download}>Export Data</SoloButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SoloStatCard
          title="Teaching Efficiency"
          value="92%"
          change={{ value: 4.2, type: 'increase' }}
          icon={Target}
          color="success"
        />
        <SoloStatCard
          title="Student Engagement"
          value="87%"
          change={{ value: 2.1, type: 'increase' }}
          icon={Users}
          color="primary"
        />
        <SoloStatCard
          title="Content Effectiveness"
          value="84%"
          change={{ value: 1.8, type: 'increase' }}
          icon={BookOpen}
          color="info"
        />
        <SoloStatCard
          title="Response Time"
          value="1.2h"
          change={{ value: 15, type: 'decrease' }}
          icon={Clock}
          color="warning"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SoloCard
          title="Monthly Performance Trends"
          icon={TrendingUp}
          iconColor="bg-solo-primary-light text-solo-primary"
        >
          <div className="h-64 flex items-center justify-center bg-solo-gray-50 rounded-lg">
            <p className="text-solo-gray-500">Performance trends chart</p>
          </div>
        </SoloCard>

        <SoloCard
          title="Class Performance Comparison"
          icon={BarChart3}
          iconColor="bg-solo-success-light text-solo-success"
        >
          <div className="space-y-4">
            {[
              { class: 'CLAT 2024 Batch A', performance: 89, change: 5.2 },
              { class: 'CLAT 2024 Batch B', performance: 84, change: 3.1 },
              { class: 'CLAT 2025 Foundation', performance: 76, change: -1.5 },
              { class: 'Legal Reasoning Advanced', performance: 92, change: 7.8 }
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-solo-gray-700">{item.class}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{item.performance}%</span>
                    <span className={`text-xs ${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {item.change >= 0 ? '↑' : '↓'}{Math.abs(item.change)}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-solo-gray-200 rounded-full h-2">
                  <div className="bg-solo-success h-2 rounded-full" style={{ width: `${item.performance}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </SoloCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SoloCard
          title="Top Performing Students"
          icon={Award}
          iconColor="bg-solo-warning-light text-solo-warning"
        >
          <div className="space-y-3">
            {[
              { name: 'Priya Patel', score: 94, improvement: 8.2 },
              { name: 'Sneha Singh', score: 91, improvement: 6.5 },
              { name: 'Rohit Kumar', score: 89, improvement: 4.1 }
            ].map((student, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${
                    index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{student.name}</p>
                    <p className="text-xs text-solo-gray-500">+{student.improvement}% this month</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-solo-success">{student.score}%</span>
              </div>
            ))}
          </div>
        </SoloCard>

        <SoloCard
          title="Areas for Improvement"
          icon={Target}
          iconColor="bg-solo-error-light text-solo-error"
        >
          <div className="space-y-3">
            <div className="p-3 bg-red-50 rounded-lg border border-red-200">
              <p className="text-sm font-medium text-red-900">Legal Reasoning</p>
              <p className="text-xs text-red-700">15 students below 70%</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm font-medium text-yellow-900">Quantitative Techniques</p>
              <p className="text-xs text-yellow-700">8 students need support</p>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
              <p className="text-sm font-medium text-orange-900">English Comprehension</p>
              <p className="text-xs text-orange-700">12 students struggling</p>
            </div>
          </div>
        </SoloCard>

        <SoloCard
          title="Performance Insights"
          icon={Lightbulb}
          iconColor="bg-solo-info-light text-solo-info"
        >
          <div className="space-y-3">
            <div className="text-sm">
              <p className="font-medium text-solo-dark">Best Teaching Day</p>
              <p className="text-xs text-solo-gray-500">Wednesdays show 15% higher engagement</p>
            </div>
            <div className="text-sm">
              <p className="font-medium text-solo-dark">Most Effective Content</p>
              <p className="text-xs text-solo-gray-500">Video lectures get 23% better retention</p>
            </div>
            <div className="text-sm">
              <p className="font-medium text-solo-dark">Optimal Class Size</p>
              <p className="text-xs text-solo-gray-500">35-40 students show best outcomes</p>
            </div>
          </div>
        </SoloCard>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-solo-dark">Notifications Center</h2>
          <p className="text-solo-gray-600">Manage alerts, reminders, and system notifications</p>
        </div>
        <div className="flex gap-3">
          <SoloButton variant="ghost" icon={Settings}>Settings</SoloButton>
          <SoloButton icon={Bell}>Mark All Read</SoloButton>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {[
            { type: 'urgent', title: 'Assignment Deadline Tomorrow', message: '23 students haven\'t submitted Constitutional Law essay', time: '10 min ago', read: false },
            { type: 'info', title: 'New Student Enrolled', message: 'Rajesh Verma joined CLAT 2024 Batch B', time: '1 hour ago', read: false },
            { type: 'success', title: 'Live Session Completed', message: 'Legal Reasoning class recorded successfully', time: '2 hours ago', read: true },
            { type: 'warning', title: 'Low Attendance Alert', message: 'Current Affairs class had only 60% attendance', time: '3 hours ago', read: true },
            { type: 'info', title: 'Parent Message Received', message: 'Mrs. Sharma inquired about Priya\'s progress', time: '5 hours ago', read: true },
            { type: 'urgent', title: 'System Maintenance', message: 'Scheduled maintenance tonight 2:00 AM - 4:00 AM', time: '1 day ago', read: true }
          ].map((notification, index) => (
            <SoloCard key={index} className={notification.read ? 'opacity-75' : ''}>
              <div className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  notification.type === 'urgent' ? 'bg-red-500' :
                  notification.type === 'warning' ? 'bg-yellow-500' :
                  notification.type === 'success' ? 'bg-green-500' :
                  'bg-blue-500'
                }`}></div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <h4 className={`font-semibold ${notification.read ? 'text-solo-gray-600' : 'text-solo-dark'}`}>
                      {notification.title}
                    </h4>
                    <span className="text-xs text-solo-gray-500">{notification.time}</span>
                  </div>
                  <p className={`text-sm mt-1 ${notification.read ? 'text-solo-gray-500' : 'text-solo-gray-700'}`}>
                    {notification.message}
                  </p>
                  <div className="flex gap-2 mt-3">
                    <SoloButton size="small" icon={Eye}>
                      View Details
                    </SoloButton>
                    {!notification.read && (
                      <SoloButton variant="ghost" size="small" icon={CheckCircle}>
                        Mark Read
                      </SoloButton>
                    )}
                  </div>
                </div>
              </div>
            </SoloCard>
          ))}
        </div>

        <div className="space-y-4">
          <SoloCard
            title="Notification Summary"
            icon={BarChart3}
            iconColor="bg-solo-primary-light text-solo-primary"
          >
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-solo-gray-600">Unread</span>
                <span className="font-semibold text-solo-error">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-solo-gray-600">Today</span>
                <span className="font-semibold">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-solo-gray-600">This Week</span>
                <span className="font-semibold">45</span>
              </div>
            </div>
          </SoloCard>

          <SoloCard
            title="Notification Settings"
            icon={Settings}
            iconColor="bg-solo-info-light text-solo-info"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-solo-gray-600">Email notifications</span>
                <div className="w-10 h-6 bg-solo-success rounded-full relative">
                  <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-solo-gray-600">Assignment reminders</span>
                <div className="w-10 h-6 bg-solo-success rounded-full relative">
                  <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-solo-gray-600">Class notifications</span>
                <div className="w-10 h-6 bg-solo-success rounded-full relative">
                  <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-solo-gray-600">System alerts</span>
                <div className="w-10 h-6 bg-solo-gray-300 rounded-full relative">
                  <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </SoloCard>
        </div>
      </div>
    </div>
  );

  const renderDoubtSolving = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-solo-dark">Student Doubts & Q&A Management</h2>
          <p className="text-solo-gray-600">Manage and respond to student questions</p>
        </div>
        <div className="flex items-center gap-3">
          <SoloButton variant="ghost" icon={Filter}>Filter</SoloButton>
          <SoloButton icon={Brain}>AI Assistant</SoloButton>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <SoloStatCard
          title="Open Doubts"
          value="23"
          change={{ value: 12, type: 'increase' }}
          icon={MessageSquare}
          color="warning"
        />
        <SoloStatCard
          title="Resolved Today"
          value="15"
          change={{ value: 8, type: 'increase' }}
          icon={CheckCircle}
          color="success"
        />
        <SoloStatCard
          title="Response Time"
          value="2.3h"
          change={{ value: 15, type: 'decrease' }}
          icon={Clock}
          color="primary"
        />
        <SoloStatCard
          title="Satisfaction"
          value="4.8/5"
          change={{ value: 3, type: 'increase' }}
          icon={Star}
          color="secondary"
        />
      </div>

      {/* Active Doubts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SoloCard title="Recent Doubts" subtitle="Questions from your students">
            <div className="space-y-4">
              {[
                {
                  id: '1',
                  student: 'Priya Sharma',
                  subject: 'Constitutional Law',
                  question: 'What is the difference between Fundamental Rights and Directive Principles?',
                  priority: 'high',
                  time: '2 hours ago',
                  status: 'open',
                  responses: 0
                },
                {
                  id: '2',
                  student: 'Rahul Kumar',
                  subject: 'Legal Reasoning',
                  question: 'How to solve syllogism problems effectively?',
                  priority: 'medium',
                  time: '5 hours ago',
                  status: 'in_progress',
                  responses: 2
                },
                {
                  id: '3',
                  student: 'Anjali Patel',
                  subject: 'Current Affairs',
                  question: 'Recent changes in judicial appointments process',
                  priority: 'low',
                  time: '1 day ago',
                  status: 'resolved',
                  responses: 4
                }
              ].map((doubt) => (
                <div key={doubt.id} className="p-4 border border-solo-gray-200 rounded-xl hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-solo-dark">{doubt.student}</span>
                        <span className="text-xs bg-solo-gray-100 text-solo-gray-600 px-2 py-1 rounded">
                          {doubt.subject}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          doubt.priority === 'high' ? 'bg-solo-error-light text-solo-error' :
                          doubt.priority === 'medium' ? 'bg-solo-warning-light text-solo-warning' :
                          'bg-solo-info-light text-solo-info'
                        }`}>
                          {doubt.priority}
                        </span>
                      </div>
                      <p className="text-sm text-solo-gray-700 mb-2">{doubt.question}</p>
                      <div className="flex items-center gap-4 text-xs text-solo-gray-500">
                        <span>{doubt.time}</span>
                        <span>{doubt.responses} responses</span>
                        <span className={`px-2 py-1 rounded ${
                          doubt.status === 'resolved' ? 'bg-solo-success-light text-solo-success' :
                          doubt.status === 'in_progress' ? 'bg-solo-warning-light text-solo-warning' :
                          'bg-solo-error-light text-solo-error'
                        }`}>
                          {doubt.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <SoloButton variant="ghost" size="small" icon={Eye}>
                        View
                      </SoloButton>
                      <SoloButton size="small" icon={Send}>
                        Respond
                      </SoloButton>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <SoloButton variant="ghost">View All Doubts</SoloButton>
            </div>
          </SoloCard>
        </div>

        <div>
          <SoloCard title="AI Teaching Assistant" subtitle="Get AI help for responses">
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-solo-primary-light to-solo-secondary-light rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="h-5 w-5 text-solo-primary" />
                  <span className="font-medium text-solo-dark">Smart Response Suggestions</span>
                </div>
                <p className="text-sm text-solo-gray-700 mb-3">
                  AI can help generate comprehensive answers for common legal concepts
                </p>
                <SoloButton size="small" fullWidth>Try AI Assistant</SoloButton>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-solo-warning" />
                  <span className="text-sm font-medium">Quick Templates</span>
                </div>
                {[
                  'Constitutional Law Explanation',
                  'Case Study Analysis',
                  'Legal Reasoning Steps',
                  'Current Affairs Update'
                ].map((template, index) => (
                  <button key={index} className="w-full text-left p-2 text-sm bg-solo-gray-50 hover:bg-solo-gray-100 rounded-lg transition-colors">
                    {template}
                  </button>
                ))}
              </div>

              <div className="pt-3 border-t border-solo-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-4 w-4 text-solo-secondary" />
                  <span className="text-sm font-medium">Recent AI Insights</span>
                </div>
                <div className="text-xs text-solo-gray-600 space-y-1">
                  <p>• 89% of AI responses rated 4+ stars</p>
                  <p>• Reduced response time by 45%</p>
                  <p>• Students prefer detailed explanations</p>
                </div>
              </div>
            </div>
          </SoloCard>
        </div>
      </div>

      {/* Response Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SoloCard title="Subject-wise Doubts" subtitle="Track question patterns">
          <div className="space-y-4">
            {[
              { subject: 'Constitutional Law', count: 45, trend: 'up', color: 'bg-solo-primary' },
              { subject: 'Legal Reasoning', count: 32, trend: 'stable', color: 'bg-solo-secondary' },
              { subject: 'Current Affairs', count: 28, trend: 'down', color: 'bg-solo-success' },
              { subject: 'English Language', count: 19, trend: 'up', color: 'bg-solo-warning' },
              { subject: 'Quantitative Techniques', count: 15, trend: 'stable', color: 'bg-solo-info' }
            ].map((item) => (
              <div key={item.subject} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                  <span className="font-medium text-solo-dark">{item.subject}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">{item.count}</span>
                  <div className={`w-2 h-2 rounded-full ${
                    item.trend === 'up' ? 'bg-solo-success' :
                    item.trend === 'down' ? 'bg-solo-error' : 'bg-solo-gray-400'
                  }`}></div>
                </div>
              </div>
            ))}
          </div>
        </SoloCard>

        <SoloCard title="Response Quality" subtitle="Student feedback metrics">
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-solo-primary mb-1">4.8</div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-solo-warning text-solo-warning" />
                ))}
              </div>
              <div className="text-sm text-solo-gray-600">Average rating from students</div>
            </div>
            
            <div className="space-y-3">
              {[
                { rating: 5, count: 156, percentage: 68 },
                { rating: 4, count: 45, percentage: 20 },
                { rating: 3, count: 18, percentage: 8 },
                { rating: 2, count: 6, percentage: 3 },
                { rating: 1, count: 3, percentage: 1 }
              ].map((item) => (
                <div key={item.rating} className="flex items-center gap-3">
                  <span className="text-sm w-6">{item.rating}★</span>
                  <div className="flex-1 bg-solo-gray-200 rounded-full h-2">
                    <div 
                      className="bg-solo-warning h-2 rounded-full" 
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-solo-gray-600 w-8">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </SoloCard>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-solo-dark">Settings & Preferences</h2>
          <p className="text-solo-gray-600">Configure your dashboard and account settings</p>
        </div>
        <SoloButton icon={Save}>Save Changes</SoloButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SoloCard
          title="Profile Settings"
          icon={User}
          iconColor="bg-solo-primary-light text-solo-primary"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-solo-gray-700 mb-2">Display Name</label>
              <input
                type="text"
                className="w-full p-3 border border-solo-gray-300 rounded-lg"
                defaultValue={user.name}
                placeholder="Your display name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-solo-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full p-3 border border-solo-gray-300 rounded-lg"
                defaultValue={user.email}
                placeholder="Your email address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-solo-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                className="w-full p-3 border border-solo-gray-300 rounded-lg"
                placeholder="Your phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-solo-gray-700 mb-2">Bio</label>
              <textarea
                className="w-full p-3 border border-solo-gray-300 rounded-lg"
                rows={3}
                placeholder="Tell students about yourself..."
              ></textarea>
            </div>
          </div>
        </SoloCard>

        <SoloCard
          title="Dashboard Preferences"
          icon={Monitor}
          iconColor="bg-solo-success-light text-solo-success"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-solo-gray-700 mb-2">Theme</label>
              <select className="w-full p-3 border border-solo-gray-300 rounded-lg">
                <option>Light Mode</option>
                <option>Dark Mode</option>
                <option>Auto (System)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-solo-gray-700 mb-2">Language</label>
              <select className="w-full p-3 border border-solo-gray-300 rounded-lg">
                <option>English</option>
                <option>Hindi</option>
                <option>Bengali</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-solo-gray-700 mb-2">Timezone</label>
              <select className="w-full p-3 border border-solo-gray-300 rounded-lg">
                <option>Asia/Kolkata (IST)</option>
                <option>Asia/Dubai (GST)</option>
                <option>UTC</option>
              </select>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-solo-gray-600">Show student photos</span>
                <div className="w-10 h-6 bg-solo-success rounded-full relative">
                  <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-solo-gray-600">Auto-save drafts</span>
                <div className="w-10 h-6 bg-solo-success rounded-full relative">
                  <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </SoloCard>

        <SoloCard
          title="Class Settings"
          icon={GraduationCap}
          iconColor="bg-solo-warning-light text-solo-warning"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-solo-gray-700 mb-2">Default Class Duration</label>
              <select className="w-full p-3 border border-solo-gray-300 rounded-lg">
                <option>60 minutes</option>
                <option>90 minutes</option>
                <option>120 minutes</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-solo-gray-700 mb-2">Grade Scale</label>
              <select className="w-full p-3 border border-solo-gray-300 rounded-lg">
                <option>Percentage (0-100)</option>
                <option>GPA (0-4.0)</option>
                <option>Letter Grades (A-F)</option>
              </select>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-solo-gray-600">Auto-record sessions</span>
                <div className="w-10 h-6 bg-solo-success rounded-full relative">
                  <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-solo-gray-600">Send assignment reminders</span>
                <div className="w-10 h-6 bg-solo-success rounded-full relative">
                  <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-solo-gray-600">Allow late submissions</span>
                <div className="w-10 h-6 bg-solo-gray-300 rounded-full relative">
                  <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </SoloCard>

        <SoloCard
          title="Privacy & Security"
          icon={Shield}
          iconColor="bg-solo-error-light text-solo-error"
        >
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-solo-gray-600">Two-factor authentication</span>
                <div className="w-10 h-6 bg-solo-success rounded-full relative">
                  <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-solo-gray-600">Login notifications</span>
                <div className="w-10 h-6 bg-solo-success rounded-full relative">
                  <div className="absolute right-0.5 top-0.5 w-5 h-5 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-solo-gray-600">Data sharing consent</span>
                <div className="w-10 h-6 bg-solo-gray-300 rounded-full relative">
                  <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full"></div>
                </div>
              </div>
            </div>
            <div className="pt-4 border-t border-solo-gray-200">
              <SoloButton variant="ghost" size="small" fullWidth icon={Key}>
                Change Password
              </SoloButton>
              <SoloButton variant="ghost" size="small" fullWidth icon={Download} className="mt-2">
                Export Data
              </SoloButton>
            </div>
          </div>
        </SoloCard>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'students':
        return renderStudents();
      case 'classes':
        return renderClasses();
      case 'assignments':
        return renderAssignments();
      case 'grading':
        return renderGrading();
      case 'lessons':
        return renderLessons();
      case 'live-sessions':
        return renderLiveSessions();
      case 'analytics':
        return renderAnalytics();
      case 'ai-assistant':
        return renderAIAssistant();
      case 'communication':
        return renderCommunication();
      case 'schedule':
        return renderSchedule();
      case 'resources':
        return renderResources();
      case 'discussions':
        return renderDiscussions();
      case 'reports':
        return renderReports();
      case 'content':
        return renderContentLibrary();
      case 'assessments':
        return renderAssessments();
      case 'performance':
        return renderPerformance();
      case 'doubt-solving':
        return renderDoubtSolving();
      case 'notifications':
        return renderNotifications();
      case 'settings':
        return renderSettings();
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
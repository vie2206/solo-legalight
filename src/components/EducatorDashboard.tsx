import React, { useState, useEffect } from 'react';
import { 
  Users, BookOpen, BarChart3, Settings, Clock, Award,
  Target, TrendingUp, Activity, Calendar, MessageSquare,
  FileText, Star, Brain, Zap, Eye, Plus, Edit, Trash2,
  CheckCircle, AlertTriangle, ArrowUp, ArrowDown, Send,
  Download, Filter, Search, RefreshCw, UserPlus, Bell
} from 'lucide-react';

interface EducatorDashboardProps {
  user: any;
  onLogout: () => void;
}

interface Student {
  id: string;
  name: string;
  email: string;
  score: number;
  improvement: string;
  status: 'excellent' | 'good' | 'needsAttention';
  lastLogin: string;
  completedAssignments: number;
  totalAssignments: number;
  averageTime: number;
}

interface Assignment {
  id: string;
  title: string;
  type: string;
  dueDate: string;
  submissions: number;
  totalStudents: number;
  status: 'active' | 'completed' | 'draft';
  averageScore?: number;
}

interface ClassSchedule {
  id: string;
  subject: string;
  time: string;
  duration: string;
  students: number;
  room?: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

const EducatorDashboard: React.FC<EducatorDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'students' | 'assignments' | 'content' | 'analytics' | 'schedule'>('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [modalType, setModalType] = useState<'assignment' | 'announcement' | 'class' | null>(null);

  // State for real data
  const [educatorStats, setEducatorStats] = useState({
    totalStudents: 0,
    activeStudents: 0,
    averageScore: 0,
    completionRate: 0,
    upcomingClasses: 0,
    pendingAssignments: 0,
    messageCount: 0,
    contentCreated: 0
  });
  const [students, setStudents] = useState<Student[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [schedule, setSchedule] = useState<ClassSchedule[]>([]);

  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  // Fetch educator dashboard data
  const fetchEducatorData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE}/api/dashboards/educator`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        
        // Update stats
        setEducatorStats({
          totalStudents: data.student_analytics?.total_students || 0,
          activeStudents: data.student_analytics?.active_students_this_week || 0,
          averageScore: data.student_analytics?.average_class_score || 0,
          completionRate: data.performance_overview?.challenge_completion_rate || 0,
          upcomingClasses: data.classes?.length || 0,
          pendingAssignments: 5, // Placeholder
          messageCount: 8, // Placeholder
          contentCreated: 12 // Placeholder
        });
        
        setClasses(data.classes || []);
        
        // Process students data
        const allStudents: Student[] = [];
        data.classes?.forEach((cls: any) => {
          cls.students?.forEach((student: any) => {
            allStudents.push({
              id: student.id,
              name: student.name,
              email: student.email,
              score: cls.performance?.average_score || 0,
              improvement: '+5%', // Placeholder calculation
              status: cls.performance?.average_score > 80 ? 'excellent' : 
                     cls.performance?.average_score > 60 ? 'good' : 'needsAttention',
              lastLogin: '2024-01-30',
              completedAssignments: 8,
              totalAssignments: 10,
              averageTime: 45
            });
          });
        });
        setStudents(allStudents);
        
      } else {
        console.log('Failed to fetch educator data, using fallback');
        setEducatorStats({
          totalStudents: 45,
          activeStudents: 38,
          averageScore: 74.2,
          completionRate: 82.5,
          upcomingClasses: 3,
          pendingAssignments: 7,
          messageCount: 12,
          contentCreated: 15
        });
        setStudents(generateMockStudents());
        setAssignments(generateMockAssignments());
        setSchedule(generateMockSchedule());
      }
    } catch (error) {
      console.error('Error fetching educator data:', error);
      setError('Failed to load dashboard data. Using offline mode.');
      
      // Fallback to mock data
      setEducatorStats({
        totalStudents: 45,
        activeStudents: 38,
        averageScore: 74.2,
        completionRate: 82.5,
        upcomingClasses: 3,
        pendingAssignments: 7,
        messageCount: 12,
        contentCreated: 15
      });
      setStudents(generateMockStudents());
      setAssignments(generateMockAssignments());
      setSchedule(generateMockSchedule());
    } finally {
      setLoading(false);
    }
  };
  
  // Generate mock data functions
  const generateMockStudents = (): Student[] => [
    { id: '1', name: 'Raj Patel', email: 'raj@example.com', score: 89, improvement: '+12%', status: 'excellent', lastLogin: '2024-01-30', completedAssignments: 9, totalAssignments: 10, averageTime: 42 },
    { id: '2', name: 'Priya Sharma', email: 'priya@example.com', score: 76, improvement: '+8%', status: 'good', lastLogin: '2024-01-29', completedAssignments: 8, totalAssignments: 10, averageTime: 38 },
    { id: '3', name: 'Arjun Kumar', email: 'arjun@example.com', score: 65, improvement: '-3%', status: 'needsAttention', lastLogin: '2024-01-28', completedAssignments: 6, totalAssignments: 10, averageTime: 55 },
    { id: '4', name: 'Sneha Gupta', email: 'sneha@example.com', score: 82, improvement: '+15%', status: 'excellent', lastLogin: '2024-01-30', completedAssignments: 10, totalAssignments: 10, averageTime: 35 },
    { id: '5', name: 'Vikram Singh', email: 'vikram@example.com', score: 71, improvement: '+5%', status: 'good', lastLogin: '2024-01-29', completedAssignments: 7, totalAssignments: 10, averageTime: 48 }
  ];
  
  const generateMockAssignments = (): Assignment[] => [
    { id: '1', title: 'Constitutional Law Essay', type: 'Essay', dueDate: '2024-02-05', submissions: 38, totalStudents: 45, status: 'active', averageScore: 76 },
    { id: '2', title: 'Legal Reasoning Quiz', type: 'Quiz', dueDate: '2024-02-03', submissions: 42, totalStudents: 45, status: 'active', averageScore: 82 },
    { id: '3', title: 'Case Study Analysis', type: 'Project', dueDate: '2024-02-10', submissions: 12, totalStudents: 45, status: 'active' },
    { id: '4', title: 'Mock Test Practice', type: 'Test', dueDate: '2024-02-01', submissions: 45, totalStudents: 45, status: 'completed', averageScore: 74 }
  ];
  
  const generateMockSchedule = (): ClassSchedule[] => [
    { id: '1', subject: 'Legal Reasoning', time: '10:00 AM', duration: '2 hours', students: 15, room: 'Room 201', status: 'upcoming' },
    { id: '2', subject: 'Constitutional Law', time: '2:00 PM', duration: '1.5 hours', students: 12, room: 'Room 305', status: 'upcoming' },
    { id: '3', subject: 'Mock Test Review', time: '4:30 PM', duration: '1 hour', students: 20, status: 'upcoming' }
  ];
  
  useEffect(() => {
    fetchEducatorData();
  }, []);
  
  // Filter students based on search and class
  const filteredStudents = students.filter(student => {
    const matchesSearch = searchTerm === '' || 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const recentStudents = [
    { id: '1', name: 'Raj Patel', score: 89, improvement: '+12%', status: 'excellent' },
    { id: '2', name: 'Priya Sharma', score: 76, improvement: '+8%', status: 'good' },
    { id: '3', name: 'Arjun Kumar', score: 65, improvement: '-3%', status: 'needsAttention' },
    { id: '4', name: 'Sneha Gupta', score: 82, improvement: '+15%', status: 'excellent' },
    { id: '5', name: 'Vikram Singh', score: 71, improvement: '+5%', status: 'good' }
  ];

  const upcomingClasses = [
    { id: '1', subject: 'Legal Reasoning', time: '10:00 AM', students: 15, duration: '2 hours' },
    { id: '2', subject: 'Constitutional Law', time: '2:00 PM', students: 12, duration: '1.5 hours' },
    { id: '3', subject: 'Mock Test Review', time: '4:30 PM', students: 20, duration: '1 hour' }
  ];

  // Handle assignment creation
  const handleCreateAssignment = () => {
    setModalType('assignment');
    setShowCreateModal(true);
  };
  
  // Handle sending announcement
  const handleSendAnnouncement = () => {
    setModalType('announcement');
    setShowCreateModal(true);
  };
  
  // Handle student messaging
  const handleMessageStudent = (studentId: string) => {
    alert(`Opening chat with student ID: ${studentId}`);
  };
  
  // Handle assignment grading
  const handleGradeAssignment = (assignmentId: string) => {
    alert(`Opening grading interface for assignment: ${assignmentId}`);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-indigo-600" />
          <p className="text-gray-600">Loading educator dashboard...</p>
        </div>
      </div>
    );
  }
  
  const renderOverview = () => (
    <div className="space-y-6">
      {/* Error Banner */}
      {error && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
            <p className="text-yellow-800">{error}</p>
            <button 
              onClick={fetchEducatorData}
              className="ml-auto text-yellow-600 hover:text-yellow-800"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Students</p>
              <p className="text-3xl font-bold">{educatorStats.totalStudents}</p>
              <p className="text-blue-100 text-sm mt-1">{educatorStats.activeStudents} active this week</p>
            </div>
            <Users className="w-12 h-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Average Score</p>
              <p className="text-3xl font-bold">{educatorStats.averageScore}%</p>
              <p className="text-green-100 text-sm mt-1">across all students</p>
            </div>
            <Target className="w-12 h-12 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Completion Rate</p>
              <p className="text-3xl font-bold">{educatorStats.completionRate}%</p>
              <p className="text-purple-100 text-sm mt-1">assignment completion</p>
            </div>
            <BarChart3 className="w-12 h-12 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Upcoming Classes</p>
              <p className="text-3xl font-bold">{educatorStats.upcomingClasses}</p>
              <p className="text-orange-100 text-sm mt-1">today's schedule</p>
            </div>
            <Calendar className="w-12 h-12 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Recent Student Performance */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-6 flex items-center">
          <TrendingUp className="w-6 h-6 mr-2 text-indigo-600" />
          Recent Student Performance
        </h3>
        
        <div className="space-y-4">
          {recentStudents.map((student) => (
            <div key={student.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-indigo-600 font-semibold text-sm">
                    {student.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{student.name}</h4>
                  <p className="text-sm text-gray-600">Latest score: {student.score}%</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${
                  student.status === 'excellent' ? 'bg-green-100 text-green-800' :
                  student.status === 'good' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {student.improvement}
                </div>
                <p className="text-xs text-gray-500 mt-1">improvement</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-6 flex items-center">
          <Clock className="w-6 h-6 mr-2 text-green-600" />
          Today's Schedule
        </h3>
        
        <div className="space-y-4">
          {upcomingClasses.map((classItem) => (
            <div key={classItem.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-indigo-300 transition-colors">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{classItem.subject}</h4>
                  <p className="text-sm text-gray-600">{classItem.time} • {classItem.duration}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{classItem.students} students</p>
                <button className="text-sm text-indigo-600 hover:text-indigo-800 mt-1">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-6 flex items-center">
          <Zap className="w-6 h-6 mr-2 text-yellow-600" />
          Quick Actions
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="p-4 border-2 border-dashed border-indigo-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors text-center">
            <Plus className="w-8 h-8 mx-auto mb-2 text-indigo-500" />
            <p className="font-medium text-indigo-700">Create Assignment</p>
          </button>
          
          <button className="p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors text-center">
            <MessageSquare className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <p className="font-medium text-green-700">Message Students</p>
          </button>
          
          <button className="p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors text-center">
            <BarChart3 className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <p className="font-medium text-purple-700">View Analytics</p>
          </button>
          
          <button className="p-4 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors text-center">
            <Settings className="w-8 h-8 mx-auto mb-2 text-orange-600" />
            <p className="font-medium text-orange-700">Class Settings</p>
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-white">Educator Dashboard</h1>
              <p className="text-indigo-100 mt-1">Welcome back, {user.name}!</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 rounded-lg px-3 py-2">
                <span className="text-white text-sm font-medium">Educator Portal</span>
              </div>
              <button
                onClick={onLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview', icon: Activity },
              { id: 'students', label: 'My Students', icon: Users },
              { id: 'assignments', label: 'Assignments', icon: FileText },
              { id: 'content', label: 'Content', icon: BookOpen },
              { id: 'analytics', label: 'Analytics', icon: BarChart3 },
              { id: 'schedule', label: 'Schedule', icon: Calendar }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center px-1 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && renderOverview()}
        
        {activeTab === 'students' && (
          <div className="space-y-6">
            {/* Students Header with Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold flex items-center">
                  <Users className="w-6 h-6 mr-2 text-indigo-600" />
                  My Students ({filteredStudents.length})
                </h3>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={handleSendAnnouncement}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center font-medium"
                  >
                    <Bell className="w-4 h-4 mr-2" />
                    Send Announcement
                  </button>
                  <button 
                    onClick={() => fetchEducatorData()}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center font-medium"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </button>
                </div>
              </div>
              
              {/* Search and Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search students by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <select 
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="all">All Classes</option>
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>{cls.name}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Students Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStudents.map((student) => (
                <div key={student.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-3">
                        {student.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{student.name}</h4>
                        <p className="text-sm text-gray-600">{student.email}</p>
                      </div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      student.status === 'excellent' ? 'bg-green-100 text-green-800' :
                      student.status === 'good' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {student.status === 'excellent' ? 'Excellent' :
                       student.status === 'good' ? 'Good' : 'Needs Attention'}
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Latest Score:</span>
                      <span className="font-semibold">{student.score}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Improvement:</span>
                      <span className={`font-semibold ${
                        student.improvement.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>{student.improvement}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Assignments:</span>
                      <span className="font-semibold">{student.completedAssignments}/{student.totalAssignments}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Avg. Time:</span>
                      <span className="font-semibold">{student.averageTime}m</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleMessageStudent(student.id)}
                      className="flex-1 bg-indigo-100 hover:bg-indigo-200 text-indigo-700 py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center"
                    >
                      <MessageSquare className="w-4 h-4 mr-1" />
                      Message
                    </button>
                    <button 
                      onClick={() => alert(`Viewing detailed analytics for ${student.name}`)}
                      className="flex-1 bg-purple-100 hover:bg-purple-200 text-purple-700 py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center"
                    >
                      <BarChart3 className="w-4 h-4 mr-1" />
                      Analytics
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {filteredStudents.length === 0 && (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Students Found</h3>
                <p className="text-gray-600">No students match your current search criteria.</p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'assignments' && (
          <div className="space-y-6">
            {/* Assignments Header */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold flex items-center">
                  <FileText className="w-6 h-6 mr-2 text-green-600" />
                  Assignments & Tests
                </h3>
                <button 
                  onClick={handleCreateAssignment}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center font-medium"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Assignment
                </button>
              </div>
            </div>
            
            {/* Assignments List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {assignments.map((assignment) => (
                <div key={assignment.id} className="bg-white rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{assignment.title}</h4>
                      <div className="flex items-center mt-1">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          assignment.type === 'Quiz' ? 'bg-blue-100 text-blue-800' :
                          assignment.type === 'Essay' ? 'bg-purple-100 text-purple-800' :
                          assignment.type === 'Project' ? 'bg-orange-100 text-orange-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {assignment.type}
                        </span>
                        <span className="ml-2 text-sm text-gray-600">Due: {assignment.dueDate}</span>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      assignment.status === 'active' ? 'bg-green-100 text-green-800' :
                      assignment.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {assignment.status}
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Submissions:</span>
                      <span className="font-semibold">{assignment.submissions}/{assignment.totalStudents}</span>
                    </div>
                    {assignment.averageScore && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Average Score:</span>
                        <span className="font-semibold">{assignment.averageScore}%</span>
                      </div>
                    )}
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${(assignment.submissions / assignment.totalStudents) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleGradeAssignment(assignment.id)}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Grade
                    </button>
                    <button 
                      onClick={() => alert(`Viewing analytics for ${assignment.title}`)}
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-2 px-3 rounded-lg text-sm font-medium flex items-center justify-center"
                    >
                      <BarChart3 className="w-4 h-4 mr-1" />
                      Analytics
                    </button>
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-2 rounded-lg">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'content' && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold mb-4">Content Creation & Management</h3>
            <p className="text-gray-600">Content creation tools and library management would be implemented here.</p>
          </div>
        )}
        
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Analytics Header */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold flex items-center mb-6">
                <BarChart3 className="w-6 h-6 mr-2 text-purple-600" />
                Student Analytics & Performance
              </h3>
              
              {/* Performance Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-blue-700 mb-2">Class Average</h4>
                  <p className="text-2xl font-bold text-blue-900">{educatorStats.averageScore}%</p>
                  <p className="text-sm text-blue-600">+5% from last month</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-green-700 mb-2">Completion Rate</h4>
                  <p className="text-2xl font-bold text-green-900">{educatorStats.completionRate}%</p>
                  <p className="text-sm text-green-600">+8% from last month</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-orange-700 mb-2">Active Students</h4>
                  <p className="text-2xl font-bold text-orange-900">{educatorStats.activeStudents}</p>
                  <p className="text-sm text-orange-600">of {educatorStats.totalStudents} total</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-purple-700 mb-2">Improvement</h4>
                  <p className="text-2xl font-bold text-purple-900">+12%</p>
                  <p className="text-sm text-purple-600">average improvement</p>
                </div>
              </div>
            </div>
            
            {/* Performance Trends */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h4 className="text-lg font-semibold mb-4">Performance Trends</h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-gray-700 mb-3">Top Performers</h5>
                  <div className="space-y-2">
                    {students.filter(s => s.status === 'excellent').slice(0, 5).map((student, index) => (
                      <div key={student.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center">
                          <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3">
                            {index + 1}
                          </span>
                          <span className="font-medium">{student.name}</span>
                        </div>
                        <span className="text-green-700 font-semibold">{student.score}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h5 className="font-medium text-gray-700 mb-3">Needs Attention</h5>
                  <div className="space-y-2">
                    {students.filter(s => s.status === 'needsAttention').slice(0, 5).map((student) => (
                      <div key={student.id} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <div className="flex items-center">
                          <AlertTriangle className="w-4 h-4 text-red-500 mr-3" />
                          <span className="font-medium">{student.name}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-red-700 font-semibold">{student.score}%</span>
                          <p className="text-xs text-red-600">{student.improvement}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Assignment Analytics */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h4 className="text-lg font-semibold mb-4">Assignment Performance</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {assignments.filter(a => a.averageScore).map((assignment) => (
                  <div key={assignment.id} className="border border-gray-200 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-2">{assignment.title}</h5>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Average Score:</span>
                      <span className="font-semibold">{assignment.averageScore}%</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Submissions:</span>
                      <span className="font-semibold">{assignment.submissions}/{assignment.totalStudents}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          assignment.averageScore! > 80 ? 'bg-green-500' : 
                          assignment.averageScore! > 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${assignment.averageScore}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'schedule' && (
          <div className="space-y-6">
            {/* Schedule Header */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold flex items-center">
                  <Calendar className="w-6 h-6 mr-2 text-orange-600" />
                  Class Schedule & Calendar
                </h3>
                <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center font-medium">
                  <Plus className="w-4 h-4 mr-2" />
                  Schedule Class
                </button>
              </div>
              
              {/* Today's Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-blue-700 mb-2">Today's Classes</h4>
                  <p className="text-2xl font-bold text-blue-900">{schedule.filter(s => s.status === 'upcoming').length}</p>
                  <p className="text-sm text-blue-600">upcoming sessions</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-green-700 mb-2">Total Students</h4>
                  <p className="text-2xl font-bold text-green-900">{schedule.reduce((sum, s) => sum + s.students, 0)}</p>
                  <p className="text-sm text-green-600">across all classes</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-purple-700 mb-2">Teaching Hours</h4>
                  <p className="text-2xl font-bold text-purple-900">6.5</p>
                  <p className="text-sm text-purple-600">hours today</p>
                </div>
              </div>
            </div>
            
            {/* Today's Schedule */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h4 className="text-lg font-semibold mb-4">Today's Schedule</h4>
              <div className="space-y-4">
                {schedule.map((classItem) => (
                  <div key={classItem.id} className="flex items-center justify-between p-4 rounded-lg border-l-4 border-orange-500 bg-orange-50 hover:bg-orange-100 transition-colors">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mr-4">
                        <Clock className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900">{classItem.subject}</h5>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <span>{classItem.time}</span>
                          <span className="mx-2">•</span>
                          <span>{classItem.duration}</span>
                          {classItem.room && (
                            <>
                              <span className="mx-2">•</span>
                              <span>{classItem.room}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center mb-2">
                        <Users className="w-4 h-4 text-gray-500 mr-1" />
                        <span className="font-semibold text-gray-900">{classItem.students} students</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          classItem.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                          classItem.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {classItem.status === 'upcoming' ? 'Upcoming' :
                           classItem.status === 'ongoing' ? 'Ongoing' : 'Completed'}
                        </span>
                        <button className="text-orange-600 hover:text-orange-800 p-1">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Weekly Overview */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h4 className="text-lg font-semibold mb-4">Weekly Overview</h4>
              <div className="grid grid-cols-7 gap-4">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                  <div key={day} className="text-center">
                    <h5 className="font-medium text-gray-700 mb-2">{day}</h5>
                    <div className="space-y-1">
                      {index < 5 && ( // Show classes only for weekdays
                        <>
                          <div className="bg-blue-100 text-blue-800 text-xs p-1 rounded">10:00 AM</div>
                          <div className="bg-green-100 text-green-800 text-xs p-1 rounded">2:00 PM</div>
                          {index < 3 && <div className="bg-purple-100 text-purple-800 text-xs p-1 rounded">4:30 PM</div>}
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      
      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">
                {modalType === 'assignment' ? 'Create New Assignment' :
                 modalType === 'announcement' ? 'Send Announcement' :
                 'Create New Item'}
              </h3>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            
            {modalType === 'assignment' && (
              <form className="space-y-4" onSubmit={(e) => {
                e.preventDefault();
                alert('Assignment created successfully!');
                setShowCreateModal(false);
              }}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assignment Title</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter assignment title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="quiz">Quiz</option>
                    <option value="essay">Essay</option>
                    <option value="project">Project</option>
                    <option value="test">Test</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                  <input 
                    type="date" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Instructions</label>
                  <textarea 
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter assignment instructions..."
                  />
                </div>
                <div className="flex space-x-3">
                  <button 
                    type="submit"
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg font-medium"
                  >
                    Create Assignment
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
            
            {modalType === 'announcement' && (
              <form className="space-y-4" onSubmit={(e) => {
                e.preventDefault();
                alert('Announcement sent successfully!');
                setShowCreateModal(false);
              }}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter announcement subject"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    <option value="all">All Students</option>
                    {classes.map((cls) => (
                      <option key={cls.id} value={cls.id}>{cls.name} Students</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea 
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter your announcement message..."
                    required
                  />
                </div>
                <div className="flex space-x-3">
                  <button 
                    type="submit"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Announcement
                  </button>
                  <button 
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EducatorDashboard;
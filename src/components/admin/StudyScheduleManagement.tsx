import React, { useState } from 'react';
import { 
  Calendar, Clock, Plus, Edit, Trash2, Search, Filter, 
  Eye, Upload, Download, RefreshCw, Settings, Copy,
  BarChart3, Users, TrendingUp, Target, BookOpen,
  PlayCircle, PauseCircle, AlertCircle, CheckCircle,
  Globe, User, Building, Zap, Flag, Star
} from 'lucide-react';

interface StudyScheduleManagementProps {}

interface ScheduleTemplate {
  id: string;
  name: string;
  description: string;
  category: 'beginner' | 'intermediate' | 'advanced' | 'intensive' | 'revision';
  duration: string; // e.g., "12 weeks", "6 months"
  totalHours: number;
  subjects: Array<{
    name: string;
    weightage: number;
    color: string;
  }>;
  schedule: Array<{
    day: string;
    sessions: Array<{
      time: string;
      subject: string;
      duration: number;
      type: 'study' | 'practice' | 'test' | 'revision';
      break_after?: number;
    }>;
  }>;
  difficulty: 'easy' | 'medium' | 'hard';
  targetScore: number;
  prerequisites: string[];
  usage: number;
  rating: number;
  createdBy: string;
  createdDate: string;
  status: 'active' | 'draft' | 'archived';
  tags: string[];
}

interface ScheduleAnalytics {
  templateId: string;
  totalAssignments: number;
  activeUsers: number;
  completionRate: number;
  avgRating: number;
  popularTimes: Array<{
    time: string;
    usage: number;
  }>;
  subjectPerformance: Array<{
    subject: string;
    averageScore: number;
    timeSpent: number;
  }>;
}

const StudyScheduleManagement: React.FC<StudyScheduleManagementProps> = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'templates' | 'analytics' | 'assignments' | 'custom-builder'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<ScheduleTemplate | null>(null);

  // Mock data
  const scheduleTemplates: ScheduleTemplate[] = [
    {
      id: '1',
      name: 'CLAT Foundation - 6 Month Plan',
      description: 'Comprehensive foundation course for CLAT aspirants starting from basics',
      category: 'beginner',
      duration: '6 months',
      totalHours: 720,
      subjects: [
        { name: 'Legal Reasoning', weightage: 25, color: '#3B82F6' },
        { name: 'Logical Reasoning', weightage: 25, color: '#10B981' },
        { name: 'Reading Comprehension', weightage: 20, color: '#F59E0B' },
        { name: 'General Knowledge', weightage: 20, color: '#EF4444' },
        { name: 'Quantitative Techniques', weightage: 10, color: '#8B5CF6' }
      ],
      schedule: [
        {
          day: 'Monday',
          sessions: [
            { time: '09:00', subject: 'Legal Reasoning', duration: 120, type: 'study', break_after: 15 },
            { time: '11:45', subject: 'Logical Reasoning', duration: 90, type: 'practice' },
            { time: '15:00', subject: 'Reading Comprehension', duration: 60, type: 'study' }
          ]
        }
      ],
      difficulty: 'medium',
      targetScore: 75,
      prerequisites: ['Basic English proficiency', 'General awareness'],
      usage: 1247,
      rating: 4.6,
      createdBy: 'Admin User',
      createdDate: '2024-01-15',
      status: 'active',
      tags: ['foundation', 'comprehensive', 'beginners']
    },
    {
      id: '2',
      name: 'Intensive 3-Month Crash Course',
      description: 'High-intensity preparation for students with limited time',
      category: 'intensive',
      duration: '3 months',
      totalHours: 480,
      subjects: [
        { name: 'Legal Reasoning', weightage: 30, color: '#3B82F6' },
        { name: 'Logical Reasoning', weightage: 30, color: '#10B981' },
        { name: 'Reading Comprehension', weightage: 25, color: '#F59E0B' },
        { name: 'General Knowledge', weightage: 15, color: '#EF4444' }
      ],
      schedule: [
        {
          day: 'Monday',
          sessions: [
            { time: '08:00', subject: 'Legal Reasoning', duration: 150, type: 'study', break_after: 15 },
            { time: '11:00', subject: 'Logical Reasoning', duration: 120, type: 'practice', break_after: 30 },
            { time: '14:00', subject: 'Mock Test', duration: 120, type: 'test' }
          ]
        }
      ],
      difficulty: 'hard',
      targetScore: 85,
      prerequisites: ['Previous CLAT attempt', 'Strong foundation'],
      usage: 567,
      rating: 4.8,
      createdBy: 'Content Manager',
      createdDate: '2024-02-10',
      status: 'active',
      tags: ['intensive', 'advanced', 'crash-course']
    }
  ];

  const overallStats = {
    totalTemplates: 15,
    activeTemplates: 12,
    draftTemplates: 2,
    archivedTemplates: 1,
    totalAssignments: 3456,
    activeStudents: 2891,
    avgCompletionRate: 68.4,
    avgRating: 4.5,
    mostPopularTemplate: 'CLAT Foundation - 6 Month Plan',
    peakStudyTime: '9:00 AM - 11:00 AM'
  };

  const categoryStats = [
    { category: 'Beginner', count: 5, usage: 2340, avgRating: 4.3, completionRate: 72.1 },
    { category: 'Intermediate', count: 4, usage: 1876, avgRating: 4.5, completionRate: 65.8 },
    { category: 'Advanced', count: 3, usage: 987, avgRating: 4.7, completionRate: 58.9 },
    { category: 'Intensive', count: 2, usage: 789, avgRating: 4.8, completionRate: 52.3 },
    { category: 'Revision', count: 1, usage: 456, avgRating: 4.4, completionRate: 78.5 }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Active Templates</p>
              <p className="text-3xl font-bold">{overallStats.activeTemplates}</p>
              <p className="text-blue-100 text-sm mt-1">out of {overallStats.totalTemplates}</p>
            </div>
            <Calendar className="w-12 h-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Active Students</p>
              <p className="text-3xl font-bold">{overallStats.activeStudents.toLocaleString()}</p>
              <p className="text-green-100 text-sm mt-1">following schedules</p>
            </div>
            <Users className="w-12 h-12 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Completion Rate</p>
              <p className="text-3xl font-bold">{overallStats.avgCompletionRate}%</p>
              <p className="text-purple-100 text-sm mt-1">average across all</p>
            </div>
            <Target className="w-12 h-12 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Average Rating</p>
              <p className="text-3xl font-bold">{overallStats.avgRating}</p>
              <p className="text-orange-100 text-sm mt-1">out of 5.0</p>
            </div>
            <Star className="w-12 h-12 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Category Performance */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-6 flex items-center">
          <BarChart3 className="w-6 h-6 mr-2 text-indigo-600" />
          Category Performance Overview
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryStats.map((category, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">{category.category}</h4>
                <span className="text-sm text-gray-600">{category.count} templates</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Usage</span>
                  <span className="text-sm font-medium">{category.usage.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Rating</span>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{category.avgRating}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Completion</span>
                  <span className="text-sm font-medium text-green-600">{category.completionRate}%</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-indigo-500 h-2 rounded-full"
                    style={{ width: `${category.completionRate}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Most Popular Templates */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-6 flex items-center">
          <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
          Most Popular Templates
        </h3>
        
        <div className="space-y-4">
          {scheduleTemplates.slice(0, 3).map((template, index) => (
            <div key={template.id} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                  index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-500' : 'bg-orange-500'
                }`}>
                  {index + 1}
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900">{template.name}</h4>
                  <p className="text-sm text-gray-600">{template.usage.toLocaleString()} assignments</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center mb-1">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="font-medium text-gray-900">{template.rating}</span>
                </div>
                <p className="text-xs text-gray-500">{template.category}</p>
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
          <button 
            onClick={() => setShowCreateModal(true)}
            className="p-4 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
          >
            <Plus className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <p className="font-medium text-blue-700">Create Template</p>
          </button>
          
          <button className="p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors text-center">
            <Upload className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <p className="font-medium text-green-700">Import Template</p>
          </button>
          
          <button className="p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors text-center">
            <Copy className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <p className="font-medium text-purple-700">Duplicate Popular</p>
          </button>
          
          <button className="p-4 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors text-center">
            <Settings className="w-8 h-8 mx-auto mb-2 text-orange-600" />
            <p className="font-medium text-orange-700">Global Settings</p>
          </button>
        </div>
      </div>
    </div>
  );

  const renderTemplatesList = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search schedule templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="intensive">Intensive</option>
            <option value="revision">Revision</option>
          </select>
          
          <select 
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
          
          <button 
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Template
          </button>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {scheduleTemplates.map((template) => (
          <div key={template.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <h3 className="font-bold text-gray-900 mr-3">{template.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    template.category === 'beginner' ? 'bg-green-100 text-green-800' :
                    template.category === 'intermediate' ? 'bg-blue-100 text-blue-800' :
                    template.category === 'advanced' ? 'bg-purple-100 text-purple-800' :
                    template.category === 'intensive' ? 'bg-red-100 text-red-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {template.category}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{template.description}</p>
              </div>
              <div className="flex space-x-1 ml-4">
                <button className="text-blue-600 hover:text-blue-800">
                  <Eye className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setEditingTemplate(template)}
                  className="text-green-600 hover:text-green-800"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button className="text-purple-600 hover:text-purple-800">
                  <Copy className="w-4 h-4" />
                </button>
                <button className="text-red-600 hover:text-red-800">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500 mb-1">Duration</p>
                <p className="font-semibold text-gray-900">{template.duration}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Total Hours</p>
                <p className="font-semibold text-gray-900">{template.totalHours}h</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Target Score</p>
                <p className="font-semibold text-green-600">{template.targetScore}%</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Usage</p>
                <p className="font-semibold text-gray-900">{template.usage.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">Subject Distribution</p>
              <div className="flex space-x-1">
                {template.subjects.map((subject, index) => (
                  <div 
                    key={index}
                    className="h-2 rounded-full flex-1"
                    style={{ 
                      backgroundColor: subject.color,
                      width: `${subject.weightage}%`
                    }}
                    title={`${subject.name}: ${subject.weightage}%`}
                  ></div>
                ))}
              </div>
              <div className="flex flex-wrap gap-1 mt-2">
                {template.subjects.slice(0, 3).map((subject, index) => (
                  <span 
                    key={index}
                    className="text-xs px-2 py-1 rounded-full text-white"
                    style={{ backgroundColor: subject.color }}
                  >
                    {subject.name}: {subject.weightage}%
                  </span>
                ))}
                {template.subjects.length > 3 && (
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-700">
                    +{template.subjects.length - 3} more
                  </span>
                )}
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-400 mr-1" />
                <span className="font-medium text-gray-900 mr-3">{template.rating}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  template.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                  template.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {template.difficulty}
                </span>
              </div>
              <div className="flex space-x-1">
                {template.tags.slice(0, 2).map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">📅 Study Schedule Management</h2>
          <p className="text-gray-600">Create and manage personalized study schedule templates for students</p>
        </div>
        
        <div className="flex flex-wrap gap-3 mt-4 lg:mt-0">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center">
            <Upload className="w-4 h-4 mr-2" />
            Import Template
          </button>
          
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export All
          </button>
          
          <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'templates', label: 'Templates', icon: Calendar },
          { id: 'analytics', label: 'Analytics', icon: TrendingUp },
          { id: 'assignments', label: 'Assignments', icon: Users },
          { id: 'custom-builder', label: 'Builder', icon: Settings }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <tab.icon className="w-4 h-4 mr-2" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'templates' && renderTemplatesList()}
      
      {activeTab === 'analytics' && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-bold mb-4">Schedule Analytics</h3>
          <p className="text-gray-600">Detailed analytics on schedule template performance and student engagement would be displayed here.</p>
        </div>
      )}
      
      {activeTab === 'assignments' && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-bold mb-4">Schedule Assignments</h3>
          <p className="text-gray-600">Management interface for assigning schedule templates to students and institutes would be implemented here.</p>
        </div>
      )}
      
      {activeTab === 'custom-builder' && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-bold mb-4">Custom Schedule Builder</h3>
          <p className="text-gray-600">Drag-and-drop interface for creating custom study schedules would be implemented here.</p>
        </div>
      )}
    </div>
  );
};

export default StudyScheduleManagement;
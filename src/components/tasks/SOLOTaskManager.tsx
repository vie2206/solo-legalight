import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  CheckCircle, 
  Circle, 
  MoreHorizontal,
  Calendar,
  Flag,
  User,
  BookOpen,
  Trophy,
  Brain,
  Zap,
  Target,
  Clock,
  Star,
  ArrowRight,
  GraduationCap,
  Scale,
  FileText,
  Users
} from 'lucide-react';
import { soloStyles } from '../shared/SOLODesignSystem';

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  category: 'study' | 'assignment' | 'legal-research' | 'exam' | 'practice' | 'case-analysis';
  estimatedTime?: number; // in minutes
  difficulty?: 'easy' | 'medium' | 'hard';
  aiGenerated?: boolean;
  assignedBy?: string;
}

interface TaskGroup {
  id: string;
  title: string;
  color: string;
  icon: React.ElementType;
  tasks: Task[];
  category: 'clat-prep' | 'case-studies' | 'assignments' | 'legal-research' | 'practice-tests';
}

const SOLOTaskManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  // Sample task groups with legal education focus
  const [taskGroups, setTaskGroups] = useState<TaskGroup[]>([
    {
      id: 'clat-preparation',
      title: 'CLAT Preparation',
      color: 'bg-blue-500',
      icon: GraduationCap,
      category: 'clat-prep',
      tasks: [
        {
          id: 'clat-1',
          title: 'Constitutional Law - Fundamental Rights',
          description: 'Complete reading and practice questions on Articles 12-35',
          completed: false,
          priority: 'high',
          dueDate: '2025-08-10',
          category: 'study',
          estimatedTime: 120,
          difficulty: 'medium',
          aiGenerated: true,
          assignedBy: 'AI Study Planner'
        },
        {
          id: 'clat-2',
          title: 'Legal Reasoning Practice Set 15',
          description: '50 questions on legal reasoning and logical deduction',
          completed: true,
          priority: 'medium',
          category: 'practice',
          estimatedTime: 90,
          difficulty: 'medium'
        },
        {
          id: 'clat-3',
          title: 'Current Affairs - Supreme Court Judgments',
          description: 'Review recent landmark judgments from 2024',
          completed: false,
          priority: 'high',
          dueDate: '2025-08-09',
          category: 'study',
          estimatedTime: 60,
          difficulty: 'hard'
        }
      ]
    },
    {
      id: 'case-analysis',
      title: 'Case Analysis',
      color: 'bg-purple-500',
      icon: Scale,
      category: 'case-studies',
      tasks: [
        {
          id: 'case-1',
          title: 'Kesavananda Bharati Case Analysis',
          description: 'Detailed analysis of Basic Structure doctrine',
          completed: false,
          priority: 'high',
          dueDate: '2025-08-12',
          category: 'case-analysis',
          estimatedTime: 180,
          difficulty: 'hard',
          aiGenerated: true
        },
        {
          id: 'case-2',
          title: 'Maneka Gandhi v. Union of India',
          description: 'Right to life and personal liberty interpretation',
          completed: true,
          priority: 'medium',
          category: 'case-analysis',
          estimatedTime: 90,
          difficulty: 'medium'
        }
      ]
    },
    {
      id: 'assignments',
      title: 'Assignments',
      color: 'bg-green-500',
      icon: FileText,
      category: 'assignments',
      tasks: [
        {
          id: 'assign-1',
          title: 'Contract Law Essay',
          description: 'Write 2000 words on consideration in Indian Contract Act',
          completed: false,
          priority: 'high',
          dueDate: '2025-08-15',
          category: 'assignment',
          estimatedTime: 240,
          difficulty: 'hard',
          assignedBy: 'Prof. Sharma'
        }
      ]
    },
    {
      id: 'legal-research',
      title: 'Legal Research',
      color: 'bg-orange-500',
      icon: BookOpen,
      category: 'legal-research',
      tasks: [
        {
          id: 'research-1',
          title: 'Property Rights Research',
          description: 'Research recent amendments in property law',
          completed: false,
          priority: 'medium',
          category: 'legal-research',
          estimatedTime: 150,
          difficulty: 'hard',
          aiGenerated: true
        }
      ]
    }
  ]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'study': return BookOpen;
      case 'assignment': return FileText;
      case 'legal-research': return Search;
      case 'exam': return Trophy;
      case 'practice': return Target;
      case 'case-analysis': return Scale;
      default: return Circle;
    }
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'hard': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const toggleTaskCompletion = (groupId: string, taskId: string) => {
    setTaskGroups(groups => 
      groups.map(group => {
        if (group.id === groupId) {
          return {
            ...group,
            tasks: group.tasks.map(task => 
              task.id === taskId 
                ? { ...task, completed: !task.completed }
                : task
            )
          };
        }
        return group;
      })
    );
  };

  const getTaskStats = () => {
    const allTasks = taskGroups.flatMap(group => group.tasks);
    const completed = allTasks.filter(task => task.completed).length;
    const total = allTasks.length;
    const pending = total - completed;
    const highPriority = allTasks.filter(task => task.priority === 'high' && !task.completed).length;
    
    return { total, completed, pending, highPriority };
  };

  const stats = getTaskStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className={soloStyles.container}>
          <div className="py-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 font-heading">
                  Legal Studies Dashboard
                </h1>
                <p className="text-gray-600 mt-1">
                  Manage your CLAT preparation and legal studies efficiently
                </p>
              </div>
              
              <button className={`${soloStyles.button.primary} flex items-center gap-2`}>
                <Plus className="w-4 h-4" />
                Add Task
              </button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">Total Tasks</span>
                </div>
                <div className="text-2xl font-bold text-blue-900">{stats.total}</div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">Completed</span>
                </div>
                <div className="text-2xl font-bold text-green-900">{stats.completed}</div>
              </div>
              
              <div className="bg-yellow-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-800">Pending</span>
                </div>
                <div className="text-2xl font-bold text-yellow-900">{stats.pending}</div>
              </div>
              
              <div className="bg-red-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Flag className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-medium text-red-800">High Priority</span>
                </div>
                <div className="text-2xl font-bold text-red-900">{stats.highPriority}</div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Tasks</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="high">High Priority</option>
                <option value="ai">AI Generated</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={soloStyles.container}>
        <div className="py-8">
          {/* Task Groups Grid */}
          <div className={soloStyles.grid.cols2}>
            {taskGroups.map((group) => {
              const Icon = group.icon;
              return (
                <div
                  key={group.id}
                  className={`${soloStyles.card.base} hover:shadow-md transition-shadow`}
                >
                  {/* Group Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${group.color} rounded-lg flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{group.title}</h3>
                        <p className="text-sm text-gray-500">{group.tasks.length} tasks</p>
                      </div>
                    </div>
                    
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <MoreHorizontal className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm font-medium text-gray-900">
                        {Math.round((group.tasks.filter(t => t.completed).length / group.tasks.length) * 100)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${group.color}`}
                        style={{ 
                          width: `${(group.tasks.filter(t => t.completed).length / group.tasks.length) * 100}%` 
                        }}
                      />
                    </div>
                  </div>

                  {/* Tasks List */}
                  <div className="space-y-3">
                    {group.tasks.slice(0, 3).map((task) => {
                      const CategoryIcon = getCategoryIcon(task.category);
                      return (
                        <div
                          key={task.id}
                          className={`p-3 rounded-lg border transition-colors ${
                            task.completed 
                              ? 'bg-green-50 border-green-200' 
                              : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => toggleTaskCompletion(group.id, task.id)}
                              className="mt-0.5"
                            >
                              {task.completed ? (
                                <CheckCircle className="w-5 h-5 text-green-600" />
                              ) : (
                                <Circle className="w-5 h-5 text-gray-400 hover:text-blue-600" />
                              )}
                            </button>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h4 className={`font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                                    {task.title}
                                  </h4>
                                  {task.description && (
                                    <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                                  )}
                                </div>
                                
                                <div className="flex items-center gap-2 ml-2">
                                  {task.aiGenerated && (
                                    <div className="flex items-center gap-1 bg-purple-100 px-2 py-1 rounded">
                                      <Brain className="w-3 h-3 text-purple-600" />
                                      <span className="text-xs text-purple-700">AI</span>
                                    </div>
                                  )}
                                  
                                  <span className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(task.priority)}`}>
                                    {task.priority}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                <div className="flex items-center gap-1">
                                  <CategoryIcon className="w-3 h-3" />
                                  <span>{task.category.replace('-', ' ')}</span>
                                </div>
                                
                                {task.estimatedTime && (
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    <span>{task.estimatedTime}m</span>
                                  </div>
                                )}
                                
                                {task.difficulty && (
                                  <div className="flex items-center gap-1">
                                    <Star className={`w-3 h-3 ${getDifficultyColor(task.difficulty)}`} />
                                    <span className={getDifficultyColor(task.difficulty)}>
                                      {task.difficulty}
                                    </span>
                                  </div>
                                )}
                                
                                {task.dueDate && (
                                  <div className="flex items-center gap-1">
                                    <Calendar className="w-3 h-3" />
                                    <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                                  </div>
                                )}
                              </div>
                              
                              {task.assignedBy && (
                                <div className="flex items-center gap-1 mt-1 text-xs text-blue-600">
                                  <User className="w-3 h-3" />
                                  <span>Assigned by {task.assignedBy}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* View All Button */}
                  {group.tasks.length > 3 && (
                    <button
                      onClick={() => setActiveGroup(group.id)}
                      className="w-full mt-4 text-center py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <span>View all {group.tasks.length} tasks</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SOLOTaskManager;
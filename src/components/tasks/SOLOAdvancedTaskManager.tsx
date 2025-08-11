import React, { useState, useRef, useEffect, useCallback } from 'react';
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"; // Disabled - package not installed
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
  Users,
  Edit,
  Trash2,
  Archive,
  Settings
} from 'lucide-react';
import { soloStyles, soloTheme } from '../shared/SOLODesignSystem';
import SOLOAIIcon from '../icons/SOLOAIIcons';

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  category: 'study' | 'assignment' | 'legal-research' | 'exam' | 'practice' | 'case-analysis';
  estimatedTime?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  aiGenerated?: boolean;
  assignedBy?: string;
  tags?: string[];
  progress?: number;
  subtasks?: Subtask[];
}

interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskGroup {
  id: string;
  title: string;
  color: string;
  icon: React.ElementType;
  aiIcon?: string;
  tasks: Task[];
  category: 'clat-prep' | 'case-studies' | 'assignments' | 'legal-research' | 'practice-tests';
  description?: string;
}

interface SOLOAdvancedTaskManagerProps {
  className?: string;
}

const SOLOAdvancedTaskManager: React.FC<SOLOAdvancedTaskManagerProps> = ({ className }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [minHeight, setMinHeight] = useState(600);
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const addButtonRef = useRef<HTMLButtonElement>(null);

  // Enhanced task groups with AI integration
  const [taskGroups, setTaskGroups] = useState<TaskGroup[]>([
    {
      id: 'clat-mastery',
      title: 'CLAT Mastery Program',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      icon: GraduationCap,
      aiIcon: 'brain-ai',
      category: 'clat-prep',
      description: 'AI-powered comprehensive CLAT preparation',
      tasks: [
        {
          id: 'constitutional-law-1',
          title: 'Constitutional Law Deep Dive',
          description: 'Master Articles 12-35: Fundamental Rights with AI explanations',
          completed: false,
          priority: 'high',
          dueDate: '2025-08-10',
          category: 'study',
          estimatedTime: 180,
          difficulty: 'hard',
          aiGenerated: true,
          assignedBy: 'AI Study Planner',
          tags: ['fundamental-rights', 'articles', 'constitution'],
          progress: 65,
          subtasks: [
            { id: 'sub-1', title: 'Read Articles 12-18', completed: true },
            { id: 'sub-2', title: 'Practice MCQs on Right to Equality', completed: true },
            { id: 'sub-3', title: 'Analyze landmark cases', completed: false },
            { id: 'sub-4', title: 'Complete mock test', completed: false }
          ]
        },
        {
          id: 'legal-reasoning-2',
          title: 'Legal Reasoning Mastery',
          description: 'Advanced logical deduction patterns with AI feedback',
          completed: false,
          priority: 'medium',
          dueDate: '2025-08-12',
          category: 'practice',
          estimatedTime: 120,
          difficulty: 'medium',
          aiGenerated: true,
          tags: ['reasoning', 'logic', 'patterns'],
          progress: 40
        },
        {
          id: 'current-affairs-3',
          title: 'Legal Current Affairs Analysis',
          description: 'Recent Supreme Court judgments with AI insights',
          completed: true,
          priority: 'high',
          category: 'study',
          estimatedTime: 90,
          difficulty: 'hard',
          tags: ['current-affairs', 'judgments', 'supreme-court'],
          progress: 100
        }
      ]
    },
    {
      id: 'case-analysis-lab',
      title: 'Legal Case Analysis Lab',
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      icon: Scale,
      aiIcon: 'case-analysis-ai',
      category: 'case-studies',
      description: 'Deep case analysis with AI-powered insights',
      tasks: [
        {
          id: 'kesavananda-case',
          title: 'Kesavananda Bharati v. State of Kerala',
          description: 'Comprehensive analysis of Basic Structure doctrine',
          completed: false,
          priority: 'high',
          dueDate: '2025-08-15',
          category: 'case-analysis',
          estimatedTime: 240,
          difficulty: 'hard',
          aiGenerated: true,
          assignedBy: 'Prof. Sharma',
          tags: ['basic-structure', 'constitutional-law', 'landmark'],
          progress: 25,
          subtasks: [
            { id: 'case-sub-1', title: 'Read complete judgment', completed: false },
            { id: 'case-sub-2', title: 'Identify key principles', completed: false },
            { id: 'case-sub-3', title: 'Compare with related cases', completed: false }
          ]
        },
        {
          id: 'maneka-gandhi-case',
          title: 'Maneka Gandhi v. Union of India',
          description: 'Article 21 interpretation and procedural safeguards',
          completed: true,
          priority: 'medium',
          category: 'case-analysis',
          estimatedTime: 150,
          difficulty: 'medium',
          tags: ['article-21', 'personal-liberty', 'procedure'],
          progress: 100
        }
      ]
    },
    {
      id: 'ai-study-planner',
      title: 'AI Study Intelligence',
      color: 'bg-gradient-to-br from-green-500 to-emerald-600',
      icon: Brain,
      aiIcon: 'ai-recommendation',
      category: 'practice-tests',
      description: 'Smart recommendations and adaptive learning',
      tasks: [
        {
          id: 'weekly-assessment',
          title: 'Weekly Performance Assessment',
          description: 'AI-generated personalized performance report',
          completed: false,
          priority: 'medium',
          category: 'exam',
          estimatedTime: 60,
          difficulty: 'easy',
          aiGenerated: true,
          assignedBy: 'AI Analytics Engine',
          tags: ['assessment', 'analytics', 'performance'],
          progress: 0
        },
        {
          id: 'adaptive-quiz',
          title: 'Adaptive Legal Reasoning Quiz',
          description: 'AI adapts difficulty based on your performance',
          completed: false,
          priority: 'high',
          category: 'practice',
          estimatedTime: 90,
          difficulty: 'medium',
          aiGenerated: true,
          tags: ['adaptive', 'quiz', 'ai-powered'],
          progress: 0
        }
      ]
    },
    {
      id: 'research-projects',
      title: 'Legal Research Projects',
      color: 'bg-gradient-to-br from-orange-500 to-red-500',
      icon: BookOpen,
      aiIcon: 'legal-research-ai',
      category: 'legal-research',
      description: 'Contemporary legal research with AI assistance',
      tasks: [
        {
          id: 'property-rights-research',
          title: 'Evolution of Property Rights in India',
          description: 'Research recent amendments and judicial interpretations',
          completed: false,
          priority: 'medium',
          dueDate: '2025-08-20',
          category: 'legal-research',
          estimatedTime: 200,
          difficulty: 'hard',
          aiGenerated: false,
          assignedBy: 'Research Supervisor',
          tags: ['property-law', 'amendments', 'research'],
          progress: 15
        }
      ]
    }
  ]);

  const filteredGroups = taskGroups.filter((group) =>
    group.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.tasks.some(task => 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
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

  const handleDragStart = useCallback(() => {
    setActiveGroup(null);
    setIsDragging(true);
  }, []);

  const handleDragEnd = useCallback((result: any) => {
    setIsDragging(false);
    const { source, destination } = result;
    if (!destination) return;

    // Handle group reordering
    if (source.droppableId === 'droppable-groups' && destination.droppableId === 'droppable-groups') {
      const newGroups = Array.from(taskGroups);
      const [reorderedGroup] = newGroups.splice(source.index, 1);
      newGroups.splice(destination.index, 0, reorderedGroup);
      setTaskGroups(newGroups);
    }
  }, [taskGroups]);

  const toggleTaskCompletion = (groupId: string, taskId: string) => {
    setTaskGroups(groups => 
      groups.map(group => {
        if (group.id === groupId) {
          return {
            ...group,
            tasks: group.tasks.map(task => 
              task.id === taskId 
                ? { ...task, completed: !task.completed, progress: !task.completed ? 100 : task.progress }
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
    const aiGenerated = allTasks.filter(task => task.aiGenerated).length;
    
    return { total, completed, pending, highPriority, aiGenerated };
  };

  const stats = getTaskStats();

  useEffect(() => {
    const containerHeight = containerRef.current?.offsetHeight ?? minHeight;
    setMinHeight(containerHeight > minHeight ? containerHeight : minHeight);
  }, [minHeight, taskGroups]);

  return (
    <div>
      <div 
        className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 ${className}`}
        ref={containerRef}
        style={{ minHeight }}
      >
        {/* Enhanced Header */}
        <div className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-blue-100">
          <div className={soloStyles.container}>
            <div className="py-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                    <SOLOAIIcon name="ai-assistant" size="large" theme="light" className="text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 font-heading">
                      SOLO Task Intelligence
                    </h1>
                    <p className="text-gray-600 mt-1">
                      AI-powered legal studies management system
                    </p>
                  </div>
                </div>
                
                <button 
                  ref={addButtonRef}
                  onClick={() => setShowNewTaskForm(true)}
                  className={`${soloStyles.button.ai} flex items-center gap-2 shadow-lg`}
                >
                  <Plus className="w-4 h-4" />
                  Create Task
                </button>
              </div>

              {/* Enhanced Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-blue-800">Total Tasks</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-900">{stats.total}</div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 border border-green-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                      <Trophy className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-green-800">Completed</span>
                  </div>
                  <div className="text-2xl font-bold text-green-900">{stats.completed}</div>
                </div>
                
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 border border-yellow-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                      <Clock className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-yellow-800">Pending</span>
                  </div>
                  <div className="text-2xl font-bold text-yellow-900">{stats.pending}</div>
                </div>
                
                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4 border border-red-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                      <Flag className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-red-800">High Priority</span>
                  </div>
                  <div className="text-2xl font-bold text-red-900">{stats.highPriority}</div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                      <Brain className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-medium text-purple-800">AI Generated</span>
                  </div>
                  <div className="text-2xl font-bold text-purple-900">{stats.aiGenerated}</div>
                </div>
              </div>

              {/* Enhanced Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search tasks, projects, or content..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80 backdrop-blur-sm"
                  />
                </div>
                
                <div className="flex gap-2">
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/80 backdrop-blur-sm"
                  >
                    <option value="all">All Tasks</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="high">High Priority</option>
                    <option value="ai">AI Generated</option>
                    <option value="legal">Legal Research</option>
                  </select>
                  
                  <button className="px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors bg-white/80 backdrop-blur-sm">
                    <Filter className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className={soloStyles.container}>
          <div className="py-8">
            {activeGroup ? (
              // Detailed Group View
              <div className="space-y-6">
                {/* Back Navigation */}
                <button
                  onClick={() => setActiveGroup(null)}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  <ArrowRight className="w-4 h-4 rotate-180" />
                  Back to Dashboard
                </button>
                
                {/* Detailed task list would go here */}
              </div>
            ) : (
              // Task Groups Grid
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {filteredGroups.map((group, index) => {
                      const Icon = group.icon;
                      const completedTasks = group.tasks.filter(t => t.completed).length;
                      const totalTasks = group.tasks.length;
                      const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
                      
                      return (
                        <div key={group.id}>
                            <div
                              className={`${soloStyles.card.base} hover:shadow-lg transition-all transform hover:-translate-y-1`}
                            >
                              {/* Group Header */}
                              <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-4">
                                  <div className={`w-12 h-12 ${group.color} rounded-xl flex items-center justify-center shadow-lg`}>
                                    <Icon className="w-6 h-6 text-white" />
                                  </div>
                                  <div>
                                    <h3 className="font-bold text-gray-900 text-lg">{group.title}</h3>
                                    <p className="text-sm text-gray-500 mt-1">{group.description}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                      <span className="text-xs text-gray-600">{totalTasks} tasks</span>
                                      {group.aiIcon && (
                                        <div className="flex items-center gap-1 bg-purple-100 px-2 py-1 rounded">
                                          <SOLOAIIcon name={group.aiIcon} size="small" />
                                          <span className="text-xs text-purple-700">AI Enhanced</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                    <Settings className="w-4 h-4 text-gray-500" />
                                  </button>
                                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                    <MoreHorizontal className="w-4 h-4 text-gray-500" />
                                  </button>
                                </div>
                              </div>

                              {/* Progress Section */}
                              <div className="mb-6">
                                <div className="flex justify-between items-center mb-3">
                                  <span className="text-sm font-medium text-gray-700">Progress</span>
                                  <span className="text-sm font-bold text-gray-900">{completionRate}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                  <div 
                                    className={`h-full rounded-full transition-all duration-500 ${group.color}`}
                                    style={{ width: `${completionRate}%` }}
                                  />
                                </div>
                              </div>

                              {/* Tasks Preview */}
                              <div className="space-y-3">
                                {group.tasks.slice(0, 3).map((task) => {
                                  const CategoryIcon = getCategoryIcon(task.category);
                                  return (
                                    <div
                                      key={task.id}
                                      className={`p-4 rounded-xl border transition-all hover:shadow-sm ${
                                        task.completed 
                                          ? 'bg-green-50 border-green-200' 
                                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                                      }`}
                                    >
                                      <div className="flex items-start gap-3">
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            toggleTaskCompletion(group.id, task.id);
                                          }}
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
                                              <h4 className={`font-semibold ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                                                {task.title}
                                              </h4>
                                              {task.description && (
                                                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{task.description}</p>
                                              )}
                                            </div>
                                            
                                            <div className="flex items-center gap-2 ml-2">
                                              {task.aiGenerated && (
                                                <div className="flex items-center gap-1 bg-purple-100 px-2 py-1 rounded">
                                                  <Brain className="w-3 h-3 text-purple-600" />
                                                  <span className="text-xs text-purple-700">AI</span>
                                                </div>
                                              )}
                                              
                                              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                                                {task.priority}
                                              </span>
                                            </div>
                                          </div>
                                          
                                          {/* Progress bar for individual tasks */}
                                          {task.progress !== undefined && !task.completed && (
                                            <div className="mt-3">
                                              <div className="flex justify-between items-center mb-1">
                                                <span className="text-xs text-gray-500">Progress</span>
                                                <span className="text-xs font-medium text-gray-700">{task.progress}%</span>
                                              </div>
                                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                                <div 
                                                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
                                                  style={{ width: `${task.progress}%` }}
                                                />
                                              </div>
                                            </div>
                                          )}
                                          
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
                                          
                                          {task.tags && task.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mt-2">
                                              {task.tags.slice(0, 3).map((tag, idx) => (
                                                <span key={idx} className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                                                  {tag}
                                                </span>
                                              ))}
                                              {task.tags.length > 3 && (
                                                <span className="text-xs text-gray-500">+{task.tags.length - 3} more</span>
                                              )}
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
                                  className="w-full mt-4 text-center py-3 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-xl transition-colors flex items-center justify-center gap-2 font-medium"
                                >
                                  <span>View all {group.tasks.length} tasks</span>
                                  <ArrowRight className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                        </div>
                      );
                    })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SOLOAdvancedTaskManager;
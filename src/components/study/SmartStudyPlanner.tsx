import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  Target, 
  Brain, 
  Trophy, 
  TrendingUp,
  Bell,
  BookOpen,
  CheckCircle,
  XCircle,
  AlertCircle,
  Zap,
  Star,
  Award,
  BarChart3,
  Settings,
  Plus,
  Edit,
  Trash2,
  Play,
  Pause
} from 'lucide-react';
import { claudeAIService } from '../../services/claudeAIService';

interface StudyTask {
  id: string;
  title: string;
  subject: 'legal_reasoning' | 'reading_comprehension' | 'current_affairs' | 'logical_reasoning' | 'quantitative';
  type: 'reading' | 'practice' | 'vocabulary' | 'mock_test' | 'revision';
  duration: number; // minutes
  difficulty: number;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'in_progress' | 'completed' | 'skipped';
  scheduledTime: string;
  aiRecommended: boolean;
  adaptiveReason?: string;
  dependencies?: string[];
}

interface StudyPlan {
  id: string;
  name: string;
  targetExamDate: string;
  currentLevel: string;
  targetScore: number;
  weakAreas: string[];
  strongAreas: string[];
  dailyHours: number;
  preferences: {
    studyTimeSlots: string[];
    breakInterval: number;
    difficultyProgression: 'gradual' | 'mixed' | 'intensive';
    focusAreas: string[];
  };
}

interface SmartReminder {
  id: string;
  type: 'study_time' | 'break' | 'review' | 'mock_test' | 'motivation';
  message: string;
  scheduledTime: string;
  priority: 'low' | 'medium' | 'high';
  actionSuggestion: string;
  isActive: boolean;
  frequency: 'once' | 'daily' | 'weekly' | 'adaptive';
}

const SmartStudyPlanner: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'planner' | 'schedule' | 'progress' | 'reminders'>('planner');
  const [currentPlan, setCurrentPlan] = useState<StudyPlan | null>(null);
  const [dailyTasks, setDailyTasks] = useState<StudyTask[]>([]);
  const [studyReminders, setStudyReminders] = useState<SmartReminder[]>([]);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [studyTimer, setStudyTimer] = useState({ isActive: false, timeLeft: 1500, task: null as StudyTask | null });
  
  // User profile for AI recommendations
  const [userProfile] = useState({
    currentLevel: 'intermediate',
    targetScore: 85,
    examDate: '2024-12-15',
    availableHours: 4,
    weakAreas: ['Current Affairs', 'Quantitative Techniques'],
    strongAreas: ['Legal Reasoning', 'Reading Comprehension'],
    studyPattern: 'morning_focused',
    learningStyle: 'visual'
  });

  const [weeklyProgress] = useState({
    completed: 24,
    total: 35,
    accuracy: 78,
    timeSpent: 18.5, // hours
    streak: 12
  });

  useEffect(() => {
    generateSmartStudyPlan();
    generateSmartReminders();
  }, []);

  const generateSmartStudyPlan = async () => {
    setIsGeneratingPlan(true);
    try {
      const plan = await claudeAIService.generateStudyPlan(userProfile);
      
      // Mock study plan generation
      const mockPlan: StudyPlan = {
        id: 'plan_001',
        name: 'CLAT 2024 Master Plan',
        targetExamDate: userProfile.examDate,
        currentLevel: userProfile.currentLevel,
        targetScore: userProfile.targetScore,
        weakAreas: userProfile.weakAreas,
        strongAreas: userProfile.strongAreas,
        dailyHours: userProfile.availableHours,
        preferences: {
          studyTimeSlots: ['09:00-11:00', '15:00-17:00'],
          breakInterval: 25,
          difficultyProgression: 'gradual',
          focusAreas: ['Current Affairs', 'Quantitative Techniques']
        }
      };

      setCurrentPlan(mockPlan);
      generateDailyTasks(mockPlan);
    } catch (error) {
      console.error('Failed to generate study plan:', error);
    } finally {
      setIsGeneratingPlan(false);
    }
  };

  const generateDailyTasks = (plan: StudyPlan) => {
    const tasks: StudyTask[] = [
      {
        id: 'task_001',
        title: 'Current Affairs - Weekly News Digest',
        subject: 'current_affairs',
        type: 'reading',
        duration: 45,
        difficulty: 3,
        priority: 'high',
        status: 'pending',
        scheduledTime: '09:00',
        aiRecommended: true,
        adaptiveReason: 'Based on your weak area in Current Affairs, starting with foundational reading'
      },
      {
        id: 'task_002',
        title: 'Quantitative Aptitude Practice',
        subject: 'quantitative',
        type: 'practice',
        duration: 30,
        difficulty: 2,
        priority: 'high',
        status: 'pending',
        scheduledTime: '09:50',
        aiRecommended: true,
        adaptiveReason: 'Scheduled after reading to balance cognitive load'
      },
      {
        id: 'task_003',
        title: 'Legal Reasoning - Constitutional Law',
        subject: 'legal_reasoning',
        type: 'reading',
        duration: 60,
        difficulty: 4,
        priority: 'medium',
        status: 'pending',
        scheduledTime: '15:00',
        aiRecommended: true,
        adaptiveReason: 'Leveraging your strength in Legal Reasoning for confidence building'
      },
      {
        id: 'task_004',
        title: 'Reading Comprehension Practice',
        subject: 'reading_comprehension',
        type: 'practice',
        duration: 40,
        difficulty: 3,
        priority: 'medium',
        status: 'pending',
        scheduledTime: '16:05',
        aiRecommended: true
      },
      {
        id: 'task_005',
        title: 'Daily Vocabulary Review',
        subject: 'reading_comprehension',
        type: 'vocabulary',
        duration: 15,
        difficulty: 2,
        priority: 'low',
        status: 'completed',
        scheduledTime: '20:00',
        aiRecommended: true,
        adaptiveReason: 'Evening vocabulary review aids retention through spaced repetition'
      }
    ];
    
    setDailyTasks(tasks);
  };

  const generateSmartReminders = async () => {
    try {
      const reminders = await claudeAIService.generateSmartReminders({
        studyPattern: userProfile.studyPattern,
        weakAreas: userProfile.weakAreas,
        studyHours: userProfile.availableHours
      });

      // Mock smart reminders
      const mockReminders: SmartReminder[] = [
        {
          id: 'rem_001',
          type: 'study_time',
          message: '🎯 Time to tackle Current Affairs! You\'ve got this!',
          scheduledTime: '08:55',
          priority: 'high',
          actionSuggestion: 'Start with today\'s newspaper editorial analysis',
          isActive: true,
          frequency: 'daily'
        },
        {
          id: 'rem_002',
          type: 'break',
          message: '☕ Great job! Time for a 10-minute break to recharge',
          scheduledTime: '10:25',
          priority: 'medium',
          actionSuggestion: 'Hydrate, stretch, or take a short walk',
          isActive: true,
          frequency: 'adaptive'
        },
        {
          id: 'rem_003',
          type: 'motivation',
          message: '🔥 You\'re 78% accurate this week! Keep the momentum going!',
          scheduledTime: '14:30',
          priority: 'medium',
          actionSuggestion: 'Review your progress dashboard for motivation',
          isActive: true,
          frequency: 'weekly'
        },
        {
          id: 'rem_004',
          type: 'review',
          message: '📚 Quick review of yesterday\'s vocabulary words',
          scheduledTime: '19:30',
          priority: 'low',
          actionSuggestion: 'Spend 5 minutes reviewing flashcards',
          isActive: true,
          frequency: 'daily'
        }
      ];

      setStudyReminders(mockReminders);
    } catch (error) {
      console.error('Failed to generate reminders:', error);
    }
  };

  const startTask = (task: StudyTask) => {
    setStudyTimer({
      isActive: true,
      timeLeft: task.duration * 60,
      task
    });
    
    setDailyTasks(prev => 
      prev.map(t => 
        t.id === task.id 
          ? { ...t, status: 'in_progress' }
          : t
      )
    );
  };

  const completeTask = (taskId: string) => {
    setDailyTasks(prev =>
      prev.map(task =>
        task.id === taskId
          ? { ...task, status: 'completed' }
          : task
      )
    );
    setStudyTimer({ isActive: false, timeLeft: 0, task: null });
  };

  const getSubjectColor = (subject: string) => {
    const colors = {
      legal_reasoning: 'bg-blue-100 text-blue-800 border-blue-300',
      reading_comprehension: 'bg-green-100 text-green-800 border-green-300',
      current_affairs: 'bg-orange-100 text-orange-800 border-orange-300',
      logical_reasoning: 'bg-purple-100 text-purple-800 border-purple-300',
      quantitative: 'bg-red-100 text-red-800 border-red-300'
    };
    return colors[subject as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-300';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-green-600 bg-green-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in_progress': return <Clock className="w-5 h-5 text-blue-600 animate-pulse" />;
      case 'skipped': return <XCircle className="w-5 h-5 text-red-600" />;
      default: return <AlertCircle className="w-5 h-5 text-gray-400" />;
    }
  };

  if (isGeneratingPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Brain className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Creating Your Smart Study Plan</h2>
          <p className="text-gray-600 mb-4">Claude AI is analyzing your profile and generating personalized recommendations...</p>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Smart Study Planner</h1>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                AI-Powered
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full">
                <Trophy className="w-4 h-4 text-green-600" />
                <span className="font-bold text-green-800">{weeklyProgress.streak}</span>
                <span className="text-sm text-green-600">day streak</span>
              </div>
              
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Study Timer (if active) */}
        {studyTimer.isActive && studyTimer.task && (
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-6 mb-8 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-1">Currently Studying</h3>
                <p className="text-blue-100">{studyTimer.task.title}</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold mb-1">
                  {Math.floor(studyTimer.timeLeft / 60)}:{(studyTimer.timeLeft % 60).toString().padStart(2, '0')}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setStudyTimer(prev => ({ ...prev, isActive: !prev.isActive }))}
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    {studyTimer.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {studyTimer.isActive ? 'Pause' : 'Resume'}
                  </button>
                  <button
                    onClick={() => completeTask(studyTimer.task!.id)}
                    className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Complete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Week Progress</p>
                <p className="text-2xl font-bold text-blue-600">{weeklyProgress.completed}/{weeklyProgress.total}</p>
              </div>
              <Target className="w-8 h-8 text-blue-500" />
            </div>
            <div className="mt-2">
              <div className="w-full bg-blue-100 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full"
                  style={{ width: `${(weeklyProgress.completed / weeklyProgress.total) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Accuracy</p>
                <p className="text-2xl font-bold text-green-600">{weeklyProgress.accuracy}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
            <div className="mt-2">
              <div className="flex items-center text-sm text-green-600">
                <Star className="w-4 h-4 mr-1" />
                Above target (75%)
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Study Time</p>
                <p className="text-2xl font-bold text-purple-600">{weeklyProgress.timeSpent}h</p>
              </div>
              <Clock className="w-8 h-8 text-purple-500" />
            </div>
            <div className="mt-2">
              <div className="text-sm text-purple-600">
                Target: 28h/week
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Streak</p>
                <p className="text-2xl font-bold text-orange-600">{weeklyProgress.streak}</p>
              </div>
              <Trophy className="w-8 h-8 text-orange-500" />
            </div>
            <div className="mt-2">
              <div className="text-sm text-orange-600">
                Personal best!
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {[
                { key: 'planner', label: 'Smart Planner', icon: Brain },
                { key: 'schedule', label: 'Today\'s Schedule', icon: Calendar },
                { key: 'progress', label: 'Progress Analytics', icon: BarChart3 },
                { key: 'reminders', label: 'AI Reminders', icon: Bell }
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as any)}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === key
                      ? 'border-blue-500 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'schedule' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Today's AI-Optimized Schedule</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Adapted for your learning pattern</span>
                    <Zap className="w-4 h-4 text-yellow-500" />
                  </div>
                </div>

                <div className="space-y-4">
                  {dailyTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`bg-gray-50 rounded-xl p-4 border-l-4 ${
                        task.status === 'completed' ? 'border-green-500 bg-green-50' :
                        task.status === 'in_progress' ? 'border-blue-500 bg-blue-50' :
                        'border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {getStatusIcon(task.status)}
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-gray-900">{task.title}</h4>
                              {task.aiRecommended && (
                                <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs font-medium">
                                  AI Recommended
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {task.scheduledTime} ({task.duration}min)
                              </span>
                              <span className={`px-2 py-1 rounded border text-xs ${getSubjectColor(task.subject)}`}>
                                {task.subject.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                              </span>
                              <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(task.priority)}`}>
                                {task.priority} priority
                              </span>
                            </div>
                            {task.adaptiveReason && (
                              <p className="text-xs text-purple-600 mt-1 italic">
                                💡 {task.adaptiveReason}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {task.status === 'pending' && (
                            <button
                              onClick={() => startTask(task)}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                            >
                              <Play className="w-4 h-4" />
                              Start
                            </button>
                          )}
                          {task.status === 'completed' && (
                            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium">
                              Completed ✓
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reminders' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">AI-Powered Smart Reminders</h3>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    Add Reminder
                  </button>
                </div>

                <div className="space-y-4">
                  {studyReminders.map((reminder) => (
                    <div
                      key={reminder.id}
                      className={`bg-white rounded-xl p-4 border shadow-sm ${
                        reminder.priority === 'high' ? 'border-red-200' :
                        reminder.priority === 'medium' ? 'border-yellow-200' :
                        'border-green-200'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            reminder.type === 'study_time' ? 'bg-blue-100' :
                            reminder.type === 'break' ? 'bg-green-100' :
                            reminder.type === 'motivation' ? 'bg-purple-100' :
                            'bg-orange-100'
                          }`}>
                            {reminder.type === 'study_time' ? <BookOpen className="w-5 h-5 text-blue-600" /> :
                             reminder.type === 'break' ? <Clock className="w-5 h-5 text-green-600" /> :
                             reminder.type === 'motivation' ? <Trophy className="w-5 h-5 text-purple-600" /> :
                             <Bell className="w-5 h-5 text-orange-600" />}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <p className="font-medium text-gray-900">{reminder.message}</p>
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                reminder.priority === 'high' ? 'bg-red-100 text-red-700' :
                                reminder.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-green-100 text-green-700'
                              }`}>
                                {reminder.priority}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">
                              <Clock className="w-3 h-3 inline mr-1" />
                              Scheduled for {reminder.scheduledTime}
                            </p>
                            <p className="text-sm text-purple-600 italic">
                              💡 {reminder.actionSuggestion}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-gray-100 rounded-full">
                            <Edit className="w-4 h-4 text-gray-600" />
                          </button>
                          <button className="p-2 hover:bg-gray-100 rounded-full">
                            <Trash2 className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'planner' && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Your Personalized Study Plan</h3>
                  <p className="text-gray-600">AI-generated based on your strengths, weaknesses, and learning patterns</p>
                </div>

                {currentPlan && (
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Target & Timeline</h4>
                        <div className="space-y-1 text-sm text-gray-600">
                          <p>Exam Date: {new Date(currentPlan.targetExamDate).toLocaleDateString()}</p>
                          <p>Target Score: {currentPlan.targetScore}%</p>
                          <p>Daily Hours: {currentPlan.dailyHours}h</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Focus Areas</h4>
                        <div className="space-y-1">
                          {currentPlan.weakAreas.map((area, index) => (
                            <span key={index} className="inline-block bg-red-100 text-red-700 px-2 py-1 rounded text-xs mr-1">
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Strengths to Maintain</h4>
                        <div className="space-y-1">
                          {currentPlan.strongAreas.map((area, index) => (
                            <span key={index} className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded text-xs mr-1">
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="text-center">
                  <button
                    onClick={generateSmartStudyPlan}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto"
                  >
                    <Zap className="w-5 h-5" />
                    Regenerate AI Plan
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'progress' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Study Analytics & Insights</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-xl border shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-4">Weekly Performance</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Tasks Completed</span>
                        <span className="font-bold text-blue-600">{weeklyProgress.completed}/{weeklyProgress.total}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Average Accuracy</span>
                        <span className="font-bold text-green-600">{weeklyProgress.accuracy}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Study Time</span>
                        <span className="font-bold text-purple-600">{weeklyProgress.timeSpent}h</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl border shadow-sm">
                    <h4 className="font-semibold text-gray-900 mb-4">AI Recommendations</h4>
                    <div className="space-y-3 text-sm">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="text-blue-800">📈 Increase Current Affairs study time by 15 minutes daily</p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-green-800">✅ Maintain strong performance in Legal Reasoning</p>
                      </div>
                      <div className="bg-orange-50 p-3 rounded-lg">
                        <p className="text-orange-800">⚡ Take mock tests twice weekly to improve time management</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartStudyPlanner;
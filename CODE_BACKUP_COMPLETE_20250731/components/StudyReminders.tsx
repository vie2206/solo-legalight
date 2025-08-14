import React, { useState, useEffect } from 'react';
import { 
  BellIcon, 
  ClockIcon, 
  BookOpenIcon, 
  TrophyIcon,
  ChartBarIcon,
  SparklesIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  FireIcon,
  AcademicCapIcon,
  LightBulbIcon,
  CalendarDaysIcon,
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

// Types
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  study_streak?: number;
  target_score?: number;
  avg_score?: number;
}

interface StudySession {
  id: string;
  subject: string;
  duration: number;
  completed_at: string;
  score?: number;
}

interface StudyReminder {
  id: string;
  type: 'streak' | 'weakness' | 'revision' | 'goal' | 'schedule' | 'motivational';
  priority: 'high' | 'medium' | 'low';
  title: string;
  message: string;
  action: string;
  subject?: string;
  dueDate?: string;
  progress?: number;
  recommendation: string;
  aiReasoning: string;
}

interface StudyPattern {
  bestStudyTime: string;
  averageSessionDuration: number;
  strongSubjects: string[];
  weakSubjects: string[];
  consistency: number;
  lastWeekSessions: number;
}

interface StudyRemindersProps {
  user: User | null;
}

const StudyReminders: React.FC<StudyRemindersProps> = ({ user }) => {
  const [reminders, setReminders] = useState<StudyReminder[]>([]);
  const [studyPattern, setStudyPattern] = useState<StudyPattern | null>(null);
  const [loading, setLoading] = useState(true);
  const [dismissedReminders, setDismissedReminders] = useState<Set<string>>(new Set());

  // Mock data - in real implementation, this would come from API
  useEffect(() => {
    // Simulate API call delay
    setTimeout(() => {
      generateAIReminders();
      setLoading(false);
    }, 1500);
  }, [user]);

  const generateAIReminders = () => {
    // Simulate user study patterns
    const mockStudyPattern: StudyPattern = {
      bestStudyTime: '10:00 AM',
      averageSessionDuration: 45,
      strongSubjects: ['Legal Reasoning', 'Current Affairs'],
      weakSubjects: ['Quantitative Techniques', 'English'],
      consistency: 72,
      lastWeekSessions: 5
    };

    setStudyPattern(mockStudyPattern);

    // Generate AI-powered reminders based on user data
    const aiReminders: StudyReminder[] = [
      {
        id: '1',
        type: 'streak',
        priority: 'high',
        title: '🔥 Keep Your Streak Alive!',
        message: `You're on a ${user?.study_streak || 15}-day study streak! Study today to maintain your momentum.`,
        action: 'Start 30-min session',
        dueDate: new Date().toISOString(),
        progress: 85,
        recommendation: 'Quick 30-minute session focusing on Legal Reasoning',
        aiReasoning: 'Based on your consistent study pattern, maintaining streaks improves retention by 34%'
      },
      {
        id: '2',
        type: 'weakness',
        priority: 'high',
        title: '📊 Focus on Weak Areas',
        message: 'Your Quantitative Techniques score is 12% below your target. Time to strengthen this area!',
        action: 'Practice Quant',
        subject: 'Quantitative Techniques',
        progress: 45,
        recommendation: 'Dedicate 40 minutes to Data Interpretation problems',
        aiReasoning: 'Students who focus on weak subjects for 40+ minutes show 28% improvement within 2 weeks'
      },
      {
        id: '3',
        type: 'schedule',
        priority: 'medium',
        title: '⏰ Optimal Study Time',
        message: 'Your peak performance time (10:00 AM) is approaching. Schedule your most challenging topics now.',
        action: 'Schedule session',
        dueDate: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
        recommendation: 'Study Constitutional Law during your peak hours',
        aiReasoning: 'Your performance data shows 23% better retention when studying complex topics at 10 AM'
      },
      {
        id: '4',
        type: 'revision',
        priority: 'medium',
        title: '🔄 Revision Alert',
        message: 'Topics studied 3 days ago need revision to move to long-term memory.',
        action: 'Start revision',
        subject: 'Legal Reasoning',
        progress: 75,
        recommendation: 'Quick 20-minute revision of Contract Law concepts',
        aiReasoning: 'Spaced repetition after 3 days increases retention probability to 87%'
      },
      {
        id: '5',
        type: 'goal',
        priority: 'low',
        title: '🎯 Target Progress',
        message: `You're 78% toward your target score of ${user?.target_score || 85}. Keep up the great work!`,
        action: 'View progress',
        progress: 78,
        recommendation: 'Focus on high-yield topics for maximum score improvement',
        aiReasoning: 'You\'re in the final stretch - strategic studying can yield 15-20% score improvement'
      },
      {
        id: '6',
        type: 'motivational',
        priority: 'low',
        title: '⭐ Daily Motivation',
        message: 'Small daily improvements lead to stunning yearly results. You\'ve got this!',
        action: 'Stay motivated',
        recommendation: 'Celebrate small wins and maintain consistency',
        aiReasoning: 'Positive reinforcement increases study engagement by 31% according to learning psychology'
      }
    ];

    setReminders(aiReminders.filter(r => !dismissedReminders.has(r.id)));
  };

  const dismissReminder = (reminderId: string) => {
    setDismissedReminders(prev => new Set([...prev, reminderId]));
    setReminders(prev => prev.filter(r => r.id !== reminderId));
  };

  const getIconForType = (type: StudyReminder['type']) => {
    switch (type) {
      case 'streak': return FireIcon;
      case 'weakness': return ChartBarIcon;
      case 'revision': return BookOpenIcon;
      case 'goal': return TrophyIcon;
      case 'schedule': return ClockIcon;
      case 'motivational': return SparklesIcon;
      default: return BellIcon;
    }
  };

  const getPriorityColor = (priority: StudyReminder['priority']) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50';
      case 'medium': return 'border-yellow-200 bg-yellow-50';
      case 'low': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <h2 className="text-xl font-bold text-gray-900">AI is analyzing your study patterns...</h2>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse">
              <div className="h-20 bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* AI Study Insights Header */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <SparklesIcon className="h-8 w-8" />
          <h2 className="text-2xl font-bold">AI Study Assistant</h2>
        </div>
        <p className="text-purple-100 mb-4">
          Personalized recommendations based on your study patterns and performance data
        </p>
        
        {/* Quick Stats */}
        {studyPattern && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{studyPattern.consistency}%</div>
              <div className="text-sm text-purple-200">Consistency</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{studyPattern.lastWeekSessions}</div>
              <div className="text-sm text-purple-200">Sessions/Week</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{studyPattern.averageSessionDuration}m</div>
              <div className="text-sm text-purple-200">Avg Duration</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{studyPattern.bestStudyTime}</div>
              <div className="text-sm text-purple-200">Peak Time</div>
            </div>
          </div>
        )}
      </div>

      {/* Study Pattern Analysis */}
      {studyPattern && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <ChartBarIcon className="h-5 w-5 mr-2 text-blue-600" />
            Your Study Pattern Analysis
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Strong Subjects</h4>
              <div className="space-y-2">
                {studyPattern.strongSubjects.map(subject => (
                  <div key={subject} className="flex items-center space-x-2">
                    <CheckCircleIcon className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-700">{subject}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Areas for Improvement</h4>
              <div className="space-y-2">
                {studyPattern.weakSubjects.map(subject => (
                  <div key={subject} className="flex items-center space-x-2">
                    <ExclamationTriangleIcon className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm text-gray-700">{subject}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Reminders */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <BellIcon className="h-5 w-5 mr-2 text-purple-600" />
          Smart Study Reminders ({reminders.length})
        </h3>
        
        {reminders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <CheckCircleIcon className="h-12 w-12 mx-auto mb-4 text-green-500" />
            <p className="text-lg font-medium">All caught up!</p>
            <p className="text-sm">No active reminders right now. Keep up the great work!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reminders.map(reminder => {
              const IconComponent = getIconForType(reminder.type);
              
              return (
                <div 
                  key={reminder.id}
                  className={`border-2 rounded-lg p-4 transition-all hover:shadow-md ${getPriorityColor(reminder.priority)}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <IconComponent className="h-6 w-6 text-gray-600 mt-0.5 flex-shrink-0" />
                      
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{reminder.title}</h4>
                        <p className="text-gray-700 mb-2">{reminder.message}</p>
                        
                        {reminder.progress !== undefined && (
                          <div className="mb-2">
                            <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                              <span>Progress</span>
                              <span>{reminder.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(reminder.progress)}`}
                                style={{ width: `${reminder.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                        
                        <div className="bg-white/70 rounded-lg p-3 mb-3">
                          <div className="flex items-start space-x-2">
                            <LightBulbIcon className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-gray-900">AI Recommendation:</p>
                              <p className="text-sm text-gray-700">{reminder.recommendation}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-xs text-gray-500 mb-3">
                          <span className="font-medium">AI Insight:</span> {reminder.aiReasoning}
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                            {reminder.action}
                          </button>
                          
                          {reminder.dueDate && (
                            <div className="flex items-center space-x-1 text-sm text-gray-500">
                              <CalendarDaysIcon className="h-4 w-4" />
                              <span>Due: {new Date(reminder.dueDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => dismissReminder(reminder.id)}
                      className="ml-4 p-1 hover:bg-gray-200 rounded-full transition-colors"
                      title="Dismiss"
                    >
                      <span className="text-gray-400 hover:text-gray-600">×</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Study Tips */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <AcademicCapIcon className="h-5 w-5 mr-2 text-green-600" />
          Today's AI Study Tips
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-medium text-green-900 mb-2">📚 Study Technique</h4>
            <p className="text-sm text-green-800">
              Try the Pomodoro Technique: 25 minutes focused study + 5 minute break. 
              Your data shows 18% better retention with structured breaks.
            </p>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">🎯 Focus Area</h4>
            <p className="text-sm text-blue-800">
              Prioritize Constitutional Law today. Recent performance data suggests 
              this topic has the highest score improvement potential.
            </p>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="font-medium text-purple-900 mb-2">⏰ Timing Tip</h4>
            <p className="text-sm text-purple-800">
              Your attention span peaks at 47 minutes. Take a 10-minute break 
              before continuing to maintain optimal performance.
            </p>
          </div>
          
          <div className="bg-yellow-50 rounded-lg p-4">
            <h4 className="font-medium text-yellow-900 mb-2">🔄 Memory Boost</h4>
            <p className="text-sm text-yellow-800">
              Review yesterday's Legal Reasoning notes for 10 minutes before starting 
              new topics. This spaced repetition improves long-term retention.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyReminders;
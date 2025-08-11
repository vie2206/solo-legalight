import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Brain, 
  Moon, 
  Sun,
  Zap,
  Activity,
  Target,
  Clock,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Wind,
  TreePine,
  Waves,
  Coffee,
  CheckCircle,
  Star,
  Calendar,
  TrendingUp,
  Sparkles,
  Shield,
  AlertCircle,
  Smile,
  Frown,
  Meh
} from 'lucide-react';
import { claudeAIService } from '../../services/claudeAIService';

interface StressLevel {
  level: number; // 1-10
  timestamp: Date;
  triggers: string[];
  notes?: string;
}

interface WellnessActivity {
  id: string;
  name: string;
  type: 'breathing' | 'meditation' | 'exercise' | 'music' | 'nature';
  duration: number; // in minutes
  description: string;
  instructions: string[];
  benefits: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  audioUrl?: string;
  completed: boolean;
  completedAt?: Date;
}

interface MoodEntry {
  id: string;
  mood: 'happy' | 'neutral' | 'stressed' | 'anxious' | 'excited' | 'tired';
  energy: number; // 1-10
  stress: number; // 1-10
  notes?: string;
  timestamp: Date;
  studyHours: number;
  testScore?: number;
}

const StressManagement: React.FC = () => {
  const [currentStressLevel, setCurrentStressLevel] = useState(5);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [activeActivity, setActiveActivity] = useState<WellnessActivity | null>(null);
  const [sessionTimer, setSessionTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [selectedMood, setSelectedMood] = useState<string>('');
  const [moodNotes, setMoodNotes] = useState('');

  const [wellnessStats] = useState({
    totalSessions: 34,
    totalMinutes: 187,
    streakDays: 8,
    averageStress: 4.2,
    improvementRate: 23,
    favoriteTechnique: 'Deep Breathing',
    wellnessScore: 78
  });

  const [recentMoods] = useState<MoodEntry[]>([
    {
      id: '1',
      mood: 'stressed',
      energy: 6,
      stress: 8,
      notes: 'Big mock test tomorrow',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      studyHours: 8,
      testScore: 72
    },
    {
      id: '2', 
      mood: 'happy',
      energy: 8,
      stress: 3,
      notes: 'Scored well on practice test!',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      studyHours: 6,
      testScore: 85
    }
  ]);

  const wellnessActivities: WellnessActivity[] = [
    {
      id: 'breathing_478',
      name: '4-7-8 Breathing Technique',
      type: 'breathing',
      duration: 5,
      description: 'A calming breathing pattern that helps reduce anxiety and promote sleep',
      instructions: [
        'Sit comfortably with your back straight',
        'Exhale completely through your mouth',
        'Inhale through nose for 4 counts',
        'Hold breath for 7 counts',
        'Exhale through mouth for 8 counts',
        'Repeat cycle 3-4 times'
      ],
      benefits: ['Reduces anxiety', 'Improves sleep', 'Calms nervous system'],
      difficulty: 'Beginner',
      completed: false
    },
    {
      id: 'meditation_mindful',
      name: 'Mindful Study Break',
      type: 'meditation',
      duration: 10,
      description: 'A short mindfulness meditation designed for students',
      instructions: [
        'Find a quiet space and sit comfortably',
        'Close your eyes and focus on your breath',
        'Notice thoughts about studies without judgment',
        'Gently return attention to breathing',
        'Set intention for next study session'
      ],
      benefits: ['Improves focus', 'Reduces study stress', 'Enhances memory retention'],
      difficulty: 'Beginner',
      completed: false
    },
    {
      id: 'exercise_desk',
      name: 'Desk Yoga Stretches',
      type: 'exercise',
      duration: 8,
      description: 'Simple stretches to relieve tension from long study sessions',
      instructions: [
        'Neck rolls: 5 each direction',
        'Shoulder shrugs: 10 times',
        'Spinal twist: Hold 30 seconds each side',
        'Forward fold: Hold 1 minute',
        'Deep breathing: 2 minutes'
      ],
      benefits: ['Relieves physical tension', 'Improves posture', 'Boosts energy'],
      difficulty: 'Beginner',
      completed: false
    },
    {
      id: 'nature_sounds',
      name: 'Nature Sound Meditation',
      type: 'nature',
      duration: 15,
      description: 'Relax with calming nature sounds and guided visualization',
      instructions: [
        'Put on headphones for best experience',
        'Close eyes and listen to forest sounds',
        'Visualize yourself in a peaceful forest',
        'Focus on the sounds of birds and water',
        'Let go of study-related thoughts'
      ],
      benefits: ['Deep relaxation', 'Stress relief', 'Mental clarity'],
      difficulty: 'Intermediate',
      completed: false
    },
    {
      id: 'power_nap',
      name: 'Strategic Power Nap',
      type: 'meditation',
      duration: 20,
      description: 'A 20-minute power nap to boost alertness and memory consolidation',
      instructions: [
        'Find a comfortable, dark place',
        'Set timer for exactly 20 minutes',
        'Lie down and close eyes',
        'Practice progressive muscle relaxation',
        'Don\'t worry if you don\'t fall asleep'
      ],
      benefits: ['Boosts alertness', 'Improves memory', 'Reduces fatigue'],
      difficulty: 'Beginner',
      completed: false
    }
  ];

  useEffect(() => {
    if (isSessionActive && timerInterval === null) {
      const interval = setInterval(() => {
        setSessionTimer(prev => prev + 1);
      }, 1000);
      setTimerInterval(interval);
    } else if (!isSessionActive && timerInterval) {
      clearInterval(timerInterval);
      setTimerInterval(null);
    }

    return () => {
      if (timerInterval) {
        clearInterval(timerInterval);
      }
    };
  }, [isSessionActive, timerInterval]);

  const startActivity = (activity: WellnessActivity) => {
    setActiveActivity(activity);
    setIsSessionActive(true);
    setSessionTimer(0);
  };

  const stopActivity = () => {
    setIsSessionActive(false);
    setSessionTimer(0);
    if (activeActivity) {
      // Mark as completed
      setActiveActivity({
        ...activeActivity,
        completed: true,
        completedAt: new Date()
      });
    }
    setTimeout(() => setActiveActivity(null), 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStressColor = (level: number) => {
    if (level <= 3) return 'text-green-600 bg-green-100';
    if (level <= 6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getStressLabel = (level: number) => {
    if (level <= 3) return 'Low Stress';
    if (level <= 6) return 'Moderate Stress';
    return 'High Stress';
  };

  const getMoodIcon = (mood: string) => {
    switch (mood) {
      case 'happy': return <Smile className="w-6 h-6 text-green-500" />;
      case 'stressed': return <Frown className="w-6 h-6 text-red-500" />;
      case 'anxious': return <AlertCircle className="w-6 h-6 text-orange-500" />;
      default: return <Meh className="w-6 h-6 text-gray-500" />;
    }
  };

  const logMood = async () => {
    if (!selectedMood) return;
    
    // In real implementation, save to database
    console.log('Mood logged:', { mood: selectedMood, notes: moodNotes, timestamp: new Date() });
    setSelectedMood('');
    setMoodNotes('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Heart className="w-8 h-8 text-pink-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Wellness & Stress Management</h1>
                <p className="text-gray-600">AI-powered mental wellness for CLAT preparation</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className={`px-4 py-2 rounded-full flex items-center gap-2 ${getStressColor(currentStressLevel)}`}>
                <Activity className="w-4 h-4" />
                <span className="font-medium">{getStressLabel(currentStressLevel)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Wellness Overview */}
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{wellnessStats.wellnessScore}</div>
              <div className="text-pink-200">Wellness Score</div>
              <div className="text-sm text-pink-100 mt-1">Overall mental health</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{wellnessStats.totalSessions}</div>
              <div className="text-pink-200">Sessions</div>
              <div className="text-sm text-pink-100 mt-1">Total completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{wellnessStats.streakDays}</div>
              <div className="text-pink-200">Day Streak</div>
              <div className="text-sm text-pink-100 mt-1">Daily practice</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2 text-green-300">-{wellnessStats.improvementRate}%</div>
              <div className="text-pink-200">Stress Reduction</div>
              <div className="text-sm text-pink-100 mt-1">This month</div>
            </div>
          </div>
        </div>

        {/* Quick Stress Check & Active Session */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Stress Level Tracker */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              Current Stress Level
            </h2>
            
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">How stressed do you feel right now?</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStressColor(currentStressLevel)}`}>
                  {currentStressLevel}/10
                </span>
              </div>
              
              <input
                type="range"
                min="1"
                max="10"
                value={currentStressLevel}
                onChange={(e) => setCurrentStressLevel(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
              
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Relaxed</span>
                <span>Overwhelmed</span>
              </div>
            </div>

            {currentStressLevel > 6 && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <span className="font-medium text-red-800">High stress detected!</span>
                </div>
                <p className="text-red-700 text-sm">
                  Consider taking a wellness break. Here are some quick activities that can help.
                </p>
              </div>
            )}

            <div className="space-y-2">
              <button
                onClick={() => startActivity(wellnessActivities[0])}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
              >
                <Wind className="w-4 h-4" />
                Quick 5-min breathing
              </button>
              <button
                onClick={() => startActivity(wellnessActivities[1])}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
              >
                <Brain className="w-4 h-4" />
                10-min meditation
              </button>
            </div>
          </div>

          {/* Active Session */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            {!activeActivity ? (
              <div className="text-center py-8">
                <Moon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-700 mb-2">Ready for wellness</h3>
                <p className="text-gray-600">Select an activity below to start your wellness session</p>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{activeActivity.name}</h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSoundEnabled(!soundEnabled)}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <div className="text-6xl font-bold text-blue-600 mb-2">
                    {formatTime(sessionTimer)}
                  </div>
                  <div className="text-gray-600">
                    {Math.floor((sessionTimer / 60))} of {activeActivity.duration} minutes
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${Math.min((sessionTimer / (activeActivity.duration * 60)) * 100, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <h4 className="font-medium text-gray-900">Current Instructions:</h4>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-blue-800">
                      {activeActivity.instructions[Math.min(Math.floor(sessionTimer / 30), activeActivity.instructions.length - 1)]}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setIsSessionActive(!isSessionActive)}
                    className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 ${
                      isSessionActive 
                        ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    }`}
                  >
                    {isSessionActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    {isSessionActive ? 'Pause' : 'Resume'}
                  </button>
                  <button
                    onClick={stopActivity}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-lg"
                  >
                    Complete Session
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Wellness Activities Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Wellness Activities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wellnessActivities.map((activity) => (
              <div key={activity.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      {activity.type === 'breathing' && <Wind className="w-6 h-6 text-blue-600" />}
                      {activity.type === 'meditation' && <Brain className="w-6 h-6 text-purple-600" />}
                      {activity.type === 'exercise' && <Activity className="w-6 h-6 text-green-600" />}
                      {activity.type === 'nature' && <TreePine className="w-6 h-6 text-green-600" />}
                      {activity.type === 'music' && <Volume2 className="w-6 h-6 text-pink-600" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{activity.name}</h3>
                      <p className="text-sm text-gray-500">{activity.duration} minutes</p>
                    </div>
                  </div>
                  {activity.completed && <CheckCircle className="w-5 h-5 text-green-500" />}
                </div>

                <p className="text-gray-600 mb-4">{activity.description}</p>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Benefits:</h4>
                  <div className="flex flex-wrap gap-1">
                    {activity.benefits.map((benefit, index) => (
                      <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => startActivity(activity)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  Start Activity
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Mood Tracking & Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Mood Logger */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-600" />
              Log Your Mood
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">How are you feeling?</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { key: 'happy', label: 'Happy', icon: Smile, color: 'green' },
                    { key: 'neutral', label: 'Neutral', icon: Meh, color: 'gray' },
                    { key: 'stressed', label: 'Stressed', icon: Frown, color: 'red' },
                  ].map(({ key, label, icon: Icon, color }) => (
                    <button
                      key={key}
                      onClick={() => setSelectedMood(key)}
                      className={`p-3 rounded-lg border-2 flex flex-col items-center gap-2 transition-colors ${
                        selectedMood === key
                          ? `border-${color}-500 bg-${color}-50`
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Icon className={`w-6 h-6 ${selectedMood === key ? `text-${color}-500` : 'text-gray-400'}`} />
                      <span className="text-sm font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes (optional)</label>
                <textarea
                  value={moodNotes}
                  onChange={(e) => setMoodNotes(e.target.value)}
                  placeholder="What's affecting your mood today?"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                  rows={3}
                />
              </div>

              <button
                onClick={logMood}
                disabled={!selectedMood}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Log Mood
              </button>
            </div>
          </div>

          {/* Recent Mood History */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Mood Trends
            </h3>

            <div className="space-y-4">
              {recentMoods.map((entry) => (
                <div key={entry.id} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                  {getMoodIcon(entry.mood)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium capitalize">{entry.mood}</span>
                      <span className="text-sm text-gray-500">
                        {entry.timestamp.toLocaleDateString()}
                      </span>
                    </div>
                    {entry.notes && (
                      <p className="text-sm text-gray-600 mb-2">{entry.notes}</p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>Energy: {entry.energy}/10</span>
                      <span>Stress: {entry.stress}/10</span>
                      <span>Study: {entry.studyHours}h</span>
                      {entry.testScore && <span>Score: {entry.testScore}%</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StressManagement;
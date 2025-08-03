import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { vocabularyDatabase, passages, challengesDatabase } from './data/CLATReadingData';
import { 
  BookOpen, Target, Brain, Award, Clock, TrendingUp, 
  Search, Heart, X, ChevronLeft, ChevronRight, Play, 
  Pause, RotateCcw, Settings, BarChart3, Lightbulb,
  Bookmark, MessageSquare, Highlighter, Volume2, Zap,
  Trophy, Star, Users, Calendar, Download, Share2,
  Eye, Headphones, Sunrise, Moon, Coffee, CheckCircle,
  ArrowRight, Flame, Globe, PenTool, Mic, Camera,
  RefreshCw, ThumbsUp, ThumbsDown, HelpCircle, Timer,
  BookmarkPlus, Volume1, ArrowUp, ArrowDown, Activity,
  LineChart, PieChart, BarChart, Filter, Sparkles,
  FastForward, Rewind, SkipForward, SkipBack, Shuffle,
  Repeat, Volume, VolumeX, Maximize, Minimize, MoreHorizontal,
  TrendingDown, AlertCircle, Info, ChevronUp, ChevronDown,
  Edit, Save, FileText, Image, Video, Headphones as HeadphonesIcon
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface CLATReadingMasteryEnhancedProps {
  user: User | null;
  onBack: () => void;
}

const CLATReadingMasteryEnhanced: React.FC<CLATReadingMasteryEnhancedProps> = ({ user, onBack }) => {
  // Core state management
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedPassage, setSelectedPassage] = useState<any>(null);
  const [readingTimer, setReadingTimer] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [selectedWord, setSelectedWord] = useState<any>(null);
  const [selectedText, setSelectedText] = useState('');
  const [aiQuestions, setAiQuestions] = useState<any[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [readingHistory, setReadingHistory] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showAnswerExplanation, setShowAnswerExplanation] = useState(false);
  
  // Enhanced User progress state
  const [userStats, setUserStats] = useState({
    readingSpeed: 185,
    comprehensionScore: 78,
    dailyStreak: 12,
    wordsLearned: 247,
    passagesRead: 45,
    level: 'Intermediate Scholar',
    xp: 2840,
    xpToNext: 1160,
    catLevel: 3,
    totalTimeSpent: 18420, // in minutes
    averageAccuracy: 78,
    weeklyGoal: {
      passages: { current: 12, target: 15 },
      words: { current: 23, target: 30 },
      accuracy: { current: 85, target: 85 },
      completed: 3,
      total: 5
    },
    dailyStats: [
      { day: 'Mon', passages: 3, accuracy: 82, timeSpent: 45 },
      { day: 'Tue', passages: 2, accuracy: 79, timeSpent: 30 },
      { day: 'Wed', passages: 4, accuracy: 85, timeSpent: 60 },
      { day: 'Thu', passages: 1, accuracy: 71, timeSpent: 20 },
      { day: 'Fri', passages: 3, accuracy: 88, timeSpent: 50 },
      { day: 'Sat', passages: 0, accuracy: 0, timeSpent: 0 },
      { day: 'Sun', passages: 2, accuracy: 76, timeSpent: 35 }
    ]
  });

  // Enhanced App state
  const [highlights, setHighlights] = useState([
    { id: 1, text: "fundamental right", color: "yellow", passageId: 1, position: { start: 150, end: 166 } },
    { id: 2, text: "surveillance capitalism", color: "blue", passageId: 1, position: { start: 280, end: 302 } }
  ]);
  const [personalVocab, setPersonalVocab] = useState(new Set(['jurisprudence', 'precedent', 'constitutional']));
  const [achievements, setAchievements] = useState([
    { id: 1, title: 'Speed Reader', description: 'Read 200+ WPM for 5 consecutive sessions', icon: '🚀', unlocked: true, date: '2024-01-15' },
    { id: 2, title: 'Vocabulary Explorer', description: 'Learn 50 new words in a week', icon: '📚', unlocked: true, date: '2024-01-20' },
    { id: 3, title: 'Daily Warrior', description: 'Maintain a 10-day streak', icon: '🔥', unlocked: true, date: '2024-01-25' },
    { id: 4, title: 'Comprehension Master', description: 'Score 90%+ on 10 tests', icon: '🎯', unlocked: false, progress: 7, target: 10 }
  ]);
  
  const [readingPreferences, setReadingPreferences] = useState({
    fontSize: 18,
    theme: 'light',
    highlightColor: 'yellow',
    fontFamily: 'serif',
    lineHeight: 1.7,
    readingMode: 'normal', // normal, speed, focus
    autoAdvance: false,
    soundEffects: true,
    animations: true
  });

  // Enhanced Flashcard system state
  const [flashcardMode, setFlashcardMode] = useState('review'); // review, learn, test, spaced
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [flashcardStats, setFlashcardStats] = useState({
    easy: 0,
    medium: 0,
    hard: 0,
    streak: 5,
    totalReviewed: 0,
    accuracy: 0,
    dailyGoal: { current: 15, target: 20 }
  });
  const [spacedRepetition, setSpacedRepetition] = useState<Record<string, any>>({});
  const [flashcardFilters, setFlashcardFilters] = useState({
    difficulty: 'all',
    category: 'all',
    mastery: 'all'
  });

  // Enhanced GK Quiz system state
  const [currentGKQuestion, setCurrentGKQuestion] = useState(0);
  const [gkQuizMode, setGKQuizMode] = useState('daily');
  const [gkScore, setGKScore] = useState(0);
  const [gkStreak, setGKStreak] = useState(8);
  const [gkAnswers, setGKAnswers] = useState<Record<number, {selected: number, correct: boolean}>>({});
  const [quizTimeLeft, setQuizTimeLeft] = useState(60);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [gkStats, setGKStats] = useState({
    totalQuestions: 145,
    correct: 112,
    accuracy: 77,
    currentAffairs: 85,
    history: 72,
    polity: 88,
    economics: 69,
    legalAwareness: 91,
    environment: 76,
    weeklyStats: [
      { week: 'Week 1', score: 75, questions: 25 },
      { week: 'Week 2', score: 82, questions: 30 },
      { week: 'Week 3', score: 78, questions: 28 },
      { week: 'Week 4', score: 85, questions: 32 }
    ]
  });
  const [quizHistory, setQuizHistory] = useState<any[]>([]);
  const [customQuizSettings, setCustomQuizSettings] = useState({
    categories: ['all'],
    difficulty: 'mixed',
    timeLimit: 60,
    questionCount: 10
  });

  // Cat levels with enhanced animations and achievements
  const catLevels: Record<number, any> = {
    1: { 
      name: 'Curious Kitten', 
      emoji: '🐱', 
      description: 'Just starting the reading journey!', 
      color: 'from-pink-400 to-purple-500',
      minXP: 0,
      maxXP: 500,
      abilities: ['Basic reading tracking', 'Simple vocabulary'],
      nextReward: 'Unlock basic flashcards'
    },
    2: { 
      name: 'Bookworm Cat', 
      emoji: '😸', 
      description: 'Getting comfortable with reading!', 
      color: 'from-blue-400 to-indigo-500',
      minXP: 500,
      maxXP: 1200,
      abilities: ['Speed reading mode', 'Advanced vocabulary'],
      nextReward: 'Unlock GK challenges'
    },
    3: { 
      name: 'Scholar Cat', 
      emoji: '🤓', 
      description: 'Developing strong reading skills!', 
      color: 'from-green-400 to-emerald-500',
      minXP: 1200,
      maxXP: 2500,
      abilities: ['AI-powered analysis', 'Custom highlights'],
      nextReward: 'Unlock analytics dashboard'
    },
    4: { 
      name: 'Master Cat', 
      emoji: '😻', 
      description: 'Advanced reading mastery!', 
      color: 'from-yellow-400 to-orange-500',
      minXP: 2500,
      maxXP: 5000,
      abilities: ['Advanced analytics', 'Custom challenges'],
      nextReward: 'Unlock expert mode'
    },
    5: { 
      name: 'Genius Cat', 
      emoji: '🦸', 
      description: 'Reading superhero!', 
      color: 'from-purple-500 to-pink-500',
      minXP: 5000,
      maxXP: Infinity,
      abilities: ['All features unlocked', 'Mentor mode'],
      nextReward: 'Maximum level achieved!'
    }
  };

  // Performance tracking
  const [performanceMetrics, setPerformanceMetrics] = useState({
    readingSpeedHistory: [
      { date: '2024-01-20', speed: 165 },
      { date: '2024-01-21', speed: 172 },
      { date: '2024-01-22', speed: 178 },
      { date: '2024-01-23', speed: 185 },
      { date: '2024-01-24', speed: 190 },
      { date: '2024-01-25', speed: 195 },
      { date: '2024-01-26', speed: 185 }
    ],
    accuracyHistory: [
      { date: '2024-01-20', accuracy: 72 },
      { date: '2024-01-21', accuracy: 75 },
      { date: '2024-01-22', accuracy: 78 },
      { date: '2024-01-23', accuracy: 82 },
      { date: '2024-01-24', accuracy: 79 },
      { date: '2024-01-25', accuracy: 81 },
      { date: '2024-01-26', accuracy: 78 }
    ],
    timeDistribution: {
      reading: 65,
      vocabulary: 20,
      quizzes: 15
    },
    weakAreas: [
      { topic: 'Legal Reasoning', score: 68 },
      { topic: 'Current Affairs', score: 72 },
      { topic: 'Logical Reasoning', score: 75 }
    ],
    strongAreas: [
      { topic: 'English Language', score: 88 },
      { topic: 'General Knowledge', score: 85 },
      { topic: 'Quantitative Techniques', score: 82 }
    ]
  });

  // Enhanced GK Questions database state
  const [gkQuestionsDatabase, setGkQuestionsDatabase] = useState<any[]>([]);
  
  // Advanced reading features
  const [readingFeatures, setReadingFeatures] = useState({
    highlightMode: false,
    speedReading: false,
    focusMode: false,
    audioMode: false,
    annotationMode: false,
    vocabularyHelp: true,
    progressTracking: true
  });

  // Challenge progress tracking state
  const [challengesData, setChallengesData] = useState(challengesDatabase);

  // Performance analytics state
  const [performanceAnalytics, setPerformanceAnalytics] = useState({
    readingSpeed: {
      current: 185,
      target: 220,
      improvement: '+12 WPM this month',
      trend: 'improving',
      history: [
        { date: '2024-01-20', value: 165, session: 'Morning' },
        { date: '2024-01-21', value: 172, session: 'Evening' },
        { date: '2024-01-22', value: 178, session: 'Afternoon' },
        { date: '2024-01-23', value: 185, session: 'Morning' },
        { date: '2024-01-24', value: 190, session: 'Evening' },
        { date: '2024-01-25', value: 195, session: 'Morning' },
        { date: '2024-01-26', value: 185, session: 'Afternoon' }
      ],
      benchmarks: {
        beginner: 120,
        intermediate: 180,
        advanced: 250,
        expert: 350
      },
      personalBest: 208,
      averageImprovement: 2.5
    },
    comprehension: {
      current: 78,
      target: 85,
      improvement: '+6% this month',
      trend: 'improving',
      history: [
        { date: '2024-01-20', value: 72, passage: 'Constitutional Law' },
        { date: '2024-01-21', value: 75, passage: 'Current Affairs' },
        { date: '2024-01-22', value: 78, passage: 'Environmental Law' },
        { date: '2024-01-23', value: 82, passage: 'Legal Reasoning' },
        { date: '2024-01-24', value: 79, passage: 'Economic Policy' },
        { date: '2024-01-25', value: 81, passage: 'International Law' },
        { date: '2024-01-26', value: 78, passage: 'Criminal Justice' }
      ],
      byDifficulty: {
        beginner: 85,
        intermediate: 78,
        advanced: 72,
        expert: 65
      },
      byCategory: {
        'Current Affairs': 82,
        'Legal Reasoning': 75,
        'English Language': 88,
        'Logical Reasoning': 73,
        'Quantitative Techniques': 69
      },
      personalBest: 94,
      consistencyScore: 8.2
    },
    timeManagement: {
      averageTimePerPassage: 6.5,
      target: 5.5,
      improvement: '-0.8 min this month',
      trend: 'improving',
      timeDistribution: {
        reading: 65,
        thinking: 25,
        answering: 10
      },
      efficiency: 78,
      peakHours: ['9-11 AM', '3-5 PM'],
      sessionLengths: [
        { date: '2024-01-20', duration: 45, productivity: 85 },
        { date: '2024-01-21', duration: 30, productivity: 92 },
        { date: '2024-01-22', duration: 60, productivity: 78 },
        { date: '2024-01-23', duration: 35, productivity: 88 },
        { date: '2024-01-24', duration: 50, productivity: 82 },
        { date: '2024-01-25', duration: 40, productivity: 90 },
        { date: '2024-01-26', duration: 25, productivity: 75 }
      ]
    },
    weaknessAnalysis: {
      primaryWeaknesses: [
        {
          area: 'Inference Questions',
          accuracy: 68,
          frequency: 'High',
          improvement: '+8% this month',
          recommendations: [
            'Practice more analytical reading',
            'Focus on context clues',
            'Review logical reasoning patterns'
          ]
        },
        {
          area: 'Legal Terminology',
          accuracy: 72,
          frequency: 'Medium',
          improvement: '+5% this month',
          recommendations: [
            'Use flashcards more regularly',
            'Study etymology of legal terms',
            'Practice in context'
          ]
        },
        {
          area: 'Time Management',
          accuracy: 75,
          frequency: 'Medium',
          improvement: '+3% this month',
          recommendations: [
            'Practice speed reading techniques',
            'Set time limits for each question',
            'Skip difficult questions initially'
          ]
        }
      ],
      improvementTrends: {
        'Inference Questions': [60, 62, 65, 68, 70, 68, 72],
        'Legal Terminology': [68, 70, 69, 72, 75, 73, 72],
        'Time Management': [70, 72, 73, 75, 77, 75, 78]
      }
    },
    strengthAnalysis: {
      primaryStrengths: [
        {
          area: 'Comprehension Questions',
          accuracy: 88,
          consistency: 'Very High',
          trend: 'stable'
        },
        {
          area: 'Vocabulary Recognition',
          accuracy: 85,
          consistency: 'High',
          trend: 'improving'
        },
        {
          area: 'General Knowledge',
          accuracy: 82,
          consistency: 'High',
          trend: 'improving'
        }
      ]
    },
    studyPatterns: {
      preferredTimes: {
        'Morning (6-10 AM)': 35,
        'Afternoon (12-4 PM)': 28,
        'Evening (6-9 PM)': 25,
        'Night (9-11 PM)': 12
      },
      sessionTypes: {
        'Reading Practice': 40,
        'Vocabulary Building': 25,
        'GK Quizzes': 20,
        'Mock Tests': 15
      },
      consistency: {
        dailyStreak: 12,
        weeklyGoalCompletion: 85,
        monthlyProgress: 78
      }
    },
    predictiveInsights: {
      projectedImprovement: {
        readingSpeed: '+15 WPM by month end',
        comprehension: '+7% by month end',
        vocabulary: '+12 words per week'
      },
      riskAreas: [
        'Consistency in daily practice',
        'Advanced legal reasoning',
        'Time pressure performance'
      ],
      recommendations: [
        'Increase daily practice by 15 minutes',
        'Focus on legal reasoning passages',
        'Practice timed mock tests weekly'
      ]
    }
  });

  // Spaced repetition algorithm
  const calculateNextReview = useCallback((easeFactor: number, reviewCount: number, performance: string) => {
    let interval = 1;
    
    if (reviewCount === 0) {
      interval = 1;
    } else if (reviewCount === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    
    // Adjust based on performance
    const performanceMultiplier = performance === 'easy' ? 1.3 : performance === 'hard' ? 0.8 : 1;
    interval = Math.round(interval * performanceMultiplier);
    
    return Date.now() + (interval * 24 * 60 * 60 * 1000);
  }, []);

  const updateEaseFactor = useCallback((currentEase: number, performance: string) => {
    let newEase = currentEase;
    
    switch (performance) {
      case 'easy':
        newEase += 0.1;
        break;
      case 'hard':
        newEase -= 0.2;
        break;
      case 'medium':
        // No change
        break;
      default:
        break;
    }
    
    return Math.max(1.3, Math.min(2.8, newEase));
  }, []);

  // Placeholder for now - will be filled with more parts
  // Enhanced flashcard functions
  const getFlashcardsForReview = useMemo(() => {
    const now = Date.now();
    return vocabularyDatabase.filter((card: any) => {
      if (flashcardFilters.difficulty !== 'all' && card.difficulty !== flashcardFilters.difficulty) return false;
      if (flashcardFilters.category !== 'all' && card.category !== flashcardFilters.category) return false;
      if (flashcardFilters.mastery !== 'all' && card.mastery !== flashcardFilters.mastery) return false;
      
      if (flashcardMode === 'spaced') {
        return !card.nextReview || card.nextReview <= now;
      }
      
      return true;
    });
  }, [flashcardFilters, flashcardMode]);

  const handleFlashcardResponse = useCallback((difficulty: string) => {
    const currentCard = vocabularyDatabase[currentFlashcard];
    
    // Update spaced repetition data
    const newEaseFactor = updateEaseFactor(currentCard.easeFactor, difficulty);
    const nextReview = calculateNextReview(newEaseFactor, currentCard.reviewCount, difficulty);
    
    // Update card data
    currentCard.easeFactor = newEaseFactor;
    currentCard.nextReview = nextReview;
    currentCard.lastReviewed = Date.now();
    currentCard.reviewCount += 1;
    
    // Update mastery level based on performance
    if (difficulty === 'easy' && currentCard.reviewCount >= 3) {
      currentCard.mastery = 'mastered';
    } else if (difficulty === 'hard') {
      currentCard.mastery = 'learning';
    }
    
    // Update stats
    setFlashcardStats(prev => {
      const newStats = { ...prev };
      if (difficulty === 'easy') newStats.easy = newStats.easy + 1;
      else if (difficulty === 'medium') newStats.medium = newStats.medium + 1;
      else if (difficulty === 'hard') newStats.hard = newStats.hard + 1;
      
      newStats.totalReviewed = newStats.totalReviewed + 1;
      newStats.accuracy = difficulty === 'hard' ? newStats.accuracy - 2 : newStats.accuracy + (difficulty === 'easy' ? 3 : 1);
      newStats.streak = difficulty === 'hard' ? 0 : newStats.streak + 1;
      return newStats;
    });
    
    // Update user XP
    const xpGain = difficulty === 'hard' ? 5 : difficulty === 'medium' ? 10 : 15;
    setUserStats(prev => ({
      ...prev,
      xp: prev.xp + xpGain,
      wordsLearned: difficulty === 'easy' && currentCard.mastery === 'new' ? prev.wordsLearned + 1 : prev.wordsLearned
    }));
    
    // Move to next card
    setShowAnswer(false);
    
    const availableCards = getFlashcardsForReview;
    if (currentFlashcard < availableCards.length - 1) {
      setCurrentFlashcard(prev => prev + 1);
    } else {
      setCurrentFlashcard(0);
    }
  }, [currentFlashcard, updateEaseFactor, calculateNextReview, getFlashcardsForReview]);

  // Vocabulary learning progress tracking
  const getVocabularyProgress = useMemo(() => {
    const total = vocabularyDatabase.length;
    const mastered = vocabularyDatabase.filter((card: any) => card.mastery === 'mastered').length;
    const learning = vocabularyDatabase.filter((card: any) => card.mastery === 'learning').length;
    const newWords = vocabularyDatabase.filter((card: any) => card.mastery === 'new').length;
    
    return {
      total,
      mastered,
      learning,
      new: newWords,
      masteredPercentage: Math.round((mastered / total) * 100),
      learningPercentage: Math.round((learning / total) * 100),
      newPercentage: Math.round((newWords / total) * 100)
    };
  }, []);

  // Advanced analytics calculations
  const calculatePerformanceMetrics = useMemo(() => {
    const metrics = {
      overallProgress: Math.round((userStats.xp / (userStats.xp + userStats.xpToNext)) * 100),
      improvementRate: {
        daily: 2.3,
        weekly: 12.8,
        monthly: 45.2
      },
      consistency: {
        score: userStats.dailyStreak * 0.5 + (userStats.weeklyGoal.completed / userStats.weeklyGoal.total) * 50,
        trend: 'improving'
      },
      efficiency: {
        timeVsAccuracy: performanceAnalytics.timeManagement.efficiency,
        learningRate: Math.round((userStats.wordsLearned / userStats.totalTimeSpent) * 100) / 100,
        retention: 85 // calculated from review performance
      },
      competitiveRanking: {
        percentile: 78,
        rank: 1247,
        totalUsers: 5683,
        improvement: '+156 positions this month'
      }
    };
    
    return metrics;
  }, [userStats, performanceAnalytics]);

  // Personalized recommendations engine
  const generateRecommendations = useMemo(() => {
    const recommendations = [];
    
    // Based on performance analytics
    if (performanceAnalytics.comprehension.current < 75) {
      recommendations.push({
        type: 'comprehension',
        priority: 'high',
        title: 'Improve Reading Comprehension',
        description: 'Focus on analytical reading techniques',
        actions: ['Practice inference questions', 'Read editorial analyses', 'Time passage reviews'],
        estimatedImpact: '+8% accuracy'
      });
    }
    
    if (performanceAnalytics.readingSpeed.current < 180) {
      recommendations.push({
        type: 'speed',
        priority: 'medium',
        title: 'Increase Reading Speed',
        description: 'Practice speed reading techniques',
        actions: ['Use guided reading', 'Eliminate subvocalization', 'Expand peripheral vision'],
        estimatedImpact: '+25 WPM'
      });
    }
    
    // Based on study patterns
    if (userStats.dailyStreak < 7) {
      recommendations.push({
        type: 'consistency',
        priority: 'high',
        title: 'Build Study Consistency',
        description: 'Establish a regular study routine',
        actions: ['Set daily reminders', 'Start with shorter sessions', 'Track progress visually'],
        estimatedImpact: 'Better retention'
      });
    }
    
    // Based on vocabulary progress
    const vocabProgress = getVocabularyProgress;
    if (vocabProgress.masteredPercentage < 60) {
      recommendations.push({
        type: 'vocabulary',
        priority: 'medium',
        title: 'Expand Legal Vocabulary',
        description: 'Master more legal terminology',
        actions: ['Use spaced repetition', 'Study word etymology', 'Practice in context'],
        estimatedImpact: '+50 words mastered'
      });
    }
    
    return recommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder];
    });
  }, [performanceAnalytics, userStats, getVocabularyProgress]);

  const metrics = calculatePerformanceMetrics;
  const recommendations = generateRecommendations;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const toggleReadingFeature = useCallback((feature: string) => {
    setReadingFeatures(prev => ({
      ...prev,
      [feature]: !prev[feature as keyof typeof prev]
    }));
  }, []);


  // Helper Functions
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-700 border-green-300';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'advanced': return 'bg-red-100 text-red-700 border-red-300';
      case 'expert': return 'bg-purple-100 text-purple-700 border-purple-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'legal': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'current affairs': return 'bg-indigo-100 text-indigo-700 border-indigo-300';
      case 'economics': return 'bg-green-100 text-green-700 border-green-300';
      case 'history': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'polity': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const addToPersonalVocab = (word: string) => {
    console.log(`Adding ${word} to personal vocabulary`);
  };

  const calculateReadingSpeed = (wordCount: number, timeInSeconds: number) => {
    if (timeInSeconds === 0) return 0;
    return Math.round((wordCount / timeInSeconds) * 60);
  };

  const scoreComprehension = (answers: Record<string, number>, questions: any[]) => {
    if (!questions || questions.length === 0) {
      return { correct: 0, total: 0, percentage: 0, points: 0, totalPoints: 0, grade: 'N/A' };
    }
    
    let correct = 0;
    let totalPoints = 0;
    let earnedPoints = 0;
    
    questions.forEach(question => {
      const userAnswer = answers[question.id];
      totalPoints += question.points || 1;
      if (userAnswer === question.correct) {
        correct++;
        earnedPoints += question.points || 1;
      }
    });
    
    const percentage = Math.round((correct / questions.length) * 100);
    const grade = percentage >= 90 ? 'A+' : percentage >= 80 ? 'A' : percentage >= 70 ? 'B' : percentage >= 60 ? 'C' : 'F';
    
    return {
      correct,
      total: questions.length,
      percentage,
      points: earnedPoints,
      totalPoints,
      grade
    };
  };



  // Enhanced Home Screen
  const HomeScreen = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto p-4">
          <button
            onClick={onBack}
            className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
          
          {/* Header with Animated Cat */}
          <div className="text-center mb-8">
            <div className="mb-6">
              <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r ${catLevels[userStats.catLevel].color} shadow-lg mb-4 animate-bounce`}>
                <span className="text-4xl">{catLevels[userStats.catLevel].emoji}</span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.name || 'Scholar'}! 👋
              </h1>
              <p className="text-xl text-gray-600 mb-1">
                You're a <span className="font-semibold text-indigo-600">{catLevels[userStats.catLevel].name}</span>
              </p>
              <p className="text-sm text-gray-500">{catLevels[userStats.catLevel].description}</p>
            </div>

            {/* XP Progress Bar */}
            <div className="max-w-md mx-auto mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Level {userStats.catLevel}</span>
                <span className="text-sm text-gray-500">{userStats.xp}/{userStats.xp + userStats.xpToNext} XP</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className={`h-3 rounded-full bg-gradient-to-r ${catLevels[userStats.catLevel].color} transition-all duration-1000 relative`}
                  style={{ width: `${(userStats.xp / (userStats.xp + userStats.xpToNext)) * 100}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {userStats.xpToNext} XP to {catLevels[Math.min(userStats.catLevel + 1, 5)].name}
              </p>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Weekly Goals Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-indigo-500" />
                Weekly Goals
              </h3>
              
              <div className="space-y-4">
                {/* Passages Goal */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Reading Passages</span>
                    <span className="text-sm text-gray-500">
                      {userStats.weeklyGoal.passages.current}/{userStats.weeklyGoal.passages.target}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${(userStats.weeklyGoal.passages.current / userStats.weeklyGoal.passages.target) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Vocabulary Goal */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">New Words</span>
                    <span className="text-sm text-gray-500">
                      {userStats.weeklyGoal.words.current}/{userStats.weeklyGoal.words.target}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${(userStats.weeklyGoal.words.current / userStats.weeklyGoal.words.target) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Accuracy Goal */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Avg Accuracy</span>
                    <span className="text-sm text-gray-500">
                      {userStats.weeklyGoal.accuracy.current}%/{userStats.weeklyGoal.accuracy.target}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${(userStats.weeklyGoal.accuracy.current / userStats.weeklyGoal.accuracy.target) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-indigo-50 rounded-lg">
                <p className="text-sm text-indigo-700 font-medium">
                  🎯 {userStats.weeklyGoal.completed}/{userStats.weeklyGoal.total} goals completed this week!
                </p>
              </div>
            </div>

            {/* Reading Speed & Accuracy */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                Performance
              </h3>
              
              <div className="space-y-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">{userStats.readingSpeed}</div>
                  <div className="text-sm text-gray-600">Words per minute</div>
                  <div className="text-xs text-green-500 mt-1">+12 WPM this month</div>
                </div>
                
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">{userStats.comprehensionScore}%</div>
                  <div className="text-sm text-gray-600">Comprehension accuracy</div>
                  <div className="text-xs text-blue-500 mt-1">+6% improvement</div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-xl font-bold text-purple-600">{userStats.dailyStreak}</div>
                    <div className="text-xs text-purple-500">Day Streak</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-xl font-bold text-orange-600">{Math.round(userStats.totalTimeSpent / 60)}h</div>
                    <div className="text-xs text-orange-500">Total Time</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity Feed */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Activity className="w-5 h-5 mr-2 text-indigo-500" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {userStats.dailyStats.slice(0, 3).map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        activity.passages > 0 ? 'bg-green-100' : 'bg-gray-200'
                      }`}>
                        {activity.passages > 0 ? (
                          <BookOpen className="w-5 h-5 text-green-600" />
                        ) : (
                          <Clock className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {activity.passages > 0 ? `Read ${activity.passages} passages` : 'No reading activity'}
                        </p>
                        <p className="text-sm text-gray-500">{activity.day}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {activity.passages > 0 && (
                        <>
                          <p className={`text-sm font-medium ${getScoreColor(activity.accuracy)}`}>
                            {activity.accuracy}% accuracy
                          </p>
                          <p className="text-xs text-gray-500">{activity.timeSpent}min</p>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Learning Path Progress */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-purple-500" />
              Learning Path Progress
            </h3>
            
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Current Phase: Foundation Building
                </span>
                <span className="text-sm text-gray-500">Week 3 of 12</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 h-3 rounded-full transition-all duration-1000"
                  style={{ width: '25%' }}
                >
                  <div className="h-full bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">8/12</div>
                <div className="text-xs text-purple-500">Weeks Remaining</div>
              </div>
              <div className="text-center p-3 bg-indigo-50 rounded-lg">
                <div className="text-2xl font-bold text-indigo-600">76%</div>
                <div className="text-xs text-indigo-500">Path Completion</div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg">
              <h4 className="font-medium text-gray-800 mb-2">This Week's Focus</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Complete 5 reading passages ✓
                </li>
                <li className="flex items-center">
                  <Clock className="w-4 h-4 text-orange-500 mr-2" />
                  Learn 15 new vocabulary words (12/15)
                </li>
                <li className="flex items-center">
                  <Target className="w-4 h-4 text-blue-500 mr-2" />
                  Maintain 80%+ accuracy in comprehension
                </li>
              </ul>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{userStats.passagesRead}</div>
              <div className="text-sm text-gray-500">Total Passages</div>
              <div className="mt-2 text-xs text-green-600">
                +{userStats.dailyStats.reduce((sum, day) => sum + day.passages, 0)} this week
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Brain className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{userStats.wordsLearned}</div>
              <div className="text-sm text-gray-500">Words Learned</div>
              <div className="mt-2 text-xs text-blue-600">
                {getVocabularyProgress.masteredPercentage}% mastered
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {achievements.filter(a => a.unlocked).length}
              </div>
              <div className="text-sm text-gray-500">Achievements</div>
              <div className="mt-2 text-xs text-orange-600">
                {achievements.filter(a => !a.unlocked && a.progress).length} in progress
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {Math.round(userStats.totalTimeSpent / 60)}h
              </div>
              <div className="text-sm text-gray-500">Study Time</div>
              <div className="mt-2 text-xs text-indigo-600">
                {Math.round(userStats.totalTimeSpent / userStats.passagesRead)}min avg
              </div>
            </div>
          </div>

          {/* Motivational Quote */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white text-center mb-6">
            <div className="text-2xl mb-2">💡</div>
            <blockquote className="text-lg font-medium mb-2">
              "Success is the sum of small efforts repeated day in and day out."
            </blockquote>
            <cite className="text-sm opacity-90">- Robert Collier</cite>
            <div className="mt-4 text-sm opacity-90">
              You're on day {userStats.dailyStreak} of your learning journey. Keep going! 🚀
            </div>
          </div>

          {/* Today's Recommendations */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Lightbulb className="w-5 h-5 mr-2 text-yellow-500" />
              Today's Recommendations
            </h3>
            
            <div className="space-y-4">
              {/* Reading Recommendation */}
              <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-blue-900">Morning Reading Session</h4>
                  <p className="text-sm text-blue-800 mb-2">
                    Based on your peak performance time, tackle a challenging passage now.
                  </p>
                  <button
                    onClick={() => setCurrentScreen('passages')}
                    className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition-colors"
                  >
                    Start Reading →
                  </button>
                </div>
              </div>
              
              {/* Vocabulary Recommendation */}
              <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-green-900">Vocabulary Review</h4>
                  <p className="text-sm text-green-800 mb-2">
                    5 words are due for review using spaced repetition.
                  </p>
                  <button
                    onClick={() => setCurrentScreen('flashcards')}
                    className="text-sm bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
                  >
                    Review Words →
                  </button>
                </div>
              </div>
              
              {/* Challenge Recommendation */}
              <div className="flex items-start space-x-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-purple-900">Challenge Progress</h4>
                  <p className="text-sm text-purple-800 mb-2">
                    You're 3 passages away from completing "Speed Reading Sprint"!
                  </p>
                  <button
                    onClick={() => setCurrentScreen('challenges')}
                    className="text-sm bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 transition-colors"
                  >
                    View Challenges →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* AI Recommendations Section */}
          {recommendations.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-purple-500" />
                AI Recommendations
              </h3>
              <div className="space-y-3">
                {recommendations.map((rec, index) => (
                  <div key={index} className={`p-4 rounded-lg border-l-4 ${
                    rec.priority === 'high' ? 'bg-red-50 border-red-400' :
                    rec.priority === 'medium' ? 'bg-yellow-50 border-yellow-400' :
                    'bg-blue-50 border-blue-400'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{rec.title}</h4>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        rec.priority === 'high' ? 'bg-red-100 text-red-700' :
                        rec.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {rec.priority} priority
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-green-600">{rec.estimatedImpact}</span>
                      <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                        Start Now →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions Section */}
          <div className="space-y-3 mb-6">
            <button 
              onClick={() => setCurrentScreen('passages')}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl py-4 px-6 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-pulse"></div>
              <div className="flex items-center justify-center space-x-2 relative z-10">
                <Play className="w-5 h-5" />
                <span>Start AI-Powered Reading</span>
                <Zap className="w-5 h-5 animate-pulse" />
              </div>
            </button>

            <button 
              onClick={() => setCurrentScreen('gk-quiz')}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl py-4 px-6 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-pulse"></div>
              <div className="flex items-center justify-center space-x-2 relative z-10">
                <Globe className="w-5 h-5" />
                <span>Daily GK Challenge</span>
                <Trophy className="w-5 h-5 animate-bounce" />
              </div>
            </button>
            
            {/* Feature Grid */}
            <div className="grid grid-cols-5 gap-3">
              <button 
                onClick={() => setCurrentScreen('vocabulary')}
                className="bg-white text-gray-700 rounded-xl py-4 px-3 font-medium border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-200 transform hover:scale-105"
              >
                <div className="flex flex-col items-center space-y-1">
                  <Brain className="w-6 h-6 text-purple-500" />
                  <span className="text-xs">Vocabulary</span>
                </div>
              </button>
              
              <button 
                onClick={() => setCurrentScreen('flashcards')}
                className="bg-white text-gray-700 rounded-xl py-4 px-3 font-medium border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-200 transform hover:scale-105"
              >
                <div className="flex flex-col items-center space-y-1">
                  <MessageSquare className="w-6 h-6 text-green-500" />
                  <span className="text-xs">Flashcards</span>
                  {flashcardStats.dailyGoal.current > 0 && (
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  )}
                </div>
              </button>
              
              <button 
                onClick={() => setCurrentScreen('challenges')}
                className="bg-white text-gray-700 rounded-xl py-4 px-3 font-medium border border-gray-200 hover:border-yellow-300 hover:shadow-md transition-all duration-200 transform hover:scale-105"
              >
                <div className="flex flex-col items-center space-y-1">
                  <Trophy className="w-6 h-6 text-yellow-500" />
                  <span className="text-xs">Challenges</span>
                  {challengesDatabase.filter(c => c.progress < c.total).length > 0 && (
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-1 rounded">
                      {challengesDatabase.filter(c => c.progress < c.total).length}
                    </span>
                  )}
                </div>
              </button>
              
              <button 
                onClick={() => setCurrentScreen('analytics')}
                className="bg-white text-gray-700 rounded-xl py-4 px-3 font-medium border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 transform hover:scale-105"
              >
                <div className="flex flex-col items-center space-y-1">
                  <BarChart3 className="w-6 h-6 text-blue-500" />
                  <span className="text-xs">Analytics</span>
                </div>
              </button>
              
              <button 
                onClick={() => setCurrentScreen('achievements')}
                className="bg-white text-gray-700 rounded-xl py-4 px-3 font-medium border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all duration-200 transform hover:scale-105"
              >
                <div className="flex flex-col items-center space-y-1">
                  <Award className="w-6 h-6 text-indigo-500" />
                  <span className="text-xs">Awards</span>
                  {achievements.filter(a => !a.unlocked).length > 0 && (
                    <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Recent Achievements with Enhanced Display */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Award className="w-5 h-5 mr-2 text-yellow-500" />
              Recent Achievements
            </h3>
            <div className="space-y-3">
              {achievements.filter(a => a.unlocked).slice(0, 3).map((achievement, index) => (
                <div key={achievement.id} className="flex items-center space-x-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                  <div className="text-2xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                    <p className="text-xs text-gray-500">{achievement.date}</p>
                  </div>
                  <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
                </div>
              ))}
            </div>
            
            {/* Progress towards next achievement */}
            {achievements.find(a => !a.unlocked && a.progress) && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Next Achievement</h4>
                {(() => {
                  const nextAchievement = achievements.find(a => !a.unlocked && a.progress);
                  return (
                    <div className="flex items-center space-x-3">
                      <div className="text-lg opacity-60">{nextAchievement?.icon}</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">{nextAchievement?.title}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${((nextAchievement?.progress || 0) / (nextAchievement?.target || 1)) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500">
                            {nextAchievement?.progress || 0}/{nextAchievement?.target || 0}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>

          {/* Study Streak Visualization */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Flame className="w-5 h-5 mr-2 text-orange-500" />
              Study Streak
            </h3>
            
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-3xl font-bold text-orange-600">{userStats.dailyStreak}</p>
                <p className="text-sm text-gray-500">days in a row</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Personal best</p>
                <p className="text-lg font-semibold text-gray-900">15 days</p>
              </div>
            </div>
            
            {/* Weekly streak visualization */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {userStats.dailyStats.map((day, index) => (
                <div key={day.day} className="text-center">
                  <p className="text-xs text-gray-500 mb-1">{day.day}</p>
                  <div 
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold ${
                      day.passages > 0 
                        ? 'bg-orange-500 text-white' 
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {day.passages}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-600">
                {userStats.dailyStreak >= 7 ? 'Amazing consistency! ' : 'Keep building your streak! '}
                Study today to continue your momentum.
              </p>
            </div>
          </div>

          {/* Performance Insights */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
              Performance Insights
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">+{metrics.improvementRate.weekly}%</div>
                <div className="text-sm text-gray-600">Weekly Improvement</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{metrics.efficiency.timeVsAccuracy}%</div>
                <div className="text-sm text-gray-600">Efficiency Score</div>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Your Peak Performance Times</h4>
              <div className="flex space-x-4">
                {performanceAnalytics.timeManagement.peakHours.map((time, index) => (
                  <span key={index} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                    {time}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="text-center text-sm text-gray-500 py-4">
            <p>💡 Tip: Consistent daily practice is the key to CLAT success!</p>
            <p className="mt-1">
              Last saved: {new Date().toLocaleTimeString()} • 
              Next level in {userStats.xpToNext} XP
            </p>
          </div>
        </div>
      </div>
    );
  };

  // Enhanced Flashcards Screen Component - Part 7
  const FlashcardsScreen = () => {
    const availableCards = getFlashcardsForReview;
    
    if (!availableCards || availableCards.length === 0) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <div className="text-center">
            <Brain className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-700 mb-2">No flashcards available</h2>
            <p className="text-gray-500">Add some vocabulary words to get started!</p>
            <button
              onClick={() => setCurrentScreen('home')}
              className="mt-4 bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      );
    }

    const currentCard = availableCards[currentFlashcard];

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Enhanced Header */}
        <div className="bg-white shadow-sm border-b border-gray-100 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setCurrentScreen('home')}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-indigo-500" />
                  Smart Flashcards
                </h2>
                <p className="text-sm text-gray-500">Spaced Repetition Learning System</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Card {currentFlashcard + 1} of {availableCards.length}
              </div>
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-purple-500" />
                <span className="text-sm font-medium text-purple-600">AI Enhanced</span>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentFlashcard + 1) / availableCards.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Main Flashcard Area */}
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white rounded-2xl shadow-xl min-h-[500px] relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}></div>
            </div>
            
            <div className="relative z-10 p-8 h-full">
              {!showAnswer ? (
                // Front of card - Just the word with minimal styling
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="mb-8">
                    <div className="flex items-center justify-center space-x-2 mb-6">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(currentCard.difficulty)}`}>
                        {currentCard.difficulty}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(currentCard.category)}`}>
                        {currentCard.category}
                      </span>
                    </div>
                  </div>
                  
                  <h2 className="text-6xl font-bold text-gray-900 mb-8 tracking-wide">
                    {currentCard.word}
                  </h2>
                  
                  <p className="text-lg text-gray-600 mb-12 italic max-w-2xl">
                    Do you know the meaning of this word?
                  </p>
                  
                  <button
                    onClick={() => setShowAnswer(true)}
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex items-center space-x-2"
                  >
                    <Eye className="w-5 h-5" />
                    <span>Show Answer</span>
                  </button>
                  
                  <div className="mt-8 text-center">
                    <p className="text-sm text-gray-500">
                      CLAT Relevance: <span className="font-semibold">{currentCard.clatRelevance}/10</span>
                    </p>
                  </div>
                </div>
              ) : (
                // Back of card - Comprehensive information
                <div className="h-full relative z-10">
                  <div className="mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(currentCard.difficulty)}`}>
                          {currentCard.difficulty}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(currentCard.category)}`}>
                          {currentCard.category}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => {/* Play pronunciation */}}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                          title="Play pronunciation"
                        >
                          <Volume2 className="w-4 h-4 text-gray-400" />
                        </button>
                        <button 
                          onClick={() => addToPersonalVocab(currentCard.word)}
                          className="p-1 hover:bg-gray-100 rounded transition-colors"
                          title="Add to personal vocabulary"
                        >
                          <BookmarkPlus className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">
                    {currentCard.word}
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                        <Brain className="w-4 h-4 mr-2 text-blue-500" />
                        Definition
                      </h4>
                      <p className="text-gray-800 leading-relaxed bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                        {currentCard.definition}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                        <FileText className="w-4 h-4 mr-2 text-green-500" />
                        Context & Usage
                      </h4>
                      <p className="text-gray-600 italic bg-gray-50 p-3 rounded-lg">
                        "{currentCard.context}"
                      </p>
                      <p className="text-gray-700 mt-2 text-sm">
                        <strong>Usage:</strong> {currentCard.usage}
                      </p>
                    </div>
                    
                    {currentCard.mnemonics && (
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                          <Lightbulb className="w-4 h-4 mr-2 text-yellow-500" />
                          Memory Aid
                        </h4>
                        <p className="text-gray-700 text-sm bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                          {currentCard.mnemonics}
                        </p>
                      </div>
                    )}
                    
                    {/* CLAT Relevance Indicator */}
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2 flex items-center">
                        <Star className="w-4 h-4 mr-2 text-orange-500" />
                        CLAT Relevance
                      </h4>
                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-4 h-4 ${
                                i < (currentCard.clatRelevance / 2) ? 'text-orange-400 fill-current' : 'text-gray-300'
                              }`} 
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {currentCard.clatRelevance}/10 - 
                          {currentCard.clatRelevance >= 8 ? ' Very High' :
                           currentCard.clatRelevance >= 6 ? ' High' :
                           currentCard.clatRelevance >= 4 ? ' Medium' : ' Low'} importance
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Response buttons */}
                  <div className="mt-8 space-y-4">
                    <p className="text-sm font-medium text-gray-700 text-center">
                      How well did you know this word?
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      <button
                        onClick={() => handleFlashcardResponse('hard')}
                        className="bg-red-100 hover:bg-red-200 text-red-700 py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex flex-col items-center space-y-1 border border-red-200"
                      >
                        <span className="text-lg">😵</span>
                        <span className="text-sm">Hard</span>
                        <span className="text-xs opacity-75">+5 XP</span>
                      </button>
                      <button
                        onClick={() => handleFlashcardResponse('medium')}
                        className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex flex-col items-center space-y-1 border border-yellow-200"
                      >
                        <span className="text-lg">🤔</span>
                        <span className="text-sm">Medium</span>
                        <span className="text-xs opacity-75">+10 XP</span>
                      </button>
                      <button
                        onClick={() => handleFlashcardResponse('easy')}
                        className="bg-green-100 hover:bg-green-200 text-green-700 py-3 px-4 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex flex-col items-center space-y-1 border border-green-200"
                      >
                        <span className="text-lg">😊</span>
                        <span className="text-sm">Easy</span>
                        <span className="text-xs opacity-75">+15 XP</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => setCurrentFlashcard(prev => Math.max(0, prev - 1))}
              disabled={currentFlashcard === 0}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowAnswer(false)}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                title="Reset card"
              >
                <RotateCcw className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={() => addToPersonalVocab(currentCard.word)}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                title="Bookmark word"
              >
                <Bookmark className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            
            <button
              onClick={() => setCurrentFlashcard(prev => (prev + 1) % availableCards.length)}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Session Stats */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="bg-red-50 rounded-lg p-3 text-center border border-red-200">
              <p className="text-2xl font-bold text-red-600">{flashcardStats.hard}</p>
              <p className="text-xs text-red-500">Hard</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-3 text-center border border-yellow-200">
              <p className="text-2xl font-bold text-yellow-600">{flashcardStats.medium}</p>
              <p className="text-xs text-yellow-500">Medium</p>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-center border border-green-200">
              <p className="text-2xl font-bold text-green-600">{flashcardStats.easy}</p>
              <p className="text-xs text-green-500">Easy</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Enhanced Passages Screen Component - Part 8
  const PassagesScreen = () => {
    const [sortBy, setSortBy] = useState('difficulty');
    const [filterBy, setFilterBy] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    
    const filteredPassages = passages.filter(passage => {
      const matchesSearch = passage.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           passage.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesFilter = filterBy === 'all' || passage.difficulty.toLowerCase() === filterBy;
      return matchesSearch && matchesFilter;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'difficulty':
          const difficultyOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3, 'Expert': 4 };
          return difficultyOrder[a.difficulty as keyof typeof difficultyOrder] - difficultyOrder[b.difficulty as keyof typeof difficultyOrder];
        case 'wordCount':
          return a.wordCount - b.wordCount;
        case 'aiComplexity':
          return b.aiComplexity - a.aiComplexity;
        default:
          return 0;
      }
    });

    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        {/* Enhanced Header */}
        <div className="bg-white shadow-sm border-b border-gray-100 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setCurrentScreen('home')}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-indigo-500" />
                  AI-Powered Reading
                </h2>
                <p className="text-sm text-gray-500">CLAT Reading Comprehension Practice</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-purple-500 animate-pulse" />
              <span className="text-sm font-medium text-purple-600">AI Enhanced</span>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-gray-50 border-b border-gray-100 px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search passages, topics, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="difficulty">Sort by Difficulty</option>
              <option value="wordCount">Sort by Length</option>
              <option value="aiComplexity">Sort by AI Complexity</option>
            </select>
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        {/* Reading Preferences Panel */}
        <div className="px-6 py-4 bg-indigo-50 border-b border-indigo-100">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-indigo-900">Reading Preferences</h3>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-indigo-700">Font Size:</span>
                <button
                  onClick={() => setReadingPreferences(prev => ({ ...prev, fontSize: Math.max(14, prev.fontSize - 2) }))}
                  className="p-1 hover:bg-indigo-200 rounded"
                >
                  <ArrowDown className="w-3 h-3 text-indigo-600" />
                </button>
                <span className="text-sm font-medium text-indigo-800 min-w-[2rem] text-center">
                  {readingPreferences.fontSize}px
                </span>
                <button
                  onClick={() => setReadingPreferences(prev => ({ ...prev, fontSize: Math.min(24, prev.fontSize + 2) }))}
                  className="p-1 hover:bg-indigo-200 rounded"
                >
                  <ArrowUp className="w-3 h-3 text-indigo-600" />
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleReadingFeature('focusMode')}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    readingFeatures.focusMode 
                      ? 'bg-indigo-500 text-white' 
                      : 'bg-white text-indigo-600 border border-indigo-300'
                  }`}
                >
                  Focus Mode
                </button>
                <button
                  onClick={() => toggleReadingFeature('vocabularyHelp')}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                    readingFeatures.vocabularyHelp 
                      ? 'bg-indigo-500 text-white' 
                      : 'bg-white text-indigo-600 border border-indigo-300'
                  }`}
                >
                  Vocab Help
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Passages List */}
        <div className="px-6 py-6">
          <div className="space-y-6">
            {filteredPassages.map((passage) => (
              <div key={passage.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{passage.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{passage.source}</p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {passage.tags.map((tag, index) => (
                          <span 
                            key={index} 
                            className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full border border-indigo-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      {/* Metadata */}
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className={`px-2 py-1 rounded text-xs font-medium border ${getDifficultyColor(passage.difficulty)}`}>
                          {passage.difficulty}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {passage.estimatedTime}
                        </span>
                        <span className="flex items-center">
                          <FileText className="w-3 h-3 mr-1" />
                          {passage.wordCount} words
                        </span>
                        <span className="flex items-center">
                          <Brain className="w-3 h-3 mr-1" />
                          AI Score: {passage.aiComplexity}/10
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end space-y-2">
                      <button
                        onClick={() => {
                          setSelectedPassage(passage);
                          setCurrentScreen('reader');
                        }}
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                      >
                        Start Reading
                      </button>
                      
                      {/* Quick stats */}
                      <div className="text-right text-xs text-gray-500">
                        <div>{passage.aiQuestions?.length || 0} AI Questions</div>
                        <div>{passage.vocabulary?.length || 0} Key Terms</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Preview */}
                  <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-indigo-400">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {passage.text.substring(0, 300)}...
                    </p>
                  </div>
                  
                  {/* Reading Tips */}
                  {passage.readingTips && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="text-sm font-semibold text-blue-900 mb-2 flex items-center">
                        <Lightbulb className="w-4 h-4 mr-1" />
                        Reading Tips
                      </h4>
                      <ul className="text-xs text-blue-800 space-y-1">
                        {passage.readingTips.map((tip, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-1 h-1 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {filteredPassages.length === 0 && (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">No passages found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Enhanced Reader Screen Component - Part 9
  const ReaderScreen = () => {
    const [readingProgress, setReadingProgress] = useState(0);
    const [showQuestions, setShowQuestions] = useState(false);
    const [questionAnswers, setQuestionAnswers] = useState<Record<string, number>>({});
    
    if (!selectedPassage) return null;

    // Handle word clicking for vocabulary help
    const handleWordDoubleClick = (event: React.MouseEvent) => {
      if (!readingFeatures.vocabularyHelp) return;
      
      const selection = window.getSelection();
      const selectedText = selection?.toString().trim();
      
      if (selectedText && selectedText.length > 2) {
        const word = selectedText.toLowerCase().replace(/[^\w]/g, '');
        const contextSentence = selection?.anchorNode?.textContent || '';
        
        // Check if word exists in vocabulary database or passage vocabulary
        const vocabItem = vocabularyDatabase.find((v: any) => v.word === word) ||
                           selectedPassage.vocabulary?.find((v: any) => v.word === word);
        
        if (vocabItem) {
          setSelectedWord({ ...vocabItem, originalWord: selectedText, context: contextSentence });
        } else {
          setSelectedWord({
            word: word,
            originalWord: selectedText,
            definition: `Double-click on words to get definitions and explanations.`,
            context: contextSentence,
            needsAI: true
          });
        }
      }
    };

    // Calculate reading progress based on scroll position
    React.useEffect(() => {
      const handleScroll = () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100));
        setReadingProgress(progress);
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
      <div className="min-h-screen bg-white">
        {/* Enhanced Header with Reading Controls */}
        <div className="bg-white shadow-sm border-b border-gray-100 px-6 py-4 sticky top-0 z-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => {
                  setCurrentScreen('passages');
                  setIsReading(false);
                  setReadingTimer(0);
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">{selectedPassage.title}</h2>
                <p className="text-sm text-gray-500">{selectedPassage.type} • {selectedPassage.difficulty}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {/* Reading Timer */}
              <div className="flex items-center space-x-2 bg-blue-50 px-3 py-1 rounded-full">
                <Timer className="w-4 h-4 text-blue-500" />
                <span className="text-blue-700 font-medium text-sm">{formatTime(readingTimer)}</span>
              </div>
              
              {/* Reading Speed Indicator */}
              <div className="hidden sm:flex items-center space-x-2 bg-green-50 px-3 py-1 rounded-full">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-green-700 font-medium text-sm">
                  {calculateReadingSpeed(selectedPassage.wordCount, readingTimer)} WPM
                </span>
              </div>
              
              {/* Reading Controls */}
              <button
                onClick={() => setIsReading(!isReading)}
                className={`p-2 rounded-full transition-colors ${
                  isReading ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-green-100 text-green-600 hover:bg-green-200'
                }`}
              >
                {isReading ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              
              {/* Settings */}
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
          
          {/* Reading Progress Bar */}
          <div className="mt-3 w-full bg-gray-200 rounded-full h-1">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-1 rounded-full transition-all duration-300"
              style={{ width: `${readingProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Reading Features Toolbar */}
        <div className="bg-gray-50 border-b border-gray-100 px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => toggleReadingFeature('highlightMode')}
                className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm transition-colors ${
                  readingFeatures.highlightMode 
                    ? 'bg-yellow-500 text-white' 
                    : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Highlighter className="w-4 h-4" />
                <span>Highlight</span>
              </button>
              
              <button
                onClick={() => toggleReadingFeature('vocabularyHelp')}
                className={`flex items-center space-x-2 px-3 py-1 rounded-lg text-sm transition-colors ${
                  readingFeatures.vocabularyHelp 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                <Brain className="w-4 h-4" />
                <span>Vocab Help</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600">
                {Math.round((readingTimer / 60) * userStats.readingSpeed)} words read
              </span>
              <button
                onClick={() => setShowQuestions(!showQuestions)}
                className="bg-indigo-500 text-white px-4 py-1 rounded-lg text-sm font-medium hover:bg-indigo-600 transition-colors"
              >
                {showQuestions ? 'Hide Questions' : 'Show Questions'}
              </button>
            </div>
          </div>
        </div>

        {/* Main Reading Area */}
        <div className="px-6 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Text Column */}
              <div className={`${showQuestions ? 'lg:col-span-2' : 'lg:col-span-3'} transition-all duration-300`}>
                <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
                  {/* Passage Metadata */}
                  <div className="mb-8 pb-6 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(selectedPassage.difficulty)}`}>
                          {selectedPassage.difficulty}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(selectedPassage.type)}`}>
                          {selectedPassage.type}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className="flex items-center">
                          <FileText className="w-4 h-4 mr-1" />
                          {selectedPassage.wordCount} words
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {selectedPassage.estimatedTime}
                        </span>
                        <span className="flex items-center">
                          <Brain className="w-4 h-4 mr-1" />
                          AI: {selectedPassage.aiComplexity}/10
                        </span>
                      </div>
                    </div>
                    
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">{selectedPassage.title}</h1>
                    <p className="text-gray-600">{selectedPassage.source}</p>
                  </div>
                  
                  {/* Main Text Content */}
                  <div 
                    className="prose prose-lg max-w-none leading-relaxed"
                    style={{ 
                      fontSize: `${readingPreferences.fontSize}px`,
                      lineHeight: readingPreferences.lineHeight,
                      fontFamily: readingPreferences.fontFamily === 'serif' ? 'Georgia, serif' : 'system-ui, sans-serif'
                    }}
                    onDoubleClick={handleWordDoubleClick}
                  >
                    {selectedPassage.text.split('\n\n').map((paragraph: string, index: number) => (
                      <p 
                        key={index} 
                        className={`text-gray-800 mb-6 ${readingFeatures.focusMode ? 'focus:bg-yellow-50 focus:p-2 focus:rounded' : ''}`}
                        style={{ userSelect: readingFeatures.vocabularyHelp ? 'text' : 'auto' }}
                      >
                        {paragraph.split(' ').map((word: string, wordIndex: number) => {
                          const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
                          const isVocabWord = selectedPassage.vocabulary?.some((v: any) => v.word === cleanWord) ||
                                            vocabularyDatabase.some((v: any) => v.word === cleanWord);
                          
                          return (
                            <span
                              key={wordIndex}
                              className={`${
                                readingFeatures.vocabularyHelp && isVocabWord 
                                  ? 'cursor-help border-b border-dotted border-purple-400 hover:bg-purple-50' 
                                  : ''
                              }`}
                              onClick={() => {
                                if (readingFeatures.vocabularyHelp && isVocabWord) {
                                  const vocabItem = selectedPassage.vocabulary?.find((v: any) => v.word === cleanWord) ||
                                                   vocabularyDatabase.find((v: any) => v.word === cleanWord);
                                  if (vocabItem) {
                                    setSelectedWord({ ...vocabItem, originalWord: word, context: paragraph });
                                  }
                                }
                              }}
                            >
                              {word}{wordIndex < paragraph.split(' ').length - 1 ? ' ' : ''}
                            </span>
                          );
                        })}
                      </p>
                    ))}
                  </div>
                  
                  {/* Key Vocabulary Section */}
                  {selectedPassage.vocabulary && selectedPassage.vocabulary.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                        <Brain className="w-5 h-5 mr-2 text-purple-500" />
                        Key Vocabulary
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedPassage.vocabulary.map((vocabItem: any, index: number) => (
                          <div key={index} className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                            <h4 className="font-semibold text-purple-900 mb-2">{vocabItem.word}</h4>
                            <p className="text-purple-800 text-sm mb-2">{vocabItem.definition}</p>
                            <p className="text-purple-600 text-xs italic">"{vocabItem.context}"</p>
                            <button
                              onClick={() => addToPersonalVocab(vocabItem.word)}
                              className="mt-2 text-xs bg-purple-500 text-white px-2 py-1 rounded hover:bg-purple-600 transition-colors"
                            >
                              Add to My Vocabulary
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Reading Stats */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">
                          {calculateReadingSpeed(selectedPassage.wordCount, readingTimer)}
                        </div>
                        <div className="text-sm text-blue-500">WPM</div>
                      </div>
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">
                          {Math.round(readingProgress)}%
                        </div>
                        <div className="text-sm text-green-500">Complete</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600">
                          {formatTime(readingTimer)}
                        </div>
                        <div className="text-sm text-purple-500">Time Spent</div>
                      </div>
                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                        <div className="text-2xl font-bold text-orange-600">
                          {Math.round((readingTimer / 60) * userStats.readingSpeed)}
                        </div>
                        <div className="text-sm text-orange-500">Words Read</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Questions Sidebar */}
              {showQuestions && (
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm sticky top-32">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Brain className="w-5 h-5 mr-2 text-purple-500" />
                      AI-Generated Questions
                    </h3>
                    
                    {selectedPassage.aiQuestions && selectedPassage.aiQuestions.length > 0 ? (
                      <div className="space-y-6">
                        {selectedPassage.aiQuestions.map((question: any, index: number) => (
                          <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <span className="text-sm font-medium text-gray-500">Question {index + 1}</span>
                              <div className="flex items-center space-x-2">
                                <span className={`px-2 py-1 text-xs rounded ${getDifficultyColor(question.difficulty)}`}>
                                  {question.difficulty}
                                </span>
                                <span className="text-xs text-purple-600 font-medium">
                                  +{question.points} pts
                                </span>
                              </div>
                            </div>
                            
                            <h4 className="font-medium text-gray-900 mb-3 leading-relaxed">
                              {question.question}
                            </h4>
                            
                            {question.options && (
                              <div className="space-y-2 mb-4">
                                {question.options.map((option: string, optIndex: number) => {
                                  const isSelected = questionAnswers[question.id] === optIndex;
                                  const isCorrect = optIndex === question.correct;
                                  const showResult = questionAnswers[question.id] !== undefined;
                                  
                                  return (
                                    <label 
                                      key={optIndex} 
                                      className={`flex items-start space-x-3 cursor-pointer p-3 rounded-lg transition-colors ${
                                        showResult 
                                          ? isCorrect 
                                            ? 'bg-green-50 border border-green-200' 
                                            : isSelected 
                                              ? 'bg-red-50 border border-red-200' 
                                              : 'bg-gray-50'
                                          : 'hover:bg-gray-50 border border-gray-200'
                                      }`}
                                    >
                                      <input 
                                        type="radio" 
                                        name={`question-${question.id}`}
                                        checked={isSelected}
                                        onChange={() => {
                                          if (!showResult) {
                                            setQuestionAnswers(prev => ({
                                              ...prev,
                                              [question.id]: optIndex
                                            }));
                                          }
                                        }}
                                        className="mt-1 w-4 h-4 text-indigo-600"
                                        disabled={showResult}
                                      />
                                      <span className={`text-sm flex-1 ${
                                        showResult && isCorrect ? 'text-green-800 font-medium' :
                                        showResult && isSelected && !isCorrect ? 'text-red-800' :
                                        'text-gray-700'
                                      }`}>
                                        {option}
                                      </span>
                                      {showResult && isCorrect && (
                                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                      )}
                                      {showResult && isSelected && !isCorrect && (
                                        <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                                      )}
                                    </label>
                                  );
                                })}
                              </div>
                            )}
                            
                            {questionAnswers[question.id] !== undefined && question.explanation && (
                              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                <h5 className="text-sm font-semibold text-blue-900 mb-1">Explanation</h5>
                                <p className="text-sm text-blue-800 leading-relaxed">{question.explanation}</p>
                              </div>
                            )}
                          </div>
                        ))}
                        
                        {/* Score Summary */}
                        {Object.keys(questionAnswers).length > 0 && (
                          <div className="mt-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
                            <h4 className="font-semibold text-indigo-900 mb-2">Your Performance</h4>
                            {(() => {
                              const score = scoreComprehension(questionAnswers, selectedPassage.aiQuestions);
                              return (
                                <div className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm text-indigo-700">Correct Answers:</span>
                                    <span className="font-medium text-indigo-900">{score.correct}/{score.total}</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm text-indigo-700">Accuracy:</span>
                                    <span className={`font-medium ${getScoreColor(score.percentage)}`}>
                                      {score.percentage}%
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-sm text-indigo-700">Grade:</span>
                                    <span className="font-medium text-indigo-900">{score.grade}</span>
                                  </div>
                                  <div className="w-full bg-indigo-200 rounded-full h-2 mt-3">
                                    <div 
                                      className={`h-2 rounded-full transition-all duration-500 ${
                                        score.percentage >= 80 ? 'bg-green-500' : 
                                        score.percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                      }`}
                                      style={{ width: `${score.percentage}%` }}
                                    ></div>
                                  </div>
                                </div>
                              );
                            })()}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Brain className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">AI questions are being generated...</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Vocabulary Popup */}
        {selectedWord && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">{selectedWord.word}</h3>
                <button
                  onClick={() => setSelectedWord(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-gray-800 leading-relaxed">{selectedWord.definition}</p>
                </div>
                
                {selectedWord.context && (
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Context:</h4>
                    <p className="text-gray-600 italic text-sm">"{selectedWord.context}"</p>
                  </div>
                )}
                
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={() => {
                      addToPersonalVocab(selectedWord.word);
                      setSelectedWord(null);
                    }}
                    className="flex-1 bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    Add to Vocabulary
                  </button>
                  <button
                    onClick={() => setSelectedWord(null)}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentScreen === 'home' && <HomeScreen />}
      {currentScreen === 'flashcards' && <FlashcardsScreen />}
      {currentScreen === 'passages' && <PassagesScreen />}
      {currentScreen === 'reader' && <ReaderScreen />}
      
      {!['home', 'flashcards', 'passages', 'reader'].includes(currentScreen) && (
        <div className="max-w-7xl mx-auto p-4">
          <button
            onClick={onBack}
            className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ChevronLeft className="w-5 h-5" />
            Back to Dashboard
          </button>
          
          <div className="text-center p-8">
            <h1 className="text-3xl font-bold mb-4">CLAT Reading Mastery Enhanced</h1>
            <p className="text-gray-600">Screen: {currentScreen}</p>
            <p className="text-sm text-gray-500 mt-4">Parts 7-9 loaded - {currentScreen} screen coming soon...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CLATReadingMasteryEnhanced;
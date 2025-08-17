import React, { useState, useEffect } from 'react';
import {
  Target, TrendingUp, Clock, Brain, AlertCircle, CheckCircle,
  XCircle, BarChart3, PieChart, Activity, Timer, Award,
  Zap, Users, Trophy, ChevronRight, ChevronLeft, Settings,
  BookOpen, Lightbulb, TrendingDown, RefreshCw, Save,
  FileText, Download, Share2, Calendar, Flag, Bookmark,
  MessageSquare, Heart, ThumbsUp, ThumbsDown, Eye,
  EyeOff, Lock, Unlock, Star, Sparkles, Flame,
  ArrowUpRight, ArrowDownRight, ArrowRight, Info, HelpCircle,
  UserCheck, Shield, Database, Filter, Search,
  Plus, Edit, Trash2, Copy, CheckSquare, Square,
  PlayCircle, PauseCircle, SkipForward, Volume2,
  Layers, Grid, RotateCcw, MapPin, Compass, Navigation,
  Maximize, BarChart, LineChart, Gauge, Radar, Hexagon
} from 'lucide-react';

// Import UI8 Design System
import '../styles/ui8-design-system.css';

// Import UI8 Nudge Animations
import { 
  TestCompletionAnimation, 
  ScoreRevealAnimation,
  RankImprovementAnimation,
  AchievementAnimation,
  ExamReminderAnimation,
  NudgeTheme 
} from './animations/NudgeAnimations';

interface CompleteMockTestFrameworkProps {
  onBack?: () => void;
}

// Complete Data Structures for Full Framework
interface PreMockPlanning {
  testDate: string;
  testVenue: string;
  targetScore: number;
  targetPercentile: number;
  previousMockScores: number[];
  strengths: string[];
  weaknesses: string[];
  focusAreas: string[];
  motivationLevel: number;
  confidenceLevel: number;
  preparationWeeks: number;
  studyHoursDaily: number;
  sleepPattern: {
    averageHours: number;
    consistency: number;
  };
  stressLevel: number;
  testStrategy: {
    sectionSequence: string[];
    timeAllocation: Record<string, number>;
    skipCriteria: string;
    riskThreshold: number;
  };
}

interface MockPerformanceAnalysis {
  testId: string;
  studentId: string;
  actualScore: number;
  targetScore: number;
  percentile: number;
  rank: number;
  totalTimeTaken: number;
  accuracy: number;
  attemptedQuestions: number;
  sectionalPerformance: SectionAnalysis[];
  timeManagement: TimeAnalysis;
  omrAnalysis: OMRAnalysis;
  psychologicalState: PsychologicalAnalysis;
}

interface SectionAnalysis {
  section: string;
  questions: number;
  attempted: number;
  correct: number;
  incorrect: number;
  skipped: number;
  timeTaken: number;
  averageTimePerQuestion: number;
  accuracy: number;
  expectedScore: number;
  actualScore: number;
  deviation: number;
  difficultyWiseBreakdown: {
    easy: { attempted: number; correct: number; };
    medium: { attempted: number; correct: number; };
    hard: { attempted: number; correct: number; };
  };
}

interface TimeAnalysis {
  totalTime: number;
  sectionalTime: Record<string, number>;
  questionTypeTime: Record<string, number>;
  timePerQuestion: number[];
  timeWasted: number;
  rushPeriods: { startTime: number; endTime: number; impact: string; }[];
  pauseMoments: { time: number; duration: number; reason: string; }[];
}

interface OMRAnalysis {
  totalBubbles: number;
  bubblingTime: number;
  mistakes: number;
  corrections: number;
  reviewTime: number;
  efficiency: number;
}

interface PsychologicalAnalysis {
  confidenceLevel: number;
  stressLevel: number;
  focusLevel: number;
  motivationLevel: number;
  emotionalState: string;
  criticalMoments: { time: number; emotion: string; impact: string; }[];
  recoveryPoints: { time: number; strategy: string; effectiveness: number; }[];
}

interface QuestionAnalysis {
  questionId: number;
  section: string;
  topic: string;
  subtopic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  correctAnswer: string;
  selectedAnswer: string;
  status: 'Correct' | 'Incorrect' | 'Skipped' | 'Marked';
  timeTaken: number;
  averageTime: number;
  confidence: number;
  sequence: number;
  revisited: boolean;
  changed: boolean;
  technique: string;
  mistakeType: string;
  conceptClarity: number;
  carelessnessLevel: number;
  guesswork: boolean;
}

interface FourPillarAnalysis {
  decode: {
    overallTrend: string;
    strengthAreas: string[];
    weaknessAreas: string[];
    surprisePerformers: string[];
    unexpectedFailures: string[];
  };
  track: {
    scoreProgression: number[];
    accuracyTrend: number[];
    timeManagementTrend: number[];
    sectionalTrends: Record<string, number[]>;
  };
  reflect: {
    keyInsights: string[];
    mistakePatterns: string[];
    behavioralObservations: string[];
    emotionalPatterns: string[];
  };
  adapt: {
    strategicChanges: string[];
    studyPlanAdjustments: string[];
    technicalImprovements: string[];
    psychologicalInterventions: string[];
  };
}

const CompleteMockTestFramework: React.FC<CompleteMockTestFrameworkProps> = ({ onBack }) => {
  const [activePhase, setActivePhase] = useState<'pre-mock' | 'analysis' | 'post-mock' | 'long-term'>('pre-mock');
  const [currentView, setCurrentView] = useState('overview');
  const [selectedStudent, setSelectedStudent] = useState<string>('STU001');

  // Mock data for demonstration - would come from backend
  const mockData = {
    preMockPlanning: {
      testDate: '2025-02-01',
      testVenue: 'Legalight Test Center',
      targetScore: 85,
      targetPercentile: 90,
      previousMockScores: [45, 59, 67],
      strengths: ['Legal Reasoning', 'Basic English Grammar'],
      weaknesses: ['Para Jumbles', 'Complex Logical Arrangements', 'Quantitative Fundamentals'],
      focusAreas: ['Time Management', 'Accuracy Improvement', 'Skip Strategy'],
      motivationLevel: 8,
      confidenceLevel: 6,
      preparationWeeks: 4,
      studyHoursDaily: 8,
      sleepPattern: { averageHours: 7, consistency: 8 },
      stressLevel: 6,
      testStrategy: {
        sectionSequence: ['Legal', 'English', 'GK', 'Quantitative', 'Logical'],
        timeAllocation: { Legal: 34, English: 22, GK: 13, Quantitative: 15, Logical: 25 },
        skipCriteria: '30-second rule',
        riskThreshold: 0.5
      }
    },
    mockPerformance: {
      testId: 'MOCK_003',
      studentId: 'STU001',
      actualScore: 67,
      targetScore: 85,
      percentile: 78,
      rank: 6500,
      totalTimeTaken: 111,
      accuracy: 66,
      attemptedQuestions: 96,
      sectionalPerformance: [
        {
          section: 'Legal Reasoning',
          questions: 32,
          attempted: 29,
          correct: 21,
          incorrect: 8,
          skipped: 3,
          timeTaken: 30,
          averageTimePerQuestion: 1.03,
          accuracy: 72,
          expectedScore: 24,
          actualScore: 21,
          deviation: -3,
          difficultyWiseBreakdown: {
            easy: { attempted: 12, correct: 11 },
            medium: { attempted: 14, correct: 8 },
            hard: { attempted: 3, correct: 2 }
          }
        },
        {
          section: 'English Language',
          questions: 24,
          attempted: 20,
          correct: 16,
          incorrect: 4,
          skipped: 4,
          timeTaken: 18,
          averageTimePerQuestion: 0.9,
          accuracy: 80,
          expectedScore: 18,
          actualScore: 16,
          deviation: -2,
          difficultyWiseBreakdown: {
            easy: { attempted: 8, correct: 8 },
            medium: { attempted: 10, correct: 7 },
            hard: { attempted: 2, correct: 1 }
          }
        },
        {
          section: 'Current Affairs/GK',
          questions: 28,
          attempted: 21,
          correct: 15,
          incorrect: 6,
          skipped: 7,
          timeTaken: 22,
          averageTimePerQuestion: 1.05,
          accuracy: 71,
          expectedScore: 18,
          actualScore: 15,
          deviation: -3,
          difficultyWiseBreakdown: {
            easy: { attempted: 9, correct: 8 },
            medium: { attempted: 8, correct: 5 },
            hard: { attempted: 4, correct: 2 }
          }
        },
        {
          section: 'Logical Reasoning',
          questions: 24,
          attempted: 18,
          correct: 11,
          incorrect: 7,
          skipped: 6,
          timeTaken: 26,
          averageTimePerQuestion: 1.44,
          accuracy: 61,
          expectedScore: 15,
          actualScore: 11,
          deviation: -4,
          difficultyWiseBreakdown: {
            easy: { attempted: 6, correct: 5 },
            medium: { attempted: 8, correct: 4 },
            hard: { attempted: 4, correct: 2 }
          }
        },
        {
          section: 'Quantitative',
          questions: 12,
          attempted: 8,
          correct: 4,
          incorrect: 4,
          skipped: 4,
          timeTaken: 15,
          averageTimePerQuestion: 1.87,
          accuracy: 50,
          expectedScore: 8,
          actualScore: 4,
          deviation: -4,
          difficultyWiseBreakdown: {
            easy: { attempted: 4, correct: 3 },
            medium: { attempted: 3, correct: 1 },
            hard: { attempted: 1, correct: 0 }
          }
        }
      ],
      timeManagement: {
        totalTime: 111,
        sectionalTime: { Legal: 30, English: 18, GK: 22, Logical: 26, Quantitative: 15 },
        questionTypeTime: { RC: 180, Grammar: 60, Logic: 150, Math: 200, GK: 90 },
        timePerQuestion: [120, 90, 180, 60, 150, 200, 45, 300, 90, 120], // Sample for first 10 questions
        timeWasted: 8,
        rushPeriods: [
          { startTime: 95, endTime: 105, impact: 'Made 3 careless errors' }
        ],
        pauseMoments: [
          { time: 45, duration: 30, reason: 'Difficult logical arrangement' },
          { time: 78, duration: 45, reason: 'Complex reading comprehension' }
        ]
      },
      omrAnalysis: {
        totalBubbles: 96,
        bubblingTime: 8,
        mistakes: 1,
        corrections: 2,
        reviewTime: 3,
        efficiency: 85
      },
      psychologicalState: {
        confidenceLevel: 6,
        stressLevel: 7,
        focusLevel: 7,
        motivationLevel: 8,
        emotionalState: 'Anxious but determined',
        criticalMoments: [
          { time: 45, emotion: 'Frustration', impact: 'Spent too much time on one question' },
          { time: 85, emotion: 'Panic', impact: 'Realized running out of time' }
        ],
        recoveryPoints: [
          { time: 50, strategy: 'Deep breathing', effectiveness: 7 },
          { time: 90, strategy: 'Strategic skipping', effectiveness: 8 }
        ]
      }
    },
    fourPillarAnalysis: {
      decode: {
        overallTrend: 'Steady improvement with specific bottlenecks',
        strengthAreas: ['Legal Reasoning', 'Basic Grammar', 'Current Affairs'],
        weaknessAreas: ['Para Jumbles', 'Complex Logic', 'Quantitative'],
        surprisePerformers: ['Constitutional Law articles'],
        unexpectedFailures: ['Basic arithmetic under time pressure']
      },
      track: {
        scoreProgression: [45, 59, 67],
        accuracyTrend: [58, 62, 66],
        timeManagementTrend: [65, 70, 75],
        sectionalTrends: {
          Legal: [60, 65, 72],
          English: [70, 75, 80],
          GK: [55, 68, 71],
          Logical: [45, 55, 61],
          Quantitative: [40, 45, 50]
        }
      },
      reflect: {
        keyInsights: [
          'Time management has improved but still needs work',
          'Confidence affects accuracy significantly',
          'Strong foundation in Legal reasoning',
          'Struggle with complex multi-step problems'
        ],
        mistakePatterns: [
          'Time pressure leads to careless errors',
          'Over-thinking on medium difficulty questions',
          'Avoiding quantitative questions completely',
          'Not using elimination technique effectively'
        ],
        behavioralObservations: [
          'Tends to spend too much time on challenging questions',
          'Good at recognizing when to skip',
          'Maintains composure during most of the test',
          'Strategic in section sequencing'
        ],
        emotionalPatterns: [
          'Anxiety peaks during logical reasoning',
          'Confidence drops with consecutive wrong answers',
          'Motivation remains high throughout',
          'Recovery strategies are effective'
        ]
      },
      adapt: {
        strategicChanges: [
          'Implement 30-second decision rule religiously',
          'Change section sequence to end with strongest',
          'Use elimination technique more systematically',
          'Practice timed mini-tests for each section'
        ],
        studyPlanAdjustments: [
          'Increase logical reasoning practice by 3 hours/week',
          'Focus on basic quantitative concepts daily',
          'Practice para jumbles with specific techniques',
          'Regular accuracy drills under time pressure'
        ],
        technicalImprovements: [
          'Master grid method for arrangements',
          'Learn formula derivation for math',
          'Practice speed reading techniques',
          'Develop systematic approach to RC'
        ],
        psychologicalInterventions: [
          'Stress management techniques during test',
          'Confidence building through small wins',
          'Visualization exercises before test',
          'Positive self-talk during difficult moments'
        ]
      }
    }
  };

  // Pre-Mock Planning View
  const PreMockPlanningView = () => {
    return (
      <div className="space-y-6">
        {/* Test Setup */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-indigo-600" />
            Pre-Mock Test Planning
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Test Details</h3>
              <div className="space-y-2 text-sm">
                <div><span className="text-gray-600">Date:</span> <span className="font-medium">{mockData.preMockPlanning.testDate}</span></div>
                <div><span className="text-gray-600">Venue:</span> <span className="font-medium">{mockData.preMockPlanning.testVenue}</span></div>
                <div><span className="text-gray-600">Target Score:</span> <span className="font-medium text-green-600">{mockData.preMockPlanning.targetScore}/120</span></div>
                <div><span className="text-gray-600">Target Percentile:</span> <span className="font-medium text-purple-600">{mockData.preMockPlanning.targetPercentile}th</span></div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Progress Tracking</h3>
              <div className="space-y-2">
                <div className="text-sm text-gray-600">Previous Mock Scores:</div>
                <div className="flex space-x-2">
                  {mockData.preMockPlanning.previousMockScores.map((score, index) => (
                    <div key={index} className="bg-white px-2 py-1 rounded text-sm font-medium">
                      Mock {index + 1}: {score}
                    </div>
                  ))}
                </div>
                <div className="text-xs text-green-600 mt-2">
                  ↗️ Improvement: +{mockData.preMockPlanning.previousMockScores[mockData.preMockPlanning.previousMockScores.length - 1] - mockData.preMockPlanning.previousMockScores[0]} points
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Readiness Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Motivation</span>
                  <div className="flex">
                    {[...Array(10)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < mockData.preMockPlanning.motivationLevel ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Confidence</span>
                  <div className="flex">
                    {[...Array(10)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < mockData.preMockPlanning.confidenceLevel ? 'text-blue-500 fill-current' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </div>
                <div className="text-xs text-gray-600">
                  Study Hours: {mockData.preMockPlanning.studyHoursDaily}h/day
                </div>
                <div className="text-xs text-gray-600">
                  Sleep: {mockData.preMockPlanning.sleepPattern.averageHours}h avg
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Strengths & Weaknesses Analysis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-green-600" />
              Current Strengths
            </h3>
            <div className="space-y-2">
              {mockData.preMockPlanning.strengths.map((strength, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm">{strength}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
              Areas for Improvement
            </h3>
            <div className="space-y-2">
              {mockData.preMockPlanning.weaknesses.map((weakness, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <XCircle className="w-4 h-4 text-red-600" />
                  <span className="text-sm">{weakness}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Test Strategy */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Compass className="w-5 h-5 mr-2 text-indigo-600" />
            Test Day Strategy
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Section Sequence</h4>
              <div className="space-y-2">
                {mockData.preMockPlanning.testStrategy.sectionSequence.map((section, index) => (
                  <div key={section} className="flex items-center space-x-3 bg-gray-50 rounded-lg p-2">
                    <div className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </div>
                    <span className="font-medium">{section}</span>
                    <span className="text-sm text-gray-600">({(mockData.preMockPlanning.testStrategy.timeAllocation as any)[section]} min)</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Strategic Approach</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Skip Criteria:</span>
                  <span className="font-medium">{mockData.preMockPlanning.testStrategy.skipCriteria}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Risk Threshold:</span>
                  <span className="font-medium">{(mockData.preMockPlanning.testStrategy.riskThreshold * 100)}%</span>
                </div>
                <div className="bg-yellow-50 rounded-lg p-3">
                  <div className="text-sm font-medium text-yellow-800">Focus Areas for This Mock:</div>
                  <ul className="mt-2 space-y-1">
                    {mockData.preMockPlanning.focusAreas.map((area, index) => (
                      <li key={index} className="text-sm text-yellow-700">• {area}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Complete Mock Analysis View
  const MockAnalysisView = () => {
    return (
      <div className="space-y-6">
        {/* Four Pillar Analysis Dashboard */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Layers className="w-6 h-6 mr-2 text-indigo-600" />
            4-Pillar Analysis Framework
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* DECODE Pillar */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Search className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="font-semibold text-blue-900">DECODE</h3>
              </div>
              <div className="text-sm space-y-2">
                <div><strong>Trend:</strong> {mockData.fourPillarAnalysis.decode.overallTrend}</div>
                <div><strong>Strengths:</strong> {mockData.fourPillarAnalysis.decode.strengthAreas.length} areas</div>
                <div><strong>Weaknesses:</strong> {mockData.fourPillarAnalysis.decode.weaknessAreas.length} areas</div>
              </div>
            </div>

            {/* TRACK Pillar */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
                <h3 className="font-semibold text-green-900">TRACK</h3>
              </div>
              <div className="text-sm space-y-2">
                <div><strong>Score:</strong> {mockData.fourPillarAnalysis.track.scoreProgression[mockData.fourPillarAnalysis.track.scoreProgression.length - 1]}/120</div>
                <div><strong>Accuracy:</strong> {mockData.fourPillarAnalysis.track.accuracyTrend[mockData.fourPillarAnalysis.track.accuracyTrend.length - 1]}%</div>
                <div><strong>Improvement:</strong> +{mockData.fourPillarAnalysis.track.scoreProgression[mockData.fourPillarAnalysis.track.scoreProgression.length - 1] - mockData.fourPillarAnalysis.track.scoreProgression[0]} points</div>
              </div>
            </div>

            {/* REFLECT Pillar */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <Brain className="w-5 h-5 text-purple-600 mr-2" />
                <h3 className="font-semibold text-purple-900">REFLECT</h3>
              </div>
              <div className="text-sm space-y-2">
                <div><strong>Insights:</strong> {mockData.fourPillarAnalysis.reflect.keyInsights.length} key findings</div>
                <div><strong>Patterns:</strong> {mockData.fourPillarAnalysis.reflect.mistakePatterns.length} identified</div>
                <div><strong>Behaviors:</strong> {mockData.fourPillarAnalysis.reflect.behavioralObservations.length} noted</div>
              </div>
            </div>

            {/* ADAPT Pillar */}
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <RefreshCw className="w-5 h-5 text-orange-600 mr-2" />
                <h3 className="font-semibold text-orange-900">ADAPT</h3>
              </div>
              <div className="text-sm space-y-2">
                <div><strong>Strategic:</strong> {mockData.fourPillarAnalysis.adapt.strategicChanges.length} changes</div>
                <div><strong>Study Plan:</strong> {mockData.fourPillarAnalysis.adapt.studyPlanAdjustments.length} adjustments</div>
                <div><strong>Technical:</strong> {mockData.fourPillarAnalysis.adapt.technicalImprovements.length} improvements</div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Target vs Actual</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Score</span>
                <div className="flex items-center space-x-2">
                  <span className="text-red-500 font-semibold">{mockData.mockPerformance.actualScore}</span>
                  <span className="text-gray-400">/</span>
                  <span className="text-green-500 font-semibold">{mockData.mockPerformance.targetScore}</span>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full"
                  style={{ width: `${(mockData.mockPerformance.actualScore / mockData.mockPerformance.targetScore) * 100}%` }}
                />
              </div>
              <div className="text-sm text-center">
                Gap: <span className="font-semibold text-red-600">
                  -{mockData.mockPerformance.targetScore - mockData.mockPerformance.actualScore} points
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Time Analysis</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Time:</span>
                <span className="font-semibold">{mockData.mockPerformance.timeManagement.totalTime} min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time Remaining:</span>
                <span className="font-semibold text-green-600">{120 - mockData.mockPerformance.timeManagement.totalTime} min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time Wasted:</span>
                <span className="font-semibold text-red-600">{mockData.mockPerformance.timeManagement.timeWasted} min</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg per Question:</span>
                <span className="font-semibold">{Math.round(mockData.mockPerformance.timeManagement.totalTime / mockData.mockPerformance.attemptedQuestions)} sec</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Psychological State</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Confidence:</span>
                <div className="flex">
                  {[...Array(10)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < mockData.mockPerformance.psychologicalState.confidenceLevel ? 'text-blue-500 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Stress Level:</span>
                <div className="flex">
                  {[...Array(10)].map((_, i) => (
                    <AlertCircle key={i} className={`w-3 h-3 ${i < mockData.mockPerformance.psychologicalState.stressLevel ? 'text-red-500 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Focus:</span>
                <div className="flex">
                  {[...Array(10)].map((_, i) => (
                    <Target key={i} className={`w-3 h-3 ${i < mockData.mockPerformance.psychologicalState.focusLevel ? 'text-green-500 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
              </div>
              <div className="text-xs text-gray-600 mt-2">
                State: {mockData.mockPerformance.psychologicalState.emotionalState}
              </div>
            </div>
          </div>
        </div>

        {/* Section-wise Detailed Analysis */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Section-wise Performance Analysis</h3>
          <div className="space-y-6">
            {mockData.mockPerformance.sectionalPerformance.map((section) => (
              <div key={section.section} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-gray-900">{section.section}</h4>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-indigo-600">{section.actualScore}/{section.questions}</div>
                    <div className="text-sm text-gray-600">Accuracy: {section.accuracy}%</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-600">{section.attempted}</div>
                    <div className="text-xs text-gray-600">Attempted</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-green-600">{section.correct}</div>
                    <div className="text-xs text-gray-600">Correct</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-red-600">{section.incorrect}</div>
                    <div className="text-xs text-gray-600">Incorrect</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-gray-600">{section.skipped}</div>
                    <div className="text-xs text-gray-600">Skipped</div>
                  </div>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                  <span>Time Taken: {section.timeTaken}min</span>
                  <span>Avg per Q: {section.averageTimePerQuestion.toFixed(1)}min</span>
                  <span>Expected vs Actual: {section.expectedScore} vs {section.actualScore} ({section.deviation > 0 ? '+' : ''}{section.deviation})</span>
                </div>

                {/* Difficulty-wise breakdown */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {Object.entries(section.difficultyWiseBreakdown).map(([difficulty, data]) => (
                    <div key={difficulty} className="bg-gray-50 rounded p-2 text-center">
                      <div className="text-xs font-medium capitalize">{difficulty}</div>
                      <div className="text-sm">{data.correct}/{data.attempted}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Question-by-Question Analysis (would show 120 questions)
  const QuestionAnalysisView = () => {
    // Sample data for first 10 questions
    const sampleQuestions = [
      { id: 1, section: 'Legal', topic: 'Constitutional Law', status: 'Correct', time: 120, confidence: 8 },
      { id: 2, section: 'Legal', topic: 'Contract Law', status: 'Incorrect', time: 180, confidence: 6 },
      { id: 3, section: 'Legal', topic: 'Criminal Law', status: 'Correct', time: 90, confidence: 9 },
      { id: 4, section: 'Legal', topic: 'Tort Law', status: 'Skipped', time: 30, confidence: 2 },
      { id: 5, section: 'Legal', topic: 'Constitutional Law', status: 'Correct', time: 150, confidence: 7 },
      { id: 6, section: 'Legal', topic: 'Property Law', status: 'Incorrect', time: 240, confidence: 4 },
      { id: 7, section: 'Legal', topic: 'Family Law', status: 'Correct', time: 105, confidence: 8 },
      { id: 8, section: 'Legal', topic: 'Administrative Law', status: 'Correct', time: 135, confidence: 7 },
      { id: 9, section: 'Legal', topic: 'Environmental Law', status: 'Incorrect', time: 210, confidence: 5 },
      { id: 10, section: 'Legal', topic: 'Cyber Law', status: 'Skipped', time: 45, confidence: 3 }
    ];

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Grid className="w-6 h-6 mr-2 text-indigo-600" />
            Question-by-Question Analysis (Sample: Q1-Q10)
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left py-3 px-4">Q#</th>
                  <th className="text-left py-3 px-4">Section</th>
                  <th className="text-left py-3 px-4">Topic</th>
                  <th className="text-center py-3 px-4">Status</th>
                  <th className="text-center py-3 px-4">Time (sec)</th>
                  <th className="text-center py-3 px-4">Confidence</th>
                  <th className="text-center py-3 px-4">Analysis</th>
                </tr>
              </thead>
              <tbody>
                {sampleQuestions.map((q, index) => (
                  <tr key={q.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">Q{q.id}</td>
                    <td className="py-3 px-4">{q.section}</td>
                    <td className="py-3 px-4">{q.topic}</td>
                    <td className="text-center py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        q.status === 'Correct' ? 'bg-green-100 text-green-700' :
                        q.status === 'Incorrect' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {q.status}
                      </span>
                    </td>
                    <td className="text-center py-3 px-4">
                      <span className={`font-medium ${
                        q.time > 180 ? 'text-red-600' : 
                        q.time > 120 ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {q.time}s
                      </span>
                    </td>
                    <td className="text-center py-3 px-4">
                      <div className="flex justify-center">
                        {[...Array(10)].map((_, i) => (
                          <Star key={i} className={`w-3 h-3 ${i < q.confidence ? 'text-blue-500 fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                    </td>
                    <td className="text-center py-3 px-4">
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 text-center text-gray-600">
            <p>Showing sample questions 1-10. Full analysis includes all 120 questions with detailed breakdown.</p>
          </div>
        </div>
      </div>
    );
  };

  // Post-Mock Takeaways View
  const PostMockTakeawaysView = () => {
    return (
      <div className="space-y-6">
        {/* Comprehensive Action Plan */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Target className="w-6 h-6 mr-2 text-indigo-600" />
            Post-Mock Action Plan & Strategic Adjustments
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Immediate Actions */}
            <div className="bg-red-50 rounded-lg p-4">
              <h3 className="font-semibold text-red-900 mb-3">Immediate Actions (Next 24 Hours)</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <CheckSquare className="w-4 h-4 text-red-600" />
                  <span className="text-sm">Review all incorrect answers thoroughly (3 hrs)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckSquare className="w-4 h-4 text-red-600" />
                  <span className="text-sm">Update mistake bank with new patterns (30 min)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Square className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">Revise weak concepts identified (2 hrs)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Square className="w-4 h-4 text-gray-400" />
                  <span className="text-sm">Plan next mock test strategy (1 hr)</span>
                </div>
              </div>
            </div>

            {/* Weekly Plan */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-3">Weekly Focus Areas</h3>
              <div className="space-y-2">
                <div className="text-sm"><strong>Monday:</strong> Constitutional articles + Para jumbles</div>
                <div className="text-sm"><strong>Tuesday:</strong> Logical arrangements + Quantitative</div>
                <div className="text-sm"><strong>Wednesday:</strong> Mock analysis + Weak topics</div>
                <div className="text-sm"><strong>Thursday:</strong> Time-bound practice + Speed improvement</div>
                <div className="text-sm"><strong>Friday:</strong> Full-length tests + Strategy practice</div>
                <div className="text-sm"><strong>Saturday:</strong> Comprehensive review + Next mock prep</div>
                <div className="text-sm"><strong>Sunday:</strong> Light practice + Confidence building</div>
              </div>
            </div>
          </div>
        </div>

        {/* Weakness Transformation Tracker */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Brain className="w-5 h-5 mr-2 text-purple-600" />
            Weakness Transformation Tracker
          </h3>
          
          <div className="space-y-6">
            {/* Para Jumbles */}
            <div className="border-l-4 border-red-500 pl-4">
              <h4 className="font-semibold text-gray-900">Para Jumbles (Critical Weakness)</h4>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Starting Point</div>
                  <div className="font-medium">0% accuracy</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Current Status</div>
                  <div className="font-medium">0% but recognizing patterns</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Week 1 Target</div>
                  <div className="font-medium text-green-600">Learn connect-the-dots technique</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Week 4 Target</div>
                  <div className="font-medium text-blue-600">50% accuracy in mock conditions</div>
                </div>
              </div>
              <div className="mt-3 bg-yellow-50 rounded p-2">
                <div className="text-sm"><strong>Strategy:</strong> Daily practice with technique focus, not speed initially</div>
                <div className="text-sm"><strong>Evidence of Progress:</strong> Now recognizing impossible vs solvable para jumbles</div>
              </div>
            </div>

            {/* Logical Arrangements */}
            <div className="border-l-4 border-orange-500 pl-4">
              <h4 className="font-semibold text-gray-900">Complex Logical Arrangements</h4>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Starting Point</div>
                  <div className="font-medium">0% accuracy, 200+ sec/question</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Current Status</div>
                  <div className="font-medium">Improved skip decision</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Week 2 Target</div>
                  <div className="font-medium text-green-600">60% accuracy on 3-variable</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Week 4 Target</div>
                  <div className="font-medium text-blue-600">50%+ confidence level attempts</div>
                </div>
              </div>
              <div className="mt-3 bg-green-50 rounded p-2">
                <div className="text-sm"><strong>Strategy:</strong> Focus on 2-variable arrangements first, build confidence before complexity</div>
                <div className="text-sm"><strong>Evidence of Progress:</strong> Can differentiate between solvable and impossible within 30 seconds</div>
              </div>
            </div>
          </div>
        </div>

        {/* Motivation & Long-term Vision */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Heart className="w-5 h-5 mr-2 text-pink-600" />
            Motivation & Long-term Vision Tracker
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Long-term Vision</h4>
              <div className="space-y-2 text-sm">
                <div><strong>CLAT 2026 Goal:</strong> 105+ score, 98+ percentile</div>
                <div><strong>Dream School:</strong> NLSIU Bangalore (Top 50 rank)</div>
                <div><strong>Career Vision:</strong> Corporate lawyer in international trade law</div>
                <div><strong>10-Year Goal:</strong> Senior Associate at top-tier international law firm</div>
                <div><strong>Impact Goal:</strong> Help Indian companies navigate international trade laws</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-3">Daily Affirmations</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start space-x-2">
                  <Sparkles className="w-4 h-4 text-yellow-500 mt-0.5" />
                  <span className="italic">"Every question I solve correctly brings me closer to NLSIU"</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Sparkles className="w-4 h-4 text-yellow-500 mt-0.5" />
                  <span className="italic">"My analytical skills are improving with each practice session"</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Sparkles className="w-4 h-4 text-yellow-500 mt-0.5" />
                  <span className="italic">"I am building the foundation for my international trade law career"</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Sparkles className="w-4 h-4 text-yellow-500 mt-0.5" />
                  <span className="italic">"Consistent effort compounds into extraordinary results"</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen ui8-dark-theme ui8-scrollbar p-6">
      {/* Test Completion Animation */}
      <div className="fixed top-4 right-4 z-10">
        <TestCompletionAnimation 
          theme={NudgeTheme.DARK}
          size="md"
          autoPlay={true}
          trigger="onMount"
        />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* UI8 Enhanced Header */}
        <div className="mb-8 animate-ui8-fade-in-up">
          <div className="flex justify-between items-center mb-6">
            <div className="animate-ui8-fade-in-left">
              <h1 className="text-ui8-hero text-clat-text-primary">Complete Mock Test Analysis Framework</h1>
              <p className="text-ui8-body text-clat-text-secondary mt-2">Comprehensive analysis covering all aspects of mock test performance (Pages 1-42)</p>
            </div>
            {onBack && (
              <button
                onClick={onBack}
                className="btn-ui8-secondary hover-ui8-lift flex items-center"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Back
              </button>
            )}
          </div>

          {/* UI8 Enhanced Phase Navigation */}
          <div className="nav-ui8 p-2 rounded-xl">
            <div className="flex space-x-2 overflow-x-auto stagger-ui8-children">
              {[
                { id: 'pre-mock', label: 'Pre-Mock Planning', icon: Calendar, pages: '1-4', color: 'var(--clat-primary)' },
                { id: 'analysis', label: 'Mock Analysis', icon: BarChart3, pages: '5-23', color: 'var(--clat-secondary)' },
                { id: 'post-mock', label: 'Post-Mock Takeaways', icon: Target, pages: '24-31', color: 'var(--clat-success)' },
                { id: 'long-term', label: 'Long-term Strategy', icon: Trophy, pages: '32-42', color: 'var(--clat-warning)' }
              ].map((phase, index) => (
                <button
                  key={phase.id}
                  onClick={() => setActivePhase(phase.id as any)}
                  className={`nav-ui8-link flex items-center space-x-3 py-4 px-6 rounded-xl font-medium transition-all duration-300 hover-ui8-scale animate-ui8-fade-in-left ${
                    activePhase === phase.id
                      ? 'active card-ui8-glass'
                      : 'hover:card-ui8-glass'
                  }`}
                  style={{ 
                    '--stagger-index': index,
                    ...(activePhase === phase.id && {
                      background: `linear-gradient(135deg, ${phase.color}20 0%, ${phase.color}10 100%)`,
                      borderColor: phase.color,
                      color: phase.color,
                      boxShadow: `0 0 20px ${phase.color}30`
                    })
                  }}
                >
                  <phase.icon className="w-5 h-5" style={{ 
                    filter: activePhase === phase.id ? `drop-shadow(0 0 4px ${phase.color})` : 'none' 
                  }} />
                  <div className="text-left">
                    <div>{phase.label}</div>
                    <div className="badge-ui8-primary text-xs px-2 py-1 rounded-full mt-1">
                      Pages {phase.pages}
                    </div>
                  </div>
                  {activePhase === phase.id && (
                    <ExamReminderAnimation size="sm" autoPlay={true} className="ml-2" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Phase Content */}
        <div className="mb-8">
          {activePhase === 'pre-mock' && <PreMockPlanningView />}
          {activePhase === 'analysis' && (
            <div className="space-y-6">
              {/* Sub-navigation for analysis phase */}
              <div className="bg-white rounded-xl shadow-lg p-4">
                <div className="flex space-x-4">
                  {[
                    { id: 'overview', label: 'Performance Overview', pages: '5-11' },
                    { id: 'questions', label: 'Question Analysis', pages: '17-23' },
                    { id: 'psychology', label: 'Psychological Insights', pages: '24-31' }
                  ].map((view) => (
                    <button
                      key={view.id}
                      onClick={() => setCurrentView(view.id)}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        currentView === view.id
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {view.label}
                      <span className="ml-2 text-xs opacity-75">({view.pages})</span>
                    </button>
                  ))}
                </div>
              </div>

              {currentView === 'overview' && <MockAnalysisView />}
              {currentView === 'questions' && <QuestionAnalysisView />}
              {currentView === 'psychology' && <MockAnalysisView />}
            </div>
          )}
          {activePhase === 'post-mock' && <PostMockTakeawaysView />}
          {activePhase === 'long-term' && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Long-term Strategy & Vision</h2>
              <p className="text-gray-600">This section includes accountability systems, emergency plans, and knowledge building beyond CLAT as covered in pages 32-42.</p>
              <div className="mt-4 text-center text-indigo-600">
                <p>Refer to the previous MockTestAdminDashboard component for detailed implementation of pages 32-42.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompleteMockTestFramework;
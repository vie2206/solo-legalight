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
  PlayCircle, PauseCircle, SkipForward, Volume2
} from 'lucide-react';

interface MockTestAdminDashboardProps {
  onBack?: () => void;
}

// Student Mock Test Data Structure
interface StudentMockData {
  id: string;
  studentId: string;
  studentName: string;
  email: string;
  batch: string;
  mockTestId: string;
  testDate: string;
  score: number;
  percentile: number;
  rank: number;
  sections: SectionPerformance[];
  questions: QuestionAnalysis[];
  strategy: TestStrategy;
  weaknesses: WeaknessTracking[];
  strengths: StrengthMaintenance[];
  actionPlan: ActionPlan;
  accountability: AccountabilitySystem;
  motivation: MotivationFramework;
  emergencyPlan: EmergencyProtocol;
}

interface SectionPerformance {
  name: string;
  score: number;
  maxScore: number;
  attempted: number;
  correct: number;
  incorrect: number;
  skipped: number;
  timeSpent: number;
  accuracy: number;
}

interface QuestionAnalysis {
  id: number;
  section: string;
  topic: string;
  difficulty: string;
  attemptStatus: string;
  timeTaken: number;
  confidence: number;
  riskTaken: boolean;
  sequence: number;
}

interface TestStrategy {
  sectionSequence: string[];
  targetScore: number;
  targetPercentile: number;
  riskThreshold: number;
  skipStrategy: string;
  timeAllocation: Record<string, number>;
  omrStrategy: {
    checkFrequency: number;
    bubbleTime: number;
    finalReview: number;
  };
}

interface WeaknessTracking {
  area: string;
  startingPoint: string;
  currentStatus: string;
  milestones: {
    week: number;
    target: string;
    achieved: boolean;
  }[];
  evidenceOfProgress: string;
  transformationStrategy: string;
}

interface StrengthMaintenance {
  area: string;
  currentLevel: string;
  maintenanceStrategy: string;
  targetLevel: string;
}

interface ActionPlan {
  immediate: {
    task: string;
    timeRequired: number;
    priority: string;
    completed: boolean;
  }[];
  weekly: {
    day: string;
    activities: string;
    timeAllocation: string;
  }[];
  studyScheduleAdjustments: {
    topic: string;
    previousHours: number;
    newHours: number;
    reason: string;
  }[];
}

interface AccountabilitySystem {
  studyPartner: {
    name: string;
    role: string;
    checkInSchedule: string;
  };
  mentor: {
    name: string;
    role: string;
    meetingSchedule: string;
  };
  studyGroup: {
    name: string;
    members: number;
    platform: string;
  };
  progressSharingPlatform: string;
}

interface MotivationFramework {
  dailyAffirmations: string[];
  weeklyRituals: {
    day: string;
    activity: string;
  }[];
  monthlyInspiration: string[];
  longTermVision: {
    goal: string;
    targetScore: number;
    dreamSchool: string;
    careerVision: string;
  };
}

interface EmergencyProtocol {
  performanceDeclinePlan: {
    trigger: string;
    immediateResponse: string;
    supportActivation: string;
    recoveryStrategy: string;
  };
  stressBurnoutPlan: {
    warningSignals: string[];
    recoveryProtocol: string[];
    supportSystem: string;
  };
  lifeDisruptionPlan: {
    contingencyStudy: string;
    supportNetwork: string;
    academicSafetyNet: string;
  };
}

const MockTestAdminDashboard: React.FC<MockTestAdminDashboardProps> = ({ onBack }) => {
  const [activeView, setActiveView] = useState('overview');
  const [selectedStudent, setSelectedStudent] = useState<StudentMockData | null>(null);
  const [selectedBatch, setSelectedBatch] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [filterOptions, setFilterOptions] = useState({
    scoreRange: { min: 0, max: 120 },
    percentileRange: { min: 0, max: 100 },
    showOnlyAtRisk: false,
    showOnlyImproving: false
  });

  // Mock data for demonstration
  const mockStudents: StudentMockData[] = [
    {
      id: '1',
      studentId: 'STU001',
      studentName: 'Arjun Sharma',
      email: 'arjun.sharma@email.com',
      batch: 'Lightians 2026',
      mockTestId: 'MOCK003',
      testDate: '2025-01-15',
      score: 67,
      percentile: 78,
      rank: 6500,
      sections: [
        {
          name: 'Legal Reasoning',
          score: 21,
          maxScore: 32,
          attempted: 29,
          correct: 21,
          incorrect: 8,
          skipped: 3,
          timeSpent: 30,
          accuracy: 72
        },
        {
          name: 'English Language',
          score: 16,
          maxScore: 24,
          attempted: 20,
          correct: 16,
          incorrect: 4,
          skipped: 4,
          timeSpent: 18,
          accuracy: 80
        },
        {
          name: 'Current Affairs/GK',
          score: 15,
          maxScore: 28,
          attempted: 21,
          correct: 15,
          incorrect: 6,
          skipped: 7,
          timeSpent: 22,
          accuracy: 71
        },
        {
          name: 'Logical Reasoning',
          score: 11,
          maxScore: 24,
          attempted: 18,
          correct: 11,
          incorrect: 7,
          skipped: 6,
          timeSpent: 26,
          accuracy: 61
        },
        {
          name: 'Quantitative',
          score: 4,
          maxScore: 12,
          attempted: 8,
          correct: 4,
          incorrect: 4,
          skipped: 4,
          timeSpent: 15,
          accuracy: 50
        }
      ],
      questions: [], // Would contain 120 question analyses
      strategy: {
        sectionSequence: ['Legal', 'English', 'GK', 'Logical', 'Quantitative'],
        targetScore: 85,
        targetPercentile: 90,
        riskThreshold: 0.5,
        skipStrategy: 'time-based',
        timeAllocation: {
          Legal: 35,
          English: 20,
          GK: 25,
          Logical: 25,
          Quantitative: 15
        },
        omrStrategy: {
          checkFrequency: 5,
          bubbleTime: 10,
          finalReview: 5
        }
      },
      weaknesses: [
        {
          area: 'Para Jumbles',
          startingPoint: '0% accuracy',
          currentStatus: '0% accuracy but recognizing patterns',
          milestones: [
            { week: 1, target: 'Learn connect-the-dots technique', achieved: true },
            { week: 2, target: 'Practice 10 questions daily', achieved: true },
            { week: 3, target: 'Achieve 30% accuracy', achieved: false },
            { week: 4, target: '50% accuracy in mock conditions', achieved: false }
          ],
          evidenceOfProgress: 'Now recognizing impossible vs solvable para jumbles',
          transformationStrategy: 'Daily practice with technique focus, not speed initially'
        },
        {
          area: 'Complex Logical Arrangements',
          startingPoint: '0% accuracy, 200+ seconds per question',
          currentStatus: '0% accuracy but improved skip decision',
          milestones: [
            { week: 1, target: 'Master grid method for 2-variable', achieved: true },
            { week: 2, target: 'Solve 3-variable with 60% accuracy', achieved: false },
            { week: 3, target: 'Time limit practice - 120 seconds max', achieved: true },
            { week: 4, target: 'Attempt only 50% confidence level', achieved: false }
          ],
          evidenceOfProgress: 'Can differentiate between solvable and impossible within 30 seconds',
          transformationStrategy: 'Focus on 2-variable arrangements first'
        }
      ],
      strengths: [
        {
          area: 'Legal Reasoning fundamentals',
          currentLevel: '70%+ accuracy',
          maintenanceStrategy: 'Continue daily practice, solve 5 questions daily',
          targetLevel: '75%+ consistency'
        },
        {
          area: 'Basic English grammar',
          currentLevel: '80%+ accuracy',
          maintenanceStrategy: 'Weekly grammar rule revision',
          targetLevel: '80%+ maintenance'
        }
      ],
      actionPlan: {
        immediate: [
          {
            task: 'Review all incorrect answers thoroughly',
            timeRequired: 180,
            priority: 'High',
            completed: true
          },
          {
            task: 'Update mistake bank with new patterns',
            timeRequired: 30,
            priority: 'High',
            completed: true
          },
          {
            task: 'Revise weak concepts identified',
            timeRequired: 120,
            priority: 'High',
            completed: false
          }
        ],
        weekly: [
          { day: 'Monday', activities: 'Constitution articles + Para jumbles + Daily routine', timeAllocation: '3 hours' },
          { day: 'Tuesday', activities: 'Logical arrangements + Quantitative + Current affairs', timeAllocation: '3 hours' },
          { day: 'Wednesday', activities: 'Mock analysis + Weak topics + Legal reading', timeAllocation: '4 hours' },
          { day: 'Thursday', activities: 'Time-bound practice + Speed improvement', timeAllocation: '3 hours' },
          { day: 'Friday', activities: 'Full-length tests + Strategy practice', timeAllocation: '4 hours' },
          { day: 'Saturday', activities: 'Comprehensive review + Next mock prep', timeAllocation: '3 hours' },
          { day: 'Sunday', activities: 'Light practice + Confidence building', timeAllocation: '2 hours' }
        ],
        studyScheduleAdjustments: [
          { topic: 'Logical Reasoning', previousHours: 5, newHours: 8, reason: 'Major weakness area' },
          { topic: 'Quantitative basics', previousHours: 3, newHours: 6, reason: 'Foundation building needed' },
          { topic: 'Legal reasoning', previousHours: 8, newHours: 6, reason: 'Already strong, maintain' },
          { topic: 'Current Affairs', previousHours: 4, newHours: 5, reason: 'Quick scoring opportunity' }
        ]
      },
      accountability: {
        studyPartner: {
          name: 'Priya Sharma',
          role: 'Daily target verification, mock discussion',
          checkInSchedule: 'Daily evening'
        },
        mentor: {
          name: 'Harshit Kumar',
          role: 'Strategic guidance, concept clarification',
          meetingSchedule: 'Bi-weekly sessions'
        },
        studyGroup: {
          name: 'Lightians Batch 2026',
          members: 15,
          platform: 'WhatsApp'
        },
        progressSharingPlatform: 'Shared Google Sheet'
      },
      motivation: {
        dailyAffirmations: [
          'Every question I solve correctly brings me closer to NLSIU',
          'My analytical skills are improving with each practice session',
          'I am building the foundation for my international trade law career',
          'Consistent effort compounds into extraordinary results'
        ],
        weeklyRituals: [
          { day: 'Monday', activity: 'Review long-term vision and career goals' },
          { day: 'Wednesday', activity: 'Celebrate small wins and progress' },
          { day: 'Friday', activity: 'Connect with successful lawyers or seniors' },
          { day: 'Sunday', activity: 'Reflect on growth and plan upcoming week' }
        ],
        monthlyInspiration: [
          'Read success stories of international trade lawyers',
          'Watch interviews of top law firm partners',
          'Connect with NLSIU alumni in target firms',
          'Visit top law firms websites'
        ],
        longTermVision: {
          goal: 'CLAT 2026',
          targetScore: 105,
          dreamSchool: 'NLSIU Bangalore',
          careerVision: 'Corporate lawyer specializing in international trade law'
        }
      },
      emergencyPlan: {
        performanceDeclinePlan: {
          trigger: 'Score drops below 65',
          immediateResponse: 'Emergency meeting with mentor within 24 hours',
          supportActivation: 'Discuss with study group, increase daily check-ins',
          recoveryStrategy: 'Return to foundation building, focus on strengths'
        },
        stressBurnoutPlan: {
          warningSignals: ['Declining performance despite study', 'Loss of motivation', 'Physical symptoms'],
          recoveryProtocol: ['2-day complete break', 'Light physical activity', 'Family support session', 'Gradual re-engagement'],
          supportSystem: 'Parents, mentor, and study partner activation'
        },
        lifeDisruptionPlan: {
          contingencyStudy: 'Minimum 4 hours daily during disruptions',
          supportNetwork: 'Inform all accountability partners immediately',
          academicSafetyNet: 'Access to recorded lectures and backup coaching'
        }
      }
    }
  ];

  // Filter students based on search and filters
  const filteredStudents = mockStudents.filter(student => {
    const matchesSearch = student.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBatch = selectedBatch === 'all' || student.batch === selectedBatch;
    const matchesScore = student.score >= filterOptions.scoreRange.min && 
                        student.score <= filterOptions.scoreRange.max;
    const matchesPercentile = student.percentile >= filterOptions.percentileRange.min && 
                             student.percentile <= filterOptions.percentileRange.max;
    
    return matchesSearch && matchesBatch && matchesScore && matchesPercentile;
  });

  // Calculate batch statistics
  const batchStats = {
    totalStudents: filteredStudents.length,
    averageScore: Math.round(filteredStudents.reduce((sum, s) => sum + s.score, 0) / filteredStudents.length || 0),
    averagePercentile: Math.round(filteredStudents.reduce((sum, s) => sum + s.percentile, 0) / filteredStudents.length || 0),
    topScore: Math.max(...filteredStudents.map(s => s.score), 0),
    improvingStudents: filteredStudents.filter(s => s.score > 65).length,
    atRiskStudents: filteredStudents.filter(s => s.score < 60).length
  };

  // Overview Dashboard
  const OverviewDashboard = () => {
    return (
      <div className="space-y-6">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-blue-500" />
              <span className="text-sm text-gray-500">Total</span>
            </div>
            <div className="text-2xl font-bold">{batchStats.totalStudents}</div>
            <div className="text-sm text-gray-600">Students Analyzed</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <span className="text-sm text-gray-500">Average</span>
            </div>
            <div className="text-2xl font-bold">{batchStats.averageScore}/120</div>
            <div className="text-sm text-gray-600">Batch Score</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <Award className="w-8 h-8 text-purple-500" />
              <span className="text-sm text-gray-500">Percentile</span>
            </div>
            <div className="text-2xl font-bold">{batchStats.averagePercentile}th</div>
            <div className="text-sm text-gray-600">Batch Average</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <Star className="w-8 h-8 text-green-500" />
              <span className="text-sm text-gray-500">Top</span>
            </div>
            <div className="text-2xl font-bold">{batchStats.topScore}/120</div>
            <div className="text-sm text-gray-600">Highest Score</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-emerald-500" />
              <span className="text-sm text-gray-500">Improving</span>
            </div>
            <div className="text-2xl font-bold">{batchStats.improvingStudents}</div>
            <div className="text-sm text-gray-600">Above Target</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <AlertCircle className="w-8 h-8 text-red-500" />
              <span className="text-sm text-gray-500">At Risk</span>
            </div>
            <div className="text-2xl font-bold">{batchStats.atRiskStudents}</div>
            <div className="text-sm text-gray-600">Need Support</div>
          </div>
        </div>

        {/* Recent Mock Tests Table */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Mock Test Analyses</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Student</th>
                  <th className="text-left py-3 px-4">Test Date</th>
                  <th className="text-center py-3 px-4">Score</th>
                  <th className="text-center py-3 px-4">Percentile</th>
                  <th className="text-center py-3 px-4">Rank</th>
                  <th className="text-center py-3 px-4">Status</th>
                  <th className="text-center py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium">{student.studentName}</div>
                        <div className="text-sm text-gray-500">{student.studentId}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">{student.testDate}</td>
                    <td className="text-center py-3 px-4">
                      <span className="font-semibold">{student.score}/120</span>
                    </td>
                    <td className="text-center py-3 px-4">
                      <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-sm">
                        {student.percentile}th
                      </span>
                    </td>
                    <td className="text-center py-3 px-4">#{student.rank}</td>
                    <td className="text-center py-3 px-4">
                      {student.score >= 65 ? (
                        <span className="text-green-600 flex items-center justify-center">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          Improving
                        </span>
                      ) : (
                        <span className="text-red-600 flex items-center justify-center">
                          <AlertCircle className="w-4 h-4 mr-1" />
                          At Risk
                        </span>
                      )}
                    </td>
                    <td className="text-center py-3 px-4">
                      <button
                        onClick={() => {
                          setSelectedStudent(student);
                          setActiveView('detailed');
                        }}
                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        View Analysis
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section-wise Performance Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Section-wise Batch Performance</h3>
            <div className="space-y-3">
              {['Legal Reasoning', 'English Language', 'Current Affairs/GK', 'Logical Reasoning', 'Quantitative'].map((section) => {
                const avgScore = Math.round(
                  filteredStudents.reduce((sum, s) => {
                    const sec = s.sections.find(sec => sec.name === section);
                    return sum + (sec ? (sec.score / sec.maxScore) * 100 : 0);
                  }, 0) / filteredStudents.length || 0
                );
                
                return (
                  <div key={section}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{section}</span>
                      <span>{avgScore}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full"
                        style={{ width: `${avgScore}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Common Weakness Areas</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <XCircle className="w-5 h-5 text-red-600" />
                  <div>
                    <div className="font-medium">Para Jumbles</div>
                    <div className="text-sm text-gray-600">15 students struggling</div>
                  </div>
                </div>
                <span className="text-red-600 font-semibold">0% avg</span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                  <div>
                    <div className="font-medium">Complex Logical Arrangements</div>
                    <div className="text-sm text-gray-600">12 students struggling</div>
                  </div>
                </div>
                <span className="text-orange-600 font-semibold">15% avg</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  <div>
                    <div className="font-medium">Quantitative Fundamentals</div>
                    <div className="text-sm text-gray-600">10 students struggling</div>
                  </div>
                </div>
                <span className="text-yellow-600 font-semibold">33% avg</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Detailed Student Analysis View
  const DetailedStudentAnalysis = () => {
    if (!selectedStudent) return null;

    return (
      <div className="space-y-6">
        {/* Student Header */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <button
            onClick={() => setActiveView('overview')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ChevronLeft className="w-5 h-5 mr-1" />
            Back to Overview
          </button>
          
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{selectedStudent.studentName}</h2>
              <p className="text-gray-600">{selectedStudent.studentId} • {selectedStudent.email}</p>
              <p className="text-gray-600">{selectedStudent.batch} • Test Date: {selectedStudent.testDate}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-indigo-600">{selectedStudent.score}/120</div>
              <div className="text-lg text-purple-600">{selectedStudent.percentile}th Percentile</div>
              <div className="text-gray-600">Rank: #{selectedStudent.rank}</div>
            </div>
          </div>
        </div>

        {/* Analysis Tabs */}
        <div className="bg-white rounded-xl shadow-lg">
          <div className="border-b">
            <div className="flex space-x-8 px-6 overflow-x-auto">
              {[
                'Performance Overview',
                'Section Analysis',
                'Weakness Tracking',
                'Strength Maintenance',
                'Action Plan',
                'Strategy & Adjustments',
                'Accountability System',
                'Motivation Framework',
                'Emergency Plans'
              ].map((tab) => (
                <button
                  key={tab}
                  className="py-4 border-b-2 border-transparent font-medium whitespace-nowrap hover:text-indigo-600"
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {/* Performance Overview */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold mb-4">Test Strategy</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Target Score</span>
                      <span className="font-semibold">{selectedStudent.strategy.targetScore}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Target Percentile</span>
                      <span className="font-semibold">{selectedStudent.strategy.targetPercentile}th</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Risk Threshold</span>
                      <span className="font-semibold">{selectedStudent.strategy.riskThreshold * 100}%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold mb-4">Section Sequence</h4>
                  <div className="space-y-1">
                    {selectedStudent.strategy.sectionSequence.map((section, index) => (
                      <div key={section} className="flex items-center space-x-2">
                        <span className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm">
                          {index + 1}
                        </span>
                        <span className="text-sm">{section}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold mb-4">OMR Strategy</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Check Frequency</span>
                      <span className="font-semibold">Every {selectedStudent.strategy.omrStrategy.checkFrequency} Q</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bubble Time</span>
                      <span className="font-semibold">{selectedStudent.strategy.omrStrategy.bubbleTime} min</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Final Review</span>
                      <span className="font-semibold">{selectedStudent.strategy.omrStrategy.finalReview} min</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section Performance Chart */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-4">Section-wise Performance</h4>
                <div className="space-y-4">
                  {selectedStudent.sections.map((section) => (
                    <div key={section.name}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{section.name}</span>
                        <div className="text-sm text-gray-600">
                          <span className="font-semibold">{section.score}/{section.maxScore}</span>
                          <span className="ml-2">({section.accuracy}% accuracy)</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full"
                          style={{ width: `${(section.score / section.maxScore) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Attempted: {section.attempted} | Correct: {section.correct} | Wrong: {section.incorrect}</span>
                        <span>Time: {section.timeSpent} min</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weakness Tracking */}
              <div className="bg-white border rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-4 flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-red-600" />
                  Weakness Transformation Tracking
                </h4>
                <div className="space-y-6">
                  {selectedStudent.weaknesses.map((weakness, index) => (
                    <div key={index} className="border-l-4 border-red-500 pl-4">
                      <h5 className="font-semibold text-gray-900">{weakness.area}</h5>
                      <div className="mt-2 space-y-2">
                        <div className="text-sm">
                          <span className="text-gray-600">Starting Point:</span>
                          <span className="ml-2">{weakness.startingPoint}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600">Current Status:</span>
                          <span className="ml-2 font-medium">{weakness.currentStatus}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600">Progress Evidence:</span>
                          <span className="ml-2 text-green-600">{weakness.evidenceOfProgress}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-gray-600">Strategy:</span>
                          <span className="ml-2 italic">{weakness.transformationStrategy}</span>
                        </div>
                        
                        {/* Weekly Milestones */}
                        <div className="mt-3">
                          <div className="text-sm font-medium text-gray-700 mb-2">Weekly Milestones:</div>
                          <div className="space-y-1">
                            {weakness.milestones.map((milestone) => (
                              <div key={milestone.week} className="flex items-center space-x-2">
                                {milestone.achieved ? (
                                  <CheckCircle className="w-4 h-4 text-green-500" />
                                ) : (
                                  <Square className="w-4 h-4 text-gray-400" />
                                )}
                                <span className="text-sm">
                                  Week {milestone.week}: {milestone.target}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strength Maintenance */}
              <div className="bg-white border rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-green-600" />
                  Strength Maintenance Plan
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedStudent.strengths.map((strength, index) => (
                    <div key={index} className="bg-green-50 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-900">{strength.area}</h5>
                      <div className="mt-2 space-y-1 text-sm">
                        <div>
                          <span className="text-gray-600">Current Level:</span>
                          <span className="ml-2 font-medium">{strength.currentLevel}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Target:</span>
                          <span className="ml-2">{strength.targetLevel}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Strategy:</span>
                          <span className="ml-2 italic">{strength.maintenanceStrategy}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Plan */}
              <div className="bg-white border rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-indigo-600" />
                  Action Plan & Schedule
                </h4>
                
                {/* Immediate Actions */}
                <div className="mb-6">
                  <h5 className="font-medium text-gray-900 mb-3">Immediate Actions (Next 24 Hours)</h5>
                  <div className="space-y-2">
                    {selectedStudent.actionPlan.immediate.map((action, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {action.completed ? (
                            <CheckSquare className="w-5 h-5 text-green-600" />
                          ) : (
                            <Square className="w-5 h-5 text-gray-400" />
                          )}
                          <div>
                            <div className="font-medium">{action.task}</div>
                            <div className="text-sm text-gray-600">Time Required: {action.timeRequired} min</div>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          action.priority === 'High' ? 'bg-red-100 text-red-700' :
                          action.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {action.priority}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weekly Schedule */}
                <div className="mb-6">
                  <h5 className="font-medium text-gray-900 mb-3">Weekly Study Schedule</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedStudent.actionPlan.weekly.map((day) => (
                      <div key={day.day} className="border rounded-lg p-3">
                        <div className="font-medium text-indigo-600">{day.day}</div>
                        <div className="text-sm text-gray-600 mt-1">{day.activities}</div>
                        <div className="text-sm font-medium mt-1">{day.timeAllocation}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Study Schedule Adjustments */}
                <div>
                  <h5 className="font-medium text-gray-900 mb-3">Study Time Adjustments</h5>
                  <div className="space-y-2">
                    {selectedStudent.actionPlan.studyScheduleAdjustments.map((adjustment, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">{adjustment.topic}</div>
                          <div className="text-sm text-gray-600 italic">{adjustment.reason}</div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm">{adjustment.previousHours}h/week</span>
                          <ArrowRight className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-semibold text-indigo-600">{adjustment.newHours}h/week</span>
                          <span className={`ml-2 ${
                            adjustment.newHours > adjustment.previousHours ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {adjustment.newHours > adjustment.previousHours ? (
                              <ArrowUpRight className="w-4 h-4" />
                            ) : (
                              <ArrowDownRight className="w-4 h-4" />
                            )}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Accountability System */}
              <div className="bg-white border rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-4 flex items-center">
                  <UserCheck className="w-5 h-5 mr-2 text-blue-600" />
                  Accountability & Support System
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      <h5 className="font-medium">Study Partner</h5>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div><span className="text-gray-600">Name:</span> {selectedStudent.accountability.studyPartner.name}</div>
                      <div><span className="text-gray-600">Role:</span> {selectedStudent.accountability.studyPartner.role}</div>
                      <div><span className="text-gray-600">Check-in:</span> {selectedStudent.accountability.studyPartner.checkInSchedule}</div>
                    </div>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Award className="w-5 h-5 text-purple-600" />
                      <h5 className="font-medium">Mentor</h5>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div><span className="text-gray-600">Name:</span> {selectedStudent.accountability.mentor.name}</div>
                      <div><span className="text-gray-600">Role:</span> {selectedStudent.accountability.mentor.role}</div>
                      <div><span className="text-gray-600">Schedule:</span> {selectedStudent.accountability.mentor.meetingSchedule}</div>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <MessageSquare className="w-5 h-5 text-green-600" />
                      <h5 className="font-medium">Study Group</h5>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div><span className="text-gray-600">Name:</span> {selectedStudent.accountability.studyGroup.name}</div>
                      <div><span className="text-gray-600">Members:</span> {selectedStudent.accountability.studyGroup.members}</div>
                      <div><span className="text-gray-600">Platform:</span> {selectedStudent.accountability.studyGroup.platform}</div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-600">
                  <span className="font-medium">Progress Sharing:</span> {selectedStudent.accountability.progressSharingPlatform}
                </div>
              </div>

              {/* Motivation Framework */}
              <div className="bg-white border rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-4 flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-pink-600" />
                  Motivation & Mindset Framework
                </h4>
                
                {/* Long-term Vision */}
                <div className="mb-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 mb-3">Long-term Vision</h5>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">Goal</div>
                      <div className="font-semibold">{selectedStudent.motivation.longTermVision.goal}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Target Score</div>
                      <div className="font-semibold">{selectedStudent.motivation.longTermVision.targetScore}+</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Dream School</div>
                      <div className="font-semibold">{selectedStudent.motivation.longTermVision.dreamSchool}</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Career Vision</div>
                      <div className="font-semibold">{selectedStudent.motivation.longTermVision.careerVision}</div>
                    </div>
                  </div>
                </div>

                {/* Daily Affirmations */}
                <div className="mb-6">
                  <h5 className="font-medium text-gray-900 mb-3">Daily Affirmations</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedStudent.motivation.dailyAffirmations.map((affirmation, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <Sparkles className="w-4 h-4 text-yellow-500 mt-0.5" />
                        <span className="text-sm italic">"{affirmation}"</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weekly Rituals */}
                <div className="mb-6">
                  <h5 className="font-medium text-gray-900 mb-3">Weekly Motivation Rituals</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedStudent.motivation.weeklyRituals.map((ritual) => (
                      <div key={ritual.day} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                        <Calendar className="w-4 h-4 text-indigo-600" />
                        <div className="text-sm">
                          <span className="font-medium">{ritual.day}:</span>
                          <span className="ml-2">{ritual.activity}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Monthly Inspiration */}
                <div>
                  <h5 className="font-medium text-gray-900 mb-3">Monthly Inspiration Sources</h5>
                  <div className="space-y-2">
                    {selectedStudent.motivation.monthlyInspiration.map((source, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-purple-500" />
                        <span className="text-sm">{source}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Emergency Plans */}
              <div className="bg-white border rounded-lg p-6">
                <h4 className="text-lg font-semibold mb-4 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
                  Emergency Backup Plans
                </h4>
                
                {/* Performance Decline Plan */}
                <div className="mb-6 border-l-4 border-red-500 pl-4">
                  <h5 className="font-medium text-gray-900 mb-3">If Performance Declines</h5>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">Trigger:</span>
                      <span className="ml-2 font-medium">{selectedStudent.emergencyPlan.performanceDeclinePlan.trigger}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Immediate Response:</span>
                      <span className="ml-2">{selectedStudent.emergencyPlan.performanceDeclinePlan.immediateResponse}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Support Activation:</span>
                      <span className="ml-2">{selectedStudent.emergencyPlan.performanceDeclinePlan.supportActivation}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Recovery Strategy:</span>
                      <span className="ml-2">{selectedStudent.emergencyPlan.performanceDeclinePlan.recoveryStrategy}</span>
                    </div>
                  </div>
                </div>

                {/* Stress/Burnout Plan */}
                <div className="mb-6 border-l-4 border-orange-500 pl-4">
                  <h5 className="font-medium text-gray-900 mb-3">If Stress/Burnout Occurs</h5>
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="text-gray-600">Warning Signals:</span>
                      <ul className="mt-1 ml-4 list-disc">
                        {selectedStudent.emergencyPlan.stressBurnoutPlan.warningSignals.map((signal, index) => (
                          <li key={index}>{signal}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="text-gray-600">Recovery Protocol:</span>
                      <ol className="mt-1 ml-4 list-decimal">
                        {selectedStudent.emergencyPlan.stressBurnoutPlan.recoveryProtocol.map((step, index) => (
                          <li key={index}>{step}</li>
                        ))}
                      </ol>
                    </div>
                    <div>
                      <span className="text-gray-600">Support System:</span>
                      <span className="ml-2">{selectedStudent.emergencyPlan.stressBurnoutPlan.supportSystem}</span>
                    </div>
                  </div>
                </div>

                {/* Life Disruption Plan */}
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h5 className="font-medium text-gray-900 mb-3">If Major Life Disruption Occurs</h5>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-600">Contingency Study:</span>
                      <span className="ml-2">{selectedStudent.emergencyPlan.lifeDisruptionPlan.contingencyStudy}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Support Network:</span>
                      <span className="ml-2">{selectedStudent.emergencyPlan.lifeDisruptionPlan.supportNetwork}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Academic Safety Net:</span>
                      <span className="ml-2">{selectedStudent.emergencyPlan.lifeDisruptionPlan.academicSafetyNet}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Batch Analytics View
  const BatchAnalytics = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Batch Performance Analytics</h2>
          
          {/* Common Weaknesses Analysis */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Common Weakness Patterns</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-red-50 rounded-lg p-4">
                <h4 className="font-medium text-red-900 mb-2">Critical Weaknesses</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Para Jumbles</span>
                    <span className="font-semibold">80% students</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Complex Arrangements</span>
                    <span className="font-semibold">65% students</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-orange-50 rounded-lg p-4">
                <h4 className="font-medium text-orange-900 mb-2">Moderate Weaknesses</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Quantitative Basics</span>
                    <span className="font-semibold">55% students</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Time Management</span>
                    <span className="font-semibold">45% students</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 rounded-lg p-4">
                <h4 className="font-medium text-yellow-900 mb-2">Minor Weaknesses</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Vocabulary Context</span>
                    <span className="font-semibold">30% students</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Current Affairs</span>
                    <span className="font-semibold">25% students</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Strategy Effectiveness */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">Strategy Effectiveness Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium mb-3">Most Effective Strategies</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Section-wise OMR bubbling (95% adoption)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Starting with strongest section (88% success)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">30-second decision rule (75% improvement)</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium mb-3">Strategies Needing Refinement</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-orange-600" />
                    <span className="text-sm">Risk-taking threshold (36% success rate)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-orange-600" />
                    <span className="text-sm">Time allocation adjustments (40% over-time)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-orange-600" />
                    <span className="text-sm">Skip strategy criteria (25% wrong skips)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Support System Effectiveness */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support System Utilization</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-indigo-600">85%</div>
                <div className="text-sm text-gray-600">Regular mentor meetings</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">92%</div>
                <div className="text-sm text-gray-600">Study partner engagement</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">78%</div>
                <div className="text-sm text-gray-600">Group study participation</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">95%</div>
                <div className="text-sm text-gray-600">Progress tracking compliance</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Settings View
  const SettingsView = () => {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Admin Settings</h2>
          
          <div className="space-y-6">
            {/* Notification Settings */}
            <div>
              <h3 className="text-lg font-medium mb-3">Notification Preferences</h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span>Alert when student score drops below threshold</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span>Weekly batch performance summary</span>
                </label>
                <label className="flex items-center space-x-3">
                  <input type="checkbox" className="rounded" />
                  <span>Emergency plan activations</span>
                </label>
              </div>
            </div>

            {/* Threshold Settings */}
            <div>
              <h3 className="text-lg font-medium mb-3">Performance Thresholds</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    At-Risk Score Threshold
                  </label>
                  <input
                    type="number"
                    className="w-full border rounded-lg px-3 py-2"
                    defaultValue="60"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Score for Batch
                  </label>
                  <input
                    type="number"
                    className="w-full border rounded-lg px-3 py-2"
                    defaultValue="85"
                  />
                </div>
              </div>
            </div>

            {/* Export Settings */}
            <div>
              <h3 className="text-lg font-medium mb-3">Data Export</h3>
              <div className="flex space-x-3">
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Export Batch Report</span>
                </button>
                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center space-x-2">
                  <FileText className="w-4 h-4" />
                  <span>Generate PDF Summary</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Mock Test Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Comprehensive student performance analysis and tracking</p>
            </div>
            {onBack && (
              <button
                onClick={onBack}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Back
              </button>
            )}
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-6 border-b">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'analytics', label: 'Batch Analytics', icon: PieChart },
              { id: 'settings', label: 'Settings', icon: Settings }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id)}
                className={`pb-3 px-1 border-b-2 font-medium transition-colors flex items-center space-x-2 ${
                  activeView === tab.id
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        {activeView === 'overview' && (
          <div className="mb-6 bg-white rounded-xl shadow-lg p-4">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
              
              <select
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">All Batches</option>
                <option value="Lightians 2026">Lightians 2026</option>
                <option value="Lightians 2025">Lightians 2025</option>
              </select>

              <button className="flex items-center space-x-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                <span>More Filters</span>
              </button>
            </div>
          </div>
        )}

        {/* Main Content */}
        {activeView === 'overview' && !selectedStudent && <OverviewDashboard />}
        {activeView === 'overview' && selectedStudent && <DetailedStudentAnalysis />}
        {activeView === 'analytics' && <BatchAnalytics />}
        {activeView === 'settings' && <SettingsView />}
        {activeView === 'detailed' && <DetailedStudentAnalysis />}
      </div>
    </div>
  );
};

export default MockTestAdminDashboard;
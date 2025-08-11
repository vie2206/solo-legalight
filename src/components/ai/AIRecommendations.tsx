import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Target, 
  TrendingUp, 
  Clock, 
  BookOpen, 
  Zap,
  Star,
  Award,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Lightbulb,
  BarChart3,
  Calendar,
  Play,
  Users,
  Trophy,
  Eye,
  Heart,
  Sparkles,
  RefreshCw,
  Filter
} from 'lucide-react';
import { claudeAIService } from '../../services/claudeAIService';

interface Recommendation {
  id: string;
  type: 'study_focus' | 'time_management' | 'skill_building' | 'practice' | 'motivation' | 'strategy';
  priority: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  reasoning: string;
  actionItems: string[];
  estimatedImpact: number; // 1-10 scale
  timeToComplete: string;
  difficulty: 'easy' | 'moderate' | 'challenging';
  subjects?: string[];
  confidence: number; // AI confidence 0-100
  tags: string[];
  relatedInsights: string[];
}

interface UserPerformanceData {
  overallScore: number;
  subjectScores: {
    [subject: string]: {
      accuracy: number;
      timeSpent: number;
      improvement: number;
      rank: number;
    };
  };
  studyPatterns: {
    preferredTime: string;
    averageSession: number;
    consistency: number;
    breakFrequency: number;
  };
  weaknesses: string[];
  strengths: string[];
  goals: {
    targetScore: number;
    examDate: string;
    currentProjection: number;
  };
}

const AIRecommendations: React.FC = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'priority' | 'impact' | 'time'>('priority');
  
  const [userPerformance] = useState<UserPerformanceData>({
    overallScore: 78,
    subjectScores: {
      'Legal Reasoning': { accuracy: 89, timeSpent: 8.5, improvement: 12, rank: 156 },
      'Reading Comprehension': { accuracy: 85, timeSpent: 7.2, improvement: 8, rank: 234 },
      'Current Affairs': { accuracy: 68, timeSpent: 4.1, improvement: -5, rank: 1847 },
      'Logical Reasoning': { accuracy: 81, timeSpent: 6.3, improvement: 3, rank: 567 },
      'Quantitative': { accuracy: 62, timeSpent: 2.1, improvement: 15, rank: 2341 }
    },
    studyPatterns: {
      preferredTime: 'morning',
      averageSession: 45,
      consistency: 85,
      breakFrequency: 25
    },
    weaknesses: ['Current Affairs', 'Quantitative Techniques', 'Time Management'],
    strengths: ['Legal Reasoning', 'Reading Comprehension', 'Consistency'],
    goals: {
      targetScore: 85,
      examDate: '2024-12-15',
      currentProjection: 78
    }
  });

  useEffect(() => {
    generateRecommendations();
  }, []);

  const generateRecommendations = async () => {
    setIsLoading(true);
    try {
      // In production, this would call Claude AI service
      // const aiRecommendations = await claudeAIService.getPersonalizedRecommendations(userPerformance);
      
      // Mock AI-generated recommendations
      const mockRecommendations: Recommendation[] = [
        {
          id: 'rec_001',
          type: 'study_focus',
          priority: 'critical',
          title: 'Urgent: Boost Current Affairs Performance',
          description: 'Your Current Affairs score (68%) is significantly below your target. This subject alone could impact your overall rank by 500+ positions.',
          reasoning: 'Analysis shows you spend only 4.1 hours weekly on Current Affairs vs recommended 8+ hours. Your accuracy has dropped 5% recently.',
          actionItems: [
            'Increase daily Current Affairs study time to 60 minutes',
            'Subscribe to a comprehensive current affairs digest',
            'Take weekly Current Affairs mock tests',
            'Create a current affairs journal with key points'
          ],
          estimatedImpact: 9,
          timeToComplete: '2-3 weeks',
          difficulty: 'moderate',
          subjects: ['Current Affairs'],
          confidence: 95,
          tags: ['urgent', 'score_improvement', 'time_allocation'],
          relatedInsights: [
            'Students who dedicate 8+ hours weekly to Current Affairs see 15-20% score improvement',
            'Your strong Legal Reasoning skills can help with legal current affairs topics'
          ]
        },
        {
          id: 'rec_002',
          type: 'strategy',
          priority: 'high',
          title: 'Optimize Study Schedule for Peak Performance',
          description: 'Your morning study pattern aligns with peak cognitive performance, but you\'re not maximizing this advantage.',
          reasoning: 'Data shows you perform 23% better in morning sessions. However, you\'re not scheduling your most challenging subjects (Current Affairs, Quantitative) during this time.',
          actionItems: [
            'Schedule Current Affairs and Quantitative in the first 2 hours of study',
            'Use afternoon sessions for review and Reading Comprehension',
            'Keep Legal Reasoning for confidence building during low-energy periods',
            'Implement the 90-minute focused study blocks'
          ],
          estimatedImpact: 7,
          timeToComplete: '1 week',
          difficulty: 'easy',
          confidence: 88,
          tags: ['time_management', 'optimization', 'productivity'],
          relatedInsights: [
            'Circadian rhythm research shows peak analytical thinking occurs 2-4 hours after waking',
            'Students using optimized schedules see 12% improvement in retention'
          ]
        },
        {
          id: 'rec_003',
          type: 'skill_building',
          priority: 'high',
          title: 'Quantitative Techniques Crash Course',
          description: 'Your Quantitative score (62%) has significant room for improvement and represents low-hanging fruit for quick gains.',
          reasoning: 'Only 2.1 hours weekly investment but showing 15% improvement trend. This suggests high learning velocity in this subject.',
          actionItems: [
            'Increase Quantitative study time to 5 hours weekly',
            'Focus on high-frequency question types: Percentages, Ratios, Basic Algebra',
            'Use spaced repetition for formula memorization',
            'Take daily 15-minute Quantitative mini-tests'
          ],
          estimatedImpact: 8,
          timeToComplete: '3-4 weeks',
          difficulty: 'moderate',
          subjects: ['Quantitative'],
          confidence: 82,
          tags: ['quick_wins', 'fundamentals', 'practice_intensive'],
          relatedInsights: [
            'Quantitative improvement often shows exponential growth patterns',
            'Students focusing on high-frequency topics see 25% faster improvement'
          ]
        },
        {
          id: 'rec_004',
          type: 'practice',
          priority: 'medium',
          title: 'Implement Strategic Mock Test Schedule',
          description: 'Your current mock test frequency isn\'t optimal for identifying improvement areas and building exam stamina.',
          reasoning: 'Mock test analysis shows you need more exposure to time pressure and mixed-subject question flow.',
          actionItems: [
            'Take full-length mocks twice weekly (Sunday & Wednesday)',
            'Take subject-wise mini mocks daily (20-30 minutes)',
            'Analyze each mock within 24 hours using our AI analysis tool',
            'Focus next week\'s study based on mock test insights'
          ],
          estimatedImpact: 6,
          timeToComplete: 'Ongoing',
          difficulty: 'easy',
          confidence: 78,
          tags: ['testing', 'analysis', 'time_management'],
          relatedInsights: [
            'Students taking 2+ full mocks weekly score 8% higher on average',
            'Mock test analysis is 3x more effective when done within 24 hours'
          ]
        },
        {
          id: 'rec_005',
          type: 'motivation',
          priority: 'medium',
          title: 'Leverage Your Consistency Superpower',
          description: 'Your 85% consistency rate is exceptional. Build on this strength to accelerate improvement in weak areas.',
          reasoning: 'High consistency correlates with sustained improvement. Your strong habit formation can be applied strategically.',
          actionItems: [
            'Create micro-habits for Current Affairs (5 minutes daily news reading)',
            'Use habit stacking: Attach new Quantitative practice to existing Legal Reasoning routine',
            'Set up accountability system with study buddy or mentor',
            'Celebrate weekly consistency wins to maintain motivation'
          ],
          estimatedImpact: 5,
          timeToComplete: '2 weeks',
          difficulty: 'easy',
          confidence: 71,
          tags: ['habits', 'psychology', 'motivation'],
          relatedInsights: [
            'Consistent students maintain improvement momentum 3x longer',
            'Micro-habits have 90% higher success rate than dramatic changes'
          ]
        },
        {
          id: 'rec_006',
          type: 'time_management',
          priority: 'low',
          title: 'Fine-tune Break Intervals for Better Focus',
          description: 'Your 25-minute break frequency aligns with proven productivity methods, but slight optimization could boost focus.',
          reasoning: 'Research suggests your study sessions could benefit from slightly longer focused periods given your high consistency.',
          actionItems: [
            'Extend focus blocks to 30-35 minutes for complex subjects',
            'Keep 25-minute blocks for review and easier topics',
            'Use 5-minute active breaks (stretching, walking)',
            'Implement 15-minute longer break after every 3 study blocks'
          ],
          estimatedImpact: 4,
          timeToComplete: '1 week',
          difficulty: 'easy',
          confidence: 65,
          tags: ['focus', 'breaks', 'productivity'],
          relatedInsights: [
            'Optimal break timing varies by individual - your consistency suggests you can handle longer blocks',
            'Active breaks improve focus recovery by 40% compared to passive breaks'
          ]
        }
      ];

      setRecommendations(mockRecommendations);
    } catch (error) {
      console.error('Failed to generate recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-green-100 text-green-800 border-green-300';
    }
  };

  const getTypeIcon = (type: string) => {
    const iconProps = { className: "w-5 h-5" };
    switch (type) {
      case 'study_focus': return <Target {...iconProps} />;
      case 'time_management': return <Clock {...iconProps} />;
      case 'skill_building': return <TrendingUp {...iconProps} />;
      case 'practice': return <Play {...iconProps} />;
      case 'motivation': return <Heart {...iconProps} />;
      case 'strategy': return <Brain {...iconProps} />;
      default: return <Lightbulb {...iconProps} />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600';
      case 'moderate': return 'text-yellow-600';
      default: return 'text-red-600';
    }
  };

  const filteredRecommendations = recommendations.filter(rec => 
    selectedFilter === 'all' || rec.type === selectedFilter || rec.priority === selectedFilter
  );

  const sortedRecommendations = [...filteredRecommendations].sort((a, b) => {
    switch (sortBy) {
      case 'priority':
        const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder];
      case 'impact':
        return b.estimatedImpact - a.estimatedImpact;
      case 'time':
        return a.timeToComplete.localeCompare(b.timeToComplete);
      default:
        return 0;
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Brain className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Analyzing Your Performance</h2>
          <p className="text-gray-600 mb-4">Claude AI is generating personalized recommendations...</p>
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
              <h1 className="text-2xl font-bold text-gray-900">AI Recommendations</h1>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Claude AI
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={generateRecommendations}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh Analysis
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Performance Overview */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Performance Analysis</h2>
              <p className="text-blue-100">Based on your study patterns and recent performance</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{userPerformance.overallScore}%</div>
              <div className="text-blue-200">Current Score</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5" />
                <span className="font-semibold">Target Gap</span>
              </div>
              <div className="text-2xl font-bold">{userPerformance.goals.targetScore - userPerformance.overallScore}%</div>
              <div className="text-sm text-blue-200">points to goal</div>
            </div>
            
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5" />
                <span className="font-semibold">Projection</span>
              </div>
              <div className="text-2xl font-bold">{userPerformance.goals.currentProjection}%</div>
              <div className="text-sm text-blue-200">expected score</div>
            </div>
            
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5" />
                <span className="font-semibold">Time Left</span>
              </div>
              <div className="text-2xl font-bold">25</div>
              <div className="text-sm text-blue-200">days to exam</div>
            </div>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">Filter:</span>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
              >
                <option value="all">All Recommendations</option>
                <option value="critical">Critical Priority</option>
                <option value="high">High Priority</option>
                <option value="study_focus">Study Focus</option>
                <option value="time_management">Time Management</option>
                <option value="skill_building">Skill Building</option>
                <option value="practice">Practice</option>
                <option value="motivation">Motivation</option>
                <option value="strategy">Strategy</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
              >
                <option value="priority">Priority</option>
                <option value="impact">Impact Score</option>
                <option value="time">Time to Complete</option>
              </select>
            </div>

            <div className="ml-auto text-sm text-gray-600">
              {filteredRecommendations.length} recommendations
            </div>
          </div>
        </div>

        {/* Recommendations List */}
        <div className="space-y-6">
          {sortedRecommendations.map((recommendation) => (
            <div key={recommendation.id} className="bg-white rounded-xl shadow-lg border-l-4 border-blue-500 overflow-hidden">
              {/* Header */}
              <div className="p-6 pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      recommendation.priority === 'critical' ? 'bg-red-100 text-red-600' :
                      recommendation.priority === 'high' ? 'bg-orange-100 text-orange-600' :
                      recommendation.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {getTypeIcon(recommendation.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">{recommendation.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(recommendation.priority)}`}>
                          {recommendation.priority.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-3">{recommendation.description}</p>
                      
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <BarChart3 className="w-4 h-4" />
                          <span>Impact: {recommendation.estimatedImpact}/10</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{recommendation.timeToComplete}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className={`w-4 h-4 ${getDifficultyColor(recommendation.difficulty)}`} />
                          <span className={getDifficultyColor(recommendation.difficulty)}>
                            {recommendation.difficulty}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Brain className="w-4 h-4" />
                          <span>{recommendation.confidence}% confidence</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Reasoning */}
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold text-blue-900">AI Analysis</span>
                  </div>
                  <p className="text-blue-800 text-sm leading-relaxed">{recommendation.reasoning}</p>
                </div>

                {/* Action Items */}
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Action Items
                  </h4>
                  <div className="space-y-2">
                    {recommendation.actionItems.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg">
                        <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                          {index + 1}
                        </div>
                        <p className="text-gray-800 leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Insights */}
                {recommendation.relatedInsights.length > 0 && (
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-purple-600" />
                      <span className="font-semibold text-purple-900">Research Insights</span>
                    </div>
                    <div className="space-y-1">
                      {recommendation.relatedInsights.map((insight, index) => (
                        <p key={index} className="text-purple-800 text-sm leading-relaxed">
                          • {insight}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="bg-gray-50 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {recommendation.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                    <Play className="w-4 h-4" />
                    Start Implementation
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl shadow-lg p-8 mt-8 text-center">
          <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Level Up?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            These AI-powered recommendations are tailored specifically to your learning patterns and performance data. 
            Implementing just the top 3 recommendations could boost your score by 8-12 points.
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Create Study Plan
            </button>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-8 py-3 rounded-lg font-semibold flex items-center gap-2">
              <Eye className="w-5 h-5" />
              View Progress
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIRecommendations;
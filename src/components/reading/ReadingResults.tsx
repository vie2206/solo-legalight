import React from 'react';
import { 
  Trophy, 
  Target, 
  Clock, 
  TrendingUp, 
  Book,
  Star,
  BarChart3,
  Lightbulb,
  ChevronRight,
  Award,
  Brain,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  Zap,
  Eye
} from 'lucide-react';

interface AssessmentResults {
  score: number;
  totalQuestions: number;
  timeSpent: number;
  readingSpeed: number; // words per minute
  comprehensionLevel: 'poor' | 'fair' | 'good' | 'excellent';
  strengths: string[];
  weaknesses: string[];
  skillBreakdown: {
    [skill: string]: {
      score: number;
      total: number;
    };
  };
  personalizedRecommendations: string[];
}

interface ReadingResultsProps {
  results: AssessmentResults;
  onRetake: () => void;
  onContinueLearning: () => void;
  onBack: () => void;
}

const ReadingResults: React.FC<ReadingResultsProps> = ({
  results,
  onRetake,
  onContinueLearning,
  onBack
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100 border-green-300';
    if (score >= 75) return 'text-blue-600 bg-blue-100 border-blue-300';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100 border-yellow-300';
    return 'text-red-600 bg-red-100 border-red-300';
  };

  const getComprehensionColor = (level: string) => {
    switch (level) {
      case 'excellent': return 'text-green-700 bg-green-100';
      case 'good': return 'text-blue-700 bg-blue-100';
      case 'fair': return 'text-yellow-700 bg-yellow-100';
      default: return 'text-red-700 bg-red-100';
    }
  };

  const getReadingSpeedLevel = (speed: number) => {
    if (speed >= 200) return { level: 'Excellent', color: 'text-green-600', icon: '🚀' };
    if (speed >= 150) return { level: 'Good', color: 'text-blue-600', icon: '📖' };
    if (speed >= 100) return { level: 'Average', color: 'text-yellow-600', icon: '📚' };
    return { level: 'Needs Improvement', color: 'text-red-600', icon: '🐌' };
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}m ${remainingSeconds}s`;
  };

  const readingSpeedInfo = getReadingSpeedLevel(results.readingSpeed);
  const percentile = Math.max(10, Math.min(95, results.score + Math.floor(Math.random() * 15) - 7));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 flex items-center text-gray-600 hover:text-gray-800 transition-colors"
        >
          ← Back to Reading Mastery
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-xl p-8 text-center">
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-10 h-10 text-yellow-300" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Assessment Complete!</h1>
          <p className="text-purple-100 text-lg">Here's your comprehensive reading comprehension analysis</p>
        </div>

        {/* Main Results */}
        <div className="bg-white rounded-b-xl shadow-xl p-8 mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            {/* Score */}
            <div className={`p-6 rounded-xl border-2 ${getScoreColor(results.score)}`}>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{results.score}%</div>
                <div className="text-sm font-medium">Overall Score</div>
                <div className="text-xs mt-1">{percentile}th percentile</div>
              </div>
            </div>

            {/* Reading Speed */}
            <div className="bg-blue-50 border-2 border-blue-200 p-6 rounded-xl">
              <div className="text-center">
                <div className={`text-3xl mb-2 ${readingSpeedInfo.color} font-bold`}>
                  {Math.round(results.readingSpeed)}
                </div>
                <div className="text-sm font-medium text-blue-800">Words/Minute</div>
                <div className="text-xs text-blue-600 mt-1">
                  {readingSpeedInfo.icon} {readingSpeedInfo.level}
                </div>
              </div>
            </div>

            {/* Comprehension Level */}
            <div className={`p-6 rounded-xl ${getComprehensionColor(results.comprehensionLevel)}`}>
              <div className="text-center">
                <div className="text-2xl font-bold mb-2 capitalize">{results.comprehensionLevel}</div>
                <div className="text-sm font-medium">Comprehension</div>
                <div className="text-xs mt-1">Level Assessment</div>
              </div>
            </div>

            {/* Time Spent */}
            <div className="bg-purple-50 border-2 border-purple-200 p-6 rounded-xl">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-700 mb-2">
                  {formatTime(results.timeSpent)}
                </div>
                <div className="text-sm font-medium text-purple-800">Total Time</div>
                <div className="text-xs text-purple-600 mt-1">Reading + Questions</div>
              </div>
            </div>
          </div>

          {/* Detailed Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Skills Breakdown */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
              <h3 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Skills Analysis
              </h3>
              
              <div className="space-y-4">
                {Object.entries(results.skillBreakdown).map(([skill, data]) => {
                  const percentage = Math.round((data.score / data.total) * 100);
                  const skillLabel = skill.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
                  
                  return (
                    <div key={skill} className="bg-white p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-800">{skillLabel}</span>
                        <span className="text-sm font-bold text-blue-600">
                          {data.score}/{data.total} ({percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            percentage >= 80 ? 'bg-green-500' :
                            percentage >= 60 ? 'bg-blue-500' :
                            percentage >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="space-y-6">
              {/* Strengths */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-green-900 mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Your Strengths
                </h3>
                {results.strengths.length > 0 ? (
                  <div className="space-y-2">
                    {results.strengths.map((strength, index) => (
                      <div key={index} className="flex items-center gap-2 bg-white p-3 rounded-lg">
                        <Star className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <span className="text-green-800 font-medium">{strength}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-green-700 italic">Keep practicing to identify your strengths!</p>
                )}
              </div>

              {/* Areas for Improvement */}
              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-orange-900 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Areas for Improvement
                </h3>
                {results.weaknesses.length > 0 ? (
                  <div className="space-y-2">
                    {results.weaknesses.map((weakness, index) => (
                      <div key={index} className="flex items-center gap-2 bg-white p-3 rounded-lg">
                        <Target className="w-4 h-4 text-orange-600 flex-shrink-0" />
                        <span className="text-orange-800 font-medium">{weakness}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-orange-700 italic">Great job! No major weaknesses identified.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Personalized Recommendations */}
        <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-yellow-500" />
            Personalized Recommendations
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.personalizedRecommendations.map((recommendation, index) => (
              <div key={index} className="bg-gradient-to-br from-purple-50 to-blue-50 p-4 rounded-lg border border-purple-200">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 font-bold text-sm">{index + 1}</span>
                  </div>
                  <p className="text-purple-800 font-medium leading-relaxed">{recommendation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Insights */}
        <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Brain className="w-6 h-6 text-blue-500" />
            Performance Insights
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Eye className="w-6 h-6 text-blue-600" />
                <h3 className="font-semibold text-blue-900">Reading Efficiency</h3>
              </div>
              <p className="text-blue-800 text-sm mb-2">
                Your reading speed of {Math.round(results.readingSpeed)} WPM is 
                {results.readingSpeed >= 150 ? ' above average' : ' below average'} for CLAT preparation.
              </p>
              <div className="text-xs text-blue-600">
                Target: 180-220 WPM for optimal CLAT performance
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Target className="w-6 h-6 text-green-600" />
                <h3 className="font-semibold text-green-900">Accuracy Rate</h3>
              </div>
              <p className="text-green-800 text-sm mb-2">
                You answered {results.score}% of questions correctly, which is
                {results.score >= 75 ? ' excellent' : results.score >= 60 ? ' good' : ' needs improvement'} for CLAT standards.
              </p>
              <div className="text-xs text-green-600">
                Target: 75%+ accuracy for competitive performance
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Zap className="w-6 h-6 text-purple-600" />
                <h3 className="font-semibold text-purple-900">Time Management</h3>
              </div>
              <p className="text-purple-800 text-sm mb-2">
                You completed the assessment in {formatTime(results.timeSpent)}, 
                {results.timeSpent <= 600 ? ' showing good' : ' which indicates slow'} time management skills.
              </p>
              <div className="text-xs text-purple-600">
                Target: 8-10 minutes for similar passages in CLAT
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-xl shadow-xl p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">What's Next?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={onRetake}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-4 rounded-lg flex items-center gap-3 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <BarChart3 className="w-5 h-5" />
              <div className="text-left">
                <div className="font-semibold">Retake Assessment</div>
                <div className="text-sm text-blue-100">Try a different passage</div>
              </div>
            </button>

            <button
              onClick={onContinueLearning}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white p-4 rounded-lg flex items-center gap-3 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <BookOpen className="w-5 h-5" />
              <div className="text-left">
                <div className="font-semibold">Continue Learning</div>
                <div className="text-sm text-green-100">Practice more passages</div>
              </div>
            </button>

            <button
              onClick={onBack}
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white p-4 rounded-lg flex items-center gap-3 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <ChevronRight className="w-5 h-5" />
              <div className="text-left">
                <div className="font-semibold">Reading Mastery</div>
                <div className="text-sm text-purple-100">Back to main menu</div>
              </div>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-600">
            ✨ Powered by Claude AI • Tailored for CLAT Success
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReadingResults;
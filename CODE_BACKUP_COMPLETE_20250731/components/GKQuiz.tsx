import React, { useState, useEffect } from 'react';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  LightBulbIcon,
  ClockIcon,
  TrophyIcon,
  BookOpenIcon,
  StarIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import { gkQuestionsDatabase } from '../data/GKQuestionsDatabase';

// Types
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  points: number;
  explanation: string;
  source: string;
}

interface QuizState {
  currentQuestion: number;
  selectedAnswers: { [key: number]: number };
  showExplanation: boolean;
  timeStarted: Date;
  timePerQuestion: { [key: number]: number };
  score: number;
  isCompleted: boolean;
}

interface GKQuizProps {
  user: User | null;
  onBack: () => void;
}

const GKQuiz: React.FC<GKQuizProps> = ({ user, onBack }) => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    selectedAnswers: {},
    showExplanation: false,
    timeStarted: new Date(),
    timePerQuestion: {},
    score: 0,
    isCompleted: false
  });

  const [timeElapsed, setTimeElapsed] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState<Date>(new Date());

  // Categories and difficulties
  const categories = ['all', ...new Set(gkQuestionsDatabase.map(q => q.category))];
  const difficulties = ['all', 'beginner', 'intermediate', 'advanced'];

  // Filter questions based on selection
  useEffect(() => {
    let filtered = gkQuestionsDatabase;
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(q => q.category === selectedCategory);
    }
    
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(q => q.difficulty === selectedDifficulty);
    }
    
    // Shuffle questions for variety
    filtered = [...filtered].sort(() => Math.random() - 0.5);
    
    setFilteredQuestions(filtered);
  }, [selectedCategory, selectedDifficulty]);

  // Timer for overall quiz
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (quizStarted && !quizState.isCompleted) {
      interval = setInterval(() => {
        setTimeElapsed(Math.floor((new Date().getTime() - quizState.timeStarted.getTime()) / 1000));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [quizStarted, quizState.isCompleted, quizState.timeStarted]);

  const startQuiz = () => {
    setQuizStarted(true);
    setQuestionStartTime(new Date());
    setQuizState(prev => ({
      ...prev,
      timeStarted: new Date()
    }));
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (quizState.showExplanation) return;

    const currentQuestionTime = Math.floor((new Date().getTime() - questionStartTime.getTime()) / 1000);
    
    setQuizState(prev => ({
      ...prev,
      selectedAnswers: {
        ...prev.selectedAnswers,
        [prev.currentQuestion]: answerIndex
      },
      timePerQuestion: {
        ...prev.timePerQuestion,
        [prev.currentQuestion]: currentQuestionTime
      },
      showExplanation: true
    }));
  };

  const calculateScore = () => {
    let totalScore = 0;
    let correctAnswers = 0;
    
    Object.entries(quizState.selectedAnswers).forEach(([questionIndex, selectedAnswer]) => {
      const question = filteredQuestions[parseInt(questionIndex)];
      if (question && selectedAnswer === question.correct) {
        totalScore += question.points;
        correctAnswers++;
      }
    });
    
    return { totalScore, correctAnswers };
  };

  const nextQuestion = () => {
    if (quizState.currentQuestion < filteredQuestions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        showExplanation: false
      }));
      setQuestionStartTime(new Date());
    } else {
      // Quiz completed
      const { totalScore } = calculateScore();
      setQuizState(prev => ({
        ...prev,
        score: totalScore,
        isCompleted: true
      }));
    }
  };

  const previousQuestion = () => {
    if (quizState.currentQuestion > 0) {
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion - 1,
        showExplanation: prev.selectedAnswers[prev.currentQuestion - 1] !== undefined
      }));
    }
  };

  const restartQuiz = () => {
    setQuizState({
      currentQuestion: 0,
      selectedAnswers: {},
      showExplanation: false,
      timeStarted: new Date(),
      timePerQuestion: {},
      score: 0,
      isCompleted: false
    });
    setTimeElapsed(0);
    setQuizStarted(false);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  // Quiz Setup Screen
  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={onBack}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
                </button>
                <div className="flex items-center space-x-3">
                  <BookOpenIcon className="h-8 w-8 text-blue-600" />
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">CLAT GK Quiz</h1>
                    <p className="text-sm text-gray-600">Test your General Knowledge for CLAT</p>
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                Welcome, {user?.name}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <TrophyIcon className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Ready to Test Your Knowledge?</h2>
              <p className="text-lg text-gray-600">Choose your preferences and start the quiz</p>
            </div>

            {/* Quiz Settings */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty
                </label>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty === 'all' ? 'All Difficulties' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quiz Info */}
            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div>
                  <BookOpenIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-900">{filteredQuestions.length}</div>
                  <div className="text-sm text-blue-700">Questions</div>
                </div>
                <div>
                  <ClockIcon className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-900">~{Math.ceil(filteredQuestions.length * 1.5)} min</div>
                  <div className="text-sm text-green-700">Estimated Time</div>
                </div>
                <div>
                  <StarIcon className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-yellow-900">
                    {filteredQuestions.reduce((sum, q) => sum + q.points, 0)}
                  </div>
                  <div className="text-sm text-yellow-700">Total Points</div>
                </div>
              </div>
            </div>

            {/* Start Button */}
            <div className="text-center">
              <button
                onClick={startQuiz}
                disabled={filteredQuestions.length === 0}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg text-lg transition-colors"
              >
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Results Screen
  if (quizState.isCompleted) {
    const { totalScore, correctAnswers } = calculateScore();
    const totalQuestions = filteredQuestions.length;
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    const totalPossiblePoints = filteredQuestions.reduce((sum, q) => sum + q.points, 0);

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <TrophyIcon className="h-20 w-20 text-yellow-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Completed!</h2>
              <p className="text-lg text-gray-600">Here are your results</p>
            </div>

            {/* Score Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-blue-50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-blue-900">{correctAnswers}/{totalQuestions}</div>
                <div className="text-sm text-blue-700">Correct Answers</div>
              </div>
              <div className="bg-green-50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-green-900">{percentage}%</div>
                <div className="text-sm text-green-700">Accuracy</div>
              </div>
              <div className="bg-yellow-50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-yellow-900">{totalScore}</div>
                <div className="text-sm text-yellow-700">Points Scored</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-6 text-center">
                <div className="text-3xl font-bold text-purple-900">{formatTime(timeElapsed)}</div>
                <div className="text-sm text-purple-700">Time Taken</div>
              </div>
            </div>

            {/* Performance Badge */}
            <div className="text-center mb-8">
              <div className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold ${
                percentage >= 90 ? 'bg-green-100 text-green-800' :
                percentage >= 75 ? 'bg-blue-100 text-blue-800' :
                percentage >= 60 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {percentage >= 90 ? '🏆 Excellent!' :
                 percentage >= 75 ? '🌟 Great Job!' :
                 percentage >= 60 ? '👍 Good Work!' :
                 '📚 Keep Practicing!'}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={restartQuiz}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                Retake Quiz
              </button>
              <button
                onClick={onBack}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Interface
  const currentQuestion = filteredQuestions[quizState.currentQuestion];
  const isAnswered = quizState.selectedAnswers[quizState.currentQuestion] !== undefined;
  const selectedAnswer = quizState.selectedAnswers[quizState.currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Question {quizState.currentQuestion + 1} of {filteredQuestions.length}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <ClockIcon className="h-4 w-4" />
                <span>{formatTime(timeElapsed)}</span>
              </div>
              <div className="text-sm text-gray-600">
                Score: {calculateScore().totalScore}
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((quizState.currentQuestion + 1) / filteredQuestions.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Question Header */}
          <div className="bg-gray-50 px-6 py-4 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(currentQuestion.difficulty)}`}>
                  {currentQuestion.difficulty.charAt(0).toUpperCase() + currentQuestion.difficulty.slice(1)}
                </span>
                <span className="text-sm text-gray-600">{currentQuestion.category}</span>
              </div>
              <div className="text-sm font-medium text-blue-600">
                {currentQuestion.points} points
              </div>
            </div>
          </div>

          {/* Question */}
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 leading-relaxed">
              {currentQuestion.question}
            </h2>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQuestion.correct;
                const showResult = quizState.showExplanation;

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={quizState.showExplanation}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                      showResult
                        ? isCorrect
                          ? 'border-green-500 bg-green-50 text-green-800'
                          : isSelected
                          ? 'border-red-500 bg-red-50 text-red-800'
                          : 'border-gray-200 bg-gray-50'
                        : isSelected
                        ? 'border-blue-500 bg-blue-50 text-blue-800'
                        : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex-1">{option}</span>
                      {showResult && (
                        <div className="ml-3">
                          {isCorrect ? (
                            <CheckCircleIcon className="h-5 w-5 text-green-600" />
                          ) : isSelected ? (
                            <XCircleIcon className="h-5 w-5 text-red-600" />
                          ) : null}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {quizState.showExplanation && (
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <LightBulbIcon className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-blue-900 mb-1">Explanation</h4>
                    <p className="text-blue-800 text-sm mb-2">{currentQuestion.explanation}</p>
                    <p className="text-blue-600 text-xs">Source: {currentQuestion.source}</p>
                  </div>  
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
            <button
              onClick={previousQuestion}
              disabled={quizState.currentQuestion === 0}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-700 rounded-lg transition-colors"
            >
              <ChevronLeftIcon className="h-4 w-4" />
              <span>Previous</span>
            </button>

            {isAnswered && (
              <button
                onClick={nextQuestion}
                className="flex items-center space-x-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <span>{quizState.currentQuestion === filteredQuestions.length - 1 ? 'Finish Quiz' : 'Next'}</span>
                {quizState.currentQuestion !== filteredQuestions.length - 1 && (
                  <ChevronRightIcon className="h-4 w-4" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GKQuiz;
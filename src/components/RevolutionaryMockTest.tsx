import React, { useState, useEffect, useCallback } from 'react';
import { 
  Clock, Trophy, AlertTriangle, CheckCircle, XCircle, 
  Brain, Target, Flag, ArrowLeft, ArrowRight, RotateCw,
  Play, Pause, Square, Eye, EyeOff, Bookmark, BookmarkCheck,
  BarChart3, TrendingUp, Award, Zap, Timer, Activity
} from 'lucide-react';

interface Question {
  id: string;
  section: string;
  type: 'mcq' | 'numerical';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  topic: string;
  marks: number;
  negativeMarks: number;
}

interface MockTestData {
  id: string;
  title: string;
  duration: number; // in minutes
  totalQuestions: number;
  maxMarks: number;
  sections: {
    name: string;
    questions: number;
    timeLimit: number;
  }[];
  questions: Question[];
}

interface RevolutionaryMockTestProps {
  testData: MockTestData;
  onTestComplete: (result: any) => void;
  onBack: () => void;
}

const RevolutionaryMockTest: React.FC<RevolutionaryMockTestProps> = ({ 
  testData, 
  onTestComplete, 
  onBack 
}) => {
  const [testState, setTestState] = useState<'instructions' | 'active' | 'paused' | 'completed'>('instructions');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(testData.duration * 60); // Convert to seconds
  const [answers, setAnswers] = useState<Record<string, string | number>>({});
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());
  const [sectionTime, setSectionTime] = useState<Record<string, number>>({});
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [visitedQuestions, setVisitedQuestions] = useState<Set<number>>(new Set([0]));

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (testState === 'active' && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleTestComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [testState, timeRemaining]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startTest = () => {
    setTestState('active');
    setStartTime(new Date());
  };

  const pauseTest = () => {
    setTestState('paused');
  };

  const resumeTest = () => {
    setTestState('active');
  };

  const handleTestComplete = useCallback(() => {
    setTestState('completed');
    const endTime = new Date();
    
    // Calculate results
    let correctAnswers = 0;
    let incorrectAnswers = 0;
    let unattempted = 0;
    let totalMarks = 0;

    testData.questions.forEach(question => {
      const userAnswer = answers[question.id];
      if (userAnswer === undefined || userAnswer === '') {
        unattempted++;
      } else if (userAnswer === question.correctAnswer) {
        correctAnswers++;
        totalMarks += question.marks;
      } else {
        incorrectAnswers++;
        totalMarks -= question.negativeMarks;
      }
    });

    const result = {
      testId: testData.id,
      startTime,
      endTime,
      timeTaken: startTime ? Math.floor((endTime.getTime() - startTime.getTime()) / 1000) : 0,
      totalQuestions: testData.totalQuestions,
      correctAnswers,
      incorrectAnswers,
      unattempted,
      totalMarks,
      maxMarks: testData.maxMarks,
      percentage: (totalMarks / testData.maxMarks) * 100,
      answers,
      sectionTime
    };

    onTestComplete(result);
  }, [answers, testData, startTime, sectionTime, onTestComplete]);

  const handleAnswerSelect = (questionId: string, answer: string | number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const navigateToQuestion = (index: number) => {
    if (index >= 0 && index < testData.questions.length) {
      setCurrentQuestion(index);
      setVisitedQuestions(prev => new Set([...prev, index]));
    }
  };

  const toggleBookmark = (questionId: string) => {
    setBookmarked(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const currentQ = testData.questions[currentQuestion];
  const isAnswered = currentQ && answers[currentQ.id] !== undefined;
  const isBookmarked = currentQ && bookmarked.has(currentQ.id);

  const getQuestionStatus = (index: number) => {
    const question = testData.questions[index];
    const answered = answers[question.id] !== undefined;
    const visited = visitedQuestions.has(index);
    const isQuestionBookmarked = bookmarked.has(question.id);

    if (answered) return 'answered';
    if (isQuestionBookmarked) return 'bookmarked';
    if (visited) return 'visited';
    return 'unvisited';
  };

  const renderInstructions = () => (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl">
      <div className="text-center mb-8">
        <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{testData.title}</h1>
        <p className="text-gray-600 dark:text-gray-300">Full-length CLAT Mock Test</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 text-center">
          <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Duration</h3>
          <p className="text-blue-600 dark:text-blue-400 font-bold">{testData.duration} minutes</p>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900/20 rounded-2xl p-6 text-center">
          <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Questions</h3>
          <p className="text-green-600 dark:text-green-400 font-bold">{testData.totalQuestions}</p>
        </div>
        
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-2xl p-6 text-center">
          <Award className="h-8 w-8 text-purple-600 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Max Marks</h3>
          <p className="text-purple-600 dark:text-purple-400 font-bold">{testData.maxMarks}</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-orange-500" />
          Important Instructions
        </h3>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li>• Each question carries +1 marks for correct answer</li>
          <li>• Wrong answers carry -0.25 marks (negative marking)</li>
          <li>• No marks deducted for unattempted questions</li>
          <li>• You can navigate between questions anytime</li>
          <li>• Use bookmark feature to mark questions for review</li>
          <li>• Test will auto-submit when time expires</li>
        </ul>
      </div>

      <div className="text-center">
        <button
          onClick={startTest}
          className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Play className="inline h-6 w-6 mr-2" />
          Start Mock Test
        </button>
      </div>
    </div>
  );

  const renderActiveTest = () => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">{testData.title}</h1>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                Q {currentQuestion + 1} of {testData.totalQuestions}
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono font-bold ${
                timeRemaining < 600 ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 
                'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              }`}>
                <Timer className="h-5 w-5" />
                {formatTime(timeRemaining)}
              </div>
              
              <button
                onClick={testState === 'active' ? pauseTest : resumeTest}
                className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-xl transition-colors"
              >
                {testState === 'active' ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </button>
              
              <button
                onClick={handleTestComplete}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-colors"
              >
                <Square className="inline h-4 w-4 mr-2" />
                Submit Test
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Question Navigation Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 sticky top-24">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Question Navigator</h3>
            
            <div className="grid grid-cols-5 gap-2 mb-4">
              {testData.questions.map((_, index) => {
                const status = getQuestionStatus(index);
                const isActive = index === currentQuestion;
                
                return (
                  <button
                    key={index}
                    onClick={() => navigateToQuestion(index)}
                    className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all ${
                      isActive 
                        ? 'bg-blue-600 text-white shadow-lg' 
                        : status === 'answered'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : status === 'bookmarked'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        : status === 'visited'
                        ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-200 rounded"></div>
                <span className="text-gray-700 dark:text-gray-300">Answered ({Object.keys(answers).length})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-200 rounded"></div>
                <span className="text-gray-700 dark:text-gray-300">Bookmarked ({bookmarked.size})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-200 rounded"></div>
                <span className="text-gray-700 dark:text-gray-300">Visited</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
                <span className="text-gray-700 dark:text-gray-300">Not Visited</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Question Area */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8">
            {/* Question Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                  {currentQ.section}
                </span>
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                  {currentQ.difficulty.toUpperCase()}
                </span>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium">
                  +{currentQ.marks} marks
                </span>
              </div>
              
              <button
                onClick={() => toggleBookmark(currentQ.id)}
                className={`p-2 rounded-xl transition-colors ${
                  isBookmarked
                    ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400'
                    : 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500 hover:bg-yellow-50 hover:text-yellow-500'
                }`}
              >
                {isBookmarked ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
              </button>
            </div>

            {/* Question */}
            <div className="mb-8">
              <p className="text-lg text-gray-900 dark:text-white leading-relaxed">
                <span className="font-semibold">Q{currentQuestion + 1}.</span> {currentQ.question}
              </p>
            </div>

            {/* Options */}
            {currentQ.type === 'mcq' && currentQ.options && (
              <div className="space-y-3 mb-8">
                {currentQ.options.map((option, index) => {
                  const optionLabel = String.fromCharCode(65 + index);
                  const isSelected = answers[currentQ.id] === optionLabel;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(currentQ.id, optionLabel)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold ${
                          isSelected
                            ? 'border-blue-500 bg-blue-500 text-white'
                            : 'border-gray-300 text-gray-600 dark:border-gray-600 dark:text-gray-400'
                        }`}>
                          {optionLabel}
                        </span>
                        <span className="text-gray-900 dark:text-white">{option}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigateToQuestion(currentQuestion - 1)}
                disabled={currentQuestion === 0}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleAnswerSelect(currentQ.id, '')}
                  className="px-4 py-2 bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300 rounded-xl hover:bg-orange-200 dark:hover:bg-orange-800 transition-colors"
                >
                  Clear Response
                </button>
                
                <button
                  onClick={() => navigateToQuestion(currentQuestion + 1)}
                  disabled={currentQuestion === testData.questions.length - 1}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors"
                >
                  Save & Next
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPausedScreen = () => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 text-center max-w-md">
        <Pause className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Test Paused</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Your progress has been saved. Click resume to continue your test.
        </p>
        <div className="space-y-3">
          <button
            onClick={resumeTest}
            className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            <Play className="inline h-5 w-5 mr-2" />
            Resume Test
          </button>
          <button
            onClick={onBack}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
          >
            <ArrowLeft className="inline h-5 w-5 mr-2" />
            Exit Test
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {testState === 'instructions' && renderInstructions()}
      {testState === 'active' && renderActiveTest()}
      {testState === 'paused' && renderPausedScreen()}
      {testState === 'completed' && (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 text-center max-w-2xl">
            <Trophy className="h-20 w-20 text-yellow-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Test Completed!</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Your responses have been saved and your detailed analysis is being prepared.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              View Results & Analysis
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Sample mock test data
export const sampleMockTest: MockTestData = {
  id: 'clat-mock-2025-01',
  title: 'CLAT Mock Test 2025 - Practice Set 1',
  duration: 120, // 2 hours
  totalQuestions: 120,
  maxMarks: 120,
  sections: [
    { name: 'English Language', questions: 24, timeLimit: 24 },
    { name: 'Current Affairs & GK', questions: 32, timeLimit: 32 },
    { name: 'Legal Reasoning', questions: 32, timeLimit: 32 },
    { name: 'Logical Reasoning', questions: 22, timeLimit: 22 },
    { name: 'Quantitative Techniques', questions: 10, timeLimit: 10 }
  ],
  questions: [
    {
      id: 'eng-001',
      section: 'English Language',
      type: 'mcq',
      question: 'Choose the word that is most similar in meaning to "EPHEMERAL":',
      options: ['Permanent', 'Temporary', 'Eternal', 'Durable'],
      correctAnswer: 'B',
      explanation: 'Ephemeral means lasting for a very short time, which is similar to temporary.',
      difficulty: 'medium',
      topic: 'Vocabulary',
      marks: 1,
      negativeMarks: 0.25
    },
    {
      id: 'gk-001',
      section: 'Current Affairs & GK',
      type: 'mcq',
      question: 'Who is the current Chief Justice of India (2025)?',
      options: ['D.Y. Chandrachud', 'Sanjiv Khanna', 'N.V. Ramana', 'U.U. Lalit'],
      correctAnswer: 'B',
      explanation: 'Justice Sanjiv Khanna became the Chief Justice of India in November 2024.',
      difficulty: 'easy',
      topic: 'Current Affairs',
      marks: 1,
      negativeMarks: 0.25
    },
    {
      id: 'legal-001',
      section: 'Legal Reasoning',
      type: 'mcq',
      question: 'According to the Indian Constitution, which article deals with the Right to Equality?',
      options: ['Article 12', 'Article 14', 'Article 19', 'Article 21'],
      correctAnswer: 'B',
      explanation: 'Article 14 of the Indian Constitution guarantees the Right to Equality before law.',
      difficulty: 'easy',
      topic: 'Constitutional Law',
      marks: 1,
      negativeMarks: 0.25
    }
    // Add more questions as needed
  ]
};

export default RevolutionaryMockTest;
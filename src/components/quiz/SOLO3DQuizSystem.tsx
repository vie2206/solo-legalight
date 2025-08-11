import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  Trophy,
  Clock,
  Target,
  Brain,
  Star,
  CheckCircle,
  XCircle,
  AlertCircle,
  Lightbulb,
  BookOpen,
  Scale,
  Gavel,
  Award,
  TrendingUp,
  Users,
  Zap,
  ChevronRight,
  ChevronLeft,
  Volume2,
  VolumeX,
  Settings,
  Share2,
  Download,
  Eye
} from 'lucide-react';
import { soloStyles } from '../shared/SOLODesignSystem';
import SOLOCompleteAIIcon from '../icons/SOLOCompleteAIIcons';

interface QuizQuestion {
  id: string;
  type: 'mcq' | 'true-false' | 'case-analysis' | 'legal-reasoning';
  category: 'constitutional-law' | 'criminal-law' | 'contract-law' | 'tort-law' | 'legal-reasoning' | 'current-affairs';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  reference?: string;
  timeLimit: number; // seconds
  points: number;
  hint?: string;
  caseStudy?: string;
}

interface QuizResult {
  questionId: string;
  selectedAnswer: string | number;
  isCorrect: boolean;
  timeSpent: number;
  pointsEarned: number;
}

interface Quiz3DAsset {
  name: string;
  type: 'correct' | 'wrong' | 'timer' | 'trophy' | 'brain' | 'book' | 'leaderboard';
  imagePath: string;
  animation?: string;
}

interface SOLO3DQuizSystemProps {
  quizId?: string;
  mode?: 'practice' | 'test' | 'challenge';
  category?: string;
  difficulty?: 'easy' | 'medium' | 'hard' | 'mixed';
  timeLimit?: number; // total quiz time in minutes
  questionsCount?: number;
  showHints?: boolean;
  show3DAnimations?: boolean;
  onQuizComplete?: (results: QuizResult[], score: number) => void;
  className?: string;
}

const SOLO3DQuizSystem: React.FC<SOLO3DQuizSystemProps> = ({
  quizId,
  mode = 'practice',
  category,
  difficulty = 'mixed',
  timeLimit = 60,
  questionsCount = 25,
  showHints = true,
  show3DAnimations = true,
  onQuizComplete,
  className = ''
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | number | null>(null);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit * 60);
  const [questionTimeSpent, setQuestionTimeSpent] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const questionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 3D Quiz Assets mapping
  const quiz3DAssets: Quiz3DAsset[] = [
    { name: 'correct', type: 'correct', imagePath: '/images/quiz-3d/Correct.png', animation: 'bounce' },
    { name: 'wrong', type: 'wrong', imagePath: '/images/quiz-3d/Wrong.png', animation: 'shake' },
    { name: 'timer', type: 'timer', imagePath: '/images/quiz-3d/Quiz Timer.png', animation: 'pulse' },
    { name: 'trophy', type: 'trophy', imagePath: '/images/quiz-3d/Trophy.png', animation: 'glow' },
    { name: 'brain', type: 'brain', imagePath: '/images/quiz-3d/Brain.png', animation: 'float' },
    { name: 'book', type: 'book', imagePath: '/images/quiz-3d/Quiz Book.png', animation: 'flip' },
    { name: 'leaderboard', type: 'leaderboard', imagePath: '/images/quiz-3d/Leaderboard.png', animation: 'slide' }
  ];

  // Sample legal quiz questions
  const sampleQuestions: QuizQuestion[] = [
    {
      id: 'q1',
      type: 'mcq',
      category: 'constitutional-law',
      difficulty: 'medium',
      question: 'Which Article of the Indian Constitution deals with the Right to Equality?',
      options: ['Article 12', 'Article 14', 'Article 19', 'Article 21'],
      correctAnswer: 1,
      explanation: 'Article 14 of the Indian Constitution guarantees equality before the law and equal protection of the laws to all persons within the territory of India.',
      reference: 'Constitution of India, Part III',
      timeLimit: 60,
      points: 4,
      hint: 'This article is the foundation of equality in Indian law and comes right after the definition of "State".'
    },
    {
      id: 'q2',
      type: 'case-analysis',
      category: 'constitutional-law',
      difficulty: 'hard',
      question: 'In Kesavananda Bharati v. State of Kerala (1973), what doctrine did the Supreme Court establish?',
      options: ['Doctrine of Severability', 'Basic Structure Doctrine', 'Doctrine of Harmonious Construction', 'Doctrine of Pith and Substance'],
      correctAnswer: 1,
      explanation: 'The Basic Structure Doctrine was established in Kesavananda Bharati v. State of Kerala (1973), which holds that Parliament cannot amend the basic structure of the Constitution.',
      reference: 'Kesavananda Bharati v. State of Kerala, AIR 1973 SC 1461',
      timeLimit: 90,
      points: 6,
      caseStudy: 'This landmark case involved the constitutional validity of certain land reform laws in Kerala and led to one of the most important constitutional principles in Indian law.',
      hint: 'This doctrine limits Parliament\'s power to amend the Constitution by protecting its fundamental features.'
    },
    {
      id: 'q3',
      type: 'legal-reasoning',
      category: 'criminal-law',
      difficulty: 'medium',
      question: 'A commits murder in a sudden fit of rage after being severely provoked. Under which section can A claim mitigation of punishment?',
      options: ['Section 300 Exception 1', 'Section 300 Exception 4', 'Section 302', 'Section 304'],
      correctAnswer: 1,
      explanation: 'Section 300 Exception 4 (grave and sudden provocation) allows for mitigation from murder to culpable homicide not amounting to murder under Section 304 IPC.',
      reference: 'Indian Penal Code, Section 300',
      timeLimit: 75,
      points: 5,
      hint: 'Look for the exception that deals with provocation in the definition of murder.'
    },
    {
      id: 'q4',
      type: 'true-false',
      category: 'contract-law',
      difficulty: 'easy',
      question: 'A contract with a minor is void ab initio (from the beginning).',
      options: ['True', 'False'],
      correctAnswer: 0,
      explanation: 'True. According to the Indian Contract Act, 1872, a contract with a minor is void ab initio as a minor is not competent to contract.',
      reference: 'Indian Contract Act, 1872, Section 11',
      timeLimit: 45,
      points: 3,
      hint: 'Consider the capacity to contract and the legal status of minors.'
    },
    {
      id: 'q5',
      type: 'mcq',
      category: 'current-affairs',
      difficulty: 'medium',
      question: 'Which recent constitutional amendment deals with GST implementation?',
      options: ['100th Amendment', '101st Amendment', '102nd Amendment', '103rd Amendment'],
      correctAnswer: 1,
      explanation: 'The 101st Constitutional Amendment Act, 2016 enabled the implementation of Goods and Services Tax (GST) in India.',
      reference: '101st Constitutional Amendment Act, 2016',
      timeLimit: 60,
      points: 4,
      hint: 'This amendment was passed in 2016 and revolutionized India\'s tax structure.'
    }
  ];

  // Initialize quiz
  useEffect(() => {
    setQuestions(sampleQuestions.slice(0, questionsCount));
  }, [questionsCount]);

  // Timer effects
  useEffect(() => {
    if (quizStarted && !quizCompleted) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            finishQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      questionTimerRef.current = setInterval(() => {
        setQuestionTimeSpent(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (questionTimerRef.current) clearInterval(questionTimerRef.current);
    };
  }, [quizStarted, quizCompleted, currentQuestionIndex]);

  // 3D Canvas Animation
  useEffect(() => {
    if (show3DAnimations && canvasRef.current && currentAnimation) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = 200;
      canvas.height = 200;

      // Simple 3D-like animation
      let frame = 0;
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const time = Date.now() * 0.002;
        
        // Different animations based on type
        switch (currentAnimation) {
          case 'correct':
            // Green bouncing checkmark
            ctx.fillStyle = '#10B981';
            ctx.beginPath();
            const bounceY = centerY + Math.sin(time * 4) * 10;
            ctx.arc(centerX, bounceY, 30 + Math.sin(time * 2) * 5, 0, Math.PI * 2);
            ctx.fill();
            break;
            
          case 'wrong':
            // Red shaking X
            ctx.fillStyle = '#EF4444';
            ctx.beginPath();
            const shakeX = centerX + Math.sin(time * 8) * 5;
            ctx.arc(shakeX, centerY, 30, 0, Math.PI * 2);
            ctx.fill();
            break;
            
          case 'trophy':
            // Golden glowing trophy
            const glowIntensity = (Math.sin(time * 3) + 1) * 0.5;
            ctx.fillStyle = `rgba(251, 191, 36, ${0.5 + glowIntensity * 0.5})`;
            ctx.beginPath();
            ctx.arc(centerX, centerY, 40 + glowIntensity * 10, 0, Math.PI * 2);
            ctx.fill();
            break;
        }
        
        frame++;
        if (frame < 60) {
          requestAnimationFrame(animate);
        }
      };
      
      animate();
    }
  }, [currentAnimation, show3DAnimations]);

  const startQuiz = () => {
    setQuizStarted(true);
    setQuestionTimeSpent(0);
  };

  const submitAnswer = () => {
    if (selectedAnswer === null) return;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const pointsEarned = isCorrect ? currentQuestion.points : 0;

    const result: QuizResult = {
      questionId: currentQuestion.id,
      selectedAnswer,
      isCorrect,
      timeSpent: questionTimeSpent,
      pointsEarned
    };

    setResults(prev => [...prev, result]);
    setCurrentAnimation(isCorrect ? 'correct' : 'wrong');

    // Play sound effect
    if (soundEnabled) {
      // Sound would be played here
    }

    setTimeout(() => {
      setShowExplanation(true);
    }, 1500);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowHint(false);
      setShowExplanation(false);
      setQuestionTimeSpent(0);
      setCurrentAnimation(null);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    setQuizCompleted(true);
    if (timerRef.current) clearInterval(timerRef.current);
    if (questionTimerRef.current) clearInterval(questionTimerRef.current);
    
    const totalScore = results.reduce((sum, result) => sum + result.pointsEarned, 0);
    const maxScore = questions.reduce((sum, question) => sum + question.points, 0);
    
    if (onQuizComplete) {
      onQuizComplete(results, (totalScore / maxScore) * 100);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const currentQuestion = questions[currentQuestionIndex];

  if (!quizStarted) {
    return (
      <div className={`bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 ${className}`}>
        <div className="text-center space-y-6">
          {show3DAnimations && (
            <div className="w-32 h-32 mx-auto mb-6 bg-white rounded-2xl shadow-lg flex items-center justify-center">
              <img 
                src="/images/quiz-3d/Quiz Book.png" 
                alt="3D Quiz Book" 
                className="w-24 h-24 object-contain animate-bounce"
              />
            </div>
          )}
          
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">SOLO 3D Legal Quiz</h2>
            <p className="text-lg text-gray-600 mb-6">
              Test your legal knowledge with our interactive 3D quiz system
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 space-y-4 text-left max-w-md mx-auto">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Questions:</span>
              <span className="font-semibold">{questionsCount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Time Limit:</span>
              <span className="font-semibold">{timeLimit} minutes</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Mode:</span>
              <span className="font-semibold capitalize">{mode}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Difficulty:</span>
              <span className={`font-semibold capitalize ${
                difficulty === 'hard' ? 'text-red-600' : 
                difficulty === 'medium' ? 'text-yellow-600' : 'text-green-600'
              }`}>
                {difficulty}
              </span>
            </div>
          </div>

          <button
            onClick={startQuiz}
            className={`${soloStyles.button.ai} text-lg px-8 py-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all`}
          >
            <Play className="w-5 h-5 mr-2" />
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    const totalScore = results.reduce((sum, result) => sum + result.pointsEarned, 0);
    const maxScore = questions.reduce((sum, question) => sum + question.points, 0);
    const percentage = (totalScore / maxScore) * 100;
    const correctAnswers = results.filter(r => r.isCorrect).length;

    return (
      <div className={`bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 ${className}`}>
        <div className="text-center space-y-6">
          {show3DAnimations && (
            <div className="w-40 h-40 mx-auto mb-6 bg-white rounded-2xl shadow-lg flex items-center justify-center relative overflow-hidden">
              <img 
                src="/images/quiz-3d/Trophy.png" 
                alt="3D Trophy" 
                className="w-32 h-32 object-contain animate-pulse"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-yellow-200/20 to-transparent"></div>
            </div>
          )}

          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Completed!</h2>
            <p className={`text-2xl font-bold ${getScoreColor(percentage)} mb-4`}>
              {percentage.toFixed(1)}%
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-1">{correctAnswers}</div>
              <div className="text-sm text-gray-600">Correct</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-red-600 mb-1">{questions.length - correctAnswers}</div>
              <div className="text-sm text-gray-600">Wrong</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">{totalScore}</div>
              <div className="text-sm text-gray-600">Points</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {formatTime((timeLimit * 60) - timeRemaining)}
              </div>
              <div className="text-sm text-gray-600">Time Used</div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <button className={`${soloStyles.button.primary} flex items-center gap-2`}>
              <Share2 className="w-4 h-4" />
              Share Results
            </button>
            <button className={`${soloStyles.button.secondary} flex items-center gap-2`}>
              <Download className="w-4 h-4" />
              Download Report
            </button>
            <button 
              onClick={() => {
                setQuizStarted(false);
                setQuizCompleted(false);
                setCurrentQuestionIndex(0);
                setResults([]);
                setTimeRemaining(timeLimit * 60);
              }}
              className={`${soloStyles.button.ghost} flex items-center gap-2`}
            >
              <RotateCcw className="w-4 h-4" />
              Retry Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden ${className}`}>
      {/* Quiz Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <SOLOCompleteAIIcon name="smart-quiz" size="large" theme="light" />
            </div>
            <div>
              <h3 className="font-bold text-xl">Legal Quiz Challenge</h3>
              <p className="text-white/80">Question {currentQuestionIndex + 1} of {questions.length}</p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold">{formatTime(timeRemaining)}</div>
            <p className="text-white/80 text-sm">Time Remaining</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* 3D Animation Canvas */}
      {show3DAnimations && currentAnimation && (
        <div className="flex justify-center py-4 bg-gray-50">
          <canvas 
            ref={canvasRef}
            className="rounded-lg shadow-md"
          />
        </div>
      )}

      {/* Question Content */}
      <div className="p-6">
        {currentQuestion && (
          <div className="space-y-6">
            {/* Question Header */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    currentQuestion.difficulty === 'hard' ? 'bg-red-100 text-red-700' :
                    currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {currentQuestion.difficulty}
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    {currentQuestion.category.replace('-', ' ')}
                  </span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                    {currentQuestion.points} pts
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {currentQuestion.question}
                </h3>

                {currentQuestion.caseStudy && (
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                    <p className="text-blue-800 text-sm">
                      <strong>Case Context:</strong> {currentQuestion.caseStudy}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 ml-4">
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
                
                {showHints && currentQuestion.hint && (
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center hover:bg-yellow-200 transition-colors"
                  >
                    <Lightbulb className="w-4 h-4 text-yellow-600" />
                  </button>
                )}
              </div>
            </div>

            {/* Hint */}
            {showHint && currentQuestion.hint && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <Lightbulb className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-800 mb-1">Hint:</p>
                    <p className="text-yellow-700 text-sm">{currentQuestion.hint}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedAnswer(index)}
                  disabled={showExplanation}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all ${
                    selectedAnswer === index
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === index
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {selectedAnswer === index && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-gray-900">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Explanation */}
            {showExplanation && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    results[results.length - 1]?.isCorrect 
                      ? 'bg-green-500' 
                      : 'bg-red-500'
                  }`}>
                    {results[results.length - 1]?.isCorrect ? (
                      <CheckCircle className="w-4 h-4 text-white" />
                    ) : (
                      <XCircle className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium mb-2 ${
                      results[results.length - 1]?.isCorrect 
                        ? 'text-green-800' 
                        : 'text-red-800'
                    }`}>
                      {results[results.length - 1]?.isCorrect ? 'Correct!' : 'Incorrect'}
                    </p>
                    <p className="text-gray-700 text-sm mb-2">{currentQuestion.explanation}</p>
                    {currentQuestion.reference && (
                      <p className="text-gray-500 text-xs">
                        Reference: {currentQuestion.reference}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <button
                onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                disabled={currentQuestionIndex === 0}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>

              <div className="flex gap-3">
                {!showExplanation ? (
                  <button
                    onClick={submitAnswer}
                    disabled={selectedAnswer === null}
                    className={`${soloStyles.button.primary} disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={nextQuestion}
                    className={`${soloStyles.button.primary} flex items-center gap-2`}
                  >
                    {currentQuestionIndex < questions.length - 1 ? (
                      <>
                        Next Question
                        <ChevronRight className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Finish Quiz
                        <Trophy className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SOLO3DQuizSystem;
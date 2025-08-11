import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Brain, Clock, Target, RotateCcw, ArrowRight } from 'lucide-react';

interface QuizQuestion {
  id: string;
  type: 'definition' | 'synonym' | 'antonym' | 'sentence_completion' | 'usage';
  word: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: number;
}

interface VocabularyQuizProps {
  words: string[];
  onQuizComplete: (results: {
    score: number;
    totalQuestions: number;
    timeSpent: number;
    wordsToReview: string[];
    strengths: string[];
    weaknesses: string[];
  }) => void;
  onExit: () => void;
}

const VocabularyQuiz: React.FC<VocabularyQuizProps> = ({ words, onQuizComplete, onExit }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState<Array<{
    questionId: string;
    selected: number;
    correct: boolean;
    timeSpent: number;
  }>>([]);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const [isLoading, setIsLoading] = useState(true);

  // Mock quiz questions - In production, these would come from Claude AI
  const mockQuestions: QuizQuestion[] = [
    {
      id: '1',
      type: 'definition',
      word: 'Aberrant',
      question: 'What does "aberrant" mean?',
      options: [
        'Deviating from the normal or typical',
        'Extremely beautiful',
        'Highly intelligent',
        'Moving quickly'
      ],
      correct: 0,
      explanation: 'Aberrant means departing from an accepted standard or normal type.',
      difficulty: 3
    },
    {
      id: '2',
      type: 'synonym',
      word: 'Meticulous',
      question: 'Which word is most similar to "meticulous"?',
      options: [
        'Careless',
        'Thorough',
        'Quick',
        'Lazy'
      ],
      correct: 1,
      explanation: 'Meticulous means showing great attention to detail; being very careful and precise.',
      difficulty: 2
    },
    {
      id: '3',
      type: 'sentence_completion',
      word: 'Eloquent',
      question: 'The lawyer\'s _______ speech convinced the jury of his client\'s innocence.',
      options: [
        'eloquent',
        'silent',
        'confusing',
        'brief'
      ],
      correct: 0,
      explanation: 'Eloquent means fluent or persuasive in speaking or writing, which fits the context perfectly.',
      difficulty: 2
    },
    {
      id: '4',
      type: 'antonym',
      word: 'Benevolent',
      question: 'Which word is opposite to "benevolent"?',
      options: [
        'Kind',
        'Generous',
        'Malevolent',
        'Helpful'
      ],
      correct: 2,
      explanation: 'Benevolent means well-meaning and kindly. Malevolent means having evil intentions.',
      difficulty: 3
    },
    {
      id: '5',
      type: 'usage',
      word: 'Pragmatic',
      question: 'In which context would "pragmatic" be most appropriately used?',
      options: [
        'Describing a beautiful sunset',
        'Referring to a practical approach to problem-solving',
        'Talking about emotional music',
        'Describing physical strength'
      ],
      correct: 1,
      explanation: 'Pragmatic means dealing with things sensibly and realistically in a practical way.',
      difficulty: 3
    }
  ];

  useEffect(() => {
    // Simulate loading questions from Claude AI
    setTimeout(() => {
      setQuestions(mockQuestions);
      setIsLoading(false);
      setStartTime(Date.now());
      setQuestionStartTime(Date.now());
    }, 1000);
  }, [words]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const timeSpent = Date.now() - questionStartTime;
    const isCorrect = selectedAnswer === currentQuestion.correct;

    setAnswers([...answers, {
      questionId: currentQuestion.id,
      selected: selectedAnswer,
      correct: isCorrect,
      timeSpent
    }]);

    setShowResult(true);
    
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setQuestionStartTime(Date.now());
      } else {
        // Quiz complete
        completeQuiz();
      }
    }, 2000);
  };

  const completeQuiz = () => {
    const totalTimeSpent = Date.now() - startTime;
    const correctAnswers = answers.filter(a => a.correct).length + (selectedAnswer === currentQuestion.correct ? 1 : 0);
    const score = Math.round((correctAnswers / questions.length) * 100);
    
    const wordsToReview = questions
      .filter((q, i) => {
        if (i < answers.length) return !answers[i].correct;
        return selectedAnswer !== q.correct;
      })
      .map(q => q.word);

    const strengths: string[] = [];
    const weaknesses: string[] = [];

    // Analyze performance by question type
    const typePerformance: { [key: string]: { correct: number; total: number } } = {};
    questions.forEach((q, i) => {
      if (!typePerformance[q.type]) {
        typePerformance[q.type] = { correct: 0, total: 0 };
      }
      typePerformance[q.type].total++;
      
      const isCorrect = i < answers.length ? answers[i].correct : selectedAnswer === q.correct;
      if (isCorrect) typePerformance[q.type].correct++;
    });

    Object.entries(typePerformance).forEach(([type, performance]) => {
      const accuracy = performance.correct / performance.total;
      const typeLabel = type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
      
      if (accuracy >= 0.8) {
        strengths.push(typeLabel);
      } else if (accuracy < 0.6) {
        weaknesses.push(typeLabel);
      }
    });

    onQuizComplete({
      score,
      totalQuestions: questions.length,
      timeSpent: totalTimeSpent,
      wordsToReview,
      strengths,
      weaknesses
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-700">Preparing your vocabulary quiz...</p>
          <p className="text-sm text-gray-500 mt-2">Powered by Claude AI</p>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-t-xl shadow-lg p-6 border-b">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Vocabulary Quiz</h1>
            <button
              onClick={onExit}
              className="text-gray-500 hover:text-gray-700 px-4 py-2 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors"
            >
              Exit Quiz
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <span className="text-sm text-gray-600">{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Type Badge */}
          <div className="flex items-center gap-2">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {currentQuestion.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </span>
            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
              {currentQuestion.word}
            </span>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white shadow-lg p-8">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 leading-relaxed">
              {currentQuestion.question}
            </h2>

            {/* Answer Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => {
                let optionClass = "w-full p-4 text-left border-2 rounded-lg transition-all duration-200 hover:border-blue-300 hover:bg-blue-50";
                
                if (selectedAnswer !== null) {
                  if (index === currentQuestion.correct) {
                    optionClass += " border-green-500 bg-green-50 text-green-800";
                  } else if (index === selectedAnswer && index !== currentQuestion.correct) {
                    optionClass += " border-red-500 bg-red-50 text-red-800";
                  } else {
                    optionClass += " border-gray-200 bg-gray-50 text-gray-600";
                  }
                } else if (selectedAnswer === index) {
                  optionClass += " border-blue-500 bg-blue-100";
                } else {
                  optionClass += " border-gray-200 hover:border-blue-300";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={showResult}
                    className={optionClass}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">
                        {String.fromCharCode(65 + index)}. {option}
                      </span>
                      {selectedAnswer !== null && (
                        <div className="flex items-center">
                          {index === currentQuestion.correct ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : index === selectedAnswer ? (
                            <XCircle className="w-5 h-5 text-red-600" />
                          ) : null}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Explanation (shown after answer) */}
          {showResult && (
            <div className={`p-4 rounded-lg mb-6 ${
              selectedAnswer === currentQuestion.correct 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-start gap-3">
                {selectedAnswer === currentQuestion.correct ? (
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <p className={`font-medium mb-2 ${
                    selectedAnswer === currentQuestion.correct ? 'text-green-800' : 'text-red-800'
                  }`}>
                    {selectedAnswer === currentQuestion.correct ? 'Correct!' : 'Incorrect'}
                  </p>
                  <p className={`text-sm leading-relaxed ${
                    selectedAnswer === currentQuestion.correct ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {currentQuestion.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Next Button */}
          <div className="flex justify-center">
            <button
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className={`px-8 py-3 rounded-lg font-medium flex items-center gap-2 transition-all duration-200 ${
                selectedAnswer === null
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              {currentQuestionIndex === questions.length - 1 ? 'Complete Quiz' : 'Next Question'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quiz Stats */}
        <div className="bg-white rounded-b-xl shadow-lg p-6">
          <div className="flex justify-center items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{Math.floor((Date.now() - startTime) / 1000)}s elapsed</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              <span>{answers.filter(a => a.correct).length}/{answers.length + 1} correct</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              <span>Powered by Claude AI</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VocabularyQuiz;
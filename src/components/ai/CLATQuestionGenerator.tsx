import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Target, 
  Clock, 
  BookOpen, 
  Zap,
  Star,
  Award,
  CheckCircle,
  XCircle,
  ArrowRight,
  BarChart3,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Eye,
  Lightbulb,
  TrendingUp,
  Filter,
  Download,
  Share2,
  Trophy
} from 'lucide-react';
import { claudeAIService } from '../../services/claudeAIService';

interface QuestionConfig {
  subject: 'legal_reasoning' | 'reading_comprehension' | 'current_affairs' | 'logical_reasoning' | 'quantitative';
  difficulty: number; // 1-5
  count: number;
  questionTypes: string[];
  topics: string[];
  timeLimit?: number;
  adaptToWeakness: boolean;
}

interface GeneratedQuestion {
  id: string;
  question: string;
  passage?: string;
  options: string[];
  correct_answer: number;
  explanation: string;
  clat_relevance: number;
  estimated_time_seconds: number;
  concepts: string[];
  difficulty_justification: string;
  section: string;
  aiGenerated: boolean;
}

interface QuizSession {
  id: string;
  config: QuestionConfig;
  questions: GeneratedQuestion[];
  userAnswers: { [questionId: string]: number };
  startTime: number;
  endTime?: number;
  currentQuestion: number;
  isCompleted: boolean;
}

interface QuizResults {
  score: number;
  totalQuestions: number;
  timeSpent: number;
  accuracy: number;
  conceptAnalysis: { [concept: string]: { correct: number; total: number } };
  recommendations: string[];
}

const CLATQuestionGenerator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'generator' | 'quiz' | 'results' | 'analytics'>('generator');
  const [questionConfig, setQuestionConfig] = useState<QuestionConfig>({
    subject: 'legal_reasoning',
    difficulty: 3,
    count: 10,
    questionTypes: ['multiple_choice', 'assertion_reason', 'principle_fact'],
    topics: [],
    adaptToWeakness: true
  });
  
  const [generatedQuestions, setGeneratedQuestions] = useState<GeneratedQuestion[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentSession, setCurrentSession] = useState<QuizSession | null>(null);
  const [quizResults, setQuizResults] = useState<QuizResults | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Subject configuration
  const subjectConfigs = {
    legal_reasoning: {
      name: 'Legal Reasoning',
      color: 'blue',
      questionTypes: ['multiple_choice', 'assertion_reason', 'principle_fact'],
      topics: ['Constitutional Law', 'Contract Law', 'Criminal Law', 'Torts', 'Property Law', 'Jurisprudence']
    },
    reading_comprehension: {
      name: 'Reading Comprehension',
      color: 'green',
      questionTypes: ['multiple_choice', 'inference', 'vocabulary', 'main_idea'],
      topics: ['Legal Texts', 'Editorial Analysis', 'Case Studies', 'Parliamentary Debates']
    },
    current_affairs: {
      name: 'Current Affairs',
      color: 'orange',
      questionTypes: ['multiple_choice', 'statement_based', 'chronological'],
      topics: ['Politics', 'Economy', 'International Relations', 'Legal Updates', 'Social Issues']
    },
    logical_reasoning: {
      name: 'Logical Reasoning',
      color: 'purple',
      questionTypes: ['multiple_choice', 'syllogism', 'critical_reasoning'],
      topics: ['Syllogisms', 'Analogies', 'Critical Reasoning', 'Logical Sequences', 'Assumptions']
    },
    quantitative: {
      name: 'Quantitative Techniques',
      color: 'red',
      questionTypes: ['multiple_choice', 'numerical', 'data_interpretation'],
      topics: ['Percentages', 'Ratios', 'Averages', 'Profit & Loss', 'Data Interpretation']
    }
  };

  const generateQuestions = async () => {
    setIsGenerating(true);
    try {
      const questions = await claudeAIService.generateQuestions({
        topic: questionConfig.topics.join(', ') || 'General',
        subject: questionConfig.subject,
        difficulty: questionConfig.difficulty,
        count: questionConfig.count,
        userWeaknesses: questionConfig.adaptToWeakness ? ['Time Management', 'Complex Analysis'] : []
      });

      // Mock generated questions for demo
      const mockQuestions: GeneratedQuestion[] = Array.from({ length: questionConfig.count }, (_, i) => ({
        id: `q_${i + 1}`,
        question: `Which of the following principles best explains the concept of ${questionConfig.subject.replace('_', ' ')} in the context of Indian law?`,
        passage: questionConfig.subject === 'reading_comprehension' ? 
          'The Supreme Court of India has consistently held that the right to life under Article 21 is not merely the right to exist but encompasses the right to live with dignity. This interpretation has evolved through various landmark judgments that have expanded the scope of fundamental rights.' : 
          undefined,
        options: [
          'Option A - The principle of natural justice',
          'Option B - The doctrine of basic structure',
          'Option C - The rule of law',
          'Option D - The principle of proportionality'
        ],
        correct_answer: Math.floor(Math.random() * 4),
        explanation: `This question tests understanding of fundamental legal principles. The correct answer demonstrates knowledge of constitutional interpretation and judicial precedents in Indian law.`,
        clat_relevance: Math.floor(Math.random() * 3) + 3, // 3-5
        estimated_time_seconds: Math.floor(Math.random() * 60) + 60, // 60-120 seconds
        concepts: ['Constitutional Law', 'Fundamental Rights', 'Judicial Review'],
        difficulty_justification: `This is a ${questionConfig.difficulty <= 2 ? 'basic' : questionConfig.difficulty <= 3 ? 'intermediate' : 'advanced'} level question requiring analytical thinking.`,
        section: questionConfig.subject,
        aiGenerated: true
      }));

      setGeneratedQuestions(mockQuestions);
    } catch (error) {
      console.error('Failed to generate questions:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const startQuiz = () => {
    if (generatedQuestions.length === 0) return;
    
    const session: QuizSession = {
      id: `quiz_${Date.now()}`,
      config: questionConfig,
      questions: generatedQuestions,
      userAnswers: {},
      startTime: Date.now(),
      currentQuestion: 0,
      isCompleted: false
    };
    
    setCurrentSession(session);
    setActiveTab('quiz');
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const submitAnswer = () => {
    if (!currentSession || selectedAnswer === null) return;

    const currentQuestionObj = currentSession.questions[currentSession.currentQuestion];
    const updatedAnswers = {
      ...currentSession.userAnswers,
      [currentQuestionObj.id]: selectedAnswer
    };

    const updatedSession = {
      ...currentSession,
      userAnswers: updatedAnswers
    };

    setCurrentSession(updatedSession);
    setShowExplanation(true);

    // Auto-advance after showing explanation
    setTimeout(() => {
      if (currentSession.currentQuestion < currentSession.questions.length - 1) {
        setCurrentSession({
          ...updatedSession,
          currentQuestion: currentSession.currentQuestion + 1
        });
        setSelectedAnswer(null);
        setShowExplanation(false);
      } else {
        // Quiz completed
        completeQuiz(updatedSession);
      }
    }, 3000);
  };

  const completeQuiz = (session: QuizSession) => {
    const endTime = Date.now();
    const timeSpent = (endTime - session.startTime) / 1000;
    
    let correctAnswers = 0;
    const conceptAnalysis: { [concept: string]: { correct: number; total: number } } = {};

    session.questions.forEach(question => {
      const userAnswer = session.userAnswers[question.id];
      const isCorrect = userAnswer === question.correct_answer;
      
      if (isCorrect) correctAnswers++;

      question.concepts.forEach(concept => {
        if (!conceptAnalysis[concept]) {
          conceptAnalysis[concept] = { correct: 0, total: 0 };
        }
        conceptAnalysis[concept].total++;
        if (isCorrect) conceptAnalysis[concept].correct++;
      });
    });

    const accuracy = (correctAnswers / session.questions.length) * 100;
    
    const results: QuizResults = {
      score: correctAnswers,
      totalQuestions: session.questions.length,
      timeSpent,
      accuracy,
      conceptAnalysis,
      recommendations: [
        accuracy >= 80 ? 'Excellent performance! Focus on maintaining consistency.' : 'Consider reviewing weak areas identified in the concept analysis.',
        timeSpent > session.questions.length * 90 ? 'Work on improving time management skills.' : 'Good time management!',
        'Practice more questions from this difficulty level to build confidence.'
      ]
    };

    setQuizResults(results);
    setCurrentSession(null);
    setActiveTab('results');
  };

  const getSubjectColor = (subject: string) => {
    const config = subjectConfigs[subject as keyof typeof subjectConfigs];
    return config ? config.color : 'gray';
  };

  const currentQuestion = currentSession?.questions[currentSession.currentQuestion];
  const progress = currentSession ? ((currentSession.currentQuestion + 1) / currentSession.questions.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">AI Question Generator</h1>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Claude AI
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {[
                { key: 'generator', label: 'Question Generator', icon: Brain },
                { key: 'quiz', label: 'Practice Quiz', icon: Play },
                { key: 'results', label: 'Results & Analysis', icon: BarChart3 },
                { key: 'analytics', label: 'Performance Analytics', icon: TrendingUp }
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as any)}
                  disabled={key === 'quiz' && !currentSession && generatedQuestions.length === 0}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === key
                      ? 'border-blue-500 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'generator' && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Generate CLAT Questions</h2>
                  <p className="text-gray-600">Create personalized practice questions using AI</p>
                </div>

                {/* Configuration */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Subject Selection */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Subject & Settings</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                      <select
                        value={questionConfig.subject}
                        onChange={(e) => setQuestionConfig(prev => ({ 
                          ...prev, 
                          subject: e.target.value as any,
                          topics: [] // Reset topics when subject changes
                        }))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      >
                        {Object.entries(subjectConfigs).map(([key, config]) => (
                          <option key={key} value={key}>{config.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
                        <select
                          value={questionConfig.difficulty}
                          onChange={(e) => setQuestionConfig(prev => ({ ...prev, difficulty: Number(e.target.value) }))}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        >
                          <option value={1}>Very Easy</option>
                          <option value={2}>Easy</option>
                          <option value={3}>Medium</option>
                          <option value={4}>Hard</option>
                          <option value={5}>Very Hard</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Questions</label>
                        <select
                          value={questionConfig.count}
                          onChange={(e) => setQuestionConfig(prev => ({ ...prev, count: Number(e.target.value) }))}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        >
                          <option value={5}>5 Questions</option>
                          <option value={10}>10 Questions</option>
                          <option value={15}>15 Questions</option>
                          <option value={20}>20 Questions</option>
                          <option value={25}>25 Questions</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={questionConfig.adaptToWeakness}
                          onChange={(e) => setQuestionConfig(prev => ({ ...prev, adaptToWeakness: e.target.checked }))}
                          className="rounded"
                        />
                        <span className="text-sm font-medium text-gray-700">Adapt to my weak areas</span>
                      </label>
                      <p className="text-xs text-gray-500 mt-1">AI will focus on topics where you need improvement</p>
                    </div>
                  </div>

                  {/* Topics Selection */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Topics (Optional)</h3>
                    <p className="text-sm text-gray-600">Select specific topics or leave empty for general questions</p>
                    
                    <div className="grid grid-cols-2 gap-2">
                      {subjectConfigs[questionConfig.subject].topics.map((topic) => (
                        <label key={topic} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded">
                          <input
                            type="checkbox"
                            checked={questionConfig.topics.includes(topic)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setQuestionConfig(prev => ({ ...prev, topics: [...prev.topics, topic] }));
                              } else {
                                setQuestionConfig(prev => ({ ...prev, topics: prev.topics.filter(t => t !== topic) }));
                              }
                            }}
                            className="rounded"
                          />
                          <span className="text-sm text-gray-700">{topic}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Generate Button */}
                <div className="text-center">
                  <button
                    onClick={generateQuestions}
                    disabled={isGenerating}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
                  >
                    {isGenerating ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Generating Questions...
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5" />
                        Generate Questions
                      </>
                    )}
                  </button>
                </div>

                {/* Generated Questions Preview */}
                {generatedQuestions.length > 0 && (
                  <div className="bg-white rounded-xl border shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">Generated Questions</h3>
                      <div className="flex items-center gap-2">
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          {generatedQuestions.length} Questions Ready
                        </span>
                        <button
                          onClick={startQuiz}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                        >
                          <Play className="w-4 h-4" />
                          Start Quiz
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3 max-h-60 overflow-y-auto">
                      {generatedQuestions.slice(0, 3).map((question, index) => (
                        <div key={question.id} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                              Q{index + 1}
                            </span>
                            <span className="text-xs text-gray-600">
                              {Math.floor(question.estimated_time_seconds / 60)}m {question.estimated_time_seconds % 60}s
                            </span>
                          </div>
                          <p className="text-gray-900 font-medium">{question.question}</p>
                        </div>
                      ))}
                      {generatedQuestions.length > 3 && (
                        <div className="text-center py-2">
                          <span className="text-sm text-gray-500">
                            +{generatedQuestions.length - 3} more questions...
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'quiz' && currentSession && currentQuestion && (
              <div className="space-y-6">
                {/* Quiz Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold">Practice Quiz</h2>
                      <p className="text-blue-100">
                        {subjectConfigs[questionConfig.subject].name} • Question {currentSession.currentQuestion + 1} of {currentSession.questions.length}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">
                        {Math.floor((Date.now() - currentSession.startTime) / 1000 / 60)}:{((Math.floor((Date.now() - currentSession.startTime) / 1000)) % 60).toString().padStart(2, '0')}
                      </div>
                      <div className="text-blue-200 text-sm">Time Elapsed</div>
                    </div>
                  </div>
                  
                  <div className="w-full bg-blue-800 bg-opacity-50 rounded-full h-2">
                    <div
                      className="bg-yellow-300 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {/* Question */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  {currentQuestion.passage && (
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                      <h4 className="font-semibold text-gray-900 mb-2">Passage</h4>
                      <p className="text-gray-700 leading-relaxed">{currentQuestion.passage}</p>
                    </div>
                  )}

                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {currentQuestion.section.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                      <span className="text-sm text-gray-600">
                        Estimated time: {Math.floor(currentQuestion.estimated_time_seconds / 60)}m {currentQuestion.estimated_time_seconds % 60}s
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 leading-relaxed">
                      {currentQuestion.question}
                    </h3>
                  </div>

                  {/* Options */}
                  <div className="space-y-3 mb-8">
                    {currentQuestion.options.map((option, index) => {
                      let optionClass = "w-full p-4 text-left border-2 rounded-lg transition-all duration-200 hover:border-blue-300 hover:bg-blue-50";
                      
                      if (showExplanation) {
                        if (index === currentQuestion.correct_answer) {
                          optionClass += " border-green-500 bg-green-50 text-green-800";
                        } else if (index === selectedAnswer && index !== currentQuestion.correct_answer) {
                          optionClass += " border-red-500 bg-red-50 text-red-800";
                        } else {
                          optionClass += " border-gray-200 bg-gray-50 text-gray-600";
                        }
                      } else if (selectedAnswer === index) {
                        optionClass += " border-blue-500 bg-blue-100";
                      } else {
                        optionClass += " border-gray-200";
                      }

                      return (
                        <button
                          key={index}
                          onClick={() => setSelectedAnswer(index)}
                          disabled={showExplanation}
                          className={optionClass}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">
                              {String.fromCharCode(65 + index)}. {option}
                            </span>
                            {showExplanation && (
                              <div className="flex items-center">
                                {index === currentQuestion.correct_answer ? (
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

                  {/* Explanation */}
                  {showExplanation && (
                    <div className={`p-4 rounded-lg mb-6 ${
                      selectedAnswer === currentQuestion.correct_answer 
                        ? 'bg-green-50 border border-green-200' 
                        : 'bg-red-50 border border-red-200'
                    }`}>
                      <div className="flex items-start gap-3">
                        {selectedAnswer === currentQuestion.correct_answer ? (
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                        )}
                        <div>
                          <p className={`font-medium mb-2 ${
                            selectedAnswer === currentQuestion.correct_answer ? 'text-green-800' : 'text-red-800'
                          }`}>
                            {selectedAnswer === currentQuestion.correct_answer ? 'Correct!' : 'Incorrect'}
                          </p>
                          <p className={`text-sm leading-relaxed ${
                            selectedAnswer === currentQuestion.correct_answer ? 'text-green-700' : 'text-red-700'
                          }`}>
                            {currentQuestion.explanation}
                          </p>
                          <div className="mt-3">
                            <p className="text-xs font-medium text-gray-600 mb-1">Concepts tested:</p>
                            <div className="flex flex-wrap gap-1">
                              {currentQuestion.concepts.map((concept, idx) => (
                                <span key={idx} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
                                  {concept}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  {!showExplanation && (
                    <div className="text-center">
                      <button
                        onClick={submitAnswer}
                        disabled={selectedAnswer === null}
                        className={`px-8 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto transition-all duration-200 ${
                          selectedAnswer === null
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                        }`}
                      >
                        {currentSession.currentQuestion === currentSession.questions.length - 1 
                          ? 'Finish Quiz' 
                          : 'Submit Answer'
                        }
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'results' && quizResults && (
              <div className="space-y-8">
                <div className="text-center">
                  <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
                  <p className="text-gray-600">Here's your detailed performance analysis</p>
                </div>

                {/* Score Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{quizResults.score}/{quizResults.totalQuestions}</div>
                    <div className="text-sm text-blue-800">Questions Correct</div>
                  </div>
                  <div className="bg-green-50 p-6 rounded-xl border border-green-200 text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">{quizResults.accuracy.toFixed(1)}%</div>
                    <div className="text-sm text-green-800">Accuracy</div>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-xl border border-purple-200 text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">{Math.floor(quizResults.timeSpent / 60)}m</div>
                    <div className="text-sm text-purple-800">Time Taken</div>
                  </div>
                  <div className="bg-orange-50 p-6 rounded-xl border border-orange-200 text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">{Math.floor(quizResults.timeSpent / quizResults.totalQuestions)}s</div>
                    <div className="text-sm text-orange-800">Avg per Question</div>
                  </div>
                </div>

                {/* Concept Analysis */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Concept-wise Performance</h3>
                  <div className="space-y-4">
                    {Object.entries(quizResults.conceptAnalysis).map(([concept, data]) => {
                      const accuracy = (data.correct / data.total) * 100;
                      return (
                        <div key={concept} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-gray-900">{concept}</span>
                            <span className="text-sm font-bold text-blue-600">
                              {data.correct}/{data.total} ({accuracy.toFixed(0)}%)
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                accuracy >= 80 ? 'bg-green-500' :
                                accuracy >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${accuracy}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Recommendations */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-yellow-500" />
                    AI Recommendations
                  </h3>
                  <div className="space-y-3">
                    {quizResults.recommendations.map((rec, index) => (
                      <div key={index} className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <p className="text-blue-800">{rec}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => {
                      setGeneratedQuestions([]);
                      setQuizResults(null);
                      setActiveTab('generator');
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Generate New Quiz
                  </button>
                  <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download Report
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-8">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Performance Analytics</h2>
                  <p className="text-gray-600">Long-term performance tracking and insights</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                  <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-700 mb-2">Analytics Coming Soon</h3>
                  <p className="text-gray-600 mb-6">
                    Take more AI-generated quizzes to build your performance history and get detailed analytics.
                  </p>
                  <button
                    onClick={() => setActiveTab('generator')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                  >
                    Generate More Questions
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CLATQuestionGenerator;
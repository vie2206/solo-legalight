import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Target, 
  Brain, 
  CheckCircle, 
  XCircle, 
  TrendingUp,
  Book,
  Star,
  BarChart3,
  Eye,
  Lightbulb,
  Award,
  ChevronRight,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

interface ReadingPassage {
  id: string;
  title: string;
  content: string;
  source: string;
  difficulty: number;
  topics: string[];
  wordCount: number;
  estimatedReadingTime: number;
  clatRelevance: number;
}

interface AssessmentQuestion {
  id: string;
  type: 'multiple_choice' | 'true_false' | 'inference' | 'vocabulary' | 'main_idea';
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: number;
  skillsTested: string[];
}

interface ReadingAssessmentProps {
  onComplete: (results: AssessmentResults) => void;
  onBack: () => void;
}

export interface AssessmentResults {
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

const ReadingAssessment: React.FC<ReadingAssessmentProps> = ({ onComplete, onBack }) => {
  const [currentPhase, setCurrentPhase] = useState<'instructions' | 'reading' | 'assessment' | 'results'>('instructions');
  const [passage] = useState<ReadingPassage>({
    id: 'clat_sample_1',
    title: 'The Evolution of Legal Education in India',
    content: `Legal education in India has undergone significant transformations over the past few decades, evolving from a traditional academic discipline to a more practical, skill-oriented field of study. The establishment of National Law Universities (NLUs) in the 1980s marked a paradigm shift in legal pedagogy, introducing integrated five-year programs that combined undergraduate and postgraduate studies.

    The Common Law Admission Test (CLAT), introduced in 2008, revolutionized the admission process for law schools across the country. This standardized examination not only democratized access to premier legal institutions but also raised the bar for academic excellence. The test evaluates candidates across multiple domains: legal reasoning, logical reasoning, reading comprehension, current affairs, and quantitative techniques.

    However, the journey of legal education reform has not been without challenges. Critics argue that despite curricular innovations, many law schools still struggle with outdated teaching methodologies, insufficient practical training, and limited industry exposure. The gap between theoretical knowledge and practical application remains a persistent concern among legal educators and practitioners.

    Recent initiatives have focused on bridging this divide through clinical legal education, moot court competitions, and industry partnerships. Law schools are increasingly emphasizing experiential learning, encouraging students to engage with real-world legal problems through internships and pro bono work. This shift reflects a growing recognition that effective legal education must prepare students not just as scholars of law, but as competent practitioners capable of addressing contemporary legal challenges.

    The integration of technology in legal education has further accelerated these changes. Virtual classrooms, AI-powered research tools, and digital case databases have transformed how law is taught and learned. As the legal profession continues to evolve in response to technological advancement and changing societal needs, legal education must adapt accordingly, ensuring that future lawyers are equipped with both traditional jurisprudential knowledge and modern practical skills.`,
    source: 'CLAT Practice Material',
    difficulty: 4,
    topics: ['Legal Education', 'CLAT', 'Educational Reform'],
    wordCount: 312,
    estimatedReadingTime: 2,
    clatRelevance: 5
  });

  const [questions] = useState<AssessmentQuestion[]>([
    {
      id: 'q1',
      type: 'main_idea',
      question: 'What is the primary focus of this passage?',
      options: [
        'The history and evolution of legal education in India',
        'The benefits of the CLAT examination system',
        'The challenges facing modern law schools',
        'The role of technology in education'
      ],
      correct: 0,
      explanation: 'The passage comprehensively discusses the evolution of legal education in India, from traditional methods to modern reforms.',
      difficulty: 3,
      skillsTested: ['main_idea', 'comprehension']
    },
    {
      id: 'q2',
      type: 'multiple_choice',
      question: 'When was the CLAT examination introduced?',
      options: ['1980s', '1990s', '2008', '2010'],
      correct: 2,
      explanation: 'The passage explicitly states that CLAT was introduced in 2008.',
      difficulty: 2,
      skillsTested: ['factual_recall', 'attention_to_detail']
    },
    {
      id: 'q3',
      type: 'inference',
      question: 'Based on the passage, what can be inferred about the current state of legal education?',
      options: [
        'It has completely solved all traditional problems',
        'It is in a transitional phase with both progress and challenges',
        'It has failed to adapt to modern requirements',
        'It focuses only on theoretical knowledge'
      ],
      correct: 1,
      explanation: 'The passage indicates that while there have been significant improvements, challenges still persist, suggesting an ongoing transition.',
      difficulty: 4,
      skillsTested: ['inference', 'critical_thinking']
    },
    {
      id: 'q4',
      type: 'vocabulary',
      question: 'In the context of this passage, what does "paradigm shift" mean?',
      options: [
        'A minor adjustment',
        'A fundamental change in approach',
        'A temporary modification',
        'A return to old methods'
      ],
      correct: 1,
      explanation: 'A paradigm shift refers to a fundamental change in approach or underlying assumptions.',
      difficulty: 3,
      skillsTested: ['vocabulary', 'context_understanding']
    },
    {
      id: 'q5',
      type: 'multiple_choice',
      question: 'Which of the following is NOT mentioned as a domain evaluated by CLAT?',
      options: [
        'Legal reasoning',
        'Current affairs',
        'Creative writing',
        'Quantitative techniques'
      ],
      correct: 2,
      explanation: 'The passage lists legal reasoning, logical reasoning, reading comprehension, current affairs, and quantitative techniques, but not creative writing.',
      difficulty: 2,
      skillsTested: ['factual_recall', 'attention_to_detail']
    }
  ]);

  const [readingStartTime, setReadingStartTime] = useState<number | null>(null);
  const [readingEndTime, setReadingEndTime] = useState<number | null>(null);
  const [assessmentStartTime, setAssessmentStartTime] = useState<number | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [questionId: string]: number }>({});
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  
  const startReading = () => {
    setCurrentPhase('reading');
    setReadingStartTime(Date.now());
  };

  const finishReading = () => {
    setReadingEndTime(Date.now());
    setCurrentPhase('assessment');
    setAssessmentStartTime(Date.now());
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const submitAnswer = () => {
    if (selectedAnswer === null) return;
    
    const currentQuestion = questions[currentQuestionIndex];
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: selectedAnswer }));
    setShowExplanation(true);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
      } else {
        completeAssessment();
      }
    }, 3000);
  };

  const completeAssessment = () => {
    if (!readingStartTime || !readingEndTime || !assessmentStartTime) return;

    const readingTime = (readingEndTime - readingStartTime) / 1000 / 60; // minutes
    const readingSpeed = passage.wordCount / readingTime;
    
    const totalTime = (Date.now() - readingStartTime) / 1000;
    let correctAnswers = 0;
    
    // Calculate skill breakdown
    const skillBreakdown: { [skill: string]: { score: number; total: number } } = {};
    
    questions.forEach(question => {
      const isCorrect = answers[question.id] === question.correct;
      if (isCorrect) correctAnswers++;
      
      question.skillsTested.forEach(skill => {
        if (!skillBreakdown[skill]) {
          skillBreakdown[skill] = { score: 0, total: 0 };
        }
        skillBreakdown[skill].total++;
        if (isCorrect) skillBreakdown[skill].score++;
      });
    });

    const score = Math.round((correctAnswers / questions.length) * 100);
    
    // Determine comprehension level
    let comprehensionLevel: AssessmentResults['comprehensionLevel'] = 'poor';
    if (score >= 90) comprehensionLevel = 'excellent';
    else if (score >= 75) comprehensionLevel = 'good';
    else if (score >= 60) comprehensionLevel = 'fair';
    
    // Identify strengths and weaknesses
    const strengths: string[] = [];
    const weaknesses: string[] = [];
    
    Object.entries(skillBreakdown).forEach(([skill, data]) => {
      const accuracy = data.score / data.total;
      const skillLabel = skill.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
      
      if (accuracy >= 0.8) {
        strengths.push(skillLabel);
      } else if (accuracy < 0.5) {
        weaknesses.push(skillLabel);
      }
    });

    // Generate personalized recommendations
    const personalizedRecommendations: string[] = [];
    
    if (readingSpeed < 150) {
      personalizedRecommendations.push('Practice speed reading techniques to improve reading velocity');
    }
    if (weaknesses.includes('Inference')) {
      personalizedRecommendations.push('Focus on understanding implicit meanings and drawing logical conclusions');
    }
    if (weaknesses.includes('Vocabulary')) {
      personalizedRecommendations.push('Build vocabulary through context-based learning and word analysis');
    }
    if (score < 75) {
      personalizedRecommendations.push('Practice more reading comprehension passages at similar difficulty levels');
    }

    const results: AssessmentResults = {
      score,
      totalQuestions: questions.length,
      timeSpent: totalTime,
      readingSpeed,
      comprehensionLevel,
      strengths,
      weaknesses,
      skillBreakdown,
      personalizedRecommendations
    };

    onComplete(results);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  if (currentPhase === 'instructions') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={onBack}
            className="mb-6 flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            ← Back to Reading Mastery
          </button>

          <div className="bg-white rounded-xl shadow-xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-blue-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Reading Comprehension Assessment</h1>
              <p className="text-gray-600">Evaluate your reading comprehension skills with AI-powered analysis</p>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                <Book className="w-5 h-5" />
                Assessment Overview
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-800">Estimated Time: 8-10 minutes</span>
                </div>
                <div className="flex items-center gap-3">
                  <Target className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-800">Questions: {questions.length}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-800">Difficulty: Intermediate</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-800">CLAT Relevance: High</span>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                What You'll Get
              </h3>
              <ul className="space-y-2 text-green-800">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Comprehensive score and percentile ranking</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Reading speed analysis (words per minute)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Skill-wise breakdown (inference, vocabulary, main ideas)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Personalized improvement recommendations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>AI-powered study plan tailored to your needs</span>
                </li>
              </ul>
            </div>

            <div className="bg-orange-50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-orange-900 mb-3">Instructions</h3>
              <ol className="space-y-2 text-orange-800">
                <li>1. Read the passage carefully - your reading speed will be measured</li>
                <li>2. Answer all questions to the best of your ability</li>
                <li>3. Each question will show an explanation after you answer</li>
                <li>4. Focus on accuracy over speed for the questions</li>
                <li>5. You'll receive detailed feedback at the end</li>
              </ol>
            </div>

            <div className="text-center">
              <button
                onClick={startReading}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-semibold text-lg flex items-center gap-2 mx-auto transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Play className="w-5 h-5" />
                Begin Assessment
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentPhase === 'reading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold mb-1">Reading Phase</h1>
                  <p className="text-blue-100">Read carefully - your speed is being measured</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 bg-white bg-opacity-20 px-3 py-1 rounded-full">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">Reading Mode</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Passage */}
            <div className="p-8">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">{passage.title}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <span>📚 {passage.source}</span>
                  <span>📊 Difficulty: {passage.difficulty}/5</span>
                  <span>📝 {passage.wordCount} words</span>
                  <span>⏱️ ~{passage.estimatedReadingTime} min read</span>
                </div>
              </div>

              <div className="prose max-w-none leading-relaxed text-gray-800">
                {passage.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-6 text-justify leading-loose">
                    {paragraph.trim()}
                  </p>
                ))}
              </div>

              <div className="text-center mt-8">
                <button
                  onClick={finishReading}
                  className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-3 rounded-lg font-semibold text-lg flex items-center gap-2 mx-auto transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <ChevronRight className="w-5 h-5" />
                  Proceed to Questions
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentPhase === 'assessment') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-xl">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-6 rounded-t-xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold mb-1">Assessment Questions</h1>
                  <p className="text-green-100">Answer based on the passage you just read</p>
                </div>
                <div className="text-right">
                  <div className="text-sm opacity-90">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-green-800 bg-opacity-50 rounded-full h-2">
                <div
                  className="bg-yellow-300 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <div className="p-8">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                    {currentQuestion.type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                    Difficulty: {currentQuestion.difficulty}/5
                  </span>
                </div>

                <h2 className="text-xl font-semibold text-gray-900 mb-6 leading-relaxed">
                  {currentQuestion.question}
                </h2>
              </div>

              {/* Answer Options */}
              <div className="space-y-3 mb-8">
                {currentQuestion.options.map((option, index) => {
                  let optionClass = "w-full p-4 text-left border-2 rounded-lg transition-all duration-200 hover:border-blue-300 hover:bg-blue-50";
                  
                  if (showExplanation) {
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
                    optionClass += " border-gray-200";
                  }

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showExplanation}
                      className={optionClass}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">
                          {String.fromCharCode(65 + index)}. {option}
                        </span>
                        {showExplanation && (
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

              {/* Explanation */}
              {showExplanation && (
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

              {/* Submit Button */}
              {!showExplanation && (
                <div className="text-center">
                  <button
                    onClick={submitAnswer}
                    disabled={selectedAnswer === null}
                    className={`px-8 py-3 rounded-lg font-semibold flex items-center gap-2 mx-auto transition-all duration-200 ${
                      selectedAnswer === null
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {currentQuestionIndex === questions.length - 1 ? 'Complete Assessment' : 'Submit Answer'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default ReadingAssessment;
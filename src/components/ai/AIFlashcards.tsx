import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  RotateCcw, 
  ThumbsUp, 
  ThumbsDown, 
  Zap,
  Star,
  Trophy,
  Target,
  Clock,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Settings,
  Plus,
  Filter,
  TrendingUp,
  Eye,
  EyeOff,
  Volume2,
  Heart,
  Award,
  Sparkles
} from 'lucide-react';
import { claudeAIService } from '../../services/claudeAIService';

interface Flashcard {
  id: string;
  front: string;
  back: string;
  subject: 'legal_reasoning' | 'reading_comprehension' | 'current_affairs' | 'logical_reasoning' | 'quantitative' | 'vocabulary';
  difficulty: number;
  concept: string;
  aiGenerated: boolean;
  lastReviewed?: string;
  nextReview?: string;
  easeFactor: number;
  reviewCount: number;
  correctStreak: number;
  tags: string[];
  importance: number;
  source?: string;
  relatedConcepts: string[];
}

interface StudySession {
  id: string;
  startTime: number;
  cardsReviewed: number;
  correctAnswers: number;
  timeSpent: number;
  difficulty: number;
  subject?: string;
}

interface FlashcardStats {
  totalCards: number;
  masteredCards: number;
  newCards: number;
  dueForReview: number;
  accuracy: number;
  streak: number;
  studyTime: number;
}

const AIFlashcards: React.FC = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [studySession, setStudySession] = useState<StudySession | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [studyMode, setStudyMode] = useState<'review' | 'new' | 'all'>('all');
  const [autoPlay, setAutoPlay] = useState(false);
  const [autoPlayInterval, setAutoPlayInterval] = useState<NodeJS.Timeout | null>(null);
  
  const [stats] = useState<FlashcardStats>({
    totalCards: 247,
    masteredCards: 89,
    newCards: 35,
    dueForReview: 18,
    accuracy: 84,
    streak: 12,
    studyTime: 24.5
  });

  // Mock flashcards
  useEffect(() => {
    generateFlashcards();
  }, []);

  const generateFlashcards = async () => {
    setIsGenerating(true);
    try {
      // Mock AI-generated flashcards
      const mockCards: Flashcard[] = [
        {
          id: 'fc_001',
          front: 'What is the doctrine of Basic Structure?',
          back: 'The Basic Structure doctrine is a legal principle in Indian constitutional law that certain fundamental features of the Constitution cannot be altered or destroyed by constitutional amendments. Established in Kesavananda Bharati v. State of Kerala (1973), it prevents the Parliament from amending the Constitution in a way that changes its basic structure.',
          subject: 'legal_reasoning',
          difficulty: 4,
          concept: 'Constitutional Law',
          aiGenerated: true,
          easeFactor: 2.5,
          reviewCount: 3,
          correctStreak: 2,
          tags: ['constitution', 'amendments', 'supreme_court'],
          importance: 9,
          source: 'Kesavananda Bharati case',
          relatedConcepts: ['Judicial Review', 'Parliamentary Sovereignty', 'Constitutional Amendments']
        },
        {
          id: 'fc_002',
          front: 'Define "Consideration" in Contract Law',
          back: 'Consideration is something of value that is exchanged between parties in a contract. It can be a benefit to one party or a detriment to the other. For a contract to be valid, there must be consideration from both sides. It must be real, lawful, and have some economic value.',
          subject: 'legal_reasoning',
          difficulty: 3,
          concept: 'Contract Law',
          aiGenerated: true,
          easeFactor: 2.3,
          reviewCount: 2,
          correctStreak: 1,
          tags: ['contracts', 'consideration', 'legal_elements'],
          importance: 8,
          relatedConcepts: ['Offer and Acceptance', 'Legal Capacity', 'Free Consent']
        },
        {
          id: 'fc_003',
          front: 'What does "Per Capita" mean?',
          back: 'Per capita means "per person" or "for each person." It is commonly used in statistics and economics to express averages. For example, per capita income is the average income per person in a given area during a specified time period.',
          subject: 'quantitative',
          difficulty: 2,
          concept: 'Statistical Terms',
          aiGenerated: true,
          easeFactor: 2.8,
          reviewCount: 5,
          correctStreak: 4,
          tags: ['statistics', 'economics', 'averages'],
          importance: 6,
          relatedConcepts: ['GDP Per Capita', 'Demographics', 'Economic Indicators']
        },
        {
          id: 'fc_004',
          front: 'What is the meaning of "Sui Generis"?',
          back: 'Sui Generis is a Latin term meaning "of its own kind" or "unique." In legal contexts, it refers to something that is unique and cannot be classified under any existing category. It describes legal concepts, rights, or situations that are one-of-a-kind.',
          subject: 'vocabulary',
          difficulty: 3,
          concept: 'Legal Terminology',
          aiGenerated: true,
          easeFactor: 2.4,
          reviewCount: 1,
          correctStreak: 0,
          tags: ['latin', 'legal_terms', 'vocabulary'],
          importance: 7,
          relatedConcepts: ['Legal Latin', 'Jurisprudence', 'Legal Classification']
        },
        {
          id: 'fc_005',
          front: 'What is the current strength of the Lok Sabha?',
          back: 'The Lok Sabha has a maximum strength of 552 members. Currently, it has 545 members: 543 elected from constituencies (530 from states and 13 from Union Territories) and up to 2 nominated members from the Anglo-Indian community (though this provision ended in 2020).',
          subject: 'current_affairs',
          difficulty: 3,
          concept: 'Indian Parliament',
          aiGenerated: true,
          easeFactor: 2.6,
          reviewCount: 2,
          correctStreak: 2,
          tags: ['parliament', 'lok_sabha', 'indian_polity'],
          importance: 8,
          relatedConcepts: ['Rajya Sabha', 'Election Commission', 'Representation']
        }
      ];
      
      setFlashcards(mockCards);
    } catch (error) {
      console.error('Failed to generate flashcards:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const startStudySession = () => {
    const session: StudySession = {
      id: `session_${Date.now()}`,
      startTime: Date.now(),
      cardsReviewed: 0,
      correctAnswers: 0,
      timeSpent: 0,
      difficulty: 3
    };
    setStudySession(session);
    setCurrentCardIndex(0);
    setShowAnswer(false);
  };

  const handleCardResponse = (isCorrect: boolean) => {
    if (!studySession) return;

    const currentCard = getCurrentCard();
    if (!currentCard) return;

    // Update session stats
    const updatedSession = {
      ...studySession,
      cardsReviewed: studySession.cardsReviewed + 1,
      correctAnswers: studySession.correctAnswers + (isCorrect ? 1 : 0),
      timeSpent: Date.now() - studySession.startTime
    };
    setStudySession(updatedSession);

    // Update card using spaced repetition algorithm
    const updatedCard = { ...currentCard };
    if (isCorrect) {
      updatedCard.correctStreak += 1;
      updatedCard.easeFactor = Math.max(1.3, updatedCard.easeFactor + 0.1);
    } else {
      updatedCard.correctStreak = 0;
      updatedCard.easeFactor = Math.max(1.3, updatedCard.easeFactor - 0.2);
    }
    updatedCard.reviewCount += 1;
    updatedCard.lastReviewed = new Date().toISOString();

    // Calculate next review date based on ease factor
    const nextReviewDays = Math.pow(updatedCard.easeFactor, updatedCard.correctStreak);
    updatedCard.nextReview = new Date(Date.now() + nextReviewDays * 24 * 60 * 60 * 1000).toISOString();

    setFlashcards(prev => prev.map(card => 
      card.id === currentCard.id ? updatedCard : card
    ));

    // Move to next card
    setTimeout(() => {
      if (currentCardIndex < getFilteredCards().length - 1) {
        setCurrentCardIndex(currentCardIndex + 1);
        setShowAnswer(false);
      } else {
        // End session
        setStudySession(null);
        alert(`Session complete! ${updatedSession.correctAnswers}/${updatedSession.cardsReviewed} correct`);
      }
    }, 1000);
  };

  const getFilteredCards = () => {
    let filtered = flashcards;

    if (selectedSubject !== 'all') {
      filtered = filtered.filter(card => card.subject === selectedSubject);
    }

    if (selectedDifficulty !== 'all') {
      const difficultyNum = parseInt(selectedDifficulty);
      filtered = filtered.filter(card => card.difficulty === difficultyNum);
    }

    if (studyMode === 'new') {
      filtered = filtered.filter(card => card.reviewCount === 0);
    } else if (studyMode === 'review') {
      const now = new Date();
      filtered = filtered.filter(card => 
        card.nextReview && new Date(card.nextReview) <= now
      );
    }

    return filtered;
  };

  const getCurrentCard = () => {
    const filtered = getFilteredCards();
    return filtered[currentCardIndex];
  };

  const toggleAutoPlay = () => {
    if (autoPlay) {
      if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        setAutoPlayInterval(null);
      }
    } else {
      const interval = setInterval(() => {
        if (showAnswer) {
          handleCardResponse(true);
        } else {
          setShowAnswer(true);
        }
      }, 3000);
      setAutoPlayInterval(interval);
    }
    setAutoPlay(!autoPlay);
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  const getSubjectColor = (subject: string) => {
    const colors = {
      legal_reasoning: 'blue',
      reading_comprehension: 'green',
      current_affairs: 'orange',
      logical_reasoning: 'purple',
      quantitative: 'red',
      vocabulary: 'indigo'
    };
    return colors[subject as keyof typeof colors] || 'gray';
  };

  const currentCard = getCurrentCard();
  const filteredCards = getFilteredCards();
  const progress = filteredCards.length > 0 ? ((currentCardIndex + 1) / filteredCards.length) * 100 : 0;

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Brain className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Generating AI Flashcards</h2>
          <p className="text-gray-600 mb-4">Creating personalized study cards based on your learning needs...</p>
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
              <h1 className="text-2xl font-bold text-gray-900">AI Flashcards</h1>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Claude AI
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full">
                <Trophy className="w-4 h-4 text-green-600" />
                <span className="font-bold text-green-800">{stats.streak}</span>
                <span className="text-sm text-green-600">day streak</span>
              </div>
              
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-gray-600">Total Cards</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{stats.totalCards}</div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-gray-600">Mastered</span>
            </div>
            <div className="text-2xl font-bold text-green-600">{stats.masteredCards}</div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium text-gray-600">Due Today</span>
            </div>
            <div className="text-2xl font-bold text-orange-600">{stats.dueForReview}</div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium text-gray-600">Accuracy</span>
            </div>
            <div className="text-2xl font-bold text-purple-600">{stats.accuracy}%</div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="all">All Subjects</option>
                <option value="legal_reasoning">Legal Reasoning</option>
                <option value="reading_comprehension">Reading Comprehension</option>
                <option value="current_affairs">Current Affairs</option>
                <option value="logical_reasoning">Logical Reasoning</option>
                <option value="quantitative">Quantitative</option>
                <option value="vocabulary">Vocabulary</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="all">All Levels</option>
                <option value="1">Very Easy</option>
                <option value="2">Easy</option>
                <option value="3">Medium</option>
                <option value="4">Hard</option>
                <option value="5">Very Hard</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Study Mode</label>
              <select
                value={studyMode}
                onChange={(e) => setStudyMode(e.target.value as any)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="all">All Cards</option>
                <option value="new">New Cards</option>
                <option value="review">Due for Review</option>
              </select>
            </div>

            <div className="flex items-end">
              {!studySession ? (
                <button
                  onClick={startStudySession}
                  disabled={filteredCards.length === 0}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Play className="w-4 h-4" />
                  Start Study Session
                </button>
              ) : (
                <button
                  onClick={toggleAutoPlay}
                  className={`w-full px-4 py-2 rounded-lg flex items-center justify-center gap-2 ${
                    autoPlay 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {autoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {autoPlay ? 'Stop Auto' : 'Auto Play'}
                </button>
              )}
            </div>
          </div>

          <div className="text-center text-sm text-gray-600">
            {filteredCards.length} cards available • {studySession ? `${studySession.cardsReviewed} reviewed` : 'Ready to start'}
          </div>
        </div>

        {/* Flashcard Display */}
        {studySession && currentCard && (
          <>
            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Progress</span>
                <span className="text-sm text-gray-600">{currentCardIndex + 1} / {filteredCards.length}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Flashcard */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 min-h-[400px] relative overflow-hidden">
                {/* Card Header */}
                <div className={`bg-gradient-to-r from-${getSubjectColor(currentCard.subject)}-500 to-${getSubjectColor(currentCard.subject)}-600 text-white p-4`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {currentCard.aiGenerated && (
                        <div className="flex items-center gap-1 bg-white bg-opacity-20 px-2 py-1 rounded">
                          <Sparkles className="w-3 h-3" />
                          <span className="text-xs">AI Generated</span>
                        </div>
                      )}
                      <span className="text-sm opacity-90">{currentCard.concept}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: currentCard.difficulty }, (_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                      <button
                        onClick={() => speakText(showAnswer ? currentCard.back : currentCard.front)}
                        className="p-1 hover:bg-white hover:bg-opacity-20 rounded"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-8 flex-1 flex items-center justify-center">
                  <div className="text-center max-w-2xl">
                    {!showAnswer ? (
                      <div>
                        <div className="mb-4">
                          <div className="text-sm text-gray-500 mb-2">Question</div>
                          <h2 className="text-2xl font-bold text-gray-900 leading-relaxed">
                            {currentCard.front}
                          </h2>
                        </div>
                        <button
                          onClick={() => setShowAnswer(true)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg flex items-center gap-2 mx-auto"
                        >
                          <Eye className="w-4 h-4" />
                          Show Answer
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="mb-6">
                          <div className="text-sm text-gray-500 mb-2">Answer</div>
                          <div className="text-lg text-gray-800 leading-relaxed text-left">
                            {currentCard.back}
                          </div>
                        </div>

                        {currentCard.relatedConcepts.length > 0 && (
                          <div className="mb-6 text-left">
                            <div className="text-sm font-medium text-gray-700 mb-2">Related Concepts:</div>
                            <div className="flex flex-wrap gap-2">
                              {currentCard.relatedConcepts.map((concept, index) => (
                                <span
                                  key={index}
                                  className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                                >
                                  {concept}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex justify-center gap-4">
                          <button
                            onClick={() => handleCardResponse(false)}
                            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg flex items-center gap-2"
                          >
                            <ThumbsDown className="w-5 h-5" />
                            Hard
                          </button>
                          <button
                            onClick={() => handleCardResponse(true)}
                            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg flex items-center gap-2"
                          >
                            <ThumbsUp className="w-5 h-5" />
                            Easy
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="bg-gray-50 px-6 py-4 border-t">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-4">
                      <span>Review #{currentCard.reviewCount}</span>
                      <span>Streak: {currentCard.correctStreak}</span>
                      {currentCard.source && <span>Source: {currentCard.source}</span>}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentCardIndex(Math.max(0, currentCardIndex - 1))}
                        disabled={currentCardIndex === 0}
                        className="p-1 hover:bg-gray-200 rounded disabled:opacity-50"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setCurrentCardIndex(Math.min(filteredCards.length - 1, currentCardIndex + 1))}
                        disabled={currentCardIndex === filteredCards.length - 1}
                        className="p-1 hover:bg-gray-200 rounded disabled:opacity-50"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Session Stats */}
            {studySession && (
              <div className="max-w-4xl mx-auto mt-6">
                <div className="bg-white rounded-xl shadow-sm p-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{studySession.cardsReviewed}</div>
                      <div className="text-sm text-gray-600">Cards Reviewed</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">
                        {studySession.cardsReviewed > 0 ? Math.round((studySession.correctAnswers / studySession.cardsReviewed) * 100) : 0}%
                      </div>
                      <div className="text-sm text-gray-600">Accuracy</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">
                        {Math.floor(studySession.timeSpent / 1000 / 60)}m
                      </div>
                      <div className="text-sm text-gray-600">Time Spent</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* No Cards Available */}
        {filteredCards.length === 0 && !studySession && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-700 mb-2">No Cards Available</h3>
            <p className="text-gray-600 mb-6">
              No flashcards match your current filters. Try adjusting your selection or generate new cards.
            </p>
            <button
              onClick={generateFlashcards}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto"
            >
              <Plus className="w-4 h-4" />
              Generate New Cards
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIFlashcards;
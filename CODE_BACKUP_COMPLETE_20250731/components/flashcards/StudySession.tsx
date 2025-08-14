import React, { useState, useEffect, useCallback } from 'react';
import { ClockIcon, EyeIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

// Types
interface Card {
  id: string;
  note_id: string;
  deck_id: string;
  template_index: number;
  card_type: number; // 0=new, 1=learning, 2=review, 3=relearning
  queue: number; // 0=new, 1=learning, 2=review, -1=suspended
  due: number;
  interval: number;
  ease_factor: number;
  reps: number;
  lapses: number;
  note: {
    fields: { [key: string]: string };
    tags: string[];
  };
  template: {
    name: string;
    question: string;
    answer: string;
  };
}

interface StudyStats {
  cards_studied: number;
  new_cards: number;
  learning_cards: number;
  review_cards: number;
  correct_answers: number;
  incorrect_answers: number;
  session_duration: number;
}

interface StudySessionProps {
  deckId: string;
  onComplete: (stats: StudyStats) => void;
  onExit: () => void;
}

const StudySession: React.FC<StudySessionProps> = ({ deckId, onComplete, onExit }) => {
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [cardQueue, setCardQueue] = useState<Card[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [studyStats, setStudyStats] = useState<StudyStats>({
    cards_studied: 0,
    new_cards: 0,
    learning_cards: 0,
    review_cards: 0,
    correct_answers: 0,
    incorrect_answers: 0,
    session_duration: 0
  });
  const [sessionStartTime] = useState(new Date());
  const [currentCardStartTime, setCurrentCardStartTime] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  // Load cards for study
  const loadStudyCards = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('auth_token');
      
      const response = await fetch(`${API_BASE}/api/flashcards/decks/${deckId}/study`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.ok) {
        throw new Error('Failed to load study cards');
      }

      const cards = await response.json();
      
      if (cards.length === 0) {
        onComplete(studyStats);
        return;
      }

      setCardQueue(cards);
      setCurrentCard(cards[0]);
      setCurrentCardStartTime(new Date());
      setShowAnswer(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load cards');
    } finally {
      setLoading(false);
    }
  }, [deckId, onComplete, studyStats]);

  useEffect(() => {
    loadStudyCards();
  }, [loadStudyCards]);

  // Process cloze deletions
  const processClozeText = (text: string, showAnswer: boolean = false) => {
    if (showAnswer) {
      return text.replace(/\{\{c\d+::([^}]+)\}\}/g, '<span class="cloze-answer">$1</span>');
    }
    return text.replace(/\{\{c\d+::([^}]+)\}\}/g, '<span class="cloze-deletion">[...]</span>');
  };

  // Render card content
  const renderCardContent = (template: string, fields: { [key: string]: string }, isAnswer: boolean = false) => {
    let content = template;

    // Replace field placeholders
    Object.entries(fields).forEach(([fieldName, fieldValue]) => {
      const placeholder = `{{${fieldName}}}`;
      
      if (fieldName === 'Text' && template.includes('{{cloze:Text}}')) {
        // Special handling for cloze deletions
        const clozeContent = processClozeText(fieldValue, isAnswer);
        content = content.replace('{{cloze:Text}}', clozeContent);
      } else {
        content = content.replace(placeholder, fieldValue);
      }
    });

    // Clean up any remaining placeholders
    content = content.replace(/\{\{[^}]+\}\}/g, '');

    return content;
  };

  // Answer card
  const answerCard = async (quality: number) => {
    if (!currentCard || !currentCardStartTime) return;

    const timeTaken = Date.now() - currentCardStartTime.getTime();

    try {
      const token = localStorage.getItem('auth_token');
      
      await fetch(`${API_BASE}/api/flashcards/cards/${currentCard.id}/answer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          answer_quality: quality,
          time_taken: timeTaken
        })
      });

      // Update stats
      setStudyStats(prev => ({
        ...prev,
        cards_studied: prev.cards_studied + 1,
        new_cards: prev.new_cards + (currentCard.card_type === 0 ? 1 : 0),
        learning_cards: prev.learning_cards + (currentCard.card_type === 1 || currentCard.card_type === 3 ? 1 : 0),
        review_cards: prev.review_cards + (currentCard.card_type === 2 ? 1 : 0),
        correct_answers: prev.correct_answers + (quality >= 3 ? 1 : 0),
        incorrect_answers: prev.incorrect_answers + (quality < 3 ? 1 : 0),
        session_duration: Math.floor((Date.now() - sessionStartTime.getTime()) / 1000)
      }));

      // Move to next card
      const remainingCards = cardQueue.slice(1);
      
      if (remainingCards.length === 0) {
        // Session complete
        const finalStats = {
          ...studyStats,
          cards_studied: studyStats.cards_studied + 1,
          session_duration: Math.floor((Date.now() - sessionStartTime.getTime()) / 1000)
        };
        onComplete(finalStats);
      } else {
        setCardQueue(remainingCards);
        setCurrentCard(remainingCards[0]);
        setCurrentCardStartTime(new Date());
        setShowAnswer(false);
      }
    } catch (err) {
      setError('Failed to answer card');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading study session...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <XMarkIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={onExit}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg"
          >
            Back to Deck
          </button>
        </div>
      </div>
    );
  }

  if (!currentCard) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <CheckIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <p className="text-gray-600">No cards to study right now!</p>
          <button
            onClick={onExit}
            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            Back to Deck
          </button>
        </div>
      </div>
    );
  }

  const cardTypeLabels = {
    0: 'New',
    1: 'Learning',
    2: 'Review',
    3: 'Relearning'
  };

  const cardTypeColors = {
    0: 'bg-blue-100 text-blue-800',
    1: 'bg-orange-100 text-orange-800',
    2: 'bg-green-100 text-green-800',
    3: 'bg-red-100 text-red-800'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${cardTypeColors[currentCard.card_type as keyof typeof cardTypeColors]}`}>
                {cardTypeLabels[currentCard.card_type as keyof typeof cardTypeLabels]}
              </span>
              <span className="text-sm text-gray-600">
                {cardQueue.length} cards remaining
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <ClockIcon className="h-4 w-4" />
                <span>{Math.floor(studyStats.session_duration / 60)}:{(studyStats.session_duration % 60).toString().padStart(2, '0')}</span>
              </div>
              <div className="text-sm text-gray-600">
                Studied: {studyStats.cards_studied}
              </div>
              <button
                onClick={onExit}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Study Area */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Card Content */}
          <div className="p-8">
            {/* Question */}
            <div className="mb-8">
              <div 
                className="text-center text-lg leading-relaxed min-h-[200px] flex items-center justify-center"
                dangerouslySetInnerHTML={{
                  __html: renderCardContent(
                    currentCard.template.question,
                    currentCard.note.fields,
                    false
                  )
                }}
              />
            </div>

            {/* Answer (if shown) */}
            {showAnswer && (
              <div className="border-t pt-8">
                <div 
                  className="text-center text-lg leading-relaxed min-h-[200px] flex items-center justify-center"
                  dangerouslySetInnerHTML={{
                    __html: renderCardContent(
                      currentCard.template.answer,
                      currentCard.note.fields,
                      true
                    )
                  }}
                />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="bg-gray-50 px-8 py-6">
            {!showAnswer ? (
              <div className="flex justify-center">
                <button
                  onClick={() => setShowAnswer(true)}
                  className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  <EyeIcon className="h-5 w-5" />
                  <span>Show Answer</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <button
                  onClick={() => answerCard(1)}
                  className="px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                >
                  Again
                  <div className="text-xs opacity-80">{'<1min'}</div>
                </button>
                <button
                  onClick={() => answerCard(2)}
                  className="px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors"
                >
                  Hard
                  <div className="text-xs opacity-80">{'<6min'}</div>
                </button>
                <button
                  onClick={() => answerCard(3)}
                  className="px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                >
                  Good
                  <div className="text-xs opacity-80">
                    {currentCard.card_type === 0 ? '1d' : `${Math.round(currentCard.interval * currentCard.ease_factor)}d`}
                  </div>
                </button>
                <button
                  onClick={() => answerCard(4)}
                  className="px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Easy
                  <div className="text-xs opacity-80">
                    {currentCard.card_type === 0 ? '4d' : `${Math.round(currentCard.interval * currentCard.ease_factor * 1.3)}d`}
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{studyStats.cards_studied} / {studyStats.cards_studied + cardQueue.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${(studyStats.cards_studied / (studyStats.cards_studied + cardQueue.length)) * 100}%` 
              }}
            />
          </div>
        </div>

        {/* Session Stats */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{studyStats.new_cards}</div>
            <div className="text-sm text-gray-600">New</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{studyStats.learning_cards}</div>
            <div className="text-sm text-gray-600">Learning</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{studyStats.review_cards}</div>
            <div className="text-sm text-gray-600">Review</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{studyStats.correct_answers}</div>
            <div className="text-sm text-gray-600">Correct</div>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-600">{studyStats.incorrect_answers}</div>
            <div className="text-sm text-gray-600">Incorrect</div>
          </div>
        </div>

        {/* Tags */}
        {currentCard.note.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {currentCard.note.tags.map(tag => (
              <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Custom CSS for cloze deletions */}
      <style jsx>{`
        .cloze-deletion {
          background-color: #3b82f6;
          color: white;
          padding: 2px 8px;
          border-radius: 4px;
          font-weight: bold;
        }
        .cloze-answer {
          background-color: #10b981;
          color: white;
          padding: 2px 8px;
          border-radius: 4px;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default StudySession;
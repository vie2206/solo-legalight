import React, { useState, useEffect, useRef } from 'react';
import { Brain, Loader2, X, BookOpen, Target, Clock, Star, Lightbulb } from 'lucide-react';
import { claudeAIService, ExplanationResponse } from '../../services/claudeAIService';

interface AITextExplainerProps {
  content: string;
  subject: 'legal_reasoning' | 'reading_comprehension' | 'current_affairs' | 'logical_reasoning' | 'quantitative';
  userLevel?: 'beginner' | 'intermediate' | 'advanced';
  onExplanationGenerated?: (explanation: ExplanationResponse) => void;
  className?: string;
}

interface SelectionTooltip {
  x: number;
  y: number;
  selectedText: string;
}

const AITextExplainer: React.FC<AITextExplainerProps> = ({
  content,
  subject,
  userLevel = 'intermediate',
  onExplanationGenerated,
  className = ''
}) => {
  const [selectionTooltip, setSelectionTooltip] = useState<SelectionTooltip | null>(null);
  const [explanation, setExplanation] = useState<ExplanationResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const explanationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (explanationRef.current && !explanationRef.current.contains(event.target as Node)) {
        setShowExplanation(false);
        setSelectionTooltip(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim() && selection.toString().length > 3) {
      const selectedText = selection.toString().trim();
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      
      // Position tooltip above the selection
      setSelectionTooltip({
        x: rect.left + rect.width / 2,
        y: rect.top - 10,
        selectedText
      });
      
      // Clear previous explanation
      setExplanation(null);
      setShowExplanation(false);
    } else {
      setSelectionTooltip(null);
    }
  };

  const requestExplanation = async () => {
    if (!selectionTooltip?.selectedText) return;
    
    setIsLoading(true);
    try {
      const response = await claudeAIService.explainText({
        selectedText: selectionTooltip.selectedText,
        context: content,
        subject,
        userLevel
      });
      
      setExplanation(response);
      setShowExplanation(true);
      onExplanationGenerated?.(response);
    } catch (error) {
      console.error('Failed to get explanation:', error);
      // Show fallback explanation
      setExplanation({
        explanation: "I'm having trouble connecting to the AI service right now. Please try again later.",
        keyPoints: [],
        clatRelevance: 0,
        relatedConcepts: [],
        difficulty: 0,
        timeToUnderstand: 0
      });
      setShowExplanation(true);
    } finally {
      setIsLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return 'text-green-600 bg-green-100';
    if (difficulty <= 4) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getClatRelevanceStars = (relevance: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < relevance / 2 ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className={`relative ${className}`}>
      {/* Main content with selection capability */}
      <div
        ref={contentRef}
        className="prose max-w-none leading-relaxed select-text cursor-text"
        onMouseUp={handleTextSelection}
        style={{ userSelect: 'text' }}
      >
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>

      {/* Selection Tooltip */}
      {selectionTooltip && !showExplanation && (
        <div
          className="fixed z-50 bg-white border border-gray-200 rounded-lg shadow-xl p-3 max-w-sm"
          style={{
            left: selectionTooltip.x,
            top: selectionTooltip.y,
            transform: 'translateX(-50%) translateY(-100%)',
            marginTop: '-10px'
          }}
        >
          <div className="text-sm font-medium mb-2 text-gray-800">
            "{selectionTooltip.selectedText.substring(0, 50)}{selectionTooltip.selectedText.length > 50 ? '...' : ''}"
          </div>
          
          <button
            onClick={requestExplanation}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-all duration-200"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Brain className="w-4 h-4" />
            )}
            {isLoading ? 'Getting AI Explanation...' : 'Get AI Explanation'}
          </button>
        </div>
      )}

      {/* AI Explanation Modal */}
      {showExplanation && explanation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div
            ref={explanationRef}
            className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-xl">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold mb-2">AI Explanation</h3>
                  <p className="text-blue-100 text-sm">
                    "{selectionTooltip?.selectedText.substring(0, 100)}{selectionTooltip?.selectedText && selectionTooltip.selectedText.length > 100 ? '...' : ''}"
                  </p>
                </div>
                <button
                  onClick={() => setShowExplanation(false)}
                  className="text-white hover:text-blue-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Quick Stats */}
              <div className="flex gap-4 mt-4 text-sm">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {explanation.timeToUnderstand}min read
                </div>
                <div className="flex items-center gap-1">
                  <Target className="w-4 h-4" />
                  CLAT: {getClatRelevanceStars(explanation.clatRelevance)}
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(explanation.difficulty)}`}>
                  {explanation.difficulty <= 2 ? 'Easy' : explanation.difficulty <= 4 ? 'Medium' : 'Hard'}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Main Explanation */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Explanation
                </h4>
                <p className="text-blue-800 leading-relaxed">{explanation.explanation}</p>
              </div>

              {/* Key Points */}
              {explanation.keyPoints.length > 0 && (
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Key Points to Remember
                  </h4>
                  <ul className="space-y-2">
                    {explanation.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-2 text-green-800">
                        <span className="w-5 h-5 bg-green-200 text-green-800 rounded-full text-xs flex items-center justify-center font-medium mt-0.5">
                          {index + 1}
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Related Concepts */}
              {explanation.relatedConcepts.length > 0 && (
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-3 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4" />
                    Related Concepts
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {explanation.relatedConcepts.map((concept, index) => (
                      <span
                        key={index}
                        className="bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Practice Questions */}
              {explanation.practiceQuestions && explanation.practiceQuestions.length > 0 && (
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-900 mb-3">Practice Questions</h4>
                  <div className="space-y-4">
                    {explanation.practiceQuestions.map((q, index) => (
                      <div key={index} className="bg-white p-3 rounded border">
                        <p className="font-medium text-gray-900 mb-2">{q.question}</p>
                        <div className="space-y-1">
                          {q.options.map((option, optIndex) => (
                            <div
                              key={optIndex}
                              className={`p-2 rounded text-sm ${
                                optIndex === q.correct
                                  ? 'bg-green-100 text-green-800 font-medium'
                                  : 'bg-gray-50 text-gray-700'
                              }`}
                            >
                              {String.fromCharCode(65 + optIndex)}. {option}
                            </div>
                          ))}
                        </div>
                        <p className="text-xs text-gray-600 mt-2 italic">{q.explanation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-gray-50 p-4 rounded-b-xl text-center">
              <p className="text-xs text-gray-500">
                ✨ Powered by Claude AI • Tailored for CLAT Success
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AITextExplainer;
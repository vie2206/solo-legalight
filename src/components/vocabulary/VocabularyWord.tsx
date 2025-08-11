import React, { useState } from 'react';
import { Volume2, BookOpen, Brain, Target, Star, Clock, Trophy } from 'lucide-react';

interface VocabularyWordProps {
  word: {
    id: string;
    word: string;
    pronunciation: string;
    partOfSpeech: string;
    definition: string;
    synonyms: string[];
    antonyms: string[];
    example: string;
    clatRelevance: number;
    difficulty: number;
    mnemonic: string;
    etymology?: string;
    usage: {
      formal: string;
      informal: string;
    };
    relatedWords: string[];
    mastered: boolean;
    learningProgress: number;
  };
  onMastered: (wordId: string) => void;
  onPractice: (wordId: string) => void;
}

const VocabularyWord: React.FC<VocabularyWordProps> = ({ word, onMastered, onPractice }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showMnemonic, setShowMnemonic] = useState(false);
  
  const playPronunciation = () => {
    const utterance = new SpeechSynthesisUtterance(word.word);
    utterance.rate = 0.7;
    speechSynthesis.speak(utterance);
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return 'bg-green-100 text-green-800 border-green-200';
    if (difficulty <= 4) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const getClatStars = (relevance: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < relevance ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'bg-green-500';
    if (progress >= 60) return 'bg-yellow-500';
    if (progress >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <div className={`bg-white rounded-xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
      word.mastered ? 'border-green-300 bg-green-50' : 'border-gray-200 hover:border-blue-300'
    }`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-bold text-gray-900">{word.word}</h3>
              <button
                onClick={playPronunciation}
                className="p-2 hover:bg-blue-100 rounded-full transition-colors"
                title="Play pronunciation"
              >
                <Volume2 className="w-4 h-4 text-blue-600" />
              </button>
            </div>
            <span className="text-gray-500 font-medium">/{word.pronunciation}/</span>
          </div>
          
          {word.mastered && (
            <div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full">
              <Trophy className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">Mastered</span>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="flex items-center gap-4 mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(word.difficulty)}`}>
            {word.difficulty <= 2 ? 'Easy' : word.difficulty <= 4 ? 'Medium' : 'Hard'}
          </span>
          
          <div className="flex items-center gap-1">
            <Target className="w-3 h-3 text-gray-500" />
            <span className="text-xs text-gray-600">CLAT:</span>
            {getClatStars(word.clatRelevance)}
          </div>
          
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
            {word.partOfSpeech}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700">Learning Progress</span>
            <span className="text-sm text-gray-600">{word.learningProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${getProgressColor(word.learningProgress)}`}
              style={{ width: `${word.learningProgress}%` }}
            />
          </div>
        </div>

        {/* Main Definition */}
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Definition
          </h4>
          <p className="text-blue-800 leading-relaxed">{word.definition}</p>
        </div>

        {/* Example Usage */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-green-900 mb-2">Example</h4>
          <p className="text-green-800 italic">"{word.example}"</p>
        </div>
      </div>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="p-6 space-y-4">
          {/* Synonyms & Antonyms */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-3">Synonyms</h4>
              <div className="flex flex-wrap gap-2">
                {word.synonyms.map((synonym, index) => (
                  <span
                    key={index}
                    className="bg-purple-200 text-purple-800 px-2 py-1 rounded text-sm"
                  >
                    {synonym}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-semibold text-orange-900 mb-3">Antonyms</h4>
              <div className="flex flex-wrap gap-2">
                {word.antonyms.map((antonym, index) => (
                  <span
                    key={index}
                    className="bg-orange-200 text-orange-800 px-2 py-1 rounded text-sm"
                  >
                    {antonym}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Usage Examples */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Usage in Context</h4>
            <div className="space-y-2">
              <div>
                <span className="font-medium text-gray-700">Formal:</span>
                <p className="text-gray-600 italic">"{word.usage.formal}"</p>
              </div>
              <div>
                <span className="font-medium text-gray-700">Informal:</span>
                <p className="text-gray-600 italic">"{word.usage.informal}"</p>
              </div>
            </div>
          </div>

          {/* Mnemonic Device */}
          {word.mnemonic && (
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                <Brain className="w-4 h-4" />
                Memory Trick
                <button
                  onClick={() => setShowMnemonic(!showMnemonic)}
                  className="text-sm text-yellow-700 underline ml-auto"
                >
                  {showMnemonic ? 'Hide' : 'Show'}
                </button>
              </h4>
              {showMnemonic && (
                <p className="text-yellow-800 font-medium">{word.mnemonic}</p>
              )}
            </div>
          )}

          {/* Etymology */}
          {word.etymology && (
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h4 className="font-semibold text-indigo-900 mb-2">Word Origin</h4>
              <p className="text-indigo-800">{word.etymology}</p>
            </div>
          )}

          {/* Related Words */}
          <div className="bg-teal-50 p-4 rounded-lg">
            <h4 className="font-semibold text-teal-900 mb-3">Related Words</h4>
            <div className="flex flex-wrap gap-2">
              {word.relatedWords.map((related, index) => (
                <button
                  key={index}
                  className="bg-teal-200 hover:bg-teal-300 text-teal-800 px-3 py-1 rounded-full text-sm transition-colors"
                >
                  {related}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="p-6 bg-gray-50 rounded-b-xl flex gap-3">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          {isExpanded ? 'Show Less' : 'Learn More'}
        </button>
        
        <button
          onClick={() => onPractice(word.id)}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          Practice
        </button>
        
        {!word.mastered && word.learningProgress >= 80 && (
          <button
            onClick={() => onMastered(word.id)}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <Trophy className="w-4 h-4" />
            Master
          </button>
        )}
      </div>
    </div>
  );
};

export default VocabularyWord;
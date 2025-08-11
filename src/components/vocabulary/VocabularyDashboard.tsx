import React, { useState, useEffect } from 'react';
import { 
  Book, 
  Brain, 
  Target, 
  Trophy, 
  Clock, 
  TrendingUp, 
  Star,
  ChevronRight,
  PlayCircle,
  BarChart3,
  Calendar,
  Flame,
  Award,
  Zap,
  BookOpen
} from 'lucide-react';
import VocabularyWord from './VocabularyWord';
import VocabularyQuiz from './VocabularyQuiz';

interface Word {
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
}

interface UserProgress {
  totalWordsLearned: number;
  wordsThisWeek: number;
  currentStreak: number;
  masteredWords: number;
  averageAccuracy: number;
  weeklyGoal: number;
  rank: string;
  xp: number;
  nextRankXP: number;
}

const VocabularyDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'learn' | 'practice' | 'progress'>('learn');
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizWords, setQuizWords] = useState<string[]>([]);
  const [userProgress, setUserProgress] = useState<UserProgress>({
    totalWordsLearned: 247,
    wordsThisWeek: 18,
    currentStreak: 12,
    masteredWords: 89,
    averageAccuracy: 84,
    weeklyGoal: 25,
    rank: 'Advanced Scholar',
    xp: 2840,
    nextRankXP: 3000
  });

  // Mock vocabulary data - in production this would come from Claude AI
  const [words] = useState<Word[]>([
    {
      id: '1',
      word: 'Aberrant',
      pronunciation: 'əˈberənt',
      partOfSpeech: 'adjective',
      definition: 'Departing from an accepted standard; deviating from the normal type',
      synonyms: ['deviant', 'abnormal', 'atypical', 'irregular'],
      antonyms: ['normal', 'typical', 'standard', 'regular'],
      example: 'The student\'s aberrant behavior during the exam raised concerns among the supervisors.',
      clatRelevance: 4,
      difficulty: 3,
      mnemonic: 'Think "A-BEAR-ant" - a bear acting like an ant would be very abnormal behavior!',
      etymology: 'From Latin aberrare meaning "to wander away from"',
      usage: {
        formal: 'The data showed several aberrant values that required further investigation.',
        informal: 'His aberrant taste in music always surprised his friends.'
      },
      relatedWords: ['deviate', 'anomalous', 'irregular', 'unconventional'],
      mastered: false,
      learningProgress: 75
    },
    {
      id: '2',
      word: 'Meticulous',
      pronunciation: 'məˈtɪkyələs',
      partOfSpeech: 'adjective',
      definition: 'Showing great attention to detail; very careful and precise',
      synonyms: ['careful', 'thorough', 'precise', 'scrupulous'],
      antonyms: ['careless', 'sloppy', 'negligent', 'hasty'],
      example: 'The lawyer\'s meticulous preparation ensured victory in the complex case.',
      clatRelevance: 5,
      difficulty: 2,
      mnemonic: 'ME-TIC-ulous: ME very TIC-ky about details = very careful',
      etymology: 'From Latin meticulosus meaning "fearful, timid"',
      usage: {
        formal: 'The researcher conducted a meticulous analysis of the historical documents.',
        informal: 'She\'s meticulous about her morning routine - every step is planned.'
      },
      relatedWords: ['detailed', 'methodical', 'systematic', 'rigorous'],
      mastered: true,
      learningProgress: 100
    },
    {
      id: '3',
      word: 'Eloquent',
      pronunciation: 'ˈeləkwənt',
      partOfSpeech: 'adjective',
      definition: 'Fluent or persuasive in speaking or writing; clearly expressing ideas',
      synonyms: ['articulate', 'persuasive', 'fluent', 'expressive'],
      antonyms: ['inarticulate', 'tongue-tied', 'unclear', 'mumbling'],
      example: 'The advocate\'s eloquent argument swayed the judge\'s decision.',
      clatRelevance: 5,
      difficulty: 3,
      mnemonic: 'ELO-QUENT: Like ELO rating in chess - high skill in speaking!',
      etymology: 'From Latin eloqui meaning "to speak out"',
      usage: {
        formal: 'Her eloquent speech at the conference impressed the international audience.',
        informal: 'He\'s surprisingly eloquent when talking about his hobbies.'
      },
      relatedWords: ['articulate', 'well-spoken', 'persuasive', 'oratorical'],
      mastered: false,
      learningProgress: 60
    }
  ]);

  const handleWordMastered = (wordId: string) => {
    console.log('Word mastered:', wordId);
    // Update word status and user progress
  };

  const handleWordPractice = (wordId: string) => {
    setQuizWords([wordId]);
    setShowQuiz(true);
  };

  const handleQuizComplete = (results: any) => {
    console.log('Quiz results:', results);
    setShowQuiz(false);
    setQuizWords([]);
    // Update user progress based on results
  };

  const startDailyQuiz = () => {
    const unmastered = words.filter(w => !w.mastered).map(w => w.id);
    setQuizWords(unmastered.slice(0, 10));
    setShowQuiz(true);
  };

  if (showQuiz) {
    return (
      <VocabularyQuiz
        words={quizWords}
        onQuizComplete={handleQuizComplete}
        onExit={() => setShowQuiz(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Book className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Vocabulary Mastery</h1>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                Powered by Claude AI
              </span>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-orange-100 px-3 py-1 rounded-full">
                <Flame className="w-4 h-4 text-orange-600" />
                <span className="font-bold text-orange-800">{userProgress.currentStreak}</span>
                <span className="text-sm text-orange-600">day streak</span>
              </div>
              
              <div className="flex items-center gap-2 bg-purple-100 px-3 py-1 rounded-full">
                <Star className="w-4 h-4 text-purple-600" />
                <span className="font-bold text-purple-800">{userProgress.xp}</span>
                <span className="text-sm text-purple-600">XP</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Words Learned</p>
                <p className="text-2xl font-bold text-blue-600">{userProgress.totalWordsLearned}</p>
              </div>
              <BookOpen className="w-8 h-8 text-blue-500" />
            </div>
            <div className="mt-2">
              <div className="flex items-center text-sm text-green-600">
                <TrendingUp className="w-4 h-4 mr-1" />
                +{userProgress.wordsThisWeek} this week
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Mastered</p>
                <p className="text-2xl font-bold text-green-600">{userProgress.masteredWords}</p>
              </div>
              <Trophy className="w-8 h-8 text-green-500" />
            </div>
            <div className="mt-2">
              <div className="w-full bg-green-100 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${(userProgress.masteredWords / userProgress.totalWordsLearned) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Accuracy</p>
                <p className="text-2xl font-bold text-orange-600">{userProgress.averageAccuracy}%</p>
              </div>
              <Target className="w-8 h-8 text-orange-500" />
            </div>
            <div className="mt-2">
              <div className="w-full bg-orange-100 rounded-full h-2">
                <div
                  className="bg-orange-500 h-2 rounded-full"
                  style={{ width: `${userProgress.averageAccuracy}%` }}
                />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Weekly Goal</p>
                <p className="text-2xl font-bold text-purple-600">{userProgress.wordsThisWeek}/{userProgress.weeklyGoal}</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-500" />
            </div>
            <div className="mt-2">
              <div className="w-full bg-purple-100 rounded-full h-2">
                <div
                  className="bg-purple-500 h-2 rounded-full"
                  style={{ width: `${(userProgress.wordsThisWeek / userProgress.weeklyGoal) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={startDailyQuiz}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-4 rounded-lg flex items-center gap-3 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <PlayCircle className="w-6 h-6" />
              <div className="text-left">
                <div className="font-semibold">Daily Quiz</div>
                <div className="text-sm text-blue-100">Test your knowledge</div>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('learn')}
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white p-4 rounded-lg flex items-center gap-3 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Brain className="w-6 h-6" />
              <div className="text-left">
                <div className="font-semibold">Learn New Words</div>
                <div className="text-sm text-green-100">Expand vocabulary</div>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('progress')}
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white p-4 rounded-lg flex items-center gap-3 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <BarChart3 className="w-6 h-6" />
              <div className="text-left">
                <div className="font-semibold">View Progress</div>
                <div className="text-sm text-purple-100">Track improvement</div>
              </div>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex">
              {[
                { key: 'learn', label: 'Learn Words', icon: Book },
                { key: 'practice', label: 'Practice & Quiz', icon: Target },
                { key: 'progress', label: 'Progress & Stats', icon: BarChart3 }
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as any)}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === key
                      ? 'border-blue-500 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
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
            {activeTab === 'learn' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Vocabulary Words</h3>
                  <div className="flex items-center gap-2">
                    <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm">
                      <option>All Levels</option>
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                    <select className="border border-gray-300 rounded-lg px-3 py-1 text-sm">
                      <option>All Types</option>
                      <option>Adjectives</option>
                      <option>Nouns</option>
                      <option>Verbs</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-6">
                  {words.map((word) => (
                    <VocabularyWord
                      key={word.id}
                      word={word}
                      onMastered={handleWordMastered}
                      onPractice={handleWordPractice}
                    />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'practice' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Practice & Testing</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                    <div className="flex items-center gap-3 mb-4">
                      <Zap className="w-6 h-6 text-blue-600" />
                      <h4 className="font-semibold text-blue-900">Quick Practice</h4>
                    </div>
                    <p className="text-blue-700 mb-4">Test yourself with 5 random words</p>
                    <button
                      onClick={() => {
                        setQuizWords(words.slice(0, 5).map(w => w.id));
                        setShowQuiz(true);
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Start Practice
                    </button>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                    <div className="flex items-center gap-3 mb-4">
                      <Award className="w-6 h-6 text-green-600" />
                      <h4 className="font-semibold text-green-900">Weekly Challenge</h4>
                    </div>
                    <p className="text-green-700 mb-4">Complete 25 words this week</p>
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                      Join Challenge
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'progress' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900">Your Progress</h3>
                
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-xl">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-xl font-bold">{userProgress.rank}</h4>
                      <p className="text-purple-100">Current Level</p>
                    </div>
                    <Trophy className="w-12 h-12 text-yellow-300" />
                  </div>
                  
                  <div className="mb-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress to next rank</span>
                      <span>{userProgress.xp}/{userProgress.nextRankXP} XP</span>
                    </div>
                    <div className="w-full bg-purple-800 bg-opacity-50 rounded-full h-2">
                      <div
                        className="bg-yellow-300 h-2 rounded-full"
                        style={{ width: `${(userProgress.xp / userProgress.nextRankXP) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-xl border shadow-lg">
                    <h4 className="font-semibold text-gray-900 mb-4">Learning Streak</h4>
                    <div className="text-3xl font-bold text-orange-600 mb-2">
                      {userProgress.currentStreak} days
                    </div>
                    <p className="text-gray-600">Keep it up! You're doing great.</p>
                  </div>

                  <div className="bg-white p-6 rounded-xl border shadow-lg">
                    <h4 className="font-semibold text-gray-900 mb-4">This Week</h4>
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {userProgress.wordsThisWeek} words
                    </div>
                    <p className="text-gray-600">
                      {userProgress.weeklyGoal - userProgress.wordsThisWeek} more to reach your goal
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VocabularyDashboard;
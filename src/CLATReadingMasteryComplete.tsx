import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Target, Brain, Award, Clock, TrendingUp, 
  Search, Heart, X, ChevronLeft, ChevronRight, Play, 
  Pause, RotateCcw, Settings, BarChart3, Lightbulb,
  Bookmark, MessageSquare, Highlighter, Volume2, Zap,
  Trophy, Star, Users, Calendar, Download, Share2,
  Eye, Headphones, Sunrise, Moon, Coffee, CheckCircle,
  ArrowRight, Flame, Globe, PenTool, Mic, Camera
} from 'lucide-react';
import AITextExplainer from './components/ai/AITextExplainer';
import ReadingAssessment, { AssessmentResults } from './components/reading/ReadingAssessment';
import ReadingResults from './components/reading/ReadingResults';

const CLATReadingMastery = () => {
  // Core state management
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedPassage, setSelectedPassage] = useState(null);
  const [readingTimer, setReadingTimer] = useState(0);
  const [isReading, setIsReading] = useState(false);
  const [selectedWord, setSelectedWord] = useState<any>(null);
  const [selectedText, setSelectedText] = useState('');
  const [aiQuestions, setAiQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState({});
  
  // User progress state
  const [userStats, setUserStats] = useState({
    readingSpeed: 185,
    comprehensionScore: 78,
    dailyStreak: 12,
    wordsLearned: 247,
    passagesRead: 45,
    level: 'Intermediate Scholar',
    xp: 2840,
    xpToNext: 1160
  });

  // App state
  const [highlights, setHighlights] = useState([]);
  const [personalVocab, setPersonalVocab] = useState(new Set(['jurisprudence', 'precedent', 'constitutional']));
  const [achievements, setAchievements] = useState(['Speed Reader', 'Vocabulary Explorer', 'Daily Warrior']);
  const [readingPreferences, setReadingPreferences] = useState({
    fontSize: 16,
    theme: 'light',
    highlightColor: 'yellow'
  });

  // Flashcard system state
  const [flashcardMode, setFlashcardMode] = useState('review');
  const [currentFlashcard, setCurrentFlashcard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [flashcardStats, setFlashcardStats] = useState({
    easy: 0,
    medium: 0,
    hard: 0,
    streak: 5
  });
  const [vocabLevels, setVocabLevels] = useState({
    'jurisprudence': 'mastered',
    'precedent': 'learning', 
    'constitutional': 'new'
  });

  // GK Quiz system state
  const [currentGKQuestion, setCurrentGKQuestion] = useState(0);
  const [gkQuizMode, setGKQuizMode] = useState('daily');
  const [gkScore, setGKScore] = useState(0);
  const [gkStreak, setGKStreak] = useState(8);
  const [gkAnswers, setGKAnswers] = useState<Record<number, {selected: number, correct: boolean}>>({});
  const [quizTimeLeft, setQuizTimeLeft] = useState(60);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [gkStats, setGKStats] = useState({
    totalQuestions: 145,
    correct: 112,
    accuracy: 77,
    currentAffairs: 85,
    history: 72,
    polity: 88,
    economics: 69,
    legalAwareness: 91
  });

  // Reading Assessment state
  const [assessmentResults, setAssessmentResults] = useState<AssessmentResults | null>(null);

  // Sample passages with enhanced metadata
  const passages = [
    {
      id: 1,
      title: "Digital Rights and Privacy in Modern India",
      type: "Current Affairs",
      source: "Editorial Analysis - The Hindu, 2024",
      difficulty: "Advanced",
      fleschScore: 42,
      gradeLevel: 12.5,
      estimatedTime: "6-8 minutes",
      wordCount: 520,
      tags: ["Technology", "Privacy", "Constitutional Law", "Digital Rights"],
      aiComplexity: 8.5,
      text: `The landmark judgment in Justice K.S. Puttaswamy (Retd.) v. Union of India fundamentally transformed India's approach to digital privacy rights. The Supreme Court's recognition of privacy as a fundamental right under Article 21 has created new paradigms for how technology companies, government agencies, and citizens interact in the digital ecosystem.

This constitutional recognition emerged from growing concerns about surveillance capitalism and the unchecked collection of personal data by both state and non-state actors. The court's nine-judge bench unanimously held that privacy is intrinsic to life and liberty, encompassing informational privacy, bodily privacy, and privacy of choice.

The implications extend far beyond individual rights. Digital platforms now face enhanced scrutiny regarding data collection practices, algorithmic transparency, and user consent mechanisms. The Personal Data Protection Bill, currently under parliamentary consideration, seeks to operationalize these constitutional principles through comprehensive regulatory frameworks.

However, implementation challenges persist. Balancing national security imperatives with individual privacy rights requires nuanced approaches that neither compromise legitimate governance needs nor undermine constitutional protections.`,
      vocabulary: [
        {
          word: "paradigms",
          definition: "A typical example or pattern of something; a model or framework of concepts",
          context: "created new paradigms for how technology companies interact",
          etymology: "From Greek 'paradeigma' meaning 'pattern, example'",
          difficulty: "advanced"
        },
        {
          word: "intrinsic",
          definition: "Belonging naturally; essential; inherent to the basic nature of something",
          context: "privacy is intrinsic to life and liberty",
          etymology: "From Latin 'intrinsecus' meaning 'inwardly, on the inside'",
          difficulty: "intermediate"
        }
      ]
    },
    {
      id: 2,
      title: "Climate Change and Intergenerational Justice",
      type: "Current Affairs",
      source: "Environmental Law Review - 2024",
      difficulty: "Intermediate",
      fleschScore: 58,
      gradeLevel: 9.8,
      estimatedTime: "5-7 minutes",
      wordCount: 445,
      tags: ["Environment", "Climate Change", "Justice", "Future Generations"],
      aiComplexity: 7.2,
      text: `Climate change litigation has emerged as a powerful tool for enforcing environmental obligations and protecting intergenerational equity. Courts worldwide increasingly recognize that present-day carbon emissions create legally cognizable harms for future generations, challenging traditional notions of standing and remedy in environmental law.

The landmark Urgenda decision by the Dutch Supreme Court exemplifies this trend. The court held that the Netherlands government had a legal duty to reduce greenhouse gas emissions by at least 25% by 2020, based on human rights obligations to protect citizens from climate change impacts.

Similar litigation strategies have gained traction globally. In Germany, the Federal Constitutional Court ruled that insufficient climate action violates the rights of younger generations. The court emphasized that current emissions consume the limited carbon budget available for future decades.

India faces unique challenges in climate litigation. While the country contributes relatively little to historical emissions, it experiences severe climate impacts affecting millions of vulnerable citizens.`,
      vocabulary: [
        {
          word: "cognizable",
          definition: "Capable of being perceived, known, or legally recognized",
          context: "create legally cognizable harms for future generations",
          etymology: "From Latin 'cognoscere' meaning 'to get to know'",
          difficulty: "intermediate"
        }
      ]
    }
  ];

  // CLAT-based GK Questions Database
  const gkQuestionsDatabase = [
    {
      id: 1,
      category: "Current Affairs",
      difficulty: "intermediate",
      points: 10,
      question: "Which country assumed the G20 presidency in December 2024?",
      options: ["Brazil", "South Africa", "Turkey", "Australia"],
      correct: 0,
      explanation: "Brazil assumed the G20 presidency from India in December 2024, following India's successful presidency year.",
      source: "G20 Summit 2024",
      tags: ["International Relations", "G20", "2024"]
    },
    {
      id: 2,
      category: "Constitutional Law",
      difficulty: "advanced",
      points: 15,
      question: "The concept of 'Cooperative Federalism' in India emphasizes:",
      options: [
        "Competition between Centre and States",
        "Collaboration between Centre and States for governance",
        "Complete autonomy of States",
        "Central control over all subjects"
      ],
      correct: 1,
      explanation: "Cooperative Federalism emphasizes collaboration and partnership between the Centre and States in governance and policy implementation.",
      source: "Constitutional Governance",
      tags: ["Federalism", "Centre-State Relations", "Governance"]
    },
    {
      id: 3,
      category: "Legal Awareness",
      difficulty: "intermediate",
      points: 10,
      question: "Under which Article of the Constitution is the right to constitutional remedies guaranteed?",
      options: ["Article 32", "Article 21", "Article 19", "Article 14"],
      correct: 0,
      explanation: "Article 32 is known as the 'Right to Constitutional Remedies' and is called the 'heart and soul' of the Constitution by Dr. B.R. Ambedkar.",
      source: "Fundamental Rights",
      tags: ["Constitutional Remedies", "Article 32", "Fundamental Rights"]
    },
    {
      id: 4,
      category: "Current Affairs",
      difficulty: "beginner",
      points: 5,
      question: "Which space mission successfully landed on the Moon's South Pole in August 2023?",
      options: ["Chandrayaan-2", "Chandrayaan-3", "Mangalyaan", "Aditya L1"],
      correct: 1,
      explanation: "Chandrayaan-3 successfully landed on the Moon's South Pole on August 23, 2023, making India the first country to achieve this feat.",
      source: "ISRO Achievements 2023",
      tags: ["Space Technology", "ISRO", "Chandrayaan-3"]
    },
    {
      id: 5,
      category: "Economics",
      difficulty: "advanced",
      points: 15,
      question: "The Digital Personal Data Protection Act, 2023 primarily aims to:",
      options: [
        "Regulate cryptocurrency trading",
        "Protect individual privacy and data rights",
        "Promote digital payments",
        "Control social media platforms"
      ],
      correct: 1,
      explanation: "The Digital Personal Data Protection Act, 2023 focuses on protecting personal data and giving individuals control over their digital information.",
      source: "Data Protection Laws 2023",
      tags: ["Data Protection", "Privacy Rights", "Digital Law"]
    },
    {
      id: 6,
      category: "History",
      difficulty: "intermediate",
      points: 10,
      question: "The Quit India Movement was launched in which year?",
      options: ["1940", "1942", "1944", "1946"],
      correct: 1,
      explanation: "The Quit India Movement was launched by Mahatma Gandhi on August 8, 1942, demanding an end to British rule in India.",
      source: "Freedom Struggle",
      tags: ["Independence Movement", "Gandhi", "1942"]
    },
    {
      id: 7,
      category: "Current Affairs",
      difficulty: "advanced",
      points: 15,
      question: "The Unified Payments Interface (UPI) was developed by:",
      options: ["RBI", "NPCI", "SBI", "Ministry of Finance"],
      correct: 1,
      explanation: "UPI was developed by the National Payments Corporation of India (NPCI) to facilitate instant money transfers.",
      source: "Digital Payment Systems",
      tags: ["UPI", "Digital Payments", "NPCI"]
    },
    {
      id: 8,
      category: "Polity",
      difficulty: "intermediate",
      points: 10,
      question: "The tenure of the Chief Election Commissioner is:",
      options: ["5 years", "6 years", "Until 65 years of age", "6 years or 65 years, whichever is earlier"],
      correct: 3,
      explanation: "The Chief Election Commissioner serves for 6 years or until reaching 65 years of age, whichever is earlier.",
      source: "Election Commission",
      tags: ["Election Commission", "CEC", "Constitutional Bodies"]
    },
    {
      id: 9,
      category: "Legal Awareness",
      difficulty: "advanced",
      points: 15,
      question: "The doctrine of 'Separation of Powers' in the Indian Constitution is:",
      options: [
        "Explicitly mentioned in Article 50",
        "Not explicitly mentioned but implied",
        "Completely absent",
        "Only applicable to the Supreme Court"
      ],
      correct: 1,
      explanation: "While not explicitly mentioned, the doctrine of separation of powers is implied through the division of functions among legislature, executive, and judiciary.",
      source: "Constitutional Principles",
      tags: ["Separation of Powers", "Constitutional Doctrine", "Governance"]
    },
    {
      id: 10,
      category: "Current Affairs",
      difficulty: "beginner",
      points: 5,
      question: "Which Indian city hosted the G20 Summit in 2023?",
      options: ["Mumbai", "New Delhi", "Bengaluru", "Hyderabad"],
      correct: 1,
      explanation: "New Delhi hosted the G20 Leaders' Summit in September 2023 under India's G20 presidency.",
      source: "G20 Summit 2023",
      tags: ["G20", "Summit", "New Delhi"]
    },
    {
      id: 11,
      category: "Economics",
      difficulty: "intermediate",
      points: 10,
      question: "The Goods and Services Tax (GST) was implemented in India in:",
      options: ["June 2017", "July 2017", "August 2017", "September 2017"],
      correct: 1,
      explanation: "GST was implemented on July 1, 2017, replacing multiple indirect taxes with a unified tax system.",
      source: "Tax Reforms",
      tags: ["GST", "Tax System", "Economic Reforms"]
    },
    {
      id: 12,
      category: "Environment",
      difficulty: "advanced",
      points: 15,
      question: "The Paris Agreement on Climate Change came into effect in:",
      options: ["2015", "2016", "2017", "2018"],
      correct: 1,
      explanation: "The Paris Agreement came into effect on November 4, 2016, after being adopted in 2015.",
      source: "Climate Change",
      tags: ["Paris Agreement", "Climate Change", "Environment"]
    },
    {
      id: 13,
      category: "Polity",
      difficulty: "beginner",
      points: 5,
      question: "How many fundamental rights are guaranteed by the Indian Constitution?",
      options: ["5", "6", "7", "8"],
      correct: 1,
      explanation: "The Indian Constitution guarantees 6 fundamental rights: Right to Equality, Right to Freedom, Right against Exploitation, Right to Freedom of Religion, Cultural and Educational Rights, and Right to Constitutional Remedies.",
      source: "Fundamental Rights",
      tags: ["Fundamental Rights", "Constitution", "Basic Rights"]
    },
    {
      id: 14,
      category: "Current Affairs",
      difficulty: "intermediate",
      points: 10,
      question: "India's first bullet train project connects which two cities?",
      options: ["Delhi-Mumbai", "Mumbai-Ahmedabad", "Chennai-Bengaluru", "Kolkata-Bhubaneswar"],
      correct: 1,
      explanation: "India's first bullet train project, developed with Japanese assistance, connects Mumbai and Ahmedabad in Gujarat.",
      source: "Infrastructure Development",
      tags: ["Bullet Train", "Infrastructure", "Mumbai-Ahmedabad"]
    },
    {
      id: 15,
      category: "Legal Awareness",
      difficulty: "beginner",
      points: 5,
      question: "The Right to Information Act was enacted in which year?",
      options: ["2003", "2005", "2007", "2009"],
      correct: 1,
      explanation: "The Right to Information Act was enacted in 2005 to promote transparency and accountability in government functioning.",
      source: "RTI Act",
      tags: ["RTI", "Transparency", "Government Accountability"]
    },
    {
      id: 16,
      category: "History",
      difficulty: "advanced",
      points: 15,
      question: "The Doctrine of Lapse was introduced by:",
      options: ["Lord Cornwallis", "Lord Wellesley", "Lord Dalhousie", "Lord Curzon"],
      correct: 2,
      explanation: "The Doctrine of Lapse was introduced by Lord Dalhousie, allowing the British to annex princely states without natural heirs.",
      source: "British Colonial Policy",
      tags: ["Doctrine of Lapse", "British Rule", "Lord Dalhousie"]
    },
    {
      id: 17,
      category: "Economics",
      difficulty: "beginner",
      points: 5,
      question: "What does GDP stand for?",
      options: ["Gross Domestic Product", "General Development Program", "Global Domestic Policy", "Gross Development Plan"],
      correct: 0,
      explanation: "GDP stands for Gross Domestic Product, which measures the total value of goods and services produced within a country.",
      source: "Economic Indicators",
      tags: ["GDP", "Economics", "Economic Indicators"]
    },
    {
      id: 18,
      category: "Current Affairs",
      difficulty: "advanced",
      points: 15,
      question: "The 'One Nation, One Election' proposal primarily aims to:",
      options: [
        "Reduce election expenditure and governance disruption",
        "Increase voter turnout",
        "Strengthen regional parties",
        "Promote coalition governments"
      ],
      correct: 0,
      explanation: "The 'One Nation, One Election' proposal aims to conduct Lok Sabha and State Assembly elections simultaneously to reduce costs and minimize governance disruption.",
      source: "Electoral Reforms",
      tags: ["One Nation One Election", "Electoral Reforms", "Governance"]
    },
    {
      id: 19,
      category: "Legal Awareness",
      difficulty: "intermediate",
      points: 10,
      question: "Which Article of the Constitution deals with the procedure for constitutional amendments?",
      options: ["Article 356", "Article 368", "Article 370", "Article 377"],
      correct: 1,
      explanation: "Article 368 provides the procedure for constitutional amendments, requiring special majority in both houses of Parliament.",
      source: "Constitutional Amendment",
      tags: ["Article 368", "Constitutional Amendment", "Parliament"]
    },
    {
      id: 20,
      category: "Environment",
      difficulty: "intermediate",
      points: 10,
      question: "The National Action Plan on Climate Change (NAPCC) includes how many missions?",
      options: ["6", "8", "10", "12"],
      correct: 1,
      explanation: "NAPCC includes 8 national missions: Solar, Enhanced Energy Efficiency, Sustainable Habitat, Water, Sustaining Himalayan Ecosystem, Green India, Sustainable Agriculture, and Strategic Knowledge.",
      source: "Climate Policy",
      tags: ["NAPCC", "Climate Change", "National Missions"]
    },
    {
      id: 21,
      category: "Polity",
      difficulty: "advanced",
      points: 15,
      question: "The concept of 'Basic Structure' of the Constitution was established in which landmark case?",
      options: ["Golaknath case", "Kesavananda Bharati case", "Minerva Mills case", "Maneka Gandhi case"],
      correct: 1,
      explanation: "The Basic Structure doctrine was established in Kesavananda Bharati v. State of Kerala (1973), limiting Parliament's power to amend the Constitution.",
      source: "Constitutional Law",
      tags: ["Basic Structure", "Kesavananda Bharati", "Supreme Court"]
    },
    {
      id: 22,
      category: "Current Affairs",
      difficulty: "beginner",
      points: 5,
      question: "Which Indian state has the longest coastline?",
      options: ["Tamil Nadu", "Gujarat", "Andhra Pradesh", "Maharashtra"],
      correct: 1,
      explanation: "Gujarat has the longest coastline in India, stretching over 1,600 kilometers along the Arabian Sea.",
      source: "Indian Geography",
      tags: ["Coastline", "Gujarat", "Geography"]
    },
    {
      id: 23,
      category: "History",
      difficulty: "beginner",
      points: 5,
      question: "Who was the first President of India?",
      options: ["Jawaharlal Nehru", "Dr. Rajendra Prasad", "Dr. S. Radhakrishnan", "Dr. A.P.J. Abdul Kalam"],
      correct: 1,
      explanation: "Dr. Rajendra Prasad was the first President of India, serving from 1950 to 1962.",
      source: "Indian Presidents",
      tags: ["President", "Rajendra Prasad", "Indian History"]
    },
    {
      id: 24,
      category: "Economics",
      difficulty: "advanced",
      points: 15,
      question: "The Insolvency and Bankruptcy Code (IBC) was enacted in which year?",
      options: ["2014", "2016", "2017", "2018"],
      correct: 1,
      explanation: "The Insolvency and Bankruptcy Code was enacted in 2016 to consolidate laws relating to insolvency and bankruptcy.",
      source: "Economic Legislation",
      tags: ["IBC", "Bankruptcy", "Economic Reforms"]
    },
    {
      id: 25,
      category: "Legal Awareness",
      difficulty: "advanced",
      points: 15,
      question: "The term 'Judicial Review' refers to:",
      options: [
        "Review of judicial appointments",
        "Power of courts to examine the constitutionality of laws",
        "Annual review of court cases",
        "Review of judicial salaries"
      ],
      correct: 1,
      explanation: "Judicial Review is the power of courts to examine and determine the constitutionality of legislative acts and executive actions.",
      source: "Constitutional Law",
      tags: ["Judicial Review", "Constitutional Law", "Courts"]
    }
  ];

  // Enhanced vocabulary database
  const vocabularyDatabase = [
    {
      word: "ephemeral",
      definition: "Lasting for a very short time; transitory",
      context: "The ephemeral nature of social media trends",
      etymology: "From Greek 'ephēmeros' meaning 'lasting only a day'",
      difficulty: "advanced",
      tags: ["literary", "time", "temporary"]
    },
    {
      word: "ubiquitous",
      definition: "Present, appearing, or found everywhere",
      context: "Smartphones have become ubiquitous in modern society",
      etymology: "From Latin 'ubique' meaning 'everywhere'",
      difficulty: "intermediate",
      tags: ["technology", "society", "common"]
    }
  ];

  // Timer management
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isReading) {
      interval = setInterval(() => {
        setReadingTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isReading]);

  // Utility functions
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const calculateReadingSpeed = (wordCount: number, timeInSeconds: number) => {
    if (timeInSeconds === 0) return 0;
    return Math.round((wordCount / timeInSeconds) * 60);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-orange-100 text-orange-700';
      case 'expert': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // Interactive text handlers
  const handleWordClick = (word: string, context: string) => {
    const cleanWord = word.toLowerCase().replace(/[^\w]/g, '');
    const vocabItem = vocabularyDatabase.find(v => v.word === cleanWord) ||
                     (selectedPassage as any)?.vocabulary?.find((v: any) => v.word === cleanWord);
    
    if (vocabItem) {
      setSelectedWord({ ...vocabItem, originalWord: word, context });
    } else {
      setSelectedWord({
        word: cleanWord,
        originalWord: word,
        definition: `An important term in this context. Tap 'Add to Vocabulary' to learn more with AI assistance.`,
        context: context,
        needsAI: true
      });
    }
  };

  const addToPersonalVocab = (word: string) => {
    const newVocab = new Set(personalVocab);
    newVocab.add(word);
    setPersonalVocab(newVocab);
    
    setUserStats(prev => ({
      ...prev,
      wordsLearned: prev.wordsLearned + 1,
      xp: prev.xp + 10
    }));
  };

  const startReading = (passage: any) => {
    setSelectedPassage(passage);
    setCurrentScreen('reader');
    setReadingTimer(0);
    setIsReading(true);
  };

  // Component screens
  const HomeScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Enhanced Header */}
      <div className="bg-white shadow-sm border-b border-gray-100 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">CLAT Reading Mastery</h1>
              <p className="text-sm text-gray-500">AI-Powered Learning Platform</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 px-3 py-1 rounded-full">
              <span className="text-white text-sm font-semibold flex items-center">
                <Flame className="w-4 h-4 mr-1" />
                {userStats.dailyStreak}
              </span>
            </div>
            <button 
              onClick={() => setCurrentScreen('settings')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Settings className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Level Progress */}
      <div className="px-6 py-4">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{userStats.level}</h3>
                <p className="text-sm text-gray-500">{userStats.xp} XP</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Next Level</p>
              <p className="text-sm font-semibold text-indigo-600">{userStats.xpToNext} XP to go</p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-purple-500 to-indigo-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${(userStats.xp / (userStats.xp + userStats.xpToNext)) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="px-6 space-y-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-medium text-gray-600">READING SPEED</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{userStats.readingSpeed}</p>
            <p className="text-xs text-gray-500">words/min</p>
            <div className="mt-2 flex items-center text-xs text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              +15% this week
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-2">
              <Brain className="w-4 h-4 text-purple-500" />
              <span className="text-xs font-medium text-gray-600">ACCURACY</span>
            </div>
            <p className={`text-2xl font-bold ${getScoreColor(userStats.comprehensionScore)}`}>
              {userStats.comprehensionScore}%
            </p>
            <p className="text-xs text-gray-500">avg score</p>
            <div className="mt-2 flex items-center text-xs text-green-600">
              <TrendingUp className="w-3 h-3 mr-1" />
              +8% this month
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-2">
              <BookOpen className="w-4 h-4 text-green-500" />
              <span className="text-xs font-medium text-gray-600">PASSAGES</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{userStats.passagesRead}</p>
            <p className="text-xs text-gray-500">completed</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-medium text-gray-600">VOCABULARY</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{userStats.wordsLearned}</p>
            <p className="text-xs text-gray-500">words learned</p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-2 mb-2">
              <Globe className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-medium text-gray-600">GK SCORE</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{gkStats.accuracy}%</p>
            <p className="text-xs text-gray-500">quiz accuracy</p>
            <div className="mt-2 flex items-center text-xs text-blue-600">
              <ArrowRight className="w-3 h-3 mr-1" />
              {gkStreak} day streak
            </div>
          </div>
        </div>

        {/* Daily Goal Progress */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-gray-900 flex items-center">
              <Target className="w-4 h-4 mr-2 text-indigo-500" />
              Today's Goals
            </h3>
            <span className="text-sm text-gray-500">3/5 completed</span>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Read 3 passages</span>
              <CheckCircle className="w-4 h-4 text-green-500" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Learn 5 new words</span>
              <CheckCircle className="w-4 h-4 text-green-500" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Maintain 80% accuracy</span>
              <CheckCircle className="w-4 h-4 text-green-500" />
            </div>
          </div>
          
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full" style={{ width: '60%' }}></div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <button 
            onClick={() => setCurrentScreen('passages')}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl py-4 px-6 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
          >
            <div className="flex items-center justify-center space-x-2">
              <Play className="w-5 h-5" />
              <span>Start AI-Powered Reading</span>
              <Zap className="w-5 h-5" />
            </div>
          </button>

          <button 
            onClick={() => setCurrentScreen('gk-quiz')}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl py-4 px-6 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
          >
            <div className="flex items-center justify-center space-x-2">
              <Globe className="w-5 h-5" />
              <span>Daily GK Challenge</span>
              <Trophy className="w-5 h-5" />
            </div>
          </button>

          <button 
            onClick={() => setCurrentScreen('assessment')}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl py-4 px-6 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
          >
            <div className="flex items-center justify-center space-x-2">
              <Brain className="w-5 h-5" />
              <span>Reading Assessment</span>
              <Target className="w-5 h-5" />
            </div>
          </button>
          
          <div className="grid grid-cols-5 gap-3">
            <button 
              onClick={() => setCurrentScreen('vocabulary')}
              className="bg-white text-gray-700 rounded-xl py-3 px-3 font-medium border border-gray-200 hover:border-purple-300 hover:shadow-md transition-all duration-200"
            >
              <div className="flex flex-col items-center space-y-1">
                <Brain className="w-5 h-5" />
                <span className="text-xs">Vocabulary</span>
              </div>
            </button>
            
            <button 
              onClick={() => setCurrentScreen('flashcards')}
              className="bg-white text-gray-700 rounded-xl py-3 px-3 font-medium border border-gray-200 hover:border-green-300 hover:shadow-md transition-all duration-200"
            >
              <div className="flex flex-col items-center space-y-1">
                <MessageSquare className="w-5 h-5" />
                <span className="text-xs">Flashcards</span>
              </div>
            </button>
            
            <button 
              onClick={() => setCurrentScreen('gk-quiz')}
              className="bg-white text-gray-700 rounded-xl py-3 px-3 font-medium border border-gray-200 hover:border-yellow-300 hover:shadow-md transition-all duration-200"
            >
              <div className="flex flex-col items-center space-y-1">
                <Globe className="w-5 h-5" />
                <span className="text-xs">GK Quiz</span>
              </div>
            </button>
            
            <button 
              onClick={() => setCurrentScreen('challenges')}
              className="bg-white text-gray-700 rounded-xl py-3 px-3 font-medium border border-gray-200 hover:border-yellow-300 hover:shadow-md transition-all duration-200"
            >
              <div className="flex flex-col items-center space-y-1">
                <Trophy className="w-5 h-5" />
                <span className="text-xs">Challenges</span>
              </div>
            </button>
            
            <button 
              onClick={() => setCurrentScreen('analytics')}
              className="bg-white text-gray-700 rounded-xl py-3 px-3 font-medium border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
            >
              <div className="flex flex-col items-center space-y-1">
                <BarChart3 className="w-5 h-5" />
                <span className="text-xs">Analytics</span>
              </div>
            </button>
          </div>
        </div>

        {/* Recent Achievements */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
            <Award className="w-4 h-4 mr-2 text-yellow-500" />
            Recent Achievements
          </h3>
          <div className="space-y-2">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-center space-x-3 p-2 bg-yellow-50 rounded-lg">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium text-gray-700">{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const GKQuizScreen = () => {
    const currentQuestion = gkQuestionsDatabase[currentGKQuestion];

    const handleGKAnswer = (selectedOption: number) => {
      const isCorrect = selectedOption === currentQuestion.correct;
      
      setGKAnswers(prev => ({
        ...prev,
        [currentQuestion.id]: {
          selected: selectedOption,
          correct: isCorrect,
          points: isCorrect ? currentQuestion.points : 0
        }
      }));

      if (isCorrect) {
        setGKScore(prev => prev + currentQuestion.points);
        setUserStats(prev => ({
          ...prev,
          xp: prev.xp + currentQuestion.points
        }));
      }

      setTimeout(() => {
        if (currentGKQuestion < gkQuestionsDatabase.length - 1) {
          setCurrentGKQuestion(prev => prev + 1);
        } else {
          setCurrentScreen('home');
        }
      }, 1500);
    };

    const getCategoryColor = (category: string) => {
      const colors = {
        'Current Affairs': 'bg-blue-100 text-blue-700',
        'Constitutional Law': 'bg-purple-100 text-purple-700',
        'Legal Awareness': 'bg-indigo-100 text-indigo-700',
        'Economics': 'bg-green-100 text-green-700',
        'History': 'bg-yellow-100 text-yellow-700',
        'Polity': 'bg-red-100 text-red-700',
        'Environment': 'bg-emerald-100 text-emerald-700'
      };
      return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-700';
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <div className="bg-white shadow-sm border-b border-gray-100 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setCurrentScreen('home')}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-emerald-500" />
                  CLAT GK Challenge
                </h2>
                <p className="text-sm text-gray-500">
                  Question {currentGKQuestion + 1} of {gkQuestionsDatabase.length}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-3 py-1 rounded-full">
                <span className="text-white text-sm font-semibold">
                  🏆 {gkScore} pts
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-3 bg-gray-50">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentGKQuestion + 1) / gkQuestionsDatabase.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {currentQuestion && (
          <div className="px-6 pb-8 pt-6">
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(currentQuestion.category)}`}>
                    {currentQuestion.category}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(currentQuestion.difficulty)}`}>
                      {currentQuestion.difficulty}
                    </span>
                    <span className="text-emerald-600 font-bold text-sm">
                      +{currentQuestion.points} pts
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-6 leading-relaxed">
                  {currentQuestion.question}
                </h3>

                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => {
                    const isSelected = gkAnswers[currentQuestion.id]?.selected === index;
                    const isCorrect = index === currentQuestion.correct;
                    const showResult = gkAnswers[currentQuestion.id] !== undefined;
                    
                    let buttonClass = "w-full text-left p-4 rounded-lg border transition-all duration-200 ";
                    
                    if (showResult) {
                      if (isCorrect) {
                        buttonClass += "border-green-500 bg-green-50 text-green-800";
                      } else if (isSelected) {
                        buttonClass += "border-red-500 bg-red-50 text-red-800";
                      } else {
                        buttonClass += "border-gray-200 bg-gray-50 text-gray-500";
                      }
                    } else {
                      buttonClass += "border-gray-200 hover:border-emerald-300 hover:bg-emerald-50 cursor-pointer";
                    }

                    return (
                      <button
                        key={index}
                        onClick={() => !showResult && handleGKAnswer(index)}
                        disabled={showResult}
                        className={buttonClass}
                      >
                        <div className="flex items-center space-x-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold ${
                            showResult && isCorrect ? 'bg-green-500 border-green-500 text-white' :
                            showResult && isSelected && !isCorrect ? 'bg-red-500 border-red-500 text-white' :
                            'border-gray-300 text-gray-600'
                          }`}>
                            {String.fromCharCode(65 + index)}
                          </div>
                          <span className="font-medium">{option}</span>
                          {showResult && isCorrect && (
                            <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                          )}
                          {showResult && isSelected && !isCorrect && (
                            <X className="w-5 h-5 text-red-500 ml-auto" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {gkAnswers[currentQuestion.id] && (
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Explanation</h4>
                    <p className="text-blue-800 text-sm leading-relaxed">{currentQuestion.explanation}</p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-blue-600 text-xs">Source: {currentQuestion.source}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Reader Screen with AI Text Explainer
  const ReaderScreen = () => {
    if (!selectedPassage) return null;

    const passage = selectedPassage as any;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        {/* Enhanced Header */}
        <div className="bg-white shadow-sm border-b border-gray-100 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setCurrentScreen('home')}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-blue-500" />
                  AI-Powered Reading
                </h2>
                <p className="text-sm text-gray-500">
                  Highlight any text to get instant AI explanations
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {isReading && (
                <div className="bg-green-100 px-3 py-1 rounded-full">
                  <span className="text-green-700 text-sm font-medium flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {Math.floor(readingTimer / 60)}:{(readingTimer % 60).toString().padStart(2, '0')}
                  </span>
                </div>
              )}
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-3 py-1 rounded-full">
                <span className="text-white text-sm font-semibold">
                  ⚡ AI Explainer Active
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-3 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Reading Progress</span>
              <span>{passage.title}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: '45%' }}
              ></div>
            </div>
          </div>
        </div>

        {/* Main Reading Interface */}
        <div className="px-6 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Passage Metadata */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{passage.title}</h1>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {passage.estimatedTime} min read
                    </span>
                    <span className="flex items-center gap-1">
                      <Target className="w-4 h-4" />
                      Difficulty: {passage.difficulty}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      CLAT {passage.clatRelevance}/10
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-blue-600">{passage.aiComplexity}/10</div>
                  <div className="text-sm text-gray-500">AI Complexity</div>
                </div>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {passage.tags && passage.tags.map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* AI Text Explainer with Passage Content */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border-l-4 border-blue-500">
                <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  How to Use AI Explainer
                </h3>
                <p className="text-blue-800 text-sm">
                  Highlight any word, phrase, or sentence to get instant AI-powered explanations. 
                  Perfect for understanding complex legal concepts, vocabulary, and contextual meanings.
                </p>
              </div>

              <AITextExplainer
                content={passage.text || passage.content || "This is a sample passage for AI explanation demonstration."}
                subject="reading_comprehension"
                userLevel="intermediate"
                onExplanationGenerated={(explanation) => {
                  console.log('AI Explanation generated:', explanation);
                  // Track user engagement with AI explanations
                }}
                className="text-lg leading-relaxed"
              />
            </div>

            {/* Reading Actions */}
            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={() => setCurrentScreen('home')}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Finish Reading
              </button>
              <button
                onClick={() => {
                  // Start practice questions for this passage
                  setCurrentScreen('practice-questions');
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Practice Questions
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Passages Library Screen
  const PassagesScreen = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="bg-white shadow-sm border-b border-gray-100 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setCurrentScreen('home')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Reading Passages</h2>
              <p className="text-sm text-gray-500">Choose a passage to start reading</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-4">
            {passages.map((passage: any, index: number) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-all duration-200 cursor-pointer"
                onClick={() => startReading(passage)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{passage.title}</h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{passage.preview || passage.text?.substring(0, 150) + "..."}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {passage.estimatedTime || 5} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Target className="w-4 h-4" />
                        {passage.difficulty || 'Medium'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Brain className="w-4 h-4" />
                        AI Complexity: {passage.aiComplexity || 7}/10
                      </span>
                    </div>
                  </div>
                  
                  <div className="ml-4">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      CLAT {passage.clatRelevance || 8}/10
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Placeholder screens
  const VocabularyScreen = () => <div>Vocabulary Screen - Coming Soon</div>;
  const FlashcardsScreen = () => <div>Flashcards Screen - Coming Soon</div>;
  const ChallengesScreen = () => <div>Challenges Screen - Coming Soon</div>;
  const AnalyticsScreen = () => <div>Analytics Screen - Coming Soon</div>;

  // Screen Router
  const renderScreen = () => {
    switch (currentScreen) {
      case 'gk-quiz': return <GKQuizScreen />;
      case 'reader': return <ReaderScreen />;
      case 'passages': return <PassagesScreen />;
      case 'vocabulary': return <VocabularyScreen />;
      case 'flashcards': return <FlashcardsScreen />;
      case 'challenges': return <ChallengesScreen />;
      case 'analytics': return <AnalyticsScreen />;
      case 'assessment': return (
        <ReadingAssessment
          onComplete={(results) => {
            setAssessmentResults(results);
            setCurrentScreen('assessment-results');
          }}
          onBack={() => setCurrentScreen('home')}
        />
      );
      case 'assessment-results': return assessmentResults ? (
        <ReadingResults
          results={assessmentResults}
          onRetake={() => {
            setAssessmentResults(null);
            setCurrentScreen('assessment');
          }}
          onContinueLearning={() => setCurrentScreen('passages')}
          onBack={() => setCurrentScreen('home')}
        />
      ) : <HomeScreen />;
      default: return <HomeScreen />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white min-h-screen relative overflow-hidden">
      {renderScreen()}
    </div>
  );
};

export default CLATReadingMastery;
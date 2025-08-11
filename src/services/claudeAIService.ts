// Claude AI Integration Service for SOLO by Legalight
interface ClaudeAIConfig {
  apiKey: string;
  baseURL: string;
  model: string;
}

interface ExplanationRequest {
  selectedText: string;
  context: string;
  subject: 'legal_reasoning' | 'reading_comprehension' | 'current_affairs' | 'logical_reasoning' | 'quantitative';
  userLevel?: 'beginner' | 'intermediate' | 'advanced';
}

interface ExplanationResponse {
  explanation: string;
  keyPoints: string[];
  clatRelevance: number;
  relatedConcepts: string[];
  difficulty: number;
  timeToUnderstand: number;
  practiceQuestions?: Array<{
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  }>;
}

interface QuestionGenerationRequest {
  topic: string;
  subject: string;
  difficulty: number;
  count: number;
  userWeaknesses?: string[];
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
}

class ClaudeAIService {
  private config: ClaudeAIConfig;
  private apiBase: string;

  constructor() {
    this.config = {
      apiKey: process.env.REACT_APP_CLAUDE_API_KEY || '',
      baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
      model: 'claude-3-sonnet-20240229'
    };
    this.apiBase = this.config.baseURL;
  }

  private async makeAPIRequest(endpoint: string, data: any): Promise<any> {
    const response = await fetch(`${this.apiBase}/api/ai/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return await response.json();
  }

  // Text Highlighting & AI Explanation (like AWS Explainer)
  async explainText(request: ExplanationRequest): Promise<ExplanationResponse> {
    try {
      const response = await this.makeAPIRequest('explain-text', {
        selectedText: request.selectedText,
        context: request.context,
        subject: request.subject,
        userLevel: request.userLevel || 'intermediate'
      });

      return {
        explanation: response.explanation,
        keyPoints: response.keyPoints || [],
        clatRelevance: response.clatRelevance || 5,
        relatedConcepts: response.relatedConcepts || [],
        difficulty: response.difficulty || 3,
        timeToUnderstand: response.timeToUnderstand || 2,
        practiceQuestions: response.practiceQuestions || []
      };
    } catch (error) {
      console.error('Failed to get explanation:', error);
      throw error;
    }
  }

  // Vocabulary Enhancement
  async enhanceVocabulary(word: string, context: string): Promise<{
    definition: string;
    synonyms: string[];
    antonyms: string[];
    example: string;
    mnemonic: string;
    clatUsage: string;
  }> {
    try {
      const response = await this.makeAPIRequest('enhance-vocabulary', {
        word,
        context,
        includeMemoryTips: true
      });

      return response;
    } catch (error) {
      console.error('Failed to enhance vocabulary:', error);
      throw error;
    }
  }

  // Generate Vocabulary Quiz Questions
  async generateVocabularyQuiz(words: string[], difficultyLevel: 'beginner' | 'intermediate' | 'advanced' = 'intermediate'): Promise<Array<{
    id: string;
    type: 'definition' | 'synonym' | 'antonym' | 'sentence_completion' | 'usage';
    word: string;
    question: string;
    options: string[];
    correct: number;
    explanation: string;
    difficulty: number;
  }>> {
    try {
      const response = await this.makeAPIRequest('generate-vocabulary-quiz', {
        words,
        difficultyLevel,
        questionTypes: ['definition', 'synonym', 'antonym', 'sentence_completion', 'usage'],
        questionCount: Math.min(words.length, 10)
      });

      return response.questions || [];
    } catch (error) {
      console.error('Failed to generate vocabulary quiz:', error);
      // Return mock data for demo
      return words.slice(0, 5).map((word, index) => ({
        id: `q_${index}`,
        type: ['definition', 'synonym', 'antonym', 'sentence_completion', 'usage'][index % 5] as any,
        word,
        question: `What does "${word}" mean?`,
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correct: 0,
        explanation: `${word} is an important vocabulary word for CLAT preparation.`,
        difficulty: 3
      }));
    }
  }

  // Get Personalized Vocabulary Recommendations
  async getVocabularyRecommendations(userProfile: {
    currentLevel: string;
    weakAreas: string[];
    masteredWords: string[];
    targetScore: number;
  }): Promise<{
    recommendedWords: Array<{
      word: string;
      priority: 'high' | 'medium' | 'low';
      reason: string;
      estimatedTime: number;
    }>;
    studyPlan: {
      dailyWords: number;
      focusAreas: string[];
      weeklyGoal: number;
    };
  }> {
    try {
      const response = await this.makeAPIRequest('vocabulary-recommendations', {
        userProfile,
        includePersonalizedPlan: true,
        focusOnWeakAreas: true
      });

      return response;
    } catch (error) {
      console.error('Failed to get vocabulary recommendations:', error);
      throw error;
    }
  }

  // Question Generation for All CLAT Sections
  async generateQuestions(request: QuestionGenerationRequest): Promise<GeneratedQuestion[]> {
    try {
      const response = await this.makeAPIRequest('generate-questions', {
        topic: request.topic,
        subject: request.subject,
        difficulty: request.difficulty,
        count: request.count,
        userWeaknesses: request.userWeaknesses || []
      });

      return response.questions || [];
    } catch (error) {
      console.error('Failed to generate questions:', error);
      throw error;
    }
  }

  // Reading Comprehension Analysis
  async analyzeReadingPerformance(
    userResponses: Array<{
      questionId: string;
      selectedAnswer: number;
      timeSpent: number;
      confidence: number;
    }>,
    passage: string
  ): Promise<{
    comprehensionLevel: string;
    strengths: string[];
    weaknesses: string[];
    recommendations: string[];
    personalizedContent: any[];
  }> {
    try {
      const response = await this.makeAPIRequest('analyze-reading', {
        userResponses,
        passage,
        analysisType: 'comprehensive'
      });

      return response;
    } catch (error) {
      console.error('Failed to analyze reading performance:', error);
      throw error;
    }
  }

  // Study Plan Generation
  async generateStudyPlan(userProfile: {
    currentLevel: string;
    targetScore: number;
    availableHours: number;
    weakAreas: string[];
    strongAreas: string[];
    examDate: string;
  }): Promise<{
    dailySchedule: any[];
    weeklyGoals: string[];
    monthlyMilestones: string[];
    adaptiveReminders: any[];
  }> {
    try {
      const response = await this.makeAPIRequest('generate-study-plan', {
        userProfile,
        includeReminders: true,
        adaptToDifficulty: true
      });

      return response;
    } catch (error) {
      console.error('Failed to generate study plan:', error);
      throw error;
    }
  }

  // Weekly Insights Generation (Spotify Wrapped Style)
  async generateWeeklyInsights(userId: string, weekData: any): Promise<{
    personalInsights: any;
    communityComparison: any;
    achievements: string[];
    nextWeekFocus: string[];
  }> {
    try {
      const response = await this.makeAPIRequest('weekly-insights', {
        userId,
        weekData,
        includeMotivation: true,
        communityComparison: true
      });

      return response;
    } catch (error) {
      console.error('Failed to generate weekly insights:', error);
      throw error;
    }
  }

  // Smart Reminders
  async generateSmartReminders(userBehavior: any): Promise<Array<{
    type: string;
    message: string;
    triggerTime: string;
    priority: 'low' | 'medium' | 'high';
    actionSuggestion: string;
  }>> {
    try {
      const response = await this.makeAPIRequest('smart-reminders', {
        userBehavior,
        personalizeToUser: true,
        includeMotivation: true
      });

      return response.reminders || [];
    } catch (error) {
      console.error('Failed to generate smart reminders:', error);
      throw error;
    }
  }
}

export const claudeAIService = new ClaudeAIService();
export type { ExplanationRequest, ExplanationResponse, QuestionGenerationRequest, GeneratedQuestion };
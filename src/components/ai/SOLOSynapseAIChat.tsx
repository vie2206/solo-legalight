import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import {
  Send,
  Mic,
  Plus,
  Image as ImageIcon,
  FileText,
  Code,
  Video,
  Sparkles,
  Brain,
  Upload,
  Download,
  Share2,
  BookOpen,
  Scale,
  Gavel,
  MessageSquare,
  ArrowUp,
  ArrowDown,
  ThumbsUp,
  ThumbsDown,
  Copy,
  MoreHorizontal,
  X,
  Loader2
} from 'lucide-react';
import { soloStyles } from '../shared/SOLODesignSystem';
import SOLOCompleteAIIcon from '../icons/SOLOCompleteAIIcons';

// AI Chat Context for SOLO
const SOLOAIChatContext = createContext<any>(null);

interface ChatMessage {
  id: string;
  type: 'user' | 'ai' | 'system';
  content: string;
  timestamp: Date;
  attachments?: ChatAttachment[];
  feedback?: 'positive' | 'negative' | null;
  metadata?: {
    model?: string;
    tokens?: number;
    processingTime?: number;
    confidence?: number;
  };
}

interface ChatAttachment {
  id: string;
  name: string;
  type: 'document' | 'image' | 'audio' | 'video' | 'code';
  url: string;
  size?: number;
}

interface SOLOAIChatProps {
  mode?: 'legal-tutor' | 'case-analyzer' | 'research-assistant' | 'quiz-generator' | 'general';
  initialPrompt?: string;
  placeholder?: string;
  maxHeight?: string;
  onMessageSent?: (message: string, attachments?: ChatAttachment[]) => void;
  onFeedback?: (messageId: string, feedback: 'positive' | 'negative') => void;
  className?: string;
}

const SOLOSynapseAIChat: React.FC<SOLOAIChatProps> = ({
  mode = 'general',
  initialPrompt,
  placeholder,
  maxHeight = '600px',
  onMessageSent,
  onFeedback,
  className = ''
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [attachments, setAttachments] = useState<ChatAttachment[]>([]);
  const [isRecording, setIsRecording] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize with welcome message based on mode
  useEffect(() => {
    const welcomeMessages = {
      'legal-tutor': 'Hi! I\'m your AI Legal Tutor. I can help you understand complex legal concepts, explain case law, and guide you through CLAT preparation. What would you like to learn today?',
      'case-analyzer': 'Welcome to the AI Case Analyzer! Upload a case document or describe a legal scenario, and I\'ll help you analyze the key legal principles, precedents, and implications.',
      'research-assistant': 'I\'m your AI Legal Research Assistant. I can help you find relevant case law, statutes, legal articles, and provide comprehensive research on any legal topic.',
      'quiz-generator': 'Ready to test your legal knowledge? I can generate custom quizzes on any CLAT subject, create practice questions, and provide detailed explanations for each answer.',
      'general': 'Hello! I\'m SOLO AI, your intelligent assistant for legal education. How can I help you today?'
    };

    const initialMessage: ChatMessage = {
      id: 'welcome-1',
      type: 'ai',
      content: welcomeMessages[mode],
      timestamp: new Date(),
      metadata: {
        model: 'Claude-3',
        confidence: 100
      }
    };

    setMessages([initialMessage]);

    if (initialPrompt) {
      handleSendMessage(initialPrompt);
    }
  }, [mode, initialPrompt]);

  const getModeConfig = () => {
    const configs = {
      'legal-tutor': {
        title: 'AI Legal Tutor',
        icon: 'ai-tutor-advanced',
        color: 'from-blue-500 to-indigo-600',
        quickActions: [
          { label: 'Explain Constitutional Law', prompt: 'Explain the basic structure of the Indian Constitution' },
          { label: 'Case Law Analysis', prompt: 'Help me analyze a landmark Supreme Court case' },
          { label: 'Legal Terminology', prompt: 'Define important legal terms for CLAT' },
          { label: 'Practice Questions', prompt: 'Generate practice questions on Contract Law' }
        ]
      },
      'case-analyzer': {
        title: 'AI Case Analyzer',
        icon: 'case-analysis-ai-advanced',
        color: 'from-purple-500 to-pink-600',
        quickActions: [
          { label: 'Upload Case Document', prompt: 'I want to upload a case document for analysis' },
          { label: 'Case Summary', prompt: 'Provide a summary of Kesavananda Bharati case' },
          { label: 'Legal Precedents', prompt: 'Find legal precedents for this case' },
          { label: 'Ratio Decidendi', prompt: 'Identify the ratio decidendi of this judgment' }
        ]
      },
      'research-assistant': {
        title: 'AI Research Assistant',
        icon: 'legal-research-ai-advanced',
        color: 'from-green-500 to-teal-600',
        quickActions: [
          { label: 'Find Case Law', prompt: 'Help me find relevant case law on property rights' },
          { label: 'Statute Research', prompt: 'Research recent amendments to the Constitution' },
          { label: 'Legal Articles', prompt: 'Find scholarly articles on contract law' },
          { label: 'Citation Help', prompt: 'Help me with proper legal citation format' }
        ]
      },
      'quiz-generator': {
        title: 'AI Quiz Generator',
        icon: 'smart-quiz',
        color: 'from-orange-500 to-red-600',
        quickActions: [
          { label: 'CLAT Mock Test', prompt: 'Generate a 25-question CLAT mock test' },
          { label: 'Subject Quiz', prompt: 'Create a quiz on Criminal Law' },
          { label: 'Difficulty Level', prompt: 'Generate hard-level questions on Torts' },
          { label: 'Explanatory Quiz', prompt: 'Quiz with detailed answer explanations' }
        ]
      },
      'general': {
        title: 'SOLO AI Assistant',
        icon: 'ai-assistant-advanced',
        color: 'from-blue-500 to-purple-600',
        quickActions: [
          { label: 'Study Plan', prompt: 'Create a personalized CLAT study plan' },
          { label: 'Legal News', prompt: 'What are the latest legal developments?' },
          { label: 'Career Guidance', prompt: 'Tell me about legal career options' },
          { label: 'Exam Tips', prompt: 'Give me tips for CLAT preparation' }
        ]
      }
    };
    return configs[mode];
  };

  const config = getModeConfig();

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || currentMessage.trim();
    if (!textToSend && attachments.length === 0) return;

    const newMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content: textToSend,
      timestamp: new Date(),
      attachments: [...attachments]
    };

    setMessages(prev => [...prev, newMessage]);
    setCurrentMessage('');
    setAttachments([]);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: `ai-${Date.now()}`,
        type: 'ai',
        content: generateAIResponse(textToSend, mode),
        timestamp: new Date(),
        metadata: {
          model: 'Claude-3',
          tokens: 150,
          processingTime: 2.3,
          confidence: 95
        }
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);

    if (onMessageSent) {
      onMessageSent(textToSend, attachments);
    }
  };

  const generateAIResponse = (message: string, mode: string): string => {
    const responses = {
      'legal-tutor': `Great question! Let me explain this legal concept in detail. Based on your query about "${message}", here are the key points you should understand:\n\n1. **Legal Principle**: The fundamental concept here involves...\n2. **Case Law**: Important precedents include...\n3. **Application**: This applies to CLAT preparation by...\n\nWould you like me to elaborate on any specific aspect or provide practice questions on this topic?`,
      'case-analyzer': `I've analyzed your query regarding "${message}". Here's my comprehensive analysis:\n\n**Key Legal Issues:**\n• Primary legal question involved\n• Secondary issues and implications\n\n**Relevant Law:**\n• Applicable statutes and provisions\n• Constitutional principles at play\n\n**Judicial Reasoning:**\n• Court's rationale and methodology\n• Balancing of competing interests\n\n**Significance:**\n• Impact on legal precedent\n• Relevance for future cases\n\nWould you like me to dive deeper into any particular aspect?`,
      'research-assistant': `I've conducted research on "${message}" and found several relevant sources:\n\n**Recent Cases:**\n• [Case Name] - Brief summary and relevance\n• [Case Name] - Key holdings and implications\n\n**Statutory Provisions:**\n• Relevant sections and amendments\n• Legislative intent and interpretation\n\n**Academic Commentary:**\n• Scholarly analysis and criticism\n• Comparative legal perspectives\n\n**Practical Applications:**\n• How this impacts legal practice\n• CLAT exam relevance\n\nShall I provide more detailed information on any of these sources?`,
      'quiz-generator': `I've created a custom quiz based on "${message}". Here are your practice questions:\n\n**Question 1:** Multiple choice question with legal scenario\nA) Option A\nB) Option B  \nC) Option C\nD) Option D\n\n**Question 2:** Legal reasoning question\n[Detailed scenario and options]\n\n**Answer Key & Explanations:**\n1. Correct Answer: C - Detailed explanation of why this is correct and why other options are wrong.\n2. Correct Answer: B - Legal reasoning and precedent explanation.\n\nWould you like more questions or explanations on specific topics?`,
      'general': `Thank you for your question about "${message}". I'm here to help with your legal education journey.\n\nBased on what you've asked, I can assist you with:\n• Detailed explanations of legal concepts\n• Case law analysis and summaries\n• Practice questions and mock tests\n• Study planning and career guidance\n\nHow would you like me to help you further? I can switch to a specialized mode (Legal Tutor, Case Analyzer, Research Assistant, or Quiz Generator) if you need focused assistance.`
    };
    return responses[mode as keyof typeof responses] || responses['general'];
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newAttachments: ChatAttachment[] = files.map(file => ({
      id: `attachment-${Date.now()}-${Math.random()}`,
      name: file.name,
      type: file.type.startsWith('image/') ? 'image' : 'document',
      url: URL.createObjectURL(file),
      size: file.size
    }));
    setAttachments(prev => [...prev, ...newAttachments]);
  };

  const removeAttachment = (id: string) => {
    setAttachments(prev => prev.filter(att => att.id !== id));
  };

  const handleFeedback = (messageId: string, feedback: 'positive' | 'negative') => {
    setMessages(prev =>
      prev.map(msg =>
        msg.id === messageId ? { ...msg, feedback } : msg
      )
    );
    if (onFeedback) {
      onFeedback(messageId, feedback);
    }
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <SOLOAIChatContext.Provider value={{ messages, config }}>
      <div className={`flex flex-col bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden ${className}`} style={{ height: maxHeight }}>
        {/* Chat Header */}
        <div className={`bg-gradient-to-r ${config.color} p-4 text-white`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <SOLOCompleteAIIcon name={config.icon} size="medium" theme="light" />
            </div>
            <div>
              <h3 className="font-bold text-lg">{config.title}</h3>
              <p className="text-white/80 text-sm">Powered by Claude AI</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        {showQuickActions && (
          <div className="p-4 border-b border-gray-200 bg-gray-50">
            <div className="flex flex-wrap gap-2">
              {config.quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => {
                    handleSendMessage(action.prompt);
                    setShowQuickActions(false);
                  }}
                  className="px-3 py-2 bg-blue-100 text-blue-700 text-sm rounded-lg hover:bg-blue-200 transition-colors"
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] ${message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'} rounded-2xl p-4`}>
                {message.type === 'ai' && (
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-200">
                    <SOLOCompleteAIIcon name="ai-assistant-advanced" size="small" />
                    <span className="text-sm font-semibold">SOLO AI</span>
                    {message.metadata?.confidence && (
                      <span className="text-xs text-gray-500">
                        {message.metadata.confidence}% confidence
                      </span>
                    )}
                  </div>
                )}
                
                <div className="whitespace-pre-wrap">{message.content}</div>
                
                {message.attachments && message.attachments.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {message.attachments.map((attachment) => (
                      <div key={attachment.id} className="flex items-center gap-2 p-2 bg-white/10 rounded-lg">
                        <FileText className="w-4 h-4" />
                        <span className="text-sm">{attachment.name}</span>
                      </div>
                    ))}
                  </div>
                )}

                {message.type === 'ai' && (
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleFeedback(message.id, 'positive')}
                        className={`p-1.5 rounded-lg transition-colors ${
                          message.feedback === 'positive' 
                            ? 'bg-green-100 text-green-600' 
                            : 'hover:bg-gray-200'
                        }`}
                      >
                        <ThumbsUp className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleFeedback(message.id, 'negative')}
                        className={`p-1.5 rounded-lg transition-colors ${
                          message.feedback === 'negative' 
                            ? 'bg-red-100 text-red-600' 
                            : 'hover:bg-gray-200'
                        }`}
                      >
                        <ThumbsDown className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => copyMessage(message.content)}
                        className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                    {message.metadata && (
                      <span className="text-xs text-gray-500">
                        {message.metadata.processingTime}s • {message.metadata.tokens} tokens
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-2xl p-4 max-w-[80%]">
                <div className="flex items-center gap-2">
                  <SOLOCompleteAIIcon name="ai-assistant-advanced" size="small" />
                  <span className="text-sm font-semibold text-gray-700">SOLO AI is thinking...</span>
                  <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Attachments Preview */}
        {attachments.length > 0 && (
          <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-wrap gap-2">
              {attachments.map((attachment) => (
                <div key={attachment.id} className="flex items-center gap-2 bg-blue-100 rounded-lg px-3 py-2 text-sm">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-800">{attachment.name}</span>
                  <button
                    onClick={() => removeAttachment(attachment.id)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-end gap-3">
            <div className="flex-1">
              <textarea
                ref={inputRef}
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder={placeholder || `Ask ${config.title} anything about law...`}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                rows={1}
                style={{ minHeight: '48px', maxHeight: '120px' }}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                multiple
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <Upload className="w-4 h-4 text-gray-600" />
              </button>
              
              <button
                onClick={() => setShowQuickActions(!showQuickActions)}
                className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <Sparkles className="w-4 h-4 text-gray-600" />
              </button>
              
              <button
                onClick={() => handleSendMessage()}
                disabled={!currentMessage.trim() && attachments.length === 0}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                  currentMessage.trim() || attachments.length > 0
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </SOLOAIChatContext.Provider>
  );
};

export default SOLOSynapseAIChat;
export { SOLOAIChatContext };
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  MessageCircle, Send, Search, Filter, Clock, CheckCircle, 
  AlertCircle, User, Brain, Star, ThumbsUp, ThumbsDown,
  Tag, Calendar, ArrowLeft, Plus, Paperclip, Image,
  BookOpen, Target, Zap, Users, Award, TrendingUp,
  Loader2, Upload, X, Eye, Bell, RefreshCw, FileText
} from 'lucide-react';
import { User as UserType } from '../../types';
import { 
  doubtService, 
  notificationService, 
  uploadService,
  Doubt, 
  DoubtResponse, 
  CreateDoubtData, 
  CreateResponseData,
  formatDate,
  getPriorityColor,
  getStatusColor
} from '../../services/doubtService';
import { useSocket } from '../../services/socketService';

interface DoubtSolvingCenterProps {
  user: UserType;
  onBack?: () => void;
}

const DoubtSolvingCenter: React.FC<DoubtSolvingCenterProps> = ({ user, onBack }) => {
  // State management
  const [activeTab, setActiveTab] = useState<'my-doubts' | 'ask-doubt' | 'help-others' | 'ai-tutor' | 'browse'>('my-doubts');
  const [selectedDoubt, setSelectedDoubt] = useState<Doubt | null>(null);
  const [doubts, setDoubts] = useState<Doubt[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Filtering and search
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Form states
  const [newDoubtForm, setNewDoubtForm] = useState<CreateDoubtData>({
    title: '',
    description: '',
    subject: '',
    priority: 'medium',
    type: 'concept',
    tags: [],
    prefer_ai: false
  });
  const [submittingDoubt, setSubmittingDoubt] = useState(false);
  
  // Response form
  const [responseText, setResponseText] = useState('');
  const [submittingResponse, setSubmittingResponse] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  
  // AI Tutor state
  const [aiMessages, setAiMessages] = useState<Array<{id: string, content: string, sender: 'user' | 'ai', timestamp: string}>>([
    {
      id: '1',
      content: "Hi! I'm SOLO AI Tutor. Ask me anything about law, reasoning, or any subject you're studying!",
      sender: 'ai',
      timestamp: new Date().toISOString()
    }
  ]);
  const [aiInput, setAiInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  
  // Real-time features
  const [typingUsers, setTypingUsers] = useState<Record<string, string>>({});
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  
  // WebSocket integration
  const socket = useSocket();
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Constants
  const subjects = [
    'Constitutional Law', 'Legal Reasoning', 'Current Affairs', 
    'English Language', 'Quantitative Techniques', 'General Knowledge'
  ];

  // Initialize component and socket connection
  useEffect(() => {
    initializeComponent();
    return () => {
      socket.disconnect();
    };
  }, []);

  // Load doubts when filters change
  useEffect(() => {
    if (activeTab === 'my-doubts' || activeTab === 'browse' || activeTab === 'help-others') {
      loadDoubts();
    }
  }, [activeTab, searchQuery, filterSubject, filterStatus, currentPage]);

  // Socket event listeners
  useEffect(() => {
    const removeListeners = [
      socket.addEventListener('doubt_update', handleDoubtUpdate),
      socket.addEventListener('new_response', handleNewResponse),
      socket.addEventListener('user_typing', handleUserTyping),
      socket.addEventListener('notification', handleNotification),
      socket.addEventListener('new_doubt_available', handleNewDoubtAvailable)
    ];

    return () => {
      removeListeners.forEach(remove => remove());
    };
  }, [selectedDoubt]);

  // Join doubt room when viewing a doubt
  useEffect(() => {
    if (selectedDoubt) {
      socket.joinDoubtRoom(selectedDoubt.id);
      return () => socket.leaveDoubtRoom(selectedDoubt.id);
    }
  }, [selectedDoubt]);

  // Initialize component
  const initializeComponent = async () => {
    try {
      await socket.connect();
      await loadNotificationCount();
      if (activeTab === 'my-doubts') {
        await loadDoubts();
      }
    } catch (error) {
      console.error('Failed to initialize doubt center:', error);
      setError('Failed to connect to doubt system');
    }
  };

  // Load doubts from API
  const loadDoubts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const filters: any = {
        page: currentPage,
        limit: 10
      };
      
      if (searchQuery) filters.search = searchQuery;
      if (filterSubject !== 'all') filters.subject = filterSubject;
      if (filterStatus !== 'all') filters.status = filterStatus;
      
      // Role-based filtering
      if (activeTab === 'my-doubts') {
        filters.student_id = user.id;
      } else if (activeTab === 'help-others' && user.role === 'educator') {
        // Show doubts assigned to this educator or available for assignment
      }
      
      const response = await doubtService.getDoubts(filters);
      setDoubts(response.doubts);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('Failed to load doubts:', error);
      setError('Failed to load doubts');
    } finally {
      setLoading(false);
    }
  };

  // Load notification count
  const loadNotificationCount = async () => {
    try {
      const { unread_count } = await notificationService.getUnreadCount();
      setUnreadNotifications(unread_count);
    } catch (error) {
      console.error('Failed to load notification count:', error);
    }
  };

  // Submit new doubt
  const handleSubmitDoubt = async () => {
    if (!newDoubtForm.title.trim() || !newDoubtForm.description.trim() || !newDoubtForm.subject) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setSubmittingDoubt(true);
      setError(null);

      // Upload attachments if any
      let attachmentUrls: string[] = [];
      if (attachedFiles.length > 0) {
        setUploadingFiles(true);
        const uploadResponse = await uploadService.uploadFiles(attachedFiles);
        attachmentUrls = uploadResponse.files.map(f => f.url);
        setUploadingFiles(false);
      }

      // Create doubt
      const doubtData: CreateDoubtData = {
        ...newDoubtForm,
        attachments: attachmentUrls,
        tags: newDoubtForm.tags || []
      };

      await doubtService.createDoubt(doubtData);
      
      // Reset form
      setNewDoubtForm({
        title: '',
        description: '',
        subject: '',
        priority: 'medium',
        type: 'concept',
        tags: [],
        prefer_ai: false
      });
      setAttachedFiles([]);
      
      // Switch to my doubts tab and reload
      setActiveTab('my-doubts');
      await loadDoubts();
      
    } catch (error) {
      console.error('Failed to submit doubt:', error);
      setError('Failed to submit doubt. Please try again.');
    } finally {
      setSubmittingDoubt(false);
      setUploadingFiles(false);
    }
  };

  // Submit response to doubt
  const handleSubmitResponse = async () => {
    if (!selectedDoubt || !responseText.trim()) return;

    try {
      setSubmittingResponse(true);
      
      // Upload attachments if any
      let attachmentUrls: string[] = [];
      if (attachedFiles.length > 0) {
        const uploadResponse = await uploadService.uploadFiles(attachedFiles);
        attachmentUrls = uploadResponse.files.map(f => f.url);
      }

      const responseData: CreateResponseData = {
        content: responseText.trim(),
        attachments: attachmentUrls
      };

      const response = await doubtService.addResponse(selectedDoubt.id, responseData);
      
      // Update selected doubt with new response
      setSelectedDoubt(prev => prev ? {
        ...prev,
        responses: [...(prev.responses || []), response.response]
      } : null);
      
      // Clear form
      setResponseText('');
      setAttachedFiles([]);
      
    } catch (error) {
      console.error('Failed to submit response:', error);
      setError('Failed to submit response');
    } finally {
      setSubmittingResponse(false);
    }
  };

  // Handle AI tutor conversation
  const handleAIChat = async () => {
    if (!aiInput.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      content: aiInput.trim(),
      sender: 'user' as const,
      timestamp: new Date().toISOString()
    };

    setAiMessages(prev => [...prev, userMessage]);
    setAiInput('');
    setAiLoading(true);

    try {
      // Create a temporary doubt for AI processing
      const tempDoubt: CreateDoubtData = {
        title: aiInput.trim().substring(0, 100),
        description: aiInput.trim(),
        subject: 'General',
        type: 'concept',
        prefer_ai: true
      };

      // This will trigger AI response
      await doubtService.createDoubt(tempDoubt);
      
      // For demo, add a mock AI response
      setTimeout(() => {
        const aiResponse = {
          id: (Date.now() + 1).toString(),
          content: `I understand your question: "${userMessage.content}". Let me help you with that...

This is a comprehensive answer that would come from the AI system. The AI would analyze your question and provide detailed explanations, examples, and guidance based on the CLAT curriculum and legal concepts.

Would you like me to elaborate on any specific aspect?`,
          sender: 'ai' as const,
          timestamp: new Date().toISOString()
        };
        
        setAiMessages(prev => [...prev, aiResponse]);
        setAiLoading(false);
      }, 2000);
      
    } catch (error) {
      console.error('AI chat error:', error);
      setAiLoading(false);
      setAiMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please try again.',
        sender: 'ai',
        timestamp: new Date().toISOString()
      }]);
    }
  };

  // Handle file uploads
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setAttachedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Socket event handlers
  const handleDoubtUpdate = (data: any) => {
    if (selectedDoubt && data.doubt_id === selectedDoubt.id) {
      // Reload the doubt to get updated data
      loadDoubtDetails(selectedDoubt.id);
    }
    loadDoubts(); // Refresh the list
  };

  const handleNewResponse = (data: any) => {
    if (selectedDoubt && data.doubt_id === selectedDoubt.id) {
      // Real-time response update
      loadDoubtDetails(selectedDoubt.id);
    }
    loadNotificationCount(); // Update notification count
  };

  const handleUserTyping = (data: any) => {
    if (data.userId !== user.id) {
      setTypingUsers(prev => ({
        ...prev,
        [data.userId]: data.userName
      }));
      
      // Clear typing indicator after 3 seconds
      setTimeout(() => {
        setTypingUsers(prev => {
          const updated = { ...prev };
          delete updated[data.userId];
          return updated;
        });
      }, 3000);
    }
  };

  const handleNotification = (data: any) => {
    loadNotificationCount();
    // You could show a toast notification here
  };

  const handleNewDoubtAvailable = (data: any) => {
    if (user.role === 'educator' && activeTab === 'help-others') {
      loadDoubts(); // Refresh educator's available doubts
    }
  };

  // Load doubt details
  const loadDoubtDetails = async (doubtId: string) => {
    try {
      const response = await doubtService.getDoubt(doubtId);
      setSelectedDoubt(response.doubt);
    } catch (error) {
      console.error('Failed to load doubt details:', error);
    }
  };

  // Handle typing indicator
  const handleResponseTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResponseText(e.target.value);
    
    if (selectedDoubt) {
      socket.sendTypingIndicator(selectedDoubt.id, true);
      
      // Clear previous timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      
      // Set timeout to stop typing indicator
      typingTimeoutRef.current = setTimeout(() => {
        socket.sendTypingIndicator(selectedDoubt.id, false);
      }, 1000);
    }
  };

  // Render doubt card
  const renderDoubtCard = (doubt: Doubt) => {
    return (
      <div 
        key={doubt.id}
        onClick={() => setSelectedDoubt(doubt)}
        className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2">
              {doubt.title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
              {doubt.description}
            </p>
          </div>
          {doubt.ai_assisted && (
            <div className="ml-4 flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
              <Brain className="h-3 w-3" />
              AI Assisted
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(doubt.priority)}`}>
            {doubt.priority.toUpperCase()}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doubt.status)}`}>
            {doubt.status.replace('_', ' ').toUpperCase()}
          </span>
          <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
            {doubt.subject}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{formatDate(doubt.created_at)}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span>{doubt.responses?.length || 0} responses</span>
            </div>
            {doubt.ratings?.length && (
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{doubt.ratings[0].rating}/5</span>
              </div>
            )}
          </div>
          {doubt.assigned_educator && (
            <div className="flex items-center gap-1">
              <User className="h-4 w-4 text-green-500" />
              <span className="text-xs">{doubt.assigned_educator.name}</span>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Render doubt details view
  const renderDoubtDetail = () => {
    if (!selectedDoubt) return null;

    return (
      <div className="bg-white rounded-xl shadow-sm">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-start justify-between mb-4">
            <button 
              onClick={() => setSelectedDoubt(null)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to doubts
            </button>
            
            {unreadNotifications > 0 && (
              <div className="flex items-center gap-2 text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-sm">
                <Bell className="h-4 w-4" />
                {unreadNotifications} new notifications
              </div>
            )}
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-3">
            {selectedDoubt.title}
          </h1>

          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(selectedDoubt.priority)}`}>
              {selectedDoubt.priority.toUpperCase()} Priority
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedDoubt.status)}`}>
              {selectedDoubt.status.replace('_', ' ').toUpperCase()}
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {selectedDoubt.subject}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
              {selectedDoubt.type.replace('_', ' ')}
            </span>
            {selectedDoubt.ai_assisted && (
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium flex items-center gap-1">
                <Brain className="h-3 w-3" />
                AI Assisted
              </span>
            )}
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
              {selectedDoubt.description}
            </p>
          </div>

          {/* Student Info */}
          {selectedDoubt.student && (
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{selectedDoubt.student.name}</p>
                <p className="text-sm text-gray-500">Asked {formatDate(selectedDoubt.created_at)}</p>
              </div>
            </div>
          )}

          {selectedDoubt.tags.length > 0 && (
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4 text-gray-400" />
              {selectedDoubt.tags.map((tag, index) => (
                <span key={index} className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Responses */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Responses ({selectedDoubt.responses?.length || 0})
            </h3>
            
            {Object.keys(typingUsers).length > 0 && (
              <div className="text-sm text-blue-600 flex items-center gap-1">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
                <span>{Object.values(typingUsers).join(', ')} typing...</span>
              </div>
            )}
          </div>
          
          <div className="space-y-6 mb-8">
            {selectedDoubt.responses?.map((response) => (
              <div key={response.id} className="border border-gray-100 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      response.author_type === 'ai' ? 'bg-blue-100' :
                      response.author_type === 'educator' ? 'bg-green-100' :
                      'bg-gray-100'
                    }`}>
                      {response.author_type === 'ai' ? (
                        <Brain className="h-4 w-4 text-blue-600" />
                      ) : (
                        <User className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {response.author?.name || 'Unknown User'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDate(response.created_at)}
                        {response.ai_generated && (
                          <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-1 py-0.5 rounded">
                            AI Response
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1 text-gray-500 hover:text-green-600 transition-colors">
                      <ThumbsUp className="h-4 w-4" />
                      <span className="text-sm">{response.upvotes}</span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-500 hover:text-red-600 transition-colors">
                      <ThumbsDown className="h-4 w-4" />
                      <span className="text-sm">{response.downvotes}</span>
                    </button>
                  </div>
                </div>
                
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">
                    {response.content}
                  </pre>
                </div>
                
                {response.attachments?.length && (
                  <div className="mt-3 flex gap-2">
                    {response.attachments.map((attachment, idx) => (
                      <a 
                        key={idx}
                        href={attachment}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                      >
                        <FileText className="h-4 w-4" />
                        Attachment {idx + 1}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {(!selectedDoubt.responses || selectedDoubt.responses.length === 0) && (
              <div className="text-center py-8 text-gray-500">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No responses yet. Be the first to help!</p>
              </div>
            )}
          </div>

          {/* Add Response */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Add your response</h4>
            <textarea
              value={responseText}
              onChange={handleResponseTyping}
              placeholder="Type your response here..."
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={submittingResponse}
            />
            
            {/* File attachments */}
            {attachedFiles.length > 0 && (
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-700 mb-2">Attachments:</p>
                <div className="space-y-2">
                  {attachedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-700">{file.name}</span>
                        <span className="text-xs text-gray-500">({Math.round(file.size / 1024)}KB)</span>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  multiple
                  accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.txt"
                  className="hidden"
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors"
                  disabled={submittingResponse}
                >
                  <Paperclip className="h-4 w-4" />
                  <span className="text-sm">Attach files</span>
                </button>
              </div>
              
              <button 
                onClick={handleSubmitResponse}
                disabled={!responseText.trim() || submittingResponse}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submittingResponse ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                {submittingResponse ? 'Sending...' : 'Send Response'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Ask Doubt form
  const renderAskDoubt = () => (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Ask a New Doubt</h2>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Doubt Title *
          </label>
          <input
            type="text"
            value={newDoubtForm.title}
            onChange={(e) => setNewDoubtForm({...newDoubtForm, title: e.target.value})}
            placeholder="Brief title for your doubt..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={submittingDoubt}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Detailed Description *
          </label>
          <textarea
            value={newDoubtForm.description}
            onChange={(e) => setNewDoubtForm({...newDoubtForm, description: e.target.value})}
            placeholder="Describe your doubt in detail..."
            rows={6}
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={submittingDoubt}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject *
            </label>
            <select
              value={newDoubtForm.subject}
              onChange={(e) => setNewDoubtForm({...newDoubtForm, subject: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={submittingDoubt}
            >
              <option value="">Select subject...</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <select
              value={newDoubtForm.priority}
              onChange={(e) => setNewDoubtForm({...newDoubtForm, priority: e.target.value as any})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={submittingDoubt}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type
            </label>
            <select
              value={newDoubtForm.type}
              onChange={(e) => setNewDoubtForm({...newDoubtForm, type: e.target.value as any})}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={submittingDoubt}
            >
              <option value="concept">Concept Clarification</option>
              <option value="problem">Problem Solving</option>
              <option value="homework">Homework Help</option>
              <option value="exam_prep">Exam Preparation</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Resolution Options */}
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="font-medium text-blue-900 mb-3">Choose Resolution Method</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div 
              onClick={() => setNewDoubtForm({...newDoubtForm, prefer_ai: true})}
              className={`bg-white p-4 rounded-lg border cursor-pointer transition-all ${
                newDoubtForm.prefer_ai 
                  ? 'border-blue-400 ring-2 ring-blue-200' 
                  : 'border-blue-200 hover:border-blue-400'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <Brain className="h-6 w-6 text-blue-600" />
                <span className="font-medium text-gray-900">AI Tutor (Instant)</span>
              </div>
              <p className="text-sm text-gray-600">Get immediate AI-powered explanations with detailed solutions</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Free</span>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">24/7 Available</span>
              </div>
            </div>
            
            <div 
              onClick={() => setNewDoubtForm({...newDoubtForm, prefer_ai: false})}
              className={`bg-white p-4 rounded-lg border cursor-pointer transition-all ${
                !newDoubtForm.prefer_ai 
                  ? 'border-green-400 ring-2 ring-green-200' 
                  : 'border-green-200 hover:border-green-400'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <User className="h-6 w-6 text-green-600" />
                <span className="font-medium text-gray-900">Human Educator</span>
              </div>
              <p className="text-sm text-gray-600">Get personalized help from qualified educators</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Premium</span>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Expert Quality</span>
              </div>
            </div>
          </div>
        </div>

        {/* File attachments */}
        {attachedFiles.length > 0 && (
          <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Attachments:</p>
            <div className="space-y-2">
              {attachedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{file.name}</span>
                    <span className="text-xs text-gray-500">({Math.round(file.size / 1024)}KB)</span>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-red-500 hover:text-red-700"
                    disabled={submittingDoubt}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              multiple
              accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.txt"
              className="hidden"
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors"
              disabled={submittingDoubt}
            >
              <Paperclip className="h-4 w-4" />
              <span className="text-sm">Add Attachment</span>
            </button>
            {uploadingFiles && (
              <div className="flex items-center gap-1 text-blue-600">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">Uploading...</span>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveTab('my-doubts')}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={submittingDoubt}
            >
              Cancel
            </button>
            <button 
              onClick={handleSubmitDoubt}
              disabled={submittingDoubt || uploadingFiles}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submittingDoubt ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              {submittingDoubt ? 'Submitting...' : 'Submit Doubt'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Render AI Tutor chat interface
  const renderAITutor = () => (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Brain className="h-8 w-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">SOLO AI Tutor</h2>
        <p className="text-gray-600">Get instant, intelligent answers to your questions</p>
      </div>

      <div className="space-y-6">
        {/* AI Chat Interface */}
        <div className="border border-gray-200 rounded-lg h-96 p-4 overflow-y-auto bg-gray-50">
          <div className="space-y-4">
            {aiMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-md p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-800 shadow-sm border'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {formatDate(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            
            {aiLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-lg shadow-sm border">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                    <span className="text-sm text-gray-600">AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <input
              type="text"
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !aiLoading && handleAIChat()}
              placeholder="Ask me anything..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={aiLoading}
            />
          </div>
          <button 
            onClick={handleAIChat}
            disabled={!aiInput.trim() || aiLoading}
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {aiLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* AI Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
            <Zap className="h-6 w-6 text-blue-600 mb-2" />
            <h3 className="font-medium text-gray-900 mb-1">Instant Answers</h3>
            <p className="text-sm text-gray-600">Get immediate responses to your questions</p>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
            <Target className="h-6 w-6 text-green-600 mb-2" />
            <h3 className="font-medium text-gray-900 mb-1">Personalized Learning</h3>
            <p className="text-sm text-gray-600">Tailored explanations based on your level</p>
          </div>
          
          <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
            <BookOpen className="h-6 w-6 text-purple-600 mb-2" />
            <h3 className="font-medium text-gray-900 mb-1">Multi-Subject Expert</h3>
            <p className="text-sm text-gray-600">Covers all CLAT subjects comprehensively</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {onBack && (
                <button 
                  onClick={onBack}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
              )}
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Doubt Solving Center</h1>
                <p className="text-gray-600">Get help with your questions - AI or human experts</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {unreadNotifications > 0 && (
                <div className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  <Bell className="h-4 w-4" />
                  {unreadNotifications}
                </div>
              )}
              
              <button 
                onClick={() => {
                  setActiveTab('ask-doubt');
                  setError(null);
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Ask Doubt
              </button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-6 mt-6 border-b">
            {[
              { id: 'my-doubts', label: 'My Doubts', count: doubts.filter(d => d.student_id === user.id).length },
              { id: 'ask-doubt', label: 'Ask Doubt' },
              { id: 'ai-tutor', label: 'AI Tutor' },
              ...(user.role === 'educator' ? [{ id: 'help-others', label: 'Help Others', count: doubts.filter(d => !d.assigned_educator_id || d.assigned_educator_id === user.id).length }] : []),
              { id: 'browse', label: 'Browse All', count: doubts.length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setError(null);
                }}
                className={`pb-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="ml-1 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {selectedDoubt ? (
          renderDoubtDetail()
        ) : activeTab === 'ask-doubt' ? (
          renderAskDoubt()
        ) : activeTab === 'ai-tutor' ? (
          renderAITutor()
        ) : (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-64">
                  <div className="relative">
                    <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search doubts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <select
                  value={filterSubject}
                  onChange={(e) => setFilterSubject(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Subjects</option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>{subject}</option>
                  ))}
                </select>
                
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="open">Open</option>
                  <option value="assigned">Assigned</option>
                  <option value="in_progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
                
                <button
                  onClick={loadDoubts}
                  disabled={loading}
                  className="flex items-center gap-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                >
                  <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            {activeTab === 'my-doubts' && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <MessageCircle className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{doubts.filter(d => d.student_id === user.id).length}</p>
                      <p className="text-sm text-gray-600">Total Doubts</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {doubts.filter(d => d.student_id === user.id && d.status === 'resolved').length}
                      </p>
                      <p className="text-sm text-gray-600">Resolved</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Clock className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {doubts.filter(d => d.student_id === user.id && ['open', 'assigned', 'in_progress'].includes(d.status)).length}
                      </p>
                      <p className="text-sm text-gray-600">Pending</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Brain className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {doubts.filter(d => d.student_id === user.id && d.ai_assisted).length}
                      </p>
                      <p className="text-sm text-gray-600">AI Assisted</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Loading state */}
            {loading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <span className="ml-2 text-gray-600">Loading doubts...</span>
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Doubts List */}
            {!loading && !error && (
              <>
                <div className="space-y-4">
                  {doubts.length > 0 ? (
                    doubts.map(renderDoubtCard)
                  ) : (
                    <div className="text-center py-12 bg-white rounded-xl shadow-sm">
                      <MessageCircle className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No doubts found</h3>
                      <p className="text-gray-600 mb-4">
                        {activeTab === 'my-doubts' 
                          ? "You haven't asked any doubts yet."
                          : "No doubts match your current filters."
                        }
                      </p>
                      {activeTab === 'my-doubts' && (
                        <button
                          onClick={() => setActiveTab('ask-doubt')}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Ask Your First Doubt
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    
                    <span className="px-4 py-2 text-sm text-gray-600">
                      Page {currentPage} of {totalPages}
                    </span>
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoubtSolvingCenter;
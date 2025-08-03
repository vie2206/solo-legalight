import React, { useState, useEffect, useCallback } from 'react';
import {
  Plus, Edit, Trash2, Search, Filter, Download, Upload,
  BookOpen, Brain, Globe, Trophy, Users, BarChart3,
  Save, X, Check, AlertCircle, Eye, EyeOff
} from 'lucide-react';

interface AdminCMSProps {
  userToken: string;
  onBack: () => void;
}

interface ReadingPassage {
  id: string;
  title: string;
  type: string;
  difficulty: string;
  word_count: number;
  status: string;
  created_at: string;
  tags: string[];
  content: string;
}

interface VocabularyWord {
  id: string;
  word: string;
  definition: string;
  difficulty: string;
  category: string;
  clat_relevance: number;
  status: string;
  synonyms: string[];
  antonyms: string[];
}

interface GKQuestion {
  id: string;
  question: string;
  options: string[];
  correct_answer: number;
  category: string;
  difficulty: string;
  explanation: string;
  status: string;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  reward: number;
  challenge_type: string;
  is_active: boolean;
}

const AdminCMS: React.FC<AdminCMSProps> = ({ userToken, onBack }) => {
  const [activeTab, setActiveTab] = useState<'passages' | 'vocabulary' | 'gk-questions' | 'challenges' | 'analytics'>('passages');
  const [passages, setPassages] = useState<ReadingPassage[]>([]);
  const [vocabulary, setVocabulary] = useState<VocabularyWord[]>([]);
  const [gkQuestions, setGKQuestions] = useState<GKQuestion[]>([]);
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  const apiCall = useCallback(async (endpoint: string, options: RequestInit = {}) => {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(errorData.error || `HTTP ${response.status}`);
    }

    return response.json();
  }, [userToken, API_BASE]);

  // Load data for active tab
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      let endpoint = '';
      let setter = (data: any) => {};

      switch (activeTab) {
        case 'passages':
          endpoint = '/api/admin/cms/passages';
          setter = (data) => setPassages(data.passages || []);
          break;
        case 'vocabulary':
          endpoint = '/api/admin/cms/vocabulary';
          setter = (data) => setVocabulary(data.words || []);
          break;
        case 'gk-questions':
          endpoint = '/api/admin/cms/gk-questions';
          setter = (data) => setGKQuestions(data.questions || []);
          break;
        case 'challenges':
          endpoint = '/api/admin/cms/challenges';
          setter = (data) => setChallenges(data.challenges || []);
          break;
      }

      if (endpoint) {
        const queryParams = new URLSearchParams();
        if (filterStatus !== 'all') queryParams.append('status', filterStatus);
        if (searchTerm) queryParams.append('search', searchTerm);

        const data = await apiCall(`${endpoint}?${queryParams}`);
        setter(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, [activeTab, filterStatus, searchTerm, apiCall]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Form handlers
  const handleCreate = () => {
    setEditingItem(null);
    setFormData(getEmptyFormData());
    setShowForm(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData(item);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      const endpoint = getEndpointForTab();
      await apiCall(`${endpoint}/${id}`, { method: 'DELETE' });
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete item');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = getEndpointForTab();
      const method = editingItem ? 'PUT' : 'POST';
      const url = editingItem ? `${endpoint}/${editingItem.id}` : endpoint;

      await apiCall(url, {
        method,
        body: JSON.stringify(formData),
      });

      setShowForm(false);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save item');
    } finally {
      setLoading(false);
    }
  };

  const getEndpointForTab = () => {
    switch (activeTab) {
      case 'passages': return '/api/admin/cms/passages';
      case 'vocabulary': return '/api/admin/cms/vocabulary';
      case 'gk-questions': return '/api/admin/cms/gk-questions';
      case 'challenges': return '/api/admin/cms/challenges';
      default: return '';
    }
  };

  const getEmptyFormData = () => {
    switch (activeTab) {
      case 'passages':
        return {
          title: '',
          type: 'Current Affairs',
          difficulty: 'Intermediate',
          content: '',
          word_count: 0,
          tags: [],
          status: 'draft'
        };
      case 'vocabulary':
        return {
          word: '',
          definition: '',
          difficulty: 'intermediate',
          category: 'legal',
          clat_relevance: 5,
          synonyms: [],
          antonyms: [],
          status: 'active'
        };
      case 'gk-questions':
        return {
          question: '',
          options: ['', '', '', ''],
          correct_answer: 0,
          category: 'Constitutional Law',
          difficulty: 'intermediate',
          explanation: '',
          points: 10,
          status: 'active'
        };
      case 'challenges':
        return {
          title: '',
          description: '',
          difficulty: 'Intermediate',
          reward: 100,
          total_steps: 1,
          challenge_type: 'reading',
          requirements: {},
          completion_criteria: '',
          category: 'Reading Speed',
          is_active: true
        };
      default:
        return {};
    }
  };

  const renderTabContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    switch (activeTab) {
      case 'passages':
        return renderPassagesTab();
      case 'vocabulary':
        return renderVocabularyTab();
      case 'gk-questions':
        return renderGKQuestionsTab();
      case 'challenges':
        return renderChallengesTab();
      case 'analytics':
        return renderAnalyticsTab();
      default:
        return null;
    }
  };

  const renderPassagesTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Reading Passages</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {passages.map((passage) => (
            <div key={passage.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-900 truncate">{passage.title}</h4>
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleEdit(passage)}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(passage.id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Type:</span>
                  <span>{passage.type}</span>
                </div>
                <div className="flex justify-between">
                  <span>Difficulty:</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    passage.difficulty === 'Advanced' ? 'bg-red-100 text-red-800' :
                    passage.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {passage.difficulty}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Words:</span>
                  <span>{passage.word_count}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    passage.status === 'published' ? 'bg-green-100 text-green-800' :
                    passage.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {passage.status}
                  </span>
                </div>
              </div>
              
              {passage.tags && passage.tags.length > 0 && (
                <div className="mt-2">
                  <div className="flex flex-wrap gap-1">
                    {passage.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                        {tag}
                      </span>
                    ))}
                    {passage.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        +{passage.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderVocabularyTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Vocabulary Words</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Word
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Definition
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Difficulty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  CLAT Relevance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vocabulary.map((word) => (
                <tr key={word.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 capitalize">
                      {word.word}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {word.definition}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {word.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      word.difficulty === 'advanced' ? 'bg-red-100 text-red-800' :
                      word.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {word.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(word.clat_relevance / 10) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs">{word.clat_relevance}/10</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(word)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(word.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderGKQuestionsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">GK Questions</h3>
        
        <div className="space-y-4">
          {gkQuestions.map((question, index) => (
            <div key={question.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm font-medium text-gray-500">Q{index + 1}</span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      question.difficulty === 'advanced' ? 'bg-red-100 text-red-800' :
                      question.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {question.difficulty}
                    </span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {question.category}
                    </span>
                  </div>
                  <p className="text-gray-900 font-medium mb-3">{question.question}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                    {question.options.map((option, optionIndex) => (
                      <div 
                        key={optionIndex} 
                        className={`p-2 rounded border ${
                          optionIndex === question.correct_answer 
                            ? 'bg-green-50 border-green-200 text-green-800' 
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <span className="font-medium">{String.fromCharCode(65 + optionIndex)}.</span> {option}
                        {optionIndex === question.correct_answer && (
                          <Check size={16} className="inline ml-2 text-green-600" />
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {question.explanation && (
                    <div className="bg-blue-50 border border-blue-200 rounded p-3 text-sm text-blue-800">
                      <strong>Explanation:</strong> {question.explanation}
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => handleEdit(question)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(question.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderChallengesTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Challenges</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-2">
                  <Trophy className="text-yellow-500" size={20} />
                  <h4 className="font-semibold text-gray-900">{challenge.title}</h4>
                </div>
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleEdit(challenge)}
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(challenge.id)}
                    className="p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{challenge.description}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Difficulty:</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    challenge.difficulty === 'Expert' ? 'bg-purple-100 text-purple-800' :
                    challenge.difficulty === 'Advanced' ? 'bg-red-100 text-red-800' :
                    challenge.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {challenge.difficulty}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Reward:</span>
                  <span className="text-sm font-medium text-green-600">{challenge.reward} XP</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Type:</span>
                  <span className="text-sm text-gray-900 capitalize">{challenge.challenge_type}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Status:</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    challenge.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {challenge.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Content Analytics</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-blue-50 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Total Passages</p>
                <p className="text-2xl font-bold text-blue-900">{passages.length}</p>
              </div>
              <BookOpen className="text-blue-600" size={24} />
            </div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Vocabulary Words</p>
                <p className="text-2xl font-bold text-green-900">{vocabulary.length}</p>
              </div>
              <Brain className="text-green-600" size={24} />
            </div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">GK Questions</p>
                <p className="text-2xl font-bold text-purple-900">{gkQuestions.length}</p>
              </div>
              <Globe className="text-purple-600" size={24} />
            </div>
          </div>
          
          <div className="bg-yellow-50 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-600 text-sm font-medium">Active Challenges</p>
                <p className="text-2xl font-bold text-yellow-900">
                  {challenges.filter(c => c.is_active).length}
                </p>
              </div>
              <Trophy className="text-yellow-600" size={24} />
            </div>
          </div>
        </div>
        
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Content Status Distribution</h4>
            <div className="space-y-3">
              {['published', 'draft', 'archived'].map(status => {
                const count = passages.filter(p => p.status === status).length;
                const percentage = passages.length > 0 ? (count / passages.length) * 100 : 0;
                
                return (
                  <div key={status} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 capitalize">{status}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            status === 'published' ? 'bg-green-500' :
                            status === 'draft' ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Difficulty Distribution</h4>
            <div className="space-y-3">
              {['Beginner', 'Intermediate', 'Advanced'].map(difficulty => {
                const count = passages.filter(p => p.difficulty === difficulty).length;
                const percentage = passages.length > 0 ? (count / passages.length) * 100 : 0;
                
                return (
                  <div key={difficulty} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{difficulty}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            difficulty === 'Advanced' ? 'bg-red-500' :
                            difficulty === 'Intermediate' ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderForm = () => {
    if (!showForm) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
          <div className="flex justify-between items-center p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">
              {editingItem ? 'Edit' : 'Create'} {activeTab.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </h3>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {renderFormFields()}
            
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
              >
                <Save size={16} />
                <span>{loading ? 'Saving...' : 'Save'}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderFormFields = () => {
    switch (activeTab) {
      case 'passages':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
                <select
                  value={formData.type || ''}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="Current Affairs">Current Affairs</option>
                  <option value="Legal">Legal</option>
                  <option value="English">English</option>
                  <option value="General Knowledge">General Knowledge</option>
                  <option value="Logical Reasoning">Logical Reasoning</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty *</label>
                <select
                  value={formData.difficulty || ''}
                  onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Word Count *</label>
                <input
                  type="number"
                  value={formData.word_count || ''}
                  onChange={(e) => setFormData({...formData, word_count: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
              <textarea
                value={formData.content || ''}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                rows={10}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
              <input
                type="text"
                value={Array.isArray(formData.tags) ? formData.tags.join(', ') : ''}
                onChange={(e) => setFormData({...formData, tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="technology, privacy, legal"
              />
            </div>
          </>
        );
      
      case 'vocabulary':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Word *</label>
                <input
                  type="text"
                  value={formData.word || ''}
                  onChange={(e) => setFormData({...formData, word: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <select
                  value={formData.category || ''}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="legal">Legal</option>
                  <option value="general">General</option>
                  <option value="academic">Academic</option>
                  <option value="formal">Formal</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty *</label>
                <select
                  value={formData.difficulty || ''}
                  onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CLAT Relevance (1-10) *</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.clat_relevance || ''}
                  onChange={(e) => setFormData({...formData, clat_relevance: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Definition *</label>
              <textarea
                value={formData.definition || ''}
                onChange={(e) => setFormData({...formData, definition: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Synonyms (comma-separated)</label>
                <input
                  type="text"
                  value={Array.isArray(formData.synonyms) ? formData.synonyms.join(', ') : ''}
                  onChange={(e) => setFormData({...formData, synonyms: e.target.value.split(',').map(s => s.trim()).filter(Boolean)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Antonyms (comma-separated)</label>
                <input
                  type="text"
                  value={Array.isArray(formData.antonyms) ? formData.antonyms.join(', ') : ''}
                  onChange={(e) => setFormData({...formData, antonyms: e.target.value.split(',').map(s => s.trim()).filter(Boolean)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </>
        );
      
      case 'gk-questions':
        return (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Question *</label>
              <textarea
                value={formData.question || ''}
                onChange={(e) => setFormData({...formData, question: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Options *</label>
              {(formData.options || ['', '', '', '']).map((option: string, index: number) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <span className="text-sm font-medium text-gray-500 w-8">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...(formData.options || ['', '', '', ''])];
                      newOptions[index] = e.target.value;
                      setFormData({...formData, options: newOptions});
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="radio"
                    name="correct_answer"
                    checked={formData.correct_answer === index}
                    onChange={() => setFormData({...formData, correct_answer: index})}
                    className="w-4 h-4 text-blue-600"
                  />
                </div>
              ))}
              <p className="text-xs text-gray-500 mt-1">Select the correct answer using the radio buttons</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <select
                  value={formData.category || ''}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="Constitutional Law">Constitutional Law</option>
                  <option value="Economics">Economics</option>
                  <option value="Current Affairs">Current Affairs</option>
                  <option value="History">History</option>
                  <option value="Polity">Polity</option>
                  <option value="Legal Awareness">Legal Awareness</option>
                  <option value="General Knowledge">General Knowledge</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty *</label>
                <select
                  value={formData.difficulty || ''}
                  onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Points</label>
                <input
                  type="number"
                  value={formData.points || 10}
                  onChange={(e) => setFormData({...formData, points: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Explanation</label>
              <textarea
                value={formData.explanation || ''}
                onChange={(e) => setFormData({...formData, explanation: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Provide explanation for the correct answer..."
              />
            </div>
          </>
        );
      
      case 'challenges':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <select
                  value={formData.category || ''}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="Reading Speed">Reading Speed</option>
                  <option value="Vocabulary Building">Vocabulary Building</option>
                  <option value="Reading Comprehension">Reading Comprehension</option>
                  <option value="General Knowledge">General Knowledge</option>
                  <option value="Consistency">Consistency</option>
                  <option value="Legal Mastery">Legal Mastery</option>
                  <option value="Critical Thinking">Critical Thinking</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty *</label>
                <select
                  value={formData.difficulty || ''}
                  onChange={(e) => setFormData({...formData, difficulty: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Challenge Type *</label>
                <select
                  value={formData.challenge_type || ''}
                  onChange={(e) => setFormData({...formData, challenge_type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="speed">Speed</option>
                  <option value="vocabulary">Vocabulary</option>
                  <option value="comprehension">Comprehension</option>
                  <option value="gk">General Knowledge</option>
                  <option value="streak">Streak</option>
                  <option value="mastery">Mastery</option>
                  <option value="analysis">Analysis</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reward (XP) *</label>
                <input
                  type="number"
                  value={formData.reward || ''}
                  onChange={(e) => setFormData({...formData, reward: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Steps *</label>
                <input
                  type="number"
                  value={formData.total_steps || ''}
                  onChange={(e) => setFormData({...formData, total_steps: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Completion Criteria *</label>
              <textarea
                value={formData.completion_criteria || ''}
                onChange={(e) => setFormData({...formData, completion_criteria: e.target.value})}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="is_active"
                checked={formData.is_active || false}
                onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                Active Challenge
              </label>
            </div>
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="text-gray-600 hover:text-gray-900 flex items-center space-x-2"
              >
                <X size={20} />
                <span>Back</span>
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Admin Content Management</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
              
              <button
                onClick={handleCreate}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
              >
                <Plus size={16} />
                <span>Create</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { key: 'passages', label: 'Reading Passages', icon: BookOpen },
              { key: 'vocabulary', label: 'Vocabulary', icon: Brain },
              { key: 'gk-questions', label: 'GK Questions', icon: Globe },
              { key: 'challenges', label: 'Challenges', icon: Trophy },
              { key: 'analytics', label: 'Analytics', icon: BarChart3 }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon size={16} />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4 flex items-center space-x-2">
            <AlertCircle className="text-red-600" size={20} />
            <span className="text-red-800">{error}</span>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-600 hover:text-red-800"
            >
              <X size={16} />
            </button>
          </div>
        )}

        {renderTabContent()}
      </div>

      {/* Form Modal */}
      {renderForm()}
    </div>
  );
};

export default AdminCMS;
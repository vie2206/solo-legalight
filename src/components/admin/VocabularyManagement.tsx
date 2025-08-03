import React, { useState } from 'react';
import { 
  BookOpen, Plus, Edit, Trash2, Search, Filter, 
  Eye, Upload, Download, RefreshCw, Target,
  BarChart3, Users, TrendingUp, Award, Settings,
  Brain, Zap, Globe, Clock, Tag, CheckCircle
} from 'lucide-react';

interface VocabularyManagementProps {}

interface VocabularyWord {
  id: string;
  word: string;
  meaning: string;
  pronunciation: string;
  category: 'Legal' | 'Academic' | 'General' | 'Technical';
  difficulty: 'Basic' | 'Intermediate' | 'Advanced';
  etymology: string;
  examples: string[];
  synonyms: string[];
  antonyms: string[];
  status: 'published' | 'draft' | 'review';
  usage: number;
  correctRate: number;
  createdBy: string;
  createdDate: string;
  lastModified: string;
}

interface CategoryStats {
  category: string;
  totalWords: number;
  publishedWords: number;
  avgDifficulty: number;
  avgUsage: number;
  avgCorrectRate: number;
}

const VocabularyManagement: React.FC<VocabularyManagementProps> = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'words' | 'categories' | 'analytics' | 'bulk-operations'>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingWord, setEditingWord] = useState<VocabularyWord | null>(null);

  // Mock data
  const vocabularyWords: VocabularyWord[] = [
    {
      id: '1',
      word: 'Jurisprudence',
      meaning: 'The theory or philosophy of law',
      pronunciation: '/ˌdʒʊrɪsˈpruːdns/',
      category: 'Legal',
      difficulty: 'Advanced',
      etymology: 'From Latin jurisprudentia, from juris (law) + prudentia (knowledge)',
      examples: [
        'The study of jurisprudence helps understand legal principles.',
        'Constitutional jurisprudence has evolved over decades.'
      ],
      synonyms: ['Legal philosophy', 'Legal theory'],
      antonyms: [],
      status: 'published',
      usage: 1247,
      correctRate: 73.5,
      createdBy: 'Admin User',
      createdDate: '2024-01-15',
      lastModified: '2024-07-20'
    },
    {
      id: '2',
      word: 'Precedent',
      meaning: 'An earlier event or action that is regarded as an example or guide to be considered in subsequent similar circumstances',
      pronunciation: '/ˈpresɪdnt/',
      category: 'Legal',
      difficulty: 'Intermediate',
      etymology: 'From Latin praecedere meaning "to go before"',
      examples: [
        'The court relied on precedent from previous cases.',
        'This ruling sets an important legal precedent.'
      ],
      synonyms: ['Example', 'Model', 'Standard'],
      antonyms: ['Innovation', 'Novelty'],
      status: 'published',
      usage: 892,
      correctRate: 85.2,
      createdBy: 'Content Manager',
      createdDate: '2024-02-10',
      lastModified: '2024-07-18'
    }
  ];

  const categoryStats: CategoryStats[] = [
    { category: 'Legal', totalWords: 487, publishedWords: 423, avgDifficulty: 7.8, avgUsage: 1156, avgCorrectRate: 76.4 },
    { category: 'Academic', totalWords: 312, publishedWords: 298, avgDifficulty: 6.2, avgUsage: 892, avgCorrectRate: 82.1 },
    { category: 'General', totalWords: 156, publishedWords: 143, avgDifficulty: 4.5, avgUsage: 1423, avgCorrectRate: 89.3 },
    { category: 'Technical', totalWords: 89, publishedWords: 78, avgDifficulty: 8.1, avgUsage: 634, avgCorrectRate: 68.7 }
  ];

  const overallStats = {
    totalWords: 1044,
    publishedWords: 942,
    draftWords: 78,
    reviewWords: 24,
    totalUsage: 45623,
    avgCorrectRate: 78.9,
    topCategory: 'Legal',
    recentlyAdded: 23
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Words</p>
              <p className="text-3xl font-bold">{overallStats.totalWords.toLocaleString()}</p>
              <p className="text-blue-100 text-sm mt-1">{overallStats.publishedWords} published</p>
            </div>
            <BookOpen className="w-12 h-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Total Usage</p>
              <p className="text-3xl font-bold">{overallStats.totalUsage.toLocaleString()}</p>
              <p className="text-green-100 text-sm mt-1">Student interactions</p>
            </div>
            <Users className="w-12 h-12 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Success Rate</p>
              <p className="text-3xl font-bold">{overallStats.avgCorrectRate}%</p>
              <p className="text-purple-100 text-sm mt-1">Average accuracy</p>
            </div>
            <Target className="w-12 h-12 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Recently Added</p>
              <p className="text-3xl font-bold">{overallStats.recentlyAdded}</p>
              <p className="text-orange-100 text-sm mt-1">This month</p>
            </div>
            <TrendingUp className="w-12 h-12 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Category Performance */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-6 flex items-center">
          <BarChart3 className="w-6 h-6 mr-2 text-indigo-600" />
          Category Performance Overview
        </h3>
        
        <div className="space-y-4">
          {categoryStats.map((category, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900 flex items-center">
                  <Tag className="w-4 h-4 mr-2 text-indigo-500" />
                  {category.category}
                </h4>
                <span className="text-sm text-gray-600">
                  {category.publishedWords}/{category.totalWords} published
                </span>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-gray-600 mb-1">Avg Usage</p>
                  <p className="font-semibold text-gray-900">{category.avgUsage.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Success Rate</p>
                  <p className="font-semibold text-green-600">{category.avgCorrectRate}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Difficulty</p>
                  <p className="font-semibold text-orange-600">{category.avgDifficulty}/10</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 mb-1">Completion</p>
                  <div className="flex items-center">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-indigo-500 h-2 rounded-full"
                        style={{ width: `${(category.publishedWords / category.totalWords) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-medium">{Math.round((category.publishedWords / category.totalWords) * 100)}%</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold mb-6 flex items-center">
          <Zap className="w-6 h-6 mr-2 text-yellow-600" />
          Quick Actions
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button 
            onClick={() => setShowAddModal(true)}
            className="p-4 border-2 border-dashed border-indigo-300 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors text-center"
          >
            <Plus className="w-8 h-8 mx-auto mb-2 text-indigo-500" />
            <p className="font-medium text-indigo-700">Add New Word</p>
          </button>
          
          <button className="p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors text-center">
            <Upload className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <p className="font-medium text-green-700">Bulk Import</p>
          </button>
          
          <button className="p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors text-center">
            <Download className="w-8 h-8 mx-auto mb-2 text-blue-600" />
            <p className="font-medium text-blue-700">Export Data</p>
          </button>
          
          <button className="p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors text-center">
            <Settings className="w-8 h-8 mx-auto mb-2 text-purple-600" />
            <p className="font-medium text-purple-700">Settings</p>
          </button>
        </div>
      </div>
    </div>
  );

  const renderWordsList = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search vocabulary words..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Categories</option>
            <option value="Legal">Legal</option>
            <option value="Academic">Academic</option>
            <option value="General">General</option>
            <option value="Technical">Technical</option>
          </select>
          
          <select 
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Difficulties</option>
            <option value="Basic">Basic</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="review">Under Review</option>
          </select>
          
          <button 
            onClick={() => setShowAddModal(true)}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Word
          </button>
        </div>
      </div>

      {/* Words Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Word</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Success Rate</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vocabularyWords.map((word) => (
                <tr key={word.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{word.word}</div>
                      <div className="text-sm text-gray-500">{word.pronunciation}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      word.category === 'Legal' ? 'bg-blue-100 text-blue-800' :
                      word.category === 'Academic' ? 'bg-green-100 text-green-800' :
                      word.category === 'General' ? 'bg-purple-100 text-purple-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {word.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      word.difficulty === 'Basic' ? 'bg-green-100 text-green-800' :
                      word.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {word.difficulty}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {word.usage.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${word.correctRate}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{word.correctRate}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      word.status === 'published' ? 'bg-green-100 text-green-800' :
                      word.status === 'draft' ? 'bg-gray-100 text-gray-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {word.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => setEditingWord(word)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-4 h-4" />
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">📚 Vocabulary Management System</h2>
          <p className="text-gray-600">Manage and optimize your vocabulary learning content</p>
        </div>
        
        <div className="flex flex-wrap gap-3 mt-4 lg:mt-0">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center">
            <Upload className="w-4 h-4 mr-2" />
            Bulk Import
          </button>
          
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </button>
          
          <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'words', label: 'Word Management', icon: BookOpen },
          { id: 'categories', label: 'Categories', icon: Tag },
          { id: 'analytics', label: 'Analytics', icon: TrendingUp },
          { id: 'bulk-operations', label: 'Bulk Operations', icon: Settings }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <tab.icon className="w-4 h-4 mr-2" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'words' && renderWordsList()}
      
      {activeTab === 'categories' && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-bold mb-4">Category Management</h3>
          <p className="text-gray-600">Category management interface would be implemented here.</p>
        </div>
      )}
      
      {activeTab === 'analytics' && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-bold mb-4">Vocabulary Analytics</h3>
          <p className="text-gray-600">Detailed analytics dashboard would be implemented here.</p>
        </div>
      )}
      
      {activeTab === 'bulk-operations' && (
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-bold mb-4">Bulk Operations</h3>
          <p className="text-gray-600">Bulk import/export and operations interface would be implemented here.</p>
        </div>
      )}
    </div>
  );
};

export default VocabularyManagement;
import React, { useState, useEffect, useCallback } from 'react';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  EyeIcon, 
  PencilIcon, 
  TrashIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

// Types
interface Card {
  id: string;
  note_id: string;
  deck_id: string;
  deck_name: string;
  template_index: number;
  card_type: number;
  queue: number;
  due: number;
  interval: number;
  ease_factor: number;
  reps: number;
  lapses: number;
  created_at: string;
  updated_at: string;
  note: {
    fields: { [key: string]: string };
    tags: string[];
    note_type: {
      name: string;
      fields: Array<{ name: string; type: string }>;
    };
  };
}

interface SearchFilters {
  query: string;
  deckId: string;
  cardType: string;
  tags: string[];
  dateRange: {
    start: string;
    end: string;
  };
  easeRange: {
    min: number;
    max: number;
  };
  intervalRange: {
    min: number;
    max: number;
  };
  sortBy: 'created_at' | 'updated_at' | 'due' | 'ease_factor' | 'interval' | 'reps';
  sortOrder: 'asc' | 'desc';
}

interface Deck {
  id: string;
  name: string;
}

interface CardBrowserProps {
  userId: string;
  onEditCard: (card: Card) => void;
}

const CardBrowser: React.FC<CardBrowserProps> = ({ userId, onEditCard }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [decks, setDecks] = useState<Deck[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCards, setTotalCards] = useState(0);
  const cardsPerPage = 20;

  // Search and filters
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    deckId: '',
    cardType: '',
    tags: [],
    dateRange: { start: '', end: '' },
    easeRange: { min: 1.3, max: 5.0 },
    intervalRange: { min: 0, max: 36500 },
    sortBy: 'updated_at',
    sortOrder: 'desc'
  });

  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  useEffect(() => {
    loadDecksAndTags();
  }, [userId]);

  useEffect(() => {
    searchCards();
  }, [filters, currentPage]);

  const loadDecksAndTags = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      
      const [decksRes, tagsRes] = await Promise.all([
        fetch(`${API_BASE}/api/flashcards/decks?minimal=true`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${API_BASE}/api/flashcards/tags`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      const [decksData, tagsData] = await Promise.all([
        decksRes.json(),
        tagsRes.json()
      ]);

      setDecks(decksData);
      setAllTags(tagsData);
    } catch (error) {
      console.error('Failed to load decks and tags:', error);
    }
  };

  const searchCards = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('auth_token');
      
      const searchParams = new URLSearchParams({
        page: currentPage.toString(),
        limit: cardsPerPage.toString(),
        sort_by: filters.sortBy,
        sort_order: filters.sortOrder,
        ...(filters.query && { query: filters.query }),
        ...(filters.deckId && { deck_id: filters.deckId }),
        ...(filters.cardType && { card_type: filters.cardType }),
        ...(filters.tags.length > 0 && { tags: filters.tags.join(',') }),
        ...(filters.dateRange.start && { date_start: filters.dateRange.start }),
        ...(filters.dateRange.end && { date_end: filters.dateRange.end }),
        ease_min: filters.easeRange.min.toString(),
        ease_max: filters.easeRange.max.toString(),
        interval_min: filters.intervalRange.min.toString(),
        interval_max: filters.intervalRange.max.toString()
      });

      const response = await fetch(`${API_BASE}/api/flashcards/cards/search?${searchParams}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await response.json();
      
      setCards(data.cards);
      setTotalCards(data.total);
      setTotalPages(Math.ceil(data.total / cardsPerPage));
    } catch (error) {
      console.error('Failed to search cards:', error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, filters]);

  const deleteCard = async (cardId: string) => {
    if (!window.confirm('Are you sure you want to delete this card?')) return;

    try {
      const token = localStorage.getItem('auth_token');
      
      await fetch(`${API_BASE}/api/flashcards/cards/${cardId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      searchCards();
    } catch (error) {
      console.error('Failed to delete card:', error);
    }
  };

  const resetCard = async (cardId: string) => {
    if (!window.confirm('Are you sure you want to reset this card\'s learning progress?')) return;

    try {
      const token = localStorage.getItem('auth_token');
      
      await fetch(`${API_BASE}/api/flashcards/cards/${cardId}/reset`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });

      searchCards();
    } catch (error) {
      console.error('Failed to reset card:', error);
    }
  };

  const suspendCard = async (cardId: string, suspend: boolean) => {
    try {
      const token = localStorage.getItem('auth_token');
      
      await fetch(`${API_BASE}/api/flashcards/cards/${cardId}/suspend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ suspended: suspend })
      });

      searchCards();
    } catch (error) {
      console.error('Failed to suspend/unsuspend card:', error);
    }
  };

  const renderCardContent = (template: string, fields: { [key: string]: string }) => {
    let content = template;
    Object.entries(fields).forEach(([fieldName, fieldValue]) => {
      const placeholder = `{{${fieldName}}}`;
      
      if (fieldName === 'Text' && template.includes('{{cloze:Text}}')) {
        // Special handling for cloze deletions - show original text
        content = content.replace('{{cloze:Text}}', fieldValue);
      } else {
        content = content.replace(placeholder, fieldValue);
      }
    });
    
    // Clean up any remaining placeholders
    content = content.replace(/\{\{[^}]+\}\}/g, '');
    
    return content;
  };

  const getCardTypeLabel = (cardType: number) => {
    const labels = { 0: 'New', 1: 'Learning', 2: 'Review', 3: 'Relearning' };
    return labels[cardType as keyof typeof labels] || 'Unknown';
  };

  const getCardTypeColor = (cardType: number) => {
    const colors = {
      0: 'bg-blue-100 text-blue-800',
      1: 'bg-orange-100 text-orange-800',
      2: 'bg-green-100 text-green-800',
      3: 'bg-red-100 text-red-800'
    };
    return colors[cardType as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <h2 className="text-xl font-bold text-gray-900">Card Browser</h2>
          <span className="text-sm text-gray-500">({totalCards} cards)</span>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              showFilters ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FunnelIcon className="h-4 w-4" />
            <span>Filters</span>
          </button>
          
          <button
            onClick={searchCards}
            className="p-2 hover:bg-gray-100 rounded-lg"
            title="Refresh"
          >
            <ArrowPathIcon className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-6 border-b border-gray-200">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            value={filters.query}
            onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search cards by content, tags, or note type..."
          />
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Deck Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deck</label>
              <select
                value={filters.deckId}
                onChange={(e) => setFilters(prev => ({ ...prev, deckId: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Decks</option>
                {decks.map(deck => (
                  <option key={deck.id} value={deck.id}>{deck.name}</option>
                ))}
              </select>
            </div>

            {/* Card Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Card Type</label>
              <select
                value={filters.cardType}
                onChange={(e) => setFilters(prev => ({ ...prev, cardType: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Types</option>
                <option value="0">New</option>
                <option value="1">Learning</option>
                <option value="2">Review</option>
                <option value="3">Relearning</option>
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select
                value={filters.sortBy}
                onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="updated_at">Last Modified</option>
                <option value="created_at">Created Date</option>
                <option value="due">Due Date</option>
                <option value="ease_factor">Ease Factor</option>
                <option value="interval">Interval</option>
                <option value="reps">Reviews</option>
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
              <select
                value={filters.sortOrder}
                onChange={(e) => setFilters(prev => ({ ...prev, sortOrder: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>
          </div>

          {/* Advanced Filters */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Ease Factor Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ease Factor Range ({filters.easeRange.min} - {filters.easeRange.max})
                </label>
                <div className="flex space-x-2">
                  <input
                    type="range"
                    min="1.3"
                    max="5.0"
                    step="0.1"
                    value={filters.easeRange.min}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      easeRange: { ...prev.easeRange, min: parseFloat(e.target.value) }
                    }))}
                    className="flex-1"
                  />
                  <input
                    type="range"
                    min="1.3"
                    max="5.0"
                    step="0.1"
                    value={filters.easeRange.max}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      easeRange: { ...prev.easeRange, max: parseFloat(e.target.value) }
                    }))}
                    className="flex-1"
                  />
                </div>
              </div>

              {/* Interval Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Interval Range ({filters.intervalRange.min} - {filters.intervalRange.max} days)
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    value={filters.intervalRange.min}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      intervalRange: { ...prev.intervalRange, min: parseInt(e.target.value) || 0 }
                    }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Min"
                  />
                  <input
                    type="number"
                    value={filters.intervalRange.max}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      intervalRange: { ...prev.intervalRange, max: parseInt(e.target.value) || 36500 }
                    }))}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Max"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Reset Filters Button */}
          <div className="mt-4 flex justify-end">
            <button
              onClick={() => {
                setFilters({
                  query: '',
                  deckId: '',
                  cardType: '',
                  tags: [],
                  dateRange: { start: '', end: '' },
                  easeRange: { min: 1.3, max: 5.0 },
                  intervalRange: { min: 0, max: 36500 },
                  sortBy: 'updated_at',
                  sortOrder: 'desc'
                });
                setCurrentPage(1);
              }}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium"
            >
              Reset Filters
            </button>
          </div>
        </div>
      )}

      {/* Cards List */}
      <div className="divide-y divide-gray-200">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : cards.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <p className="text-lg font-medium">No cards found</p>
            <p className="text-sm">Try adjusting your search filters</p>
          </div>
        ) : (
          cards.map((card) => (
            <div key={card.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCardTypeColor(card.card_type)}`}>
                      {getCardTypeLabel(card.card_type)}
                    </span>
                    <span className="text-sm text-gray-500">{card.deck_name}</span>
                    <span className="text-sm text-gray-500">{card.note.note_type.name}</span>
                    {card.queue === -1 && (
                      <span className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-medium">
                        Suspended
                      </span>
                    )}
                  </div>
                  
                  {/* Card Content Preview */}
                  <div className="space-y-2">
                    <div 
                      className="text-sm text-gray-900 line-clamp-2"
                      dangerouslySetInnerHTML={{
                        __html: renderCardContent('{{Front}}', card.note.fields) || 
                               Object.values(card.note.fields)[0] || 'No content'
                      }}
                    />
                    
                    {/* Card Stats */}
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Ease: {card.ease_factor.toFixed(2)}</span>
                      <span>Interval: {card.interval}d</span>
                      <span>Reviews: {card.reps}</span>
                      {card.lapses > 0 && <span>Lapses: {card.lapses}</span>}
                      <span>Modified: {formatDate(card.updated_at)}</span>
                    </div>
                    
                    {/* Tags */}
                    {card.note.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {card.note.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => {
                      setSelectedCard(card);
                      setShowPreview(true);
                    }}
                    className="p-2 hover:bg-gray-200 rounded-lg text-gray-600 hover:text-gray-800"
                    title="Preview"
                  >
                    <EyeIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onEditCard(card)}
                    className="p-2 hover:bg-gray-200 rounded-lg text-gray-600 hover:text-gray-800"
                    title="Edit"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => resetCard(card.id)}
                    className="p-2 hover:bg-gray-200 rounded-lg text-gray-600 hover:text-gray-800"
                    title="Reset Progress"
                  >
                    <ArrowPathIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => suspendCard(card.id, card.queue !== -1)}
                    className={`p-2 hover:bg-gray-200 rounded-lg ${
                      card.queue === -1 ? 'text-green-600' : 'text-orange-600'
                    }`}
                    title={card.queue === -1 ? 'Unsuspend' : 'Suspend'}
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => deleteCard(card.id)}
                    className="p-2 hover:bg-gray-200 rounded-lg text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Showing {((currentPage - 1) * cardsPerPage) + 1} to {Math.min(currentPage * cardsPerPage, totalCards)} of {totalCards} cards
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </button>
            
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Card Preview Modal */}
      {showPreview && selectedCard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold">Card Preview</h3>
              <button
                onClick={() => setShowPreview(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Card Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Deck:</span> {selectedCard.deck_name}
                  </div>
                  <div>
                    <span className="font-medium">Type:</span> {selectedCard.note.note_type.name}
                  </div>
                  <div>
                    <span className="font-medium">Status:</span> 
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getCardTypeColor(selectedCard.card_type)}`}>
                      {getCardTypeLabel(selectedCard.card_type)}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium">Reviews:</span> {selectedCard.reps}
                  </div>
                </div>
              </div>

              {/* Card Fields */}
              <div className="space-y-4">
                {Object.entries(selectedCard.note.fields).map(([fieldName, fieldValue]) => (
                  <div key={fieldName}>
                    <h4 className="font-medium text-gray-900 mb-2">{fieldName}</h4>
                    <div 
                      className="border rounded-lg p-4 bg-gray-50"
                      dangerouslySetInnerHTML={{ __html: fieldValue }}
                    />
                  </div>
                ))}
              </div>

              {/* Tags */}
              {selectedCard.note.tags.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCard.note.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded">
                        {tag}
                      </span>
                    ))}
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

export default CardBrowser;
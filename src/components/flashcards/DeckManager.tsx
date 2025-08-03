import React, { useState, useEffect } from 'react';
import { ChevronDownIcon, ChevronRightIcon, FolderIcon, BookOpenIcon, PlusIcon, PencilIcon, TrashIcon, CogIcon } from '@heroicons/react/24/outline';

// Types
interface Collection {
  id: string;
  name: string;
  description?: string;
  parent_id?: string;
  children?: Collection[];
  decks?: Deck[];
  created_at: string;
  updated_at: string;
}

interface Deck {
  id: string;
  collection_id?: string;
  name: string;
  description?: string;
  total_cards: number;
  new_cards: number;
  learning_cards: number;
  review_cards: number;
  due_cards: number;
  created_at: string;
  updated_at: string;
  settings: DeckSettings;
}

interface DeckSettings {
  new_cards_per_day: number;
  max_reviews_per_day: number;
  learning_steps: number[];
  graduating_interval: number;
  easy_interval: number;
  starting_ease: number;
  easy_bonus: number;
  interval_modifier: number;
  maximum_interval: number;
}

interface DeckManagerProps {
  userId: string;
  onDeckSelect: (deck: Deck) => void;
  onCreateCard: (deckId: string) => void;
}

const DeckManager: React.FC<DeckManagerProps> = ({ userId, onDeckSelect, onCreateCard }) => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [expandedCollections, setExpandedCollections] = useState<Set<string>>(new Set());
  const [selectedDeck, setSelectedDeck] = useState<string | null>(null);
  const [showCreateCollection, setShowCreateCollection] = useState(false);
  const [showCreateDeck, setShowCreateDeck] = useState(false);
  const [showDeckSettings, setShowDeckSettings] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  useEffect(() => {
    loadCollectionsAndDecks();
  }, [userId]);

  const loadCollectionsAndDecks = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('auth_token');
      
      // Load collections
      const collectionsResponse = await fetch(`${API_BASE}/api/flashcards/collections`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const collectionsData = await collectionsResponse.json();

      // Load decks
      const decksResponse = await fetch(`${API_BASE}/api/flashcards/decks`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const decksData = await decksResponse.json();

      // Organize collections hierarchically
      const organizedCollections = organizeCollections(collectionsData, decksData);
      setCollections(organizedCollections);
    } catch (error) {
      console.error('Failed to load collections and decks:', error);
    } finally {
      setLoading(false);
    }
  };

  const organizeCollections = (collections: Collection[], decks: Deck[]): Collection[] => {
    const collectionMap = new Map<string, Collection>();
    const rootCollections: Collection[] = [];

    // Initialize collections
    collections.forEach(collection => {
      collectionMap.set(collection.id, {
        ...collection,
        children: [],
        decks: decks.filter(deck => deck.collection_id === collection.id)
      });
    });

    // Build hierarchy
    collections.forEach(collection => {
      const collectionWithData = collectionMap.get(collection.id)!;
      if (collection.parent_id) {
        const parent = collectionMap.get(collection.parent_id);
        if (parent) {
          parent.children!.push(collectionWithData);
        }
      } else {
        rootCollections.push(collectionWithData);
      }
    });

    // Add orphaned decks to root
    const orphanedDecks = decks.filter(deck => !deck.collection_id);
    if (orphanedDecks.length > 0) {
      rootCollections.push({
        id: 'root',
        name: 'Uncategorized',
        description: 'Decks without a collection',
        children: [],
        decks: orphanedDecks,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    }

    return rootCollections;
  };

  const toggleCollection = (collectionId: string) => {
    setExpandedCollections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(collectionId)) {
        newSet.delete(collectionId);
      } else {
        newSet.add(collectionId);
      }
      return newSet;
    });
  };

  const handleDeckClick = (deck: Deck) => {
    setSelectedDeck(deck.id);
    onDeckSelect(deck);
  };

  const renderCollection = (collection: Collection, depth: number = 0) => {
    const isExpanded = expandedCollections.has(collection.id);
    const hasChildren = (collection.children && collection.children.length > 0) || (collection.decks && collection.decks.length > 0);

    return (
      <div key={collection.id} className={`${depth > 0 ? 'ml-4' : ''}`}>
        {/* Collection Header */}
        <div 
          className="flex items-center justify-between py-2 px-3 hover:bg-gray-50 rounded-lg cursor-pointer group"
          onClick={() => hasChildren && toggleCollection(collection.id)}
        >
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {hasChildren && (
                <button className="p-1 hover:bg-gray-200 rounded">
                  {isExpanded ? (
                    <ChevronDownIcon className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronRightIcon className="h-4 w-4 text-gray-500" />
                  )}
                </button>
              )}
              <FolderIcon className="h-5 w-5 text-blue-500 ml-2" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{collection.name}</h3>
              {collection.description && (
                <p className="text-sm text-gray-500">{collection.description}</p>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowCreateDeck(true);
              }}
              className="p-1 hover:bg-gray-200 rounded text-gray-500 hover:text-gray-700"
              title="Add Deck"
            >
              <PlusIcon className="h-4 w-4" />
            </button>
            <button
              className="p-1 hover:bg-gray-200 rounded text-gray-500 hover:text-gray-700"
              title="Edit Collection"
            >
              <PencilIcon className="h-4 w-4" />
            </button>
            {collection.id !== 'root' && (
              <button
                className="p-1 hover:bg-gray-200 rounded text-gray-500 hover:text-red-600"
                title="Delete Collection"
              >
                <TrashIcon className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Collection Contents */}
        {isExpanded && (
          <div className="ml-4 mt-2 space-y-1">
            {/* Child Collections */}
            {collection.children?.map(child => renderCollection(child, depth + 1))}
            
            {/* Decks in this Collection */}
            {collection.decks?.map(deck => (
              <div
                key={deck.id}
                className={`flex items-center justify-between py-2 px-3 rounded-lg cursor-pointer transition-colors ${
                  selectedDeck === deck.id 
                    ? 'bg-blue-50 border border-blue-200' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => handleDeckClick(deck)}
              >
                <div className="flex items-center space-x-3">
                  <BookOpenIcon className="h-5 w-5 text-green-500" />
                  <div>
                    <h4 className="font-medium text-gray-900">{deck.name}</h4>
                    {deck.description && (
                      <p className="text-sm text-gray-500">{deck.description}</p>
                    )}
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                      <span className="text-blue-600">{deck.new_cards} new</span>
                      <span className="text-orange-600">{deck.learning_cards} learning</span>
                      <span className="text-green-600">{deck.review_cards} review</span>
                      <span className="font-medium text-red-600">{deck.due_cards} due</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onCreateCard(deck.id);
                    }}
                    className="p-1 hover:bg-gray-200 rounded text-gray-500 hover:text-green-600"
                    title="Add Card"
                  >
                    <PlusIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDeckSettings(deck.id);
                    }}
                    className="p-1 hover:bg-gray-200 rounded text-gray-500 hover:text-gray-700"
                    title="Deck Settings"
                  >
                    <CogIcon className="h-4 w-4" />
                  </button>
                  <button
                    className="p-1 hover:bg-gray-200 rounded text-gray-500 hover:text-red-600"
                    title="Delete Deck"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-900">Deck Manager</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowCreateCollection(true)}
            className="px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
          >
            <FolderIcon className="h-4 w-4" />
            <span>New Collection</span>
          </button>
          <button
            onClick={() => setShowCreateDeck(true)}
            className="px-3 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1"
          >
            <BookOpenIcon className="h-4 w-4" />
            <span>New Deck</span>
          </button>
        </div>
      </div>

      {/* Collections Tree */}
      <div className="p-4 max-h-96 overflow-y-auto">
        {collections.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <FolderIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium">No collections yet</p>
            <p className="text-sm">Create your first collection to organize your flashcard decks</p>
          </div>
        ) : (
          <div className="space-y-2">
            {collections.map(collection => renderCollection(collection))}
          </div>
        )}
      </div>

      {/* Study Stats Summary */}
      {selectedDeck && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <h3 className="font-medium text-gray-900 mb-2">Study Today</h3>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => {
                const deck = collections
                  .flatMap(c => c.decks || [])
                  .find(d => d.id === selectedDeck);
                if (deck && deck.due_cards > 0) {
                  // Start study session
                  console.log('Starting study session for deck:', deck.id);
                }
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
              disabled={!collections.flatMap(c => c.decks || []).find(d => d.id === selectedDeck)?.due_cards}
            >
              Study Now
            </button>
            <button
              onClick={() => {
                const deck = collections
                  .flatMap(c => c.decks || [])
                  .find(d => d.id === selectedDeck);
                if (deck) {
                  onCreateCard(deck.id);
                }
              }}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
            >
              Add Cards
            </button>
          </div>
        </div>
      )}

      {/* Create Collection Modal */}
      {showCreateCollection && (
        <CreateCollectionModal
          onClose={() => setShowCreateCollection(false)}
          onSave={() => {
            setShowCreateCollection(false);
            loadCollectionsAndDecks();
          }}
          parentCollections={collections}
        />
      )}

      {/* Create Deck Modal */}
      {showCreateDeck && (
        <CreateDeckModal
          onClose={() => setShowCreateDeck(false)}
          onSave={() => {
            setShowCreateDeck(false);
            loadCollectionsAndDecks();
          }}
          collections={collections}
        />
      )}

      {/* Deck Settings Modal */}
      {showDeckSettings && (
        <DeckSettingsModal
          deckId={showDeckSettings}
          onClose={() => setShowDeckSettings(null)}
          onSave={() => {
            setShowDeckSettings(null);
            loadCollectionsAndDecks();
          }}
        />
      )}
    </div>
  );
};

// Create Collection Modal Component
const CreateCollectionModal: React.FC<{
  onClose: () => void;
  onSave: () => void;
  parentCollections: Collection[];
}> = ({ onClose, onSave, parentCollections }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [parentId, setParentId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('auth_token');
      const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';
      
      await fetch(`${API_BASE}/api/flashcards/collections`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          description,
          parent_id: parentId || null
        })
      });

      onSave();
    } catch (error) {
      console.error('Failed to create collection:', error);
    }
  };

  const flattenCollections = (collections: Collection[]): Collection[] => {
    const result: Collection[] = [];
    const traverse = (items: Collection[], depth = 0) => {
      items.forEach(item => {
        result.push({ ...item, name: '  '.repeat(depth) + item.name });
        if (item.children) {
          traverse(item.children, depth + 1);
        }
      });
    };
    traverse(collections);
    return result;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">Create Collection</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Parent Collection
            </label>
            <select
              value={parentId}
              onChange={(e) => setParentId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">None (Root Level)</option>
              {flattenCollections(parentCollections).map(collection => (
                <option key={collection.id} value={collection.id}>
                  {collection.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Create Deck Modal Component
const CreateDeckModal: React.FC<{
  onClose: () => void;
  onSave: () => void;
  collections: Collection[];
}> = ({ onClose, onSave, collections }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [collectionId, setCollectionId] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('auth_token');
      const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';
      
      await fetch(`${API_BASE}/api/flashcards/decks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name,
          description,
          collection_id: collectionId || null
        })
      });

      onSave();
    } catch (error) {
      console.error('Failed to create deck:', error);
    }
  };

  const flattenCollections = (collections: Collection[]): Collection[] => {
    const result: Collection[] = [];
    const traverse = (items: Collection[], depth = 0) => {
      items.forEach(item => {
        result.push({ ...item, name: '  '.repeat(depth) + item.name });
        if (item.children) {
          traverse(item.children, depth + 1);
        }
      });
    };
    traverse(collections);
    return result;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-bold mb-4">Create Deck</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Collection
            </label>
            <select
              value={collectionId}
              onChange={(e) => setCollectionId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">None (Uncategorized)</option>
              {flattenCollections(collections).map(collection => (
                <option key={collection.id} value={collection.id}>
                  {collection.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Deck Settings Modal Component
const DeckSettingsModal: React.FC<{
  deckId: string;
  onClose: () => void;
  onSave: () => void;
}> = ({ deckId, onClose, onSave }) => {
  const [settings, setSettings] = useState<DeckSettings>({
    new_cards_per_day: 20,
    max_reviews_per_day: 200,
    learning_steps: [1, 10],
    graduating_interval: 1,
    easy_interval: 4,
    starting_ease: 2.50,
    easy_bonus: 1.30,
    interval_modifier: 1.00,
    maximum_interval: 36500
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('auth_token');
      const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';
      
      await fetch(`${API_BASE}/api/flashcards/decks/${deckId}/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(settings)
      });

      onSave();
    } catch (error) {
      console.error('Failed to update deck settings:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-bold mb-4">Deck Settings</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Daily Limits */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Daily Limits</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New cards per day
                </label>
                <input
                  type="number"
                  value={settings.new_cards_per_day}
                  onChange={(e) => setSettings(prev => ({ ...prev, new_cards_per_day: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum reviews per day
                </label>
                <input
                  type="number"
                  value={settings.max_reviews_per_day}
                  onChange={(e) => setSettings(prev => ({ ...prev, max_reviews_per_day: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Learning Steps */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Learning</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Learning steps (minutes)
                </label>
                <input
                  type="text"
                  value={settings.learning_steps.join(' ')}
                  onChange={(e) => {
                    const steps = e.target.value.split(' ').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
                    setSettings(prev => ({ ...prev, learning_steps: steps }));
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="1 10"
                />
                <p className="text-xs text-gray-500 mt-1">Space-separated values</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Graduating interval (days)
                </label>
                <input
                  type="number"
                  value={settings.graduating_interval}
                  onChange={(e) => setSettings(prev => ({ ...prev, graduating_interval: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                />
              </div>
            </div>
          </div>

          {/* Advanced Settings */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Advanced</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Easy interval (days)
                </label>
                <input
                  type="number"
                  value={settings.easy_interval}
                  onChange={(e) => setSettings(prev => ({ ...prev, easy_interval: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Starting ease
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={settings.starting_ease}
                  onChange={(e) => setSettings(prev => ({ ...prev, starting_ease: parseFloat(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1.3"
                  max="5.0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Easy bonus
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={settings.easy_bonus}
                  onChange={(e) => setSettings(prev => ({ ...prev, easy_bonus: parseFloat(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="1.0"
                  max="3.0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Interval modifier
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={settings.interval_modifier}
                  onChange={(e) => setSettings(prev => ({ ...prev, interval_modifier: parseFloat(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0.5"
                  max="2.0"
                />
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeckManager;
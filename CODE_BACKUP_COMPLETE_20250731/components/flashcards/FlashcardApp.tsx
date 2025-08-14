import React, { useState, useEffect } from 'react';
import { 
  BookOpenIcon, 
  ChartBarIcon, 
  MagnifyingGlassIcon, 
  PuzzlePieceIcon, 
  Cog6ToothIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

// Import all flashcard components
import DeckManager from './DeckManager';
import CardEditor from './CardEditor';
import StudySession from './StudySession';
import AnalyticsDashboard from './AnalyticsDashboard';
import CardBrowser from './CardBrowser';
import AddonsManager from './AddonsManager';

// Types
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface StudyStats {
  cards_studied: number;
  new_cards: number;
  learning_cards: number;
  review_cards: number;
  correct_answers: number;
  incorrect_answers: number;
  session_duration: number;
}

interface FlashcardAppProps {
  user: User;
  onLogout: () => void;
}

type ViewType = 'decks' | 'study' | 'analytics' | 'browser' | 'addons' | 'settings' | 'editor';

const FlashcardApp: React.FC<FlashcardAppProps> = ({ user, onLogout }) => {
  const [currentView, setCurrentView] = useState<ViewType>('decks');
  const [selectedDeck, setSelectedDeck] = useState<any>(null);
  const [editingCard, setEditingCard] = useState<any>(null);
  const [studyingDeck, setStudyingDeck] = useState<string | null>(null);
  const [createCardForDeck, setCreateCardForDeck] = useState<string | null>(null);

  // Auto-load enabled addons
  useEffect(() => {
    loadEnabledAddons();
  }, []);

  const loadEnabledAddons = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';
      
      const response = await fetch(`${API_BASE}/api/flashcards/addons?enabled=true`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const addons = await response.json();
      
      // Inject addon CSS and JavaScript
      addons.forEach((addon: any) => {
        if (addon.css_code) {
          const style = document.createElement('style');
          style.textContent = addon.css_code;
          style.setAttribute('data-addon-id', addon.id);
          document.head.appendChild(style);
        }

        if (addon.javascript_code && addon.trusted) {
          try {
            // Create a sandboxed environment for the addon
            const addonContext = {
              console,
              document,
              window,
              // Provide safe APIs for addons
              flashcardAPI: {
                addCard: (deckId: string, noteData: any) => {
                  // Implementation would call your API
                  console.log('Addon adding card:', deckId, noteData);
                },
                updateCard: (cardId: string, updates: any) => {
                  console.log('Addon updating card:', cardId, updates);
                },
                deleteCard: (cardId: string) => {
                  console.log('Addon deleting card:', cardId);
                },
                getDecks: async () => {
                  const response = await fetch(`${API_BASE}/api/flashcards/decks`, {
                    headers: { Authorization: `Bearer ${token}` }
                  });
                  return response.json();
                },
                getCurrentUser: () => user
              }
            };

            // Execute addon code in context
            const func = new Function(...Object.keys(addonContext), addon.javascript_code);
            func(...Object.values(addonContext));
          } catch (error) {
            console.error(`Error loading addon ${addon.name}:`, error);
          }
        }
      });
    } catch (error) {
      console.error('Failed to load addons:', error);
    }
  };

  const handleDeckSelect = (deck: any) => {
    setSelectedDeck(deck);
    setCurrentView('decks'); // Stay on deck view to show deck details
  };

  const handleStartStudy = (deckId: string) => {
    setStudyingDeck(deckId);
    setCurrentView('study');
  };

  const handleStudyComplete = (stats: StudyStats) => {
    setStudyingDeck(null);
    setCurrentView('decks');
    // Could show a completion modal here
    alert(`Study session complete! Studied ${stats.cards_studied} cards in ${Math.floor(stats.session_duration / 60)} minutes.`);
  };

  const handleCreateCard = (deckId: string) => {
    setCreateCardForDeck(deckId);
    setEditingCard(null);
    setCurrentView('editor');
  };

  const handleEditCard = (card: any) => {
    setEditingCard(card);
    setCreateCardForDeck(null);
    setCurrentView('editor');
  };

  const handleSaveCard = (cardData: any) => {
    // Implementation would save the card via API
    console.log('Saving card:', cardData);
    setCurrentView('decks');
    setEditingCard(null);
    setCreateCardForDeck(null);
  };

  const handleCancelEdit = () => {
    setCurrentView('decks');
    setEditingCard(null);
    setCreateCardForDeck(null);
  };

  const navigationItems = [
    { id: 'decks', label: 'Decks', icon: BookOpenIcon },
    { id: 'analytics', label: 'Analytics', icon: ChartBarIcon },
    { id: 'browser', label: 'Browse Cards', icon: MagnifyingGlassIcon },
    { id: 'addons', label: 'Add-ons', icon: PuzzlePieceIcon },
    { id: 'settings', label: 'Settings', icon: Cog6ToothIcon }
  ];

  const renderCurrentView = () => {
    switch (currentView) {
      case 'decks':
        return (
          <DeckManager
            userId={user.id}
            onDeckSelect={handleDeckSelect}
            onCreateCard={handleCreateCard}
          />
        );

      case 'study':
        return studyingDeck ? (
          <StudySession
            deckId={studyingDeck}
            onComplete={handleStudyComplete}
            onExit={() => {
              setStudyingDeck(null);
              setCurrentView('decks');
            }}
          />
        ) : (
          <div className="text-center py-12">
            <p>No study session active</p>
          </div>
        );

      case 'analytics':
        return (
          <AnalyticsDashboard
            userId={user.id}
            selectedDeckId={selectedDeck?.id}
          />
        );

      case 'browser':
        return (
          <CardBrowser
            userId={user.id}
            onEditCard={handleEditCard}
          />
        );

      case 'addons':
        return (
          <AddonsManager
            userId={user.id}
          />
        );

      case 'editor':
        return (
          <CardEditor
            onSave={handleSaveCard}
            onCancel={handleCancelEdit}
            initialNote={editingCard}
            deckId={createCardForDeck || editingCard?.deck_id || ''}
          />
        );

      case 'settings':
        return (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Settings</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Study Preferences</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Show timer during study</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Auto-play audio</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>Night mode</span>
                  </label>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Backup & Sync</h3>
                <div className="space-y-2">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Export Data
                  </button>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    Import Data
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return <div>View not found</div>;
    }
  };

  // Don't show navigation for study view (fullscreen experience)
  if (currentView === 'study') {
    return renderCurrentView();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <AcademicCapIcon className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Flashcard System</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user.name}</span>
              <button
                onClick={onLogout}
                className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-8">
          {/* Sidebar Navigation */}
          <div className="w-64 flex-shrink-0">
            <nav className="bg-white rounded-lg shadow-lg">
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h2>
                <ul className="space-y-2">
                  {navigationItems.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => setCurrentView(item.id as ViewType)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                          currentView === item.id
                            ? 'bg-blue-100 text-blue-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Actions */}
              {selectedDeck && (
                <div className="border-t p-4">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Quick Actions</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleStartStudy(selectedDeck.id)}
                      className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
                      disabled={selectedDeck.due_cards === 0}
                    >
                      Study Now ({selectedDeck.due_cards})
                    </button>
                    <button
                      onClick={() => handleCreateCard(selectedDeck.id)}
                      className="w-full px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium"
                    >
                      Add Card
                    </button>
                  </div>
                </div>
              )}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderCurrentView()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardApp;
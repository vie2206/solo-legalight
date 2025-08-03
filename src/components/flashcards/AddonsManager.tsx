import React, { useState, useEffect } from 'react';
import { 
  PuzzlePieceIcon, 
  CogIcon, 
  TrashIcon, 
  PlayIcon, 
  StopIcon,
  EyeIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

// Types
interface Addon {
  id: string;
  name: string;
  description: string;
  version: string;
  author: string;
  javascript_code: string;
  css_code: string;
  configuration: { [key: string]: any };
  permissions: string[];
  trusted: boolean;
  enabled: boolean;
  created_at: string;
  updated_at: string;
}

interface AddonsManagerProps {
  userId: string;
}

const AddonsManager: React.FC<AddonsManagerProps> = ({ userId }) => {
  const [addons, setAddons] = useState<Addon[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateAddon, setShowCreateAddon] = useState(false);
  const [showAddonDetails, setShowAddonDetails] = useState<string | null>(null);
  const [selectedAddon, setSelectedAddon] = useState<Addon | null>(null);

  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  useEffect(() => {
    loadAddons();
  }, [userId]);

  const loadAddons = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('auth_token');
      
      const response = await fetch(`${API_BASE}/api/flashcards/addons`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await response.json();
      setAddons(data);
    } catch (error) {
      console.error('Failed to load addons:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleAddon = async (addonId: string, enabled: boolean) => {
    try {
      const token = localStorage.getItem('auth_token');
      
      await fetch(`${API_BASE}/api/flashcards/addons/${addonId}/toggle`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ enabled })
      });

      setAddons(prev => prev.map(addon => 
        addon.id === addonId ? { ...addon, enabled } : addon
      ));
    } catch (error) {
      console.error('Failed to toggle addon:', error);
    }
  };

  const deleteAddon = async (addonId: string) => {
    if (!window.confirm('Are you sure you want to delete this addon?')) return;

    try {
      const token = localStorage.getItem('auth_token');
      
      await fetch(`${API_BASE}/api/flashcards/addons/${addonId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });

      setAddons(prev => prev.filter(addon => addon.id !== addonId));
    } catch (error) {
      console.error('Failed to delete addon:', error);
    }
  };

  const getStatusIcon = (addon: Addon) => {
    if (!addon.enabled) {
      return <XCircleIcon className="h-5 w-5 text-gray-400" />;
    }
    if (!addon.trusted) {
      return <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />;
    }
    return <CheckCircleIcon className="h-5 w-5 text-green-500" />;
  };

  const getStatusText = (addon: Addon) => {
    if (!addon.enabled) return 'Disabled';
    if (!addon.trusted) return 'Untrusted';
    return 'Active';
  };

  const getStatusColor = (addon: Addon) => {
    if (!addon.enabled) return 'text-gray-500';
    if (!addon.trusted) return 'text-yellow-600';
    return 'text-green-600';
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
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <PuzzlePieceIcon className="h-6 w-6 text-purple-600" />
          <h2 className="text-xl font-bold text-gray-900">Add-ons Manager</h2>
        </div>
        
        <button
          onClick={() => setShowCreateAddon(true)}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
        >
          Create Add-on
        </button>
      </div>

      {/* Add-ons List */}
      <div className="divide-y divide-gray-200">
        {addons.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <PuzzlePieceIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p className="text-lg font-medium">No add-ons installed</p>
            <p className="text-sm">Create your first add-on to extend functionality</p>
          </div>
        ) : (
          addons.map((addon) => (
            <div key={addon.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    {getStatusIcon(addon)}
                    <h3 className="text-lg font-semibold text-gray-900">{addon.name}</h3>
                    <span className="text-sm text-gray-500">v{addon.version}</span>
                    <span className={`text-sm font-medium ${getStatusColor(addon)}`}>
                      {getStatusText(addon)}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-2">{addon.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>By {addon.author}</span>
                    <span>•</span>
                    <span>Permissions: {addon.permissions.length}</span>
                    <span>•</span>
                    <span>Updated {new Date(addon.updated_at).toLocaleDateString()}</span>
                  </div>

                  {/* Permissions */}
                  {addon.permissions.length > 0 && (
                    <div className="mt-2">
                      <div className="flex flex-wrap gap-1">
                        {addon.permissions.map(permission => (
                          <span key={permission} className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">
                            {permission}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Action Buttons */}
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => {
                      setSelectedAddon(addon);
                      setShowAddonDetails(addon.id);
                    }}
                    className="p-2 hover:bg-gray-200 rounded-lg text-gray-600 hover:text-gray-800"
                    title="View Details"
                  >
                    <EyeIcon className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={() => toggleAddon(addon.id, !addon.enabled)}
                    className={`p-2 hover:bg-gray-200 rounded-lg transition-colors ${
                      addon.enabled ? 'text-red-600 hover:text-red-800' : 'text-green-600 hover:text-green-800'
                    }`}
                    title={addon.enabled ? 'Disable' : 'Enable'}
                  >
                    {addon.enabled ? <StopIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
                  </button>
                  
                  <button
                    className="p-2 hover:bg-gray-200 rounded-lg text-gray-600 hover:text-gray-800"
                    title="Configure"
                  >
                    <CogIcon className="h-4 w-4" />
                  </button>
                  
                  <button
                    onClick={() => deleteAddon(addon.id)}
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

      {/* Create Add-on Modal */}
      {showCreateAddon && (
        <CreateAddonModal
          onClose={() => setShowCreateAddon(false)}
          onSave={() => {
            setShowCreateAddon(false);
            loadAddons();
          }}
        />
      )}

      {/* Add-on Details Modal */}
      {showAddonDetails && selectedAddon && (
        <AddonDetailsModal
          addon={selectedAddon}
          onClose={() => {
            setShowAddonDetails(null);
            setSelectedAddon(null);
          }}
        />
      )}
    </div>
  );
};

// Create Add-on Modal Component
const CreateAddonModal: React.FC<{
  onClose: () => void;
  onSave: () => void;
}> = ({ onClose, onSave }) => {
  const [addon, setAddon] = useState({
    name: '',
    description: '',
    version: '1.0.0',
    author: '',
    javascript_code: `// Add-on JavaScript code
// Available APIs:
// - flashcardAPI.addCard(deckId, noteData)
// - flashcardAPI.updateCard(cardId, updates)  
// - flashcardAPI.deleteCard(cardId)
// - flashcardAPI.getDecks()
// - flashcardAPI.getCurrentUser()

console.log('Add-on loaded successfully!');

// Example: Add a custom button to the study interface
function initializeAddon() {
  // Your initialization code here
}

// Call initialization when addon loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAddon);
} else {
  initializeAddon();
}`,
    css_code: `/* Add-on CSS styles */
.addon-button {
  background-color: #8b5cf6;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.addon-button:hover {
  background-color: #7c3aed;
}`,
    permissions: [] as string[],
    trusted: false
  });

  const availablePermissions = [
    'cards.read',
    'cards.write',
    'cards.delete',
    'decks.read',
    'decks.write',
    'analytics.read',
    'user.read',
    'dom.modify',
    'network.request',
    'storage.local'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('auth_token');
      const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';
      
      await fetch(`${API_BASE}/api/flashcards/addons`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(addon)
      });

      onSave();
    } catch (error) {
      console.error('Failed to create addon:', error);
    }
  };

  const togglePermission = (permission: string) => {
    setAddon(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">Create Add-on</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <XCircleIcon className="h-5 w-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                value={addon.name}
                onChange={(e) => setAddon(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Version *
              </label>
              <input
                type="text"
                value={addon.version}
                onChange={(e) => setAddon(prev => ({ ...prev, version: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Author *
              </label>
              <input
                type="text"
                value={addon.author}
                onChange={(e) => setAddon(prev => ({ ...prev, author: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="trusted"
                checked={addon.trusted}
                onChange={(e) => setAddon(prev => ({ ...prev, trusted: e.target.checked }))}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="trusted" className="ml-2 text-sm text-gray-700">
                Mark as trusted
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              value={addon.description}
              onChange={(e) => setAddon(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows={3}
              required
            />
          </div>

          {/* Permissions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Permissions
            </label>
            <div className="grid grid-cols-2 gap-2">
              {availablePermissions.map(permission => (
                <label key={permission} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={addon.permissions.includes(permission)}
                    onChange={() => togglePermission(permission)}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">{permission}</span>
                </label>
              ))}
            </div>
          </div>

          {/* JavaScript Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              JavaScript Code
            </label>
            <textarea
              value={addon.javascript_code}
              onChange={(e) => setAddon(prev => ({ ...prev, javascript_code: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm"
              rows={12}
            />
          </div>

          {/* CSS Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CSS Code
            </label>
            <textarea
              value={addon.css_code}
              onChange={(e) => setAddon(prev => ({ ...prev, css_code: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 font-mono text-sm"
              rows={8}
            />
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
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
            >
              Create Add-on
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Add-on Details Modal Component
const AddonDetailsModal: React.FC<{
  addon: Addon;
  onClose: () => void;
}> = ({ addon, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold">{addon.name} Details</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <XCircleIcon className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Version</h4>
              <p className="text-gray-600">{addon.version}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Author</h4>
              <p className="text-gray-600">{addon.author}</p>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-1">Description</h4>
            <p className="text-gray-600">{addon.description}</p>
          </div>

          {/* Permissions */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Permissions</h4>
            <div className="flex flex-wrap gap-2">
              {addon.permissions.map(permission => (
                <span key={permission} className="px-2 py-1 bg-yellow-100 text-yellow-800 text-sm rounded">
                  {permission}
                </span>
              ))}
            </div>
          </div>

          {/* Code Preview */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">JavaScript Code</h4>
            <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto max-h-64 overflow-y-auto">
              <code>{addon.javascript_code}</code>
            </pre>
          </div>

          {addon.css_code && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2">CSS Code</h4>
              <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto max-h-64 overflow-y-auto">
                <code>{addon.css_code}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddonsManager;
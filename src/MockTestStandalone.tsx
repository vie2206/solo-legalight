import React, { useState } from 'react';
import MockTestAdminDashboard from './components/MockTestAdminDashboard';
import CompleteMockTestFramework from './components/CompleteMockTestFramework';

const MockTestStandalone: React.FC = () => {
  const [viewMode, setViewMode] = useState<'admin' | 'complete'>('complete');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toggle between views */}
      <div className="bg-white shadow-sm border-b p-4">
        <div className="max-w-7xl mx-auto flex justify-center">
          <div className="flex space-x-4">
            <button
              onClick={() => setViewMode('complete')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                viewMode === 'complete' 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              📚 Complete Framework (Pages 1-42)
            </button>
            <button
              onClick={() => setViewMode('admin')}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                viewMode === 'admin' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              🏛️ Admin Dashboard (Pages 32-42)
            </button>
          </div>
        </div>
      </div>

      {/* Render appropriate view */}
      {viewMode === 'complete' ? (
        <CompleteMockTestFramework />
      ) : (
        <MockTestAdminDashboard />
      )}
    </div>
  );
};

export default MockTestStandalone;
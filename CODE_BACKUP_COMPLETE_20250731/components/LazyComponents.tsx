import { lazy } from 'react';

// Lazy load heavy components for better bundle splitting
export const CLATMockTestAnalysisLazy = lazy(() => 
  import('../CLATMockTestAnalysis').then(module => ({
    default: module.default
  }))
);

export const CLATReadingMasteryLazy = lazy(() => 
  import('../CLATReadingMastery').then(module => ({
    default: module.default
  }))
);

// Loading component for consistent UX
export const ComponentLoader = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
        <svg className="animate-spin h-12 w-12 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading Component</h3>
      <p className="text-gray-600">Please wait while we load your content...</p>
    </div>
  </div>
);
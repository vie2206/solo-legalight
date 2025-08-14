import React, { useState, useEffect, Suspense, lazy } from 'react';
import { User, PerformanceStats } from './types';
import { CLAT_2026_DATE } from './constants';
import { calculateCountdown } from './utils';

// Lazy load components
const CLATReadingMasteryEnhanced = lazy(() => import('./CLATReadingMastery'));
const CLATMockTestAnalysis = lazy(() => import('./CLATMockTestAnalysis'));
const GKQuiz = lazy(() => import('./components/GKQuizCompact'));
const StudyReminders = lazy(() => import('./components/StudyRemindersCompact'));
const CountdownTimers = lazy(() => import('./components/CountdownTimers'));
const DashboardView = lazy(() => import('./components/views/DashboardView'));
const AnalyticsView = lazy(() => import('./components/views/AnalyticsView'));
const Navigation = lazy(() => import('./components/shared/Navigation'));
const Header = lazy(() => import('./components/shared/Header'));

// FlashcardApp lazy import
const FlashcardApp = lazy(() => import('./components/flashcards/FlashcardApp'));

// Loading component
const ComponentLoader = () => (
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

interface DashboardProps {
  user: User | null;
  onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [clatCountdown, setClatCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Performance stats
  const [stats] = useState<PerformanceStats>({
    overallProgress: 68,
    studyStreak: 15,
    totalHours: 127,
    testsCompleted: 34,
    averageScore: 78.5,
    percentileRank: 89,
    questionsAttempted: 1247,
    accuracyRate: 82.3,
    weeklyGoal: 70,
    monthlyImprovement: 12.5,
    clatRank: 2847,
    targetScore: 85,
    currentGPA: 3.8
  });

  // CLAT countdown effect
  useEffect(() => {
    const updateCountdown = () => {
      const countdown = calculateCountdown(CLAT_2026_DATE);
      setClatCountdown(countdown);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleModuleClick = (moduleId: string) => {
    if (moduleId === 'current-affairs') {
      setCurrentView('gk-quiz');
    } else {
      setSelectedModule(moduleId);
    }
  };

  const handleViewChange = (view: string) => {
    setCurrentView(view);
    setSelectedModule(null);
  };

  const handleSidebarToggle = () => setSidebarCollapsed(!sidebarCollapsed);
  const handleMobileMenuToggle = () => setMobileMenuOpen(!mobileMenuOpen);

  // Module-specific views
  if (selectedModule === 'reading-mastery') {
    return (
      <Suspense fallback={<ComponentLoader />}>
        <CLATReadingMasteryEnhanced user={user} onBack={() => setSelectedModule(null)} />
      </Suspense>
    );
  }

  if (selectedModule === 'mock-test-analysis') {
    return (
      <Suspense fallback={<ComponentLoader />}>
        <CLATMockTestAnalysis user={user} onBack={() => setSelectedModule(null)} />
      </Suspense>
    );
  }

  // GK Quiz view
  if (currentView === 'gk-quiz') {
    return (
      <Suspense fallback={<ComponentLoader />}>
        <GKQuiz user={user} onBack={() => setCurrentView('dashboard')} />
      </Suspense>
    );
  }

  // Flashcards view
  if (currentView === 'flashcards') {
    return (
      <Suspense fallback={<ComponentLoader />}>
        <FlashcardApp user={user} onBack={() => setCurrentView('dashboard')} />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Suspense fallback={<div className="w-64 h-screen bg-white"></div>}>
        <Navigation
          user={user}
          currentView={currentView}
          sidebarCollapsed={sidebarCollapsed}
          mobileMenuOpen={mobileMenuOpen}
          onViewChange={handleViewChange}
          onSidebarToggle={handleSidebarToggle}
          onMobileMenuToggle={handleMobileMenuToggle}
          onLogout={onLogout}
        />
      </Suspense>

      {/* Header */}
      <Suspense fallback={<div className="h-16 bg-white"></div>}>
        <Header
          user={user}
          currentView={currentView}
          sidebarCollapsed={sidebarCollapsed}
          onMobileMenuToggle={handleMobileMenuToggle}
        />
      </Suspense>

      {/* Main Content */}
      <div 
        className={`transition-all duration-300 ${
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        } p-4 lg:p-6`}
      >
        <Suspense fallback={<ComponentLoader />}>
          {/* Dashboard View */}
          {currentView === 'dashboard' && (
            <DashboardView
              user={user}
              stats={stats}
              clatCountdown={clatCountdown}
              onViewChange={handleViewChange}
              onModuleClick={handleModuleClick}
            />
          )}

          {/* Analytics View */}
          {currentView === 'analytics' && (
            <AnalyticsView stats={stats} />
          )}

          {/* Study Reminders View */}
          {currentView === 'study-reminders' && (
            <StudyReminders user={user} />
          )}

          {/* Countdown View */}
          {currentView === 'countdown' && (
            <CountdownTimers />
          )}

          {/* Placeholder views for other sections */}
          {['schedule', 'tests', 'practice', 'goals', 'social', 'ai-planner', 'test-analysis', 'insights', 'vocabulary', 'settings'].includes(currentView) && (
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🚧</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {currentView.charAt(0).toUpperCase() + currentView.slice(1).replace('-', ' ')} Coming Soon
                </h2>
                <p className="text-gray-600 mb-6">
                  This section is under development and will be available soon.
                </p>
                <button
                  onClick={() => handleViewChange('dashboard')}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Back to Dashboard
                </button>
              </div>
            </div>
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default Dashboard;
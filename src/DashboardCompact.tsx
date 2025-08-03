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
const SocialView = lazy(() => import('./components/views/SocialView'));
const Navigation = lazy(() => import('./components/shared/Navigation'));
const Header = lazy(() => import('./components/shared/Header'));
const WeeklyStudyInsights = lazy(() => import('./components/WeeklyStudyInsights'));
const CompleteMockTestFramework = lazy(() => import('./components/CompleteMockTestFramework'));
const SettingsView = lazy(() => import('./components/views/SettingsView'));

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
  const [showWeeklyInsights, setShowWeeklyInsights] = useState(false);

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
        <FlashcardApp user={user!} onLogout={() => setCurrentView('dashboard')} />
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
              onShowWeeklyInsights={() => setShowWeeklyInsights(true)}
            />
          )}

          {/* Analytics View */}
          {currentView === 'analytics' && (
            <AnalyticsView stats={stats} />
          )}

          {/* Social View */}
          {currentView === 'social' && (
            <SocialView user={user} />
          )}

          {/* Study Reminders View */}
          {currentView === 'study-reminders' && (
            <StudyReminders user={user} />
          )}

          {/* Countdown View */}
          {currentView === 'countdown' && (
            <CountdownTimers />
          )}

          {/* Mock Tests View */}
          {currentView === 'tests' && (
            <CompleteMockTestFramework />
          )}

          {/* Test Analysis View */}
          {currentView === 'test-analysis' && (
            <CLATMockTestAnalysis user={user} onBack={() => handleViewChange('dashboard')} />
          )}

          {/* Performance Insights View */}
          {currentView === 'insights' && (
            <AnalyticsView stats={stats} />
          )}

          {/* Settings View */}
          {currentView === 'settings' && (
            <SettingsView user={user} />
          )}

          {/* Practice View */}
          {currentView === 'practice' && (
            <GKQuiz user={user} onBack={() => setCurrentView('dashboard')} />
          )}

          {/* Vocabulary Builder View */}
          {currentView === 'vocabulary' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl p-6 lg:p-8 text-white">
                <h2 className="text-2xl lg:text-3xl font-bold mb-2">💡 Vocabulary Builder</h2>
                <p className="text-yellow-100">Master legal and academic vocabulary for CLAT</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-100 p-6 rounded-2xl text-center">
                  <h3 className="font-semibold text-blue-800">Words Learned</h3>
                  <div className="text-3xl font-bold mt-2 text-blue-900">247</div>
                  <p className="text-sm mt-1 text-blue-700">Out of 300 target</p>
                </div>
                <div className="bg-green-100 p-6 rounded-2xl text-center">
                  <h3 className="font-semibold text-green-800">Retention Rate</h3>
                  <div className="text-3xl font-bold mt-2 text-green-900">87%</div>
                  <p className="text-sm mt-1 text-green-700">Memory performance</p>
                </div>
                <div className="bg-pink-100 p-6 rounded-2xl text-center">
                  <h3 className="font-semibold text-pink-800">Daily Streak</h3>
                  <div className="text-3xl font-bold mt-2 text-pink-900">12</div>
                  <p className="text-sm mt-1 text-pink-700">Days in a row</p>
                </div>
              </div>
              
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-xl mb-4 text-gray-900">Today's Legal Terms</h3>
                <div className="space-y-4">
                  {[
                    { word: 'Jurisprudence', meaning: 'The theory or philosophy of law', category: 'Legal', difficulty: 'Advanced' },
                    { word: 'Precedent', meaning: 'An earlier event that serves as an example', category: 'Legal', difficulty: 'Intermediate' },
                    { word: 'Constitutional', meaning: 'Relating to established principles', category: 'Legal', difficulty: 'Basic' }
                  ].map((vocab, idx) => (
                    <div key={idx} className="p-4 rounded-xl border border-gray-200 hover:border-yellow-300 transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-bold text-lg text-gray-900">{vocab.word}</h4>
                        <div className="flex space-x-2">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                            {vocab.category}
                          </span>
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                            {vocab.difficulty}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{vocab.meaning}</p>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 text-xs font-medium rounded-full border-2 border-green-500 text-green-600 hover:bg-green-50">
                          Know It
                        </button>
                        <button className="px-3 py-1 text-xs font-medium rounded-full border-2 border-red-500 text-red-600 hover:bg-red-50">
                          Review Later
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Goals & Achievements View */}
          {currentView === 'goals' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-3xl p-6 lg:p-8 text-white">
                <h2 className="text-2xl lg:text-3xl font-bold mb-2">🎯 Goals & Achievements</h2>
                <p className="text-purple-100">Track your progress and unlock achievements</p>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-blue-100 p-6 rounded-2xl text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blue-200 flex items-center justify-center">
                    <span className="text-2xl">✅</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-900">12</div>
                  <p className="text-sm text-blue-700">Goals Completed</p>
                </div>
                <div className="bg-green-100 p-6 rounded-2xl text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-200 flex items-center justify-center">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div className="text-2xl font-bold text-green-900">5</div>
                  <p className="text-sm text-green-700">Active Goals</p>
                </div>
                <div className="bg-pink-100 p-6 rounded-2xl text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-pink-200 flex items-center justify-center">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <div className="text-2xl font-bold text-pink-900">8</div>
                  <p className="text-sm text-pink-700">Achievements</p>
                </div>
                <div className="bg-orange-100 p-6 rounded-2xl text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-orange-200 flex items-center justify-center">
                    <span className="text-2xl">🔥</span>
                  </div>
                  <div className="text-2xl font-bold text-orange-900">87%</div>
                  <p className="text-sm text-orange-700">Success Rate</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-xl mb-4 text-gray-900">Active Goals</h3>
                  <div className="space-y-4">
                    {[
                      { goal: 'Complete 5 mock tests this week', progress: 80, current: 4, target: 5 },
                      { goal: 'Study 2 hours daily', progress: 90, current: 13, target: 14 },
                      { goal: 'Achieve 85% accuracy', progress: 75, current: 82, target: 85 }
                    ].map((item, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-gray-50">
                        <h4 className="font-medium text-gray-900 mb-2">{item.goal}</h4>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600">{item.current} / {item.target}</span>
                          <span className="text-sm font-medium text-blue-600">{item.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                            style={{ width: `${item.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-xl mb-4 text-gray-900">Recent Achievements</h3>
                  <div className="space-y-4">
                    {[
                      { title: 'First Mock Test', desc: 'Completed your first mock test', icon: '🎉', date: '2 days ago' },
                      { title: 'Study Streak', desc: '7 days of consistent study', icon: '🔥', date: '1 week ago' },
                      { title: 'Speed Reader', desc: 'Reading speed over 250 WPM', icon: '⚡', date: '2 weeks ago' }
                    ].map((achievement, idx) => (
                      <div key={idx} className="flex items-center p-4 rounded-xl bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200">
                        <div className="text-3xl mr-4">{achievement.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{achievement.title}</h4>
                          <p className="text-sm text-gray-600">{achievement.desc}</p>
                          <p className="text-xs text-gray-500 mt-1">{achievement.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Study Schedule View */}
          {currentView === 'schedule' && (
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 rounded-3xl p-6 lg:p-8 text-white">
                <h2 className="text-2xl lg:text-3xl font-bold mb-2">📅 Study Schedule</h2>
                <p className="text-indigo-100">Organize your CLAT preparation timeline</p>
              </div>
              
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-semibold text-xl mb-4 text-gray-900">Today's Schedule</h3>
                <div className="space-y-4">
                  {[
                    { time: '9:00 AM', subject: 'Legal Reasoning', duration: '2 hours', status: 'completed' },
                    { time: '11:30 AM', subject: 'Reading Comprehension', duration: '1.5 hours', status: 'current' },
                    { time: '2:00 PM', subject: 'Logical Reasoning', duration: '2 hours', status: 'pending' },
                    { time: '5:00 PM', subject: 'Current Affairs', duration: '1 hour', status: 'pending' }
                  ].map((session, idx) => (
                    <div key={idx} className={`flex items-center p-4 rounded-xl border-l-4 ${
                      session.status === 'completed' ? 'bg-green-50 border-green-500' :
                      session.status === 'current' ? 'bg-blue-50 border-blue-500' :
                      'bg-gray-50 border-gray-300'
                    }`}>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-900">{session.subject}</h4>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            session.status === 'completed' ? 'bg-green-100 text-green-800' :
                            session.status === 'current' ? 'bg-blue-100 text-blue-800' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {session.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">{session.time} • {session.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-xl mb-4 text-gray-900">Weekly Overview</h3>
                  <div className="space-y-3">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                        <span className="font-medium text-gray-900">{day}</span>
                        <div className="flex space-x-2">
                          <span className="text-sm text-gray-600">4.5 hrs</span>
                          <div className={`w-4 h-4 rounded-full ${
                            idx < 3 ? 'bg-green-500' : idx === 3 ? 'bg-blue-500' : 'bg-gray-300'
                          }`}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-xl mb-4 text-gray-900">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full p-4 text-left rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors">
                      <h4 className="font-medium text-blue-900">Add Study Session</h4>
                      <p className="text-sm text-blue-700">Schedule a new study block</p>
                    </button>
                    <button className="w-full p-4 text-left rounded-xl bg-green-50 hover:bg-green-100 border border-green-200 transition-colors">
                      <h4 className="font-medium text-green-900">Set Reminders</h4>
                      <p className="text-sm text-green-700">Get notified before sessions</p>
                    </button>
                    <button className="w-full p-4 text-left rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-colors">
                      <h4 className="font-medium text-purple-900">View Calendar</h4>
                      <p className="text-sm text-purple-700">See full month view</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Placeholder views for remaining sections */}
          {['ai-planner'].includes(currentView) && (
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🚧</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {currentView.charAt(0).toUpperCase() + currentView.slice(1).replace('-', ' ')} Coming Soon
                </h2>
                <p className="text-gray-600 mb-6">
                  This section is under development and will be available soon.
                </p>
                <div className="space-x-4">
                  <button
                    onClick={() => setShowWeeklyInsights(true)}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    📊 View Weekly Insights
                  </button>
                  <button
                    onClick={() => handleViewChange('dashboard')}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    Back to Dashboard
                  </button>
                </div>
              </div>
            </div>
          )}
        </Suspense>

        {/* Weekly Study Insights Modal */}
        {showWeeklyInsights && (
          <Suspense fallback={<ComponentLoader />}>
            <WeeklyStudyInsights 
              user={user} 
              onClose={() => setShowWeeklyInsights(false)} 
            />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
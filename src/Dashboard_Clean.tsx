import React, { useState } from 'react'
import { 
  HomeIcon, CalendarIcon, ChartBarIcon, BookOpenIcon, 
  Cog6ToothIcon, BellIcon, ArrowRightOnRectangleIcon, 
  Bars3Icon, FireIcon, AcademicCapIcon, LightBulbIcon,
  DocumentTextIcon, PresentationChartBarIcon, SparklesIcon
} from '@heroicons/react/24/outline'
import CLATReadingMastery from './CLATReadingMastery'

// Type Definitions
interface User {
  id: string
  name: string
  email: string
  role: 'student' | 'admin' | 'educator' | 'parent' | 'operation_manager'
  picture?: string
  target_nlu?: string
  target_score?: number
  subscription_tier?: 'free' | 'premium' | 'elite'
  study_streak?: number
  total_tests?: number
  avg_score?: number
}

interface DashboardProps {
  user: User | null
  onLogout: () => void
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [currentView, setCurrentView] = useState('dashboard')
  const [selectedModule, setSelectedModule] = useState<string | null>(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  // CLAT Performance Stats
  const [stats] = useState({
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
  })

  // CLAT Learning modules - matching design inspiration
  const modules = [
    {
      id: 'reading-mastery',
      title: 'CLAT Reading Comprehension',
      time: '11:00 AM',
      bgColor: '#87CEEB', // Light blue like MATHEMATICS in screenshot
      progress: 75,
      nextLesson: 'Environmental Law Passages',
      stats: { completed: 45, total: 60 },
      subject: 'Reading & Comprehension'
    },
    {
      id: 'legal-reasoning',
      title: 'Legal Reasoning',
      time: '12:30 PM',
      bgColor: '#F4A460', // Light orange like HISTORY in screenshot
      progress: 62,
      nextLesson: 'Constitutional Law Principles',
      stats: { completed: 31, total: 50 },
      subject: 'Legal Aptitude'
    },
    {
      id: 'logical-reasoning',
      title: 'Logical Reasoning',
      time: '2:00 PM',
      bgColor: '#87CEFA', // Light blue like PHYSICS in screenshot
      progress: 58,
      nextLesson: 'Syllogisms & Assumptions',
      stats: { completed: 29, total: 50 },
      subject: 'Logical Reasoning'
    },
    {
      id: 'current-affairs',
      title: 'Current Affairs & GK',
      time: '3:00 PM',
      bgColor: '#90EE90', // Light green like BIOLOGY in screenshot
      progress: 80,
      nextLesson: 'Recent Legal Developments',
      stats: { completed: 120, total: 150 },
      subject: 'General Knowledge'
    },
    {
      id: 'quantitative',
      title: 'Quantitative Techniques',
      time: '4:30 PM',
      bgColor: '#FFB6C1', // Light pink like SPANISH in screenshot
      progress: 70,
      nextLesson: 'Data Interpretation',
      stats: { completed: 35, total: 50 },
      subject: 'Mathematics'
    }
  ]

  const handleModuleClick = (moduleId: string) => {
    if (moduleId === 'reading-mastery') {
      setSelectedModule('reading-mastery')
    } else {
      setSelectedModule(moduleId)
    }
  }

  // If CLATReadingMastery is selected, show it
  if (selectedModule === 'reading-mastery') {
    return <CLATReadingMastery user={user} onBack={() => setSelectedModule(null)} />
  }

  // Navigation items
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
    { id: 'schedule', label: 'Schedule', icon: CalendarIcon },
    { id: 'tests', label: 'Mock Tests', icon: BookOpenIcon },
    { id: 'practice', label: 'Practice', icon: AcademicCapIcon },
    { id: 'analytics', label: 'Analytics', icon: ChartBarIcon },
    { id: 'ai-planner', label: 'AI Planner', icon: SparklesIcon },
    { id: 'test-analysis', label: 'Analysis', icon: DocumentTextIcon },
    { id: 'insights', label: 'Insights', icon: PresentationChartBarIcon },
    { id: 'vocabulary', label: 'Vocabulary', icon: LightBulbIcon },
    { id: 'settings', label: 'Settings', icon: Cog6ToothIcon }
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8f9fa', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-40 shadow-sm ${
        sidebarCollapsed ? 'w-16' : 'w-64'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className={`flex items-center space-x-3 ${sidebarCollapsed ? 'justify-center' : ''}`}>
                <div 
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: '#363535' }}
                >
                  L
                </div>
                {!sidebarCollapsed && (
                  <div>
                    <h1 className="font-bold text-lg" style={{ color: '#363535' }}>Level Up</h1>
                    <p className="text-xs text-gray-500">CLAT Analytics Platform</p>
                  </div>
                )}
              </div>
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                <Bars3Icon className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'} p-3 rounded-2xl transition-all duration-300 ${
                  currentView === item.id 
                    ? 'text-white' 
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
                style={currentView === item.id ? { backgroundColor: '#363535' } : {}}
              >
                <item.icon className="w-5 h-5" />
                {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
              </button>
            ))}
          </nav>

          {/* User Profile */}
          <div className={`p-4 border-t border-gray-200 ${sidebarCollapsed ? 'flex justify-center' : ''}`}>
            <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'}`}>
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                style={{ backgroundColor: '#ffdd6d', color: '#363535' }}
              >
                {user?.name?.[0] || 'U'}
              </div>
              {!sidebarCollapsed && (
                <div className="flex-1">
                  <p className="font-semibold text-sm" style={{ color: '#363535' }}>{user?.name || 'Student'}</p>
                  <p className="text-xs text-gray-500">{user?.subscription_tier || 'Free'} Plan</p>
                </div>
              )}
              {!sidebarCollapsed && (
                <button
                  onClick={onLogout}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200"
                >
                  <ArrowRightOnRectangleIcon className="w-4 h-4 text-gray-600" />
                </button>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold" style={{ color: '#363535' }}>
                  {currentView === 'dashboard' && 'Dashboard'}
                  {currentView === 'schedule' && 'Study Schedule'}
                  {currentView === 'tests' && 'Mock Tests'}
                  {currentView === 'practice' && 'Practice Sessions'}
                  {currentView === 'analytics' && 'Analytics & Reports'}
                  {currentView === 'ai-planner' && 'AI Study Planner'}
                  {currentView === 'test-analysis' && 'Test Analysis'}
                  {currentView === 'insights' && 'Performance Insights'}
                  {currentView === 'vocabulary' && 'Vocabulary Builder'}
                  {currentView === 'settings' && 'Settings'}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Welcome back, {user?.name || 'Student'}!
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-all duration-200">
                  <BellIcon className="w-5 h-5 text-gray-600" />
                  <span 
                    className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
                    style={{ backgroundColor: '#fb5053' }}
                  ></span>
                </button>
                <div 
                  className="text-right px-3 py-2 rounded-2xl"
                  style={{ backgroundColor: '#ffdd6d' }}
                >
                  <p className="text-sm font-semibold" style={{ color: '#363535' }}>
                    <FireIcon className="inline w-4 h-4 mr-1" />
                    {stats.studyStreak} days streak
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-6">
          {currentView === 'dashboard' && (
            <div className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold" style={{ color: '#363535' }}>CLAT Score</h3>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#ffdd6d' }}></div>
                  </div>
                  <div className="mb-2">
                    <span className="text-4xl font-bold" style={{ color: '#363535' }}>{stats.averageScore}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span 
                      className="px-2 py-1 text-xs font-medium rounded-full"
                      style={{ backgroundColor: '#ffdd6d', color: '#363535' }}
                    >
                      Above Target
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Score improved by {stats.monthlyImprovement}% this month</p>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold" style={{ color: '#363535' }}>Mock Tests</h3>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#fb5053' }}></div>
                  </div>
                  <div className="mb-2">
                    <span className="text-4xl font-bold" style={{ color: '#363535' }}>{stats.testsCompleted}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span 
                      className="px-2 py-1 text-xs font-medium rounded-full"
                      style={{ backgroundColor: '#ffdd6d', color: '#363535' }}
                    >
                      On Track
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Completed {stats.testsCompleted} full-length tests</p>
                </div>

                <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold" style={{ color: '#363535' }}>Study Streak</h3>
                    <FireIcon className="w-4 h-4" style={{ color: '#fb5053' }} />
                  </div>
                  <div className="mb-2">
                    <span className="text-4xl font-bold" style={{ color: '#363535' }}>{stats.studyStreak}</span>
                  </div>
                  <p className="text-xs text-gray-500">Days in a row</p>
                </div>
              </div>

              {/* Today's CLAT Study Schedule - Inspired by mobile app design */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-xl" style={{ color: '#363535' }}>5 lessons today</h3>
                  <p className="text-sm text-gray-500">Tuesday, Jan 30</p>
                </div>
                
                <div className="space-y-4">
                  {modules.map((module) => (
                    <button
                      key={module.id}
                      onClick={() => handleModuleClick(module.id)}
                      className="w-full rounded-3xl p-6 text-left hover:scale-105 transition-all duration-300 shadow-sm"
                      style={{ backgroundColor: module.bgColor }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#363535' }}></div>
                          <div>
                            <h4 className="font-bold text-lg" style={{ color: '#363535' }}>{module.title}</h4>
                            <p className="text-sm opacity-70" style={{ color: '#363535' }}>{module.nextLesson}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-lg" style={{ color: '#363535' }}>{module.time}</span>
                          <div className="text-xs opacity-70" style={{ color: '#363535' }}>{module.progress}% complete</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Other views can be added here */}
          {currentView !== 'dashboard' && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                {currentView.charAt(0).toUpperCase() + currentView.slice(1)} view coming soon...
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Dashboard
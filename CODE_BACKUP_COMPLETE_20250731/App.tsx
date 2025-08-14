import React, { useState, useEffect, Suspense, lazy } from 'react';
import SMSAuth from './components/SMSAuth';

// Lazy load dashboards for better bundle splitting
const Dashboard = lazy(() => import('./DashboardCompact'));
const AdminCMS = lazy(() => import('./components/AdminCMS'));
const CompleteAdminDashboard = lazy(() => import('./components/CompleteAdminDashboard'));
const MockTestStandalone = lazy(() => import('./MockTestStandalone'));
const FlashcardApp = lazy(() => import('./components/flashcards/FlashcardApp'));

// Loading component
const AppLoader = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 mb-4">
        <svg className="animate-spin h-16 w-16 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Level Up CLAT</h2>
      <p className="text-gray-600">Loading your dashboard...</p>
    </div>
  </div>
);

// Types
interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin' | 'educator' | 'parent' | 'operation_manager';
  picture?: string;
  target_nlu?: string;
  target_score?: number;
  subscription_tier?: 'free' | 'premium' | 'elite';
  study_streak?: number;
  total_tests?: number;
  avg_score?: number;
}

interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<'dashboard' | 'admin-cms' | 'flashcards'>('dashboard');
  const [loginForm, setLoginForm] = useState({ email: '', password: '', role: 'student' });
  const [authMode, setAuthMode] = useState<'sms' | 'demo' | 'email' | 'mocktest'>('sms');

  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  // Check for existing auth on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('auth_token');
    const savedUser = localStorage.getItem('user_data');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    
    setLoading(false);
  }, []);

  // Demo login function
  const handleDemoLogin = async (role: string) => {
    try {
      const response = await fetch(`${API_BASE}/api/auth/demo-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role })
      });

      const data: AuthResponse = await response.json();
      
      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('user_data', JSON.stringify(data.user));
      } else {
        alert('Demo login failed');
      }
    } catch (error) {
      console.error('Demo login error:', error);
      alert('Demo login failed');
    }
  };

  // Regular login function
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: loginForm.email,
          password: loginForm.password
        })
      });

      const data = await response.json();
      
      if (data.token && data.user) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('user_data', JSON.stringify(data.user));
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed');
    }
  };

  // SMS Authentication success handler
  const handleSMSSuccess = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('auth_token', newToken);
    localStorage.setItem('user_data', JSON.stringify(newUser));
    setAuthMode('sms');
  };

  // Logout function
  const handleLogout = () => {
    setUser(null);
    setToken(null);
    setCurrentView('dashboard');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    setAuthMode('sms'); // Reset to SMS auth
  };

  // Loading screen
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Mock Test Dashboard direct access
  if (authMode === 'mocktest') {
    return (
      <Suspense fallback={<AppLoader />}>
        <MockTestStandalone />
      </Suspense>
    );
  }

  // Login screen
  if (!user) {
    // Show SMS Authentication by default
    if (authMode === 'sms') {
      return (
        <div>
          <header style={{ 
            padding: '20px', 
            textAlign: 'center',
            background: '#0000ff',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}>
            <h1 style={{ 
              fontSize: '3rem', 
              marginBottom: '10px',
              color: 'white',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              fontFamily: 'Fredoka, sans-serif'
            }}>
              LEVEL UP
            </h1>
            <p style={{ 
              fontSize: '1.2rem', 
              opacity: 0.9,
              color: 'white',
              marginBottom: '10px',
              fontFamily: 'Fredoka, sans-serif'
            }}>
              Legalight's AI-Powered CLAT Analytics Platform
            </p>
          </header>
          
          <SMSAuth 
            onSuccess={handleSMSSuccess}
            onBack={() => setAuthMode('demo')}
          />
        </div>
      );
    }

    // Demo/Email login fallback
    return (
      <div className="min-h-screen bg-gray-50">
        <header style={{ 
          padding: '20px', 
          textAlign: 'center',
          background: '#0000ff',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          <h1 style={{ 
            fontSize: '3rem', 
            marginBottom: '10px',
            color: 'white',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            fontFamily: 'Fredoka, sans-serif'
          }}>
            LEVEL UP
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            opacity: 0.9,
            color: 'white',
            marginBottom: '30px',
            fontFamily: 'Fredoka, sans-serif'
          }}>
            Legalight's AI-Powered CLAT Analytics Platform
          </p>
        </header>

        <div className="flex items-center justify-center min-h-[calc(100vh-200px)] p-6">
          <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
              Demo & Testing
            </h2>

            {/* Switch to SMS Auth */}
            <div className="mb-6">
              <button
                onClick={() => setAuthMode('sms')}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors mb-3"
              >
                📱 Login with SMS (Recommended)
              </button>
              
              <button
                onClick={() => setAuthMode('mocktest')}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium transition-colors"
              >
                📊 View Mock Test Dashboard (Direct)
              </button>
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or use demo accounts</span>
              </div>
            </div>

            {/* Demo Login Options */}
            <div className="space-y-3 mb-6">
              <h3 className="text-lg font-semibold text-gray-700 text-center">Quick Demo Login</h3>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { role: 'student', label: '👨‍🎓 Student Demo', color: 'bg-blue-600 hover:bg-blue-700' },
                  { role: 'admin', label: '⚙️ Admin Demo', color: 'bg-red-600 hover:bg-red-700' },
                  { role: 'educator', label: '👩‍🏫 Educator Demo', color: 'bg-green-600 hover:bg-green-700' },
                  { role: 'parent', label: '👨‍👩‍👧‍👦 Parent Demo', color: 'bg-purple-600 hover:bg-purple-700' },
                  { role: 'operation_manager', label: '👔 Manager Demo', color: 'bg-indigo-600 hover:bg-indigo-700' }
                ].map(({ role, label, color }) => (
                  <button
                    key={role}
                    onClick={() => handleDemoLogin(role)}
                    className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${color}`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or login with email</span>
              </div>
            </div>

            {/* Regular Login Form */}
            <form onSubmit={handleLogin} className="mt-6 space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Role-based navigation
  const showAdminCMS = user.role === 'admin' || user.role === 'operation_manager' || user.role === 'educator';
  

  // Main application with role-based routing
  return (
    <div className="App">
      
      {currentView === 'dashboard' && (
        <>
          {/* Render different dashboards based on user role */}
          {user.role === 'admin' ? (
            <CompleteAdminDashboard 
              user={user}
              onLogout={handleLogout}
            />
          ) : (
            <>
              {/* Enhanced header for non-admin users */}
              <header style={{ 
                padding: '20px', 
                textAlign: 'center',
                background: '#0000ff',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}>
                <div className="flex justify-between items-center max-w-7xl mx-auto">
                  <div>
                    <h1 style={{ 
                      fontSize: '3rem', 
                      marginBottom: '10px',
                      color: 'white',
                      textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                      fontFamily: 'Fredoka, sans-serif'
                    }}>
                      LEVEL UP
                    </h1>
                    <p style={{ 
                      fontSize: '1.2rem', 
                      opacity: 0.9,
                      color: 'white',
                      marginBottom: '10px',
                      fontFamily: 'Fredoka, sans-serif'
                    }}>
                      Legalight's AI-Powered CLAT Analytics Platform
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {/* Role indicator */}
                    <div className="bg-white/20 rounded-lg px-3 py-2">
                      <span className="text-white text-sm font-medium">
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1).replace('_', ' ')} Dashboard
                      </span>
                    </div>
                    
                    {/* Admin CMS Access */}
                    {showAdminCMS && (
                      <button
                        onClick={() => setCurrentView('admin-cms')}
                        className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        ⚙️ Admin CMS
                      </button>
                    )}
                    
                    {/* Flashcards Access */}
                    <button
                      onClick={() => setCurrentView('flashcards')}
                      className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      🧠 Flashcards
                    </button>
                    
                    {/* User menu */}
                    <div className="bg-white/20 rounded-lg px-3 py-2">
                      <span className="text-white text-sm">{user.name}</span>
                    </div>
                    
                    <button
                      onClick={handleLogout}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </header>
              
              <Dashboard 
                user={user}
                onLogout={handleLogout}
              />
            </>
          )}
        </>
      )}

      {currentView === 'admin-cms' && token && (
        <Suspense fallback={<AppLoader />}>
          <AdminCMS 
            userToken={token}
            onBack={() => setCurrentView('dashboard')}
          />
        </Suspense>
      )}

      {currentView === 'flashcards' && user && (
        <Suspense fallback={<AppLoader />}>
          <FlashcardApp 
            user={user}
            onLogout={handleLogout}
          />
        </Suspense>
      )}
    </div>
  );
}

export default App;
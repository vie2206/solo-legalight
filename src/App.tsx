import React, { useState, useEffect, Suspense, lazy } from 'react';
import SMSAuth from './components/SMSAuth';
import { User } from './types';
import { SubscriptionTier } from './types/subscription';

// Lazy load dashboards for better bundle splitting
const AdminCMS = lazy(() => import('./components/AdminCMS'));
const SoloAdminDashboard = lazy(() => import('./components/SoloAdminDashboard'));
const SoloEducatorDashboard = lazy(() => import('./components/SoloEducatorDashboard'));
const SoloParentDashboard = lazy(() => import('./components/SoloParentDashboard'));
const SoloOperationManagerDashboard = lazy(() => import('./components/SoloOperationManagerDashboard'));
const SoloStudentDashboard = lazy(() => import('./components/RevolutionaryStudentDashboard'));
const MockTestStandalone = lazy(() => import('./MockTestStandalone'));
const FlashcardApp = lazy(() => import('./components/flashcards/FlashcardApp'));
const TieredDashboard = lazy(() => import('./components/TieredDashboard'));
const SubscriptionPlans = lazy(() => import('./components/SubscriptionPlans'));
const ScreenshotGenerator = lazy(() => import('./ScreenshotGenerator'));

// Landing Page and Auth Components
const SoloLandingPage = lazy(() => import('./components/landing/SoloLandingPage'));
const AppleStyleLanding = lazy(() => import('./components/landing/AppleStyleLanding'));
const SoloOTPAuth = lazy(() => import('./components/auth/SoloOTPAuth'));
const SOLOModernUI = lazy(() => import('./components/modern/SOLOModernUI'));
const HulyDesignSystem = lazy(() => import('./components/huly/HulyDesignSystem'));

// AI-Powered Learning Modules
const CLATVocabularyMastery = lazy(() => import('./CLATVocabularyMastery'));
const CLATReadingMasteryComplete = lazy(() => import('./CLATReadingMasteryComplete'));
const CLATAIDashboard = lazy(() => import('./CLATAIDashboard'));

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
      <h2 className="text-2xl font-bold text-solo-dark mb-2 font-jakarta">
        SOLO <span className="text-solo-primary">by Legalight</span>
      </h2>
      <p className="text-solo-gray-600 font-medium">we can do hard things</p>
      <p className="text-solo-gray-500 text-sm mt-2">Loading your dashboard...</p>
    </div>
  </div>
);


function App() {
  // Demo user for screenshot capture  
  const [user, setUser] = useState<User | null>({
    id: 'demo-student-001',
    name: 'Demo Student', 
    email: 'student@demo.com',
    role: 'student' as const,
    picture: '',
    subscription_tier: 'pro' as SubscriptionTier
  });
  const [token, setToken] = useState<string | null>('demo-token-student');
  const [loading, setLoading] = useState(false);
  const [currentView, setCurrentView] = useState<'landing' | 'auth' | 'dashboard' | 'admin-cms' | 'flashcards' | 'subscription' | 'screenshots' | 'vocabulary' | 'reading-mastery' | 'ai-dashboard' | 'modern-ui' | 'huly'>('dashboard');
  const [loginForm, setLoginForm] = useState({ email: '', password: '', role: 'student' });
  const [authMode, setAuthMode] = useState<'sms' | 'demo' | 'email' | 'mocktest' | 'otp'>('otp');

  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  // Check for URL parameters for screenshot mode
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('mode') === 'screenshots') {
      setCurrentView('screenshots');
      setLoading(false);
      return;
    }
  }, []);

  // Check for existing auth on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('auth_token');
    const savedUser = localStorage.getItem('user_data');
    
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    
    // Always set loading to false immediately for demo mode
    setLoading(false);
    
    // Ensure we show landing page initially
    if (!savedToken) {
      setCurrentView('landing');
    }
  }, []);

  // Demo login function (offline mock)
  const handleDemoLogin = async (role: string) => {
    try {
      // Create mock user data based on role
      const mockUsers = {
        student: {
          id: 'demo-student-001',
          name: 'Demo Student',
          email: 'student@demo.com',
          role: 'student' as const,
          picture: '',
          target_nlu: 'NLSIU Bangalore',
          target_score: 85,
          subscription_tier: 'pro' as SubscriptionTier,
          study_streak: 15,
          total_tests: 23,
          avg_score: 76.5
        },
        admin: {
          id: 'demo-admin-001',
          name: 'Demo Administrator',
          email: 'admin@demo.com',
          role: 'admin' as const,
          picture: '',
          subscription_tier: 'ultra' as SubscriptionTier
        },
        educator: {
          id: 'demo-educator-001',
          name: 'Demo Educator',
          email: 'educator@demo.com',
          role: 'educator' as const,
          picture: '',
          subscription_tier: 'ultra' as SubscriptionTier
        },
        parent: {
          id: 'demo-parent-001',
          name: 'Demo Parent',
          email: 'parent@demo.com',
          role: 'parent' as const,
          picture: '',
          subscription_tier: 'pro' as SubscriptionTier
        },
        operation_manager: {
          id: 'demo-manager-001',
          name: 'Demo Manager',
          email: 'manager@demo.com',
          role: 'operation_manager' as const,
          picture: '',
          subscription_tier: 'ultra' as SubscriptionTier
        }
      };

      const userData = mockUsers[role as keyof typeof mockUsers];
      if (!userData) {
        alert('Invalid role selected');
        return;
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const mockToken = `demo-token-${role}-${Date.now()}`;
      
      setToken(mockToken);
      setUser(userData);
      localStorage.setItem('auth_token', mockToken);
      localStorage.setItem('user_data', JSON.stringify(userData));
      
      console.log(`Demo login successful for ${role}:`, userData);
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
              SOLO by Legalight
            </h1>
            <p style={{ 
              fontSize: '1.2rem', 
              opacity: 0.9,
              color: 'white',
              marginBottom: '10px',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontWeight: '600'
            }}>
              we can do hard things
            </p>
            <p style={{ 
              fontSize: '1rem', 
              opacity: 0.8,
              color: 'white',
              marginBottom: '10px',
              fontFamily: 'Plus Jakarta Sans, sans-serif'
            }}>
              AI-Powered Legal Education Platform
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
            SOLO by Legalight
          </h1>
          <p style={{ 
            fontSize: '1.2rem', 
            opacity: 0.9,
            color: 'white',
            marginBottom: '10px',
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontWeight: '600'
          }}>
            we can do hard things
          </p>
          <p style={{ 
            fontSize: '1rem', 
            opacity: 0.8,
            color: 'white',
            marginBottom: '30px',
            fontFamily: 'Plus Jakarta Sans, sans-serif'
          }}>
            AI-Powered Legal Education Platform
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
      
      {currentView === 'landing' && (
        <Suspense fallback={<AppLoader />}>
          <AppleStyleLanding 
            onGetStarted={() => setCurrentView('auth')}
          />
        </Suspense>
      )}

      {currentView === 'auth' && (
        <Suspense fallback={<AppLoader />}>
          <SoloOTPAuth 
            onSuccess={(userType, userData) => {
              // Create user object from OTP auth data
              const newUser: User = {
                id: Date.now().toString(),
                name: userData.name,
                email: userData.email || '',
                phone: userData.phone || '',
                role: userType as User['role'],
                subscription: {
                  tier: 'basic' as SubscriptionTier,
                  expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
                }
              };
              
              setUser(newUser);
              setToken('demo-token-' + Date.now());
              setCurrentView('dashboard');
              
              // Save to localStorage
              localStorage.setItem('auth_token', 'demo-token-' + Date.now());
              localStorage.setItem('user_data', JSON.stringify(newUser));
            }}
            onBack={() => setCurrentView('landing')}
          />
        </Suspense>
      )}

      {currentView === 'dashboard' && (
        <Suspense fallback={<AppLoader />}>
          {/* Render different dashboards based on user role */}
          {user.role === 'admin' ? (
            <SoloAdminDashboard 
              user={user}
              onLogout={handleLogout}
            />
          ) : user.role === 'operation_manager' ? (
            <SoloOperationManagerDashboard 
              user={user}
              onLogout={handleLogout}
            />
          ) : user.role === 'educator' ? (
            <SoloEducatorDashboard 
              user={user}
              onLogout={handleLogout}
            />
          ) : user.role === 'parent' ? (
            <SoloParentDashboard 
              user={user}
              onLogout={handleLogout}
            />
          ) : (
            <SoloStudentDashboard 
              user={user}
              onLogout={handleLogout}
            />
          )}
        </Suspense>
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

      {currentView === 'screenshots' && (
        <Suspense fallback={<AppLoader />}>
          <ScreenshotGenerator />
        </Suspense>
      )}

      {currentView === 'subscription' && user && (
        <Suspense fallback={<AppLoader />}>
          <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm">
              <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className="flex items-center text-gray-600 hover:text-gray-900"
                >
                  ← Back to Dashboard
                </button>
                <h1 className="text-2xl font-bold">Choose Your Plan</h1>
                <div></div>
              </div>
            </header>
            <SubscriptionPlans 
              currentTier={user.subscription_tier}
              onSelectPlan={(tier, billingCycle) => {
                console.log(`Selected ${tier} plan with ${billingCycle} billing`);
                // TODO: Implement payment integration
                alert(`Payment integration coming soon! Selected: ${tier} (${billingCycle})`);
              }}
            />
          </div>
        </Suspense>
      )}

      {currentView === 'vocabulary' && (
        <Suspense fallback={<AppLoader />}>
          <CLATVocabularyMastery />
        </Suspense>
      )}

      {currentView === 'reading-mastery' && (
        <Suspense fallback={<AppLoader />}>
          <CLATReadingMasteryComplete />
        </Suspense>
      )}

      {currentView === 'ai-dashboard' && (
        <Suspense fallback={<AppLoader />}>
          <CLATAIDashboard />
        </Suspense>
      )}

      {currentView === 'modern-ui' && (
        <Suspense fallback={<AppLoader />}>
          <SOLOModernUI />
        </Suspense>
      )}

      {currentView === 'huly' && (
        <Suspense fallback={<AppLoader />}>
          <HulyDesignSystem />
        </Suspense>
      )}
    </div>
  );
}

export default App;
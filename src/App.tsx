import React, { useState, useEffect, Suspense, lazy } from 'react';
import SMSAuth from './components/SMSAuth';
import { User } from './types';
import { SubscriptionTier } from './types/subscription';
import { RevolutionaryLoading } from './components/shared/RevolutionaryLoading';
import ErrorBoundary from './components/ErrorBoundary';
import { showSuccess, showError, showWarning } from './utils/notifications';
import { validateEmail, validatePassword, sanitizeString, loginRateLimiter } from './utils/validation';
import { secureStorage, validateJWTStructure, isTokenExpired } from './utils/secureStorage';
import { performanceMonitor, debounce } from './utils/performance';
import './styles/revolutionary-theme.css';
import './styles/revolutionary-components.css';
import './styles/mobile-responsive.css';

// Lazy load dashboards for better bundle splitting with performance tracking
const AdminCMS = lazy(() => {
  performanceMonitor.mark('admin-cms-load-start');
  return import('./components/AdminCMS').then(module => {
    performanceMonitor.mark('admin-cms-load-end');
    performanceMonitor.measure('admin-cms-load', 'admin-cms-load-start', 'admin-cms-load-end');
    return module;
  });
});

const CompleteAdminDashboard = lazy(() => {
  performanceMonitor.mark('admin-dashboard-load-start');
  return import('./components/CompleteAdminDashboard').then(module => {
    performanceMonitor.mark('admin-dashboard-load-end');
    performanceMonitor.measure('admin-dashboard-load', 'admin-dashboard-load-start', 'admin-dashboard-load-end');
    return module;
  });
});

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

// Testing Components
const RevolutionarySystemTests = lazy(() => import('./tests/RevolutionarySystemTests'));

// Revolutionary Loading component
const AppLoader = () => (
  <div className="min-h-screen dark-theme flex items-center justify-center">
    <RevolutionaryLoading message="Loading SOLO Platform..." />
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
  const [currentView, setCurrentView] = useState<'landing' | 'auth' | 'dashboard' | 'admin-cms' | 'flashcards' | 'subscription' | 'screenshots' | 'vocabulary' | 'reading-mastery' | 'ai-dashboard' | 'modern-ui' | 'huly' | 'testing'>('dashboard');
  const [loginForm, setLoginForm] = useState({ email: '', password: '', role: 'student' });
  const [authMode, setAuthMode] = useState<'sms' | 'demo' | 'email' | 'mocktest' | 'otp'>('otp');
  
  // Debounced form update for better performance
  const debouncedFormUpdate = debounce((updates: Partial<typeof loginForm>) => {
    setLoginForm(prev => ({ ...prev, ...updates }));
  }, 150);

  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  // Check for URL parameters for screenshot mode and testing
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('mode') === 'screenshots') {
      setCurrentView('screenshots');
      setLoading(false);
      return;
    }
    if (urlParams.get('mode') === 'testing') {
      setCurrentView('testing');
      setLoading(false);
      return;
    }
  }, []);

  // Check for existing auth on mount and handle marketing redirects
  useEffect(() => {
    performanceMonitor.mark('auth-check-start');
    
    // Handle marketing website redirects with URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const marketingToken = urlParams.get('token');
    const marketingUserData = urlParams.get('userData');
    
    if (marketingToken && marketingUserData) {
      try {
        // Validate token structure before storing
        if (!validateJWTStructure(marketingToken)) {
          console.error('Invalid token structure from marketing redirect');
          return;
        }
        
        // Check if token is expired
        if (isTokenExpired(marketingToken)) {
          console.error('Expired token from marketing redirect');
          showError('Session Expired', 'Please log in again');
          return;
        }
        
        // Store with secure storage (expires in 24 hours)
        secureStorage.setItem('auth_token', marketingToken, 24 * 60);
        secureStorage.setItem('user_data', marketingUserData, 24 * 60);
        
        // Also store in regular localStorage for backward compatibility
        localStorage.setItem('auth_token', marketingToken);
        localStorage.setItem('user_data', marketingUserData);
        
        setToken(marketingToken);
        setUser(JSON.parse(decodeURIComponent(marketingUserData)));
        
        // Clear URL parameters for security
        window.history.replaceState({}, document.title, window.location.pathname);
        setCurrentView('dashboard');
        setLoading(false);
        return;
      } catch (error) {
        console.error('Error processing marketing redirect:', error);
        showError('Authentication Error', 'Failed to process login. Please try again.');
      }
    }
    
    // Check for marketing naming convention and migrate
    const marketingStoredToken = localStorage.getItem('authToken');
    const marketingStoredUser = localStorage.getItem('userData');
    
    if (marketingStoredToken && marketingStoredUser && !localStorage.getItem('auth_token')) {
      try {
        // Migrate from marketing naming to frontend naming
        localStorage.setItem('auth_token', marketingStoredToken);
        localStorage.setItem('user_data', marketingStoredUser);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        setToken(marketingStoredToken);
        setUser(JSON.parse(marketingStoredUser));
        setCurrentView('dashboard');
        setLoading(false);
        return;
      } catch (error) {
        console.error('Error migrating marketing tokens:', error);
      }
    }
    
    // Check for existing frontend auth
    const savedToken = localStorage.getItem('auth_token');
    const savedUser = localStorage.getItem('user_data');
    
    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
        setCurrentView('dashboard');
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_data');
      }
    }
    
    // Always set loading to false immediately for demo mode
    setLoading(false);
    
    // Ensure we show landing page initially if no auth
    if (!savedToken && !marketingStoredToken && !marketingToken) {
      setCurrentView('landing');
    }
  }, []);

  // Demo login function (offline mock)
  const handleDemoLogin = async (role: string) => {
    setLoading(true);
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
        showError('Invalid role selected', 'Please select a valid user role');
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
      showSuccess('Demo Login Successful!', `Welcome ${userData.name} (${role})`);
    } catch (error) {
      console.error('Demo login error:', error);
      showError('Demo Login Failed', 'Please try again or contact support');
    } finally {
      setLoading(false);
    }
  };

  // Regular login function
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Sanitize inputs
    const email = sanitizeString(loginForm.email);
    const password = loginForm.password; // Don't sanitize password as it may contain special chars
    
    // Validate inputs
    const emailValidation = validateEmail(email);
    const passwordValidation = validatePassword(password);
    
    if (!emailValidation.isValid) {
      showError('Invalid Email', emailValidation.errors[0]);
      return;
    }
    
    if (!passwordValidation.isValid) {
      showError('Invalid Password', passwordValidation.errors[0]);
      return;
    }
    
    // Check rate limiting
    if (!loginRateLimiter.canAttempt(email)) {
      const waitTime = Math.ceil(loginRateLimiter.getTimeUntilNextAttempt(email) / 1000 / 60);
      showWarning('Too Many Attempts', `Please wait ${waitTime} minutes before trying again`);
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const data = await response.json();
      
      if (data.token && data.user) {
        // Validate token before storing
        if (!validateJWTStructure(data.token)) {
          showError('Invalid Token', 'Received invalid authentication token');
          return;
        }
        
        showSuccess('Login Successful!', `Welcome back, ${data.user.name}`);
        
        // Store with secure storage (expires in 24 hours)
        secureStorage.setItem('auth_token', data.token, 24 * 60);
        secureStorage.setItem('user_data', JSON.stringify(data.user), 24 * 60);
        
        // Also store in regular localStorage for backward compatibility
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('user_data', JSON.stringify(data.user));
        
        setToken(data.token);
        setUser(data.user);
      } else {
        showError('Login Failed', data.error || 'Please check your credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      showError('Connection Error', 'Unable to connect to server. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // SMS Authentication success handler
  const handleSMSSuccess = (newToken: string, newUser: User) => {
    // Validate token before storing
    if (!validateJWTStructure(newToken)) {
      showError('Invalid Token', 'Received invalid authentication token');
      return;
    }
    
    showSuccess(`Welcome ${newUser.name}!`, `Successfully logged in as ${newUser.role}`);
    
    // Store with secure storage (expires in 24 hours)
    secureStorage.setItem('auth_token', newToken, 24 * 60);
    secureStorage.setItem('user_data', JSON.stringify(newUser), 24 * 60);
    
    // Also store in regular localStorage for backward compatibility
    localStorage.setItem('auth_token', newToken);
    localStorage.setItem('user_data', JSON.stringify(newUser));
    
    setToken(newToken);
    setUser(newUser);
    setAuthMode('sms');
  };

  // Logout function
  const handleLogout = () => {
    // Clear secure storage
    secureStorage.removeItem('auth_token');
    secureStorage.removeItem('user_data');
    
    // Clear regular localStorage for backward compatibility
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    
    setUser(null);
    setToken(null);
    setCurrentView('dashboard');
    setAuthMode('sms'); // Reset to SMS auth
    
    showSuccess('Logged Out', 'You have been securely logged out');
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
        <div className="mobile-viewport-fix prevent-horizontal-scroll">
          <header className="responsive-header">
            <h1 className="responsive-title">
              SOLO by Legalight
            </h1>
            <p className="responsive-subtitle">
              we can do hard things
            </p>
            <p className="responsive-description">
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
      <div className="mobile-viewport-fix bg-gray-50 prevent-horizontal-scroll">
        <header className="responsive-header">
          <h1 className="responsive-title">
            SOLO by Legalight
          </h1>
          <p className="responsive-subtitle">
            we can do hard things
          </p>
          <p className="responsive-description" style={{ marginBottom: '1.5rem' }}>
            AI-Powered Legal Education Platform
          </p>
        </header>

        <div className="flex items-center justify-center min-h-[calc(100vh-200px)] safe-area-insets">
          <div className="responsive-login-card">
            <h2 className="responsive-text-2xl font-bold text-center text-gray-900 mb-6">
              Demo & Testing
            </h2>

            {/* Switch to SMS Auth */}
            <div className="mb-6 space-y-3">
              <button
                onClick={() => setAuthMode('sms')}
                className="responsive-button bg-green-600 hover:bg-green-700 text-white"
              >
                📱 Login with SMS (Recommended)
              </button>
              
              <button
                onClick={() => setAuthMode('mocktest')}
                className="responsive-button bg-purple-600 hover:bg-purple-700 text-white"
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
              <h3 className="responsive-text-lg font-semibold text-gray-700 text-center">Quick Demo Login</h3>
              <div className="responsive-demo-grid">
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
                    disabled={loading}
                    className={`responsive-button text-white ${color} disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Loading...
                      </div>
                    ) : (
                      label
                    )}
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
            <form onSubmit={handleLogin} className="responsive-form mt-6">
              <div>
                <label htmlFor="email" className="block responsive-text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  className="responsive-input border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block responsive-text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="responsive-input border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="responsive-button bg-blue-600 hover:bg-blue-700 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing In...
                  </div>
                ) : (
                  'Sign In'
                )}
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
    <ErrorBoundary>
      <div className="App dark-theme">
        
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
            <CompleteAdminDashboard 
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

      {currentView === 'testing' && (
        <Suspense fallback={<AppLoader />}>
          <RevolutionarySystemTests />
        </Suspense>
      )}
      </div>
    </ErrorBoundary>
  );
}

export default App;
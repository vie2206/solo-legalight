import React, { useState } from 'react';
import { User, Lock, Eye, EyeOff, Users, BookOpen, UserCheck, Settings, Briefcase } from 'lucide-react';
import { getAllDemoUsers, validateDemoLogin, DemoUser } from '../data/DemoUsers';

// 🎯 DEMO LOGIN SYSTEM
// Quick access demo accounts for CLAT platform showcase

interface DemoLoginProps {
  onLogin: (user: DemoUser) => void;
  onClose: () => void;
}

export const DemoLoginSystem: React.FC<DemoLoginProps> = ({ onLogin, onClose }) => {
  const [activeTab, setActiveTab] = useState<'quick' | 'manual'>('quick');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const demoUsers = getAllDemoUsers();

  const roleIcons = {
    student: BookOpen,
    parent: Users,
    educator: UserCheck,
    admin: Settings,
    manager: Briefcase
  };

  const roleColors = {
    student: 'from-blue-500 to-purple-600',
    parent: 'from-green-500 to-teal-600',
    educator: 'from-orange-500 to-red-600',
    admin: 'from-purple-500 to-pink-600',
    manager: 'from-gray-500 to-slate-600'
  };

  const handleQuickLogin = async (user: DemoUser) => {
    setIsLoading(true);
    setError('');

    // Simulate login delay for realism
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      console.log(`🎯 Demo Login: ${user.name} (${user.role})`);
      onLogin(user);
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate login delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const user = validateDemoLogin(username, password);
      if (user) {
        console.log(`🎯 Manual Login: ${user.name} (${user.role})`);
        onLogin(user);
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleDescription = (role: string) => {
    switch (role) {
      case 'student': return 'Access student dashboard, mock tests, and study materials';
      case 'parent': return 'Monitor child progress and communicate with educators';
      case 'educator': return 'Manage students, resolve doubts, and track performance';
      case 'admin': return 'Platform administration and content management';
      case 'manager': return 'Operations oversight and performance analytics';
      default: return 'Demo account access';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold mb-2">🎓 CLAT Platform Demo Access</h2>
              <p className="text-blue-100">
                Experience the revolutionary educational platform with pre-configured demo accounts
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setActiveTab('quick')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'quick'
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'text-blue-100 hover:bg-white/20'
              }`}
            >
              Quick Access
            </button>
            <button
              onClick={() => setActiveTab('manual')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'manual'
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'text-blue-100 hover:bg-white/20'
              }`}
            >
              Manual Login
            </button>
          </div>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === 'quick' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Choose Your Demo Role
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Click any card below to instantly access that user's dashboard
                </p>
              </div>

              {/* Group users by role */}
              {Object.entries(
                demoUsers.reduce((groups, user) => {
                  if (!groups[user.role]) groups[user.role] = [];
                  groups[user.role].push(user);
                  return groups;
                }, {} as Record<string, DemoUser[]>)
              ).map(([role, users]) => {
                const Icon = roleIcons[role as keyof typeof roleIcons];
                
                return (
                  <div key={role} className="space-y-3">
                    <h4 className="text-md font-semibold text-gray-900 dark:text-white capitalize flex items-center gap-2">
                      <Icon className="w-5 h-5" />
                      {role}s ({users.length})
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {users.map((user) => (
                        <button
                          key={user.id}
                          onClick={() => handleQuickLogin(user)}
                          disabled={isLoading}
                          className={`
                            relative p-4 rounded-xl text-left transition-all duration-200
                            bg-gradient-to-br ${roleColors[user.role as keyof typeof roleColors]}
                            text-white hover:scale-105 hover:shadow-lg
                            disabled:opacity-50 disabled:cursor-not-allowed
                            group
                          `}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <img
                              src={user.avatar}
                              alt={user.name}
                              className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
                            />
                            <div>
                              <p className="font-semibold text-white">{user.name}</p>
                              <p className="text-xs text-white/80 uppercase tracking-wide">
                                {user.credentials.loginCode}
                              </p>
                            </div>
                          </div>
                          
                          <p className="text-xs text-white/90 mb-3">
                            {getRoleDescription(user.role)}
                          </p>

                          {/* Sample stats for each role */}
                          {user.role === 'student' && user.sampleData && (
                            <div className="text-xs text-white/80 space-y-1">
                              <div>📊 Rank: #{user.sampleData.currentRank || 'N/A'}</div>
                              <div>🎯 Best Score: {user.sampleData.bestScore || 'N/A'}</div>
                            </div>
                          )}

                          {user.role === 'educator' && user.sampleData && (
                            <div className="text-xs text-white/80 space-y-1">
                              <div>👥 Students: {user.profile?.studentsAssigned || 'N/A'}</div>
                              <div>⭐ Rating: {user.profile?.rating || 'N/A'}/5</div>
                            </div>
                          )}

                          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                          
                          {isLoading && (
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-xl">
                              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'manual' && (
            <div className="max-w-md mx-auto">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Manual Login
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Enter credentials manually or use demo credentials
                </p>
              </div>

              <form onSubmit={handleManualLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Username or Email
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                                 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                 dark:bg-gray-700 dark:text-white"
                      placeholder="priya_clat2025 or demo email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                                 focus:ring-2 focus:ring-blue-500 focus:border-transparent
                                 dark:bg-gray-700 dark:text-white"
                      placeholder="demo123"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg
                           hover:from-blue-700 hover:to-purple-700 transition-all duration-200
                           disabled:opacity-50 disabled:cursor-not-allowed
                           font-medium flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    'Login to Demo'
                  )}
                </button>
              </form>

              {/* Demo credentials helper */}
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Sample Credentials:</h4>
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <div>Student: <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">priya_clat2025</code></div>
                  <div>Educator: <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">dr_rajesh_kumar</code></div>
                  <div>Admin: <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">aditi_admin</code></div>
                  <div>Password: <code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">demo123</code></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DemoLoginSystem;
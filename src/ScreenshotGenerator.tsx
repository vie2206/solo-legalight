import React, { useState, useRef } from 'react';
import SoloStudentDashboard from './components/SoloStudentDashboard';
import SoloAdminDashboard from './components/SoloAdminDashboard';
import SoloParentDashboard from './components/SoloParentDashboard';
import SoloEducatorDashboard from './components/SoloEducatorDashboard';
import { User } from './types';
import { SubscriptionTier } from './types/subscription';

const ScreenshotGenerator: React.FC = () => {
  const [currentView, setCurrentView] = useState<'menu' | 'student' | 'admin' | 'parent' | 'educator'>('menu');
  const [isCapturing, setIsCapturing] = useState(false);
  const [captureCount, setCaptureCount] = useState(0);
  const dashboardRef = useRef<HTMLDivElement>(null);

  const mockUsers = {
    student: {
      id: 'demo-student-001',
      name: 'Arjun Sharma',
      email: 'arjun@demo.com',
      role: 'student' as const,
      picture: '',
      subscription_tier: 'pro' as SubscriptionTier
    },
    admin: {
      id: 'demo-admin-001',
      name: 'Admin User',
      email: 'admin@demo.com',
      role: 'admin' as const,
      picture: '',
      subscription_tier: 'ultra' as SubscriptionTier
    },
    parent: {
      id: 'demo-parent-001',
      name: 'Priya Sharma',
      email: 'parent@demo.com',
      role: 'parent' as const,
      picture: '',
      subscription_tier: 'pro' as SubscriptionTier
    },
    educator: {
      id: 'demo-educator-001',
      name: 'Dr. Rajesh Kumar',
      email: 'educator@demo.com',
      role: 'educator' as const,
      picture: '',
      subscription_tier: 'ultra' as SubscriptionTier
    }
  };

  const handleLogout = () => {
    setCurrentView('menu');
  };

  // Browser API Screenshot Function
  const captureScreenshot = async (dashboardType: string) => {
    if (!dashboardRef.current) return;
    
    try {
      setIsCapturing(true);
      
      // Wait for dashboard to fully load
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Try using html2canvas if available, otherwise use browser's native screenshot
      if ((window as any).html2canvas) {
        const canvas = await (window as any).html2canvas(dashboardRef.current, {
          allowTaint: true,
          useCORS: true,
          scale: 1,
          width: dashboardRef.current.scrollWidth,
          height: dashboardRef.current.scrollHeight,
          backgroundColor: '#ffffff'
        });
        
        // Convert to blob and download
        canvas.toBlob((blob: Blob) => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${dashboardType}-dashboard-${Date.now()}.png`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          
          setCaptureCount(prev => prev + 1);
        }, 'image/png', 0.9);
      } else {
        // Fallback: Prompt user to use browser screenshot
        alert('Please use your browser\'s screenshot feature (F12 → Console → Screenshot) or install html2canvas library');
      }
    } catch (error) {
      console.error('Screenshot capture failed:', error);
      alert('Screenshot failed. Please use Chrome DevTools (F12 → Console → Screenshot)');
    } finally {
      setIsCapturing(false);
    }
  };

  // Auto-capture all dashboards
  const captureAllDashboards = async () => {
    const dashboards = ['student', 'admin', 'parent', 'educator'];
    
    for (const dashboard of dashboards) {
      setCurrentView(dashboard as any);
      await new Promise(resolve => setTimeout(resolve, 3000)); // Wait for dashboard to load
      await captureScreenshot(dashboard);
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait between captures
    }
    
    setCurrentView('menu');
    alert(`Successfully captured ${dashboards.length} dashboard screenshots!`);
  };

  if (currentView === 'menu') {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4">SOLO Dashboard Screenshot Generator</h1>
          <p className="text-center text-gray-600 mb-8">Enhanced with Browser API for automatic screenshot capture</p>
          
          {/* Screenshot Stats */}
          <div className="bg-white rounded-lg p-4 mb-8 text-center shadow-md">
            <h3 className="text-lg font-semibold mb-2">Capture Statistics</h3>
            <p className="text-gray-600">Screenshots Captured: <span className="font-bold text-blue-600">{captureCount}</span></p>
          </div>

          {/* Auto Capture Section */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 mb-8 text-white">
            <h2 className="text-2xl font-bold mb-4">🚀 Automated Screenshot Capture</h2>
            <p className="mb-4">Automatically capture all 4 dashboards with browser API</p>
            <button
              onClick={captureAllDashboards}
              disabled={isCapturing}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 disabled:opacity-50"
            >
              {isCapturing ? 'Capturing...' : '📸 Capture All Dashboards'}
            </button>
          </div>

          {/* Manual Dashboard Access */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-xl font-bold mb-4 text-center">Manual Dashboard Access</h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setCurrentView('student')}
                className="p-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
              >
                <div className="text-2xl mb-2">👨‍🎓</div>
                <div className="font-semibold">Student Dashboard</div>
                <div className="text-sm opacity-90">View student interface</div>
              </button>
              <button
                onClick={() => setCurrentView('admin')}
                className="p-6 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
              >
                <div className="text-2xl mb-2">⚙️</div>
                <div className="font-semibold">Admin Dashboard</div>
                <div className="text-sm opacity-90">View admin interface</div>
              </button>
              <button
                onClick={() => setCurrentView('parent')}
                className="p-6 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all"
              >
                <div className="text-2xl mb-2">👨‍👩‍👧‍👦</div>
                <div className="font-semibold">Parent Dashboard</div>
                <div className="text-sm opacity-90">View parent interface</div>
              </button>
              <button
                onClick={() => setCurrentView('educator')}
                className="p-6 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
              >
                <div className="text-2xl mb-2">👩‍🏫</div>
                <div className="font-semibold">Educator Dashboard</div>
                <div className="text-sm opacity-90">View educator interface</div>
              </button>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">📋 Screenshot Instructions</h3>
            <ul className="text-yellow-700 space-y-1">
              <li>• Use "Capture All Dashboards" for automatic screenshots</li>
              <li>• Or manually navigate to each dashboard and use browser tools</li>
              <li>• For Chrome: F12 → Console → Ctrl+Shift+P → "Screenshot"</li>
              <li>• For best quality: Use "Capture full size screenshot"</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // Render the selected dashboard with screenshot controls
  const renderDashboard = () => {
    let DashboardComponent;
    let user;
    let dashboardName;

    switch (currentView) {
      case 'student':
        DashboardComponent = SoloStudentDashboard;
        user = mockUsers.student;
        dashboardName = 'Student';
        break;
      case 'admin':
        DashboardComponent = SoloAdminDashboard;
        user = mockUsers.admin;
        dashboardName = 'Admin';
        break;
      case 'parent':
        DashboardComponent = SoloParentDashboard;
        user = mockUsers.parent;
        dashboardName = 'Parent';
        break;
      case 'educator':
        DashboardComponent = SoloEducatorDashboard;
        user = mockUsers.educator;
        dashboardName = 'Educator';
        break;
      default:
        return null;
    }

    return (
      <div className="min-h-screen">
        {/* Screenshot Control Bar */}
        <div className="sticky top-0 z-50 bg-gradient-to-r from-gray-800 to-gray-900 text-white p-3 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLogout}
                className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded text-sm"
              >
                ← Back to Menu
              </button>
              <h2 className="font-semibold">{dashboardName} Dashboard</h2>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => captureScreenshot(currentView)}
                disabled={isCapturing}
                className="bg-blue-600 hover:bg-blue-500 px-4 py-1 rounded text-sm disabled:opacity-50"
              >
                {isCapturing ? 'Capturing...' : '📸 Capture Screenshot'}
              </button>
              <span className="text-sm text-gray-300">
                Use F12 → Console → Screenshot for Chrome DevTools
              </span>
            </div>
          </div>
        </div>
        
        {/* Dashboard Content */}
        <div ref={dashboardRef} className="dashboard-content">
          <DashboardComponent user={user} onLogout={handleLogout} />
        </div>
      </div>
    );
  };

  return renderDashboard();
};

export default ScreenshotGenerator;
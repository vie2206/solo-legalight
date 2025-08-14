import React, { useState, useEffect, useContext, createContext, useCallback } from 'react';
import { User } from '../../types';

// 🔄 REAL-TIME UPDATES SYSTEM
// Revolutionary live data synchronization for educational platform

interface RealTimeData {
  studyProgress: StudyProgressUpdate[];
  mockTestResults: MockTestUpdate[];
  rankingUpdates: RankingUpdate[];
  systemAlerts: SystemAlert[];
  liveStats: LiveStats;
  onlineUsers: OnlineUser[];
}

interface StudyProgressUpdate {
  userId: string;
  subject: string;
  progress: number;
  timestamp: Date;
  streak: number;
  pointsEarned: number;
}

interface MockTestUpdate {
  testId: string;
  userId: string;
  score: number;
  rank: number;
  totalParticipants: number;
  improvement: number;
  timestamp: Date;
}

interface RankingUpdate {
  userId: string;
  newRank: number;
  previousRank: number;
  category: 'weekly' | 'monthly' | 'overall';
  timestamp: Date;
}

interface SystemAlert {
  id: string;
  type: 'success' | 'warning' | 'info' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  userId?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

interface LiveStats {
  totalStudents: number;
  activeStudents: number;
  testsInProgress: number;
  avgScoreImprovement: number;
  dailyGoalCompletions: number;
}

interface OnlineUser {
  id: string;
  name: string;
  role: string;
  status: 'studying' | 'taking_test' | 'idle' | 'away';
  lastActivity: Date;
}

interface RealTimeContextType {
  data: RealTimeData;
  isConnected: boolean;
  connectionStatus: 'connecting' | 'connected' | 'disconnected' | 'error';
  subscribe: (eventType: string, callback: (data: any) => void) => void;
  unsubscribe: (eventType: string, callback: (data: any) => void) => void;
  emit: (eventType: string, data: any) => void;
}

// Real-Time Context
const RealTimeContext = createContext<RealTimeContextType>({
  data: {
    studyProgress: [],
    mockTestResults: [],
    rankingUpdates: [],
    systemAlerts: [],
    liveStats: {
      totalStudents: 0,
      activeStudents: 0,
      testsInProgress: 0,
      avgScoreImprovement: 0,
      dailyGoalCompletions: 0
    },
    onlineUsers: []
  },
  isConnected: false,
  connectionStatus: 'disconnected',
  subscribe: () => {},
  unsubscribe: () => {},
  emit: () => {}
});

// 🚀 Real-Time Provider Component
interface RealTimeProviderProps {
  children: React.ReactNode;
  user: User;
  wsUrl?: string;
}

export const RealTimeProvider: React.FC<RealTimeProviderProps> = ({
  children,
  user,
  wsUrl = process.env.REACT_APP_WS_URL || 'ws://localhost:8000/ws'
}) => {
  const [data, setData] = useState<RealTimeData>({
    studyProgress: [],
    mockTestResults: [],
    rankingUpdates: [],
    systemAlerts: [],
    liveStats: {
      totalStudents: 12547,
      activeStudents: 3421,
      testsInProgress: 89,
      avgScoreImprovement: 23.5,
      dailyGoalCompletions: 156
    },
    onlineUsers: []
  });

  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected' | 'error'>('disconnected');
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const [subscriptions, setSubscriptions] = useState<Map<string, Set<(data: any) => void>>>(new Map());

  // WebSocket Connection Management
  const connectWebSocket = useCallback(() => {
    try {
      setConnectionStatus('connecting');
      
      // For demo purposes, simulate WebSocket with mock data
      const mockWs = {
        readyState: 1, // OPEN
        close: () => {},
        send: (data: string) => {
          console.log('Mock WS Send:', data);
        }
      } as WebSocket;

      setWs(mockWs);
      setIsConnected(true);
      setConnectionStatus('connected');
      setReconnectAttempts(0);

      // Simulate real-time data updates
      const updateInterval = setInterval(() => {
        // Simulate study progress updates
        const studyUpdate: StudyProgressUpdate = {
          userId: user.id,
          subject: ['Legal Reasoning', 'English', 'GK', 'Math'][Math.floor(Math.random() * 4)],
          progress: Math.floor(Math.random() * 100),
          timestamp: new Date(),
          streak: Math.floor(Math.random() * 30) + 1,
          pointsEarned: Math.floor(Math.random() * 50) + 10
        };

        // Simulate live stats fluctuation
        const statsUpdate: LiveStats = {
          totalStudents: 12547 + Math.floor(Math.random() * 100),
          activeStudents: 3421 + Math.floor(Math.random() * 200) - 100,
          testsInProgress: 89 + Math.floor(Math.random() * 20) - 10,
          avgScoreImprovement: 23.5 + (Math.random() * 2 - 1),
          dailyGoalCompletions: 156 + Math.floor(Math.random() * 10)
        };

        setData(prev => ({
          ...prev,
          studyProgress: [studyUpdate, ...prev.studyProgress.slice(0, 9)],
          liveStats: statsUpdate
        }));

        // Trigger subscriptions
        subscriptions.get('study_progress')?.forEach(callback => callback(studyUpdate));
        subscriptions.get('live_stats')?.forEach(callback => callback(statsUpdate));

      }, 5000); // Update every 5 seconds

      // Cleanup function
      return () => {
        clearInterval(updateInterval);
      };

    } catch (error) {
      console.error('WebSocket connection error:', error);
      setConnectionStatus('error');
      setIsConnected(false);
      
      // Retry connection with exponential backoff
      const retryDelay = Math.min(1000 * Math.pow(2, reconnectAttempts), 30000);
      setTimeout(() => {
        setReconnectAttempts(prev => prev + 1);
        connectWebSocket();
      }, retryDelay);
    }
  }, [user.id, reconnectAttempts, subscriptions]);

  // Initialize WebSocket connection
  useEffect(() => {
    connectWebSocket();
    
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [connectWebSocket]);

  // Subscription management
  const subscribe = useCallback((eventType: string, callback: (data: any) => void) => {
    setSubscriptions(prev => {
      const newSubs = new Map(prev);
      if (!newSubs.has(eventType)) {
        newSubs.set(eventType, new Set());
      }
      newSubs.get(eventType)!.add(callback);
      return newSubs;
    });
  }, []);

  const unsubscribe = useCallback((eventType: string, callback: (data: any) => void) => {
    setSubscriptions(prev => {
      const newSubs = new Map(prev);
      const eventSubs = newSubs.get(eventType);
      if (eventSubs) {
        eventSubs.delete(callback);
        if (eventSubs.size === 0) {
          newSubs.delete(eventType);
        }
      }
      return newSubs;
    });
  }, []);

  // Emit events to server
  const emit = useCallback((eventType: string, eventData: any) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: eventType,
        data: eventData,
        userId: user.id,
        timestamp: new Date().toISOString()
      }));
    }
  }, [ws, user.id]);

  const contextValue: RealTimeContextType = {
    data,
    isConnected,
    connectionStatus,
    subscribe,
    unsubscribe,
    emit
  };

  return (
    <RealTimeContext.Provider value={contextValue}>
      {children}
    </RealTimeContext.Provider>
  );
};

// 🎯 Hook for using real-time data
export const useRealTime = () => {
  const context = useContext(RealTimeContext);
  if (!context) {
    throw new Error('useRealTime must be used within a RealTimeProvider');
  }
  return context;
};

// 📊 Live Stats Display Component
export const LiveStatsDisplay: React.FC = () => {
  const { data, isConnected, connectionStatus } = useRealTime();
  
  return (
    <div className="live-stats-container">
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
        <span className="text-sm text-gray-600">
          {connectionStatus.charAt(0).toUpperCase() + connectionStatus.slice(1)}
        </span>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="stat-card">
          <div className="text-2xl font-bold text-blue-600">{data.liveStats.totalStudents.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Total Students</div>
        </div>
        
        <div className="stat-card">
          <div className="text-2xl font-bold text-green-600">{data.liveStats.activeStudents.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Active Now</div>
        </div>
        
        <div className="stat-card">
          <div className="text-2xl font-bold text-purple-600">{data.liveStats.testsInProgress}</div>
          <div className="text-sm text-gray-600">Tests in Progress</div>
        </div>
        
        <div className="stat-card">
          <div className="text-2xl font-bold text-orange-600">{data.liveStats.avgScoreImprovement.toFixed(1)}%</div>
          <div className="text-sm text-gray-600">Avg Improvement</div>
        </div>
        
        <div className="stat-card">
          <div className="text-2xl font-bold text-indigo-600">{data.liveStats.dailyGoalCompletions}</div>
          <div className="text-sm text-gray-600">Goals Completed</div>
        </div>
      </div>
    </div>
  );
};

// 🎯 Real-Time Progress Tracker
export const RealTimeProgressTracker: React.FC = () => {
  const { data, subscribe, unsubscribe } = useRealTime();
  const [recentUpdates, setRecentUpdates] = useState<StudyProgressUpdate[]>([]);

  useEffect(() => {
    const handleProgressUpdate = (update: StudyProgressUpdate) => {
      setRecentUpdates(prev => [update, ...prev.slice(0, 4)]);
    };

    subscribe('study_progress', handleProgressUpdate);
    
    return () => {
      unsubscribe('study_progress', handleProgressUpdate);
    };
  }, [subscribe, unsubscribe]);

  return (
    <div className="real-time-progress">
      <h3 className="text-lg font-semibold mb-4">📈 Live Progress Updates</h3>
      
      <div className="space-y-3">
        {recentUpdates.map((update, index) => (
          <div key={index} className="progress-update-card">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{update.subject}</div>
                <div className="text-sm text-gray-600">
                  {update.pointsEarned} points earned • {update.streak} day streak
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-green-600">{update.progress}%</div>
                <div className="text-xs text-gray-500">
                  {new Date(update.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {recentUpdates.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          📊 Waiting for live updates...
        </div>
      )}
    </div>
  );
};

// 🎮 Mock Test Live Updates
export const MockTestLiveUpdates: React.FC = () => {
  const { data, subscribe, unsubscribe } = useRealTime();
  const [liveTests, setLiveTests] = useState<MockTestUpdate[]>([]);

  useEffect(() => {
    const handleTestUpdate = (update: MockTestUpdate) => {
      setLiveTests(prev => [update, ...prev.slice(0, 2)]);
    };

    subscribe('mock_test_results', handleTestUpdate);
    
    return () => {
      unsubscribe('mock_test_results', handleTestUpdate);
    };
  }, [subscribe, unsubscribe]);

  return (
    <div className="mock-test-live">
      <h3 className="text-lg font-semibold mb-4">🏆 Live Test Results</h3>
      
      {liveTests.map((test, index) => (
        <div key={index} className="test-update-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Mock Test #{test.testId}</div>
              <div className="text-sm text-gray-600">
                Rank: {test.rank}/{test.totalParticipants}
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold">{test.score}%</div>
              <div className={`text-sm ${test.improvement > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {test.improvement > 0 ? '+' : ''}{test.improvement}% change
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default {
  RealTimeProvider,
  useRealTime,
  LiveStatsDisplay,
  RealTimeProgressTracker,
  MockTestLiveUpdates
};
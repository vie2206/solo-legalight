import React, { useState, useEffect } from 'react';
import { 
  ChartBarIcon, 
  ClockIcon, 
  ArrowTrendingUpIcon, 
  ArrowTrendingDownIcon,
  AcademicCapIcon,
  CalendarDaysIcon,
  EyeIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

// Types
interface DeckStats {
  deck_id: string;
  deck_name: string;
  total_cards: number;
  new_cards: number;
  learning_cards: number;
  review_cards: number;
  due_cards: number;
  cards_studied_today: number;
  average_ease: number;
  retention_rate: number;
}

interface StudySession {
  id: string;
  deck_id: string;
  deck_name: string;
  started_at: string;
  ended_at: string;
  duration_seconds: number;
  cards_studied: number;
  new_cards: number;
  learning_cards: number;
  review_cards: number;
  correct_answers: number;
  incorrect_answers: number;
  average_ease: number;
}

interface LearningAnalytics {
  date: string;
  cards_studied: number;
  time_studied: number;
  new_cards_learned: number;
  reviews_completed: number;
  accuracy_rate: number;
  retention_rate: number;
  cards_per_minute: number;
}

interface RetentionData {
  period_days: number;
  total_reviews: number;
  successful_reviews: number;
  retention_rate: number;
}

interface PredictedWorkload {
  date: string;
  predicted_reviews: number;
  predicted_new_cards: number;
  total_workload: number;
}

interface AnalyticsDashboardProps {
  userId: string;
  selectedDeckId?: string;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ userId, selectedDeckId }) => {
  const [deckStats, setDeckStats] = useState<DeckStats[]>([]);
  const [recentSessions, setRecentSessions] = useState<StudySession[]>([]);
  const [learningAnalytics, setLearningAnalytics] = useState<LearningAnalytics[]>([]);
  const [retentionData, setRetentionData] = useState<RetentionData[]>([]);
  const [predictedWorkload, setPredictedWorkload] = useState<PredictedWorkload[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [selectedTab, setSelectedTab] = useState<'overview' | 'retention' | 'workload' | 'sessions'>('overview');

  const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:8000';

  useEffect(() => {
    loadAnalyticsData();
  }, [userId, selectedDeckId, selectedPeriod]);

  const loadAnalyticsData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('auth_token');
      const deckParam = selectedDeckId ? `?deck_id=${selectedDeckId}` : '';
      const periodParam = selectedDeckId ? `&period=${selectedPeriod}` : `?period=${selectedPeriod}`;

      // Load all analytics data in parallel
      const [
        deckStatsRes,
        sessionsRes,
        analyticsRes,
        retentionRes,
        workloadRes
      ] = await Promise.all([
        fetch(`${API_BASE}/api/flashcards/analytics/deck-stats${deckParam}`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${API_BASE}/api/flashcards/analytics/sessions${deckParam}${periodParam}`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${API_BASE}/api/flashcards/analytics/learning${deckParam}${periodParam}`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${API_BASE}/api/flashcards/analytics/retention${deckParam}${periodParam}`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${API_BASE}/api/flashcards/analytics/workload${deckParam}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      const [deckStatsData, sessionsData, analyticsData, retentionDataRes, workloadData] = await Promise.all([
        deckStatsRes.json(),
        sessionsRes.json(),
        analyticsRes.json(),
        retentionRes.json(),
        workloadRes.json()
      ]);

      setDeckStats(deckStatsData);
      setRecentSessions(sessionsData);
      setLearningAnalytics(analyticsData);
      setRetentionData(retentionDataRes);
      setPredictedWorkload(workloadData);
    } catch (error) {
      console.error('Failed to load analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getTrendIcon = (current: number, previous: number) => {
    if (current > previous) {
      return <ArrowTrendingUpIcon className="h-4 w-4 text-green-500" />;
    } else if (current < previous) {
      return <ArrowTrendingDownIcon className="h-4 w-4 text-red-500" />;
    }
    return null;
  };

  // Calculate summary statistics
  const totalCardsStudied = learningAnalytics.reduce((sum, day) => sum + day.cards_studied, 0);
  const totalTimeStudied = learningAnalytics.reduce((sum, day) => sum + day.time_studied, 0);
  const averageAccuracy = learningAnalytics.length > 0 
    ? learningAnalytics.reduce((sum, day) => sum + day.accuracy_rate, 0) / learningAnalytics.length 
    : 0;
  const averageRetention = learningAnalytics.length > 0
    ? learningAnalytics.reduce((sum, day) => sum + day.retention_rate, 0) / learningAnalytics.length
    : 0;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <ChartBarIcon className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">Analytics Dashboard</h2>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Period Selector */}
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>

          <button
            onClick={loadAnalyticsData}
            className="p-2 hover:bg-gray-100 rounded-lg"
            title="Refresh"
          >
            <ArrowPathIcon className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8 px-6">
          {[
            { id: 'overview', label: 'Overview', icon: ChartBarIcon },
            { id: 'retention', label: 'Retention', icon: ArrowTrendingUpIcon },
            { id: 'workload', label: 'Workload', icon: CalendarDaysIcon },
            { id: 'sessions', label: 'Sessions', icon: ClockIcon }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                selectedTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {selectedTab === 'overview' && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-600">Cards Studied</p>
                    <p className="text-2xl font-bold text-blue-900">{totalCardsStudied}</p>
                  </div>
                  <AcademicCapIcon className="h-8 w-8 text-blue-600" />
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-600">Time Studied</p>
                    <p className="text-2xl font-bold text-green-900">{formatDuration(totalTimeStudied)}</p>
                  </div>
                  <ClockIcon className="h-8 w-8 text-green-600" />
                </div>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-600">Accuracy</p>
                    <p className="text-2xl font-bold text-purple-900">{averageAccuracy.toFixed(1)}%</p>
                  </div>
                  <ArrowTrendingUpIcon className="h-8 w-8 text-purple-600" />
                </div>
              </div>

              <div className="bg-orange-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-600">Retention</p>
                    <p className="text-2xl font-bold text-orange-900">{averageRetention.toFixed(1)}%</p>
                  </div>
                  <EyeIcon className="h-8 w-8 text-orange-600" />
                </div>
              </div>
            </div>

            {/* Deck Statistics */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Deck Statistics</h3>
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deck</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Cards</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Due</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Studied Today</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Retention</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Avg Ease</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {deckStats.map((deck) => (
                      <tr key={deck.deck_id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {deck.deck_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {deck.total_cards}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            deck.due_cards > 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                          }`}>
                            {deck.due_cards}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {deck.cards_studied_today}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {deck.retention_rate.toFixed(1)}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {deck.average_ease.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Daily Progress Chart */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Progress</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-7 gap-2">
                  {learningAnalytics.slice(-7).map((day, index) => (
                    <div key={day.date} className="text-center">
                      <div className="text-xs text-gray-500 mb-2">
                        {formatDate(day.date)}
                      </div>
                      <div 
                        className="bg-blue-500 rounded"
                        style={{ 
                          height: `${Math.max(4, (day.cards_studied / Math.max(...learningAnalytics.map(d => d.cards_studied))) * 80)}px`,
                          width: '20px',
                          margin: '0 auto'
                        }}
                      />
                      <div className="text-xs text-gray-700 mt-1">
                        {day.cards_studied}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'retention' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Retention Analysis</h3>
            
            {retentionData.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {retentionData.map((period) => (
                  <div key={period.period_days} className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-lg font-medium text-gray-900 mb-2">
                      {period.period_days} Days
                    </h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Total Reviews:</span>
                        <span className="text-sm font-medium">{period.total_reviews}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Successful:</span>
                        <span className="text-sm font-medium">{period.successful_reviews}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Retention Rate:</span>
                        <span className={`text-sm font-medium ${
                          period.retention_rate >= 85 ? 'text-green-600' :
                          period.retention_rate >= 75 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {period.retention_rate.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    
                    {/* Retention bar */}
                    <div className="mt-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            period.retention_rate >= 85 ? 'bg-green-500' :
                            period.retention_rate >= 75 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${period.retention_rate}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No retention data available for this period.</p>
              </div>
            )}
          </div>
        )}

        {selectedTab === 'workload' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Predicted Workload</h3>
            
            {predictedWorkload.length > 0 ? (
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reviews</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">New Cards</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Workload</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {predictedWorkload.map((day) => (
                      <tr key={day.date}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {formatDate(day.date)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {day.predicted_reviews}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {day.predicted_new_cards}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            day.total_workload > 50 ? 'bg-red-100 text-red-800' :
                            day.total_workload > 25 ? 'bg-yellow-100 text-yellow-800' :
                            'bg-green-100 text-green-800'
                          }`}>
                            {day.total_workload}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No workload data available.</p>
              </div>
            )}
          </div>
        )}

        {selectedTab === 'sessions' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Study Sessions</h3>
            
            {recentSessions.length > 0 ? (
              <div className="space-y-4">
                {recentSessions.map((session) => (
                  <div key={session.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{session.deck_name}</h4>
                      <span className="text-sm text-gray-500">
                        {new Date(session.started_at).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Duration:</span>
                        <div className="font-medium">{formatDuration(session.duration_seconds)}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Cards:</span>
                        <div className="font-medium">{session.cards_studied}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Accuracy:</span>
                        <div className="font-medium">
                          {session.cards_studied > 0 
                            ? ((session.correct_answers / session.cards_studied) * 100).toFixed(1)
                            : 0}%
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">New:</span>
                        <div className="font-medium text-blue-600">{session.new_cards}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Reviews:</span>
                        <div className="font-medium text-green-600">{session.review_cards}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No study sessions found for this period.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
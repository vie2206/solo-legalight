import React, { useState, useEffect } from 'react'

interface DashboardStats {
  mockTestsTaken: number
  averageScore: number
  bestScore: number
  currentStreak: number
  improvement: number
}

interface MockTestSubmission {
  testName: string
  score: string
  attempted: string
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    mockTestsTaken: 0,
    averageScore: 0,
    bestScore: 0,
    currentStreak: 0,
    improvement: 0
  })
  const [newTest, setNewTest] = useState<MockTestSubmission>({
    testName: '',
    score: '',
    attempted: '120'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      const response = await fetch('http://localhost:8000/api/analytics/dashboard', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch stats: ${response.status}`)
      }

      const data = await response.json()
      setStats(data)
    } catch (err) {
      console.error('Error fetching stats:', err)
      setError('Failed to load analytics. Using demo data.')
      
      setStats({
        mockTestsTaken: 5,
        averageScore: 67,
        bestScore: 89,
        currentStreak: 3,
        improvement: 12
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  const handleSubmitTest = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTest.testName || !newTest.score) return
    
    setIsSubmitting(true)
    setError(null)
    
    try {
      const mockTestData = {
        score: parseInt(newTest.score),
        total_questions: parseInt(newTest.attempted),
        time_taken: 7200,
        accuracy_percentage: Math.round((parseInt(newTest.score) / parseInt(newTest.attempted)) * 100),
        section_scores: {
          english: Math.round(parseInt(newTest.score) * 0.2),
          current_affairs: Math.round(parseInt(newTest.score) * 0.25),
          legal_reasoning: Math.round(parseInt(newTest.score) * 0.3),
          logical_reasoning: Math.round(parseInt(newTest.score) * 0.15),
          quantitative: Math.round(parseInt(newTest.score) * 0.1)
        },
        answers: []
      }

      const response = await fetch('http://localhost:8000/api/mock-tests/1/submit', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mockTestData)
      })

      if (!response.ok) {
        throw new Error(`Failed to submit test: ${response.status}`)
      }

      await fetchStats()
      setNewTest({ testName: '', score: '', attempted: '120' })
      alert('🎉 Mock test submitted successfully!')
      
    } catch (err) {
      console.error('Error submitting test:', err)
      setError('Failed to submit test. Please try again.')
      alert('⚠️ Submission failed - backend connection issue')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
        <div style={{ color: 'white', fontSize: '1.5rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>⏳</div>
          Loading your analytics...
        </div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          marginBottom: '10px',
          color: 'white',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}>
          📊 Your Performance Dashboard
        </h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.9, color: 'white' }}>
          Track your progress, analyze performance, and level up your CLAT preparation
        </p>
        
        <div style={{ 
          marginTop: '10px', 
          fontSize: '0.9rem', 
          color: error ? '#ff6b6b' : '#51cf66',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5px'
        }}>
          <span>{error ? '⚠️' : '✅'}</span>
          {error ? 'Demo Mode (Backend Offline)' : 'Live Data (Backend Connected)'}
        </div>
      </div>

      {error && (
        <div style={{
          background: 'rgba(255, 107, 107, 0.1)',
          border: '2px solid #ff6b6b',
          borderRadius: '15px',
          padding: '15px',
          textAlign: 'center',
          marginBottom: '20px',
          color: 'white'
        }}>
          <span style={{ fontSize: '1rem' }}>⚠️ {error}</span>
        </div>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <StatCard 
          title="Mock Tests Taken"
          value={stats.mockTestsTaken}
          icon="📝"
          color="linear-gradient(135deg, #667eea, #764ba2)"
        />
        <StatCard 
          title="Average Score"
          value={stats.averageScore}
          suffix="/120"
          icon="📊"
          color="linear-gradient(135deg, #4299e1, #3182ce)"
        />
        <StatCard 
          title="Best Score"
          value={stats.bestScore}
          suffix="/120"
          icon="🏆"
          color="linear-gradient(135deg, #48bb78, #38a169)"
        />
        <StatCard 
          title="Current Streak"
          value={stats.currentStreak}
          suffix=" days"
          icon="🔥"
          color="linear-gradient(135deg, #ed8936, #dd6b20)"
        />
      </div>

      {stats.improvement > 0 && (
        <div style={{
          background: 'rgba(72, 187, 120, 0.1)',
          border: '2px solid #48bb78',
          borderRadius: '15px',
          padding: '15px',
          textAlign: 'center',
          marginBottom: '30px',
          color: 'white'
        }}>
          <span style={{ fontSize: '1.2rem' }}>
            📈 <strong>+{stats.improvement} points improvement</strong> from last test! Keep it up! 🚀
          </span>
        </div>
      )}

      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '25px',
        borderRadius: '20px',
        marginBottom: '30px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
      }}>
        <h3 style={{ color: '#333', marginBottom: '20px' }}>📝 Submit New Mock Test</h3>
        <form onSubmit={handleSubmitTest} style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'end' }}>
          <div style={{ minWidth: '200px', flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#555', fontWeight: '600' }}>
              Test Name
            </label>
            <input
              type="text"
              placeholder="e.g., Legalight Mock Test 8"
              value={newTest.testName}
              onChange={(e) => setNewTest(prev => ({ ...prev, testName: e.target.value }))}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e2e8f0',
                borderRadius: '10px',
                fontSize: '1rem'
              }}
              required
            />
          </div>
          <div style={{ minWidth: '150px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#555', fontWeight: '600' }}>
              Score (out of 120)
            </label>
            <input
              type="number"
              min="0"
              max="120"
              placeholder="85"
              value={newTest.score}
              onChange={(e) => setNewTest(prev => ({ ...prev, score: e.target.value }))}
              style={{
                width: '100%',
                padding: '12px',
                border: '2px solid #e2e8f0',
                borderRadius: '10px',
                fontSize: '1rem'
              }}
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              background: isSubmitting ? '#ccc' : 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '10px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
            }}
          >
            {isSubmitting ? '⏳ Submitting...' : '🚀 Submit Test'}
          </button>
        </form>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <button
          onClick={fetchStats}
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            padding: '10px 20px',
            borderRadius: '10px',
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          🔄 Refresh Analytics
        </button>
      </div>

      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '20px',
        borderRadius: '15px',
        textAlign: 'center',
        color: 'white'
      }}>
        <h3 style={{ marginBottom: '15px' }}>🚀 Coming Next in Level Up V2</h3>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{ background: 'rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: '20px' }}>
            📈 Advanced Analytics
          </span>
          <span style={{ background: 'rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: '20px' }}>
            🤖 AI Rank Prediction
          </span>
          <span style={{ background: 'rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: '20px' }}>
            👥 Community Leaderboards
          </span>
          <span style={{ background: 'rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: '20px' }}>
            🎯 Personalized Study Plans
          </span>
        </div>
      </div>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: number
  suffix?: string
  icon: string
  color: string
}

const StatCard: React.FC<StatCardProps> = ({ title, value, suffix = '', icon, color }) => {
  return (
    <div style={{
      background: color,
      color: 'white',
      padding: '25px',
      borderRadius: '20px',
      textAlign: 'center',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
      transition: 'transform 0.3s ease',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'scale(1.05)'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'scale(1)'
    }}
    >
      <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{icon}</div>
      <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '5px' }}>
        {value}{suffix}
      </div>
      <div style={{ fontSize: '1rem', opacity: 0.9 }}>{title}</div>
    </div>
  )
}

export default Dashboard

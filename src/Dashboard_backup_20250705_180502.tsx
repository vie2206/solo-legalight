import React, { useState, useEffect } from 'react'

// Types for our application
interface User {
  id: string
  name: string
  email: string
  role: 'student' | 'educator' | 'parent' | 'operation_manager' | 'admin'
  target_nlu?: string
  target_score?: number
  total_tests?: number
  average_score?: number
  best_score?: number
  current_streak?: number
}

interface DashboardStats {
  mockTestsTaken: number
  averageScore: number
  bestScore: number
  currentStreak: number
  improvement: number
  [key: string]: any
}

interface AuthFormData {
  email: string
  password: string
  name?: string
  role?: string
  targetNLU?: string
  targetScore?: number
}

interface MockTest {
  id: string
  name: string
  test_date: string
  series_provider: string
  difficulty_level: string
  total_questions: number
  time_limit: number
}

// Student Planning Wizard Component
const StudentPlanningWizard: React.FC<{
  onComplete?: (planningData: any) => void
  onCancel?: () => void
  selectedMockTest?: MockTest | null
}> = ({ onComplete, onCancel, selectedMockTest: propMockTest }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [availableMockTests, setAvailableMockTests] = useState<MockTest[]>([])
  const [selectedMockTest, setSelectedMockTest] = useState<MockTest | null>(propMockTest || null)
  const [isLoadingTests, setIsLoadingTests] = useState(false)
  const [planningData, setPlanningData] = useState({
    // Page 1: Strategic Planning
    targetScore: 85,
    targetPercentile: 92,
    targetRank: 2500,
    questionsToAttempt: 105,
    confidenceMarks: 95,
    maxWrongAnswers: 25,
    riskQuestions: 10,
    skipThreshold: 60,
    riskStrategy: 'moderate',
    
    // Page 2: Section Strategy
    sectionTargets: {
      english: { time: 22, attempt: 22, target: 18, maxWrong: 4 },
      gk: { time: 15, attempt: 26, target: 16, maxWrong: 10 },
      legal: { time: 34, attempt: 29, target: 22, maxWrong: 7 },
      logical: { time: 22, attempt: 18, target: 15, maxWrong: 3 },
      quant: { time: 12, attempt: 10, target: 6, maxWrong: 4 }
    },
    sectionPriority: ['legal', 'english', 'gk', 'quant', 'logical'],
    
    // Page 3: OMR Strategy
    omrMethod: 'section',
    omrTime: 12,
    timePerQuestion: 6,
    
    // Page 4: Attempt Sequence
    attemptSequence: [
      { section: 'legal', time: 34, reason: 'Start with strongest to build confidence' },
      { section: 'english', time: 22, reason: 'Maintain momentum with consistent section' },
      { section: 'gk', time: 15, reason: 'Quick scoring in middle' },
      { section: 'quant', time: 12, reason: 'Attempt while energy remains' },
      { section: 'logical', time: 22, reason: 'Weakest section last to avoid early demoralization' }
    ]
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hasLoadedExistingPlan, setHasLoadedExistingPlan] = useState(false)

  const sectionNames = {
    english: 'English Language',
    gk: 'Current Affairs/GK',
    legal: 'Legal Reasoning', 
    logical: 'Logical Reasoning',
    quant: 'Quantitative Tech'
  }

  // Fetch available mock tests
  const fetchAvailableMockTests = async () => {
    setIsLoadingTests(true)
    try {
      const token = localStorage.getItem('levelup_token')
      const response = await fetch('http://localhost:8000/api/mock-tests/available', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      
      if (response.ok) {
        const data = await response.json()
        setAvailableMockTests(data)
      } else {
        console.error('Failed to fetch mock tests')
      }
    } catch (error) {
      console.error('Error fetching mock tests:', error)
    }
    setIsLoadingTests(false)
  }

  // Load existing planning data for selected mock test
  const loadExistingPlanningData = async (mockTestId: string) => {
    try {
      const token = localStorage.getItem('levelup_token')
      const response = await fetch(`http://localhost:8000/api/student-planning/${mockTestId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      
      if (response.ok) {
        const data = await response.json()
        if (data.planningData) {
          setPlanningData(data.planningData)
          console.log('✅ Loaded existing planning data')
        }
      }
    } catch (error) {
      console.error('Error loading existing planning data:', error)
    }
    setHasLoadedExistingPlan(true)
  }

  // Fetch tests on component mount
  useEffect(() => {
    if (!propMockTest) {
      fetchAvailableMockTests()
    }
  }, [propMockTest])

  // Load existing planning data when mock test is selected
  useEffect(() => {
    if (selectedMockTest && !hasLoadedExistingPlan) {
      loadExistingPlanningData(selectedMockTest.id)
    }
  }, [selectedMockTest, hasLoadedExistingPlan])

  const handleSubmit = async () => {
    if (!selectedMockTest) {
      alert('Please select a mock test first')
      return
    }

    setIsSubmitting(true)
    
    try {
      const token = localStorage.getItem('levelup_token')
      const response = await fetch('http://localhost:8000/api/student-planning', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          mockTestId: selectedMockTest.id,
          planningData: planningData
        })
      })

      if (response.ok) {
        const result = await response.json()
        alert('🎯 Strategic plan saved! You can now start your mock test with confidence.')
        
        if (onComplete) {
          onComplete({ ...planningData, mockTest: selectedMockTest })
        }
      } else {
        const error = await response.json()
        alert(`Failed to save planning data: ${error.error}`)
      }
    } catch (error) {
      console.error('Error saving planning data:', error)
      alert('Network error. Please try again.')
    }
    
    setIsSubmitting(false)
  }

  const nextPage = () => {
    if (currentPage < 4) setCurrentPage(currentPage + 1)
  }

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  // Mock Test Selection Page (Page 0)
  const MockTestSelectionPage = () => (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: '#2d3748', marginBottom: '30px' }}>
        📋 Select Mock Test to Plan
      </h2>
      
      {isLoadingTests ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>⏳</div>
          <div>Loading available mock tests...</div>
        </div>
      ) : availableMockTests.length > 0 ? (
        <div style={{ display: 'grid', gap: '15px' }}>
          {availableMockTests.map((test) => (
            <div
              key={test.id}
              onClick={() => setSelectedMockTest(test)}
              style={{
                border: selectedMockTest?.id === test.id ? '3px solid #4299e1' : '2px solid #e2e8f0',
                borderRadius: '12px',
                padding: '20px',
                cursor: 'pointer',
                background: selectedMockTest?.id === test.id ? '#ebf8ff' : 'white',
                transition: 'all 0.3s ease'
              }}
            >
              <h4 style={{ margin: '0 0 10px 0', color: '#2d3748' }}>{test.name}</h4>
              <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '5px' }}>
                📅 {new Date(test.test_date).toLocaleDateString()} | 
                ⏱️ {test.time_limit} min | 
                📝 {test.total_questions} questions
              </div>
              <div style={{ fontSize: '0.9rem', color: '#4a5568' }}>
                🏢 {test.series_provider} | 📊 {test.difficulty_level}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📝</div>
          <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>No Mock Tests Available</h3>
          <p style={{ color: '#666' }}>No upcoming mock tests found. Please check with your admin.</p>
        </div>
      )}
    </div>
  )

  // Page 1: Strategic Planning
  const StrategicPlanningPage = () => (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: '#2d3748', marginBottom: '30px' }}>
        🎯 Strategic Planning
      </h2>
      
      {selectedMockTest && (
        <div style={{ 
          background: '#e6fffa', 
          padding: '15px', 
          borderRadius: '10px', 
          marginBottom: '25px',
          border: '2px solid #38b2ac'
        }}>
          <h4 style={{ margin: '0 0 5px 0', color: '#2d3748' }}>Planning for: {selectedMockTest.name}</h4>
          <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>
            📅 {new Date(selectedMockTest.test_date).toLocaleDateString()} | 
            ⏱️ {selectedMockTest.time_limit} min | 
            📝 {selectedMockTest.total_questions} questions
          </p>
        </div>
      )}
      
      <div style={{ background: '#f7fafc', padding: '25px', borderRadius: '15px', marginBottom: '20px' }}>
        <h3 style={{ color: '#4a5568', marginBottom: '20px' }}>Target Setting</h3>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
            Target Score: {planningData.targetScore}/120
          </label>
          <input
            type="range"
            min="60"
            max="120"
            value={planningData.targetScore}
            onChange={(e) => setPlanningData(prev => ({ ...prev, targetScore: parseInt(e.target.value) }))}
            style={{ width: '100%', height: '8px' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#666' }}>
            <span>60</span><span>90</span><span>120</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
              Target Percentile
            </label>
            <input
              type="number"
              value={planningData.targetPercentile}
              onChange={(e) => setPlanningData(prev => ({ ...prev, targetPercentile: parseInt(e.target.value) }))}
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
              Target Rank
            </label>
            <input
              type="number"
              value={planningData.targetRank}
              onChange={(e) => setPlanningData(prev => ({ ...prev, targetRank: parseInt(e.target.value) }))}
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
            />
          </div>
        </div>
      </div>

      <div style={{ background: '#edf2f7', padding: '25px', borderRadius: '15px', marginBottom: '20px' }}>
        <h3 style={{ color: '#4a5568', marginBottom: '20px' }}>Attempt Strategy</h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
              Questions to Attempt
            </label>
            <input
              type="number"
              value={planningData.questionsToAttempt}
              onChange={(e) => setPlanningData(prev => ({ ...prev, questionsToAttempt: parseInt(e.target.value) }))}
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
              Confidence Marks
            </label>
            <input
              type="number"
              value={planningData.confidenceMarks}
              onChange={(e) => setPlanningData(prev => ({ ...prev, confidenceMarks: parseInt(e.target.value) }))}
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600' }}>
            Risk-Reward Strategy
          </label>
          <div style={{ display: 'flex', gap: '15px' }}>
            {[
              { value: 'conservative', label: 'Conservative (80%+ sure)', color: '#48bb78' },
              { value: 'moderate', label: 'Moderate (60%+ sure)', color: '#4299e1' },
              { value: 'aggressive', label: 'Aggressive (40%+ sure)', color: '#ed8936' }
            ].map(strategy => (
              <label key={strategy.value} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                cursor: 'pointer',
                padding: '10px',
                border: planningData.riskStrategy === strategy.value ? `2px solid ${strategy.color}` : '2px solid #ddd',
                borderRadius: '8px',
                flex: 1
              }}>
                <input
                  type="radio"
                  name="riskStrategy"
                  value={strategy.value}
                  checked={planningData.riskStrategy === strategy.value}
                  onChange={(e) => setPlanningData(prev => ({ ...prev, riskStrategy: e.target.value }))}
                  style={{ marginRight: '8px' }}
                />
                <span style={{ fontSize: '0.9rem' }}>{strategy.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  // Page 2: Section Strategy - Simplified for space
  const SectionStrategyPage = () => (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: '#2d3748', marginBottom: '30px' }}>
        📊 Section-wise Strategy
      </h2>
      
      <div style={{ background: '#f7fafc', padding: '25px', borderRadius: '15px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#edf2f7' }}>
              <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600' }}>Section</th>
              <th style={{ padding: '15px', textAlign: 'center' }}>Time (min)</th>
              <th style={{ padding: '15px', textAlign: 'center' }}>Target</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(planningData.sectionTargets).map(([section, data]) => (
              <tr key={section} style={{ borderBottom: '1px solid #e2e8f0' }}>
                <td style={{ padding: '15px', fontWeight: '600' }}>
                  {sectionNames[section as keyof typeof sectionNames]}
                </td>
                <td style={{ padding: '15px', textAlign: 'center' }}>
                  <input
                    type="number"
                    value={data.time}
                    onChange={(e) => setPlanningData(prev => ({
                      ...prev,
                      sectionTargets: {
                        ...prev.sectionTargets,
                        [section]: { ...data, time: parseInt(e.target.value) }
                      }
                    }))}
                    style={{ width: '60px', padding: '5px', textAlign: 'center', border: '1px solid #ddd', borderRadius: '3px' }}
                  />
                </td>
                <td style={{ padding: '15px', textAlign: 'center' }}>
                  <input
                    type="number"
                    value={data.target}
                    onChange={(e) => setPlanningData(prev => ({
                      ...prev,
                      sectionTargets: {
                        ...prev.sectionTargets,
                        [section]: { ...data, target: parseInt(e.target.value) }
                      }
                    }))}
                    style={{ width: '60px', padding: '5px', textAlign: 'center', border: '1px solid #ddd', borderRadius: '3px' }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )

  // Page 3: OMR Strategy - Simplified
  const OMRStrategyPage = () => (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: '#2d3748', marginBottom: '30px' }}>
        📝 OMR Strategy
      </h2>
      
      <div style={{ background: '#f7fafc', padding: '25px', borderRadius: '15px' }}>
        <h3 style={{ color: '#4a5568', marginBottom: '20px' }}>Bubbling Method</h3>
        
        <div style={{ marginBottom: '25px' }}>
          {[
            { value: 'question', label: 'After Each Question', desc: 'Immediate bubbling, no transfer time' },
            { value: 'section', label: 'After Each Section', desc: 'Balanced approach with moderate risk' },
            { value: 'end', label: 'At End of Paper', desc: 'Maximum thinking time, highest risk' }
          ].map(method => (
            <div 
              key={method.value}
              style={{ 
                border: planningData.omrMethod === method.value ? '2px solid #4299e1' : '2px solid #e2e8f0',
                borderRadius: '10px',
                padding: '15px',
                marginBottom: '10px',
                cursor: 'pointer',
                background: planningData.omrMethod === method.value ? '#ebf8ff' : 'white'
              }}
              onClick={() => setPlanningData(prev => ({ ...prev, omrMethod: method.value }))}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                <input
                  type="radio"
                  name="omrMethod"
                  value={method.value}
                  checked={planningData.omrMethod === method.value}
                  onChange={(e) => setPlanningData(prev => ({ ...prev, omrMethod: e.target.value }))}
                  style={{ marginRight: '10px' }}
                />
                <span style={{ fontWeight: '600' }}>{method.label}</span>
              </div>
              <p style={{ margin: 0, color: '#666', fontSize: '0.9rem' }}>{method.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // Page 4: Attempt Sequence - Simplified
  const AttemptSequencePage = () => (
    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: '#2d3748', marginBottom: '30px' }}>
        🔢 Attempt Sequence Planning
      </h2>
      
      <div style={{ background: '#f7fafc', padding: '25px', borderRadius: '15px' }}>
        <h3 style={{ color: '#4a5568', marginBottom: '20px' }}>Planned Section Order</h3>
        
        {planningData.attemptSequence.map((item, index) => (
          <div 
            key={index}
            style={{ 
              background: 'white',
              border: '2px solid #e2e8f0',
              borderRadius: '10px',
              padding: '15px',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '15px'
            }}
          >
            <div style={{ 
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold'
            }}>
              {index + 1}
            </div>
            
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 5px 0', color: '#2d3748' }}>
                {sectionNames[item.section as keyof typeof sectionNames]} ({item.time} min)
              </h4>
              <p style={{ margin: 0, color: '#666', fontSize: '0.8rem' }}>
                {item.reason}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '30px',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            margin: '0 0 10px 0',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold'
          }}>
            🎯 Pre-Mock Strategic Planner
          </h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>
            Smart work begins before the test starts!
          </p>
        </div>

        {/* Progress Indicator */}
        <div style={{ marginBottom: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '10px' }}>
            {[0, 1, 2, 3, 4].map(page => (
              <div
                key={page}
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  background: currentPage >= page ? '#4299e1' : '#e2e8f0',
                  transition: 'all 0.3s ease'
                }}
              />
            ))}
          </div>
          <div style={{ textAlign: 'center', color: '#666' }}>
            {currentPage === 0 ? 'Select Mock Test' : `Page ${currentPage} of 4`}
          </div>
        </div>

        {/* Page Content */}
        <div style={{ minHeight: '400px' }}>
          {(!selectedMockTest && !propMockTest) && <MockTestSelectionPage />}
          {selectedMockTest && currentPage === 1 && <StrategicPlanningPage />}
          {selectedMockTest && currentPage === 2 && <SectionStrategyPage />}
          {selectedMockTest && currentPage === 3 && <OMRStrategyPage />}
          {selectedMockTest && currentPage === 4 && <AttemptSequencePage />}
        </div>

        {/* Navigation */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginTop: '30px',
          paddingTop: '20px',
          borderTop: '1px solid #e2e8f0'
        }}>
          <button
            onClick={() => {
              if (currentPage === 1 && !propMockTest) {
                setSelectedMockTest(null)
                setCurrentPage(0)
              } else if (currentPage > 1) {
                prevPage()
              } else if (onCancel) {
                onCancel()
              }
            }}
            style={{
              background: '#e2e8f0',
              color: '#4a5568',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            {currentPage === 0 || (currentPage === 1 && propMockTest) ? 'Cancel' : '← Previous'}
          </button>

          <div style={{ color: '#666', fontWeight: '600' }}>
            {currentPage === 0 && 'Mock Test Selection'}
            {currentPage === 1 && 'Strategic Planning'}
            {currentPage === 2 && 'Section Strategy'}
            {currentPage === 3 && 'OMR Strategy'}
            {currentPage === 4 && 'Attempt Sequence'}
          </div>

          {!selectedMockTest ? (
            <button
              onClick={() => setCurrentPage(1)}
              disabled={!selectedMockTest}
              style={{
                background: selectedMockTest ? '#4299e1' : '#e2e8f0',
                color: selectedMockTest ? 'white' : '#a0aec0',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: selectedMockTest ? 'pointer' : 'not-allowed'
              }}
            >
              Start Planning →
            </button>
          ) : currentPage < 4 ? (
            <button
              onClick={nextPage}
              style={{
                background: '#4299e1',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Next →
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              style={{
                background: isSubmitting ? '#9ca3af' : 'linear-gradient(135deg, #48bb78, #38a169)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: isSubmitting ? 'not-allowed' : 'pointer'
              }}
            >
              {isSubmitting ? '⏳ Saving...' : '🚀 Save Plan & Continue'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showAuth, setShowAuth] = useState(true)
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login')
  const [authForm, setAuthForm] = useState<AuthFormData>({
    email: '',
    password: '',
    name: '',
    role: 'student'
  })
  const [authError, setAuthError] = useState<string | null>(null)
  const [stats, setStats] = useState<DashboardStats>({
    mockTestsTaken: 0,
    averageScore: 0,
    bestScore: 0,
    currentStreak: 0,
    improvement: 0
  })

  // Check if user is already logged in
  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    const token = localStorage.getItem('levelup_token')
    if (!token) {
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('http://localhost:8000/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
        setShowAuth(false)
        await fetchUserStats(token)
      } else {
        localStorage.removeItem('levelup_token')
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      localStorage.removeItem('levelup_token')
    }
    
    setIsLoading(false)
  }

  const fetchUserStats = async (token: string) => {
    try {
      const response = await fetch('http://localhost:8000/api/analytics/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    }
  }

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError(null)

    const endpoint = authMode === 'login' ? '/api/auth/login' : '/api/auth/register'
    const requestData = authMode === 'login' 
      ? { email: authForm.email, password: authForm.password }
      : authForm

    try {
      const response = await fetch(`http://localhost:8000${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData)
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('levelup_token', data.token)
        setUser(data.user)
        setShowAuth(false)
        await fetchUserStats(data.token)
      } else {
        setAuthError(data.error || 'Authentication failed')
      }
    } catch (error) {
      setAuthError('Network error. Please try again.')
    }
  }

  const handleLogout = async () => {
    const token = localStorage.getItem('levelup_token')
    if (token) {
      try {
        await fetch('http://localhost:8000/api/auth/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
      } catch (error) {
        console.error('Logout error:', error)
      }
    }
    
    localStorage.removeItem('levelup_token')
    setUser(null)
    setShowAuth(true)
    setStats({
      mockTestsTaken: 0,
      averageScore: 0,
      bestScore: 0,
      currentStreak: 0,
      improvement: 0
    })
  }

  const handleSubmitTest = async (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const score = parseInt(formData.get('score') as string)
    
    const token = localStorage.getItem('levelup_token')
    if (!token) return

    try {
      const response = await fetch('http://localhost:8000/api/mock-tests/1/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          score,
          total_questions: 120,
          time_taken: 7200
        })
      })

      if (response.ok) {
        alert('🎉 Mock test submitted successfully!')
        await fetchUserStats(token)
        form.reset()
      } else {
        alert('Failed to submit test')
      }
    } catch (error) {
      alert('Network error')
    }
  }

  if (isLoading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '1.5rem'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>⏳</div>
          Loading Level Up...
        </div>
      </div>
    )
  }

  if (showAuth) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          width: '100%',
          maxWidth: '450px'
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h1 style={{ 
              fontSize: '2.5rem', 
              margin: '0 0 10px 0',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold'
            }}>
              🚀 LEVEL UP
            </h1>
            <p style={{ color: '#666', margin: 0 }}>
              {authMode === 'login' ? 'Welcome back!' : 'Join the Level Up community'}
            </p>
          </div>

          {/* Auth Form */}
          <form onSubmit={handleAuth}>
            {authMode === 'register' && (
              <>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#333', fontWeight: '600' }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={authForm.name}
                    onChange={(e) => setAuthForm(prev => ({ ...prev, name: e.target.value }))}
                    style={inputStyle}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', color: '#333', fontWeight: '600' }}>
                    I am a...
                  </label>
                  <select
                    value={authForm.role}
                    onChange={(e) => setAuthForm(prev => ({ ...prev, role: e.target.value }))}
                    style={inputStyle}
                    required
                  >
                    <option value="student">🎓 Student (CLAT Aspirant)</option>
                    <option value="educator">👩‍🏫 Educator/Mentor</option>
                    <option value="parent">👨‍👩‍👧‍👦 Parent</option>
                    <option value="operation_manager">👔 Operations Manager</option>
                    <option value="admin">👑 Administrator</option>
                  </select>
                </div>

                {authForm.role === 'student' && (
                  <>
                    <div style={{ marginBottom: '20px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', color: '#333', fontWeight: '600' }}>
                        Target NLU
                      </label>
                      <select
                        value={authForm.targetNLU}
                        onChange={(e) => setAuthForm(prev => ({ ...prev, targetNLU: e.target.value }))}
                        style={inputStyle}
                      >
                        <option value="">Select your target NLU</option>
                        <option value="NLSIU">NLSIU Bangalore</option>
                        <option value="NALSAR">NALSAR Hyderabad</option>
                        <option value="WBNUJS">WBNUJS Kolkata</option>
                        <option value="CNLU">CNLU Patna</option>
                        <option value="NUSRL">NUSRL Ranchi</option>
                        <option value="RGNUL">RGNUL Punjab</option>
                        <option value="NLIU">NLIU Bhopal</option>
                      </select>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                      <label style={{ display: 'block', marginBottom: '5px', color: '#333', fontWeight: '600' }}>
                        Target Score (out of 120)
                      </label>
                      <input
                        type="number"
                        min="60"
                        max="120"
                        value={authForm.targetScore || ''}
                        onChange={(e) => setAuthForm(prev => ({ ...prev, targetScore: parseInt(e.target.value) }))}
                        style={inputStyle}
                        placeholder="e.g., 90"
                      />
                    </div>
                  </>
                )}
              </>
            )}

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: '#333', fontWeight: '600' }}>
                Email Address
              </label>
              <input
                type="email"
                value={authForm.email}
                onChange={(e) => setAuthForm(prev => ({ ...prev, email: e.target.value }))}
                style={inputStyle}
                required
                placeholder="Enter your email"
              />
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: '#333', fontWeight: '600' }}>
                Password
              </label>
              <input
                type="password"
                value={authForm.password}
                onChange={(e) => setAuthForm(prev => ({ ...prev, password: e.target.value }))}
                style={inputStyle}
                required
                placeholder="Enter your password"
                minLength={6}
              />
            </div>

            {authError && (
              <div style={{
                background: '#fee',
                color: '#c33',
                padding: '10px',
                borderRadius: '8px',
                marginBottom: '20px',
                fontSize: '0.9rem'
              }}>
                {authError}
              </div>
            )}

            <button
              type="submit"
              style={{
                width: '100%',
                padding: '15px',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '1.1rem',
                fontWeight: '600',
                cursor: 'pointer',
                marginBottom: '20px'
              }}
            >
              {authMode === 'login' ? '🚀 Sign In' : '🎯 Create Account'}
            </button>

            <div style={{ textAlign: 'center' }}>
              <button
                type="button"
                onClick={() => {
                  setAuthMode(authMode === 'login' ? 'register' : 'login')
                  setAuthError(null)
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#667eea',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                {authMode === 'login' 
                  ? "Don't have an account? Sign up" 
                  : "Already have an account? Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  // Render role-specific dashboard
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      {/* Header with user info */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '20px',
        borderRadius: '15px',
        marginBottom: '30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
      }}>
        <div>
          <h1 style={{ margin: 0, color: '#333' }}>🚀 LEVEL UP</h1>
          <p style={{ margin: '5px 0 0 0', color: '#666' }}>
            Welcome back, {user?.name}! ({user?.role})
          </p>
        </div>
        <button
          onClick={handleLogout}
          style={{
            background: '#ff6b6b',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          Sign Out
        </button>
      </div>

      {/* Role-specific content */}
      {user?.role === 'student' ? (
        <StudentDashboard user={user} stats={stats} onSubmitTest={handleSubmitTest} />
      ) : user?.role === 'educator' ? (
        <EducatorDashboard user={user} stats={stats} />
      ) : user?.role === 'parent' ? (
        <ParentDashboard user={user} stats={stats} />
      ) : user?.role === 'operation_manager' ? (
        <OperationManagerDashboard user={user} stats={stats} />
      ) : user?.role === 'admin' ? (
        <AdminDashboard user={user} stats={stats} />
      ) : (
        <div style={{ textAlign: 'center', color: 'white' }}>
          <h2>Role dashboard under development</h2>
        </div>
      )}
    </div>
  )
}

// Input style constant
const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px',
  border: '2px solid #e2e8f0',
  borderRadius: '8px',
  fontSize: '1rem',
  boxSizing: 'border-box'
}

// Enhanced Student Dashboard Component with Planning Integration
const StudentDashboard: React.FC<{
  user: User
  stats: DashboardStats
  onSubmitTest: (e: React.FormEvent) => void
}> = ({ user, stats, onSubmitTest }) => {
  const [currentView, setCurrentView] = useState('dashboard')
  const [availableMockTests, setAvailableMockTests] = useState<MockTest[]>([])
  const [planningHistory, setPlanningHistory] = useState<any[]>([])
  const [isLoadingTests, setIsLoadingTests] = useState(false)
  const [isLoadingHistory, setIsLoadingHistory] = useState(false)

  // Fetch available mock tests
  const fetchAvailableMockTests = async () => {
    setIsLoadingTests(true)
    try {
      const token = localStorage.getItem('levelup_token')
      const response = await fetch('http://localhost:8000/api/mock-tests/available', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      
      if (response.ok) {
        const data = await response.json()
        setAvailableMockTests(data)
      }
    } catch (error) {
      console.error('Error fetching mock tests:', error)
    }
    setIsLoadingTests(false)
  }

  // Fetch planning history
  const fetchPlanningHistory = async () => {
    setIsLoadingHistory(true)
    try {
      const token = localStorage.getItem('levelup_token')
      const response = await fetch('http://localhost:8000/api/student-planning', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      
      if (response.ok) {
        const data = await response.json()
        setPlanningHistory(data)
      }
    } catch (error) {
      console.error('Error fetching planning history:', error)
    }
    setIsLoadingHistory(false)
  }

  useEffect(() => {
    if (currentView === 'mock-tests') {
      fetchAvailableMockTests()
    } else if (currentView === 'planning-history') {
      fetchPlanningHistory()
    }
  }, [currentView])

  // Student Navigation
  const StudentNavigation = () => (
    <div style={{
      background: 'rgba(255, 255, 255, 0.95)',
      padding: '20px',
      borderRadius: '15px',
      marginBottom: '20px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
        {[
          { id: 'dashboard', label: '📊 Dashboard', icon: '📊' },
          { id: 'planning', label: '🎯 Plan Mock Test', icon: '🎯' },
          { id: 'mock-tests', label: '📝 Available Tests', icon: '📝' },
          { id: 'planning-history', label: '📋 My Plans', icon: '📋' }
        ].map(view => (
          <button
            key={view.id}
            onClick={() => setCurrentView(view.id)}
            style={{
              padding: '12px 24px',
              borderRadius: '10px',
              border: 'none',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              background: currentView === view.id 
                ? 'linear-gradient(135deg, #667eea, #764ba2)' 
                : '#f7fafc',
              color: currentView === view.id ? 'white' : '#4a5568'
            }}
          >
            {view.label}
          </button>
        ))}
      </div>
    </div>
  )

  // Main Dashboard View
  const DashboardView = () => (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: 'white', fontSize: '2rem', marginBottom: '10px' }}>
          📊 Your Performance Dashboard
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.9)' }}>
          Track your progress toward {user.target_nlu} with a target score of {user.target_score}/120
        </p>
      </div>

      {/* Stats Grid */}
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

      {/* Quick Actions */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '25px',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
        marginBottom: '30px'
      }}>
        <h3 style={{ color: '#333', marginBottom: '20px' }}>🚀 Quick Actions</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <button
            onClick={() => setCurrentView('planning')}
            style={{
              padding: '20px',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, #48bb78, #38a169)',
              color: 'white',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '1.1rem'
            }}
          >
            🎯 Plan Mock Test
          </button>
          <button
            onClick={() => setCurrentView('mock-tests')}
            style={{
              padding: '20px',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, #4299e1, #3182ce)',
              color: 'white',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '1.1rem'
            }}
          >
            📝 Available Tests
          </button>
        </div>
      </div>

      {/* Submit Test Form */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '25px',
        borderRadius: '20px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
      }}>
        <h3 style={{ color: '#333', marginBottom: '20px' }}>📝 Submit New Mock Test</h3>
        <form onSubmit={onSubmitTest} style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'end' }}>
          <div style={{ minWidth: '200px', flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#555', fontWeight: '600' }}>
              Test Name
            </label>
            <input
              name="testName"
              type="text"
              placeholder="e.g., Legalight Mock Test 8"
              style={inputStyle}
              required
            />
          </div>
          <div style={{ minWidth: '150px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#555', fontWeight: '600' }}>
              Score (out of 120)
            </label>
            <input
              name="score"
              type="number"
              min="0"
              max="120"
              placeholder="85"
              style={inputStyle}
              required
            />
          </div>
          <button
            type="submit"
            style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '10px',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            🚀 Submit Test
          </button>
        </form>
      </div>
    </div>
  )

  // Mock Tests View
  const MockTestsView = () => (
    <div style={{
      background: 'rgba(255, 255, 255, 0.95)',
      padding: '30px',
      borderRadius: '20px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#2d3748' }}>
        📝 Available Mock Tests
      </h2>

      {isLoadingTests ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>⏳</div>
          <div>Loading available tests...</div>
        </div>
      ) : availableMockTests.length > 0 ? (
        <div style={{ display: 'grid', gap: '15px' }}>
          {availableMockTests.map((test) => (
            <div
              key={test.id}
              style={{
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                padding: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <h4 style={{ margin: '0 0 10px 0', color: '#2d3748' }}>{test.name}</h4>
                <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '5px' }}>
                  📅 {new Date(test.test_date).toLocaleDateString()} | 
                  ⏱️ {test.time_limit} min | 
                  📝 {test.total_questions} questions
                </div>
                <div style={{ fontSize: '0.9rem', color: '#4a5568' }}>
                  🏢 {test.series_provider} | 📊 {test.difficulty_level}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => {
                    // You can add logic here to start planning for this specific test
                    setCurrentView('planning')
                  }}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #48bb78, #38a169)',
                    color: 'white',
                    fontWeight: '600',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  🎯 Plan Strategy
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📝</div>
          <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>No Tests Available</h3>
          <p style={{ color: '#666' }}>No upcoming mock tests found. Check back later!</p>
        </div>
      )}
    </div>
  )

  // Planning History View
  const PlanningHistoryView = () => (
    <div style={{
      background: 'rgba(255, 255, 255, 0.95)',
      padding: '30px',
      borderRadius: '20px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#2d3748' }}>
        📋 My Planning History
      </h2>

      {isLoadingHistory ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>⏳</div>
          <div>Loading your plans...</div>
        </div>
      ) : planningHistory.length > 0 ? (
        <div style={{ display: 'grid', gap: '15px' }}>
          {planningHistory.map((plan) => (
            <div
              key={plan.id}
              style={{
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                padding: '20px'
              }}
            >
              <h4 style={{ margin: '0 0 10px 0', color: '#2d3748' }}>
                {plan.mock_test_templates?.name || 'Mock Test Plan'}
              </h4>
              <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '10px' }}>
                📅 Created: {new Date(plan.created_at).toLocaleDateString()} | 
                🎯 Target Score: {plan.planning_data?.targetScore || 'N/A'} | 
                📊 Strategy: {plan.planning_data?.riskStrategy || 'N/A'}
              </div>
              {plan.mock_test_templates && (
                <div style={{ fontSize: '0.8rem', color: '#4a5568' }}>
                  Test Date: {new Date(plan.mock_test_templates.test_date).toLocaleDateString()} | 
                  Difficulty: {plan.mock_test_templates.difficulty_level}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📋</div>
          <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>No Plans Yet</h3>
          <p style={{ color: '#666', marginBottom: '20px' }}>Start planning your mock tests for better performance!</p>
          <button
            onClick={() => setCurrentView('planning')}
            style={{
              padding: '12px 24px',
              borderRadius: '10px',
              border: 'none',
              background: 'linear-gradient(135deg, #48bb78, #38a169)',
              color: 'white',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            🎯 Create First Plan
          </button>
        </div>
      )}
    </div>
  )

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <StudentNavigation />

      {/* Main Content */}
      {currentView === 'dashboard' && <DashboardView />}
      {currentView === 'planning' && (
        <StudentPlanningWizard 
          onComplete={() => setCurrentView('dashboard')}
          onCancel={() => setCurrentView('dashboard')}
        />
      )}
      {currentView === 'mock-tests' && <MockTestsView />}
      {currentView === 'planning-history' && <PlanningHistoryView />}
    </div>
  )
}

// Other dashboard components (unchanged)
const EducatorDashboard: React.FC<{ user: User, stats: any }> = ({ user, stats }) => (
  <div style={{ textAlign: 'center', color: 'white' }}>
    <h2>👩‍🏫 Educator Dashboard</h2>
    <p>Manage your students and track their progress</p>
    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '15px', marginTop: '20px' }}>
      <h3>Your Students: {stats.totalStudents}</h3>
      <p>Average Class Score: {stats.averageClassScore}</p>
    </div>
  </div>
)

const ParentDashboard: React.FC<{ user: User, stats: any }> = ({ user, stats }) => (
  <div style={{ textAlign: 'center', color: 'white' }}>
    <h2>👨‍👩‍👧‍👦 Parent Dashboard</h2>
    <p>Monitor your child's CLAT preparation progress</p>
    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '15px', marginTop: '20px' }}>
      <h3>Children: {stats.childrenCount}</h3>
      <p>Overall Progress: {stats.overallProgress}%</p>
    </div>
  </div>
)

const OperationManagerDashboard: React.FC<{ user: User, stats: any }> = ({ user, stats }) => (
  <div style={{ textAlign: 'center', color: 'white' }}>
    <h2>👔 Operations Manager Dashboard</h2>
    <p>Manage institute operations and analytics</p>
    <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px', borderRadius: '15px', marginTop: '20px' }}>
      <h3>Total Users: {stats.totalUsers}</h3>
      <p>Active Students: {stats.activeStudents}</p>
    </div>
  </div>
)

// ENHANCED ADMIN DASHBOARD WITH VERSION 5 MOCK CREATOR (unchanged from previous)
const AdminDashboard: React.FC<{ user: User, stats: any }> = ({ user, stats }) => {
  const [currentView, setCurrentView] = useState('overview')
  const [mockTests, setMockTests] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Version 5 Mock Creator State
  const [testData, setTestData] = useState({
    name: '',
    testDate: '',
    seriesProvider: 'Legalight Mastery Series',
    difficultyLevel: 'Similar to CLAT 2024',
    answerKeyFile: null as File | null,
    answerKeyData: [] as any[],
    expectedAverage: '65-70',
    topCutoff: '85+',
    totalQuestions: 120,
    timeLimit: 120
  })

  const [isCreating, setIsCreating] = useState(false)
  const [uploadStatus, setUploadStatus] = useState('')
  const [previewData, setPreviewData] = useState<any[] | null>(null)

  const fetchMockTests = async () => {
    setIsLoading(true)
    try {
      const token = localStorage.getItem('levelup_token')
      const response = await fetch('http://localhost:8000/api/mock-test-templates', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      
      if (response.ok) {
        const data = await response.json()
        setMockTests(data)
      }
    } catch (error) {
      console.error('Error fetching mock tests:', error)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (currentView === 'tests') {
      fetchMockTests()
    }
  }, [currentView])

  const parseCSVFile = (file: File): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const csv = e.target?.result as string
          const lines = csv.split('\n').filter(line => line.trim())
          const headers = lines[0].split(',').map(h => h.trim())
          
          const expectedHeaders = ['Question Number', 'Correct Answer', 'Topic', 'Difficulty']
          const hasValidHeaders = expectedHeaders.every(header => 
            headers.some(h => h.toLowerCase().includes(header.toLowerCase()))
          )
          
          if (!hasValidHeaders) {
            reject('Invalid CSV format. Expected columns: Question Number, Correct Answer, Topic, Difficulty')
            return
          }
          
          const data = lines.slice(1).map(line => {
            const values = line.split(',').map(v => v.trim())
            return {
              questionNumber: parseInt(values[0]),
              correctAnswer: values[1],
              topic: values[2],
              difficulty: values[3]
            }
          }).filter(item => item.questionNumber && item.correctAnswer)
          
          resolve(data)
        } catch (error) {
          reject('Error parsing CSV file: ' + (error as Error).message)
        }
      }
      reader.onerror = () => reject('Error reading file')
      reader.readAsText(file)
    })
  }

  const handleFileUpload = async (file: File) => {
    if (!file) return
    
    setUploadStatus('⏳ Processing file...')
    
    try {
      let parsedData: any[]
      
      if (file.name.endsWith('.csv')) {
        parsedData = await parseCSVFile(file)
      } else {
        setUploadStatus('❌ Please upload a CSV file')
        return
      }
      
      if (parsedData.length === 0) {
        setUploadStatus('❌ No valid question data found')
        return
      }
      
      if (parsedData.length !== 120) {
        setUploadStatus(`⚠️ Warning: Found ${parsedData.length} questions, expected 120`)
      } else {
        setUploadStatus('✅ File processed successfully!')
      }
      
      setTestData(prev => ({
        ...prev,
        answerKeyFile: file,
        answerKeyData: parsedData,
        totalQuestions: parsedData.length
      }))
      
      setPreviewData(parsedData.slice(0, 5))
      
    } catch (error) {
      setUploadStatus(`❌ ${error}`)
    }
  }

  const handleSubmit = async () => {
    if (!testData.name || !testData.testDate) {
      alert('Please fill in required fields (Test Name and Date)')
      return
    }
    
    if (!testData.answerKeyFile || testData.answerKeyData.length === 0) {
      alert('Please upload a valid answer key file')
      return
    }
    
    setIsCreating(true)
    
    try {
      const token = localStorage.getItem('levelup_token')
      
      // First, create the mock test template
      const templateResponse = await fetch('http://localhost:8000/api/mock-test-templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: testData.name,
          testDate: testData.testDate,
          seriesProvider: testData.seriesProvider,
          difficultyLevel: testData.difficultyLevel,
          totalQuestions: testData.totalQuestions,
          timeLimit: testData.timeLimit,
          benchmarks: {
            expected_average: testData.expectedAverage,
            top_cutoff: testData.topCutoff
          }
        })
      })

      const templateData = await templateResponse.json()

      if (!templateResponse.ok) {
        throw new Error(templateData.error || 'Failed to create mock test template')
      }

      // Then, upload the question data
      const questionsResponse = await fetch('http://localhost:8000/api/mock-test-questions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          templateId: templateData.template.id,
          questions: testData.answerKeyData
        })
      })

      const questionsData = await questionsResponse.json()

      if (!questionsResponse.ok) {
        throw new Error(questionsData.error || 'Failed to upload question data')
      }

      alert(`🎉 Mock test "${testData.name}" created successfully!\n✅ Template created\n✅ ${testData.answerKeyData.length} questions uploaded`)
      
      // Reset form
      setTestData({
        name: '',
        testDate: '',
        seriesProvider: 'Legalight Mastery Series',
        difficultyLevel: 'Similar to CLAT 2024',
        answerKeyFile: null,
        answerKeyData: [],
        expectedAverage: '65-70',
        topCutoff: '85+',
        totalQuestions: 120,
        timeLimit: 120
      })
      setPreviewData(null)
      setUploadStatus('')
      
      // Refresh mock tests if we're on the tests view
      if (currentView === 'tests') {
        fetchMockTests()
      }
      
    } catch (error) {
      console.error('Error creating mock test:', error)
      alert(`❌ Error: ${(error as Error).message}`)
    }
    
    setIsCreating(false)
  }

  const buttonStyle: React.CSSProperties = {
    padding: '12px 24px',
    borderRadius: '10px',
    border: 'none',
    fontWeight: '600',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.3s ease'
  }

  // Navigation Component
  const AdminNavigation = () => (
    <div style={{
      background: 'rgba(255, 255, 255, 0.95)',
      padding: '20px',
      borderRadius: '15px',
      marginBottom: '20px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
        {[
          { id: 'overview', label: '📊 Overview' },
          { id: 'create', label: '➕ Create Test' },
          { id: 'tests', label: '📋 Manage Tests' },
          { id: 'analytics', label: '📈 Analytics' }
        ].map(view => (
          <button
            key={view.id}
            onClick={() => setCurrentView(view.id)}
            style={{
              ...buttonStyle,
              background: currentView === view.id 
                ? 'linear-gradient(135deg, #667eea, #764ba2)' 
                : '#f7fafc',
              color: currentView === view.id ? 'white' : '#4a5568'
            }}
          >
            {view.label}
          </button>
        ))}
      </div>
    </div>
  )

  // Overview Dashboard
  const OverviewDashboard = () => (
    <div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '30px'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          color: 'white',
          padding: '25px',
          borderRadius: '15px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>📝</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>{mockTests.length}</div>
          <div>Active Mock Tests</div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #48bb78, #38a169)',
          color: 'white',
          padding: '25px',
          borderRadius: '15px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>👥</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>1,247</div>
          <div>Active Students</div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #4299e1, #3182ce)',
          color: 'white',
          padding: '25px',
          borderRadius: '15px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>✅</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>89%</div>
          <div>Completion Rate</div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #ed8936, #dd6b20)',
          color: 'white',
          padding: '25px',
          borderRadius: '15px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>📊</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>72.3</div>
          <div>Average Score</div>
        </div>
      </div>

      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        padding: '25px',
        borderRadius: '15px',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{ marginBottom: '20px', color: '#2d3748' }}>🚀 Quick Actions</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minWidth(200px, 1fr))', gap: '15px' }}>
          <button
            onClick={() => setCurrentView('create')}
            style={{
              ...buttonStyle,
              background: 'linear-gradient(135deg, #48bb78, #38a169)',
              color: 'white'
            }}
          >
            ➕ Create New Mock Test
          </button>
          <button
            onClick={() => setCurrentView('tests')}
            style={{
              ...buttonStyle,
              background: 'linear-gradient(135deg, #4299e1, #3182ce)',
              color: 'white'
            }}
          >
            📋 Manage Tests
          </button>
          <button
            onClick={() => setCurrentView('analytics')}
            style={{
              ...buttonStyle,
              background: 'linear-gradient(135deg, #ed8936, #dd6b20)',
              color: 'white'
            }}
          >
            📈 View Analytics
          </button>
        </div>
      </div>
    </div>
  )

  // Create Test View (Version 5 Mock Creator) - Simplified for space
  const CreateTestView = () => (
    <div style={{
      background: 'rgba(255, 255, 255, 0.95)',
      padding: '30px',
      borderRadius: '20px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{ 
        textAlign: 'center', 
        marginBottom: '30px',
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        fontSize: '2rem'
      }}>
        ➕ Create New Mock Test v5
      </h2>

      {/* Basic Information */}
      <div style={{ marginBottom: '25px' }}>
        <h3 style={{ color: '#2d3748', marginBottom: '15px' }}>📋 Basic Information</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Test Name *</label>
            <input
              type="text"
              value={testData.name}
              onChange={(e) => setTestData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., Legalight Mock Test 17"
              style={inputStyle}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Test Date *</label>
            <input
              type="date"
              value={testData.testDate}
              onChange={(e) => setTestData(prev => ({ ...prev, testDate: e.target.value }))}
              style={inputStyle}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Series Provider</label>
            <select
              value={testData.seriesProvider}
              onChange={(e) => setTestData(prev => ({ ...prev, seriesProvider: e.target.value }))}
              style={inputStyle}
            >
              <option value="Legalight Mastery Series">Legalight Mastery Series</option>
              <option value="CLAT Official Practice">CLAT Official Practice</option>
              <option value="All India Mock Series">All India Mock Series</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>Difficulty Level</label>
            <select
              value={testData.difficultyLevel}
              onChange={(e) => setTestData(prev => ({ ...prev, difficultyLevel: e.target.value }))}
              style={inputStyle}
            >
              <option value="Easier than CLAT 2024">Easier than CLAT 2024</option>
              <option value="Similar to CLAT 2024">Similar to CLAT 2024</option>
              <option value="Harder than CLAT 2024">Harder than CLAT 2024</option>
              <option value="Similar to CLAT 2025">Similar to CLAT 2025</option>
            </select>
          </div>
        </div>
      </div>

      {/* Answer Key Upload */}
      <div style={{ 
        background: '#f0fff4', 
        padding: '25px', 
        borderRadius: '15px', 
        marginBottom: '25px',
        border: '2px solid #9ae6b4' 
      }}>
        <h3 style={{ color: '#2d3748', marginBottom: '20px' }}>📝 Answer Key & Question Data</h3>
        
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: '600' }}>
            Answer Key (CSV Upload) *
          </label>
          <div style={{
            border: '2px dashed #9ae6b4',
            borderRadius: '8px',
            padding: '30px',
            textAlign: 'center',
            background: '#f0fff4',
            cursor: 'pointer'
          }}
          onClick={() => document.getElementById('fileInput')?.click()}
          >
            <div style={{ fontSize: '2rem', marginBottom: '10px' }}>📄</div>
            <p style={{ margin: '0 0 10px 0', color: '#555' }}>
              {testData.answerKeyFile?.name || 'Click to upload your answer key file'}
            </p>
            <input
              id="fileInput"
              type="file"
              accept=".csv"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  handleFileUpload(file)
                }
              }}
              style={{ display: 'none' }}
            />
            <p style={{ fontSize: '0.9rem', color: '#666', margin: '10px 0 0 0' }}>
              <strong>Required Format:</strong> Question Number, Correct Answer, Topic, Difficulty
            </p>
          </div>
          
          {uploadStatus && (
            <div style={{ 
              marginTop: '15px', 
              padding: '10px', 
              borderRadius: '8px',
              background: uploadStatus.includes('✅') ? '#f0fff4' : 
                         uploadStatus.includes('⚠️') ? '#fffbeb' : '#fef2f2',
              border: uploadStatus.includes('✅') ? '1px solid #9ae6b4' : 
                     uploadStatus.includes('⚠️') ? '1px solid #fbbf24' : '1px solid #f87171',
              fontSize: '0.9rem'
            }}>
              {uploadStatus}
            </div>
          )}
        </div>

        {/* Question Preview */}
        {previewData && (
          <div style={{ 
            background: 'white', 
            padding: '20px', 
            borderRadius: '8px', 
            border: '1px solid #e2e8f0' 
          }}>
            <h4 style={{ color: '#2d3748', marginBottom: '15px' }}>
              📋 Question Preview (First 5 questions)
            </h4>
            <div style={{ fontSize: '0.9rem' }}>
              {previewData.map((q, index) => (
                <div key={index} style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '60px 80px 1fr 100px', 
                  gap: '10px', 
                  padding: '8px 0',
                  borderBottom: index < previewData.length - 1 ? '1px solid #e2e8f0' : 'none'
                }}>
                  <span><strong>Q{q.questionNumber}</strong></span>
                  <span style={{ color: '#059669' }}>{q.correctAnswer}</span>
                  <span>{q.topic}</span>
                  <span style={{ color: '#7c3aed' }}>{q.difficulty}</span>
                </div>
              ))}
            </div>
            <p style={{ 
              margin: '15px 0 0 0', 
              color: '#666', 
              fontSize: '0.9rem',
              textAlign: 'center'
            }}>
              Total Questions Loaded: <strong>{testData.answerKeyData.length}</strong>
            </p>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={handleSubmit}
          disabled={isCreating || !testData.answerKeyFile}
          style={{
            background: isCreating || !testData.answerKeyFile
              ? '#9ca3af' 
              : 'linear-gradient(135deg, #667eea, #764ba2)',
            color: 'white',
            border: 'none',
            padding: '15px 40px',
            borderRadius: '12px',
            fontSize: '1.2rem',
            fontWeight: '600',
            cursor: isCreating || !testData.answerKeyFile ? 'not-allowed' : 'pointer',
            transition: 'all 0.3s ease'
          }}
        >
          {isCreating ? (
            <>⏳ Creating Mock Test...</>
          ) : (
            <>🚀 Create Mock Test</>
          )}
        </button>
      </div>
    </div>
  )

  // Manage Tests View
  const ManageTestsView = () => (
    <div style={{
      background: 'rgba(255, 255, 255, 0.95)',
      padding: '30px',
      borderRadius: '20px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{ 
        textAlign: 'center', 
        marginBottom: '30px',
        color: '#2d3748'
      }}>
        📋 Manage Mock Tests
      </h2>

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>⏳</div>
          <div>Loading mock tests...</div>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '15px' }}>
          {mockTests.length > 0 ? mockTests.map((test) => (
            <div
              key={test.id}
              style={{
                border: '2px solid #e2e8f0',
                borderRadius: '10px',
                padding: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <h4 style={{ margin: '0 0 5px 0', color: '#2d3748' }}>{test.name}</h4>
                <p style={{ margin: '0 0 5px 0', color: '#666' }}>
                  📅 {new Date(test.test_date).toLocaleDateString()} | 
                  📊 {test.difficulty_level} | 
                  🏢 {test.series_provider}
                </p>
                <div style={{ fontSize: '0.9rem', color: '#4a5568' }}>
                  ⏱️ {test.time_limit} min | 📝 {test.total_questions} questions
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  style={{
                    ...buttonStyle,
                    background: '#4299e1',
                    color: 'white',
                    fontSize: '0.9rem',
                    padding: '8px 16px'
                  }}
                >
                  ✏️ Edit
                </button>
                <button
                  style={{
                    ...buttonStyle,
                    background: '#ed8936',
                    color: 'white',
                    fontSize: '0.9rem',
                    padding: '8px 16px'
                  }}
                >
                  📊 Analytics
                </button>
              </div>
            </div>
          )) : (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '20px' }}>📝</div>
              <h3 style={{ color: '#2d3748', marginBottom: '10px' }}>No Mock Tests Yet</h3>
              <p style={{ color: '#666', marginBottom: '20px' }}>Create your first mock test to get started</p>
              <button
                onClick={() => setCurrentView('create')}
                style={{
                  ...buttonStyle,
                  background: 'linear-gradient(135deg, #667eea, #764ba2)',
                  color: 'white'
                }}
              >
                ➕ Create First Test
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <AdminNavigation />

      {/* Main Content */}
      {currentView === 'overview' && <OverviewDashboard />}
      {currentView === 'create' && <CreateTestView />}
      {currentView === 'tests' && <ManageTestsView />}
      {currentView === 'analytics' && (
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '60px',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
          textAlign: 'center'
        }}>
          <h2 style={{ color: '#2d3748' }}>📈 Analytics Dashboard</h2>
          <p style={{ color: '#666' }}>Coming soon - Advanced analytics and reporting!</p>
        </div>
      )}
    </div>
  )
}

// Reusable Stat Card Component
const StatCard: React.FC<{
  title: string
  value: number
  suffix?: string
  icon: string
  color: string
}> = ({ title, value, suffix = '', icon, color }) => {
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

export default App
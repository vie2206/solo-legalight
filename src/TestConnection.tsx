import React, { useState, useEffect } from 'react'
import { testConnection } from './lib/supabase'

const TestConnection: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<string>('Testing...')
  const [isConnected, setIsConnected] = useState<boolean>(false)

  useEffect(() => {
    const test = async () => {
      const result = await testConnection()
      setConnectionStatus(result.message)
      setIsConnected(result.success)
    }
    test()
  }, [])

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.9)',
      padding: '20px',
      borderRadius: '15px',
      margin: '20px',
      textAlign: 'center'
    }}>
      <h2 style={{ color: '#333', marginBottom: '10px' }}>
        🚀 Level Up V2 - Database Connection
      </h2>
      <div style={{
        padding: '15px',
        borderRadius: '10px',
        background: isConnected ? '#d4edda' : '#f8d7da',
        color: isConnected ? '#155724' : '#721c24',
        border: `1px solid ${isConnected ? '#c3e6cb' : '#f5c6cb'}`
      }}>
        <strong>{isConnected ? '✅' : '❌'} {connectionStatus}</strong>
      </div>
      {isConnected && (
        <p style={{ color: '#666', marginTop: '10px' }}>
          🎉 Ready to build your analytics platform!
        </p>
      )}
    </div>
  )
}

export default TestConnection

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL!
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// TypeScript interfaces for our database
export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  total_tests: number
  average_score: number
  best_score: number
  current_streak: number
  target_nlu?: string
  target_score?: number
  role: string
  joined_date: string
  last_login: string
}

export interface MockTest {
  id: string
  user_id: string
  test_name: string
  score: number
  date_taken: string
  attempted: number
  correct: number
  incorrect: number
  skipped: number
  accuracy: number
  english_score: number
  current_affairs_score: number
  legal_reasoning_score: number
  logical_reasoning_score: number
  quantitative_score: number
  percentile?: number
  predicted_rank?: number
  improvement_score: number
}

// Test database connection
export const testConnection = async () => {
  try {
    const { data, error } = await supabase.from('users').select('count').limit(1)
    if (error) throw error
    return { success: true, message: 'Connected to Supabase!' }
  } catch (error) {
    return { success: false, message: `Connection failed: ${error}` }
  }
}

-- TABLE 3: CREATE PROGRESS TRACKING TABLES
-- Track user progress across all learning activities
-- Run this THIRD in Supabase SQL Editor

-- 1. Create user_progress table (reading progress)
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  passage_id UUID REFERENCES reading_passages(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  time_spent INTEGER, -- in seconds
  reading_speed INTEGER, -- words per minute
  comprehension_score INTEGER, -- percentage
  questions_answered INTEGER DEFAULT 0,
  questions_correct INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, passage_id)
);

-- 2. Create vocabulary_progress table (flashcard system)
CREATE TABLE IF NOT EXISTS vocabulary_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  word_id UUID REFERENCES vocabulary_words(id) ON DELETE CASCADE,
  mastery_level VARCHAR(50) NOT NULL DEFAULT 'new', -- new, learning, reviewing, mastered
  last_reviewed TIMESTAMPTZ,
  next_review TIMESTAMPTZ,
  ease_factor DECIMAL(3,2) DEFAULT 2.5, -- Spaced repetition algorithm
  review_count INTEGER DEFAULT 0,
  correct_streak INTEGER DEFAULT 0,
  total_reviews INTEGER DEFAULT 0,
  total_correct INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, word_id)
);

-- 3. Create challenge_progress table
CREATE TABLE IF NOT EXISTS challenge_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  challenge_id UUID REFERENCES challenges(id) ON DELETE CASCADE,
  progress INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT false,
  claimed BOOLEAN DEFAULT false,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  progress_data JSONB DEFAULT '{}', -- Store detailed progress info
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, challenge_id)
);

-- 4. Create user_analytics table (daily stats)
CREATE TABLE IF NOT EXISTS user_analytics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  reading_time INTEGER DEFAULT 0, -- minutes
  passages_read INTEGER DEFAULT 0,
  words_learned INTEGER DEFAULT 0,
  challenges_completed INTEGER DEFAULT 0,
  quiz_score_avg DECIMAL(5,2) DEFAULT 0,
  vocabulary_reviewed INTEGER DEFAULT 0,
  study_streak_count INTEGER DEFAULT 0,
  xp_earned INTEGER DEFAULT 0,
  achievements_unlocked INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- 5. Create user_achievements table
CREATE TABLE IF NOT EXISTS user_achievements (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  achievement_type VARCHAR(100) NOT NULL,
  achievement_name VARCHAR(255) NOT NULL,
  achievement_description TEXT,
  badge_icon VARCHAR(10),
  points_earned INTEGER DEFAULT 0,
  unlocked_at TIMESTAMPTZ DEFAULT NOW(),
  is_displayed BOOLEAN DEFAULT true,
  achievement_data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. INSERT REAL SAMPLE PROGRESS DATA

-- Sample user progress (assuming user IDs exist)
INSERT INTO user_progress (user_id, passage_id, completed_at, time_spent, reading_speed, comprehension_score, questions_answered, questions_correct)
SELECT 
  u.id as user_id,
  rp.id as passage_id,
  NOW() - INTERVAL '1 day' * FLOOR(RANDOM() * 7) as completed_at,
  FLOOR(RANDOM() * 600) + 300 as time_spent, -- 5-15 minutes
  FLOOR(RANDOM() * 100) + 200 as reading_speed, -- 200-300 WPM
  FLOOR(RANDOM() * 30) + 70 as comprehension_score, -- 70-100%
  FLOOR(RANDOM() * 3) + 2 as questions_answered, -- 2-5 questions
  FLOOR(RANDOM() * 2) + 1 as questions_correct -- 1-3 correct
FROM users u 
CROSS JOIN reading_passages rp
WHERE u.role = 'student' 
LIMIT 20;

-- Sample vocabulary progress (spaced repetition data)
INSERT INTO vocabulary_progress (user_id, word_id, mastery_level, last_reviewed, next_review, ease_factor, review_count, correct_streak, total_reviews, total_correct)
SELECT 
  u.id as user_id,
  vw.id as word_id,
  CASE FLOOR(RANDOM() * 4)
    WHEN 0 THEN 'new'
    WHEN 1 THEN 'learning'  
    WHEN 2 THEN 'reviewing'
    ELSE 'mastered'
  END as mastery_level,
  NOW() - INTERVAL '1 hour' * FLOOR(RANDOM() * 24) as last_reviewed,
  NOW() + INTERVAL '1 hour' * FLOOR(RANDOM() * 48) as next_review,
  ROUND((RANDOM() * 1.5 + 1.3)::NUMERIC, 2) as ease_factor, -- 1.3-2.8
  FLOOR(RANDOM() * 10) + 1 as review_count,
  FLOOR(RANDOM() * 5) as correct_streak,
  FLOOR(RANDOM() * 15) + 1 as total_reviews,
  FLOOR(RANDOM() * 12) + 1 as total_correct
FROM users u 
CROSS JOIN vocabulary_words vw
WHERE u.role = 'student'
LIMIT 50;

-- Sample challenge progress
INSERT INTO challenge_progress (user_id, challenge_id, progress, completed, started_at, progress_data)
SELECT 
  u.id as user_id,
  c.id as challenge_id,
  FLOOR(RANDOM() * c.total_steps) as progress,
  RANDOM() > 0.7 as completed, -- 30% completion rate
  NOW() - INTERVAL '1 day' * FLOOR(RANDOM() * 14) as started_at,
  JSON_BUILD_OBJECT(
    'daily_progress', ARRAY[FLOOR(RANDOM() * 5) + 1, FLOOR(RANDOM() * 5) + 1, FLOOR(RANDOM() * 5) + 1],
    'best_streak', FLOOR(RANDOM() * 7) + 1,
    'average_score', ROUND((RANDOM() * 30 + 70)::NUMERIC, 2)
  ) as progress_data
FROM users u 
CROSS JOIN challenges c
WHERE u.role = 'student'
LIMIT 25;

-- Sample daily analytics
INSERT INTO user_analytics (user_id, date, reading_time, passages_read, words_learned, quiz_score_avg, vocabulary_reviewed, study_streak_count, xp_earned)
SELECT 
  u.id as user_id,
  CURRENT_DATE - INTERVAL '1 day' * generate_series(0, 29) as date, -- Last 30 days
  FLOOR(RANDOM() * 120) + 30 as reading_time, -- 30-150 minutes
  FLOOR(RANDOM() * 5) + 1 as passages_read, -- 1-5 passages
  FLOOR(RANDOM() * 15) + 5 as words_learned, -- 5-20 words
  ROUND((RANDOM() * 30 + 65)::NUMERIC, 2) as quiz_score_avg, -- 65-95%
  FLOOR(RANDOM() * 25) + 10 as vocabulary_reviewed, -- 10-35 words
  FLOOR(RANDOM() * 15) + 1 as study_streak_count, -- 1-15 days
  FLOOR(RANDOM() * 200) + 50 as xp_earned -- 50-250 XP
FROM users u 
WHERE u.role = 'student'
LIMIT 150; -- 5 students × 30 days

-- Sample achievements
INSERT INTO user_achievements (user_id, achievement_type, achievement_name, achievement_description, badge_icon, points_earned, unlocked_at)
SELECT 
  u.id as user_id,
  achievement_types.type,
  achievement_types.name,
  achievement_types.description,
  achievement_types.badge,
  achievement_types.points,
  NOW() - INTERVAL '1 day' * FLOOR(RANDOM() * 30) as unlocked_at
FROM users u
CROSS JOIN (
  VALUES 
    ('reading', 'Speed Reader', 'Achieved 250+ WPM reading speed', '🏃', 100),
    ('vocabulary', 'Word Master', 'Mastered 50 vocabulary words', '📚', 150),
    ('consistency', 'Streak Warrior', 'Maintained 7-day study streak', '🔥', 200),
    ('assessment', 'Quiz Champion', 'Scored 90%+ on 5 consecutive quizzes', '🏆', 250),
    ('challenge', 'Challenge Conqueror', 'Completed first major challenge', '⭐', 300),
    ('social', 'Top Performer', 'Ranked in top 10 on leaderboard', '👑', 400),
    ('milestone', 'Century Club', 'Completed 100 learning activities', '💯', 500)
) AS achievement_types(type, name, description, badge, points)
WHERE u.role = 'student'
LIMIT 35;

-- 7. Create update triggers
CREATE OR REPLACE FUNCTION update_vocabulary_progress_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_vocabulary_progress_updated_at ON vocabulary_progress;
CREATE TRIGGER update_vocabulary_progress_updated_at
    BEFORE UPDATE ON vocabulary_progress
    FOR EACH ROW
    EXECUTE FUNCTION update_vocabulary_progress_updated_at();

CREATE OR REPLACE FUNCTION update_challenge_progress_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_challenge_progress_updated_at ON challenge_progress;
CREATE TRIGGER update_challenge_progress_updated_at
    BEFORE UPDATE ON challenge_progress
    FOR EACH ROW
    EXECUTE FUNCTION update_challenge_progress_updated_at();

-- 8. Create performance indexes
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_completed ON user_progress(completed_at);
CREATE INDEX IF NOT EXISTS idx_vocabulary_progress_user_id ON vocabulary_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_vocabulary_progress_next_review ON vocabulary_progress(next_review);
CREATE INDEX IF NOT EXISTS idx_vocabulary_progress_mastery ON vocabulary_progress(mastery_level);
CREATE INDEX IF NOT EXISTS idx_challenge_progress_user_id ON challenge_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_challenge_progress_completed ON challenge_progress(completed);
CREATE INDEX IF NOT EXISTS idx_user_analytics_user_date ON user_analytics(user_id, date);
CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_type ON user_achievements(achievement_type);

-- Success message
SELECT 'Progress tracking tables created with sample data! Flashcard system ready.' as status;
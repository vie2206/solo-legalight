-- TABLE 2: CREATE CONTENT TABLES
-- Reading passages, vocabulary, GK questions for CLAT preparation
-- Run this SECOND in Supabase SQL Editor

-- 1. Create reading_passages table
CREATE TABLE IF NOT EXISTS reading_passages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  type VARCHAR(100) NOT NULL, -- Current Affairs, Legal, Historical, etc.
  source VARCHAR(255),
  difficulty VARCHAR(50) NOT NULL, -- Beginner, Intermediate, Advanced
  estimated_time VARCHAR(50),
  word_count INTEGER,
  tags TEXT[],
  ai_complexity DECIMAL(3,1),
  content TEXT NOT NULL,
  vocabulary JSONB,
  questions JSONB,
  reading_tips TEXT[],
  difficulty_factors TEXT[],
  created_by UUID REFERENCES users(id),
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create vocabulary_words table
CREATE TABLE IF NOT EXISTS vocabulary_words (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  word VARCHAR(255) NOT NULL UNIQUE,
  definition TEXT NOT NULL,
  context TEXT,
  etymology TEXT,
  difficulty VARCHAR(50) NOT NULL,
  category VARCHAR(100) NOT NULL,
  synonyms TEXT[],
  antonyms TEXT[],
  usage_example TEXT,
  mnemonics TEXT,
  frequency VARCHAR(50),
  clat_relevance INTEGER CHECK (clat_relevance BETWEEN 1 AND 10),
  examples TEXT[],
  created_by UUID REFERENCES users(id),
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create gk_questions table
CREATE TABLE IF NOT EXISTS gk_questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_answer INTEGER NOT NULL,
  category VARCHAR(100) NOT NULL,
  difficulty VARCHAR(50) NOT NULL,
  points INTEGER DEFAULT 10,
  explanation TEXT,
  source VARCHAR(255),
  tags TEXT[],
  created_by UUID REFERENCES users(id),
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create challenges table
CREATE TABLE IF NOT EXISTS challenges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  difficulty VARCHAR(50) NOT NULL,
  reward INTEGER NOT NULL,
  total_steps INTEGER NOT NULL,
  challenge_type VARCHAR(100) NOT NULL,
  time_limit INTEGER,
  requirements JSONB NOT NULL,
  completion_criteria TEXT NOT NULL,
  icon VARCHAR(10),
  category VARCHAR(100) NOT NULL,
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. INSERT REAL SAMPLE DATA

-- Insert sample reading passages
INSERT INTO reading_passages (title, type, source, difficulty, estimated_time, word_count, content, vocabulary, questions, tags) VALUES
('The Evolution of Indian Constitutional Law', 'Legal', 'Supreme Court Judgments', 'Advanced', '15 minutes', 800, 
'The Indian Constitution, adopted on January 26, 1950, has undergone significant evolution through judicial interpretation and amendments. The Supreme Court has played a pivotal role in shaping constitutional jurisprudence through landmark cases like Kesavananda Bharati, Maneka Gandhi, and Minerva Mills. These cases established the doctrine of basic structure, expanded the scope of Article 21, and reinforced the balance between legislative power and constitutional limitations...', 
'{"jurisprudence": "The science or philosophy of law", "precedent": "A legal principle established in a previous case", "doctrine": "A principle or set of principles held by a legal system"}',
'[{"question": "What is the significance of the Kesavananda Bharati case?", "options": ["Established basic structure doctrine", "Expanded Article 21", "Created judicial review", "All of the above"], "correct": 0, "explanation": "The Kesavananda Bharati case established the basic structure doctrine."}]',
'{"legal", "constitutional", "supreme-court", "advanced"}'),

('Climate Change and International Law', 'Current Affairs', 'UN Climate Reports', 'Intermediate', '12 minutes', 650,
'The Paris Agreement of 2015 marked a watershed moment in international climate law. Unlike its predecessor, the Kyoto Protocol, the Paris Agreement adopted a bottom-up approach where countries voluntarily set their Nationally Determined Contributions (NDCs). The principle of "common but differentiated responsibilities" remains central to climate negotiations, acknowledging that developed nations bear greater historical responsibility for greenhouse gas emissions...',
'{"watershed": "A critical point that marks a division or a change of direction", "protocol": "An official procedure or system of rules", "differentiated": "Recognized as different"}',
'[{"question": "What approach did the Paris Agreement adopt?", "options": ["Top-down", "Bottom-up", "Lateral", "Hybrid"], "correct": 1, "explanation": "The Paris Agreement adopted a bottom-up approach with voluntary NDCs."}]',
'{"climate", "international-law", "paris-agreement", "current-affairs"}'),

('The Philosophy of Rights in Modern Democracy', 'Political Science', 'Academic Journal', 'Advanced', '18 minutes', 950,
'John Rawls theory of justice, articulated in "A Theory of Justice" (1971), revolutionized political philosophy by proposing the concept of the "original position" and the "veil of ignorance." Rawls argued that rational individuals, unaware of their position in society, would choose principles that ensure fairness for all. This theoretical framework challenges utilitarian approaches and provides a foundation for understanding distributive justice in liberal democracies...',
'{"utilitarian": "Concerned with usefulness and practical results", "distributive": "Concerned with the supply and allocation of goods", "articulated": "Having joints; expressed clearly"}',
'[{"question": "What is the veil of ignorance in Rawls theory?", "options": ["A method of decision-making", "A type of government", "A philosophical concept", "A legal principle"], "correct": 2, "explanation": "The veil of ignorance is a philosophical concept used in Rawls theory of justice."}]',
'{"philosophy", "rawls", "justice", "democracy", "political-theory"}');

-- Insert sample vocabulary words
INSERT INTO vocabulary_words (word, definition, difficulty, category, synonyms, antonyms, usage_example, mnemonics, clat_relevance, examples) VALUES
('Jurisprudence', 'The theory or philosophy of law; the science of law', 'Advanced', 'Legal', '{"legal theory", "legal philosophy", "law"}', '{"lawlessness", "anarchy"}', 'The professor specialized in constitutional jurisprudence.', 'Juris (law) + prudence (wisdom) = wisdom of law', 9, '{"The jurisprudence of the Supreme Court", "Comparative jurisprudence studies"}'),

('Precedent', 'An earlier event or action that is regarded as an example or guide for similar circumstances', 'Intermediate', 'Legal', '{"example", "model", "standard"}', '{"innovation", "departure"}', 'The court followed the precedent set in the landmark case.', 'Pre (before) + cedent (going) = something that goes before', 10, '{"Legal precedent", "Setting a precedent", "Breaking with precedent"}'),

('Hegemony', 'Leadership or dominance, especially by one country or social group over others', 'Advanced', 'Political', '{"dominance", "supremacy", "control"}', '{"subjugation", "subordination"}', 'The cultural hegemony of Western values in global media.', 'Think of "hedge money" - controlling influence', 8, '{"Cultural hegemony", "Political hegemony", "Economic hegemony"}'),

('Dichotomy', 'A division or contrast between two things that are represented as being opposed or entirely different', 'Intermediate', 'General', '{"division", "contrast", "opposition"}', '{"unity", "similarity", "agreement"}', 'There is a false dichotomy between freedom and security.', 'Di (two) + chotomy (cutting) = cutting into two parts', 7, '{"False dichotomy", "Binary dichotomy", "Stark dichotomy"}'),

('Paradigm', 'A typical example or pattern of something; a worldview underlying theories and methodology', 'Advanced', 'Academic', '{"model", "framework", "template"}', '{"anomaly", "exception"}', 'The discovery led to a paradigm shift in scientific thinking.', 'Para (beside) + digm (example) = example to follow', 8, '{"Paradigm shift", "Scientific paradigm", "Dominant paradigm"}');

-- Insert sample GK questions  
INSERT INTO gk_questions (question, options, correct_answer, category, difficulty, explanation, source, tags) VALUES
('Who was the first woman Chief Justice of India?', '["Fathima Beevi", "Sujata Manohar", "Ruma Pal", "None of the above"]', 3, 'Indian Judiciary', 'Intermediate', 'No woman has served as Chief Justice of India yet. Fathima Beevi was the first woman judge of the Supreme Court.', 'Judiciary Records', '{"judiciary", "women", "chief-justice", "firsts"}'),

('The Paris Agreement came into force in which year?', '["2015", "2016", "2017", "2018"]', 1, 'International Affairs', 'Easy', 'The Paris Agreement was adopted in 2015 but came into force on November 4, 2016.', 'UN Climate Reports', '{"climate", "paris-agreement", "international", "environment"}'),

('Article 356 of the Indian Constitution deals with?', '["Emergency provisions", "Presidents rule", "Fundamental rights", "Directive principles"]', 1, 'Indian Constitution', 'Intermediate', 'Article 356 empowers the President to impose Presidents rule in a state if constitutional machinery fails.', 'Constitution of India', '{"constitution", "article-356", "presidents-rule", "emergency"}'),

('The term "Rule of Law" was popularized by which jurist?', '["A.V. Dicey", "H.L.A. Hart", "Ronald Dworkin", "John Austin"]', 0, 'Legal Theory', 'Advanced', 'A.V. Dicey popularized the concept of Rule of Law in his work "Introduction to the Study of the Law of the Constitution".', 'Legal Literature', '{"rule-of-law", "dicey", "legal-theory", "constitution"}'),

('Which fundamental right is considered the "heart and soul" of the Constitution?', '["Right to Equality", "Right to Constitutional Remedies", "Right to Freedom", "Right to Life"]', 1, 'Fundamental Rights', 'Easy', 'Dr. B.R. Ambedkar called Article 32 (Right to Constitutional Remedies) the "heart and soul" of the Constitution.', 'Constitutional Debates', '{"fundamental-rights", "article-32", "ambedkar", "constitutional-remedies"}');

-- Insert sample challenges
INSERT INTO challenges (title, description, difficulty, reward, total_steps, challenge_type, requirements, completion_criteria, icon, category) VALUES
('Legal Eagle', 'Master 50 legal terminology words and their usage in context', 'Intermediate', 500, 50, 'vocabulary', '{"words_to_master": 50, "category": "legal", "accuracy_required": 85}', 'Achieve 85% accuracy in legal vocabulary flashcards over 50 words', '⚖️', 'Legal'),

('Current Affairs Champion', 'Read and analyze 20 current affairs passages this month', 'Easy', 300, 20, 'reading', '{"passages_required": 20, "category": "current_affairs", "time_limit": 30}', 'Complete 20 current affairs passages with comprehension score above 75%', '📰', 'Current Affairs'),

('Constitutional Scholar', 'Answer 100 constitutional law questions correctly', 'Advanced', 1000, 100, 'quiz', '{"questions_required": 100, "category": "constitutional_law", "accuracy_required": 90}', 'Score 90% or higher on 100 constitutional law questions', '📜', 'Constitutional Law'),

('Speed Reader', 'Improve reading speed to 300 words per minute', 'Intermediate', 400, 10, 'skill_building', '{"target_wpm": 300, "passages_required": 10, "current_wpm_min": 200}', 'Achieve consistent 300 WPM reading speed across 10 different passages', '🏃', 'Reading Skills'),

('Mock Test Warrior', 'Complete 10 full-length mock tests with improvement in each', 'Advanced', 800, 10, 'assessment', '{"tests_required": 10, "improvement_required": true, "min_score": 120}', 'Complete 10 mock tests showing progressive improvement with final score above 120', '🎯', 'Assessment');

-- 6. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_reading_passages_difficulty ON reading_passages(difficulty);
CREATE INDEX IF NOT EXISTS idx_reading_passages_type ON reading_passages(type);
CREATE INDEX IF NOT EXISTS idx_reading_passages_status ON reading_passages(status);
CREATE INDEX IF NOT EXISTS idx_vocabulary_words_difficulty ON vocabulary_words(difficulty);
CREATE INDEX IF NOT EXISTS idx_vocabulary_words_category ON vocabulary_words(category);
CREATE INDEX IF NOT EXISTS idx_gk_questions_category ON gk_questions(category);
CREATE INDEX IF NOT EXISTS idx_gk_questions_difficulty ON gk_questions(difficulty);
CREATE INDEX IF NOT EXISTS idx_challenges_active ON challenges(is_active);
CREATE INDEX IF NOT EXISTS idx_challenges_category ON challenges(category);

-- Success message
SELECT 'Content tables created with sample data! Reading system ready.' as status;
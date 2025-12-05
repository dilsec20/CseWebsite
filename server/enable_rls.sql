-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_cases ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE contest_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE contest_problems ENABLE ROW LEVEL SECURITY;
ALTER TABLE dsa_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE dsa_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE password_reset_tokens ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts (if any)
DROP POLICY IF EXISTS "Public read access for problems" ON problems;
DROP POLICY IF EXISTS "Public read access for test_cases" ON test_cases;
DROP POLICY IF EXISTS "Users can view own data" ON users;
DROP POLICY IF EXISTS "Public profile view" ON users;
DROP POLICY IF EXISTS "Users can view own submissions" ON submissions;
DROP POLICY IF EXISTS "Users can create submissions" ON submissions;
DROP POLICY IF EXISTS "Public read access for quizzes" ON quizzes;
DROP POLICY IF EXISTS "Public read access for quiz questions" ON quiz_questions;
DROP POLICY IF EXISTS "Public read access for quiz options" ON quiz_options;
DROP POLICY IF EXISTS "Users can view own quiz results" ON quiz_results;
DROP POLICY IF EXISTS "Users can create quiz results" ON quiz_results;
DROP POLICY IF EXISTS "Users can view own contest sessions" ON contest_sessions;
DROP POLICY IF EXISTS "Users can view own contest problems" ON contest_problems;
DROP POLICY IF EXISTS "Public read access for DSA modules" ON dsa_modules;
DROP POLICY IF EXISTS "Public read access for DSA topics" ON dsa_topics;
DROP POLICY IF EXISTS "Users can view own progress" ON user_progress;

-- Define Policies

-- Problems: Everyone can read
CREATE POLICY "Public read access for problems" ON problems
    FOR SELECT USING (true);

-- Test Cases: Everyone can read (backend usually filters hidden ones, but strictly speaking public access is okay for non-hidden)
-- For simplicity, public read. Backend logic handles hidden cases.
CREATE POLICY "Public read access for test_cases" ON test_cases
    FOR SELECT USING (true);

-- Users: 
-- 1. Users can read/update their own data
CREATE POLICY "Users can view own data" ON users
    FOR ALL USING (auth.uid() = user_id);

-- 2. Public can view basic profile info (handled by SELECT restrictions in API usually, preventing select * helps)
-- But for RLS, we often just allow SELECT if we want public profiles.
-- Better pattern: Allow SELECT for all, restrict sensitive columns via API.
CREATE POLICY "Public profile view" ON users
    FOR SELECT USING (true);

-- Submissions:
-- Users can see their own submissions
CREATE POLICY "Users can view own submissions" ON submissions
    FOR SELECT USING (auth.uid() = user_id);
    
-- Users can create submissions
CREATE POLICY "Users can create submissions" ON submissions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Quizzes: Public read
CREATE POLICY "Public read access for quizzes" ON quizzes
    FOR SELECT USING (true);

CREATE POLICY "Public read access for quiz questions" ON quiz_questions
    FOR SELECT USING (true);

CREATE POLICY "Public read access for quiz options" ON quiz_options
    FOR SELECT USING (true);

-- Quiz Results: Own data only
CREATE POLICY "Users can view own quiz results" ON quiz_results
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create quiz results" ON quiz_results
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Contests: Own session data only
CREATE POLICY "Users can view own contest sessions" ON contest_sessions
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own contest problems" ON contest_problems
    FOR ALL USING (session_id IN (SELECT session_id FROM contest_sessions WHERE user_id = auth.uid()));

-- DSA: Public read
CREATE POLICY "Public read access for DSA modules" ON dsa_modules
    FOR SELECT USING (true);

CREATE POLICY "Public read access for DSA topics" ON dsa_topics
    FOR SELECT USING (true);

-- User Progress: Own data
CREATE POLICY "Users can view own progress" ON user_progress
    FOR ALL USING (auth.uid() = user_id);

-- Password Reset Tokens: System level mostly, but maybe user read?
-- Actually, strict RLS might block backend if not superuser.
-- We'll allow explicit user access if ID matches.
CREATE POLICY "Users can view own reset tokens" ON password_reset_tokens
    FOR ALL USING (auth.uid() = user_id);

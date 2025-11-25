-- Drop existing tables if they exist (in reverse order of dependencies)
DROP TABLE IF EXISTS contest_problems CASCADE;
DROP TABLE IF EXISTS contest_sessions CASCADE;  
DROP TABLE IF EXISTS quiz_results CASCADE;
DROP TABLE IF EXISTS quiz_options CASCADE;
DROP TABLE IF EXISTS quiz_questions CASCADE;
DROP TABLE IF EXISTS quizzes CASCADE;
DROP TABLE IF EXISTS submissions CASCADE;
DROP TABLE IF EXISTS test_cases CASCADE;
DROP TABLE IF EXISTS problems CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Users table for authentication
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_name VARCHAR(100) NOT NULL,
    user_email VARCHAR(255) UNIQUE NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    username VARCHAR(100) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    bio TEXT,
    profile_picture TEXT,
    linkedin_url VARCHAR(255),
    github_url VARCHAR(255),
    website_url VARCHAR(255),
    twitter_url VARCHAR(255),
    about TEXT,
    full_name VARCHAR(255),
    role VARCHAR(50) DEFAULT 'user'
);

-- Problems table  
CREATE TABLE problems (
    problem_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    difficulty VARCHAR(20) CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
    topic VARCHAR(100) NOT NULL,
    test_case_input TEXT,
    test_case_output TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Test Cases table
CREATE TABLE test_cases (
    test_case_id SERIAL PRIMARY KEY,
    problem_id INTEGER REFERENCES problems(problem_id) ON DELETE CASCADE,
    input TEXT NOT NULL,
    expected_output TEXT NOT NULL,
    is_hidden BOOLEAN DEFAULT FALSE,
    is_sample BOOLEAN DEFAULT FALSE,
    test_case_order INTEGER
);

-- Submissions table to track user progress
CREATE TABLE submissions (
    submission_id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    problem_id INTEGER REFERENCES problems(problem_id) ON DELETE CASCADE,
    code TEXT NOT NULL,
    language VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quizzes table
CREATE TABLE quizzes (
    quiz_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quiz questions table
CREATE TABLE quiz_questions (
    question_id SERIAL PRIMARY KEY,
    quiz_id INTEGER REFERENCES quizzes(quiz_id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Quiz options table
CREATE TABLE quiz_options (
    option_id SERIAL PRIMARY KEY,
    question_id INTEGER REFERENCES quiz_questions(question_id) ON DELETE CASCADE,
    option_text TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE
);

-- Quiz results table to track user quiz scores
CREATE TABLE quiz_results (
    result_id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    quiz_id INTEGER REFERENCES quizzes(quiz_id) ON DELETE CASCADE,
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contest sessions table
CREATE TABLE contest_sessions (
    session_id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
    start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP,
    status VARCHAR(50) DEFAULT 'active'
);

-- Contest problems mapping
CREATE TABLE contest_problems (
    contest_problem_id SERIAL PRIMARY KEY,
    session_id INTEGER REFERENCES contest_sessions(session_id) ON DELETE CASCADE,
    problem_id INTEGER REFERENCES problems(problem_id) ON DELETE CASCADE,
    solved BOOLEAN DEFAULT FALSE
);

-- Create indexes for better performance
CREATE INDEX idx_problems_difficulty ON problems(difficulty);
CREATE INDEX idx_problems_topic ON problems(topic);
CREATE INDEX idx_submissions_user_id ON submissions(user_id);
CREATE INDEX idx_submissions_problem_id ON submissions(problem_id);
CREATE INDEX idx_quiz_results_user_id ON quiz_results(user_id);

-- DSA Learning Path Tables
CREATE TABLE IF NOT EXISTS dsa_modules (
    module_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    order_index INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS dsa_topics (
    topic_id SERIAL PRIMARY KEY,
    module_id INTEGER REFERENCES dsa_modules(module_id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    problem_id INTEGER REFERENCES problems(problem_id) ON DELETE SET NULL,
    order_index INTEGER NOT NULL
);

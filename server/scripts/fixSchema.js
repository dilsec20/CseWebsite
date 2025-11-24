const pool = require('../db');

const fixSchema = async () => {
    try {
        console.log('Fixing schema...');

        // 1. Ensure submissions table has correct columns and lengths
        await pool.query(`
            ALTER TABLE submissions 
            ALTER COLUMN status TYPE VARCHAR(50),
            ALTER COLUMN language TYPE VARCHAR(50);
        `);
        console.log('Updated submissions table schema');

        // 2. Ensure user_progress table exists
        await pool.query(`
            CREATE TABLE IF NOT EXISTS user_progress (
                progress_id SERIAL PRIMARY KEY,
                user_id UUID REFERENCES users(user_id),
                problem_id INTEGER REFERENCES problems(problem_id),
                solved BOOLEAN DEFAULT FALSE,
                last_attempted TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(user_id, problem_id)
            );
        `);
        console.log('Ensured user_progress table exists');

    } catch (err) {
        console.error('Error fixing schema:', err.message);
    } finally {
        pool.end();
    }
};

fixSchema();

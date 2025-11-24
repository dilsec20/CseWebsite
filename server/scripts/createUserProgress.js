const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'dilip',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'placement_prep',
});

async function createUserProgressTable() {
    const client = await pool.connect();
    try {
        console.log('Creating user_progress table...');

        await client.query(`
            CREATE TABLE IF NOT EXISTS user_progress (
                progress_id SERIAL PRIMARY KEY,
                user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
                problem_id INTEGER REFERENCES problems(problem_id) ON DELETE CASCADE,
                solved BOOLEAN DEFAULT FALSE,
                attempts INTEGER DEFAULT 0,
                last_attempted TIMESTAMP DEFAULT NOW(),
                created_at TIMESTAMP DEFAULT NOW(),
                UNIQUE(user_id, problem_id)
            );
        `);

        console.log('✅ user_progress table created successfully!');

        // Create index for faster queries
        await client.query(`
            CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
            CREATE INDEX IF NOT EXISTS idx_user_progress_problem_id ON user_progress(problem_id);
        `);

        console.log('✅ Indexes created!');

    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        client.release();
        pool.end();
    }
}

createUserProgressTable();

const { Pool } = require('pg');

const supabasePassword = encodeURIComponent("05Supabase@@??");
const supabaseConnectionString = `postgresql://postgres:${supabasePassword}@db.xlqzqcqacpajpqwneqpa.supabase.co:5432/postgres`;

async function createTables() {
    const pool = new Pool({
        connectionString: supabaseConnectionString,
        ssl: { rejectUnauthorized: false }
    });

    try {
        console.log("Creating user_progress table...");
        await pool.query(`
            CREATE TABLE IF NOT EXISTS user_progress (
                user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
                problem_id INTEGER REFERENCES problems(problem_id) ON DELETE CASCADE,
                solved BOOLEAN DEFAULT FALSE,
                last_attempted TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (user_id, problem_id)
            );
        `);

        console.log("Creating password_reset_tokens table...");
        await pool.query(`
            CREATE TABLE IF NOT EXISTS password_reset_tokens (
                token_id SERIAL PRIMARY KEY,
                user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
                token VARCHAR(255) NOT NULL,
                expires_at TIMESTAMP NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        console.log("✅ Tables created successfully!");
    } catch (err) {
        console.error("❌ Table creation failed:", err.message);
    } finally {
        await pool.end();
    }
}

createTables();

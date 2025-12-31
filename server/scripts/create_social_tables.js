const pool = require('../db');

async function run() {
    try {
        console.log("Creating social tables (follows, messages)...");

        // 1. Follows Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS follows (
                follower_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
                following_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (follower_id, following_id)
            );
        `);

        // 2. Messages Table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS messages (
                message_id SERIAL PRIMARY KEY,
                sender_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
                receiver_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
                content TEXT NOT NULL,
                is_read BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        console.log("✅ Social tables created successfully.");
        process.exit(0);
    } catch (e) {
        console.error("❌ Error creating lists:", e);
        process.exit(1);
    }
}

run();

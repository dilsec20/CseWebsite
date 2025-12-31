const pool = require('../db');

async function run() {
    try {
        console.log("Creating blogs table...");
        
        await pool.query(`
            CREATE TABLE IF NOT EXISTS blogs (
                blog_id SERIAL PRIMARY KEY,
                user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                likes INT DEFAULT 0
            );
        `);
        
        console.log("✅ blogs table created successfully.");
        process.exit(0);
    } catch (e) {
        console.error("❌ Error creating table:", e);
        process.exit(1);
    }
}

run();

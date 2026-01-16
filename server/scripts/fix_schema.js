const pool = require('../db');

const fixSchema = async () => {
    console.log("🛠️ Starting Schema Fix...");
    try {
        // 1. Add 'likes' column to blogs if it doesn't exist
        await pool.query(`
            DO $$ 
            BEGIN 
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='blogs' AND column_name='likes') THEN 
                    ALTER TABLE blogs ADD COLUMN likes INT DEFAULT 0; 
                    RAISE NOTICE 'Added likes column to blogs';
                END IF; 
            END $$;
        `);

        // 2. Create blog_upvotes table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS blog_upvotes (
                blog_id INT REFERENCES blogs(blog_id) ON DELETE CASCADE,
                user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (blog_id, user_id)
            );
        `);

        // 3. Create blog_comments table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS blog_comments (
                comment_id SERIAL PRIMARY KEY,
                blog_id INT REFERENCES blogs(blog_id) ON DELETE CASCADE,
                user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
                content TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        console.log("✅ Schema successfully verified/updated.");
    } catch (err) {
        console.error("❌ Schema Fix Error:", err.message);
    }
};

module.exports = fixSchema;

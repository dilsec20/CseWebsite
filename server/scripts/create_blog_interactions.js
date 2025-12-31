const pool = require('../db');
require('dotenv').config();

const createBlogInteractiosTables = async () => {
    try {
        console.log("Creating blog interaction tables...");

        // 0. Ensure 'likes' column exists in blogs
        await pool.query(`
            DO $$ 
            BEGIN 
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='blogs' AND column_name='likes') THEN 
                    ALTER TABLE blogs ADD COLUMN likes INT DEFAULT 0; 
                END IF; 
            END $$;
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS blog_upvotes (
                blog_id INT REFERENCES blogs(blog_id) ON DELETE CASCADE,
                user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (blog_id, user_id)
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS blog_comments (
                comment_id SERIAL PRIMARY KEY,
                blog_id INT REFERENCES blogs(blog_id) ON DELETE CASCADE,
                user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
                content TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        console.log("✅ Blog interaction tables created successfully.");
    } catch (err) {
        console.error("❌ Error creating tables:", err.message);
    } finally {
        pool.end();
    }
};

createBlogInteractiosTables();

const pool = require('../db');
require('dotenv').config();

const updateBlogsSchema = async () => {
    try {
        console.log("Updating blogs table schema...");

        // Add views column if it doesn't exist
        await pool.query(`
            DO $$ 
            BEGIN 
                IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='blogs' AND column_name='views') THEN 
                    ALTER TABLE blogs ADD COLUMN views INT DEFAULT 0; 
                END IF; 
            END $$;
        `);

        console.log("✅ Blogs schema updated successfully (views column added).");
    } catch (err) {
        console.error("❌ Error updating blogs schema:", err.message);
    } finally {
        pool.end();
    }
};

updateBlogsSchema();

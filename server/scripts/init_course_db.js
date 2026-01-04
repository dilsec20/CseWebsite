const pool = require("../db");

async function initCourseDB() {
    try {
        console.log("Starting Course DB Initialization...");

        // 0. Enable UUID extension
        await pool.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        console.log("Enabled uuid-ossp extension.");

        // 1. Add role to users if not exists
        await pool.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='users' AND column_name='role') THEN
          ALTER TABLE users ADD COLUMN role VARCHAR(50) DEFAULT 'user';
        END IF;
      END $$;
    `);
        console.log("Verified users table role column.");

        // 2. Create courses table
        await pool.query(`
      CREATE TABLE IF NOT EXISTS courses (
        course_id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        thumbnail_url TEXT,
        instructor VARCHAR(255),
        price DECIMAL(10, 2) DEFAULT 0,
        category VARCHAR(100),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_by UUID REFERENCES users(user_id)
      );
    `);
        console.log("Created courses table.");

        // 3. Create course_videos table
        await pool.query(`
      CREATE TABLE IF NOT EXISTS course_videos (
        video_id SERIAL PRIMARY KEY,
        course_id UUID REFERENCES courses(course_id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        video_url TEXT NOT NULL,
        order_index INT DEFAULT 0,
        description TEXT
      );
    `);
        console.log("Created course_videos table.");

        // 4. Create enrollments table
        await pool.query(`
      CREATE TABLE IF NOT EXISTS enrollments (
        enrollment_id SERIAL PRIMARY KEY,
        user_id UUID REFERENCES users(user_id) ON DELETE CASCADE,
        course_id UUID REFERENCES courses(course_id) ON DELETE CASCADE,
        enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        progress INT DEFAULT 0, -- Videos watched count or percentage
        completed_videos INT[] DEFAULT '{}', -- Array of completed video IDs
        UNIQUE(user_id, course_id)
      );
    `);
        console.log("Created enrollments table.");

        console.log("Course DB Initialization Complete!");
        process.exit(0);
    } catch (err) {
        console.error("Error initializing course DB:", err);
        process.exit(1);
    }
}

initCourseDB();

const pool = require("../db");

async function migrateModules() {
    try {
        console.log("Starting Module Migration...");

        // 1. Create course_modules table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS course_modules (
                module_id SERIAL PRIMARY KEY,
                course_id UUID REFERENCES courses(course_id) ON DELETE CASCADE,
                title VARCHAR(255) NOT NULL,
                order_index INT DEFAULT 0
            );
        `);
        console.log("Created course_modules table.");

        // 2. Add module_id to course_videos
        await pool.query(`
            ALTER TABLE course_videos 
            ADD COLUMN IF NOT EXISTS module_id INT REFERENCES course_modules(module_id) ON DELETE CASCADE;
        `);
        console.log("Added module_id to course_videos.");

        // 3. Backfill: Create a default module for existing courses and move videos
        const courses = await pool.query("SELECT course_id FROM courses");

        for (const course of courses.rows) {
            // Check if modules already exist
            const modules = await pool.query("SELECT * FROM course_modules WHERE course_id = $1", [course.course_id]);

            if (modules.rows.length === 0) {
                // Create Default Module
                const newModule = await pool.query(
                    "INSERT INTO course_modules (course_id, title, order_index) VALUES ($1, $2, 0) RETURNING module_id",
                    [course.course_id, "General"]
                );
                const moduleId = newModule.rows[0].module_id;

                // Update videos to this module
                await pool.query(
                    "UPDATE course_videos SET module_id = $1 WHERE course_id = $2 AND module_id IS NULL",
                    [moduleId, course.course_id]
                );
                console.log(`Migrated course ${course.course_id} to Module ID ${moduleId}`);
            }
        }

        console.log("Migration Complete!");
        process.exit(0);
    } catch (err) {
        console.error("Migration Failed:", err);
        process.exit(1);
    }
}

migrateModules();

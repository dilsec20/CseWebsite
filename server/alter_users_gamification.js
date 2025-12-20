const pool = require('./db');

async function applyGamificationSchema() {
    try {
        console.log("Applying Gamification Schema Updates...");

        // 1. Add columns if they don't exist
        await pool.query(`
            ALTER TABLE users 
            ADD COLUMN IF NOT EXISTS current_streak INT DEFAULT 0,
            ADD COLUMN IF NOT EXISTS last_solved_at TIMESTAMP,
            ADD COLUMN IF NOT EXISTS total_solved INT DEFAULT 0;
        `);
        console.log("✅ Columns added/verified.");

        // 2. Backfill total_solved from submissions
        console.log("Backfilling total_solved...");
        const updateRes = await pool.query(`
            WITH user_counts AS (
                SELECT user_id, COUNT(DISTINCT problem_id) as solved_count
                FROM submissions
                WHERE status = 'Accepted' OR status = 'Success' -- Adjust based on actual status values
                GROUP BY user_id
            )
            UPDATE users
            SET total_solved = user_counts.solved_count
            FROM user_counts
            WHERE users.user_id = user_counts.user_id;
        `);
        console.log(`✅ Backfilled total_solved for ${updateRes.rowCount} users.`);

    } catch (e) {
        console.error("Error applying schema:", e);
    } finally {
        pool.end();
    }
}

applyGamificationSchema();

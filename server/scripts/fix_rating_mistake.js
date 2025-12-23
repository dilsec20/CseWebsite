const pool = require("../db");

async function fixRatingMistake() {
    try {
        console.log("Starting rating fix migration...");

        // 1. Update the table schema to default to 0
        console.log("Altering users table default rating to 0...");
        await pool.query("ALTER TABLE users ALTER COLUMN rating SET DEFAULT 0");

        // 2. Reset existing users to 0 (if they are 1200 and haven't participated? Or just everyone?)
        // Safer to reset everyone since system is new and likely no real contests yet.
        // User said "mistakly givage all" implying everyone has it.
        console.log("Resetting all users rating to 0...");
        await pool.query("UPDATE users SET rating = 0 WHERE rating = 1200"); // Only reset strict 1200s to avoid wiping manual changes if any

        console.log("Migration completed successfully.");
        process.exit(0);
    } catch (err) {
        console.error("Migration failed:", err.message);
        process.exit(1);
    }
}

fixRatingMistake();

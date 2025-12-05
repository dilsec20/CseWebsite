const pool = require('../db');

async function addRoleColumn() {
    try {
        await pool.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'user'");
        console.log("Successfully added 'role' column to users table.");
    } catch (err) {
        console.error("Error adding column:", err.message);
    } finally {
        pool.end();
    }
}

addRoleColumn();

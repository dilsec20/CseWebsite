const pool = require('../db');

async function countUsers() {
    try {
        const result = await pool.query("SELECT COUNT(*) FROM users");
        console.log(`\n================================`);
        console.log(`Total Registered Users: ${result.rows[0].count}`);
        console.log(`================================\n`);
    } catch (err) {
        console.error("Error counting users:", err.message);
    } finally {
        pool.end();
    }
}

countUsers();

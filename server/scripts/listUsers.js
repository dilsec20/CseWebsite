const pool = require('../db');

async function listUsers() {
    try {
        const res = await pool.query("SELECT user_name FROM users LIMIT 5");
        console.log("Users:", res.rows);
    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
}

listUsers();

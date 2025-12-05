const pool = require('../db');

async function findUser() {
    try {
        const result = await pool.query("SELECT username, user_name FROM users WHERE username ILIKE '%dilip%' OR user_name ILIKE '%dilip%'");
        console.log("\n--- Found Users ---");
        result.rows.forEach(u => {
            console.log(`Username: '${u.username}', Name: '${u.user_name}'`);
        });
        console.log("-------------------\n");
    } catch (err) {
        console.error(err.message);
    } finally {
        pool.end();
    }
}

findUser();

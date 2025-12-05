const pool = require('../db');

async function listUsers() {
    try {
        const result = await pool.query("SELECT username, user_name, user_email FROM users");
        console.log("\n--- Registered Users ---");
        result.rows.forEach(u => {
            console.log(`Username: '${u.username}', Name: '${u.user_name}', Email: '${u.user_email}'`);
        });
        console.log("------------------------\n");
    } catch (err) {
        console.error("Error:", err.message);
    } finally {
        pool.end();
    }
}

listUsers();

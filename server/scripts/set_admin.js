const pool = require('../db');
require('dotenv').config();

const username = process.argv[2];

if (!username) {
    console.error("Please provide a username.");
    console.error("Usage: node server/scripts/set_admin.js <username>");
    process.exit(1);
}

const setAdmin = async () => {
    try {
        const user = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

        if (user.rows.length === 0) {
            console.log(`User '${username}' not found.`);
            return;
        }

        await pool.query("UPDATE users SET role = 'admin' WHERE username = $1", [username]);
        console.log(`Success! User '${username}' is now an Admin.`);
    } catch (err) {
        console.error(err.message);
    } finally {
        pool.end();
    }
};

setAdmin();

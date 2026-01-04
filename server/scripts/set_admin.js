const pool = require("../db");

const input = process.argv[2];

if (!input) {
    console.error("Please provide a username or email. Usage: node scripts/set_admin.js <username_or_email>");
    process.exit(1);
}

async function setAdmin() {
    try {
        const res = await pool.query(
            "UPDATE users SET role = 'admin' WHERE username = $1 OR user_email = $1 RETURNING *",
            [input]
        );

        if (res.rows.length === 0) {
            console.log(`User '${input}' not found.`);
        } else {
            console.log(`User '${res.rows[0].username}' (Email: ${res.rows[0].user_email}) is now an Admin!`);
        }
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

setAdmin();

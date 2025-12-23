const pool = require('../db');

async function makeAdmin() {
    try {
        const email = 'dilipkumar2832005@gmail.com';
        console.log(`Making ${email} an admin...`);

        // 1. Check if column exists (optional but safe) or just update
        // We will just update assuming schema is correct as per dashboard.js
        const res = await pool.query(
            "UPDATE users SET role = 'admin' WHERE user_email = $1 RETURNING *",
            [email]
        );

        if (res.rows.length > 0) {
            console.log(`Success! User ${res.rows[0].username} is now an admin (role='admin').`);
        } else {
            console.log(`User with email ${email} not found.`);
            // Try searching just by username or similar if email fails? No, user gave specific email.
        }
    } catch (err) {
        console.error("Error:", err.message);
    } finally {
        pool.end();
    }
}

makeAdmin();

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'dilip',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'placement_prep',
});

async function checkLocal() {
    try {
        const problems = await pool.query('SELECT COUNT(*) FROM problems');
        const users = await pool.query('SELECT user_id, user_name, user_email FROM users WHERE user_email = $1', ['dilipkumar2832005@gmail.com']);

        console.log('LOCAL DATABASE:');
        console.log('Problems:', problems.rows[0].count);
        console.log('User:', users.rows[0] || 'NOT FOUND');
    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
}

checkLocal();

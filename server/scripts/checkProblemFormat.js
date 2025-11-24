const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'dilip',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'placement_prep',
});

async function check() {
    const client = await pool.connect();
    try {
        const res = await client.query("SELECT title, test_case_input FROM problems WHERE title LIKE 'Binary Search%' LIMIT 1");
        console.log('Problem:', res.rows[0]);

        const res2 = await client.query("SELECT input FROM test_cases WHERE problem_id = (SELECT problem_id FROM problems WHERE title LIKE 'Binary Search%' LIMIT 1)");
        console.log('Test Cases:', res2.rows);
    } finally {
        client.release();
        pool.end();
    }
}
check();

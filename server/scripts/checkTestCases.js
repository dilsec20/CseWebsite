const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'dilip',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'placement_prep',
});

async function checkTestCases() {
    const client = await pool.connect();
    try {
        // Check total test cases
        const total = await client.query('SELECT COUNT(*) FROM test_cases');
        console.log(`\nTotal test cases: ${total.rows[0].count}`);

        // Check test cases for problem ID 1
        const problem1 = await client.query('SELECT * FROM test_cases WHERE problem_id = 1');
        console.log(`\nTest cases for problem ID 1: ${problem1.rows.length}`);
        if (problem1.rows.length > 0) {
            console.log('Sample:', problem1.rows[0]);
        }

        // Check if test_cases table has the right columns
        const columns = await client.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'test_cases'
        `);
        console.log('\ntest_cases table columns:');
        columns.rows.forEach(col => {
            console.log(`  ${col.column_name}: ${col.data_type}`);
        });

    } finally {
        client.release();
        pool.end();
    }
}

checkTestCases();

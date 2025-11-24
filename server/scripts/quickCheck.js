const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'dilip',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'placement_prep',
});

async function checkData() {
    const client = await pool.connect();

    try {
        // Check Two Sum problem
        const problem = await client.query(`
            SELECT title, test_case_input, test_case_output, input_format, output_format, constraints
            FROM problems
            WHERE title = 'Two Sum'
            LIMIT 1
        `);

        console.log('Problem data:');
        console.log(JSON.stringify(problem.rows[0], null, 2));

        // Check test cases
        const testCases = await client.query(`
            SELECT input, expected_output, is_sample
            FROM test_cases
            WHERE problem_id = (SELECT problem_id FROM problems WHERE title = 'Two Sum' LIMIT 1)
            LIMIT 3
        `);

        console.log('\nTest cases:');
        console.log(JSON.stringify(testCases.rows, null, 2));

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        client.release();
        await pool.end();
    }
}

checkData();

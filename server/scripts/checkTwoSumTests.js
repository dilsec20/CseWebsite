const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'dilip',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'placement_prep',
});

async function checkTwoSumTestCases() {
    const client = await pool.connect();
    try {
        // Get Two Sum problem
        const problem = await client.query(`
            SELECT * FROM problems WHERE title = 'Two Sum'
        `);

        if (problem.rows.length === 0) {
            console.log('Two Sum problem not found!');
            return;
        }

        const problemId = problem.rows[0].problem_id;
        console.log(`Two Sum Problem ID: ${problemId}\n`);

        // Get all test cases
        const testCases = await client.query(`
            SELECT test_case_id, input, expected_output, is_sample, test_case_order
            FROM test_cases
            WHERE problem_id = $1
            ORDER BY is_sample DESC, test_case_order
        `, [problemId]);

        console.log(`Total test cases: ${testCases.rows.length}\n`);

        testCases.rows.forEach((tc, index) => {
            console.log(`Test Case #${index + 1} (${tc.is_sample ? 'SAMPLE' : 'HIDDEN'}):`);
            console.log('Input:');
            console.log(tc.input);
            console.log('Expected Output:');
            console.log(tc.expected_output);
            console.log('---');
        });

    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        client.release();
        pool.end();
    }
}

checkTwoSumTestCases();

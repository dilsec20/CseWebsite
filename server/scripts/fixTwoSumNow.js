const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'dilip',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'placement_prep',
});

async function fixTwoSumDirectly() {
    const client = await pool.connect();
    try {
        console.log('Fixing Two Sum test case #4...\n');

        // Get the problem ID
        const problem = await client.query(`SELECT problem_id FROM problems WHERE title = 'Two Sum'`);
        const problemId = problem.rows[0].problem_id;

        // Find test case #4 (hidden, order 2)
        const oldTest = await client.query(`
            SELECT * FROM test_cases 
            WHERE problem_id = $1 AND is_sample = false AND test_case_order = 2
        `, [problemId]);

        console.log('Current test case #4:');
        console.log('Input:', oldTest.rows[0]?.input);
        console.log('Expected:', oldTest.rows[0]?.expected_output);
        console.log('');

        // Update it
        const result = await client.query(`
            UPDATE test_cases
            SET input = $1, expected_output = $2
            WHERE problem_id = $3 AND is_sample = false AND test_case_order = 2
        `, ['5\n1 5 3 8 9\n12', '2 4', problemId]);

        console.log('✅ Updated test case #4');
        console.log('New input: 5\\n1 5 3 8 9\\n12');
        console.log('New expected output: 2 4');
        console.log('');
        console.log('This input has only ONE valid solution: indices 2 and 4 (values 3+9=12)');
        console.log('Your Two Sum code should now pass all 6 test cases!');

    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        client.release();
        pool.end();
    }
}

fixTwoSumDirectly();

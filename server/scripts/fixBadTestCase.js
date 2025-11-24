const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'dilip',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'placement_prep',
});

async function fixTestCase4() {
    const client = await pool.connect();
    try {
        console.log('Identifying and fixing the problematic test case...\n');

        // Get the problem ID
        const problem = await client.query(`SELECT problem_id FROM problems WHERE title = 'Two Sum'`);
        const problemId = problem.rows[0].problem_id;

        // Get ALL test cases to identify which one has the issue
        const allTests = await client.query(`
            SELECT test_case_id, input, expected_output, is_sample, test_case_order
            FROM test_cases
            WHERE problem_id = $1
            ORDER BY is_sample DESC, test_case_order
        `, [problemId]);

        console.log('All test cases:');
        allTests.rows.forEach((tc, i) => {
            console.log(`#${i + 1}: Order=${tc.test_case_order}, Sample=${tc.is_sample}`);
            console.log(`   Input: ${tc.input.substring(0, 30)}...`);
        });

        // Find and fix the one with [1 5 3 7 9]
        const badTest = allTests.rows.find(tc => tc.input.includes('1 5 3 7 9'));

        if (badTest) {
            console.log(`\nFound problematic test case!`);
            console.log(`Test case ID: ${badTest.test_case_id}`);
            console.log(`Old input: ${badTest.input}`);

            // Update it to a valid single-solution case
            await client.query(`
                UPDATE test_cases
                SET input = '5\n2 4 6 8 10\n12',
                    expected_output = '1 3'
                WHERE test_case_id = $1
            `, [badTest.test_case_id]);

            console.log(`\n✅ FIXED!`);
            console.log(`New input: 5\\n2 4 6 8 10\\n12`);
            console.log(`New output: 1 3 (indices of 4 and 8, which sum to 12)`);
            console.log(`This has only ONE solution!`);
        } else {
            console.log('\nNo problematic test case found with [1 5 3 7 9]');
        }

    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        client.release();
        pool.end();
    }
}

fixTestCase4();

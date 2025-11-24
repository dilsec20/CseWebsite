const pool = require('../db');

async function checkMissingNumberProblem() {
    const client = await pool.connect();
    try {
        // Find the Missing Number problem
        const problem = await client.query(
            "SELECT problem_id, title FROM problems WHERE title LIKE '%Missing Number%'"
        );

        if (problem.rows.length === 0) {
            console.log('Missing Number problem not found!');
            return;
        }

        console.log('Problem found:', problem.rows[0]);
        const problemId = problem.rows[0].problem_id;

        // Check test cases
        const testCases = await client.query(
            "SELECT * FROM test_cases WHERE problem_id = $1 ORDER BY is_sample DESC, test_case_order",
            [problemId]
        );

        console.log(`\nTest cases count: ${testCases.rows.length}`);
        testCases.rows.forEach((tc, idx) => {
            console.log(`\nTest Case ${idx + 1}:`);
            console.log(`  Sample: ${tc.is_sample}`);
            console.log(`  Input: ${tc.input}`);
            console.log(`  Expected: ${tc.expected_output}`);
        });

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

checkMissingNumberProblem();

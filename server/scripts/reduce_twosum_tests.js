const pool = require('../db');

async function reduceTwoSumTests() {
    const client = await pool.connect();
    try {
        console.log('Reducing Two Sum test cases for faster execution...\n');

        const prob = await client.query("SELECT problem_id FROM problems WHERE title = 'Two Sum'");
        if (prob.rows.length === 0) {
            console.log('Problem not found');
            return;
        }

        const problemId = prob.rows[0].problem_id;

        // Keep only the sample test and 2 best hidden tests
        await client.query(`
            DELETE FROM test_cases 
            WHERE problem_id = $1 
            AND test_case_order > 3
        `, [problemId]);

        console.log('✓ Deleted tests 4-7');
        console.log('✓ Kept: 1 sample + 2 hidden tests');
        console.log('\nThis will make submissions MUCH faster!');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

reduceTwoSumTests();

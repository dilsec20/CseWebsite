const pool = require('../db');

async function fixMaxSubarray() {
    const client = await pool.connect();
    try {
        console.log('🔧 Fixing Maximum Subarray...\n');

        // Get problem ID
        const prob = await client.query(
            "SELECT problem_id FROM problems WHERE title ILIKE '%Maximum Subarray%' AND title ILIKE '%Kadane%'"
        );

        if (prob.rows.length === 0) {
            console.log('❌ Problem not found!');
            return;
        }

        const problemId = prob.rows[0].problem_id;
        console.log(`Problem ID: ${problemId}`);

        // Update sample test case to include 'n' on first line
        const newInput = "9\n-2 1 -3 4 -1 2 1 -5 4";

        await client.query(
            "UPDATE test_cases SET input = $1 WHERE problem_id = $2 AND is_sample = true",
            [newInput, problemId]
        );

        console.log('✅ Updated sample test case input:');
        console.log(newInput);
        console.log('\nNow matches the description format!');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

fixMaxSubarray();

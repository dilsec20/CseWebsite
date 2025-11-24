const pool = require('../db');

async function fixMaxSubarrayHidden() {
    const client = await pool.connect();
    try {
        console.log('🔧 Fixing Maximum Subarray Hidden Test Cases...\n');

        // Get problem ID
        const prob = await client.query(
            "SELECT problem_id FROM problems WHERE title ILIKE '%Maximum Subarray%'"
        );
        const problemId = prob.rows[0].problem_id;

        // Get all test cases
        const tests = await client.query(
            "SELECT test_case_id, input FROM test_cases WHERE problem_id = $1",
            [problemId]
        );

        for (const t of tests.rows) {
            const lines = t.input.trim().split('\n');

            // If only 1 line, it's definitely missing the size (unless it's empty)
            if (lines.length === 1) {
                const elements = t.input.trim().split(/\s+/);
                const size = elements.length;
                const newInput = `${size}\n${t.input.trim()}`;

                await client.query(
                    "UPDATE test_cases SET input = $1 WHERE test_case_id = $2",
                    [newInput, t.test_case_id]
                );
                console.log(`✅ Fixed TC ${t.test_case_id}: Prepended size ${size}`);
            }
        }

        console.log('\n✨ All test cases updated!');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

fixMaxSubarrayHidden();

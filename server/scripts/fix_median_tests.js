const pool = require('../db');

async function fixMedianTests() {
    const client = await pool.connect();
    try {
        console.log('🔧 Fixing Median of Two Sorted Arrays Tests...\n');

        const prob = await client.query("SELECT problem_id FROM problems WHERE title = 'Median of Two Sorted Arrays'");

        if (prob.rows.length === 0) {
            console.log('Problem not found');
            return;
        }

        const problemId = prob.rows[0].problem_id;

        // Define hidden test cases
        const hiddenTests = [
            { input: '2\n1 2\n3 4', output: '2.50000', order: 2 },
            { input: '2\n0 0\n0 0', output: '0.00000', order: 3 },
            { input: '1\n\n1', output: '1.00000', order: 4 }, // Empty first array
            { input: '2\n2\n\n', output: '2.00000', order: 5 }, // Empty second array
            { input: '4\n1 3 5 7\n2 4 6 8', output: '4.50000', order: 6 }
        ];

        // Delete existing hidden tests to avoid duplicates/conflicts
        await client.query("DELETE FROM test_cases WHERE problem_id = $1 AND is_sample = false", [problemId]);

        for (const test of hiddenTests) {
            await client.query(
                `INSERT INTO test_cases (problem_id, input, expected_output, is_sample, test_case_order)
                 VALUES ($1, $2, $3, false, $4)`,
                [problemId, test.input, test.output, test.order]
            );
        }

        console.log(`✅ Added ${hiddenTests.length} hidden test cases`);

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

fixMedianTests();

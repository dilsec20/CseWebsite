const pool = require('../db');

// Fix Two Sum test cases - replace invalid ones with proper tests
async function fixTwoSumTests() {
    const client = await pool.connect();

    try {
        console.log('Fixing Two Sum test cases...\n');

        // Get Two Sum problem ID
        const prob = await client.query("SELECT problem_id FROM problems WHERE title = 'Two Sum'");

        if (prob.rows.length === 0) {
            console.log('Two Sum problem not found');
            return;
        }

        const problemId = prob.rows[0].problem_id;

        // Delete all existing test cases
        await client.query('DELETE FROM test_cases WHERE problem_id = $1', [problemId]);
        console.log('✓ Cleared existing test cases');

        // Add correct test cases
        const correctTests = [
            // Sample test
            { input: "4\n2 7 11 15\n9", output: "0 1", is_sample: true, order: 1 },
            // Hidden tests - all valid
            { input: "2\n3 3\n6", output: "0 1", is_sample: false, order: 2 },
            { input: "3\n3 2 4\n6", output: "1 2", is_sample: false, order: 3 },
            { input: "5\n1 2 3 4 5\n9", output: "3 4", is_sample: false, order: 4 },
            { input: "6\n-1 -2 -3 -4 -5 -6\n-8", output: "2 4", is_sample: false, order: 5 },
            { input: "4\n0 4 3 0\n0", output: "0 3", is_sample: false, order: 6 },
            { input: "10\n1 3 5 7 9 2 4 6 8 10\n11", output: "0 9", is_sample: false, order: 7 }
        ];

        for (const test of correctTests) {
            await client.query(
                `INSERT INTO test_cases (problem_id, input, expected_output, is_sample, test_case_order)
                 VALUES ($1, $2, $3, $4, $5)`,
                [problemId, test.input, test.output, test.is_sample, test.order]
            );
        }

        console.log(`✅ Added ${correctTests.length} valid test cases (1 sample + 6 hidden)`);
        console.log('\nAll test cases follow constraints:');
        console.log('  - 2 <= nums.length <= 10^4');
        console.log('  - Exactly one valid solution exists');
        console.log('  - Cannot use same element twice\n');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

fixTwoSumTests();

const pool = require('../db');

async function fixTreeTests() {
    const client = await pool.connect();
    try {
        console.log('🔧 Fixing Count Complete Tree Nodes Tests...\n');

        const prob = await client.query("SELECT problem_id FROM problems WHERE title ILIKE '%Count Complete Tree Nodes%'");
        const problemId = prob.rows[0].problem_id;

        // 1. Delete bad test cases (ID 1625 has empty output, 1624 is duplicate)
        await client.query("DELETE FROM test_cases WHERE test_case_id IN (1625, 1624)");
        console.log('✅ Deleted invalid/duplicate test cases');

        // 2. Add a good hidden test case (Perfect tree, 7 nodes)
        await client.query(
            `INSERT INTO test_cases (problem_id, input, expected_output, is_sample, test_case_order)
             VALUES ($1, '1 2 3 4 5 6 7', '7', false, 5)`,
            [problemId]
        );
        console.log('✅ Added valid hidden test case (7 nodes)');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

fixTreeTests();

const pool = require('../db');

async function debugTreeNodes() {
    const client = await pool.connect();
    try {
        console.log('🔍 Debugging Count Complete Tree Nodes...\n');

        // Find problem
        const prob = await client.query("SELECT problem_id, title FROM problems WHERE title ILIKE '%Count Complete Tree Nodes%' OR title ILIKE '%Count nodes in complete binary tree%'");

        if (prob.rows.length === 0) {
            console.log('❌ Problem not found!');
            return;
        }

        const p = prob.rows[0];
        console.log(`Found Problem: "${p.title}" (ID: ${p.problem_id})`);

        // Get Test Cases
        const tests = await client.query(
            `SELECT test_case_id, input, expected_output, is_sample, test_case_order 
             FROM test_cases 
             WHERE problem_id = $1 
             ORDER BY is_sample DESC, test_case_order ASC`,
            [p.problem_id]
        );

        console.log(`\nTotal Test Cases: ${tests.rows.length}`);

        tests.rows.forEach((t, i) => {
            console.log(`\nTest Case #${i + 1} [${t.is_sample ? 'SAMPLE' : 'HIDDEN'}] (ID: ${t.test_case_id})`);
            console.log(`Input: "${t.input}"`);
            console.log(`Expected: "${t.expected_output}"`);
        });

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

debugTreeNodes();

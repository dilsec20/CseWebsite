const pool = require('../db');

async function checkSqrtTests() {
    const client = await pool.connect();
    try {
        console.log('🔍 Checking Sqrt(x) Test Cases...\n');

        // 1. Get Problem ID
        const prob = await client.query("SELECT problem_id, title FROM problems WHERE title ILIKE '%Sqrt(x)%'");

        if (prob.rows.length === 0) {
            console.log('❌ Problem "Sqrt(x)" not found!');
            return;
        }

        const p = prob.rows[0];
        console.log(`Found Problem: "${p.title}" (ID: ${p.problem_id})`);

        // 2. Get Test Cases
        const tests = await client.query(
            `SELECT test_case_id, input, expected_output, is_sample, test_case_order 
             FROM test_cases 
             WHERE problem_id = $1 
             ORDER BY is_sample DESC, test_case_order ASC`,
            [p.problem_id]
        );

        console.log(`\nTotal Test Cases: ${tests.rows.length}`);

        const samples = tests.rows.filter(t => t.is_sample);
        const hidden = tests.rows.filter(t => !t.is_sample);

        console.log(`Sample Tests: ${samples.length}`);
        samples.forEach(t => console.log(` - [${t.test_case_id}] Input: "${t.input}", Output: "${t.expected_output}"`));

        console.log(`Hidden Tests: ${hidden.length}`);
        hidden.forEach(t => console.log(` - [${t.test_case_id}] Input: "${t.input}", Output: "${t.expected_output}"`));

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

checkSqrtTests();

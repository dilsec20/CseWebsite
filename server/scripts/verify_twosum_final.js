const pool = require('../db');

async function verifyTwoSum() {
    const client = await pool.connect();
    try {
        console.log('🔍 Verifying Two Sum State...\n');

        const prob = await client.query("SELECT * FROM problems WHERE title = 'Two Sum'");
        if (prob.rows.length === 0) {
            console.log('❌ Two Sum problem not found!');
            return;
        }

        const p = prob.rows[0];
        console.log(`Problem: ${p.title} (ID: ${p.problem_id})`);
        console.log(`Description Length: ${p.description?.length || 0}`);
        console.log(`Has Input/Output sections: ${p.description?.includes('Input Format')}`);

        const tests = await client.query(
            "SELECT test_case_id, is_sample, input, expected_output FROM test_cases WHERE problem_id = $1 ORDER BY test_case_order",
            [p.problem_id]
        );

        console.log(`\nTest Cases: ${tests.rows.length}`);
        tests.rows.forEach((t, i) => {
            console.log(`  ${i + 1}. [${t.is_sample ? 'SAMPLE' : 'HIDDEN'}] Input len: ${t.input?.length}, Output: ${t.expected_output}`);
        });

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

verifyTwoSum();

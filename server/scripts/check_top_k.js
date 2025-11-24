const pool = require('../db');

async function checkTopK() {
    const client = await pool.connect();
    try {
        console.log('🔍 Checking Top K Frequent Words...\n');

        const res = await client.query("SELECT problem_id, title, description FROM problems WHERE title ILIKE '%Top K Frequent Words%'");

        if (res.rows.length === 0) {
            console.log('❌ Problem not found!');
            return;
        }

        const p = res.rows[0];
        console.log(`[ID: ${p.problem_id}] Title: ${p.title}`);
        console.log(`Description: ${p.description}`);

        const tests = await client.query(
            "SELECT input, expected_output FROM test_cases WHERE problem_id = $1 AND is_sample = true",
            [p.problem_id]
        );

        if (tests.rows.length > 0) {
            console.log('\nSample Test Case:');
            console.log('Input:\n', tests.rows[0].input);
            console.log('Output:\n', tests.rows[0].expected_output);
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

checkTopK();

const pool = require('../db');

async function checkTwoSumTests() {
    const client = await pool.connect();
    try {
        const result = await client.query(`
            SELECT tc.test_case_id, tc.input, tc.expected_output, tc.is_sample, tc.test_case_order 
            FROM test_cases tc 
            JOIN problems p ON tc.problem_id = p.problem_id 
            WHERE p.title = 'Two Sum' 
            ORDER BY tc.test_case_order
        `);

        console.log('Two Sum Test Cases:\n');
        result.rows.forEach((tc, i) => {
            console.log(`Test ${i + 1} (order ${tc.test_case_order}, ${tc.is_sample ? 'SAMPLE' : 'HIDDEN'}):`);
            console.log('Input:', tc.input.replace(/\n/g, ' | '));
            console.log('Output:', tc.expected_output);
            console.log('');
        });

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

checkTwoSumTests();

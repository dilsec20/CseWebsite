const pool = require('../db');

async function checkProblemTestCases() {
    const client = await pool.connect();
    try {
        const result = await client.query(`
            SELECT tc.test_case_order, tc.input, tc.expected_output, tc.is_sample,
                   LENGTH(tc.input) as input_length
            FROM test_cases tc 
            JOIN problems p ON tc.problem_id = p.problem_id 
            WHERE p.title = 'Two Sum' 
            ORDER BY tc.test_case_order
        `);

        console.log('Two Sum Test Cases Analysis:\n');
        result.rows.forEach((tc, i) => {
            console.log(`Test ${tc.test_case_order} (${tc.is_sample ? 'SAMPLE' : 'HIDDEN'}):`);
            console.log(`  Input length: ${tc.input_length} chars`);
            console.log(`  Input: ${tc.input.substring(0, 100)}${tc.input.length > 100 ? '...' : ''}`);
            console.log(`  Expected: ${tc.expected_output}`);

            // Parse to check validity
            const lines = tc.input.split('\n');
            if (lines.length >= 1) {
                const n = parseInt(lines[0]);
                console.log(`  Array size (n): ${n}`);
                if (lines.length >= 2) {
                    const nums = lines[1].split(' ').filter(x => x.trim());
                    console.log(`  Actual elements: ${nums.length}`);
                    if (n !== nums.length) {
                        console.log(`  ⚠️  MISMATCH: n=${n} but ${nums.length} elements provided!`);
                    }
                }
            }
            console.log('');
        });

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

checkProblemTestCases();

const pool = require('../db');
const axios = require('axios');

async function fixAndVerifySqrt() {
    const client = await pool.connect();
    try {
        console.log('🔧 Fixing Sqrt(x)...\n');

        const prob = await client.query("SELECT problem_id FROM problems WHERE title = 'Sqrt(x)'");
        const problemId = prob.rows[0].problem_id;

        // 1. Delete invalid hidden test cases (those with multiple lines of input or spaces, since Sqrt(x) takes single int)
        // Actually, just delete the specific ones I saw or all hidden and re-add proper ones.
        // The bad ones had IDs 1842, 1843.

        await client.query(`
            DELETE FROM test_cases 
            WHERE problem_id = $1 
            AND is_sample = false 
            AND (input LIKE '% %' OR input LIKE '%\n%')
        `, [problemId]);

        console.log('✅ Removed invalid hidden test cases (multi-line/space inputs)');

        // 2. Add proper hidden test cases if needed
        const properHidden = [
            { input: '4', output: '2' },
            { input: '0', output: '0' },
            { input: '1', output: '1' },
            { input: '2147395599', output: '46339' }, // Large input
            { input: '2147483647', output: '46340' }  // Max int
        ];

        // Clear all hidden to be safe and re-add
        await client.query("DELETE FROM test_cases WHERE problem_id = $1 AND is_sample = false", [problemId]);

        for (const t of properHidden) {
            await client.query(
                "INSERT INTO test_cases (problem_id, input, expected_output, is_sample, test_case_order) VALUES ($1, $2, $3, false, 0)",
                [problemId, t.input, t.output]
            );
        }
        console.log('✅ Added 5 valid hidden test cases');

        // 3. Verify Sample Test Exists
        const sample = await client.query("SELECT * FROM test_cases WHERE problem_id = $1 AND is_sample = true", [problemId]);
        if (sample.rows.length > 0) {
            console.log(`✅ Sample test verified: Input="${sample.rows[0].input}", Output="${sample.rows[0].expected_output}"`);
        } else {
            console.log('❌ Sample test MISSING! Adding it...');
            await client.query(
                "INSERT INTO test_cases (problem_id, input, expected_output, is_sample, test_case_order) VALUES ($1, '8', '2', true, 1)",
                [problemId]
            );
            console.log('✅ Sample test added.');
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

fixAndVerifySqrt();

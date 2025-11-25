const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function verifyTestInputs() {
    const client = await pool.connect();
    try {
        console.log('🔍 Verifying Test Case Sample Inputs...\n');

        // Check specific problems
        const checkProblems = ['Two Sum', 'Best Time to Buy and Sell Stock', 'Valid Palindrome'];

        for (const title of checkProblems) {
            const res = await client.query(`
                SELECT title, test_case_input, test_case_output 
                FROM problems 
                WHERE title = $1
            `, [title]);

            if (res.rows.length > 0) {
                const p = res.rows[0];
                console.log(`✅ ${p.title}`);
                console.log(`   Input: ${p.test_case_input ? '✓ Present' : '❌ MISSING'}`);
                console.log(`   Output: ${p.test_case_output ? '✓ Present' : '❌ MISSING'}`);

                if (p.test_case_input) {
                    console.log(`   Sample: ${p.test_case_input.substring(0, 50)}${p.test_case_input.length > 50 ? '...' : ''}`);
                }
                console.log('');
            } else {
                console.log(`❌ "${title}" not found\n`);
            }
        }

        // Count total problems with test cases
        const countRes = await client.query(`
            SELECT 
                COUNT(*) as total,
                COUNT(test_case_input) as with_input,
                COUNT(test_case_output) as with_output
            FROM problems
        `);

        console.log('📊 Summary:');
        console.log(`   Total problems: ${countRes.rows[0].total}`);
        console.log(`   With sample input: ${countRes.rows[0].with_input}`);
        console.log(`   With sample output: ${countRes.rows[0].with_output}`);

    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        client.release();
        pool.end();
    }
}

verifyTestInputs();

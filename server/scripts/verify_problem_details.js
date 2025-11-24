const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function verifyProblemDetails() {
    const client = await pool.connect();
    try {
        console.log('🔍 Verifying Problem Details (Description, Formats, Test Cases)...\n');

        // Fetch 3 random problems
        const res = await client.query(`
            SELECT problem_id, title, description, input_format, output_format, test_case_input, test_case_output
            FROM problems
            ORDER BY RANDOM()
            LIMIT 3
        `);

        for (const p of res.rows) {
            // Fetch hidden test count separately
            const tcRes = await client.query("SELECT COUNT(*) FROM test_cases WHERE problem_id = $1", [p.problem_id]);
            const hidden_test_count = tcRes.rows[0].count;
            console.log('---------------------------------------------------');
            console.log(`🆔 ID: ${p.problem_id}`);
            console.log(`📌 Title: ${p.title}`);
            console.log(`📝 Description Length: ${p.description?.length || 0} chars`);
            console.log(`📥 Input Format: ${p.input_format ? '✅ Present' : '❌ MISSING'}`);
            console.log(`📤 Output Format: ${p.output_format ? '✅ Present' : '❌ MISSING'}`);
            console.log(`🧪 Sample Input: ${p.test_case_input ? '✅ Present' : '❌ MISSING'}`);
            console.log(`🧪 Sample Output: ${p.test_case_output ? '✅ Present' : '❌ MISSING'}`);
            console.log(`🕵️ Hidden Test Cases: ${p.hidden_test_count}`);

            if (!p.description || !p.input_format || !p.output_format) {
                console.log('⚠️  WARNING: Some details are missing!');
            } else {
                console.log('✅ All details appear complete.');
            }
            console.log('---------------------------------------------------\n');
        }

        // Check total counts again
        const countRes = await client.query("SELECT COUNT(*) FROM problems");
        const testCountRes = await client.query("SELECT COUNT(*) FROM test_cases");

        console.log(`📊 Total Problems: ${countRes.rows[0].count}`);
        console.log(`📊 Total Hidden Test Cases: ${testCountRes.rows[0].count}`);

    } catch (err) {
        console.error('❌ Error:', err.message);
        console.error('Stack:', err.stack);
    } finally {
        client.release();
        pool.end();
    }
}

verifyProblemDetails();

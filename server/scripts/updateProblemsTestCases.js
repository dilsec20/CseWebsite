const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'dilip',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'placement_prep',
});

async function updateProblemsTable() {
    const client = await pool.connect();

    try {
        console.log('🔗 Updating problems table with new format from test_cases...\n');

        // Update test_case_input and test_case_output from the first sample test case
        const result = await client.query(`
            UPDATE problems p
            SET 
                test_case_input = tc.input,
                test_case_output = tc.expected_output
            FROM (
                SELECT DISTINCT ON (problem_id)
                    problem_id, input, expected_output
                FROM test_cases
                WHERE is_sample = true
                ORDER BY problem_id, test_case_order
            ) tc
            WHERE p.problem_id = tc.problem_id
        `);

        console.log(`✅ Updated ${result.rowCount} problems`);

        // Verify
        const sample = await client.query(`
            SELECT title, test_case_input, test_case_output 
            FROM problems 
            WHERE title = 'Two Sum'
        `);

        console.log('\n📋 Sample: Two Sum');
        console.log('Input:', sample.rows[0].test_case_input);
        console.log('Output:', sample.rows[0].test_case_output);

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        client.release();
        await pool.end();
    }
}

updateProblemsTable();

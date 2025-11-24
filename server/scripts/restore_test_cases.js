const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function restoreTestCases() {
    const client = await pool.connect();
    try {
        console.log('🚀 Restoring test cases to PRODUCTION database...');

        // 1. Ensure table exists
        await client.query(`
            CREATE TABLE IF NOT EXISTS test_cases (
                test_case_id SERIAL PRIMARY KEY,
                problem_id INTEGER NOT NULL REFERENCES problems(problem_id) ON DELETE CASCADE,
                input TEXT NOT NULL,
                expected_output TEXT NOT NULL,
                is_sample BOOLEAN DEFAULT false,
                test_case_order INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            CREATE INDEX IF NOT EXISTS idx_test_cases_problem ON test_cases(problem_id);
        `);
        console.log('✅ Table verified.');

        // 2. Read dump file
        const dumpPath = path.join(__dirname, 'test_cases_dump_mapped.json');
        const data = JSON.parse(fs.readFileSync(dumpPath, 'utf8'));
        console.log(`📖 Read ${data.length} test cases from MAPPED dump.`);

        // 3. Insert data
        // We'll use ON CONFLICT DO NOTHING to avoid duplicates if run multiple times
        // But test_case_id might conflict if we force it.
        // Better to ignore test_case_id and let SERIAL handle it?
        // OR preserve IDs if possible.
        // If we preserve IDs, we need to handle conflicts.
        // Let's try to preserve IDs but use ON CONFLICT UPDATE or DO NOTHING.
        // Actually, if we just want to populate, we can ignore ID and just insert content.
        // But then we lose the link if we have other tables referencing test cases (unlikely).
        // Let's try to insert with ID first.

        let inserted = 0;
        let skipped = 0;
        let errors = 0;

        // Truncate table first? User might want fresh start.
        // But maybe safer to just insert missing ones.
        // Let's TRUNCATE to be clean and match local exactly.
        console.log('🗑️  Truncating existing test_cases table...');
        await client.query('TRUNCATE TABLE test_cases RESTART IDENTITY CASCADE');

        console.log('📥 Inserting...');

        for (const tc of data) {
            try {
                await client.query(`
                    INSERT INTO test_cases (test_case_id, problem_id, input, expected_output, is_sample, test_case_order, created_at)
                    VALUES ($1, $2, $3, $4, $5, $6, $7)
                `, [tc.test_case_id, tc.problem_id, tc.input, tc.expected_output, tc.is_sample, tc.test_case_order, tc.created_at]);
                inserted++;
            } catch (err) {
                // If FK error (problem_id doesn't exist), we skip
                if (err.code === '23503') { // foreign_key_violation
                    // console.log(`⚠️  Skipping test case ${tc.test_case_id}: Problem ${tc.problem_id} not found.`);
                    skipped++;
                } else {
                    console.error(`❌ Error inserting ${tc.test_case_id}:`, err.message);
                    errors++;
                }
            }

            if ((inserted + skipped + errors) % 100 === 0) {
                console.log(`Processed ${inserted + skipped + errors}...`);
            }
        }

        console.log(`\n✅ Restore complete!`);
        console.log(`   Inserted: ${inserted}`);
        console.log(`   Skipped (FK issues): ${skipped}`);
        console.log(`   Errors: ${errors}`);

        // Reset sequence
        await client.query("SELECT setval('test_cases_test_case_id_seq', (SELECT MAX(test_case_id) FROM test_cases))");

    } catch (err) {
        console.error('❌ Fatal Error:', err.message);
    } finally {
        client.release();
        pool.end();
    }
}

restoreTestCases();

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'dilip',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'placement_prep',
});

async function fixTwoSumTestCase4() {
    const client = await pool.connect();
    try {
        // Update test case #4 to have only ONE valid solution
        // Change from [1, 5, 3, 7, 9] target 12 (has two solutions: 5+7 and 3+9)
        // To [1, 5, 3, 8, 9] target 12 (has one solution: 3+9)

        await client.query(`
            UPDATE test_cases
            SET input = '5\n1 5 3 8 9\n12',
                expected_output = '2 4'
            WHERE problem_id = (SELECT problem_id FROM problems WHERE title = 'Two Sum')
            AND is_sample = false
            AND test_case_order = 2
        `);

        console.log('✅ Fixed test case #4');
        console.log('New input: 5\\n1 5 3 8 9\\n12');
        console.log('Expected output: 2 4');
        console.log('This now has only ONE solution: indices 2 and 4 (values 3 and 9)');

    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        client.release();
        pool.end();
    }
}

fixTwoSumTestCase4();

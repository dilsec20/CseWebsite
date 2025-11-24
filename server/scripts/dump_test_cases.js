const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Connect to LOCAL database (ignore DATABASE_URL)
const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'dilip',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'placement_prep',
});

async function dumpTestCases() {
    const client = await pool.connect();
    try {
        console.log('📦 Dumping test cases from LOCAL database...');

        const res = await client.query(`
            SELECT * FROM test_cases ORDER BY test_case_id
        `);

        console.log(`Found ${res.rows.length} test cases.`);

        const dumpPath = path.join(__dirname, 'test_cases_dump.json');
        fs.writeFileSync(dumpPath, JSON.stringify(res.rows, null, 2));

        console.log(`✅ Dumped to ${dumpPath}`);

    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        client.release();
        pool.end();
    }
}

dumpTestCases();

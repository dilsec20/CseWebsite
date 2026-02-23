/**
 * Test Supabase connections on both ports to see which works.
 */
const { Pool } = require('pg');

async function testConnection(label, config) {
    console.log(`\n🔄 Testing: ${label}...`);
    const pool = new Pool(config);

    try {
        const start = Date.now();
        const result = await pool.query('SELECT NOW() as time, current_database() as db');
        const elapsed = Date.now() - start;
        console.log(`✅ ${label}: Connected in ${elapsed}ms`);
        console.log(`   DB: ${result.rows[0].db}, Time: ${result.rows[0].time}`);

        // Test a CP query
        const cpTest = await pool.query('SELECT COUNT(*) as count FROM cp_topics');
        console.log(`   CP Topics count: ${cpTest.rows[0].count}`);

        await pool.end();
        return true;
    } catch (err) {
        console.error(`❌ ${label}: FAILED - ${err.message}`);
        try { await pool.end(); } catch (e) { }
        return false;
    }
}

async function run() {
    const baseUrl = 'postgresql://postgres.xlqzqcqacpajpqwneqpa:05Supabase%40%40%3F%3F@aws-1-ap-south-1.pooler.supabase.com';

    // Test 1: Port 6543 (Transaction pooler)
    await testConnection('Port 6543 (Transaction Pooler)', {
        connectionString: `${baseUrl}:6543/postgres`,
        ssl: { rejectUnauthorized: false },
        connectionTimeoutMillis: 15000,
    });

    // Test 2: Port 5432 (Session pooler)
    await testConnection('Port 5432 (Session Pooler)', {
        connectionString: `${baseUrl}:5432/postgres`,
        ssl: { rejectUnauthorized: false },
        connectionTimeoutMillis: 15000,
    });

    // Test 3: Port 6543 with no prepared statements
    await testConnection('Port 6543 (No Prepared Stmts)', {
        connectionString: `${baseUrl}:6543/postgres`,
        ssl: { rejectUnauthorized: false },
        connectionTimeoutMillis: 15000,
        max: 2,
        idleTimeoutMillis: 5000,
    });

    console.log('\n✨ Testing complete.');
    process.exit(0);
}

run();

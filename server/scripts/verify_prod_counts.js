const { Pool } = require('pg');
require('dotenv').config();

const prodPool = new Pool({
    connectionString: 'postgres://postgres_4skc_user:A5sR9gJjXh2tZkLp@dpg-d4i99fpr0fns73ane58g-a.singapore-postgres.render.com/postgres_4skc',
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 5000
});

async function checkProd() {
    try {
        console.log('🌍 Checking Production Database Counts...');
        const client = await prodPool.connect();

        const tables = ['problems', 'test_cases', 'users', 'dsa_modules', 'dsa_topics'];

        for (const t of tables) {
            const res = await client.query(`SELECT count(*) FROM ${t}`);
            console.log(`   ${t}: ${res.rows[0].count}`);
        }

        client.release();
    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        prodPool.end();
    }
}

checkProd();

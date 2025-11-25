const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const localPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function inspectSchema() {
    const client = await localPool.connect();
    try {
        console.log('🔍 Inspecting test_cases table schema...');

        // Check columns
        const cols = await client.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'test_cases'
        `);

        if (cols.rows.length > 0) {
            console.log('Columns found in information_schema:');
            cols.rows.forEach(r => console.log(` - ${r.column_name} (${r.data_type})`));
        } else {
            console.log('⚠️ No columns found in information_schema for test_cases');
        }

        // Check sample row
        const res = await client.query(`
            SELECT * FROM test_cases LIMIT 1
        `);

        if (res.rows.length > 0) {
            console.log('\nRow sample keys:', Object.keys(res.rows[0]));
            console.log('Row sample:', res.rows[0]);
        } else {
            console.log('\n⚠️ Table exists but is empty');
        }

    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        client.release();
        localPool.end();
    }
}

inspectSchema();

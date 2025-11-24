const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function addFormatColumns() {
    const client = await pool.connect();
    try {
        console.log('📝 Adding missing columns to problems table...');

        await client.query(`
            ALTER TABLE problems 
            ADD COLUMN IF NOT EXISTS input_format TEXT,
            ADD COLUMN IF NOT EXISTS output_format TEXT,
            ADD COLUMN IF NOT EXISTS constraints TEXT,
            ADD COLUMN IF NOT EXISTS source VARCHAR(255);
        `);

        console.log('✅ Columns added successfully!');

        // Verify schema
        const res = await client.query(`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'problems'
        `);
        console.log('Current columns:', res.rows.map(r => r.column_name).join(', '));

    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        client.release();
        pool.end();
    }
}

addFormatColumns();

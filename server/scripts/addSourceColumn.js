const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'dilip',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'placement_prep',
});

async function addSourceColumn() {
    const client = await pool.connect();
    try {
        console.log('Adding source column to problems table...');
        await client.query(`
            ALTER TABLE problems 
            ADD COLUMN IF NOT EXISTS source VARCHAR(255)
        `);
        console.log('Column added successfully!');
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        client.release();
        pool.end();
    }
}

addSourceColumn();

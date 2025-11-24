const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'dilip',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'placement_prep',
});

async function updateUsersTable() {
    const client = await pool.connect();
    try {
        console.log('Adding missing columns to users table...');

        await client.query(`
            ALTER TABLE users 
            ADD COLUMN IF NOT EXISTS bio TEXT,
            ADD COLUMN IF NOT EXISTS profile_picture TEXT,
            ADD COLUMN IF NOT EXISTS linkedin_url VARCHAR(255),
            ADD COLUMN IF NOT EXISTS github_url VARCHAR(255);
        `);

        console.log('Columns added successfully!');

        // Verify columns
        const res = await client.query(`
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name = 'users';
        `);
        console.log('Current columns:', res.rows.map(r => r.column_name).join(', '));

    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        client.release();
        pool.end();
    }
}

updateUsersTable();

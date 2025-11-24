const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'dilip',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'placement_prep',
});

async function createPasswordResetTable() {
    const client = await pool.connect();

    try {
        console.log('🔗 Creating password_reset_tokens table...\n');

        await client.query(`
            CREATE TABLE IF NOT EXISTS password_reset_tokens (
                reset_id SERIAL PRIMARY KEY,
                user_email VARCHAR(255) NOT NULL,
                otp_code VARCHAR(6) NOT NULL,
                expires_at TIMESTAMP NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                used BOOLEAN DEFAULT false
            );
        `);

        console.log('✅ Table created successfully');

        await client.query(`
            CREATE INDEX IF NOT EXISTS idx_reset_email ON password_reset_tokens(user_email);
        `);

        await client.query(`
            CREATE INDEX IF NOT EXISTS idx_reset_expires ON password_reset_tokens(expires_at);
        `);

        console.log('✅ Indexes created');

    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        client.release();
        await pool.end();
    }
}

createPasswordResetTable();

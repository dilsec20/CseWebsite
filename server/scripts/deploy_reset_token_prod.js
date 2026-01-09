const { Pool } = require('pg');
require('dotenv').config();

const connectionString = process.env.PROD_DB_URL;

if (!connectionString) {
    console.error('❌ PROD_DB_URL environment variable is missing.');
    process.exit(1);
}

const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false }
});

const deploy = async () => {
    try {
        console.log('🚀 Connecting to Production Database...');

        console.log('⚠️ Dropping incompatible "password_reset_tokens" table...');
        await pool.query(`DROP TABLE IF EXISTS password_reset_tokens CASCADE;`);

        console.log('Creating new "password_reset_tokens" table...');
        await pool.query(`
            CREATE TABLE password_reset_tokens (
                reset_id SERIAL PRIMARY KEY,
                user_email VARCHAR(255) NOT NULL,
                otp_code VARCHAR(6) NOT NULL,
                expires_at TIMESTAMP NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                used BOOLEAN DEFAULT false
            );
        `);

        console.log('✅ "password_reset_tokens" table created successfully in PRODUCTION!');

        await pool.query(`
            CREATE INDEX IF NOT EXISTS idx_reset_email ON password_reset_tokens(user_email);
        `);

        await pool.query(`
            CREATE INDEX IF NOT EXISTS idx_reset_expires ON password_reset_tokens(expires_at);
        `);

        console.log('✅ Indexes created successfully!');

    } catch (err) {
        console.error('❌ Deployment Failed:', err);
    } finally {
        pool.end();
    }
};

deploy();

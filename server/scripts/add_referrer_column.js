const { Pool } = require('pg');

const connectionString = process.env.PROD_DB_URL;

if (!connectionString) {
    console.error('❌ PROD_DB_URL environment variable is missing.');
    process.exit(1);
}

const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false }
});

const addReferrerColumn = async () => {
    try {
        console.log('🔧 Adding referrer column to visitor_logs...');

        await pool.query(`
            ALTER TABLE visitor_logs 
            ADD COLUMN IF NOT EXISTS referrer TEXT;
        `);

        console.log('✅ Referrer column added successfully!');
    } catch (err) {
        console.error('❌ Failed:', err.message);
    } finally {
        pool.end();
    }
};

addReferrerColumn();

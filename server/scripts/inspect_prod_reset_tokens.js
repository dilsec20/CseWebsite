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

const inspect = async () => {
    try {
        console.log('🔍 Inspecting Production Database...');

        const res = await pool.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = 'password_reset_tokens';
        `);

        if (res.rows.length === 0) {
            console.log('❌ Table "password_reset_tokens" does NOT exist.');
        } else {
            console.log('✅ Table "password_reset_tokens" exists with columns:');
            console.log(JSON.stringify(res.rows, null, 2));
        }

    } catch (err) {
        console.error('❌ Inspection Failed:', err);
    } finally {
        pool.end();
    }
};

inspect();

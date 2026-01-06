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

const fixSchema = async () => {
    try {
        console.log('🔧 Fixing DB Schema...');

        // Increase ip_address column to TEXT or larger VARCHAR to be safe
        await pool.query(`
            ALTER TABLE visitor_logs 
            ALTER COLUMN ip_address TYPE VARCHAR(255);
        `);

        console.log('✅ "visitor_logs" ip_address column expanded to VARCHAR(255)!');
    } catch (err) {
        console.error('❌ Fix Failed:', err);
    } finally {
        pool.end();
    }
};

fixSchema();

const { Pool } = require('pg');

const connectionString = process.env.PROD_DB_URL;

if (!connectionString) {
    console.error('❌ PROD_DB_URL environment variable is missing.');
    process.exit(1);
}

const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false } // Required for Supabase usually
});

const deploy = async () => {
    try {
        console.log('🚀 Connecting to Production Database...');

        await pool.query(`
            CREATE TABLE IF NOT EXISTS visitor_logs (
                id SERIAL PRIMARY KEY,
                ip_address VARCHAR(45),
                user_agent TEXT,
                page_url TEXT,
                visit_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            
            CREATE INDEX IF NOT EXISTS idx_visitor_logs_time ON visitor_logs(visit_time);
        `);

        console.log('✅ "visitor_logs" table created successfully in PRODUCTION!');
    } catch (err) {
        console.error('❌ Deployment Failed:', err);
    } finally {
        pool.end();
    }
};

deploy();

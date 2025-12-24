const { Pool } = require('pg');

const connectionString = 'postgresql://postgres.xlqzqcqacpajpqwneqpa:05Supabase%40%40%3F%3F@aws-1-ap-south-1.pooler.supabase.com:6543/postgres';

const pool = new Pool({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false }
});

async function checkDB() {
    try {
        console.log('🔌 Connecting to:', 'aws-1-ap-south-1.pooler.supabase.com');
        const res = await pool.query('SELECT inet_server_addr(), current_database()');
        console.log('✅ Connected!');
        console.log('   Database:', res.rows[0].current_database);
        console.log('   Server IP:', res.rows[0].inet_server_addr); // Might be null for cloud DBs but query proves connection

        const tables = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_name LIKE 'cp_%';
        `);

        console.log('🔍 Checking for CP tables:');
        console.table(tables.rows);

        await pool.end();
    } catch (err) {
        console.error('❌ Connection Failed:', err);
    }
}

checkDB();

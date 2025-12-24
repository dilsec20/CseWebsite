/**
 * Database Script Template
 * 
 * IMPORTANT: Never hardcode database credentials!
 * 
 * Usage:
 * 1. Create a .env file in server/ with: DATABASE_URL=your_connection_string
 * 2. Run: node scripts/your_script.js
 */

require('dotenv').config({ path: '../.env' });
const { Pool } = require('pg');

if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL environment variable is not set!');
    console.error('   Create a .env file in server/ folder with:');
    console.error('   DATABASE_URL=postgresql://user:pass@host:port/db');
    process.exit(1);
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function main() {
    try {
        // Your database operations here
        const res = await pool.query('SELECT NOW()');
        console.log('✅ Connected at:', res.rows[0].now);
    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        await pool.end();
    }
}

main();

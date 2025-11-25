const { Pool } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const localPool = new Pool({
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'dilip',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'placement_prep',
});

async function testConnection() {
    console.log('Testing local database connection...');
    console.log(`User: ${process.env.DB_USER || 'postgres'}`);
    console.log(`Host: ${process.env.DB_HOST || 'localhost'}`);
    console.log(`Database: ${process.env.DB_NAME || 'placement_prep'}`);

    try {
        const client = await localPool.connect();
        console.log('✅ Connected successfully!');
        const res = await client.query('SELECT NOW()');
        console.log('Query result:', res.rows[0]);
        client.release();
    } catch (err) {
        console.error('❌ Connection failed:', err.message);
        console.error('Full error:', err);
    } finally {
        localPool.end();
    }
}

testConnection();

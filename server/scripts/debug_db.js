const pool = require('../db');

async function debugDB() {
    try {
        console.log('🔌 connecting...');
        const client = await pool.connect();

        console.log('✅ Connected!');

        const userRes = await client.query('SELECT current_user, session_user');
        console.log('👤 Current User:', userRes.rows[0]);

        // Check if we can see data in users table
        const countRes = await client.query('SELECT count(*) FROM users');
        console.log('📊 Users count:', countRes.rows[0].count);

        if (parseInt(countRes.rows[0].count) === 0) {
            console.warn('⚠️  Count is 0. RLS might be hiding data from this user.');
        } else {
            console.log('✅ Can see data.');
        }

        client.release();
    } catch (err) {
        console.error('❌ Connection failed:', err);
    } finally {
        pool.end();
    }
}

debugDB();

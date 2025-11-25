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

const prodPool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

async function syncContestSessions() {
    console.log('🚀 Syncing Contest Sessions...');

    const localClient = await localPool.connect();
    const prodClient = await prodPool.connect();

    try {
        // 1. Get local sessions for demo user (or all users)
        // We need to map user_ids if they differ, but for now assuming we just want to ensure demo user has data.
        // Let's fetch all sessions and try to match by user email?

        console.log('📥 Fetching local sessions...');
        const localSessions = await localClient.query(`
            SELECT cs.*, u.user_email 
            FROM contest_sessions cs
            JOIN users u ON cs.user_id = u.user_id
        `);

        console.log(`   Found ${localSessions.rows.length} local sessions.`);

        // 2. Get production users map
        const prodUsers = await prodClient.query('SELECT user_id, user_email FROM users');
        const userMap = new Map();
        prodUsers.rows.forEach(u => userMap.set(u.user_email, u.user_id));

        // 3. Insert missing sessions
        let inserted = 0;
        for (const session of localSessions.rows) {
            const prodUserId = userMap.get(session.user_email);
            if (!prodUserId) {
                console.log(`   ⚠️ Skipping session for ${session.user_email} (user not found in prod)`);
                continue;
            }

            // Check if session exists (by start_time and user_id)
            const exists = await prodClient.query(
                'SELECT 1 FROM contest_sessions WHERE user_id = $1 AND start_time = $2',
                [prodUserId, session.start_time]
            );

            if (exists.rows.length === 0) {
                await prodClient.query(
                    `INSERT INTO contest_sessions (user_id, start_time, end_time, status)
                     VALUES ($1, $2, $3, $4)`,
                    [prodUserId, session.start_time, session.end_time, session.status]
                );
                inserted++;
            }
        }

        console.log(`✅ Synced ${inserted} contest sessions.`);

    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        localClient.release();
        prodClient.release();
        localPool.end();
        prodPool.end();
    }
}

syncContestSessions();

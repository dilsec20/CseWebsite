const pool = require('../db');

async function checkHistory() {
    try {
        const res = await pool.query(`
            SELECT cs.session_id, cs.user_id, cs.status, cs.end_time
            FROM contest_sessions cs
            ORDER BY cs.end_time DESC
            LIMIT 10
        `);
        console.log("Contest Sessions:", res.rows);
    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
}

checkHistory();

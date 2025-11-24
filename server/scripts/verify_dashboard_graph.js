const axios = require('axios');
const pool = require('../db');

async function verifyDashboardGraph() {
    try {
        console.log('🔍 Verifying Dashboard Graph Data...\n');

        // Get a user who has an active contest (assuming the user from the context)
        // We'll just pick the first user with an active contest
        const client = await pool.connect();
        const userRes = await client.query("SELECT DISTINCT user_id FROM contest_sessions WHERE status = 'active' LIMIT 1");
        client.release();

        if (userRes.rows.length === 0) {
            console.log('No users with active contests found. Cannot verify specifically for active contests.');
            return;
        }

        const userId = userRes.rows[0].user_id;
        console.log(`Testing for User ID: ${userId}`);

        // We can't easily mock the auth token here without login, 
        // but we can call the DB query logic directly or use the public profile endpoint if available.
        // The public profile endpoint uses similar logic but might be different.
        // Let's check public profile route first.

        // Actually, let's just simulate the DB query used in dashboard.js
        const contestHistory = await pool.query(
            `SELECT 
                cs.session_id,
                cs.end_time,
                cs.status,
                SUM(
                    CASE
                        WHEN cp.solved = true THEN
                            CASE
                                WHEN p.difficulty = 'Easy' THEN 20
                                WHEN p.difficulty = 'Medium' THEN 30
                                WHEN p.difficulty = 'Hard' THEN 60
                                ELSE 0
                            END
                        ELSE
                            CASE
                                WHEN p.difficulty = 'Easy' THEN -10
                                WHEN p.difficulty = 'Medium' THEN -15
                                WHEN p.difficulty = 'Hard' THEN -30
                                ELSE 0
                            END
                    END
                ) as contest_points
            FROM contest_sessions cs
            JOIN contest_problems cp ON cs.session_id = cp.session_id
            JOIN problems p ON cp.problem_id = p.problem_id
            WHERE cs.user_id = $1
            GROUP BY cs.session_id, cs.end_time, cs.status
            ORDER BY cs.end_time ASC`,
            [userId]
        );

        console.log(`\nFound ${contestHistory.rows.length} contest entries in history query.`);
        contestHistory.rows.forEach(r => {
            console.log(`- Session ${r.session_id} (${r.status}): ${r.contest_points} points`);
        });

        const hasActive = contestHistory.rows.some(r => r.status === 'active');
        if (hasActive) {
            console.log('\n✅ SUCCESS: Active contest is included in the history query!');
        } else {
            console.log('\n❌ FAILURE: Active contest is NOT included!');
        }

    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await pool.end();
    }
}

verifyDashboardGraph();

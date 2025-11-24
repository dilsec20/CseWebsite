const axios = require('axios');
const pool = require('../db');

async function testDashboardAPI() {
    try {
        console.log('🔍 Testing Dashboard API for Rohit_Kumar...\n');

        const client = await pool.connect();

        // Get user ID
        const userRes = await client.query("SELECT user_id FROM users WHERE user_name = 'Rohit_Kumar'");
        const userId = userRes.rows[0].user_id;

        console.log(`User ID: ${userId}`);

        // Manually fetch rating history using dashboard logic
        const allContests = await client.query(
            `SELECT cs.session_id, cs.start_time, cs.end_time,
                    COUNT(CASE WHEN p.difficulty = 'Easy' AND cp.solved = true THEN 1 END) as easy_solved,
                    COUNT(CASE WHEN p.difficulty = 'Medium' AND cp.solved = true THEN 1 END) as medium_solved,
                    COUNT(CASE WHEN p.difficulty = 'Hard' AND cp.solved = true THEN 1 END) as hard_solved
             FROM contest_sessions cs
             JOIN contest_problems cp ON cs.session_id = cp.session_id
             JOIN problems p ON cp.problem_id = p.problem_id
             WHERE cs.user_id = $1
             GROUP BY cs.session_id, cs.start_time, cs.end_time
             ORDER BY cs.start_time ASC`,
            [userId]
        );

        let currentRating = 0;
        const ratingHistory = [];

        for (let i = 0; i < allContests.rows.length; i++) {
            const contest = allContests.rows[i];
            const easy = parseInt(contest.easy_solved);
            const medium = parseInt(contest.medium_solved);
            const hard = parseInt(contest.hard_solved);

            const score = (easy * 20) + (medium * 40) + (hard * 80);

            if (i === 0) {
                currentRating += score;
            } else {
                const prev = allContests.rows[i - 1];
                const prevEasy = parseInt(prev.easy_solved);
                const prevMedium = parseInt(prev.medium_solved);
                const prevHard = parseInt(prev.hard_solved);

                let penalty = 0;
                if (easy < prevEasy) penalty += (prevEasy - easy) * 10;
                if (medium < prevMedium) penalty += (prevMedium - medium) * 20;
                if (hard < prevHard) penalty += (prevHard - hard) * 40;

                currentRating += (score - penalty);
            }

            if (currentRating < 0) currentRating = 0;

            ratingHistory.push({
                date: new Date(contest.end_time).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
                rating: currentRating
            });
        }

        console.log('\n📊 Rating History Array:');
        console.log(JSON.stringify(ratingHistory, null, 2));

        client.release();
        await pool.end();

    } catch (err) {
        console.error('Error:', err);
        await pool.end();
    }
}

testDashboardAPI();

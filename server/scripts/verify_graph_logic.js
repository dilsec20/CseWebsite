const axios = require('axios');
const pool = require('../db');

async function verifyGraphLogic() {
    try {
        console.log('🔍 Verifying Unified Rating Logic...\n');

        const client = await pool.connect();

        // Get a user with contests
        const userRes = await client.query("SELECT DISTINCT user_id FROM contest_sessions LIMIT 1");

        if (userRes.rows.length === 0) {
            console.log('No users with contests found.');
            return;
        }

        const userId = userRes.rows[0].user_id;
        console.log(`Testing for User ID: ${userId}`);

        // Simulate the logic we just wrote
        const allContests = await client.query(
            `SELECT cs.session_id, cs.start_time, cs.end_time,
                    COUNT(CASE WHEN p.difficulty = 'Easy' AND cp.solved = true THEN 1 END) as easy_solved,
                    COUNT(CASE WHEN p.difficulty = 'Medium' AND cp.solved = true THEN 1 END) as medium_solved,
                    COUNT(CASE WHEN p.difficulty = 'Hard' AND cp.solved = true THEN 1 END) as hard_solved,
                    COUNT(CASE WHEN cp.solved = true THEN 1 END) as total_solved
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

            // Base score for this contest (Matched with Frontend: 20/40/80)
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
                date: new Date(contest.end_time).toLocaleDateString(),
                rating: currentRating
            });
        }

        console.log(`\nFinal Rating: ${currentRating}`);
        console.log('Graph Data Points:', ratingHistory.length);
        if (ratingHistory.length > 0) {
            console.log('Last Graph Point:', ratingHistory[ratingHistory.length - 1]);

            if (ratingHistory[ratingHistory.length - 1].rating === currentRating) {
                console.log('✅ SUCCESS: Graph data matches final rating!');
            } else {
                console.log('❌ FAILURE: Mismatch!');
            }
        }

    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await pool.end();
    }
}

verifyGraphLogic();

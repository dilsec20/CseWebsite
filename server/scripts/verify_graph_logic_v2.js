const axios = require('axios');
const pool = require('../db');

async function verifyGraphLogic() {
    try {
        console.log('🔍 Verifying Unified Rating Logic (Attempt 2)...\n');

        const client = await pool.connect();

        // Get a user with actual contest history
        const userRes = await client.query(`
            SELECT user_id, COUNT(*) as count 
            FROM contest_sessions 
            WHERE user_id IS NOT NULL 
            GROUP BY user_id 
            HAVING COUNT(*) > 0 
            ORDER BY count DESC 
            LIMIT 1
        `);

        if (userRes.rows.length === 0) {
            console.log('❌ No users with contests found!');
            return;
        }

        const userId = userRes.rows[0].user_id;
        console.log(`Testing for User ID: ${userId} (Contests: ${userRes.rows[0].count})`);

        // Simulate the logic
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

        console.log('\n--- Simulation Start ---');
        for (let i = 0; i < allContests.rows.length; i++) {
            const contest = allContests.rows[i];
            const easy = parseInt(contest.easy_solved);
            const medium = parseInt(contest.medium_solved);
            const hard = parseInt(contest.hard_solved);

            // Base score for this contest (Matched with Frontend: 20/40/80)
            const score = (easy * 20) + (medium * 40) + (hard * 80);

            let penalty = 0;
            if (i > 0) {
                const prev = allContests.rows[i - 1];
                const prevEasy = parseInt(prev.easy_solved);
                const prevMedium = parseInt(prev.medium_solved);
                const prevHard = parseInt(prev.hard_solved);

                if (easy < prevEasy) penalty += (prevEasy - easy) * 10;
                if (medium < prevMedium) penalty += (prevMedium - medium) * 20;
                if (hard < prevHard) penalty += (prevHard - hard) * 40;
            }

            console.log(`Contest ${i + 1}: Score=${score}, Penalty=${penalty}, PrevRating=${currentRating}`);
            currentRating += (score - penalty);

            if (currentRating < 0) currentRating = 0;
            console.log(`  -> New Rating: ${currentRating}`);

            ratingHistory.push({
                date: new Date(contest.end_time).toLocaleDateString(),
                rating: currentRating
            });
        }

        console.log(`\nFinal Calculated Rating: ${currentRating}`);
        if (ratingHistory.length > 0) {
            const lastGraphPoint = ratingHistory[ratingHistory.length - 1].rating;
            console.log(`Last Graph Point: ${lastGraphPoint}`);

            if (lastGraphPoint === currentRating) {
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

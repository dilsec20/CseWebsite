const pool = require('../db');

async function debugUserRating() {
    const client = await pool.connect();
    try {
        console.log('🕵️ Debugging User Rating Data...\n');

        // Find the user with 3 contests (as per user prompt)
        const userRes = await client.query(`
            SELECT user_id, COUNT(*) as count 
            FROM contest_sessions 
            GROUP BY user_id 
            HAVING COUNT(*) >= 2
            LIMIT 1
        `);

        if (userRes.rows.length === 0) {
            console.log('❌ No suitable user found.');
            return;
        }

        const userId = userRes.rows[0].user_id;
        console.log(`Target User ID: ${userId}`);

        const allContests = await client.query(
            `SELECT cs.session_id, cs.start_time,
                    COUNT(CASE WHEN p.difficulty = 'Easy' AND cp.solved = true THEN 1 END) as easy_solved,
                    COUNT(CASE WHEN p.difficulty = 'Medium' AND cp.solved = true THEN 1 END) as medium_solved,
                    COUNT(CASE WHEN p.difficulty = 'Hard' AND cp.solved = true THEN 1 END) as hard_solved
             FROM contest_sessions cs
             JOIN contest_problems cp ON cs.session_id = cp.session_id
             JOIN problems p ON cp.problem_id = p.problem_id
             WHERE cs.user_id = $1
             GROUP BY cs.session_id, cs.start_time
             ORDER BY cs.start_time ASC`,
            [userId]
        );

        let currentRating = 0;

        console.log('\n--- Contest History ---');
        for (let i = 0; i < allContests.rows.length; i++) {
            const c = allContests.rows[i];
            const easy = parseInt(c.easy_solved);
            const medium = parseInt(c.medium_solved);
            const hard = parseInt(c.hard_solved);

            const score = (easy * 20) + (medium * 40) + (hard * 80);

            console.log(`\nContest #${i + 1}:`);
            console.log(`   Solved: Easy=${easy}, Medium=${medium}, Hard=${hard}`);
            console.log(`   Score: ${score}`);

            if (i > 0) {
                const prev = allContests.rows[i - 1];
                const prevEasy = parseInt(prev.easy_solved);
                const prevMedium = parseInt(prev.medium_solved);
                const prevHard = parseInt(prev.hard_solved);

                let penalty = 0;
                if (easy < prevEasy) penalty += (prevEasy - easy) * 10;
                if (medium < prevMedium) penalty += (prevMedium - medium) * 20;
                if (hard < prevHard) penalty += (prevHard - hard) * 40;

                console.log(`   Penalty: ${penalty} (Prev: E=${prevEasy}, M=${prevMedium}, H=${prevHard})`);
                currentRating += (score - penalty);
            } else {
                currentRating += score;
            }

            if (currentRating < 0) currentRating = 0;
            console.log(`   => New Rating: ${currentRating}`);
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

debugUserRating();

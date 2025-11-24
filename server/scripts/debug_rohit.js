const pool = require('../db');

async function debugRohit() {
    const client = await pool.connect();
    try {
        console.log('🕵️ Debugging Rohit_Kumar...\n');

        // 1. Get User ID
        const userRes = await client.query("SELECT user_id FROM users WHERE user_name = 'Rohit_Kumar'");

        if (userRes.rows.length === 0) {
            console.log('❌ User "Rohit_Kumar" not found!');
            return;
        }

        const userId = userRes.rows[0].user_id;
        console.log(`User ID: ${userId}`);

        // 2. Get Raw Contest Data
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

        console.log(`\nFound ${allContests.rows.length} contests.`);

        let currentRating = 0;

        for (let i = 0; i < allContests.rows.length; i++) {
            const c = allContests.rows[i];
            const easy = parseInt(c.easy_solved);
            const medium = parseInt(c.medium_solved);
            const hard = parseInt(c.hard_solved);

            // Base Score
            const score = (easy * 20) + (medium * 40) + (hard * 80);

            console.log(`\n--------------------------------`);
            console.log(`Contest #${i + 1} (ID: ${c.session_id})`);
            console.log(`Solved: Easy=${easy}, Medium=${medium}, Hard=${hard}`);
            console.log(`Base Score: ${score}`);

            if (i > 0) {
                const prev = allContests.rows[i - 1];
                const prevEasy = parseInt(prev.easy_solved);
                const prevMedium = parseInt(prev.medium_solved);
                const prevHard = parseInt(prev.hard_solved);

                let penalty = 0;
                if (easy < prevEasy) {
                    const p = (prevEasy - easy) * 10;
                    console.log(`   Penalty (Easy): -${p}`);
                    penalty += p;
                }
                if (medium < prevMedium) {
                    const p = (prevMedium - medium) * 20;
                    console.log(`   Penalty (Medium): -${p}`);
                    penalty += p;
                }
                if (hard < prevHard) {
                    const p = (prevHard - hard) * 40;
                    console.log(`   Penalty (Hard): -${p}`);
                    penalty += p;
                }

                console.log(`Total Penalty: ${penalty}`);
                console.log(`Calculation: ${currentRating} + (${score} - ${penalty})`);
                currentRating += (score - penalty);
            } else {
                console.log(`Calculation: 0 + ${score}`);
                currentRating += score;
            }

            if (currentRating < 0) currentRating = 0;
            console.log(`=> New Rating: ${currentRating}`);
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

debugRohit();

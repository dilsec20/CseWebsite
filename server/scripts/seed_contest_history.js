const pool = require('../db');
require('dotenv').config();

async function seedContestHistory() {
    const client = await pool.connect();
    try {
        console.log('🌱 Seeding Contest History for Demo User...');

        // 1. Get Demo User
        const userRes = await client.query("SELECT user_id FROM users WHERE user_email = 'demo@example.com'");
        let userId;

        if (userRes.rows.length === 0) {
            console.log('⚠️ Demo user not found. Creating demo@example.com...');
            const bcrypt = require('bcryptjs');
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('demo123', salt);

            const newUser = await client.query(`
                INSERT INTO users (user_name, user_email, user_password, username)
                VALUES ('Demo User', 'demo@example.com', $1, 'demouser')
                RETURNING user_id
            `, [hashedPassword]);

            userId = newUser.rows[0].user_id;
            console.log('✅ Created demo user.');
        } else {
            userId = userRes.rows[0].user_id;
        }

        // 2. Get some problems
        const problemsRes = await client.query("SELECT problem_id FROM problems LIMIT 20");
        const problems = problemsRes.rows.map(p => p.problem_id);

        if (problems.length < 5) {
            console.log('❌ Not enough problems to seed contests.');
            return;
        }

        // 3. Create Past Contests
        const contests = [
            { date: '2023-10-01', solved: 2, total: 3 },
            { date: '2023-10-08', solved: 3, total: 3 },
            { date: '2023-10-15', solved: 1, total: 3 },
            { date: '2023-10-22', solved: 3, total: 3 },
            { date: '2023-10-29', solved: 2, total: 3 }
        ];

        for (const c of contests) {
            // Create Session
            const startTime = new Date(c.date);
            const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000); // 2 hours later

            const sessionRes = await client.query(`
                INSERT INTO contest_sessions (user_id, start_time, end_time, status)
                VALUES ($1, $2, $3, 'completed')
                RETURNING session_id
            `, [userId, startTime, endTime]);

            const sessionId = sessionRes.rows[0].session_id;

            // Add Problems
            // Pick random problems
            const shuffled = problems.sort(() => 0.5 - Math.random());
            const selected = shuffled.slice(0, c.total);

            for (let i = 0; i < c.total; i++) {
                const isSolved = i < c.solved;
                await client.query(`
                    INSERT INTO contest_problems (session_id, problem_id, solved)
                    VALUES ($1, $2, $3)
                `, [sessionId, selected[i], isSolved]);
            }

            console.log(`✅ Created contest on ${c.date} (Solved: ${c.solved}/${c.total})`);
        }

        console.log('\n🎉 Contest history seeded successfully!');

    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        client.release();
        pool.end();
    }
}

seedContestHistory();

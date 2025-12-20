const pool = require('./db');

async function testStreakLogic() {
    try {
        console.log("🧪 Testing Streak Logic...");

        // 1. Create/Get a test user
        let userResult = await pool.query("SELECT user_id FROM users WHERE username = 'streak_test_user'");
        let userId;

        if (userResult.rows.length === 0) {
            const createRes = await pool.query(
                "INSERT INTO users (username, user_name, user_email, user_password, current_streak, total_solved) VALUES ('streak_test_user', 'Streak Test', 'test@test.com', 'pass', 0, 0) RETURNING user_id"
            );
            userId = createRes.rows[0].user_id;
            console.log("Created test user:", userId);
        } else {
            userId = userResult.rows[0].user_id;
            console.log("Using existing test user:", userId);
        }

        // 2. Set last_solved_at to YESTERDAY
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        await pool.query("UPDATE users SET last_solved_at = $1, current_streak = 5 WHERE user_id = $2", [yesterday, userId]);
        console.log("Reset user state: Streak = 5, Last Solved = Yesterday");

        // 3. Simulate a "Submission" (calling update logic manually using the same code snippet from execute.js)
        console.log("Simulating Submission Outcome...");

        // --- LOGIC START ---
        const userStats = await pool.query('SELECT current_streak, last_solved_at FROM users WHERE user_id = $1', [userId]);
        const user = userStats.rows[0];
        const now = new Date();
        const lastSolved = user.last_solved_at ? new Date(user.last_solved_at) : null;
        let newStreak = user.current_streak || 0;

        if (lastSolved) {
            const isSameDay = now.toDateString() === lastSolved.toDateString();
            const prevDay = new Date(now);
            prevDay.setDate(now.getDate() - 1);
            const isYesterday = prevDay.toDateString() === lastSolved.toDateString();

            if (!isSameDay) {
                if (isYesterday) newStreak++;
                else newStreak = 1;
            }
        } else {
            newStreak = 1;
        }

        await pool.query('UPDATE users SET current_streak = $1, last_solved_at = NOW() WHERE user_id = $2', [newStreak, userId]);
        // --- LOGIC END ---

        // 4. Verify Result
        const finalRes = await pool.query("SELECT current_streak FROM users WHERE user_id = $1", [userId]);
        const finalStreak = finalRes.rows[0].current_streak;

        console.log(`Final Streak: ${finalStreak}`);

        if (finalStreak === 6) {
            console.log("✅ TEST PASSED: Streak incremented from 5 to 6.");
        } else {
            console.error(`❌ TEST FAILED: Expected 6, got ${finalStreak}`);
        }

    } catch (e) {
        console.error(e);
    } finally {
        pool.end();
    }
}

testStreakLogic();

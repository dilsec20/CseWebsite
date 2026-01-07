const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/gamification/leaderboard (Paginated) - Ranked by Contest Rating
router.get('/leaderboard', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 50;
        const offset = (page - 1) * limit;

        // Get total count of users with contest rating
        const countResult = await pool.query("SELECT COUNT(*) FROM users WHERE rating > 0");
        const totalUsers = parseInt(countResult.rows[0].count);
        const totalPages = Math.ceil(totalUsers / limit);

        const result = await pool.query(`
            SELECT 
                u.username, 
                u.profile_picture, 
                u.rating AS contest_rating,
                (SELECT COUNT(*) FROM contest_sessions cs WHERE cs.user_id = u.user_id AND cs.status = 'completed') AS contests_attended
            FROM users u
            WHERE u.rating > 0
            ORDER BY u.rating DESC
            LIMIT $1 OFFSET $2
        `, [limit, offset]);

        res.json({
            leaderboard: result.rows,
            pagination: {
                current_page: page,
                total_pages: totalPages,
                total_users: totalUsers,
                per_page: limit
            }
        });
    } catch (err) {
        console.error("Leaderboard error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// GET /api/gamification/my-streak
router.get('/my-streak', require('../middleware/authorization'), async (req, res) => {
    try {
        const userId = req.user;
        const result = await pool.query('SELECT current_streak FROM users WHERE user_id = $1', [userId]);
        res.json({ streak: result.rows[0]?.current_streak || 0 });
    } catch (err) {
        console.error("Streak fetch error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

// POST /api/gamification/update-streak
// Expects: { userId }
router.post('/update-streak', async (req, res) => {
    const { userId } = req.body;
    if (!userId) return res.status(400).json({ error: "User ID required" });

    try {
        // 1. Get current stats
        const userRes = await pool.query('SELECT current_streak, last_solved_at, total_solved FROM users WHERE user_id = $1', [userId]);
        if (userRes.rows.length === 0) return res.status(404).json({ error: "User not found" });

        const user = userRes.rows[0];
        const now = new Date();
        const lastSolved = user.last_solved_at ? new Date(user.last_solved_at) : null;

        // Logic for Streak
        let newStreak = user.current_streak;

        if (lastSolved) {
            const diffTime = Math.abs(now - lastSolved);
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

            // Check if same day (based on simple date string comparison to simulate local day logic better)
            const isSameDay = now.toDateString() === lastSolved.toDateString();
            const isYesterday = (new Date(now.setDate(now.getDate() - 1))).toDateString() === lastSolved.toDateString();
            // Reset now back
            now.setDate(now.getDate() + 1);

            if (isSameDay) {
                // Already solved today, no streak change
            } else if (isYesterday) {
                // Solved yesterday, increment
                newStreak++;
            } else {
                // Missed a day or more, reset to 1
                newStreak = 1;
            }
        } else {
            // First solve ever
            newStreak = 1;
        }

        // Increment total solved (assuming this API is called ONLY on success)
        // But better to count real submissions if possible. 
        // For simplicity here, we trust the client or caller to call this on success.
        // Actually, better to recount total_solved from table to be safe? 
        // For efficiency, we just increment.
        const newTotal = (user.total_solved || 0) + 1;

        await pool.query(`
            UPDATE users 
            SET current_streak = $1, last_solved_at = NOW(), total_solved = $2 
            WHERE user_id = $3
        `, [newStreak, newTotal, userId]);

        res.json({ success: true, streak: newStreak, total: newTotal });

    } catch (err) {
        console.error("Streak update error:", err);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;

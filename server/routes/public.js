const router = require("express").Router();
const pool = require("../db");

// GET /api/public/profile/:username - Get public user profile
router.get("/profile/:username", async (req, res) => {
    try {
        const { username } = req.params;

        // Get user info - Query by USERNAME not user_name
        const userInfo = await pool.query(
            "SELECT user_id, user_name, username, user_email, created_at, bio, profile_picture, linkedin_url, github_url, rating FROM users WHERE username = $1",
            [username]
        );

        if (userInfo.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const user = userInfo.rows[0];
        const userId = user.user_id;

        // ... (Keep existing problem queries) ...

        // Get problems solved count
        const problemsSolved = await pool.query(
            `SELECT COUNT(DISTINCT problem_id) as count 
             FROM submissions 
             WHERE user_id = $1 AND status = 'Accepted'`,
            [userId]
        );

        // Get total submissions count
        const totalSubmissions = await pool.query(
            "SELECT COUNT(*) as count FROM submissions WHERE user_id = $1",
            [userId]
        );

        // Calculate current streak
        const streakQuery = await pool.query(
            `SELECT DISTINCT DATE(submitted_at) as submission_date 
             FROM submissions 
             WHERE user_id = $1 
             ORDER BY submission_date DESC`,
            [userId]
        );

        let currentStreak = 0;
        if (streakQuery.rows.length > 0) {
            const today = new Date().toISOString().split('T')[0];
            const lastSubmission = new Date(streakQuery.rows[0].submission_date).toISOString().split('T')[0];

            if (today === lastSubmission) {
                currentStreak = 1;
                for (let i = 0; i < streakQuery.rows.length - 1; i++) {
                    const curr = new Date(streakQuery.rows[i].submission_date);
                    const next = new Date(streakQuery.rows[i + 1].submission_date);
                    const diffTime = Math.abs(curr - next);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                    if (diffDays === 1) currentStreak++;
                    else break;
                }
            }
        }

        // Get problems solved by difficulty
        const easyProblems = await pool.query(
            `SELECT COUNT(DISTINCT s.problem_id) as count
             FROM submissions s
             JOIN problems p ON s.problem_id = p.problem_id
             WHERE s.user_id = $1 AND s.status = 'Accepted' AND p.difficulty = 'Easy'`,
            [userId]
        );

        const mediumProblems = await pool.query(
            `SELECT COUNT(DISTINCT s.problem_id) as count
             FROM submissions s
             JOIN problems p ON s.problem_id = p.problem_id
             WHERE s.user_id = $1 AND s.status = 'Accepted' AND p.difficulty = 'Medium'`,
            [userId]
        );

        const hardProblems = await pool.query(
            `SELECT COUNT(DISTINCT s.problem_id) as count
             FROM submissions s
             JOIN problems p ON s.problem_id = p.problem_id
             WHERE s.user_id = $1 AND s.status = 'Accepted' AND p.difficulty = 'Hard'`,
            [userId]
        );

        // Calculate hours spent (approximate)
        const hoursSpent = Math.round(parseInt(totalSubmissions.rows[0].count) * 0.5); // Assuming 30 mins per submission

        // Get contests attended
        const contestsAttended = await pool.query(
            "SELECT COUNT(*) as count FROM contest_participations WHERE user_id = $1",
            [userId]
        );

        // Fetch Rating History from contest_participations
        const ratingHistoryQuery = await pool.query(
            `SELECT gc.end_time as date, cp.post_rating as rating
              FROM contest_participations cp
              JOIN global_contests gc ON cp.contest_id = gc.contest_id
              WHERE cp.user_id = $1 AND cp.post_rating IS NOT NULL
              ORDER BY gc.end_time ASC`,
            [userId]
        );

        const ratingHistory = ratingHistoryQuery.rows.map(row => ({
            date: new Date(row.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
            rating: row.rating
        }));

        // If no history, maybe add initial point?
        if (ratingHistory.length === 0) {
            ratingHistory.push({ date: 'Start', rating: 1200 });
        }

        const totalContestSolutions = 0; // Placeholder

        // Get submission calendar
        const submissionCalendar = await pool.query(
            `SELECT 
                DATE(submitted_at) as date,
                COUNT(*) as count
            FROM submissions
            WHERE user_id = $1 
            AND submitted_at > NOW() - INTERVAL '1 year'
            GROUP BY DATE(submitted_at)
            ORDER BY date ASC`,
            [userId]
        );

        const calendarData = submissionCalendar.rows.map(row => ({
            date: new Date(row.date).toISOString().split('T')[0],
            count: parseInt(row.count)
        }));

        res.json({
            user_name: user.user_name,
            username: user.username,
            user_email: user.user_email, // Consider hiding this for public profiles if privacy is a concern
            member_since: user.created_at,
            bio: user.bio,
            profile_picture: user.profile_picture,
            linkedin_url: user.linkedin_url,
            github_url: user.github_url,
            stats: {
                problems_solved: parseInt(problemsSolved.rows[0].count),
                easy_solved: parseInt(easyProblems.rows[0].count),
                medium_solved: parseInt(mediumProblems.rows[0].count),
                hard_solved: parseInt(hardProblems.rows[0].count),
                total_submissions: parseInt(totalSubmissions.rows[0].count),
                current_streak: currentStreak,
                hours_spent: hoursSpent,
                contests_attended: parseInt(contestsAttended.rows[0].count),
                contest_solutions: totalContestSolutions,
                contest_rating: user.rating || 1200
            },
            rating_history: ratingHistory,
            submission_calendar: calendarData
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// GET /api/public/search - Search users
router.get("/search", async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) return res.json([]);

        // Search by username OR user_name
        const users = await pool.query(
            "SELECT user_name, username, profile_picture FROM users WHERE username ILIKE $1 OR user_name ILIKE $1 LIMIT 5",
            [`%${q}%`]
        );

        res.json(users.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;

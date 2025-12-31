const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcryptjs");
const authorization = require("../middleware/authorization");

// GET /dashboard/ - Get user dashboard stats
router.get("/", authorization, async (req, res) => {
    try {
        const userId = req.user;

        // Get user info including profile fields AND rating
        const userInfo = await pool.query(
            "SELECT user_name, username, user_email, role, created_at, bio, profile_picture, linkedin_url, github_url, current_streak, rating FROM users WHERE user_id = $1",
            [userId]
        );

        if (userInfo.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const user = userInfo.rows[0];

        // ... (Keep existing problem counts queries) ...

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

        // Calculate current streak (Now fetched from users table)
        const currentStreak = user.current_streak || 0;

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

        // Get topic-wise progress
        const topicProgress = await pool.query(
            `SELECT 
                p.topic,
                COUNT(DISTINCT p.problem_id) as total_problems,
                COUNT(DISTINCT CASE WHEN s.status = 'Accepted' THEN s.problem_id END) as solved_problems
             FROM problems p
             LEFT JOIN submissions s ON p.problem_id = s.problem_id AND s.user_id = $1
             GROUP BY p.topic
             ORDER BY solved_problems DESC, p.topic`,
            [userId]
        );

        const progress = topicProgress.rows.map(row => ({
            topic: row.topic,
            total: parseInt(row.total_problems),
            solved: parseInt(row.solved_problems),
            percentage: row.total_problems > 0
                ? Math.round((row.solved_problems / row.total_problems) * 100)
                : 0
        }));

        // Get recommended problems
        const recommended = await pool.query(
            `SELECT DISTINCT ON (p.problem_id) 
                p.problem_id, p.title, p.difficulty, p.topic
             FROM problems p
             LEFT JOIN submissions s ON p.problem_id = s.problem_id AND s.user_id = $1 AND s.status = 'Accepted'
             WHERE s.submission_id IS NULL
             ORDER BY p.problem_id, RANDOM()
             LIMIT 5`,
            [userId]
        );

        // Calculate time spent
        const timeSpent = await pool.query(
            `SELECT 
                EXTRACT(EPOCH FROM (MAX(submitted_at) - MIN(submitted_at))) / 3600 as hours
             FROM submissions
             WHERE user_id = $1`,
            [userId]
        );

        const hoursSpent = timeSpent.rows[0]?.hours
            ? parseFloat(timeSpent.rows[0].hours).toFixed(1)
            : 0;


        // Get contests attended (Sum of Global Participations + Finished Generated Contest Sessions)
        const contestsAttended = await pool.query(
            `SELECT (
                (SELECT COUNT(*) FROM contest_participations WHERE user_id = $1) + 
                (SELECT COUNT(*) FROM contest_sessions WHERE user_id = $1 AND status = 'finished')
            ) as count`,
            [userId]
        );

        // Fetch Rating History from contest_participations
        // We want data points: { date, rating }
        // We use check post_rating from participations where contest is finished
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
            ratingHistory.push({ date: 'Start', rating: 0 });
        }


        // Get contest solutions (sum of all solved problems in contests)
        // 1. Solved in Generated Contests (contest_problems table)
        // 2. Solved in Global Contests (submissions table where problem has contest_id)
        const contestSolutionsQuery = await pool.query(
            `SELECT (
                (SELECT COUNT(*) FROM contest_problems WHERE session_id IN (SELECT session_id FROM contest_sessions WHERE user_id = $1) AND solved = true) +
                (SELECT COUNT(DISTINCT s.problem_id) 
                 FROM submissions s
                 JOIN problems p ON s.problem_id = p.problem_id
                 WHERE s.user_id = $1 
                 AND s.status = 'Accepted' 
                 AND p.contest_id IS NOT NULL)
            ) as count`,
            [userId]
        );
        const totalContestSolutions = parseInt(contestSolutionsQuery.rows[0].count);

        // Get submission calendar (daily counts for last year)
        const submissionCalendar = await pool.query(
            `SELECT 
                DATE(submitted_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata') as date,
                COUNT(*) as count
            FROM submissions
            WHERE user_id = $1 
            AND submitted_at > NOW() - INTERVAL '1 year'
            GROUP BY DATE(submitted_at AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata')
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
            user_email: user.user_email,
            role: user.role,
            member_since: user.created_at,
            bio: user.bio,
            profile_picture: user.profile_picture,
            linkedin_url: user.linkedin_url,
            github_url: user.github_url,
            rating_history: ratingHistory,
            submission_calendar: calendarData,
            progress: progress,
            recommended_problems: recommended.rows,
            stats: {
                problems_solved: parseInt(problemsSolved.rows[0].count),
                total_submissions: parseInt(totalSubmissions.rows[0].count),
                current_streak: currentStreak,
                hours_spent: hoursSpent,
                contests_attended: parseInt(contestsAttended.rows[0].count),
                contest_solutions: totalContestSolutions,
                contest_rating: user.rating || 0, // Show 0 if unrated
                easy_solved: parseInt(easyProblems.rows[0].count),
                medium_solved: parseInt(mediumProblems.rows[0].count),
                hard_solved: parseInt(hardProblems.rows[0].count)
            }
        });

    } catch (err) {
        console.error('Dashboard error:', err.message);
        res.status(500).json({ error: "Server error loading dashboard" });
    }
});

// PUT /dashboard/profile - Update user profile
router.put("/profile", authorization, async (req, res) => {
    try {
        const userId = req.user;
        const { user_name, username, bio, profile_picture, linkedin_url, github_url, oldPassword, newPassword } = req.body;

        let passwordHash = null;

        // Handle password change if requested
        if (newPassword) {
            if (!oldPassword) {
                return res.status(400).json({ error: "Old password is required to set a new password" });
            }

            // Get current password hash
            const userPass = await pool.query("SELECT user_password FROM users WHERE user_id = $1", [userId]);
            if (userPass.rows.length === 0) return res.status(404).json({ error: "User not found" });

            const validPassword = await bcrypt.compare(oldPassword, userPass.rows[0].user_password);
            if (!validPassword) {
                return res.status(400).json({ error: "Incorrect old password" });
            }

            const salt = await bcrypt.genSalt(10);
            passwordHash = await bcrypt.hash(newPassword, salt);
        }

        // Validate username format if provided
        if (username) {
            const usernameRegex = /^[a-zA-Z0-9_]+$/;
            if (!usernameRegex.test(username)) {
                return res.status(400).json({ error: "Username can only contain letters, numbers, and underscores" });
            }

            // Check for uniqueness
            const userExist = await pool.query(
                "SELECT user_id FROM users WHERE username = $1 AND user_id != $2",
                [username, userId]
            );

            if (userExist.rows.length > 0) {
                return res.status(400).json({ error: "Username already taken" });
            }
        }

        // Update profile fields including user_name and username
        const result = await pool.query(
            `UPDATE users 
             SET user_name = COALESCE($1, user_name),
                 username = COALESCE($2, username),
                 bio = $3,
                 profile_picture = $4,
                 linkedin_url = $5,
                 github_url = $6,
                 user_password = COALESCE($7, user_password)
             WHERE user_id = $8
             RETURNING user_name, username, bio, profile_picture, linkedin_url, github_url`,
            [user_name, username, bio, profile_picture, linkedin_url, github_url, passwordHash, userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({
            message: "Profile updated successfully",
            profile: result.rows[0]
        });

    } catch (err) {
        console.error('Profile update error:', err.message);
        res.status(500).json({ error: "Server error updating profile" });
    }
});

module.exports = router;

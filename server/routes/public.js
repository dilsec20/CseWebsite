const router = require("express").Router();
const pool = require("../db");

// GET /api/public/profile/:username - Get public user profile
router.get("/profile/:username", async (req, res) => {
    try {
        const { username } = req.params;

        // Get user info - Query by USERNAME not user_name
        const userInfo = await pool.query(
            "SELECT user_id, user_name, username, user_email, created_at, bio, profile_picture, linkedin_url, github_url FROM users WHERE username = $1",
            [username]
        );

        if (userInfo.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const user = userInfo.rows[0];
        const userId = user.user_id;

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

        // Get contests attended (handle missing table gracefully)
        let contestsAttended = 0;
        try {
            const contestsResult = await pool.query(
                `SELECT COUNT(DISTINCT session_id) as count
                 FROM contest_sessions
                 WHERE user_id = $1`,
                [userId]
            );
            contestsAttended = parseInt(contestsResult.rows[0].count);
        } catch (err) {
            // Table doesn't exist yet, use default value
            console.log('Contest table not found, using default value');
        }

        // Calculate Contest Rating (Relative Performance Logic)
        // 1. Fetch all contest sessions for user ordered by time
        let currentRating = 0;
        let totalContestSolutions = 0;
        const ratingHistory = [];

        try {
            const allContests = await pool.query(
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

            for (let i = 0; i < allContests.rows.length; i++) {
                const contest = allContests.rows[i];
                const easy = parseInt(contest.easy_solved);
                const medium = parseInt(contest.medium_solved);
                const hard = parseInt(contest.hard_solved);
                totalContestSolutions += parseInt(contest.total_solved);

                // Base score for this contest (Matched with Dashboard: 20/40/80)
                const score = (easy * 20) + (medium * 40) + (hard * 80);

                if (i === 0) {
                    // First contest: No penalty, just add score
                    currentRating += score;
                } else {
                    // Subsequent contests: Compare with previous
                    const prev = allContests.rows[i - 1];
                    const prevEasy = parseInt(prev.easy_solved);
                    const prevMedium = parseInt(prev.medium_solved);
                    const prevHard = parseInt(prev.hard_solved);

                    let penalty = 0;
                    // Penalty only if solved count DROPS compared to previous contest
                    if (easy < prevEasy) penalty += (prevEasy - easy) * 10;
                    if (medium < prevMedium) penalty += (prevMedium - medium) * 20;
                    if (hard < prevHard) penalty += (prevHard - hard) * 40;

                    currentRating += (score - penalty);
                }

                // Ensure rating doesn't go below 0
                if (currentRating < 0) currentRating = 0;

                // Add to history with unique date (append contest number if multiple contests on same day)
                const dateStr = new Date(contest.end_time).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
                const uniqueDate = allContests.rows.length > 1 ? `${dateStr} #${i + 1}` : dateStr;
                ratingHistory.push({
                    date: uniqueDate,
                    rating: currentRating
                });
            }
        } catch (err) {
            console.log('Contest rating calculation failed:', err.message);
        }

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
                contests_attended: contestsAttended,
                contest_solutions: totalContestSolutions,
                contest_rating: currentRating
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

const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

// Middleware to check if user is admin
const verifyAdmin = async (req, res, next) => {
    try {
        const user = await pool.query("SELECT role FROM users WHERE user_id = $1", [req.user]);
        if (user.rows.length === 0 || user.rows[0].role !== 'admin') {
            return res.status(403).json("Access Denied: Admin only");
        }
        next();
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
};

// Get Dashboard Stats
router.get("/stats", authorization, verifyAdmin, async (req, res) => {
    try {
        // 1. Total Users
        const userCount = await pool.query("SELECT COUNT(*) FROM users");

        // 2. Total Submissions
        const submissionCount = await pool.query("SELECT COUNT(*) FROM submissions");

        // 3. New Users (Last 7 days)
        const recentUsers = await pool.query(
            "SELECT COUNT(*) FROM users WHERE created_at > NOW() - INTERVAL '7 days'"
        );

        // 4. Total Problems Solved (Unique user-problem pairs)
        const solvedCount = await pool.query(
            "SELECT COUNT(*) FROM user_progress WHERE solved = true"
        );

        res.json({
            total_users: parseInt(userCount.rows[0].count),
            total_submissions: parseInt(submissionCount.rows[0].count),
            new_users_7d: parseInt(recentUsers.rows[0].count),
            total_solved: parseInt(solvedCount.rows[0].count),

            // Visitor Stats (using IST timezone for daily reset at midnight IST)
            // Total all-time visits
            total_visits: parseInt((await pool.query("SELECT COUNT(*) FROM visitor_logs")).rows[0].count),

            // Visits today (IST) - counts all page views today
            visits_today: parseInt((await pool.query(`
                SELECT COUNT(*) FROM visitor_logs 
                WHERE (visit_time AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata')::date = (NOW() AT TIME ZONE 'Asia/Kolkata')::date
            `)).rows[0].count),

            // Unique visitors today (IST) - each IP counts once per day
            unique_visitors_today: parseInt((await pool.query(`
                SELECT COUNT(DISTINCT ip_address) FROM visitor_logs 
                WHERE (visit_time AT TIME ZONE 'UTC' AT TIME ZONE 'Asia/Kolkata')::date = (NOW() AT TIME ZONE 'Asia/Kolkata')::date
            `)).rows[0].count),

            // Total unique visitors (all-time) - distinct people who ever visited
            total_unique_visitors: parseInt((await pool.query("SELECT COUNT(DISTINCT ip_address) FROM visitor_logs")).rows[0].count),

            // Top traffic sources (referrers) - last 7 days, excluding internal navigation
            top_referrers: (await pool.query(`
                SELECT 
                    CASE 
                        WHEN referrer IS NULL OR referrer = '' THEN 'Direct'
                        WHEN referrer LIKE '%google%' THEN 'Google'
                        WHEN referrer LIKE '%facebook%' THEN 'Facebook'
                        WHEN referrer LIKE '%twitter%' OR referrer LIKE '%t.co%' THEN 'Twitter/X'
                        WHEN referrer LIKE '%linkedin%' THEN 'LinkedIn'
                        WHEN referrer LIKE '%instagram%' THEN 'Instagram'
                        WHEN referrer LIKE '%youtube%' THEN 'YouTube'
                        WHEN referrer LIKE '%github%' THEN 'GitHub'
                        WHEN referrer LIKE '%reddit%' THEN 'Reddit'
                        ELSE SUBSTRING(referrer FROM 'https?://([^/]+)') 
                    END as source,
                    COUNT(*) as visits
                FROM visitor_logs 
                WHERE visit_time > NOW() - INTERVAL '7 days'
                  AND (referrer IS NULL OR referrer NOT LIKE '%acecoder.site%')
                GROUP BY source
                ORDER BY visits DESC
                LIMIT 10
            `)).rows
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

// Get User List (Paginated)
router.get("/users", authorization, verifyAdmin, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 50;
        const offset = (page - 1) * limit;

        // Get total count
        const countResult = await pool.query("SELECT COUNT(*) FROM users");
        const totalUsers = parseInt(countResult.rows[0].count);
        const totalPages = Math.ceil(totalUsers / limit);

        const users = await pool.query(
            `SELECT user_id, user_name, username, user_email, role, created_at, profile_picture 
             FROM users 
             ORDER BY created_at DESC 
             LIMIT $1 OFFSET $2`,
            [limit, offset]
        );

        res.json({
            users: users.rows,
            pagination: {
                current_page: page,
                total_pages: totalPages,
                total_users: totalUsers,
                per_page: limit
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

module.exports = router;

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
            total_solved: parseInt(solvedCount.rows[0].count)
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

// Get User List
router.get("/users", authorization, verifyAdmin, async (req, res) => {
    try {
        const users = await pool.query(
            `SELECT user_id, user_name, username, user_email, role, created_at 
             FROM users 
             ORDER BY created_at DESC 
             LIMIT 50`
        );
        res.json(users.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

module.exports = router;

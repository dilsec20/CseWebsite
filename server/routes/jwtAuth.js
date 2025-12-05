const router = require("express").Router();
const pool = require("../db");
const bcrypt = require("bcryptjs");
const jwtGenerator = require("../utils/jwtGenerator");
const authorization = require("../middleware/authorization");

// Helper function to generate username
function generateUsername(name) {
    if (!name) return 'user';

    // Replace spaces with underscores, remove special characters, convert to lowercase
    return name
        .toLowerCase()
        .replace(/\s+/g, '_')           // Replace spaces with underscores
        .replace(/[^a-z0-9_]/g, '');    // Remove any character that's not alphanumeric or underscore
}

// Register
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, username } = req.body;

        // Validate username format (backend side)
        const usernameRegex = /^[a-zA-Z0-9_]+$/;
        if (!username || !usernameRegex.test(username)) {
            return res.status(400).json("Invalid username format. Only letters, numbers, and underscores allowed.");
        }

        // Check if email exists
        const userCheck = await pool.query(
            "SELECT * FROM users WHERE user_email = $1",
            [email]
        );

        if (userCheck.rows.length > 0) {
            return res.status(401).json("User already exists");
        }

        // Check if username exists
        const usernameCheck = await pool.query(
            "SELECT * FROM users WHERE username = $1",
            [username]
        );

        if (usernameCheck.rows.length > 0) {
            return res.status(401).json("Username is already taken");
        }

        // Hash password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        // Create new user with username
        const newUser = await pool.query(
            "INSERT INTO users (user_name, user_email, user_password, username) VALUES ($1, $2, $3, $4) RETURNING user_id, user_name, user_email, username",
            [name, email, bcryptPassword, username]
        );

        // Generate JWT token
        const token = jwtGenerator(newUser.rows[0].user_id);

        res.json({ token, username: newUser.rows[0].username });
    } catch (err) {
        console.error("Registration Error Details:", err);
        res.status(500).send("Server Error: " + err.message);
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email OR username
        const user = await pool.query(
            "SELECT * FROM users WHERE user_email = $1 OR username = $1",
            [email] // The 'email' field can contain either email or username
        );

        if (user.rows.length === 0) {
            return res.status(401).json("Password or Email/Username is incorrect");
        }

        // Validate password
        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);
        if (!validPassword) {
            return res.status(401).json("Password or Email/Username is incorrect");
        }

        // Generate JWT token
        const token = jwtGenerator(user.rows[0].user_id);

        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Verify Token
router.get("/is-verify", authorization, async (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Forgot Password - Send OTP
router.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;
        const { generateOTP, sendOTPEmail } = require('../utils/emailService');

        // Check if email exists
        const user = await pool.query(
            "SELECT user_name, user_email FROM users WHERE user_email = $1",
            [email]
        );

        if (user.rows.length === 0) {
            return res.status(404).json({ error: "Email not found" });
        }

        // Generate OTP
        const otp = generateOTP();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

        // Store OTP in database
        await pool.query(
            "INSERT INTO password_reset_tokens (user_email, otp_code, expires_at) VALUES ($1, $2, $3)",
            [email, otp, expiresAt]
        );

        // Send OTP email
        const emailResult = await sendOTPEmail(email, otp, user.rows[0].user_name);

        if (!emailResult.success) {
            return res.status(500).json({
                error: "Failed to send email",
                details: emailResult.error
            });
        }

        res.json({
            message: "OTP sent to your email",
            email: email
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// Reset Password - Verify OTP and Update Password
router.post("/reset-password", async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;

        // Find valid OTP
        const otpRecord = await pool.query(
            `SELECT * FROM password_reset_tokens 
             WHERE user_email = $1 AND otp_code = $2 AND used = false 
             AND expires_at > NOW() 
             ORDER BY created_at DESC 
             LIMIT 1`,
            [email, otp]
        );

        if (otpRecord.rows.length === 0) {
            return res.status(400).json({ error: "Invalid or expired OTP" });
        }

        // Hash new password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(newPassword, salt);

        // Update password
        await pool.query(
            "UPDATE users SET user_password = $1 WHERE user_email = $2",
            [bcryptPassword, email]
        );

        // Mark OTP as used
        await pool.query(
            "UPDATE password_reset_tokens SET used = true WHERE reset_id = $1",
            [otpRecord.rows[0].reset_id]
        );

        res.json({ message: "Password reset successful" });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;

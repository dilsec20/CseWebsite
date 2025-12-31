const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

// ---------------- FOLLOW SYSTEM ----------------

// POST /api/social/follow/:id - Follow a user
router.post("/follow/:id", authorization, async (req, res) => {
    try {
        const follower_id = req.user;
        const following_id = req.params.id;

        if (follower_id === following_id) {
            return res.status(400).json({ error: "Cannot follow yourself" });
        }

        // Check if already following
        const check = await pool.query(
            "SELECT * FROM follows WHERE follower_id = $1 AND following_id = $2",
            [follower_id, following_id]
        );

        if (check.rows.length > 0) {
            return res.status(400).json({ error: "Already following" });
        }

        await pool.query(
            "INSERT INTO follows (follower_id, following_id) VALUES ($1, $2)",
            [follower_id, following_id]
        );

        res.json({ message: "Followed successfully", isFollowing: true });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// DELETE /api/social/follow/:id - Unfollow a user
router.delete("/follow/:id", authorization, async (req, res) => {
    try {
        const follower_id = req.user;
        const following_id = req.params.id;

        await pool.query(
            "DELETE FROM follows WHERE follower_id = $1 AND following_id = $2",
            [follower_id, following_id]
        );

        res.json({ message: "Unfollowed successfully", isFollowing: false });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// GET /api/social/status/:id - Check if following a specific user
router.get("/status/:id", authorization, async (req, res) => {
    try {
        const follower_id = req.user;
        const following_id = req.params.id;

        const check = await pool.query(
            "SELECT * FROM follows WHERE follower_id = $1 AND following_id = $2",
            [follower_id, following_id]
        );

        res.json({ isFollowing: check.rows.length > 0 });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// GET /api/social/following - Get list of users I follow
router.get("/following", authorization, async (req, res) => {
    try {
        const user_id = req.user;

        const following = await pool.query(
            `SELECT u.user_id, u.username, u.user_name, u.profile_picture 
             FROM follows f
             JOIN users u ON f.following_id = u.user_id
             WHERE f.follower_id = $1
             ORDER BY f.created_at DESC`,
            [user_id]
        );

        res.json(following.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// ---------------- MESSAGING SYSTEM ----------------

// POST /api/social/message/:id - Send a message
router.post("/message/:id", authorization, async (req, res) => {
    try {
        const sender_id = req.user;
        const receiver_id = req.params.id;
        const { content } = req.body;

        if (!content || !content.trim()) {
            return res.status(400).json({ error: "Message content cannot be empty" });
        }

        const newMessage = await pool.query(
            "INSERT INTO messages (sender_id, receiver_id, content) VALUES ($1, $2, $3) RETURNING *",
            [sender_id, receiver_id, content]
        );

        res.json(newMessage.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// GET /api/social/conversations - Get list of users messaged with
router.get("/conversations", authorization, async (req, res) => {
    try {
        const user_id = req.user;

        // Complex query to get latest message for each distinct contact
        const conversations = await pool.query(
            `
            SELECT DISTINCT ON (contact_id)
                u.user_id as contact_id,
                u.username, 
                u.user_name, 
                u.profile_picture,
                m.content as last_message,
                m.created_at as last_message_time,
                m.sender_id,
                (m.sender_id != $1 AND m.is_read = false) as has_unread
            FROM messages m
            JOIN users u ON (m.sender_id = u.user_id OR m.receiver_id = u.user_id)
            WHERE (m.sender_id = $1 OR m.receiver_id = $1) AND u.user_id != $1
            ORDER BY contact_id, m.created_at DESC
            `,
            [user_id]
        );

        // Sort conversations by time (most recent first)
        const sortedConversations = conversations.rows.sort((a, b) =>
            new Date(b.last_message_time) - new Date(a.last_message_time)
        );

        res.json(sortedConversations);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// GET /api/social/messages/:id - Get chat history with specific user
router.get("/messages/:id", authorization, async (req, res) => {
    try {
        const user_id = req.user;
        const other_user_id = req.params.id;

        const messages = await pool.query(
            `SELECT * FROM messages 
             WHERE (sender_id = $1 AND receiver_id = $2) 
                OR (sender_id = $2 AND receiver_id = $1)
             ORDER BY created_at ASC`,
            [user_id, other_user_id]
        );

        // Mark as read (simple implementation)
        await pool.query(
            "UPDATE messages SET is_read = true WHERE sender_id = $1 AND receiver_id = $2 AND is_read = false",
            [other_user_id, user_id]
        );

        res.json(messages.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// GET /api/social/unread - Check for any unread messages
router.get("/unread", authorization, async (req, res) => {
    try {
        const user_id = req.user;
        const unread = await pool.query(
            "SELECT 1 FROM messages WHERE receiver_id = $1 AND is_read = false LIMIT 1",
            [user_id]
        );
        res.json({ hasUnread: unread.rows.length > 0 });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;

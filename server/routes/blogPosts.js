// Blog Posts Routes - Separate from Discussions
const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

// GET /api/blog-posts/recent - Get recent blog posts
router.get("/recent", async (req, res) => {
    try {
        const posts = await pool.query(
            `SELECT bp.*, u.username as author_name, u.user_id as author_id 
             FROM blog_posts bp
             JOIN users u ON bp.user_id = u.user_id
             ORDER BY bp.created_at DESC
             LIMIT 20`
        );
        res.json(posts.rows);
    } catch (err) {
        console.error("blog-posts/recent error:", err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// GET /api/blog-posts/user/my-posts - Get current user's blog posts
router.get("/user/my-posts", authorization, async (req, res) => {
    try {
        const user_id = req.user;
        const posts = await pool.query(
            `SELECT bp.*, u.username as author_name 
             FROM blog_posts bp
             JOIN users u ON bp.user_id = u.user_id
             WHERE bp.user_id = $1
             ORDER BY bp.created_at DESC`,
            [user_id]
        );
        res.json(posts.rows);
    } catch (err) {
        console.error("blog-posts/user/my-posts error:", err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// GET /api/blog-posts/:id - Get single blog post
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const post = await pool.query(
            `SELECT bp.*, u.username as author_name 
             FROM blog_posts bp
             JOIN users u ON bp.user_id = u.user_id
             WHERE bp.post_id = $1`,
            [id]
        );

        if (post.rows.length === 0) {
            return res.status(404).json({ error: "Blog post not found" });
        }

        // Increment views
        await pool.query("UPDATE blog_posts SET views = COALESCE(views, 0) + 1 WHERE post_id = $1", [id]);

        let isUpvoted = false;
        const token = req.header("token");
        if (token) {
            try {
                const payload = require("jsonwebtoken").verify(token, process.env.JWT_SECRET);
                const user_id = payload.user.id;
                const upvoteCheck = await pool.query(
                    "SELECT 1 FROM blog_post_upvotes WHERE post_id = $1 AND user_id = $2",
                    [id, user_id]
                );
                isUpvoted = upvoteCheck.rows.length > 0;
            } catch (err) {
                // Ignore invalid token
            }
        }

        const postData = post.rows[0];
        postData.views = (postData.views || 0) + 1;
        postData.is_upvoted = isUpvoted;

        res.json(postData);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// POST /api/blog-posts - Create new blog post
router.post("/", authorization, async (req, res) => {
    try {
        const { title, content } = req.body;
        const user_id = req.user;

        const newPost = await pool.query(
            "INSERT INTO blog_posts (user_id, title, content) VALUES ($1, $2, $3) RETURNING *",
            [user_id, title, content]
        );

        res.json(newPost.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// DELETE /api/blog-posts/:id
router.delete("/:id", authorization, async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.user;

        const post = await pool.query("SELECT * FROM blog_posts WHERE post_id = $1", [id]);

        if (post.rows.length === 0) {
            return res.status(404).json({ error: "Blog post not found" });
        }

        if (post.rows[0].user_id !== user_id) {
            return res.status(403).json({ error: "Not authorized" });
        }

        await pool.query("DELETE FROM blog_posts WHERE post_id = $1", [id]);
        res.json({ message: "Blog post deleted" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// PUT /api/blog-posts/:id
router.put("/:id", authorization, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const user_id = req.user;

        const post = await pool.query("SELECT * FROM blog_posts WHERE post_id = $1", [id]);

        if (post.rows.length === 0) {
            return res.status(404).json({ error: "Blog post not found" });
        }

        if (post.rows[0].user_id !== user_id) {
            return res.status(403).json({ error: "Not authorized" });
        }

        const updated = await pool.query(
            "UPDATE blog_posts SET title = $1, content = $2, updated_at = CURRENT_TIMESTAMP WHERE post_id = $3 RETURNING *",
            [title, content, id]
        );

        res.json(updated.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// POST /api/blog-posts/:id/upvote
router.post("/:id/upvote", authorization, async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.user;

        const check = await pool.query(
            "SELECT * FROM blog_post_upvotes WHERE post_id = $1 AND user_id = $2",
            [id, user_id]
        );

        let isUpvoted = false;
        if (check.rows.length > 0) {
            await pool.query("DELETE FROM blog_post_upvotes WHERE post_id = $1 AND user_id = $2", [id, user_id]);
            await pool.query("UPDATE blog_posts SET likes = likes - 1 WHERE post_id = $1", [id]);
            isUpvoted = false;
        } else {
            await pool.query("INSERT INTO blog_post_upvotes (post_id, user_id) VALUES ($1, $2)", [id, user_id]);
            await pool.query("UPDATE blog_posts SET likes = likes + 1 WHERE post_id = $1", [id]);
            isUpvoted = true;
        }

        const updated = await pool.query("SELECT likes FROM blog_posts WHERE post_id = $1", [id]);
        res.json({ likes: updated.rows[0].likes, isUpvoted });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// GET /api/blog-posts/:id/comments
router.get("/:id/comments", async (req, res) => {
    try {
        const { id } = req.params;
        const comments = await pool.query(
            `SELECT c.*, u.username as author_name, u.profile_picture 
             FROM blog_post_comments c
             JOIN users u ON c.user_id = u.user_id
             WHERE c.post_id = $1
             ORDER BY c.created_at DESC`,
            [id]
        );
        res.json(comments.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// POST /api/blog-posts/:id/comments
router.post("/:id/comments", authorization, async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const user_id = req.user;

        if (!content || !content.trim()) {
            return res.status(400).json({ error: "Comment cannot be empty" });
        }

        const newComment = await pool.query(
            "INSERT INTO blog_post_comments (post_id, user_id, content) VALUES ($1, $2, $3) RETURNING *",
            [id, user_id, content]
        );

        const withUser = await pool.query(
            `SELECT c.*, u.username as author_name, u.profile_picture 
             FROM blog_post_comments c
             JOIN users u ON c.user_id = u.user_id
             WHERE c.comment_id = $1`,
            [newComment.rows[0].comment_id]
        );

        res.json(withUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;

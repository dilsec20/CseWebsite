const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

// GET /api/blogs/recent - Get recent blogs
router.get("/recent", async (req, res) => {
    try {
        const blogs = await pool.query(
            `SELECT b.*, u.username as author_name, u.user_id as author_id 
             FROM blogs b
             JOIN users u ON b.user_id = u.user_id
             ORDER BY b.created_at DESC
             LIMIT 10`
        );
        res.json(blogs.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// GET /api/blogs/:id - Get single blog
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await pool.query(
            `SELECT b.*, u.username as author_name 
             FROM blogs b
             JOIN users u ON b.user_id = u.user_id
             WHERE b.blog_id = $1`,
            [id]
        );

        if (blog.rows.length === 0) {
            return res.status(404).json({ error: "Blog not found" });
        }

        res.json(blog.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// POST /api/blogs - Create new blog
router.post("/", authorization, async (req, res) => {
    try {
        const { title, content } = req.body;
        const user_id = req.user;

        const newBlog = await pool.query(
            "INSERT INTO blogs (user_id, title, content) VALUES ($1, $2, $3) RETURNING *",
            [user_id, title, content]
        );

        res.json(newBlog.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;

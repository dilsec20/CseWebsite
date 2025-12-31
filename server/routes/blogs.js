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

        // Increment views
        await pool.query("UPDATE blogs SET views = COALESCE(views, 0) + 1 WHERE blog_id = $1", [id]);

        // Return updated view count (locally update the object)
        const blogData = blog.rows[0];
        blogData.views = (blogData.views || 0) + 1;

        res.json(blogData);
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

// DELETE /api/blogs/:id - Delete a blog post
router.delete("/:id", authorization, async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.user;

        // Check if blog exists and belongs to user
        const blog = await pool.query("SELECT * FROM blogs WHERE blog_id = $1", [id]);

        if (blog.rows.length === 0) {
            return res.status(404).json({ error: "Blog not found" });
        }

        if (blog.rows[0].user_id !== user_id) {
            return res.status(403).json({ error: "Not authorized to delete this blog" });
        }

        await pool.query("DELETE FROM blogs WHERE blog_id = $1", [id]);
        res.json({ message: "Blog deleted successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// PUT /api/blogs/:id - Update a blog post
router.put("/:id", authorization, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const user_id = req.user;

        // Check if blog exists and belongs to user
        const blog = await pool.query("SELECT * FROM blogs WHERE blog_id = $1", [id]);

        if (blog.rows.length === 0) {
            return res.status(404).json({ error: "Blog not found" });
        }

        if (blog.rows[0].user_id !== user_id) {
            return res.status(403).json({ error: "Not authorized to update this blog" });
        }

        const updatedBlog = await pool.query(
            "UPDATE blogs SET title = $1, content = $2 WHERE blog_id = $3 RETURNING *",
            [title, content, id]
        );

        res.json(updatedBlog.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// GET /api/blogs/user/my-posts - Get all posts by current user
router.get("/user/my-posts", authorization, async (req, res) => {
    try {
        const user_id = req.user;
        const blogs = await pool.query(
            `SELECT b.*, u.username as author_name 
             FROM blogs b
             JOIN users u ON b.user_id = u.user_id
             WHERE b.user_id = $1
             ORDER BY b.created_at DESC`,
            [user_id]
        );
        res.json(blogs.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;

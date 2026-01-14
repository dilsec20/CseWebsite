const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

// Helper to check if type column exists
let typeColumnExists = null;
const checkTypeColumn = async () => {
    if (typeColumnExists !== null) return typeColumnExists;
    try {
        await pool.query("SELECT type FROM blogs LIMIT 1");
        typeColumnExists = true;
    } catch (err) {
        typeColumnExists = false;
    }
    return typeColumnExists;
};

// ============================================
// IMPORTANT: Specific routes MUST come BEFORE wildcard /:id routes!
// ============================================

// GET /api/blogs/recent - Get recent blogs (type = 'blog' only, or all if no type column)
router.get("/recent", async (req, res) => {
    try {
        const hasType = await checkTypeColumn();
        let query;

        if (hasType) {
            query = `SELECT b.*, u.username as author_name, u.user_id as author_id 
                     FROM blogs b
                     JOIN users u ON b.user_id = u.user_id
                     WHERE b.type = 'blog'
                     ORDER BY b.created_at DESC
                     LIMIT 20`;
        } else {
            // No type column yet - return all for /blog page
            query = `SELECT b.*, u.username as author_name, u.user_id as author_id 
                     FROM blogs b
                     JOIN users u ON b.user_id = u.user_id
                     ORDER BY b.created_at DESC
                     LIMIT 20`;
        }

        const blogs = await pool.query(query);
        res.json(blogs.rows);
    } catch (err) {
        console.error("blogs/recent error:", err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// GET /api/blogs/discussions - Get discussions
router.get("/discussions", async (req, res) => {
    try {
        const hasType = await checkTypeColumn();
        let query;

        if (hasType) {
            query = `SELECT b.*, u.username as author_name, u.user_id as author_id 
                     FROM blogs b
                     JOIN users u ON b.user_id = u.user_id
                     WHERE b.type = 'discussion' OR b.type IS NULL
                     ORDER BY b.created_at DESC
                     LIMIT 10`;
        } else {
            // No type column - return all posts as discussions
            query = `SELECT b.*, u.username as author_name, u.user_id as author_id 
                     FROM blogs b
                     JOIN users u ON b.user_id = u.user_id
                     ORDER BY b.created_at DESC
                     LIMIT 10`;
        }

        const blogs = await pool.query(query);
        res.json(blogs.rows);
    } catch (err) {
        console.error("blogs/discussions error:", err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// GET /api/blogs/user/my-posts - Get all DISCUSSIONS by current user
router.get("/user/my-posts", authorization, async (req, res) => {
    try {
        const user_id = req.user;
        const hasType = await checkTypeColumn();
        let query;

        if (hasType) {
            query = `SELECT b.*, u.username as author_name 
                     FROM blogs b
                     JOIN users u ON b.user_id = u.user_id
                     WHERE b.user_id = $1 AND (b.type = 'discussion' OR b.type IS NULL)
                     ORDER BY b.created_at DESC`;
        } else {
            query = `SELECT b.*, u.username as author_name 
                     FROM blogs b
                     JOIN users u ON b.user_id = u.user_id
                     WHERE b.user_id = $1
                     ORDER BY b.created_at DESC`;
        }

        const blogs = await pool.query(query, [user_id]);
        res.json(blogs.rows);
    } catch (err) {
        console.error("user/my-posts error:", err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// GET /api/blogs/user/my-blogs - Get all BLOGS by current user
router.get("/user/my-blogs", authorization, async (req, res) => {
    try {
        const user_id = req.user;
        const hasType = await checkTypeColumn();
        let query;

        if (hasType) {
            query = `SELECT b.*, u.username as author_name 
                     FROM blogs b
                     JOIN users u ON b.user_id = u.user_id
                     WHERE b.user_id = $1 AND b.type = 'blog'
                     ORDER BY b.created_at DESC`;
        } else {
            // No type column - return empty (no blogs created yet)
            query = `SELECT b.*, u.username as author_name 
                     FROM blogs b
                     JOIN users u ON b.user_id = u.user_id
                     WHERE b.user_id = $1 AND 1=0
                     ORDER BY b.created_at DESC`;
        }

        const blogs = await pool.query(query, [user_id]);
        res.json(blogs.rows);
    } catch (err) {
        console.error("user/my-blogs error:", err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// ============================================
// Wildcard routes come AFTER specific routes
// ============================================

// GET /api/blogs/:id - Get single blog/discussion
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

        let isUpvoted = false;
        const token = req.header("token");
        if (token) {
            try {
                const payload = require("jsonwebtoken").verify(token, process.env.JWT_SECRET);
                const user_id = payload.user.id;
                const upvoteCheck = await pool.query(
                    "SELECT 1 FROM blog_upvotes WHERE blog_id = $1 AND user_id = $2",
                    [id, user_id]
                );
                isUpvoted = upvoteCheck.rows.length > 0;
            } catch (err) {
                // Ignore invalid token
            }
        }

        const blogData = blog.rows[0];
        blogData.views = (blogData.views || 0) + 1;
        blogData.is_upvoted = isUpvoted;

        res.json(blogData);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// POST /api/blogs - Create new blog
router.post("/", authorization, async (req, res) => {
    try {
        const { title, content, type = 'discussion' } = req.body;
        const user_id = req.user;
        const hasType = await checkTypeColumn();

        let newBlog;
        if (hasType) {
            newBlog = await pool.query(
                "INSERT INTO blogs (user_id, title, content, type) VALUES ($1, $2, $3, $4) RETURNING *",
                [user_id, title, content, type]
            );
        } else {
            newBlog = await pool.query(
                "INSERT INTO blogs (user_id, title, content) VALUES ($1, $2, $3) RETURNING *",
                [user_id, title, content]
            );
        }

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

// POST /api/blogs/:id/upvote - Toggle upvote
router.post("/:id/upvote", authorization, async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.user;

        const check = await pool.query(
            "SELECT * FROM blog_upvotes WHERE blog_id = $1 AND user_id = $2",
            [id, user_id]
        );

        let isUpvoted = false;
        if (check.rows.length > 0) {
            await pool.query(
                "DELETE FROM blog_upvotes WHERE blog_id = $1 AND user_id = $2",
                [id, user_id]
            );
            await pool.query("UPDATE blogs SET likes = likes - 1 WHERE blog_id = $1", [id]);
            isUpvoted = false;
        } else {
            await pool.query(
                "INSERT INTO blog_upvotes (blog_id, user_id) VALUES ($1, $2)",
                [id, user_id]
            );
            await pool.query("UPDATE blogs SET likes = likes + 1 WHERE blog_id = $1", [id]);
            isUpvoted = true;
        }

        const updatedBlog = await pool.query("SELECT likes FROM blogs WHERE blog_id = $1", [id]);
        res.json({ likes: updatedBlog.rows[0].likes, isUpvoted });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// GET /api/blogs/:id/comments - Get comments
router.get("/:id/comments", async (req, res) => {
    try {
        const { id } = req.params;
        const comments = await pool.query(
            `SELECT c.*, u.username as author_name, u.profile_picture 
             FROM blog_comments c
             JOIN users u ON c.user_id = u.user_id
             WHERE c.blog_id = $1
             ORDER BY c.created_at DESC`,
            [id]
        );
        res.json(comments.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// POST /api/blogs/:id/comments - Add comment
router.post("/:id/comments", authorization, async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const user_id = req.user;

        if (!content || !content.trim()) {
            return res.status(400).json({ error: "Comment cannot be empty" });
        }

        const newComment = await pool.query(
            "INSERT INTO blog_comments (blog_id, user_id, content) VALUES ($1, $2, $3) RETURNING *",
            [id, user_id, content]
        );

        const commentWithUser = await pool.query(
            `SELECT c.*, u.username as author_name, u.profile_picture 
             FROM blog_comments c
             JOIN users u ON c.user_id = u.user_id
             WHERE c.comment_id = $1`,
            [newComment.rows[0].comment_id]
        );

        res.json(commentWithUser.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;

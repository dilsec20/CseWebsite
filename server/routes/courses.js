const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

// Middleware to check specific role
const verifyRole = (role) => async (req, res, next) => {
    try {
        const user = await pool.query("SELECT role FROM users WHERE user_id = $1", [req.user]);
        if (user.rows.length === 0 || user.rows[0].role !== role) {
            return res.status(403).json("Access Denied");
        }
        next();
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
};

const verifyAdmin = verifyRole('admin');

// 1. Get All Courses (Public)
router.get("/", async (req, res) => {
    try {
        const { category } = req.query;
        let query = "SELECT * FROM courses";
        let params = [];

        if (category) {
            query += " WHERE category = $1";
            params.push(category);
        }

        query += " ORDER BY created_at DESC";

        const courses = await pool.query(query, params);
        res.json(courses.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

// 2. Get Single Course Details (Public/Protected mixed)
// Returns course info + videos if enrolled (or all videos if free/public logic applies)
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Get course info
        const course = await pool.query("SELECT * FROM courses WHERE course_id = $1", [id]);

        if (course.rows.length === 0) {
            return res.status(404).json("Course not found");
        }

        // Get videos
        const videos = await pool.query(
            "SELECT * FROM course_videos WHERE course_id = $1 ORDER BY order_index ASC",
            [id]
        );

        res.json({ ...course.rows[0], videos: videos.rows });
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

// 3. Create Course (Admin Only)
router.post("/", authorization, verifyAdmin, async (req, res) => {
    try {
        const { title, description, thumbnail_url, instructor, category, videos } = req.body;

        // Start transaction
        await pool.query('BEGIN');

        const newCourse = await pool.query(
            "INSERT INTO courses (title, description, thumbnail_url, instructor, category, created_by) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [title, description, thumbnail_url, instructor, category, req.user]
        );

        const courseId = newCourse.rows[0].course_id;

        if (videos && videos.length > 0) {
            for (const [index, video] of videos.entries()) {
                await pool.query(
                    "INSERT INTO course_videos (course_id, title, video_url, order_index, description) VALUES ($1, $2, $3, $4, $5)",
                    [courseId, video.title, video.video_url, index + 1, video.description || '']
                );
            }
        }

        await pool.query('COMMIT');
        res.json(newCourse.rows[0]);
    } catch (err) {
        await pool.query('ROLLBACK');
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

// 4. Enroll in Course
router.post("/:id/enroll", authorization, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user;

        // Check if valid course
        const course = await pool.query("SELECT * FROM courses WHERE course_id = $1", [id]);
        if (course.rows.length === 0) return res.status(404).json("Course not found");

        // Check if already enrolled
        const existing = await pool.query(
            "SELECT * FROM enrollments WHERE user_id = $1 AND course_id = $2",
            [userId, id]
        );

        if (existing.rows.length > 0) {
            return res.status(400).json("Already enrolled");
        }

        const newEnrollment = await pool.query(
            "INSERT INTO enrollments (user_id, course_id) VALUES ($1, $2) RETURNING *",
            [userId, id]
        );

        res.json(newEnrollment.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

// 5. Get My Courses
router.get("/user/my-courses", authorization, async (req, res) => {
    try {
        const myCourses = await pool.query(
            `SELECT c.*, e.enrolled_at, e.progress 
       FROM courses c 
       JOIN enrollments e ON c.course_id = e.course_id 
       WHERE e.user_id = $1 
       ORDER BY e.enrolled_at DESC`,
            [req.user]
        );

        res.json(myCourses.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

module.exports = router;

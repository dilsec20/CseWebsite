const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure Multer for Image Upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, '../uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'course-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif|webp/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error("Error: Images Only!"));
    }
});

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

// Upload Endpoint
router.post("/upload", authorization, verifyAdmin, upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json("No file uploaded");
        }
        // Return relative path to be served statically
        const imageUrl = `/uploads/${req.file.filename}`;
        res.json({ imageUrl });
    } catch (err) {
        console.error(err);
        res.status(500).json("Upload failed");
    }
});

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

// 2. Get Single Course Details
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
        const { title, description, thumbnail_url, instructor, category, videos, price } = req.body;

        // Start transaction
        await pool.query('BEGIN');

        const newCourse = await pool.query(
            "INSERT INTO courses (title, description, thumbnail_url, instructor, category, price, created_by) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [title, description, thumbnail_url, instructor, category, price || 0, req.user]
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

// 6. Update Course (Admin Only)
router.put("/:id", authorization, verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, thumbnail_url, instructor, category, price, videos } = req.body;

        await pool.query('BEGIN');

        // Update Course Info
        const updatedCourse = await pool.query(
            `UPDATE courses 
       SET title = $1, description = $2, thumbnail_url = $3, instructor = $4, category = $5, price = $6
       WHERE course_id = $7 RETURNING *`,
            [title, description, thumbnail_url, instructor, category, price || 0, id]
        );

        if (updatedCourse.rows.length === 0) {
            await pool.query('ROLLBACK');
            return res.status(404).json("Course not found");
        }

        // Replace Videos (Delete all and re-insert is simplest for reordering)
        // Note: In a large scale app, diffing would be better, but for this scale replacement is fine.
        await pool.query("DELETE FROM course_videos WHERE course_id = $1", [id]);

        if (videos && videos.length > 0) {
            for (const [index, video] of videos.entries()) {
                await pool.query(
                    "INSERT INTO course_videos (course_id, title, video_url, order_index, description) VALUES ($1, $2, $3, $4, $5)",
                    [id, video.title, video.video_url, index + 1, video.description || '']
                );
            }
        }

        await pool.query('COMMIT');
        res.json(updatedCourse.rows[0]);
    } catch (err) {
        await pool.query('ROLLBACK');
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

// 7. Delete Course (Admin Only)
router.delete("/:id", authorization, verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;

        // Check existence
        const course = await pool.query("SELECT * FROM courses WHERE course_id = $1", [id]);
        if (course.rows.length === 0) return res.status(404).json("Course not found");

        // Delete (Cascade will handle videos and enrollments if configured, otherwise delete manually)
        // Our DB script has ON DELETE CASCADE.
        await pool.query("DELETE FROM courses WHERE course_id = $1", [id]);

        res.json("Course deleted successfully");
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

module.exports = router;

const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

// Get all modules
router.get("/modules", async (req, res) => {
    try {
        const modules = await pool.query(
            "SELECT * FROM dsa_modules ORDER BY order_index ASC"
        );
        res.json(modules.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Get module details with topics
router.get("/modules/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const module = await pool.query(
            "SELECT * FROM dsa_modules WHERE module_id = $1",
            [id]
        );

        if (module.rows.length === 0) {
            return res.status(404).json("Module not found");
        }

        const topics = await pool.query(
            "SELECT topic_id, title, order_index FROM dsa_topics WHERE module_id = $1 ORDER BY order_index ASC",
            [id]
        );

        res.json({ ...module.rows[0], topics: topics.rows });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Get specific topic content
router.get("/topics/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const topic = await pool.query(
            "SELECT t.*, m.title as module_title FROM dsa_topics t JOIN dsa_modules m ON t.module_id = m.module_id WHERE t.topic_id = $1",
            [id]
        );

        if (topic.rows.length === 0) {
            return res.status(404).json("Topic not found");
        }

        res.json(topic.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Get user's solved problems for a topic
router.get("/progress/:topicId", authorization, async (req, res) => {
    try {
        const { topicId } = req.params;
        const userId = req.user;

        const result = await pool.query(
            "SELECT problem_url FROM dsa_problem_progress WHERE user_id = $1 AND topic_id = $2 AND solved = TRUE",
            [userId, topicId]
        );

        res.json(result.rows.map(r => r.problem_url));
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Toggle problem solved status
router.post("/progress", authorization, async (req, res) => {
    try {
        const userId = req.user;
        const { topic_id, problem_url } = req.body;

        // Upsert: insert or toggle
        const result = await pool.query(`
            INSERT INTO dsa_problem_progress (user_id, topic_id, problem_url, solved)
            VALUES ($1, $2, $3, TRUE)
            ON CONFLICT (user_id, topic_id, problem_url)
            DO UPDATE SET solved = NOT dsa_problem_progress.solved, updated_at = NOW()
            RETURNING solved
        `, [userId, topic_id, problem_url]);

        res.json({ solved: result.rows[0].solved });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;


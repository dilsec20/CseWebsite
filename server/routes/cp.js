const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

// Get all CP Modules
router.get("/modules", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM cp_modules ORDER BY module_order ASC");
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Get specific module + its topics
router.get("/modules/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const moduleRes = await pool.query("SELECT * FROM cp_modules WHERE module_id = $1", [id]);

        if (moduleRes.rows.length === 0) {
            return res.status(404).json("Module not found");
        }

        const topicsRes = await pool.query(
            "SELECT topic_id, title, video_url, topic_order FROM cp_topics WHERE module_id = $1 ORDER BY topic_order ASC",
            [id]
        );

        res.json({
            ...moduleRes.rows[0],
            topics: topicsRes.rows
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Get specific topic content
router.get("/topics/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM cp_topics WHERE topic_id = $1", [id]);

        if (result.rows.length === 0) {
            return res.status(404).json("Topic not found");
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Get user's CP problem progress for a topic (authenticated)
router.get("/progress/:topicId", authorization, async (req, res) => {
    try {
        const userId = req.user;
        const { topicId } = req.params;

        const result = await pool.query(
            "SELECT problem_url FROM cp_problem_progress WHERE user_id = $1 AND topic_id = $2 AND solved = true",
            [userId, topicId]
        );

        const solvedUrls = result.rows.map(r => r.problem_url);
        res.json({ solved: solvedUrls });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Toggle CP problem progress (authenticated)
router.post("/progress", authorization, async (req, res) => {
    try {
        const userId = req.user;
        const { topicId, problemUrl, solved } = req.body;

        if (!topicId || !problemUrl) {
            return res.status(400).json({ error: "topicId and problemUrl are required" });
        }

        // Upsert: insert or update
        await pool.query(`
            INSERT INTO cp_problem_progress (user_id, topic_id, problem_url, solved)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT (user_id, topic_id, problem_url)
            DO UPDATE SET solved = $4, updated_at = NOW()
        `, [userId, topicId, problemUrl, solved]);

        res.json({ success: true, solved });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// ==================== USER NOTES ====================

// Get user's note for a module (authenticated)
router.get("/notes/:moduleId", authorization, async (req, res) => {
    try {
        const userId = req.user;
        const { moduleId } = req.params;

        const result = await pool.query(
            "SELECT content, updated_at FROM cp_user_notes WHERE user_id = $1 AND module_id = $2",
            [userId, moduleId]
        );

        if (result.rows.length === 0) {
            return res.json({ content: "", updated_at: null });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Save/Update user's note for a module (authenticated)
router.put("/notes/:moduleId", authorization, async (req, res) => {
    try {
        const userId = req.user;
        const { moduleId } = req.params;
        const { content } = req.body;

        if (content === undefined) {
            return res.status(400).json({ error: "content is required" });
        }

        // Upsert: insert or update
        await pool.query(`
            INSERT INTO cp_user_notes (user_id, module_id, content, updated_at)
            VALUES ($1, $2, $3, NOW())
            ON CONFLICT (user_id, module_id)
            DO UPDATE SET content = $3, updated_at = NOW()
        `, [userId, moduleId, content]);

        res.json({ success: true, message: "Note saved!" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;


const router = require("express").Router();
const pool = require("../db");

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

module.exports = router;

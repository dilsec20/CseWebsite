const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

// GET /api/problems - Get all problems
router.get("/", async (req, res) => {
    try {
        const problems = await pool.query(
            "SELECT problem_id, title, difficulty, topic FROM problems WHERE contest_id IS NULL AND problem_id NOT IN (1509, 1510, 1511) ORDER BY problem_id"
        );
        res.json(problems.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// GET /api/problems/solved - Get user's solved problems
router.get("/solved", authorization, async (req, res) => {
    try {
        const userId = req.user;
        const solvedProblems = await pool.query(
            `SELECT DISTINCT problem_id 
             FROM submissions 
             WHERE user_id = $1 AND status = 'Accepted'`,
            [userId]
        );
        res.json(solvedProblems.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// GET /api/problems/:id - Get problem by ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Get problem details
        const problem = await pool.query(
            "SELECT * FROM problems WHERE problem_id = $1",
            [id]
        );

        if (problem.rows.length === 0) {
            return res.status(404).json({ error: "Problem not found" });
        }

        // Get sample test case
        const sampleTest = await pool.query(
            "SELECT input, expected_output FROM test_cases WHERE problem_id = $1 AND is_sample = true LIMIT 1",
            [id]
        );

        const problemData = problem.rows[0];

        // Add sample test case data if it exists
        if (sampleTest.rows.length > 0) {
            problemData.test_case_input = sampleTest.rows[0].input;
            problemData.test_case_output = sampleTest.rows[0].expected_output;
        }

        res.json(problemData);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

// GET /api/problems/:id/submissions - Get user's submissions for a problem
router.get("/:id/submissions", authorization, async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user;

        const submissions = await pool.query(
            "SELECT * FROM submissions WHERE user_id = $1 AND problem_id = $2 ORDER BY submitted_at DESC",
            [userId, id]
        );

        res.json(submissions.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;

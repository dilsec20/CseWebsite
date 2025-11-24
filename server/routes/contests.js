const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

// Start a new contest
router.post("/start", authorization, async (req, res) => {
    try {
        const user_id = req.user;
        console.log('[CONTEST START] User ID:', user_id);

        // Select Random Problems from database: 1 Easy, 2 Medium, 2 Hard
        const easyResult = await pool.query(
            "SELECT * FROM problems WHERE difficulty = 'Easy' ORDER BY RANDOM() LIMIT 1"
        );
        const mediumResult = await pool.query(
            "SELECT * FROM problems WHERE difficulty = 'Medium' ORDER BY RANDOM() LIMIT 2"
        );
        const hardResult = await pool.query(
            "SELECT * FROM problems WHERE difficulty = 'Hard' ORDER BY RANDOM() LIMIT 2"
        );

        console.log('[CONTEST START] Problems found - Easy:', easyResult.rows.length, 'Medium:', mediumResult.rows.length, 'Hard:', hardResult.rows.length);

        if (easyResult.rows.length < 1 || mediumResult.rows.length < 2 || hardResult.rows.length < 2) {
            console.log('[CONTEST START] Not enough problems');
            return res.status(400).json({ error: "Not enough problems to generate contest" });
        }

        const selectedProblems = [
            ...easyResult.rows,
            ...mediumResult.rows,
            ...hardResult.rows
        ];

        // Create Session in database
        const startTime = new Date();
        const endTime = new Date(startTime.getTime() + 2 * 60 * 60 * 1000); // +2 Hours

        console.log('[CONTEST START] Creating session...');
        const sessionResult = await pool.query(
            "INSERT INTO contest_sessions (user_id, start_time, end_time, status) VALUES ($1, $2, $3, $4) RETURNING *",
            [user_id, startTime, endTime, 'active']
        );

        const newSession = sessionResult.rows[0];
        console.log('[CONTEST START] Session created:', newSession.session_id);

        // Link Problems to Session
        for (const problem of selectedProblems) {
            await pool.query(
                "INSERT INTO contest_problems (session_id, problem_id, solved) VALUES ($1, $2, $3)",
                [newSession.session_id, problem.problem_id, false]
            );
        }

        console.log('[CONTEST START] Contest created successfully:', newSession.session_id);
        res.json({ session_id: newSession.session_id });
    } catch (err) {
        console.error('[CONTEST START ERROR]', err.message);
        console.error('[CONTEST START ERROR]', err);
        res.status(500).send("Server Error");
    }
});

// Get Contest Details
router.get("/:id", authorization, async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.user;

        console.log('[CONTEST GET] Contest ID:', id, 'User ID:', user_id);

        // Get session from database
        const sessionResult = await pool.query(
            "SELECT * FROM contest_sessions WHERE session_id = $1 AND user_id = $2",
            [id, user_id]
        );

        console.log('[CONTEST GET] Session found:', sessionResult.rows.length);

        if (sessionResult.rows.length === 0) {
            console.log('[CONTEST GET] Contest not found');
            return res.status(404).json({ error: "Contest not found" });
        }

        const session = sessionResult.rows[0];

        // Get problems for this contest
        const problemsResult = await pool.query(
            `SELECT p.* FROM problems p 
             INNER JOIN contest_problems cp ON p.problem_id = cp.problem_id 
             WHERE cp.session_id = $1
             ORDER BY p.difficulty, p.problem_id`,
            [id]
        );

        const problems = problemsResult.rows;
        console.log('[CONTEST GET] Problems found:', problems.length);

        res.json({ session, problems });
    } catch (err) {
        console.error('[CONTEST GET ERROR]', err.message);
        console.error('[CONTEST GET ERROR]', err);
        res.status(500).send("Server Error");
    }
});

// Finish Contest
router.post("/:id/finish", authorization, async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.user;

        console.log('[CONTEST FINISH] Contest ID:', id, 'User ID:', user_id);

        // Update contest status
        await pool.query(
            "UPDATE contest_sessions SET status = $1 WHERE session_id = $2 AND user_id = $3",
            ['finished', id, user_id]
        );

        console.log('[CONTEST FINISH] Contest finished');
        res.json({ message: "Contest finished successfully" });
    } catch (err) {
        console.error('[CONTEST FINISH ERROR]', err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;

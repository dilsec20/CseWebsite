const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

// Create a new Global Contest
router.post("/create", authorization, async (req, res) => {
    try {
        console.log("Admin Create Contest Request Body:", req.body);
        console.log("Admin User ID:", req.user);

        const { title, description, start_time, duration_minutes } = req.body;
        const creator_id = req.user;

        if (!title || !start_time || !duration_minutes) {
            return res.status(400).json({ error: "Missing required fields (title, start_time, duration)" });
        }

        const startTimeDate = new Date(start_time);
        if (isNaN(startTimeDate.getTime())) {
            return res.status(400).json({ error: "Invalid start_time format" });
        }

        const endTimeDate = new Date(startTimeDate.getTime() + duration_minutes * 60000);

        const newContest = await pool.query(
            "INSERT INTO global_contests (title, description, start_time, end_time, created_by) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [title, description, startTimeDate, endTimeDate, creator_id]
        );

        res.json(newContest.rows[0]);
    } catch (err) {
        console.error("Error creating contest:", err.message);
        res.status(500).json({ error: "Server Error: " + err.message });
    }
});

// Add a Problem (manual setter flow)
router.post("/problems/add", authorization, async (req, res) => {
    try {
        const { title, description, difficulty, topic, contest_id, constraints, source } = req.body;

        // If contest_id is provided, link it, otherwise null (Practice problem)
        const newProblem = await pool.query(
            "INSERT INTO problems (title, description, difficulty, topic, contest_id, constraints, source) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [title, description, difficulty, topic, contest_id, constraints, source]
        );

        res.json(newProblem.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Add Test Cases (Bulk or Single)
router.post("/test-cases/add", authorization, async (req, res) => {
    try {
        const { problem_id, test_cases } = req.body;
        // test_cases expected to be array of { input, expected_output, is_sample }

        const results = [];
        for (const tc of test_cases) {
            const newTc = await pool.query(
                "INSERT INTO test_cases (problem_id, input, expected_output, is_sample) VALUES ($1, $2, $3, $4) RETURNING *",
                [problem_id, tc.input, tc.expected_output, tc.is_sample || false]
            );
            results.push(newTc.rows[0]);
        }

        res.json({ message: "Test cases added successfully", count: results.length });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Update a Test Case
router.put("/test-cases/:test_case_id", authorization, async (req, res) => {
    try {
        const { test_case_id } = req.params;
        const { input, expected_output, is_sample } = req.body;

        const updated = await pool.query(
            "UPDATE test_cases SET input = $1, expected_output = $2, is_sample = $3 WHERE test_case_id = $4 RETURNING *",
            [input, expected_output, is_sample || false, test_case_id]
        );

        if (updated.rows.length === 0) {
            return res.status(404).json({ error: "Test case not found" });
        }

        res.json(updated.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Delete a Test Case
router.delete("/test-cases/:test_case_id", authorization, async (req, res) => {
    try {
        const { test_case_id } = req.params;

        const deleted = await pool.query(
            "DELETE FROM test_cases WHERE test_case_id = $1 RETURNING *",
            [test_case_id]
        );

        if (deleted.rows.length === 0) {
            return res.status(404).json({ error: "Test case not found" });
        }

        res.json({ message: "Test case deleted successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Get Test Cases for a Problem
router.get("/problems/:problem_id/test-cases", authorization, async (req, res) => {
    try {
        const { problem_id } = req.params;
        const testCases = await pool.query(
            "SELECT * FROM test_cases WHERE problem_id = $1 ORDER BY test_case_id ASC",
            [problem_id]
        );
        res.json(testCases.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Update Contest
router.put("/:id/update", authorization, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, start_time, end_time } = req.body;

        const updated = await pool.query(
            "UPDATE global_contests SET title = $1, description = $2, start_time = $3, end_time = $4 WHERE contest_id = $5 RETURNING *",
            [title, description, start_time, end_time, id]
        );

        if (updated.rows.length === 0) return res.status(404).json("Contest not found");
        res.json(updated.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Finalize Contest (Calculate Ranks & Ratings)
router.post("/:id/finalize", authorization, async (req, res) => {
    try {
        const { id } = req.params;

        // FIRST: Check if contest exists and is still active (not already finalized)
        const contestCheck = await pool.query(
            "SELECT is_active FROM global_contests WHERE contest_id = $1",
            [id]
        );

        if (contestCheck.rows.length === 0) {
            return res.status(404).json({ error: "Contest not found" });
        }

        if (contestCheck.rows[0].is_active === false) {
            return res.status(400).json({ error: "Contest already finalized. Ratings have already been calculated." });
        }

        // 1. Get all participants with scores > 0
        const participants = await pool.query(
            `SELECT p.*, u.rating as current_rating 
             FROM contest_participations p
             JOIN users u ON p.user_id = u.user_id
             WHERE p.contest_id = $1 AND p.score > 0
             ORDER BY p.score DESC, p.finish_time ASC`,
            [id]
        );

        if (participants.rows.length === 0) {
            // No participants, just close the contest
            await pool.query("UPDATE global_contests SET is_active = false WHERE contest_id = $1", [id]);
            return res.json({ message: "Contest finalized (No participants to rate)", participants: 0 });
        }

        const rankedUsers = participants.rows;

        // 2. Simple Rating Algorithm (CodeChef-ish simplified)
        // New Rating = Old Rating + (ActualScore - ExpectedScore) * K
        // For now, simpler: Bonus for Top 3, Penalty for Bottom if rating > 1200
        // We will do a simple rank-based distribution for MVP

        // Logic:
        // Rank 1: +50
        // Rank 2: +30
        // Rank 3: +20
        // Rank 4-10: +10
        // Others: +5
        // If score < 50% of max possible score (500), maybe small penalty?
        // Let's stick to positive reinforcement for now to encourage participation

        for (let i = 0; i < rankedUsers.length; i++) {
            const user = rankedUsers[i];
            const rank = i + 1;
            let ratingChange = 0;

            if (rank === 1) ratingChange = 50;
            else if (rank === 2) ratingChange = 30;
            else if (rank === 3) ratingChange = 20;
            else if (rank <= 10) ratingChange = 10;
            else ratingChange = 5;

            // Cap rating change? No, let it fly for MVP.

            const effectiveRating = user.current_rating === 0 ? 1200 : (user.current_rating || 1200);
            const newRating = effectiveRating + ratingChange;

            // Update Participation Record
            await pool.query(
                `UPDATE contest_participations 
                 SET rank = $1, pre_rating = $2, post_rating = $3 
                 WHERE participation_id = $4`,
                [rank, user.current_rating, newRating, user.participation_id]
            );

            // Update User Profile
            await pool.query(
                "UPDATE users SET rating = $1 WHERE user_id = $2",
                [newRating, user.user_id]
            );
        }

        // Mark contest as finalised
        await pool.query("UPDATE global_contests SET is_active = false WHERE contest_id = $1", [id]);

        res.json({ message: "Contest finalized and ratings updated", participants: rankedUsers.length });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Get all problems for a contest (Admin View)
router.get("/:id/problems", authorization, async (req, res) => {
    try {
        const { id } = req.params;
        const problems = await pool.query(
            "SELECT * FROM problems WHERE contest_id = $1 ORDER BY problem_id ASC",
            [id]
        );
        res.json(problems.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Update a Problem
router.put("/problems/:problem_id", authorization, async (req, res) => {
    try {
        const { problem_id } = req.params;
        const { title, description, difficulty, topic, constraints, source } = req.body;

        const updatedProblem = await pool.query(
            "UPDATE problems SET title = $1, description = $2, difficulty = $3, topic = $4, constraints = $5, source = $6 WHERE problem_id = $7 RETURNING *",
            [title, description, difficulty, topic, constraints, source, problem_id]
        );

        if (updatedProblem.rows.length === 0) {
            return res.status(404).json({ error: "Problem not found" });
        }

        res.json(updatedProblem.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Delete a Problem
router.delete("/problems/:problem_id", authorization, async (req, res) => {
    try {
        const { problem_id } = req.params;
        const deleteRes = await pool.query("DELETE FROM problems WHERE problem_id = $1 RETURNING *", [problem_id]);

        if (deleteRes.rows.length === 0) {
            return res.status(404).json({ error: "Problem not found" });
        }

        res.json({ message: "Problem deleted successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Delete a Contest
router.delete("/:id", authorization, async (req, res) => {
    try {
        const { id } = req.params;

        // Delete dependent records first
        // 1. Delete participations
        await pool.query("DELETE FROM contest_participations WHERE contest_id = $1", [id]);

        // 2. Unlink or Delete problems associated with the contest
        // Strategy: Link problems to NULL (preserve them as practice) OR Delete them?
        // User asked to "delete contest", usually implies deleting the whole event.
        // However, problems might be valuable. Let's Set contest_id to NULL for now to be safe,
        // or if we want strict cleanup, delete them.
        // Given this is a specific contest creator, let's just unlink them so they become "Practice" problems.
        await pool.query("UPDATE problems SET contest_id = NULL WHERE contest_id = $1", [id]);

        // 3. Delete the contest
        await pool.query("DELETE FROM global_contests WHERE contest_id = $1", [id]);

        res.json({ message: "Contest deleted successfully" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;

const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

// Get all quizzes
router.get("/", async (req, res) => {
    try {
        const quizzes = await pool.query("SELECT * FROM quizzes ORDER BY quiz_id");
        res.json(quizzes.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Get a specific quiz with questions and options
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const quizRes = await pool.query("SELECT * FROM quizzes WHERE quiz_id = $1", [id]);

        if (quizRes.rows.length === 0) {
            return res.status(404).json("Quiz not found");
        }

        const questionsRes = await pool.query("SELECT * FROM quiz_questions WHERE quiz_id = $1 ORDER BY question_id", [id]);

        // Fetch all options for these questions
        const optionsRes = await pool.query(`
            SELECT * FROM quiz_options 
            WHERE question_id IN (SELECT question_id FROM quiz_questions WHERE quiz_id = $1)
            ORDER BY option_id
        `, [id]);

        const questionsWithOptions = questionsRes.rows.map(q => {
            const options = optionsRes.rows
                .filter(opt => opt.question_id === q.question_id)
                .map(opt => ({
                    option_id: opt.option_id,
                    option_text: opt.option_text,
                    is_correct: opt.is_correct // Frontend uses this for review logic
                }));
            return { ...q, options };
        });

        res.json({ quiz: quizRes.rows[0], questions: questionsWithOptions });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Submit Quiz
router.post("/:id/submit", authorization, async (req, res) => {
    try {
        const { id } = req.params;
        const { answers } = req.body; // { question_id: option_id }

        const questionsRes = await pool.query("SELECT question_id FROM quiz_questions WHERE quiz_id = $1", [id]);
        const questionIds = questionsRes.rows.map(q => q.question_id);

        if (questionIds.length === 0) {
            return res.json({ score: 0, total: 0 });
        }

        // Fetch correct options
        const correctOptionsRes = await pool.query(`
            SELECT question_id, option_id 
            FROM quiz_options 
            WHERE question_id = ANY($1) AND is_correct = true
        `, [questionIds]);

        let score = 0;
        correctOptionsRes.rows.forEach(correct => {
            if (answers[correct.question_id] === correct.option_id) {
                score++;
            }
        });

        res.json({ score, total: questionIds.length });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;

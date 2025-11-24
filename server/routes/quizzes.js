const router = require("express").Router();
const mockData = require("../mockData");
const authorization = require("../middleware/authorization");

// Get all quizzes
router.get("/", async (req, res) => {
    try {
        res.json(mockData.quizzes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Get a specific quiz with questions and options
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const quiz = mockData.quizzes.find(q => q.quiz_id === parseInt(id));

        if (!quiz) {
            return res.status(404).json("Quiz not found");
        }

        const questions = mockData.quiz_questions.filter(q => q.quiz_id === parseInt(id));

        const questionsWithOptions = questions.map(q => {
            const options = mockData.quiz_options
                .filter(opt => opt.question_id === q.question_id)
                .map(opt => ({
                    option_id: opt.option_id,
                    option_text: opt.option_text,
                    is_correct: opt.is_correct // Include this for answer verification
                }));
            return { ...q, options };
        });

        res.json({ quiz, questions: questionsWithOptions });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Submit Quiz
router.post("/:id/submit", authorization, async (req, res) => {
    try {
        const { id } = req.params;
        const { answers } = req.body;

        let score = 0;
        const questions = mockData.quiz_questions.filter(q => q.quiz_id === parseInt(id));

        for (let q of questions) {
            const correctOption = mockData.quiz_options.find(
                opt => opt.question_id === q.question_id && opt.is_correct
            );
            if (correctOption && answers[q.question_id] === correctOption.option_id) {
                score++;
            }
        }

        res.json({ score, total: questions.length });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;

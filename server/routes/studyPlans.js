const router = require("express").Router();
const pool = require("../db");
const blind75 = require("../data/studyPlans");
const authorization = require("../middleware/authorization");

router.get("/blind75", authorization, async (req, res) => {
    try {
        const userId = req.user;

        // 1. Get all problems from DB (Title -> ID, Difficulty)
        // We fetch minimal data to map our static list to real DB problems
        const allProblemsRes = await pool.query("SELECT problem_id, title, difficulty, topic FROM problems");
        const dbProblems = allProblemsRes.rows;

        // 2. Get user's solved problem IDs
        const solvedRes = await pool.query(
            "SELECT problem_id FROM user_progress WHERE user_id = $1 AND solved = true",
            [userId]
        );
        const solvedIds = new Set(solvedRes.rows.map(r => r.problem_id));

        // Helper to normalize string for matching
        const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, "");

        // Create a fast lookup map for DB problems
        // Map normalized_title -> problem object
        const dbProblemMap = {};
        dbProblems.forEach(p => {
            dbProblemMap[normalize(p.title)] = p;
        });

        // 3. Build the response object
        const responseData = blind75.map(category => {
            return {
                category: category.category,
                problems: category.problems.map(staticTitle => {
                    const normTitle = normalize(staticTitle);
                    const matchedDbProblem = dbProblemMap[normTitle];

                    if (matchedDbProblem) {
                        return {
                            title: matchedDbProblem.title, // Use DB title
                            problem_id: matchedDbProblem.problem_id,
                            difficulty: matchedDbProblem.difficulty,
                            completed: solvedIds.has(matchedDbProblem.problem_id),
                            available: true
                        };
                    } else {
                        // Problem not in our DB yet
                        return {
                            title: staticTitle,
                            problem_id: null,
                            difficulty: "Unknown", // Could hardcode if really needed
                            completed: false,
                            available: false
                        };
                    }
                })
            };
        });

        // Calculate overall progress
        let totalProblems = 0;
        let totalSolved = 0;

        responseData.forEach(cat => {
            cat.problems.forEach(p => {
                if (p.available) {
                    totalProblems++;
                    if (p.completed) totalSolved++;
                }
            });
        });

        res.json({
            plan_name: "Blind 75",
            total_problems: totalProblems, // Only count available ones
            total_solved: totalSolved,
            modules: responseData
        });

    } catch (err) {
        console.error("Study Plan Error:", err.message);
        res.status(500).json({ error: "Server error fetching study plan" });
    }
});

module.exports = router;

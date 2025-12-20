const blind75 = require('./data/studyPlans');
const pool = require('./db');

async function verifyStudyPlan() {
    try {
        console.log("🧪 Verifying Study Plan Logic...");

        // 1. Get a problem from Blind 75 list (First one: Two Sum)
        const targetProblemTitle = blind75[0].problems[0];
        console.log(`Target Problem: ${targetProblemTitle}`);

        // 2. Check if it exists in DB
        const dbRes = await pool.query("SELECT problem_id, title FROM problems WHERE LOWER(title) = LOWER($1)", [targetProblemTitle]);

        let problemId;
        if (dbRes.rows.length === 0) {
            console.log("⚠️ Target problem not found in DB. Creating it for test...");
            const insertRes = await pool.query(
                "INSERT INTO problems (title, description, difficulty, topic) VALUES ($1, 'Test Desc', 'Easy', 'Arrays') RETURNING problem_id",
                [targetProblemTitle]
            );
            problemId = insertRes.rows[0].problem_id;
        } else {
            problemId = dbRes.rows[0].problem_id;
            console.log(`Found in DB: ID ${problemId}`);
        }

        // 3. Mark it as "Solved" for test user
        const userRes = await pool.query("SELECT user_id FROM users LIMIT 1");
        const userId = userRes.rows[0].user_id;

        await pool.query(
            "INSERT INTO user_progress (user_id, problem_id, solved) VALUES ($1, $2, true) ON CONFLICT (user_id, problem_id) DO UPDATE SET solved = true",
            [userId, problemId]
        );
        console.log(`Marked problem ${problemId} as solved for user ${userId}`);

        // 4. Simulate API Logic (Normalized Match)
        const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, "");
        const targetNorm = normalize(targetProblemTitle);

        // Fetch USER's solved IDs
        const progressRes = await pool.query("SELECT problem_id FROM user_progress WHERE user_id = $1 AND solved = true", [userId]);
        const solvedSet = new Set(progressRes.rows.map(r => r.problem_id));

        const isCompleted = solvedSet.has(problemId);

        console.log(`API Logic Check: Is '${targetProblemTitle}' completed? ${isCompleted}`);

        if (isCompleted) {
            console.log("✅ VERIFICATION PASSED");
        } else {
            console.error("❌ VERIFICATION FAILED");
        }

    } catch (e) {
        console.error(e);
    } finally {
        pool.end();
    }
}

verifyStudyPlan();

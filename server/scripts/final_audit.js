const { Pool } = require('pg');
require('dotenv').config({ path: '../.env' });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

(async () => {
    try {
        console.log("=== FINAL AUDIT REPORT ===");

        // Check for problems with < 6 hidden test cases
        const countRes = await pool.query(`
            SELECT COUNT(*) as problem_count
            FROM (
                SELECT p.problem_id
                FROM problems p
                LEFT JOIN test_cases t ON p.problem_id = t.problem_id AND t.is_sample = false
                GROUP BY p.problem_id
                HAVING COUNT(t.test_case_id) < 6
            ) as subquery
        `);
        const problemCount = parseInt(countRes.rows[0].problem_count);
        console.log(`\nProblems with < 6 hidden test cases: ${problemCount}`);

        if (problemCount > 0) {
            const listRes = await pool.query(`
                SELECT p.problem_id, p.title, COUNT(t.test_case_id) as hidden_count
                FROM problems p
                LEFT JOIN test_cases t ON p.problem_id = t.problem_id AND t.is_sample = false
                GROUP BY p.problem_id, p.title
                HAVING COUNT(t.test_case_id) < 6
                ORDER BY hidden_count ASC, p.problem_id ASC
                LIMIT 10
            `);
            console.log("Top 10 remaining candidates:");
            listRes.rows.forEach(r => console.log(`- [${r.problem_id}] ${r.title}: ${r.hidden_count}`));
        }

        // Check for potentially invalid test cases (input == output)
        const invalidRes = await pool.query(`
            SELECT COUNT(*) as invalid_count
            FROM test_cases
            WHERE input = expected_output
        `);
        const invalidCount = parseInt(invalidRes.rows[0].invalid_count);
        console.log(`\nTest cases where input == expected_output: ${invalidCount}`);

        if (invalidCount > 0) {
            console.log("⚠️ Some potentially invalid test cases remain!");
            const invalidList = await pool.query(`
                SELECT t.problem_id, p.title, t.input, t.expected_output
                FROM test_cases t
                JOIN problems p ON t.problem_id = p.problem_id
                WHERE t.input = t.expected_output
                LIMIT 5
            `);
            invalidList.rows.forEach(r => console.log(`- [${r.problem_id}] ${r.title}: Input="${r.input.substring(0, 10)}..."`));
        } else {
            console.log("✅ No 'input == expected_output' cases found (Verified Clean).");
        }

    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
})();
```

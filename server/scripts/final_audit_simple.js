const { Pool } = require('pg');
require('dotenv').config({ path: '../.env' });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

(async () => {
    try {
        console.log("--- START REPORT ---");

        const countRes = await pool.query(`
            SELECT COUNT(*) as cnt
            FROM (
                SELECT p.problem_id
                FROM problems p
                LEFT JOIN test_cases t ON p.problem_id = t.problem_id AND t.is_sample = false
                GROUP BY p.problem_id
                HAVING COUNT(t.test_case_id) < 5
            ) as subquery
        `);
        console.log(`REMAINING_LOW_COVERAGE: ${countRes.rows[0].cnt}`);

        if (parseInt(countRes.rows[0].cnt) > 0) {
            const listRes = await pool.query(`
                SELECT p.problem_id, p.title, COUNT(t.test_case_id) as hidden_count
                FROM problems p
                LEFT JOIN test_cases t ON p.problem_id = t.problem_id AND t.is_sample = false
                GROUP BY p.problem_id, p.title
                HAVING COUNT(t.test_case_id) < 5
                ORDER BY hidden_count ASC, p.problem_id ASC
                LIMIT 5
            `);
            console.log("NEXT_CANDIDATES:");
            listRes.rows.forEach(r => console.log(`ID:${r.problem_id} Count:${r.hidden_count} Title:${r.title}`));
        }

        const invalidRes = await pool.query("SELECT COUNT(*) as cnt FROM test_cases WHERE input = expected_output");
        console.log(`INVALID_CASES: ${invalidRes.rows[0].cnt}`);

        if (parseInt(invalidRes.rows[0].cnt) > 0) {
            const invalidList = await pool.query(`
                SELECT t.problem_id, p.title, t.input 
                FROM test_cases t JOIN problems p ON t.problem_id = p.problem_id 
                WHERE t.input = t.expected_output LIMIT 5
            `);
            console.log("INVALID_EXAMPLES:");
            invalidList.rows.forEach(r => console.log(`ID:${r.problem_id} Input:${r.input.replace(/\n/g, '\\n')}`));
        }

        console.log("--- END REPORT ---");
    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
})();

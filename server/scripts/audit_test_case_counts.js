const { Pool } = require('pg');
require('dotenv').config({ path: '../.env' });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

(async () => {
    try {
        console.log("Auditing problems with fewer than 6 hidden test cases...");

        const query = `
            SELECT p.problem_id, p.title, COUNT(t.test_case_id) as hidden_count
            FROM problems p
            LEFT JOIN test_cases t ON p.problem_id = t.problem_id AND t.is_sample = false
            GROUP BY p.problem_id, p.title
            HAVING COUNT(t.test_case_id) < 6
            ORDER BY p.problem_id ASC
        `;

        const res = await pool.query(query);

        if (res.rows.length === 0) {
            console.log("✅ All problems have at least 6 hidden test cases.");
        } else {
            console.log(`⚠️ Found ${res.rows.length} problems with fewer than 6 hidden test cases.`);
            console.log("Top 10 candidates for enrichment:");
            res.rows.slice(0, 10).forEach(r => {
                console.log(`[ID: ${r.problem_id}] "${r.title}" - Count: ${r.hidden_count}`);
            });
        }

    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
})();

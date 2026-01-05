const { Pool } = require('pg');
require('dotenv').config({ path: '../.env' });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

(async () => {
    try {
        const pRes = await pool.query("SELECT problem_id, title, description FROM problems WHERE title ILIKE 'Climbing Stairs'");
        if (pRes.rows.length === 0) {
            console.log("Problem not found");
            return;
        }
        const p = pRes.rows[0];
        console.log(`Problem ID: ${p.problem_id}`);
        console.log(`Title: ${p.title}`);

        const res = await pool.query("SELECT test_case_id, input, expected_output, is_hidden FROM test_cases WHERE problem_id = $1 ORDER BY test_case_id", [p.problem_id]);

        console.log(`\nFound ${res.rows.length} test cases:`);
        res.rows.forEach((r, idx) => {
            console.log(`\n[#${idx + 1}] ID: ${r.test_case_id} (Hidden: ${r.is_hidden})`);
            console.log(`Input: "${r.input.replace(/\n/g, '\\n')}"`);
            console.log(`Expected: "${r.expected_output}"`);
        });

    } catch (e) { console.error(e); } finally { pool.end(); }
})();

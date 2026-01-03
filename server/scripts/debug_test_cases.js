const { Pool } = require('pg');
require('dotenv').config({ path: '../.env' });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

(async () => {
    try {
        console.log("Fetching HIDDEN test cases for problem 1350...");
        // Select only hidden/non-sample cases
        const testCases = await pool.query('SELECT * FROM test_cases WHERE problem_id = 1350 AND is_sample = false ORDER BY test_case_id');
        console.log("Hidden Test Cases:", JSON.stringify(testCases.rows, null, 2));

    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
})();

const { Pool } = require('pg');
require('dotenv').config({ path: '../.env' });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

(async () => {
    try {
        console.log("Fixing test cases for Problem 1350...");

        // Fix ID 1670: Input "a" -> Expected "0"
        await pool.query("UPDATE test_cases SET expected_output = '0' WHERE test_case_id = 1670");
        console.log("Fixed test_case_id 1670");

        // Fix ID 1671: Input "" -> Expected "-1"
        // Note: Empty string input might be invalid for some logic, but -1 is safe fallback
        await pool.query("UPDATE test_cases SET expected_output = '-1' WHERE test_case_id = 1671");
        console.log("Fixed test_case_id 1671");

        // Check for other potential bad cases for this problem
        const badCases = await pool.query("SELECT * FROM test_cases WHERE problem_id = 1350 AND input = expected_output");
        if (badCases.rows.length > 0) {
            console.log("WARNING: Still found matching input/output cases:", badCases.rows.map(r => r.test_case_id));
        } else {
            console.log("No more self-matching test cases for problem 1350.");
        }

    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
})();

const { Pool } = require('pg');
require('dotenv').config({ path: '../.env' });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

(async () => {
    try {
        console.log("Starting CLEANUP of invalid test cases (Input == Expected Output)...");

        // Count before delete
        const countRes = await pool.query("SELECT COUNT(*) FROM test_cases WHERE input = expected_output");
        const count = countRes.rows[0].count;
        console.log(`Found ${count} invalid test cases to delete.`);

        if (count > 0) {
            // Perform delete
            const deleteRes = await pool.query("DELETE FROM test_cases WHERE input = expected_output");
            console.log(`✅ Successfully deleted ${deleteRes.rowCount} invalid test cases.`);
        } else {
            console.log("No invalid test cases found. Database is clean.");
        }

    } catch (err) {
        console.error("Error during cleanup:", err);
    } finally {
        pool.end();
    }
})();

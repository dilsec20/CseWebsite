const { Pool } = require('pg');
require('dotenv').config({ path: '../.env' });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

(async () => {
    try {
        console.log("Starting audit of test cases where Input == Expected Output...");

        const query = `
            SELECT t.test_case_id, t.problem_id, p.title, t.input, t.expected_output, t.is_hidden, t.is_sample
            FROM test_cases t 
            JOIN problems p ON t.problem_id = p.problem_id 
            WHERE t.input = t.expected_output
            ORDER BY t.problem_id
        `;

        const res = await pool.query(query);

        if (res.rows.length === 0) {
            console.log("✅ No invalid test cases found (Input == Output).");
        } else {
            console.log(`⚠️ Found ${res.rows.length} potentially invalid test cases across ${new Set(res.rows.map(r => r.problem_id)).size} problems.\n`);

            // Group by problem
            const grouped = {};
            res.rows.forEach(r => {
                if (!grouped[r.title]) grouped[r.title] = [];
                grouped[r.title].push(r);
            });

            for (const [title, cases] of Object.entries(grouped)) {
                console.log(`PROBLEM: ${title} (ID: ${cases[0].problem_id}) - ${cases.length} cases`);
                cases.slice(0, 3).forEach(c => { // Show first 3 per problem to avoid spam
                    console.log(`   [ID: ${c.test_case_id}] Input: "${c.input.substring(0, 20)}..." == Output`);
                });
                if (cases.length > 3) console.log(`   ...and ${cases.length - 3} more.`);
                console.log(''); // newline
            }
        }

    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
})();

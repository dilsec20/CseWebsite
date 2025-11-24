const pool = require('../db');

async function checkMaxSubarrayTests() {
    const client = await pool.connect();
    try {
        const res = await client.query(`
            SELECT t.test_case_id, t.input, t.expected_output, t.is_sample 
            FROM problems p 
            JOIN test_cases t ON p.problem_id = t.problem_id 
            WHERE p.title ILIKE '%Maximum Subarray%'
        `);
        console.log(JSON.stringify(res.rows, null, 2));
    } catch (err) {
        console.error(err);
    } finally {
        client.release();
        await pool.end();
    }
}

checkMaxSubarrayTests();

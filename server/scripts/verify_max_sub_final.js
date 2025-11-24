const pool = require('../db');

async function verifyMaxSubarray() {
    const client = await pool.connect();
    const res = await client.query(`
        SELECT input 
        FROM test_cases 
        WHERE problem_id = (SELECT problem_id FROM problems WHERE title ILIKE '%Maximum Subarray%') 
        LIMIT 3
    `);
    console.log(res.rows);
    client.release();
    await pool.end();
}
verifyMaxSubarray();

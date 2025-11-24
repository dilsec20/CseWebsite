const pool = require('../db');
async function checkInvert() {
    const client = await pool.connect();
    const res = await client.query("SELECT t.input FROM problems p JOIN test_cases t ON p.problem_id = t.problem_id WHERE p.title ILIKE '%Invert Binary%' AND t.is_sample = true");
    console.log(res.rows[0]?.input);
    client.release();
    await pool.end();
}
checkInvert();

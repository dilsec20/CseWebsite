const pool = require('./db');

async function checkProblemSchema() {
    try {
        const res = await pool.query("SELECT * FROM problems LIMIT 1");
        console.log("Problems Table Columns:", Object.keys(res.rows[0]));
    } catch (e) {
        console.error(e);
    } finally {
        pool.end();
    }
}

checkProblemSchema();

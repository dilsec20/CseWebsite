const pool = require('../db');

async function inspectRow() {
    try {
        const res = await pool.query('SELECT * FROM problems LIMIT 1');
        console.log('Problem Row Keys:', Object.keys(res.rows[0]));
    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
}

inspectRow();

const { Pool } = require('pg');
require('dotenv').config({ path: '../.env' });

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

(async () => {
    try {
        const res = await pool.query("SELECT problem_id, title FROM problems WHERE title ILIKE '%Lowest Common Ancestor%'");
        console.log(JSON.stringify(res.rows, null, 2));
    } catch (err) {
        console.error(err);
    } finally {
        pool.end();
    }
})();

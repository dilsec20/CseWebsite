const pool = require("../db");

async function run() {
    try {
        const res = await pool.query("SELECT * FROM problems LIMIT 1");
        console.log("Columns:", Object.keys(res.rows[0] || {}));
        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
run();

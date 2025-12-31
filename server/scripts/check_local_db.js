const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres",
    password: "dilip",
    host: "localhost",
    port: 5432,
    database: "placement_prep"
});

async function run() {
    try {
        console.log("Connecting to LOCALHOST database...");
        const res = await pool.query("SELECT title, problem_id FROM problems WHERE title ILIKE '%Array%' OR title ILIKE '%Sum%'");
        console.log(`Found ${res.rows.length} problems in LOCAL DB:`);
        res.rows.forEach(p => console.log(` - [${p.problem_id}] ${p.title}`));
        pool.end();
    } catch (e) {
        console.error("Local connection failed:", e.message);
        pool.end();
    }
}

run();

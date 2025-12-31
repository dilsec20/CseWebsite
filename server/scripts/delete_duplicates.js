const pool = require("../db");

async function run() {
    try {
        console.log("Searching for problems with Topic='Array' and Title containing 'Sum' or 'Element'...");

        const problems = await pool.query(`
            SELECT problem_id, title, topic 
            FROM problems 
            WHERE topic = 'Array' 
            AND (title ILIKE '%Sum%' OR title ILIKE '%Element%')
            ORDER BY problem_id DESC
        `);

        console.log(`Found ${problems.rows.length} problems:`);
        problems.rows.forEach(p => console.log(` - [${p.problem_id}] "${p.title}"`));

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

run();

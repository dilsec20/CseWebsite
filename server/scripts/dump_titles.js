const pool = require("../db");
const fs = require('fs');

async function run() {
    try {
        const problems = await pool.query("SELECT problem_id, title FROM problems ORDER BY problem_id DESC");

        const lines = problems.rows.map(p => `[${p.problem_id}] ${p.title}`);
        fs.writeFileSync('all_titles.txt', lines.join('\n'));
        console.log(`Dumped ${lines.length} titles to all_titles.txt`);

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

run();

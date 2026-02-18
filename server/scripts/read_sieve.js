/**
 * Read ALL Number Theory topic contents from production to understand the full structure.
 */
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://postgres.xlqzqcqacpajpqwneqpa:05Supabase%40%40%3F%3F@aws-1-ap-south-1.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false }
});

async function readAll() {
    try {
        const mod = await pool.query("SELECT module_id FROM cp_modules WHERE title = 'Number Theory'");
        const moduleId = mod.rows[0].module_id;

        const topics = await pool.query(
            "SELECT topic_id, title, content FROM cp_topics WHERE module_id = $1 ORDER BY topic_order",
            [moduleId]
        );

        // Write each topic to a separate file for inspection
        const fs = require('fs');
        const outDir = __dirname + '/production_content';
        if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

        topics.rows.forEach((t, i) => {
            const filename = `${outDir}/topic_${t.topic_id}_${t.title.replace(/[^a-zA-Z0-9]/g, '_')}.md`;
            fs.writeFileSync(filename, t.content);
            console.log(`Wrote topic ${t.topic_id}: "${t.title}" (${t.content.length} chars)`);
        });

        console.log('\nAll topics saved to:', outDir);
        await pool.end();
        process.exit(0);
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
}

readAll();

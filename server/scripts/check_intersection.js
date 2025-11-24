const pool = require('../db');

async function checkIntersection() {
    const client = await pool.connect();
    try {
        console.log('🔍 Checking Intersection of Two Lists...\n');

        const res = await client.query("SELECT problem_id, title, description FROM problems WHERE title ILIKE '%Intersection of Two Lists%'");

        console.log(`Found ${res.rows.length} problems.`);

        res.rows.forEach(p => {
            console.log(`\n[ID: ${p.problem_id}] Title: ${p.title}`);
            console.log(`Description Length: ${p.description?.length}`);
            console.log(`Description Start: ${p.description?.substring(0, 50)}...`);
        });

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

checkIntersection();

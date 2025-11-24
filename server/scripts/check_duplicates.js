const pool = require('../db');

async function checkDuplicates() {
    const client = await pool.connect();
    try {
        console.log('🔍 Checking for Duplicate Problems...\n');

        const res = await client.query(`
            SELECT title, COUNT(*) 
            FROM problems 
            GROUP BY title 
            HAVING COUNT(*) > 1
        `);

        if (res.rows.length > 0) {
            console.log('❌ Duplicates Found:');
            res.rows.forEach(r => console.log(`  - "${r.title}": ${r.count} copies`));

            // Specifically check Intersection
            const intersection = await client.query("SELECT problem_id, title, description FROM problems WHERE title = 'Intersection of Two Lists'");
            intersection.rows.forEach(p => {
                console.log(`\n[ID: ${p.problem_id}] Length: ${p.description?.length}`);
                console.log(`Preview: ${p.description?.substring(0, 50)}...`);
            });

        } else {
            console.log('✅ No duplicate titles found.');
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

checkDuplicates();

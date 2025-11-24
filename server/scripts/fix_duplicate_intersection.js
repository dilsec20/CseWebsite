const pool = require('../db');

async function fixDuplicateIntersection() {
    const client = await pool.connect();
    try {
        console.log('🔧 Fixing Duplicate Intersection of Two Lists...\n');

        // Get the good description from ID 160
        const good = await client.query("SELECT description FROM problems WHERE problem_id = 160");
        const description = good.rows[0].description;

        console.log(`Got good description (Length: ${description.length})`);

        // Update the bad duplicate (ID 1488)
        // Actually, let's update ALL problems with this title to be safe
        const result = await client.query(
            "UPDATE problems SET description = $1 WHERE title = 'Intersection of Two Lists' AND problem_id != 160 RETURNING problem_id",
            [description]
        );

        if (result.rows.length > 0) {
            console.log(`✅ Updated ${result.rows.length} duplicate(s): IDs ${result.rows.map(r => r.problem_id).join(', ')}`);
        } else {
            console.log('⚠️ No duplicates needed updating (or ID 1488 not found).');
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

fixDuplicateIntersection();

const pool = require('../db');

async function fixDuplicates() {
    const client = await pool.connect();
    try {
        console.log('🔧 Fixing Duplicate Problems...\n');

        // List of titles known to be duplicated
        const titles = [
            "N-Queens",
            "Gas Station",
            "Find Median from Data Stream",
            "Word Ladder",
            "Combination Sum",
            "Intersection of Two Linked Lists",
            "Palindrome Linked List",
            "Min Stack",
            "Find Minimum in Rotated Sorted Array",
            "Evaluate Reverse Polish Notation"
        ];

        for (const title of titles) {
            // Get all copies
            const res = await client.query("SELECT problem_id, description FROM problems WHERE title = $1 ORDER BY problem_id DESC", [title]);

            if (res.rows.length > 1) {
                console.log(`Processing "${title}" (${res.rows.length} copies)...`);

                // Keep the one with the longest description (likely the fixed one)
                // OR if equal, keep the latest one (highest ID)
                const best = res.rows.reduce((prev, current) => {
                    return (prev.description.length > current.description.length) ? prev : current;
                });

                console.log(`   Keeping ID: ${best.problem_id} (Len: ${best.description.length})`);

                // Delete others
                const toDelete = res.rows.filter(r => r.problem_id !== best.problem_id).map(r => r.problem_id);

                for (const id of toDelete) {
                    // Delete related data first (foreign keys)
                    await client.query("DELETE FROM test_cases WHERE problem_id = $1", [id]);
                    await client.query("DELETE FROM submissions WHERE problem_id = $1", [id]);
                    await client.query("DELETE FROM contest_problems WHERE problem_id = $1", [id]);

                    // Delete problem
                    await client.query("DELETE FROM problems WHERE problem_id = $1", [id]);
                    console.log(`   Deleted ID: ${id}`);
                }
            }
        }

        console.log('\n✅ Duplicate cleanup complete.');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

fixDuplicates();

const pool = require('../db');

async function auditAllModules() {
    const client = await pool.connect();
    try {
        console.log('🔍 Full Content Audit\n');
        console.log('='.repeat(60));

        const modules = await client.query(`
            SELECT m.module_id, m.title, COUNT(t.topic_id) as topic_count
            FROM dsa_modules m
            LEFT JOIN dsa_topics t ON m.module_id = t.module_id
            GROUP BY m.module_id, m.title
            ORDER BY m.order_index
        `);

        for (const mod of modules.rows) {
            const topics = await client.query(
                "SELECT title FROM dsa_topics WHERE module_id = $1 ORDER BY order_index",
                [mod.module_id]
            );

            console.log(`\n${mod.title} (${mod.topic_count} topics)`);
            topics.rows.forEach(t => console.log(`  - ${t.title}`));
        }

        console.log('\n' + '='.repeat(60));
        console.log('\nMissing Topics Analysis:');
        console.log('  Graphs: Need Dijkstra, MST, DSU, Topological Sort');
        console.log('  Trees: Need Level Order, Morris Traversal');
        console.log('  DP: Need Matrix Chain, Edit Distance, Knapsack variants');
        console.log('  Strings: Need KMP, Rabin-Karp, Trie');

    } catch (err) {
        console.error(err);
    } finally {
        client.release();
        await pool.end();
    }
}

auditAllModules();

const pool = require('../db');

(async () => {
    try {
        const res = await pool.query(`
            SELECT m.title as module, COUNT(t.topic_id) as topics 
            FROM dsa_modules m 
            LEFT JOIN dsa_topics t ON m.module_id = t.module_id 
            GROUP BY m.module_id, m.title 
            ORDER BY m.order_index
        `);

        console.log('\n📚 DSA CURRICULUM SUMMARY\n');
        console.log('='.repeat(60));

        res.rows.forEach(r => {
            console.log(`${r.module}: ${r.topics} topics`);
        });

        const total = await pool.query('SELECT COUNT(*) as total FROM dsa_topics');
        console.log('='.repeat(60));
        console.log(`\n✨ TOTAL TOPICS: ${total.rows[0].total}\n`);

        await pool.end();
    } catch (err) {
        console.error(err);
    }
})();

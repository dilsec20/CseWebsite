const pool = require('../db');

async function verify() {
    try {
        const result = await pool.query(`
            SELECT m.title as module, t.title as topic, m.order_index
            FROM dsa_topics t 
            JOIN dsa_modules m ON t.module_id = m.module_id 
            WHERE t.title LIKE '%Extra Practice%' 
            ORDER BY m.order_index
        `);

        console.log('📝 Extra Practice Topics Added:\n');
        result.rows.forEach((row, idx) => {
            console.log(`${idx + 1}. ${row.module} ✓`);
        });

        console.log(`\n✅ Total: ${result.rows.length} Extra Practice topics added!`);

        if (result.rows.length === 15) {
            console.log('🎉 SUCCESS! All 15 modules now have Extra Practice sections.');
        }

        await pool.end();
    } catch (err) {
        console.error('Error:', err.message);
        await pool.end();
    }
}

verify();

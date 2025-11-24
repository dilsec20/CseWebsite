const pool = require('../db');

async function showFinalState() {
    try {
        const result = await pool.query('SELECT title, description FROM dsa_modules ORDER BY order_index LIMIT 3');
        console.log('✨ Final Module State (First 3 Examples):\n');
        result.rows.forEach(row => {
            console.log(`📘 ${row.title}`);
            console.log(`   ${row.description}\n`);
        });
        await pool.end();
    } catch (err) {
        console.error(err);
    }
}

showFinalState();

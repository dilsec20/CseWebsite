const pool = require('../db');

async function checkDescriptions() {
    try {
        const result = await pool.query('SELECT title, description FROM dsa_modules ORDER BY order_index');
        console.log('Current Module Descriptions:\n');
        result.rows.forEach(row => {
            console.log(`📘 ${row.title}`);
            console.log(`   ${row.description}\n`);
        });
        await pool.end();
    } catch (err) {
        console.error(err);
    }
}

checkDescriptions();

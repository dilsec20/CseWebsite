const pool = require('../db');

async function checkModuleTitles() {
    try {
        const result = await pool.query('SELECT module_id, title, description FROM dsa_modules ORDER BY order_index');
        console.log('Current Module Titles:');
        result.rows.forEach(row => {
            console.log(`${row.module_id}: ${row.title}`);
        });
        await pool.end();
    } catch (err) {
        console.error(err);
    }
}

checkModuleTitles();

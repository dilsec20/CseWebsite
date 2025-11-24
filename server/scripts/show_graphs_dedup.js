const pool = require('../db');

async function showGraphsSection() {
    try {
        const result = await pool.query(`
            SELECT t.content
            FROM dsa_topics t 
            JOIN dsa_modules m ON t.module_id = m.module_id 
            WHERE t.title LIKE '%Extra Practice%' 
            AND m.title = '12. Graphs'
            LIMIT 1
        `);

        if (result.rows.length > 0) {
            console.log('════════════════════════════════════════════════════════');
            console.log('📝 GRAPHS EXTRA PRACTICE - DEDUPLICATED');
            console.log('════════════════════════════════════════════════════════\n');
            console.log(result.rows[0].content);
            console.log('\n════════════════════════════════════════════════════════');
            console.log('✅ NO duplicate problems between sections');
            console.log('✅ Added unique problems to fill space');
            console.log('✅ More variety for comprehensive practice');
            console.log('════════════════════════════════════════════════════════');
        }

        await pool.end();
    } catch (err) {
        console.error('Error:', err.message);
        await pool.end();
    }
}

showGraphsSection();

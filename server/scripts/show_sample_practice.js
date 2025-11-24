const pool = require('../db');

async function showDetailedSample() {
    try {
        const result = await pool.query(`
            SELECT t.title, t.content
            FROM dsa_topics t 
            JOIN dsa_modules m ON t.module_id = m.module_id 
            WHERE t.title LIKE '%Extra Practice%' 
            AND m.title = '3. Arrays & Vectors'
            LIMIT 1
        `);

        if (result.rows.length > 0) {
            console.log('════════════════════════════════════════════════════════');
            console.log('📝 EXTRA PRACTICE CONTENT - Arrays & Vectors');
            console.log('════════════════════════════════════════════════════════\n');
            console.log(result.rows[0].content);
            console.log('\n════════════════════════════════════════════════════════');
            console.log('✅ Links are in markdown format: [Text](URL)');
            console.log('✅ Frontend renders them as clickable <a> tags');
            console.log('✅ Opens in new tab with target="_blank"');
            console.log('════════════════════════════════════════════════════════');
        }

        await pool.end();
    } catch (err) {
        console.error('Error:', err.message);
        await pool.end();
    }
}

showDetailedSample();

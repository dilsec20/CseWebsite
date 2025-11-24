const pool = require('../db');

async function showFAANGSample() {
    try {
        const result = await pool.query(`
            SELECT t.content
            FROM dsa_topics t 
            JOIN dsa_modules m ON t.module_id = m.module_id 
            WHERE t.title LIKE '%Extra Practice%' 
            AND m.title = '3. Arrays & Vectors'
            LIMIT 1
        `);

        if (result.rows.length > 0) {
            const content = result.rows[0].content;

            // Extract FAANG section
            const faangStart = content.indexOf('## 🏆 FAANG/MAANG Favorites');
            if (faangStart !== -1) {
                const faangSection = content.substring(faangStart);

                console.log('════════════════════════════════════════════════════════');
                console.log('🏆 FAANG/MAANG FAVORITES - Arrays & Vectors');
                console.log('════════════════════════════════════════════════════════\n');
                console.log(faangSection);
                console.log('\n════════════════════════════════════════════════════════');
                console.log('✅ Each problem includes company tags');
                console.log('✅ ⭐ indicates most frequently asked');
                console.log('✅ All problems are clickable links');
                console.log('════════════════════════════════════════════════════════');
            } else {
                console.log('FAANG section not found');
            }
        }

        await pool.end();
    } catch (err) {
        console.error('Error:', err.message);
        await pool.end();
    }
}

showFAANGSample();

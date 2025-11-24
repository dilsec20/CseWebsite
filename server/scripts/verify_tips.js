const pool = require('../db');

async function verifyTips() {
    try {
        const result = await pool.query(`
            SELECT m.title, t.content
            FROM dsa_topics t 
            JOIN dsa_modules m ON t.module_id = m.module_id 
            WHERE t.title LIKE '%Extra Practice%' 
            AND (m.title = 'Bit Manipulation' OR m.title = 'Strings')
        `);

        result.rows.forEach(row => {
            console.log('════════════════════════════════════════════════════════');
            console.log(`📘 ${row.title} - Tips Verification`);
            console.log('════════════════════════════════════════════════════════\n');

            const tipsStart = row.content.indexOf('## 💡 Pro Tips & Shortcuts');
            if (tipsStart !== -1) {
                console.log(row.content.substring(tipsStart));
                console.log('\n✅ Tips section found!');
            } else {
                console.log('❌ Tips section NOT found!');
            }
            console.log('\n');
        });

        await pool.end();
    } catch (err) {
        console.error(err);
    }
}

verifyTips();

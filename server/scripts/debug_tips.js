const pool = require('../db');

async function debugTips() {
    const client = await pool.connect();
    try {
        const topics = await client.query(`
            SELECT t.topic_id, t.content, m.title as module_title
            FROM dsa_topics t
            JOIN dsa_modules m ON t.module_id = m.module_id
            WHERE t.title LIKE '%Extra Practice%'
        `);

        console.log(`Found ${topics.rows.length} Extra Practice topics.`);

        topics.rows.forEach(t => {
            console.log(`Module: "${t.module_title}"`);
            if (t.content.includes('## 💡 Pro Tips & Shortcuts')) {
                console.log('  - Tips already present');
            } else {
                console.log('  - Tips NOT present');
            }
        });

    } catch (err) {
        console.error(err);
    } finally {
        client.release();
        await pool.end();
    }
}

debugTips();

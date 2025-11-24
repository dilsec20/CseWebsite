const pool = require('../db');

async function fixModuleTitles() {
    const client = await pool.connect();
    try {
        console.log('🔧 Fixing Module Titles (Removing "X. " prefix)...\n');

        const modules = await client.query('SELECT module_id, title FROM dsa_modules');

        for (const mod of modules.rows) {
            // Regex to match "1. ", "10. ", etc. at the start
            const newTitle = mod.title.replace(/^\d+\.\s+/, '');

            if (newTitle !== mod.title) {
                await client.query('UPDATE dsa_modules SET title = $1 WHERE module_id = $2', [newTitle, mod.module_id]);
                console.log(`✅ Updated: "${mod.title}" -> "${newTitle}"`);
            } else {
                console.log(`Skipped: "${mod.title}" (No number prefix found)`);
            }
        }
        console.log('\n🎉 All titles updated!');
    } catch (err) {
        console.error(err);
    } finally {
        client.release();
        await pool.end();
    }
}

fixModuleTitles();

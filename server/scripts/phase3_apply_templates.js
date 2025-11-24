const pool = require('../db');
const fs = require('fs');

async function phase3ApplyTemplates() {
    const client = await pool.connect();
    try {
        console.log('🚀 PHASE 3: Applying Template Fixes\n');
        console.log('='.repeat(60) + '\n');

        // Read proposed fixes
        const fixes = JSON.parse(fs.readFileSync(__dirname + '/proposed_fixes.json', 'utf8'));

        console.log(`Applying fixes to ${fixes.length} problems...\n`);

        let applied = 0;

        for (const fix of fixes) {
            try {
                const newDescription = fix.current_description + '\n\n' + fix.proposed_addition;

                await client.query(
                    "UPDATE problems SET description = $1 WHERE problem_id = $2",
                    [newDescription, fix.problem_id]
                );

                console.log(`✅ [${fix.problem_id}] ${fix.title}`);
                applied++;

            } catch (err) {
                console.error(`❌ Error: [${fix.problem_id}] ${fix.title} - ${err.message}`);
            }
        }

        console.log(`\n✅ Applied ${applied} template fixes\n`);
        console.log('✨ Phase 3 Complete!\n');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

phase3ApplyTemplates();

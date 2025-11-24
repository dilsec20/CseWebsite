const pool = require('../db');

async function analyzeDescriptions() {
    const client = await pool.connect();
    try {
        console.log('🔍 Analyzing Problem Description Quality...\n');

        const problems = await client.query("SELECT problem_id, title, description, topic FROM problems ORDER BY problem_id");

        let shortDesc = [];
        let missingSections = [];

        for (const p of problems.rows) {
            const desc = p.description || '';

            // Check length
            if (desc.length < 100) {
                shortDesc.push({ id: p.problem_id, title: p.title, len: desc.length, text: desc });
            }

            // Check for key sections (simple heuristic)
            const hasInput = desc.toLowerCase().includes('input');
            const hasOutput = desc.toLowerCase().includes('output');
            const hasConstraints = desc.toLowerCase().includes('constraint');

            if (!hasInput || !hasOutput || !hasConstraints) {
                missingSections.push({
                    id: p.problem_id,
                    title: p.title,
                    missing: [
                        !hasInput ? 'Input' : '',
                        !hasOutput ? 'Output' : '',
                        !hasConstraints ? 'Constraints' : ''
                    ].filter(Boolean).join(', ')
                });
            }
        }

        console.log(`Total problems: ${problems.rows.length}`);
        console.log(`\nProblems with SHORT descriptions (< 100 chars): ${shortDesc.length}`);
        shortDesc.forEach(p => console.log(`  - [${p.id}] ${p.title}: "${p.text}"`));

        console.log(`\nProblems missing standard sections (Input/Output/Constraints): ${missingSections.length}`);
        if (missingSections.length > 0) {
            console.log('Sample of problems missing sections:');
            missingSections.slice(0, 10).forEach(p => console.log(`  - [${p.id}] ${p.title} (Missing: ${p.missing})`));
            if (missingSections.length > 10) console.log(`  ...and ${missingSections.length - 10} more`);
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

analyzeDescriptions();

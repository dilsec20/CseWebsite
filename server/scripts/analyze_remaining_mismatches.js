const pool = require('../db');
const fs = require('fs');

async function analyzeRemainingMismatches() {
    const client = await pool.connect();
    try {
        console.log('🔍 Analyzing Remaining Input Format Mismatches...\n');

        // Get all problems with input format mismatches that were NOT fixed
        // We can re-run the detection logic or just check the current state
        const problems = await client.query(`
            SELECT 
                p.problem_id,
                p.title,
                p.description,
                t.input as sample_input
            FROM problems p
            JOIN test_cases t ON p.problem_id = t.problem_id AND t.is_sample = true
            ORDER BY p.problem_id ASC
        `);

        const remaining = [];

        for (const p of problems.rows) {
            const desc = p.description || '';
            const inputLines = p.sample_input.trim().split('\n');

            // Check for "First line:" mentions
            const descLines = (desc.match(/First line:|Second line:|Third line:/g) || []).length;

            if (descLines > inputLines.length) {
                remaining.push({
                    id: p.problem_id,
                    title: p.title,
                    desc_lines: descLines,
                    sample_lines: inputLines.length,
                    sample_preview: p.sample_input.replace(/\n/g, '\\n').substring(0, 50),
                    description_preview: desc.substring(0, 100).replace(/\n/g, ' ')
                });
            }
        }

        console.log(`Found ${remaining.length} remaining input mismatches.\n`);

        remaining.forEach(p => {
            console.log(`[${p.id}] ${p.title}`);
            console.log(`   Expected ${p.desc_lines} lines, found ${p.sample_lines}`);
            console.log(`   Sample: ${p.sample_preview}`);
            console.log(`   Desc: ${p.description_preview}\n`);
        });

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

analyzeRemainingMismatches();

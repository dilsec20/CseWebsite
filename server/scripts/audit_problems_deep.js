const pool = require('../db');

async function auditProblemsDeep() {
    const client = await pool.connect();
    try {
        console.log('🕵️ Starting Deep Audit of Problem Quality...\n');

        // 1. Check for Duplicate Titles
        const duplicates = await client.query(`
            SELECT title, COUNT(*) 
            FROM problems 
            GROUP BY title 
            HAVING COUNT(*) > 1
        `);
        if (duplicates.rows.length > 0) {
            console.log(`🚨 CRITICAL: Found ${duplicates.rows.length} Duplicate Titles!`);
            duplicates.rows.forEach(r => console.log(`   - "${r.title}" (${r.count})`));
        } else {
            console.log('✅ No duplicate titles found.');
        }

        // 2. Check for Poor Descriptions
        // Criteria: Length < 200 OR Missing "Constraints" OR Missing "Input"
        const badDescriptions = await client.query(`
            SELECT problem_id, title, length(description) as len, description
            FROM problems 
            WHERE length(description) < 200 
               OR description NOT ILIKE '%Constraints%'
               OR description NOT ILIKE '%Input%'
               OR description NOT ILIKE '%Output%'
            ORDER BY problem_id ASC
        `);

        console.log(`\n📉 Found ${badDescriptions.rows.length} problems with POOR descriptions (Missing sections or too short):`);
        badDescriptions.rows.slice(0, 10).forEach(p => {
            const missing = [];
            if (!p.description.includes('Constraints')) missing.push('Constraints');
            if (!p.description.includes('Input')) missing.push('Input');
            if (!p.description.includes('Output')) missing.push('Output');
            console.log(`   - [${p.problem_id}] ${p.title} (Len: ${p.len}) -> Missing: ${missing.join(', ')}`);
        });
        if (badDescriptions.rows.length > 10) console.log(`   ... and ${badDescriptions.rows.length - 10} more.`);

        // 3. Check for Suspicious Sample Test Cases
        // Criteria: Empty input/output, or output is just "null" or "undefined"
        const badSamples = await client.query(`
            SELECT t.problem_id, p.title, t.input, t.expected_output
            FROM test_cases t
            JOIN problems p ON t.problem_id = p.problem_id
            WHERE t.is_sample = true 
              AND (
                  length(t.expected_output) = 0 
                  OR t.expected_output ILIKE '%null%' 
                  OR t.expected_output ILIKE '%undefined%'
                  OR length(t.input) = 0
              )
        `);

        if (badSamples.rows.length > 0) {
            console.log(`\n⚠️ Found ${badSamples.rows.length} Suspicious Sample Test Cases:`);
            badSamples.rows.forEach(r => {
                console.log(`   - [${r.problem_id}] ${r.title}: Input='${r.input}', Output='${r.expected_output}'`);
            });
        } else {
            console.log('\n✅ No obviously empty/broken sample test cases found.');
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

auditProblemsDeep();

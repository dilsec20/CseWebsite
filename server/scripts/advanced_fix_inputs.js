const pool = require('../db');

async function advancedFixInputs() {
    const client = await pool.connect();
    try {
        console.log('🚀 PHASE 4: Advanced Input Format Fixes\n');
        console.log('='.repeat(60) + '\n');

        // Get problems with line count mismatches
        const problems = await client.query(`
            SELECT 
                p.problem_id,
                p.title,
                p.description,
                t.test_case_id,
                t.input as sample_input
            FROM problems p
            JOIN test_cases t ON p.problem_id = t.problem_id AND t.is_sample = true
            ORDER BY p.problem_id ASC
        `);

        let fixed = 0;
        let skipped = 0;

        for (const p of problems.rows) {
            const desc = p.description || '';
            const inputLines = p.sample_input.trim().split('\n');
            const descLines = (desc.match(/First line:|Second line:|Third line:/g) || []).length;

            // Case 1: Expected 3 lines, found 2
            // Scenario: Desc asks for [Size, Array, Target], Sample has [Array, Target]
            if (descLines === 3 && inputLines.length === 2) {
                // Check if first line is array-like (contains spaces)
                if (inputLines[0].trim().includes(' ')) {
                    const elements = inputLines[0].trim().split(/\s+/);
                    const size = elements.length;

                    // Prepend size
                    const newInput = `${size}\n${p.sample_input}`;

                    await client.query(
                        "UPDATE test_cases SET input = $1 WHERE test_case_id = $2",
                        [newInput, p.test_case_id]
                    );

                    console.log(`✅ [${p.problem_id}] ${p.title} (Prepended size ${size})`);
                    fixed++;
                    continue;
                }
            }

            // Case 2: Expected 2 lines, found 1 (Complex)
            // Scenario: Desc asks for [Size, Array], Sample has [Array]
            // (This was mostly covered in Phase 1, but checking for leftovers)
            if (descLines === 2 && inputLines.length === 1) {
                if (inputLines[0].trim().includes(' ')) {
                    const elements = inputLines[0].trim().split(/\s+/);
                    const size = elements.length;

                    const newInput = `${size}\n${p.sample_input}`;

                    await client.query(
                        "UPDATE test_cases SET input = $1 WHERE test_case_id = $2",
                        [newInput, p.test_case_id]
                    );

                    console.log(`✅ [${p.problem_id}] ${p.title} (Prepended size ${size})`);
                    fixed++;
                    continue;
                }
            }

            // Case 3: Linked List Cycle specific
            // Desc: 3 lines (Size, List, Pos), Sample: 2 lines (List, Pos) -> Missing Size
            if (p.title.includes('Cycle') && inputLines.length === 2) {
                if (inputLines[0].trim().includes(' ')) {
                    const elements = inputLines[0].trim().split(/\s+/);
                    const size = elements.length;

                    const newInput = `${size}\n${p.sample_input}`;

                    await client.query(
                        "UPDATE test_cases SET input = $1 WHERE test_case_id = $2",
                        [newInput, p.test_case_id]
                    );

                    console.log(`✅ [${p.problem_id}] ${p.title} (Linked List Cycle Fix)`);
                    fixed++;
                    continue;
                }
            }

            skipped++;
        }

        console.log(`\n📊 PHASE 4 SUMMARY:`);
        console.log(`✅ Fixed: ${fixed}`);
        console.log(`⏭️  Skipped/No Issue: ${skipped}`);

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

advancedFixInputs();

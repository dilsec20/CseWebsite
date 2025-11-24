const pool = require('../db');
const fs = require('fs');

async function phase1AutoFix() {
    const client = await pool.connect();
    try {
        console.log('🚀 PHASE 1: Auto-Fixing Obvious Issues\n');
        console.log('='.repeat(60) + '\n');

        let totalFixed = 0;

        // ============================================
        // Part 1: Fix Input Format Mismatches
        // ============================================
        console.log('📋 Part 1: Fixing Input Format Mismatches...\n');

        const categories = JSON.parse(fs.readFileSync(__dirname + '/categorized_issues.json', 'utf8'));
        const mismatchProblems = categories.inputFormatMismatch;

        let inputFixed = 0;
        let inputSkipped = 0;

        for (const problem of mismatchProblems) {
            try {
                const probData = await client.query(`
                    SELECT p.description, t.input, t.expected_output, t.test_case_id
                    FROM problems p
                    JOIN test_cases t ON p.problem_id = t.problem_id AND t.is_sample = true
                    WHERE p.problem_id = $1
                `, [problem.id]);

                if (probData.rows.length === 0) {
                    inputSkipped++;
                    continue;
                }

                const { description, input, test_case_id } = probData.rows[0];
                const currentLines = input.trim().split('\n');
                let newInput = null;

                // Strategy 1: "First line: n" + single line array
                if ((description.includes('First line: n') || description.includes('First line: N')) &&
                    currentLines.length === 1 && currentLines[0].includes(' ')) {
                    const elements = currentLines[0].trim().split(/\s+/);
                    newInput = `${elements.length}\n${currentLines[0]}`;
                }
                // Strategy 2: "First line: n, k" + "Second line: array" but sample has 1 line
                else if (description.match(/First line:.*n.*\n.*Second line:/i) && currentLines.length === 1) {
                    const elements = currentLines[0].trim().split(/\s+/);
                    newInput = `${elements.length}\n${currentLines[0]}`;
                }
                // Strategy 3: Linked list problems - "First line: values" + "Second line: cycle pos" but sample has 1 line
                else if (description.match(/First line:.*\n.*Second line:.*cycle|pos/i) && currentLines.length === 1) {
                    newInput = `${currentLines[0]}\n-1`;  // -1 typically means no cycle
                }

                if (newInput) {
                    await client.query(
                        "UPDATE test_cases SET input = $1 WHERE test_case_id = $2",
                        [newInput, test_case_id]
                    );
                    console.log(`✅ [${problem.id}] ${problem.title}`);
                    inputFixed++;
                } else {
                    inputSkipped++;
                }

            } catch (err) {
                console.error(`❌ Error: [${problem.id}] ${problem.title} - ${err.message}`);
                inputSkipped++;
            }
        }

        console.log(`\n✅ Input Format Fixes: ${inputFixed} fixed, ${inputSkipped} skipped\n`);
        totalFixed += inputFixed;

        // ============================================
        // Part 2: Fix Null/Undefined Outputs
        // ============================================
        console.log('📋 Part 2: Fixing Null/Undefined Outputs...\n');

        const nullProblems = categories.nullOutput;
        let nullFixed = 0;

        for (const problem of nullProblems) {
            try {
                const result = await client.query(
                    "DELETE FROM test_cases WHERE problem_id = $1 AND is_sample = true AND (expected_output ILIKE '%null%' OR expected_output ILIKE '%undefined%')",
                    [problem.id]
                );

                if (result.rowCount > 0) {
                    console.log(`✅ [${problem.id}] ${problem.title} - Deleted ${result.rowCount} invalid test case(s)`);
                    nullFixed++;
                }
            } catch (err) {
                console.error(`❌ Error: [${problem.id}] ${problem.title} - ${err.message}`);
            }
        }

        console.log(`\n✅ Null Output Fixes: ${nullFixed} problems cleaned\n`);
        totalFixed += nullFixed;

        // ============================================
        // Summary
        // ============================================
        console.log('\n' + '='.repeat(60));
        console.log('📊 PHASE 1 SUMMARY:');
        console.log('='.repeat(60));
        console.log(`✅ Total Problems Fixed: ${totalFixed}`);
        console.log(`   - Input Format Mismatches: ${inputFixed}`);
        console.log(`   - Null/Undefined Outputs Removed: ${nullFixed}`);
        console.log('\n✨ Phase 1 Complete! Moving to Phase 2...\n');

    } catch (err) {
        console.error('Critical Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

phase1AutoFix();

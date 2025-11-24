const pool = require('../db');
const fs = require('fs');

async function batchFixInputFormats() {
    const client = await pool.connect();
    try {
        console.log('🔧 Batch Fixing Input Format Mismatches...\n');

        // Read categorized issues
        const categories = JSON.parse(fs.readFileSync(__dirname + '/categorized_issues.json', 'utf8'));
        const problems = categories.inputFormatMismatch;

        console.log(`Found ${problems.length} problems with input format mismatches.\n`);

        let fixed = 0;
        let skipped = 0;

        for (const problem of problems.slice(0, 30)) {  // Fix top 30 for now
            try {
                // Get problem details
                const probData = await client.query(`
                    SELECT p.description, t.input, t.expected_output
                    FROM problems p
                    JOIN test_cases t ON p.problem_id = t.problem_id AND t.is_sample = true
                    WHERE p.problem_id = $1
                `, [problem.id]);

                if (probData.rows.length === 0) {
                    console.log(`⚠️  [${problem.id}] ${problem.title} - No sample test case found`);
                    skipped++;
                    continue;
                }

                const { description, input, expected_output } = probData.rows[0];
                const currentLines = input.trim().split('\n');

                // Strategy: If description says "First line: n" and we have array data,
                // prepend the count of elements as first line
                let newInput = input;
                let fixed_this = false;

                if (description.includes('First line: n') || description.includes('First line: N')) {
                    // Check if current input looks like space-separated numbers
                    if (currentLines.length === 1 && currentLines[0].includes(' ')) {
                        const elements = currentLines[0].trim().split(/\s+/);
                        newInput = `${elements.length}\n${currentLines[0]}`;
                        fixed_this = true;
                    }
                }
                // If description says "First line: n (size)" and "Second line: array"
                else if (description.match(/First line:.*\n.*Second line:/i)) {
                    if (currentLines.length === 1) {
                        const elements = currentLines[0].trim().split(/\s+/);
                        newInput = `${elements.length}\n${currentLines[0]}`;
                        fixed_this = true;
                    }
                }

                if (fixed_this) {
                    await client.query(
                        "UPDATE test_cases SET input = $1 WHERE problem_id = $2 AND is_sample = true",
                        [newInput, problem.id]
                    );
                    console.log(`✅ [${problem.id}] ${problem.title}`);
                    console.log(`   OLD: ${input.replace(/\n/g, '\\n')}`);
                    console.log(`   NEW: ${newInput.replace(/\n/g, '\\n')}\n`);
                    fixed++;
                } else {
                    console.log(`⏭️  [${problem.id}] ${problem.title} - Needs manual review`);
                    skipped++;
                }

            } catch (err) {
                console.error(`❌ Error fixing [${problem.id}] ${problem.title}:`, err.message);
                skipped++;
            }
        }

        console.log(`\n📊 SUMMARY:`);
        console.log(`✅ Fixed: ${fixed}`);
        console.log(`⏭️  Skipped: ${skipped}`);
        console.log(`📝 Total Processed: ${fixed + skipped}`);

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

batchFixInputFormats();

const pool = require('../db');

async function fixAllHiddenCases() {
    const client = await pool.connect();
    try {
        console.log('🚀 GLOBAL FIX: Synchronizing ALL Test Cases with Descriptions\n');
        console.log('='.repeat(60) + '\n');

        // Get all problems
        const problems = await client.query(`
            SELECT problem_id, title, description 
            FROM problems 
            ORDER BY problem_id ASC
        `);

        let totalFixed = 0;

        for (const p of problems.rows) {
            const desc = p.description || '';

            // Detect expected format
            const expectsSizePrefix = (
                desc.includes('First line: n') ||
                desc.includes('First line: N') ||
                desc.match(/First line:.*size/i) ||
                desc.match(/First line:.*count/i)
            );

            if (!expectsSizePrefix) continue;

            // Get ALL test cases for this problem
            const tests = await client.query(
                "SELECT test_case_id, input, is_sample FROM test_cases WHERE problem_id = $1",
                [p.problem_id]
            );

            let problemFixedCount = 0;

            for (const t of tests.rows) {
                const lines = t.input.trim().split('\n');

                // Check if it looks like a single-line array (space separated numbers)
                // and we expect a size prefix (so should be 2 lines)
                if (lines.length === 1 && t.input.includes(' ')) {
                    // Verify it's just numbers
                    if (!t.input.match(/[a-zA-Z]/)) {
                        const elements = t.input.trim().split(/\s+/);
                        const size = elements.length;

                        // Prepend size
                        const newInput = `${size}\n${t.input.trim()}`;

                        await client.query(
                            "UPDATE test_cases SET input = $1 WHERE test_case_id = $2",
                            [newInput, t.test_case_id]
                        );

                        problemFixedCount++;
                    }
                }
            }

            if (problemFixedCount > 0) {
                console.log(`✅ [${p.problem_id}] ${p.title}: Fixed ${problemFixedCount} test cases`);
                totalFixed += problemFixedCount;
            }
        }

        console.log('\n' + '='.repeat(60));
        console.log(`🎉 DONE! Fixed ${totalFixed} hidden/sample test cases across the database.`);
        console.log('All test cases should now match the "First line: n" format.');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        client.release();
        await pool.end();
    }
}

fixAllHiddenCases();
